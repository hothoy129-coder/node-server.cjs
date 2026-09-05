/* Klar 5.0 integration tests. Start server.cjs before running this file. */
'use strict';
const {chromium}=require(process.env.KLAR_PLAYWRIGHT_PATH || 'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const base=process.env.KLAR_BASE_URL || 'http://127.0.0.1:4173';
const artifacts=process.env.KLAR_TEST_ARTIFACTS;

async function settle(page){
  await page.waitForFunction(()=>typeof cardBusy==='undefined'||!cardBusy);
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
}
async function go(page,view){
  await page.locator(`.sidebar button[data-nav="${view}"]`).click();
  await settle(page);
  assert.equal(await page.evaluate(()=>state.page),view);
}
async function closeDialog(page){
  await page.locator('#detail [data-action="close"]').click();
  await page.waitForFunction(()=>!document.querySelector('#detail').open);
}
async function setLevel(page,level){
  await page.locator('.topbar [data-action="settings"]').click();
  assert.deepEqual(await page.locator('[data-settings-level]').allTextContents(),['A1','A2','B1','B2']);
  await page.locator(`[data-settings-level="${level}"]`).click();
  await page.locator('#save-profile').click();
  await page.waitForFunction(()=>!document.querySelector('#detail').open);
  assert.equal(await page.evaluate(()=>state.level),level);
}
async function openUnit(page,id,level){
  if(await page.evaluate(()=>state.level)!==level)await setLevel(page,level);
  await go(page,'library');
  await page.locator(`[data-enter-unit="${id}"]`).click();
  await settle(page);
  assert.equal(await page.evaluate(()=>state.unit),id);
}
async function groups(page){
  const count=await page.locator('main [data-content-module]').count();
  assert(count>=1&&count<=5,`Expected 1–5 content groups, found ${count}`);
}

(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.KLAR_BROWSER_PATH?{executablePath:process.env.KLAR_BROWSER_PATH}:{})});
  try{
    for(const [file,type,min] of [
      ['materials/goethe-a1-wortliste.pdf','application/pdf',700000],
      ['materials/goethe-a2-wortliste.pdf','application/pdf',1200000],
      ['materials/goethe-b1-wortliste.pdf','application/pdf',450000],
      ['materials/goethe-b2-modellsatz.pdf','application/pdf',7000000]
    ]){
      const response=await fetch(`${base}/${file}`);
      assert.equal(response.status,200);
      assert.match(response.headers.get('content-type')||'',new RegExp(type));
      assert(Number(response.headers.get('content-length'))>min,`${file} is unexpectedly small`);
      await response.body.cancel();
    }

    const context=await browser.newContext({viewport:{width:1440,height:1080},reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];
    page.setDefaultTimeout(12000);
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('https://**/*',route=>route.abort());
    await page.goto(base);
    await page.locator('.daily-plan').waitFor();

    assert.equal(await page.evaluate(()=>state.page),'home');
    assert.deepEqual(await page.evaluate(()=>({cards:allCards.length,units:UNITS.length,perUnit:UNITS.map(u=>u.words.length),examples:allCards.map(c=>examplesOf(c.w).length),audio:Object.keys(AUDIO_FILES).length})),{
      cards:120,units:10,perUnit:Array(10).fill(12),examples:Array(120).fill(3),audio:579
    });
    assert.equal(await page.locator('[data-level]').count(),0,'Learning-level switches must not appear on pages');
    assert.equal(await page.locator('[data-nav="ai"]').count(),0,'AI navigation must be removed');
    await groups(page);

    const rollover=await page.evaluate(()=>{
      state.studyDate='2000-01-01';state.page='learn';state.queue=[allCards[5]];state.index=1;
      const marker=state.records['a1-cafe:0']={due:12345,reviews:7};
      rolloverDailyStudy(dateKey(),false);
      return {page:state.page,queue:state.queue,index:state.index,date:state.studyDate,today:dateKey(),kept:state.records['a1-cafe:0']===marker};
    });
    assert.deepEqual(rollover,{page:'home',queue:null,index:0,date:rollover.today,today:rollover.today,kept:true});
    console.log('PASS: 120 cards, 360 examples, 579 clips and local-midnight daily reset.');

    // Learning level is centralized in Settings and persists.
    await setLevel(page,'B1');
    assert.equal(await page.evaluate(()=>state.page),'home');
    assert.equal(await page.locator('[data-level]').count(),0);
    await page.reload();
    assert.equal(await page.evaluate(()=>state.level),'B1');
    assert.equal(await page.locator('.page-heading .pill').textContent(),'B1');
    await setLevel(page,'A1');
    console.log('PASS: A1–B2 selector exists only in Settings and level changes persist.');

    // Official resources are bundled and previewed inside the app.
    await go(page,'resources');
    assert.equal(await page.locator('[data-content-module="materials"] .material-card').count(),4);
    const expected={A1:'goethe-a1-wortliste.pdf',A2:'goethe-a2-wortliste.pdf',B1:'goethe-b1-wortliste.pdf',B2:'goethe-b2-modellsatz.pdf'};
    for(const [level,file] of Object.entries(expected)){
      await page.locator(`.material-card[data-material="${level}"]`).click();
      await settle(page);
      const source=await page.locator('.material-frame').getAttribute('src');
      assert(source.startsWith(`materials/${file}#`),`${level} preview should use bundled PDF`);
      assert.equal(await page.locator(`.material-card[data-material="${level}"]`).getAttribute('aria-pressed'),'true');
    }
    await groups(page);
    await go(page,'library');
    await page.locator('.source-chip').first().click();
    assert.equal(await page.evaluate(()=>state.page),'resources');
    assert.match(await page.locator('.material-frame').getAttribute('src'),/goethe-a1-wortliste\.pdf/);
    console.log('PASS: A1–B2 Goethe PDFs open in the in-site resource center.');

    // Fixed MP3 audio: normal and slow use the same file at exact rates.
    await openUnit(page,'a1-cafe','A1');
    await page.evaluate(()=>{window.__klarAudioEvents=[];document.addEventListener('klar:audio-play',event=>window.__klarAudioEvents.push(event.detail));});
    await page.locator('.dialogue-line [data-study-speak]').first().click();
    await page.waitForFunction(()=>window.__klarAudioEvents.length===1);
    await page.locator('[data-view="speaking"]').click();
    await page.locator('[data-rate-speed="0.8"]').click();
    await page.waitForFunction(()=>window.__klarAudioEvents.length===2);
    const events=await page.evaluate(()=>window.__klarAudioEvents);
    assert.match(events[0].source,/^audio\/[a-f0-9]{24}\.mp3$/);
    assert.equal(events[0].rate,1);
    assert.equal(events[1].rate,.8);
    assert.equal(events[1].source,events[0].source,'Normal and slow must use the same fixed MP3');
    const speakingText=await page.locator('.shadow-text p[lang="de"]').innerText();
    assert.equal(await page.evaluate(value=>AUDIO_FILES[value],speakingText),events[1].source);
    const metadata=await page.evaluate(async source=>{
      const audio=new Audio(source);
      await new Promise((resolve,reject)=>{audio.onloadedmetadata=resolve;audio.onerror=reject;audio.load();});
      return {duration:audio.duration,normal:audio.duration/1,slow:audio.duration/.8};
    },events[1].source);
    assert(metadata.duration>0);
    assert(Math.abs(metadata.slow/metadata.normal-1.25)<1e-9);
    assert.equal(await page.locator('[data-action="record"]').count(),0);
    assert.equal(await page.locator('.recording-area').count(),0);
    assert.match(await page.locator('.audio-note').textContent(),/0\.8×/);
    console.log(`PASS: fixed audio uses exact 1×/0.8× playback; slow duration ratio ${metadata.slow/metadata.normal}.`);

    // Reading, cards, grammar and exam practice remain connected.
    await page.locator('[data-view="reading"]').click();
    const lineCount=await page.evaluate(()=>LESSONS[state.unit].lines.length);
    assert.equal(await page.locator('.dialogue-line').count(),lineCount);
    await page.locator('.inline-word[data-lookup="a1-cafe:0"]').first().click();
    assert.equal(await page.locator('.dictionary-term').textContent(),'der Kaffee');
    assert.equal(await page.locator('#detail .grammar-example').count(),3);
    await closeDialog(page);
    await page.locator('.grammar-entry').click();
    assert.match(await page.locator('#dialog-title').textContent(),/A1/);
    await closeDialog(page);
    await go(page,'exam');
    assert.equal(await page.locator('.skills-grid .skill-card').count(),4);
    await page.locator('[data-skill="listen"]').click();
    assert.match(await page.locator('#detail').textContent(),/0\.8×/);
    await closeDialog(page);
    await page.locator('[data-material="A1"]').click();
    assert.equal(await page.evaluate(()=>state.page),'resources');
    console.log('PASS: reading, word lookup, grammar, four-skill prep and resource handoff remain connected.');

    // Personal profile and annotation language stay local and persistent.
    await page.locator('.topbar [data-action="settings"]').click();
    await page.fill('#profile-name','Mia <3');
    await page.locator('[data-theme="rose"]').click();
    await page.selectOption('#goal-select','12');
    await page.locator('#save-profile').click();
    await page.waitForFunction(()=>!document.querySelector('#detail').open);
    await page.locator('[data-lang="en"]').click();
    await page.reload();
    assert.equal(await page.evaluate(()=>state.profile.name),'Mia <3');
    assert.equal(await page.evaluate(()=>state.profile.theme),'rose');
    assert.equal(await page.evaluate(()=>state.goal),12);
    assert.equal(await page.evaluate(()=>state.lang),'en');

    // Every view remains within five major groups and has no horizontal overflow.
    for(const width of [320,390,768,1024,1440]){
      await page.setViewportSize({width,height:960});
      for(const view of ['home','library','grammar','exam','resources','review','favorites','progress','learn']){
        await go(page,view);await groups(page);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${view}: overflow at ${width}px`);
      }
      for(const activity of ['reading','cards','speaking']){
        await page.locator(`[data-view="${activity}"]`).first().click();await settle(page);await groups(page);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${activity}: overflow at ${width}px`);
      }
    }
    if(artifacts){
      fs.mkdirSync(artifacts,{recursive:true});
      await page.setViewportSize({width:1440,height:1080});
      await go(page,'home');
      await page.screenshot({path:path.join(artifacts,'klar-v5-home.png'),fullPage:true});
      await go(page,'resources');
      await page.screenshot({path:path.join(artifacts,'klar-v5-materials.png'),fullPage:true});
      await page.setViewportSize({width:390,height:844});
      await page.screenshot({path:path.join(artifacts,'klar-v5-materials-mobile.png'),fullPage:true});
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: all views at 320/390/768/1024/1440px, 1–5 major groups, no JavaScript errors.');
    console.log('Klar 5.0 integration suite passed.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
