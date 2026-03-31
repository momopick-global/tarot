# 마스터별 카드 해석 JSON 가이드

- 파일: `{masterId}.json` — `cassian`, `aiden`, `morgana`, `noa`, `erebus`, `serina`, `nyx`, `clotho`, `pipi`
- 최상위 키: `"0"` … `"77"` (덱에서 쓰는 카드 인덱스와 동일)
- 필드 스키마: `src/lib/cardReadingTypes.ts` 의 `CardReadingJson` 참고
- **일괄 수정**: VS Code 폴더 검색/다중 커서, 또는 스프레드시트 내보내기 후 스크립트 병합
- 샘플: `cassian.json` 의 `"55"` (화면 예시용)

JSON에 해당 키가 없으면 `getCardResultById` + 자동 생성 문구로 채워집니다.

## 78장 빈 템플릿 한 번에 만들기

```bash
npm run readings:seed-templates
```

- 없는 키(`"0"`~`"77"`)만 빈 객체로 추가하고, **이미 쓴 카드(예: cassian `55`)는 그대로** 둡니다.
- 모든 필드를 템플릿 기준으로 다시 맞추려면(내용은 병합): `node scripts/seed-reading-templates.mjs --reset`

## 관련 문서

- `README.md`
- `docs/data-model.md`
