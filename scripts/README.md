# Scripts

운영, 배포, 데이터 마이그레이션 자동화 스크립트를 이 디렉터리에 둡니다.

## 작성 규칙

- 파일명은 동작이 드러나도록 `verb-target` 형태를 권장합니다.
- 반복 실행 가능하도록(멱등성) 작성하고, 실패 시 원인 로그를 명확히 출력합니다.
- 실행 방법과 옵션은 파일 상단 주석 또는 관련 문서에 함께 기록합니다.

## 관련 문서

- `README.md`
- `docs/production-checklist.md`

## 유틸리티

- `check-git-repo-identity.sh`
  - 목적: 루트 디렉터리(기본 `~/Desktop`) 하위의 Git 저장소를 훑어 `origin`, 브랜치, 로컬 Git 사용자(`user.name/email`)를 한 번에 점검합니다.
  - 실행:
    - `bash scripts/check-git-repo-identity.sh`
    - `bash scripts/check-git-repo-identity.sh "$HOME/Desktop"`

