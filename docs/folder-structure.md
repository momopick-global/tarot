# 폴더 구조 가이드

유어타로 프로젝트의 **폴더 구조**, **파일 설명**, **디렉터리 트리**를 정리한 문서입니다. **현재 저장소(`your_tarot`) 기준**으로 유지하며, 확장 시 고려 사항도 함께 다룹니다.

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
| `next.config.ts` | Next.js 설정(`output: "export"`, `trailingSlash`, 선택적 `basePath` 등). |
| `postcss.config.mjs` | PostCSS 설정(Tailwind v4 등). |
| `tsconfig.json` | TypeScript 컴파일러 옵션을 설정합니다. |
| `.env.local.example` | 환경 변수 예시 파일로, Firebase/Supabase 키, reCAPTCHA 키 등을 명시합니다. 실제 값은 `.env.local`에 저장합니다. |
| `docs/` | 데이터 모델, API 스펙, 디자인 시스템, 폴더 구조 등 개발 문서를 보관합니다. |
| `public/` | 정적 자원(이미지, 아이콘, 파비콘 등)을 저장하며, Next.js에서 `/` 아래로 서빙됩니다. `robots.txt`·`sitemap.xml`은 `src/app`에서 생성합니다. |
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
| `/robots.txt`, `/sitemap.xml` | **App Router**에서 `src/app/robots.ts`, `src/app/sitemap.ts`로 생성되며, 빌드 결과(`out/`)에 정적 파일로 출력됩니다. `public/`에 두지 않습니다. |

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

현재 URL 라우트와 대응하는 페이지 파일은 아래와 같습니다.

| 경로 | 설명 |
| --- | --- |
| `src/app/layout.tsx`, `page.tsx` | 루트 레이아웃·홈 |
| `src/app/globals.css` | 전역 스타일(Tailwind 등) |
| `src/app/about/page.tsx` | 서비스 소개 |
| `src/app/login/page.tsx` | 로그인 |
| `src/app/mypage/page.tsx` | 마이페이지 |
| `src/app/menu/page.tsx` | 메뉴 |
| `src/app/masters/page.tsx` | 마스터 목록 |
| `src/app/masters/[slug]/page.tsx` | 마스터 상세(SSG) |
| `src/app/masters/profile/page.tsx` | 마스터 프로필(`?master=`). 구 URL `/page-master-profile_01`는 얇은 리다이렉트 페이지로 유지 |
| `src/app/draw/today/page.tsx` | `/tarot/start`로 서버 리다이렉트 |
| `src/app/result/today/[id]/page.tsx` | 데모 결과 |
| `src/app/tarot/start/` | 마스터 선택 플로우 |
| `src/app/tarot/draw/` | 카드 덱 선택 |
| `src/app/tarot/reveal/` | 카드 오픈 |
| `src/app/tarot/analyze/` | 해석 중 화면 |
| `src/app/tarot/result/` | 리딩 결과 |
| `src/app/page_01_masters_list_1/` 등 | 구 플로우 URL → 새 `/tarot/*`로 쿼리 유지 리다이렉트(`LegacyPathRedirect`), `robots: noindex` |
| `src/app/partner/page.tsx` | 제휴 문의 |
| `src/app/disclaimer/page.tsx`, `personal/page.tsx`, `terms/page.tsx` | 정책·약관(Markdown 렌더) |
| `src/app/recommended/page.tsx` | 의견 보내기 |
| `src/app/robots.ts`, `sitemap.ts` | 크롤링용 메타데이터 라우트 |
| `src/app/api/feedback/route.ts`, `api/partner/route.ts` | API 핸들러(배포·`output: "export"` 조합에 따라 동작 확인 필요) |

플로우 URL 상수·쿼리 빌더: `src/lib/routes.ts`.

**레이아웃**: 홈은 루트 `layout.tsx`만 사용하고, `"use client"` 페이지는 경로별 `layout.tsx`에서 `metadata`만 export하는 패턴이 있습니다(예: `login/layout.tsx`, `menu/layout.tsx`, `mypage/layout.tsx`, `partner/layout.tsx`, `recommended/layout.tsx`, `tarot/*/layout.tsx`).

### `src/components/`

재사용 UI·플로우 전용 조각을 둡니다.

