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

  console.log('=== COMPREHENSIVE MOBILE TEST ===\n');

  // 1. HERO SECTION
  console.log('1. HERO SECTION');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const heroCheck = await page.evaluate(() => {
    const hero = document.querySelector('section');
    const h1 = hero.querySelector('h1');
    const cta = hero.querySelector('button, a');
    return {
      visible: hero?.getBoundingClientRect().top < 700,
      h1Size: h1 ? window.getComputedStyle(h1).fontSize : null,
      h1Visible: h1 ? h1.getBoundingClientRect().top < 700 : false,
      hasCTA: !!cta,
      ctaInView: cta ? cta.getBoundingClientRect().top < 700 : false,
      heroHeight: hero?.getBoundingClientRect().height
    };
  });
  console.log('   Hero visible:', heroCheck.visible);
  console.log('   H1 font size:', heroCheck.h1Size, '(might be too large on 375px mobile)');
  console.log('   CTA button:', heroCheck.hasCTA, '- In view:', heroCheck.ctaInView);

  // 2. NONSPORT - 3 cards
  console.log('\n2. NONSPORT SECTION (3 riquadri)');
  await page.evaluate(() => {
    const ns = Array.from(document.querySelectorAll('section')).find(s =>
      s.innerText.includes('NON È UNO SPORT') || s.innerText.includes('FILOSOFIA')
    );
    if (ns) ns.scrollIntoView();
  });
  await page.waitForTimeout(300);
  const nonsportCheck = await page.evaluate(() => {
    const ns = Array.from(document.querySelectorAll('section')).find(s =>
      s.innerText.includes('NON È UNO SPORT') || s.innerText.includes('FILOSOFIA')
    );
    if (!ns) return { found: false };

    const cards = ns.querySelectorAll('[class*="card"], [class*="item"], [class*="box"]');
    const numbers = ns.querySelectorAll('span[class*="font-display"]');

    return {
      found: true,
      cardCount: cards.length,
      numberCount: numbers.length,
      cardsVisible: Array.from(cards).filter(c => c.getBoundingClientRect().top < 1000).length
    };
  });
  console.log('   NonSport section found:', nonsportCheck.found);
  console.log('   Cards found:', nonsportCheck.cardCount);
  console.log('   Numbers found:', nonsportCheck.numberCount);
  console.log('   Cards visible:', nonsportCheck.cardsVisible);

  // 3. GALLERIA HOME - horizontal scroll
  console.log('\n3. GALLERIA HOME (horizontal scroll)');
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(300);
  const galleryCheck = await page.evaluate(() => {
    const gallery = Array.from(document.querySelectorAll('[class*="gallery-img-wrap"]'))[0];
    if (!gallery) return { found: false };

    const parent = gallery.parentElement;
    const style = window.getComputedStyle(parent);
    const images = gallery.parentElement.querySelectorAll('[class*="gallery-img-wrap"]');

    return {
      found: true,
      parentOverflowX: style.overflowX,
      parentDisplay: style.display,
      imageCount: images.length,
      totalWidth: parent.scrollWidth,
      visibleWidth: parent.clientWidth,
      canScroll: parent.scrollWidth > parent.clientWidth
    };
  });
  console.log('   Gallery found:', galleryCheck.found);
  console.log('   Parent overflow-x:', galleryCheck.parentOverflowX, '(should be auto/scroll for scroll)');
  console.log('   Image count:', galleryCheck.imageCount);
  console.log('   Total width:', galleryCheck.totalWidth + 'px', 'Visible:', galleryCheck.visibleWidth + 'px');
  console.log('   Can scroll:', galleryCheck.canScroll);

  // 4. VIDEO SHOWCASE
  console.log('\n4. VIDEO SHOWCASE');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(300);
  const videoCheck = await page.evaluate(() => {
    const video = document.querySelector('video');
    if (!video) return { found: false };
    const rect = video.getBoundingClientRect();
    return {
      found: true,
      visible: rect.top < 800 && rect.bottom > 0,
      hasSrc: !!video.src,
      src: video.src?.substring(0, 50)
    };
  });
  console.log('   Video found:', videoCheck.found);
  console.log('   Video visible:', videoCheck.visible);
  console.log('   Has source:', videoCheck.hasSrc);

  // 5. ANIMATIONS / REDUCED MOTION
  console.log('\n5. ANIMATIONS / REDUCED MOTION');
  const animationCheck = await page.evaluate(() => {
    const hasGSAP = typeof gsap !== 'undefined';
    const elements = document.querySelectorAll('[class*="animate-"], [style*="animation"]');
    return {
      hasGSAP,
      animatedElements: elements.length,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  });
  console.log('   GSAP loaded:', animationCheck.hasGSAP);
  console.log('   Animated elements count:', animationCheck.animatedElements);
  console.log('   Reduced motion preference:', animationCheck.reducedMotion);

  // 6. HAMBURGER MENU
  console.log('\n6. HAMBURGER MENU');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const menuCheck = await page.evaluate(() => {
    const menuBtn = document.querySelector('button.md\\:hidden');
    const nav = document.querySelector('nav');
    return {
      buttonFound: !!menuBtn,
      buttonHasOnClick: menuBtn?.onclick !== null,
      navFound: !!nav,
      navHasMobileClass: nav?.className?.includes('mobile'),
      navHiddenOnMobile: nav?.className?.includes('hidden')
    };
  });
  console.log('   Menu button found:', menuCheck.buttonFound);
  console.log('   Button has onClick handler:', menuCheck.buttonHasOnClick);
  console.log('   Nav found:', menuCheck.navFound);
  console.log('   Nav has mobile class:', menuCheck.navHasMobileClass);
  console.log('   Nav hidden on mobile:', menuCheck.navHiddenOnMobile);

  // 7. TEXT READABILITY
  console.log('\n7. TEXT READABILITY');
  const textCheck = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const paragraphs = document.querySelectorAll('p');
    const smallTexts = document.querySelectorAll('p, span, a');

    const tooSmall = Array.from(smallTexts).filter(el => {
      const fs = parseFloat(window.getComputedStyle(el).fontSize);
      return fs < 14 && el.getBoundingClientRect().width > 0;
    });

    return {
      h1Size: h1 ? window.getComputedStyle(h1).fontSize : null,
      paragraphCount: paragraphs.length,
      textsBelow14px: tooSmall.length,
      tinyTexts: tooSmall.slice(0, 5).map(t => ({
        text: t.innerText?.substring(0, 30),
        size: window.getComputedStyle(t).fontSize
      }))
    };
  });
  console.log('   H1 font size:', textCheck.h1Size, '(64px might overflow on mobile)');
  console.log('   Paragraphs:', textCheck.paragraphCount);
  console.log('   Texts below 14px:', textCheck.textsBelow14px);

  // Take screenshots
  await page.screenshot({ path: 'mobile-hero-final.png' });
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'mobile-nonsport-final.png' });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'mobile-gallery-final.png' });

  console.log('\n=== SCREENSHOTS SAVED ===');
  console.log('- mobile-hero-final.png');
  console.log('- mobile-nonsport-final.png');
  console.log('- mobile-gallery-final.png');

  await browser.close();
  console.log('\nDone!');
})();
