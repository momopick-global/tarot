"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;

    const hasPendingOAuth = sessionStorage.getItem(OAUTH_PENDING_KEY) === "1";
    if (!hasPendingOAuth) return;

    // useSearchParams는 정적 export 빌드에서 Suspense 경계가 필요해 window에서 읽습니다.
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get("error");
    const oauthErrorCode = params.get("error_code");
    const oauthErrorDescription = params.get("error_description");
    if (!oauthError) return;

    sessionStorage.removeItem(OAUTH_PENDING_KEY);
    const message = oauthErrorDescription
      ? decodeURIComponent(oauthErrorDescription.replace(/\+/g, " "))
      : oauthErrorCode ?? oauthError;
    window.alert(`소셜 로그인에 실패했어요.\n${message}`);
    router.replace("/login");
  }, [pathname, router]);

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
