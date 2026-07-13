create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  interests text[] not null default '{}',
  status text not null default 'active' check (status in ('active', 'unsubscribed')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint subscribers_email_normalized check (email = lower(email))
);

create unique index subscribers_email_key on subscribers (email);
