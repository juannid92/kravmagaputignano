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

  // Test hamburger menu click
  console.log('=== TESTING HAMBURGER MENU ===');
  const menuBtn = await page.locator('header svg').first();
  await menuBtn.click();
  await page.waitForTimeout(500);
  const menuOpen = await page.evaluate(() => {
    const menu = document.querySelector('[class*="menu-open"], [class*="mobile-menu"], [class*="menuContent"], nav, [class*="nav-"]');
    return {
      found: !!menu,
      class: menu?.className?.substring(0, 100),
      isVisible: menu ? menu.offsetParent !== null : false,
      height: menu?.offsetHeight,
      children: menu?.children?.length
    };
  });
  console.log('Menu state after click:', JSON.stringify(menuOpen, null, 2));

  // Take screenshot with menu open
  await page.screenshot({ path: 'mobile-menu-open.png' });
  console.log('Screenshot taken: mobile-menu-open.png');

  await browser.close();
  console.log('Done!');
})();
