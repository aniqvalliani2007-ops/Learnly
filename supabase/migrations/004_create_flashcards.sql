-- Create flashcards table
create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.uploads(id) on delete cascade,
  question text not null,
  answer text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.flashcards enable row level security;

create policy "Users can read flashcards of their uploads" on public.flashcards
  for select using (
    upload_id in (
      select id from public.uploads where user_id = auth.uid()
    )
  );

create index flashcards_upload_id_idx on public.flashcards(upload_id);
