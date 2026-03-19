export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  if (!token) return false;
  // TODO: 서버 연동 전 임시 검증 로직
  return token.length > 10;
}

