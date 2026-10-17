import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const out = (p) => readFileSync(resolve(root, "out", p), "utf8");

function ensureBuilt() {
  for (const f of ["privacy-policy.html", "cookie-policy.html", "termini.html"]) {
    if (!existsSync(resolve(root, "out", f))) {
      throw new Error(`Run \`npm run build\` first; missing out/${f}`);
    }
  }
}

test("privacy-policy has no placeholder and lists Titolare", () => {
  ensureBuilt();
  const html = out("privacy-policy.html");
  assert.ok(!/\[INSERIRE/.test(html), "placeholder still present");
  assert.ok(!/TODO/.test(html), "TODO comment leaked into render");
  assert.match(html, /SSD Global Defender Srl/);
  assert.match(html, /Via G\. Leopardi, 56 — 70017 Putignano \(BA\)/);
  assert.match(html, /segreteria@global-defender\.com/);
  assert.match(html, /\+39 340 710 6618/);
  assert.match(html, /17 ottobre 2026/);
});

test("termini has no placeholder and shows Titolare", () => {
  ensureBuilt();
  const html = out("termini.html");
  assert.ok(!/\[INSERIRE/.test(html), "placeholder still present");
  assert.match(html, /SSD Global Defender Srl/);
  assert.match(html, /17 ottobre 2026/);
});

test("cookie-policy shows update date", () => {
  ensureBuilt();
  const html = out("cookie-policy.html");
  assert.match(html, /17 ottobre 2026/);
});

test("index page JSON-LD has legalName", () => {
  ensureBuilt();
  const html = out("index.html");
  assert.match(html, /SSD Global Defender Srl/);
  assert.match(html, /SportsActivityLocation/);
  assert.match(html, /segreteria@global-defender\.com/);
  assert.match(html, /\+393407106618/);
});
