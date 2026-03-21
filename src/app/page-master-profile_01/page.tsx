"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterBackgroundSrc } from "@/lib/masterCardAssets";
import masterProfiles from "@/data/master-profiles.json";

const DIAGRAM = "/assets/diagram-0f7e93e7-8c32-4e84-a6e5-65f5d1622958.png";
const PROFILE_DIAGRAM_BY_MASTER_ID: Record<string, string> = {
  cassian: "/assets/master-diagrams/01_Cassian.svg",
  kaien: "/assets/master-diagrams/02_Aiden.svg",
  morgana: "/assets/master-diagrams/03_Morgana.svg",
  noa: "/assets/master-diagrams/04_Noa.svg",
  erebus: "/assets/master-diagrams/05_Erebus.svg",
  serina: "/assets/master-diagrams/06_Serena.svg",
  nyx: "/assets/master-diagrams/07_Nyx.svg",
  clotho: "/assets/master-diagrams/08_Clotho.svg",
  pipi: "/assets/master-diagrams/09_Pipi.svg",
};

type ProfileDetail = {
  name: string;
  type?: string;
  gender: string;
  job: string;
  tendencyLines: string[];
  worldviewLines: string[];
  tags: string[];
  recommendedUsers: string[];
};

export default function PageMasterProfile01() {
  const searchParams = useSearchParams();
  const currentId = (searchParams?.get("master") ?? "cassian").toLowerCase();
  const current = FLOW_MASTERS.find((m) => m.id === currentId) ?? FLOW_MASTERS[0];
  const detail = (masterProfiles as Record<string, ProfileDetail>)[current.id] ?? {
    name: current.name,
    type: current.type,
    gender: "정보 준비중",
    job: current.profileTitle.split("/")[0]?.trim() || "마스터",
    tendencyLines: [current.profileSummary],
    worldviewLines: [current.desc],
    tags: current.keywords.map((k) => `• ${k}`),
    recommendedUsers: ["이 마스터의 해석 스타일이 잘 맞는 사람"],
  };
  const diagramSrc = PROFILE_DIAGRAM_BY_MASTER_ID[current.id] ?? DIAGRAM;

  return (
    <main className="w-full">
      <FlowScene backHref="/page_01_masters_list_1" backgroundSrc={getMasterBackgroundSrc(current.id, 2)}>
        <div className="h-[170px]" />
        <div className="pt-3 text-center text-[28px] font-semibold text-white">{current.name}</div>

        <div className="mt-4 rounded-xl border border-primary bg-[rgba(7,6,22,0.8)] p-3">
          <div className="mx-auto overflow-hidden rounded-lg border border-primary/60">
            <Image src={diagramSrc} alt="성향 차트" width={300} height={300} className="h-auto w-full" />
          </div>
          <div className="mt-3 space-y-3 text-[13px] leading-[1.6] text-white">
            <p>✨ 이름 / 유형 / 성별 / 직업</p>
            <p className="text-[#d7ccff]">
              {current.name} / {detail.type ?? current.type} / {detail.gender} / {detail.job}
            </p>

            <p className="pt-1">✨ 성향</p>
            <div className="space-y-2 text-[#d7ccff]">
              {detail.tendencyLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <p className="pt-1">✨ 세계관</p>
            <div className="space-y-2 text-[#d7ccff]">
              {detail.worldviewLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <p className="pt-1">✨ 관련태그</p>
            <p className="text-[#d7ccff]">{detail.tags.join(", ")}</p>

            <p className="pt-1">✨ 추천 사용자</p>
            <ul className="space-y-1 text-[#d7ccff]">
              {detail.recommendedUsers.map((item) => (
                <li key={item}>✔ {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </FlowScene>

      <div className="mx-auto w-full max-w-[390px] px-4 py-6">
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

