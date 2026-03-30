-- tarot_results 기본 테이블 (신규 Supabase 프로젝트용)
-- 이후 20260322000000, 20260322120000 마이그레이션과 순서 호환

create table if not exists public.tarot_results (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  reading_id text,
  card_name text not null default '',
  master_name text not null default '',
  card_image text not null default '',
  interpretation text,
  created_at timestamptz not null default now()
);

comment on table public.tarot_results is '타로 결과 저장 (앱에서 저장하기 시 upsert)';

-- PostgREST 스키마 캐시·anon 키 요청과 호환 (실제 행 접근은 RLS로 제한)
grant all on table public.tarot_results to anon;
grant all on table public.tarot_results to authenticated;
grant all on table public.tarot_results to service_role;
