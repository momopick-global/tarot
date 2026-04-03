import { siteOrigin } from "@/lib/siteUrl";

const SITE_NAME = "유어타로";
const DESCRIPTION =
  "타로 카드로 오늘의 감정 흐름과 행동 힌트를 확인하는 유어타로(YourTarot) 서비스입니다.";

/**
 * Schema.org WebSite — 검색엔진용 구조화 데이터(JSON-LD).
 * @see https://schema.org/WebSite
 */
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "YourTarot",
    url: `${siteOrigin()}/`,
    inLanguage: "ko-KR",
    description: DESCRIPTION,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
