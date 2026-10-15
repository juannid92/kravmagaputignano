import {test, expect} from '@playwright/test';
for (const viewport of [{width:1440,height:1000},{width:390,height:844},{width:360,height:800}]) {
 test(`structure manifesto readable without motion ${viewport.width}x${viewport.height}`,async({browser},info)=>{
  const context=await browser.newContext({viewport,hasTouch:viewport.width<900,reducedMotion:'reduce'});
  try {
   const page=await context.newPage();
   await page.goto('/',{waitUntil:'domcontentloaded'});
   const section=page.getByTestId('structure');
   await section.waitFor();
   await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
   await section.scrollIntoViewIfNeeded();
   const features=page.getByTestId('structure-feature');
   await expect(features).toHaveCount(3);
   for (const feature of await features.all()) {
    await expect(feature).toHaveCSS('opacity','1');
    const styles=await feature.evaluate(e=>{const s=getComputedStyle(e);return{background:s.backgroundColor,left:s.borderLeftWidth,right:s.borderRightWidth,bottom:s.borderBottomWidth}});
    expect(styles).toEqual({background:'rgba(0, 0, 0, 0)',left:'0px',right:'0px',bottom:'0px'});
    const text=await feature.locator('p').boundingBox();
    expect(text!.x).toBeGreaterThanOrEqual(20);expect(text!.x+text!.width).toBeLessThanOrEqual(viewport.width-20);
   }
   await expect(section.locator('h3')).toHaveText(['Palestruttura','Istruttori','Sicurezza']);
   await expect(section.locator('dt')).toHaveText(['Studenti attivi','Anni di esperienza','Sedi operative','Lezioni tenute']);
   await expect(section.locator('dd')).toHaveText(['200+','15+','2','500+']);
   expect(await section.evaluate(e=>e.parentElement!.classList.contains('pin-spacer'))).toBe(false);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
   const photo=section.locator('img');await expect.poll(()=>photo.evaluate((e:HTMLImageElement)=>e.complete&&e.naturalWidth>0)).toBe(true);
   await section.screenshot({path:info.outputPath(`manifesto-${viewport.width}.png`)});
  }finally{await context.close()}
 });
}

test('manifesto parallax responds to scroll and leaves all copy readable',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'no-preference'});
 try{
  const page=await context.newPage();await page.goto('/',{waitUntil:'domcontentloaded'});
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});await page.waitForTimeout(1300);
  const section=page.getByTestId('structure');const photo=section.locator('[data-manifesto-photo]');
  const top=await section.evaluate(e=>e.getBoundingClientRect().top+scrollY);
  await page.evaluate(y=>scrollTo({top:y-300,behavior:'instant'}),top);await page.waitForTimeout(1000);
  const before=await photo.evaluate(e=>getComputedStyle(e).transform);
  await page.evaluate(y=>scrollTo({top:y+300,behavior:'instant'}),top);await page.waitForTimeout(1000);
  const after=await photo.evaluate(e=>getComputedStyle(e).transform);expect(before).not.toBe(after);
  for(const feature of await page.getByTestId('structure-feature').all()){
   const y=await feature.evaluate(e=>e.getBoundingClientRect().top+scrollY-180);
   await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
   await expect(feature).toHaveCSS('opacity','1');
  }
  expect(await section.evaluate(e=>e.parentElement!.classList.contains('pin-spacer'))).toBe(false);
 }finally{await context.close()}
});
