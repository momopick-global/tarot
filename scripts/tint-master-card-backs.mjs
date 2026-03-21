/**
 * 마스터별 카드 뒷면(card-back.png)만 색조 적용 — 01_Cassian(카시안) 제외, 2~9번만
 * strong-tint-master-cards.mjs 와 동일한 색 기준
 *
 * 경로: public/images/masters/{NN_Master}/card-back.png
 *
 * 실행: node scripts/tint-master-card-backs.mjs
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "masters");

const TINTS = [
  { dir: "02_Aiden", r: 255, g: 25, b: 40, alpha: 0.88 },
  /* 모르가나: 노랑 톤 강화 (카시안 원본에서 다시 tint 할 때) */
  { dir: "03_Morgana", r: 255, g: 235, b: 25, alpha: 0.88 },
  { dir: "04_Noa", r: 15, g: 220, b: 55, alpha: 0.85 },
  { dir: "05_Erebus", r: 20, g: 80, b: 255, alpha: 0.86 },
  { dir: "06_Serena", r: 180, g: 40, b: 255, alpha: 0.85 },
  { dir: "07_Nyx", r: 255, g: 95, b: 10, alpha: 0.86 },
  { dir: "08_Clotho", r: 120, g: 255, b: 60, alpha: 0.84 },
  { dir: "09_Pipi", r: 50, g: 195, b: 255, alpha: 0.86 },
];

async function tintBackPng(inputPath, tint) {
  const { r, g, b, alpha } = tint;
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (!w || !h) throw new Error(`bad metadata: ${inputPath}`);

  const overlay = await sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: { r, g, b, alpha },
    },
  })
    .png()
    .toBuffer();

  const tmp = `${inputPath}.__tint_tmp`;
  await sharp(inputPath)
    .composite([
      { input: overlay, blend: "overlay" },
      { input: overlay, blend: "soft-light" },
    ])
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(tmp);
  await fs.rename(tmp, inputPath);
}

async function main() {
  for (const tint of TINTS) {
    const backPath = path.join(root, tint.dir, "card-back.png");
    try {
      await fs.access(backPath);
    } catch {
      console.warn(`skip (no file): ${tint.dir}/card-back.png`);
      continue;
    }
    console.log(`${tint.dir}/card-back.png → rgb(${tint.r},${tint.g},${tint.b})`);
    await tintBackPng(backPath, tint);
  }
  console.log("done (01_Cassian/card-back.png unchanged)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
