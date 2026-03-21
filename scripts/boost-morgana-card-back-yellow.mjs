/**
 * 03_Morgana/card-back.png 에 노란 기운 추가 (기존 파일 위에 한 겹 더)
 * 실행: node scripts/boost-morgana-card-back-yellow.mjs
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const inputPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "images",
  "masters",
  "03_Morgana",
  "card-back.png",
);

/** 따뜻한 순노랑 보강 — 값 키울수록 더 노랗게 (여러 번 실행 시 누적됨) */
const EXTRA_YELLOW = { r: 255, g: 252, b: 35, alpha: 0.5 };

async function main() {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (!w || !h) throw new Error("bad metadata");

  const overlay = await sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: EXTRA_YELLOW,
    },
  })
    .png()
    .toBuffer();

  const tmp = `${inputPath}.__yellow_tmp`;
  await sharp(inputPath)
    .composite([
      { input: overlay, blend: "overlay" },
      { input: overlay, blend: "soft-light" },
    ])
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmp);
  await fs.rename(tmp, inputPath);
  console.log("03_Morgana/card-back.png — 노랑 보강 완료");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
