"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  consumeAuthReturnPath,
  DEFAULT_AFTER_LOGIN_PATH,
  OAUTH_PENDING_KEY,
} from "@/lib/authReturnPath";
import { getSupabaseClient } from "@/lib/supabase";

/**
 * OAuth 완료 후 홈(/) 등으로 돌아왔을 때, 로그인 직전에 저장해 둔 return 경로로 이동합니다.
 * `loginWithProvider`에서 OAUTH_PENDING_KEY 를 세팅한 경우에만 동작합니다.
 */
export function AuthReturnRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;

    const hasPendingOAuth = sessionStorage.getItem(OAUTH_PENDING_KEY) === "1";
    if (!hasPendingOAuth) return;

    const oauthError = searchParams?.get("error");
    const oauthErrorCode = searchParams?.get("error_code");
    const oauthErrorDescription = searchParams?.get("error_description");
    if (!oauthError) return;

    sessionStorage.removeItem(OAUTH_PENDING_KEY);
    const message = oauthErrorDescription
      ? decodeURIComponent(oauthErrorDescription.replace(/\+/g, " "))
      : oauthErrorCode ?? oauthError;
    window.alert(`소셜 로그인에 실패했어요.\n${message}`);
    router.replace("/login");
  }, [pathname, searchParams, router]);

  useEffect(() => {
    // OAuth provider redirects back to "/auth/callback" and can also land on "/".
    // Restricting this effect to these paths prevents route flicker on normal navigation.
    const isOAuthLandingPath = pathname === "/" || pathname === "/auth/callback";
    if (!isOAuthLandingPath) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(OAUTH_PENDING_KEY) !== "1") return;

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const redirectAfterAuth = () => {
      if (sessionStorage.getItem(OAUTH_PENDING_KEY) !== "1") return;
      sessionStorage.removeItem(OAUTH_PENDING_KEY);
      const next = consumeAuthReturnPath();
      router.replace(next ?? DEFAULT_AFTER_LOGIN_PATH);
    };

    // Some OAuth returns can miss auth events depending on timing.
    // Read the current session once to guarantee redirect progression.
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        redirectAfterAuth();
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "INITIAL_SESSION") return;
      if (!session?.user) return;
      redirectAfterAuth();
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return null;
}
