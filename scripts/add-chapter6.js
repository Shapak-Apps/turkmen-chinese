/**
 * Adds 20 exercises to Chapter 6 (现在几点) based on Boya Chinese Elementary I
 * 课堂练习 — pages 60-62. Focus: numbers, time telling, 几, 太...了.
 */
const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "assets",
  "data",
  "course_content.json",
);

const questions = [
  // ── 1-6 Flashcards (key vocab from Ch6) ──────────────────────────
  {
    id: 6101,
    type: "flashcard",
    mandarin: { hanzi: "现在", pinyin: "Xiànzài" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "сейчас", hanzi: "现在", pinyin: "xiànzài" },
      { id: 2, english: "утро", hanzi: "早上", pinyin: "zǎoshang" },
      { id: 3, english: "сегодня", hanzi: "今天", pinyin: "jīntiān" },
      { id: 4, english: "скоро", hanzi: "一会儿", pinyin: "yíhuìr" },
    ],
    correctOptionId: 1,
  },
  {
    id: 6102,
    type: "flashcard",
    mandarin: { hanzi: "点", pinyin: "Diǎn" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "минута", hanzi: "分", pinyin: "fēn" },
      { id: 2, english: "час (на часах)", hanzi: "点", pinyin: "diǎn" },
      { id: 3, english: "половина", hanzi: "半", pinyin: "bàn" },
      { id: 4, english: "четверть часа", hanzi: "刻", pinyin: "kè" },
    ],
    correctOptionId: 2,
  },
  {
    id: 6103,
    type: "flashcard",
    mandarin: { hanzi: "分", pinyin: "Fēn" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "час", hanzi: "点", pinyin: "diǎn" },
      { id: 2, english: "половина", hanzi: "半", pinyin: "bàn" },
      { id: 3, english: "четверть", hanzi: "刻", pinyin: "kè" },
      { id: 4, english: "минута", hanzi: "分", pinyin: "fēn" },
    ],
    correctOptionId: 4,
  },
  {
    id: 6104,
    type: "flashcard",
    mandarin: { hanzi: "上课", pinyin: "Shàngkè" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "заканчивать занятие", hanzi: "下课", pinyin: "xiàkè" },
      { id: 2, english: "начинать занятие", hanzi: "上课", pinyin: "shàngkè" },
      { id: 3, english: "лекция", hanzi: "讲座", pinyin: "jiǎngzuò" },
      { id: 4, english: "начинаться", hanzi: "开始", pinyin: "kāishǐ" },
    ],
    correctOptionId: 2,
  },
  {
    id: 6105,
    type: "flashcard",
    mandarin: { hanzi: "下课", pinyin: "Xiàkè" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "начинать занятие", hanzi: "上课", pinyin: "shàngkè" },
      { id: 2, english: "заканчивать занятие", hanzi: "下课", pinyin: "xiàkè" },
      { id: 3, english: "начинаться", hanzi: "开始", pinyin: "kāishǐ" },
      { id: 4, english: "рано", hanzi: "早", pinyin: "zǎo" },
    ],
    correctOptionId: 2,
  },
  {
    id: 6106,
    type: "flashcard",
    mandarin: { hanzi: "开始", pinyin: "Kāishǐ" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "заканчивать", hanzi: "结束", pinyin: "jiéshù" },
      { id: 2, english: "лекция", hanzi: "讲座", pinyin: "jiǎngzuò" },
      { id: 3, english: "начинаться, начинать", hanzi: "开始", pinyin: "kāishǐ" },
      { id: 4, english: "рано", hanzi: "早", pinyin: "zǎo" },
    ],
    correctOptionId: 3,
  },

  // ── 7-10 Fill-in-the-blank (время, адаптация 用指定的词语 стр. 61) ──
  {
    id: 6107,
    type: "fill_blank",
    sentence: "讲座六点___开始。",
    sentencePinyin: "Jiǎngzuò liù diǎn ___ kāishǐ.",
    blankedWord: "半",
    correctAnswer: "半",
    hint: "половина часа (30 минут)",
    instruction: "Вставь пропущенное слово: «Лекция начинается в половине седьмого (6:30).»",
    options: [
      { id: 1, hanzi: "半", pinyin: "bàn" },
      { id: 2, hanzi: "刻", pinyin: "kè" },
      { id: 3, hanzi: "差", pinyin: "chà" },
      { id: 4, hanzi: "分", pinyin: "fēn" },
    ],
  },
  {
    id: 6108,
    type: "fill_blank",
    sentence: "现在十点一___。",
    sentencePinyin: "Xiànzài shí diǎn yí ___.",
    blankedWord: "刻",
    correctAnswer: "刻",
    hint: "четверть часа (15 минут)",
    instruction: "Вставь пропущенное слово: «Сейчас 10:15 (четверть одиннадцатого).»",
    options: [
      { id: 1, hanzi: "半", pinyin: "bàn" },
      { id: 2, hanzi: "刻", pinyin: "kè" },
      { id: 3, hanzi: "分", pinyin: "fēn" },
      { id: 4, hanzi: "差", pinyin: "chà" },
    ],
  },
  {
    id: 6109,
    type: "fill_blank",
    sentence: "现在几___?",
    sentencePinyin: "Xiànzài jǐ ___?",
    blankedWord: "点",
    correctAnswer: "点",
    hint: "единица измерения — «час» при указании времени",
    instruction: "Вставь пропущенное слово: «Сколько сейчас времени?»",
    options: [
      { id: 1, hanzi: "点", pinyin: "diǎn" },
      { id: 2, hanzi: "分", pinyin: "fēn" },
      { id: 3, hanzi: "半", pinyin: "bàn" },
      { id: 4, hanzi: "刻", pinyin: "kè" },
    ],
  },
  {
    id: 6110,
    type: "fill_blank",
    sentence: "___一刻六点。",
    sentencePinyin: "___ yí kè liù diǎn.",
    blankedWord: "差",
    correctAnswer: "差",
    hint: "«без» (не хватает до полного часа)",
    instruction: "Вставь пропущенное слово: «Без четверти шесть (5:45).»",
    options: [
      { id: 1, hanzi: "差", pinyin: "chà" },
      { id: 2, hanzi: "半", pinyin: "bàn" },
      { id: 3, hanzi: "点", pinyin: "diǎn" },
      { id: 4, hanzi: "分", pinyin: "fēn" },
    ],
  },

  // ── 11-13 Multiple choice (адаптация 完成对话 и диалогов) ────────
  {
    id: 6111,
    type: "multiple_choice",
    mandarin: { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?" },
    instruction: "«Сколько сейчас времени?» На часах 8:30. Как правильно ответить?",
    options: [
      {
        id: 1,
        english: "现在八点半。",
        mandarin: {
          hanzi: "现在八点半",
          pinyin: "Xiànzài bā diǎn bàn",
          words: [
            { hanzi: "现在", pinyin: "xiànzài", english: "сейчас" },
            { hanzi: "八点", pinyin: "bā diǎn", english: "8 часов" },
            { hanzi: "半", pinyin: "bàn", english: "половина" },
          ],
          breakdown: "8:30 = «八点半» (восемь часов половина). 半 заменяет «三十分».",
        },
      },
      {
        id: 2,
        english: "现在八点三十。",
        mandarin: {
          hanzi: "现在八点三十",
          pinyin: "Xiànzài bā diǎn sānshí",
          words: [],
          breakdown: "Почти правильно, но нужно добавить 分: 八点三十分. Или короче — 八点半.",
        },
      },
      {
        id: 3,
        english: "现在差半八点。",
        mandarin: {
          hanzi: "现在差半八点",
          pinyin: "Xiànzài chà bàn bā diǎn",
          words: [],
          breakdown: "Так не говорят — 差 используется с минутами/刻, а не с 半.",
        },
      },
      {
        id: 4,
        english: "现在八半点。",
        mandarin: {
          hanzi: "现在八半点",
          pinyin: "Xiànzài bā bàn diǎn",
          words: [],
          breakdown: "Неправильный порядок. Должно быть: [час] 点 [минуты].",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 6112,
    type: "multiple_choice",
    mandarin: { hanzi: "讲座几点开始？", pinyin: "Jiǎngzuò jǐ diǎn kāishǐ?" },
    instruction: "«Во сколько начинается лекция?» В 6. Как ответить?",
    options: [
      {
        id: 1,
        english: "讲座六点开始。",
        mandarin: {
          hanzi: "讲座六点开始",
          pinyin: "Jiǎngzuò liù diǎn kāishǐ",
          words: [
            { hanzi: "讲座", pinyin: "jiǎngzuò", english: "лекция" },
            { hanzi: "六点", pinyin: "liù diǎn", english: "6 часов" },
            { hanzi: "开始", pinyin: "kāishǐ", english: "начинаться" },
          ],
          breakdown: "Время ставится ПЕРЕД глаголом: S + время + глагол.",
        },
      },
      {
        id: 2,
        english: "讲座开始六点。",
        mandarin: {
          hanzi: "讲座开始六点",
          pinyin: "Jiǎngzuò kāishǐ liù diǎn",
          words: [],
          breakdown: "Неправильный порядок — время должно быть ПЕРЕД глаголом.",
        },
      },
      {
        id: 3,
        english: "六点讲座开始。",
        mandarin: {
          hanzi: "六点讲座开始",
          pinyin: "Liù diǎn jiǎngzuò kāishǐ",
          words: [],
          breakdown: "Время можно ставить и в начале, но тогда смысл меняется. Менее естественно.",
        },
      },
      {
        id: 4,
        english: "讲座是六点。",
        mandarin: {
          hanzi: "讲座是六点",
          pinyin: "Jiǎngzuò shì liù diǎn",
          words: [],
          breakdown: "«Лекция — это 6 часов» — бессмыслица.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 6113,
    type: "multiple_choice",
    mandarin: { hanzi: "北京大学早上八点上课。", pinyin: "Běijīng Dàxué zǎoshang bā diǎn shàngkè." },
    instruction: "«В Пекинском университете занятия в 8 утра.» Как выразить «это слишком рано!»?",
    options: [
      {
        id: 1,
        english: "太早了！",
        mandarin: {
          hanzi: "太早了",
          pinyin: "Tài zǎo le",
          words: [
            { hanzi: "太", pinyin: "tài", english: "слишком" },
            { hanzi: "早", pinyin: "zǎo", english: "рано" },
            { hanzi: "了", pinyin: "le", english: "(частица)" },
          ],
          breakdown: "Схема 太 + прил. + 了 — «слишком», с эмоциональной оценкой.",
        },
      },
      {
        id: 2,
        english: "很早。",
        mandarin: {
          hanzi: "很早",
          pinyin: "Hěn zǎo",
          words: [],
          breakdown: "«Рано» — нейтрально, без эмоции «слишком».",
        },
      },
      {
        id: 3,
        english: "早太了！",
        mandarin: {
          hanzi: "早太了",
          pinyin: "Zǎo tài le",
          words: [],
          breakdown: "Неправильный порядок. Должно быть 太 + прил. + 了.",
        },
      },
      {
        id: 4,
        english: "不早。",
        mandarin: {
          hanzi: "不早",
          pinyin: "Bù zǎo",
          words: [],
          breakdown: "«Не рано» — противоположный смысл.",
        },
      },
    ],
    correctOptionId: 1,
  },

  // ── 14-15 Listening MC ─────────────────────────────────────────
  {
    id: 6114,
    type: "listening_mc",
    mandarin: {
      hanzi: "现在几点",
      pinyin: "Xiànzài jǐ diǎn",
      words: [
        { hanzi: "现在", pinyin: "xiànzài", english: "сейчас" },
        { hanzi: "几", pinyin: "jǐ", english: "сколько" },
        { hanzi: "点", pinyin: "diǎn", english: "час" },
      ],
      breakdown: "«Сколько сейчас времени?» Стандартный вопрос о времени.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Сколько сейчас времени? — 现在几点" },
      { id: 2, english: "Во сколько лекция? — 讲座几点" },
      { id: 3, english: "Во сколько занятия? — 几点上课" },
      { id: 4, english: "Сколько друзей? — 几个朋友" },
    ],
    correctOptionId: 1,
  },
  {
    id: 6115,
    type: "listening_mc",
    mandarin: {
      hanzi: "差一刻六点",
      pinyin: "Chà yí kè liù diǎn",
      words: [
        { hanzi: "差", pinyin: "chà", english: "не хватать" },
        { hanzi: "一刻", pinyin: "yí kè", english: "четверть часа" },
        { hanzi: "六点", pinyin: "liù diǎn", english: "6 часов" },
      ],
      breakdown: "«Без четверти шесть (5:45)». Схема: 差 + [количество] + [час].",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Без четверти шесть (5:45) — 差一刻六点" },
      { id: 2, english: "Четверть седьмого (6:15) — 六点一刻" },
      { id: 3, english: "Половина шестого (5:30) — 五点半" },
      { id: 4, english: "Без 10 минут шесть (5:50) — 差十分六点" },
    ],
    correctOptionId: 1,
  },

  // ── 16-17 Grammar ──────────────────────────────────────────────
  {
    id: 6116,
    type: "grammar",
    rule: {
      title: "Как называть время",
      explanation:
        "Схема: [час] 点 [минуты] 分\n\n" +
        "8:00 — 八点\n" +
        "8:05 — 八点零五分 (零 обязательно для <10 мин)\n" +
        "8:15 — 八点十五分 ИЛИ 八点一刻 (четверть)\n" +
        "8:30 — 八点三十分 ИЛИ 八点半 (половина)\n" +
        "8:45 — 八点三刻 ИЛИ 差一刻九点 («без четверти 9»)\n" +
        "8:50 — 差十分九点 («без 10 минут 9»)\n\n" +
        "Вопрос: 现在几点? (сколько сейчас времени?)\n" +
        "Во сколько происходит действие: [время] + глагол\n" +
        "几点上课? — Во сколько занятия?",
      examples: [
        { hanzi: "现在八点半。", pinyin: "Xiànzài bā diǎn bàn.", english: "Сейчас половина девятого (8:30)." },
        { hanzi: "差一刻六点。", pinyin: "Chà yí kè liù diǎn.", english: "Без четверти шесть (5:45)." },
        { hanzi: "我们八点五十分上课。", pinyin: "Wǒmen bā diǎn wǔshí fēn shàng kè.", english: "У нас занятия в 8:50." },
      ],
    },
    practice: [
      {
        question: "Как сказать «Сейчас 10:15»?",
        options: [
          { id: 1, text: "现在十点一刻" },
          { id: 2, text: "现在一刻十点" },
          { id: 3, text: "现在十点半" },
          { id: 4, text: "现在差十五点" },
        ],
        correctOptionId: 1,
      },
      {
        question: "Как сказать «Мы заканчиваем занятия в половине одиннадцатого»?",
        options: [
          { id: 1, text: "我们十点半下课" },
          { id: 2, text: "我们下课十点半" },
          { id: 3, text: "十点半我们是下课" },
          { id: 4, text: "我们半十点下课" },
        ],
        correctOptionId: 1,
      },
    ],
  },
  {
    id: 6117,
    type: "grammar",
    rule: {
      title: "Конструкция 太……了 — «слишком»",
      explanation:
        "太…了 (tài…le) выражает высокую степень, часто с оттенком недовольства или восхищения.\n\n" +
        "Схема: 太 + Прилагательное/Глагол + 了\n\n" +
        "太早了！— Слишком рано!\n" +
        "太好了！— Отлично! (положительно)\n" +
        "太累了。— Очень устал.\n\n" +
        "В отрицании 了 обычно опускается:\n" +
        "不太早 — «не слишком рано».\n\n" +
        "太 без 了 звучит незавершённо — 了 почти всегда нужно.",
      examples: [
        { hanzi: "八点上课，太早了！", pinyin: "Bā diǎn shàngkè, tài zǎo le!", english: "Занятия в 8 — это слишком рано!" },
        { hanzi: "太好了！", pinyin: "Tài hǎo le!", english: "Отлично!" },
        { hanzi: "不太早。", pinyin: "Bú tài zǎo.", english: "Не так уж рано." },
      ],
    },
    practice: [
      {
        question: "Как правильно сказать «Эта школа слишком большая»?",
        options: [
          { id: 1, text: "这个学校大太了" },
          { id: 2, text: "这个学校太大了" },
          { id: 3, text: "太这个学校大了" },
          { id: 4, text: "这个学校了太大" },
        ],
        correctOptionId: 2,
      },
      {
        question: "Как сказать «Не так уж рано»?",
        options: [
          { id: 1, text: "不太早了" },
          { id: 2, text: "太不早" },
          { id: 3, text: "不太早" },
          { id: 4, text: "早不太" },
        ],
        correctOptionId: 3,
      },
    ],
  },

  // ── 18 Match pairs ─────────────────────────────────────────────
  {
    id: 6118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "现在", leftPinyin: "xiànzài", right: "сейчас" },
      { id: 2, left: "点", leftPinyin: "diǎn", right: "час" },
      { id: 3, left: "分", leftPinyin: "fēn", right: "минута" },
      { id: 4, left: "半", leftPinyin: "bàn", right: "половина" },
      { id: 5, left: "刻", leftPinyin: "kè", right: "четверть часа" },
      { id: 6, left: "差", leftPinyin: "chà", right: "без (до)" },
      { id: 7, left: "上课", leftPinyin: "shàngkè", right: "на занятия" },
      { id: 8, left: "下课", leftPinyin: "xiàkè", right: "конец занятий" },
    ],
  },

  // ── 19-20 Single response ──────────────────────────────────────
  {
    id: 6119,
    type: "single_response",
    mandarin: { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Сколько сейчас времени?",
        mandarin: {
          hanzi: "现在几点",
          pinyin: "Xiànzài jǐ diǎn",
          words: [
            { hanzi: "现在", pinyin: "xiànzài", english: "сейчас" },
            { hanzi: "几", pinyin: "jǐ", english: "сколько" },
            { hanzi: "点", pinyin: "diǎn", english: "час" },
          ],
          breakdown: "Стандартный вопрос о времени. 几 заменяет ожидаемую цифру часов.",
        },
      },
    ],
  },
  {
    id: 6120,
    type: "single_response",
    mandarin: { hanzi: "一会儿见。", pinyin: "Yíhuìr jiàn." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "До скорого.",
        mandarin: {
          hanzi: "一会儿见",
          pinyin: "Yíhuìr jiàn",
          words: [
            { hanzi: "一会儿", pinyin: "yíhuìr", english: "скоро, через минутку" },
            { hanzi: "见", pinyin: "jiàn", english: "увидеться" },
          ],
          breakdown: "Формула прощания «[время]见». Другие: 明天见 (до завтра), 再见 (до свидания).",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch6 = data.chapters.find((c) => c.id === 6);
if (!ch6) {
  console.error("Chapter 6 not found!");
  process.exit(1);
}

ch6.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 6 exercises added:", questions.length);
console.log("Distribution:", counts);
