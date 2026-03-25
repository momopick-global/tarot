import { verifyRecaptchaToken } from "@/lib/recaptcha";

type FeedbackPayload = {
  contact?: string;
  content?: string;
  needResponse?: boolean;
  token?: string;
};

export async function POST(req: Request) {
  let payload: FeedbackPayload | null = null;

  try {
    payload = (await req.json()) as FeedbackPayload;
  } catch {
    return Response.json({ success: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const content = (payload?.content ?? "").trim();
  const token = payload?.token ?? "";

  if (!content) {
    return Response.json({ success: false, error: "CONTENT_REQUIRED" }, { status: 400 });
  }

  const isValidToken = await verifyRecaptchaToken(token);
  if (!isValidToken) {
    return Response.json({ success: false, error: "INVALID_TOKEN" }, { status: 400 });
  }

  // 저장소(DB/메일/슬랙 등) 연동 전까지는 성공 응답만 반환합니다.
  return Response.json({ success: true });
}

