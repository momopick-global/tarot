import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";

const PROFILE_1 = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";
const PROFILE_2 = "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png";
const DIAGRAM = "/assets/diagram-0f7e93e7-8c32-4e84-a6e5-65f5d1622958.png";

export default function PageMasterProfile01({
  searchParams,
}: Readonly<{
  searchParams?: { master?: string };
}>) {
  const currentId = searchParams?.master ?? "cassian";
  const current = FLOW_MASTERS.find((m) => m.id === currentId) ?? FLOW_MASTERS[0];
  const profileSrc =
    current.image ??
    (current.id === "cassian" ? PROFILE_1 : current.id === "kaien" ? PROFILE_2 : PROFILE_1);

  return (
    <main className="w-full">
      <FlowScene backHref="/page_02_masters_list_2">
        <div className="mt-2 flex justify-center">
          <Image src={profileSrc} alt={current.name} width={170} height={170} className="rounded-xl" />
        </div>
        <div className="pt-3 text-center text-[28px] font-semibold text-white">{current.name}</div>

        <div className="mt-4 rounded-xl border border-primary bg-[rgba(7,6,22,0.8)] p-3">
          <div className="mx-auto overflow-hidden rounded-lg border border-primary/60">
            <Image src={DIAGRAM} alt="성향 차트" width={300} height={300} className="h-auto w-full" />
          </div>
          <div className="mt-3 space-y-2 text-[13px] leading-[1.5] text-white">
            <p>✨ 이름/성격/철학</p>
            <p className="text-[#d7ccff]">{current.profileTitle}</p>
            <p>✨ 성향</p>
            <p className="text-[#d7ccff]">
              {current.profileSummary}
            </p>
            <p>✨ 전문 분야</p>
            <p className="text-[#d7ccff]">
              {current.specialty}
            </p>
            <p>✨ 추천 키워드</p>
            <p className="text-[#d7ccff]">{current.keywords.join(" · ")}</p>
          </div>
        </div>
      </FlowScene>

      <div className="mx-auto w-full max-w-[430px] px-4 py-6">
        <Link
          href={`/page_03_card-selection_1?master=${current.id}`}
          className="block rounded-xl bg-[#6422AB] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          다음: 카드 선택 1
        </Link>
      </div>
    </main>
  );
}

