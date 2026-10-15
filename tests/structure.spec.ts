import {test, expect} from '@playwright/test';
for (const viewport of [{width:1440,height:1000},{width:390,height:844},{width:360,height:800}]) {
 test(`open structure layout ${viewport.width}x${viewport.height}`,async({browser},info)=>{
  const context=await browser.newContext({viewport,hasTouch:viewport.width<900});
  try {
   const page=await context.newPage();
   await page.goto('/',{waitUntil:'domcontentloaded'});
   const section=page.getByTestId('structure');
   await section.waitFor();await page.waitForTimeout(1600);
   const y=await section.evaluate(e=>e.getBoundingClientRect().top+scrollY-24);
   if(viewport.width>=900){await page.mouse.move(100,200);await page.mouse.wheel(0,y)}
   else await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);
   await expect.poll(async()=>Math.abs(await page.evaluate(()=>scrollY)-y),{timeout:10000}).toBeLessThan(8);
   const features=page.getByTestId('structure-feature');
   await expect(features).toHaveCount(3);
   for (const feature of await features.all()) {
    await expect(feature).toHaveCSS('opacity','1');
    const styles=await feature.evaluate(e=>{const s=getComputedStyle(e);return{background:s.backgroundColor,left:s.borderLeftWidth,right:s.borderRightWidth,bottom:s.borderBottomWidth}});
    expect(styles).toEqual({background:'rgba(0, 0, 0, 0)',left:'0px',right:'0px',bottom:'0px'});
    const text=await feature.locator('p').boundingBox();
    expect(text!.x).toBeGreaterThanOrEqual(24);expect(text!.x+text!.width).toBeLessThanOrEqual(viewport.width-24);
   }
   await expect(section.locator('dt')).toHaveText(['Studenti Attivi','Anni di Esperienza','Sedi Operative','Lezioni Tenute']);
   await expect(section.locator('dd')).toHaveText(['200+','15+','2','500+']);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
   await section.screenshot({path:info.outputPath(`structure-${viewport.width}.png`)});
  }finally{await context.close()}
 });
}
