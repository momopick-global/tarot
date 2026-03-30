"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * 배포 환경에서 OAuth 콜백 URL을 프로젝트 URL로 잘못 넣으면
 * `.../auth/v1/callback/auth/v1/authorize` 처럼 경로가 이중으로 붙어 state 오류가 납니다.
 */
function normalizeSupabaseProjectUrl(raw: string): string {
  let u = raw.trim().replace(/\/+$/, "");
  const suffix = "/auth/v1/callback";
  if (u.endsWith(suffix)) {
    u = u.slice(0, -suffix.length).replace(/\/+$/, "");
  }
  return u;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (client) return client;

  const urlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!urlRaw || !anonKey) {
    return null;
  }

  const url = normalizeSupabaseProjectUrl(urlRaw);

  client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return client;
}

