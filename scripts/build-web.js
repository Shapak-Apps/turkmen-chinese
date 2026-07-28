/**
 * Build static HTML preview with embedded course data.
 * Run: node scripts/build-web.js
 * Output: web/index.html (open in browser, no server needed)
 */

const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "assets", "data", "course_content.json");
const outPath = path.join(__dirname, "..", "web", "index.html");

const json = fs.readFileSync(dataPath, "utf-8");
// Minify JSON to reduce file size
const minified = JSON.stringify(JSON.parse(json));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hytaý dili 1 — Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; color: #11181C; }
.app { max-width: 900px; margin: 0 auto; min-height: 100vh; background: #fff; position: relative; box-shadow: 0 0 40px rgba(0,0,0,.08); }
.screen { display: none; }
.screen.active { display: block; }
.header { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid rgba(0,0,0,.1); position: sticky; top: 0; background: #fff; z-index: 10; }
.header .back { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; background: none; font-size: 20px; border-radius: 10px; }
.header .back:hover { background: #f0f0f0; }
.header .title-wrap { flex: 1; text-align: center; }
.header .title { font-size: 20px; font-weight: 700; }
.header .subtitle { font-size: 13px; color: #6b7280; margin-top: 2px; }
.header .spacer { width: 40px; }
.card { display: flex; align-items: center; padding: 18px; border-radius: 16px; border: 2px solid rgba(0,0,0,.1); background: #fff; margin-bottom: 12px; gap: 14px; cursor: pointer; transition: transform .1s, box-shadow .1s; }
.card:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.08); }
.card:active { transform: scale(.98); }
.card-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #fff; font-weight: 800; flex-shrink: 0; }
.card-content { flex: 1; min-width: 0; }
.card-title { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
.card-subtitle { font-size: 13px; color: #6b7280; }
.card .chevron { color: #6b7280; font-size: 18px; }
.ch-num { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #fff; flex-shrink: 0; }
.scroll { padding: 20px; padding-bottom: 40px; }
.chapter-info { text-align: center; padding: 20px 20px 0; margin-bottom: 30px; }
.chapter-label { font-size: 14px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.chapter-title { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
.chapter-meta { font-size: 14px; color: #6b7280; }
.tabs { display: flex; border-bottom: 2px solid rgba(0,0,0,.1); position: sticky; top: 55px; background: #fff; z-index: 9; }
.tab { flex: 1; padding: 12px; text-align: center; cursor: pointer; font-weight: 600; font-size: 14px; color: #6b7280; border-bottom: 3px solid transparent; transition: .2s; }
.tab:hover { color: #11181C; }
.tab.active { color: #ff4900; border-bottom-color: #ff4900; }
.tab-content { display: none; padding: 20px; }
.tab-content.active { display: block; }
.placeholder { text-align: center; padding: 60px 20px; color: #6b7280; }
.placeholder .icon { font-size: 64px; opacity: .3; margin-bottom: 16px; }
.placeholder .ph-title { font-size: 22px; font-weight: 700; color: #11181C; margin-bottom: 8px; }
.exercise { border: 2px solid rgba(0,0,0,.08); border-radius: 14px; padding: 16px; margin-bottom: 14px; background: #fafafa; }
.exercise-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.exercise-type { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; padding: 4px 10px; border-radius: 20px; color: #fff; }
.exercise-id { font-size: 11px; color: #aaa; }
.exercise-prompt { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
.exercise-pinyin { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
.exercise-instruction { font-size: 13px; color: #6b7280; font-style: italic; margin-bottom: 10px; }
.options { display: flex; flex-direction: column; gap: 6px; }
.option { padding: 10px 14px; border: 1px solid rgba(0,0,0,.1); border-radius: 10px; font-size: 14px; background: #fff; }
.option.correct { border-color: #34C759; background: #34C75910; }
.grammar-rule { background: #FFFDF0; border: 2px solid #FFE066; border-radius: 12px; padding: 14px; margin-bottom: 12px; }
.grammar-rule h4 { font-size: 16px; margin-bottom: 6px; }
.grammar-rule p { font-size: 14px; color: #333; line-height: 1.5; }
.grammar-examples { margin-top: 10px; }
.grammar-example { padding: 6px 0; border-bottom: 1px solid #f0e8c8; font-size: 14px; }
.grammar-example:last-child { border: none; }
.grammar-practice { margin-top: 10px; padding: 10px; background: #fff; border-radius: 8px; }
.grammar-practice .gp-q { font-weight: 600; margin-bottom: 6px; font-size: 14px; }
.pairs { display: flex; flex-direction: column; gap: 6px; }
.pair { display: flex; gap: 8px; font-size: 14px; }
.pair-left { flex: 1; padding: 8px 12px; background: #E8F4FD; border-radius: 8px; font-weight: 600; text-align: center; }
.pair-right { flex: 1; padding: 8px 12px; background: #FFF3E0; border-radius: 8px; text-align: center; }
.fill-sentence { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.fill-answer { font-size: 14px; color: #34C759; font-weight: 600; }
.lesson-sep { font-size: 16px; font-weight: 700; padding: 12px 0; margin-top: 10px; border-bottom: 2px solid #ff490030; color: #ff4900; }
.stats { display: flex; gap: 8px; padding: 12px 20px; background: #fafafa; border-bottom: 1px solid rgba(0,0,0,.06); flex-wrap: wrap; }
.stat { font-size: 12px; padding: 4px 10px; border-radius: 20px; background: #fff; border: 1px solid rgba(0,0,0,.1); }
.stat b { color: #ff4900; }
.type-grammar { background: #AF52DE; }
.type-flashcard { background: #FF9F0A; }
.type-multiple_choice { background: #007AFF; }
.type-listening_mc { background: #34C759; }
.type-fill_blank { background: #FF3B30; }
.type-match_pairs { background: #5856D6; }
.type-single_response { background: #FF6B6B; }
.home-title { font-size: 28px; font-weight: 800; text-align: center; margin-bottom: 32px; padding-top: 40px; }
.about-section { margin-bottom: 28px; }
.about-h2 { font-size: 22px; font-weight: 800; margin-bottom: 12px; }
.about-p { font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px; }
.about-fact { display: flex; gap: 12px; padding: 14px; border-radius: 14px; background: #f8f9fa; margin-bottom: 10px; align-items: flex-start; font-size: 14px; line-height: 1.5; color: #555; }
.about-fact-icon { font-size: 28px; }
.about-fact b { color: #11181C; display: block; margin-bottom: 4px; font-size: 16px; }
.tone-table { width: 100%; border-collapse: collapse; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,.1); margin: 12px 0; }
.tone-table td { padding: 12px; border-bottom: 1px solid rgba(0,0,0,.06); }
.tone-label { font-weight: 600; color: #555; }
.tone-hz { font-size: 24px; font-weight: 700; text-align: center; }
.tone-py { text-align: center; color: #ff4900; font-size: 16px; }
.tone-en { text-align: right; color: #555; }
.about-example { text-align: center; padding: 24px; border-radius: 16px; background: #FFF8F0; border: 2px solid #FFE0B2; margin: 12px 0; }
.about-ex-hz { font-size: 40px; font-weight: 800; }
.about-ex-py { font-size: 20px; color: #ff4900; margin-top: 4px; }
.about-ex-en { font-size: 16px; color: #555; margin-top: 4px; }
.num-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
.num-cell { text-align: center; padding: 10px; border-radius: 12px; background: #f0f7ff; border: 1px solid #d0e4f7; width: calc(20% - 7px); }
.num-hz { display: block; font-size: 24px; font-weight: 700; }
.num-py { display: block; font-size: 12px; color: #ff4900; margin-top: 2px; }
.num-n { display: block; font-size: 11px; color: #999; margin-top: 2px; }
.about-level { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 12px; background: #f8f9fa; margin-bottom: 8px; font-size: 14px; line-height: 1.5; color: #555; }
.about-badge1 { font-size: 14px; font-weight: 800; color: #fff; background: #ff4900; padding: 6px 12px; border-radius: 8px; white-space: nowrap; }
.about-badge2 { font-size: 14px; font-weight: 800; color: #fff; background: #FF9F0A; padding: 6px 12px; border-radius: 8px; white-space: nowrap; }
.about-tip { font-size: 15px; line-height: 1.5; color: #333; margin-bottom: 10px; padding: 8px 16px; border-left: 3px solid #ff4900; }
.th-section { margin-bottom: 28px; }
.th-section h2 { font-size: 22px; font-weight: 800; margin-bottom: 12px; }
.th-body { font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 12px; white-space: pre-line; }
.th-word-table { border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,.1); }
.th-word-row { display: flex; align-items: center; padding: 12px 14px; border-bottom: 1px solid rgba(0,0,0,.06); gap: 8px; cursor: pointer; }
.th-word-row:hover { background: #f8f8f8; }
.th-word-row:last-child { border-bottom: none; }
.th-word-hz { font-size: 22px; font-weight: 700; width: 65px; }
.th-word-py { font-size: 14px; color: #ff4900; width: 90px; }
.th-word-tr { flex: 1; font-size: 14px; color: #555; }
.th-word-speaker { font-size: 16px; color: #999; cursor: pointer; }
.th-examples { border-radius: 14px; overflow: hidden; border: 1px solid #FFE0B2; background: #FFF8F0; }
.th-ex-row { display: flex; align-items: center; padding: 10px 14px; border-bottom: 1px solid #FFE0B2; gap: 8px; cursor: pointer; }
.th-ex-row:hover { background: #FFF0E0; }
.th-ex-row:last-child { border-bottom: none; }
.th-ex-text { flex: 1; }
.th-ex-hz { font-size: 20px; font-weight: 700; }
.th-ex-py { font-size: 14px; color: #ff4900; margin-top: 2px; }
.th-ex-tr { font-size: 13px; color: #555; margin-top: 2px; }
.th-dialogue { display: flex; flex-direction: column; gap: 8px; }
.th-dl-line { display: flex; align-items: flex-start; padding: 12px; border-radius: 14px; gap: 10px; cursor: pointer; }
.th-dl-line:hover { opacity: .85; }
.th-dl-a { background: #f0f7ff; }
.th-dl-b { background: #f0fff4; }
.th-speaker { width: 32px; height: 32px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px; flex-shrink: 0; margin-top: 2px; }
.th-speaker-a { background: #4A90D9; }
.th-speaker-b { background: #34C759; }
.th-dl-content { flex: 1; }
.th-dl-hz { font-size: 18px; font-weight: 700; }
.th-dl-py { font-size: 14px; color: #ff4900; margin-top: 2px; }
.th-dl-tr { font-size: 13px; color: #555; margin-top: 2px; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
</style>
</head>
<body>
<div class="app" id="app">
  <div class="screen active" id="screen-home">
    <div class="scroll">
      <div class="home-title">Hytaý dili 1</div>
      <div class="card" onclick="showWelcome()">
        <div class="card-icon" style="background:#007AFF">&#9995;</div>
        <div class="card-content">
          <div class="card-title">Welcome</div>
          <div class="card-subtitle">About the app &amp; Chinese language</div>
        </div>
        <span class="chevron">&#8250;</span>
      </div>
      <div class="card" onclick="showChapters(1)">
        <div class="card-icon" style="background:#ff4900">1</div>
        <div class="card-content">
          <div class="card-title">HSK 1</div>
          <div class="card-subtitle">Chapters 1-15 &middot; 150 words &middot; Beginner</div>
        </div>
        <span class="chevron">&#8250;</span>
      </div>
      <div class="card" onclick="showChapters(2)">
        <div class="card-icon" style="background:#FF9F0A">2</div>
        <div class="card-content">
          <div class="card-title">HSK 2</div>
          <div class="card-subtitle">Chapters 16-30 &middot; 150 new words &middot; Elementary</div>
        </div>
        <span class="chevron">&#8250;</span>
      </div>
    </div>
  </div>
  <div class="screen" id="screen-welcome">
    <div class="header">
      <button class="back" onclick="goHome()">&#8592;</button>
      <div class="title-wrap">
        <div class="title">Welcome</div>
      </div>
      <div class="spacer"></div>
    </div>
    <div class="scroll">
      <div class="card" onclick="showAbout('app')">
        <div class="card-icon" style="background:#007AFF">&#9432;</div>
        <div class="card-content">
          <div class="card-title">About the App</div>
          <div class="card-subtitle">How to use, lesson structure, progress</div>
        </div>
        <span class="chevron">&#8250;</span>
      </div>
      <div class="card" onclick="showAbout('chinese')">
        <div class="card-icon" style="background:#FF3B30">&#35328;</div>
        <div class="card-content">
          <div class="card-title">About Chinese Language</div>
          <div class="card-subtitle">What is Mandarin, tones, pinyin, how to learn</div>
        </div>
        <span class="chevron">&#8250;</span>
      </div>
    </div>
  </div>
  <div class="screen" id="screen-about">
    <div class="header">
      <button class="back" onclick="showWelcome()">&#8592;</button>
      <div class="title-wrap">
        <div class="title" id="about-title"></div>
      </div>
      <div class="spacer"></div>
    </div>
    <div class="scroll" id="about-content"></div>
  </div>
  <div class="screen" id="screen-chapters">
    <div class="header">
      <button class="back" onclick="goHome()">&#8592;</button>
      <div class="title-wrap">
        <div class="title" id="chapters-title">HSK 1</div>
        <div class="subtitle" id="chapters-subtitle">Beginner</div>
      </div>
      <div class="spacer"></div>
    </div>
    <div class="scroll" id="chapters-list"></div>
  </div>
  <div class="screen" id="screen-detail">
    <div class="header">
      <button class="back" onclick="goChapters()">&#8592;</button>
      <div class="title-wrap">
        <div class="title" id="detail-title"></div>
        <div class="subtitle" id="detail-subtitle"></div>
      </div>
      <div class="spacer"></div>
    </div>
    <div class="stats" id="detail-stats"></div>
    <div class="tabs">
      <div class="tab active" onclick="switchTab('theory',this)">Theory</div>
      <div class="tab" onclick="switchTab('exercises',this)">Exercises</div>
    </div>
    <div class="tab-content active" id="tab-theory"></div>
    <div class="tab-content" id="tab-exercises"></div>
  </div>
</div>
<script>
var DATA = INJECTED_DATA;
var currentLevel = 1;
function show(id) {
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
  document.getElementById('screen-'+id).classList.add('active');
  window.scrollTo(0,0);
}
function goHome(){show('home')}
function showWelcome(){show('welcome')}
function showAbout(type){
  var title=type==='app'?'About the App':'About Chinese Language';
  document.getElementById('about-title').textContent=title;
  var html='';
  if(type==='app'){
    html='<div class="placeholder"><div class="icon">&#9432;</div><div class="ph-title">About the App</div><p>Content will be added here.</p></div>';
  } else {
    html=renderAboutChinese();
  }
  document.getElementById('about-content').innerHTML=html;
  show('about');
}
function renderAboutChinese(){
  return '<div class="about-section"><h2 class="about-h2">Что такое китайский язык?</h2>'+
  '<p class="about-p">Китайский (мандарин) — самый распространённый язык в мире: более 1 миллиарда носителей. Это официальный язык Китая, Тайваня и Сингапура.</p>'+
  '<p class="about-p">Официальное название — путунхуа (普通话), что означает &laquo;общая речь&raquo;. Он основан на пекинском диалекте и используется в образовании, СМИ и государственных учреждениях по всему Китаю.</p>'+
  '<p class="about-p">В Китае существует множество диалектов — кантонский, шанхайский, хоккиен и другие. Они настолько различаются, что носители разных диалектов могут не понимать друг друга на слух. Но путунхуа понимают везде, и именно его мы изучаем в этом приложении.</p>'+
  '<p class="about-p">Китайский — один из шести официальных языков ООН. Его изучают более 100 миллионов человек по всему миру как иностранный язык.</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Чем китайский отличается?</h2>'+
  '<div class="about-fact"><span class="about-fact-icon">&#128292;</span><div><b>Нет алфавита</b><br>В китайском используются иероглифы (汉字). Каждый иероглиф — это слово или часть слова. Основных иероглифов около 3 500, и этого достаточно чтобы читать газету. Для HSK 1-2 нужно знать всего около 300 иероглифов.</div></div>'+
  '<div class="about-fact"><span class="about-fact-icon">&#127925;</span><div><b>Тональный язык</b><br>Один и тот же звук с разными тонами означает совершенно разные слова. Всего 4 тона + 1 нейтральный. Это самая непривычная часть для новичков, но она быстро осваивается с практикой.</div></div>'+
  '<div class="about-fact"><span class="about-fact-icon">&#128208;</span><div><b>Простая грамматика</b><br>Нет спряжений глаголов, нет рода, нет множественного числа, нет артиклей. Глагол всегда одинаковый: &laquo;я иду&raquo;, &laquo;он иду&raquo;, &laquo;они иду&raquo; — 我去, 他去, 他们去. Порядок слов: Подлежащее-Сказуемое-Дополнение.</div></div>'+
  '<div class="about-fact"><span class="about-fact-icon">&#128300;</span><div><b>Логичные слова</b><br>Многие слова составлены из простых частей. Например: 电 (электричество) + 脑 (мозг) = 电脑 (компьютер). 火 (огонь) + 车 (машина) = 火车 (поезд). Зная базовые иероглифы, можно угадать значение сложных слов.</div></div>'+
  '<div class="about-fact"><span class="about-fact-icon">&#128336;</span><div><b>Время без спряжений</b><br>Прошедшее, настоящее и будущее время выражаются не через изменение глагола, а через частицы и контекст. &laquo;Я вчера ел&raquo; и &laquo;я завтра ем&raquo; — глагол 吃 (есть) не меняется. Это намного проще, чем в европейских языках.</div></div></div>'+

  '<div class="about-section"><h2 class="about-h2">4 тона китайского</h2>'+
  '<p class="about-p">Тоны — самая важная часть произношения. Один слог &laquo;ma&raquo; может означать 4 разных слова:</p>'+
  '<table class="tone-table"><tr><td class="tone-label">1-й — ровный</td><td class="tone-hz">妈</td><td class="tone-py">m&#257;</td><td class="tone-en">мама</td></tr>'+
  '<tr><td class="tone-label">2-й — восходящий</td><td class="tone-hz">麻</td><td class="tone-py">m&#225;</td><td class="tone-en">конопля</td></tr>'+
  '<tr><td class="tone-label">3-й — нисх.-восх.</td><td class="tone-hz">马</td><td class="tone-py">m&#462;</td><td class="tone-en">лошадь</td></tr>'+
  '<tr><td class="tone-label">4-й — нисходящий</td><td class="tone-hz">骂</td><td class="tone-py">m&#224;</td><td class="tone-en">ругать</td></tr></table>'+
  '<p class="about-p">Первый тон — голос ровный и высокий, как будто вы поёте одну ноту. Второй тон — голос поднимается вверх, как когда вы удивлённо спрашиваете &laquo;Да?&raquo;. Третий тон — голос сначала опускается, потом поднимается, как когда вы задумчиво говорите &laquo;Хм...&raquo;. Четвёртый тон — голос резко падает, как строгая команда &laquo;Нет!&raquo;.</p>'+
  '<p class="about-p">Есть ещё нейтральный тон (лёгкий) — он короткий и безударный, используется в конце некоторых слов. Например: 妈妈 (m&#257;ma) — второй слог произносится легко, без выраженного тона.</p>'+
  '<p class="about-p">Не переживайте! С практикой тоны становятся естественными.</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Что такое пиньинь?</h2>'+
  '<p class="about-p">Пиньинь (拼音) — официальная система записи произношения китайских слов латинскими буквами (A-Z). Она была создана в 1958 году для упрощения изучения китайского.</p>'+
  '<div class="about-example"><div class="about-ex-hz">你好</div><div class="about-ex-py">n&#464; h&#462;o</div><div class="about-ex-en">Привет</div></div>'+
  '<p class="about-p">Большинство букв читаются как в латинице, но есть важные отличия:</p>'+
  '<p class="about-p">&bull; <b>c</b> читается как &laquo;ц&raquo; (не &laquo;к&raquo;)<br>&bull; <b>q</b> читается как мягкое &laquo;ч&raquo;<br>&bull; <b>x</b> читается как мягкое &laquo;с&raquo; (между &laquo;с&raquo; и &laquo;ш&raquo;)<br>&bull; <b>zh</b> читается как &laquo;дж&raquo;<br>&bull; <b>sh</b> читается как &laquo;ш&raquo;<br>&bull; <b>r</b> читается как мягкое &laquo;ж&raquo;</p>'+
  '<p class="about-p">В этом приложении каждое слово показывается с иероглифом и пиньинем, чтобы вы учили произношение шаг за шагом.</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Как устроены иероглифы</h2>'+
  '<p class="about-p">Иероглифы состоят из черт (штрихов). Базовых черт всего 8: горизонтальная, вертикальная, откидная влево, откидная вправо, точка, крюк, ломаная, поднимающаяся.</p>'+
  '<p class="about-p">Многие иероглифы содержат ключи (радикалы) — смысловые элементы, которые подсказывают значение:</p>'+
  '<p class="about-p">&bull; 氵(вода) — в словах: 河 (река), 海 (море), 湖 (озеро)<br>&bull; 木 (дерево) — в словах: 林 (лес), 森 (чаща), 桌 (стол)<br>&bull; 口 (рот) — в словах: 吃 (есть), 喝 (пить), 叫 (звать)<br>&bull; 女 (женщина) — в словах: 妈 (мама), 姐 (сестра), 好 (хороший)</p>'+
  '<p class="about-p">Порядок написания черт важен! Общее правило: сверху вниз, слева направо. Правильный порядок помогает писать быстрее и узнавать иероглифы.</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Китайские числа</h2>'+
  '<p class="about-p">Китайские числа очень логичны. Выучив 1-10, можно считать до 99:</p>'+
  '<div class="num-grid">'+
  '<div class="num-cell"><span class="num-hz">一</span><span class="num-py">y&#299;</span><span class="num-n">1</span></div>'+
  '<div class="num-cell"><span class="num-hz">二</span><span class="num-py">&#232;r</span><span class="num-n">2</span></div>'+
  '<div class="num-cell"><span class="num-hz">三</span><span class="num-py">s&#257;n</span><span class="num-n">3</span></div>'+
  '<div class="num-cell"><span class="num-hz">四</span><span class="num-py">s&#236;</span><span class="num-n">4</span></div>'+
  '<div class="num-cell"><span class="num-hz">五</span><span class="num-py">w&#468;</span><span class="num-n">5</span></div>'+
  '<div class="num-cell"><span class="num-hz">六</span><span class="num-py">li&#249;</span><span class="num-n">6</span></div>'+
  '<div class="num-cell"><span class="num-hz">七</span><span class="num-py">q&#299;</span><span class="num-n">7</span></div>'+
  '<div class="num-cell"><span class="num-hz">八</span><span class="num-py">b&#257;</span><span class="num-n">8</span></div>'+
  '<div class="num-cell"><span class="num-hz">九</span><span class="num-py">ji&#468;</span><span class="num-n">9</span></div>'+
  '<div class="num-cell"><span class="num-hz">十</span><span class="num-py">sh&#237;</span><span class="num-n">10</span></div></div>'+
  '<p class="about-p">Принцип простой — называете десятки, потом единицы:</p>'+
  '<p class="about-p">&bull; 11 = 十一 (sh&#237; y&#299;) — &laquo;десять-один&raquo;<br>&bull; 20 = 二十 (&#232;r sh&#237;) — &laquo;два-десять&raquo;<br>&bull; 35 = 三十五 (s&#257;n sh&#237; w&#468;) — &laquo;три-десять-пять&raquo;<br>&bull; 99 = 九十九 (ji&#468; sh&#237; ji&#468;) — &laquo;девять-десять-девять&raquo;</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Первые фразы</h2>'+
  '<p class="about-p">Вот несколько фраз, которые вы выучите в первых главах:</p>'+
  '<table class="tone-table">'+
  '<tr><td class="tone-hz">你好</td><td class="tone-py">n&#464; h&#462;o</td><td class="tone-en">Привет</td></tr>'+
  '<tr><td class="tone-hz">谢谢</td><td class="tone-py">xi&#232;xie</td><td class="tone-en">Спасибо</td></tr>'+
  '<tr><td class="tone-hz">再见</td><td class="tone-py">z&#224;iji&#224;n</td><td class="tone-en">До свидания</td></tr>'+
  '<tr><td class="tone-hz">对不起</td><td class="tone-py">du&#236;buq&#464;</td><td class="tone-en">Извините</td></tr>'+
  '<tr><td class="tone-hz">我叫...</td><td class="tone-py">w&#466; ji&#224;o...</td><td class="tone-en">Меня зовут...</td></tr>'+
  '<tr><td class="tone-hz">你好吗?</td><td class="tone-py">n&#464; h&#462;o ma?</td><td class="tone-en">Как дела?</td></tr>'+
  '<tr><td class="tone-hz">很好</td><td class="tone-py">h&#283;n h&#462;o</td><td class="tone-en">Очень хорошо</td></tr>'+
  '<tr><td class="tone-hz">我不懂</td><td class="tone-py">w&#466; b&#249; d&#466;ng</td><td class="tone-en">Я не понимаю</td></tr></table></div>'+

  '<div class="about-section"><h2 class="about-h2">Порядок слов в предложении</h2>'+
  '<p class="about-p">Китайский имеет фиксированный порядок слов: Подлежащее + Сказуемое + Дополнение (как в английском).</p>'+
  '<div class="about-example"><div class="about-ex-hz">我 喝 茶</div><div class="about-ex-py">w&#466; h&#275; ch&#225;</div><div class="about-ex-en">Я пью чай (Я + пить + чай)</div></div>'+
  '<p class="about-p">Время и место ставятся ПЕРЕД глаголом (не после, как в русском):</p>'+
  '<div class="about-example"><div class="about-ex-hz">我 明天 去 北京</div><div class="about-ex-py">w&#466; m&#237;ngti&#257;n q&#249; B&#283;ij&#299;ng</div><div class="about-ex-en">Я завтра поеду в Пекин (Я + завтра + ехать + Пекин)</div></div>'+
  '<p class="about-p">Вопрос можно задать просто добавив частицу 吗 (ma) в конец:</p>'+
  '<p class="about-p">&bull; 你好. (N&#464; h&#462;o.) = Привет.<br>&bull; 你好吗? (N&#464; h&#462;o ma?) = Как дела?</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Как устроено обучение</h2>'+
  '<p class="about-p">Приложение следует стандарту HSK (汉语水平考试) — официальной системе оценки уровня китайского языка, признанной во всём мире:</p>'+
  '<div class="about-level"><span class="about-badge1">HSK 1</span> 150 слов, 15 глав. Приветствия, числа, время, семья, еда, транспорт, простые предложения</div>'+
  '<div class="about-level"><span class="about-badge2">HSK 2</span> 300 слов (всего), 15 глав. Сравнения, прошедшее время, направления, просьбы, более сложная грамматика</div>'+
  '<p class="about-p">Каждая глава состоит из 3 частей:</p>'+
  '<p class="about-p"><b>1. Теория</b> — новые слова, грамматические правила и примеры<br><b>2. Упражнения</b> — практика через разные типы заданий (карточки, выбор ответа, заполнение пропусков, соединение пар, грамматика)<br><b>3. Тест</b> — 15 случайных вопросов, наберите 70% чтобы завершить главу</p></div>'+

  '<div class="about-section"><h2 class="about-h2">Советы по изучению</h2>'+
  '<div class="about-tip">Слушайте тоны внимательно с самого начала. Неправильные привычки потом трудно исправить. Повторяйте вслух за каждым примером.</div>'+
  '<div class="about-tip">Учите иероглифы постепенно. Лучше 5 иероглифов в день, но твёрдо, чем 50 которые забудутся через неделю.</div>'+
  '<div class="about-tip">Занимайтесь каждый день, хотя бы 10 минут. Регулярность важнее длинных занятий. Мозг лучше запоминает при частом повторении с перерывами.</div>'+
  '<div class="about-tip">Не бойтесь ошибок. Каждая ошибка — это момент обучения. Китайцы всегда рады, когда иностранцы пытаются говорить на их языке.</div>'+
  '<div class="about-tip">Если набрали меньше 100% в тесте — вернитесь и пройдите снова. Повторение — ключ к запоминанию.</div>'+
  '<div class="about-tip">Учите слова в контексте, а не изолированно. Фраза запоминается лучше, чем отдельное слово. Вместо просто &laquo;喝&raquo; (пить) запомните &laquo;我喝茶&raquo; (я пью чай).</div></div>';
}
function goChapters(){showChapters(currentLevel)}
function showChapters(level) {
  currentLevel=level;
  document.getElementById('chapters-title').textContent='HSK '+level;
  document.getElementById('chapters-subtitle').textContent=level===1?'Beginner \\u00b7 150 words':'Elementary \\u00b7 150 new words';
  var chapters=DATA.chapters.filter(function(ch){return level===1?(ch.id>=0&&ch.id<=15):(ch.id>=16&&ch.id<=30)});
  var color=level===1?'#ff4900':'#FF9F0A';
  var list=document.getElementById('chapters-list');
  list.innerHTML=chapters.map(function(ch){
    var totalQ=ch.lessons.reduce(function(s,l){return s+l.questions.length},0);
    var displayNum=level===1?ch.id:ch.id-15;
    return '<div class="card" onclick="showDetail('+ch.id+')"><div class="ch-num" style="background:'+color+'">'+displayNum+'</div><div class="card-content"><div class="card-title">'+esc(ch.title)+'</div><div class="card-subtitle">'+ch.lessons.length+' lessons &middot; '+totalQ+' exercises</div></div><span class="chevron">&#8250;</span></div>';
  }).join('');
  show('chapters');
}
function showDetail(chId) {
  var ch=DATA.chapters.find(function(c){return c.id===chId});
  if(!ch)return;
  var totalQ=ch.lessons.reduce(function(s,l){return s+l.questions.length},0);
  document.getElementById('detail-title').textContent=ch.title;
  document.getElementById('detail-subtitle').textContent=ch.description||'';
  var types={};
  ch.lessons.forEach(function(l){l.questions.forEach(function(q){types[q.type]=(types[q.type]||0)+1})});
  document.getElementById('detail-stats').innerHTML='<div class="stat"><b>'+ch.lessons.length+'</b> lessons</div><div class="stat"><b>'+totalQ+'</b> exercises</div>'+Object.keys(types).map(function(t){return '<div class="stat"><b>'+types[t]+'</b> '+t+'</div>'}).join('');
  if(ch.id===0){
    document.getElementById('tab-theory').innerHTML=renderPronunciation();
    document.getElementById('tab-exercises').innerHTML='';
    document.querySelector('.tabs').style.display='none';
    document.getElementById('detail-stats').innerHTML='<div class="stat"><b>9</b> sections</div><div class="stat">Interactive pronunciation guide</div>';
  } else {
    document.querySelector('.tabs').style.display='';
    document.getElementById('tab-theory').innerHTML=renderTheory(ch.id);
    var html='';
    ch.lessons.forEach(function(lesson){
      html+='<div class="lesson-sep">Lesson: '+esc(lesson.title)+' ('+lesson.questions.length+'q)</div>';
      lesson.questions.forEach(function(q){html+=renderQuestion(q)});
    });
    document.getElementById('tab-exercises').innerHTML=html;
  }
  document.querySelectorAll('.tabs .tab').forEach(function(t,i){t.classList.toggle('active',i===0)});
  document.querySelectorAll('.tab-content').forEach(function(t,i){t.classList.toggle('active',i===0)});
  show('detail');
}
function switchTab(name,el){
  document.querySelectorAll('.tabs .tab').forEach(function(t){t.classList.remove('active')});
  el.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(function(t){t.classList.remove('active')});
  document.getElementById('tab-'+name).classList.add('active');
}
function renderQuestion(q){
  var inner='';
  var typeLabel=q.type.replace(/_/g,' ');
  switch(q.type){
    case 'grammar':inner=renderGrammar(q);break;
    case 'flashcard':inner=renderFlashcard(q);break;
    case 'multiple_choice':inner=renderMC(q);break;
    case 'listening_mc':inner=renderListeningMC(q);break;
    case 'fill_blank':inner=renderFillBlank(q);break;
    case 'match_pairs':inner=renderMatchPairs(q);break;
    case 'single_response':inner=renderSingleResponse(q);break;
    default:inner='<pre>'+esc(JSON.stringify(q,null,2))+'</pre>';
  }
  return '<div class="exercise"><div class="exercise-header"><span class="exercise-type type-'+q.type+'">'+typeLabel+'</span><span class="exercise-id">#'+q.id+'</span></div>'+inner+'</div>';
}
function renderGrammar(q){
  var r=q.rule;var h='<div class="grammar-rule"><h4>'+esc(r.title)+'</h4><p>'+esc(r.explanation)+'</p><div class="grammar-examples">';
  r.examples.forEach(function(ex){h+='<div class="grammar-example"><b>'+esc(ex.hanzi)+'</b> <span style="color:#6b7280">'+esc(ex.pinyin)+'</span> &mdash; '+esc(ex.english)+'</div>'});
  h+='</div></div>';
  if(q.practice&&q.practice.length>0){q.practice.forEach(function(p){
    h+='<div class="grammar-practice"><div class="gp-q">'+esc(p.question)+'</div><div class="options">';
    p.options.forEach(function(o){var c=o.id===p.correctOptionId;h+='<div class="option '+(c?'correct':'')+'">'+(c?'&#10003; ':'')+esc(o.text)+'</div>'});
    h+='</div></div>';
  })}
  return h;
}
function renderFlashcard(q){
  var h='<div class="exercise-prompt">'+esc(q.mandarin.hanzi)+'</div><div class="exercise-pinyin">'+esc(q.mandarin.pinyin)+'</div>';
  if(q.instruction)h+='<div class="exercise-instruction">'+esc(q.instruction)+'</div>';
  h+='<div class="options">';
  q.options.forEach(function(o){var c=o.id===q.correctOptionId;h+='<div class="option '+(c?'correct':'')+'">'+(c?'&#10003; ':'')+esc(o.english)+' &mdash; '+esc(o.hanzi)+' ('+esc(o.pinyin)+')</div>'});
  h+='</div>';return h;
}
function renderMC(q){
  var h='<div class="exercise-prompt">'+esc(q.mandarin.hanzi)+'</div><div class="exercise-pinyin">'+esc(q.mandarin.pinyin)+'</div><div class="options">';
  q.options.forEach(function(o){h+='<div class="option"><span class="opt-label">'+esc(o.english)+'</span><br><small style="color:#6b7280">'+esc(o.mandarin.hanzi)+' ('+esc(o.mandarin.pinyin)+')</small></div>'});
  h+='</div>';return h;
}
function renderListeningMC(q){
  var h='<div class="exercise-prompt">'+esc(q.mandarin.hanzi)+'</div><div class="exercise-pinyin">'+esc(q.mandarin.pinyin)+'</div><div class="options">';
  q.options.forEach(function(o){var c=o.id===q.correctOptionId;h+='<div class="option '+(c?'correct':'')+'">'+(c?'&#10003; ':'')+esc(o.english)+'</div>'});
  h+='</div>';return h;
}
function renderFillBlank(q){
  var h='';if(q.instruction)h+='<div class="exercise-instruction">'+esc(q.instruction)+'</div>';
  h+='<div class="fill-sentence">'+esc(q.sentence)+'</div><div class="exercise-pinyin">'+esc(q.sentencePinyin)+'</div><div class="fill-answer">Answer: '+esc(q.correctAnswer)+' ('+esc(q.blankedWord)+')</div>';
  if(q.hint)h+='<div style="font-size:12px;color:#aaa;margin-top:4px">Hint: '+esc(q.hint)+'</div>';
  return h;
}
function renderMatchPairs(q){
  var h='';if(q.instruction)h+='<div class="exercise-instruction">'+esc(q.instruction)+'</div>';
  h+='<div class="pairs">';
  q.pairs.forEach(function(p){h+='<div class="pair"><div class="pair-left">'+esc(p.left)+(p.leftPinyin?'<br><small>'+esc(p.leftPinyin)+'</small>':'')+'</div><div class="pair-right">'+esc(p.right)+'</div></div>'});
  h+='</div>';return h;
}
function renderSingleResponse(q){
  var o=q.options[0];
  return '<div class="exercise-prompt">'+esc(q.mandarin.hanzi)+'</div><div class="exercise-pinyin">'+esc(q.mandarin.pinyin)+'</div><div class="option correct">&#10003; '+esc(o.english)+'<br><small style="color:#6b7280">'+esc(o.mandarin.hanzi)+' ('+esc(o.mandarin.pinyin)+')</small></div>';
}
function esc(s){return s==null?'':String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function speakZh(text){if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(text);u.lang='zh-CN';u.rate=0.8;speechSynthesis.speak(u)}}
function playPy(f){var a=new Audio('https://raw.githubusercontent.com/davinfifield/mp3-chinese-pinyin-sound/master/mp3/'+f+'.mp3');a.play().catch(function(){speakZh(f.replace(/[0-9]/g,''))})}
function renderPronunciation(){
var h='';
h+='<div class="th-section"><h2>Как устроен китайский слог</h2>';
h+='<p class="th-body">Китайский слог состоит из трёх частей:\\n\\n声母 (shēngmǔ) — инициаль (начальный согласный)\\n韵母 (yùnmǔ) — финаль (гласная часть)\\n声调 (shēngdiào) — тон\\n\\nИнициаль + Финаль + Тон = Слог</p>';
h+='<div class="about-example"><div class="about-ex-hz">声母 + 韵母 + 声调 = 音节</div><div class="about-ex-py">initial + final + tone = syllable</div></div></div>';
var initials=[
{g:"双唇音 Bilabial",items:[{i:"b",d:"bō",a:"bo1"},{i:"p",d:"pō",a:"po1"},{i:"m",d:"mō",a:"mo1"}]},
{g:"唇齿音 Labiodental",items:[{i:"f",d:"fō",a:"fo1"}]},
{g:"舌尖前音 Alveolar (blade)",items:[{i:"z",d:"zī",a:"zi1"},{i:"c",d:"cī",a:"ci1"},{i:"s",d:"sī",a:"si1"}]},
{g:"舌尖中音 Alveolar (tip)",items:[{i:"d",d:"dē",a:"de1"},{i:"t",d:"tē",a:"te1"},{i:"n",d:"nē",a:"ne1"},{i:"l",d:"lē",a:"le1"}]},
{g:"舌尖后音 Retroflex",items:[{i:"zh",d:"zhī",a:"zhi1"},{i:"ch",d:"chī",a:"chi1"},{i:"sh",d:"shī",a:"shi1"},{i:"r",d:"rì",a:"ri4"}]},
{g:"舌面音 Palatal",items:[{i:"j",d:"jī",a:"ji1"},{i:"q",d:"qī",a:"qi1"},{i:"x",d:"xī",a:"xi1"}]},
{g:"舌根音 Velar",items:[{i:"g",d:"gē",a:"ge1"},{i:"k",d:"kē",a:"ke1"},{i:"h",d:"hē",a:"he1"}]}
];
h+='<div class="th-section"><h2>21 инициаль (声母)</h2><p class="th-body">Инициаль — начальный согласный звук слога. Нажмите чтобы услышать.</p>';
initials.forEach(function(gr){
h+='<div style="margin-bottom:12px"><div style="font-weight:700;color:#ff4900;margin-bottom:6px">'+esc(gr.g)+'</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
gr.items.forEach(function(it){
h+='<div class="th-word-row" data-playpy="'+it.a+'" style="display:inline-flex;flex-direction:column;align-items:center;padding:10px 14px;border-radius:12px;background:#f0f7ff;border:1px solid #d0e4f7;cursor:pointer;min-width:64px">';
h+='<span style="font-size:20px;font-weight:700">'+esc(it.i)+'</span>';
h+='<span style="font-size:12px;color:#ff4900">'+esc(it.d)+'</span></div>';
});
h+='</div></div>';
});
h+='</div>';
var finals=[
{g:"单韵母 Simple Finals",items:["a:a1","o:o1","e:e1","i:yi1","u:wu1","ü:lv4"]},
{g:"复韵母 Compound Finals",items:["ai:ai1","ao:ao1","ou:ou1","ei:ei1","ia:ya1","ie:ye1","iao:yao1","iou(iu):you1","ua:wa1","uo:wo1","uai:wai1","uei(ui):wei1","üe:yue1"]},
{g:"鼻韵母 Nasal Finals",items:["an:an1","en:en1","in:yin1","ian:yan1","uan:wan1","uen(un):wen1","üan:yuan1","ang:ang1","eng:eng1","ing:ying1","iang:yang1","iong:yong1","uang:wang1","ong:dong1","ueng:weng1"]}
];
h+='<div class="th-section"><h2>38 финалей (韵母)</h2><p class="th-body">Финаль — гласная часть слога. Нажмите чтобы услышать.</p>';
finals.forEach(function(gr){
h+='<div style="margin-bottom:12px"><div style="font-weight:700;color:#ff4900;margin-bottom:6px">'+esc(gr.g)+'</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
gr.items.forEach(function(s){var p=s.split(':');
h+='<div data-playpy="'+p[1]+'" style="display:inline-flex;align-items:center;justify-content:center;padding:10px 14px;border-radius:12px;background:#f0f7ff;border:1px solid #d0e4f7;cursor:pointer;min-width:56px;font-size:18px;font-weight:700">'+esc(p[0])+'</div>';
});
h+='</div></div>';
});
h+='</div>';
var tones=[{t:"1",d:"Ровный высокий",py:"mā",hz:"妈",m:"мама",a:"ma1",c:"#FF4444"},
{t:"2",d:"Восходящий",py:"má",hz:"麻",m:"конопля",a:"ma2",c:"#44AA44"},
{t:"3",d:"Нисх.-восходящий",py:"mǎ",hz:"马",m:"лошадь",a:"ma3",c:"#4444FF"},
{t:"4",d:"Нисходящий",py:"mà",hz:"骂",m:"ругать",a:"ma4",c:"#AA44AA"}];
h+='<div class="th-section"><h2>4 тона (声调)</h2>';
h+='<p class="th-body">В китайском 4 основных тона. Один и тот же слог с разными тонами — разные слова!</p>';
h+='<div class="th-word-table">';
tones.forEach(function(t){
h+='<div class="th-word-row" data-playpy="'+t.a+'" style="gap:8px">';
h+='<span style="width:28px;height:28px;border-radius:14px;background:'+t.c+';color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0">'+t.t+'</span>';
h+='<span style="flex:1;font-size:13px;font-weight:600;color:#555">'+esc(t.d)+'</span>';
h+='<span style="font-size:24px;font-weight:700;width:30px;text-align:center">'+t.hz+'</span>';
h+='<span style="font-size:16px;color:#ff4900;width:36px">'+esc(t.py)+'</span>';
h+='<span style="font-size:13px;color:#555;width:60px;text-align:right">'+esc(t.m)+'</span>';
h+='<span class="th-word-speaker">&#128264;</span></div>';
});
h+='</div></div>';
var phrases=[
["你好。","Nǐ hǎo.","Привет."],["早上好。","Zǎoshang hǎo.","Доброе утро."],
["下午好。","Xiàwǔ hǎo.","Добрый день."],["晚上好。","Wǎnshang hǎo.","Добрый вечер."],
["晚安。","Wǎn\\'ān.","Спокойной ночи."],["谢谢。","Xièxie.","Спасибо."],
["不客气。","Bú kèqi.","Не за что."],["对不起。","Duìbuqǐ.","Извините."],
["没关系。","Méi guānxi.","Ничего страшного."],["再见。","Zàijiàn.","До свидания."],
["明天见。","Míngtiān jiàn.","До завтра."],["请进。","Qǐng jìn.","Входите."],
["认识你很高兴。","Rènshi nǐ hěn gāoxìng.","Рад(а) познакомиться."]
];
h+='<div class="th-section"><h2>Повседневные фразы (日常用语)</h2>';
h+='<div class="th-word-table">';
phrases.forEach(function(p){
h+='<div class="th-word-row" data-speak="'+esc(p[0])+'">';
h+='<span class="th-word-hz" style="width:auto;min-width:80px">'+esc(p[0])+'</span>';
h+='<span class="th-word-py" style="width:auto;flex:1">'+esc(p[1])+'</span>';
h+='<span class="th-word-tr" style="text-align:right">'+esc(p[2])+'</span>';
h+='<span class="th-word-speaker">&#128264;</span></div>';
});
h+='</div></div>';
return h;
}
document.addEventListener('click',function(e){
var el=e.target.closest('[data-speak]');if(el)speakZh(el.getAttribute('data-speak'));
var el2=e.target.closest('[data-playpy]');if(el2)playPy(el2.getAttribute('data-playpy'));
})
var THEORY={
1:{
introduction:"В этой главе вы научитесь здороваться, представляться и вести простейший разговор по-китайски. Главное грамматическое правило — предложения с глаголом 是 (shì — быть) и вопросы с частицей 吗 (ma).\\n\\nПерсонажи: 阿曼 (Āmàn) — иностранный студент, 张伟 (Zhāng Wěi) — китайский студент, 王老师 (Wáng lǎoshī) — преподаватель.",
vocabulary:[
{hz:"你好",py:"nǐ hǎo",tr:"привет, здравствуйте"},
{hz:"好",py:"hǎo",tr:"хороший, хорошо"},
{hz:"你",py:"nǐ",tr:"ты"},
{hz:"是",py:"shì",tr:"быть; да"},
{hz:"老师",py:"lǎoshī",tr:"учитель, преподаватель"},
{hz:"吗",py:"ma",tr:"вопросительная частица"},
{hz:"不",py:"bù",tr:"не, нет"},
{hz:"我",py:"wǒ",tr:"я"},
{hz:"学生",py:"xuésheng",tr:"студент, ученик"},
{hz:"她",py:"tā",tr:"она"},
{hz:"谢谢",py:"xièxie",tr:"спасибо"},
{hz:"不客气",py:"bú kèqi",tr:"не за что, пожалуйста"},
{hz:"您",py:"nín",tr:"Вы (вежливая форма)"},
{hz:"留学生",py:"liúxuéshēng",tr:"иностранный студент"},
{hz:"叫",py:"jiào",tr:"звать, называться"},
{hz:"什么",py:"shénme",tr:"что, какой"},
{hz:"名字",py:"míngzi",tr:"имя"}
],
grammar:[
{title:"«是» 字句 — Предложения с 是",
explanation:"是 (shì) — глагол «быть». Это главный глагол для предложений типа «я — студент», «она — учитель».\\n\\nУтверждение:  Подлежащее + 是 + Существительное\\nОтрицание:  Подлежащее + 不 + 是 + Существительное\\nВопрос:  Подлежащее + 是 + Существительное + 吗？\\n\\nОбратите внимание: в отрицании 不是 произносится «bú shì» (不 меняет тон перед 4-м тоном).",
examples:[
{hz:"我是老师。",py:"Wǒ shì lǎoshī.",tr:"Я — учитель."},
{hz:"她是学生。",py:"Tā shì xuésheng.",tr:"Она — студентка."},
{hz:"我不是老师。",py:"Wǒ bú shì lǎoshī.",tr:"Я не учитель."},
{hz:"我不是留学生。",py:"Wǒ bú shì liúxuéshēng.",tr:"Я не иностранный студент."},
{hz:"你是老师吗？",py:"Nǐ shì lǎoshī ma?",tr:"Ты учитель?"},
{hz:"阿曼是留学生吗？",py:"Āmàn shì liúxuéshēng ma?",tr:"Аман — иностранный студент?"}
]},
{title:"用「吗」的疑问句 — Вопросы с частицей 吗",
explanation:"Чтобы превратить утверждение в вопрос «да/нет», просто добавьте 吗 в конец предложения. Порядок слов не меняется!\\n\\nУтверждение → Вопрос:\\n你好。→ 你好吗？\\n他是老师。→ 他是老师吗？\\n\\nЭто самый простой способ задать вопрос в китайском языке.",
examples:[
{hz:"你好吗？",py:"Nǐ hǎo ma?",tr:"Как дела? (букв. «Ты хорошо?»)"},
{hz:"阿曼是留学生吗？",py:"Āmàn shì liúxuéshēng ma?",tr:"Аман — иностранный студент?"},
{hz:"她不是老师吗？",py:"Tā bú shì lǎoshī ma?",tr:"Она разве не учитель?"},
{hz:"他叫张伟吗？",py:"Tā jiào Zhāng Wěi ma?",tr:"Его зовут Чжан Вэй?"}
]}
],
dialogues:[
{title:"Знакомство (阿曼 и 张伟)",lines:[
{s:"A",hz:"你好！",py:"Nǐ hǎo!",tr:"Привет!"},
{s:"B",hz:"你好！",py:"Nǐ hǎo!",tr:"Привет!"},
{s:"A",hz:"你是老师吗？",py:"Nǐ shì lǎoshī ma?",tr:"Ты учитель?"},
{s:"B",hz:"不是，我不是老师，我是学生。她是老师。",py:"Bú shì, wǒ bú shì lǎoshī, wǒ shì xuésheng. Tā shì lǎoshī.",tr:"Нет, я не учитель, я студент. Она — учитель."},
{s:"A",hz:"谢谢。",py:"Xièxie.",tr:"Спасибо."},
{s:"B",hz:"不客气。",py:"Bú kèqi.",tr:"Не за что."}
]},
{title:"Встреча с учителем (阿曼 и 王老师)",lines:[
{s:"A",hz:"老师，您好！",py:"Lǎoshī, nín hǎo!",tr:"Здравствуйте, учитель!"},
{s:"B",hz:"你好！你是留学生吗？",py:"Nǐ hǎo! Nǐ shì liúxuéshēng ma?",tr:"Здравствуй! Ты иностранный студент?"},
{s:"A",hz:"是，我是留学生。",py:"Shì, wǒ shì liúxuéshēng.",tr:"Да, я иностранный студент."},
{s:"B",hz:"你叫什么名字？",py:"Nǐ jiào shénme míngzi?",tr:"Как тебя зовут?"},
{s:"A",hz:"我叫阿曼。",py:"Wǒ jiào Āmàn.",tr:"Меня зовут Аман."}
]}
],
tips:[
"您 (nín) — вежливая форма «вы». Используйте при обращении к учителям, старшим, незнакомым людям. В обычном разговоре достаточно 你 (nǐ).",
"Чтобы сказать «меня зовут...», используйте 我叫... (wǒ jiào...). Чтобы спросить имя — 你叫什么名字？(nǐ jiào shénme míngzi?).",
"不 обычно произносится 4-м тоном (bù), но перед другим 4-м тоном меняется на 2-й: 不是 → bú shì.",
"Нажимайте на иероглифы и примеры, чтобы услышать произношение."
]
},
2:{
introduction:"В этой главе вы научитесь рассказывать откуда вы и спрашивать национальность собеседника. Познакомитесь с суффиксом множественного числа 们, наречием 也 («тоже») и вопросительной частицей 呢 (для коротких встречных вопросов).\\n\\nПерсонажи: 王老师 (Wáng lǎoshī) — новая учительница по имени 王明 (Wáng Míng), 阿曼 (Āmàn, американец), 古丽 (Gǔlì, канадка), 张伟 (Zhāng Wěi, китаец).",
vocabulary:[
{hz:"同学",py:"tóngxué",tr:"одноклассник, однокурсник"},
{hz:"们",py:"men",tr:"суффикс множественного числа (для людей)"},
{hz:"来",py:"lái",tr:"приходить; (здесь) сейчас, сейчас я..."},
{hz:"介绍",py:"jièshào",tr:"представлять, знакомить"},
{hz:"一下儿",py:"yíxiàr",tr:"немного, чуть-чуть (смягчает действие)"},
{hz:"姓",py:"xìng",tr:"фамилия; иметь фамилию"},
{hz:"的",py:"de",tr:"притяжательная частица (≈ «-ов», «чей»)"},
{hz:"哪",py:"nǎ",tr:"какой, который"},
{hz:"国",py:"guó",tr:"страна"},
{hz:"人",py:"rén",tr:"человек"},
{hz:"他",py:"tā",tr:"он"},
{hz:"认识",py:"rènshi",tr:"знакомиться, знать (кого-то)"},
{hz:"很",py:"hěn",tr:"очень"},
{hz:"高兴",py:"gāoxìng",tr:"рад, радостный"},
{hz:"也",py:"yě",tr:"тоже, также"},
{hz:"呢",py:"ne",tr:"частица встречного вопроса (а ты?)"},
{hz:"朋友",py:"péngyou",tr:"друг"},
{hz:"王明",py:"Wáng Míng",tr:"Ван Мин (имя)"},
{hz:"美国",py:"Měiguó",tr:"Америка, США"},
{hz:"古丽",py:"Gǔlì",tr:"Гульнара (имя)"},
{hz:"加拿大",py:"Jiānádà",tr:"Канада"},
{hz:"中国",py:"Zhōngguó",tr:"Китай"}
],
grammar:[
{title:"Суффикс 们 — множественное число",
explanation:"们 (men) добавляется к местоимениям и существительным, обозначающим людей, чтобы сделать их множественным числом.\\n\\nМестоимение + 们:\\n我 (я) → 我们 (мы)\\n你 (ты) → 你们 (вы)\\n他/她 (он/она) → 他们/她们 (они)\\n\\nСуществительное (люди) + 们:\\n老师 → 老师们 (учителя)\\n同学 → 同学们 (одноклассники)\\n\\nВажно: 们 используется ТОЛЬКО с людьми. Нельзя сказать 书们 (книги) — для вещей множественное число не обозначается.",
examples:[
{hz:"同学们好！",py:"Tóngxuémen hǎo!",tr:"Здравствуйте, ребята!"},
{hz:"我们是留学生。",py:"Wǒmen shì liúxuéshēng.",tr:"Мы — иностранные студенты."},
{hz:"你们是老师吗？",py:"Nǐmen shì lǎoshī ma?",tr:"Вы учителя?"},
{hz:"他们不是中国人。",py:"Tāmen bú shì Zhōngguó rén.",tr:"Они не китайцы."}
]},
{title:"Наречие 也 — «тоже»",
explanation:"也 (yě — «тоже, также») ставится перед глаголом или прилагательным и указывает на сходство.\\n\\nСхема: Подлежащее + 也 + Глагол/Прил.\\n\\nВажно: 也 НЕ ставится в конец предложения (как русское «тоже»), а всегда перед сказуемым.\\n\\n❌ Неправильно: 我是学生也。\\n✅ Правильно: 我也是学生。",
examples:[
{hz:"他是学生，我也是学生。",py:"Tā shì xuésheng, wǒ yě shì xuésheng.",tr:"Он студент, и я тоже студент."},
{hz:"我也很高兴。",py:"Wǒ yě hěn gāoxìng.",tr:"Я тоже очень рад."},
{hz:"张伟是中国人，王明也是中国人。",py:"Zhāng Wěi shì Zhōngguó rén, Wáng Míng yě shì Zhōngguó rén.",tr:"Чжан Вэй — китаец, и Ван Мин тоже китаец."},
{hz:"你不是老师，他也不是老师。",py:"Nǐ bú shì lǎoshī, tā yě bú shì lǎoshī.",tr:"Ты не учитель, и он тоже не учитель."}
]},
{title:"Частица 呢 — встречный вопрос «А ты?»",
explanation:"呢 (ne) ставится в конец короткого встречного вопроса. Это сокращение: вместо того чтобы повторять весь вопрос — добавляешь 呢.\\n\\nСхема: Существительное/Местоимение + 呢？\\n\\nСмысл 呢 берётся из контекста предыдущего предложения:\\n• Если до этого спрашивали про имя → 你呢？ = «А как тебя зовут?»\\n• Если про национальность → 你呢？ = «А ты откуда?»\\n• Если про профессию → 你呢？ = «А ты (кем работаешь)?»",
examples:[
{hz:"我是美国人，你呢？",py:"Wǒ shì Měiguó rén, nǐ ne?",tr:"Я американец, а ты? (из какой страны?)"},
{hz:"我叫阿曼，她呢？",py:"Wǒ jiào Āmàn, tā ne?",tr:"Меня зовут Аман, а её (как зовут)?"},
{hz:"我很高兴，你呢？",py:"Wǒ hěn gāoxìng, nǐ ne?",tr:"Я очень рад, а ты?"},
{hz:"他是老师，你呢？",py:"Tā shì lǎoshī, nǐ ne?",tr:"Он учитель, а ты?"}
]}
],
dialogues:[
{title:"Знакомство с учителем (王老师 и студенты)",lines:[
{s:"A",hz:"同学们好！",py:"Tóngxuémen hǎo!",tr:"Здравствуйте, ребята!"},
{s:"B",hz:"老师好！",py:"Lǎoshī hǎo!",tr:"Здравствуйте, учитель!"},
{s:"A",hz:"我来介绍一下儿。我姓刘，叫王明，是你们的老师。你叫什么名字？",py:"Wǒ lái jièshào yíxiàr. Wǒ xìng Liú, jiào Wáng Míng, shì nǐmen de lǎoshī. Nǐ jiào shénme míngzi?",tr:"Сейчас я себя представлю. Моя фамилия Лю, зовут Ван Мин, я ваша учительница. Как тебя зовут?"},
{s:"B",hz:"我叫阿曼。",py:"Wǒ jiào Āmàn.",tr:"Меня зовут Аман."},
{s:"A",hz:"你是哪国人？",py:"Nǐ shì nǎ guó rén?",tr:"Из какой ты страны?"},
{s:"B",hz:"我是美国人。",py:"Wǒ shì Měiguó rén.",tr:"Я американец."}
]},
{title:"Знакомство с друзьями (阿曼, 古丽, 张伟)",lines:[
{s:"A",hz:"我来介绍一下儿。她叫古丽，他叫张伟。",py:"Wǒ lái jièshào yíxiàr. Tā jiào Gǔlì, tā jiào Zhāng Wěi.",tr:"Сейчас познакомлю. Её зовут Гульнара, его — Чжан Вэй."},
{s:"B",hz:"认识你很高兴。",py:"Rènshi nǐ hěn gāoxìng.",tr:"Очень приятно познакомиться."},
{s:"A",hz:"我也很高兴。你是美国人吗？",py:"Wǒ yě hěn gāoxìng. Nǐ shì Měiguó rén ma?",tr:"Я тоже очень рад. Ты американка?"},
{s:"B",hz:"不，我不是美国人，我是加拿大人。你呢？",py:"Bù, wǒ bú shì Měiguó rén, wǒ shì Jiānádà rén. Nǐ ne?",tr:"Нет, я не американка, я канадка. А ты?"},
{s:"A",hz:"我是中国人。",py:"Wǒ shì Zhōngguó rén.",tr:"Я китаец."}
]}
],
tips:[
"Формула «национальность»: 哪国人？(из какой страны?) → Страна + 人: 美国人 (американец), 中国人 (китаец), 加拿大人 (канадец). Так же для любой страны: 俄罗斯人 (россиянин), 土库曼人 (туркмен).",
"我来介绍一下儿 — вежливая фраза-пролог перед представлением кого-то. Дословно «я сейчас немного представлю». 一下儿 смягчает действие, делает его более лёгким.",
"Разница 姓 и 叫: 姓 — только фамилия (我姓刘), 叫 — полное имя или имя (我叫王明). Нельзя сказать 我姓王明.",
"认识 vs 知道: оба переводятся «знать», но 认识 — про личное знакомство с человеком, 知道 — знать факт. «Я его знаю лично» = 我认识他."
]
},
3:{
introduction:"В этой главе вы научитесь указывать на предметы («это», «то»), задавать вопросы со словами 谁 (кто) и 什么 (что), а также использовать частицу 的 для обозначения принадлежности («чей?», «моя книга»).\\n\\nПерсонажи: 阿曼, 古丽 (обсуждают книгу и словарь), 中村 (Zhōngcūn) — японский студент, они обсуждают японский музыкальный журнал.",
vocabulary:[
{hz:"那",py:"nà",tr:"то, тот"},
{hz:"谁",py:"shéi / shuí",tr:"кто"},
{hz:"书",py:"shū",tr:"книга"},
{hz:"同屋",py:"tóngwū",tr:"сосед по комнате"},
{hz:"汉语",py:"Hànyǔ",tr:"китайский язык"},
{hz:"课本",py:"kèběn",tr:"учебник"},
{hz:"词典",py:"cídiǎn",tr:"словарь"},
{hz:"就是",py:"jiùshì",tr:"а именно, то есть (для пояснения)"},
{hz:"日语",py:"Rìyǔ",tr:"японский язык"},
{hz:"这",py:"zhè",tr:"это, этот"},
{hz:"杂志",py:"zázhì",tr:"журнал"},
{hz:"音乐",py:"yīnyuè",tr:"музыка"},
{hz:"汉日词典",py:"Hàn-Rì Cídiǎn",tr:"Китайско-японский словарь"},
{hz:"中村",py:"Zhōngcūn",tr:"Накамура (японская фамилия)"},
{hz:"日本",py:"Rìběn",tr:"Япония"}
],
grammar:[
{title:"Указательные местоимения 这 / 那",
explanation:"这 (zhè) — «это» (предмет близко к говорящему).\\n那 (nà) — «то» (предмет подальше).\\n\\nСхема: 这/那 + 是 + Существительное\\n\\nЧасто используется вместе с 的 для указания принадлежности:\\n这是我的书。— Это моя книга.\\n那是老师的词典。— Тот словарь — учительский.\\n\\nВ отрицании: 这/那 + 不是 + ...",
examples:[
{hz:"这是汉语课本。",py:"Zhè shì Hànyǔ kèběn.",tr:"Это учебник китайского."},
{hz:"那是音乐杂志。",py:"Nà shì yīnyuè zázhì.",tr:"То — музыкальный журнал."},
{hz:"这是老师的书。",py:"Zhè shì lǎoshī de shū.",tr:"Это книга учителя."},
{hz:"那不是我的词典。",py:"Nà bú shì wǒ de cídiǎn.",tr:"Тот словарь не мой."}
]},
{title:"Частица 的 — принадлежность и определение",
explanation:"的 (de) ставится между определением и определяемым словом. Порядок ВСЕГДА: определение + 的 + главное слово.\\n\\nСхема: A + 的 + B  =  «B, принадлежащее/относящееся к A»\\n\\n我的书 — моя книга\\n老师的词典 — словарь учителя\\n古丽的朋友 — друг Гульнара\\n\\nС местоимениями 我/你/他 и близкими родственниками/друзьями 的 можно опускать: 我朋友 (мой друг), 我同屋 (мой сосед по комнате). Но с обычными вещами 的 обязательно: 我的书, 我的词典.",
examples:[
{hz:"这是我的课本。",py:"Zhè shì wǒ de kèběn.",tr:"Это мой учебник."},
{hz:"那是谁的书？",py:"Nà shì shéi de shū?",tr:"Чья это книга?"},
{hz:"那是我同屋的书。",py:"Nà shì wǒ tóngwū de shū.",tr:"Та книга — моего соседа по комнате."},
{hz:"她是我朋友的同屋。",py:"Tā shì wǒ péngyou de tóngwū.",tr:"Она — соседка по комнате моего друга."}
]},
{title:"Специальные вопросы с 谁 / 什么",
explanation:"В китайском вопросительные слова ставятся НА ТО МЕСТО, где должен быть ответ. Порядок слов в вопросе и утверждении одинаковый — никаких перестановок как в русском/английском.\\n\\n谁 (shéi) — «кто / чей»\\n什么 (shénme) — «что / какой»\\n\\nУтверждение: 那是我的书。\\nВопрос:  那是谁的书？ (на месте «我» ставится 谁)\\n\\nУтверждение: 这是课本。\\nВопрос: 这是什么？ (на месте «课本» ставится 什么)\\n\\nС 吗 такие вопросы НЕ используются — нельзя сказать 那是谁的书吗？",
examples:[
{hz:"那是谁？",py:"Nà shì shéi?",tr:"Кто это (там)?"},
{hz:"这是什么？",py:"Zhè shì shénme?",tr:"Что это?"},
{hz:"这是什么书？",py:"Zhè shì shénme shū?",tr:"Что это за книга?"},
{hz:"那是谁的词典？",py:"Nà shì shéi de cídiǎn?",tr:"Чей это словарь?"}
]}
],
dialogues:[
{title:"Чья это книга? (阿曼 и 古丽)",lines:[
{s:"A",hz:"古丽，那是谁的书？是你的书吗？",py:"Gǔlì, nà shì shéi de shū? Shì nǐ de shū ma?",tr:"Гульнара, чья это книга? Твоя?"},
{s:"B",hz:"不是，那是我同屋的书。",py:"Bú shì, nà shì wǒ tóngwū de shū.",tr:"Нет, это книга моей соседки по комнате."},
{s:"A",hz:"是汉语课本吗？",py:"Shì Hànyǔ kèběn ma?",tr:"Это учебник китайского?"},
{s:"B",hz:"不是，是《汉日词典》。",py:"Bú shì, shì «Hàn-Rì Cídiǎn».",tr:"Нет, это «Китайско-японский словарь»."},
{s:"A",hz:"什么词典？",py:"Shénme cídiǎn?",tr:"Какой словарь?"},
{s:"B",hz:"《汉日词典》，就是汉语、日语词典。",py:"«Hàn-Rì Cídiǎn», jiù shì Hànyǔ, Rìyǔ cídiǎn.",tr:"«Китайско-японский», то есть словарь китайского и японского."}
]},
{title:"Что это за журнал? (古丽 и 中村)",lines:[
{s:"A",hz:"这是什么杂志？",py:"Zhè shì shénme zázhì?",tr:"Что это за журнал?"},
{s:"B",hz:"音乐杂志。",py:"Yīnyuè zázhì.",tr:"Музыкальный."},
{s:"A",hz:"是日本的杂志吗？",py:"Shì Rìběn de zázhì ma?",tr:"Японский?"},
{s:"B",hz:"是，是日本的杂志。",py:"Shì, shì Rìběn de zázhì.",tr:"Да, японский."},
{s:"A",hz:"是你的吗？",py:"Shì nǐ de ma?",tr:"Твой?"},
{s:"B",hz:"不是，是我朋友的。",py:"Bú shì, shì wǒ péngyou de.",tr:"Нет, моего друга."}
]}
],
tips:[
"После 的 существительное можно опустить, если оно понятно из контекста: 是我的 («это моё»), 是朋友的 («это друга»). Особенно часто так говорят в ответах: A: 是你的书吗？ B: 不，是我朋友的。",
"谁 читается и «shéi», и «shuí» — оба варианта правильны, но в разговорной речи чаще «shéi».",
"就是 употребляется для пояснения или уточнения: «это значит», «а именно». Полезно когда хочешь объяснить непонятное слово: X，就是 Y — «X, то есть Y».",
"Близкие отношения — без 的: 我朋友, 我同屋, 我老师, 我爸爸 (мой папа). С вещами/понятиями — с 的: 我的书, 我的杂志, 我的名字."
]
},
4:{
introduction:"В этой главе вы научитесь спрашивать где что находится и описывать местоположение. Познакомитесь с глаголом 在 (zài — находиться), вопросительным словом 哪儿 (где) и словами направления: 东/西/南/北/左/右 + 边.\\n\\nСитуация: 古丽 ищет библиотеку на территории университета и спрашивает у встречных студентов.",
vocabulary:[
{hz:"请问",py:"qǐngwèn",tr:"простите, можно спросить"},
{hz:"图书馆",py:"túshūguǎn",tr:"библиотека"},
{hz:"在",py:"zài",tr:"находиться (где-то)"},
{hz:"哪儿",py:"nǎr",tr:"где"},
{hz:"对不起",py:"duìbuqǐ",tr:"извините"},
{hz:"个",py:"gè",tr:"счётное слово (универсальное)"},
{hz:"学校",py:"xuéxiào",tr:"школа, учебное заведение"},
{hz:"知道",py:"zhīdào",tr:"знать (факт)"},
{hz:"没关系",py:"méi guānxi",tr:"ничего страшного, не важно"},
{hz:"这儿",py:"zhèr",tr:"здесь"},
{hz:"教学",py:"jiàoxué",tr:"обучение, преподавание"},
{hz:"楼",py:"lóu",tr:"здание, корпус"},
{hz:"那儿",py:"nàr",tr:"там"},
{hz:"宿舍",py:"sùshè",tr:"общежитие"},
{hz:"北边",py:"běibian",tr:"северная сторона, к северу"},
{hz:"左边",py:"zuǒbian",tr:"левая сторона, слева"},
{hz:"右边",py:"yòubian",tr:"правая сторона, справа"},
{hz:"不用谢",py:"búyòng xiè",tr:"не стоит благодарности"},
{hz:"不用",py:"búyòng",tr:"не нужно, не обязательно"},
{hz:"东边",py:"dōngbian",tr:"восточная сторона"},
{hz:"西边",py:"xībian",tr:"западная сторона"},
{hz:"南边",py:"nánbian",tr:"южная сторона"}
],
grammar:[
{title:"Глагол 在 — находиться где-то",
explanation:"在 (zài) — глагол «находиться, быть (в каком-то месте)». Используется чтобы указать местоположение предмета или человека.\\n\\nСхема 1:  Подлежащее + 在 + Место\\n图书馆在那儿。— Библиотека находится там.\\n我在学校。— Я в школе.\\n\\nСхема 2 (обратный порядок):  Место + 是 + Подлежащее\\n那儿是图书馆。— Там — библиотека.\\n教学楼的北边是图书馆。— С северной стороны учебного корпуса — библиотека.\\n\\nОтрицание: 不在 (bú zài) — 图书馆不在这儿。",
examples:[
{hz:"图书馆在哪儿？",py:"Túshūguǎn zài nǎr?",tr:"Где находится библиотека?"},
{hz:"图书馆在宿舍楼的北边。",py:"Túshūguǎn zài sùshèlóu de běibian.",tr:"Библиотека — к северу от общежития."},
{hz:"加拿大在美国的北边。",py:"Jiānádà zài Měiguó de běibian.",tr:"Канада — к северу от США."},
{hz:"日本在中国的东边。",py:"Rìběn zài Zhōngguó de dōngbian.",tr:"Япония — к востоку от Китая."}
]},
{title:"Вопросительное слово 哪儿 — где",
explanation:"哪儿 (nǎr) — «где». Ставится на место, где должен стоять ответ (то есть после 在).\\n\\nСхема: Подлежащее + 在 + 哪儿？\\n\\nОтвет: Подлежащее + 在 + конкретное место\\n\\nВажно: с вопросительными словами (哪儿, 谁, 什么) НЕ используется 吗.\\n❌ 图书馆在哪儿吗？\\n✅ 图书馆在哪儿？\\n\\nПара: 这儿 (здесь) / 那儿 (там) / 哪儿 (где) — ориентируйся по первому иероглифу: 这=это, 那=то, 哪=который.",
examples:[
{hz:"你的书在哪儿？",py:"Nǐ de shū zài nǎr?",tr:"Где твоя книга?"},
{hz:"老师在哪儿？",py:"Lǎoshī zài nǎr?",tr:"Где учитель?"},
{hz:"你们的学校在哪儿？",py:"Nǐmen de xuéxiào zài nǎr?",tr:"Где ваша школа?"},
{hz:"阿曼在这儿，古丽在那儿。",py:"Āmàn zài zhèr, Gǔlì zài nàr.",tr:"Аман здесь, а Гульнара там."}
]},
{title:"Слова направления (方位词): 东/西/南/北/左/右 + 边",
explanation:"Чтобы сказать «к северу от X», «справа от X» и т.д., используется схема:\\n\\nX + 的 + направление + 边\\n\\nНаправления:\\n东 (dōng) — восток → 东边\\n西 (xī) — запад → 西边\\n南 (nán) — юг → 南边\\n北 (běi) — север → 北边\\n左 (zuǒ) — лево → 左边\\n右 (yòu) — право → 右边\\n\\nПример: 图书馆在宿舍楼的北边 = «Библиотека к северу от общежития» (дословно: «библиотека находится на северной стороне общежития»).\\n\\nЭто обратный порядок по сравнению с русским: сначала идёт «ориентир» (от чего), потом направление.",
examples:[
{hz:"教学楼在图书馆的北边。",py:"Jiàoxuélóu zài túshūguǎn de běibian.",tr:"Учебный корпус — к северу от библиотеки."},
{hz:"张伟在阿曼的右边。",py:"Zhāng Wěi zài Āmàn de yòubian.",tr:"Чжан Вэй — справа от Давэя."},
{hz:"古丽的左边是阿曼。",py:"Gǔlì de zuǒbian shì Āmàn.",tr:"Слева от Гульнара — Аман."},
{hz:"宿舍楼在西边。",py:"Sùshèlóu zài xībian.",tr:"Общежитие — с западной стороны."}
]}
],
dialogues:[
{title:"Поиск библиотеки — неудача (古丽 и студент А)",lines:[
{s:"A",hz:"同学，请问，图书馆在哪儿？",py:"Tóngxué, qǐngwèn, túshūguǎn zài nǎr?",tr:"Студент, простите, где библиотека?"},
{s:"B",hz:"对不起，我不是这个学校的学生，不知道。",py:"Duìbuqǐ, wǒ bú shì zhège xuéxiào de xuésheng, bù zhīdào.",tr:"Извините, я не студент этого университета, не знаю."},
{s:"A",hz:"没关系。",py:"Méi guānxi.",tr:"Ничего страшного."}
]},
{title:"Поиск библиотеки — нашла (古丽 и студент Б)",lines:[
{s:"A",hz:"同学，这儿是图书馆吗？",py:"Tóngxué, zhèr shì túshūguǎn ma?",tr:"Студент, это здесь библиотека?"},
{s:"B",hz:"不是，这是教学楼，图书馆在那儿，宿舍楼的北边。",py:"Bú shì, zhè shì jiàoxuélóu, túshūguǎn zài nàr, sùshèlóu de běibian.",tr:"Нет, это учебный корпус. Библиотека вон там, к северу от общежития."},
{s:"A",hz:"是左边的楼吗？",py:"Shì zuǒbian de lóu ma?",tr:"То здание слева?"},
{s:"B",hz:"不，右边的楼。",py:"Bù, yòubian de lóu.",tr:"Нет, справа."},
{s:"A",hz:"谢谢。",py:"Xièxie.",tr:"Спасибо."},
{s:"B",hz:"不用谢。",py:"Búyòng xiè.",tr:"Не за что."}
]}
],
tips:[
"请问 (qǐngwèn) — вежливое начало вопроса у незнакомых людей. Дословно: «позвольте спросить». Очень полезная фраза на улице.",
"对不起 / 没关系 — стандартная пара «извини / ничего страшного». Запомни обе фразы вместе, они идут в паре.",
"不用谢 и 不客气 — оба значат «не за что». 不客气 мягче и универсальнее, 不用谢 более разговорное.",
"В китайском направления меняются парами: 这儿 здесь / 那儿 там / 哪儿 где. Обрати внимание на суффикс 儿 — он характерен для северного (пекинского) диалекта.",
"Счётное слово 个 (gè) — самое универсальное. Ставится между числом/指示 и существительным: 这个学校 (эта школа), 一个朋友 (один друг). Нельзя сказать 这学校 — нужен 个."
]
},
5:{
introduction:"Это итоговая глава Unit 1 — повторение и расширение пройденного. Вы научитесь рассказывать о своей учёбе (университет, специальность), использовать глагол 有 (иметь, существовать) и выражение 的时候 (когда, в момент).\\n\\nПерсонажи: 古丽 знакомится со студенткой 王红 (Wáng Hóng) из Университета Цинхуа. Параллельно 阿曼 ищет уборную.",
vocabulary:[
{hz:"专业",py:"zhuānyè",tr:"специальность (в вузе)"},
{hz:"国际",py:"guójì",tr:"международный"},
{hz:"关系",py:"guānxi",tr:"отношения, связи"},
{hz:"中文",py:"Zhōngwén",tr:"китайский язык (письменный, литературный)"},
{hz:"系",py:"xì",tr:"факультет, кафедра"},
{hz:"研究生",py:"yánjiūshēng",tr:"аспирант, магистрант"},
{hz:"现代",py:"xiàndài",tr:"современный"},
{hz:"文学",py:"wénxué",tr:"литература"},
{hz:"有",py:"yǒu",tr:"иметь; иметься, быть"},
{hz:"空儿",py:"kòngr",tr:"свободное время"},
{hz:"时候",py:"shíhou",tr:"время, момент"},
{hz:"欢迎",py:"huānyíng",tr:"приветствовать, добро пожаловать"},
{hz:"去",py:"qù",tr:"идти, ехать (куда-то)"},
{hz:"玩儿",py:"wánr",tr:"играть, проводить время"},
{hz:"卫生间",py:"wèishēngjiān",tr:"туалет, уборная"},
{hz:"教室",py:"jiàoshì",tr:"аудитория, классная комната"},
{hz:"旁边",py:"pángbiān",tr:"рядом, сбоку"},
{hz:"对",py:"duì",tr:"правильно, верно"},
{hz:"王红",py:"Wáng Hóng",tr:"Ван Хун (женское имя)"},
{hz:"北京大学",py:"Běijīng Dàxué",tr:"Пекинский университет (Бэйда)"},
{hz:"清华大学",py:"Qīnghuá Dàxué",tr:"Университет Цинхуа"}
],
grammar:[
{title:"Глагол 有 — иметь; иметься",
explanation:"有 (yǒu) — «иметь, обладать» или «иметься, быть, существовать». Один из самых частых глаголов в китайском.\\n\\nЗначение 1 — принадлежность («у меня есть»):\\nПодлежащее + 有 + Объект\\n我有朋友。— У меня есть друзья.\\n她有一个同屋。— У неё есть соседка по комнате.\\n\\nЗначение 2 — существование («где-то есть»):\\nМесто + 有 + Объект\\n学校有图书馆。— В университете есть библиотека.\\n教室里有老师。— В аудитории есть учитель.\\n\\nОтрицание ТОЛЬКО через 没 (НЕ 不):\\n❌ 不有\\n✅ 没有 (méi yǒu) — «не иметь»\\n\\n我没有空儿。— У меня нет свободного времени.",
examples:[
{hz:"我有一个中国朋友。",py:"Wǒ yǒu yí ge Zhōngguó péngyou.",tr:"У меня есть один китайский друг."},
{hz:"你有空儿吗？",py:"Nǐ yǒu kòngr ma?",tr:"У тебя есть свободное время?"},
{hz:"北京大学有图书馆。",py:"Běijīng Dàxué yǒu túshūguǎn.",tr:"В Пекинском университете есть библиотека."},
{hz:"我没有汉语词典。",py:"Wǒ méiyǒu Hànyǔ cídiǎn.",tr:"У меня нет словаря китайского."}
]},
{title:"Выражение 的时候 — «когда, в момент чего-то»",
explanation:"…的时候 (de shíhou) означает «когда…, во время…». Ставится в КОНЦЕ придаточной части, перед главной.\\n\\nСхема:  [Действие/ситуация] + 的时候，[основная часть]\\n\\n有空儿的时候，欢迎你去玩儿。\\n«Когда будет свободное время, приходи в гости».\\n\\nВажно: порядок ОБРАТНЫЙ русскому. Сначала говорится условие/время, потом основное действие.\\n\\nРусский: «Приходи, КОГДА будет время»\\nКитайский: «КОГДА время — приходи»",
examples:[
{hz:"有空儿的时候，欢迎你去玩儿。",py:"Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.",tr:"Когда будет время — приходи в гости."},
{hz:"我有空儿的时候去图书馆。",py:"Wǒ yǒu kòngr de shíhou qù túshūguǎn.",tr:"Когда у меня есть время, иду в библиотеку."},
{hz:"你不忙的时候，我们一起玩儿。",py:"Nǐ bù máng de shíhou, wǒmen yìqǐ wánr.",tr:"Когда ты не занят, поиграем вместе."}
]},
{title:"Ещё слова направления: 旁边, 前边, 后边, 里边",
explanation:"В Главе 4 мы изучили 东边/西边/南边/北边 и 左边/右边. Теперь добавим ещё несколько направлений:\\n\\n旁边 (pángbiān) — сбоку, рядом\\n前边 (qiánbian) — впереди\\n后边 (hòubian) — сзади\\n里边 (lǐbian) — внутри\\n外边 (wàibian) — снаружи\\n上边 (shàngbian) — сверху\\n下边 (xiàbian) — снизу\\n\\nСхема та же: X + 的 + направление\\n卫生间在教室的旁边。— Уборная рядом с аудиторией.\\n图书馆在宿舍的前边。— Библиотека перед общежитием.",
examples:[
{hz:"卫生间在教室的旁边。",py:"Wèishēngjiān zài jiàoshì de pángbiān.",tr:"Уборная рядом с аудиторией."},
{hz:"老师在阿曼的前边。",py:"Lǎoshī zài Āmàn de qiánbian.",tr:"Учитель впереди Давэя."},
{hz:"图书馆里边有很多书。",py:"Túshūguǎn lǐbian yǒu hěn duō shū.",tr:"Внутри библиотеки много книг."},
{hz:"我的朋友在我旁边。",py:"Wǒ de péngyou zài wǒ pángbiān.",tr:"Мой друг рядом со мной."}
]}
],
dialogues:[
{title:"Знакомство в университете (古丽 и 王红)",lines:[
{s:"A",hz:"你好！你叫什么名字？",py:"Nǐ hǎo! Nǐ jiào shénme míngzi?",tr:"Привет! Как тебя зовут?"},
{s:"B",hz:"我叫王红。你呢？",py:"Wǒ jiào Wáng Hóng. Nǐ ne?",tr:"Меня зовут Ван Хун. А тебя?"},
{s:"A",hz:"我叫古丽。我是北京大学的留学生。我的专业是国际关系。你呢？",py:"Wǒ jiào Gǔlì. Wǒ shì Běijīng Dàxué de liúxuéshēng. Wǒ de zhuānyè shì guójì guānxi. Nǐ ne?",tr:"Меня зовут Гульнара. Я иностранная студентка Пекинского университета. Моя специальность — международные отношения. А ты?"},
{s:"B",hz:"我是清华大学中文系的研究生。我的专业是现代文学。",py:"Wǒ shì Qīnghuá Dàxué Zhōngwén xì de yánjiūshēng. Wǒ de zhuānyè shì xiàndài wénxué.",tr:"Я аспирантка факультета китайского языка в Цинхуа. Моя специальность — современная литература."},
{s:"A",hz:"清华大学在哪儿？",py:"Qīnghuá Dàxué zài nǎr?",tr:"А где находится Цинхуа?"},
{s:"B",hz:"在北京大学的东边。有空儿的时候，欢迎你去玩儿。",py:"Zài Běijīng Dàxué de dōngbian. Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.",tr:"К востоку от Пекинского университета. Будет время — приходи в гости."}
]},
{title:"Где уборная? (阿曼 и студент)",lines:[
{s:"A",hz:"请问，卫生间在哪儿？",py:"Qǐngwèn, wèishēngjiān zài nǎr?",tr:"Простите, где уборная?"},
{s:"B",hz:"在那儿，教室的旁边。",py:"Zài nàr, jiàoshì de pángbiān.",tr:"Вон там, рядом с аудиторией."},
{s:"A",hz:"是西边的教室吗？",py:"Shì xībian de jiàoshì ma?",tr:"Аудитория с западной стороны?"},
{s:"B",hz:"对。",py:"Duì.",tr:"Да, верно."}
]}
],
tips:[
"欢迎你去玩儿 — вежливое приглашение. Дословно: «приветствую тебя прийти поиграть». Используется когда приглашаешь в гости без конкретного повода. Это идиома, не переводи буквально.",
"北京大学 (Běijīng Dàxué) и 清华大学 (Qīnghuá Dàxué) — два самых престижных вуза Китая. Часто сокращаются до 北大 (Běidà) и 清华 (Qīnghuá).",
"有 — ВСЕГДА отрицается через 没 (没有). Это единственный глагол, который не принимает 不. Запомни сразу: нет 不有.",
"中文 vs 汉语: оба означают «китайский язык». 汉语 — общий термин (язык хань), чаще о устной речи. 中文 — обычно письменный, литературный. На факультете это 中文系.",
"对 (duì) — универсальное «да/правильно». Более естественно чем 是 в ответе на вопросы. «Ты студент?» → 对 (да)."
]
},
6:{
introduction:"В этой главе вы научитесь называть время (часы и минуты), считать до 100 и задавать вопросы о времени с помощью 几 (сколько). Также познакомитесь с конструкцией 太……了 («слишком») и выражением 一会儿见 («до скорого»).\\n\\nСитуации: 古丽 спрашивает 中村 когда в Японии начинаются занятия, потом узнаёт у 阿曼 во сколько начнётся лекция.",
vocabulary:[
{hz:"大学",py:"dàxué",tr:"университет"},
{hz:"早上",py:"zǎoshang",tr:"утро"},
{hz:"几",py:"jǐ",tr:"сколько (для чисел до 10)"},
{hz:"点",py:"diǎn",tr:"час (на часах), точка"},
{hz:"上课",py:"shàngkè",tr:"начинать занятие, идти на пару"},
{hz:"大部分",py:"dàbùfen",tr:"большинство, бóльшая часть"},
{hz:"九",py:"jiǔ",tr:"девять"},
{hz:"我们",py:"wǒmen",tr:"мы"},
{hz:"八",py:"bā",tr:"восемь"},
{hz:"五十",py:"wǔshí",tr:"пятьдесят"},
{hz:"分",py:"fēn",tr:"минута"},
{hz:"下课",py:"xià kè",tr:"заканчивать занятие"},
{hz:"十",py:"shí",tr:"десять"},
{hz:"半",py:"bàn",tr:"половина"},
{hz:"太……了",py:"tài...le",tr:"слишком (очень)"},
{hz:"早",py:"zǎo",tr:"рано, ранний"},
{hz:"讲座",py:"jiǎngzuò",tr:"лекция, доклад"},
{hz:"开始",py:"kāishǐ",tr:"начинаться, начинать"},
{hz:"六",py:"liù",tr:"шесть"},
{hz:"现在",py:"xiànzài",tr:"сейчас"},
{hz:"差",py:"chà",tr:"не хватать, без (чего-то до)"},
{hz:"一",py:"yī",tr:"один"},
{hz:"刻",py:"kè",tr:"четверть часа (15 мин)"},
{hz:"一会儿",py:"yíhuìr",tr:"скоро, через минутку"},
{hz:"见",py:"jiàn",tr:"увидеться, встретиться"}
],
grammar:[
{title:"Числа от 0 до 100",
explanation:"Числа 0-10 — базовые, их надо выучить:\\n零 líng — 0\\n一 yī — 1\\n二 èr — 2\\n三 sān — 3\\n四 sì — 4\\n五 wǔ — 5\\n六 liù — 6\\n七 qī — 7\\n八 bā — 8\\n九 jiǔ — 9\\n十 shí — 10\\n\\n11-19: 十 + единица\\n11 = 十一 (shí yī), 15 = 十五, 19 = 十九\\n\\n20-99: десяток + 十 + единица\\n20 = 二十 (èrshí), 25 = 二十五, 99 = 九十九\\n\\n100 = 一百 (yìbǎi)\\n\\nЛогика проста: 35 дословно «три-десять-пять» (三十五).",
examples:[
{hz:"十五",py:"shíwǔ",tr:"15"},
{hz:"二十一",py:"èrshíyī",tr:"21"},
{hz:"五十",py:"wǔshí",tr:"50"},
{hz:"九十九",py:"jiǔshíjiǔ",tr:"99"}
]},
{title:"Как называть время (钟点表达法)",
explanation:"Схема: [час] 点 [минуты] 分\\n\\n8:00 — 八点 (bā diǎn)\\n8:05 — 八点零五分 (零 líng = ноль обязательно для <10 мин)\\n8:10 — 八点十分\\n8:15 — 八点十五分 ИЛИ 八点一刻 (один 刻 = 15 мин)\\n8:30 — 八点三十分 ИЛИ 八点半 (полчаса)\\n8:45 — 八点四十五分 ИЛИ 八点三刻 ИЛИ 差一刻九点 («без четверти 9»)\\n8:50 — 八点五十分 ИЛИ 差十分九点 («без 10 минут 9»)\\n\\nВопрос «сколько времени?»: 现在几点？ (xiànzài jǐ diǎn?)\\nВопрос «во сколько?»: 几点 + глагол → 几点上课？(во сколько начнутся занятия?)",
examples:[
{hz:"现在几点？",py:"Xiànzài jǐ diǎn?",tr:"Сколько сейчас времени?"},
{hz:"现在八点半。",py:"Xiànzài bā diǎn bàn.",tr:"Сейчас половина девятого (8:30)."},
{hz:"差一刻六点。",py:"Chà yí kè liù diǎn.",tr:"Без четверти шесть (5:45)."},
{hz:"你们几点上课？",py:"Nǐmen jǐ diǎn shàng kè?",tr:"Во сколько у вас начинаются занятия?"},
{hz:"我们八点五十分上课。",py:"Wǒmen bā diǎn wǔshí fēn shàng kè.",tr:"У нас занятия в 8:50."}
]},
{title:"Вопросительное 几 — «сколько»",
explanation:"几 (jǐ) — «сколько», но только для ОЖИДАЕМО МАЛЫХ чисел (обычно до 10). Если ожидается число побольше — используется 多少 (будет в следующих главах).\\n\\n几 + счётное слово + существительное\\n几点? — сколько часов? (точно меньше 24)\\n几个朋友? — сколько друзей? (небольшое число)\\n\\nВ ответе на место 几 ставится конкретное число:\\n几点？→ 八点\\n几个朋友？→ 三个朋友\\n\\n几 уже содержит вопрос — 吗 НЕ добавляется.",
examples:[
{hz:"现在几点？",py:"Xiànzài jǐ diǎn?",tr:"Сколько сейчас времени?"},
{hz:"几点下课？",py:"Jǐ diǎn xià kè?",tr:"Во сколько заканчиваются занятия?"},
{hz:"你有几个朋友？",py:"Nǐ yǒu jǐ ge péngyou?",tr:"Сколько у тебя друзей?"},
{hz:"讲座几点开始？",py:"Jiǎngzuò jǐ diǎn kāishǐ?",tr:"Во сколько начинается лекция?"}
]},
{title:"Конструкция 太……了 — «слишком»",
explanation:"太…了 (tài…le) выражает высокую степень, часто с оттенком недовольства или восхищения.\\n\\nСхема:  太 + Прилагательное/Глагол + 了\\n\\n太早了！— Слишком рано!\\n太好了！— Отлично! (здесь — положительно)\\n太累了。— Очень устал.\\n\\nВ отрицании 了 обычно опускается: 不太早 («не слишком рано»).\\n太 без 了 звучит незавершённо — 了 почти всегда нужен.",
examples:[
{hz:"八点上课，太早了！",py:"Bā diǎn shàngkè, tài zǎo le!",tr:"Занятия в 8 — это слишком рано!"},
{hz:"太好了！",py:"Tài hǎo le!",tr:"Отлично!"},
{hz:"这个学校太大了。",py:"Zhège xuéxiào tài dà le.",tr:"Эта школа слишком большая."},
{hz:"不太早。",py:"Bú tài zǎo.",tr:"Не так уж рано."}
]}
],
dialogues:[
{title:"Занятия в Японии (古丽 и 中村)",lines:[
{s:"A",hz:"中村，日本的大学早上几点上课？",py:"Zhōngcūn, Rìběn de dàxué zǎoshang jǐ diǎn shàngkè?",tr:"Накамура, во сколько начинаются занятия в японских университетах утром?"},
{s:"B",hz:"大部分是九点，我们学校是八点五十分。",py:"Dàbùfen shì jiǔ diǎn, wǒmen xuéxiào shì bā diǎn wǔshí fēn.",tr:"В большинстве в 9, у нас в школе — в 8:50."},
{s:"A",hz:"几点下课？",py:"Jǐ diǎn xià kè?",tr:"Во сколько заканчиваются?"},
{s:"B",hz:"十点半。",py:"Shí diǎn bàn.",tr:"В половине одиннадцатого."},
{s:"A",hz:"北京大学早上八点上课，太早了。",py:"Běijīng Dàxué zǎoshang bā diǎn shàngkè, tài zǎo le.",tr:"В Пекинском университете занятия в 8 утра — слишком рано!"}
]},
{title:"Во сколько лекция? (古丽 и 阿曼)",lines:[
{s:"A",hz:"阿曼，讲座几点开始？",py:"Āmàn, jiǎngzuò jǐ diǎn kāishǐ?",tr:"Аман, во сколько начинается лекция?"},
{s:"B",hz:"六点。",py:"Liù diǎn.",tr:"В 6."},
{s:"A",hz:"现在几点？",py:"Xiànzài jǐ diǎn?",tr:"А сейчас сколько?"},
{s:"B",hz:"差一刻六点。",py:"Chà yí kè liù diǎn.",tr:"Без четверти шесть."},
{s:"A",hz:"谢谢！一会儿见。",py:"Xièxie! Yíhuìr jiàn.",tr:"Спасибо! До скорого."}
]}
],
tips:[
"一 (yī) меняет тон в зависимости от следующего слога: перед 4-м тоном → 2-й (yí kè, yí ge), перед 1/2/3 тоном → 4-й (yì bēi, yì nián, yì wǎn). В изоляции — 1-й тон (yī).",
"零 (líng = ноль) пишется ещё иероглифом 〇 (кружочек). Например 2026 год = 二〇二六年. В цифрах времени (8:05) 零 обязательно, иначе непонятно.",
"Формулы прощания: 一会儿见 (до скорого, через пару минут), 明天见 (до завтра), 再见 (до свидания). Все строятся как «[время]见».",
"上课 / 下课 — буквально «подниматься на занятие» / «спускаться с занятия». Похожие пары: 上班/下班 (работа), 上车/下车 (транспорт).",
"В разговоре китайцы чаще говорят 半 (полчаса) и 一刻/三刻 (четверти), чем точные «三十分» и «十五分». Учись использовать эти сокращения."
]
},
7:{
introduction:"В этой главе вы научитесь говорить о планах на день (утром / днём / вечером), спрашивать о наличии чего-либо с помощью 有, использовать частицу 吧 для предположения и слова 上/下/里/外 как прилагательные.\\n\\nСитуации: 古丽 одалживает велосипед у 中村, 阿曼 зовёт 古丽 в кино.",
vocabulary:[
{hz:"明天",py:"míngtiān",tr:"завтра"},
{hz:"课",py:"kè",tr:"занятие, урок"},
{hz:"上午",py:"shàngwǔ",tr:"до полудня, утро (10-12)"},
{hz:"下午",py:"xiàwǔ",tr:"после полудня, день"},
{hz:"没(有)",py:"méi(yǒu)",tr:"не иметь, нет"},
{hz:"自行车",py:"zìxíngchē",tr:"велосипед"},
{hz:"吧",py:"ba",tr:"частица (предположение / предложение)"},
{hz:"事",py:"shì",tr:"дело, вопрос"},
{hz:"可是",py:"kěshì",tr:"но, однако"},
{hz:"没问题",py:"méi wèntí",tr:"без проблем"},
{hz:"钥匙",py:"yàoshi",tr:"ключ"},
{hz:"车",py:"chē",tr:"машина, велосипед, транспорт"},
{hz:"下",py:"xià",tr:"низ, под, вниз"},
{hz:"车棚",py:"chēpéng",tr:"велопарковка, навес для машин"},
{hz:"里",py:"lǐ",tr:"внутри, в"},
{hz:"后边",py:"hòubian",tr:"сзади, позади"},
{hz:"今天",py:"jīntiān",tr:"сегодня"},
{hz:"晚上",py:"wǎnshang",tr:"вечер"},
{hz:"时间",py:"shíjiān",tr:"время"},
{hz:"电影院",py:"diànyǐngyuàn",tr:"кинотеатр"},
{hz:"电影",py:"diànyǐng",tr:"фильм, кино"},
{hz:"听说",py:"tīngshuō",tr:"слышал, слышно, говорят"},
{hz:"有名",py:"yǒumíng",tr:"знаменитый, известный"},
{hz:"当然",py:"dāngrán",tr:"конечно, разумеется"}
],
grammar:[
{title:"Предложения с 有 (повторение + отрицание)",
explanation:"В Главе 5 мы познакомились с глаголом 有. Теперь закрепим и добавим отрицательные вопросы.\\n\\nСхемы:\\nУтверждение:  Подл. + 有 + Объект\\nОтрицание:  Подл. + 没有 + Объект (НЕ 不有!)\\nВопрос:  Подл. + 有 + Объект + 吗？\\n\\nПолный вопрос «есть или нет»:  Подл. + 有没有 + Объект？\\n— 你有没有自行车？= У тебя есть велосипед или нет?\\n\\nВ ответе можно просто 有 / 没有 без повторения объекта.",
examples:[
{hz:"明天你有课吗？",py:"Míngtiān nǐ yǒu kè ma?",tr:"У тебя завтра есть занятия?"},
{hz:"我上午有课，下午没有。",py:"Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu.",tr:"Утром есть, днём — нет."},
{hz:"我没有自行车。",py:"Wǒ méiyǒu zìxíngchē.",tr:"У меня нет велосипеда."},
{hz:"你有没有钥匙？",py:"Nǐ yǒu méiyǒu yàoshi?",tr:"У тебя есть ключ или нет?"}
]},
{title:"Частица 吧 (1) — «подтверждение догадки»",
explanation:"吧 (ba) в конце вопроса означает «я так думаю — подтверди?». То есть говорящий уже почти уверен и просит подтверждения.\\n\\nСхема:  Утверждение + 吧？\\n\\n你有自行车吧？— «У тебя ведь есть велосипед, правильно?»\\n\\nОтличие от 吗:\\n• 你有自行车吗？— Просто вопрос «есть ли у тебя велосипед?» (не знаю)\\n• 你有自行车吧？— «У тебя же есть, верно?» (думаю что есть)\\n\\nЭто одно из значений 吧. Другое (предложение «давай») — в следующей главе.",
examples:[
{hz:"你有自行车吧？",py:"Nǐ yǒu zìxíngchē ba?",tr:"У тебя же есть велосипед, верно?"},
{hz:"你是美国留学生吧？",py:"Nǐ shì Měiguó liúxuéshēng ba?",tr:"Ты ведь американский студент?"},
{hz:"那是图书馆吧？",py:"Nà shì túshūguǎn ba?",tr:"То ведь библиотека?"},
{hz:"你们明天有汉语课吧？",py:"Nǐmen míngtiān yǒu Hànyǔ kè ba?",tr:"У вас же завтра китайский?"}
]},
{title:"Слова направления как часть существительного: X + 里/上/下/后…",
explanation:"В Главе 4-5 мы учили полные формы: 里边, 上边, 下边 и т.д. Но когда они стоят сразу ПОСЛЕ существительного, 边 можно опустить и остаётся просто 里, 上, 下, 后, 前, 外, 里边/旁边 (旁 нельзя опускать).\\n\\nСхема:  Существительное + место (里/上/下/前/后/外)\\n\\n车棚里 — в велопарковке\\n宿舍楼后 — за общежитием\\n桌子上 — на столе\\n教室外 — снаружи аудитории\\n\\nЭто более разговорный способ, без 的 и без 边.",
examples:[
{hz:"车在车棚里。",py:"Chē zài chēpéng li.",tr:"Велосипед в велопарковке."},
{hz:"她的自行车在楼后。",py:"Tā de zìxíngchē zài lóu hòu.",tr:"Её велосипед за зданием."},
{hz:"古丽在车棚里。",py:"Gǔlì zài chēpéng li.",tr:"Гульнара в велопарковке."},
{hz:"老师在教室里。",py:"Lǎoshī zài jiàoshì li.",tr:"Учитель в аудитории."}
]},
{title:"Слова времени как обстоятельство",
explanation:"Слова времени (今天, 明天, 晚上, 上午, 八点…) ставятся ПЕРЕД глаголом или в начало предложения.\\n\\nСхема 1:  Подл. + [Время] + Глагол + …\\n我明天八点有课。\\n\\nСхема 2:  [Время] + Подл. + Глагол + …\\n今天晚上你有时间吗？\\n\\nМожно комбинировать несколько слов времени (от больших к меньшим):\\n今天晚上八点 — сегодня вечером в 8.\\n明天下午 — завтра днём.\\n\\nВ КИТАЙСКОМ время НЕ ставится в конец (как в английском/русском):\\n❌ 我有课明天\\n✅ 我明天有课",
examples:[
{hz:"今天晚上你有时间吗？",py:"Jīntiān wǎnshang nǐ yǒu shíjiān ma?",tr:"У тебя есть время сегодня вечером?"},
{hz:"我明天八点有课。",py:"Wǒ míngtiān bā diǎn yǒu kè.",tr:"У меня завтра в 8 занятия."},
{hz:"电影晚上有电影。",py:"Diànyǐng wǎnshang yǒu diànyǐng.",tr:"Вечером будут показывать кино."},
{hz:"阿曼下午有事。",py:"Āmàn xiàwǔ yǒu shì.",tr:"У Давэя днём дела."}
]}
],
dialogues:[
{title:"Одалживаем велосипед (古丽 и 中村)",lines:[
{s:"A",hz:"中村，明天你有课吗？",py:"Zhōngcūn, míngtiān nǐ yǒu kè ma?",tr:"Накамура, у тебя завтра есть занятия?"},
{s:"B",hz:"我上午有课，下午没有。",py:"Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu.",tr:"Утром есть, днём нет."},
{s:"A",hz:"你有自行车吧？",py:"Nǐ yǒu zìxíngchē ba?",tr:"У тебя же есть велосипед, верно?"},
{s:"B",hz:"有。什么事？",py:"Yǒu. Shénme shì?",tr:"Есть. А что?"},
{s:"A",hz:"我明天下午去见朋友，可是我没有自行车……",py:"Wǒ míngtiān xiàwǔ qù jiàn péngyou, kěshì wǒ méiyǒu zìxíngchē...",tr:"Завтра днём иду к друзьям, а у меня нет велосипеда…"},
{s:"B",hz:"没问题，我有。这是钥匙，车在楼下车棚里。",py:"Méi wèntí, wǒ yǒu. Zhè shì yàoshi, chē zài lóu xià chēpéng li.",tr:"Без проблем, у меня есть. Вот ключ, велосипед внизу в велопарковке."},
{s:"A",hz:"是宿舍楼后边的车棚吗？",py:"Shì sùshèlóu hòubian de chēpéng ma?",tr:"Велопарковка за общежитием?"},
{s:"B",hz:"对。",py:"Duì.",tr:"Да."}
]},
{title:"Пойдём в кино (阿曼 и 古丽)",lines:[
{s:"A",hz:"古丽，今天晚上你有时间吗？",py:"Gǔlì, jīntiān wǎnshang nǐ yǒu shíjiān ma?",tr:"Гульнара, у тебя есть время сегодня вечером?"},
{s:"B",hz:"有。有事吗？",py:"Yǒu. Yǒu shì ma?",tr:"Есть. А что?"},
{s:"A",hz:"学校电影院有电影，你去吗？",py:"Xuéxiào diànyǐngyuàn yǒu diànyǐng, nǐ qù ma?",tr:"В школьном кинотеатре показывают фильм, пойдёшь?"},
{s:"B",hz:"什么电影？",py:"Shénme diànyǐng?",tr:"Какой фильм?"},
{s:"A",hz:"我不知道名字，可是听说很有名。",py:"Wǒ bù zhīdào míngzi, kěshì tīngshuō hěn yǒumíng.",tr:"Названия не знаю, но говорят очень известный."},
{s:"B",hz:"我当然去。",py:"Wǒ dāngrán qù.",tr:"Конечно пойду."}
]}
],
tips:[
"Деление дня: 早上 (5-9) → 上午 (9-12) → 中午 (12-13) → 下午 (13-18) → 晚上 (18-24). Используй нужное слово, чтобы указать точный период.",
"可是 и 但是 оба значат «но». 可是 чуть более разговорное, 但是 более нейтральное. Между собой почти взаимозаменяемы.",
"没有 часто сокращается до 没 (méi): 我没课 = у меня нет занятий. Но при первом знакомстве лучше говорить полную форму 没有.",
"Запомни пары-противоположности: 今天/明天 (сегодня/завтра), 上午/下午 (до/после полудня), 里/外 (внутри/снаружи), 前/后 (перед/за).",
"当然 (dāngrán) — очень полезное слово для согласия: «конечно!», «разумеется!». Используй вместо 好 когда хочешь подчеркнуть готовность."
]
},
8:{
introduction:"В этой главе вы научитесь называть номер телефона, комнаты, маршрут автобуса, спрашивать «как добраться?» и предлагать «давай...» через частицу 吧. Также познакомитесь с разницей 几 / 多少.\\n\\nСитуация: 王红 звонит 古丽 и приглашает в гости в Цинхуа, они обмениваются адресом и телефонами.",
vocabulary:[
{hz:"周末",py:"zhōumò",tr:"выходные"},
{hz:"啊",py:"a",tr:"частица эмоционального оттенка"},
{hz:"不过",py:"búguò",tr:"но, однако (мягче, чем 可是)"},
{hz:"怎么",py:"zěnme",tr:"как, каким образом"},
{hz:"走",py:"zǒu",tr:"идти, ходить, добираться"},
{hz:"路",py:"lù",tr:"маршрут, дорога"},
{hz:"和",py:"hé",tr:"и (союз между существительными)"},
{hz:"公共汽车",py:"gōnggòng qìchē",tr:"автобус (общественный)"},
{hz:"都",py:"dōu",tr:"все, оба"},
{hz:"到",py:"dào",tr:"прибывать, доезжать"},
{hz:"骑",py:"qí",tr:"ехать верхом (на велосипеде/мотоцикле)"},
{hz:"快",py:"kuài",tr:"быстрый, быстро"},
{hz:"分钟",py:"fēnzhōng",tr:"минута (длительность)"},
{hz:"就",py:"jiù",tr:"уже, сразу же (подчёркивает быстроту)"},
{hz:"校园",py:"xiàoyuán",tr:"кампус, студгородок"},
{hz:"东南",py:"dōngnán",tr:"юго-восток"},
{hz:"东",py:"dōng",tr:"восток"},
{hz:"号",py:"hào",tr:"номер"},
{hz:"房间",py:"fángjiān",tr:"комната"},
{hz:"多少",py:"duōshao",tr:"сколько (для больших чисел)"},
{hz:"室",py:"shì",tr:"комната (в адресе)"},
{hz:"电话",py:"diànhuà",tr:"телефон"},
{hz:"号码",py:"hàomǎ",tr:"номер (телефонный, серийный)"},
{hz:"手机",py:"shǒujī",tr:"мобильный телефон"},
{hz:"等",py:"děng",tr:"ждать"}
],
grammar:[
{title:"Частица 吧 (2) — предложение «давай...»",
explanation:"Это второе значение 吧 (первое — «подтверждение», Глава 7). Здесь 吧 в конце утверждения превращает его в МЯГКОЕ ПРЕДЛОЖЕНИЕ, типа «давай» или «давайте».\\n\\nСхема:  Предложение + 吧！\\n\\nБез 吧: 我们去图书馆。— «Мы идём в библиотеку» (утверждение)\\nС 吧: 我们去图书馆吧！— «Давай пойдём в библиотеку!»\\n\\nЭто не приказ, а дружеское предложение.",
examples:[
{hz:"来我们学校玩儿吧！",py:"Lái wǒmen xuéxiào wánr ba!",tr:"Давай к нам в университет в гости!"},
{hz:"我们去图书馆吧！",py:"Wǒmen qù túshūguǎn ba!",tr:"Давай пойдём в библиотеку!"},
{hz:"我们骑自行车去吧！",py:"Wǒmen qí zìxíngchē qù ba!",tr:"Давай поедем на велосипедах!"},
{hz:"来我家玩儿吧！",py:"Lái wǒ jiā wánr ba!",tr:"Приходи ко мне в гости!"}
]},
{title:"Частица 呢 (2) — смягчение специальных вопросов",
explanation:"В Главе 2 мы учили 呢 для встречных вопросов (你呢？). Это второе значение: 呢 в конце СПЕЦИАЛЬНОГО вопроса (с 怎么/哪儿/谁/什么) смягчает его, делает более раздумчивым.\\n\\nБез 呢: 去图书馆怎么走？— «Как пройти в библиотеку?» (прямой вопрос)\\nС 呢: 去图书馆怎么走呢？— «А как пройти в библиотеку?» (мягче, задумчивее)\\n\\nРазличие тонкое и похоже на русский оттенок с «а?»: «а как пройти?», «а где это?».",
examples:[
{hz:"去你们学校怎么走呢？",py:"Qù nǐmen xuéxiào zěnme zǒu ne?",tr:"А как добраться до вашего университета?"},
{hz:"这是谁的书呢？",py:"Zhè shì shéi de shū ne?",tr:"А чья это книга?"},
{hz:"古丽在哪儿呢？",py:"Gǔlì zài nǎr ne?",tr:"А где Гульнара?"},
{hz:"去图书馆怎么走呢？",py:"Qù túshūguǎn zěnme zǒu ne?",tr:"А как пройти в библиотеку?"}
]},
{title:"Номера: телефоны, комнаты, автобусы",
explanation:"Номера читаются ПО ОДНОЙ ЦИФРЕ (в отличие от обычных чисел, которые читаются как «сорок пять» и т.п.).\\n\\nПример: телефон 63861023 → 六三八六一〇二三 (liù sān bā liù yī líng èr sān).\\n\\nВажно: цифра «1» в номерах часто произносится как 幺 (yāo) вместо 一 (yī). Это чтобы не перепутать с «семь» (qī) по телефону.\\n\\n• Номер дома/комнаты: 502室 → 五〇二室 (wǔ líng èr shì)\\n• Маршрут автобуса: 21路 → 二十一路 (обычное число) или 二一路 (цифры)\\n• Большие номера автобусов: 108路 → 幺〇八路 (yāo líng bā lù)",
examples:[
{hz:"我的房间号是201。",py:"Wǒ de fángjiān hào shì èr líng yāo.",tr:"Номер моей комнаты 201."},
{hz:"我的电话是63861023。",py:"Wǒ de diànhuà shì liù sān bā liù yāo líng èr sān.",tr:"Мой телефон 6386-1023."},
{hz:"108路公共汽车到北京大学。",py:"Yāo líng bā lù gōnggòng qìchē dào Běijīng Dàxué.",tr:"Автобус 108 идёт до Пекинского университета."},
{hz:"我的宿舍是东5号楼502室。",py:"Wǒ de sùshè shì dōng wǔ hào lóu wǔ líng èr shì.",tr:"Моё общежитие — восточный корпус 5, комната 502."}
]},
{title:"几 vs 多少 — когда что использовать",
explanation:"Оба значат «сколько», но разница в ожидаемой величине:\\n\\n• 几 (jǐ) — ожидается МАЛОЕ число (обычно до 10). Требует счётного слова.\\n  你有几个朋友？— Сколько у тебя друзей? (ожидаю 1-10)\\n  几点？— Который час? (1-24)\\n\\n• 多少 (duōshao) — ожидается БОЛЬШОЕ число ИЛИ точно не знаешь сколько. Счётное слово НЕ обязательно.\\n  你的电话是多少？— Какой у тебя номер? (много цифр)\\n  多少钱？— Сколько стоит?\\n  多少学生？— Сколько студентов? (может быть много)\\n\\nДля номеров (телефона, дома, автобуса) ВСЕГДА 多少.",
examples:[
{hz:"你的房间号是多少？",py:"Nǐ de fángjiān hào shì duōshao?",tr:"Какой у тебя номер комнаты?"},
{hz:"你的宿舍是几号楼？",py:"Nǐ de sùshè shì jǐ hào lóu?",tr:"В каком корпусе твоё общежитие? (ожидается 1-9)"},
{hz:"阿曼的电话号码是多少？",py:"Āmàn de diànhuà hàomǎ shì duōshao?",tr:"Какой у Давэя номер телефона?"},
{hz:"你有几个中国朋友？",py:"Nǐ yǒu jǐ ge Zhōngguó péngyou?",tr:"Сколько у тебя китайских друзей?"}
]}
],
dialogues:[
{title:"В гости в Цинхуа (王红 и 古丽 по телефону)",lines:[
{s:"A",hz:"古丽，周末你有空儿吗？",py:"Gǔlì, zhōumò nǐ yǒu kòngr ma?",tr:"Гульнара, на выходных свободна?"},
{s:"B",hz:"有。什么事？",py:"Yǒu. Shénme shì?",tr:"Да. А что?"},
{s:"A",hz:"来我们学校玩儿吧！",py:"Lái wǒmen xuéxiào wánr ba!",tr:"Приезжай к нам в университет в гости!"},
{s:"B",hz:"好啊！不过，去你们学校怎么走呢？",py:"Hǎo a! Búguò, qù nǐmen xuéxiào zěnme zǒu ne?",tr:"Хорошо! А как к вам добраться?"},
{s:"A",hz:"21路和106路公共汽车都到。骑自行车也很快，十五分钟就到。",py:"Èrshíyī lù hé yāo líng liù lù gōnggòng qìchē dōu dào. Qí zìxíngchē yě hěn kuài, shíwǔ fēnzhōng jiù dào.",tr:"Автобусы 21 и 106 оба идут. На велосипеде тоже быстро — 15 минут и ты на месте."},
{s:"B",hz:"你的宿舍在哪儿？",py:"Nǐ de sùshè zài nǎr?",tr:"А где твоё общежитие?"},
{s:"A",hz:"在校园的东南边，是东5号楼。",py:"Zài xiàoyuán de dōngnánbian, shì dōng wǔ hào lóu.",tr:"На юго-востоке кампуса, восточный корпус 5."},
{s:"B",hz:"你的房间号是多少？",py:"Nǐ de fángjiān hào shì duōshao?",tr:"Какой у тебя номер комнаты?"},
{s:"A",hz:"502号。我的宿舍是东5号楼502室。",py:"Wǔ líng èr hào. Wǒ de sùshè shì dōng wǔ hào lóu wǔ líng èr shì.",tr:"502. Моё общежитие — восточный корпус 5, комната 502."},
{s:"B",hz:"你的电话号码是多少？",py:"Nǐ de diànhuà hàomǎ shì duōshao?",tr:"Какой у тебя номер телефона?"},
{s:"A",hz:"63861023。你有手机吗？",py:"Liù sān bā liù yāo líng èr sān. Nǐ yǒu shǒujī ma?",tr:"6386-1023. У тебя есть мобильный?"},
{s:"B",hz:"没有，不过我朋友有。",py:"Méiyǒu, búguò wǒ péngyou yǒu.",tr:"Нет, но у моего друга есть."},
{s:"A",hz:"号码是多少？",py:"Hàomǎ shì duōshao?",tr:"Какой номер?"},
{s:"B",hz:"13695670132。",py:"Yāo sān liù jiǔ wǔ liù qī líng yāo sān èr.",tr:"13695670132."},
{s:"A",hz:"好，我等你。",py:"Hǎo, wǒ děng nǐ.",tr:"Хорошо, жду тебя."}
]}
],
tips:[
"Цифра 1 в номерах = 幺 (yāo), не 一. Это чтобы не спутать с 七 (qī). Все китайцы говорят номера через 幺, а не 一.",
"就 (jiù) подчёркивает быстроту/лёгкость: 十五分钟就到 = «и всего за 15 минут добираешься». Переводится как «уже», «сразу же», но часто только эмоциональный оттенок «и всё».",
"Разница 和 и 跟: оба значат «и» между существительными. 和 (hé) — стандартное письменное, 跟 (gēn) — разговорное. В Главе 8 пока только 和.",
"不过 мягче чем 可是 и 但是. Можно перевести как «правда», «впрочем». Часто используется когда хочешь возразить мягко.",
"Порядок адреса в Китае ОБРАТНЫЙ русскому: страна → город → район → корпус → комната. 北京大学东5号楼502室 — «Пекинский университет, восточный корпус 5, комната 502»."
]
},
9:{
introduction:"В этой главе вы научитесь делать покупки в магазине: спрашивать цену, считать деньги в юанях, использовать счётные слова (瓶, 本) и различать 二 / 两 (два).\\n\\nСитуации: 阿曼 покупает пиво и воду в киоске, 古丽 покупает англо-китайский словарь в книжном.",
vocabulary:[
{hz:"师傅",py:"shīfu",tr:"уважительное обращение к работникам (мастер, шеф)"},
{hz:"买",py:"mǎi",tr:"покупать"},
{hz:"啤酒",py:"píjiǔ",tr:"пиво"},
{hz:"售货员",py:"shòuhuòyuán",tr:"продавец, кассир"},
{hz:"瓶",py:"píng",tr:"бутылка (счётное слово)"},
{hz:"钱",py:"qián",tr:"деньги"},
{hz:"块",py:"kuài",tr:"юань (разговорное)"},
{hz:"两",py:"liǎng",tr:"два (перед счётным словом)"},
{hz:"再",py:"zài",tr:"ещё, снова"},
{hz:"水",py:"shuǐ",tr:"вода"},
{hz:"一共",py:"yígòng",tr:"всего, в общей сумме"},
{hz:"毛",py:"máo",tr:"цзяо, 1/10 юаня (разговорное)"},
{hz:"给",py:"gěi",tr:"давать, вручать"},
{hz:"小姐",py:"xiǎojie",tr:"девушка, мисс"},
{hz:"看",py:"kàn",tr:"смотреть, глядеть"},
{hz:"这些",py:"zhèxiē",tr:"эти (множественное)"},
{hz:"要",py:"yào",tr:"хотеть, нуждаться"},
{hz:"本",py:"běn",tr:"счётное слово для книг"},
{hz:"小",py:"xiǎo",tr:"маленький"},
{hz:"零钱",py:"língqián",tr:"мелочь, сдача"}
],
grammar:[
{title:"Счётные слова (量词) — обязательны с числами!",
explanation:"В китайском между числом (или 这/那) и существительным ОБЯЗАТЕЛЬНО ставится счётное слово. Нельзя сказать «одна книга» как 一书 — нужно 一本书.\\n\\nСхема:  Число / 这 / 那 / 几 + Счётное слово + Существительное\\n\\nОсновные счётные слова:\\n个 (ge) — универсальное (люди, предметы)\\n本 (běn) — книги, словари, журналы\\n瓶 (píng) — бутылки\\n块 (kuài) — кусочки; юани (в деньгах)\\n辆 (liàng) — транспорт (машина, велосипед)\\n位 (wèi) — вежливое для людей (учителя, гости)\\n条 (tiáo) — длинные объекты (собака, дорога, река)\\n\\nСамо существительное иногда можно опустить, если понятно:\\n— 多少钱一瓶？— Сколько за бутылку? (什么bottle понятно)",
examples:[
{hz:"我要一本小词典。",py:"Wǒ yào yì běn xiǎo cídiǎn.",tr:"Мне нужен один маленький словарь."},
{hz:"我买两瓶啤酒。",py:"Wǒ mǎi liǎng píng píjiǔ.",tr:"Я покупаю две бутылки пива."},
{hz:"21路公共汽车。",py:"Èrshíyī lù gōnggòng qìchē.",tr:"Автобус 21-го маршрута."},
{hz:"一位老师",py:"yí wèi lǎoshī",tr:"один учитель (вежливо)"}
]},
{title:"二 и 两 — оба «два», но разные",
explanation:"二 (èr) и 两 (liǎng) — оба значат «2», но используются по-разному:\\n\\n二 (èr) — используется:\\n• При счёте (一, 二, 三...)\\n• В составных числах (十二=12, 二十=20, 二十二=22)\\n• В порядковых (第二 — второй, 二号 — номер 2)\\n• В адресах и номерах (二号楼 — корпус 2)\\n\\n两 (liǎng) — используется:\\n• Перед счётным словом: 两本书 (2 книги), 两个朋友 (2 друга), 两瓶水\\n• Перед «большими» числами: 两千 (2000), 两万 (20000), 两亿\\n\\nПростое правило: если дальше идёт счётное слово или «тысяча/миллион» → 两. В остальных случаях → 二.",
examples:[
{hz:"两本书",py:"liǎng běn shū",tr:"две книги"},
{hz:"十二块",py:"shí'èr kuài",tr:"12 юаней"},
{hz:"第二号楼",py:"dì èr hào lóu",tr:"корпус номер 2"},
{hz:"两千块",py:"liǎng qiān kuài",tr:"2000 юаней"}
]},
{title:"Деньги в юанях — 块 / 毛 / 分",
explanation:"Китайские деньги (人民币, РМБ):\\n\\n• 元 (yuán) — юань (письменно). Разговорно: 块 (kuài).\\n• 角 (jiǎo) — 1/10 юаня. Разговорно: 毛 (máo).\\n• 分 (fēn) — 1/100 юаня (мелочь, редко используется).\\n\\nСхема цен:\\n5.50 юаней → 五块五（毛）— 5 юаней 5 мао\\n12.50 юаней → 十二块五（毛）\\n6.20 юаней → 六块二（毛）\\n74.82 юаней → 七十四块八毛二（分）\\n\\nПоследнее «毛/分» в разговоре обычно опускается.\\n\\n«Сколько стоит?»:  多少钱？ / 多少钱一瓶？",
examples:[
{hz:"多少钱一瓶？",py:"Duōshao qián yì píng?",tr:"Сколько за бутылку?"},
{hz:"三块五。",py:"Sān kuài wǔ.",tr:"3 юаня 5 мао."},
{hz:"一共九块四毛钱。",py:"Yígòng jiǔ kuài sì máo qián.",tr:"Итого 9 юаней 4 мао."},
{hz:"二十二块。",py:"Èrshí'èr kuài.",tr:"22 юаня."}
]}
],
dialogues:[
{title:"В продуктовом магазине (阿曼 и продавец)",lines:[
{s:"A",hz:"师傅，我买啤酒。",py:"Shīfu, wǒ mǎi píjiǔ.",tr:"Мастер, я хочу купить пиво."},
{s:"B",hz:"你买几瓶？",py:"Nǐ mǎi jǐ píng?",tr:"Сколько бутылок?"},
{s:"A",hz:"多少钱一瓶？",py:"Duōshao qián yì píng?",tr:"Сколько за бутылку?"},
{s:"B",hz:"三块五。",py:"Sān kuài wǔ.",tr:"3 юаня 5 мао."},
{s:"A",hz:"我买两瓶，再买两瓶水。",py:"Wǒ mǎi liǎng píng, zài mǎi liǎng píng shuǐ.",tr:"Беру две, и ещё две бутылки воды."},
{s:"B",hz:"两瓶啤酒七块，两瓶水两块四，一共是九块四毛钱。",py:"Liǎng píng píjiǔ qī kuài, liǎng píng shuǐ liǎng kuài sì, yígòng shì jiǔ kuài sì máo qián.",tr:"Две бутылки пива — 7 юаней, две воды — 2.40, итого 9.40."},
{s:"A",hz:"给你钱。",py:"Gěi nǐ qián.",tr:"Вот деньги."}
]},
{title:"В книжном (古丽 и продавец)",lines:[
{s:"A",hz:"小姐，有英汉词典吗？",py:"Xiǎojie, yǒu Yīng-Hàn cídiǎn ma?",tr:"Девушка, есть англо-китайский словарь?"},
{s:"B",hz:"有。你看，这些都是，你要哪本呢？",py:"Yǒu. Nǐ kàn, zhèxiē dōu shì, nǐ yào nǎ běn ne?",tr:"Да, есть. Вот смотрите, все эти. Какой хотите?"},
{s:"A",hz:"我要这本小词典。多少钱一本？",py:"Wǒ yào zhè běn xiǎo cídiǎn. Duōshao qián yì běn?",tr:"Хочу вот этот маленький словарь. Сколько стоит?"},
{s:"B",hz:"二十二块。",py:"Èrshí'èr kuài.",tr:"22 юаня."},
{s:"A",hz:"对不起，我没有零钱。",py:"Duìbuqǐ, wǒ méiyǒu língqián.",tr:"Извините, у меня нет мелочи."},
{s:"B",hz:"没关系。",py:"Méi guānxi.",tr:"Ничего страшного."}
]}
],
tips:[
"师傅 (shīfu) — обращение к таксистам, мастерам, продавцам, рабочим. Дословно «учитель-мастер». Очень вежливо и уместно в любом бытовом контексте.",
"Главное счётное слово 个 (ge) подходит почти всегда, если не знаешь правильное. Но если знаешь — используй подходящее (本 для книг, 瓶 для бутылок и т.д.), звучит грамотнее.",
"В цене последнее «毛/分» часто опускают: 三块五 = 3 юаня 5 мао (подразумевается 3.50). Если бы было 3 юаня 5 фэнь — сказали бы полностью 三块零五分.",
"要 (yào) — «хотеть/брать» в магазине. «Я беру вот этот» = 我要这本. Более разговорно и уверенно, чем 我买.",
"英汉 / 汉英 / 汉日 — структура «язык1-язык2 словарь» = с первого на второй. 英汉词典 = англо-китайский (с англ. на кит.)."
]
},
10:{
introduction:"Это итоговая глава Unit 2 — повторение и расширение. Вы научитесь рассказывать о своей семье, использовать счётное слово 口 (для членов семьи) и 条 (для собак, рек, дорог), а также слово 还 («ещё, вдобавок»).\\n\\nСитуация: 古丽 и 王红 смотрят семейное фото и рассказывают друг другу о своих семьях.",
vocabulary:[
{hz:"照片",py:"zhàopiàn",tr:"фото, фотография"},
{hz:"家",py:"jiā",tr:"семья, дом"},
{hz:"口",py:"kǒu",tr:"счётное слово для членов семьи"},
{hz:"爷爷",py:"yéye",tr:"дедушка (по отцу)"},
{hz:"奶奶",py:"nǎinai",tr:"бабушка (по отцу)"},
{hz:"爸爸",py:"bàba",tr:"папа"},
{hz:"妈妈",py:"māma",tr:"мама"},
{hz:"哥哥",py:"gēge",tr:"старший брат"},
{hz:"姐姐",py:"jiějie",tr:"старшая сестра"},
{hz:"家庭",py:"jiātíng",tr:"семья (как ячейка общества)"},
{hz:"一般",py:"yìbān",tr:"обычно, в общем"},
{hz:"只",py:"zhǐ",tr:"только, лишь"},
{hz:"孩子",py:"háizi",tr:"ребёнок"},
{hz:"弟弟",py:"dìdi",tr:"младший брат"},
{hz:"妹妹",py:"mèimei",tr:"младшая сестра"},
{hz:"还",py:"hái",tr:"ещё, вдобавок, также"},
{hz:"条",py:"tiáo",tr:"счётное слово (длинные/тонкие объекты)"},
{hz:"狗",py:"gǒu",tr:"собака"},
{hz:"这样",py:"zhèyàng",tr:"так, таким образом"}
],
grammar:[
{title:"Счётное слово 口 — для членов семьи",
explanation:"口 (kǒu) — особое счётное слово для подсчёта человек в СЕМЬЕ. В других контекстах 口 для людей НЕ используется — там 个.\\n\\nВопрос:  你家有几口人？— «Сколько человек в твоей семье?»\\nОтвет:  我家有五口人。— «В моей семье пять человек.»\\n\\nНельзя сказать:\\n❌ 五口学生 (пять студентов — там 个)\\n❌ 五口朋友 (пять друзей — там 个)\\n\\nТолько:  ⃝口 + 人 (про семью).",
examples:[
{hz:"你家有几口人？",py:"Nǐ jiā yǒu jǐ kǒu rén?",tr:"Сколько человек в твоей семье?"},
{hz:"我家有五口人。",py:"Wǒ jiā yǒu wǔ kǒu rén.",tr:"В моей семье пять человек."},
{hz:"一共六口人。",py:"Yígòng liù kǒu rén.",tr:"Итого шесть человек."},
{hz:"我家有四口人：爸爸、妈妈、哥哥和我。",py:"Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.",tr:"В нашей семье четверо: папа, мама, старший брат и я."}
]},
{title:"Счётное слово 条 — для длинных/тонких объектов",
explanation:"条 (tiáo) используется для предметов, имеющих длинную, тонкую или гибкую форму.\\n\\nЧто считается через 条:\\n• Собаки — 一条狗 (одна собака)\\n• Рыбы — 一条鱼\\n• Реки — 一条河\\n• Дороги — 一条路\\n• Улицы — 一条街\\n• Штаны/юбки — 一条裤子\\n• Шарфы/полотенца — 一条围巾\\n\\nЛогика — «длинное и тонкое/гибкое».",
examples:[
{hz:"我家有一条狗。",py:"Wǒ jiā yǒu yì tiáo gǒu.",tr:"У нас дома есть собака."},
{hz:"还有一条狗。",py:"Hái yǒu yì tiáo gǒu.",tr:"И ещё собака."},
{hz:"北京有很多条路。",py:"Běijīng yǒu hěn duō tiáo lù.",tr:"В Пекине много дорог."},
{hz:"两条鱼",py:"liǎng tiáo yú",tr:"две рыбы"}
]},
{title:"Наречие 还 — «ещё, вдобавок, также»",
explanation:"还 (hái) добавляет что-то к уже сказанному. Ставится перед глаголом.\\n\\nСхема:  Подл. + 还 + Глагол + Объект\\n\\n我有爸爸、妈妈，还有一个哥哥。\\n«У меня есть папа, мама и ещё старший брат.»\\n\\nЧасто 还有… = «и ещё есть…» — идеальное выражение для списков.\\n\\n还 в других значениях:\\n• «Всё ещё»: 我还在家 — Я всё ещё дома.\\n• «Довольно» (с прилагательным): 还好 — неплохо.\\nВ Главе 10 акцент только на «ещё, вдобавок».",
examples:[
{hz:"我家有爸爸、妈妈，还有一条狗。",py:"Wǒ jiā yǒu bàba, māma, hái yǒu yì tiáo gǒu.",tr:"У нас дома папа, мама и ещё собака."},
{hz:"我有美国朋友，还有日本朋友。",py:"Wǒ yǒu Měiguó péngyou, hái yǒu Rìběn péngyou.",tr:"У меня есть американские и ещё японские друзья."},
{hz:"我有一个姐姐，还有一个妹妹。",py:"Wǒ yǒu yí ge jiějie, hái yǒu yí ge mèimei.",tr:"У меня есть старшая сестра и ещё младшая."}
]}
],
dialogues:[
{title:"О семьях (古丽 и 王红)",lines:[
{s:"A",hz:"这是你的照片吗？",py:"Zhè shì nǐ de zhàopiàn ma?",tr:"Это твоё фото?"},
{s:"B",hz:"对，是我家的照片。",py:"Duì, shì wǒ jiā de zhàopiàn.",tr:"Да, это фото моей семьи."},
{s:"A",hz:"你家有几口人？",py:"Nǐ jiā yǒu jǐ kǒu rén?",tr:"Сколько человек в твоей семье?"},
{s:"B",hz:"我家有五口人：爷爷、奶奶、爸爸、妈妈和我。",py:"Wǒ jiā yǒu wǔ kǒu rén: yéye, nǎinai, bàba, māma hé wǒ.",tr:"В нашей семье пятеро: дедушка, бабушка, папа, мама и я."},
{s:"A",hz:"你没有哥哥姐姐吗？",py:"Nǐ méiyǒu gēge jiějie ma?",tr:"А братьев и сестёр нет?"},
{s:"B",hz:"没有，现在中国家庭一般只有一个孩子。古丽，你家都有什么人？",py:"Méiyǒu, xiànzài Zhōngguó jiātíng yìbān zhǐ yǒu yí ge háizi. Gǔlì, nǐ jiā dōu yǒu shénme rén?",tr:"Нет, сейчас в китайских семьях обычно только один ребёнок. А у тебя кто в семье, Гульнара?"},
{s:"A",hz:"我家有爸爸、妈妈、哥哥、弟弟、妹妹，还有一条狗。",py:"Wǒ jiā yǒu bàba, māma, gēge, dìdi, mèimei, hái yǒu yì tiáo gǒu.",tr:"У нас папа, мама, старший брат, младший брат, младшая сестра и ещё собака."},
{s:"B",hz:"一共六口人？",py:"Yígòng liù kǒu rén?",tr:"Итого шесть человек?"},
{s:"A",hz:"不，七口。",py:"Bù, qī kǒu.",tr:"Нет, семь."},
{s:"B",hz:"爸爸、妈妈、一个哥哥、一个弟弟、一个妹妹和你，六口，对吧？",py:"Bàba, māma, yí ge gēge, yí ge dìdi, yí ge mèimei hé nǐ, liù kǒu, duì ba?",tr:"Папа, мама, один брат, один младший, сестра и ты — шесть, верно?"},
{s:"A",hz:"不对，还有一条狗。",py:"Bú duì, hái yǒu yì tiáo gǒu.",tr:"Нет, ещё собака!"},
{s:"B",hz:"是这样……",py:"Shì zhèyàng...",tr:"Вот оно как..."}
]}
],
tips:[
"В Китае до 2015 года действовала «политика одного ребёнка» (一胎政策) — большинство семей 王红 в 2003 году имели только одного ребёнка. Это важный культурный контекст.",
"Семья по линиям: 爷爷/奶奶 — по отцу, 外公/外婆 (wàigōng/wàipó) — по матери. В современном Китае 爷爷/奶奶 часто используется общо для любого дедушки.",
"Братья/сёстры в китайском ВСЕГДА разделяются по возрасту: 哥哥 (старший) ≠ 弟弟 (младший). Не существует общего слова «брат».",
"Удвоение слов в названиях родственников (爸爸, 妈妈, 哥哥) — это детская/нежная форма. В формальной речи могут быть другие слова (父亲 fùqin — отец, 母亲 mǔqin — мать).",
"对吧？ в конце — «верно? так?» (как «吧» из Главы 7 — подтверждение догадки). Очень частая разговорная фраза."
]
},
11:{
introduction:"В этой главе вы научитесь говорить о погоде, сравнивать времена года и использовать прилагательные как сказуемое (без 是). Познакомитесь с вопросом 怎么样 («как?»), конструкцией 不А不B («ни A ни B — как раз») и наречием 比较.\\n\\nСитуации: 古丽 спрашивает у 中村 какая сегодня погода, 阿曼 обсуждает с 王老师 сезоны в Пекине.",
vocabulary:[
{hz:"天气",py:"tiānqì",tr:"погода"},
{hz:"怎么样",py:"zěnmeyàng",tr:"как? каково?"},
{hz:"不太",py:"bú tài",tr:"не очень, не слишком"},
{hz:"风",py:"fēng",tr:"ветер"},
{hz:"雨",py:"yǔ",tr:"дождь"},
{hz:"冷",py:"lěng",tr:"холодный"},
{hz:"度",py:"dù",tr:"градус"},
{hz:"晴天",py:"qíngtiān",tr:"ясная погода"},
{hz:"秋天",py:"qiūtiān",tr:"осень"},
{hz:"热",py:"rè",tr:"жаркий"},
{hz:"舒服",py:"shūfu",tr:"комфортно, удобно"},
{hz:"最",py:"zuì",tr:"самый, наиболее"},
{hz:"季节",py:"jìjié",tr:"сезон, время года"},
{hz:"冬天",py:"dōngtiān",tr:"зима"},
{hz:"比较",py:"bǐjiào",tr:"сравнительно, довольно"},
{hz:"差不多",py:"chàbuduō",tr:"почти, примерно"},
{hz:"零下",py:"língxià",tr:"ниже нуля"},
{hz:"常常",py:"chángcháng",tr:"часто, обычно"},
{hz:"下",py:"xià",tr:"падать, идти (о дожде/снеге)"},
{hz:"雪",py:"xuě",tr:"снег"},
{hz:"常",py:"cháng",tr:"часто"},
{hz:"喜欢",py:"xǐhuan",tr:"любить, нравиться"},
{hz:"夏天",py:"xiàtiān",tr:"лето"},
{hz:"游泳",py:"yóuyǒng",tr:"плавать"},
{hz:"春天",py:"chūntiān",tr:"весна"},
{hz:"北京",py:"Běijīng",tr:"Пекин"}
],
grammar:[
{title:"Вопрос 怎么样 — «как?, каково?»",
explanation:"怎么样 (zěnmeyàng) — спрашивает о состоянии, качестве, мнении. Ставится в КОНЕЦ предложения.\\n\\nСхема:  Существительное + 怎么样？\\n\\n今天的天气怎么样？— Какая сегодня погода?\\n这个电影怎么样？— Как этот фильм?\\n\\nТакже часто используется как предложение:\\n我们去图书馆，怎么样？— Пойдём в библиотеку, как?",
examples:[
{hz:"今天的天气怎么样？",py:"Jīntiān de tiānqì zěnmeyàng?",tr:"Какая сегодня погода?"},
{hz:"北京秋天的天气怎么样？",py:"Běijīng qiūtiān de tiānqì zěnmeyàng?",tr:"Какая погода осенью в Пекине?"},
{hz:"爷爷的身体怎么样？",py:"Yéye de shēntǐ zěnmeyàng?",tr:"Как здоровье у дедушки?"},
{hz:"这件毛衣怎么样？",py:"Zhè jiàn máoyī zěnmeyàng?",tr:"Как тебе этот свитер?"}
]},
{title:"Прилагательное-сказуемое без 是",
explanation:"В китайском прилагательное САМО является сказуемым — 是 НЕ нужно.\\n\\n❌ 这个学校是小 (неправильно!)\\n✅ 这个学校很小。— Эта школа очень маленькая.\\n\\nВажно: без наречия (很, 比较, 挺, 太…) прилагательное звучит как сравнение:\\n• 我的房间大。— Моя комната большая (подразумевает сравнение: больше другой).\\n• 我的房间很大。— Моя комната просто большая (нейтрально).\\n\\nПоэтому 很 часто добавляют даже когда не хотят сказать «очень» — это «грамматическая прокладка».",
examples:[
{hz:"听说北京的冬天很冷。",py:"Tīngshuō Běijīng de dōngtiān hěn lěng.",tr:"Говорят, зима в Пекине холодная."},
{hz:"那个学校很小。",py:"Nàge xuéxiào hěn xiǎo.",tr:"Та школа маленькая."},
{hz:"今天的天气不太好。",py:"Jīntiān de tiānqì bú tài hǎo.",tr:"Сегодня погода не очень."},
{hz:"这个电影很有名。",py:"Zhège diànyǐng hěn yǒumíng.",tr:"Этот фильм очень известный."}
]},
{title:"不A不B — «ни А ни B» = «в самый раз»",
explanation:"Конструкция 不+прил.1 + 不+прил.2 (где прил.1 и прил.2 — антонимы) означает «не слишком X, не слишком Y — в самый раз».\\n\\nЭто положительная характеристика, означает идеальный баланс.\\n\\n不冷不热 — не холодно и не жарко (в самый раз)\\n不大不小 — ни большой, ни маленький\\n不早不晚 — ни рано, ни поздно\\n不快不慢 — ни быстро, ни медленно",
examples:[
{hz:"北京的秋天不冷不热，很舒服。",py:"Běijīng de qiūtiān bù lěng bú rè, hěn shūfu.",tr:"Осень в Пекине — не холодно и не жарко, комфортно."},
{hz:"这件毛衣不大不小。",py:"Zhè jiàn máoyī bú dà bù xiǎo.",tr:"Этот свитер в самый раз по размеру."},
{hz:"我们不早不晚到了。",py:"Wǒmen bù zǎo bù wǎn dào le.",tr:"Мы пришли вовремя."}
]},
{title:"Наречия степени: 很, 比较, 挺, 最, 太, 不太",
explanation:"В китайском много способов выразить степень качества:\\n\\n• 很 (hěn) — «очень» / нейтральная прокладка\\n• 比较 (bǐjiào) — «сравнительно, довольно»\\n• 挺 (tǐng) — «вполне, довольно» (разговорное, часто с 的)\\n• 最 (zuì) — «самый»\\n• 太 (tài) — «слишком» (с 了)\\n• 不太 (bú tài) — «не очень, не слишком»\\n\\nСхема:  Подл. + наречие + прилагательное\\n\\nПо силе: 不太 < 比较 ≈ 挺 < 很 < 最 < 太.",
examples:[
{hz:"北京的冬天比较冷。",py:"Běijīng de dōngtiān bǐjiào lěng.",tr:"Зима в Пекине довольно холодная."},
{hz:"最冷差不多零下十五度。",py:"Zuì lěng chàbuduō língxià shíwǔ dù.",tr:"В самые холодные дни — примерно минус 15."},
{hz:"今天不太冷。",py:"Jīntiān bú tài lěng.",tr:"Сегодня не очень холодно."},
{hz:"太热了！",py:"Tài rè le!",tr:"Слишком жарко!"}
]}
],
dialogues:[
{title:"Погода сегодня (古丽 и 中村)",lines:[
{s:"A",hz:"今天的天气怎么样？",py:"Jīntiān de tiānqì zěnmeyàng?",tr:"Какая сегодня погода?"},
{s:"B",hz:"不太好，有风，下午还有雨。",py:"Bú tài hǎo, yǒu fēng, xiàwǔ hái yǒu yǔ.",tr:"Не очень, ветрено, днём ещё дождь."},
{s:"A",hz:"冷吗？",py:"Lěng ma?",tr:"Холодно?"},
{s:"B",hz:"不冷，二十度。",py:"Bù lěng, èrshí dù.",tr:"Нет, 20 градусов."},
{s:"A",hz:"明天呢？",py:"Míngtiān ne?",tr:"А завтра?"},
{s:"B",hz:"明天是晴天。",py:"Míngtiān shì qíngtiān.",tr:"Завтра солнечно."}
]},
{title:"Сезоны в Пекине (阿曼 и 王老师)",lines:[
{s:"A",hz:"老师，北京秋天的天气怎么样？",py:"Lǎoshī, Běijīng qiūtiān de tiānqì zěnmeyàng?",tr:"Учитель, какая погода осенью в Пекине?"},
{s:"B",hz:"北京的秋天不冷不热，很舒服，是最好的季节。",py:"Běijīng de qiūtiān bù lěng bú rè, hěn shūfu, shì zuì hǎo de jìjié.",tr:"Осень в Пекине — не холодно и не жарко, очень комфортно, лучший сезон."},
{s:"A",hz:"冬天呢？听说北京的冬天很冷，是吗？",py:"Dōngtiān ne? Tīngshuō Běijīng de dōngtiān hěn lěng, shì ma?",tr:"А зима? Говорят, зимой очень холодно?"},
{s:"B",hz:"对，北京的冬天比较冷，最冷差不多零下十五度。",py:"Duì, Běijīng de dōngtiān bǐjiào lěng, zuì lěng chàbuduō língxià shíwǔ dù.",tr:"Да, зима довольно холодная, в самые холодные дни около -15."},
{s:"A",hz:"常常下雪吗？",py:"Chángcháng xià xuě ma?",tr:"Часто идёт снег?"},
{s:"B",hz:"不常下雪。阿曼，你最喜欢哪个季节？",py:"Bù cháng xià xuě. Āmàn, nǐ zuì xǐhuan nǎge jìjié?",tr:"Нечасто. Аман, а какой твой любимый сезон?"},
{s:"A",hz:"我喜欢夏天，我喜欢游泳。老师，您呢？",py:"Wǒ xǐhuan xiàtiān, wǒ xǐhuan yóuyǒng. Lǎoshī, nín ne?",tr:"Я люблю лето, люблю плавать. А вы, учитель?"},
{s:"B",hz:"我喜欢春天。",py:"Wǒ xǐhuan chūntiān.",tr:"Я люблю весну."}
]}
],
tips:[
"В Китае температура в Цельсиях, не в Фаренгейтах. 二十度 = 20°C. «Минус» = 零下 (língxià — «ниже нуля»): 零下十度 = -10°C.",
"Четыре сезона: 春天 (весна), 夏天 (лето), 秋天 (осень), 冬天 (зима). Все заканчиваются на 天.",
"下雨 (идёт дождь) и 下雪 (идёт снег) — буквально «падает дождь/снег». Глагол 下 здесь = «падать, идти».",
"不太 перед прилагательным = «не очень». 不太好 (неочень), 不太冷 (не очень холодно) — вежливая форма выразить слабое несогласие.",
"差不多 (chàbuduō) — очень частое слово «почти, примерно, около того». Буквально «не хватает немного». Ключевая фраза разговорного китайского."
]
},
12:{
introduction:"В этой главе вы научитесь говорить о том, что делаете прямо сейчас (настоящее продолженное время), называть дни недели и использовать выражения «от... до...» (从……到……). Также познакомитесь со словом 每 («каждый»).\\n\\nСитуация: 阿曼 и 古丽 разговаривают по телефону о том, кто что делает — 阿曼 делает уроки, 古丽 в баре с подругой.",
vocabulary:[
{hz:"喂",py:"wèi",tr:"алло (по телефону)"},
{hz:"啊",py:"a",tr:"а, о (восклицание)"},
{hz:"在",py:"zài",tr:"сейчас (указывает на продолженное действие)"},
{hz:"干",py:"gàn",tr:"делать, заниматься (разговорное)"},
{hz:"做",py:"zuò",tr:"делать"},
{hz:"作业",py:"zuòyè",tr:"домашнее задание"},
{hz:"每",py:"měi",tr:"каждый"},
{hz:"天",py:"tiān",tr:"день"},
{hz:"多",py:"duō",tr:"много"},
{hz:"星期三",py:"xīngqīsān",tr:"среда"},
{hz:"从……到",py:"cóng...dào",tr:"от... до..."},
{hz:"中午",py:"zhōngwǔ",tr:"полдень"},
{hz:"节",py:"jié",tr:"счётное слово для уроков (пар)"},
{hz:"听写",py:"tīngxiě",tr:"диктант"},
{hz:"所以",py:"suǒyǐ",tr:"поэтому, итак"},
{hz:"酒吧",py:"jiǔbā",tr:"бар"},
{hz:"喝",py:"hē",tr:"пить"},
{hz:"咖啡",py:"kāfēi",tr:"кофе"},
{hz:"书店",py:"shūdiàn",tr:"книжный магазин"},
{hz:"对面",py:"duìmiàn",tr:"напротив"},
{hz:"自己",py:"zìjǐ",tr:"сам, самостоятельно"},
{hz:"正在",py:"zhèngzài",tr:"как раз (сейчас), в процессе"},
{hz:"唱",py:"chàng",tr:"петь"},
{hz:"歌",py:"gē",tr:"песня"},
{hz:"回",py:"huí",tr:"возвращаться"}
],
grammar:[
{title:"Настоящее продолженное время: 正在/在...呢",
explanation:"Чтобы сказать «я делаю X прямо сейчас», в китайском используют одну из конструкций:\\n\\n• 正在 + Глагол + (Объект) + 呢\\n• 在 + Глагол + (Объект) + 呢\\n• Глагол + (Объект) + 呢\\n\\nВсе три варианта означают примерно одно и то же. Самая полная форма — 正在……呢.\\n\\nОтрицание: 没 + Глагол (без 在 и 呢).\\n— 他没看电影。— Он не смотрит фильм (сейчас).",
examples:[
{hz:"你在干什么呢？",py:"Nǐ zài gàn shénme ne?",tr:"Что ты сейчас делаешь?"},
{hz:"我正在做作业呢。",py:"Wǒ zhèngzài zuò zuòyè ne.",tr:"Я как раз делаю уроки."},
{hz:"他们正在唱歌呢。",py:"Tāmen zhèngzài chàng gē ne.",tr:"Они сейчас поют."},
{hz:"外面下雨呢。",py:"Wàimiàn xià yǔ ne.",tr:"На улице идёт дождь."}
]},
{title:"Дни недели",
explanation:"Дни недели строятся по схеме: 星期 + число (1-6) или 天/日.\\n\\n星期一 xīngqīyī — понедельник\\n星期二 xīngqī'èr — вторник\\n星期三 xīngqīsān — среда\\n星期四 xīngqīsì — четверг\\n星期五 xīngqīwǔ — пятница\\n星期六 xīngqīliù — суббота\\n星期日 / 星期天 xīngqīrì / xīngqītiān — воскресенье\\n\\nВопрос: 今天(是)星期几？— Сегодня какой день?\\nОтвет: 今天(是)星期三。— Среда.",
examples:[
{hz:"今天是星期三。",py:"Jīntiān shì xīngqīsān.",tr:"Сегодня среда."},
{hz:"明天是星期几？",py:"Míngtiān shì xīngqī jǐ?",tr:"Какой завтра день?"},
{hz:"星期天我不上课。",py:"Xīngqītiān wǒ bú shàng kè.",tr:"В воскресенье у меня нет занятий."},
{hz:"星期一到星期五",py:"xīngqīyī dào xīngqīwǔ",tr:"с понедельника по пятницу"}
]},
{title:"每……都 — «каждый X всегда...»",
explanation:"每 (měi) — «каждый». Часто сопровождается 都 (dōu — «все, всегда») перед глаголом, чтобы подчеркнуть отсутствие исключений.\\n\\nСхема:  每 + [сч.слово] + Сущ. + 都 + Глагол\\n\\n每天都 — каждый день (все дни)\\n每个人都 — каждый человек (все)\\n每个星期都 — каждую неделю\\n\\nБез 都 звучит неполно. Запомни: 每 почти всегда идёт в паре с 都.",
examples:[
{hz:"你每天都有很多作业吗？",py:"Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?",tr:"У тебя каждый день много заданий?"},
{hz:"我每天早上都喝咖啡。",py:"Wǒ měi tiān zǎoshang dōu hē kāfēi.",tr:"Я каждое утро пью кофе."},
{hz:"他们每个人都知道。",py:"Tāmen měi ge rén dōu zhīdào.",tr:"Каждый из них знает."},
{hz:"阿曼每天晚上都去酒吧。",py:"Āmàn měi tiān wǎnshang dōu qù jiǔbā.",tr:"Аман каждый вечер ходит в бар."}
]},
{title:"从……到…… — «от... до...»",
explanation:"从 A 到 B означает «от A до B» — и для времени, и для места.\\n\\nСхема:  从 + [точка 1] + 到 + [точка 2]\\n\\nВремя:\\n从早上八点到中午十二点 — с 8 утра до полудня\\n从星期一到星期五 — с понедельника по пятницу\\n\\nМесто:\\n从北京到上海 — из Пекина в Шанхай\\n从家到学校 — от дома до школы\\n\\nВсегда идёт пара: если есть 从, то должно быть 到.",
examples:[
{hz:"从早上八点到中午十二点，我有四节课。",py:"Cóng zǎoshang bā diǎn dào zhōngwǔ shí'èr diǎn, wǒ yǒu sì jié kè.",tr:"С 8 утра до полудня у меня 4 пары."},
{hz:"我从八点到十一点有课。",py:"Wǒ cóng bā diǎn dào shíyī diǎn yǒu kè.",tr:"У меня занятия с 8 до 11."},
{hz:"他们从星期一到星期五都有课。",py:"Tāmen cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.",tr:"У них занятия с понедельника по пятницу."},
{hz:"从北京到上海很远。",py:"Cóng Běijīng dào Shànghǎi hěn yuǎn.",tr:"От Пекина до Шанхая далеко."}
]}
],
dialogues:[
{title:"Телефонный разговор (阿曼 и 古丽)",lines:[
{s:"A",hz:"喂，你好！",py:"Wèi, nǐ hǎo!",tr:"Алло, привет!"},
{s:"B",hz:"喂，阿曼，是我，古丽。",py:"Wèi, Āmàn, shì wǒ, Gǔlì.",tr:"Алло, Аман, это я, Гульнара."},
{s:"A",hz:"啊，古丽，你好！",py:"A, Gǔlì, nǐ hǎo!",tr:"А, Гульнара, привет!"},
{s:"B",hz:"阿曼，你在干什么呢？",py:"Āmàn, nǐ zài gàn shénme ne?",tr:"Аман, ты что сейчас делаешь?"},
{s:"A",hz:"做作业呢。",py:"Zuò zuòyè ne.",tr:"Делаю уроки."},
{s:"B",hz:"是吗？你每天都有很多作业吗？",py:"Shì ma? Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?",tr:"Правда? У тебя каждый день много заданий?"},
{s:"A",hz:"不是。今天是星期三，从早上八点到中午十二点，我有四节课，明天还有听写，所以作业很多。你呢？在干什么呢？",py:"Bú shì. Jīntiān shì xīngqīsān, cóng zǎoshang bā diǎn dào zhōngwǔ shí'èr diǎn, wǒ yǒu sì jié kè, míngtiān hái yǒu tīngxiě, suǒyǐ zuòyè hěn duō. Nǐ ne? Zài gàn shénme ne?",tr:"Нет. Сегодня среда, с 8 утра до 12 у меня было 4 пары, завтра ещё диктант, поэтому много заданий. А ты что делаешь?"},
{s:"B",hz:"我在酒吧喝咖啡呢。",py:"Wǒ zài jiǔbā hē kāfēi ne.",tr:"Я в баре пью кофе."},
{s:"A",hz:"哪个酒吧？",py:"Nǎge jiǔbā?",tr:"В каком баре?"},
{s:"B",hz:"学校书店对面的那个。",py:"Xuéxiào shūdiàn duìmiàn de nàge.",tr:"В том, напротив книжного."},
{s:"A",hz:"你自己吗？",py:"Nǐ zìjǐ ma?",tr:"Ты одна?"},
{s:"B",hz:"不，还有我的同屋和她的朋友，他们正在唱歌呢。",py:"Bù, hái yǒu wǒ de tóngwū hé tā de péngyou, tāmen zhèngzài chàng gē ne.",tr:"Нет, ещё моя соседка и её подруга, они как раз поют."},
{s:"A",hz:"明天你们没有课吗？",py:"Míngtiān nǐmen méiyǒu kè ma?",tr:"У вас завтра нет занятий?"},
{s:"B",hz:"有，我们十点就回宿舍。",py:"Yǒu, wǒmen shí diǎn jiù huí sùshè.",tr:"Есть, мы в 10 уже вернёмся в общежитие."}
]}
],
tips:[
"喂 (wèi) — только для телефона! Не используется для «здравствуй» лично. На звонке первое слово ВСЕГДА 喂.",
"干 (gàn) и 做 (zuò) — оба значат «делать». 干 — более разговорное и общее («чем занимаешься?»), 做 — более конкретное («делать что-то»).",
"节 (jié) — счётное слово для уроков/пар. «Три пары» = 三节课, не 三个课.",
"В китайском понятия «неделя»: 星期 (xīngqī) — стандартное, 周 (zhōu) — более формальное (周末 — выходные, 周一 — пн), 礼拜 (lǐbài) — разговорное.",
"所以 (suǒyǐ) — «поэтому». Часто идёт в паре с 因为 (yīnwèi — «потому что»): 因为...所以... — «потому что... поэтому...»."
]
},
13:{
introduction:"В этой главе вы научитесь составлять предложения с несколькими глаголами подряд (идти + делать), использовать связку 先……然后 («сначала… потом»), альтернативный вопрос через 不 (贵不贵?) и отличать 咱们 от 我们.\\n\\nСитуации: 阿曼 и 张伟 идут вместе в банк и магазин, 古丽 и 中村 планируют поход в ТЦ.",
vocabulary:[
{hz:"借",py:"jiè",tr:"брать/давать взаймы"},
{hz:"先",py:"xiān",tr:"сначала, сперва"},
{hz:"银行",py:"yínháng",tr:"банк"},
{hz:"换",py:"huàn",tr:"менять, обменивать"},
{hz:"然后",py:"ránhòu",tr:"затем, потом"},
{hz:"商店",py:"shāngdiàn",tr:"магазин"},
{hz:"东西",py:"dōngxi",tr:"вещь, вещи"},
{hz:"咱们",py:"zánmen",tr:"мы (включая собеседника)"},
{hz:"一起",py:"yìqǐ",tr:"вместе"},
{hz:"关门",py:"guān mén",tr:"закрывать дверь, закрываться"},
{hz:"关",py:"guān",tr:"закрывать"},
{hz:"星期天",py:"xīngqītiān",tr:"воскресенье"},
{hz:"打算",py:"dǎsuàn",tr:"планировать, собираться"},
{hz:"购物中心",py:"gòuwù zhōngxīn",tr:"торговый центр"},
{hz:"购物",py:"gòu wù",tr:"делать покупки"},
{hz:"中心",py:"zhōngxīn",tr:"центр"},
{hz:"贵",py:"guì",tr:"дорогой"},
{hz:"还可以",py:"hái kěyǐ",tr:"нормально, пойдёт, сносно"},
{hz:"质量",py:"zhìliàng",tr:"качество"},
{hz:"不错",py:"búcuò",tr:"неплохо, хорошо"},
{hz:"正",py:"zhèng",tr:"как раз, именно"},
{hz:"衣服",py:"yīfu",tr:"одежда"},
{hz:"开门",py:"kāi mén",tr:"открывать, открываться"},
{hz:"开",py:"kāi",tr:"открывать"}
],
grammar:[
{title:"连动句 — Последовательные глаголы (идти + делать)",
explanation:"В китайском два глагола могут идти подряд в одном предложении, и 2-й объясняет ЦЕЛЬ 1-го.\\n\\nСхема:  Подл. + Глагол1 + [Место1] + Глагол2 + [Объект2]\\n\\nЛогика:  «идти куда-то → чтобы делать что-то»\\n\\n我去图书馆借书。\\nдословно: «я иду (в) библиотеку взять книгу» = «иду в библиотеку за книгой»\\n\\nПервый глагол обычно 去 (идти туда), 来 (идти сюда). Второй — что там делать.\\n\\nОтличие от русского: в русском «иду в библиотеку» — нужен предлог «в», а в китайском — ничего, просто 去 + место.",
examples:[
{hz:"我去图书馆借书。",py:"Wǒ qù túshūguǎn jiè shū.",tr:"Иду в библиотеку за книгой."},
{hz:"我去商店买东西。",py:"Wǒ qù shāngdiàn mǎi dōngxi.",tr:"Иду в магазин за покупками."},
{hz:"阿曼去银行换钱。",py:"Āmàn qù yínháng huàn qián.",tr:"Аман идёт в банк менять деньги."},
{hz:"学生们去教学楼上课。",py:"Xuéshēngmen qù jiàoxuélóu shàng kè.",tr:"Студенты идут в учебный корпус на пары."}
]},
{title:"先……，然后…… — «сначала…, потом…»",
explanation:"Для описания последовательности действий используется пара 先 (сначала) — 然后 (потом).\\n\\nСхема:  先 + Действие1，然后 + Действие2\\n\\n我先去银行换钱，然后去商店买东西。\\n«Сначала иду в банк обменять деньги, потом в магазин за покупками.»\\n\\nОба слова ставятся ПЕРЕД глаголом. 然后 можно заменить на 再 (zài — снова, ещё).",
examples:[
{hz:"我先去银行换钱，然后去商店买东西。",py:"Wǒ xiān qù yínháng huàn qián, ránhòu qù shāngdiàn mǎi dōngxi.",tr:"Сначала в банк, потом в магазин."},
{hz:"明天我先去银行，然后去商店。",py:"Míngtiān wǒ xiān qù yínháng, ránhòu qù shāngdiàn.",tr:"Завтра сначала в банк, потом в магазин."},
{hz:"张伟先去电影院，然后回宿舍。",py:"Zhāng Wěi xiān qù diànyǐngyuàn, ránhòu huí sùshè.",tr:"Чжан Вэй сначала в кино, потом в общежитие."},
{hz:"他先去商店买东西，然后去书店买词典。",py:"Tā xiān qù shāngdiàn mǎi dōngxi, ránhòu qù shūdiàn mǎi cídiǎn.",tr:"Он сначала в магазин, потом в книжный за словарём."}
]},
{title:"咱们 vs 我们 — тонкая разница «мы»",
explanation:"Оба слова значат «мы», но с разницей в инклюзивности:\\n\\n• 咱们 (zánmen) — ВСЕГДА включает собеседника: «ты и я / мы с тобой»\\n• 我们 (wǒmen) — может включать или НЕ включать собеседника (неоднозначно)\\n\\nПример:\\n咱们一起去吧！— Давай вместе пойдём! (ты обязательно идёшь со мной)\\n我们一起去吧！— То же самое, но чуть двусмысленно\\n\\nКогда говоришь О СВОЕЙ группе (где слушателя НЕТ) — только 我们:\\n我们学校 — наша школа (ты-то не в нашей)\\n\\n咱们 — северный/пекинский стиль, южнее его используют меньше.",
examples:[
{hz:"咱们一起去吧！",py:"Zánmen yìqǐ qù ba!",tr:"Давай пойдём вместе (ты и я)!"},
{hz:"咱们几点去？",py:"Zánmen jǐ diǎn qù?",tr:"Во сколько пойдём (мы с тобой)?"},
{hz:"明天是星期天，咱们去酒吧吧。",py:"Míngtiān shì xīngqītiān, zánmen qù jiǔbā ba.",tr:"Завтра воскресенье, пойдём в бар."},
{hz:"我们学校很大。",py:"Wǒmen xuéxiào hěn dà.",tr:"Наш университет большой."}
]},
{title:"Альтернативный вопрос: A不A / V不V",
explanation:"Вместо 吗 можно задать вопрос так: повторить прилагательное/глагол с 不 между ними.\\n\\nСхемы:\\n• Прил. + 不 + Прил. = Прил. + 吗\\n  冷不冷？ = 冷吗？ — Холодно?\\n\\n• Глагол + 不 + Глагол = Глагол + 吗\\n  去不去？ = 去吗？ — Идёшь (или нет)?\\n  是不是？ = 是吗？ — Это так?\\n  有没有？ = 有吗？ — Есть или нет?\\n\\nВажно: с этой формой 吗 НЕ используется!\\n❌ 冷不冷吗？\\n✅ 冷不冷？\\n\\nТакая форма звучит чуть более прямо и «проверяюще», чем с 吗.",
examples:[
{hz:"那儿的东西贵不贵？",py:"Nàr de dōngxi guì bu guì?",tr:"Там дорого?"},
{hz:"你买不买东西？",py:"Nǐ mǎi bu mǎi dōngxi?",tr:"Ты покупаешь что-то или нет?"},
{hz:"你是不是美国人？",py:"Nǐ shì bu shì Měiguó rén?",tr:"Ты американец или нет?"},
{hz:"今天有没有作业？",py:"Jīntiān yǒu méi yǒu zuòyè?",tr:"Сегодня есть задание или нет?"}
]}
],
dialogues:[
{title:"В банк и магазин (阿曼 и 张伟)",lines:[
{s:"A",hz:"你好，张伟。你去哪儿？",py:"Nǐ hǎo, Zhāng Wěi. Nǐ qù nǎr?",tr:"Привет, Чжан Вэй. Куда идёшь?"},
{s:"B",hz:"我去图书馆借书，你呢？",py:"Wǒ qù túshūguǎn jiè shū, nǐ ne?",tr:"В библиотеку за книгой. А ты?"},
{s:"A",hz:"我先去银行换钱，然后去商店买东西。",py:"Wǒ xiān qù yínháng huàn qián, ránhòu qù shāngdiàn mǎi dōngxi.",tr:"Сначала в банк менять деньги, потом в магазин за покупками."},
{s:"B",hz:"我也要去银行，咱们一起去吧！",py:"Wǒ yě yào qù yínháng, zánmen yìqǐ qù ba!",tr:"Мне тоже в банк — пойдём вместе!"},
{s:"A",hz:"你不去图书馆吗？",py:"Nǐ bú qù túshūguǎn ma?",tr:"А в библиотеку не идёшь?"},
{s:"B",hz:"没关系，图书馆不关门。",py:"Méi guānxi, túshūguǎn bù guān mén.",tr:"Ничего, библиотека не закрывается."}
]},
{title:"Поход в ТЦ (古丽 и 中村)",lines:[
{s:"A",hz:"中村，明天是星期天，你打算干什么？",py:"Zhōngcūn, míngtiān shì xīngqītiān, nǐ dǎsuàn gàn shénme?",tr:"Накамура, завтра воскресенье, что планируешь?"},
{s:"B",hz:"我打算去商店买东西。",py:"Wǒ dǎsuàn qù shāngdiàn mǎi dōngxi.",tr:"Планирую пойти за покупками."},
{s:"A",hz:"是学校的商店吗？",py:"Shì xuéxiào de shāngdiàn ma?",tr:"В университетский магазин?"},
{s:"B",hz:"不，是购物中心。",py:"Bù, shì gòuwù zhōngxīn.",tr:"Нет, в ТЦ."},
{s:"A",hz:"那儿的东西贵不贵？",py:"Nàr de dōngxi guì bu guì?",tr:"Там дорого?"},
{s:"B",hz:"还可以。那儿的东西很多，质量也不错。",py:"Hái kěyǐ. Nàr de dōngxi hěn duō, zhìliàng yě búcuò.",tr:"Нормально. Там много всего, и качество неплохое."},
{s:"A",hz:"我正打算买衣服呢，明天和你一起去，好不好？",py:"Wǒ zhèng dǎsuàn mǎi yīfu ne, míngtiān hé nǐ yìqǐ qù, hǎo bu hǎo?",tr:"Я как раз собиралась купить одежду — пойдём вместе?"},
{s:"B",hz:"好啊！",py:"Hǎo a!",tr:"Хорошо!"},
{s:"A",hz:"咱们几点去？",py:"Zánmen jǐ diǎn qù?",tr:"Во сколько пойдём?"},
{s:"B",hz:"购物中心九点开门，咱们十点去吧。",py:"Gòuwù zhōngxīn jiǔ diǎn kāi mén, zánmen shí diǎn qù ba.",tr:"ТЦ открывается в 9, давай в 10 пойдём."}
]}
],
tips:[
"还可以 (hái kěyǐ) — «нормально, пойдёт, ничего так». Нейтральная оценка — не плохо, но и не отлично. Очень полезная фраза в китайском общении, где прямое «плохо» считается невежливым.",
"不错 (búcuò) дословно «не ошибка» = «неплохо, хорошо». Сильнее чем 还可以. «Качество неплохое» = 质量不错.",
"打算 (dǎsuàn) — «планировать, собираться». В отличие от 计划 (формальный план), 打算 используется для бытовых планов: 我打算去... «я собираюсь пойти...».",
"Формы 开门/关门 — про магазины: 几点开门？ (во сколько открывается?), 几点关门？ (во сколько закрывается?).",
"A不A вопрос НЕЛЬЗЯ использовать с 很: ❌ 很冷不冷 — нет такого. Можно только 冷不冷? Если хочешь «очень» — переформулируй."
]
},
14:{
introduction:"В этой главе вы научитесь описывать вещи (одежду, транспорт) по цвету, размеру, качеству. Познакомитесь с наречием 挺 («довольно»), выражением 有(一)点儿 («немного, чуть-чуть») и конструкцией «X的» (заменитель существительного).\\n\\nСитуации: 古丽 выбирает свитер с 中村, потом 阿曼 обсуждает с ней её новый велосипед.",
vocabulary:[
{hz:"件",py:"jiàn",tr:"счётное слово для одежды"},
{hz:"白",py:"bái",tr:"белый"},
{hz:"毛衣",py:"máoyī",tr:"свитер"},
{hz:"挺",py:"tǐng",tr:"довольно, вполне"},
{hz:"好看",py:"hǎokàn",tr:"красивый, симпатичный"},
{hz:"容易",py:"róngyì",tr:"лёгкий, легко"},
{hz:"脏",py:"zāng",tr:"грязный"},
{hz:"蓝",py:"lán",tr:"синий"},
{hz:"颜色",py:"yánsè",tr:"цвет"},
{hz:"有点儿",py:"yǒudiǎnr",tr:"немного, чуть-чуть"},
{hz:"深",py:"shēn",tr:"тёмный (цвет), глубокий"},
{hz:"浅",py:"qiǎn",tr:"светлый (цвет), мелкий"},
{hz:"黄",py:"huáng",tr:"жёлтый"},
{hz:"漂亮",py:"piàoliang",tr:"красивый"},
{hz:"它",py:"tā",tr:"оно, это (для предметов)"},
{hz:"昨天",py:"zuótiān",tr:"вчера"},
{hz:"新",py:"xīn",tr:"новый"},
{hz:"辆",py:"liàng",tr:"счётное слово для транспорта"},
{hz:"旧",py:"jiù",tr:"старый, б/у"},
{hz:"便宜",py:"piányi",tr:"дешёвый"},
{hz:"丢",py:"diū",tr:"потерять, украсть"},
{hz:"别的",py:"bié de",tr:"другой"},
{hz:"黑",py:"hēi",tr:"чёрный"},
{hz:"灰",py:"huī",tr:"серый"},
{hz:"绿",py:"lǜ",tr:"зелёный"}
],
grammar:[
{title:"挺 + прил. + 的 — «довольно, вполне»",
explanation:"挺 (tǐng) — «довольно, вполне». Разговорная альтернатива 很. Часто сопровождается 的 в конце.\\n\\nСхема:  挺 + Прилагательное + 的\\n\\n挺好看的 — довольно симпатичный\\n挺漂亮的 — довольно красивый\\n挺冷的 — довольно холодно\\n\\n挺 по силе примерно = 很, но звучит более разговорно и дружелюбно. Идеально для бытового общения.",
examples:[
{hz:"那件白毛衣挺好看的。",py:"Nà jiàn bái máoyī tǐng hǎokàn de.",tr:"Тот белый свитер довольно симпатичный."},
{hz:"你的毛衣挺漂亮的。",py:"Nǐ de máoyī tǐng piàoliang de.",tr:"Твой свитер довольно красивый."},
{hz:"学校商店的东西挺便宜的。",py:"Xuéxiào shāngdiàn de dōngxi tǐng piányi de.",tr:"В университетском магазине вещи довольно дешёвые."},
{hz:"北京的冬天挺冷的。",py:"Běijīng de dōngtiān tǐng lěng de.",tr:"Зима в Пекине довольно холодная."}
]},
{title:"的-фраза — «X-ный, тот, который X»",
explanation:"X + 的 (без существительного после) превращается в отдельную фразу-заменитель существительного, если контекст ясен.\\n\\nX может быть:\\n• Прилагательное:  白的 (белый, белая вещь), 贵的 (дорогой)\\n• Существительное/Местоимение:  我的 (мой, моё), 老师的 (учительский)\\n• Глагол:  我买的 (то что я купил), 昨天吃的 (то что вчера ел)\\n\\nПример:\\n这件毛衣白。— Этот свитер белый.\\n我喜欢白的。— Мне нравится белый (белая вещь — свитер подразумевается).\\n\\nЭто очень частая структура в разговоре.",
examples:[
{hz:"白的容易脏。",py:"Bái de róngyì zāng.",tr:"Белое легко пачкается."},
{hz:"我喜欢浅颜色的。",py:"Wǒ xǐhuan qiǎn yánsè de.",tr:"Мне нравятся светлые цвета (вещи светлых цветов)."},
{hz:"这辆自行车是我昨天买的。",py:"Zhè liàng zìxíngchē shì wǒ zuótiān mǎi de.",tr:"Этот велосипед — тот, что я вчера купила."},
{hz:"这本词典是英文的。",py:"Zhè běn cídiǎn shì Yīngwén de.",tr:"Этот словарь — английский."}
]},
{title:"有(一)点儿 + прил. — «немного, чуть-чуть»",
explanation:"有(一)点儿 (yǒu(yì)diǎnr) ставится ПЕРЕД прилагательным и означает «немного, чуть-чуть». Часто имеет негативный оттенок.\\n\\nСхема:  有(一)点儿 + Прилагательное\\n\\n有点儿冷 — немного холодно (и это плохо)\\n有点儿贵 — немного дороговато\\n有点儿深 — чуть тёмноват\\n\\nВажно: НЕ путать с (一)点儿 (без 有) после глагола — это «немного» без негативного оттенка.\\n\\nСравни:\\n• 有点儿贵 — «дороговато» (жалоба)\\n• 便宜一点儿 — «немного дешевле, подешевле» (просьба)",
examples:[
{hz:"这件的颜色有点儿深。",py:"Zhè jiàn de yánsè yǒudiǎnr shēn.",tr:"У этого цвет чуть тёмный."},
{hz:"今天有点儿冷。",py:"Jīntiān yǒudiǎnr lěng.",tr:"Сегодня немного холодновато."},
{hz:"黑颜色的有点儿贵。",py:"Hēi yánsè de yǒudiǎnr guì.",tr:"Чёрный чуть дороговат."},
{hz:"他有点儿不高兴。",py:"Tā yǒudiǎnr bù gāoxìng.",tr:"Он немного расстроен."}
]}
],
dialogues:[
{title:"Выбираем свитер (古丽 и 中村)",lines:[
{s:"A",hz:"中村，你看，那件白毛衣怎么样？",py:"Zhōngcūn, nǐ kàn, nà jiàn bái máoyī zěnmeyàng?",tr:"Накамура, смотри, как тот белый свитер?"},
{s:"B",hz:"挺好看的。不过，白的容易脏。这件蓝的怎么样？",py:"Tǐng hǎokàn de. Búguò, bái de róngyì zāng. Zhè jiàn lán de zěnmeyàng?",tr:"Симпатичный. Но белое легко пачкается. А этот синий?"},
{s:"A",hz:"这件的颜色有点儿深，我喜欢浅颜色的。",py:"Zhè jiàn de yánsè yǒudiǎnr shēn, wǒ xǐhuan qiǎn yánsè de.",tr:"У этого цвет чуть тёмный, я люблю светлые."},
{s:"B",hz:"那件黄的呢？",py:"Nà jiàn huáng de ne?",tr:"А тот жёлтый?"},
{s:"A",hz:"不错，挺漂亮的，就买它吧。",py:"Búcuò, tǐng piàoliang de, jiù mǎi tā ba.",tr:"Неплохо, довольно красивый — куплю его."}
]},
{title:"Новый велосипед (阿曼 и 古丽)",lines:[
{s:"A",hz:"古丽，这是你的自行车吗？",py:"Gǔlì, zhè shì nǐ de zìxíngchē ma?",tr:"Гульнара, это твой велосипед?"},
{s:"B",hz:"对，这是我昨天买的，怎么样？",py:"Duì, zhè shì wǒ zuótiān mǎi de, zěnmeyàng?",tr:"Да, вчера купила. Как тебе?"},
{s:"A",hz:"挺漂亮的，是新的吗？",py:"Tǐng piàoliang de, shì xīn de ma?",tr:"Красивый. Новый?"},
{s:"B",hz:"对，我买的是一辆旧的，旧的比较便宜，也不容易丢。",py:"Duì, wǒ mǎi de shì yí liàng jiù de, jiù de bǐjiào piányi, yě bù róngyì diū.",tr:"Нет, я купила б/у. Старые дешевле и их не так часто воруют."},
{s:"A",hz:"有别的颜色吗？",py:"Yǒu bié de yánsè ma?",tr:"А другие цвета есть?"},
{s:"B",hz:"有，有黑的、蓝的、还有灰的、黄的。你喜欢什么颜色的？",py:"Yǒu, yǒu hēi de, lán de, hái yǒu huī de, huáng de. Nǐ xǐhuan shénme yánsè de?",tr:"Есть — чёрные, синие, серые, жёлтые. Какой цвет тебе нравится?"},
{s:"A",hz:"我喜欢绿的。",py:"Wǒ xǐhuan lǜ de.",tr:"Я люблю зелёный."}
]}
],
tips:[
"Счётные слова для одежды: 件 (jiàn) — для верха (рубашка, свитер, пальто), 条 (tiáo) — для низа (штаны, юбка). «Одна рубашка» = 一件衬衫, «одни штаны» = 一条裤子.",
"深 и 浅 про цвета: 深蓝 — тёмно-синий, 浅蓝 — голубой (светло-синий). Про воду 深/浅 = глубокий/мелкий.",
"它 (tā) — «оно» для предметов и животных. В разговоре китайцы часто опускают местоимения, 它 используется реже 他/她.",
"Слова-противоположности в описаниях: 新/旧 (новый/старый), 贵/便宜 (дорогой/дешёвый), 深/浅 (тёмный/светлый), 大/小 (большой/маленький).",
"别的 (bié de) = «другой, иной». «Другие цвета» = 别的颜色. Похоже на 其他的 (qítā de), но 别的 более разговорное."
]
},
15:{
introduction:"Это итоговая глава Unit 3. Вы научитесь обсуждать подарки, выбор «А или Б» (还是), давать примеры через 比如 и использовать 一直 («всё время»).\\n\\nСитуации: 中村 готовит торт на день рождения подруги, 张伟 советуется с 阿曼 что подарить девушке.",
vocabulary:[
{hz:"晚饭",py:"wǎnfàn",tr:"ужин"},
{hz:"以后",py:"yǐhòu",tr:"после, потом"},
{hz:"一直",py:"yìzhí",tr:"всё время, постоянно"},
{hz:"忙",py:"máng",tr:"занят, быть занятым"},
{hz:"准备",py:"zhǔnbèi",tr:"готовиться, готовить"},
{hz:"礼物",py:"lǐwù",tr:"подарок"},
{hz:"生日",py:"shēngrì",tr:"день рождения"},
{hz:"蛋糕",py:"dàngāo",tr:"торт"},
{hz:"送",py:"sòng",tr:"дарить, отправлять"},
{hz:"说",py:"shuō",tr:"говорить, сказать"},
{hz:"特别",py:"tèbié",tr:"особый, особенный"},
{hz:"男",py:"nán",tr:"мужской"},
{hz:"还是",py:"háishi",tr:"или (в вопросах)"},
{hz:"女",py:"nǚ",tr:"женский"},
{hz:"可",py:"kě",tr:"можно, стоит (перед глаголом)"},
{hz:"比如",py:"bǐrú",tr:"например"},
{hz:"巧克力",py:"qiǎokèlì",tr:"шоколад"},
{hz:"甜",py:"tián",tr:"сладкий"},
{hz:"号",py:"hào",tr:"размер (одежды)"},
{hz:"那么",py:"nàme",tr:"тогда, в таком случае"},
{hz:"束",py:"shù",tr:"счётное слово для букетов"},
{hz:"花",py:"huā",tr:"цветок"},
{hz:"主意",py:"zhǔyi",tr:"идея"}
],
grammar:[
{title:"还是 — альтернативный вопрос «А или Б?»",
explanation:"还是 (háishi) между двумя вариантами образует вопрос «А или Б?».\\n\\nСхема:  Вариант A + 还是 + Вариант B?\\n\\n男的还是女的？— Мужчина или женщина?\\n你喝水还是喝咖啡？— Будешь пить воду или кофе?\\n你去还是我去？— Ты пойдёшь или я?\\n\\nВажно не путать с 或者 (huòzhě — «или»), которое используется в УТВЕРЖДЕНИЯХ:\\n• 还是 — в вопросах\\n• 或者 — в утверждениях (я могу пойти сегодня или завтра)",
examples:[
{hz:"男的还是女的？",py:"Nán de háishi nǚ de?",tr:"Мужчина или женщина?"},
{hz:"你喜欢红的还是蓝的？",py:"Nǐ xǐhuan hóng de háishi lán de?",tr:"Тебе нравится красное или синее?"},
{hz:"你去还是我去？",py:"Nǐ qù háishi wǒ qù?",tr:"Ты пойдёшь или я?"},
{hz:"你喝水还是喝咖啡？",py:"Nǐ hē shuǐ háishi hē kāfēi?",tr:"Пить воду или кофе?"}
]},
{title:"比如 — «например»",
explanation:"比如 (bǐrú) — «например, скажем». Вводит пример.\\n\\nСхема:  Общее утверждение，比如 + Пример\\n\\n可送的东西很多，比如巧克力。\\n«Можно подарить много всего, например шоколад.»\\n\\nВ китайском 比如 часто ставится в середину предложения как вводное слово. Также можно использовать 比如说 (bǐrúshuō) — более разговорно.",
examples:[
{hz:"可送的很多啊，比如巧克力。",py:"Kě sòng de hěn duō a, bǐrú qiǎokèlì.",tr:"Можно подарить много всего, например, шоколад."},
{hz:"我喜欢很多颜色，比如蓝的、绿的。",py:"Wǒ xǐhuan hěn duō yánsè, bǐrú lán de, lǜ de.",tr:"Мне нравится много цветов, например синий, зелёный."},
{hz:"北京有很多大学，比如北京大学、清华大学。",py:"Běijīng yǒu hěn duō dàxué, bǐrú Běijīng Dàxué, Qīnghuá Dàxué.",tr:"В Пекине много университетов — например, Бэйда и Цинхуа."}
]},
{title:"一直 — «всё время, постоянно»",
explanation:"一直 (yìzhí) — «всё время, непрерывно, без перерыва». Ставится ПЕРЕД глаголом.\\n\\nСхема:  Подл. + 一直 + Глагол\\n\\nЧасто сопровождается продолженным временем (正在...呢):\\n你一直在忙 — «ты всё это время был занят»\\n他一直在学汉语 — «он всё это время учит китайский»\\n\\nТакже «прямо вперёд»:\\n一直走 — «идти прямо»",
examples:[
{hz:"从晚饭以后到现在，你一直在忙。",py:"Cóng wǎnfàn yǐhòu dào xiànzài, nǐ yìzhí zài máng.",tr:"С самого ужина и до сих пор ты всё время занят."},
{hz:"他一直在学汉语。",py:"Tā yìzhí zài xué Hànyǔ.",tr:"Он всё время учит китайский."},
{hz:"一直走就到了。",py:"Yìzhí zǒu jiù dào le.",tr:"Иди прямо — и придёшь."}
]},
{title:"可 + Глагол — «можно/стоит делать»",
explanation:"可 (kě) перед глаголом означает «можно, стоит это делать» — т.е. это действие имеет смысл / возможно.\\n\\nСхема:  可 + Глагол + 的 + (Сущ.)\\n\\n可送的很多 — есть много такого, что можно подарить (дословно: «достойного-дарения много»)\\n可看的电影很多 — есть много фильмов, которые стоит посмотреть\\n可去的地方很多 — есть много мест, куда можно пойти\\n\\nЭто книжная/вежливая форма. В разговоре чаще скажут 可以 (kěyǐ) — «можно».",
examples:[
{hz:"可送的很多啊，比如巧克力。",py:"Kě sòng de hěn duō a, bǐrú qiǎokèlì.",tr:"Подарить можно много всего, например шоколад."},
{hz:"电影可看的很多。",py:"Diànyǐng kě kàn de hěn duō.",tr:"Фильмов, достойных просмотра, много."},
{hz:"星期天可去的地方很多。",py:"Xīngqītiān kě qù de dìfang hěn duō.",tr:"В воскресенье есть много мест, куда можно пойти."}
]}
],
dialogues:[
{title:"Торт на день рождения (古丽 и 中村)",lines:[
{s:"A",hz:"中村，从晚饭以后到现在，你一直在忙，忙什么呢？",py:"Zhōngcūn, cóng wǎnfàn yǐhòu dào xiànzài, nǐ yìzhí zài máng, máng shénme ne?",tr:"Накамура, с ужина и до сих пор ты всё возишься — чем занят?"},
{s:"B",hz:"我在准备礼物呢。",py:"Wǒ zài zhǔnbèi lǐwù ne.",tr:"Готовлю подарок."},
{s:"A",hz:"准备礼物？",py:"Zhǔnbèi lǐwù?",tr:"Подарок?"},
{s:"B",hz:"对，明天是我朋友的生日，我做一个蛋糕送给她，你说好不好？",py:"Duì, míngtiān shì wǒ péngyou de shēngrì, wǒ zuò yí ge dàngāo sòng gěi tā, nǐ shuō hǎo bu hǎo?",tr:"Да, завтра день рождения подруги. Хочу сделать торт и подарить ей, как думаешь?"},
{s:"A",hz:"你自己做？",py:"Nǐ zìjǐ zuò?",tr:"Сам сделаешь?"},
{s:"B",hz:"对啊，自己做的比较特别。",py:"Duì a, zìjǐ zuò de bǐjiào tèbié.",tr:"Да, сделанное своими руками — более особенное."}
]},
{title:"Что подарить девушке? (张伟 и 阿曼)",lines:[
{s:"A",hz:"阿曼，你说，送生日礼物，什么东西比较好？",py:"Āmàn, nǐ shuō, sòng shēngrì lǐwù, shénme dōngxi bǐjiào hǎo?",tr:"Аман, как думаешь, что лучше подарить на день рождения?"},
{s:"B",hz:"你打算送给谁？男的还是女的？",py:"Nǐ dǎsuàn sòng gěi shéi? Nán de háishi nǚ de?",tr:"Кому собираешься? Мужчине или женщине?"},
{s:"A",hz:"女的。",py:"Nǚ de.",tr:"Женщине."},
{s:"B",hz:"可送的很多啊，比如巧克力。",py:"Kě sòng de hěn duō a, bǐrú qiǎokèlì.",tr:"Да много чего можно, например шоколад."},
{s:"A",hz:"巧克力有点儿甜，她不喜欢甜的。",py:"Qiǎokèlì yǒudiǎnr tián, tā bù xǐhuan tián de.",tr:"Шоколад сладковат, а она не любит сладкое."},
{s:"B",hz:"衣服呢？",py:"Yīfu ne?",tr:"А одежда?"},
{s:"A",hz:"她的衣服号我不知道，也不知道她喜欢什么颜色。",py:"Tā de yīfu hào wǒ bù zhīdào, yě bù zhīdào tā xǐhuan shénme yánsè.",tr:"Размер не знаю, и какие цвета любит — тоже."},
{s:"B",hz:"那么送一束花吧，每个女孩子都喜欢花。",py:"Nàme sòng yí shù huā ba, měi ge nǚ háizi dōu xǐhuan huā.",tr:"Тогда подари букет цветов — все девушки любят цветы."},
{s:"A",hz:"这个主意挺不错的。",py:"Zhège zhǔyi tǐng búcuò de.",tr:"Отличная идея."}
]}
],
tips:[
"送 имеет два значения: «дарить» (送礼物) и «провожать/отправлять» (送朋友回家). Контекст всегда понятен.",
"В китайской культуре НЕ дарят: часы (送钟 = 送终 «провожать в последний путь»), обувь (символика разлуки), зонты (伞 звучит как 散 — «расставание»). Безопасные подарки: цветы, чай, фрукты, шоколад.",
"一束花 = «букет цветов». 束 — счётное слово для букетов. Для отдельных цветов используется 朵 (duǒ): 一朵花.",
"比如 ≈ 比如说 — оба «например». Первое чуть формальнее, второе разговорное. Оба в начале примера.",
"主意 (zhǔyi) — «идея, задумка». 这个主意不错 = «неплохая идея». Также 好主意！— «Отличная идея!»."
]
},
16:{
introduction:"В этой главе вы научитесь рассказывать о своих выходных и досуге, использовать удвоение глаголов (для мягкости речи), конструкцию 太……了 и обстоятельство места 在+место перед глаголом.\\n\\nСитуация: 阿曼 (любитель активных выходных) разговаривает с одноклассником (скучающим домоседом) — у каждого свой взгляд на выходные.",
vocabulary:[
{hz:"又",py:"yòu",tr:"снова, опять"},
{hz:"了",py:"le",tr:"частица (завершённость/изменение)"},
{hz:"看起来",py:"kànqǐlai",tr:"похоже, выглядит (что...)"},
{hz:"啦",py:"la",tr:"частица (эмоционально подчёркивает)"},
{hz:"可以",py:"kěyǐ",tr:"можно, иметь возможность"},
{hz:"好好儿",py:"hǎohāor",tr:"как следует, вдоволь"},
{hz:"觉得",py:"juéde",tr:"чувствовать, считать"},
{hz:"没意思",py:"méi yìsi",tr:"скучно, неинтересно"},
{hz:"电视",py:"diànshì",tr:"телевизор, телевидение"},
{hz:"洗",py:"xǐ",tr:"мыть, стирать"},
{hz:"睡懒觉",py:"shuì lǎnjiào",tr:"поспать подольше, выспаться"},
{hz:"睡觉",py:"shuì jiào",tr:"спать"},
{hz:"出去",py:"chūqu",tr:"выходить (куда-то)"},
{hz:"逛",py:"guàng",tr:"гулять (по магазинам)"},
{hz:"学习",py:"xuéxí",tr:"учиться, изучать"},
{hz:"不同",py:"bùtóng",tr:"разный, различный"},
{hz:"安排",py:"ānpái",tr:"планировать, планы"},
{hz:"上",py:"shàng",tr:"прошлый, предыдущий"},
{hz:"包",py:"bāo",tr:"заворачивать, лепить (пельмени)"},
{hz:"饺子",py:"jiǎozi",tr:"пельмени, дзяоцзы"},
{hz:"迪厅",py:"dítīng",tr:"дискотека"},
{hz:"跳舞",py:"tiào wǔ",tr:"танцевать"},
{hz:"听",py:"tīng",tr:"слушать"},
{hz:"音乐会",py:"yīnyuèhuì",tr:"концерт"}
],
grammar:[
{title:"Удвоение глаголов: V-V (мягкая, лёгкая форма)",
explanation:"В китайском глаголы часто удваиваются, чтобы сделать действие более неформальным, лёгким, коротким по времени.\\n\\nСхемы:\\n• Односложный глагол:  V + V  или  V + 一 + V\\n  看看 = посмотри\\n  试试 = попробуй\\n  看一看 = немного посмотреть\\n\\n• Двусложный глагол:  AB + AB\\n  学习学习 = немного позаниматься\\n  休息休息 = немного отдохнуть\\n\\nОттенок: «немножко, ненапряжно, попробуй». Очень частое в повседневной речи.",
examples:[
{hz:"周末可以好好儿玩儿玩儿。",py:"Zhōumò kěyǐ hǎohāor wánr wánr.",tr:"На выходных можно хорошо отдохнуть."},
{hz:"在宿舍里看看电视，洗洗衣服。",py:"Zài sùshè li kànkan diànshì, xǐxi yīfu.",tr:"В общежитии смотрю телик, стираю вещи."},
{hz:"和朋友逛逛商店。",py:"Hé péngyou guàngguang shāngdiàn.",tr:"С другом пройдёмся по магазинам."},
{hz:"去图书馆学习学习。",py:"Qù túshūguǎn xuéxí xuéxí.",tr:"Схожу в библиотеку позаниматься."}
]},
{title:"Конструкция 太……了 (расширение) — «слишком»",
explanation:"Мы уже видели эту конструкцию в Главе 6 (太早了). В Главе 16 закрепим все оттенки:\\n\\nСхема:  太 + Прилагательное/Глагол + 了\\n\\nМожет выражать:\\n• Негативное («слишком»):  太累了！— Слишком устал!\\n• Позитивное («как здóрово»):  太高兴了！— Очень рад!\\n• Нейтральное (просто высокая степень):  太好了！— Отлично!\\n\\nКонтекст определяет, хорошо это или плохо. Частица 了 почти всегда обязательна — без неё предложение звучит оборванно.",
examples:[
{hz:"明天又是周末，太高兴了！",py:"Míngtiān yòu shì zhōumò, tài gāoxìng le!",tr:"Завтра снова выходные — как я рад!"},
{hz:"今天太冷了。",py:"Jīntiān tài lěng le.",tr:"Сегодня слишком холодно."},
{hz:"这个房间太舒服了！",py:"Zhège fángjiān tài shūfu le!",tr:"Эта комната супер удобная!"},
{hz:"这件毛衣的颜色太浅了，我不喜欢。",py:"Zhè jiàn máoyī de yánsè tài qiǎn le, wǒ bù xǐhuan.",tr:"Цвет этого свитера слишком светлый, не нравится."}
]},
{title:"Обстоятельство места: 在 + место + глагол",
explanation:"«Делаю X в месте Y»: в китайском «в месте» ВСЕГДА ставится ПЕРЕД глаголом.\\n\\nСхема:  Подл. + 在 + Место + Глагол + (Объект)\\n\\n阿曼在北京大学学习汉语。\\n«Аман в Пекинском университете изучает китайский.»\\n\\nВНИМАНИЕ — обратный порядок в русском:\\n• Русский: «Аман учит китайский В ПЕКИНЕ»\\n• Китайский: «Аман В ПЕКИНЕ учит китайский»\\n\\nМесто нельзя ставить в конец предложения — это другой смысл (глагол 在 без места).",
examples:[
{hz:"在宿舍里看电视。",py:"Zài sùshè li kàn diànshì.",tr:"В общежитии смотрю телевизор."},
{hz:"阿曼在北京大学学习汉语。",py:"Āmàn zài Běijīng Dàxué xuéxí Hànyǔ.",tr:"Аман в Пекинском университете учит китайский."},
{hz:"他在图书馆看书。",py:"Tā zài túshūguǎn kàn shū.",tr:"Он в библиотеке читает."},
{hz:"他们在购物中心买东西。",py:"Tāmen zài gòuwù zhōngxīn mǎi dōngxi.",tr:"Они в ТЦ покупают."}
]}
],
dialogues:[
{title:"Про выходные (阿曼 и одноклассник)",lines:[
{s:"A",hz:"明天又是周末，太高兴了！",py:"Míngtiān yòu shì zhōumò, tài gāoxìng le!",tr:"Завтра опять выходные — как я рад!"},
{s:"B",hz:"看起来，你很喜欢周末。",py:"Kànqǐlai, nǐ hěn xǐhuan zhōumò.",tr:"Похоже, ты очень любишь выходные."},
{s:"A",hz:"当然喜欢啦！周末可以好好儿玩儿玩儿，你不喜欢吗？",py:"Dāngrán xǐhuan la! Zhōumò kěyǐ hǎohāor wánr wánr, nǐ bù xǐhuan ma?",tr:"Конечно люблю! На выходных можно хорошо отдохнуть — ты разве не любишь?"},
{s:"B",hz:"我不喜欢。每个周末，我都觉得没意思。",py:"Wǒ bù xǐhuan. Měi ge zhōumò, wǒ dōu juéde méi yìsi.",tr:"Не люблю. Каждые выходные мне скучно."},
{s:"A",hz:"你周末都干什么呢？",py:"Nǐ zhōumò dōu gàn shénme ne?",tr:"А что ты делаешь на выходных?"},
{s:"B",hz:"在宿舍里看看电视，洗洗衣服，做做作业，睡睡懒觉……",py:"Zài sùshè li kànkan diànshì, xǐxi yīfu, zuòzuo zuòyè, shuìshui lǎnjiào...",tr:"В общежитии смотрю телик, стираю, делаю уроки, высыпаюсь…"},
{s:"A",hz:"你不和朋友一起出去玩儿吗？",py:"Nǐ bù hé péngyou yìqǐ chūqu wánr ma?",tr:"А с друзьями не выходишь гулять?"},
{s:"B",hz:"有时候和朋友一起逛逛商店，有时候去图书馆学习学习。你周末都干什么呢？",py:"Yǒu shíhou hé péngyou yìqǐ guàngguang shāngdiàn, yǒu shíhou qù túshūguǎn xuéxí xuéxí. Nǐ zhōumò dōu gàn shénme ne?",tr:"Иногда с друзьями хожу по магазинам, иногда в библиотеку. А ты?"},
{s:"A",hz:"我每个周末都有不同的安排。上个周末到朋友家包饺子，上上个周末去迪厅跳舞……",py:"Wǒ měi ge zhōumò dōu yǒu bù tóng de ānpái. Shàng ge zhōumò dào péngyou jiā bāo jiǎozi, shàng shàng ge zhōumò qù dítīng tiào wǔ...",tr:"У меня каждые выходные разные планы. В прошлые лепил пельмени у друга, в позапрошлые ходил на дискотеку…"},
{s:"B",hz:"这个周末你干什么？",py:"Zhège zhōumò nǐ gàn shénme?",tr:"А в эти что планируешь?"},
{s:"A",hz:"我去听音乐会。一起去，怎么样？",py:"Wǒ qù tīng yīnyuèhuì. Yìqǐ qù, zěnmeyàng?",tr:"Иду на концерт. Пойдём вместе?"},
{s:"B",hz:"好啊，太好了！",py:"Hǎo a, tài hǎo le!",tr:"Давай, отлично!"}
]}
],
tips:[
"Удвоение делает глагол «мягче». Сравни: 看书 («читай/прочти») vs 看看书 («почитай чуть-чуть»). Для просьб всегда лучше удвоенная форма — вежливее.",
"上 в контексте времени = «прошлый»: 上星期 (прошлая неделя), 上个月 (прошлый месяц), 上个周末 (прошлые выходные). 上上 = «позапрошлый».",
"又 vs 再: оба «снова». 又 — о прошлом/повторяющемся («опять же»), 再 — о будущем («снова сделаю»). 又是周末 = «опять выходные» (регулярно происходит).",
"啦 (la) = 了+啊, эмоциональная частица. Показывает энтузиазм: 当然喜欢啦! («конечно люблю!»). Придаёт лёгкую дружескую интонацию.",
"好好儿 (hǎohāor) — «как следует, хорошенько». Ставится перед глаголом: 好好儿玩儿 (хорошо отдохнуть), 好好儿学习 (хорошо учиться)."
]
},
17:{
introduction:"В этой главе вы научитесь идти в гости: приветствовать хозяев, дарить подарок, говорить вежливые клише. Познакомитесь с глаголом 会 («уметь»), эмфатическим 就是 и другими правилами этикета.\\n\\nСитуация: 阿曼 и 古丽 приходят в гости к 王老师 — обмениваются подарками и лепят пельмени.",
vocabulary:[
{hz:"做客",py:"zuò kè",tr:"быть в гостях"},
{hz:"请进",py:"qǐng jìn",tr:"проходите, пожалуйста"},
{hz:"真",py:"zhēn",tr:"действительно, по-настоящему"},
{hz:"干净",py:"gānjìng",tr:"чистый"},
{hz:"坐",py:"zuò",tr:"сидеть, садиться"},
{hz:"哎呀",py:"āiyā",tr:"ой, ах (восклицание)"},
{hz:"客气",py:"kèqi",tr:"вежливый, церемониться"},
{hz:"一点儿",py:"yìdiǎnr",tr:"немного, чуть-чуть"},
{hz:"心意",py:"xīnyì",tr:"знак внимания"},
{hz:"收下",py:"shōuxià",tr:"принять (подарок)"},
{hz:"茶",py:"chá",tr:"чай"},
{hz:"果汁",py:"guǒzhī",tr:"сок"},
{hz:"随便",py:"suíbiàn",tr:"как угодно, без разницы"},
{hz:"行",py:"xíng",tr:"годится, подходит"},
{hz:"路上",py:"lùshàng",tr:"в пути, по дороге"},
{hz:"顺利",py:"shùnlì",tr:"гладко, без проблем"},
{hz:"挤",py:"jǐ",tr:"тесно, набит"},
{hz:"打车",py:"dǎ chē",tr:"взять такси"},
{hz:"空调",py:"kōngtiáo",tr:"кондиционер"},
{hz:"大巴",py:"dàbā",tr:"автобус (большой)"},
{hz:"地铁",py:"dìtiě",tr:"метро"},
{hz:"饿",py:"è",tr:"голодный"},
{hz:"吃",py:"chī",tr:"есть, кушать"},
{hz:"会",py:"huì",tr:"уметь"},
{hz:"试",py:"shì",tr:"пробовать"}
],
grammar:[
{title:"Глагол 会 — «уметь (по обучению)»",
explanation:"会 (huì) — «уметь», но только про НАВЫКИ, которым научились: говорить на языке, готовить, водить машину.\\n\\nСхема:  Подл. + 会 + Глагол + (Объект)\\n\\n我会包饺子。— Я умею лепить пельмени.\\n我会说英语。— Я умею говорить по-английски.\\n\\nОтрицание: 不会.\\n他不会说英语。— Он не умеет говорить по-английски.\\n\\nЕсть и другие значения 会 (возможность, вероятность) — их изучим позже. Пока — только «уметь».",
examples:[
{hz:"你们会包吗？",py:"Nǐmen huì bāo ma?",tr:"Вы умеете лепить?"},
{hz:"我会包饺子。",py:"Wǒ huì bāo jiǎozi.",tr:"Я умею лепить пельмени."},
{hz:"我会说英语，他不会说英语。",py:"Wǒ huì shuō Yīngyǔ, tā bú huì shuō Yīngyǔ.",tr:"Я говорю по-английски, он — нет."},
{hz:"你会骑自行车吗？",py:"Nǐ huì qí zìxíngchē ma?",tr:"Ты умеешь ездить на велосипеде?"}
]},
{title:"就是 — эмфатическое «именно, как раз»",
explanation:"就是 (jiùshì) между подлежащим и сказуемым — для усиления: «именно это, именно так».\\n\\nСхема:  Подл. + 就是 + Объект/Описание\\n\\n我最喜欢吃的就是饺子。\\n«Что я больше всего люблю есть — так это пельмени.»\\n\\n他就是王老师。— Это и есть учитель Ван.\\n这儿就是图书馆。— Это как раз библиотека.\\n\\nПереводится как «именно», «как раз», «это и есть».",
examples:[
{hz:"我最喜欢吃的就是饺子。",py:"Wǒ zuì xǐhuan chī de jiùshì jiǎozi.",tr:"Что я больше всего люблю — это пельмени."},
{hz:"他就是王老师。",py:"Tā jiùshì Wáng lǎoshī.",tr:"Это и есть учитель Ван."},
{hz:"这儿就是图书馆。",py:"Zhèr jiùshì túshūguǎn.",tr:"Здесь как раз библиотека."},
{hz:"北京大学的东边就是清华大学。",py:"Běijīng Dàxué de dōngbian jiùshì Qīnghuá Dàxué.",tr:"К востоку от Бэйда — как раз Цинхуа."}
]},
{title:"A 还是 B — повторение «А или Б?» (с 是)",
explanation:"В Главе 15 мы изучили 还是 для выбора. В Главе 17 повторяем с вариантом «是 A 还是 B».\\n\\nСхемы:\\n• 是 A 还是 B？— вежливо, если подразумевается «есть/является»\\n• A 还是 B？— проще, без 是\\n\\n茶还是果汁？— Чай или сок?\\n你们一般坐公共汽车还是打车？— Обычно на автобусе или на такси?\\n\\nВ ответе 是 можно опустить.",
examples:[
{hz:"茶还是果汁？",py:"Chá háishi guǒzhī?",tr:"Чай или сок?"},
{hz:"你是美国人还是加拿大人？",py:"Nǐ shì Měiguó rén háishi Jiānádà rén?",tr:"Ты американец или канадец?"},
{hz:"你喝茶还是喝咖啡？",py:"Nǐ hē chá háishi hē kāfēi?",tr:"Ты будешь чай или кофе?"},
{hz:"是你去还是我去？",py:"Shì nǐ qù háishi wǒ qù?",tr:"Ты пойдёшь или я?"}
]}
],
dialogues:[
{title:"В гостях у 王老师 (阿曼, 古丽, 王老师)",lines:[
{s:"A",hz:"请进，请进！",py:"Qǐng jìn, qǐng jìn!",tr:"Заходите, заходите!"},
{s:"B",hz:"老师，您的家真干净啊！",py:"Lǎoshī, nín de jiā zhēn gānjìng a!",tr:"Учитель, у вас дома так чисто!"},
{s:"A",hz:"是吗？来，坐这儿吧！",py:"Shì ma? Lái, zuò zhèr ba!",tr:"Правда? Проходите, садитесь сюда!"},
{s:"B",hz:"这是给您的礼物。",py:"Zhè shì gěi nín de lǐwù.",tr:"Это подарок для вас."},
{s:"A",hz:"哎呀！你们太客气了。",py:"Āiyā! Nǐmen tài kèqi le.",tr:"Ой! Вы зря так беспокоитесь."},
{s:"B",hz:"一点儿心意，请收下。",py:"Yìdiǎnr xīnyì, qǐng shōuxià.",tr:"Небольшой знак внимания — примите, пожалуйста."},
{s:"A",hz:"谢谢！你们喝什么？茶还是果汁？",py:"Xièxie! Nǐmen hē shénme? Chá háishi guǒzhī?",tr:"Спасибо! Что будете пить? Чай или сок?"},
{s:"B",hz:"随便，什么都行。",py:"Suíbiàn, shénme dōu xíng.",tr:"Без разницы, любое подойдёт."},
{s:"A",hz:"路上顺利吗？",py:"Lùshàng shùnlì ma?",tr:"Добрались без проблем?"},
{s:"B",hz:"不太顺利，车上有点儿挤。",py:"Bú tài shùnlì, chē shàng yǒudiǎnr jǐ.",tr:"Не совсем, в автобусе было тесновато."},
{s:"A",hz:"你们饿不饿？中午在我家吃饺子，怎么样？",py:"Nǐmen è bu è? Zhōngwǔ zài wǒ jiā chī jiǎozi, zěnmeyàng?",tr:"Вы не голодные? Пообедаем у меня пельменями, как?"},
{s:"B",hz:"太好了，我最喜欢吃的就是饺子。",py:"Tài hǎo le, wǒ zuì xǐhuan chī de jiùshì jiǎozi.",tr:"Отлично, я как раз обожаю пельмени!"},
{s:"A",hz:"你们会包吗？",py:"Nǐmen huì bāo ma?",tr:"Вы умеете лепить?"},
{s:"B",hz:"不太会，我们试试吧！",py:"Bú tài huì, wǒmen shìshi ba!",tr:"Не очень, попробуем!"}
]}
],
tips:[
"Этикет подарков: 一点儿心意 («небольшой знак внимания») — стандартная скромная формула при вручении. Хозяин в ответ говорит 太客气了 («зря вы так»).",
"随便 / 什么都行 — очень вежливый ответ когда предлагают выбор. Буквально «как угодно / всё подойдёт». НЕ невежливо, наоборот — воспитанно не навязывать свои предпочтения.",
"饺子 — символическая еда в Китае, особенно на Новый год (春节). Форма похожа на старинные деньги, означает богатство. Лепить всей семьёй — традиция.",
"真 (zhēn) перед прилагательным = «правда, действительно»: 真干净 (правда чисто), 真好吃 (реально вкусно). Сильнее чем 很.",
"哎呀 (āiyā) — универсальное восклицание удивления/ужаса/разочарования. Контекст определяет тон. При получении подарка: удивление + вежливое возражение."
]
},
18:{
introduction:"Продолжение визита (Part 2). Вы научитесь перечислять примеры (A啦 B啦 C啦), использовать 得 («должен»), риторический вопрос 不是……吗? и условный оборот 如果……就…… («если… то…»).\\n\\nСитуация: за столом обсуждают разницу между северными и южными китайцами в еде, и как проще — лепить пельмени самим или покупать замороженные.",
vocabulary:[
{hz:"好吃",py:"hǎochī",tr:"вкусный"},
{hz:"味道",py:"wèidào",tr:"вкус, запах"},
{hz:"北方",py:"běifāng",tr:"север (Китая)"},
{hz:"过",py:"guò",tr:"проводить (время), праздновать"},
{hz:"节",py:"jié",tr:"праздник"},
{hz:"客人",py:"kèren",tr:"гость"},
{hz:"南方",py:"nánfāng",tr:"юг (Китая)"},
{hz:"米饭",py:"mǐfàn",tr:"варёный рис"},
{hz:"面食",py:"miànshí",tr:"мучные изделия"},
{hz:"对……来说",py:"duì...lái shuō",tr:"что касается (кого-то)"},
{hz:"重要",py:"zhòngyào",tr:"важный"},
{hz:"种",py:"zhǒng",tr:"сорт, вид"},
{hz:"食品",py:"shípǐn",tr:"еда, продукты"},
{hz:"麻烦",py:"máfan",tr:"хлопотный, доставить хлопоты"},
{hz:"少",py:"shǎo",tr:"мало, немного"},
{hz:"馅儿",py:"xiànr",tr:"начинка"},
{hz:"得",py:"děi",tr:"должен, приходится"},
{hz:"花",py:"huā",tr:"тратить (время, деньги)"},
{hz:"超市",py:"chāoshì",tr:"супермаркет"},
{hz:"速冻",py:"sùdòng",tr:"замороженный"},
{hz:"如果",py:"rúguǒ",tr:"если"},
{hz:"的话",py:"dehuà",tr:"если (частица условия)"},
{hz:"想",py:"xiǎng",tr:"хотеть"},
{hz:"袋",py:"dài",tr:"пакет, мешок"},
{hz:"偷懒",py:"tōu lǎn",tr:"лениться"},
{hz:"大家",py:"dàjiā",tr:"все, каждый"},
{hz:"热闹",py:"rènao",tr:"оживлённо, весело"},
{hz:"有意思",py:"yǒu yìsi",tr:"интересно"}
],
grammar:[
{title:"Перечисление через 啦: A啦 B啦 C啦",
explanation:"Частица 啦 (la) после каждого элемента списка = русское «…, …, … (разные)». Создаёт неформальное перечисление с оттенком «и то, и это».\\n\\nСхема:  A 啦，B 啦，C 啦……\\n\\n过生日啦，过节啦，来客人啦 — 一般都包饺子吃。\\n«Дни рождения, праздники, приход гостей — обычно лепят пельмени.»\\n\\n啦 объединяет разные случаи в один общий контекст. Часто после списка идёт 都 («все эти»).",
examples:[
{hz:"过生日啦，过节啦，来客人啦，一般都包饺子吃。",py:"Guò shēngrì la, guò jié la, lái kèren la, yìbān dōu bāo jiǎozi chī.",tr:"Дни рождения, праздники, гости — обычно лепят пельмени."},
{hz:"我们大学有很多国家的留学生，美国啦，日本啦，英国啦……",py:"Wǒmen dàxué yǒu hěn duō guójiā de liúxuéshēng, Měiguó la, Rìběn la, Yīngguó la...",tr:"В нашем вузе студенты из разных стран — из США, Японии, Англии…"},
{hz:"阿曼去商店买很多东西，衣服啦，食品啦，啤酒啦。",py:"Āmàn qù shāngdiàn mǎi hěn duō dōngxi, yīfu la, shípǐn la, píjiǔ la.",tr:"Аман в магазине покупает много — одежду, еду, пиво."}
]},
{title:"得 (děi) — «должен, надо»",
explanation:"得 (в этом значении читается DĚI, не DÉ!) означает «должен, надо, приходится». Ставится перед глаголом.\\n\\nСхема:  Подл. + 得 + Глагол + (Объект)\\n\\n做馅儿就得花很多时间。\\n«Делать начинку — надо потратить много времени.»\\n\\nОтрицание: 不用 (не нужно), НЕ 不得!\\n• 我得去学校。— Мне надо в школу.\\n• 我不用去学校。— Мне не надо в школу.\\n\\nВнимание: иероглиф 得 имеет 3 чтения — dé (получать), děi (должен), de (показатель степени). Здесь только DĚI.",
examples:[
{hz:"做馅儿就得花很多时间。",py:"Zuò xiànr jiù děi huā hěn duō shíjiān.",tr:"Делать начинку — нужно много времени."},
{hz:"明天早上八点有课，我得七点起床。",py:"Míngtiān zǎoshang bā diǎn yǒu kè, wǒ děi qī diǎn qǐ chuáng.",tr:"Завтра в 8 занятия, нужно встать в 7."},
{hz:"包饺子比较麻烦，我得花很多时间。",py:"Bāo jiǎozi bǐjiào máfan, wǒ děi huā hěn duō shíjiān.",tr:"Лепить пельмени хлопотно, уйдёт много времени."}
]},
{title:"Риторический вопрос: 不是……吗？",
explanation:"不是……吗？ — риторический вопрос, который на самом деле УТВЕРЖДЕНИЕ. Смысл: «разве не X? (ведь X же!)».\\n\\nСхема:  不是 + Утверждение + 吗？\\n\\n超市不是有速冻饺子吗？\\n= «Разве в супермаркете нет замороженных пельменей? (Ведь есть же!)»\\n\\nИспользуется:\\n• Когда напоминаешь очевидный факт\\n• Когда мягко возражаешь\\n• Когда удивляешься забытому\\n\\nЭто НЕ вопрос в обычном смысле — ответ предполагается очевидным и положительным.",
examples:[
{hz:"超市不是有速冻饺子吗？",py:"Chāoshì bú shì yǒu sùdòng jiǎozi ma?",tr:"Разве в супермаркете нет замороженных пельменей?"},
{hz:"你不是美国人吗？",py:"Nǐ bú shì Měiguó rén ma?",tr:"Разве ты не американец? (ведь американец же)"},
{hz:"你们不是朋友吗？",py:"Nǐmen bú shì péngyou ma?",tr:"Разве вы не друзья?"},
{hz:"你不是喜欢喝咖啡吗？",py:"Nǐ bú shì xǐhuan hē kāfēi ma?",tr:"Ты же вроде любишь кофе, разве нет?"}
]},
{title:"Условный оборот: 如果……(的话)，就……",
explanation:"如果 A (的话)，就 B — «если А, то Б». Классический условный оборот.\\n\\nСхема:  如果 + Условие + (的话)，就 + Результат\\n\\n• 如果 (rúguǒ) — «если» в начале условия\\n• 的话 (dehuà) — опциональная частица в конце условия\\n• 就 (jiù) — «то, тогда» в начале результата\\n\\nМожно использовать все 3 элемента или только часть. Минимально: «Условие, 就 Результат». Но полная форма яснее.",
examples:[
{hz:"如果想吃的话，就去买一袋。",py:"Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài.",tr:"Если хочешь есть — купи пакетик."},
{hz:"如果坐地铁的话，比较快，也比较便宜。",py:"Rúguǒ zuò dìtiě dehuà, bǐjiào kuài, yě bǐjiào piányi.",tr:"Если ехать на метро — быстрее и дешевле."},
{hz:"如果下课早，我们就去商店。",py:"Rúguǒ xià kè zǎo, wǒmen jiù qù shāngdiàn.",tr:"Если уроки закончатся рано — пойдём в магазин."},
{hz:"如果没有安排的话，我就去。",py:"Rúguǒ méiyǒu ānpái dehuà, wǒ jiù qù.",tr:"Если нет планов — схожу."}
]}
],
dialogues:[
{title:"Север vs Юг (王老师, 阿曼, 古丽)",lines:[
{s:"A",hz:"老师，今天的饺子真好吃！",py:"Lǎoshī, jīntiān de jiǎozi zhēn hǎochī!",tr:"Учитель, пельмени сегодня очень вкусные!"},
{s:"B",hz:"是啊，味道挺不错的。老师，中国人都喜欢吃饺子吗？",py:"Shì a, wèidào tǐng búcuò de. Lǎoshī, Zhōngguó rén dōu xǐhuan chī jiǎozi ma?",tr:"Да, на вкус отличные. Учитель, все китайцы любят пельмени?"},
{s:"A",hz:"大部分北方人都喜欢吃饺子。过生日啦，过节啦，来客人啦，一般都包饺子吃。",py:"Dàbùfen běifāng rén dōu xǐhuan chī jiǎozi. Guò shēngrì la, guò jié la, lái kèren la, yìbān dōu bāo jiǎozi chī.",tr:"Большинство северян любят. На дни рождения, праздники, при гостях — обычно лепят пельмени."},
{s:"B",hz:"南方人不吃饺子吗？",py:"Nánfāng rén bù chī jiǎozi ma?",tr:"А южане не едят?"},
{s:"A",hz:"不常吃。南方人喜欢吃米饭，不太喜欢吃面食。",py:"Bù cháng chī. Nánfāng rén xǐhuan chī mǐfàn, bú tài xǐhuan chī miànshí.",tr:"Нечасто. Южане любят рис, мучное — не очень."},
{s:"B",hz:"是这样啊！对北方人来说，饺子是很重要的一种食品吧？",py:"Shì zhèyàng a! Duì běifāng rén lái shuō, jiǎozi shì hěn zhòngyào de yì zhǒng shípǐn ba?",tr:"Вот оно как! Для северян пельмени — важная еда, верно?"},
{s:"A",hz:"是啊！不过，包饺子比较麻烦，特别是人少的时候。",py:"Shì a! Búguò, bāo jiǎozi bǐjiào máfan, tèbié shì rén shǎo de shíhou.",tr:"Да! Но лепить хлопотно, особенно когда людей мало."},
{s:"B",hz:"对，做馅儿就得花很多时间呢。",py:"Duì, zuò xiànr jiù děi huā hěn duō shíjiān ne.",tr:"Да, одна начинка сколько времени требует."},
{s:"C",hz:"超市不是有速冻饺子吗？如果想吃的话，就去买一袋。",py:"Chāoshì bú shì yǒu sùdòng jiǎozi ma? Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài.",tr:"А в супермаркете разве нет замороженных? Если хочется — купи пакетик."},
{s:"A",hz:"你真会偷懒。不过，大家一起包饺子，热闹，也挺有意思的。",py:"Nǐ zhēn huì tōu lǎn. Búguò, dàjiā yìqǐ bāo jiǎozi, rènao, yě tǐng yǒu yìsi de.",tr:"Ну ты и ленивый! Но лепить вместе — весело, и правда интересно."},
{s:"B",hz:"速冻饺子的味道怎么样？好吃吗？",py:"Sùdòng jiǎozi de wèidào zěnmeyàng? Hǎochī ma?",tr:"А замороженные пельмени на вкус как? Вкусные?"},
{s:"C",hz:"也很好吃。",py:"Yě hěn hǎochī.",tr:"Тоже вкусные."}
]}
],
tips:[
"Север vs Юг Китая: Север (北方) любит мучное (面食: пельмени, лапша, лепёшки), Юг (南方) — рис (米饭). Граница проходит условно по реке Хуайхэ. Важный культурный факт.",
"对……来说 — «с точки зрения кого-то, для кого-то». Очень употребительная формула: 对学生来说 (для студентов), 对我来说 (для меня), 对中国人来说 (с точки зрения китайцев).",
"得 DĚI vs DÉ: 得 DĚI — должен (смысловой). 得 DÉ — получать. Также 得 DE — суффикс степени (走得快 — быстро идёт). Три разных слова-омонима.",
"如果…的话 — обычно 的话 ставится В КОНЦЕ условия. 如果хоть одно из трёх (如果, 的话, 就) достаточно, но чем больше элементов — тем яснее.",
"偷懒 дословно «красть лень» = «лениться, халтурить». Популярное выражение. 你真会偷懒 — «ну ты и ленивый!» (дружеская шутка)."
]
},
19:{
introduction:"В этой главе вы научитесь говорить о привычках и времени привыкания, использовать частицу 了 для изменения состояния, различать 就 (раньше) и 才 (позже) и спрашивать возраст разными способами.\\n\\nСитуация: 王老师 расспрашивает 阿曼 про его жизнь в Пекине — привык ли он, когда ложится спать.",
vocabulary:[
{hz:"多",py:"duō",tr:"как, насколько (в вопросе)"},
{hz:"长",py:"cháng",tr:"длинный, долгий"},
{hz:"年",py:"nián",tr:"год"},
{hz:"习惯",py:"xíguàn",tr:"привыкать; привычка"},
{hz:"生活",py:"shēnghuó",tr:"жизнь, быт"},
{hz:"刚",py:"gāng",tr:"только что, недавно"},
{hz:"已经",py:"yǐjīng",tr:"уже"},
{hz:"不好意思",py:"bù hǎoyìsi",tr:"извините, неловко"},
{hz:"才",py:"cái",tr:"только (позже, чем ожидалось)"},
{hz:"起床",py:"qǐ chuáng",tr:"вставать (с постели)"},
{hz:"床",py:"chuáng",tr:"кровать, постель"},
{hz:"睡",py:"shuì",tr:"спать, засыпать"},
{hz:"夜里",py:"yèli",tr:"ночью"},
{hz:"点钟",py:"diǎnzhōng",tr:"час (на часах)"},
{hz:"早睡早起",py:"zǎo shuì zǎo qǐ",tr:"рано ложиться и рано вставать"},
{hz:"工作",py:"gōngzuò",tr:"работать; работа"},
{hz:"毛病",py:"máobìng",tr:"недостаток, дурная привычка"},
{hz:"改",py:"gǎi",tr:"изменить, исправить"},
{hz:"大",py:"dà",tr:"большой; старший (о возрасте)"},
{hz:"年纪",py:"niánjì",tr:"возраст"},
{hz:"大概",py:"dàgài",tr:"примерно, около"},
{hz:"岁",py:"suì",tr:"лет (о возрасте)"}
],
grammar:[
{title:"Частица 了 (1) — изменение состояния / завершённость",
explanation:"了 (le) в конце предложения указывает на ИЗМЕНЕНИЕ или завершённость действия/состояния.\\n\\nСхема:  Предложение + 了\\n\\n• 我习惯了。— Я привык (теперь). (раньше не был привыкшим — стал)\\n• 他去图书馆了。— Он ушёл в библиотеку. (уже ушёл)\\n• 昨天下雪了。— Вчера шёл снег. (завершённое действие)\\n\\nОтрицание: 没 + Глагол (БЕЗ 了).\\n❌ 没去了 → ✅ 没去\\n• 他没去图书馆。— Он НЕ ходил в библиотеку.\\n\\nЭто одна из самых сложных частиц в китайском — у 了 много значений. Пока запомните: «изменение или завершённость».",
examples:[
{hz:"现在已经习惯了。",py:"Xiànzài yǐjīng xíguàn le.",tr:"Сейчас уже привык."},
{hz:"他去图书馆了。",py:"Tā qù túshūguǎn le.",tr:"Он ушёл в библиотеку."},
{hz:"他没去图书馆。",py:"Tā méi qù túshūguǎn.",tr:"Он НЕ ходил в библиотеку."},
{hz:"昨天下雪了。",py:"Zuótiān xià xuě le.",tr:"Вчера шёл снег."}
]},
{title:"Наречие 还 (2) — «всё ещё, пока»",
explanation:"Мы уже видели 还 в значении «ещё, вдобавок» (Глава 10). Здесь второе значение — «всё ещё, пока (продолжается)».\\n\\nСхема:  还 + Глагол/Прилагательное (+ 没…)\\n\\n• 这还没习惯。— С этим пока не привык. (всё ещё не)\\n• 已经十二点了，他还在学习。— Уже 12, а он всё ещё учится.\\n\\nЧасто с 没 — «ещё не»:\\n• 还没习惯 — ещё не привык\\n• 还没来 — ещё не пришёл\\n• 还没吃饭 — ещё не ел",
examples:[
{hz:"这还没习惯。",py:"Zhè hái méi xíguàn.",tr:"С этим пока не привык."},
{hz:"已经夜里十二点了，他还在学习。",py:"Yǐjīng yèli shí'èr diǎn le, tā hái zài xuéxí.",tr:"Уже полночь, а он всё ещё учится."},
{hz:"来北京半年了，他还没习惯早上八点上课。",py:"Lái Běijīng bàn nián le, tā hái méi xíguàn zǎoshang bā diǎn shàng kè.",tr:"Уже полгода в Пекине, а к занятиям в 8 утра всё не привыкнет."},
{hz:"已经三十岁了，他还没有女朋友。",py:"Yǐjīng sānshí suì le, tā hái méiyǒu nǚ péngyou.",tr:"Уже 30 лет, а подруги всё нет."}
]},
{title:"就 vs 才 — «раньше» vs «позже, чем ожидалось»",
explanation:"Два очень важных слова, которые меняют смысл времени:\\n\\n• 就 (jiù) — подчёркивает что действие РАНО/БЫСТРО:\\n  他早上六点就起床了。— Он ВСТАЛ уже в 6 (рано).\\n  妹妹三岁就开始学跳舞。— Сестра в 3 УЖЕ начала танцевать.\\n\\n• 才 (cái) — подчёркивает что действие ПОЗДНО/МЕДЛЕННО:\\n  他早上八点才起床。— Он встал только в 8 (поздно).\\n  古丽七点半才去教室。— Гульнара только в 7:30 пошла в аудиторию.\\n\\nОдно и то же время (например, 8 часов) можно подать и как «рано» (就), и как «поздно» (才) — зависит от ожиданий.",
examples:[
{hz:"我一般早上八点才起床。",py:"Wǒ yìbān zǎoshang bā diǎn cái qǐ chuáng.",tr:"Я обычно только в 8 утра встаю (поздно)."},
{hz:"有时候夜里两点钟才睡。",py:"Yǒu shíhou yèli liǎng diǎnzhōng cái shuì.",tr:"Иногда только в 2 ночи ложусь."},
{hz:"他上个星期就回国了。",py:"Tā shàng ge xīngqī jiù huí guó le.",tr:"Он ещё на прошлой неделе уехал на родину (рано)."},
{hz:"妹妹三岁就开始学跳舞。",py:"Mèimei sān suì jiù kāishǐ xué tiào wǔ.",tr:"Сестра уже в 3 начала танцевать."}
]},
{title:"Как спрашивать возраст",
explanation:"В китайском ТРИ формы вопроса о возрасте, в зависимости от возраста собеседника:\\n\\n1) ДЕТИ (<10 лет): 几岁？\\n   • 你今年几岁了？— Сколько тебе лет?\\n   • 我六岁。— Мне 6.\\n\\n2) ВЗРОСЛЫЕ (10+): 多大？\\n   • 你多大？— Сколько тебе?\\n   • 我二十二。— 22.\\n\\n3) ПОЖИЛЫЕ (вежливо): 多大年纪？ / 多大岁数？\\n   • 您多大年纪？— Сколько Вам лет? (почтительно)\\n\\nВажно не перепутать — для ребёнка 多大 звучит странно, а для старика 几岁 — грубо.",
examples:[
{hz:"你今年几岁了？",py:"Nǐ jīnnián jǐ suì le?",tr:"Сколько тебе лет (ребёнку)?"},
{hz:"你多大？",py:"Nǐ duō dà?",tr:"Сколько тебе (взрослому)?"},
{hz:"您多大年纪？",py:"Nín duō dà niánjì?",tr:"Сколько Вам лет (пожилому)?"},
{hz:"大概二十五岁吧。",py:"Dàgài èrshíwǔ suì ba.",tr:"Примерно 25 лет."}
]}
],
dialogues:[
{title:"Привычки и возраст (王老师 и 阿曼)",lines:[
{s:"A",hz:"阿曼，你来北京多长时间了？",py:"Āmàn, nǐ lái Běijīng duō cháng shíjiān le?",tr:"Аман, ты давно в Пекине?"},
{s:"B",hz:"差不多半年多。",py:"Chàbuduō bàn nián duō.",tr:"Примерно полгода с небольшим."},
{s:"A",hz:"习惯北京的生活了吧？",py:"Xíguàn Běijīng de shēnghuó le ba?",tr:"Уже привык к пекинской жизни?"},
{s:"B",hz:"刚来的时候不习惯，现在已经习惯了。",py:"Gāng lái de shíhou bù xíguàn, xiànzài yǐjīng xíguàn le.",tr:"Сначала не привык, а теперь уже привык."},
{s:"A",hz:"早上八点上课也习惯了吗？",py:"Zǎoshang bā diǎn shàng kè yě xíguàn le ma?",tr:"А к занятиям в 8 утра привык?"},
{s:"B",hz:"不好意思，这还没习惯。在美国，我一般早上八点才起床。",py:"Bù hǎoyìsi, zhè hái méi xíguàn. Zài Měiguó, wǒ yìbān zǎoshang bā diǎn cái qǐ chuáng.",tr:"Неловко сказать, пока нет. В Америке я обычно только в 8 вставал."},
{s:"A",hz:"是吗？现在晚上几点睡觉？",py:"Shì ma? Xiànzài wǎnshang jǐ diǎn shuì jiào?",tr:"Правда? Сейчас во сколько ложишься?"},
{s:"B",hz:"一般十二点睡，有时候夜里两点钟才睡。不过，早上八点有课的话，就早一点儿睡。",py:"Yìbān shí'èr diǎn shuì, yǒu shíhou yèli liǎng diǎnzhōng cái shuì. Búguò, zǎoshang bā diǎn yǒu kè dehuà, jiù zǎo yìdiǎnr shuì.",tr:"Обычно в 12, иногда только в 2 ночи. Но если в 8 утра пары — ложусь пораньше."},
{s:"A",hz:"早睡早起比较好吧？我是学生的时候，也喜欢睡懒觉。工作以后，这个毛病就改了。",py:"Zǎo shuì zǎo qǐ bǐjiào hǎo ba? Wǒ shì xuéshēng de shíhou, yě xǐhuan shuì lǎnjiào. Gōngzuò yǐhòu, zhège máobìng jiù gǎi le.",tr:"«Рано ложись — рано вставай» — так ведь лучше? Я в студенческие годы тоже любила поспать. А после работы эту привычку изменила."},
{s:"B",hz:"是吗？那时候您多大年纪？",py:"Shì ma? Nà shíhou nín duō dà niánjì?",tr:"Правда? А сколько Вам тогда было?"},
{s:"A",hz:"大概二十五岁吧。",py:"Dàgài èrshíwǔ suì ba.",tr:"Лет 25 примерно."}
]}
],
tips:[
"刚 (gāng) и 刚才 (gāngcái) — оба «только что», но 刚 = перед глаголом (刚来 — только пришёл), 刚才 = самостоятельное слово времени (刚才他来了 — он только что пришёл).",
"多长时间了？ — стандартная формула «как давно?». Отвечают периодом: 半年了 (полгода), 三年了 (три года). 了 тут = «уже прошло».",
"早睡早起 — китайская поговорка-пожелание, как русское «кто рано встаёт, тому Бог подаёт». Культурная ценность трудолюбия и дисциплины.",
"不好意思 — буквально «неловко/стыдно», но используется как мягкое «извините» в бытовых ситуациях (когда беспокоишь, просишь прощения за мелочь). Мягче чем 对不起.",
"毛病 (máobìng) — «недостаток, болячка, дурная привычка». О человеке: 他有很多毛病 (у него много недостатков). О технике: 电脑有毛病了 (компьютер сломался)."
]
},
20:{
introduction:"Это итоговая глава Unit 4. Вы научитесь использовать конструкцию «прил.+死了» («ужасно…»), отрицательную команду 别 («не делай») и повторите грамматику глав 16-19.\\n\\nСитуация: 阿曼 навещает заболевшую 古丽 в больнице. Они шутят что лучше: болеть или учиться.",
vocabulary:[
{hz:"看",py:"kàn",tr:"навещать, смотреть"},
{hz:"别客气",py:"bié kèqi",tr:"не стесняйся, не церемонься"},
{hz:"别",py:"bié",tr:"не надо, не (запрет)"},
{hz:"无聊",py:"wúliáo",tr:"скучный, скучно"},
{hz:"医院",py:"yīyuàn",tr:"больница"},
{hz:"做梦",py:"zuò mèng",tr:"видеть сны, мечтать"},
{hz:"幸福",py:"xìngfú",tr:"счастливый"},
{hz:"背",py:"bèi",tr:"заучивать, запоминать"},
{hz:"生词",py:"shēngcí",tr:"новые слова"},
{hz:"考试",py:"kǎoshì",tr:"экзамен, сдавать экзамен"},
{hz:"累",py:"lèi",tr:"уставший"},
{hz:"死",py:"sǐ",tr:"умирать; до смерти (суффикс крайней степени)"},
{hz:"住",py:"zhù",tr:"жить, проживать"},
{hz:"问",py:"wèn",tr:"спрашивать"},
{hz:"医生",py:"yīshēng",tr:"врач, доктор"},
{hz:"同意",py:"tóngyì",tr:"соглашаться"},
{hz:"对了",py:"duì le",tr:"кстати, ах да"},
{hz:"炒",py:"chǎo",tr:"жарить (помешивая)"},
{hz:"菜",py:"cài",tr:"блюдо, овощи"},
{hz:"面条儿",py:"miàntiáor",tr:"лапша"},
{hz:"病人",py:"bìngrén",tr:"больной, пациент"},
{hz:"身体",py:"shēntǐ",tr:"тело, здоровье"},
{hz:"药",py:"yào",tr:"лекарство"},
{hz:"麦当劳",py:"Màidāngláo",tr:"Макдоналдс"}
],
grammar:[
{title:"Прил. + 死了 — «ужасно, до смерти»",
explanation:"Конструкция «Прилагательное + 死了» выражает КРАЙНЮЮ степень. Буквально «до смерти X», смысл: «ужасно X, супер-X».\\n\\nСхема:  Прил. + 死了\\n\\n累死了！— Я ужасно устал!\\n冷死了！— Зверский холод!\\n饿死了！— Умираю от голода!\\n热死了！— Жара невыносимая!\\n\\nЭто очень разговорная и эмоциональная форма. В формальных ситуациях лучше 非常 (очень) или 很.\\n\\nРаботает в основном с негативными прилагательными (усталость, голод, скука, холод, жара).",
examples:[
{hz:"考试啦……累死了。",py:"Kǎoshì la... lèi sǐ le.",tr:"Ещё экзамены… ужасно устал."},
{hz:"人太多，挤死了。",py:"Rén tài duō, jǐ sǐ le.",tr:"Людей слишком много, давка страшная."},
{hz:"今天零下十度，冷死了。",py:"Jīntiān língxià shí dù, lěng sǐ le.",tr:"Сегодня -10, холодрыга."},
{hz:"饿死了！",py:"È sǐ le!",tr:"Умираю от голода!"}
]},
{title:"Запрет: 别 + Глагол — «не делай»",
explanation:"别 (bié) + Глагол означает запрет «не делай X». Более мягкая форма чем 不要.\\n\\nСхема:  别 + Глагол + (Объект)\\n\\n别客气！— Не стесняйся! / Не церемонься!\\n别去！— Не ходи!\\n别说了！— Хватит говорить!\\n\\n别 чаще всего в повелительных фразах (команда, просьба). Для описания «не буду» используют 不 (不去 — не пойду).\\n\\n别 — только для приказа/просьбы «не делай сейчас».",
examples:[
{hz:"别客气。",py:"Bié kèqi.",tr:"Не стесняйся."},
{hz:"别客气，请喝茶。",py:"Bié kèqi, qǐng hē chá.",tr:"Не церемоньтесь, пейте чай."},
{hz:"别吃太多。",py:"Bié chī tài duō.",tr:"Не ешь слишком много."},
{hz:"别说了。",py:"Bié shuō le.",tr:"Хватит говорить."}
]},
{title:"一个人 — «один, в одиночестве»",
explanation:"一个人 (yí ge rén) буквально «один человек», но в предложениях означает «сам, в одиночестве».\\n\\nСхема:  一个人 + Глагол\\n\\n一个人吃 — есть одному\\n一个人睡 — спать одному\\n一个人玩儿 — играть в одиночку\\n\\nЧасто повторяется для эмоционального эффекта:\\n一个人吃，一个人睡，一个人玩儿 — всё в одиночку.\\n\\nПереводится как «сам/сама, одна/один». В разговоре о тоске или самостоятельности.",
examples:[
{hz:"一个人吃，一个人睡，一个人玩儿，挺无聊的。",py:"Yí ge rén chī, yí ge rén shuì, yí ge rén wánr, tǐng wúliáo de.",tr:"Ешь один, спишь один, играешь один — скукотища."},
{hz:"我一个人住。",py:"Wǒ yí ge rén zhù.",tr:"Я живу один."},
{hz:"她一个人去北京了。",py:"Tā yí ge rén qù Běijīng le.",tr:"Она одна поехала в Пекин."}
]}
],
dialogues:[
{title:"В больнице (阿曼 и 古丽)",lines:[
{s:"A",hz:"古丽，怎么样？现在好一点儿了吗？",py:"Gǔlì, zěnmeyàng? Xiànzài hǎo yìdiǎnr le ma?",tr:"Гульнара, как ты? Уже получше?"},
{s:"B",hz:"好一点儿了。谢谢你来看我。",py:"Hǎo yìdiǎnr le. Xièxie nǐ lái kàn wǒ.",tr:"Получше. Спасибо, что зашёл."},
{s:"A",hz:"别客气。不上课，也没有作业，挺舒服的吧？",py:"Bié kèqi. Bú shàng kè, yě méiyǒu zuòyè, tǐng shūfu de ba?",tr:"Не стесняйся. Ни занятий, ни заданий — наверное кайф?"},
{s:"B",hz:"不舒服。一个人吃，一个人睡，一个人玩儿，挺无聊的。",py:"Bù shūfu. Yí ge rén chī, yí ge rén shuì, yí ge rén wánr, tǐng wúliáo de.",tr:"Вообще не кайф. Одна ешь, одна спишь, одна развлекаешься — скука смертная."},
{s:"A",hz:"你在医院都干什么呢？",py:"Nǐ zài yīyuàn dōu gàn shénme ne?",tr:"А что ты в больнице делаешь?"},
{s:"B",hz:"看看书，听听音乐，睡睡觉，做做梦……",py:"Kànkan shū, tīngting yīnyuè, shuìshui jiào, zuòzuo mèng...",tr:"Читаю, слушаю музыку, сплю, снятся сны…"},
{s:"A",hz:"你太幸福了！我每天在学校背生词啦，听写啦，做作业啦，考试啦……累死了。",py:"Nǐ tài xìngfú le! Wǒ měi tiān zài xuéxiào bèi shēngcí la, tīngxiě la, zuò zuòyè la, kǎoshì la... lèi sǐ le.",tr:"Как тебе повезло! У меня каждый день — новые слова, диктанты, уроки, экзамены… умираю от усталости."},
{s:"B",hz:"那咱们换换，怎么样？你来医院住，我去上课。",py:"Nà zánmen huànhuan, zěnmeyàng? Nǐ lái yīyuàn zhù, wǒ qù shàng kè.",tr:"Давай поменяемся? Ты ложись в больницу, я пойду на пары."},
{s:"A",hz:"好啊，不过你得问问医生行不行。如果医生同意的话，咱们就换。对了，你中午想吃什么？米饭，炒菜，面条儿，还是饺子？",py:"Hǎo a, búguò nǐ děi wènwen yīshēng xíng bu xíng. Rúguǒ yīshēng tóngyì dehuà, zánmen jiù huàn. Duì le, nǐ zhōngwǔ xiǎng chī shénme? Mǐfàn, chǎo cài, miàntiáor, háishi jiǎozi?",tr:"Хорошо, но сначала спроси у врача. Если согласится — поменяемся. Кстати, что хочешь на обед? Рис, овощи с мясом, лапшу или пельмени?"},
{s:"B",hz:"麦当劳！我想吃麦当劳。",py:"Màidāngláo! Wǒ xiǎng chī Màidāngláo.",tr:"Макдоналдс! Хочу Макдоналдс."},
{s:"A",hz:"你不是病人吗？身体不好，还得吃药……吃面条儿吧！",py:"Nǐ bú shì bìngrén ma? Shēntǐ bù hǎo, hái děi chī yào... chī miàntiáor ba!",tr:"Ты же больная? Здоровье плохое, ещё лекарства пить — ешь лапшу!"}
]}
],
tips:[
"好一点儿了 — «стало немного лучше». Частица 了 показывает изменение. Стандартная фраза вежливости к выздоравливающему.",
"别客气 — универсальный ответ вежливости: в гостях, когда благодарят, когда просят. Означает «расслабься, без формальностей».",
"看病人 и 看医生: 看病人 — «навестить больного», 看医生 / 看病 — «пойти к врачу». Глагол 看 тут = «посещать, смотреть».",
"Частица 啦 в перечислении 背生词啦，听写啦，做作业啦 — как в Главе 18. Придаёт эмоциональный оттенок «и то, и это, и ещё…».",
"对了 (duì le) — «кстати, ах да!» Переключение темы, вспомнил что-то. Очень частая разговорная фраза."
]
},
21:{
introduction:"В этой главе вы научитесь использовать 又 (снова, повторение), частицу 了 (2) с числами (V+了+кол-во+O) и 好像 («кажется»). Тема — китайская культура гостеприимства и алкоголь.\\n\\nСитуация: 古丽 застаёт 阿曼 больного с похмелья. Вчера китайские друзья накачали его байцзю — он выпил полцзиня (250г!) крепкого алкоголя.",
vocabulary:[
{hz:"生气",py:"shēng qì",tr:"сердиться, злиться"},
{hz:"好像",py:"hǎoxiàng",tr:"кажется, похоже"},
{hz:"脸色",py:"liǎnsè",tr:"цвет лица, вид"},
{hz:"熬夜",py:"áo yè",tr:"не спать всю ночь"},
{hz:"斤",py:"jīn",tr:"цзинь (500г)"},
{hz:"白酒",py:"báijiǔ",tr:"байцзю (крепкий алкоголь)"},
{hz:"头",py:"tóu",tr:"голова"},
{hz:"疼",py:"téng",tr:"болеть"},
{hz:"疯",py:"fēng",tr:"сойти с ума"},
{hz:"醉",py:"zuì",tr:"напиться"},
{hz:"吐",py:"tù",tr:"тошнить, рвать"},
{hz:"饭",py:"fàn",tr:"еда, рис"},
{hz:"热情",py:"rèqíng",tr:"радушный, гостеприимный"},
{hz:"不停",py:"bù tíng",tr:"без остановки"},
{hz:"地",py:"de",tr:"частица обстоятельства (образа действия)"},
{hz:"倒",py:"dào",tr:"наливать"},
{hz:"酒",py:"jiǔ",tr:"алкоголь, вино"},
{hz:"有的",py:"yǒude",tr:"некоторые"},
{hz:"请客",py:"qǐng kè",tr:"угощать, быть хозяином"},
{hz:"劝酒",py:"quàn jiǔ",tr:"уговаривать выпить"},
{hz:"渴",py:"kě",tr:"хотеть пить"},
{hz:"帮",py:"bāng",tr:"помочь"},
{hz:"杯",py:"bēi",tr:"стакан, чашка"},
{hz:"困",py:"kùn",tr:"сонный"},
{hz:"继续",py:"jìxù",tr:"продолжать"}
],
grammar:[
{title:"又 — «снова, опять» (для прошлого/повторения)",
explanation:"又 (yòu) показывает повторение, обычно для действий которые УЖЕ произошли или происходят регулярно.\\n\\nСхема:  Подл. + 又 + Глагол (+ 了)\\n\\n昨天晚上又熬夜了吗？— Вчера опять не спал всю ночь?\\n他昨天又去图书馆了。— Он вчера снова пошёл в библиотеку.\\n\\nРазница с 再 (тоже «снова»):\\n• 又 — о прошлом/привычном («опять же»)\\n• 再 — о будущем («сделаю снова»)",
examples:[
{hz:"昨天晚上又熬夜了吗？",py:"Zuótiān wǎnshang yòu áo yè le ma?",tr:"Вчера опять не спал?"},
{hz:"他今天早上又睡懒觉了。",py:"Tā jīntiān zǎoshang yòu shuì lǎnjiào le.",tr:"Он сегодня снова заспался."},
{hz:"他昨天又去图书馆了。",py:"Tā zuótiān yòu qù túshūguǎn le.",tr:"Он вчера снова ходил в библиотеку."}
]},
{title:"了 (2) — V + 了 + количество + Объект",
explanation:"Вторая форма 了 — ставится СРАЗУ после глагола (не в конец!), когда речь о ЗАВЕРШЁННОМ действии с КОНКРЕТНЫМ количеством.\\n\\nСхема:  V + 了 + [число+сч.слово] + Объект\\n\\n我喝了半斤白酒。— Я выпил полцзиня байцзю.\\n妹妹买了一件衣服。— Сестра купила одну вещь.",
examples:[
{hz:"我喝了半斤白酒。",py:"Wǒ hē le bàn jīn báijiǔ.",tr:"Я выпил полцзиня байцзю."},
{hz:"妹妹买了一件衣服。",py:"Mèimei mǎi le yí jiàn yīfu.",tr:"Сестра купила одну вещь."},
{hz:"他们吃了十个饺子。",py:"Tāmen chī le shí ge jiǎozi.",tr:"Они съели 10 пельменей."}
]},
{title:"好像 — «кажется, похоже»",
explanation:"好像 (hǎoxiàng) — «кажется», неуверенное суждение. Ставится перед глаголом или прилагательным.\\n\\nСхема:  Подл. + 好像 + Сказуемое\\n\\n你好像还很困。— Ты, кажется, ещё очень сонный.\\n老师好像没生气。— Учитель вроде не сердится.",
examples:[
{hz:"你好像还很困。",py:"Nǐ hǎoxiàng hái hěn kùn.",tr:"Ты как будто ещё сонный."},
{hz:"老师好像没生气。",py:"Lǎoshī hǎoxiàng méi shēng qì.",tr:"Учитель вроде не сердится."},
{hz:"你的脸色不太好，昨天又熬夜了吗？",py:"Nǐ de liǎnsè bú tài hǎo, zuótiān yòu áo yè le ma?",tr:"Ты неважно выглядишь, опять не спал?"}
]}
],
dialogues:[
{title:"Почему не на парах? (古丽 и 阿曼)",lines:[
{s:"A",hz:"阿曼，你怎么还在睡觉？老师问，你怎么没去上课？",py:"Āmàn, nǐ zěnme hái zài shuì jiào? Lǎoshī wèn, nǐ zěnme méi qù shàng kè?",tr:"Аман, ты ещё спишь? Учитель спрашивал, почему тебя не было."},
{s:"B",hz:"真不好意思。老师生气了吗？",py:"Zhēn bù hǎoyìsi. Lǎoshī shēng qì le ma?",tr:"Стыдно. Учитель рассердился?"},
{s:"A",hz:"好像没生气。你的脸色不太好，昨天又熬夜了吗？",py:"Hǎoxiàng méi shēng qì. Nǐ de liǎnsè bú tài hǎo, zuótiān yòu áo yè le ma?",tr:"Вроде нет. Ты неважно выглядишь, опять всю ночь не спал?"},
{s:"B",hz:"没有。不过，我喝了半斤白酒，头很疼。",py:"Méiyǒu. Búguò, wǒ hē le bàn jīn báijiǔ, tóu hěn téng.",tr:"Нет. Но я выпил полцзиня байцзю, голова болит."},
{s:"A",hz:"半斤？你疯了？",py:"Bàn jīn? Nǐ fēng le?",tr:"Полцзиня? Ты с ума сошёл?"},
{s:"B",hz:"没醉，不过，醉了，也吐了。",py:"Méi zuì, búguò, zuì le, yě tù le.",tr:"Не опьянел. Нет, опьянел, и тошнило."},
{s:"A",hz:"你怎么喝那么多酒呢？",py:"Nǐ zěnme hē nàme duō jiǔ ne?",tr:"Зачем ты столько выпил?"},
{s:"B",hz:"昨天我去一个中国朋友家吃饭，他们太热情了，一直不停地给我倒酒。",py:"Zuótiān wǒ qù yí ge Zhōngguó péngyou jiā chī fàn, tāmen tài rèqíng le, yìzhí bù tíng de gěi wǒ dào jiǔ.",tr:"Вчера был у китайского друга, они были так радушны, постоянно подливали."},
{s:"A",hz:"有的中国人请客的时候喜欢劝酒，你不知道吗？",py:"Yǒude Zhōngguó rén qǐng kè de shíhou xǐhuan quàn jiǔ, nǐ bù zhīdào ma?",tr:"Некоторые китайцы любят уговаривать пить. Ты не знал?"},
{s:"B",hz:"现在我知道了。哎呀，我很渴，你帮我倒杯水，好吗？",py:"Xiànzài wǒ zhīdào le. Āiyā, wǒ hěn kě, nǐ bāng wǒ dào bēi shuǐ, hǎo ma?",tr:"Теперь знаю. Ой, очень хочется пить — налей воды?"},
{s:"A",hz:"好的。你好像还很困，继续睡吧！",py:"Hǎo de. Nǐ hǎoxiàng hái hěn kùn, jìxù shuì ba!",tr:"Ладно. Ты вроде сонный — поспи дальше."}
]}
],
tips:[
"斤 (jīn) — китайская мера веса = 500 г. 半斤 = 250 г. Полцзиня крепкого байцзю (40-60°) — это очень много.",
"白酒 (báijiǔ) — крепкий китайский зерновой алкоголь 40-60°. Культурный феномен. На деловых банкетах отказываться считается невежливым.",
"劝酒 (quàn jiǔ) — «уговаривать выпить». Важная часть застольной культуры. Хозяин показывает гостеприимство через настойчивые предложения ещё выпить.",
"怎么 (zěnme) в вопросе «как?» или «почему?». Контекст определяет.",
"Частица 地 (de) — после наречия/прилагательного перед глаголом: 不停地 (безостановочно). Не путать с 的 и 得."
]
},
22:{
introduction:"В этой главе вы научитесь говорить о болезнях, использовать глагол 能 («мочь, быть способным»), 最好 (лучше всего бы) и записывать даты по-китайски.\\n\\nСитуация: 阿曼 простудился после футбольного матча под дождём. 古丽 передаёт учителю записку с просьбой освободить от занятий.",
vocabulary:[
{hz:"能",py:"néng",tr:"мочь, быть в состоянии"},
{hz:"病",py:"bìng",tr:"болеть; болезнь"},
{hz:"感冒",py:"gǎnmào",tr:"простуда, простудиться"},
{hz:"头疼",py:"tóuténg",tr:"головная боль"},
{hz:"发烧",py:"fāshāo",tr:"температурить"},
{hz:"咳嗽",py:"késou",tr:"кашлять"},
{hz:"前天",py:"qiántiān",tr:"позавчера"},
{hz:"场",py:"chǎng",tr:"счётное слово для матчей/спектаклей"},
{hz:"足球",py:"zúqiú",tr:"футбол"},
{hz:"比赛",py:"bǐsài",tr:"матч, соревнование"},
{hz:"回来",py:"huílai",tr:"возвращаться"},
{hz:"带",py:"dài",tr:"брать с собой"},
{hz:"伞",py:"sǎn",tr:"зонт"},
{hz:"看病",py:"kàn bìng",tr:"идти к врачу"},
{hz:"开",py:"kāi",tr:"выписать (рецепт)"},
{hz:"打针",py:"dǎ zhēn",tr:"поставить укол"},
{hz:"最好",py:"zuìhǎo",tr:"лучше всего"},
{hz:"休息",py:"xiūxi",tr:"отдыхать"},
{hz:"请假条",py:"qǐngjiàtiáo",tr:"записка об отпуске"},
{hz:"请假",py:"qǐng jià",tr:"просить отпуск"},
{hz:"希望",py:"xīwàng",tr:"надеяться, желать"},
{hz:"批准",py:"pīzhǔn",tr:"одобрить (просьбу)"},
{hz:"月",py:"yuè",tr:"месяц"},
{hz:"日",py:"rì",tr:"число, день"}
],
grammar:[
{title:"Глагол 能 — «мочь, быть в состоянии»",
explanation:"能 (néng) указывает на ВОЗМОЖНОСТЬ/СПОСОБНОСТЬ в данный момент.\\n\\nСхема:  Подл. + 能 + Глагол + (Объект)\\n\\n阿曼今天又不能来上课了。\\n\\nРазница 能 vs 会:\\n• 会 — уметь по обучению (навык)\\n• 能 — могу физически/по обстоятельствам\\n\\nОтрицание: 不能.",
examples:[
{hz:"阿曼今天又不能来上课了。",py:"Āmàn jīntiān yòu bù néng lái shàng kè le.",tr:"Аман сегодня опять не может на занятия."},
{hz:"你有时间吗？能和我一起去吗？",py:"Nǐ yǒu shíjiān ma? Néng hé wǒ yìqǐ qù ma?",tr:"У тебя есть время? Можешь со мной пойти?"},
{hz:"他感冒了，不能来上课了。",py:"Tā gǎnmào le, bù néng lái shàng kè le.",tr:"Он простыл, не может прийти."}
]},
{title:"最好 + V — «лучше бы сделать»",
explanation:"最好 (zuìhǎo) перед глаголом выражает совет «лучше всего бы…».\\n\\nСхема:  (Подл. +) 最好 + Глагол\\n\\n医生说最好休息一天。\\n\\nМягче чем 应该 (должен).",
examples:[
{hz:"医生还说最好休息一天。",py:"Yīshēng hái shuō zuìhǎo xiūxi yì tiān.",tr:"Врач ещё сказал, что лучше отдохнуть денёк."},
{hz:"你感冒了，最好休息三天。",py:"Nǐ gǎnmào le, zuìhǎo xiūxi sān tiān.",tr:"Ты простыл, лучше отдохни 3 дня."},
{hz:"明天有考试，你最好准备准备。",py:"Míngtiān yǒu kǎoshì, nǐ zuìhǎo zhǔnbèi zhǔnbèi.",tr:"Завтра экзамен, лучше подготовься."}
]},
{title:"Даты: год + месяц + число",
explanation:"Порядок даты в китайском ОТ БОЛЬШЕГО К МЕНЬШЕМУ: год → месяц → число.\\n\\nСхема:  XXXX 年 X 月 X 日\\n\\n2012年11月15日 — 15 ноября 2012 года\\n\\nВ разговорной речи 日 часто = 号 (hào).",
examples:[
{hz:"2012年11月15日",py:"Èr líng yī èr nián shíyī yuè shíwǔ rì",tr:"15 ноября 2012"},
{hz:"今天是12月31号。",py:"Jīntiān shì shí'èr yuè sānshíyī hào.",tr:"Сегодня 31 декабря."},
{hz:"我的生日是6月28号。",py:"Wǒ de shēngrì shì liù yuè èrshíbā hào.",tr:"Мой день рождения 28 июня."}
]}
],
dialogues:[
{title:"Записка от Давэя (古丽 и 王老师)",lines:[
{s:"A",hz:"老师，阿曼今天又不能来上课了。",py:"Lǎoshī, Āmàn jīntiān yòu bù néng lái shàng kè le.",tr:"Учитель, Аман опять не придёт."},
{s:"B",hz:"是吗？他病了吗？",py:"Shì ma? Tā bìng le ma?",tr:"Правда? Заболел?"},
{s:"A",hz:"对，他感冒了。头疼，发烧，还有点儿咳嗽。",py:"Duì, tā gǎnmào le. Tóuténg, fāshāo, hái yǒudiǎnr késou.",tr:"Да. Голова болит, температура, немного кашляет."},
{s:"B",hz:"怎么感冒了？",py:"Zěnme gǎnmào le?",tr:"Как это?"},
{s:"A",hz:"前天他去看了一场足球比赛，回来的时候下雨了，他没带伞，所以感冒了。",py:"Qiántiān tā qù kàn le yì chǎng zúqiú bǐsài, huílai de shíhou xià yǔ le, tā méi dài sǎn, suǒyǐ gǎnmào le.",tr:"Позавчера был на футбольном матче, на обратном пути дождь, зонтика не было."},
{s:"B",hz:"去医院看病了吗？",py:"Qù yīyuàn kàn bìng le ma?",tr:"К врачу ходил?"},
{s:"A",hz:"去了。医生说是感冒，给他开了一点儿药，又打了一针。医生还说最好休息一天。这是他的请假条。",py:"Qù le. Yīshēng shuō shì gǎnmào, gěi tā kāi le yìdiǎnr yào, yòu dǎ le yì zhēn. Yīshēng hái shuō zuìhǎo xiūxi yì tiān. Zhè shì tā de qǐngjiàtiáo.",tr:"Да. Выписали лекарства и укол. Советовал отдохнуть. Вот его записка."},
{s:"B",hz:"好的，我知道了。谢谢！",py:"Hǎo de, wǒ zhīdào le. Xièxie!",tr:"Поняла. Спасибо!"}
]}
],
tips:[
"Записка 请假条 — стандартный формат в китайской школе. Структура: обращение → объяснение → просьба → подпись → дата.",
"发烧 / 咳嗽 / 头疼 — стандартный набор симптомов простуды. Запомни как один блок.",
"看 в разных контекстах: 看书 (читать), 看病 (к врачу), 看朋友 (навестить).",
"打针 — в Китае врачи часто сразу ставят укол при простуде. Культурная разница с западной медициной.",
"月 (yuè) — месяц: 一月, 二月... 十二月. Без 个: 三月 (не 三个月 = «3 месяца»)."
]
},
23:{
introduction:"В этой главе вы научитесь спрашивать про длительность (V + 了 + время), использовать 大概 (примерно), отличать действия внезапные от длящихся.\\n\\nСитуация: 古丽 опоздала на встречу с 王红 из-за пробки и лопнувшей шины. Позже они обсуждают сколько лет учат языки.",
vocabulary:[
{hz:"迟到",py:"chídào",tr:"опоздать"},
{hz:"堵车",py:"dǔ chē",tr:"пробка"},
{hz:"堵",py:"dǔ",tr:"затыкать, блокировать"},
{hz:"坏",py:"huài",tr:"сломаться; плохой"},
{hz:"轮胎",py:"lúntāi",tr:"шина, колесо"},
{hz:"破",py:"pò",tr:"лопнуть, порвать"},
{hz:"倒霉",py:"dǎoméi",tr:"не повезло"},
{hz:"小时",py:"xiǎoshí",tr:"час (продолжительность)"},
{hz:"平时",py:"píngshí",tr:"обычно, в обычное время"},
{hz:"钟头",py:"zhōngtóu",tr:"час"},
{hz:"着急",py:"zháojí",tr:"волноваться"},
{hz:"用",py:"yòng",tr:"использовать"},
{hz:"写",py:"xiě",tr:"писать"},
{hz:"作文",py:"zuòwén",tr:"сочинение"},
{hz:"口语",py:"kǒuyǔ",tr:"разговорный язык"},
{hz:"看",py:"kàn",tr:"с точки зрения, считать"},
{hz:"学",py:"xué",tr:"учиться"},
{hz:"初中",py:"chūzhōng",tr:"средняя школа"},
{hz:"那么",py:"nàme",tr:"так, настолько"},
{hz:"语法",py:"yǔfǎ",tr:"грамматика"},
{hz:"简单",py:"jiǎndān",tr:"простой"},
{hz:"翻译",py:"fānyì",tr:"перевод, переводить"},
{hz:"下",py:"xià",tr:"следующий"},
{hz:"学期",py:"xuéqī",tr:"семестр"}
],
grammar:[
{title:"V + 了 + длительность — «делал X уже Y времени»",
explanation:"Как спросить/сказать «как долго делал(а) что-то»?\\n\\nСхема:  V + 了 + Время\\n\\n我学了十年英语。— Я учил английский 10 лет.\\n我学汉语学了半年了。— Я учу китайский уже полгода (и продолжаю).\\n\\nВопрос: V + 了 + 多长时间？",
examples:[
{hz:"换轮胎换了多长时间？",py:"Huàn lúntāi huàn le duō cháng shíjiān?",tr:"Сколько времени менял колесо?"},
{hz:"我学了十年英语。",py:"Wǒ xué le shí nián Yīngyǔ.",tr:"Я учил английский 10 лет."},
{hz:"你学了多长时间汉语？",py:"Nǐ xué le duō cháng shíjiān Hànyǔ?",tr:"Как долго ты учишь китайский?"}
]},
{title:"大概 — «примерно, около»",
explanation:"大概 (dàgài) перед числом = «примерно».\\n\\nСхема:  大概 + число\\n\\n大概二十分钟吧。 — Минут 20.\\n\\nЧасто с 吧 в конце: «примерно… наверное».",
examples:[
{hz:"大概二十分钟吧。",py:"Dàgài èrshí fēnzhōng ba.",tr:"Минут 20 примерно."},
{hz:"大概要两百块。",py:"Dàgài yào liǎng bǎi kuài.",tr:"Стоит примерно 200 юаней."},
{hz:"大概八点到。",py:"Dàgài bā diǎn dào.",tr:"Прибуду около 8."}
]}
],
dialogues:[
{title:"Опоздание (古丽 и 王红)",lines:[
{s:"A",hz:"对不起，我迟到了。",py:"Duìbuqǐ, wǒ chídào le.",tr:"Извини, опоздала."},
{s:"B",hz:"没关系。路上堵车了吗？",py:"Méi guānxi. Lùshàng dǔ chē le ma?",tr:"Ничего. Пробка?"},
{s:"A",hz:"没有。我的自行车坏了，轮胎破了。",py:"Méiyǒu. Wǒ de zìxíngchē huài le, lúntāi pò le.",tr:"Нет. Велосипед сломался, шина лопнула."},
{s:"B",hz:"是吗？真倒霉。换轮胎换了多长时间？",py:"Shì ma? Zhēn dǎoméi. Huàn lúntāi huàn le duō cháng shíjiān?",tr:"Вот невезуха. Долго меняла?"},
{s:"A",hz:"大概换了半个小时。",py:"Dàgài huàn le bàn ge xiǎoshí.",tr:"Полчаса примерно."},
{s:"B",hz:"你等了多长时间？",py:"Nǐ děng le duō cháng shíjiān?",tr:"Долго ждала?"},
{s:"A",hz:"大概二十分钟吧。",py:"Dàgài èrshí fēnzhōng ba.",tr:"Минут 20."}
]},
{title:"Сколько учишь языки? (古丽 и 王红)",lines:[
{s:"A",hz:"你用英语写的作文真不错。你学了多长时间英语？",py:"Nǐ yòng Yīngyǔ xiě de zuòwén zhēn búcuò. Nǐ xué le duō cháng shíjiān Yīngyǔ?",tr:"Твоё английское сочинение неплохое. Как долго учишь?"},
{s:"B",hz:"我从初中开始学习，已经学了十年了。",py:"Wǒ cóng chūzhōng kāishǐ xuéxí, yǐjīng xué le shí nián le.",tr:"Со средней школы — 10 лет."},
{s:"A",hz:"十年？那么长时间？",py:"Shí nián? Nàme cháng shíjiān?",tr:"10 лет? Так долго?"},
{s:"B",hz:"是啊！你学了多长时间汉语？",py:"Shì a! Nǐ xué le duō cháng shíjiān Hànyǔ?",tr:"Да! А ты китайский сколько?"},
{s:"A",hz:"我学了半年了。",py:"Wǒ xué le bàn nián le.",tr:"Полгода."},
{s:"B",hz:"下学期你还在北京学习吗？",py:"Xià xuéqī nǐ hái zài Běijīng xuéxí ma?",tr:"В следующем семестре тоже в Пекине?"},
{s:"A",hz:"当然啦，我打算在中国学习两年呢。",py:"Dāngrán la, wǒ dǎsuàn zài Zhōngguó xuéxí liǎng nián ne.",tr:"Конечно, планирую 2 года."}
]}
],
tips:[
"小时 и 钟头 — оба «час». 小时 более формально, 钟头 разговорно. Оба с 个: 一个小时.",
"真倒霉 — «вот невезуха», популярная жалоба.",
"没事儿 (méi shìr) — «ничего, нестрашно». Ответ когда извиняются.",
"初中 (средняя школа) vs 高中 (старшая) vs 小学 (начальная). Китайская лестница: 小学 6 лет → 初中 3 → 高中 3 → 大学 4.",
"学了十年 (завершил) vs 学了十年了 (учу 10 лет и продолжаю). Второе 了 = «уже и до сих пор»."
]
},
24:{
introduction:"В этой главе вы научитесь использовать повелительные предложения («давай!»), риторический вопрос 我+V+什么 («зачем мне X?»), частицу 了 (4) для последовательности действий.\\n\\nСитуации: 张伟 и 王红 созваниваются — обсуждают обед и вечеринку в честь дня рождения 小美.",
vocabulary:[
{hz:"打",py:"dǎ",tr:"играть (в игру с руками)"},
{hz:"球",py:"qiú",tr:"мяч"},
{hz:"食堂",py:"shítáng",tr:"столовая"},
{hz:"两",py:"liǎng",tr:"лян (единица веса ~50 г)"},
{hz:"聚会",py:"jùhuì",tr:"вечеринка, собрание"},
{hz:"祝",py:"zhù",tr:"желать, поздравлять"},
{hz:"快乐",py:"kuàilè",tr:"радостный, счастливый"},
{hz:"碗",py:"wǎn",tr:"пиала, миска"},
{hz:"葡萄酒",py:"pútáojiǔ",tr:"вино (виноградное)"},
{hz:"冰激凌",py:"bīngjīlíng",tr:"мороженое"},
{hz:"女生",py:"nǚshēng",tr:"студентка, девушка"},
{hz:"卡拉OK",py:"kǎlā OK",tr:"караоке"},
{hz:"晚",py:"wǎn",tr:"поздно"},
{hz:"放心",py:"fàng xīn",tr:"не волноваться"},
{hz:"美术馆",py:"měishùguǎn",tr:"художественный музей"},
{hz:"展览",py:"zhǎnlǎn",tr:"выставка"},
{hz:"没意见",py:"méi yìjiàn",tr:"не возражаю"},
{hz:"早饭",py:"zǎofàn",tr:"завтрак"},
{hz:"找",py:"zhǎo",tr:"искать"},
{hz:"门口",py:"ménkǒu",tr:"у двери, у входа"},
{hz:"见面",py:"jiàn miàn",tr:"встречаться"},
{hz:"上网",py:"shàng wǎng",tr:"выходить в интернет"},
{hz:"聊天儿",py:"liáo tiānr",tr:"болтать"}
],
grammar:[
{title:"Повелительные предложения",
explanation:"Команды, просьбы, советы. Подлежащее обычно 你/你们/咱们.\\n\\n(1) Утверждение + (吧):\\n你放心吧！\\n我们一起去吧！\\n\\n(2) Отрицание через 不要 или 别:\\n别太晚了。\\n不要睡懒觉。",
examples:[
{hz:"你放心吧！",py:"Nǐ fàng xīn ba!",tr:"Не волнуйся!"},
{hz:"我们一起去吧！",py:"Wǒmen yìqǐ qù ba!",tr:"Пойдём вместе!"},
{hz:"别太晚了。",py:"Bié tài wǎn le.",tr:"Не опаздывай."}
]},
{title:"了 (4) — последовательность действий (V1+了, потом V2)",
explanation:"Четвёртое значение 了 — между двумя глаголами. Первое ЗАКОНЧИЛОСЬ, потом второе.\\n\\nСхема:  V1 + 了 + O1 + V2 + O2\\n\\n你吃了早饭来找我。\\n«Поешь завтрак и приходи.»",
examples:[
{hz:"你吃了早饭来找我。",py:"Nǐ chī le zǎofàn lái zhǎo wǒ.",tr:"Поешь и приходи."},
{hz:"我去了咖啡店上课。",py:"Wǒ qù le kāfēidiàn shàng kè.",tr:"Зайду в кофейню — потом на пары."},
{hz:"我换了钱去买东西。",py:"Wǒ huàn le qián qù mǎi dōngxi.",tr:"Обменяю деньги — потом за покупками."}
]},
{title:"Порядок: Подл. + Время + Место + Глагол",
explanation:"Когда есть и ВРЕМЯ, и МЕСТО — оба ПЕРЕД глаголом: сначала время, потом место.\\n\\nСхема:  Подл. + Время + 在+Место + Глагол + Объект\\n\\n我们明天八点半在你们宿舍门口见面。",
examples:[
{hz:"我们明天八点半在你们宿舍门口见面。",py:"Wǒmen míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn.",tr:"Встретимся завтра в 8:30 у общежития."},
{hz:"今天下课以后我在图书馆学习。",py:"Jīntiān xià kè yǐhòu wǒ zài túshūguǎn xuéxí.",tr:"После пар я в библиотеке позанимаюсь."},
{hz:"他每天早上在家喝咖啡。",py:"Tā měi tiān zǎoshang zài jiā hē kāfēi.",tr:"Он каждое утро дома пьёт кофе."}
]}
],
dialogues:[
{title:"День рождения подруги (张伟 и 王红 по телефону)",lines:[
{s:"A",hz:"喂，王红，是我。",py:"Wèi, Wáng Hóng, shì wǒ.",tr:"Алло, Ван Хун, это я."},
{s:"B",hz:"张伟，你吃饭了吗？",py:"Zhāng Wěi, nǐ chī fàn le ma?",tr:"Чжан Вэй, ты ел?"},
{s:"A",hz:"还没呢。刚打球回来，我想去食堂吃几两饺子，你去吗？",py:"Hái méi ne. Gāng dǎ qiú huílai, wǒ xiǎng qù shítáng chī jǐ liǎng jiǎozi, nǐ qù ma?",tr:"Ещё нет. Только с мяча, хочу в столовую — пойдёшь?"},
{s:"B",hz:"不去了。今天是小美二十三岁生日，我们宿舍聚会。",py:"Bú qù le. Jīntiān shì Xiǎoměi èrshísān suì shēngrì, wǒmen sùshè jùhuì.",tr:"Не пойду. У Сяомэй 23-летие — у нас вечеринка."},
{s:"A",hz:"是吗？那祝她生日快乐。",py:"Shì ma? Nà zhù tā shēngrì kuàilè.",tr:"Передай поздравления."},
{s:"B",hz:"我们打算一起去唱卡拉OK。",py:"Wǒmen dǎsuàn yìqǐ qù chàng kǎlā OK.",tr:"Хотим в караоке."},
{s:"A",hz:"好好儿玩儿，早一点儿回来，别太晚了。",py:"Hǎohāor wánr, zǎo yìdiǎnr huílai, bié tài wǎn le.",tr:"Повеселитесь, возвращайтесь пораньше."},
{s:"B",hz:"放心吧！对了，明天又是周末了，我们去哪儿玩儿？",py:"Fàng xīn ba! Duì le, míngtiān yòu shì zhōumò le, wǒmen qù nǎr wánr?",tr:"Не волнуйся! Кстати, завтра выходной — куда?"},
{s:"A",hz:"听说美术馆的展览很不错。好，明天八点半在你们宿舍门口见面，行吗？",py:"Tīngshuō měishùguǎn de zhǎnlǎn hěn búcuò. Hǎo, míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn, xíng ma?",tr:"Слышал, в музее хорошая выставка. Встречаемся в 8:30?"},
{s:"B",hz:"行。你吃了早饭来找我，好吗？",py:"Xíng. Nǐ chī le zǎofàn lái zhǎo wǒ, hǎo ma?",tr:"Идёт. Поешь позавтракай и заходи."}
]}
],
tips:[
"几两饺子 — «пельменей на несколько лянов». 两 (liǎng) ≈ 50 г. В столовых пельмени часто по весу.",
"祝…生日快乐 — стандартное «с днём рождения!». Также 祝 + 新年快乐 (с Новым годом).",
"放心吧！— тёплое «не волнуйся».",
"上网 и 聊天儿 — «зайти в интернет» и «болтать». Современная разговорная лексика.",
"没意见 — «согласен» (дословно «нет мнения»). Мягкое согласие."
]
},
25:{
introduction:"Итоговая глава Unit 5. Вы повторите все модальные глаголы (会/能/要/得) и познакомитесь с 别 + V + 了 («хватит делать»).\\n\\nСитуация: 中村 записался в секцию тайцзи и рано встаёт. 古丽 решает присоединиться — побегать и подвигаться.",
vocabulary:[
{hz:"晚安",py:"wǎn'ān",tr:"спокойной ночи"},
{hz:"这么",py:"zhème",tr:"так, настолько"},
{hz:"电视剧",py:"diànshìjù",tr:"сериал, ТВ-шоу"},
{hz:"太极拳",py:"tàijíquán",tr:"тайцзицюань"},
{hz:"参加",py:"cānjiā",tr:"участвовать"},
{hz:"班",py:"bān",tr:"класс, группа, секция"},
{hz:"报名",py:"bào míng",tr:"записаться"},
{hz:"忘",py:"wàng",tr:"забыть"},
{hz:"重新",py:"chóngxīn",tr:"заново, снова"},
{hz:"闹钟",py:"nàozhōng",tr:"будильник"},
{hz:"空气",py:"kōngqì",tr:"воздух"},
{hz:"新鲜",py:"xīnxiān",tr:"свежий"},
{hz:"湖",py:"hú",tr:"озеро"},
{hz:"跑步",py:"pǎo bù",tr:"бегать, бег"},
{hz:"劲儿",py:"jìnr",tr:"сила, мощь"},
{hz:"出",py:"chū",tr:"выходить наружу"},
{hz:"汗",py:"hàn",tr:"пот"},
{hz:"锻炼",py:"duànliàn",tr:"заниматься спортом"},
{hz:"棒",py:"bàng",tr:"превосходный, крутой"},
{hz:"跑",py:"pǎo",tr:"бежать"},
{hz:"散步",py:"sàn bù",tr:"прогуливаться"}
],
grammar:[
{title:"Модальные глаголы — обзор",
explanation:"Систематизация модальных глаголов (能愿动词):\\n\\n1) 会 — УМЕТЬ (навык)\\n2) 可以 — МОЖНО (разрешение)\\n3) 能 — МОЧЬ (физически/обстоятельства)\\n4) 要 — ХОЧУ/СОБИРАЮСЬ\\n5) 得 — ДОЛЖЕН (обязанность)\\n\\nВсе ставятся перед основным глаголом. Отрицание: 不会, 不可以, 不能, 不要, 不用.",
examples:[
{hz:"我会打太极拳。",py:"Wǒ huì dǎ tàijíquán.",tr:"Умею тайцзи."},
{hz:"我要去跑步，你去吗？",py:"Wǒ yào qù pǎo bù, nǐ qù ma?",tr:"Хочу побегать, пойдёшь?"},
{hz:"明天早上有课，我得早一点儿起床。",py:"Míngtiān zǎoshang yǒu kè, wǒ děi zǎo yìdiǎnr qǐ chuáng.",tr:"Завтра пары, надо рано вставать."}
]},
{title:"别 + V + 了 — «перестань, хватит»",
explanation:"别 + V = «не делай» (Глава 20). С 了 в конце = «прекрати текущее действие».\\n\\n• 别说 — не говори (вообще)\\n• 别说了 — хватит говорить (сейчас)",
examples:[
{hz:"你也别看书了，早一点儿睡吧！",py:"Nǐ yě bié kàn shū le, zǎo yìdiǎnr shuì ba!",tr:"Хватит читать, ложись пораньше!"},
{hz:"别吃了，已经太晚了。",py:"Bié chī le, yǐjīng tài wǎn le.",tr:"Хватит есть, уже поздно."},
{hz:"别说了！",py:"Bié shuō le!",tr:"Хватит говорить!"}
]},
{title:"得 + 多 + V-V — «надо побольше делать X»",
explanation:"Формула совета «надо побольше что-то делать».\\n\\nСхема:  (Подл.) 得 + 多 + V-V (+ 了)\\n\\n你得多锻炼锻炼了。— Тебе надо побольше тренироваться.",
examples:[
{hz:"你得多锻炼锻炼了。",py:"Nǐ děi duō duànliàn duànliàn le.",tr:"Тебе пора побольше тренироваться!"},
{hz:"你得多学习学习汉语。",py:"Nǐ děi duō xuéxí xuéxí Hànyǔ.",tr:"Надо тебе побольше учить китайский."}
]}
],
dialogues:[
{title:"Запись на тайцзи (中村 и 古丽)",lines:[
{s:"A",hz:"晚安，中村。",py:"Wǎn'ān, Zhōngcūn.",tr:"Спокойной ночи."},
{s:"B",hz:"你怎么这么早就睡觉？",py:"Nǐ zěnme zhème zǎo jiù shuì jiào?",tr:"Что так рано ложишься?"},
{s:"A",hz:"明天早上有太极拳课，我要早一点儿起床。",py:"Míngtiān zǎoshang yǒu tàijíquán kè, wǒ yào zǎo yìdiǎnr qǐ chuáng.",tr:"Завтра тайцзи, надо рано встать."},
{s:"B",hz:"你也参加太极拳班了？太好了，我也报名了。",py:"Nǐ yě cānjiā tàijíquán bān le? Tài hǎo le, wǒ yě bào míng le.",tr:"Тоже записался? Отлично, я тоже!"},
{s:"A",hz:"那明天我们一起开始吧！",py:"Nà míngtiān wǒmen yìqǐ kāishǐ ba!",tr:"Давай завтра вместе!"},
{s:"B",hz:"我有闹钟，没问题。",py:"Wǒ yǒu nàozhōng, méi wèntí.",tr:"У меня будильник, без проблем."},
{s:"A",hz:"你也别看书了，早一点儿睡吧！",py:"Nǐ yě bié kàn shū le, zǎo yìdiǎnr shuì ba!",tr:"Хватит читать, ложись!"}
]},
{title:"На утренней пробежке (中村 и 古丽)",lines:[
{s:"A",hz:"早上的空气真新鲜。",py:"Zǎoshang de kōngqì zhēn xīnxiān.",tr:"Воздух свежий."},
{s:"B",hz:"我还要去湖边跑步，你去吗？",py:"Wǒ hái yào qù hú biān pǎo bù, nǐ qù ma?",tr:"Я пробегусь у озера, пойдёшь?"},
{s:"A",hz:"不去了。打了一个小时太极拳，有点儿累，没劲儿了。",py:"Bú qù le. Dǎ le yí ge xiǎoshí tàijíquán, yǒudiǎnr lèi, méi jìnr le.",tr:"Нет. Час тайцзи, устал."},
{s:"B",hz:"你出了很多汗。看起来，你得多锻炼锻炼了。",py:"Nǐ chū le hěn duō hàn. Kàn qǐlai, nǐ děi duō duànliàn duànliàn le.",tr:"Ты весь потный. Надо больше тренироваться."}
]}
],
tips:[
"太极拳 — китайская боевая гимнастика. Очень популярна у пожилых в парках с утра.",
"跑 vs 跑步: 跑 — «бежать». 跑步 — «бегать для упражнения».",
"劲儿 (jìnr) — «сила». 没劲儿 = «нет сил». Очень разговорное, пекинское с -r.",
"身体真棒 — «форма отличная». 棒 (bàng) = «превосходный».",
"闹钟 — будильник. 闹 = шумно, 钟 = часы."
]
},
26:{
introduction:"В этой главе вы научитесь говорить о будущих событиях с помощью 快……了 / 要……了 («скоро X»), использовать 只好 («ничего не остаётся кроме как») и 可能 («возможно»).\\n\\nСитуация: приближаются экзамены. 古丽 зубрит в библиотеке, 阿曼 планирует поездку на каникулах. 中村 пишет рождественские открытки.",
vocabulary:[
{hz:"接",py:"jiē",tr:"отвечать на звонок"},
{hz:"电",py:"diàn",tr:"электричество"},
{hz:"用功",py:"yònggōng",tr:"усердный"},
{hz:"快",py:"kuài",tr:"скоро"},
{hz:"基础",py:"jīchǔ",tr:"основа"},
{hz:"只好",py:"zhǐhǎo",tr:"приходится, остаётся только"},
{hz:"努力",py:"nǔlì",tr:"стараться, упорно"},
{hz:"快要",py:"kuàiyào",tr:"скоро, вот-вот"},
{hz:"放假",py:"fàng jià",tr:"начаться каникулам"},
{hz:"假期",py:"jiàqī",tr:"каникулы"},
{hz:"旅行",py:"lǚxíng",tr:"путешествовать"},
{hz:"决定",py:"juédìng",tr:"решить"},
{hz:"可能",py:"kěnéng",tr:"возможно"},
{hz:"出发",py:"chūfā",tr:"отправляться"},
{hz:"考虑",py:"kǎolǜ",tr:"обдумать"},
{hz:"明信片",py:"míngxìnpiàn",tr:"открытка"},
{hz:"圣诞节",py:"Shèngdàn Jié",tr:"Рождество"},
{hz:"新年",py:"xīnnián",tr:"Новый год"},
{hz:"寄",py:"jì",tr:"отправлять почтой"},
{hz:"贺卡",py:"hèkǎ",tr:"поздравительная открытка"},
{hz:"办法",py:"bànfǎ",tr:"способ"},
{hz:"亲戚",py:"qīnqi",tr:"родственник"},
{hz:"整整",py:"zhěngzhěng",tr:"ровно, целый"},
{hz:"邮局",py:"yóujú",tr:"почта"},
{hz:"再",py:"zài",tr:"затем, потом"},
{hz:"刚才",py:"gāngcái",tr:"только что"},
{hz:"邮票",py:"yóupiào",tr:"марка"},
{hz:"排队",py:"pái duì",tr:"стоять в очереди"},
{hz:"东北",py:"Dōngběi",tr:"Северо-Восток Китая"}
],
grammar:[
{title:"快……了 / 要……了 — «скоро, вот-вот»",
explanation:"Конструкции «скоро произойдёт».\\n\\n• 快 + V/Прил. + 了\\n• 要 + V/Прил. + 了\\n• 快要 + V/Прил. + 了\\n\\n快考试了。— Скоро экзамен.\\n快要放假了。— Вот-вот каникулы.\\n\\nДля событий в БЛИЗКОМ будущем. 了 обязательно.",
examples:[
{hz:"快考试了。",py:"Kuài kǎoshì le.",tr:"Скоро экзамен."},
{hz:"快要放假了。",py:"Kuàiyào fàng jià le.",tr:"Вот-вот каникулы."},
{hz:"新年要来了。",py:"Xīnnián yào lái le.",tr:"Новый год приближается."}
]},
{title:"只好 — «остаётся только»",
explanation:"只好 (zhǐhǎo) — «приходится, остаётся только». Нет лучшего варианта.\\n\\n我基础不好，只好努力学习了。\\n«Базы нет — придётся упорно учиться.»",
examples:[
{hz:"快考试了，我基础不好，只好努力学习了。",py:"Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le.",tr:"Скоро экзамен, придётся упорно учиться."},
{hz:"下雨了，不能出去玩儿，只好在家里看电视。",py:"Xià yǔ le, bù néng chū qù wánr, zhǐhǎo zài jiā li kàn diànshì.",tr:"Дождь — остаётся телик смотреть."},
{hz:"没有饺子了，只好吃面条儿吧。",py:"Méiyǒu jiǎozi le, zhǐhǎo chī miàntiáor ba.",tr:"Пельменей нет — придётся есть лапшу."}
]},
{title:"可能 — «возможно»",
explanation:"可能 (kěnéng) — «возможно, может быть». Перед глаголом.\\n\\n可能去东北。— Возможно, на северо-восток.\\n\\n• 可能 — мягче «может быть»\\n• 会 — более уверенно «скорее всего»",
examples:[
{hz:"还没决定，可能去东北。",py:"Hái méi juédìng, kěnéng qù Dōngběi.",tr:"Ещё не решил, может на северо-восток."},
{hz:"我们可能下个周末去。",py:"Wǒmen kěnéng xià ge zhōumò qù.",tr:"Возможно, в следующие выходные."},
{hz:"他可能生病了。",py:"Tā kěnéng shēng bìng le.",tr:"Он, возможно, заболел."}
]}
],
dialogues:[
{title:"Подготовка к экзаменам (阿曼 и 古丽)",lines:[
{s:"A",hz:"今天你去哪儿了？我打你的手机，可是你没接。",py:"Jīntiān nǐ qù nǎr le? Wǒ dǎ nǐ de shǒujī, kěshì nǐ méi jiē.",tr:"Где ты была? Звонил, не ответила."},
{s:"B",hz:"不好意思，手机没电了。我去图书馆了。",py:"Bù hǎoyìsi, shǒujī méi diàn le. Wǒ qù túshūguǎn le.",tr:"Батарея села. Была в библиотеке."},
{s:"A",hz:"你真用功！",py:"Nǐ zhēn yònggōng!",tr:"Трудяга!"},
{s:"B",hz:"快考试了，我基础不好，只好努力学习了。",py:"Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le.",tr:"Скоро экзамен, базы нет — приходится."},
{s:"A",hz:"快要放假了，我们打算假期去旅行，你想和我们一起去吗？",py:"Kuàiyào fàng jià le, wǒmen dǎsuàn jiàqī qù lǚxíng, nǐ xiǎng hé wǒmen yìqǐ qù ma?",tr:"Скоро каникулы, мы поедем в путешествие — с нами?"},
{s:"B",hz:"你们打算去哪儿？",py:"Nǐmen dǎsuàn qù nǎr?",tr:"Куда?"},
{s:"A",hz:"还没决定，可能去东北。可能下个周末出发。",py:"Hái méi juédìng, kěnéng qù Dōngběi. Kěnéng xià ge zhōumò chūfā.",tr:"Ещё не решили, может на северо-восток. Может в следующие выходные."},
{s:"B",hz:"好，我考虑考虑。",py:"Hǎo, wǒ kǎolǜ kǎolǜ.",tr:"Подумаю."}
]},
{title:"Открытки на Рождество (古丽 и 中村)",lines:[
{s:"A",hz:"中村，你在干什么呢？",py:"Zhōngcūn, nǐ zài gàn shénme ne?",tr:"Накамура, что делаешь?"},
{s:"B",hz:"给朋友写明信片呢。圣诞节快到了，新年也要来了，得写给朋友们贺卡了。",py:"Gěi péngyou xiě míngxìnpiàn ne. Shèngdàn Jié kuài dào le, xīnnián yě yào lái le, děi xiě gěi péngyoumen hèkǎ le.",tr:"Пишу открытки. Скоро Рождество и Новый год."},
{s:"A",hz:"写了那么多呀！",py:"Xiě le nàme duō ya!",tr:"Так много!"},
{s:"B",hz:"没办法，亲戚朋友多，我整整写了一个小时呢。",py:"Méi bànfǎ, qīnqi péngyou duō, wǒ zhěngzhěng xiě le yí ge xiǎoshí ne.",tr:"Ничего не поделаешь, целый час писал."},
{s:"A",hz:"现在邮局人很多，你一会儿再去寄吧。",py:"Xiànzài yóujú rén hěn duō, nǐ yíhuìr zài qù jì ba.",tr:"На почте толпа, сходи позже."}
]}
],
tips:[
"快……了 ≠ «быстро». В этой конструкции 快 = «скоро».",
"没电了 — «батарея села». Дословно «нет электричества».",
"圣诞节 — Рождество. В Китае не традиционный, но популярный в городах праздник.",
"用功 — «усердный». Похвала студенту.",
"排队 — «стоять в очереди». 排 = выстраивать, 队 = ряд."
]
},
27:{
introduction:"В этой главе вы научитесь использовать 极了 (крайняя степень), разницу 想 и 要, счётные слова для действий (趟, 次) и говорить о планах на каникулы.\\n\\nСитуация: 张伟 остаётся готовиться к магистратуре по древней истории, 阿曼 едет в Харбин. Обсуждают планы и возвращение домой на Новый год.",
vocabulary:[
{hz:"计划",py:"jìhuà",tr:"план"},
{hz:"待",py:"dāi",tr:"оставаться"},
{hz:"地方",py:"dìfang",tr:"место"},
{hz:"风景",py:"fēngjǐng",tr:"пейзаж"},
{hz:"美",py:"měi",tr:"красивый"},
{hz:"极了",py:"jí le",tr:"крайне, чрезвычайно"},
{hz:"复习",py:"fùxí",tr:"повторять"},
{hz:"功课",py:"gōngkè",tr:"уроки"},
{hz:"毕业",py:"bì yè",tr:"выпускаться"},
{hz:"抓紧",py:"zhuājǐn",tr:"ухватиться, использовать"},
{hz:"方面",py:"fāngmiàn",tr:"сторона, аспект"},
{hz:"古代",py:"gǔdài",tr:"древность"},
{hz:"历史",py:"lìshǐ",tr:"история"},
{hz:"感兴趣",py:"gǎn xìngqù",tr:"интересоваться"},
{hz:"教授",py:"jiàoshòu",tr:"профессор"},
{hz:"一定",py:"yídìng",tr:"обязательно"},
{hz:"考上",py:"kǎoshang",tr:"поступить"},
{hz:"考",py:"kǎo",tr:"сдавать экзамен"},
{hz:"春节",py:"Chūn Jié",tr:"Праздник Весны"},
{hz:"让",py:"ràng",tr:"просить (кого-то сделать)"},
{hz:"问题",py:"wèntí",tr:"вопрос"},
{hz:"应该",py:"yīnggāi",tr:"должен, следует"},
{hz:"想念",py:"xiǎngniàn",tr:"скучать"},
{hz:"趟",py:"tàng",tr:"счётное слово для поездок"},
{hz:"哈尔滨",py:"Hā'ěrbīn",tr:"Харбин"}
],
grammar:[
{title:"Прил. + 极了 — «крайне X»",
explanation:"极了 после прилагательного = «до крайности».\\n\\n风景美极了。— Пейзаж красивейший.\\n好极了！— Превосходно!\\n\\nСтепени: 很 → 挺……的 → 太……了 → 极了 (литературнее, сильнее).",
examples:[
{hz:"哈尔滨冬天的风景美极了。",py:"Hā'ěrbīn dōngtiān de fēngjǐng měi jí le.",tr:"Харбин зимой — красотища."},
{hz:"那儿的风景漂亮极了。",py:"Nàr de fēngjǐng piàoliang jí le.",tr:"Там пейзажи — красота."},
{hz:"他的汉语好极了。",py:"Tā de Hànyǔ hǎo jí le.",tr:"Китайский у него отличный."}
]},
{title:"想 vs 要 — оба «хочу»",
explanation:"• 想 — мечта, желание\\n• 要 — сильное намерение, скоро действие\\n\\nОтрицание:\\n• 不想 — не хочется\\n• 不要 — НЕ «не хочу»! Значит «не делай!» (запрет)\\n\\nДля «не хочу» ВСЕГДА 不想.",
examples:[
{hz:"我想去别的地方看看。",py:"Wǒ xiǎng qù bié de dìfang kànkan.",tr:"Хочу посмотреть другие места."},
{hz:"我要考研究生。",py:"Wǒ yào kǎo yánjiūshēng.",tr:"Буду сдавать в магистратуру."},
{hz:"我不想考研究生。",py:"Wǒ bù xiǎng kǎo yánjiūshēng.",tr:"Не хочу сдавать в магистратуру."}
]},
{title:"Счётные слова для действий: 趟 / 次 / 遍 / 下",
explanation:"• 趟 — поездка, раз (о походе куда-то): 回家一趟\\n• 次 — раз (общий счёт): 去过三次\\n• 遍 — полный раз (до конца): 看了一遍\\n• 下 — мимолётный: 看一下",
examples:[
{hz:"我得安排时间回家一趟。",py:"Wǒ děi ānpái shíjiān huí jiā yí tàng.",tr:"Надо съездить домой."},
{hz:"我去过三次北京。",py:"Wǒ qù guo sān cì Běijīng.",tr:"Был в Пекине 3 раза."},
{hz:"这本书我看了两遍。",py:"Zhè běn shū wǒ kàn le liǎng biàn.",tr:"Эту книгу я прочёл 2 раза."}
]},
{title:"让 — «просить кого-то сделать X»",
explanation:"让 (ràng) — «просить/велеть/позволять».\\n\\nСхема:  Подл. + 让 + Кто + Глагол\\n\\n爸爸妈妈让我回家。\\n«Родители просят меня приехать.»",
examples:[
{hz:"爸爸妈妈让我回家。",py:"Bàba māma ràng wǒ huí jiā.",tr:"Родители зовут домой."},
{hz:"老师让我们做作业。",py:"Lǎoshī ràng wǒmen zuò zuòyè.",tr:"Учитель задал домашку."},
{hz:"医生让我休息一天。",py:"Yīshēng ràng wǒ xiūxi yì tiān.",tr:"Врач велел отдохнуть."}
]}
],
dialogues:[
{title:"Планы на каникулы (张伟 и 阿曼)",lines:[
{s:"A",hz:"快放假了，你有什么计划？",py:"Kuài fàng jià le, nǐ yǒu shénme jìhuà?",tr:"Скоро каникулы, какие планы?"},
{s:"B",hz:"我打算去旅行。来中国快半年了，我一直待在北京，想去别的地方看看。",py:"Wǒ dǎsuàn qù lǚxíng. Lái Zhōngguó kuài bàn nián le, wǒ yìzhí dāi zài Běijīng, xiǎng qù bié de dìfang kànkan.",tr:"В путешествие. Полгода в Китае, всё в Пекине — хочу и другое."},
{s:"A",hz:"你打算去哪儿旅行？",py:"Nǐ dǎsuàn qù nǎr lǚxíng?",tr:"Куда?"},
{s:"B",hz:"还没决定。我的朋友想去哈尔滨。不过听说哈尔滨冬天的风景美极了。你假期怎么过？",py:"Hái méi juédìng. Wǒ de péngyou xiǎng qù Hā'ěrbīn. Búguò tīngshuō Hā'ěrbīn dōngtiān de fēngjǐng měi jí le. Nǐ jiàqī zěnme guò?",tr:"Не решил. Друг хочет в Харбин — там зимой красотища. А ты как?"},
{s:"A",hz:"我打算在学校复习功课。快要毕业了，我要考研究生。",py:"Wǒ dǎsuàn zài xuéxiào fùxí gōngkè. Kuàiyào bì yè le, wǒ yào kǎo yánjiūshēng.",tr:"Останусь повторять материал. Скоро выпуск, буду сдавать в магистратуру."},
{s:"B",hz:"你打算考哪个方面的研究生？",py:"Nǐ dǎsuàn kǎo nǎge fāngmiàn de yánjiūshēng?",tr:"В какую специальность?"},
{s:"A",hz:"我对中国古代历史很感兴趣。",py:"Wǒ duì Zhōngguó gǔdài lìshǐ hěn gǎn xìngqù.",tr:"Мне интересна древняя история."},
{s:"B",hz:"你一定能考上。那你春节不回家了？",py:"Nǐ yídìng néng kǎoshang. Nà nǐ Chūn Jié bù huí jiā le?",tr:"Наверняка поступишь. А на Новый год домой?"},
{s:"A",hz:"大概要回家几天，爸爸妈妈也让我回家。",py:"Dàgài yào huí jiā jǐ tiān, bàba māma yě ràng wǒ huí jiā.",tr:"Пару дней, родители просят."},
{s:"B",hz:"回家看看也是应该的，你爸妈一定很想念你。",py:"Huí jiā kànkan yě shì yīnggāi de, nǐ bàmā yídìng hěn xiǎngniàn nǐ.",tr:"Родители скучают."},
{s:"A",hz:"是啊，我得安排时间回家一趟。",py:"Shì a, wǒ děi ānpái shíjiān huí jiā yí tàng.",tr:"Да, надо найти время."}
]}
],
tips:[
"春节 — Китайский Новый год. Самый важный праздник. По лунному календарю, обычно в феврале.",
"考上 — «поступить» (успешно сдав). 考 + 上 (результат).",
"对X感兴趣 — «интересоваться X». Устойчивая формула.",
"想念 — «скучать». Часто сокращается до 想: 我想你.",
"哈尔滨 — столица Хэйлунцзяна, самый северный крупный город. Знаменит Ледовым фестивалем."
]
},
28:{
introduction:"В этой главе вы научитесь оценивать как выполнено действие (V+得+прил.), различать 都 как «все» и «уже», использовать 也许 («может быть»), 为什么 («почему») и 够 («достаточно»).\\n\\nСитуация: 古丽 и 王红 обсуждают экзамены. 古丽 расстроена — времени не хватило.",
vocabulary:[
{hz:"星期",py:"xīngqī",tr:"неделя"},
{hz:"门",py:"mén",tr:"счётное слово для курсов"},
{hz:"完",py:"wán",tr:"закончить"},
{hz:"有些",py:"yǒuxiē",tr:"некоторые"},
{hz:"报告",py:"bàogào",tr:"доклад"},
{hz:"得",py:"de",tr:"структурная частица (оценка)"},
{hz:"放松",py:"fàngsōng",tr:"расслабиться"},
{hz:"紧张",py:"jǐnzhāng",tr:"напряжённый, нервный"},
{hz:"效果",py:"xiàoguǒ",tr:"эффект, результат"},
{hz:"呀",py:"ya",tr:"модальная частица"},
{hz:"道",py:"dào",tr:"счётное слово для заданий"},
{hz:"题",py:"tí",tr:"задание, вопрос"},
{hz:"为什么",py:"wèi shénme",tr:"почему"},
{hz:"够",py:"gòu",tr:"хватать, достаточно"},
{hz:"阅读",py:"yuèdú",tr:"читать"},
{hz:"汉字",py:"Hànzì",tr:"иероглифы"},
{hz:"难",py:"nán",tr:"трудный"},
{hz:"慢",py:"màn",tr:"медленный"},
{hz:"确实",py:"quèshí",tr:"действительно"},
{hz:"记",py:"jì",tr:"запоминать"},
{hz:"方法",py:"fāngfǎ",tr:"способ"},
{hz:"编",py:"biān",tr:"составлять"},
{hz:"故事",py:"gùshi",tr:"история"},
{hz:"也许",py:"yěxǔ",tr:"возможно"},
{hz:"帮助",py:"bāngzhù",tr:"помощь, помогать"},
{hz:"担心",py:"dān xīn",tr:"волноваться"},
{hz:"解决",py:"jiějué",tr:"решать (задачу)"}
],
grammar:[
{title:"V + 得 + Прил. — «делать X каким образом»",
explanation:"Как сказать «бежит быстро», «пишет медленно»? Через 得 (de) после глагола.\\n\\nСхема:  V + 得 + Прил.\\n\\n写得很慢。— Пишу медленно.\\n考得怎么样？— Как сдал?\\n\\nЕсли есть объект — глагол ПОВТОРЯЕТСЯ:\\nV + O + V + 得 + Прил.\\n我写汉字写得很慢。",
examples:[
{hz:"考试考得怎么样？",py:"Kǎoshì kǎo de zěnmeyàng?",tr:"Как сдал экзамен?"},
{hz:"我看汉字看得很慢。",py:"Wǒ kàn Hànzì kàn de hěn màn.",tr:"Читаю иероглифы медленно."},
{hz:"他跑步跑得很快。",py:"Tā pǎo bù pǎo de hěn kuài.",tr:"Он быстро бегает."}
]},
{title:"都 — «все» vs «уже»",
explanation:"1) «ВСЕ» (после перечисления):\\n我的朋友都来了。\\n\\n2) «УЖЕ» (перед временем, с удивлением):\\n都八点半了，你怎么还不起床？\\n«Уже 8:30, что ж ты не встаёшь?»",
examples:[
{hz:"我的朋友都来了。",py:"Wǒ de péngyou dōu lái le.",tr:"Все друзья пришли."},
{hz:"都八点半了，你怎么还不起床？",py:"Dōu bā diǎn bàn le, nǐ zěnme hái bù qǐ chuáng?",tr:"Уже 8:30, почему не встаёшь?"}
]},
{title:"为什么 — «почему?»",
explanation:"为什么 (wèi shénme) — «почему?». Ответ часто через 因为.",
examples:[
{hz:"你为什么没做？",py:"Nǐ wèi shénme méi zuò?",tr:"Почему не сделал?"},
{hz:"因为时间不够了。",py:"Yīnwèi shíjiān bú gòu le.",tr:"Потому что времени не хватило."}
]},
{title:"也许 — «возможно» (синоним 可能)",
explanation:"也许 (yěxǔ) = «быть может», мягче 可能.\\n\\n借给我看吧，也许会有帮助。",
examples:[
{hz:"借给我看吧，也许会有帮助。",py:"Jiè gěi wǒ kàn ba, yěxǔ huì yǒu bāngzhù.",tr:"Дай посмотреть — может поможет."},
{hz:"他也许不来了。",py:"Tā yěxǔ bù lái le.",tr:"Он, возможно, не придёт."}
]}
],
dialogues:[
{title:"Про экзамены (古丽 и 王红)",lines:[
{s:"A",hz:"王红，你们什么时候开始考试？",py:"Wáng Hóng, nǐmen shénme shíhou kāishǐ kǎoshì?",tr:"Когда у вас экзамены?"},
{s:"B",hz:"已经开始了。上个星期考了两门，这个星期还有一门就完了。",py:"Yǐjīng kāishǐ le. Shàng ge xīngqī kǎo le liǎng mén, zhège xīngqī hái yǒu yì mén jiù wán le.",tr:"Уже начались. 2 сдала, ещё один."},
{s:"A",hz:"明天开始。太紧张的话，学习效果也不好。",py:"Míngtiān kāishǐ. Tài jǐnzhāng dehuà, xuéxí xiàoguǒ yě bù hǎo.",tr:"Завтра начинаются. Когда слишком нервный — толку мало."}
]},
{title:"Как сдал? (王红 и 古丽)",lines:[
{s:"A",hz:"古丽，考试考得怎么样？",py:"Gǔlì, kǎoshì kǎo de zěnmeyàng?",tr:"Как сдала?"},
{s:"B",hz:"不太好，有两个生词忘了怎么写，还有一道题没有做。",py:"Bú tài hǎo, yǒu liǎng ge shēngcí wàng le zěnme xiě, hái yǒu yí dào tí méiyǒu zuò.",tr:"Не очень, забыла 2 слова, один вопрос не успела."},
{s:"A",hz:"为什么？",py:"Wèi shénme?",tr:"Почему?"},
{s:"B",hz:"时间不够了。汉字太难了！我看汉字看得很慢，写汉字也写得很慢。",py:"Shíjiān bú gòu le. Hànzì tài nán le! Wǒ kàn Hànzì kàn de hěn màn, xiě Hànzì yě xiě de hěn màn.",tr:"Времени не хватило. Иероглифы сложные! Читаю медленно, пишу медленно."},
{s:"A",hz:"对欧美人来说，汉字确实有点儿难。",py:"Duì Ōu-Měi rén lái shuō, Hànzì quèshí yǒudiǎnr nán.",tr:"Для европейцев иероглифы сложные."},
{s:"B",hz:"你有什么记汉字的好方法吗？",py:"Nǐ yǒu shénme jì Hànzì de hǎo fāngfǎ ma?",tr:"Знаешь методы запоминания?"},
{s:"A",hz:"我有一本给留学生编的汉字故事书，借给我看吧，也许会有帮助。别担心，你一定能解决这个问题。",py:"Wǒ yǒu yì běn gěi liúxuéshēng biān de Hànzì gùshi shū, jiè gěi wǒ kàn ba, yěxǔ huì yǒu bāngzhù. Bié dān xīn, nǐ yídìng néng jiějué zhège wèntí.",tr:"Есть книжка с историями. Одолжу — может поможет. Не волнуйся, разберёшься."}
]}
],
tips:[
"得 (de) перед оценкой — одна из трёх функций. Если перед глаголом — это děi «должен».",
"门 — счётное слово для курсов: 一门课.",
"道 — счётное слово для вопросов/задач: 一道题.",
"看X看得Y — схема повторения глагола. 我看汉字看得很慢.",
"对X来说 — «с точки зрения X»."
]
},
29:{
introduction:"В этой главе вы научитесь использовать результативные глаголы (V+好了, V+完了), счётные слова для билетов (张) и говорить о путешествиях на поезде.\\n\\nСитуация: 阿曼 сдал все экзамены и купил билеты в Харбин. 张伟 приглашает его на вечер встреч перед отъездом.",
vocabulary:[
{hz:"全部",py:"quánbù",tr:"всё, целиком"},
{hz:"终于",py:"zhōngyú",tr:"наконец"},
{hz:"别提",py:"biétí",tr:"не стоит упоминать"},
{hz:"糟糕",py:"zāogāo",tr:"ужасно, кошмар"},
{hz:"声调",py:"shēngdiào",tr:"тон"},
{hz:"错",py:"cuò",tr:"ошибка"},
{hz:"谦虚",py:"qiānxū",tr:"скромный"},
{hz:"嗐",py:"hài",tr:"вздох"},
{hz:"火车",py:"huǒchē",tr:"поезд"},
{hz:"票",py:"piào",tr:"билет"},
{hz:"张",py:"zhāng",tr:"счётное слово (плоские)"},
{hz:"卧铺",py:"wòpù",tr:"спальное место (поезд)"},
{hz:"另外",py:"lìngwài",tr:"другой"},
{hz:"硬座",py:"yìngzuò",tr:"жёсткий сидячий"},
{hz:"上",py:"shàng",tr:"садиться (в поезд)"},
{hz:"补",py:"bǔ",tr:"доплатить"},
{hz:"联欢",py:"liánhuān",tr:"собираться на встречу"},
{hz:"晚会",py:"wǎnhuì",tr:"вечеринка"},
{hz:"表演",py:"biǎoyǎn",tr:"выступать"},
{hz:"节目",py:"jiémù",tr:"номер, программа"}
],
grammar:[
{title:"Результативные глаголы: V + 完/好/到/见/懂 + 了",
explanation:"V + Результат + 了.\\n\\n• 完 — закончить: 考完了\\n• 好 — качественно: 准备好了\\n• 到 — достичь: 找到了\\n• 见 — воспринял: 听见了\\n• 懂 — понял: 看懂了\\n\\nОтрицание: 没 + V + Результат (БЕЗ 了).",
examples:[
{hz:"今天全部考完了吧？",py:"Jīntiān quánbù kǎo wán le ba?",tr:"Сегодня всё сдал?"},
{hz:"我们已经买好票了。",py:"Wǒmen yǐjīng mǎi hǎo piào le.",tr:"Мы уже купили билеты."},
{hz:"我找到了我的自行车。",py:"Wǒ zhǎo dào le wǒ de zìxíngchē.",tr:"Я нашёл свой велосипед."},
{hz:"我看懂了这本书。",py:"Wǒ kàn dǒng le zhè běn shū.",tr:"Я понял эту книгу."}
]},
{title:"Счётное слово 张 — для плоских объектов",
explanation:"Через 张: билеты 票, бумага 纸, фото 照片, карта 地图, стол 桌子, кровать 床.\\n\\nВсё что можно положить плашмя и оно плоское.",
examples:[
{hz:"只买到三张卧铺票。",py:"Zhǐ mǎi dào sān zhāng wòpù piào.",tr:"Смог купить только 3 билета на плацкарт."},
{hz:"另外一张是硬座票。",py:"Lìngwài yì zhāng shì yìngzuò piào.",tr:"Ещё один — жёсткий сидячий."},
{hz:"买一张北京地图。",py:"Mǎi yì zhāng Běijīng dìtú.",tr:"Купить карту Пекина."}
]},
{title:"终于 — «наконец-то»",
explanation:"终于 — «наконец». Выражает облегчение после ожидания.\\n\\n考了三天，终于考完了。",
examples:[
{hz:"考了三天，终于考完了。",py:"Kǎo le sān tiān, zhōngyú kǎo wán le.",tr:"Сдавал 3 дня, наконец всё."},
{hz:"他终于来了。",py:"Tā zhōngyú lái le.",tr:"Он наконец пришёл."}
]}
],
dialogues:[
{title:"После экзаменов (张伟 и 阿曼)",lines:[
{s:"A",hz:"阿曼，今天全部考完了吧？",py:"Āmàn, jīntiān quánbù kǎo wán le ba?",tr:"Сегодня всё сдал?"},
{s:"B",hz:"考了三天，终于考完了。",py:"Kǎo le sān tiān, zhōngyú kǎo wán le.",tr:"Три дня сдавал — наконец всё."},
{s:"A",hz:"考得怎么样？",py:"Kǎo de zěnmeyàng?",tr:"Как?"},
{s:"B",hz:"别提了，考得糟糕极了，特别是声调和汉字。",py:"Biétí le, kǎo de zāogāo jí le, tèbié shì shēngdiào hé Hànzì.",tr:"Не спрашивай, ужасно — особенно тоны и иероглифы."},
{s:"A",hz:"你是谦虚吧？",py:"Nǐ shì qiānxū ba?",tr:"Скромничаешь?"},
{s:"B",hz:"嗐！",py:"Hài!",tr:"Эх!"},
{s:"A",hz:"你们怎么去哈尔滨？坐火车去吗？",py:"Nǐmen zěnme qù Hā'ěrbīn? Zuò huǒchē qù ma?",tr:"Как поедете в Харбин? Поездом?"},
{s:"B",hz:"对，我们已经买好票了，不过只买到三张卧铺票，另外一张是硬座票。",py:"Duì, wǒmen yǐjīng mǎi hǎo piào le, búguò zhǐ mǎi dào sān zhāng wòpù piào, lìngwài yì zhāng shì yìngzuò piào.",tr:"Да, билеты купили. Но только 3 плацкарта, четвёртый — сидячий."},
{s:"A",hz:"你可以上车补卧铺票。",py:"Nǐ kěyǐ shàng chē bǔ wòpù piào.",tr:"Можешь в поезде доплатить."},
{s:"B",hz:"那太好了。",py:"Nà tài hǎo le.",tr:"Отлично."},
{s:"A",hz:"这个星期六我们系里有一个联欢晚会，你能来吗？",py:"Zhège xīngqīliù wǒmen xì li yǒu yí ge liánhuān wǎnhuì, nǐ néng lái ma?",tr:"В субботу у нас вечеринка — придёшь?"},
{s:"B",hz:"应该没问题。要准备什么东西？",py:"Yīnggāi méi wèntí. Yào zhǔnbèi shénme dōngxi?",tr:"Должен успеть. Что готовить?"},
{s:"A",hz:"也许会让你表演一个节目。",py:"Yěxǔ huì ràng nǐ biǎoyǎn yí ge jiémù.",tr:"Могут попросить что-то спеть."}
]}
],
tips:[
"火车 в Китае — главный межгород. Классы: 硬座 (жёсткий), 软座, 硬卧 (плацкарт), 软卧 (купе).",
"补票 — доплатить за билет. Купил сидячий — в поезде доплачиваешь до плацкарта.",
"别提了 — «не спрашивай, беда!».",
"谦虚 — скромный. Важная добродетель. Когда хвалят, принято преуменьшать.",
"联欢晚会 — вечер встреч. Типичное мероприятие в вузах."
]
},
30:{
introduction:"Это итоговая глава всего учебника! Вы повторите все ключевые конструкции и научитесь рассказывать о подготовке к выступлению, использовать 怕 (бояться) и эмфатическое 多……啊 («ведь это же X!»).\\n\\nСитуация: 阿曼 собирается на факультетскую вечеринку. Он решил спеть китайскую народную песню, но волнуется из-за произношения.",
vocabulary:[
{hz:"行李",py:"xíngli",tr:"багаж"},
{hz:"收拾",py:"shōushi",tr:"собирать вещи"},
{hz:"半天",py:"bàntiān",tr:"полдня"},
{hz:"整天",py:"zhěng tiān",tr:"целый день"},
{hz:"联欢会",py:"liánhuānhuì",tr:"вечер встреч"},
{hz:"需要",py:"xūyào",tr:"нуждаться"},
{hz:"英文",py:"Yīngwén",tr:"английский (язык)"},
{hz:"首",py:"shǒu",tr:"счётное слово для песен"},
{hz:"流行",py:"liúxíng",tr:"популярный"},
{hz:"歌曲",py:"gēqǔ",tr:"песня"},
{hz:"民歌",py:"míngē",tr:"народная песня"},
{hz:"好听",py:"hǎotīng",tr:"приятный на слух"},
{hz:"发音",py:"fāyīn",tr:"произношение"},
{hz:"懂",py:"dǒng",tr:"понимать"},
{hz:"熟悉",py:"shúxī",tr:"знакомый"},
{hz:"歌词",py:"gēcí",tr:"слова песни"},
{hz:"标准",py:"biāozhǔn",tr:"стандартный"},
{hz:"面子",py:"miànzi",tr:"лицо, репутация"},
{hz:"光盘",py:"guāngpán",tr:"диск (CD)"},
{hz:"次",py:"cì",tr:"раз"},
{hz:"怕",py:"pà",tr:"бояться"}
],
grammar:[
{title:"多……啊 — эмфатическое «какой же X!»",
explanation:"Выражает высокую степень с оттенком восклицания.\\n\\nСхема:  多 + Прил. + 啊\\n\\n多没面子啊！— Какой же стыд!\\n多好啊！— Как же хорошо!",
examples:[
{hz:"我的发音太不标准的话，那多没面子啊！",py:"Wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a!",tr:"Если произношение неправильное — какой стыд!"},
{hz:"那儿的风景多漂亮啊！",py:"Nàr de fēngjǐng duō piàoliang a!",tr:"Какой там красивый пейзаж!"}
]},
{title:"怕 — «бояться»",
explanation:"1) 我怕狗。— Боюсь собак.\\n2) 我怕说错。— Боюсь ошибиться.\\n3) 我怕他不来。— Боюсь, он не придёт.",
examples:[
{hz:"你是怕表演节目吧？",py:"Nǐ shì pà biǎoyǎn jiémù ba?",tr:"Ты боишься выступать?"},
{hz:"有点儿。",py:"Yǒudiǎnr.",tr:"Немного."},
{hz:"我不怕冷。",py:"Wǒ bú pà lěng.",tr:"Я не боюсь холода."}
]},
{title:"Счётные слова 首 и 次",
explanation:"• 首 — для ПЕСЕН: 一首歌, 一首民歌\\n• 次 — для РАЗ: 一次, 两次, 去过一次北京",
examples:[
{hz:"我打算唱一首中文歌。",py:"Wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.",tr:"Спою китайскую песню."},
{hz:"我想唱一首民歌。",py:"Wǒ xiǎng chàng yì shǒu míngē.",tr:"Хочу народную."}
]}
],
dialogues:[
{title:"Перед отъездом (古丽 и 阿曼)",lines:[
{s:"A",hz:"阿曼，快要出发了，你准备好行李了吗？",py:"Āmàn, kuàiyào chūfā le, nǐ zhǔnbèi hǎo xíngli le ma?",tr:"Скоро выезжаем, собрал вещи?"},
{s:"B",hz:"我昨天收拾了半天，早就准备好了。",py:"Wǒ zuótiān shōushi le bàntiān, zǎo jiù zhǔnbèi hǎo le.",tr:"Вчера полдня собирал — готов."},
{s:"A",hz:"那你整天在房间里干什么？",py:"Nà nǐ zhěng tiān zài fángjiān li gàn shénme?",tr:"А целый день что делал?"},
{s:"B",hz:"今天我要参加一个中国学生的联欢会，正在准备节目呢。",py:"Jīntiān wǒ yào cānjiā yí ge Zhōngguó xuéshēng de liánhuānhuì, zhèngzài zhǔnbèi jiémù ne.",tr:"Иду на вечеринку, готовлю номер."},
{s:"A",hz:"你唱歌唱得那么好，还需要准备吗？",py:"Nǐ chàng gē chàng de nàme hǎo, hái xūyào zhǔnbèi ma?",tr:"Ты хорошо поёшь, зачем готовиться?"},
{s:"B",hz:"我不想唱英文歌，我打算唱一首中文歌。",py:"Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.",tr:"Не хочу английскую — спою китайскую."},
{s:"A",hz:"你打算唱流行歌曲吗？",py:"Nǐ dǎsuàn chàng liúxíng gēqǔ ma?",tr:"Популярную?"},
{s:"B",hz:"不，我想唱一首民歌。",py:"Bù, wǒ xiǎng chàng yì shǒu míngē.",tr:"Нет, народную."},
{s:"A",hz:"民歌很好听啊。",py:"Míngē hěn hǎotīng a.",tr:"Народные приятные."},
{s:"B",hz:"我的发音不太好，他们能听懂吗？",py:"Wǒ de fāyīn bú tài hǎo, tāmen néng tīng dǒng ma?",tr:"У меня произношение не очень — поймут?"},
{s:"A",hz:"如果是有名的民歌，他们一定很熟悉歌词。",py:"Rúguǒ shì yǒumíng de míngē, tāmen yídìng hěn shúxī gēcí.",tr:"Если известная — слова все знают."},
{s:"B",hz:"可是，我的发音太不标准的话，那多没面子啊！",py:"Kěshì, wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a!",tr:"А если совсем плохое — какой стыд!"},
{s:"A",hz:"我的同屋有中国民歌的光盘，借来用用，也许会有帮助。",py:"Wǒ de tóngwū yǒu Zhōngguó míngē de guāngpán, jiè lái yòng yòng, yěxǔ huì yǒu bāngzhù.",tr:"У моей соседки диск — одолжу, поможет."},
{s:"B",hz:"你是怕表演节目吧？",py:"Nǐ shì pà biǎoyǎn jiémù ba?",tr:"Ты боишься выступать?"},
{s:"A",hz:"有点儿。",py:"Yǒudiǎnr.",tr:"Немного."}
]}
],
tips:[
"民歌 — народная песня. Популярный жанр: 茉莉花 (Цветок жасмина), 康定情歌.",
"面子 — «лицо, репутация». Центральное понятие китайской культуры. 没面子 — опозориться.",
"光盘 — CD/DVD. В эпоху стриминга слово устаревает.",
"发音 — произношение. Тоны + правильная артикуляция. Самая сложная часть.",
"Поздравляю с завершением Boya Chinese Elementary 1! 30 глав, 700+ слов, все базовые структуры."
]
}
};
function renderTheory(chId){
var t=THEORY[chId];
if(!t)return '<div class="placeholder"><div class="icon">&#128214;</div><div class="ph-title">Chapter '+chId+'</div><p>Theory content will be added here.<br>Words, grammar rules, examples, and audio.</p></div>';
var h='';
h+='<div class="th-section"><h2>Глава '+chId+'</h2><p class="th-body">'+esc(t.introduction)+'</p></div>';
h+='<div class="th-section"><h2>Новые слова</h2><div class="th-word-table">';
t.vocabulary.forEach(function(w){
h+='<div class="th-word-row" data-speak="'+esc(w.hz)+'">';
h+='<span class="th-word-hz">'+esc(w.hz)+'</span>';
h+='<span class="th-word-py">'+esc(w.py)+'</span>';
h+='<span class="th-word-tr">'+esc(w.tr)+'</span>';
h+='<span class="th-word-speaker">&#128264;</span>';
h+='</div>';
});
h+='</div></div>';
t.grammar.forEach(function(g){
h+='<div class="th-section"><h2>'+esc(g.title)+'</h2>';
h+='<p class="th-body">'+esc(g.explanation)+'</p>';
if(g.examples.length>0){
h+='<div class="th-examples">';
g.examples.forEach(function(ex){
h+='<div class="th-ex-row" data-speak="'+esc(ex.hz)+'">';
h+='<div class="th-ex-text"><div class="th-ex-hz">'+esc(ex.hz)+'</div><div class="th-ex-py">'+esc(ex.py)+'</div><div class="th-ex-tr">'+esc(ex.tr)+'</div></div>';
h+='<span class="th-word-speaker">&#128264;</span>';
h+='</div>';
});
h+='</div>';
}
h+='</div>';
});
t.dialogues.forEach(function(d){
h+='<div class="th-section"><h2>Диалог: '+esc(d.title)+'</h2><div class="th-dialogue">';
d.lines.forEach(function(l){
var isA=l.s==='A';
h+='<div class="th-dl-line '+(isA?'th-dl-a':'th-dl-b')+'" data-speak="'+esc(l.hz)+'">';
h+='<div class="th-speaker '+(isA?'th-speaker-a':'th-speaker-b')+'">'+l.s+'</div>';
h+='<div class="th-dl-content"><div class="th-dl-hz">'+esc(l.hz)+'</div><div class="th-dl-py">'+esc(l.py)+'</div><div class="th-dl-tr">'+esc(l.tr)+'</div></div>';
h+='</div>';
});
h+='</div></div>';
});
if(t.tips.length>0){
h+='<div class="th-section"><h2>Советы</h2>';
t.tips.forEach(function(tip){h+='<div class="about-tip">'+esc(tip)+'</div>'});
h+='</div>';
}
return h;
}
</script>
</body>
</html>`;

// Inject data
const final = html.replace('var DATA = INJECTED_DATA;', 'var DATA = ' + minified + ';');

fs.writeFileSync(outPath, final, "utf-8");
const sizeMB = (Buffer.byteLength(final, "utf-8") / 1024 / 1024).toFixed(2);
console.log("Built: web/index.html (" + sizeMB + " MB)");
console.log("Open in browser: file:///C:/Users/seydi/turkmen-chinese/web/index.html");
