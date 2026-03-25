import { verifyRecaptchaToken } from "@/lib/recaptcha";

type PartnerPayload = {
  company?: string;
  name?: string;
  email?: string;
  website?: string;
  type?: string;
  token?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let payload: PartnerPayload | null = null;

  try {
    payload = (await req.json()) as PartnerPayload;
  } catch {
    return Response.json({ success: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const company = (payload?.company ?? "").trim();
  const name = (payload?.name ?? "").trim();
  const email = (payload?.email ?? "").trim();
  const website = (payload?.website ?? "").trim();
  const type = (payload?.type ?? "").trim();
  const token = payload?.token ?? "";

  if (!company || !name || !email || !type) {
    return Response.json({ success: false, error: "REQUIRED_FIELDS" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return Response.json({ success: false, error: "INVALID_EMAIL" }, { status: 400 });
  }

  const isValidToken = await verifyRecaptchaToken(token);
  if (!isValidToken) {
    return Response.json({ success: false, error: "INVALID_TOKEN" }, { status: 400 });
  }

  // 저장소(DB/메일/슬랙 등) 연동 전까지는 성공 응답만 반환합니다.
  return Response.json({ success: true, website: website || undefined });
}

