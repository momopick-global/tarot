import Link from "next/link";
import { DismissibleGuide } from "@/components/DismissibleGuide";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";

export default function Page03CardSelection1({
  searchParams,
}: Readonly<{
  searchParams?: { master?: string };
}>) {
  const currentId = searchParams?.master ?? "cassian";
  const current = FLOW_MASTERS.find((m) => m.id === currentId) ?? FLOW_MASTERS[0];

  return (
    <main className="w-full">
      <FlowScene
        backHref="/page_01_masters_list_1"
        backgroundSrc="/assets/bg-page03-master.png"
        sceneClassName="h-[844px] min-h-[844px]"
        backImageSrc="/assets/btn-back-page03.png"
      >
        <div className="mx-auto flex min-h-[744px] w-full max-w-[350px] flex-col justify-center">
          <DismissibleGuide className="rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-4 pr-10 text-[14px] leading-[1.6] text-white">
            별들은 이미 답을 알고 있습니다.
            <br />
            이제 당신의 카드를 확인해 봅시다.
          </DismissibleGuide>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Link
              href={`/page_04_card-selection_2?master=${current.id}`}
              className="rounded-xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white"
            >
              카드 받기
            </Link>
            <Link
              href="/page_01_masters_list_1"
              className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff]"
            >
              마스터선택
            </Link>
          </div>
        </div>
      </FlowScene>
      <div className="mx-auto h-[20px] w-full max-w-[390px] bg-[#17182E]" />
    </main>
  );
}
