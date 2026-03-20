import Link from "next/link";

const MASTERS = [
  { slug: "cassian", name: "Cassian" },
  { slug: "luna", name: "Luna" },
  { slug: "elin", name: "Elin" },
  { slug: "ari", name: "Ari" },
  { slug: "mira", name: "Mira" },
  { slug: "noah", name: "Noah" },
  { slug: "soren", name: "Soren" },
  { slug: "vivi", name: "Vivi" },
  { slug: "astra", name: "Astra" },
];

export default function MastersPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-6">
        <h1 className="text-[18px] font-semibold">타로 마스터 소개</h1>
        <p className="mt-3 text-[14px] leading-[22px] text-neutral-60">
          9명의 마스터 중 한 명을 선택해, 당신에게 맞는 말투로
          해석을 준비해요.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {MASTERS.map((m) => (
            <Link
              key={m.slug}
              href={`/masters/${m.slug}`}
              className="rounded-xl bg-[rgba(255,255,255,0.02)] p-4 text-center text-neutral-10"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/20 text-[18px]">
                {m.name.slice(0, 1)}
              </div>
              <div className="mt-3 text-[14px] font-semibold">{m.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

