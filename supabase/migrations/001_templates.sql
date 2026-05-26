-- Run this in your Supabase project's SQL Editor
-- Dashboard → SQL Editor → New query → paste and run

create table if not exists public.templates (
  id text primary key default 'default',
  company text not null default 'Your Company',
  tagline text default '',
  elevator_pitch text default '',
  value_props jsonb default '[]'::jsonb,
  case_studies jsonb default '[]'::jsonb,
  speaking_points jsonb default '[]'::jsonb,
  stats jsonb default '[]'::jsonb,
  cta text default '',
  primary_color text default '#4f46e5',
  updated_at timestamptz default now()
);

-- Row-level security
alter table public.templates enable row level security;

-- Anyone can read (needed for the frontend to load branding without auth)
create policy "Public read" on public.templates
  for select using (true);

-- Only service role can write (used by the admin API route)
create policy "Service role write" on public.templates
  for all using (auth.role() = 'service_role');
