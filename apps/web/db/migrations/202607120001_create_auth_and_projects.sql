create extension if not exists pgcrypto;

create table "user" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  "emailVerified" boolean not null default false,
  image text,
  "createdAt" timestamptz not null default timezone('utc', now()),
  "updatedAt" timestamptz not null default timezone('utc', now())
);

create table "session" (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null references "user"(id) on delete cascade,
  token text not null unique,
  "expiresAt" timestamptz not null,
  "ipAddress" text,
  "userAgent" text,
  "createdAt" timestamptz not null default timezone('utc', now()),
  "updatedAt" timestamptz not null default timezone('utc', now())
);

create index session_user_id_idx on "session" ("userId");

create table account (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null references "user"(id) on delete cascade,
  "accountId" text not null,
  "providerId" text not null,
  "accessToken" text,
  "refreshToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  "idToken" text,
  password text,
  "createdAt" timestamptz not null default timezone('utc', now()),
  "updatedAt" timestamptz not null default timezone('utc', now()),
  unique ("providerId", "accountId")
);

create index account_user_id_idx on account ("userId");

create table verification (
  id uuid primary key default gen_random_uuid(),
  identifier text not null,
  value text not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz not null default timezone('utc', now()),
  "updatedAt" timestamptz not null default timezone('utc', now())
);

create index verification_identifier_idx on verification (identifier);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references "user"(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 120),
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  package text not null check (package in ('diy_blueprint', 'guided_launch', 'concierge', 'enterprise')),
  current_stage text not null check (current_stage in ('prospect', 'client', 'planning', 'formation', 'registration', 'tax', 'banking', 'operational', 'completed')),
  health text not null check (health in ('on_track', 'at_risk', 'blocked', 'paused')),
  estimated_completion date,
  coordinator_name text check (coordinator_name is null or char_length(trim(coordinator_name)) between 2 and 120),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  archived_at timestamptz
);

create index projects_owner_updated_idx on projects (owner_id, updated_at desc);

create trigger projects_set_updated_at
before update on projects
for each row execute function set_updated_at();