| 파일 | 역할 |
| --- | --- |
| `SiteFrame.tsx` | 헤더·푸터·메뉴 오버레이를 감싸는 공통 프레임 |
| `Header.tsx` / `Footer.tsx` | 상단·하단 바 |
| `FlowScene.tsx` | 타로 플로우 배경·뒤로가기·씬 래퍼 |
| `MarkdownArticle.tsx` | 약관·정책 Markdown 렌더 |
| `AuthReturnRedirect.tsx` | OAuth 후 `returnTo` 복귀 처리 |
| `LegacyPathRedirect.tsx` | 구 플로우 URL → `/tarot/*` 등으로 쿼리 유지 리다이렉트 |
| `MenuContent.tsx` | 햄버거 메뉴 본문 |
| `HomeParticipantCount.tsx` / `HomeShareSection.tsx` | 홈 참여 수·공유 UI |
| `MasterIntroPopup.tsx` / `CardGuidePopup.tsx` / `DismissibleGuide.tsx` | 플로우 가이드·팝업 |
| `CardSwipeDeck.tsx` / `CardInteractionBoard.tsx` | 카드 덱·인터랙션(스타일 `card-swipe-deck.css`) |
| `ResultActionButtons.tsx` | 결과 화면 저장·공유·다시하기 |

### 스타일

- **`src/app/globals.css`**: 전역 CSS·Tailwind v4 엔트리(import는 `layout.tsx`에서).
- **`src/styles/variables.css`**: 보조 CSS 변수(토큰). 메인 엔트리는 `globals.css`입니다.

### `src/data/`

정적 JSON·마스터별 리딩 데이터를 저장합니다. 마스터 메타는 코드(`flowData`)와 병행하는 경우가 많습니다.

- `master-profiles.json` : 마스터 프로필 상세(성향 문구, 다이어그램 경로 등).
- `readings/` : 마스터별 카드 인덱스별 해석 JSON(예: `cassian.json`). `default.json` 등 폴백.
- `translations/ko.json` : 다국어 확장 시 추가 언어 파일을 `translations/`에 둘 수 있습니다.

### `src/lib/`

전역적으로 사용되는 유틸리티, 초기화 코드, 상수를 저장합니다.

- `routes.ts` : 타로 플로우 공식 경로(`/tarot/*`, `/masters/profile`)와 쿼리 문자열 빌더.
- `siteUrl.ts` : 배포 origin·`basePath` 반영 절대 URL(sitemap·robots 등).
- `seo/pageMeta.ts` : 페이지별 `metadata`·OG/Twitter 공통 빌더.
- `mastersDetailSlugs.ts` : `/masters/[slug]` SSG 슬러그 목록(sitemap과 동기화).
- `authReturnPath.ts` : 로그인 후 복귀 경로·`returnTo` 검증.
- `supabase.ts`, `tarotResultsDb.ts`, `savedReadings.ts`, `tarotCloudInsertOnce.ts` : Supabase·로컬 저장 연동.
- `flowData.ts`, `masterCardAssets.ts`, `resolveCardReading.ts`, `cardReadingTypes.ts` : 마스터·카드·리딩 타입·데이터.
- `apiClient.ts`, `constants.ts` : API 호출·엔드포인트 상수.
- `share.ts` : 공유·클립보드·카카오 등.
- `publicPath.ts` : 정적 export·`basePath` 대응 에셋 URL.
- 기타: `firebase.ts`, `analytics.ts`, `i18n.ts`, `recaptcha.ts` 등(연동 범위는 환경 변수에 따름).

### `src/hooks/`

| 파일 | 설명 |
| --- | --- |
| `useUser.ts` | Supabase Auth 세션·`getSession` / `onAuthStateChange`, Google·카카오·페이스북 OAuth 로그인/로그아웃. |
| `useFeedback.ts` | 훅이 아니라 **`submitFeedback()`** 비동기 함수만 export(의견 API `POST`). 파일명은 역사적 이유로 유지. |
| `useCardData.ts` | `@/data/cards.json`을 가정하는 스텁. **현재 저장소에 `cards.json`이 없을 수 있음** — 사용 전 파일 추가 또는 `flowData`/`readings` 기반으로 정리 권장. |
| `useMasterData.ts` | `@/data/masters.json`을 가정하는 스텁. **현재 저장소에 `masters.json`이 없을 수 있음** — 마스터 목록은 주로 `flowData.ts` 사용. |

### `src/context/`

- `UserContext.tsx` : 최소 컨텍스트 정의(`user: null \| { id: string }` 형태의 placeholder). 실제 세션은 `useUser` + Supabase가 담당합니다. 전역 Provider 확장 시 이 파일을 키우거나 별도 Provider를 둡니다.

### `src/assets/`

선택 디렉터리입니다. **현재 저장소에는 비어 있거나 미생성**일 수 있으며, 번들 전용 폰트·오디오 등을 둘 때 사용합니다.

## 디렉터리 뎁스 트리

아래는 **현재 저장소 기준** 간략 트리입니다. 생략된 파일·동일 패턴의 `layout.tsx`가 더 있습니다.

