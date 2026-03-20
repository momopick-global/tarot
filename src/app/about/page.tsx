import Image from "next/image";
import Link from "next/link";

const ICON_EYE = "/assets/svg-logo-yourtarot.svg-699577b6-cedf-4beb-8082-e9fc60a6227c.png";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-4">
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="relative h-36 w-36">
            <div className="absolute inset-0 rounded-full border border-accent/60" />
            <div className="absolute inset-0 grid place-items-center">
              <Image src={ICON_EYE} alt="" width={34} height={34} />
            </div>
          </div>
          <div className="text-[20px] font-semibold text-accent">YourTarot</div>
        </div>

        <div className="mt-6 space-y-6 text-[14px] leading-[22px] text-neutral-10">
          <div>
            <div className="font-semibold">1. 서비스 소개</div>
            <p className="mt-2 text-neutral-60">
              당신의 오늘을 키워드처럼 담아낸 타로 해석을 제공합니다.
              카드와 문장의 조합으로 마음에 작은 울림을 전해요.
            </p>
          </div>

          <div>
            <div className="font-semibold">2. 유어타로 특징</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-60">
              <li>마음의 흐름을 한눈에 정리해요.</li>
              <li>쉽게 읽히는 문장으로 안내해요.</li>
              <li>카드를 통해 오늘을 다시 바라봐요.</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">3. 타로의 의미</div>
            <p className="mt-2 text-neutral-60">
              타로는 미래를 단정하기보다, 지금의 선택과 감정을 비추는
              거울처럼 쓰입니다.
            </p>
          </div>

          <div>
            <div className="font-semibold">4. 추천 대상</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-60">
              <li>요즘 고민이 많은 분</li>
              <li>자기 이해를 시작하고 싶은 분</li>
              <li>가벼운 질문으로 마음을 정리하고 싶은 분</li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">5. 지금 카드를 선택하세요</div>
            <p className="mt-2 text-neutral-60">
              당신의 오늘을 가장 잘 설명하는 카드를 만나보세요. 선택이
              시작입니다.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="block rounded-xl bg-[#6422AB] px-5 py-4 text-center text-[20px] font-semibold text-neutral-10"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}

