-- Create notes table
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.uploads(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  title text,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notes enable row level security;

create policy "Users can read their own notes" on public.notes
  for select using (auth.uid() = user_id);

create policy "Users can create notes" on public.notes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own notes" on public.notes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own notes" on public.notes
  for delete using (auth.uid() = user_id);

create index notes_upload_id_idx on public.notes(upload_id);
create index notes_user_id_idx on public.notes(user_id);
