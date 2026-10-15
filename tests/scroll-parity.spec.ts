import { test, expect, Page } from "@playwright/test";

async function scroll(page: Page, y: number) {
  const finePointer = await page.evaluate(() => matchMedia("(pointer: fine)").matches);
  if (finePointer) {
    // Exercise the real wheel/Lenis path, rather than fighting its active
    // target with window.scrollTo while an inertial animation is running.
    const current = await page.evaluate(() => window.scrollY);
    await page.mouse.move(100, 200);
    await page.mouse.wheel(0, y - current);
  } else {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), y);
  }
  await expect.poll(async () => Math.abs(await page.evaluate(() => window.scrollY) - y), { timeout: 10000 }).toBeLessThan(8);
  await page.waitForTimeout(finePointer ? 900 : 650);
}

async function measure(page: Page) {
  return page.evaluate(() => {
    const section = document.querySelector<HTMLElement>('[data-testid="nonsport"]')!;
    const spacer = section.parentElement!;
    const gallery = document.querySelector<HTMLElement>('[data-testid="gallery"]')!;
    const track = gallery.querySelector<HTMLElement>('.gallery-track')!;
    const viewport = gallery.querySelector<HTMLElement>('.gallery-viewport')!;
    return {
      start: spacer.getBoundingClientRect().top + window.scrollY,
      travel: spacer.offsetHeight - section.offsetHeight,
      galleryStart: gallery.getBoundingClientRect().top + window.scrollY,
      galleryTravel: Math.max(track.scrollWidth - viewport.clientWidth, viewport.clientHeight),
    };
  });
}

async function verifyPanel(page: Page, index: number) {
  const panel = page.getByTestId(`concept-0${index + 1}`);
  await expect(panel).toHaveAttribute('data-active', 'true');
  await expect(panel).toHaveCSS('opacity', '1');
  await expect(page.locator('.nonsport-panel[data-active="true"]')).toHaveCount(1);
  const sectionTop = await page.getByTestId('nonsport').evaluate(e => e.getBoundingClientRect().top);
  expect(Math.abs(sectionTop)).toBeLessThan(3);
  const card = await panel.locator('.nonsport-card').boundingBox();
  expect(card).not.toBeNull();
  expect(card!.y).toBeGreaterThanOrEqual(60);
  expect(card!.y + card!.height).toBeLessThanOrEqual(page.viewportSize()!.height - 20);
  const text = await panel.locator('p').boundingBox();
  expect(text!.y + text!.height).toBeLessThanOrEqual(card!.y + card!.height);
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 360, height: 800 }, { width: 844, height: 390 }]) {
  test(`same pinned sequence and horizontal gallery ${viewport.width}x${viewport.height}`, async ({ browser }, info) => {
    const context = await browser.newContext({ viewport, hasTouch: viewport.width < 900, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="nonsport"]');
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    await page.waitForTimeout(1200);
    const m = await measure(page);
    expect(m.travel).toBeGreaterThan(0);
    for (let i = 0; i < 3; i++) {
      await scroll(page, Math.round(m.start + m.travel * ((i + .5) / 3)));
      await verifyPanel(page, i);
      await page.screenshot({ path: info.outputPath(`panel-0${i+1}.png`) });
    }
    // Additional wheel movement must also change the active card.
    if (viewport.width >= 900) {
      await scroll(page, Math.round(m.start + m.travel * .1));
      await page.mouse.wheel(0, Math.round(m.travel * .4));
      await expect(page.getByTestId('concept-02')).toHaveAttribute('data-active', 'true', { timeout: 10000 });
      // Finish Lenis inertia before starting a programmatic reverse scroll.
      await page.waitForTimeout(2200);
    }
    for (let i = 2; i >= 0; i--) {
      await scroll(page, Math.round(m.start + m.travel * ((i + .5) / 3)));
      await verifyPanel(page, i);
    }
    const track = page.getByTestId('gallery-track');
    await scroll(page, Math.round(m.galleryStart + m.galleryTravel * .01));
    const first = await track.locator('.gallery-img-wrap').first().boundingBox();
    expect(first!.x).toBeGreaterThan(-5);
    expect(first!.x).toBeLessThan(viewport.width);
    await scroll(page, Math.round(m.galleryStart + m.galleryTravel * .5));
    await expect.poll(() => track.evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41), { timeout: 10000 }).toBeLessThan(-50);
    const midX = await track.evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41);
    const pinTop = await page.locator('.gallery-viewport').evaluate(e => e.getBoundingClientRect().top);
    expect(Math.abs(pinTop)).toBeLessThan(3);
    await scroll(page, Math.round(m.galleryStart + m.galleryTravel));
    await expect.poll(async () => { const box = await track.locator('.gallery-img-wrap').last().boundingBox(); return box!.x + box!.width; }, { timeout: 10000 }).toBeLessThanOrEqual(viewport.width + 2);
    const last = await track.locator('.gallery-img-wrap').last().boundingBox();
    expect(last!.x).toBeGreaterThanOrEqual(-2);
    expect(last!.x + last!.width).toBeLessThanOrEqual(viewport.width + 2);
    await page.screenshot({ path: info.outputPath('gallery-last.png') });
    await scroll(page, Math.round(m.galleryStart + m.galleryTravel + viewport.height * .6));
    expect(await page.locator('.gallery-viewport').evaluate(e => e.getBoundingClientRect().top)).toBeLessThan(-viewport.height * .5);
    await scroll(page, Math.round(m.galleryStart + m.galleryTravel * .01));
    await expect.poll(() => track.evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).m41), { timeout: 10000 }).toBeGreaterThan(midX);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    const ids = await page.locator('section[data-section]').evaluateAll(es => es.map(e => e.getAttribute('data-section')));
    expect(ids).toEqual(['1','2','3','4','5','6','7','8','9']);
    expect(errors).toEqual([]);
    await context.close();
  });
}

test('resize keeps the sequence and gallery; reduced motion exposes all content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="nonsport"]');
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  await page.waitForTimeout(1200);
  await page.setViewportSize({ width: 360, height: 800 });
  await scroll(page, 0);
  await page.waitForTimeout(800);
  const m = await measure(page);
  await scroll(page, Math.round(m.start + m.travel * .5));
  await verifyPanel(page, 1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(650);
  expect(await page.locator('[data-testid="nonsport"]').evaluate(e => e.parentElement!.classList.contains('pin-spacer'))).toBe(false);
  for (const panel of await page.locator('.nonsport-panel').all()) {
    await expect(panel).toHaveCSS('opacity', '1');
    await expect(panel).toHaveAttribute('aria-hidden', 'false');
  }
  await expect(page.locator('.gallery-viewport')).not.toHaveCSS('position', 'fixed');
  await expect(page.getByTestId('gallery-track')).toHaveCSS('transform', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await scroll(page, 0);
  await page.waitForTimeout(800);
  const restored = await measure(page);
  expect(restored.travel).toBeGreaterThan(0);
  await scroll(page, Math.round(restored.start + restored.travel * .8));
  await verifyPanel(page, 2);
});
