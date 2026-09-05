'use strict';
const ICONS={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',cards:'<rect x="6" y="7" width="14" height="14" rx="2"/><path d="M16 3H5a2 2 0 0 0-2 2v11M10 12h6m-6 4h4"/>',book:'<path d="M12 5c-4-3-9-2-9-2v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2v16"/>',graduate:'<path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v6c4 3 8 3 12 0v-6m4-3v9"/>',refresh:'<path d="M20 7a9 9 0 0 0-16-1M4 2v4h4M4 17a9 9 0 0 0 16 1m0 4v-4h-4"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4V3Z"/>',chart:'<path d="M4 3v18h17M8 16v-5m5 5V6m5 10v-7"/>',settings:'<path d="m9 3-1 3-3 1-2 4 2 2v4l4 2 3-1 3 1 4-2v-4l2-2-2-4-3-1-1-3H9Z"/><circle cx="12" cy="11" r="3"/>',search:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',volume:'<path d="m11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',check:'<path d="m5 12 4 4L19 6"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',play:'<path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',coffee:'<path d="M4 9h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Zm13 1h2a3 3 0 0 1 0 6h-2M6 2v3m5-3v3m5-3v3"/>',utensils:'<path d="M4 3v6c0 3 6 3 6 0V3M7 3v18m13 0V3c-5 2-5 10 0 10"/>',home:'<path d="m3 10 9-7 9 7v11H3V10Zm6 11v-8h6v8"/>',key:'<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-5-5 3-3m0 6 3-3"/>',briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12c5 4 13 4 18 0m-9 1v4"/>',message:'<path d="M21 14a3 3 0 0 1-3 3H9l-6 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8Z"/><path d="M7 8h10M7 12h6"/>',building:'<path d="M4 21V7h8V3h8v18H4Zm4-10v2m0 3v2m8-11v2m0 3v2m0 3v2"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',headphones:'<path d="M3 15v-3a9 9 0 0 1 18 0v3M3 12h4v8H5a2 2 0 0 1-2-2v-6Zm18 0h-4v8h2a2 2 0 0 0 2-2v-6Z"/>',pen:'<path d="m4 16 12-12 4 4L8 20H4v-4Zm10-10 4 4"/>',globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',leaf:'<path d="M5 19C-1 8 10 2 21 3c1 13-5 20-16 16Zm0 0L17 7"/>'};
const icon=(name)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.book}</svg>`;
const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY = 'klar.learning.v1';
const THEMES = ['sage', 'sand', 'sky', 'rose'];
const safeObject = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const validAvatar = value => typeof value === 'string' && value.length < 600000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value) ? value : '';
let saved = {};
try { saved = safeObject(JSON.parse(localStorage.getItem(KEY) || '{}')); } catch {}
const savedProfile = safeObject(saved.profile);
const state = {
  lang: saved.lang === 'en' ? 'en' : 'zh',
  level: Object.hasOwn(LEVELS, saved.level) ? saved.level : 'A1',
  unit: UNITS.some(u => u.id === saved.unit) ? saved.unit : 'a1-cafe',
  page: 'learn', index: 0, revealed: false, queue: null, completed: false,
  records: safeObject(saved.records), favorites: Array.isArray(saved.favorites) ? saved.favorites.filter(x => typeof x === 'string') : [],
  days: safeObject(saved.days), drafts: safeObject(saved.drafts), goal: [4,8,12,20].includes(saved.goal) ? saved.goal : 8,
  profile: {name: typeof savedProfile.name === 'string' ? savedProfile.name.slice(0,24) : '', avatar: validAvatar(savedProfile.avatar), theme: THEMES.includes(savedProfile.theme) ? savedProfile.theme : 'sage'}
};
const allCards = UNITS.flatMap(u => u.words.map((w,index) => ({id:`${u.id}:${index}`, u, w, index})));
const activeIds = new Set(allCards.map(c => c.id));
if (unit().level !== state.level) state.unit = UNITS.find(u => u.level === state.level).id;
const t = (zh,en) => state.lang === 'en' ? en : zh;
const tr = pair => pair[state.lang === 'en' ? 1 : 0];
function morphology(value) { const parts=value.split(' / '); return parts.length<2 ? value : state.lang==='en' ? parts[0].replace(/[\u3400-\u9fff]+/g,'')+parts[1] : parts[0]; }
function examplesOf(word) { const examples=[];for(let i=4;i+2<word.length;i+=3)examples.push({de:word[i],zh:word[i+1],en:word[i+2]});return examples; }
function sourceNote(level) { const source=COURSE_SOURCES[level];return source?`<button class="source-chip" data-material="${level}">${icon('check')}${esc(tr(source.label))} ↗</button>`:''; }
function unit() { return UNITS.find(u => u.id === state.unit) || UNITS[0]; }
function cards() { return state.queue || allCards.filter(c => c.u.id === state.unit); }
function current() { return cards()[state.index]; }
function dateKey() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function todayCount() { return new Set((Array.isArray(state.days[dateKey()]) ? state.days[dateKey()] : []).filter(id => activeIds.has(id))).size; }
function due() { return allCards.filter(c => state.records[c.id] && state.records[c.id].due <= Date.now()); }
function snapshot() { return {version:2,lang:state.lang,level:state.level,unit:state.unit,records:state.records,favorites:state.favorites,days:state.days,goal:state.goal,drafts:state.drafts,profile:state.profile}; }
function persist() { try { localStorage.setItem(KEY,JSON.stringify(snapshot())); return true; } catch { toast(t('浏览器无法保存更改，请导出学习记录。','Changes could not be saved. Please export your records.')); return false; } }
let toastTimer;
function toast(message) { const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2600); }

// Motion is presentation-only. Epochs prevent a delayed animation from mutating a new page.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let epoch=0,cardBusy=false,dialogClosing=false,dialogVersion=0,profileDraft=null,profileLevelDraft=state.level,avatarBusy=false,avatarRequest=0,selectedMaterial=state.level;
function motion(el,frames,duration=260) {
  if(!el || reducedMotion.matches) return Promise.resolve();
  const animation=el.animate(frames,{duration,easing:'cubic-bezier(.22,.7,.22,1)',fill:'none'});
  return animation.finished.catch(()=>{});
}
function invalidateMotion() { epoch++;cardBusy=false; }
function entrance(el) { return motion(el,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}]); }
function displayName() { return state.profile.name || t('德语学习者','German learner'); }
function avatarMarkup(profile=state.profile) {
  return `<span class="avatar avatar-${profile.theme}">${profile.avatar ? `<img src="${profile.avatar}" alt="${t('个人头像','Profile photo')}">` : esc(Array.from(profile.name || 'K')[0].toUpperCase())}</span>`;
}
const navs=[['learn','grid','今日学习','Today'],['library','cards','分级课程','Courses'],['grammar','book','语法手册','Grammar'],['exam','graduate','歌德备考','Exam prep'],['resources','book','官方资料','Official materials'],['review','refresh','间隔复习','Review'],['favorites','bookmark','我的收藏','Saved words'],['progress','chart','学习记录','Progress']];
function navButton(n) { return `<button class="nav-btn ${state.page===n[0]?'active':''}" data-nav="${n[0]}" title="${t(n[2],n[3])}" aria-label="${t(n[2],n[3])}" ${state.page===n[0]?'aria-current="page"':''}>${icon(n[1])}<span>${t(n[2],n[3])}</span>${n[0]==='review'&&due().length?`<span class="count">${due().length}</span>`:''}</button>`; }
function sidebar() {
  return `<aside class="sidebar"><a class="brand" href="#" data-nav="home" aria-label="Klar home"><span class="brand-mark"><i></i><i></i><i></i><i></i></span><span>Klar<span class="brand-dot">.</span></span></a><div class="brand-sub">DEUTSCH. FÜRS LEBEN.</div><nav aria-label="${t('主导航','Main navigation')}"><div class="nav-group">${navs.slice(0,6).map(navButton).join('')}</div><div class="nav-group personal-nav">${navs.slice(6).map(navButton).join('')}</div></nav><div class="sidebar-bottom"><div class="daily-mini"><div class="row between"><span>${t('今日的小进步','A little progress today')}</span><strong>${todayCount()}<span class="muted"> / ${state.goal}</span></strong></div><div class="track"><span style="width:${Math.min(100,todayCount()/state.goal*100)}%"></span></div></div><button class="profile" data-action="settings" aria-label="${t('编辑个人资料','Edit profile')}">${avatarMarkup()}<span class="profile-copy"><strong>${esc(displayName())}</strong><small>${t('个人资料与偏好','Profile & preferences')}</small></span>${icon('chevron')}</button></div></aside>`;
}
function updateSidebar() { $('.sidebar').outerHTML=sidebar(); }
function levels(selected=state.level,attribute='data-settings-level') { return `<div class="levels" role="group" aria-label="${t('学习级别','Learning level')}">${Object.keys(LEVELS).map(l=>`<button type="button" ${attribute}="${l}" class="${selected===l?'active':''}" aria-pressed="${selected===l}">${l}</button>`).join('')}</div>`; }
function render(animate=true) {
  document.documentElement.lang=state.lang==='en'?'en':'zh-CN';
  const n=navs.find(n=>n[0]===state.page)||navs[0];
  $('#app').innerHTML=`${sidebar()}<div class="shell"><header class="topbar"><div class="breadcrumb">${t(n[2],n[3])}<span>A1 — B2</span></div><div class="top-tools"><button class="search-btn" data-action="search" aria-label="${t('搜索单词','Search words')}">${icon('search')}<span>${t('搜索','Search')}</span><kbd>⌘ / Ctrl K</kbd></button><div class="lang-switch" aria-label="${t('注释语言','Annotation language')}"><button data-lang="zh" class="${state.lang==='zh'?'selected':''}" aria-pressed="${state.lang==='zh'}">中文</button><button data-lang="en" class="${state.lang==='en'?'selected':''}" aria-pressed="${state.lang==='en'}">EN</button></div><button class="top-profile" data-action="settings" aria-label="${t('个人资料与设置','Profile and settings')}">${avatarMarkup()}</button></div></header><main class="main" id="main-content">${pageContent()}<footer class="footer"><span>Klar · ${t('为考试，也为生活。','For your exam. For your life.')}</span><button data-action="about">${t('课程说明与来源','About & sources')} ↗</button></footer></main></div>`;
  if(['learn','review'].includes(state.page))renderCard();
  if(state.page==='exam')renderQuiz();
  // Animate non-containing descendants: a transformed ancestor would trap the fixed video.
  if(animate) document.querySelectorAll('.page-heading,.module-card,.library-grid>.card,.overview').forEach(el=>entrance(el));
}
function pageContent() { return ({learn:learning,review:learning,library,grammar:grammarPage,exam:examPage,resources:resourcesPage,favorites:favoritePage,progress:progressPage}[state.page]||learning)(); }
function heading(title,subtitle,controls='') { return `<section class="page-heading" data-content-module="heading"><div class="eyebrow">DEIN WEG. DEIN TEMPO.</div><h1>${title}</h1><p>${subtitle}</p>${controls?`<div class="page-controls">${controls}</div>`:''}</section>`; }
function learning() {
  const u=unit(),review=state.page==='review';
  const greeting=state.profile.name?t(`${esc(displayName())}，今天也进步一点。`,`${esc(displayName())}, one small step today.`):t('少一点负担，多记住一点。','A little less. Remember a little more.');
  return `${heading(review?t('让记住的，留得更久。','Make what you learn stay with you.'):greeting,review?t(`${cards().length} 张到期卡片，按你的节奏复习。`,`${cards().length} due cards. Review at your own pace.`):t('专注一个词，再把它用进生活。','One word in focus. Then put it into your life.'),`<span class="pill">${state.level}</span><label class="unit-picker"><span>${t('当前单元','Current unit')}</span><select id="unit-select" aria-label="${t('选择单元','Choose a unit')}">${UNITS.filter(x=>x.level===state.level).map(x=>`<option value="${x.id}" ${x.id===state.unit?'selected':''}>${tr(x.title)}</option>`).join('')}</select></label>`)}<div class="workspace"><section id="card-region" data-content-module="word"></section><aside class="study-companion"><div id="video-region" data-content-module="video">${videoPanel(u)}</div><button class="card grammar-entry module-card" data-action="grammar" data-content-module="grammar"><span class="square-icon">${icon('book')}</span><span><span class="eyebrow">${t('想多懂一点？','A LITTLE DEEPER')}</span><strong>${tr(GRAMMAR[u.level].title)}</strong><small>${t('语法 · 例句 · 应用练习','Grammar · Examples · Practice')}</small></span>${icon('arrow')}</button></aside></div>`;
}
function renderCard() {
  const region=$('#card-region');if(!region)return;
  const c=current();
  if(!c||state.completed){region.innerHTML=`<article class="card completion"><span class="completion-icon">${icon('check')}</span><div class="eyebrow">GUT GEMACHT.</div><h2>${t(state.completed?'这一小步，完成了。':'暂时没有到期单词。',state.completed?'A small step, well done.':'You’re all caught up.')}</h2><p>${t(state.completed?'下一次复习已经安排好。现在，休息一下也很好。':'学一个新单元，或者留点时间让知识沉淀。',state.completed?'Your next review is scheduled. A little rest is a good idea too.':'Explore another unit, or give your learning a little room to settle.')}</p><button class="primary" data-nav="library">${t('看看其他单元','Explore another unit')}${icon('arrow')}</button></article>`;return;}
  const w=c.w,hasArticle=/^(der|die|das) /.test(w[0]);
  const term=hasArticle?`<span class="word-article">${esc(w[0].split(' ')[0])}</span> ${esc(w[0].slice(4))}`:esc(w[0]);
  region.innerHTML=`<article class="card flashcard" data-card-id="${c.id}" aria-label="${t('单词学习卡','Word study card')}"><header class="card-meta"><div class="row"><span class="pill">${c.u.level}</span><span>${tr(c.u.title)}</span></div><div class="row"><span class="card-counter">${String(state.index+1).padStart(2,'0')} <span>/ ${String(cards().length).padStart(2,'0')}</span></span><button class="icon-btn ${state.favorites.includes(c.id)?'active':''}" data-action="save" aria-label="${t('收藏单词','Save word')}" aria-pressed="${state.favorites.includes(c.id)}">${icon('bookmark')}</button></div></header><div class="word-area"><h2 lang="de" class="${w[0].length>19?'long':''}">${term}</h2><div class="word-meaning">${state.revealed?esc(w[state.lang==='en'?2:1]):`<button class="reveal-btn" data-action="reveal">${t('回想一下，点击揭晓','Recall first. Tap to reveal')}${icon('refresh')}</button>`}</div><div class="word-detail">${state.revealed?esc(morphology(w[3])):'Deutsch im Alltag'}</div><button class="pronounce" data-speak="${esc(w[0])}" aria-label="${t('朗读单词','Hear this word')}">${icon('volume')}</button></div><div class="examples"><div class="label">${t('用在生活里','IN EVERYDAY LIFE')}</div>${examplesOf(w).map((example,n)=>`<div class="example"><span class="example-num">0${n+1}</span><div><p lang="de">${esc(example.de)}</p><p class="translation ${state.revealed?'':'unrevealed'}">${state.revealed?esc(example[state.lang]):' '}</p></div><button class="icon-btn" data-speak="${esc(example.de)}" aria-label="${t('朗读例句','Hear the example')}">${icon('volume')}</button></div>`).join('')}</div></article><div class="ratings" aria-label="${t('评价记忆程度','Rate your recall')}">${[['again','refresh','再学一次','Again','1 min'],['good','check','有点印象','Good','1 day'],['easy','check','记住了','Easy','3+ days']].map(r=>`<button class="rating ${r[0]}" data-rate="${r[0]}" ${!state.revealed?'disabled':''}>${icon(r[1])}<span>${t(r[2],r[3])}<small>${r[4]}</small></span></button>`).join('')}</div><div class="keyboard-hint"><span><kbd>Space</kbd> ${t('揭晓','reveal')}</span><span><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> ${t('评价','rate')}</span></div>`;
}
function videoPanel(u) {
  return `<section class="card video-panel"><header class="video-label row between"><h2>${t('看看真实场景','See it in real life')}</h2><button class="float-control" data-action="float-video" aria-pressed="false" aria-label="${t('悬浮观看视频','Float video')}">${icon('arrow')}<span>${t('悬浮','Float')}</span></button></header><div id="player"><button class="video-thumb" data-action="play" data-video="${u.video}" aria-label="${t('播放配套视频','Play companion video')}"><span class="coffee-fallback">${icon(u.icon)}</span><img src="https://i.ytimg.com/vi/${u.video}/hqdefault.jpg" alt="" onerror="this.hidden=true"><span class="play-circle">${icon('play')}</span><span class="thumbnail-label" lang="de">${u.de}</span></button></div><h3 class="video-title">${tr(u.title)}</h3><p class="video-info">Easy German · ${t('主题拓展','Topic enrichment')}</p><details class="video-context"><summary>${t('带着一个小任务观看','A small purpose for watching')}</summary><p>${tr(u.goal)}</p><small>${esc(u.videoTitle)} · ${t('非官方分级视频','Not officially CEFR-graded')}</small></details><div class="video-link"><span>${t('需联网','Internet required')}</span><a href="https://www.youtube.com/watch?v=${u.video}" target="_blank" rel="noopener noreferrer">${t('打开视频来源','Open video source')} ↗</a></div></section>`;
}
function resourcesPage() {
  if(!OFFICIAL_MATERIALS[selectedMaterial])selectedMaterial=state.level;
  const material=OFFICIAL_MATERIALS[selectedMaterial];
  const kind=material.kind==='wordlist'?t('官方词汇表','Official word list'):t('官方成人模考','Official adult model exam');
  return `${heading(t('官方资料，站内直接看。','Official materials, ready to read here.'),t('A1–B2 免费参考资料已整理为一个清晰入口，无需离开学习页面。','Free A1–B2 references in one focused place, without leaving your study flow.'))}<section class="materials-grid" data-content-module="materials" aria-label="${t('选择官方资料','Choose official material')}">${Object.entries(OFFICIAL_MATERIALS).map(([level,item])=>`<button class="card material-card ${selectedMaterial===level?'selected':''}" data-material="${level}" aria-pressed="${selectedMaterial===level}"><span class="material-level">${level}</span><span><strong>${esc(tr(item.title))}</strong><small>${esc(tr(item.description))}</small></span>${icon('chevron')}</button>`).join('')}</section><section class="card material-preview module-card" data-content-module="preview"><header><div><span class="label">GOETHE-INSTITUT · ${selectedMaterial}</span><h2>${esc(tr(material.title))}</h2><p>${kind} · ${material.pages} ${t('页','pages')}</p></div><div class="material-actions"><a class="secondary" href="${material.file}" target="_blank" rel="noopener">${t('单独打开 PDF','Open PDF')} ↗</a><a class="text-btn" href="${material.official}" target="_blank" rel="noopener noreferrer">${t('官网来源','Official source')} ↗</a></div></header><iframe class="material-frame" src="${material.file}#toolbar=1&navpanes=0&view=FitH" title="${esc(tr(material.title))}"></iframe><p class="privacy-note">${t('PDF 在本站内预览；版权归歌德学院所有。本课程讲解与例句由 Klar 独立编写。','The PDF is previewed inside Klar; copyright remains with Goethe-Institut. Klar’s lessons and examples are independently authored.')}</p></section>`;
}
function library() {
  return `${heading(t('找到你的下一小步。','Find your next small step.'),t(`${state.level} · ${UNITS.filter(u=>u.level===state.level).length} 个生活单元 · 设置中切换级别`,`${state.level} · ${UNITS.filter(u=>u.level===state.level).length} everyday units · Change level in Settings`))}<div class="library-grid">${UNITS.filter(u=>u.level===state.level).map((u,i)=>{const n=u.words.filter((_,i)=>state.records[`${u.id}:${i}`]).length;return `<article class="card unit-card" data-content-module="unit"><div class="row between"><span class="square-icon">${icon(u.icon)}</span><span class="label">UNIT ${String(i+1).padStart(2,'0')}</span></div>${sourceNote(u.level)}<h2>${tr(u.title)}</h2><p class="unit-de" lang="de">${u.de}</p><p>${tr(u.goal)}</p><div class="track"><span style="width:${n/u.words.length*100}%"></span></div><div class="row between"><span class="small muted">${n} / ${u.words.length} ${t('词已学习','words studied')}</span><button class="text-btn" data-grammar="${u.level}">${t('语法入口','Grammar')} ↗</button></div><button class="primary" data-unit="${u.id}">${t('开始这个单元','Start this unit')}${icon('arrow')}</button></article>`;}).join('')}</div>`;
}
function grammarPage() { const g=GRAMMAR[state.level];return `${heading(t('懂一点规律，多一份自在。','Understand a pattern. Find your voice.'),t(`${state.level} · 需要的时候，再深入一步。`,`${state.level} · Go a little deeper, whenever you need it.`))}<section class="card unit-card module-card" data-content-module="grammar"><span class="pill">${state.level} · GRAMMATIK</span><h2>${tr(g.title)}</h2><p>${tr(g.rule)}</p><div class="pattern" lang="de">${esc(g.pattern)}</div><button class="primary" data-action="grammar">${t('打开讲解与练习','Explore the lesson')}${icon('arrow')}</button></section>`; }
function wordRows(list) { return list.map(c=>`<button class="word-row" data-card="${c.id}"><span><strong lang="de">${esc(c.w[0])}</strong><small>${esc(c.w[state.lang==='en'?2:1])} · ${tr(c.u.title)}</small></span><span class="pill">${c.u.level}</span>${icon('chevron')}</button>`).join(''); }
function favoritePage() { const list=allCards.filter(c=>state.favorites.includes(c.id));return `${heading(t('留住想记住的词。','Keep the words that matter.'),t('你的私人单词收藏夹。','Your own little word collection.'))}<section class="card word-list module-card" data-content-module="favorites">${list.length?wordRows(list):`<div class="empty">${icon('bookmark')}<h2>${t('从喜欢的第一个词开始。','Start with a word you love.')}</h2><p>${t('点击单词卡上的书签，就能在这里找到它。','Tap the bookmark on a card to keep it here.')}</p><button class="primary" data-nav="learn">${t('去发现新单词','Discover new words')}</button></div>`}</section>`; }
function progressPage() {
  return `${heading(t('每一小步，都算数。','Every small step counts.'),t('只记录真实的进步，不必与任何人比较。','Your real progress. No need to compare.'))}<section class="card overview" data-content-module="overview"><div><span>${t('已学习单词','Words studied')}</span><strong>${allCards.filter(c=>state.records[c.id]).length}<small> / ${allCards.length}</small></strong></div><div><span>${t('今日学习','Studied today')}</span><strong>${todayCount()}<small> / ${state.goal}</small></strong></div><div><span>${t('待复习','Due for review')}</span><strong>${due().length}</strong></div></section><section class="card progress-levels module-card" data-content-module="levels"><h2>${t('你的学习足迹','Your learning journey')}</h2>${Object.keys(LEVELS).map(l=>{const a=allCards.filter(c=>c.u.level===l),n=a.filter(c=>state.records[c.id]).length;return `<div class="level-progress"><div class="row between"><div class="row"><span class="pill">${l}</span><span>${tr(LEVELS[l])}</span></div><span class="small muted">${n} / ${a.length}</span></div><div class="track"><span style="width:${n/a.length*100}%"></span></div></div>`;}).join('')}</section><div class="export-row" data-content-module="backup"><p>${t('学习记录仅保存在此浏览器。','Your progress lives in this browser.')}</p><button class="secondary" data-action="export">${t('导出记录','Export records')}${icon('arrow')}</button></div>`;
}
function examPage() {
  return `${heading(t('有方向地准备，从容一点。','A little preparation. A little confidence.'),t(`${state.level} · 语言微练习，为真实考试打基础。`,`${state.level} · Small language exercises to build your exam foundation.`))}<section class="card exam-intro module-card" data-content-module="official"><div><span class="label">GOETHE-ZERTIFIKAT ${state.level}</span><h2>${t('先练基础，再熟悉官方题型。','Build the basics. Explore the real format.')}</h2><p>${t('本站原创练习不替代完整模拟考试。','Original practice, not a full official mock exam.')}</p></div><button class="secondary" data-material="${state.level}">${t('站内预览官方资料','Preview official material')} ↗</button></section><section class="card skills-section module-card" data-content-module="skills"><h2>${t('今天，想练哪一项？','What would you like to practice?')}</h2><div class="skills-grid">${[['headphones','Hören','听力','Listening','listen'],['book','Lesen','阅读','Reading','read'],['pen','Schreiben','写作','Writing','write'],['message','Sprechen','口语','Speaking','speak']].map(s=>`<button class="skill-card" data-skill="${s[4]}">${icon(s[0])}<strong>${s[1]}</strong><small>${t(s[2],s[3])}</small>${icon('arrow')}</button>`).join('')}</div></section><section id="quiz-region" data-content-module="quiz"></section>`;
}
let quizIndex=0,quizScore=0,quizAnswered=false,quizOrder=[],quizFinished=false,quizSelection=null;
function resetQuiz() { quizIndex=0;quizScore=0;quizAnswered=false;quizFinished=false;quizSelection=null;quizOrder=allCards.filter(c=>c.u.level===state.level).slice(0,4); }
function renderQuiz() {
  if(!quizOrder.length)resetQuiz();const el=$('#quiz-region');if(!el)return;
  if(quizFinished){el.innerHTML=`<section class="card completion"><span class="completion-icon">${icon('check')}</span><h2>${t('本轮词义检查完成','Vocabulary check complete')}</h2><p>${quizScore} / ${quizOrder.length} ${t('答对 · 不代表考试成绩','correct · Not an exam score')}</p><button class="primary" data-action="restart-quiz">${t('再练一轮','Try again')}</button></section>`;return;}
  const c=quizOrder[quizIndex],opts=allCards.filter(x=>x.u.level===state.level&&x.id!==c.id).slice(0,3);opts.splice(quizIndex%4,0,c);
  el.innerHTML=`<section class="card quiz"><div class="row between"><span class="label">${t('词义小检查','VOCABULARY CHECK')}</span><span class="small muted">${quizIndex+1} / ${quizOrder.length}</span></div><h2 lang="de">${esc(c.w[0])}</h2><div class="quiz-options">${opts.map(x=>`<button data-answer="${x.id}" ${quizAnswered?'disabled':''} class="${quizAnswered?(x.id===c.id?'correct':x.id===quizSelection?'wrong':''):''}">${esc(x.w[state.lang==='en'?2:1])}</button>`).join('')}</div><div class="quiz-feedback" role="status">${quizAnswered?(quizSelection===c.id?t('回答正确，继续保持。','Correct. Keep going.'):t('绿色选项是正确答案，再记一次。','Review the green answer and give it another try.')):''}</div><button class="primary" data-action="quiz-next" ${!quizAnswered?'disabled':''}>${t('下一题','Next question')}${icon('arrow')}</button></section>`;
}
function modal(title,html) {
  const d=$('#detail');dialogVersion++;dialogClosing=false;d.getAnimations().forEach(a=>a.cancel());
  d.innerHTML=`<div class="dialog-top"><h2 id="dialog-title">${title}</h2><button class="icon-btn" data-action="close" aria-label="${t('关闭','Close')}">${icon('close')}</button></div><div class="dialog-content">${html}</div>`;
  d.setAttribute('aria-labelledby','dialog-title');if(!d.open)d.showModal();
  entrance(d);
}
async function closeModal() {
  const d=$('#detail');if(!d.open||dialogClosing)return;
  const version=dialogVersion;dialogClosing=true;
  await motion(d,[{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(12px) scale(.985)'}],150);
  if(version!==dialogVersion)return;
  d.close();dialogClosing=false;avatarRequest++;profileDraft=null;profileLevelDraft=state.level;avatarBusy=false;
}
function grammar(l=unit().level){const g=GRAMMAR[l];modal(`${l} · ${tr(g.title)}`,`<h3>${t('核心规律','The core rule')}</h3><p>${tr(g.rule)}</p><div class="pattern" lang="de">${esc(g.pattern)}</div><h3>${t('拆开看，就不难','See it in context')}</h3>${g.examples.map(e=>`<div class="grammar-example"><p lang="de">${esc(e[0])}<button class="icon-btn" data-speak="${esc(e[0])}" aria-label="${t('朗读例句','Read example')}">${icon('volume')}</button></p><p>${esc(e[state.lang==='en'?2:1])}</p></div>`).join('')}<p class="notice">${t('常见误区：','Common pitfall: ')}${tr(g.pitfall)}</p><h3>${t('放进生活里试一试','Try it in real life')}</h3><p>${tr(g.task)}</p><textarea data-draft="grammar-${l}" aria-label="${t('填写练习答案','Your practice answer')}" placeholder="Schreib auf Deutsch …">${esc(state.drafts['grammar-'+l]||'')}</textarea><span class="small muted">${t('自动保存在此浏览器 · 自主练习，不自动评分','Autosaved in this browser · Self-practice, not automatically graded')}</span><details><summary>${t('完成后查看参考表达','View a possible answer')}</summary><p lang="de">${esc(g.answer)}</p></details>`);}
function skillModal(kind){const g=GRAMMAR[state.level],c=allCards.find(x=>x.u.level===state.level);if(kind==='write'||kind==='speak'){modal(`${state.level} · ${kind==='write'?'Schreiben':'Sprechen'}`,`<h3>${t('情景任务','Your task')}</h3><p>${tr(g.task)}</p><p class="notice">${t('原创微练习，非官方考试题。请先独立完成，再对照参考表达。','Original micro-exercise, not an official exam task. Try it independently before checking the example.')}</p>${kind==='write'?`<textarea data-draft="exam-${state.level}" aria-label="${t('写作练习','Writing exercise')}" placeholder="Schreib auf Deutsch …">${esc(state.drafts['exam-'+state.level]||'')}</textarea><p>${t('自动保存 · 本版不提供自动作文评分。','Autosaved · Automated essay scoring is not included.')}</p>`:`<p>${t('先大声说出答案。检查：是否完成任务？动词位置正确吗？表达是否礼貌清楚？本站不录音，不自动评判发音。','Say your response aloud. Check: task complete, correct verb position, clear and polite phrasing? Klar does not record or score pronunciation.')}</p>`}<details><summary>${t('查看参考表达','See an example response')}</summary><p lang="de">${esc(g.answer)}</p><button class="text-btn" data-speak="${esc(g.answer)}">${icon('volume')}${t('听参考表达','Hear the example')}</button></details>`);}else{modal(`${state.level} · ${kind==='listen'?'Hören':'Lesen'}`,`<h3>${t('理解一句真实场景表达','Understand a real-life sentence')}</h3>${kind==='listen'?`<button class="primary" data-speak="${esc(c.w[4])}">${icon('volume')}${t('播放课程音频','Play course audio')}</button><p style="margin-top:15px">${t('听一遍，试着复述，并解释说话人的意图。','Listen, repeat, and explain the speaker’s intention.')}</p>`:`<div class="pattern" lang="de">${esc(c.w[4])}</div><p>${t('说话人表达了什么？请先用自己的话概括。','What is the speaker expressing? Summarize it in your own words first.')}</p>`}<details><summary>${t('查看原句与释义','Show sentence and meaning')}</summary><p lang="de">${esc(c.w[4])}</p><p>${esc(c.w[state.lang==='en'?6:5])}</p></details><p class="notice">${t('这是自主理解练习，不自动计分。完整题型请参考歌德官方资料。','This is unscored self-practice. Refer to official Goethe materials for complete exam tasks.')}</p>`);}}
function speak(){toast(t('课程音频尚未载入，请刷新页面。','Course audio is not loaded yet. Refresh the page.'));}

function setUnit(id,index=0) {
  const u=UNITS.find(u=>u.id===id);if(!u)return;
  invalidateMotion();state.unit=id;state.level=u.level;state.page='learn';state.index=index;state.revealed=false;state.queue=null;state.completed=false;persist();render();
}
function navigate(page) {
  if(!navs.some(n=>n[0]===page))return;
  invalidateMotion();state.page=page;state.index=0;state.revealed=false;state.completed=false;state.queue=page==='review'?[...due()]:null;
  if(state.queue?.length){state.unit=state.queue[0].u.id;state.level=state.queue[0].u.level;}
  if(page==='exam')resetQuiz();render();window.scrollTo(0,0);
}
function changeLevel(level) {
  if(!Object.hasOwn(LEVELS,level)||level===state.level)return;
  invalidateMotion();state.level=level;state.unit=UNITS.find(u=>u.level===level).id;state.index=0;state.revealed=false;state.completed=false;state.queue=null;
  if(state.page==='review')state.page='learn';resetQuiz();persist();render();
}
async function revealCard() {
  if(cardBusy||!current()||state.completed)return;
  cardBusy=true;const token=epoch,el=$('.word-area');
  await motion(el,[{opacity:1,transform:'perspective(800px) rotateY(0deg)'},{opacity:0,transform:'perspective(800px) rotateY(-14deg)'}],110);
  if(token!==epoch)return;
  state.revealed=!state.revealed;renderCard();
  await motion($('.word-area'),[{opacity:0,transform:'perspective(800px) rotateY(14deg)'},{opacity:1,transform:'perspective(800px) rotateY(0deg)'}],210);
  if(token===epoch)cardBusy=false;
}
async function rate(rating) {
  if(cardBusy||!state.revealed||!current()||state.completed||!['again','good','easy'].includes(rating))return;
  cardBusy=true;const token=epoch,c=current();
  $('#card-region').setAttribute('aria-busy','true');
  document.querySelectorAll('[data-rate]').forEach(b=>b.disabled=true);
  await motion($('.flashcard'),[{opacity:1,transform:'translateX(0) rotate(0deg)'},{opacity:0,transform:'translateX(-30px) rotate(-1deg)'}],170);
  if(token!==epoch)return;
  const old=state.records[c.id]||{},previous=Number(old.interval)||0;
  const interval=rating==='again'?60000:rating==='good'?86400000:Math.min(30*86400000,Math.max(3*86400000,previous*2));
  state.records[c.id]={due:Date.now()+interval,interval,rating,reviews:(Number(old.reviews)||0)+1,lastReviewed:Date.now()};
  const day=Array.isArray(state.days[dateKey()])?state.days[dateKey()]:[];
  state.days[dateKey()]=[...new Set([...day,c.id])];state.index++;state.revealed=false;state.completed=state.index>=cards().length;
  spellingResult=null;spellingValue='';
  const next=current();if(next&&state.queue&&next.u.id!==state.unit){state.unit=next.u.id;state.level=next.u.level;persist();render(false);}else{persist();renderCard();updateSidebar();}
  $('#card-region').removeAttribute('aria-busy');
  await motion($('#card-region'),[{opacity:0,transform:'translateX(24px)'},{opacity:1,transform:'translateX(0)'}],230);
  if(token===epoch)cardBusy=false;
}
function toggleSaved(button) {
  if(cardBusy||!current())return;const id=current().id,exists=state.favorites.includes(id);
  state.favorites=exists?state.favorites.filter(x=>x!==id):[...state.favorites,id];persist();
  button.classList.toggle('active',!exists);button.setAttribute('aria-pressed',String(!exists));
  motion(button,[{transform:'scale(1)'},{transform:'scale(1.18)'},{transform:'scale(1)'}],240);
  toast(exists?t('已移出收藏','Removed from saved words'):t('已收藏这个词','Word saved'));
}
function floatVideo(button) {
  const panel=button.closest('.video-panel'),before=panel.getBoundingClientRect();
  panel.getAnimations().forEach(a=>a.cancel());
  const floating=panel.classList.toggle('floating');button.setAttribute('aria-pressed',String(floating));
  button.innerHTML=icon('arrow')+`<span>${floating?t('收起','Dock'):t('悬浮','Float')}</span>`;
  button.setAttribute('aria-label',floating?t('收起悬浮视频','Dock video'):t('悬浮观看视频','Float video'));
  const after=panel.getBoundingClientRect();
  motion(panel,[{transformOrigin:'top left',transform:`translate(${before.left-after.left}px,${before.top-after.top}px) scale(${before.width/after.width},${before.height/after.height})`},{transformOrigin:'top left',transform:'translate(0,0) scale(1,1)'}],340);
}
function search() {
  modal(t('找到你的下一个词','Find your next word'),`<input id="search-input" class="search-input" placeholder="${t('搜索单词、释义或生活场景…','Search a word, meaning or everyday topic…')}" aria-label="${t('搜索全部单词','Search all words')}"><p class="search-caption">A1–B2 · ${allCards.length} ${t('张双语卡片','bilingual cards')}</p><div id="search-results" class="word-list">${wordRows(allCards.slice(0,5))}</div>`);$('#search-input').focus();
}
function about() {
  modal(t('关于 Klar','About Klar'),`<h3>${t('为考试，也为生活。','For your exam. For your life.')}</h3><p>${t(`本站包含 A1–B2 的 ${UNITS.length} 个原创学习单元、${allCards.length} 张单词卡与 ${allCards.reduce((sum,c)=>sum+examplesOf(c.w).length,0)} 组原创词卡例句。它是依据官方参考范围编排的精选学习内容，不是歌德学院官方完整课程或完整词库。`,`Klar contains ${UNITS.length} original learning units, ${allCards.length} word cards and ${allCards.reduce((sum,c)=>sum+examplesOf(c.w).length,0)} original card examples across A1–B2. It is a curated learning set calibrated to official references, not a complete official Goethe course or vocabulary list.`)}</p><h3>${t('级别依据','Level references')}</h3><p class="source-list">${Object.keys(COURSE_SOURCES).map(level=>`<button data-material="${level}"><strong>${level}</strong> · ${esc(tr(COURSE_SOURCES[level].label))} ↗</button>`).join('')}</p><p>${t('A1 还依据你提供的《Goethe-Zertifikat A1 Start Deutsch 1 Wortliste》PDF 校准。A1–B1 使用官方词表；B2 使用官方四模块成人模考材料。所有资料都可在“官方资料”页直接预览。','A1 was also calibrated against your supplied Goethe-Zertifikat A1 Start Deutsch 1 Wortliste PDF. A1–B1 use official word lists; B2 uses the official four-module adult model exam. Every reference can be previewed in Official materials.')}</p><h3>${t('资料、视频与语音','Resources, video & speech')}</h3><p>${t('词条范围参考上述资料，释义、课程讲解和三语例句由 Klar 重新编写。视频来自 Easy German / Easy Languages，属于主题拓展；579 条固定德语音频覆盖课程朗读，正常与慢速分别以 1× 和精确 0.8× 播放。','Vocabulary scope follows these references; definitions, lessons and trilingual examples are newly written for Klar. Videos from Easy German / Easy Languages provide topic enrichment. 579 fixed German clips cover course audio, played at exact 1× and 0.8× rates.')}</p><h3>${t('你的数据','Your data')}</h3><p>${t('每日安排按设备本地时间 00:00 换日，长期进度不会被删除。个人资料、学习记录和草稿只保存在当前浏览器；本站不接入 AI，也不采集麦克风录音。','The daily plan rolls over at 00:00 device time without deleting long-term progress. Profile, progress and drafts stay in this browser; Klar does not use AI or collect microphone recordings.')}</p>`);
}
function settings() {
  profileDraft={...state.profile};profileLevelDraft=state.level;avatarBusy=false;avatarRequest++;
  modal(t('这是你的学习空间。','Make this space yours.'),`<form id="profile-form"><section class="profile-editor"><div id="avatar-preview">${avatarMarkup(profileDraft)}</div><div><label class="secondary upload-label" for="avatar-file">${icon('pen')}${t('上传头像','Upload photo')}</label><input id="avatar-file" type="file" accept="image/png,image/jpeg,image/webp" hidden><button type="button" class="text-btn" data-action="remove-avatar">${t('恢复字母头像','Use initials')}</button><p>${t('JPG / PNG / WebP · 最大 5 MB','JPG / PNG / WebP · Up to 5 MB')}</p></div></section><div id="avatar-feedback" role="status" aria-live="polite"></div><fieldset class="avatar-colors"><legend>${t('头像底色','Avatar color')}</legend>${THEMES.map((color,i)=>`<button type="button" class="color-swatch avatar-${color}" data-theme="${color}" aria-pressed="${profileDraft.theme===color}" aria-label="${t(['鼠尾草绿','暖沙色','雾蓝色','浅玫瑰色'][i],['Sage','Sand','Sky','Rose'][i])}">${profileDraft.theme===color?icon('check'):''}</button>`).join('')}</fieldset><label class="field-label" for="profile-name">${t('你的昵称','Your name')}<span>${t('最多 24 个字符','Up to 24 characters')}</span></label><input id="profile-name" class="text-input" maxlength="24" autocomplete="nickname" value="${esc(profileDraft.name)}" placeholder="${t('希望怎么称呼你？','What should we call you?')}"><section class="settings-level"><div><strong>${t('当前学习级别','Current learning level')}</strong><small>${t('A1–B2 只在这里切换；保存后回到新级别计划。','Switch A1–B2 only here; saving opens the new level plan.')}</small></div>${levels(profileLevelDraft)}</section><div class="settings-row"><label for="goal-select">${t('每天想学几个词？','Your daily word goal')}</label><select id="goal-select">${[4,8,12,20].map(n=>`<option value="${n}" ${state.goal===n?'selected':''}>${n} ${t('词','words')}</option>`).join('')}</select></div><p class="privacy-note">${t('头像在本机压缩，不上传。昵称留空则使用默认称呼。','Your photo is resized locally, never uploaded. Leave the name blank for the default.')}</p><div class="dialog-actions"><button type="button" class="secondary" data-action="close">${t('取消','Cancel')}</button><button type="submit" class="primary" id="save-profile">${t('保存更改','Save changes')}${icon('check')}</button></div></form>`);
}
function previewAvatar() { if(!profileDraft||!$('#avatar-preview'))return;$('#avatar-preview').innerHTML=avatarMarkup(profileDraft); }
async function uploadAvatar(file) {
  if(!file||!profileDraft)return;
  const request=++avatarRequest,version=dialogVersion,feedback=$('#avatar-feedback');
  // A new selection supersedes an in-flight image decode, including invalid selections.
  avatarBusy=false;$('#save-profile').disabled=false;
  const fail=message=>{if(request===avatarRequest&&feedback.isConnected){feedback.textContent=message;feedback.className='field-error';}};
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){fail(t('请选择 JPG、PNG 或 WebP 图片。','Choose a JPG, PNG or WebP image.'));return;}
  if(file.size>5*1024*1024){fail(t('图片超过 5 MB，请选择更小的图片。','This image exceeds 5 MB. Choose a smaller file.'));return;}
  avatarBusy=true;$('#save-profile').disabled=true;feedback.className='';feedback.textContent=t('正在本机处理头像…','Preparing your photo locally…');
  let bitmap;
  try {
    bitmap=await createImageBitmap(file);
    if(bitmap.width<1||bitmap.height<1||bitmap.width>16000||bitmap.height>16000)throw new Error('Invalid dimensions');
    const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#edf1e8';ctx.fillRect(0,0,256,256);
    const side=Math.min(bitmap.width,bitmap.height);ctx.drawImage(bitmap,(bitmap.width-side)/2,(bitmap.height-side)/2,side,side,0,0,256,256);
    if(request!==avatarRequest||version!==dialogVersion||!profileDraft)return;
    profileDraft.avatar=canvas.toDataURL('image/jpeg',.85);previewAvatar();feedback.textContent=t('头像已就绪，保存后生效。','Photo ready. Save to apply.');
  } catch { fail(t('无法读取这张图片，请换一张试试。','This image could not be read. Try another one.')); }
  finally {bitmap?.close();if(request===avatarRequest){avatarBusy=false;if($('#save-profile'))$('#save-profile').disabled=false;}}
}
async function saveProfile(event) {
  event.preventDefault();if(!profileDraft||avatarBusy||dialogClosing)return;
  const oldProfile=state.profile,oldGoal=state.goal,oldLevel=state.level,oldUnit=state.unit,oldPage=state.page,oldLastStudyUnit=state.lastStudyUnit;
  state.profile={...profileDraft,name:$('#profile-name').value.trim().slice(0,24)};state.goal=Number($('#goal-select').value);
  const levelChanged=Object.hasOwn(LEVELS,profileLevelDraft)&&profileLevelDraft!==state.level;
  if(levelChanged){if(typeof rememberSession==='function')rememberSession();const target=UNITS.find(u=>u.level===profileLevelDraft);state.level=profileLevelDraft;state.unit=target.id;state.lastStudyUnit=target.id;state.page='home';state.index=0;state.revealed=false;state.completed=false;state.queue=null;state.lessonView='cards';resetQuiz();}
  if(!persist()){state.profile=oldProfile;state.goal=oldGoal;state.level=oldLevel;state.unit=oldUnit;state.page=oldPage;state.lastStudyUnit=oldLastStudyUnit;return;}
  await closeModal();
  if(levelChanged||state.page==='home')render(false);else{updateSidebar();$('.top-profile').innerHTML=avatarMarkup();}
  toast(t('已保存。让学习更像你。','Saved. A little more you.'));
}
function exportProgress() {
  const url=URL.createObjectURL(new Blob([JSON.stringify({...snapshot(),exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}));
  const link=document.createElement('a');link.href=url;link.download=`klar-progress-${dateKey()}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
