#!/usr/bin/env swift
import Foundation
import Vision
import AppKit
import CoreGraphics

let cardNames: [String] = [
  "The Fool","The Magician","The High Priestess","The Empress","The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World",
  "Ace of Wands","Two of Wands","Three of Wands","Four of Wands","Five of Wands","Six of Wands","Seven of Wands","Eight of Wands","Nine of Wands","Ten of Wands","Page of Wands","Knight of Wands","Queen of Wands","King of Wands",
  "Ace of Cups","Two of Cups","Three of Cups","Four of Cups","Five of Cups","Six of Cups","Seven of Cups","Eight of Cups","Nine of Cups","Ten of Cups","Page of Cups","Knight of Cups","Queen of Cups","King of Cups",
  "Ace of Swords","Two of Swords","Three of Swords","Four of Swords","Five of Swords","Six of Swords","Seven of Swords","Eight of Swords","Nine of Swords","Ten of Swords","Page of Swords","Knight of Swords","Queen of Swords","King of Swords",
  "Ace of Pentacles","Two of Pentacles","Three of Pentacles","Four of Pentacles","Five of Pentacles","Six of Pentacles","Seven of Pentacles","Eight of Pentacles","Nine of Pentacles","Ten of Pentacles","Page of Pentacles","Knight of Pentacles","Queen of Pentacles","King of Pentacles"
]

let aliases: [String: Int] = [
  "judgment": 20,
  "hanged man": 12,
  "high priestess": 2,
  "wheel of fortune": 10,
]

func bestIndex(for fullText: String) -> Int? {
  let lower = fullText.lowercased()
  var best: (len: Int, idx: Int)? = nil
  for (i, name) in cardNames.enumerated() {
    let n = name.lowercased()
    if lower.contains(n) {
      if best == nil || n.count > best!.len {
        best = (n.count, i)
      }
    }
  }
  if let b = best { return b.idx }
  for (k, v) in aliases {
    if lower.contains(k) { return v }
  }
  // Minor: "Seven" alone is ambiguous — skip
  return nil
}

func downscaleCGImage(_ source: CGImage, maxSide: CGFloat) -> CGImage? {
  let w = CGFloat(source.width)
  let h = CGFloat(source.height)
  let scale = min(1, maxSide / max(w, h))
  if scale >= 1 { return source }
  let nw = Int(w * scale)
  let nh = Int(h * scale)
  guard let colorSpace = CGColorSpace(name: CGColorSpace.sRGB),
        let ctx = CGContext(
          data: nil,
          width: nw,
          height: nh,
          bitsPerComponent: 8,
          bytesPerRow: 0,
          space: colorSpace,
          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        ) else { return nil }
  ctx.interpolationQuality = .high
  ctx.draw(source, in: CGRect(x: 0, y: 0, width: nw, height: nh))
  return ctx.makeImage()
}

func ocrIndex(url: URL) -> (Int?, String) {
  guard let img = NSImage(contentsOf: url),
        let tiff = img.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let cgFull = bitmap.cgImage,
        let cg = downscaleCGImage(cgFull, maxSide: 900) else {
    return (nil, "")
  }
  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.usesLanguageCorrection = true
  let handler = VNImageRequestHandler(cgImage: cg, options: [:])
  var lines: [String] = []
  do {
    try handler.perform([request])
    for obs in request.results ?? [] {
      if let top = obs.topCandidates(1).first {
        lines.append(top.string)
      }
    }
  } catch {
    return (nil, String(describing: error))
  }
  let blob = lines.joined(separator: " ")
  return (bestIndex(for: blob), blob)
}

guard CommandLine.arguments.count >= 2 else {
  fputs("usage: ocr_tarot_rename.swift <folder>\n", stderr)
  exit(1)
}
let folder = CommandLine.arguments[1]
let fm = FileManager.default
guard let urls = try? fm.contentsOfDirectory(at: URL(fileURLWithPath: folder), includingPropertiesForKeys: nil) else {
  fputs("cannot read folder\n", stderr)
  exit(1)
}
let pngs = urls.filter { $0.pathExtension.lowercased() == "png" && !$0.lastPathComponent.hasPrefix(".") }
  .sorted { $0.lastPathComponent < $1.lastPathComponent }

var results: [(URL, Int?, String)] = []
for url in pngs {
  let (idx, text) = ocrIndex(url: url)
  results.append((url, idx, text))
  fputs(".\(results.count)/\(pngs.count) \(url.lastPathComponent.prefix(8))… idx=\(idx.map(String.init) ?? "?")\n", stderr)
}

var used = Set<Int>()
var plan: [(URL, Int)] = []
var failed: [(URL, String)] = []

for r in results {
  if let idx = r.1 {
    if used.contains(idx) {
      failed.append((r.0, "duplicate index \(idx)"))
    } else {
      used.insert(idx)
      plan.append((r.0, idx))
    }
  } else {
    failed.append((r.0, "no match: \(r.2.prefix(160))"))
  }
}

print("--- PLAN ---")
for (u, i) in plan.sorted(by: { $0.1 < $1.1 }) {
  let dest = (folder as NSString).appendingPathComponent("\(i).png")
  print("\(u.path)\t\(dest)")
}
if !failed.isEmpty {
  print("--- FAILED ---")
  for (u, reason) in failed {
    print("\(u.lastPathComponent): \(reason)")
  }
}
