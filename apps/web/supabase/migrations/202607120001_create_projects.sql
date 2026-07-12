create extension if not exists pgcrypto;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 2 and 120),
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  package text not null check (package in ('diy_blueprint', 'guided_launch', 'concierge', 'enterprise')),
  current_stage text not null check (current_stage in ('prospect', 'client', 'planning', 'formation', 'registration', 'tax', 'banking', 'operational', 'completed')),
  health text not null check (health in ('on_track', 'at_risk', 'blocked', 'paused')),
  estimated_completion date,
  coordinator_name text check (coordinator_name is null or char_length(trim(coordinator_name)) between 2 and 120),
  archived_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.projects is 'Phase 1 Hajime project aggregate. Future domain records reference this stable project ID.';
comment on column public.projects.owner_id is 'Temporary Phase 1 ownership boundary. Migrate to workspace membership before multi-user collaboration.';
comment on column public.projects.coordinator_name is 'Display-only Phase 1 field. Migrate to a profile or membership reference before coordinator assignment workflows.';

create index projects_owner_active_updated_idx
  on public.projects (owner_id, archived_at, updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

alter table public.projects enable row level security;

create policy "Users can view their own projects"
on public.projects for select
to authenticated
using ((select auth.uid()) = owner_id);

create policy "Users can create their own projects"
on public.projects for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "Users can update their own projects"
on public.projects for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

revoke delete on table public.projects from authenticated;
