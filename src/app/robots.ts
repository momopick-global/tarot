import type { MetadataRoute } from "next";
import { absoluteSitemapUrl } from "@/lib/siteUrl";

/** `output: "export"` 빌드에서 robots 정적 생성 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteSitemapUrl(),
  };
}
