/**
 * Adds 20 exercises to Chapter 7 (明天你有课吗) based on Boya Chinese Elementary I
 * 课堂练习 — pages 67-69. Focus: 有/没有, 吧 particle, time periods.
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
  // ── 1-6 Flashcards ────────────────────────────────────────────
  {
    id: 7101,
    type: "flashcard",
    mandarin: { hanzi: "明天", pinyin: "Míngtiān" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "сегодня", hanzi: "今天", pinyin: "jīntiān" },
      { id: 2, english: "завтра", hanzi: "明天", pinyin: "míngtiān" },
      { id: 3, english: "вчера", hanzi: "昨天", pinyin: "zuótiān" },
      { id: 4, english: "сейчас", hanzi: "现在", pinyin: "xiànzài" },
    ],
    correctOptionId: 2,
  },
  {
    id: 7102,
    type: "flashcard",
    mandarin: { hanzi: "今天", pinyin: "Jīntiān" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "сегодня", hanzi: "今天", pinyin: "jīntiān" },
      { id: 2, english: "завтра", hanzi: "明天", pinyin: "míngtiān" },
      { id: 3, english: "утро", hanzi: "早上", pinyin: "zǎoshang" },
      { id: 4, english: "вечер", hanzi: "晚上", pinyin: "wǎnshang" },
    ],
    correctOptionId: 1,
  },
  {
    id: 7103,
    type: "flashcard",
    mandarin: { hanzi: "晚上", pinyin: "Wǎnshang" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "утро", hanzi: "早上", pinyin: "zǎoshang" },
      { id: 2, english: "до полудня", hanzi: "上午", pinyin: "shàngwǔ" },
      { id: 3, english: "после полудня", hanzi: "下午", pinyin: "xiàwǔ" },
      { id: 4, english: "вечер", hanzi: "晚上", pinyin: "wǎnshang" },
    ],
    correctOptionId: 4,
  },
  {
    id: 7104,
    type: "flashcard",
    mandarin: { hanzi: "自行车", pinyin: "Zìxíngchē" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "машина", hanzi: "车", pinyin: "chē" },
      { id: 2, english: "велосипед", hanzi: "自行车", pinyin: "zìxíngchē" },
      { id: 3, english: "велопарковка", hanzi: "车棚", pinyin: "chēpéng" },
      { id: 4, english: "ключ", hanzi: "钥匙", pinyin: "yàoshi" },
    ],
    correctOptionId: 2,
  },
  {
    id: 7105,
    type: "flashcard",
    mandarin: { hanzi: "电影", pinyin: "Diànyǐng" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "кинотеатр", hanzi: "电影院", pinyin: "diànyǐngyuàn" },
      { id: 2, english: "журнал", hanzi: "杂志", pinyin: "zázhì" },
      { id: 3, english: "фильм, кино", hanzi: "电影", pinyin: "diànyǐng" },
      { id: 4, english: "музыка", hanzi: "音乐", pinyin: "yīnyuè" },
    ],
    correctOptionId: 3,
  },
  {
    id: 7106,
    type: "flashcard",
    mandarin: { hanzi: "当然", pinyin: "Dāngrán" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "может быть", hanzi: "也许", pinyin: "yěxǔ" },
      { id: 2, english: "конечно, разумеется", hanzi: "当然", pinyin: "dāngrán" },
      { id: 3, english: "очень", hanzi: "很", pinyin: "hěn" },
      { id: 4, english: "тоже", hanzi: "也", pinyin: "yě" },
    ],
    correctOptionId: 2,
  },

  // ── 7-10 Fill-in-the-blank (选词填空 из книги стр. 68) ─────────
  {
    id: 7107,
    type: "fill_blank",
    sentence: "今天___六点，电影院有好电影。",
    sentencePinyin: "Jīntiān ___ liù diǎn, diànyǐngyuàn yǒu hǎo diànyǐng.",
    blankedWord: "晚上",
    correctAnswer: "晚上",
    hint: "время дня после 18:00",
    instruction: "Вставь пропущенное слово: «Сегодня вечером в 6 в кинотеатре хороший фильм.»",
    options: [
      { id: 1, hanzi: "早上", pinyin: "zǎoshang" },
      { id: 2, hanzi: "上午", pinyin: "shàngwǔ" },
      { id: 3, hanzi: "下午", pinyin: "xiàwǔ" },
      { id: 4, hanzi: "晚上", pinyin: "wǎnshang" },
    ],
  },
  {
    id: 7108,
    type: "fill_blank",
    sentence: "明天___我没有课，上午有。",
    sentencePinyin: "Míngtiān ___ wǒ méiyǒu kè, shàngwǔ yǒu.",
    blankedWord: "下午",
    correctAnswer: "下午",
    hint: "время после полудня (противоположность 上午)",
    instruction: "Вставь пропущенное слово: «Завтра днём у меня нет занятий, утром есть.»",
    options: [
      { id: 1, hanzi: "早上", pinyin: "zǎoshang" },
      { id: 2, hanzi: "上午", pinyin: "shàngwǔ" },
      { id: 3, hanzi: "下午", pinyin: "xiàwǔ" },
      { id: 4, hanzi: "晚上", pinyin: "wǎnshang" },
    ],
  },
  {
    id: 7109,
    type: "fill_blank",
    sentence: "我们___九点上课，十点半下课。",
    sentencePinyin: "Wǒmen ___ jiǔ diǎn shàngkè, shí diǎn bàn xiàkè.",
    blankedWord: "上午",
    correctAnswer: "上午",
    hint: "время до полудня (9-12)",
    instruction: "Вставь пропущенное слово: «У нас утром в 9 начало, в 10:30 конец.»",
    options: [
      { id: 1, hanzi: "早上", pinyin: "zǎoshang" },
      { id: 2, hanzi: "上午", pinyin: "shàngwǔ" },
      { id: 3, hanzi: "下午", pinyin: "xiàwǔ" },
      { id: 4, hanzi: "晚上", pinyin: "wǎnshang" },
    ],
  },
  {
    id: 7110,
    type: "fill_blank",
    sentence: "你明天___几点去清华大学?",
    sentencePinyin: "Nǐ míngtiān ___ jǐ diǎn qù Qīnghuá Dàxué?",
    blankedWord: "早上",
    correctAnswer: "早上",
    hint: "раннее утро (5-9)",
    instruction: "Вставь пропущенное слово: «Во сколько ты завтра утром едешь в Цинхуа?»",
    options: [
      { id: 1, hanzi: "早上", pinyin: "zǎoshang" },
      { id: 2, hanzi: "上午", pinyin: "shàngwǔ" },
      { id: 3, hanzi: "下午", pinyin: "xiàwǔ" },
      { id: 4, hanzi: "晚上", pinyin: "wǎnshang" },
    ],
  },

  // ── 11-13 Multiple choice (адаптация 完成对话 стр. 68) ────────
  {
    id: 7111,
    type: "multiple_choice",
    mandarin: { hanzi: "学校电影院今天晚上有电影，你去吗？", pinyin: "Xuéxiào diànyǐngyuàn jīntiān wǎnshang yǒu diànyǐng, nǐ qù ma?" },
    instruction: "«В кинотеатре вечером фильм, пойдёшь?» Ты хочешь сказать «конечно пойду!». Как правильно?",
    options: [
      {
        id: 1,
        english: "我当然去。",
        mandarin: {
          hanzi: "我当然去",
          pinyin: "Wǒ dāngrán qù",
          words: [
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "当然", pinyin: "dāngrán", english: "конечно" },
            { hanzi: "去", pinyin: "qù", english: "идти" },
          ],
          breakdown: "«Я конечно пойду!» 当然 ставится ПЕРЕД глаголом.",
        },
      },
      {
        id: 2,
        english: "我去当然。",
        mandarin: {
          hanzi: "我去当然",
          pinyin: "Wǒ qù dāngrán",
          words: [],
          breakdown: "Неправильный порядок: 当然 должно быть ПЕРЕД глаголом.",
        },
      },
      {
        id: 3,
        english: "当然不去。",
        mandarin: {
          hanzi: "当然不去",
          pinyin: "Dāngrán bú qù",
          words: [],
          breakdown: "«Конечно не пойду» — противоположный смысл.",
        },
      },
      {
        id: 4,
        english: "我有时间。",
        mandarin: {
          hanzi: "我有时间",
          pinyin: "Wǒ yǒu shíjiān",
          words: [],
          breakdown: "«У меня есть время» — не передаёт решимости «конечно пойду».",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 7112,
    type: "multiple_choice",
    mandarin: { hanzi: "你有自行车吧？", pinyin: "Nǐ yǒu zìxíngchē ba?" },
    instruction: "«У тебя же есть велосипед, верно?» У тебя нет велосипеда. Как правильно ответить?",
    options: [
      {
        id: 1,
        english: "没有，我没有自行车。",
        mandarin: {
          hanzi: "没有，我没有自行车",
          pinyin: "Méiyǒu, wǒ méiyǒu zìxíngchē",
          words: [
            { hanzi: "没有", pinyin: "méiyǒu", english: "не иметь" },
            { hanzi: "自行车", pinyin: "zìxíngchē", english: "велосипед" },
          ],
          breakdown: "Отрицательный ответ на 有. Помни: только 没有, не 不有.",
        },
      },
      {
        id: 2,
        english: "不有，我不有自行车。",
        mandarin: {
          hanzi: "不有，我不有自行车",
          pinyin: "Bù yǒu, wǒ bù yǒu zìxíngchē",
          words: [],
          breakdown: "Ошибка: 有 отрицается ТОЛЬКО через 没, никогда через 不.",
        },
      },
      {
        id: 3,
        english: "有，我有自行车。",
        mandarin: {
          hanzi: "有，我有自行车",
          pinyin: "Yǒu, wǒ yǒu zìxíngchē",
          words: [],
          breakdown: "«Есть, у меня есть велосипед» — противоположный смысл.",
        },
      },
      {
        id: 4,
        english: "当然。",
        mandarin: {
          hanzi: "当然",
          pinyin: "Dāngrán",
          words: [],
          breakdown: "«Конечно» — согласие, а ты должен отрицать.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 7113,
    type: "multiple_choice",
    mandarin: { hanzi: "今天晚上你有时间吗？", pinyin: "Jīntiān wǎnshang nǐ yǒu shíjiān ma?" },
    instruction: "«У тебя есть время сегодня вечером?» Как правильно ответить «У меня есть, а что?»?",
    options: [
      {
        id: 1,
        english: "有。有事吗？",
        mandarin: {
          hanzi: "有。有事吗",
          pinyin: "Yǒu. Yǒu shì ma",
          words: [
            { hanzi: "有", pinyin: "yǒu", english: "есть" },
            { hanzi: "事", pinyin: "shì", english: "дело" },
          ],
          breakdown: "«Есть. А что?» 有事吗 — стандартный встречный вопрос.",
        },
      },
      {
        id: 2,
        english: "没问题。",
        mandarin: {
          hanzi: "没问题",
          pinyin: "Méi wèntí",
          words: [],
          breakdown: "«Без проблем» — годится как согласие, но не спрашивает в ответ.",
        },
      },
      {
        id: 3,
        english: "听说。",
        mandarin: {
          hanzi: "听说",
          pinyin: "Tīngshuō",
          words: [],
          breakdown: "«Говорят» — вводная фраза, не ответ на вопрос о времени.",
        },
      },
      {
        id: 4,
        english: "我时间。",
        mandarin: {
          hanzi: "我时间",
          pinyin: "Wǒ shíjiān",
          words: [],
          breakdown: "Грамматически неполное: нужен глагол (有).",
        },
      },
    ],
    correctOptionId: 1,
  },

  // ── 14-15 Listening MC ─────────────────────────────────────────
  {
    id: 7114,
    type: "listening_mc",
    mandarin: {
      hanzi: "明天你有课吗",
      pinyin: "Míngtiān nǐ yǒu kè ma",
      words: [
        { hanzi: "明天", pinyin: "míngtiān", english: "завтра" },
        { hanzi: "你", pinyin: "nǐ", english: "ты" },
        { hanzi: "有", pinyin: "yǒu", english: "иметь" },
        { hanzi: "课", pinyin: "kè", english: "занятие" },
        { hanzi: "吗", pinyin: "ma", english: "(вопрос.)" },
      ],
      breakdown: "«У тебя завтра есть занятия?» Время ставится ПЕРЕД глаголом.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "У тебя завтра есть занятия? — 明天你有课吗" },
      { id: 2, english: "У тебя сегодня есть занятия? — 今天你有课吗" },
      { id: 3, english: "У тебя завтра есть время? — 明天你有时间吗" },
      { id: 4, english: "У тебя есть велосипед? — 你有自行车吗" },
    ],
    correctOptionId: 1,
  },
  {
    id: 7115,
    type: "listening_mc",
    mandarin: {
      hanzi: "我上午有课，下午没有",
      pinyin: "Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu",
      words: [
        { hanzi: "上午", pinyin: "shàngwǔ", english: "утро (до полудня)" },
        { hanzi: "有", pinyin: "yǒu", english: "иметь" },
        { hanzi: "课", pinyin: "kè", english: "занятие" },
        { hanzi: "下午", pinyin: "xiàwǔ", english: "после полудня" },
        { hanzi: "没有", pinyin: "méiyǒu", english: "не иметь" },
      ],
      breakdown: "«Утром есть занятия, днём — нет.» Противопоставление 上午/下午.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Утром есть, днём нет — 我上午有课，下午没有" },
      { id: 2, english: "Утром нет, днём есть — 我上午没有课，下午有" },
      { id: 3, english: "Завтра есть, сегодня нет — 我明天有课，今天没有" },
      { id: 4, english: "Я очень занят — 我很忙" },
    ],
    correctOptionId: 1,
  },

  // ── 16-17 Grammar ──────────────────────────────────────────────
  {
    id: 7116,
    type: "grammar",
    rule: {
      title: "Частица 吧 (ba) — подтверждение догадки",
      explanation:
        "吧 в конце вопроса означает «я так думаю — подтверди?». Говорящий почти уверен и просит подтверждения.\n\n" +
        "Схема: Утверждение + 吧？\n\n" +
        "你有自行车吧？— «У тебя ведь есть велосипед, правильно?»\n\n" +
        "Отличие от 吗:\n" +
        "• 你有自行车吗? — Просто вопрос «есть ли у тебя велосипед?» (не знаю)\n" +
        "• 你有自行车吧? — «У тебя же есть, верно?» (думаю что есть)\n\n" +
        "Это одно из значений 吧. Другое (предложение «давай») будет дальше.",
      examples: [
        { hanzi: "你有自行车吧？", pinyin: "Nǐ yǒu zìxíngchē ba?", english: "У тебя же есть велосипед, верно?" },
        { hanzi: "你是美国留学生吧？", pinyin: "Nǐ shì Měiguó liúxuéshēng ba?", english: "Ты ведь американский студент?" },
        { hanzi: "那是图书馆吧？", pinyin: "Nà shì túshūguǎn ba?", english: "То ведь библиотека?" },
      ],
    },
    practice: [
      {
        question: "Ты почти уверен что он китаец. Как спросить?",
        options: [
          { id: 1, text: "他是中国人吧？" },
          { id: 2, text: "他是中国人吗？" },
          { id: 3, text: "他是中国人不？" },
          { id: 4, text: "他吧中国人？" },
        ],
        correctOptionId: 1,
      },
      {
        question: "В чём разница между 你有课吗 и 你有课吧?",
        options: [
          { id: 1, text: "吗 — просто вопрос, 吧 — предположение «верно?»" },
          { id: 2, text: "Никакой, они одинаковые" },
          { id: 3, text: "吗 — положительный, 吧 — отрицательный" },
          { id: 4, text: "吗 — формальный, 吧 — грубый" },
        ],
        correctOptionId: 1,
      },
    ],
  },
  {
    id: 7117,
    type: "grammar",
    rule: {
      title: "Слова времени как обстоятельство",
      explanation:
        "Слова времени (今天, 明天, 晚上, 上午, 八点…) ставятся ПЕРЕД глаголом или в начале предложения.\n\n" +
        "Схема 1: Подлежащее + [Время] + Глагол + …\n" +
        "我明天八点有课。\n\n" +
        "Схема 2: [Время] + Подлежащее + Глагол + …\n" +
        "今天晚上你有时间吗？\n\n" +
        "Можно комбинировать несколько слов времени (от больших к меньшим):\n" +
        "今天晚上八点 — сегодня вечером в 8.\n" +
        "明天下午 — завтра днём.\n\n" +
        "❗ В китайском время НЕ ставится в конец:\n" +
        "❌ 我有课明天\n" +
        "✅ 我明天有课",
      examples: [
        { hanzi: "今天晚上你有时间吗？", pinyin: "Jīntiān wǎnshang nǐ yǒu shíjiān ma?", english: "У тебя есть время сегодня вечером?" },
        { hanzi: "我明天八点有课。", pinyin: "Wǒ míngtiān bā diǎn yǒu kè.", english: "У меня завтра в 8 занятия." },
        { hanzi: "大卫下午有事。", pinyin: "Dàwèi xiàwǔ yǒu shì.", english: "У Давэя днём дела." },
      ],
    },
    practice: [
      {
        question: "Как правильно сказать «Я завтра утром иду в библиотеку»?",
        options: [
          { id: 1, text: "我去图书馆明天上午" },
          { id: 2, text: "我明天上午去图书馆" },
          { id: 3, text: "明天去我上午图书馆" },
          { id: 4, text: "我去明天上午图书馆" },
        ],
        correctOptionId: 2,
      },
      {
        question: "Как правильно сказать «У меня сегодня вечером нет времени»?",
        options: [
          { id: 1, text: "我没有时间今天晚上" },
          { id: 2, text: "今天晚上我没有时间" },
          { id: 3, text: "我时间没有今天晚上" },
          { id: 4, text: "时间没有今天晚上我" },
        ],
        correctOptionId: 2,
      },
    ],
  },

  // ── 18 Match pairs ─────────────────────────────────────────────
  {
    id: 7118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "明天", leftPinyin: "míngtiān", right: "завтра" },
      { id: 2, left: "今天", leftPinyin: "jīntiān", right: "сегодня" },
      { id: 3, left: "上午", leftPinyin: "shàngwǔ", right: "до полудня" },
      { id: 4, left: "下午", leftPinyin: "xiàwǔ", right: "после полудня" },
      { id: 5, left: "晚上", leftPinyin: "wǎnshang", right: "вечер" },
      { id: 6, left: "自行车", leftPinyin: "zìxíngchē", right: "велосипед" },
      { id: 7, left: "电影", leftPinyin: "diànyǐng", right: "фильм" },
      { id: 8, left: "当然", leftPinyin: "dāngrán", right: "конечно" },
    ],
  },

  // ── 19-20 Single response ──────────────────────────────────────
  {
    id: 7119,
    type: "single_response",
    mandarin: { hanzi: "明天你有课吗？", pinyin: "Míngtiān nǐ yǒu kè ma?" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "У тебя завтра есть занятия?",
        mandarin: {
          hanzi: "明天你有课吗",
          pinyin: "Míngtiān nǐ yǒu kè ma",
          words: [
            { hanzi: "明天", pinyin: "míngtiān", english: "завтра" },
            { hanzi: "你", pinyin: "nǐ", english: "ты" },
            { hanzi: "有", pinyin: "yǒu", english: "иметь" },
            { hanzi: "课", pinyin: "kè", english: "занятие" },
            { hanzi: "吗", pinyin: "ma", english: "(вопрос.)" },
          ],
          breakdown: "Время (明天) + подлежащее + 有 + объект + 吗?",
        },
      },
    ],
  },
  {
    id: 7120,
    type: "single_response",
    mandarin: { hanzi: "今天晚上你有时间吗？", pinyin: "Jīntiān wǎnshang nǐ yǒu shíjiān ma?" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "У тебя есть время сегодня вечером?",
        mandarin: {
          hanzi: "今天晚上你有时间吗",
          pinyin: "Jīntiān wǎnshang nǐ yǒu shíjiān ma",
          words: [
            { hanzi: "今天", pinyin: "jīntiān", english: "сегодня" },
            { hanzi: "晚上", pinyin: "wǎnshang", english: "вечер" },
            { hanzi: "有", pinyin: "yǒu", english: "иметь" },
            { hanzi: "时间", pinyin: "shíjiān", english: "время" },
          ],
          breakdown: "Сочетание слов времени от большего к меньшему: 今天 + 晚上.",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch7 = data.chapters.find((c) => c.id === 7);
if (!ch7) {
  console.error("Chapter 7 not found!");
  process.exit(1);
}

ch7.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 7 exercises added:", questions.length);
console.log("Distribution:", counts);
