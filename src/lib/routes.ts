/**
 * 타로 플로우·프로필 공식 URL (짧은 영어 slug).
 * 구 경로는 각 레거시 페이지에서 새 경로로 리다이렉트합니다.
 */
export const ROUTES = {
  tarotStart: "/tarot/start",
  tarotDraw: "/tarot/draw",
  tarotReveal: "/tarot/reveal",
  tarotAnalyze: "/tarot/analyze",
  tarotResult: "/tarot/result",
  masterProfile: "/masters/profile",
} as const;

export function tarotDrawWithMaster(masterId: string): string {
  return `${ROUTES.tarotDraw}?master=${encodeURIComponent(masterId)}`;
}

export function tarotRevealWith(masterId: string, card: string | number): string {
  return `${ROUTES.tarotReveal}?master=${encodeURIComponent(masterId)}&card=${encodeURIComponent(String(card))}`;
}

export function tarotAnalyzeWith(masterId: string, card: string | number): string {
  return `${ROUTES.tarotAnalyze}?master=${encodeURIComponent(masterId)}&card=${encodeURIComponent(String(card))}`;
}

export function tarotResultWith(masterId: string, card: string | number): string {
  return `${ROUTES.tarotResult}?master=${encodeURIComponent(masterId)}&card=${encodeURIComponent(String(card))}`;
}

export function masterProfileWith(masterId: string): string {
  return `${ROUTES.masterProfile}?master=${encodeURIComponent(masterId)}`;
}
