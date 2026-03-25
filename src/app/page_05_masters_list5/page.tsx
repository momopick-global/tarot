import type { Metadata } from "next";
import { LegacyPathRedirect } from "@/components/LegacyPathRedirect";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "이동 중",
};

export default function LegacyRedirectPage05() {
  return <LegacyPathRedirect hrefBase={ROUTES.tarotReveal} />;
}
