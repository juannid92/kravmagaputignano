import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const legal = readFileSync(resolve(root, "src/lib/legal.ts"), "utf8");

test("legal.ts defines LEGAL with required keys", () => {
  for (const k of ["legalName", "registeredOffice", "email", "phone", "phoneE164", "website"]) {
    assert.match(legal, new RegExp(`\\b${k}\\b`), `missing key ${k}`);
  }
});

test("legal.ts has no invented P.IVA (only empty string allowed)", () => {
  const m = legal.match(/vatId:\s*"([^"]*)"/);
  assert.ok(m, "vatId key not found");
  assert.equal(m[1], "", "vatId must be empty until provided");
});

test("legal.ts phone matches spec", () => {
  assert.match(legal, /phoneE164:\s*"\+393407106618"/);
  assert.match(legal, /phone:\s*"\+39 340 710 6618"/);
});

test("legalJsonLd returns SportsActivityLocation with required fields", () => {
  assert.match(legal, /export function legalJsonLd/);
  assert.match(legal, /"@type":\s*"SportsActivityLocation"/);
  assert.match(legal, /taxID: LEGAL\.vatId/);
  assert.match(legal, /openingHoursSpecification/);
});

test("no fake phone 312 345 6789 anywhere in src/", () => {
  const offenders = [];
  const srcDir = join(root, "src");
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        walk(full);
      } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(name)) {
        const txt = readFileSync(full, "utf8");
        if (/3123456789|312 345 6789/.test(txt)) offenders.push(full);
      }
    }
  }
  walk(srcDir);
  assert.deepEqual(offenders, [], `fake phone still present in: ${offenders.join(", ")}`);
});
