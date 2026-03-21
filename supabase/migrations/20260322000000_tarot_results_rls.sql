-- tarot_results: 해석 컬럼(없을 때만 추가) + created_at 기본값 + RLS
-- Supabase SQL Editor에서 한 번에 실행해도 됩니다.

alter table public.tarot_results
  add column if not exists interpretation text;

alter table public.tarot_results
  alter column created_at set default now();

alter table public.tarot_results enable row level security;

-- 기존 정책이 있으면 이름 충돌 방지용으로 제거 후 재생성 (선택)
drop policy if exists "tarot_results_select_own" on public.tarot_results;
drop policy if exists "tarot_results_insert_own" on public.tarot_results;
drop policy if exists "tarot_results_delete_own" on public.tarot_results;
drop policy if exists "tarot_results_update_own" on public.tarot_results;

create policy "tarot_results_select_own"
  on public.tarot_results
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "tarot_results_insert_own"
  on public.tarot_results
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "tarot_results_delete_own"
  on public.tarot_results
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- 선택: 행 수정이 필요하면 사용
create policy "tarot_results_update_own"
  on public.tarot_results
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
