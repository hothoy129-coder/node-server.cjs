'use strict';
/* Original, unit-linked micro-practice. This is not a Goethe mock exam.
 * Keep the shared quiz state and button contracts from app.js unchanged.
 */
let assessmentQuizLevel = '';
const assessmentQuizOptions = new Map();

function assessmentShuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

examPage = function () {
  const u = unit();
  const controls = `<span class="pill">${state.level}</span><label class="unit-picker"><span>${t('练习单元', 'Practice unit')}</span><select id="unit-select" aria-label="${t('选择备考练习单元', 'Choose a practice unit')}">${UNITS.filter(x => x.level === state.level).map(x => `<option value="${x.id}" ${x.id === u.id ? 'selected' : ''}>${esc(tr(x.title))}</option>`).join('')}</select></label>`;
  const skills = [
    ['headphones', 'Hören', '听一句，理解意思', 'Listen for meaning', 'listen'],
    ['book', 'Lesen', '读完整场景', 'Read the situation', 'read'],
    ['pen', 'Schreiben', '写一段实用表达', 'Write a useful response', 'write'],
    ['message', 'Sprechen', '跟读与实际应用', 'Repeat and apply', 'speak']
  ];
  return `${heading(t('把每一课，练得更扎实。', 'Turn each lesson into stronger skills.'), t('先练当前单元的听说读写，再检查本级别的词义。', 'Practice this unit’s four skills, then check vocabulary from this level.'), controls)}<section class="card skills-section module-card" data-content-module="skills"><div class="row between"><div><span class="label">${u.level} · ${esc(u.de)}</span><h2>${t('今天，想练哪一项？', 'Which skill will you practice?')}</h2></div></div><div class="skills-grid">${skills.map(s => `<button class="skill-card" data-skill="${s[4]}">${icon(s[0])}<strong lang="de">${s[1]}</strong><small>${t(s[2], s[3])}</small>${icon('arrow')}</button>`).join('')}</div><p class="privacy-note">${t('四项练习均来自当前单元，属于原创自主练习，不是官方试题，也不提供考试评分。', 'All four activities use the current unit. They are original self-practice, not official tasks, and do not provide exam scores.')}</p></section><section id="quiz-region" data-content-module="quiz"></section><section class="card exam-intro module-card" data-content-module="official"><div><span class="label">GOETHE-ZERTIFIKAT ${state.level}</span><h2>${t('熟悉正式考试，从官方资料开始。', 'Explore the real exam with official resources.')}</h2><p>${t('本站的词义检查和语言微练习不能替代完整备考；正式题型、考试音频和样题可在站内预览歌德资料。', 'These vocabulary checks and language activities do not replace complete preparation. Preview Goethe materials here for official formats, audio and sample papers.')}</p></div><button class="secondary" data-material="${state.level}">${t('站内预览官方资料', 'Preview official material')} ↗</button></section>`;
};

resetQuiz = function () {
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  quizFinished = false;
  quizSelection = null;
  assessmentQuizLevel = state.level;
  assessmentQuizOptions.clear();
  const pool = allCards.filter(card => card.u.level === state.level);
  // Sample from all current-level cards, not just the first unit.
  quizOrder = assessmentShuffle(pool).slice(0, Math.min(4, pool.length));
  for (const card of quizOrder) {
    const distractors = assessmentShuffle(pool.filter(other => other.id !== card.id)).slice(0, 3);
    assessmentQuizOptions.set(card.id, assessmentShuffle([card, ...distractors]));
  }
};