document.addEventListener('click',async event=>{
  const b=event.target.closest('button,a[data-nav]');if(!b||b.disabled)return;const d=b.dataset;
  if(d.nav){event.preventDefault();navigate(d.nav);return;}
  if(d.level){changeLevel(d.level);return;}
  if(d.settingsLevel&&profileDraft){profileLevelDraft=d.settingsLevel;document.querySelectorAll('[data-settings-level]').forEach(el=>{const active=el.dataset.settingsLevel===profileLevelDraft;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});entrance(b);return;}
  if(d.material&&OFFICIAL_MATERIALS[d.material]){selectedMaterial=d.material;if($('#detail').open)await closeModal();if(state.page==='resources')render(false);else navigate('resources');return;}
  if(d.lang){if(d.lang!==state.lang){invalidateMotion();state.lang=d.lang;persist();render(false);}return;}
  if(d.unit){setUnit(d.unit);return;}
  if(d.card){const c=allCards.find(c=>c.id===d.card);if(c){await closeModal();setUnit(c.u.id,c.index);}return;}
  if(d.grammar){grammar(d.grammar);return;}
  if(d.speak){speak(d.speak);return;}
  if(d.rate){rate(d.rate);return;}
  if(d.skill){skillModal(d.skill);return;}
  if(d.theme&&profileDraft){profileDraft.theme=d.theme;document.querySelectorAll('[data-theme]').forEach(el=>{el.setAttribute('aria-pressed',String(el.dataset.theme===d.theme));el.innerHTML=el.dataset.theme===d.theme?icon('check'):'';});previewAvatar();entrance($('#avatar-preview'));return;}
  if(d.answer&&!quizAnswered){quizAnswered=true;quizSelection=d.answer;if(quizSelection===quizOrder[quizIndex].id)quizScore++;renderQuiz();entrance($('.quiz-feedback'));return;}
  switch(d.action){
    case'reveal':revealCard();break;
    case'save':toggleSaved(b);break;
    case'grammar':grammar(state.unit);break;
    case'close':closeModal();break;
    case'search':search();break;
    case'settings':settings();break;
    case'about':about();break;
    case'float-video':floatVideo(b);break;
    case'play':$('#player').innerHTML=`<iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/${d.video}?autoplay=1&rel=0" title="Easy German companion video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;entrance($('#player'));break;
    case'quiz-next':if(quizAnswered){quizIndex++;quizAnswered=false;quizSelection=null;if(quizIndex>=quizOrder.length)quizFinished=true;renderQuiz();entrance($('#quiz-region'));}break;
    case'restart-quiz':resetQuiz();renderQuiz();entrance($('#quiz-region'));break;
    case'export':exportProgress();break;
    case'remove-avatar':if(profileDraft){avatarRequest++;avatarBusy=false;profileDraft.avatar='';$('#save-profile').disabled=false;$('#avatar-file').value='';$('#avatar-feedback').textContent='';previewAvatar();}break;
  }
});
document.addEventListener('submit',event=>{if(event.target.id==='profile-form')saveProfile(event);});
document.addEventListener('change',event=>{if(event.target.id==='unit-select'){if(state.page==='exam'){const u=UNITS.find(u=>u.id===event.target.value);if(u){state.unit=u.id;state.level=u.level;resetQuiz();persist();render(false);}}else setUnit(event.target.value,0,state.lessonView||'cards');}if(event.target.id==='avatar-file')uploadAvatar(event.target.files[0]);});
document.addEventListener('input',event=>{
  const el=event.target;
  if(el.id==='profile-name'&&profileDraft){profileDraft.name=el.value;previewAvatar();}
  if(el.id==='search-input'){const q=el.value.trim().toLocaleLowerCase();const matches=allCards.filter(c=>[...c.w,...c.u.title,c.u.de,c.u.level].join(' ').toLocaleLowerCase().includes(q));$('#search-results').innerHTML=matches.length?wordRows(matches):`<div class="empty"><p>${t('没有找到，换个关键词试试。','No matches. Try another word or topic.')}</p></div>`;}
  if(el.dataset.draft){state.drafts[el.dataset.draft]=el.value;persist();}
});
document.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(!$('#detail').open)search();return;}
  if($('#detail').open||/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(document.activeElement.tagName)||!['learn','review'].includes(state.page))return;
  if(state.lessonView!=='cards')return;
  if(event.code==='Space'&&state.mode==='recall'){event.preventDefault();if(!event.repeat)revealCard();}
  if(['1','2','3'].includes(event.key)&&!event.repeat)rate({1:'again',2:'good',3:'easy'}[event.key]);
});
$('#detail').addEventListener('cancel',event=>{event.preventDefault();closeModal();});
$('#detail').addEventListener('click',event=>{const r=event.currentTarget.getBoundingClientRect();if(event.target===event.currentTarget&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))closeModal();});
document.addEventListener('toggle',event=>{if(event.target.tagName==='DETAILS'&&event.target.open)Array.from(event.target.children).slice(1).forEach(el=>entrance(el));},true);
// Boot after pathway, player and assessment modules are loaded.
