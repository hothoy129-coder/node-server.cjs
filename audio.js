'use strict';
/* Fixed course audio is generated before deployment. Slow playback is applied
 * to the same MP3 through HTMLMediaElement.playbackRate, so device TTS voices
 * cannot ignore the requested 0.8x speed. */
let courseAudio=null,courseAudioFinish=null,courseAudioToken=0;

function stopCourseAudio(){
  courseAudioToken++;
  if(courseAudio){courseAudio.pause();courseAudio.currentTime=0;courseAudio=null;}
  if(courseAudioFinish){courseAudioFinish();courseAudioFinish=null;}
}

function playCourseClip(source,rate,token){
  return new Promise((resolve,reject)=>{
    if(token!==courseAudioToken){resolve();return;}
    const audio=new Audio(source);
    courseAudio=audio;
    courseAudioFinish=resolve;
    audio.preload='auto';
    audio.defaultPlaybackRate=rate;
    audio.playbackRate=rate;
    if('preservesPitch'in audio)audio.preservesPitch=true;
    if('webkitPreservesPitch'in audio)audio.webkitPreservesPitch=true;
    document.dispatchEvent(new CustomEvent('klar:audio-play',{detail:{source,rate}}));
    audio.onended=()=>{if(courseAudio===audio){courseAudio=null;courseAudioFinish=null;}resolve();};
    audio.onerror=()=>{if(courseAudio===audio){courseAudio=null;courseAudioFinish=null;}reject(new Error('audio'));};
    audio.play().catch(reject);
  });
}

stopStudyAudio=function(){stopCourseAudio();};
studySpeak=async function(text,rate=1,repeats=1){
  const source=AUDIO_FILES[String(text).trim()];
  if(!source){toast(t('这句固定音频暂不可用。','This fixed audio clip is unavailable.'));return;}
  stopCourseAudio();
  const token=courseAudioToken;
  const exactRate=Number(rate)<1?0.8:1;
  const count=Math.max(1,Math.min(3,Number(repeats)||1));
  try{
    for(let i=0;i<count&&token===courseAudioToken;i++)await playCourseClip(source,exactRate,token);
  }catch{
    if(token===courseAudioToken)toast(t('音频加载失败，请刷新页面后重试。','Audio could not load. Refresh the page and try again.'));
  }
};
speak=function(text){return studySpeak(text,1,1);};
window.addEventListener('beforeunload',stopCourseAudio);
