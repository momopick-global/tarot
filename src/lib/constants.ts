import { basePathPrefix } from "@/lib/siteUrl";

export const APP_NAME = "YourTarot";

/** 클라이언트 fetch용: GitHub Pages `basePath`가 있으면 `/repo/api/...` 로 맞춤 */
function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const prefix = basePathPrefix();
  return prefix ? `${prefix}${p}` : p;
}

export const API_ENDPOINTS = {
  feedback: apiUrl("/api/feedback"),
  partner: apiUrl("/api/partner"),
  withdraw: apiUrl("/api/withdraw"),
  recaptcha: apiUrl("/api/recaptcha"),
  results: apiUrl("/api/results"),
} as const;

export const LUPI_POLICY = {
  signupBonus: 100,
  dailyBonus: 10,
} as const;

