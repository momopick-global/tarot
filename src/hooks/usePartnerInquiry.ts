import { postJson } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { getSupabaseClient } from "@/lib/supabase";

export type PartnerInquiryPayload = {
  company: string;
  name: string;
  email: string;
  website?: string | null;
  type: string;
  token: string;
};

/** PostgREST: 테이블이 없거나 스키마 캐시에 없을 때 */
function isPartnerInquiriesTableMissing(message: string): boolean {
  return (
    /could not find the table ['"]public\.partner_inquiries['"]/i.test(message) ||
    (/schema cache/i.test(message) && /\bpartner_inquiries\b/i.test(message)) ||
    /relation ['"]public\.partner_inquiries['"] does not exist/i.test(message)
  );
}

/**
 * 정적 export(`output: "export"`) 배포에서는 `/api/partner` POST가 405/404가 될 수 있습니다.
 * Supabase가 설정된 경우 partner_inquiries에 직접 저장하고, 없을 때만 API로 폴백합니다.
 */
export async function submitPartnerInquiry(payload: PartnerInquiryPayload) {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("partner_inquiries").insert({
      company_name: payload.company.trim(),
      contact_person: payload.name.trim(),
      email: payload.email.trim(),
      website: payload.website?.trim() || null,
      partnership_type: payload.type.trim(),
      notes: null,
    });

    if (error) {
      const raw = error.message ?? "";
      if (isPartnerInquiriesTableMissing(raw)) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[partner] Supabase에 public.partner_inquiries 테이블이 없습니다. supabase/migrations/20260330110000_partner_inquiries.sql 을 SQL Editor에서 실행하거나 supabase db push 로 적용하세요.",
          );
        }
        throw new Error(
          "문의를 저장할 수 없습니다. 잠시 후 다시 시도해 주세요. 문제가 계속되면 이메일로 문의해 주세요.",
        );
      }
      throw new Error(raw || "제휴 문의 전송에 실패했어요.");
    }
    return { success: true as const };
  }

  try {
    return postJson<{ success: boolean }>(API_ENDPOINTS.partner, payload);
  } catch (error) {
    if (error instanceof Error && /API request failed: (404|405)/.test(error.message)) {
      throw new Error("제휴 문의 기능을 점검 중입니다. 잠시 후 다시 시도해 주세요.");
    }
    throw error;
  }
}
