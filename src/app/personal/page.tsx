import { MarkdownArticle } from "@/components/MarkdownArticle";

const MARKDOWN = `# 개인정보처리방침

✅ 개인정보처리방침

유어타로(YourTarot)는 이용자의 개인정보 보호를 중요하게 생각하며 관련 법령을 준수합니다.

시행일자: 2026년 3월 10일

1. 수집하는 정보

서비스는 다음 정보를 수집할 수 있습니다.

- 브라우저 정보
- 기기 정보
- 쿠키 정보

2. 개인정보 사용 목적

수집된 정보는 다음 목적을 위해 사용됩니다.

- 서비스 운영
- 서비스 개선
- 이용 통계 분석

3. 쿠키 사용

서비스는 사용자 경험 향상을 위해 쿠키를 사용할 수 있습니다.

4. 개인정보 보관

개인정보는 필요한 기간 동안만 보관됩니다.

5. 개인정보 보호

서비스는 개인정보 보호를 위해 합리적인 보안 조치를 시행합니다.`;

export default function PersonalPolicyPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-6">
        <MarkdownArticle markdown={MARKDOWN} />
      </section>
    </main>
  );
}

