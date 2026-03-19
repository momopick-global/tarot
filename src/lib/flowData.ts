export type Master = {
  id: string;
  name: string;
  type: string;
  desc: string;
  image: string | null;
  profileTitle: string;
  profileSummary: string;
  specialty: string;
  keywords: string[];
};

export const FLOW_MASTERS: Master[] = [
  {
    id: "cassian",
    name: "카시안",
    type: "분석형",
    desc: "별의 움직임과 타로를 함께 분석하는 논리적 리더",
    image: "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png",
    profileTitle: "천문학자 / 분석형",
    profileSummary: "냉철한 분석과 논리적인 설명으로 복잡한 선택지를 또렷하게 정리합니다.",
    specialty: "커리어, 진로, 관계의 균형",
    keywords: ["문제 정의", "선택", "균형", "실행"],
  },
  {
    id: "kaien",
    name: "카이언",
    type: "상담형",
    desc: "현실 공감과 따뜻한 말로 방향을 제시하는 조언가",
    image: "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png",
    profileTitle: "상담가 / 공감형",
    profileSummary: "감정을 세심하게 듣고, 지금 당장 실천 가능한 조언을 전합니다.",
    specialty: "관계 회복, 자존감, 일상 루틴",
    keywords: ["공감", "회복", "실천", "안정"],
  },
  {
    id: "morgana",
    name: "모르가나",
    type: "직설형",
    desc: "강한 추진력과 결단을 돕는 직관형",
    image: null,
    profileTitle: "전략가 / 직설형",
    profileSummary: "핵심만 빠르게 짚어 결단을 돕는 스타일입니다.",
    specialty: "결정, 전환, 우선순위",
    keywords: ["결단", "속도", "핵심", "실행력"],
  },
  {
    id: "noa",
    name: "노아",
    type: "구원형",
    desc: "정서 회복을 중심으로 위로를 건네는 치유형",
    image: null,
    profileTitle: "치유자 / 구원형",
    profileSummary: "불안한 마음을 안정시키고 회복 포인트를 제시합니다.",
    specialty: "정서 회복, 관계 안정",
    keywords: ["치유", "안정", "회복", "위로"],
  },
  {
    id: "erebus",
    name: "에레비스",
    type: "현실형",
    desc: "현실적인 액션 플랜을 제시하는 전략형",
    image: null,
    profileTitle: "실행가 / 현실형",
    profileSummary: "현실적 제약을 고려해 가능한 행동 계획을 만듭니다.",
    specialty: "업무, 프로젝트, 재정 계획",
    keywords: ["현실", "전략", "우선순위", "관리"],
  },
  {
    id: "serina",
    name: "세리나",
    type: "행운형",
    desc: "밝은 흐름과 타이밍 포인트를 잡는 낙관형",
    image: null,
    profileTitle: "인도자 / 행운형",
    profileSummary: "긍정적 흐름을 읽고 좋은 타이밍을 안내합니다.",
    specialty: "기회 포착, 대인운",
    keywords: ["타이밍", "행운", "확장", "기회"],
  },
  {
    id: "nyx",
    name: "닉스",
    type: "초월형",
    desc: "깊은 내면과 영감을 읽는 신비형",
    image: null,
    profileTitle: "신비가 / 초월형",
    profileSummary: "내면의 그림자를 해석해 직관적 통찰을 이끕니다.",
    specialty: "자아 탐색, 감정 해석",
    keywords: ["직관", "통찰", "심연", "변화"],
  },
  {
    id: "clotho",
    name: "클로토",
    type: "시형",
    desc: "감성적인 문장과 상징으로 해석하는 서정형",
    image: null,
    profileTitle: "시인 / 서정형",
    profileSummary: "상징과 이야기로 감정을 부드럽게 해석합니다.",
    specialty: "감성 회복, 관계 메시지",
    keywords: ["상징", "감성", "서사", "공명"],
  },
  {
    id: "pipi",
    name: "피피",
    type: "감성형",
    desc: "감정의 결을 섬세하게 짚어주는 공감형",
    image: null,
    profileTitle: "공감자 / 감성형",
    profileSummary: "작은 감정 변화까지 세밀하게 읽어 위로를 전합니다.",
    specialty: "감정 정리, 관계 대화",
    keywords: ["공감", "섬세함", "대화", "정리"],
  },
];

export const CARD_RESULT = {
  titleEn: "Three of Swords",
  titleKo: "세 검",
  summary: "중요한 감정의 결정을 앞둔 시기입니다.",
  love: "관계에서 진실한 대화가 필요한 날입니다.",
  career: "감정이 아닌 데이터 중심 판단이 유리합니다.",
  money: "불필요한 지출을 줄이고 계획 소비가 필요합니다.",
};

const CARD_RESULT_POOL = [
  {
    titleEn: "Three of Swords",
    titleKo: "세 검",
    summary: "중요한 감정의 결정을 앞둔 시기입니다.",
    love: "관계에서 진실한 대화가 필요한 날입니다.",
    career: "감정이 아닌 데이터 중심 판단이 유리합니다.",
    money: "불필요한 지출을 줄이고 계획 소비가 필요합니다.",
  },
  {
    titleEn: "The Star",
    titleKo: "별",
    summary: "기대하던 방향이 조금씩 선명해지는 흐름입니다.",
    love: "조급함을 내려놓을수록 관계의 온도가 회복됩니다.",
    career: "장기 계획을 세우면 성과의 안정성이 높아집니다.",
    money: "작은 절약 습관이 큰 차이를 만드는 시기입니다.",
  },
  {
    titleEn: "The Chariot",
    titleKo: "전차",
    summary: "흔들리던 이슈에 추진력이 생기는 타이밍입니다.",
    love: "표현을 미루지 말고 핵심 감정을 먼저 전해보세요.",
    career: "속도와 집중이 성과를 당겨옵니다.",
    money: "목표를 정한 뒤 지출 우선순위를 조정하세요.",
  },
  {
    titleEn: "The Hermit",
    titleKo: "은둔자",
    summary: "외부 소음보다 내 기준을 세우는 것이 중요합니다.",
    love: "잠시 거리를 두고 감정을 정리하면 오해가 줄어듭니다.",
    career: "혼자 깊게 파는 시간이 실력 차이를 만듭니다.",
    money: "충동 소비를 줄이고 필요한 것만 남기세요.",
  },
];

export function getCardResultById(cardId: string) {
  const n = Number.parseInt(cardId, 10);
  if (Number.isNaN(n)) return CARD_RESULT_POOL[0];
  return CARD_RESULT_POOL[n % CARD_RESULT_POOL.length];
}

