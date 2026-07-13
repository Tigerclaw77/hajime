alter table leads add column stripe_customer_id text;

create unique index leads_stripe_customer_id_idx
  on leads (stripe_customer_id)
  where stripe_customer_id is not null;

alter table leads drop constraint leads_status_check;
alter table leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'discovery_scheduled', 'proposal_sent', 'won', 'paid', 'lost', 'archived'));

alter table leads drop constraint won_leads_require_project;
alter table leads add constraint converted_leads_require_project
  check (status not in ('won', 'paid') or project_id is not null);

alter table leads drop constraint linked_leads_remain_won_or_archived;
alter table leads add constraint linked_leads_remain_converted_or_archived
  check (project_id is null or status in ('won', 'paid', 'archived'));

create table lead_payments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references "user"(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete restrict,
  method text not null check (method in ('invoice', 'payment_link')),
  status text not null default 'creating' check (status in ('creating', 'open', 'paid', 'void')),
  amount_minor bigint not null check (amount_minor > 0),
  currency_code text not null default 'USD' check (currency_code = 'USD'),
  description text not null check (char_length(trim(description)) between 3 and 500),
  invoice_due_days integer check (
    (method = 'invoice' and invoice_due_days between 1 and 90)
    or (method = 'payment_link' and invoice_due_days is null)
  ),
  stripe_customer_id text,
  stripe_invoice_id text unique,
  stripe_payment_link_id text unique,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  payment_url text,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint lead_payment_provider_shape check (
    (method = 'invoice' and stripe_payment_link_id is null)
    or (method = 'payment_link' and stripe_invoice_id is null)
  ),
  constraint lead_payment_paid_shape check (
    (status = 'paid' and paid_at is not null)
    or (status <> 'paid' and paid_at is null)
  )
);

create unique index lead_payments_one_active_per_lead_idx
  on lead_payments (lead_id)
  where status in ('creating', 'open');

create index lead_payments_owner_created_idx
  on lead_payments (owner_id, created_at desc);

create trigger lead_payments_set_updated_at
before update on lead_payments
for each row execute function set_updated_at();

create table stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  payment_id uuid not null references lead_payments(id) on delete restrict,
  processed_at timestamptz not null default timezone('utc', now())
);

create or replace function reserve_lead_payment(
  current_owner_id uuid,
  target_lead_id uuid,
  payment_method text,
  payment_amount_minor bigint,
  payment_description text,
  payment_invoice_due_days integer
)
returns uuid
language plpgsql
as $$
declare
  current_lead leads%rowtype;
  existing_payment lead_payments%rowtype;
  created_payment_id uuid;
begin
  if payment_method not in ('invoice', 'payment_link') then
    raise exception 'Unsupported payment method';
  end if;
  if payment_amount_minor <= 0 then raise exception 'Payment amount must be positive'; end if;
  if char_length(trim(payment_description)) not between 3 and 500 then
    raise exception 'Payment description is invalid';
  end if;
  if (payment_method = 'invoice' and payment_invoice_due_days not between 1 and 90)
     or (payment_method = 'payment_link' and payment_invoice_due_days is not null) then
    raise exception 'Invoice terms are invalid';
  end if;

  select * into current_lead
  from leads
  where id = target_lead_id and owner_id = current_owner_id
  for update;

  if not found then raise exception 'Lead not found'; end if;
  if current_lead.status in ('lost', 'archived', 'paid') then
    raise exception 'Lead cannot accept a payment request in its current status';
  end if;
  if current_lead.proposal_package is null then
    raise exception 'A proposed package is required before requesting payment';
  end if;

  select * into existing_payment
  from lead_payments
  where lead_id = target_lead_id and status in ('creating', 'open')
  for update;

  if found then
    if existing_payment.method <> payment_method
       or existing_payment.amount_minor <> payment_amount_minor
       or existing_payment.description <> trim(payment_description)
       or existing_payment.invoice_due_days is distinct from payment_invoice_due_days then
      raise exception 'This lead already has a different active payment request';
    end if;
    return existing_payment.id;
  end if;

  insert into lead_payments (
    owner_id, lead_id, method, amount_minor, description, invoice_due_days
  ) values (
    current_owner_id, target_lead_id, payment_method, payment_amount_minor,
    trim(payment_description), payment_invoice_due_days
  ) returning id into created_payment_id;

  return created_payment_id;
end;
$$;

