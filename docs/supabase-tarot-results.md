# `tarot_results` Supabase 연동 가이드

결과 저장 기능에서 사용하는 `tarot_results` 테이블의 스키마, 마이그레이션 순서, 중복 방지 정책을 정리한 문서입니다.

## 테이블 컬럼 (앱 기준)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `bigint` (PK) | 자동 증가 |
| `user_id` | `uuid` | `auth.users.id` 와 동일해야 함 |
| `reading_id` | `text` NOT NULL | 앱 부여 키. 예: `v1:cassian:5` — **`(user_id, reading_id)` 유니크** 로 upsert |
| `card_name` | `text` | 예: `한글명 (English)` |
| `master_name` | `text` | 마스터 표시 이름 |
| `card_image` | `text` | `/images/cards/...` 경로 |
| `interpretation` | `text` | 요약·부문별·조언 등 전체 텍스트 |
| `created_at` | `timestamptz` | 기본값 `now()` 권장 |

## 마이그레이션 순서

1. **`supabase/migrations/20260322000000_tarot_results_rls.sql`** — RLS·`interpretation` 등 (아직이면)
2. **`supabase/migrations/20260322120000_tarot_results_reading_id.sql`** — 중복 삭제 → `reading_id` 추가·백필 → 유니크 인덱스

기존 행은 `reading_id = migrated:{id}` 로 채워져 새 앱 키(`v1:...`)와 충돌하지 않습니다.

## 결과 저장 정책 (의도)

- **해석 보기만** 할 때는 DB에 쓰지 않습니다.
- **「저장하기」를 눌렀을 때만** `tarot_results`에 `upsert` 합니다.
- 비로그인 시 저장은 하지 않고, 안내 토스트 후 로그인 페이지로 이동할 수 있습니다.

## 중복 방지

1. **버튼 연타 / Strict Mode** — `requestTarotResultCloudSave` 가 같은 `storageKey`에 대해 **한 번의 upsert 요청**만 나가도록 Promise를 공유합니다.
2. **sessionStorage** — **저장 성공 직후에만** `1` 표시(같은 탭에서 버튼을 「저장됨」으로 맞춤). `pending` / 실패 시 정리. **페이지 진입 시 자동 저장 없음.**
3. **DB** — `(user_id, reading_id)` 유니크 + `upsert` 로 동일 카드(동일 키)는 행이 늘지 않고 갱신됩니다.
4. **기존 중복 정리** — 마이그레이션 파일 상단 `DELETE ... USING` (필요 시).

`ON CONFLICT DO NOTHING` 만 쓰려면 PostgREST 대신 RPC/Edge Function으로 직접 SQL을 쓰면 됩니다. 현재 앱은 **갱신 upsert**를 사용합니다.

## RLS

- **SELECT / INSERT / DELETE / UPDATE** 모두 `auth.uid() = user_id` (`authenticated`).
- **upsert**는 insert + update 이므로 **UPDATE** 정책이 있어야 합니다.

## 앱 동작

- **결과 페이지**: **저장하기** 클릭 시에만 Supabase `upsert`. 성공 토스트 **「마이페이지에 저장했어요」** → 버튼 **저장됨**.
- **마이페이지**: DB에 저장된 기록만 표시(저장 버튼으로 적재된 행).

## 관련 문서

- `README.md`
- `docs/data-model.md`
- `docs/production-checklist.md`
