import Image from "next/image";
import Link from "next/link";
import React from "react";

const BG = "/assets/bg2-a5c33368-f273-48af-8ec7-f18f1bc4e4f2.png";
const BACK = "/assets/btn_back-de2e4927-d11f-4301-b319-3dee0a48266a.png";

export function FlowScene({
  children,
  backHref,
  hideBackgroundImage = false,
  backgroundSrc,
  sceneClassName,
  backStyle = "image",
  backImageSrc,
}: Readonly<{
  children: React.ReactNode;
  backHref?: string;
  hideBackgroundImage?: boolean;
  backgroundSrc?: string;
  sceneClassName?: string;
  backStyle?: "image" | "custom";
  backImageSrc?: string;
}>) {
  return (
    <section className={`page-fade relative mx-auto min-h-[560px] w-full max-w-[390px] overflow-hidden ${sceneClassName ?? ""}`}>
      {!hideBackgroundImage ? (
        <Image src={backgroundSrc ?? BG} alt="" fill className="object-cover object-top" priority />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,20,0.35)_0%,rgba(10,8,30,0.85)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[390px] px-4 pt-4">
        {backHref ? (
          <Link
            href={backHref}
            className={
              backStyle === "custom"
                ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#8E63FF] bg-[rgba(14,10,35,0.88)]"
                : "inline-flex"
            }
            aria-label="뒤로가기"
          >
            {backStyle === "custom" ? (
              <span className="text-[22px] font-semibold leading-none text-[#BFA8FF]">←</span>
            ) : (
              <Image src={backImageSrc ?? BACK} alt="뒤로가기" width={52} height={52} />
            )}
          </Link>
        ) : null}
        {children}
      </div>
    </section>
  );
}

