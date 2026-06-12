-- Create summaries table
create table if not exists public.summaries (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.uploads(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.summaries enable row level security;

create policy "Users can read summaries of their uploads" on public.summaries
  for select using (
    upload_id in (
      select id from public.uploads where user_id = auth.uid()
    )
  );

create index summaries_upload_id_idx on public.summaries(upload_id);
