import type { MetadataRoute } from "next";
import { FLOW_MASTERS } from "@/lib/flowData";

/** `output: "export"` 빌드에서 sitemap 정적 생성 허용 */
export const dynamic = "force-static";

function siteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

function basePathPrefix(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
}

function absoluteUrl(path: string): string {
  const base = siteOrigin();
  const prefix = basePathPrefix();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${p}`;
}

const STATIC_PATHS = [
  "/",
  "/about/",
  "/login/",
  "/menu/",
  "/masters/",
  "/terms/",
  "/personal/",
  "/disclaimer/",
  "/recommended/",
  "/partner/",
  "/mypage/",
  "/draw/today/",
  "/page_01_masters_list_1/",
  "/page_03_card-selection_1/",
  "/page_05_masters_list5/",
  "/page_06_analyzing/",
  "/page_07_reading-result_typea/",
  "/page-master-profile_01/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const masterEntries: MetadataRoute.Sitemap = FLOW_MASTERS.map((m) => ({
    url: absoluteUrl(`/masters/${m.id}/`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...masterEntries];
}
