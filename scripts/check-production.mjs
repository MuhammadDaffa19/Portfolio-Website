import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const assetDir = join(dist, "assets");
assert.ok(existsSync(join(dist, "index.html")), "Production index.html missing");
assert.ok(existsSync(assetDir), "Production assets directory missing");

const html = readFileSync(join(dist, "index.html"), "utf8");
const jsFiles = readdirSync(assetDir).filter((file) => file.endsWith(".js"));
assert.ok(jsFiles.length >= 8, `Expected entry + 7 lazy page chunks; found ${jsFiles.length} JS files`);

// Vite's default 500 kB warning is about each minified output chunk.
// Do not hide the warning by increasing chunkSizeWarningLimit.
const oversized = jsFiles
  .map((name) => ({ name, size: statSync(join(assetDir, name)).size }))
  .filter(({ size }) => size > 500_000);
assert.equal(oversized.length, 0, `Oversized JS chunk(s): ${JSON.stringify(oversized)}`);

const importedAssets = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+)"/g)];
assert.ok(importedAssets.length >= 2, "Index should reference built CSS and JS");
for (const [, relativePath] of importedAssets) {
  assert.ok(existsSync(join(dist, relativePath)), `Missing built asset: ${relativePath}`);
}
assert.ok(existsSync(join(dist, "favicon.svg")), "Favicon missing");
assert.ok(!existsSync(join(dist, "cv", "daffa-cv.pdf")), "CV is deferred and must not be published");
assert.ok(!existsSync(join(dist, "images", "profile.webp")), "Empty unused image must not be published");
assert.match(html, /name="description"/, "Missing default SEO description");
assert.match(html, /property="og:title"/, "Missing default OG title");

const totalJs = jsFiles.reduce((sum, name) => sum + statSync(join(assetDir, name)).size, 0);
console.log(`PASS production artifacts: ${jsFiles.length} JS chunks, ${(totalJs / 1000).toFixed(1)} kB JS overall, largest ${Math.max(...jsFiles.map((name) => statSync(join(assetDir, name)).size)) / 1000} kB.`);
