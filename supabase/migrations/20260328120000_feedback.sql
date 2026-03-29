-- 공개 의견 보내기 (정적 호스팅에서 API 라우트 없이 Supabase로 저장)
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  contact text,
  content text not null,
  need_response boolean not null default false,
  captcha_score double precision,
  created_at timestamptz not null default now()
);

comment on table public.feedback is '서비스 개선 의견(비회원/회원 공통, RLS로 insert만 공개)';

alter table public.feedback enable row level security;

drop policy if exists "feedback_insert_public" on public.feedback;

-- 비회원: user_id 는 null 만. 회원: 본인 uid 만 허용 (타인 사칭 방지)
create policy "feedback_insert_public"
  on public.feedback
  for insert
  to anon, authenticated
  with check (
    user_id is null
    or (auth.uid() is not null and user_id = auth.uid())
  );
