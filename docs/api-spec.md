# API 스펙 가이드

유어타로 서비스의 RESTful API 엔드포인트를 정의한 문서입니다. 1차 릴리스 기준으로 결과 조회/저장, 의견·제휴 문의 제출, 계정 탈퇴 요청, reCAPTCHA 검증 등을 다룹니다.

## 일반 규칙

- API는 `/api/` 경로 아래에 위치합니다.
- 문서 기준 구현 방식은 Next.js API Routes 또는 App Router Route Handler를 사용할 수 있습니다.
- 모든 요청과 응답은 JSON 형식입니다. `Content-Type: application/json` 헤더를 사용합니다.
- 클라이언트에서 `token` (reCAPTCHA v3 토큰)을 보내는 경우, 서버는 구글 reCAPTCHA API를 호출하여 유효성을 검증합니다. 검증 실패 시 400 오류를 반환합니다.
- 성공 응답은 `200 OK` 상태 코드와 함께 `{"success": true}` 형태를 기본으로 합니다. 실패 응답은 적절한 상태 코드와 함께 `{"success": false, "message": "..."}`를 반환합니다.

> 현재 `yourtarot2` 코드에는 실제 API 핸들러 파일(`src/app/api/**/route.ts` 또는 `src/pages/api/**`)이 아직 구현되지 않았습니다. 본 문서는 구현 목표 스펙입니다.

## 엔드포인트 목록

### 1. POST `/api/feedback`

사용자로부터 서비스 이용 중 느낀 의견이나 제안을 제출받습니다.

**요청 바디**

```json
{
  "contact":"string",         // (선택) 회신 받을 연락처. 예: "user@example.com"
  "content":"string",         // (필수) 의견/제안 내용
  "needResponse": true,         // (필수) 답변이 필요한 경우 true
  "token":"string"            // (필수) reCAPTCHA v3 토큰
}
```

**응답**

- 성공: `200 OK`, `{ "success": true }`
- 실패: `400 Bad Request` 또는 기타 적절한 상태 코드와 메시지

**동작**

1. 서버는 요청 바디의 `token`을 `recaptcha.ts` 모듈을 통해 검증합니다.
2. reCAPTCHA 검증 점수가 임계값(예: 0.5) 이상이면, `contact`, `content`, `needResponse`, `captchaScore`를 `feedback` 테이블에 저장합니다.
3. 필요 시 관리자에게 이메일/슬랙 알림을 보낼 수 있습니다.

### 2. POST `/api/partner`

브랜드, 콘텐츠, 광고 제휴 등을 문의하는 폼 제출을 처리합니다.

**요청 바디**

```json
{
  "companyName":"string",      // (필수) 회사/브랜드 이름
  "contactPerson":"string",    // (필수) 담당자 이름
  "email":"string",            // (필수) 담당자 이메일
  "website":"string",          // (선택) 회사/서비스 홈페이지 URL
  "partnershipType":"string",  // (필수) 제휴 유형: content, brand, advertisement, etc.
  "note":"string",             // (선택) 추가 문의 내용
  "token":"string"            // (필수) reCAPTCHA v3 토큰
}
```

**응답**

- 성공: `200 OK`, `{ "success": true }`
- 실패: `400 Bad Request` 또는 기타 적절한 상태 코드와 메시지

**동작**

1. `token` 검증 후, 문의 정보를 `partner_inquiries` 테이블에 저장합니다.
2. 필요한 경우 제휴 담당자에게 이메일이나 슬랙 알림을 전송합니다.

### 3. POST `/api/withdraw`

사용자의 계정 삭제(탈퇴)를 요청합니다. 탈퇴 시 사용자 데이터는 즉시 파기하고, 결제 이력은 법적 보존 기간 동안 `payment_history` 테이블에 남깁니다.

**요청 바디**

```json
{
  "userId":"string",      // (필수) 탈퇴할 사용자 ID (인증된 사용자만 접근 가능)
  "confirm":true,          // (필수) 사용자가 탈퇴에 동의했음을 확인하는 플래그
  "token":"string"       // (필수) reCAPTCHA v3 토큰
}
```

**응답**

- 성공: `200 OK`, `{ "success": true }`
- 실패: `400 Bad Request`, `401 Unauthorized` 등

**동작**

1. reCAPTCHA 검증 후 `confirm` 값이 true인지 확인합니다.
2. 사용자 계정 정보를 `users`에서 삭제하고, 필요 시 관련 데이터(예: `results`, `lupi_transactions`)도 함께 삭제하거나 익명화합니다.
3. `withdrawals` 테이블에 탈퇴 로그를 저장합니다.
4. 탈퇴 완료 후 인증 세션을 무효화합니다.

### 4. POST `/api/recaptcha`

클라이언트가 reCAPTCHA v3 토큰을 별도로 검증하기 위해 사용할 수 있는 엔드포인트입니다. 대부분 내부 모듈에서 사용되지만, 프론트엔드에서 스팸 여부를 미리 확인할 때 사용할 수 있습니다.

**요청 바디**

```json
{
  "token":"string"   // (필수) reCAPTCHA v3 토큰
}
```

**응답**

```json
{
  "success":true,
  "score":0.92
}
```

**동작**

1. 서버는 Google reCAPTCHA API에 토큰을 전송하여 검증합니다.
2. `success`가 true이면, `score`를 반환합니다. 스팸이 의심스러운 경우 (0.5 미만)에는 클라이언트 측에서 추가 검증을 요청할 수 있습니다.

### 5. GET `/api/results`

