import { execFileSync } from "child_process";
import { createRequire } from "module";
import { renameSync, existsSync } from "fs";
const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");

const DIR = "public/assets/videos";

// Mapeo confirmado por análisis de contenido (frames) -> nombre destino
const MAP = [
  ["IMG_2513.mov", "sendero-1.mp4"],
  ["IMG_2514.mov", "sendero-2.mp4"],
  ["IMG_2515.mov", "sendero-3.mp4"],
  ["YDRAY-Tanques.mp4", "piscitanques-1.mp4"],
  ["IMG_5689.MOV", "vivero-experimental-1.mp4"],
  ["IMG_5690.MOV", "vivero-experimental-2.mp4"],
  ["IMG_5691.MOV", "vivero-experimental-3.mp4"],
  ["IMG_9165.mov", "vivero-vainilla-1.mp4"],
  ["IMG_9166.mov", "vivero-vainilla-2.mp4"],
  ["IMG_9167.mov", "vivero-vainilla-3.mp4"],
  ["IMG_9169.mov", "vivero-vainilla-4.mp4"],
  ["IMG_9170.mov", "vivero-vainilla-5.mp4"],
];

const FORCE = process.argv.includes("--force");

for (const [src, out] of MAP) {
  const inPath = `${DIR}/${src}`;
  const outPath = `${DIR}/${out}`;
  if (!existsSync(inPath)) { console.log("[skip-missing]", src); continue; }
  if (existsSync(outPath) && !FORCE) { console.log("[skip-done]", out); continue; }
  const args = [
    "-y", "-loglevel", "error", "-i", inPath,
    "-vf", "scale='min(1920,iw)':'-2'",
    "-r", "30",
    "-c:v", "libx264", "-crf", "28", "-preset", "veryfast",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "96k",
    outPath + ".tmp.mp4",
  ];
  const t0 = Date.now();
  execFileSync(ffmpeg, args, { stdio: ["ignore", "ignore", "inherit"] });
  renameSync(outPath + ".tmp.mp4", outPath);
  console.log(`[ok] ${src} -> ${out} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
console.log("DONE");
