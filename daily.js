'use strict';
state.studyDate=typeof saved.studyDate==='string'?saved.studyDate:dateKey();
const snapshotBeforeDaily=snapshot;
snapshot=function(){return {...snapshotBeforeDaily(),version:4,studyDate:state.studyDate};};
let midnightTimer;
function dailyCards(pool,count){
  if(!pool.length||count<1)return [];
  const seed=Array.from(`${dateKey()}:${state.level}`).reduce((hash,char)=>(hash*31+char.charCodeAt(0))>>>0,2166136261);
  const offset=seed%pool.length,rotated=[...pool.slice(offset),...pool.slice(0,offset)];
  return rotated.slice(0,Math.min(count,rotated.length));
}
function rolloverDailyStudy(nextDate=dateKey(),announceChange=true){
  if(state.studyDate===nextDate)return false;
  state.studyDate=nextDate;
  invalidateMotion();
  state.queue=null;state.index=0;state.revealed=false;state.completed=false;state.lessonView='cards';
  state.page='home';
  persist();render(false);window.scrollTo(0,0);
  if(announceChange)toast(t('新的一天，今日单词与例句安排已刷新。','A new day: today’s words and examples have refreshed.'));
  return true;
}
function scheduleMidnightRollover(){
  clearTimeout(midnightTimer);const now=new Date(),next=new Date(now);next.setHours(24,0,0,80);
  midnightTimer=setTimeout(()=>{rolloverDailyStudy();scheduleMidnightRollover();},Math.max(1000,next-now));
}
if(state.studyDate!==dateKey()){state.studyDate=dateKey();state.queue=null;state.index=0;state.revealed=false;state.completed=false;state.lessonView='cards';persist();}
scheduleMidnightRollover();
document.addEventListener('visibilitychange',()=>{if(!document.hidden){rolloverDailyStudy();scheduleMidnightRollover();}});
window.addEventListener('focus',()=>{rolloverDailyStudy();scheduleMidnightRollover();});
window.addEventListener('beforeunload',()=>clearTimeout(midnightTimer));