renderQuiz = function () {
  const region = $('#quiz-region');
  if (!region) return;
  if (!quizOrder.length || assessmentQuizLevel !== state.level) resetQuiz();
  if (!quizOrder.length) {
    region.innerHTML = `<section class="card completion"><h2>${t('当前级别暂无可用词卡。', 'No word cards are available for this level.')}</h2></section>`;
    return;
  }
  if (quizFinished) {
    region.innerHTML = `<section class="card completion"><span class="completion-icon">${icon('check')}</span><span class="label">${state.level} · ${t('词义小检查', 'VOCABULARY CHECK')}</span><h2>${t('这一轮，完成了。', 'This round is complete.')}</h2><p>${quizScore} / ${quizOrder.length} ${t('答对', 'correct')}</p><p class="privacy-note">${t('这里只记录本轮词义辨认，不代表语言等级、考试成绩或通过概率。', 'This result only reflects word-meaning recognition in this round, not proficiency, an exam score or a chance of passing.')}</p><button class="primary" data-action="restart-quiz">${t('重新抽取四题', 'Draw four new questions')}${icon('refresh')}</button></section>`;
    return;
  }
  const card = quizOrder[quizIndex];
  const options = assessmentQuizOptions.get(card.id);
  const correct = quizSelection === card.id;
  const answer = esc(card.w[state.lang === 'en' ? 2 : 1]);
  const feedback = quizAnswered ? `<strong>${correct ? t('回答正确。', 'That’s correct.') : t('再记一次：', 'Remember:')} ${answer}</strong><p lang="de">${esc(card.w[4])}</p><p class="sentence-translation">${esc(card.w[state.lang === 'en' ? 6 : 5])}</p>` : '';
  region.innerHTML = `<section class="card quiz module-card"><div class="row between"><span class="label">${state.level} · ${t('词义小检查', 'VOCABULARY CHECK')}</span><span class="small muted">${quizIndex + 1} / ${quizOrder.length}</span></div><p class="privacy-note">${t('从本级别全部课程随机抽题；本轮题序和选项位置保持不变。', 'Questions are drawn from all courses in this level. Question and option order stay fixed for this round.')}</p><h2 lang="de">${esc(card.w[0])}</h2><div class="quiz-options">${options.map(option => `<button data-answer="${option.id}" ${quizAnswered ? 'disabled' : ''} class="${quizAnswered ? (option.id === card.id ? 'correct' : option.id === quizSelection ? 'wrong' : '') : ''}">${esc(option.w[state.lang === 'en' ? 2 : 1])}</button>`).join('')}</div><div class="quiz-feedback" role="status" aria-live="polite">${feedback}</div><button class="primary" data-action="quiz-next" ${!quizAnswered ? 'disabled' : ''}>${quizIndex === quizOrder.length - 1 ? t('查看本轮结果', 'See this round’s result') : t('下一题', 'Next question')}${icon('arrow')}</button></section>`;
};

