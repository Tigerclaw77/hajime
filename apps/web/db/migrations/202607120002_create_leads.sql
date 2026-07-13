create extension if not exists citext;

create table leads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references "user"(id) on delete cascade,
  project_id uuid unique references projects(id) on delete restrict,
  name text not null check (char_length(trim(name)) between 2 and 120),
  email citext not null check (char_length(trim(email::text)) between 3 and 320),
  country text not null check (char_length(trim(country)) between 2 and 100),
  business_type text not null check (char_length(trim(business_type)) between 2 and 160),
  source text not null check (source in ('referral', 'website', 'founder_network', 'partner', 'event', 'outbound', 'other')),
  status text not null default 'new' check (status in ('new', 'contacted', 'discovery_scheduled', 'proposal_sent', 'won', 'lost', 'archived')),
  notes text not null default '' check (char_length(notes) <= 5000),
  coordinator_name text check (coordinator_name is null or char_length(trim(coordinator_name)) between 2 and 120),
  discovery_meeting_date date,
  discovery_summary text not null default '' check (char_length(discovery_summary) <= 5000),
  discovery_key_concerns text not null default '' check (char_length(discovery_key_concerns) <= 5000),
  discovery_desired_timeline text not null default '' check (char_length(discovery_desired_timeline) <= 500),
  discovery_budget_estimate_minor bigint check (discovery_budget_estimate_minor is null or discovery_budget_estimate_minor >= 0),
  discovery_next_action text not null default '' check (char_length(discovery_next_action) <= 1000),
  proposal_sent_date date,
  proposal_package text check (proposal_package is null or proposal_package in ('diy_blueprint', 'guided_launch', 'concierge', 'enterprise')),
  proposal_expected_value_minor bigint check (proposal_expected_value_minor is null or proposal_expected_value_minor >= 0),
  proposal_expiration_date date,
  proposal_outcome text not null default 'open' check (proposal_outcome in ('open', 'accepted', 'declined', 'expired', 'superseded')),
  currency_code text not null default 'USD' check (currency_code = 'USD'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint won_leads_require_project check (status <> 'won' or project_id is not null),
  constraint linked_leads_remain_won_or_archived check (project_id is null or status in ('won', 'archived')),
  constraint proposal_expiration_after_sent check (
    proposal_sent_date is null
    or proposal_expiration_date is null
    or proposal_expiration_date >= proposal_sent_date
  )
);

create index leads_owner_status_updated_idx on leads (owner_id, status, updated_at desc);

create unique index leads_owner_email_active_idx
  on leads (owner_id, email)
  where status <> 'archived';

create trigger leads_set_updated_at
before update on leads
for each row execute function set_updated_at();

create or replace function convert_lead_to_project(
  current_owner_id uuid,
  target_lead_id uuid
)
returns uuid
language plpgsql
as $$
declare
  current_lead leads%rowtype;
  created_project_id uuid;
begin
  select * into current_lead
  from leads
  where id = target_lead_id and owner_id = current_owner_id
  for update;

  if not found then raise exception 'Lead not found'; end if;
  if current_lead.project_id is not null then return current_lead.project_id; end if;
  if current_lead.status in ('lost', 'archived') then
    raise exception 'Lead must be active before conversion';
  end if;
  if current_lead.proposal_package is null then
    raise exception 'A proposed package is required before conversion';
  end if;

  insert into projects (
    owner_id, name, country_code, package, current_stage, health, coordinator_name
  ) values (
    current_owner_id,
    trim(current_lead.name) || ' Japan Launch',
    'JP',
    current_lead.proposal_package,
    'client',
    'on_track',
    current_lead.coordinator_name
  ) returning id into created_project_id;

  update leads set
    project_id = created_project_id,
    status = 'won',
    proposal_outcome = 'accepted'
  where id = current_lead.id;

  return created_project_id;
end;
$$;
