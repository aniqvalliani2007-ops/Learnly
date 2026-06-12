-- Create quizzes table
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  upload_id uuid not null references public.uploads(id) on delete cascade,
  questions jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.quizzes enable row level security;

create policy "Users can read quizzes of their uploads" on public.quizzes
  for select using (
    upload_id in (
      select id from public.uploads where user_id = auth.uid()
    )
  );

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question_id text not null,
  selected_answer text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index quizzes_upload_id_idx on public.quizzes(upload_id);
create index quiz_answers_quiz_id_idx on public.quiz_answers(quiz_id);
