import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { orbitNavigation } from "../src/data/translations.js";
import { seoByPath, getSeoMetadata } from "../src/config/seo.js";

const read = (path) => readFileSync(join(process.cwd(), path), "utf8");

test("all portfolio routes have bilingual SEO metadata", () => {
  const paths = ["/", ...orbitNavigation.map(({ path }) => path)];
  assert.deepEqual(Object.keys(seoByPath).sort(), paths.sort());
  for (const path of paths) {
    for (const language of ["id", "en"]) {
      const { title, description } = getSeoMetadata(path, language);
      assert.ok(title.length > 10 && title.length < 80, `SEO title invalid: ${path}/${language}`);
      assert.ok(description.length >= 70 && description.length <= 175, `SEO description invalid: ${path}/${language}`);
    }
  }
});

test("routes are split into explicit dynamic page imports", () => {
  const routes = read("src/routes.jsx");
  for (const page of ["Home", "About", "Projects", "Skills", "Experience", "Certificates", "Contact"]) {
    assert.match(routes, new RegExp(`import\\("\\./pages/${page}\\.jsx"\\)`), `${page} missing lazy route`);
    assert.doesNotMatch(routes, new RegExp(`import\\s+${page}\\s+from`), `${page} imported eagerly`);
  }
});

test("static shell has safe default metadata and SPA handling", () => {
  const index = read("index.html");
  assert.match(index, /<html lang="id">/);
  assert.match(index, /<title>Daffa Project Index/);
  assert.match(index, /name="description"/);
  assert.match(index, /property="og:title"/);
  const workerConfig = read("wrangler.jsonc");
  assert.match(workerConfig, /"not_found_handling"\s*:\s*"single-page-application"/);
  assert.ok(!existsSync(join(process.cwd(), "public/images/profile.webp")), "Empty public placeholder remains");
});
