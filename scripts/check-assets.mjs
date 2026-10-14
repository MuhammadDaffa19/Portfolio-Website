import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cvPath = resolve("public/cv/daffa-cv.pdf");
let bytes;
try {
  bytes = readFileSync(cvPath);
} catch {
  console.error(`P0 BLOCKED: CV file missing: ${cvPath}`);
  process.exitCode = 1;
}

if (bytes) {
  const header = bytes.subarray(0, 8).toString("ascii");
  const tail = bytes.subarray(-1024).toString("latin1");
  if (!header.startsWith("%PDF-") || !tail.includes("%%EOF")) {
    console.error("P0 BLOCKED: CV file is empty or lacks a recognizable PDF header/trailer.");
    process.exitCode = 1;
  } else {
    console.log(`PASS: CV appears to be a PDF (${bytes.length} bytes). Confirm it opens manually.`);
  }
}
