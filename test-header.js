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

  // Get header structure
  console.log('=== HEADER STRUCTURE ===');
  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector('header');
    const buttons = header.querySelectorAll('button');
    const svgs = header.querySelectorAll('svg');
    const links = header.querySelectorAll('a');

    return {
      headerClass: header?.className?.substring(0, 200),
      buttons: Array.from(buttons).map(b => ({
        text: b.innerText?.substring(0, 50),
        visible: b.offsetParent !== null,
        class: b.className?.substring(0, 100)
      })),
      svgs: Array.from(svgs).map(s => ({
        visible: s.offsetParent !== null,
        parent: s.parentElement?.tagName,
        parentClass: s.parentElement?.className?.substring(0, 60)
      })),
      links: Array.from(links).map(l => ({
        text: l.innerText?.substring(0, 50),
        visible: l.offsetParent !== null
      }))
    };
  });
  console.log(JSON.stringify(headerInfo, null, 2));

  // Try to find mobile menu button
  console.log('\n=== SEARCHING FOR MOBILE MENU ===');
  const mobileMenuInfo = await page.evaluate(() => {
    // Find any element with mobile, menu, hamburger in class
    const allElements = document.querySelectorAll('*');
    const potentialMenu = [];

    for (const el of allElements) {
      const className = el.className?.toLowerCase() || '';
      const id = el.id?.toLowerCase() || '';
      if ((className.includes('mobile') && className.includes('menu')) ||
          (className.includes('hamburger')) ||
          (id.includes('mobile') && id.includes('menu'))) {
        potentialMenu.push({
          tag: el.tagName,
          class: el.className?.substring(0, 100),
          visible: el.offsetParent !== null,
          hasClickHandler: el.onclick !== null || el.getAttribute('role') === 'button'
        });
      }
    }
    return potentialMenu;
  });
  console.log(JSON.stringify(mobileMenuInfo, null, 2));

  await browser.close();
})();
