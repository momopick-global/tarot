import { MarkdownArticle } from "@/components/MarkdownArticle";

const MARKDOWN = `# 면책조항

✅ 면책조항 (Disclaimer)

유어타로(YourTarot)는 타로 카드 기반의 콘텐츠 서비스를 제공합니다.

본 서비스에서 제공되는 타로 해석 및 운세 콘텐츠는 엔터테인먼트 및 참고 목적으로 제공됩니다.

서비스에서 제공되는 정보는 개인의 미래를 보장하거나 예측하는 것이 아니며, 실제 결과와 다를 수 있습니다.

이용자는 서비스에서 제공되는 정보를 개인적인 참고 자료로만 활용해야 하며, 투자, 건강, 법률 또는 기타 중요한 의사결정의 근거로 사용해서는 안 됩니다.

유어타로는 서비스 이용으로 인해 발생할 수 있는 직접적 또는 간접적 손해에 대해 책임을 지지 않습니다.

이용자는 본 서비스를 이용함으로써 위 사항에 동의한 것으로 간주됩니다.

시행일자: 2026년 3월 10일`;

export default function DisclaimerPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-6">
        <MarkdownArticle markdown={MARKDOWN} />
      </section>
    </main>
  );
}

