이 문서는 유어타로 프로젝트의 초기 릴리스(1차 오픈)를 기준으로 한 **폴더 구조**와 **파일 설명**, **디렉터리 뎁스 구조**를 정리한 자료입니다. 각 폴더의 역할과 향후 확장 시 고려해야 할 사항을 함께 명시하여, 개발과 유지보수가 체계적으로 진행될 수 있도록 돕습니다.

## 목적

- **구조 파악**: 프로젝트 전반의 디렉터리 구조를 한눈에 파악할 수 있게 합니다. 새 팀원이 들어오거나 구조를 수정할 때 참고 자료로 활용합니다.
- **역할 정의**: 각 폴더 및 주요 파일의 용도를 설명하여, 어디에 어떤 코드나 자원을 두어야 하는지 명확히 합니다.
- **확장 대비**: 2차·3차 업데이트에서 글로벌 확장, 결제·포인트 기능, 추가 타로 테스트 등이 추가되더라도 구조를 크게 바꾸지 않고 기능을 더할 수 있도록 설계 지침을 제공합니다.

## 최상위 디렉터리

프로젝트 루트에는 설정 파일, 환경 변수 예시, 패키지 관리 파일 등이 위치합니다.

| 경로 | 설명 |
| --- | --- |
| `README.md` | 프로젝트 소개, 설치 및 실행 방법, 기여 가이드 등을 기록합니다. |
| `package.json` | 의존성과 스크립트를 관리합니다. Next.js, Tailwind CSS, Firebase/Supabase 클라이언트 등의 패키지 정보가 포함됩니다. |
| `next.config.js` | Next.js의 커스텀 설정을 정의합니다. 이미지 최적화, 국제화, 리다이렉션 등을 설정할 수 있습니다. |
| `tsconfig.json` | TypeScript 컴파일러 옵션을 설정합니다. |
| `.env.local.example` | 환경 변수 예시 파일로, Firebase/Supabase 키, reCAPTCHA 키 등을 명시합니다. 실제 값은 `.env.local`에 저장합니다. |
| `docs/` | 데이터 모델, API 스펙, 디자인 시스템, 폴더 구조 등 개발 문서를 보관합니다. |
| `public/` | 정적 자원(이미지, 아이콘, 파비콘, 사이트맵 등)을 저장하며, Next.js에서 `/` 경로 아래로 서빙됩니다. |
| `scripts/` | 빌드/배포/마이그레이션을 자동화하는 스크립트를 저장합니다. |
| `src/` | 실제 애플리케이션 코드가 위치하는 폴더입니다. pages, components, styles, data, lib 등의 하위 구조를 포함합니다. |
| `tests/` | Jest와 React Testing Library 등을 이용한 단위 테스트/통합 테스트를 작성합니다. |

## `public/` 하위 구조

`public` 폴더는 사용자가 직접 접근 가능한 정적 파일을 저장합니다. URL 경로는 파일명과 동일하게 매핑됩니다.

| 경로 | 설명 |
| --- | --- |
| `public/images/cards/` | **카드 이미지 저장소**. 마스터별 덱을 지원하기 위해 하위에 `deck_slug`별 폴더를 생성합니다. 예: `public/images/cards/cassian/00.png`. |
| `public/images/masters/` | 마스터 프로필 이미지 저장소. 슬러그와 동일한 파일명으로 저장합니다. |
| `public/images/icons/` | 공통 아이콘을 저장합니다. Font Awesome 등의 라이브러리를 사용하는 경우 SVG 파일을 배치할 수 있습니다. |
| `public/icons/` | 사이트 전체에서 사용하는 작은 아이콘 모음입니다. |
| `public/favicon.ico` | 브라우저 탭에 표시되는 파비콘 파일입니다. |
| `public/robots.txt` | 검색 엔진 크롤러에 대한 접근 규칙을 정의합니다. |
| `public/sitemap.xml` | SEO를 위한 사이트맵. 빌드 시 동적으로 생성하거나 정적으로 관리합니다. |

### 카드 덱 폴더 구조

각 마스터는 고유한 카드 덱을 사용하므로, `public/images/cards/` 아래에 마스터 slug로 된 하위 디렉터리를 만듭니다. 덱 폴더 구조 예시는 다음과 같습니다.

