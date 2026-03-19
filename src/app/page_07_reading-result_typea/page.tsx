import Image from "next/image";
import Link from "next/link";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS, getCardResultById } from "@/lib/flowData";

const MASTER_1 = "/assets/master_01_Cassian_thum-4f10f821-c817-4965-8914-064d2df141f8.png";
const MASTER_2 = "/assets/master_02_Aiden__thum-157fb7f3-0bbf-4bec-a633-5ce0db9fedd0.png";
const SHARE_LINK = "/assets/svg-ic-share-link.svg-26940f47-d010-498b-b1e1-68303b31e59e.png";
const SHARE_KAKAO = "/assets/svg-ic-social-kakao.svg-20eca7d6-4d65-40b8-954f-17463d423b00.png";
const SHARE_FB = "/assets/svg-ic-share-facebook.svg-527221c9-1874-4fae-83ed-579ce7d4210b.png";
const SHARE_X = "/assets/svg-ic-share-x.svg-4ef9a083-7b44-439e-bfa4-3c305b5bf580.png";
const RESULT_SHEET = "/assets/page_07_reading-result_typea-4f8de43d-73d2-4278-9c2b-6601ae8cf60e.png";

export default function Page07ReadingResultTypeA({
  searchParams,
}: Readonly<{
  searchParams?: { master?: string; card?: string };
}>) {
  const current =
    FLOW_MASTERS.find((m) => m.id === searchParams?.master) ?? FLOW_MASTERS[0];
  const card = searchParams?.card ?? "05";
  const result = getCardResultById(card);
  return (
    <main className="w-full">
      <FlowScene>
        <div className="mt-2 rounded-xl border border-[#8d6cd8] bg-[rgba(6,4,22,0.76)] p-3">
          <div className="relative mx-auto h-[280px] w-[205px] overflow-hidden rounded-xl border border-[#bfa8ff]">
            <Image
              src={RESULT_SHEET}
              alt="tarot card art"
              width={288}
              height={624}
              className="absolute max-w-none"
              unoptimized
              style={{
                width: 288,
                height: 624,
                transform: "translate(0px, -32px)",
              }}
            />
          </div>
          <div className="pt-3 text-center text-[16px] font-semibold text-white">
            {result.titleEn}
          </div>
          <div className="pt-1 text-center text-[15px] text-[#e2d9ff]">{result.titleKo}</div>
        </div>
      </FlowScene>

      <section className="mx-auto w-full max-w-[430px] px-4 pt-5">
        <div className="space-y-3 rounded-xl border border-primary/50 bg-[rgba(11,10,32,0.75)] p-4 text-[13px] leading-[1.55] text-white">
          <p>🔮 운세 요약: {result.summary}</p>
          <p>💘 애정: {result.love}</p>
          <p>💼 커리어: {result.career}</p>
          <p>💰 재물: {result.money}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" className="rounded-xl bg-[#6422AB] px-4 py-3 text-[15px] font-semibold">
            다시하기
          </button>
          <button
            type="button"
            className="rounded-xl border border-primary bg-[rgba(12,10,36,0.92)] px-4 py-3 text-[15px] text-[#d8ccff]"
          >
            결과 저장
          </button>
        </div>

        <div className="mt-6 text-center text-[18px] text-[#d8ccff]">🧿 친구에게 공유하기</div>
        <div className="mt-3 flex justify-center gap-3">
          <Image src={SHARE_LINK} alt="" width={40} height={40} />
          <Image src={SHARE_KAKAO} alt="" width={40} height={40} />
          <Image src={SHARE_FB} alt="" width={40} height={40} />
          <Image src={SHARE_X} alt="" width={40} height={40} />
        </div>

        <div className="mt-7 rounded-xl border border-primary/40 bg-[rgba(8,7,22,0.72)] p-3">
          <div className="text-[16px] font-semibold">
            ✅ 나와 잘 맞는 마스터의 해석보기 ({current.name})
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[MASTER_1, MASTER_2, MASTER_1, MASTER_2, MASTER_1, MASTER_2].map((src, i) => (
              <Image key={i} src={src} alt="" width={96} height={96} className="h-auto w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[430px] px-4 pb-6 pt-6">
        <Link
          href={`/page_01_masters_list_1?from=${card}`}
          className="block rounded-xl border border-primary bg-[rgba(16,12,44,0.95)] px-4 py-3 text-center text-sm font-semibold text-[#d8ccff]"
        >
          처음으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

