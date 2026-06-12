-- Create uploads table
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  file_name text not null,
  file_size bigint not null,
  storage_path text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.uploads enable row level security;

create policy "Users can read their own uploads" on public.uploads
  for select using (auth.uid() = user_id);

create policy "Users can insert their own uploads" on public.uploads
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own uploads" on public.uploads
  for update using (auth.uid() = user_id);

create policy "Users can delete their own uploads" on public.uploads
  for delete using (auth.uid() = user_id);

create index uploads_user_id_idx on public.uploads(user_id);
create index uploads_created_at_idx on public.uploads(created_at);
