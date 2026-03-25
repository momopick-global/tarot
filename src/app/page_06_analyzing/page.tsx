import type { Metadata } from "next";
import { LegacyPathRedirect } from "@/components/LegacyPathRedirect";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "이동 중",
};

export default function LegacyRedirectPage06() {
  return <LegacyPathRedirect hrefBase={ROUTES.tarotAnalyze} />;
}
