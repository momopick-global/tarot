# `tarot_results` — Supabase 연동 메모

## 테이블 컬럼 (앱 기준)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | `bigint` (PK) | 자동 증가 |
| `user_id` | `uuid` | `auth.users.id` 와 동일해야 함 |
| `card_name` | `text` | 예: `한글명 (English)` |
| `master_name` | `text` | 마스터 표시 이름 |
| `card_image` | `text` | `/images/cards/...` 경로 |
| `interpretation` | `text` | 요약·부문별·조언 등 전체 텍스트 |
| `created_at` | `timestamptz` | 기본값 `now()` 권장 |

## RLS 적용

프로젝트 루트의 `supabase/migrations/20260322000000_tarot_results_rls.sql` 내용을 **Supabase SQL Editor**에서 실행하세요.

- `interpretation` 컬럼이 없으면 추가합니다.
- **SELECT / INSERT / DELETE / UPDATE** 는 모두 `auth.uid() = user_id` 인 행에만 허용됩니다.
- 정책 대상 역할은 `authenticated` 입니다. (로그인한 사용자 JWT)

## 확인 체크리스트

1. **Authentication** 에서 OAuth/이메일 로그인이 동작하는지
2. Table Editor → `tarot_results` → **RLS enabled** 인지
3. 앱의 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` 가 배포 환경(예: Cloudflare)에도 설정되어 있는지
4. `permission denied` 가 나오면 Table **Privileges** 에서 `authenticated` 에 적절한 권한이 있는지 대시보드에서 확인

## 앱 동작

- **결과 페이지**: 로그인 상태에서 페이지 진입 시 1회 `insert` (같은 브라우저 세션·같은 마스터·같은 카드는 `sessionStorage` 로 중복 저장 완화).
- **마이페이지**: 로그인 유저의 행만 `select`, 삭제 버튼은 `delete` by `id` (RLS로 본인 것만 삭제 가능).