```
public/images/cards/
├── cassian/
│   ├── 00.png
│   ├── 01.png
│   └── ...
├── luna/
│   ├── 00.png
│   └── ...
├── elin/
│   └── ...
└── ... (총 9개 덱)
```

모든 카드 이미지는 3:5 비율, 최소 600×1000px 해상도, PNG(WebP) 형식으로 저장합니다. 이미지 교체가 필요할 경우 버전 폴더를 추가(예: `cassian/v2/00.png`)하여 캐시 문제를 방지할 수 있습니다.

## `docs/` 폴더

개발 및 운영 문서를 저장하는 공간입니다. 현재 포함된 주요 문서는 다음과 같습니다.

| 파일명 | 설명 |
| --- | --- |
| `data-model.md` | 카드, 마스터, 사용자, 포인트(루피)와 덱/이미지 테이블 등의 데이터 스키마를 정의합니다. |
| `api-spec.md` | `/api` 경로 하위 엔드포인트의 요청/응답 구조와 동작을 설명합니다. |
| `design-system.md` | 색상, 타이포그래피, 그리드, 컴포넌트 규칙 등 UI/UX 가이드와 마스터별 덱 스타일 지침을 기록합니다. |
| `folder-structure.md` | 현재 문서. 폴더 구조와 각 항목의 역할을 설명하고, 디렉터리 뎁스 구조를 제공합니다. |

새로운 기능을 설계할 때에는 해당 문서들에 내용을 추가해 유지 관리해야 합니다.

## `src/` 폴더

애플리케이션의 핵심 코드가 위치하며, 현재 구현은 **Next.js App Router(`src/app`)** 기준입니다. 주요 구성은 `app`, `components`, `data`, `lib`, `hooks`, `context`, `styles`, `assets`입니다.

### `src/app/`

현재 URL 라우트와 실제 페이지 파일은 아래와 같습니다.

| 경로 | 설명 |
| --- | --- |
| `src/app/page.tsx` | 홈 페이지 |
| `src/app/about/page.tsx` | 서비스 소개 페이지 |
| `src/app/login/page.tsx` | 로그인 페이지 |
| `src/app/mypage/page.tsx` | 마이페이지 |
| `src/app/menu/page.tsx` | 메뉴 페이지 |
| `src/app/masters/page.tsx` | 마스터 목록 |
| `src/app/masters/[slug]/page.tsx` | 마스터 상세 |
| `src/app/draw/today/page.tsx` | 오늘의 카드 뽑기 |
| `src/app/result/today/[id]/page.tsx` | 결과 상세 |
| `src/app/partner/page.tsx` | 제휴 문의 페이지 |
| `src/app/disclaimer/page.tsx` | 면책 조항 |
| `src/app/personal/page.tsx` | 개인정보 처리방침 |
| `src/app/terms/page.tsx` | 이용약관 |
| `src/app/recommended/page.tsx` | 추천 페이지 |
| `src/app/page_01_masters_list_1/page.tsx` ~ `src/app/page_07_reading-result_typea/page.tsx` | 플로우 화면군 |
| `src/app/page-master-profile_01/page.tsx` | 마스터 프로필 플로우 화면 |

> 현재 시점에는 `src/app/api/**/route.ts` 형태의 API 핸들러 파일은 아직 없습니다.

### `src/components/`

재사용 가능한 UI 컴포넌트를 보관하는 폴더입니다. 디자인 시스템을 기반으로 만들어진 원자 단위부터 조직 단위까지 다양한 컴포넌트가 있습니다.

- **SiteFrame**: 공통 레이아웃 래퍼(헤더/푸터 포함)
- **Header / Footer**: 상단/하단 UI
- **FlowScene**: 플로우 페이지 공통 배경/오버레이/뒤로가기
- **MarkdownArticle**: 약관/정책 Markdown 렌더링

필요에 따라 버튼, 모달, 로딩 스피너 등 공통 컴포넌트를 추가하고, 사용하지 않는 컴포넌트는 삭제하거나 분리합니다.

### `src/styles/`

