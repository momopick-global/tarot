import type { NextConfig } from "next";

/** GitHub Pages 프로젝트 사이트: https://org.github.io/repo/ → CI에서 NEXT_PUBLIC_BASE_PATH=/repo 설정 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
