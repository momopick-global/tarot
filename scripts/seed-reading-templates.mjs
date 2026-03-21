/**
 * src/data/readings/*.json 에 "0"~"77" 빈 템플릿 채우기
 * 이미 있는 카드 키는 내용 유지(병합만으로 누락 필드 보강)
 *
 * 실행: node scripts/seed-reading-templates.mjs
 * 78장 전부 템플릿으로 초기화 후 기존 값만 얹기: node scripts/seed-reading-templates.mjs --reset
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "readings");

const MASTER_FILES = [
  "cassian.json",
  "kaien.json",
  "morgana.json",
  "noa.json",
  "erebus.json",
  "serina.json",
  "nyx.json",
  "clotho.json",
  "pipi.json",
];

const EMPTY_ENTRY = {
  titleEn: "",
  titleKo: "",
  cardSubtitle: "",
  summary: "",
  categories: {
    work: "",
    love: "",
    money: "",
  },
  advice: {
    quote: "",
    luckyItem: "",
    luckyPlace: "",
    caution: "",
  },
  keywords: [],
};

const reset = process.argv.includes("--reset");

function mergeReading(patch) {
  const p = patch && typeof patch === "object" ? patch : {};
  return {
    ...EMPTY_ENTRY,
    ...p,
    categories: { ...EMPTY_ENTRY.categories, ...(p.categories || {}) },
    advice: { ...EMPTY_ENTRY.advice, ...(p.advice || {}) },
    keywords: Array.isArray(p.keywords) ? p.keywords : [...EMPTY_ENTRY.keywords],
  };
}

function main() {
  for (const name of MASTER_FILES) {
    const filePath = path.join(dir, name);
    if (!fs.existsSync(filePath)) {
      console.warn("skip (missing):", name);
      continue;
    }

    let existing = {};
    try {
      const raw = fs.readFileSync(filePath, "utf8").trim();
      if (raw) existing = JSON.parse(raw);
    } catch (e) {
      console.error("parse error:", name, e.message);
      process.exit(1);
    }

    const sorted = {};
    for (let i = 0; i <= 77; i += 1) {
      const key = String(i);
      const prev = existing[key];
      if (reset) {
        sorted[key] = mergeReading(prev);
      } else if (prev) {
        sorted[key] = mergeReading(prev);
      } else {
        sorted[key] = structuredClone(EMPTY_ENTRY);
      }
    }

    fs.writeFileSync(filePath, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
    console.log("updated:", name);
  }
  console.log("done");
}

main();
