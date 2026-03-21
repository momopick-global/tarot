-- =============================================================================
-- 1) 기존 중복 행 정리 (동일 user + 동일 카드 스냅샷 → id 가장 작은 행만 유지)
--    실행 전 Table 백업 권장.
-- =============================================================================
DELETE FROM public.tarot_results a
  USING public.tarot_results b
  WHERE a.id > b.id
    AND a.user_id = b.user_id
    AND a.master_name = b.master_name
    AND a.card_name = b.card_name
    AND a.card_image = b.card_image;

-- =============================================================================
-- 2) reading_id 컬럼 + 기존 행 백필 + NOT NULL + (user_id, reading_id) 유니크
--    앱에서는 reading_id = 'v1:{masterId}:{cardIndex}' 로 upsert 합니다.
--    기존 행은 충돌 없이 'migrated:{id}' 로 채웁니다.
-- =============================================================================
alter table public.tarot_results
  add column if not exists reading_id text;

update public.tarot_results
set reading_id = 'migrated:' || id::text
where reading_id is null
   or trim(reading_id) = '';

alter table public.tarot_results
  alter column reading_id set not null;

drop index if exists tarot_results_user_reading_id_key;

create unique index tarot_results_user_reading_id_key
  on public.tarot_results (user_id, reading_id);

comment on column public.tarot_results.reading_id is
  '앱에서 부여하는 리딩 단위 키. 예: v1:cassian:5 — (user_id, reading_id) 유니크로 upsert';
