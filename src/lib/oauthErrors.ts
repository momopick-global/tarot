export type OAuthProviderId = "google" | "kakao" | "facebook";

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error && typeof (error as { message: unknown }).message === "string") {
    return (error as { message: string }).message;
  }
  return String(error);
}

/** Supabase Auth 오류 문자열을 사용자 안내 문구로 바꿉니다. */
export function formatOAuthLoginError(error: unknown, provider: OAuthProviderId): string {
  const raw = errorMessage(error);
  const lower = raw.toLowerCase();

  if (
    lower.includes("not enabled") ||
    lower.includes("unsupported provider") ||
    lower.includes("provider is not enabled")
  ) {
    if (provider === "google") {
      return "구글 로그인이 아직 켜져 있지 않아요. Supabase → Authentication → Providers → Google 에서 켠 뒤, Google Cloud OAuth 클라이언트 ID·비밀을 입력해 주세요.";
    }
    if (provider === "facebook") {
      return "페이스북 로그인이 아직 켜져 있지 않아요. Supabase → Providers → Facebook 을 확인해 주세요.";
    }
    if (provider === "kakao") {
      return "카카오 로그인 설정을 확인해 주세요. Supabase → Providers → Kakao 를 확인해 주세요.";
    }
  }

  return raw || "로그인 중 문제가 발생했습니다.";
}
