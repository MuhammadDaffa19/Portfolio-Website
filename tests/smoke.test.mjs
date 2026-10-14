import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { projects } from "../src/data/projects.js";
import { translations, orbitNavigation } from "../src/data/translations.js";

function structureOf(value) {
  if (Array.isArray(value)) return value.map(structureOf);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, structureOf(value[key])])
    );
  }
  return typeof value;
}

test("ID and EN translations have the same keys, array lengths and leaf types", () => {
  assert.deepEqual(structureOf(translations.id), structureOf(translations.en));
});

test("portfolio project IDs are unique, with valid local images", () => {
  assert.ok(projects.length > 0);
  const ids = projects.map((project) => project.id);
  assert.equal(new Set(ids).size, ids.length, "Duplicate project IDs");
  for (const project of projects) {
    assert.ok(project.title && project.id, "Missing project title or ID");
    assert.ok(project.image?.startsWith("/images/"), `${project.id}: unexpected image path`);
    const imageFile = join(process.cwd(), "public", project.image.slice(1));
    assert.ok(existsSync(imageFile), `${project.id}: image missing`);
    assert.ok(statSync(imageFile).size > 0, `${project.id}: image empty`);
  }
});

test("orbital routes have unique paths and translation labels", () => {
  const paths = orbitNavigation.map((item) => item.path);
  assert.equal(new Set(paths).size, paths.length, "Duplicate orbit routes");
  for (const orbit of orbitNavigation) {
    const keys = [orbit.labelKey, orbit.descriptionKey];
    for (const locale of ["id", "en"]) {
      for (const key of keys) {
        const text = key.split(".").reduce((value, segment) => value?.[segment], translations[locale]);
        assert.equal(typeof text, "string", `Missing ${locale} translation: ${key}`);
        assert.ok(text.trim(), `Empty ${locale} translation: ${key}`);
      }
    }
  }
});
