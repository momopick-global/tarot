import Link from "next/link";

export default function DrawTodayPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[430px] px-5 pt-10 pb-6">
        <h1 className="text-[18px] font-semibold">오늘의 타로 뽑기</h1>
        <p className="mt-4 text-[14px] leading-[22px] text-neutral-60">
          (기능 구현 단계 아님) 이 화면은 카드 선택 UI를 추후 연결할
          자리입니다.
        </p>

        <div className="mt-10">
          <Link
            href="/result/today/demo"
            className="block rounded-xl bg-[#6422AB] px-5 py-4 text-center text-[20px] font-semibold text-neutral-10"
          >
            데모 결과 보기
          </Link>
        </div>
      </section>
    </main>
  );
}

