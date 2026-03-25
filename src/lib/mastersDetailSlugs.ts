/** `/masters/[slug]` 정적 생성과 동일한 슬러그 (sitemap·메타와 일치) */
export const MASTERS_DETAIL_SLUGS = [
  "cassian",
  "luna",
  "elin",
  "ari",
  "mira",
  "noah",
  "soren",
  "vivi",
  "astra",
] as const;

export const MASTERS_DETAIL_SLUG_SET = new Set<string>(MASTERS_DETAIL_SLUGS);