create or replace function finalize_lead_payment_setup(
  current_owner_id uuid,
  target_payment_id uuid,
  provider_customer_id text,
  provider_invoice_id text,
  provider_payment_link_id text,
  provider_payment_url text
)
returns void
language plpgsql
as $$
declare
  current_payment lead_payments%rowtype;
begin
  select * into current_payment
  from lead_payments
  where id = target_payment_id and owner_id = current_owner_id
  for update;

  if not found then raise exception 'Payment request not found'; end if;
  if current_payment.status = 'open' then return; end if;
  if current_payment.status <> 'creating' then
    raise exception 'Payment request cannot be finalized';
  end if;
  if provider_payment_url is null then raise exception 'Stripe response is incomplete'; end if;
  if (current_payment.method = 'invoice' and (provider_customer_id is null or provider_invoice_id is null or provider_payment_link_id is not null))
     or (current_payment.method = 'payment_link' and (provider_payment_link_id is null or provider_invoice_id is not null)) then
    raise exception 'Stripe response does not match payment method';
  end if;

  update lead_payments set
    status = 'open',
    stripe_customer_id = provider_customer_id,
    stripe_invoice_id = provider_invoice_id,
    stripe_payment_link_id = provider_payment_link_id,
    payment_url = provider_payment_url
  where id = current_payment.id;
end;
$$;

create or replace function record_stripe_payment_paid(
  provider_event_id text,
  provider_event_type text,
  target_payment_id uuid,
  paid_amount_minor bigint,
  paid_currency_code text,
  provider_customer_id text,
  provider_invoice_id text,
  provider_payment_link_id text,
  provider_checkout_session_id text,
  provider_payment_intent_id text,
  provider_paid_at timestamptz
)
returns uuid
language plpgsql
as $$
declare
  inserted_event_id text;
  current_payment lead_payments%rowtype;
  current_lead leads%rowtype;
  launch_project_id uuid;
begin
  insert into stripe_webhook_events (event_id, event_type, payment_id)
  values (provider_event_id, provider_event_type, target_payment_id)
  on conflict (event_id) do nothing
  returning event_id into inserted_event_id;

  if inserted_event_id is null then
    select project_id into launch_project_id
    from leads
    where id = (select lead_id from lead_payments where id = target_payment_id);
    return launch_project_id;
  end if;

  select * into current_payment
  from lead_payments
  where id = target_payment_id
  for update;

  if not found then raise exception 'Payment request not found'; end if;
  if current_payment.amount_minor <> paid_amount_minor
     or lower(current_payment.currency_code) <> lower(paid_currency_code) then
    raise exception 'Stripe payment amount or currency does not match the approved request';
  end if;
  if provider_customer_id is null then raise exception 'Stripe customer is missing from paid event'; end if;
  if current_payment.method = 'invoice'
     and current_payment.stripe_invoice_id is distinct from provider_invoice_id then
    raise exception 'Stripe invoice does not match the approved request';
  end if;
  if current_payment.method = 'payment_link'
     and current_payment.stripe_payment_link_id is distinct from provider_payment_link_id then
    raise exception 'Stripe Payment Link does not match the approved request';
  end if;

  select * into current_lead from leads where id = current_payment.lead_id for update;
  if not found or current_lead.owner_id <> current_payment.owner_id then
    raise exception 'Lead ownership does not match payment request';
  end if;
  if current_lead.proposal_package is null then
    raise exception 'A proposed package is required before payment conversion';
  end if;

  launch_project_id := current_lead.project_id;
  if launch_project_id is null then
    insert into projects (
      owner_id, name, country_code, package, current_stage, health, coordinator_name
    ) values (
      current_lead.owner_id,
      trim(current_lead.name) || ' Japan Launch',
      'JP',
      current_lead.proposal_package,
      'client',
      'on_track',
      current_lead.coordinator_name
    ) returning id into launch_project_id;
  end if;

  update lead_payments set
    status = 'paid',
    stripe_customer_id = coalesce(stripe_customer_id, provider_customer_id),
    stripe_invoice_id = coalesce(stripe_invoice_id, provider_invoice_id),
    stripe_payment_link_id = coalesce(stripe_payment_link_id, provider_payment_link_id),
    stripe_checkout_session_id = provider_checkout_session_id,
    stripe_payment_intent_id = provider_payment_intent_id,
    paid_at = provider_paid_at
  where id = current_payment.id;

  update leads set
    project_id = launch_project_id,
    status = 'paid',
    stripe_customer_id = coalesce(stripe_customer_id, provider_customer_id),
    proposal_outcome = 'accepted'
  where id = current_lead.id;

  return launch_project_id;
end;
$$;