- **globals.css**: 전역 CSS 규칙을 정의합니다. reset 스타일, 기본 폰트, 기본 레이아웃 등을 설정합니다.
- **variables.css**: 디자인 시스템에서 사용하는 색상, 폰트 크기, 여백 등을 CSS 변수로 선언합니다. 다크 모드 전환을 위해 색상 토큰을 변수화합니다.
- **tailwind.config.js**: Tailwind CSS를 사용하는 경우 커스텀 테마, 브레이크포인트 등을 설정합니다.

### `src/data/`

초기에는 JSON 파일로 관리하는 정적 데이터를 저장합니다. 이후 Supabase/Firebase로 마이그레이션할 수 있습니다.

- `cards.json` : 78장의 카드 기본 정보(키워드, 짧은/긴 해석)를 저장합니다. 이미지 경로는 덱별 폴더에서 관리합니다.
- `masters.json` : 9명의 마스터 정보(프로필, 말투, 슬러그)를 저장합니다. 덱 정보(`deck_slug`)를 포함하여 마스터와 카드 이미지를 연결합니다.
- `results/` : 카드와 마스터의 조합 결과를 저장하는 파일들입니다. 초기에는 카드별 해석만 포함하고, 9명 캐릭터의 말투는 코드에서 조합합니다. 추후 DB로 이전 예정입니다.
- `translations/` : 다국어 번역 문자열을 저장합니다. `ko.json`을 기본으로, 2차 업데이트에서 `en.json`, 3차에서 `ja.json`을 추가합니다.

### `src/lib/`

전역적으로 사용되는 유틸리티, 초기화 코드, 상수를 저장합니다.

- `firebase.ts` : Firebase 앱/인증 초기화를 담당합니다.
- `supabase.ts` : Supabase 클라이언트 초기화 및 테이블 CRUD를 지원합니다. 루피 잔액과 의견/제휴 데이터를 관리합니다.
- `analytics.ts` : GA4, Clarity, Sentry 등을 설정하고 이벤트 로깅을 수행합니다.
- `i18n.ts` : 국제화 처리를 위한 모듈입니다. 현재 언어에 맞춰 번역 파일을 불러오고, missing key 처리 등을 합니다.
- `recaptcha.ts` : reCAPTCHA v3 검증 로직을 정의합니다. 폼 제출 시 서버로 토큰을 전송하여 스팸을 방지합니다.
- `constants.ts` : 공통으로 사용하는 상수 값을 모아둡니다. 예: 카드 번호 목록, 루피 기본 보상 값, API 엔드포인트 등.
- `apiClient.ts` : 프론트엔드에서 API를 호출할 때 사용하는 공통 fetch 래퍼입니다. HTTP 메서드, 헤더 설정, 오류 처리 로직을 포함합니다.

### `src/hooks/`

React 커스텀 훅을 정의하는 폴더입니다. 상태 관리와 데이터 패칭 로직을 컴포넌트로부터 분리합니다.

- `useUser.ts` : 사용자 인증 및 프로필 정보를 관리하는 훅입니다.
- `useCardData.ts` : `cards.json` 또는 Supabase의 카드 데이터와 덱 정보를 가져오는 훅입니다.
- `useMasterData.ts` : 마스터 목록과 프로필을 가져옵니다. 마스터에 매핑된 덱 정보를 포함합니다.
- `useFeedback.ts` : 의견 제출 폼 데이터를 관리하고 API 호출을 수행합니다.
- 추가되는 타로 테스트나 기능에 맞춰 새로운 훅을 생성할 수 있습니다.

### `src/context/`

전역 상태를 관리하는 React Context를 정의합니다.

- `UserContext.tsx` : 로그인 정보, 루피 잔액, 선호하는 마스터 등을 전역으로 공급합니다.
- 포인트 시스템을 추가할 경우, `LupiContext`를 추가하여 포인트 적립/차감을 전역에서 관리할 수 있습니다.

### `src/assets/`

음악 파일, 커스텀 폰트, 애니메이션 파일 등 정적 자산 중 `public`에 포함되지 않는 리소스를 저장합니다.

## 디렉터리 뎁스 트리

