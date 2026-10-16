import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text()); });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
const eyebrow = await page.locator('[data-section="1"] >> text=/Putignano/').first().innerText().catch(() => null);
const full = await page.locator('[data-section="1"]').first().innerText().catch(() => null);
const consentVisible = await page.locator('text="Cookie & Privacy"').isVisible().catch(() => false);
await page.screenshot({ path: "/tmp/km-hero-desktop.png", clip: { x: 0, y: 0, width: 1280, height: 800 } });
// Click Accetta tutto
await page.click('text="Accetta tutto"').catch(() => {});
await page.waitForTimeout(300);
const consentAfter = await page.locator('text="Cookie & Privacy"').isVisible().catch(() => false);
const consentStorage = await page.evaluate(() => localStorage.getItem("km-cookie-consent"));
console.log(JSON.stringify({ eyebrow, eyebrowContains: full?.includes("Conversano") && full?.includes("Puglia"), consentVisible, consentAfterAccept: consentAfter, consentStorage, errs }, null, 2));
await browser.close();
