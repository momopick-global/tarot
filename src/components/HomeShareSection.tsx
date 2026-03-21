import Image from "next/image";
import { withAssetBase } from "@/lib/publicPath";

const ICON_SHARE_LINK = withAssetBase("/assets/svg-ic-share-link.svg-26940f47-d010-498b-b1e1-68303b31e59e.png");
const ICON_SHARE_TALK = withAssetBase(
  "/assets/svg-ic-social-kakao.svg-20eca7d6-4d65-40b8-954f-17463d423b00.png",
);
const ICON_SHARE_FACEBOOK = withAssetBase(
  "/assets/svg-ic-share-facebook.svg-527221c9-1874-4fae-83ed-579ce7d4210b.png",
);
const ICON_SHARE_X = withAssetBase("/assets/svg-ic-share-x.svg-4ef9a083-7b44-439e-bfa4-3c305b5bf580.png");

export function HomeShareSection() {
  return (
    <section className="mx-auto mt-[0px] w-full max-w-[390px] bg-[#17182E] pb-[40px] pt-[40px]">
      <div className="w-full px-5">
        <div className="text-center text-[22px] text-neutral-10">친구에게 공유하기</div>
        <div className="mt-[20px] flex items-center justify-center gap-5">
          <Image src={ICON_SHARE_LINK} alt="" width={44} height={44} />
          <span className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FEE500]">
            <Image src={ICON_SHARE_TALK} alt="" width={28} height={28} />
          </span>
          <Image src={ICON_SHARE_FACEBOOK} alt="" width={44} height={44} />
          <Image src={ICON_SHARE_X} alt="" width={44} height={44} />
        </div>
      </div>
    </section>
  );
}

