-- 공개 제휴 문의 저장 (정적 호스팅에서 API 라우트 없이 Supabase로 저장)
create table if not exists public.partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_person text not null,
  email text not null,
  website text,
  partnership_type text not null,
  notes text,
  captcha_score double precision,
  created_at timestamptz not null default now()
);

comment on table public.partner_inquiries is '제휴 문의(비회원/회원 공통, RLS로 insert만 공개)';

alter table public.partner_inquiries enable row level security;

drop policy if exists "partner_inquiries_insert_public" on public.partner_inquiries;

create policy "partner_inquiries_insert_public"
  on public.partner_inquiries
  for insert
  to anon, authenticated
  with check (true);
