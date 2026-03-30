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
      throw new Error(error.message || "제휴 문의 전송에 실패했어요.");
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
