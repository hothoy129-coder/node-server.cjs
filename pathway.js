'use strict';
/* Connected, original learning pathways inspired by public course/lesson patterns.
 * No remote account, algorithm or paid course from the reference is reproduced. */
Object.assign(state, {
  page:'home', lessonView:['reading','cards','speaking'].includes(saved.lessonView)?saved.lessonView:'cards',
  mode:['recall','spell','listen'].includes(saved.mode)?saved.mode:'recall',
  minutes:[10,20,30].includes(saved.minutes)?saved.minutes:20,
  intention:['both','exam','life'].includes(saved.intention)?saved.intention:'both',
  notebook:safeObject(saved.notebook), lessonProgress:safeObject(saved.lessonProgress), sessions:safeObject(saved.sessions),
  readerSize:['normal','large'].includes(saved.readerSize)?saved.readerSize:'normal', showTranslation:saved.showTranslation!==false,
  practiceLog:safeObject(saved.practiceLog),lastStudyUnit:UNITS.some(u=>u.id===saved.lastStudyUnit)?saved.lastStudyUnit:state.unit
});
// Treat restored local data as untrusted, including entries written by older versions.
state.notebook=Object.fromEntries(Object.entries(state.notebook).filter(([id,v])=>sentenceById(id)&&v&&Array.isArray(v.tags)).map(([id,v])=>[id,{tags:[...new Set(v.tags.filter(x=>typeof x==='string').map(x=>x.trim().slice(0,24)).filter(Boolean))].slice(0,5),savedAt:Number(v.savedAt)||0}]).filter(([,v])=>v.tags.length));
let notebookTab='words',tagFilter='',lessonAnswer=null,spellingResult=null,spellingValue='',oralIndex=0;
const previousSnapshot=snapshot,previousRender=render,previousFlashCard=renderCard,previousSetUnit=setUnit,previousNavigate=navigate,previousChangeLevel=changeLevel,previousInvalidate=invalidateMotion;
snapshot=function(){
  return {...previousSnapshot(),version:3,lessonView:state.lessonView,mode:state.mode,minutes:state.minutes,intention:state.intention,notebook:state.notebook,lessonProgress:state.lessonProgress,sessions:state.sessions,readerSize:state.readerSize,showTranslation:state.showTranslation,practiceLog:state.practiceLog,lastStudyUnit:state.lastStudyUnit};
};
navs.unshift(['home','sun','今日计划','Daily plan']);
navs.find(n=>n[0]==='learn').splice(2,2,'学习工作台','Study room');
navs.find(n=>n[0]==='favorites').splice(2,2,'学习收藏','Collections');
function unitLesson(u=unit()){return LESSONS[u.id];}
function rememberSession(){
  // A due-review queue is independent of the learner's place in a course.
  if(state.page!=='learn')return;
  const c=current(),id=c?.u.id||state.unit;
  const index=c?.index??Math.max(0,unit().words.length-1);
  state.sessions[id]={index,view:state.lessonView,at:Date.now()};state.lastStudyUnit=id;
}
invalidateMotion=function(){previousInvalidate();stopStudyAudio();spellingResult=null;spellingValue='';};
setUnit=function(id,index=0,view='cards'){
  if(!UNITS.some(u=>u.id===id))return;
  rememberSession();state.lessonView=['reading','cards','speaking'].includes(view)?view:'cards';lessonAnswer=null;
  previousSetUnit(id,Math.max(0,Math.min(Number.isInteger(Number(index))?Number(index):0,UNITS.find(u=>u.id===id).words.length-1)));rememberSession();persist();
};
navigate=function(page){rememberSession();persist();if(page==='learn'){const id=state.lastStudyUnit,session=safeObject(state.sessions[id]);setUnit(id,session.index||0,session.view||'reading');return;}if(page==='review'){state.lessonView='cards';state.mode='recall';}lessonAnswer=null;previousNavigate(page);};
changeLevel=function(l){if(l!==state.level){rememberSession();lessonAnswer=null;}previousChangeLevel(l);};
render=function(animate=true){previousRender(animate);syncVideoDock();};
pageContent=function(){return ({home:dashboard,learn:studyPage,review:studyPage,library,grammar:grammarPage,exam:examPage,resources:resourcesPage,favorites:collectionsPage,progress:progressPage}[state.page]||dashboard)();};
function intentionLabel(){return t({both:'考试 + 生活',exam:'歌德备考',life:'德国生活'}[state.intention],{both:'Exam + everyday life',exam:'Goethe preparation',life:'Life in Germany'}[state.intention]);}
function planUnit(){
  const scoped=UNITS.filter(u=>u.level===state.level);
  return scoped.find(u=>!state.lessonProgress[u.id]?.reading||u.words.some((_,i)=>!state.records[`${u.id}:${i}`]))||scoped[0];
}
function dashboard(){
  const u=planUnit(),r=UNITS.find(x=>x.id===state.lastStudyUnit)||unit(),known=allCards.filter(c=>state.records[c.id]).length,newCount=allCards.filter(c=>c.u.level===state.level&&!state.records[c.id]).length;
  const amount=Math.min(state.goal,Math.floor(state.minutes/2),newCount),progress=state.lessonProgress[r.id]||{};
  const name=state.profile.name?esc(displayName())+t('，','，'):'';
  return `${heading(t(`${name}今天，从一小步开始。`,`${name}a little German, every day.`),t('让复习、理解和开口，成为一条清晰的学习路径。','A clear path from remembering, to understanding, to speaking.'),`<span class="pill">${state.level}</span><button class="plan-preferences" data-action="plan-settings">${icon('settings')}${intentionLabel()}<span>· ${state.minutes} min</span></button>`)}<div class="dashboard-grid"><section class="card daily-plan module-card" data-content-module="plan"><div class="row between"><div><span class="label">DEIN PLAN FÜR HEUTE</span><h2>${t('今天的学习路径','Your path for today')}</h2></div><span class="plan-ring" style="--progress:${Math.min(100,todayCount()/state.goal*100)}%"><span>${todayCount()}<small> / ${state.goal}</small></span></span></div><div class="task-list"><button data-action="start-due" class="plan-task"><span class="task-icon">${icon('refresh')}</span><span><strong>${t('先唤醒记忆','First, refresh your memory')}</strong><small>${due().length} ${t('张到期卡片 · 优先复习','cards due · review comes first')}</small></span>${icon('arrow')}</button><button data-action="start-new" class="plan-task"><span class="task-icon">${icon('cards')}</span><span><strong>${t('再认识几个新词','Then, meet a few new words')}</strong><small>${amount} ${t('个建议新词 · 当前级别','suggested new words · current level')}</small></span>${icon('arrow')}</button>${planThirdTask(u)}</div><p class="plan-note">${t('按可用时间、学习目的和到期记录生成；每日单词、例句安排及当日计数按设备本地时间在 00:00 刷新，长期进度保留。','Built from your available time, purpose and due cards. Daily words, examples and today’s count refresh at 00:00 device time; long-term progress remains.')}</p></section><section class="card continue-unit module-card" data-content-module="continue"><span class="label">WEITER LERNEN</span><span class="square-icon">${icon(r.icon)}</span><span class="pill">${r.level}</span><h2>${tr(r.title)}</h2><p lang="de">${r.de}</p><div class="unit-milestones"><span class="${progress.reading?'done':''}">${icon('check')}${t('情景理解','Understand')}</span><span class="${r.words.every((_,i)=>state.records[`${r.id}:${i}`])?'done':''}">${icon('check')}${t('词卡巩固','Remember')}</span><span class="${progress.oral?'done':''}">${icon('check')}${t('开口应用','Speak')}</span></div><button class="primary" data-resume-unit="${r.id}">${t('继续上次学习','Resume learning')}${icon('arrow')}</button></section></div><section class="quiet-summary" data-content-module="summary"><span>${icon('leaf')}${t('每一步都有积累','Every small step adds up')}</span><p><strong>${known}</strong> / ${allCards.length} ${t('词已学习','words studied')}<span>·</span><strong>${Object.keys(state.notebook).filter(id=>sentenceById(id)).length}</strong> ${t('句已收藏','saved sentences')}</p><button class="text-btn" data-nav="progress">${t('查看学习记录','View progress')} ↗</button></section>`;
}
function planThirdTask(u){
  const focus=state.intention,attrs=focus==='exam'?'data-nav="exam"':focus==='life'?'data-plan-oral="'+u.id+'"':'data-enter-unit="'+u.id+'"';
  const title=focus==='exam'?t('练一项考试基础能力','Practice an exam foundation skill'):focus==='life'?t('开口完成一个生活任务','Speak through an everyday task'):t('放进一个真实场景','Put them into a real situation');
  const note=focus==='exam'?t('听 · 说 · 读 · 写，自选一个小练习','Listening, reading, writing or speaking'):focus==='life'?t('听原句，再独立复述','Listen, then repeat independently'):t('读一段，再说一遍','Read it, then say it');
  return '<button '+attrs+' class="plan-task"><span class="task-icon">'+icon(focus==='exam'?'graduate':'message')+'</span><span><strong>'+title+'</strong><small>'+tr(u.title)+' · '+note+'</small></span>'+icon('arrow')+'</button>';
}
function planSettings(){
  modal(t('按你的节奏来','Find your own rhythm'),`<form id="plan-form"><label class="field-label" for="plan-intention">${t('学习目的','Your purpose')}</label><select id="plan-intention"><option value="both" ${state.intention==='both'?'selected':''}>${t('歌德备考 + 德国生活','Goethe exams + life in Germany')}</option><option value="exam" ${state.intention==='exam'?'selected':''}>${t('以歌德备考为主','Focus on Goethe preparation')}</option><option value="life" ${state.intention==='life'?'selected':''}>${t('以日常交流为主','Focus on everyday communication')}</option></select><label class="field-label spaced" for="plan-minutes">${t('每天可用时间','Time available each day')}</label><select id="plan-minutes">${[10,20,30].map(n=>`<option value="${n}" ${n===state.minutes?'selected':''}>${n} ${t('分钟','minutes')}</option>`).join('')}</select><p class="privacy-note spaced">${t('计划将优先安排到期复习，按时间控制新词数量。目标不代表考试通过保证。','The plan prioritizes due reviews and limits new words to fit your time. It does not guarantee an exam result.')}</p><div class="dialog-actions"><button type="button" class="secondary" data-action="close">${t('取消','Cancel')}</button><button class="primary" type="submit">${t('更新我的计划','Update my plan')}</button></div></form>`);
}
const previousAbout=about;
about=function(){
  previousAbout();
  $('.dialog-content')?.insertAdjacentHTML('beforeend',`<h3>${t('产品设计参考','Product design reference')}</h3><p>${t('学习路径参考了 SharpLingo 公开页面中“课程—课文—词卡”的连接方式；界面、课程内容和实现均为本站原创，没有复制其付费内容、品牌或算法能力。','The connected course–lesson–card flow takes inspiration from public SharpLingo pages. Klar’s interface, lesson content and implementation are original; no paid content, branding or algorithmic capability is copied.')}</p><p><a href="https://sharplingo.cn/" target="_blank" rel="noopener noreferrer">SharpLingo ${t('公开网站','public site')} ↗</a></p>`);
};
function studyPage(){
  const u=unit(),lesson=unitLesson(),review=state.page==='review';
  const controls=`<div class="lesson-navigation"><button class="text-btn" data-nav="library">${icon('chevron')}${t('课程目录','Courses')}</button><span class="pill">${u.level}</span><label><select id="unit-select" aria-label="${t('选择单元','Choose unit')}">${UNITS.filter(x=>x.level===state.level).map(x=>`<option value="${x.id}" ${x.id===u.id?'selected':''}>${tr(x.title)}</option>`).join('')}</select></label></div><div class="lesson-tabs" role="group" aria-label="${t('单元学习方式','Lesson activity')}">${[['reading','情景阅读','Read'],['cards','单词卡片','Remember'],['speaking','跟读应用','Speak']].map((v,i)=>`<button data-view="${v[0]}" aria-pressed="${state.lessonView===v[0]}" class="${state.lessonView===v[0]?'selected':''}"><span>0${i+1}</span>${t(v[1],v[2])}</button>`).join('')}</div>`;
  return `${heading(review?t('把熟悉的词，记得更久。','Help familiar words stay longer.'):tr(lesson.title),review?t(`${cards().length} 张到期卡片 · 真实记录，按需复习。`,`${cards().length} due cards · Based on your actual review dates.`):tr(lesson.intro),controls)}<div class="workspace"><section id="study-region" data-content-module="study">${state.lessonView==='cards'?'<div id="card-region"></div>':state.lessonView==='reading'?readerHTML():speakingHTML()}</section><aside class="study-companion"><div id="video-region" data-content-module="video"></div><button class="card grammar-entry module-card" data-action="grammar" data-content-module="grammar"><span class="square-icon">${icon('book')}</span><span><span class="eyebrow">${t('本课语法与应用','THIS LESSON’S GRAMMAR')}</span><strong>${tr(lesson.grammar.title)}</strong><small>${t('规则、易错点与小练习','Rules, pitfalls and a small exercise')}</small></span>${icon('arrow')}</button></aside></div>`;
}
function readerHTML(){
  const lesson=unitLesson(),u=unit();
  return `<article class="card lesson-reader reader-${state.readerSize}"><header class="reader-toolbar"><span class="label">${u.de}</span><div class="row"><button class="reader-control" data-action="translations" aria-pressed="${state.showTranslation}">${t('译文','Translation')}</button><button class="reader-control" data-action="reader-size" aria-pressed="${state.readerSize==='large'}" aria-label="${t('调整课文字号','Adjust text size')}">A<span>A</span></button></div></header><div class="dialogue-lines">${lesson.lines.map((line,i)=>`<section class="dialogue-line ${state.notebook[`${u.id}:line:${i}`]?'sentence-saved':''}"><div class="sentence-speaker">${esc(line.speaker)}</div><p lang="de">${annotatedSentence(line,u)}</p>${state.showTranslation?`<p class="sentence-translation">${esc(line[state.lang==='en'?'en':'zh'])}</p>`:''}<div class="sentence-tools"><button data-study-speak="${esc(line.de)}" aria-label="${t('朗读这一句','Hear this sentence')}">${icon('volume')}</button><button data-sentence="${u.id}:line:${i}" aria-label="${t('收藏句子并添加标签','Save and tag this sentence')}" aria-pressed="${Boolean(state.notebook[`${u.id}:line:${i}`])}">${icon('bookmark')}</button>${line.words.slice(0,2).map(n=>`<button class="word-chip" data-lookup="${u.id}:${n}">${esc(u.words[n][0])} ↗</button>`).join('')}</div></section>`).join('')}</div><section class="reading-check"><h3>${t('读懂了吗？','Got the meaning?')}</h3><p>${tr(lesson.check.prompt)}</p><div class="reading-options">${lesson.check.options.map((o,i)=>`<button data-comprehension="${i}" class="${lessonAnswer!==null&&i===lesson.check.correct?'correct':lessonAnswer===i?'wrong':''}" ${lessonAnswer!==null?'disabled':''}>${tr(o)}</button>`).join('')}</div>${lessonAnswer!==null?`<p class="reading-feedback" role="status">${tr(lesson.check.explanation)}</p>${lessonAnswer!==lesson.check.correct?`<button class="secondary spaced" data-action="retry-reading">${t('再试一次','Try again')}</button>`:`<button class="primary" data-view="cards">${t('去巩固本课单词','Practice this lesson’s words')}${icon('arrow')}</button>`}`:''}</section></article>`;
}
function annotatedSentence(line,u){
  let parts=[{text:line.de}];
  line.words.forEach(index=>{const term=u.words[index][0].replace(/^(der|die|das) /,'');if(term.length<3)return;const pattern=new RegExp(`(?<![\\p{L}])(${term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})(?![\\p{L}])`,'giu');parts=parts.flatMap(part=>part.id?[part]:part.text.split(pattern).map((text,i)=>({text,...(i%2?{id:`${u.id}:${index}`}:{})})));});
  return parts.map(p=>p.id?`<button class="inline-word" data-lookup="${p.id}">${esc(p.text)}</button>`:esc(p.text)).join('');
}
function setLessonView(view){
  if(!['reading','cards','speaking'].includes(view))return;
  invalidateMotion();state.lessonView=view;rememberSession();persist();render(false);entrance($('#study-region'));
}
function updateReader(){if($('#study-region')&&state.lessonView==='reading')$('#study-region').innerHTML=readerHTML();}
function sentenceById(id){
  const match=/^(.+):line:(\d+)$/.exec(id);if(!match)return null;
  const u=UNITS.find(u=>u.id===match[1]);if(!u)return null;
  const line=LESSONS[u.id]?.lines?.[Number(match[2])];return line?{u,line,index:Number(match[2])}:null;
}
function saveSentenceModal(id){
  const item=sentenceById(id);if(!item)return;
  const existing=state.notebook[id],tags=Array.isArray(existing?.tags)?existing.tags:[tr(item.u.title)];
  modal(t('收藏这句实用表达','Keep this useful sentence'),`<p class="saved-quote" lang="de">${esc(item.line.de)}</p><p>${esc(item.line[state.lang==='en'?'en':'zh'])}</p><form id="sentence-form" data-sentence-id="${id}"><label class="field-label spaced" for="sentence-tags">${t('标签（逗号分隔，最多 5 个）','Tags (comma-separated, up to 5)')}</label><input id="sentence-tags" class="text-input" value="${esc(tags.join(', '))}" maxlength="130" required><p class="privacy-note">${t('同一句子不会重复保存；再次保存会更新标签。','The same sentence is saved once. Saving again updates its tags.')}</p><div class="dialog-actions">${existing?`<button type="button" class="secondary" data-remove-sentence="${id}">${t('取消收藏','Remove')}</button>`:''}<button class="primary" type="submit">${t('保存句子','Save sentence')}${icon('check')}</button></div></form>`);
}
function lookup(id){
  const c=allCards.find(c=>c.id===id);if(!c)return;
  modal(t('本课词典','Lesson dictionary'),`<span class="pill">${c.u.level} · ${tr(c.u.title)}</span><h2 class="dictionary-term" lang="de">${esc(c.w[0])}</h2><p>${esc(c.w[state.lang==='en'?2:1])}</p><p class="small">${esc(morphology(c.w[3]))}</p><div class="dictionary-audio"><button class="secondary" data-study-speak="${esc(c.w[0])}">${icon('volume')}${t('正常','Normal')}</button><button class="secondary" data-study-speak="${esc(c.w[0])}" data-rate-speed="0.8">${icon('volume')}${t('慢速 · 0.8×','Slow · 0.8×')}</button></div>${examplesOf(c.w).map(example=>`<div class="grammar-example"><p lang="de">${esc(example.de)}</p><p>${esc(example[state.lang])}</p></div>`).join('')}<button class="primary spaced" data-lookup-save="${c.id}" aria-pressed="${state.favorites.includes(c.id)}">${icon('bookmark')}${state.favorites.includes(c.id)?t('已收藏 · 点击取消','Saved · remove'):t('收藏这个词','Save word')}</button><p class="privacy-note spaced">${t('本站课程词典，仅收录已编写的词条。','A course dictionary containing only authored entries.')}</p>`);
}
function collectionsPage(){
  const tabs=`<div class="lesson-tabs"><button data-collection-tab="words" class="${notebookTab==='words'?'selected':''}">${t('单词','Words')}</button><button data-collection-tab="sentences" class="${notebookTab==='sentences'?'selected':''}">${t('句子本','Sentences')}</button></div>`;
  const headingHTML=heading(t('把想说的话，留在身边。','Keep the words you want to use.'),t('收藏单词，也收藏带着场景的句子。','Collect words, and the situations that give them meaning.'),tabs);
  if(notebookTab==='words'){const list=allCards.filter(c=>state.favorites.includes(c.id));return `${headingHTML}<section class="card word-list" data-content-module="words">${list.length?wordRows(list):`<div class="empty"><h2>${t('从一个想记住的词开始','Start with a word to remember')}</h2><p>${t('在单词卡或课文词典中点击收藏。','Save a word from a card or the lesson dictionary.')}</p><button class="primary" data-nav="library">${t('打开课程','Explore courses')}</button></div>`}</section>`;}
  const entries=Object.entries(state.notebook).filter(([id])=>sentenceById(id)),tags=[...new Set(entries.flatMap(([,v])=>Array.isArray(v.tags)?v.tags:[]))];
  const list=entries.filter(([,v])=>!tagFilter||v.tags?.includes(tagFilter));
  return `${headingHTML}<section class="card sentence-collection" data-content-module="sentences"><label class="tag-filter">${t('按标签筛选','Filter by tag')}<select id="tag-filter"><option value="">${t('全部句子','All sentences')}</option>${tags.map(tag=>`<option ${tag===tagFilter?'selected':''} value="${esc(tag)}">${esc(tag)}</option>`).join('')}</select></label>${list.length?list.map(([id,item])=>{const {u,line}=sentenceById(id);return `<article class="notebook-entry"><span class="label">${u.level} · ${tr(u.title)}</span><p lang="de">${esc(line.de)}</p><p class="sentence-translation">${esc(line[state.lang==='en'?'en':'zh'])}</p><div class="row between"><div class="tag-list">${(item.tags||[]).map(tag=>`<span>${esc(tag)}</span>`).join('')}</div><div class="row"><button class="icon-btn" data-study-speak="${esc(line.de)}" aria-label="${t('朗读句子','Hear sentence')}">${icon('volume')}</button><button class="text-btn" data-sentence="${id}">${t('编辑','Edit')}</button></div></div></article>`;}).join(''):`<div class="empty"><h2>${t('句子本还是空的','Your sentence book is empty')}</h2><p>${t('进入情景阅读，收藏一句能用上的德语。','Open a lesson and keep a sentence you can use.')}</p><button class="primary" data-nav="library">${t('去读一个场景','Read a situation')}</button></div>`}</section>`;
}
renderCard=function(){
  if(!$('#card-region'))return;
  if(state.mode==='recall'||state.completed||!current())previousFlashCard();else renderSpellingCard();
  const region=$('#card-region');region.insertAdjacentHTML('afterbegin',`<div class="practice-modes" role="group" aria-label="${t('词卡练习模式','Word practice mode')}">${[['recall','回想','Recall'],['spell','拼写','Spelling'],['listen','听写','Dictation']].map(v=>`<button data-mode="${v[0]}" aria-pressed="${state.mode===v[0]}" class="${state.mode===v[0]?'selected':''}">${t(v[1],v[2])}</button>`).join('')}</div>`);
  if(state.completed)region.querySelector('.completion')?.insertAdjacentHTML('beforeend',`<button class="text-btn completion-next" data-view="speaking">${t('把这些词说出来','Put these words into speech')} →</button>`);
};
function renderSpellingCard(){
  const c=current(),answer=c.w[0];
  $('#card-region').innerHTML=`<article class="card flashcard spelling-card" data-card-id="${c.id}"><header class="card-meta"><span class="pill">${c.u.level}</span><span>${state.index+1} / ${cards().length}</span></header><div class="spelling-prompt"><span class="label">${state.mode==='listen'?'HÖREN & SCHREIBEN':'ERINNERN & SCHREIBEN'}</span><h2>${state.mode==='listen'?t('听一听，写下来。','Listen, then write it.'):esc(c.w[state.lang==='en'?2:1])}</h2>${state.mode==='listen'?`<button class="audio-orb" data-study-speak="${esc(answer)}" aria-label="${t('播放听写单词','Play dictation word')}">${icon('volume')}</button>`:''}<p>${t('名词请带冠词；注意大写和变音符号。','Include the article for nouns. Mind capitals and umlauts.')}</p></div><form id="spelling-form"><label class="sr-only" for="spelling-input">${t('输入德语','Type the German word')}</label><input id="spelling-input" class="text-input" value="${esc(spellingValue)}" autocomplete="off" spellcheck="false" placeholder="Deutsch …" ${spellingResult?'disabled':''}><div class="spelling-actions"><button class="primary" type="submit" ${spellingResult?'disabled':''}>${t('检查答案','Check answer')}</button><button type="button" class="text-btn" data-action="spelling-reveal" ${spellingResult?'disabled':''}>${t('暂时想不起来','I need a hint')}</button></div></form>${spellingResult?`<div class="spelling-feedback ${spellingResult.correct?'correct':'wrong'}" role="status"><strong>${spellingResult.correct?t('答对了。','That’s right.'):t('再看一遍正确表达。','Take another look at the answer.')}</strong><p lang="de">${esc(answer)}</p><p>${esc(c.w[state.lang==='en'?2:1])}</p><p lang="de">${esc(c.w[4])}</p><p class="sentence-translation">${esc(c.w[state.lang==='en'?6:5])}</p></div>`:''}</article><div class="ratings"><button class="rating again" data-rate="again" ${!spellingResult?'disabled':''}>${t('再学一次','Again')}</button><button class="rating good" data-rate="good" ${!spellingResult?'disabled':''}>${t('明天复习','Tomorrow')}</button><button class="rating easy" data-rate="easy" ${!spellingResult?'disabled':''}>${t('记住了','Remembered')}</button></div>`;
}
function checkSpelling(reveal=false){
  if(spellingResult||!current())return;
  spellingValue=$('#spelling-input')?.value||'';
  const normalized=s=>s.normalize('NFC').trim().replace(/\s+/g,' ');
  spellingResult={correct:!reveal&&normalized(spellingValue)===normalized(current().w[0])};state.revealed=true;
  if(!reveal){const old=state.practiceLog[current().id]||{};state.practiceLog[current().id]={attempts:(old.attempts||0)+1,correct:(old.correct||0)+(spellingResult.correct?1:0),last:Date.now(),mode:state.mode};persist();}
  renderCard();entrance($('.spelling-feedback'));
}
function speakingHTML(){
  const lesson=unitLesson();oralIndex=Math.min(oralIndex,lesson.lines.length-1);
  return `<article class="card speaking-room"><div class="label">HÖREN. NACHSPRECHEN. ANWENDEN.</div><h2>${t('让这一句，变成你的表达。','Make this sentence your own.')}</h2><label class="shadow-select">${t('选择一句跟读','Choose a sentence')}<select id="oral-line">${lesson.lines.map((line,i)=>`<option value="${i}" ${i===oralIndex?'selected':''}>${i+1}. ${esc(line.de.slice(0,68))}</option>`).join('')}</select></label><div class="shadow-text"><p lang="de">${esc(lesson.lines[oralIndex].de)}</p><p class="sentence-translation">${esc(lesson.lines[oralIndex][state.lang==='en'?'en':'zh'])}</p></div><div class="shadow-controls"><button class="secondary" data-study-speak="${esc(lesson.lines[oralIndex].de)}">${icon('volume')}${t('正常 · 1×','Normal · 1×')}</button><button class="secondary" data-study-speak="${esc(lesson.lines[oralIndex].de)}" data-rate-speed="0.8">${t('慢速 · 0.8×','Slow · 0.8×')}</button><button class="secondary" data-study-speak="${esc(lesson.lines[oralIndex].de)}" data-repeat="3">${icon('refresh')}×3</button><button class="text-btn" data-action="stop-audio">${t('停止','Stop')}</button></div><p class="audio-note">${icon('headphones')}<span>${t('同一条固定课程音频以 1× 或精确 0.8× 播放；本站不采集麦克风录音。','The same fixed course clip plays at exact 1× or 0.8×. Klar does not collect microphone recordings.')}</span></p><section class="oral-task"><h3>${t('离开原句，自己试试','Now say it your way')}</h3><p>${tr(lesson.oral)}</p><details><summary>${t('自查提示','Self-check prompts')}</summary><ul class="oral-rubric">${(lesson.rubric||[]).map(item=>`<li>${tr(item)}</li>`).join('')}</ul></details><label class="oral-self-check spaced"><input type="checkbox" id="oral-completed" ${state.lessonProgress[state.unit]?.oral?'checked':''}>${t('我已开口练习，并检查表达是否完整、清楚。','I have practiced aloud and checked that my response is complete and clear.')}</label></section></article>`;
}
function stopStudyAudio(){}
async function studySpeak(){toast(t('课程音频尚未载入，请刷新页面。','Course audio is not loaded yet. Refresh the page.'));}
speak=function(text){studySpeak(text);};
grammar=function(id=state.unit){
  const u=UNITS.find(u=>u.id===id)||UNITS.find(u=>u.level===id)||unit(),g=LESSONS[u.id].grammar;
  modal(`${u.level} · ${tr(g.title)}`,`<span class="pill">${tr(u.title)}</span><h3>${t('核心规律','The core pattern')}</h3><p>${tr(g.rule)}</p><div class="pattern" lang="de">${esc(g.pattern)}</div>${g.examples.map(e=>`<div class="grammar-example"><p lang="de">${esc(e[0])}<button class="icon-btn" data-study-speak="${esc(e[0])}" aria-label="${t('朗读例句','Hear example')}">${icon('volume')}</button></p><p>${esc(e[state.lang==='en'?2:1])}</p></div>`).join('')}<p class="notice">${tr(g.pitfall)}</p><h3>${t('放进生活里试一试','Try it in real life')}</h3><p>${tr(g.task)}</p><textarea data-draft="grammar-unit-${u.id}" aria-label="${t('填写语法练习','Your grammar practice')}" placeholder="Schreib auf Deutsch …">${esc(state.drafts[`grammar-unit-${u.id}`]||'')}</textarea><details><summary>${t('查看参考表达','See a possible answer')}</summary><p lang="de">${esc(g.answer)}</p></details><p class="privacy-note">${t('草稿自动保存在本机，不自动评分。','Drafts autosave locally. This is unscored practice.')}</p>`);
};
grammarPage=function(){return `${heading(t('每一课，都有一条清晰的规律。','A clear pattern in every lesson.'),t(`${state.level} · 与场景相连的语法，想深入时再打开。`,`${state.level} · Grammar connected to a situation. Open it when you need it.`))}<div class="library-grid">${UNITS.filter(u=>u.level===state.level).map(u=>`<section class="card unit-card" data-content-module="grammar"><span class="pill">${u.level} · ${tr(u.title)}</span><h2>${tr(LESSONS[u.id].grammar.title)}</h2><p>${tr(LESSONS[u.id].grammar.rule)}</p><button class="primary" data-grammar-unit="${u.id}">${t('打开讲解与练习','Explore the lesson')}${icon('arrow')}</button></section>`).join('')}</div>`;};
const oldLibrary=library;
library=function(){let html=oldLibrary();for(const u of UNITS.filter(u=>u.level===state.level))html=html.replace('data-grammar="'+u.level+'"','data-grammar-unit="'+u.id+'"');return html.replaceAll('data-unit=','data-enter-unit=').replaceAll(t('开始这个单元','Start this unit'),t('进入完整单元','Open full lesson'));};
// Keep old card IDs stable; per-unit arrays are append-only while legacy progress exists.
const originalRate=rate;
rate=async function(rating){
  if(cardBusy||!$('#card-region')||!state.revealed||!current()||state.completed)return;
  const token=epoch,oldIndex=state.index;await originalRate(rating);
  if(token!==epoch||state.index===oldIndex)return;
  rememberSession();persist();
  const h=$('.word-area h2,.spelling-prompt h2,.completion h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}
  announce(state.completed?t('本轮学习完成','Session complete'):state.mode==='listen'?t('下一个听写单词','Next dictation word'):current().w[0]+' · '+(state.index+1)+' / '+cards().length);
};
const originalReveal=revealCard;
revealCard=async function(){
  if(cardBusy||!$('#card-region')||state.mode!=='recall')return;
  const token=epoch;await originalReveal();
  if(token===epoch&&state.revealed&&current()){const h=$('.word-area h2');h?.setAttribute('tabindex','-1');h?.focus({preventScroll:true});announce(current().w[state.lang==='en'?2:1]);}
};
function announce(text){$('#study-status').textContent=text;}
document.body.insertAdjacentHTML('beforeend','<div id="study-status" class="sr-only" role="status" aria-live="polite"></div>');
floatVideo=function(){togglePersistentVideo();};
document.addEventListener('click',async event=>{
  const b=event.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
  if(d.planOral){setUnit(d.planOral,0,'speaking');return;}
  if(d.enterUnit){setUnit(d.enterUnit,0,'reading');return;}
  if(d.resumeUnit){const session=state.sessions[d.resumeUnit]||{};setUnit(d.resumeUnit,session.index||0,session.view||'reading');return;}
  if(d.view){setLessonView(d.view);return;}
  if(d.mode){if(cardBusy)return;stopStudyAudio();state.mode=d.mode;state.revealed=false;spellingResult=null;spellingValue='';persist();renderCard();entrance($('#card-region'));return;}
  if(d.lookup){lookup(d.lookup);return;}
  if(d.lookupSave){const id=d.lookupSave;state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];persist();b.setAttribute('aria-pressed',String(state.favorites.includes(id)));b.innerHTML=icon('bookmark')+(state.favorites.includes(id)?t('已收藏 · 点击取消','Saved · remove'):t('收藏这个词','Save word'));return;}
  if(d.sentence){saveSentenceModal(d.sentence);return;}
  if(d.removeSentence){delete state.notebook[d.removeSentence];tagFilter='';persist();await closeModal();if(state.page==='favorites')render(false);else updateReader();return;}
  if(d.collectionTab){notebookTab=d.collectionTab;tagFilter='';render(false);return;}
  if(d.grammarUnit){grammar(d.grammarUnit);return;}
  if(d.studySpeak){studySpeak(d.studySpeak,Number(d.rateSpeed)||1,Math.min(3,Number(d.repeat)||1));return;}
  if(d.comprehension!==undefined&&lessonAnswer===null){lessonAnswer=Number(d.comprehension);if(lessonAnswer===unitLesson().check.correct){state.lessonProgress[state.unit]={...state.lessonProgress[state.unit],reading:Date.now()};persist();}updateReader();announce(tr(unitLesson().check.explanation));return;}
  switch(d.action){
    case'retry-reading':lessonAnswer=null;updateReader();break;
    case'plan-settings':planSettings();break;
    case'start-due':navigate('review');break;
    case'start-new':{const count=Math.min(state.goal,Math.floor(state.minutes/2)),pool=allCards.filter(c=>c.u.level===state.level&&!state.records[c.id]),newCards=typeof dailyCards==='function'?dailyCards(pool,count):pool.slice(0,count);if(!newCards.length){toast(t('当前级别的新词已学完，可复习或切换级别。','No new words in this level. Review or switch levels.'));break;}state.lessonView='cards';state.mode='recall';previousSetUnit(newCards[0].u.id,newCards[0].index);state.queue=newCards;state.index=0;render();break;}
    case'translations':state.showTranslation=!state.showTranslation;persist();updateReader();break;
    case'reader-size':state.readerSize=state.readerSize==='normal'?'large':'normal';persist();updateReader();break;
    case'spelling-reveal':checkSpelling(true);break;
    case'stop-audio':stopStudyAudio();break;
    case'play':syncVideoDock();break;
  }
});
document.addEventListener('submit',async event=>{
  const form=event.target;
  if(form.id==='spelling-form'){event.preventDefault();checkSpelling();}
  if(form.id==='plan-form'){event.preventDefault();state.minutes=Number($('#plan-minutes').value);state.intention=$('#plan-intention').value;persist();await closeModal();render(false);}
  if(form.id==='sentence-form'){event.preventDefault();const tags=[...new Set($('#sentence-tags').value.split(/[,，]/).map(t=>t.trim().slice(0,24)).filter(Boolean))].slice(0,5);if(!tags.length){$('#sentence-tags').setCustomValidity(t('至少填写一个标签','Enter at least one tag'));$('#sentence-tags').reportValidity();return;}state.notebook[form.dataset.sentenceId]={tags,savedAt:Date.now()};tagFilter='';persist();await closeModal();if(state.page==='favorites')render(false);else updateReader();toast(t('句子已收藏','Sentence saved'));}
});
document.addEventListener('input',event=>{if(event.target.id==='sentence-tags')event.target.setCustomValidity('');if(event.target.id==='spelling-input')spellingValue=event.target.value;});
document.addEventListener('change',event=>{
  if(event.target.id==='tag-filter'){tagFilter=event.target.value;render(false);}
  if(event.target.id==='oral-line'){stopStudyAudio();oralIndex=Number(event.target.value);$('#study-region').innerHTML=speakingHTML();}
  if(event.target.id==='oral-completed'){state.lessonProgress[state.unit]={...state.lessonProgress[state.unit],oral:event.target.checked?Date.now():null};persist();}
});
document.addEventListener('klar:video-return',event=>{const id=event.detail.unitId,session=state.sessions[id]||{};setUnit(id,['learn','review'].includes(state.page)&&id===state.unit?(current()?.index??0):session.index||0,session.view||'reading');});
window.addEventListener('beforeunload',()=>{rememberSession();persist();stopStudyAudio();});
// index.html boots after all modules.
