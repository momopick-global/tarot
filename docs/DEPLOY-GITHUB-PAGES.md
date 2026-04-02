# GitHub Pages 배포 가이드

## 왜 `vercel.app`이었나요?

**GitHub**는 주로 **소스 코드 저장**용이고, 웹사이트를 자동으로 “서버에서 돌려주는” 호스팅은 기본 제공하지 않습니다.  
이전에 `npx vercel deploy`로 올리면 **Vercel**이 빌드·호스팅을 해 주기 때문에 주소가 `*.vercel.app`으로 나왔습니다.

**GitHub Pages**는 `out/` 같은 **정적 파일**만 올려서 `https://<조직>.github.io/<저장소이름>/` 주소로 보여 줍니다.  
이 프로젝트는 `next.config.ts`에 `output: "export"`가 있어 정적보내기가 가능합니다.

## 이 저장소에 추가된 것

- `.github/workflows/github-pages.yml`  
  - `main` 또는 `master` 브랜치에 **push**하면 빌드 후 `out/`을 Pages에 배포합니다.
- 빌드 시 `NEXT_PUBLIC_BASE_PATH=/<저장소이름>` 이 자동 설정됩니다 (예: 저장소가 `tarot`이면 `/tarot`).
- `next.config.ts`의 `basePath`와 동일한 값을 쓰며, 이미지·배경 URL은 `src/lib/publicPath.ts`의 `withAssetBase()`로 맞춥니다.

## 한 번만 해 줄 설정 (GitHub 웹) — **deploy 실패 시 필수**

1. 저장소 **Settings → Pages**
2. **Build and deployment** → **Source**를 반드시 **GitHub Actions**로 선택  
   - `Deploy from a branch`(예: `gh-pages`)로 되어 있으면 `deploy` 잡이 **몇 초 만에 실패**합니다.  
   - **GitHub Actions**로 바꾼 뒤 다시 워크플로를 실행하세요.
3. `main`에 워크플로가 있으면 **push** 또는 **Actions → 실패한 워크플로 → Re-run jobs**

### deploy만 빨간 X일 때 확인할 것

| 증상 | 조치 |
|------|------|
| 로그: `HttpError: Not Found` / `Failed to create deployment (status: 404)` / `Ensure GitHub Pages has been enabled` | **Settings → Pages**에서 Pages를 켜고 **Source = GitHub Actions** 로 저장한 뒤 워크플로 **Re-run** |
| build는 성공, deploy만 실패 | Pages 소스가 **GitHub Actions**인지 다시 확인 |
| 조직(Org) 저장소 | Org **Settings → Actions → General**에서 Pages/워크플로 정책 허용 여부 |
| `github-pages` 환경 보호 규칙 | **Settings → Environments → github-pages**에서 필수 리뷰어가 있으면 배포 전 **승인** 필요 |

배포가 끝나면 주소 형식은 다음과 같습니다.

`https://momopick-global.github.io/tarot/`  
(조직·저장소 이름에 따라 달라집니다. 포맷: `https://<owner>.github.io/<repo>/`)

## Supabase / OAuth

프로덕션 URL이 `github.io`로 바뀌면 **Redirect URL** 등에 새 주소를 반드시 추가해야 로그인이 동작합니다.

## Vercel은?

Vercel 프로젝트에 **환경 변수 `NEXT_PUBLIC_BASE_PATH`를 비우거나 설정하지 않으면** 예전처럼 루트 경로(`/`)로 동작합니다.
