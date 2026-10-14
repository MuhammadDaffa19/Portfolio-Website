import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { cvFeature } from "../src/config/siteFeatures.js";

test("CV publication setting points to a valid local PDF route", () => {
  assert.equal(typeof cvFeature.enabled, "boolean");
  assert.match(cvFeature.href, /^\/cv\/[a-zA-Z0-9._-]+\.pdf$/);
});

test("a public CV, if present, cannot be an empty placeholder", () => {
  const file = new URL(`../public${cvFeature.href}`, import.meta.url);
  if (cvFeature.enabled) {
    assert.ok(existsSync(file), "Published CV is missing");
  }
  if (existsSync(file)) {
    assert.ok(statSync(file).size >= 128, "Invalid/empty PDF in public assets");
  }
});
