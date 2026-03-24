/**
 * 마스터별 카드 해석 JSON 스키마 (public이 아닌 src/data/readings/*.json)
 * 키: "0" … "77" (덱 인덱스)
 */
export type CardReadingJson = {
  /** 카드 이름 (영어) */
  titleEn: string;
  /** 카드 이름 (한글) */
  titleKo: string;
  /** 예: "56번 카드, 삼검 / 소드 3" — 비우면 화면에서 번호+한글명으로 생성 */
  cardSubtitle?: string;
  /** 오늘의 운세 요약 */
  summary: string;
  categories: {
    /** 업무/학업 */
    work: string;
    /** 애정 */
    love: string;
    /** 금전 */
    money: string;
    /** 인간관계 */
    relationship: string;
    /** 건강 */
    health: string;
    /** 기회/행운 */
    luck: string;
  };
  advice: {
    /** 오늘의 조언 (인용 문장) */
    quote: string;
    luckyItem: string;
    luckyPlace: string;
    caution: string;
  };
  /** 핵심 키워드 (쉼표로 나열해도 되고 배열로만 저장) */
  keywords: string[];
};
