-- Create progress table
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  uploads_count integer default 0,
  study_streak integer default 0,
  total_study_time integer default 0,
  last_studied_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.progress enable row level security;

create policy "Users can read their own progress" on public.progress
  for select using (auth.uid() = user_id);

create index progress_user_id_idx on public.progress(user_id);