skillModal = function (kind) {
  const u = unit(), lesson = LESSONS[u.id], grammar = lesson.grammar;
  const badge = `<span class="pill">${u.level} · ${esc(tr(u.title))}</span>`;
  const disclaimer = `<p class="notice">${t('本课原创自主练习，非歌德官方试题，不自动计分。请先尝试，再查看参考内容。', 'Original self-practice for this lesson, not an official Goethe task. It is not automatically scored. Try first, then reveal the reference material.')}</p>`;

  if (kind === 'write') {
    const draftKey = `exam-unit-${u.id}`;
    modal(`${u.level} · Schreiben`, `${badge}<h3>${t('把本课语法用出来', 'Use this lesson’s grammar')}</h3><p>${esc(tr(grammar.task))}</p><textarea data-draft="${draftKey}" aria-label="${t('当前单元的写作练习', 'Writing practice for this unit')}" placeholder="Schreib auf Deutsch …">${esc(state.drafts[draftKey] || '')}</textarea><p class="privacy-note">${t('草稿按单元自动保存在当前浏览器，不提供自动作文评分。', 'Drafts autosave separately for each unit in this browser. Automated writing assessment is not provided.')}</p><details><summary>${t('查看一种参考表达', 'See one possible response')}</summary><p lang="de">${esc(grammar.answer)}</p><button class="text-btn" data-study-speak="${esc(grammar.answer)}">${icon('volume')}${t('听参考表达', 'Hear the example')}</button><p>${esc(tr(grammar.rule))}</p></details>${disclaimer}`);
    return;
  }

  if (kind === 'read') {
    modal(`${u.level} · Lesen`, `${badge}<h3>${esc(tr(lesson.title))}</h3><p>${t('先读德语场景，再在心里选出下面问题的答案。', 'Read the German situation first, then choose an answer to the question in your mind.')}</p><div class="exam-reading">${lesson.lines.map(line => `<section class="grammar-example"><span class="sentence-speaker">${esc(line.speaker)}</span><p lang="de">${esc(line.de)}</p></section>`).join('')}</div><h3>${esc(tr(lesson.check.prompt))}</h3><ol type="A">${lesson.check.options.map(option => `<li>${esc(tr(option))}</li>`).join('')}</ol><details><summary>${t('核对答案与解析', 'Check the answer and explanation')}</summary><p><strong>${String.fromCharCode(65 + lesson.check.correct)}. ${esc(tr(lesson.check.options[lesson.check.correct]))}</strong></p><p>${esc(tr(lesson.check.explanation))}</p></details><details><summary>${t('查看中文注释', 'Show English annotations')}</summary>${lesson.lines.map(line => `<div class="grammar-example"><p lang="de">${esc(line.de)}</p><p>${esc(line[state.lang === 'en' ? 'en' : 'zh'])}</p></div>`).join('')}</details>${disclaimer}`);
    return;
  }

  if (kind === 'listen') {
    const line = lesson.lines.find(item => item.words.length) || lesson.lines[0];
    modal(`${u.level} · Hören`, `${badge}<h3>${t('听一句，抓住说话人的意思', 'Listen for the speaker’s meaning')}</h3><p>${t('先不看原文，听一句本课表达。试着复述，再说说它在什么情景下可以使用。', 'Listen to a sentence from this lesson without reading it. Try to repeat it and explain when you might use it.')}</p><div class="dictionary-audio"><button class="primary" data-study-speak="${esc(line.de)}">${icon('volume')}${t('播放句子 · 1×', 'Play · 1×')}</button><button class="secondary" data-study-speak="${esc(line.de)}" data-rate-speed="0.8">${t('慢速再听 · 0.8×', 'Listen slowly · 0.8×')}</button></div><details><summary>${t('查看原句与注释', 'Reveal the sentence and meaning')}</summary><p lang="de">${esc(line.de)}</p><p>${esc(line[state.lang === 'en' ? 'en' : 'zh'])}</p><p class="small muted">${t('说话人：', 'Speaker: ')}${esc(line.speaker)}</p></details><p class="privacy-note">${t('使用固定课程音频，同一文件以 1× 或精确 0.8× 播放；不是歌德官方考试录音。', 'Uses a fixed course clip, played from the same file at exact 1× or 0.8×; this is not official Goethe exam audio.')}</p>${disclaimer}`);
    return;
  }

  if (kind === 'speak') {
    modal(`${u.level} · Sprechen`, `${badge}<h3>${t('先跟读，再独立表达', 'Repeat first, then speak for yourself')}</h3><p>${esc(tr(lesson.oral))}</p>${lesson.rubric?.length ? `<h3>${t('练习后，检查这几点', 'After practice, check these points')}</h3><ul>${lesson.rubric.map(item => `<li>${esc(tr(item))}</li>`).join('')}</ul>` : ''}<button class="primary spaced" data-go-oral="${u.id}">${icon('message')}${t('进入本课跟读练习', 'Open this lesson’s speaking practice')}${icon('arrow')}</button><p class="privacy-note">${t('支持正常或精确 0.8× 慢速示范、重复播放与自查提示；不采集麦克风录音，也不自动评判发音或提供考试分数。', 'Includes normal or exact 0.8× examples, repetition and self-check prompts. Klar does not collect microphone recordings or score pronunciation or exam performance.')}</p>${disclaimer}`);
  }
};

document.addEventListener('click', async event => {
  const button = event.target.closest('button[data-go-oral]');
  if (!button || button.disabled || dialogClosing) return;
  const id = button.dataset.goOral;
  if (!UNITS.some(u => u.id === id)) return;
  button.disabled = true;
  await closeModal();
  setUnit(id, 0, 'speaking');
});
