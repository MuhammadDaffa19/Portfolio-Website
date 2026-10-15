import { readFileSync } from "node:fs";
import { cvFeature } from "../src/config/siteFeatures.js";

// Resolve from this module, not the shell's working directory.
const cvFile = new URL(`../public${cvFeature.href}`, import.meta.url);
let bytes;
try {
  bytes = readFileSync(cvFile);
} catch (error) {
  if (error?.code === "ENOENT" && !cvFeature.enabled) {
    console.log("PASS: CV is intentionally unpublished; no PDF required.");
  } else {
    console.error(`FAIL: CV asset cannot be read (${error.message}).`);
    process.exitCode = 1;
  }
}

// Vite copies all files in public/, even if the UI hides their links.
// Do not let an empty or malformed placeholder ship to production.
if (bytes) {
  const header = bytes.subarray(0, 8).toString("ascii");
  const trailer = bytes.subarray(-1024).toString("latin1");
  if (bytes.length < 128 || !header.startsWith("%PDF-") || !trailer.includes("%%EOF")) {
    console.error("FAIL: CV PDF is empty or lacks a recognizable PDF header/trailer.");
    process.exitCode = 1;
  } else {
    console.log(
      `PASS: CV PDF has basic structural markers (${bytes.length} bytes); ${cvFeature.enabled ? "published" : "not yet linked"}.`,
    );
    console.log("NOTE: Open the PDF manually before publication; this is not a full PDF parser.");
  }
}