아래는 1차 오픈 기준으로 정리한 간략한 디렉터리 뎁스 트리입니다(일부 불필요한 폴더는 생략). 필요에 따라 추가 파일이 생길 수 있습니다.

```
/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.js
├── public/
│   ├── images/
│   │   ├── cards/
│   │   │   ├── cassian/
│   │   │   │   ├── 00.png
│   │   │   │   ├── 01.png
│   │   │   │   └── ...
│   │   │   ├── luna/
│   │   │   │   └── ...
│   │   │   └── ... (총 9개 덱)
│   │   ├── masters/
│   │   │   ├── cassian.png
│   │   │   └── ...
│   │   └── icons/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── docs/
│   ├── data-model.md
│   ├── api-spec.md
│   ├── design-system.md
│   └── folder-structure.md (현재 문서)
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── about/page.tsx
│   │   ├── login/page.tsx
│   │   ├── mypage/page.tsx
│   │   ├── menu/page.tsx
│   │   ├── masters/page.tsx
│   │   ├── masters/[slug]/page.tsx
│   │   ├── draw/today/page.tsx
│   │   ├── result/today/[id]/page.tsx
│   │   ├── partner/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   ├── personal/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── recommended/page.tsx
│   │   ├── page_01_masters_list_1/page.tsx
│   │   ├── page_02_masters_list_2/page.tsx
│   │   ├── page_03_card-selection_1/page.tsx
│   │   ├── page_04_card-selection_2/page.tsx
│   │   ├── page_05_masters_list5/page.tsx
│   │   ├── page_06_analyzing/page.tsx
│   │   ├── page_07_reading-result_typea/page.tsx
│   │   └── page-master-profile_01/page.tsx
│   ├── components/
│   │   ├── SiteFrame.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FlowScene.tsx
│   │   └── MarkdownArticle.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── tailwind.config.js
│   ├── data/
│   │   ├── cards.json
│   │   ├── masters.json
│   │   ├── results/
│   │   └── translations/
│   │       ├── ko.json
│   │       ├── en.json (예정)
│   │       └── ja.json (예정)
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── supabase.ts
│   │   ├── analytics.ts
│   │   ├── i18n.ts
│   │   ├── recaptcha.ts
│   │   ├── constants.ts
│   │   └── apiClient.ts
│   ├── hooks/
│   │   ├── useUser.ts
│   │   ├── useCardData.ts
│   │   ├── useMasterData.ts
│   │   ├── useFeedback.ts
│   │   └── ...
│   ├── context/
│   │   └── UserContext.tsx
│   └── assets/
└── tests/
```

## 확장성 고려 사항

1. **카드 덱 추가**: 새로운 마스터 또는 테마가 추가되면 `public/images/cards/` 아래에 새로운 덱 슬러그 폴더를 생성하고, `masters.json`에 덱 정보를 추가하면 됩니다. 카드 의미(`cards.json`)는 공통으로 재사용합니다.
2. **다국어 확장**: `data/translations/`에 언어별 JSON 파일을 추가하고, `i18n.ts`에서 지원 언어 목록을 업데이트합니다. 페이지 컴포넌트는 언어 선택 UI를 제공하도록 수정할 수 있습니다.
3. **결제/포인트 기능**: `payment.tsx`와 관련 API 라우트를 확장하여 포인트 구매, 환불, 결제 내역 조회 등을 구현합니다. DB 스키마는 `payment_history`와 `lupi_transactions`를 이용하며, `constants.ts`에 포인트 정책 상수를 정의합니다.
4. **추가 테스트/서비스**: 연애타로, 심리테스트 등 다른 점술 도구를 추가할 때는 `src/pages/draw/`와 `src/pages/result/` 하위에 새로운 라우트를 만들고, 해당 테스트 전용 데이터와 컴포넌트를 `data/`와 `components/` 아래에 구조화합니다.

---

이 문서는 1차 오픈 시점과 현재까지 확정된 요구사항을 기반으로 작성되었습니다. 프로젝트가 성장함에 따라 폴더 구조와 파일 구성이 변경될 수 있으므로, 변경 사항이 발생하면 이 문서와 관련 문서를 함께 업데이트해 팀 전체가 최신 정보를 공유하도록 합니다.

