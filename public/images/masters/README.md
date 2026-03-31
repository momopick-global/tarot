# 마스터별 에셋 가이드 (배경, 썸네일, 카드 뒷면)

카드 **앞면**은 `public/images/cards/{폴더}/`에 두고, 그 외 에셋은 `public/images/masters/{폴더}/`에 둡니다.

- `01_Cassian/`, `02_Aiden/`, ..., `09_Pipi/`
- 각 폴더:
  - `thumb.png` — 마스터 썸네일 (`getMasterThumbSrc`)
  - `card-back.png` — 타로 카드 뒷면 (`getMasterCardBackSrc`, `CardSwipeDeck`)
  - `bg_01.png` — 카드 선택(덱) 단계 (`page_03` 초기)
  - `bg_02.png` — 공통 플로우 배경 (`FlowScene` 기본 등)
  - `bg_03.png` — 카드 오픈 후 (`page_03` 카드 단계)

코드: `getMasterThumbSrc`, `getMasterCardBackSrc`, `getMasterBackgroundSrc(masterId, 1 | 2 | 3)` (`src/lib/masterCardAssets.ts`)

## 색보정 (카시안 제외)

카드 뒷면과 동일한 마스터별 색을 `bg_01~03`에 입히려면 (원본에서 다시 복사한 뒤 1회만 실행 권장):

```bash
npm run masters:tint-backgrounds
```

스크립트: `scripts/tint-master-backgrounds.mjs`

## 관련 문서

- `README.md`
- `docs/design-system.md`
- `docs/folder-structure.md`
