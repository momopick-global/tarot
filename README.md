# YourTarot 2

`yourtarot2`는 유어타로 서비스의 화면 구현 중심 웹 프로젝트입니다.  
현재는 **Next.js App Router** 기반으로 주요 화면 흐름과 정책 페이지(원문 Markdown 렌더링)를 구성한 상태입니다.

## 기술 스택

- `next@16`
- `react@19`
- `typescript`
- `tailwindcss@4`
- `react-markdown` + `remark-gfm`

## 실행 방법

```bash
npm install
npm run dev
```

기본 실행 주소: `http://localhost:3000`  
포트 충돌 시:

```bash
npm run dev -- --port 3025
```

## 주요 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 검사

## 현재 라우트 구조 (`src/app`)

**정책·기타**

- `/` 홈
- `/about` 서비스 소개
- `/login` 로그인
- `/mypage` 마이페이지
- `/menu` 메뉴
- `/masters` 마스터 목록
- `/masters/[slug]` 마스터 상세(SSG)
- `/masters/profile` 마스터 프로필(쿼리 `?master=`)
- `/draw/today` → `/tarot/start`로 리다이렉트
- `/result/today/[id]` 데모 결과 페이지
- `/partner` 제휴 문의
- `/disclaimer`, `/personal`, `/terms` 정책/약관
- `/recommended` 의견 보내기
- `/robots.txt`, `/sitemap.xml` — `src/app/robots.ts`, `src/app/sitemap.ts`에서 정적 생성

**타로 플로우(권장 URL, 짧은 영어 slug)**

- `/tarot/start` 마스터 선택
- `/tarot/draw` 카드 선택(덱) — `?master=`
- `/tarot/reveal` 카드 오픈 — `?master=&card=`
- `/tarot/analyze` 해석 중 — `?master=&card=`
- `/tarot/result` 리딩 결과 — `?master=&card=`

내부 링크·쿼리 조합은 `src/lib/routes.ts` 헬퍼(`tarotDrawWithMaster`, `tarotResultWith` 등) 사용.

**구 URL 호환(리다이렉트 + `noindex`)**

북마크·외부 링크용으로 예전 경로가 남아 있으며, 같은 쿼리를 붙여 새 경로로 `replace` 합니다.

- `/page_01_masters_list_1` → `/tarot/start`
- `/page_03_card-selection_1` → `/tarot/draw`
- `/page_05_masters_list5` → `/tarot/reveal`
- `/page_06_analyzing` → `/tarot/analyze`
- `/page_07_reading-result_typea` → `/tarot/result`
- `/page-master-profile_01` → `/masters/profile`

## 프로젝트 구조 요약

- `src/app`: 페이지 라우트(App Router), `globals.css`, `robots.ts`, `sitemap.ts`
- `src/components`: 레이아웃·플로우·홈 UI (`SiteFrame`, `FlowScene`, `CardSwipeDeck`, `LegacyPathRedirect` 등 — 전체 표는 `docs/folder-structure.md`)
- `src/lib`: 유틸·라우트·SEO·Supabase·리딩 (`routes.ts`, `siteUrl.ts`, `seo/pageMeta.ts` 등)
- `src/data`: `master-profiles.json`, `readings/`, `translations/ko.json`
- `src/hooks`: `useUser`(Supabase), `submitFeedback`(`useFeedback.ts`), `useCardData`/`useMasterData`(JSON 스텁 — 문서 참고)
- `src/context`: `UserContext.tsx`(placeholder)
- `src/styles`: `variables.css`(보조 변수)
- `docs`: 설계/스펙 문서
- `public`: 파비콘·이미지 등 정적 파일

## 문서

- `docs/design-system.md`
- `docs/data-model.md`
- `docs/api-spec.md`
- `docs/folder-structure.md`
- `docs/production-checklist.md` — **프로덕션(Cloudflare Pages + Supabase) 배포 후 점검**
- `docs/supabase-tarot-results.md` — `tarot_results`·RLS·저장 정책

## 참고 사항

- 화면·플로우 중심으로 확장 중이며, `docs/api-spec.md` 등은 목표/스펙과 실제 구현이 다를 수 있습니다.
- API 라우트: `src/app/api/feedback/route.ts`, `src/app/api/partner/route.ts` (정적 export 빌드에서는 동작 방식이 호스팅 환경에 따름).
