# YourTarot 2

`yourtarot2`는 유어타로 서비스의 화면 구현 중심 웹 프로젝트입니다.  
현재 **Next.js App Router** 기반으로 주요 타로 플로우와 정책 페이지(Markdown 렌더링)를 제공합니다.

## Quick Start (5분 시작)

### 1) 요구 사항

- Node.js 20+
- npm 10+

### 2) 설치

```bash
npm install
```

### 3) 환경변수 설정

```bash
cp .env.local.example .env.local
```

필수 환경변수:

| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 루트 URL (`https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public) |
| `NEXT_PUBLIC_SITE_URL` | 사이트 절대 URL (운영 도메인) |

선택 환경변수:

- `NEXT_PUBLIC_ROBOTS_SITEMAP_ORIGIN`
- `NEXT_PUBLIC_GTM_ID`

### 4) 로컬 실행

```bash
npm run dev
```

- 기본 주소: `http://localhost:3000`
- 포트 충돌 시: `npm run dev -- --port 3025`
- 고정 포트 실행(팀 공유용): `npm run dev:3037`

---

## 프로젝트 개요

- 프레임워크: Next.js App Router 기반 웹 애플리케이션
- 핵심 도메인: 마스터 선택, 카드 선택, 결과 확인, 결과 저장
- 문서 범위: 설계(`docs/*`), 데이터 스키마, API 스펙, 운영 체크리스트

## 기술 스택

- `next@16`
- `react@19`
- `typescript`
- `tailwindcss@4`
- `react-markdown` + `remark-gfm`

## 자주 쓰는 명령

- `npm run dev`: 개발 서버 실행
- `npm run dev:3037`: 3037 포트 + polling 개발 서버
- `npm run build`: 프로덕션 빌드 (`prebuild` 자동 실행)
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 검사
- `npm run blog:generate`: 블로그 데이터 생성
- `npm run faq:sync`: FAQ JSON 동기화

## 빌드/배포

### 로컬 빌드 확인

```bash
npm run build
npm run start
```

### GitHub Pages 배포

- 워크플로: `.github/workflows/github-pages.yml`
- 배포 타깃: `main` 또는 `master` 브랜치 push 시 `out/` 배포
- 필수 설정: GitHub 저장소 `Settings > Pages > Source`를 **GitHub Actions**로 설정
- 상세 절차: `docs/DEPLOY-GITHUB-PAGES.md`

> Supabase OAuth 사용 시 배포 URL 변경(`github.io`)을 Redirect URL에 반드시 반영하세요.

## 라우트 구조 (`src/app`)

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

**타로 플로우(권장 URL)**

- `/tarot/start` 마스터 선택
- `/tarot/draw` 카드 선택(덱) — `?master=`
- `/tarot/reveal` 카드 오픈 — `?master=&card=`
- `/tarot/analyze` 해석 중 — `?master=&card=`
- `/tarot/result` 리딩 결과 — `?master=&card=`

내부 링크 및 쿼리 조합은 `src/lib/routes.ts` 헬퍼(`tarotDrawWithMaster`, `tarotResultWith` 등)를 사용합니다.

**구 URL 호환(리다이렉트 + `noindex`)**

북마크/외부 링크 호환을 위해 기존 경로를 유지하며, 동일한 쿼리를 포함해 새 경로로 `replace` 합니다.

- `/page_01_masters_list_1` → `/tarot/start`
- `/page_03_card-selection_1` → `/tarot/draw`
- `/page_05_masters_list5` → `/tarot/reveal`
- `/page_06_analyzing` → `/tarot/analyze`
- `/page_07_reading-result_typea` → `/tarot/result`
- `/page-master-profile_01` → `/masters/profile`

## 프로젝트 구조

- `src/app`: 페이지 라우트(App Router), `globals.css`, `robots.ts`, `sitemap.ts`
- `src/components`: 레이아웃, 플로우, 홈 UI (`SiteFrame`, `FlowScene`, `CardSwipeDeck`, `LegacyPathRedirect` 등. 전체 표는 `docs/folder-structure.md` 참고)
- `src/lib`: 유틸·라우트·SEO·Supabase·리딩 (`routes.ts`, `siteUrl.ts`, `seo/pageMeta.ts` 등)
- `src/data`: `master-profiles.json`, `readings/`, `translations/ko.json`
- `src/hooks`: `useUser`(Supabase), `submitFeedback`(`useFeedback.ts`), `useCardData`/`useMasterData`(JSON 스텁, 문서 참고)
- `src/context`: `UserContext.tsx`(placeholder)
- `src/styles`: `variables.css`(보조 변수)
- `docs`: 설계/스펙 문서
- `public`: 파비콘·이미지 등 정적 파일

## 관련 문서

- `docs/documentation-management-guide.md` — 문서 운영 기준(톤/형식/Owner/체크리스트)
- `docs/design-system.md`
- `docs/data-model.md`
- `docs/api-spec.md`
- `docs/folder-structure.md`
- `docs/production-checklist.md` — **프로덕션(Cloudflare Pages + Supabase) 배포 후 점검**
- `docs/supabase-tarot-results.md` — `tarot_results`·RLS·저장 정책

## 참고 사항

- 화면·플로우 중심으로 확장 중이며, `docs/api-spec.md` 등은 목표/스펙과 실제 구현이 다를 수 있습니다.
- API 라우트: `src/app/api/feedback/route.ts`, `src/app/api/partner/route.ts` (정적 export 빌드에서는 동작 방식이 호스팅 환경에 따름).
