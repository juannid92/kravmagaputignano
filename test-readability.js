const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/home/giovannimacina/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome',
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);

  // Take full page screenshot
  await page.screenshot({ path: 'mobile-full.png', fullPage: true });
  console.log('Screenshot taken: mobile-full.png');

  // Check text readability (font sizes)
  console.log('\n=== TEXT READABILITY ===');
  const textReadability = await page.evaluate(() => {
    const texts = [];
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button');

    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        texts.push({
          tag: el.tagName,
          text: el.innerText?.substring(0, 30),
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          fontWeight: style.fontWeight,
          color: style.color,
          width: Math.round(rect.width),
          visible: rect.top < window.innerHeight
        });
      }
    });

    return texts.slice(0, 20);
  });
  console.log(JSON.stringify(textReadability, null, 2));

  // Check Hero specifically
  console.log('\n=== HERO SECTION ===');
  const heroInfo = await page.evaluate(() => {
    const hero = document.querySelector('section');
    if (!hero) return { found: false };

    const h1 = hero.querySelector('h1');
    const p = hero.querySelectorAll('p');
    const button = hero.querySelector('button, a[href*="prenota"]');

    return {
      found: true,
      h1: {
        text: h1?.innerText?.substring(0, 100),
        fontSize: h1 ? window.getComputedStyle(h1).fontSize : null,
        visible: h1 ? h1.getBoundingClientRect().top < window.innerHeight : false
      },
      paragraphs: p.length,
      hasCTA: !!button,
      ctaText: button?.innerText?.substring(0, 50)
    };
  });
  console.log(JSON.stringify(heroInfo, null, 2));

  await browser.close();
  console.log('\nDone!');
})();
