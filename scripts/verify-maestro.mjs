// One-shot Playwright verification of the Maestro section.
// Captures: desktop + mobile screenshot, console messages, network failures,
// document.fonts.ready + UnifrakturCook availability.

import { chromium } from "playwright";
import fs from "fs";

const URL = "http://localhost:3000";
const OUT = "/home/giovannimacina/KravMaga Putignano/kravmagaputignano/.verify";
fs.mkdirSync(OUT, { recursive: true });

async function check(viewport, label) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  const consoleMsgs = [];
  page.on("console", (m) =>
    consoleMsgs.push({ type: m.type(), text: m.text() })
  );
  const failedReq = [];
  page.on("requestfailed", (r) =>
    failedReq.push({ url: r.url(), reason: r.failure()?.errorText })
  );
  const badStatus = [];
  page.on("response", (r) => {
    if (r.status() >= 400) badStatus.push({ url: r.url(), status: r.status() });
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

  // Wait for fonts and scroll into section 7
  await page.evaluate(() => document.fonts.ready);

  // Move to section 7 (Maestro)
  await page.evaluate(() => {
    const s = document.querySelector('[data-section="7"]');
    if (s) s.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(2500);

  // Screenshot viewport
  const vp = path.join(OUT, `${label}-viewport.png`);
  await page.screenshot({ path: vp, fullPage: false });

  // Full page screenshot
  const fp = path.join(OUT, `${label}-full.png`);
  await page.screenshot({ path: fp, fullPage: true });

  // Probe the Maestro title element
  const probe = await page.evaluate(() => {
    const h1 = document.querySelector('[data-section="7"] h1');
    const cs = h1 ? getComputedStyle(h1) : null;
    let fontReady = false;
    let usedFamily = null;
    if (h1 && cs) {
      usedFamily = cs.fontFamily;
      // document.fonts.check returns true if a face is loaded.
      fontReady = document.fonts.check(`400 ${cs.fontSize} "Black Ops One"`);
    }
    // Try a few fallback families to see which one is actually rendering.
    const fams = ["Black Ops One", "UnifrakturCook", "Cinzel", "Playfair Display"];
    const readyMap = {};
    for (const f of fams) {
      readyMap[f] = document.fonts.check(`16px "${f}"`);
    }
    // Pull the first font face whose family is UnifrakturCook
    const faces = Array.from(document.fonts).map((f) => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status,
    }));
    return {
      h1Text: h1?.textContent?.trim() || null,
      h1FontFamily: usedFamily,
      h1FontSize: cs?.fontSize,
      h1Color: cs?.color,
      h1Opacity: cs?.opacity,
      unifrakturReady: fontReady,
      familyReady: readyMap,
      faceCount: faces.length,
      unifrakturFaces: faces.filter((f) => f.family === "Black Ops One"),
    };
  });

  await browser.close();
  return {
    label,
    consoleMsgs,
    failedReq,
    badStatus,
    probe,
    screenshots: { vp, fp },
  };
}

import path from "path";

(async () => {
  const results = [];
  for (const [label, vp] of [
    ["desktop", { width: 1280, height: 800 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    try {
      const r = await check(vp, label);
      results.push(r);
    } catch (e) {
      results.push({ label, error: String(e), stack: e.stack });
    }
  }
  fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})();
