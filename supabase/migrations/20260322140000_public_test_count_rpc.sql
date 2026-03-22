-- 메인 등에서 "테스트 참여 인원" 표시용 (RLS 우회는 함수 내부만, 외부는 RPC만 노출)
create or replace function public.get_public_test_participant_count()
returns bigint
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(count(distinct user_id), 0)::bigint
  from public.tarot_results;
$$;

comment on function public.get_public_test_participant_count() is
  'tarot_results에 한 건 이상 저장된 서로 다른 user_id 수 (anon 호출 가능)';

revoke all on function public.get_public_test_participant_count() from public;
grant execute on function public.get_public_test_participant_count() to anon, authenticated;
