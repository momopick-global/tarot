/**
 * `next.config`의 `basePath`와 동일하게 `NEXT_PUBLIC_BASE_PATH`를 쓰면
 * GitHub Pages(`/{repo}/...`)에서도 public 정적 경로가 맞습니다.
 */
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** `/assets/...`, `/images/...` 등 public 루트 경로 */
export function withAssetBase(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return prefix ? `${prefix}${p}` : p;
}
