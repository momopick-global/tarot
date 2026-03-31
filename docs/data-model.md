# 데이터 모델 가이드 (1차 오픈)

이 문서는 유어타로 서비스의 데이터 모델을 정의합니다. 초기 릴리스에서는 카드, 마스터, 사용자, 결과, 포인트(루피) 거래, 의견/제휴 문의 등을 관리합니다. 후속 업데이트(2차, 3차)에서는 결제 및 추가 언어 지원 등을 확장할 예정입니다.

## 개요

유어타로는 사용자에게 타로 카드를 뽑아 오늘의 메시지를 제공하고, 마스터(캐릭터) 별로 결과를 개인화합니다. 또한 사용자 피드백과 제휴 문의를 받고, 사용자의 루피 포인트를 적립/차감하는 기능을 지원합니다. 데이터를 효율적으로 저장하고 확장하기 위해 아래와 같이 테이블을 정의합니다. 초기에는 JSON 기반 데이터로 시작하지만, 운영 편의를 위해 Supabase나 Firebase로 이전할 수 있습니다.

## 테이블 정의

아래 각 항목은 테이블 이름과 필드 목록, 그리고 각 필드의 역할을 설명합니다. 필드는 간결히 설명하고, 세부 로직은 API 스펙 문서에서 다룹니다.

### Cards (`cards`)

유어타로에 포함된 78장의 타로 카드 정보를 저장합니다. 카드 번호는 0부터 77까지이며, 0은 The Fool에 해당합니다.

- **id** (`integer`): 카드 번호(0~77). 기본 키입니다.
- **name** (`string`): 카드 이름(한국어/영어). 예: `The Fool`, `0 광대`.
- **suit** (`string`): 카드의 계열. `major`, `wands`, `cups`, `swords`, `pentacles` 중 하나입니다.
- **keywords** (`string[]`): 카드의 핵심 키워드 목록. 예: `['새로운 시작', '순수함']`.
- **short_meaning** (`text`): 카드의 짧은 해석(1~2문장).
- **long_meaning** (`text`): 카드의 긴 해석(자세한 설명). 초기에 JSON 파일로 제공되며, 2차 업데이트에서 외부 API를 통해 동적으로 생성될 수 있습니다.
- **default_image_path** (`string`, 선택): 기본 카드 이미지 경로. 예: `cards/default/00_the_fool.png`. 마스터별 덱 이미지와 구분하기 위한 기본값입니다.
- **reversed** (`boolean`, 선택): 역방향(거꾸로 뽑힌 카드) 여부. 초기에는 사용하지 않지만 확장 시 사용할 수 있습니다.
- **created_at** (`timestamp`, 선택): 카드 정보 생성 시각. 데이터 관리용입니다.
- **updated_at** (`timestamp`, 선택): 카드 정보 수정 시각.

### Masters (`masters`)

9명의 타로 마스터 캐릭터 정보를 저장합니다. 각 마스터는 서로 다른 말투와 성향을 가집니다.

- **slug** (`string`): URL에서 사용하는 고유 식별자. 예: `cassian`.
- **name** (`string`): 표시될 마스터 이름.
- **profile_image** (`string`): `public/images/masters`에 저장된 프로필 이미지 경로.
- **tone** (`text`): 마스터의 말투, 성격, 상담 스타일을 서술한 짧은 설명.
- **recommendation** (`text`, 선택): 해당 마스터가 어떤 유형의 사용자에게 적합한지 설명합니다.
- **prohibitions** (`string[]`, 선택): 상담 시 사용하지 않는 표현이나 금지어 목록.
- **primary_color** (`string`, 선택): 마스터에 매핑된 대표 색상(hex 코드). UI에 포인트 색상으로 활용합니다.
- **created_at** (`timestamp`, 선택)
- **updated_at** (`timestamp`, 선택)

### Card Decks (`card_decks`)

9명의 마스터는 각각 고유한 카드 세트를 사용합니다. 이 테이블은 덱 자체의 메타데이터를 저장합니다. 덱의 ID를 기준으로 카드 이미지와 마스터를 연결합니다.

- **id** (`uuid`): 덱 고유 ID. 기본 키입니다.
- **master_slug** (`string`): 덱을 사용하는 마스터의 slug(`masters.slug` 참조). 각 마스터 당 하나의 덱을 갖습니다.
- **name** (`string`): 덱 이름. 예: `Cassian's Deck`.
- **description** (`text`, 선택): 덱의 스타일과 콘셉트를 설명합니다. 예: "몽환적이고 따뜻한 그림체".
- **primary_color** (`string`, 선택): 덱의 주요 색상(hex 코드). UI 테마에 반영할 때 사용합니다.
- **accent_color** (`string`, 선택): 포인트 색상. 덱이 가진 개성을 표현합니다.
- **created_at** (`timestamp`)
- **updated_at** (`timestamp`)

### Card Images (`card_images`)

카드 의미는 `cards` 테이블에서 공통적으로 관리되지만, 덱마다 다른 그림을 사용합니다. 이 테이블은 각 덱과 카드 번호에 대응하는 이미지 파일 경로를 저장합니다.

