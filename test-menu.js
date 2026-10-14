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

  console.log('=== SEARCHING FOR MOBILE MENU ===');

  const mobileMenuSearch = await page.evaluate(() => {
    // Find all hidden elements that might be mobile menus
    const hidden = document.querySelectorAll('[class*="hidden"]');
    const mobileMenus = [];

    for (const el of hidden) {
      const className = typeof el.className === 'string' ? el.className : '';
      if (className.includes('mobile') || className.includes('drawer') || className.includes('menu')) {
        mobileMenus.push({
          tag: el.tagName,
          class: className.substring(0, 150),
          id: el.id,
          childCount: el.children?.length
        });
      }
    }

    // Find header and its children
    const header = document.querySelector('header');
    const headerChildren = Array.from(header.children).map(c => ({
      tag: c.tagName,
      class: typeof c.className === 'string' ? c.className.substring(0, 100) : '',
      childCount: c.children?.length
    }));

    return { mobileMenus, headerChildren };
  });

  console.log(JSON.stringify(mobileMenuSearch, null, 2));

  await browser.close();
})();