특정 카드와 마스터 조합에 대한 결과를 조회합니다. 1차 오픈에서는 정적 JSON 또는 로컬 데이터에서 해석을 제공하지만, 마스터마다 **고유한 카드 이미지(덱)**를 사용합니다. API 구조를 미리 정의해 두어 추후 DB/API로 전환하기 쉽도록 합니다.

**쿼리 파라미터**

- `cardId` (`integer`, 필수): 카드 ID.
- `masterSlug` (`string`, 필수): 마스터 slug.

**응답**

```json
{
  "success":true,
  "result": {
    "summary":"오늘의 운세 요약",
    "love":"애정 영역 해석",
    "career":"일/학업 영역 해석",
    "money":"금전 영역 해석",
    "advice":"조언 문구",
    "keywords": ["키워드1","키워드2"]
    ,
    "imagePath":"string"
  }
}
```

**동작**

1. 서버는 `cards` 테이블에서 카드 해석을, `masters` 테이블 및 `card_decks`에서 마스터/덱 정보를 조회합니다.
2. `card_images` 테이블을 조회하여 `masterSlug`에 해당하는 덱의 `image_path`를 가져옵니다. 예: `/public/images/cards/cassian/00.png`.
3. 사전에 정의된 해석(또는 AI API를 통한 동적 생성)과 이미지 경로를 조합하여 응답합니다. 응답 객체에는 `imagePath` 필드가 포함됩니다.

### 6. POST `/api/results`

사용자가 점괘를 본 결과를 저장합니다. 비회원도 저장할 수 있으나, 사용자 ID가 없는 경우 익명 결과로 저장됩니다.

**요청 바디**

```json
{
  "userId":"string",      // (선택) 결과를 저장할 사용자 ID
  "cardId":12,             // (필수) 카드 ID
  "masterSlug":"cassian", // (필수) 마스터 slug
  "summary":"string",      // (필수) 결과 요약
  "love":"string",         // (필수) 애정 해석
  "career":"string",       // (필수) 일/학업 해석
  "money":"string",        // (필수) 금전 해석
  "advice":"string",       // (필수) 조언 문구
  "keywords": ["string"]    // (선택) 키워드 목록
}
```

**응답**

- 성공: `200 OK`, `{ "success": true, "id": "uuid" }`
- 실패: `400 Bad Request` 등

**동작**

1. 요청 바디를 검증합니다.
2. `results` 테이블에 새 결과를 저장합니다.
3. 저장된 결과 ID를 반환합니다.

### 7. 보류 중인 엔드포인트

아래 엔드포인트는 2차, 3차 업데이트에서 사용할 수 있도록 미리 설계합니다. 현재 구현하지 않지만 API 스펙 문서에 정의해 두어 백엔드와 프론트엔드가 동일한 기준을 참조하도록 합니다.

- `POST /api/payment` - 유료 포인트 충전 요청을 처리합니다. PG사 토큰을 받아 결제 완료 후 루피 포인트를 충전합니다.
- `GET /api/lupi/balance` - 사용자의 현재 루피 잔액을 조회합니다.
- `POST /api/lupi/earn` - 공유, 출석, 광고 시청 등으로 루피를 적립합니다.
- `POST /api/lupi/spend` - 추가 타로 보기 등으로 루피를 차감합니다.

## 인증 및 보안

- 인증된 사용자만 사용할 수 있는 엔드포인트(예: `/api/withdraw`, `/api/results` 저장)는 서버 측에서 사용자 인증을 검사해야 합니다. Firebase Auth 또는 Supabase Auth의 JWT를 검증하는 미들웨어를 구현합니다.
- reCAPTCHA v3는 봇을 방지하기 위한 추가 검증 단계입니다. 모든 의견/제휴/탈퇴 요청에 대해 토큰을 검증하고, 스코어가 낮을 경우 서버에서 추가 확인(예: 이메일 확인)을 요구할 수 있습니다.

## 구현 상태 체크리스트 (yourtarot2)

### API 라우트 구현

- [ ] `POST /api/feedback`
- [ ] `POST /api/partner`
- [ ] `POST /api/withdraw`
- [ ] `POST /api/recaptcha`
- [ ] `GET /api/results`
- [ ] `POST /api/results`

### 서버/검증 모듈

- [ ] reCAPTCHA 서버 검증 로직(실 API 연동)
- [ ] 요청 스키마 검증(필수 필드/타입)
- [ ] 공통 에러 응답 포맷 적용
- [ ] 인증 미들웨어(JWT/Firebase/Supabase) 적용

### 데이터 저장소 연동

- [ ] `feedback` 저장
- [ ] `partner_inquiries` 저장
- [ ] `withdrawals` 저장
- [ ] `results` 저장/조회

### 프론트엔드 연동

- [x] API 호출 래퍼 기본 골격(`src/lib/apiClient.ts`)
- [ ] 폼 페이지(`feedback`, `partner`, `withdraw`) 실제 API 연결
- [ ] 결과 페이지의 `/api/results` 실데이터 연결

---

이 API 스펙은 유어타로 1차 오픈의 기본 기능을 위한 것입니다. 실제 구현 시 로깅, 에러 처리, 권한 관리, 데이터 검증 등을 추가하여 안정성을 높입니다. 2차 이후 업데이트에서는 결제·포인트 API를 확장하고, 다국어 지원을 위한 파라미터나 헤더를 추가할 수 있습니다.

## 관련 문서

- `README.md`
- `docs/data-model.md`
- `docs/folder-structure.md`
- `docs/production-checklist.md`