- **card_id** (`integer`): 카드 ID(`cards.id` 참조).
- **deck_id** (`uuid`): 덱 ID(`card_decks.id` 참조).
- **image_path** (`string`): 카드 이미지 파일 경로. 예: `cards/cassian/00.png` 또는 `cards/luna/00.png`.
- **created_at** (`timestamp`)
- **updated_at** (`timestamp`)

> **폴더 구조 예시**: 9개 덱의 이미지는 `/public/images/cards/{deck_slug}/{card_id}.png` 형태로 저장합니다. 예를 들어 카시안(Cassian) 마스터의 0번 카드 이미지는 `public/images/cards/cassian/00.png`입니다.
>

### Users (`users`)

로그인한 사용자의 계정을 저장합니다. Firebase Authentication과 연동하거나 Supabase 인증을 사용할 수 있습니다. 탈퇴 시 데이터는 즉시 삭제하되, 결제 이력은 별도의 테이블에 법정 기간 동안 저장합니다.

- **id** (`string` or `uuid`): 사용자의 고유 식별자. Firebase UID나 Supabase UUID를 저장합니다.
- **email** (`string`, 선택): 이메일 주소. 소셜 로그인 공급자에 따라 비어 있을 수 있습니다.
- **display_name** (`string`, 선택): 사용자 표시 이름.
- **photo_url** (`string`, 선택): 프로필 이미지 URL.
- **provider** (`string`): 로그인 공급자(`google`, `kakao`, `apple`, `facebook` 등).
- **lupi_balance** (`integer`): 사용자가 보유한 루피 포인트 잔액. 초기에는 무상 포인트만 적립합니다.
- **preferred_master** (`string`, 선택): 사용자가 즐겨찾기로 선택한 마스터의 slug.
- **joined_at** (`timestamp`): 가입 시각.
- **last_active_at** (`timestamp`): 최근 활동 시각.

### Results (`results`)

사용자가 카드를 뽑고 마스터를 선택한 결과를 기록합니다. 비회원도 사용 가능하므로 `user_id`는 선택 필드입니다. 결과 데이터를 저장함으로써 사용자는 지난 결과를 마이페이지에서 다시 볼 수 있습니다.

- **id** (`uuid`): 결과 고유 ID.
- **user_id** (`uuid`, 선택): `users.id`를 참조합니다. 비회원의 경우 `null`입니다.
- **card_id** (`integer`): 뽑은 카드 ID(`cards.id` 참조).
- **master_slug** (`string`): 선택한 마스터 slug(`masters.slug` 참조).
- **summary** (`text`): 결과 요약(오늘의 운세 요약).
- **love** (`text`): 애정/관계 영역 해석.
- **career** (`text`): 일/학업/재능 영역 해석.
- **money** (`text`): 금전/재정 영역 해석.
- **advice** (`text`): 오늘의 조언.
- **keywords** (`string[]`): 핵심 키워드 목록.
- **created_at** (`timestamp`): 결과 생성 시각.
- **updated_at** (`timestamp`)

### Lupi Transactions (`lupi_transactions`)

루피 포인트가 적립되거나 차감될 때의 기록을 저장합니다. 1차 오픈에서는 무상 포인트(출석, 공유, 광고 시청)에 대한 적립만 사용하며, 결제 도입 이후에는 유료 충전 기록도 추가됩니다.

- **id** (`uuid`): 거래 ID.
- **user_id** (`uuid`): 포인트를 증감한 사용자(`users.id`).
- **amount** (`integer`): 포인트 증감량. 적립은 양수, 차감은 음수 값입니다.
- **type** (`string`): 적립/차감 종류. 예: `signup_bonus`, `daily_bonus`, `ad_reward`, `share_reward`, `tarot_draw` 등.
- **description** (`string`, 선택): 상세 설명.
- **created_at** (`timestamp`): 기록 생성 시각.

### Feedback (`feedback`)

사용자가 "의견 받아요"를 통해 보내는 피드백을 저장합니다. reCAPTCHA v3 점수와 함께 저장하여 스팸 여부를 판단할 수 있습니다.

- **id** (`uuid`): 피드백 ID.
- **user_id** (`uuid`, 선택): 로그인한 사용자의 ID. 비회원은 `null`입니다.
- **contact** (`string`, 선택): 연락받을 연락처(이메일/전화번호).
- **content** (`text`): 의견/건의 내용.
- **need_response** (`boolean`): 답장이 필요한지 여부.
- **captcha_score** (`float`): reCAPTCHA v3 검증 결과 점수(0.0~1.0).
- **created_at** (`timestamp`): 제출 시각.

### Partner Inquiries (`partner_inquiries`)

제휴 문의 페이지에서 제출된 정보를 저장합니다.

