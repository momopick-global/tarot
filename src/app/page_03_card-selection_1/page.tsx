import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";

const MASTER = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";
const MASTER_2 = "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png";

export default function Page03CardSelection1({
  searchParams,
}: Readonly<{
  searchParams?: { master?: string };
}>) {
  const currentId = searchParams?.master ?? "cassian";
  const current = FLOW_MASTERS.find((m) => m.id === currentId) ?? FLOW_MASTERS[0];
  const masterImage = current.image ?? (current.id === "kaien" ? MASTER_2 : MASTER);

  return (
    <main className="w-full">
      <FlowScene backHref="/page_02_masters_list_2">
        <div className="mt-1 flex justify-center">
          <Image src={masterImage} alt={current.name} width={180} height={180} className="rounded-xl" />
        </div>

        <div className="mt-4 rounded-xl border border-primary bg-[rgba(8,7,22,0.78)] p-4 text-[14px] leading-[1.6] text-white">
          별들은 이미 답을 알고 있습니다.
          <br />
          이제 당신의 카드를 확인해 봅시다.
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 pb-8">
          <Link
            href={`/page_04_card-selection_2?master=${current.id}`}
            className="rounded-xl bg-[#6422AB] px-3 py-3 text-center text-[20px] font-semibold text-white"
          >
            카드 받기
          </Link>
          <Link
            href={`/page_02_masters_list_2?master=${current.id}`}
            className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-3 py-3 text-center text-[16px] text-[#d8ccff]"
          >
            마스터선택
          </Link>
        </div>
      </FlowScene>
      <div className="mx-auto h-2 w-full max-w-[430px]" />
    </main>
  );
}
