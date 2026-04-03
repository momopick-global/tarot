"use client";

import { useEffect } from "react";

function stripBasePath(pathname: string, base: string): string {
  const normalizedBase = base.replace(/\/$/, "");
  if (!normalizedBase) return pathname;
  if (pathname === normalizedBase) return "/";
  if (pathname.startsWith(`${normalizedBase}/`)) {
    const rest = pathname.slice(normalizedBase.length);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

/**
 * GitHub Pages(`*.github.io`) 미러 접속 시 운영 도메인(NEXT_PUBLIC_SITE_URL)으로 이동합니다.
 * 로컬·Cloudflare·Vercel 등은 그대로 둡니다.
 */
export function GithubPagesToMainSiteRedirect() {
  useEffect(() => {
    const host = window.location.hostname;
    if (!host.endsWith(".github.io")) return;

    const main =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.yourtarot.cc";
    const baseRaw = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const path = stripBasePath(window.location.pathname, baseRaw);
    const suffix = path === "/" ? "/" : path;
    const target = `${main}${suffix}${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }, []);

  return null;
}
