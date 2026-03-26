import Script from "next/script";

/** GA4 측정 ID. GTM으로 동일 속성을 이미 보내는 경우 중복 집계될 수 있음 */
const GA_DEFAULT_MEASUREMENT_ID = "G-VV9JEK0RLV";

function gaMeasurementId(): string {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || GA_DEFAULT_MEASUREMENT_ID;
}

/**
 * Google 태그 (gtag.js) — Analytics 4 직접 설치.
 * @see https://developers.google.com/tag-platform/gtagjs
 */
export function GoogleAnalyticsGtag() {
  const id = gaMeasurementId();

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
      />
      <Script id="google-analytics-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
        `.trim()}
      </Script>
    </>
  );
}