- **id** (`uuid`): 문의 ID.
- **company_name** (`string`): 회사/브랜드 이름.
- **contact_person** (`string`): 담당자 이름.
- **email** (`string`): 담당자 이메일 주소.
- **website** (`string`, 선택): 회사/서비스 웹사이트.
- **partnership_type** (`string`): 제휴 유형. 예: `content`, `brand`, `advertisement`, `collaboration` 등.
- **notes** (`text`, 선택): 추가 문의 사항.
- **captcha_score** (`float`): reCAPTCHA v3 점수.
- **created_at** (`timestamp`): 제출 시각.

### Withdrawals (`withdrawals`)

계정 탈퇴 요청을 기록합니다. 사용자가 탈퇴하면 `users` 데이터는 즉시 삭제되지만, 결제 이력(추후 도입 시)은 `payment_history`에 남깁니다. 탈퇴 로그는 법적 보관 의무를 위해 간단히 남깁니다.

- **id** (`uuid`): 탈퇴 기록 ID.
- **user_id** (`uuid`): 탈퇴한 사용자 ID.
- **requested_at** (`timestamp`): 탈퇴 요청 시각.
- **processed_at** (`timestamp`, 선택): 탈퇴 완료 시각.
- **reason** (`string`, 선택): 사용자가 탈퇴 이유를 남기는 경우 저장합니다.

### Payment History (`payment_history`)

2차 또는 3차 업데이트에서 유료 포인트 충전과 상품 구매가 도입될 때 사용합니다. 법정 보관 기간(예: 5년) 동안 보존하며 탈퇴 후에도 삭제되지 않습니다.

- **id** (`uuid`): 결제 기록 ID.
- **user_id** (`uuid`): 결제한 사용자 ID.
- **amount** (`integer`): 결제 금액(지불한 돈 단위).
- **currency** (`string`): 통화. 예: `KRW`, `USD`.
- **lupi_amount** (`integer`): 충전한 루피 포인트 수.
- **payment_gateway** (`string`): 결제 대행사. 예: `toss`, `stripe`.
- **status** (`string`): 결제 상태. `pending`, `completed`, `failed`, `refunded` 등.
- **created_at** (`timestamp`): 결제 요청 시각.
- **completed_at** (`timestamp`, 선택): 결제 완료 시각.
- **notes** (`text`, 선택): 결제와 관련된 메모.

## 관계

- `results.user_id`는 `users.id`를 참조합니다. 비회원 사용자의 결과는 `user_id`가 `null`일 수 있습니다.
- `results.card_id`는 `cards.id`, `results.master_slug`는 `masters.slug`를 참조합니다. 카드 이미지 선택은 `card_decks.master_slug`와 매핑되는 덱에서 `card_images.card_id`를 찾아 결정합니다.
- `lupi_transactions.user_id`는 `users.id`를 참조합니다. 적립/차감 기록과 사용자 간 일대다 관계입니다.
- `feedback.user_id`와 `partner_inquiries`의 사용자 ID는 선택 필드이며, 로그인하지 않은 사용자는 `null`로 저장됩니다.
- `withdrawals.user_id`는 탈퇴한 사용자를 식별합니다. 실제 사용자 데이터는 삭제되지만, 탈퇴 로그는 남겨둡니다.
- `payment_history.user_id`는 결제를 진행한 사용자를 참조하며, `users` 테이블과 일대다 관계입니다.
- `card_decks.master_slug`는 `masters.slug`를 참조하여 각 마스터가 사용하는 덱을 지정합니다.
- `card_images.card_id`는 `cards.id`를, `card_images.deck_id`는 `card_decks.id`를 참조합니다. 이를 통해 하나의 카드 의미에 여러 덱 이미지가 매핑됩니다.

## 향후 확장

- **다국어 지원**: `cards.name`과 `cards.meanings` 등 다국어 번역을 추가하려면 별도의 `card_translations` 테이블을 만들거나 JSON 필드에 다국어 데이터를 저장하는 방식으로 확장할 수 있습니다.
- **타로 카테고리 확장**: 연애타로, 심리테스트 등의 다른 점술 도구를 추가할 경우, `cards` 테이블에 `category` 필드를 추가하거나 별도의 테이블을 생성합니다.
- **덱/스타일 확장**: 마스터별 덱 외에도 테마별 카드 세트를 추가할 수 있습니다. 새로운 덱을 만들 때는 `card_decks`에 레코드를 추가하고, 각 카드 이미지에 대해 `card_images`를 추가하면 됩니다.
- **포인트 유료 충전**: `payment_history`와 `lupi_transactions`를 연동하여 루피 충전에 따른 거래 내역을 관리합니다.
- **SNS 공유 로그**: 사용자가 결과를 공유했을 때 기록하는 `shares` 테이블을 추가하여 공유에 따른 보상을 관리할 수 있습니다.

---

위 데이터 모델은 1차 오픈을 위한 최소한의 구성입니다. 실제 개발 시에는 데이터베이스 기능(Foreign Key, Index, Enum 등)을 활용해 성능과 무결성을 강화하고, 서비스 확장 시 새 테이블을 추가하거나 스키마를 보완하면 됩니다.

## 관련 문서

- `README.md`
- `docs/api-spec.md`
- `docs/supabase-tarot-results.md`
- `docs/folder-structure.md`