```
/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
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
│   └── favicon.ico
├── docs/
│   ├── data-model.md
│   ├── api-spec.md
│   ├── design-system.md
│   └── folder-structure.md (현재 문서)
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── about/page.tsx
│   │   ├── login/page.tsx (+ layout.tsx)
│   │   ├── mypage/page.tsx (+ layout.tsx)
│   │   ├── menu/page.tsx (+ layout.tsx)
│   │   ├── masters/page.tsx
│   │   ├── masters/[slug]/page.tsx
│   │   ├── masters/profile/page.tsx (+ layout.tsx)
│   │   ├── tarot/start, draw, reveal, analyze, result/  (각각 page.tsx + layout.tsx)
│   │   ├── page_01_masters_list_1/page.tsx  (구 URL 리다이렉트)
│   │   ├── page_03_card-selection_1/page.tsx
│   │   ├── … (기타 구 플로우 경로 동일)
│   │   ├── draw/today/page.tsx
│   │   ├── result/today/[id]/page.tsx
│   │   ├── api/feedback/route.ts
│   │   ├── api/partner/route.ts
│   │   ├── partner/page.tsx (+ layout.tsx)
│   │   ├── disclaimer/page.tsx
│   │   ├── personal/page.tsx
│   │   ├── terms/page.tsx
│   │   └── recommended/page.tsx (+ layout.tsx)
│   ├── components/
│   │   ├── SiteFrame, Header, Footer, FlowScene, MarkdownArticle
│   │   ├── AuthReturnRedirect, LegacyPathRedirect, MenuContent
│   │   ├── HomeParticipantCount, HomeShareSection
│   │   ├── MasterIntroPopup, CardGuidePopup, DismissibleGuide
│   │   ├── CardSwipeDeck, CardInteractionBoard, ResultActionButtons
│   │   └── card-swipe-deck.css
│   ├── data/
│   │   ├── master-profiles.json
│   │   ├── readings/  (마스터별 카드 해석 JSON)
│   │   └── translations/
│   │       └── ko.json
│   ├── lib/
│   │   ├── routes.ts, siteUrl.ts, authReturnPath.ts, publicPath.ts
│   │   ├── seo/pageMeta.ts, mastersDetailSlugs.ts
│   │   ├── flowData.ts, masterCardAssets.ts, resolveCardReading.ts, cardReadingTypes.ts
│   │   ├── supabase.ts, tarotResultsDb.ts, savedReadings.ts, tarotCloudInsertOnce.ts
│   │   ├── apiClient.ts, constants.ts, share.ts
│   │   └── firebase.ts, analytics.ts, i18n.ts, recaptcha.ts
│   ├── styles/
│   │   └── variables.css
│   ├── hooks/
│   │   ├── useUser.ts
│   │   ├── useFeedback.ts  (submitFeedback)
│   │   └── useCardData.ts, useMasterData.ts  (JSON 스텁 — 저장소에 파일 없을 수 있음)
│   ├── context/
│   │   └── UserContext.tsx
└── tests/
```

## 확장성 고려 사항

1. **카드 덱 추가**: `public/images/cards/` 등 에셋 경로를 늘리고, `src/lib/flowData.ts`·`master-profiles.json`·`readings/` JSON을 마스터 id에 맞춰 추가·동기화합니다. SSG 슬러가 있으면 `mastersDetailSlugs.ts`·`sitemap.ts`도 함께 점검합니다.
2. **다국어 확장**: `data/translations/`에 언어별 JSON 파일을 추가하고, `i18n.ts`에서 지원 언어 목록을 업데이트합니다. 페이지 컴포넌트는 언어 선택 UI를 제공하도록 수정할 수 있습니다.
3. **결제/포인트 기능**(예정): 결제 UI·`src/app/api/…` 라우트·DB 스키마(`payment_history` 등)를 추가할 때 `constants.ts`에 정책 상수를 두고 문서를 맞춥니다.
4. **추가 테스트/서비스**: 연애타로 등 다른 점술 도구를 추가할 때는 `src/app/` 아래 새 세그먼트(예: `/love/…`)를 두고, `src/lib/routes.ts`에 경로 상수를 추가해 일관되게 링크합니다.

---

라우트·URL 변경(`README.md`의 `/tarot/*` 등)이 있으면 이 문서의 `src/app/` 표와 트리를 함께 고칩니다. `useCardData`/`useMasterData`와 같이 **데이터 파일이 코드만 있고 실제 JSON이 없는** 구간은 리팩터 시 우선 정리하는 것이 좋습니다.

## 관련 문서

- `README.md`
- `docs/design-system.md`
- `docs/api-spec.md`
- `docs/data-model.md`

