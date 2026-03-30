"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  consumeAuthReturnPath,
  DEFAULT_AFTER_LOGIN_PATH,
  OAUTH_PENDING_KEY,
} from "@/lib/authReturnPath";
import { getSupabaseClient } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(OAUTH_PENDING_KEY) !== "1") return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

    let redirected = false;
    const tryResolve = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        redirected = true;
        sessionStorage.removeItem(OAUTH_PENDING_KEY);
        const next = consumeAuthReturnPath();
        router.replace(next ?? DEFAULT_AFTER_LOGIN_PATH);
      }
    };

    void tryResolve();
    const timeoutId = window.setTimeout(() => {
      if (redirected) return;
      // OAuth callback reached but session is still missing: recover to login.
      sessionStorage.removeItem(OAUTH_PENDING_KEY);
      router.replace("/login");
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-[390px] items-center justify-center px-5 text-center">
      <p className="text-[15px] leading-[22px] text-neutral-60">로그인 처리 중입니다…</p>
    </main>
  );
}
