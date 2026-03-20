import Link from "next/link";

export default function MenuPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-0 pt-6">
        <div className="mx-4 rounded-2xl bg-neutral-10 px-6 py-10 text-neutral-90">
          <div className="flex items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-[rgba(111,66,193,0.12)]">
              <span aria-hidden>🟣</span>
            </div>
            <div className="text-[22px] font-semibold">YourTarot</div>
          </div>

          <div className="mt-10 space-y-7">
            <Link
              href="/about"
              className="flex items-center gap-3 text-[18px] font-semibold"
            >
              <span aria-hidden>✨</span>
              서비스 소개
            </Link>

            <Link
              href="/masters"
              className="flex items-center gap-3 text-[18px] font-semibold"
            >
              <span aria-hidden>👤</span>
              타로 마스터 소개
            </Link>

            <Link
              href="/recommended"
              className="flex items-center gap-3 text-[18px] font-semibold"
            >
              <span aria-hidden>📦</span>
              의견 받아요
            </Link>

            <Link
              href="/partner"
              className="flex items-center gap-3 text-[18px] font-semibold"
            >
              <span aria-hidden>🚀</span>
              제휴 문의
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-3 text-[18px] font-semibold"
            >
              <span aria-hidden>🔐</span>
              로그인
            </Link>

            <Link
              href="/mypage"
              className="flex items-center gap-3 text-[18px] font-semibold"
            >
              <span aria-hidden>🦄</span>
              마이페이지
            </Link>

            <div className="pt-2 text-[14px] text-neutral-60">
              <Link href="/terms" className="hover:underline">
                이용약관
              </Link>
              {" · "}
              <Link href="/personal" className="hover:underline">
                개인정보처리방침
              </Link>
              {" · "}
              <Link href="/disclaimer" className="hover:underline">
                면책조항
              </Link>
            </div>
          </div>

          <div className="mt-16 text-[16px]">
            <div className="text-neutral-60">😄</div>
            <Link href="/mypage" className="mt-1 inline-block">
              탈퇴하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

