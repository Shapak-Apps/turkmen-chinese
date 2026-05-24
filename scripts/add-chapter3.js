/**
 * Adds 20 exercises to Chapter 3 (那是你的书吗) based on Boya Chinese Elementary I
 * 课堂练习 section — pages 42-43 of the book.
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
  // ── 1-6 Flashcards (key vocabulary from book Ch3) ────────────────
  {
    id: 3101,
    type: "flashcard",
    mandarin: { hanzi: "那", pinyin: "Nà" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "это, этот", hanzi: "这", pinyin: "zhè" },
      { id: 2, english: "то, тот", hanzi: "那", pinyin: "nà" },
      { id: 3, english: "какой", hanzi: "哪", pinyin: "nǎ" },
      { id: 4, english: "что", hanzi: "什么", pinyin: "shénme" },
    ],
    correctOptionId: 2,
  },
  {
    id: 3102,
    type: "flashcard",
    mandarin: { hanzi: "书", pinyin: "Shū" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "учебник", hanzi: "课本", pinyin: "kèběn" },
      { id: 2, english: "словарь", hanzi: "词典", pinyin: "cídiǎn" },
      { id: 3, english: "журнал", hanzi: "杂志", pinyin: "zázhì" },
      { id: 4, english: "книга", hanzi: "书", pinyin: "shū" },
    ],
    correctOptionId: 4,
  },
  {
    id: 3103,
    type: "flashcard",
    mandarin: { hanzi: "同屋", pinyin: "Tóngwū" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "одноклассник", hanzi: "同学", pinyin: "tóngxué" },
      { id: 2, english: "друг", hanzi: "朋友", pinyin: "péngyou" },
      { id: 3, english: "сосед по комнате", hanzi: "同屋", pinyin: "tóngwū" },
      { id: 4, english: "учитель", hanzi: "老师", pinyin: "lǎoshī" },
    ],
    correctOptionId: 3,
  },
  {
    id: 3104,
    type: "flashcard",
    mandarin: { hanzi: "课本", pinyin: "Kèběn" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "учебник", hanzi: "课本", pinyin: "kèběn" },
      { id: 2, english: "книга", hanzi: "书", pinyin: "shū" },
      { id: 3, english: "словарь", hanzi: "词典", pinyin: "cídiǎn" },
      { id: 4, english: "журнал", hanzi: "杂志", pinyin: "zázhì" },
    ],
    correctOptionId: 1,
  },
  {
    id: 3105,
    type: "flashcard",
    mandarin: { hanzi: "词典", pinyin: "Cídiǎn" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "учебник", hanzi: "课本", pinyin: "kèběn" },
      { id: 2, english: "книга", hanzi: "书", pinyin: "shū" },
      { id: 3, english: "журнал", hanzi: "杂志", pinyin: "zázhì" },
      { id: 4, english: "словарь", hanzi: "词典", pinyin: "cídiǎn" },
    ],
    correctOptionId: 4,
  },
  {
    id: 3106,
    type: "flashcard",
    mandarin: { hanzi: "杂志", pinyin: "Zázhì" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "учебник", hanzi: "课本", pinyin: "kèběn" },
      { id: 2, english: "журнал", hanzi: "杂志", pinyin: "zázhì" },
      { id: 3, english: "книга", hanzi: "书", pinyin: "shū" },
      { id: 4, english: "музыка", hanzi: "音乐", pinyin: "yīnyuè" },
    ],
    correctOptionId: 2,
  },

  // ── 7-10 Fill-in-the-blank (选词填空 из книги стр. 42) ────────
  {
    id: 3107,
    type: "fill_blank",
    sentence: "___是你的课本?",
    sentencePinyin: "___ shì nǐ de kèběn?",
    blankedWord: "这",
    correctAnswer: "这",
    hint: "указательное «это» (близкий предмет)",
    instruction: "Вставь пропущенное слово: «Это твой учебник?»",
    options: [
      { id: 1, hanzi: "这", pinyin: "zhè" },
      { id: 2, hanzi: "那", pinyin: "nà" },
      { id: 3, hanzi: "谁", pinyin: "shéi" },
      { id: 4, hanzi: "哪", pinyin: "nǎ" },
    ],
  },
  {
    id: 3108,
    type: "fill_blank",
    sentence: "那是___的书?",
    sentencePinyin: "Nà shì ___ de shū?",
    blankedWord: "谁",
    correctAnswer: "谁",
    hint: "вопросительное слово «кто»",
    instruction: "Вставь пропущенное слово: «Чья та книга?»",
    options: [
      { id: 1, hanzi: "什么", pinyin: "shénme" },
      { id: 2, hanzi: "谁", pinyin: "shéi" },
      { id: 3, hanzi: "哪", pinyin: "nǎ" },
      { id: 4, hanzi: "这", pinyin: "zhè" },
    ],
  },
  {
    id: 3109,
    type: "fill_blank",
    sentence: "这是___书?",
    sentencePinyin: "Zhè shì ___ shū?",
    blankedWord: "什么",
    correctAnswer: "什么",
    hint: "вопросительное слово «что, какой»",
    instruction: "Вставь пропущенное слово: «Что это за книга?»",
    options: [
      { id: 1, hanzi: "谁", pinyin: "shéi" },
      { id: 2, hanzi: "哪", pinyin: "nǎ" },
      { id: 3, hanzi: "什么", pinyin: "shénme" },
      { id: 4, hanzi: "也", pinyin: "yě" },
    ],
  },
  {
    id: 3110,
    type: "fill_blank",
    sentence: "这是我___课本。",
    sentencePinyin: "Zhè shì wǒ ___ kèběn.",
    blankedWord: "的",
    correctAnswer: "的",
    hint: "притяжательная частица «мой»",
    instruction: "Вставь пропущенное слово: «Это мой учебник.»",
    options: [
      { id: 1, hanzi: "的", pinyin: "de" },
      { id: 2, hanzi: "也", pinyin: "yě" },
      { id: 3, hanzi: "是", pinyin: "shì" },
      { id: 4, hanzi: "不", pinyin: "bù" },
    ],
  },

  // ── 11-13 Multiple choice (адаптация 替换练习 и 完成对话, стр. 42-43) ─
  {
    id: 3111,
    type: "multiple_choice",
    mandarin: { hanzi: "那是谁的书？", pinyin: "Nà shì shéi de shū?" },
    instruction: "«Чья та книга?» Если это книга учителя, как ответить?",
    options: [
      {
        id: 1,
        english: "那是老师的书。",
        mandarin: {
          hanzi: "那是老师的书",
          pinyin: "Nà shì lǎoshī de shū",
          words: [
            { hanzi: "那", pinyin: "nà", english: "то" },
            { hanzi: "是", pinyin: "shì", english: "быть" },
            { hanzi: "老师", pinyin: "lǎoshī", english: "учитель" },
            { hanzi: "的", pinyin: "de", english: "(частица)" },
            { hanzi: "书", pinyin: "shū", english: "книга" },
          ],
          breakdown: "«Это книга учителя.» Схема: A + 的 + B.",
        },
      },
      {
        id: 2,
        english: "那是什么书？",
        mandarin: {
          hanzi: "那是什么书",
          pinyin: "Nà shì shénme shū",
          words: [],
          breakdown: "«Что это за книга?» — встречный вопрос, не ответ.",
        },
      },
      {
        id: 3,
        english: "那是哪本书？",
        mandarin: {
          hanzi: "那是哪本书",
          pinyin: "Nà shì nǎ běn shū",
          words: [],
          breakdown: "«Которая книга?» — вопрос, не ответ.",
        },
      },
      {
        id: 4,
        english: "我很高兴。",
        mandarin: {
          hanzi: "我很高兴",
          pinyin: "Wǒ hěn gāoxìng",
          words: [],
          breakdown: "«Я очень рад» — не по теме.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 3112,
    type: "multiple_choice",
    mandarin: { hanzi: "这是什么书？", pinyin: "Zhè shì shénme shū?" },
    instruction: "«Что это за книга?» Если это учебник китайского, как ответить?",
    options: [
      {
        id: 1,
        english: "这是汉语课本。",
        mandarin: {
          hanzi: "这是汉语课本",
          pinyin: "Zhè shì Hànyǔ kèběn",
          words: [
            { hanzi: "这", pinyin: "zhè", english: "это" },
            { hanzi: "汉语", pinyin: "Hànyǔ", english: "китайский язык" },
            { hanzi: "课本", pinyin: "kèběn", english: "учебник" },
          ],
          breakdown: "«Это учебник китайского.» Определение + определяемое.",
        },
      },
      {
        id: 2,
        english: "这是谁的书？",
        mandarin: {
          hanzi: "这是谁的书",
          pinyin: "Zhè shì shéi de shū",
          words: [],
          breakdown: "«Чья это книга?» — вопрос, не ответ.",
        },
      },
      {
        id: 3,
        english: "这是我的。",
        mandarin: {
          hanzi: "这是我的",
          pinyin: "Zhè shì wǒ de",
          words: [],
          breakdown: "«Это моё» — говорит о принадлежности, а спрашивают о типе.",
        },
      },
      {
        id: 4,
        english: "这是什么？",
        mandarin: {
          hanzi: "这是什么",
          pinyin: "Zhè shì shénme",
          words: [],
          breakdown: "«Что это?» — вопрос, не ответ.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 3113,
    type: "multiple_choice",
    mandarin: { hanzi: "是你的杂志吗？", pinyin: "Shì nǐ de zázhì ma?" },
    instruction: "«Это твой журнал?» Журнал твоего друга. Как правильно ответить?",
    options: [
      {
        id: 1,
        english: "是，是我的。",
        mandarin: {
          hanzi: "是，是我的",
          pinyin: "Shì, shì wǒ de",
          words: [],
          breakdown: "«Да, это моё» — неверно, журнал не твой.",
        },
      },
      {
        id: 2,
        english: "不是，是我朋友的。",
        mandarin: {
          hanzi: "不是，是我朋友的",
          pinyin: "Bú shì, shì wǒ péngyou de",
          words: [
            { hanzi: "不", pinyin: "bù", english: "нет" },
            { hanzi: "朋友", pinyin: "péngyou", english: "друг" },
            { hanzi: "的", pinyin: "de", english: "(притяж.)" },
          ],
          breakdown: "«Нет, это (журнал) моего друга.» После 的 существительное можно опустить.",
        },
      },
      {
        id: 3,
        english: "是什么杂志？",
        mandarin: {
          hanzi: "是什么杂志",
          pinyin: "Shì shénme zázhì",
          words: [],
          breakdown: "«Что это за журнал?» — вопрос, не ответ.",
        },
      },
      {
        id: 4,
        english: "我不知道。",
        mandarin: {
          hanzi: "我不知道",
          pinyin: "Wǒ bù zhīdào",
          words: [],
          breakdown: "«Я не знаю» — не подходит, ты знаешь чей он.",
        },
      },
    ],
    correctOptionId: 2,
  },

  // ── 14-15 Listening MC (фразы из диалогов Главы 3) ────────────
  {
    id: 3114,
    type: "listening_mc",
    mandarin: {
      hanzi: "这是我的课本",
      pinyin: "Zhè shì wǒ de kèběn",
      words: [
        { hanzi: "这", pinyin: "zhè", english: "это" },
        { hanzi: "是", pinyin: "shì", english: "быть" },
        { hanzi: "我", pinyin: "wǒ", english: "я" },
        { hanzi: "的", pinyin: "de", english: "(притяжат.)" },
        { hanzi: "课本", pinyin: "kèběn", english: "учебник" },
      ],
      breakdown: "«Это мой учебник.» Схема: 这/那 + 是 + А + 的 + B.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Это мой учебник — 这是我的课本" },
      { id: 2, english: "Это моя книга — 这是我的书" },
      { id: 3, english: "Та моя книга — 那是我的书" },
      { id: 4, english: "Это мой словарь — 这是我的词典" },
    ],
    correctOptionId: 1,
  },
  {
    id: 3115,
    type: "listening_mc",
    mandarin: {
      hanzi: "那是谁的书",
      pinyin: "Nà shì shéi de shū",
      words: [
        { hanzi: "那", pinyin: "nà", english: "то" },
        { hanzi: "谁", pinyin: "shéi", english: "кто" },
        { hanzi: "的", pinyin: "de", english: "(притяжат.)" },
        { hanzi: "书", pinyin: "shū", english: "книга" },
      ],
      breakdown: "«Чья та книга?» 谁 ставится на место ответа.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Что это за книга? — 这是什么书" },
      { id: 2, english: "Чья та книга? — 那是谁的书" },
      { id: 3, english: "Чей это учебник? — 这是谁的课本" },
      { id: 4, english: "Это твоя книга? — 这是你的书吗" },
    ],
    correctOptionId: 2,
  },

  // ── 16-17 Grammar (из Language Points Главы 3) ───────────────
  {
    id: 3116,
    type: "grammar",
    rule: {
      title: "Указательные 这 (zhè) и 那 (nà)",
      explanation:
        "这 — «это» (предмет близко к говорящему).\n" +
        "那 — «то» (предмет подальше).\n\n" +
        "Схема: 这/那 + 是 + Существительное\n\n" +
        "Часто используется с 的 для указания принадлежности:\n" +
        "这是我的书。— Это моя книга.\n" +
        "那是老师的词典。— Тот словарь — учительский.\n\n" +
        "В отрицании: 这/那 + 不是 + ...",
      examples: [
        { hanzi: "这是汉语课本。", pinyin: "Zhè shì Hànyǔ kèběn.", english: "Это учебник китайского." },
        { hanzi: "那是音乐杂志。", pinyin: "Nà shì yīnyuè zázhì.", english: "То — музыкальный журнал." },
        { hanzi: "那不是我的词典。", pinyin: "Nà bú shì wǒ de cídiǎn.", english: "Тот словарь не мой." },
      ],
    },
    practice: [
      {
        question: "Предмет у тебя в руке. Как сказать «Это моя книга»?",
        options: [
          { id: 1, text: "那是我的书" },
          { id: 2, text: "这是我的书" },
          { id: 3, text: "哪是我的书" },
          { id: 4, text: "这是书我的" },
        ],
        correctOptionId: 2,
      },
      {
        question: "Предмет на столе напротив. Как сказать «Тот учебник — не мой»?",
        options: [
          { id: 1, text: "这不是我的课本" },
          { id: 2, text: "那是我的课本" },
          { id: 3, text: "那不是我的课本" },
          { id: 4, text: "那我不是的课本" },
        ],
        correctOptionId: 3,
      },
    ],
  },
  {
    id: 3117,
    type: "grammar",
    rule: {
      title: "Частица 的 (de) — принадлежность и определение",
      explanation:
        "的 ставится между определением и определяемым словом.\n\n" +
        "Схема: A + 的 + B  =  «B, принадлежащее/относящееся к A»\n\n" +
        "我的书 — моя книга\n" +
        "老师的词典 — словарь учителя\n" +
        "玛丽的朋友 — друг Мэри\n\n" +
        "С местоимениями 我/你/他 и близкими отношениями 的 можно опускать:\n" +
        "我朋友 (мой друг), 我同屋 (мой сосед по комнате).\n\n" +
        "С обычными вещами 的 обязательно: 我的书, 我的词典.",
      examples: [
        { hanzi: "这是我的课本。", pinyin: "Zhè shì wǒ de kèběn.", english: "Это мой учебник." },
        { hanzi: "那是谁的书？", pinyin: "Nà shì shéi de shū?", english: "Чья это книга?" },
        { hanzi: "那是我同屋的书。", pinyin: "Nà shì wǒ tóngwū de shū.", english: "Та книга — моего соседа по комнате." },
      ],
    },
    practice: [
      {
        question: "Как правильно сказать «Это учебник учителя»?",
        options: [
          { id: 1, text: "这是老师的课本" },
          { id: 2, text: "这是老师课本的" },
          { id: 3, text: "这是的老师课本" },
          { id: 4, text: "这是课本老师的" },
        ],
        correctOptionId: 1,
      },
      {
        question: "Как правильно ответить «Да, это моего друга» (журнал)?",
        options: [
          { id: 1, text: "是，是朋友我的" },
          { id: 2, text: "是，是我朋友" },
          { id: 3, text: "是，是我朋友的" },
          { id: 4, text: "是，是的我朋友" },
        ],
        correctOptionId: 3,
      },
    ],
  },

  // ── 18 Match pairs ────────────────────────────────────────────
  {
    id: 3118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "书", leftPinyin: "shū", right: "книга" },
      { id: 2, left: "课本", leftPinyin: "kèběn", right: "учебник" },
      { id: 3, left: "词典", leftPinyin: "cídiǎn", right: "словарь" },
      { id: 4, left: "杂志", leftPinyin: "zázhì", right: "журнал" },
      { id: 5, left: "同屋", leftPinyin: "tóngwū", right: "сосед по комнате" },
      { id: 6, left: "汉语", leftPinyin: "Hànyǔ", right: "китайский язык" },
      { id: 7, left: "日语", leftPinyin: "Rìyǔ", right: "японский язык" },
      { id: 8, left: "音乐", leftPinyin: "yīnyuè", right: "музыка" },
    ],
  },

  // ── 19-20 Single response (из диалогов Главы 3) ───────────────
  {
    id: 3119,
    type: "single_response",
    mandarin: { hanzi: "这是我的课本。", pinyin: "Zhè shì wǒ de kèběn." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Это мой учебник.",
        mandarin: {
          hanzi: "这是我的课本",
          pinyin: "Zhè shì wǒ de kèběn",
          words: [
            { hanzi: "这", pinyin: "zhè", english: "это" },
            { hanzi: "是", pinyin: "shì", english: "быть" },
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "的", pinyin: "de", english: "(притяж.)" },
            { hanzi: "课本", pinyin: "kèběn", english: "учебник" },
          ],
          breakdown: "Это + быть + я + (мой) + учебник = «Это мой учебник».",
        },
      },
    ],
  },
  {
    id: 3120,
    type: "single_response",
    mandarin: { hanzi: "那是谁的书？", pinyin: "Nà shì shéi de shū?" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Чья та книга?",
        mandarin: {
          hanzi: "那是谁的书",
          pinyin: "Nà shì shéi de shū",
          words: [
            { hanzi: "那", pinyin: "nà", english: "то" },
            { hanzi: "是", pinyin: "shì", english: "быть" },
            { hanzi: "谁", pinyin: "shéi", english: "кто" },
            { hanzi: "的", pinyin: "de", english: "(притяж.)" },
            { hanzi: "书", pinyin: "shū", english: "книга" },
          ],
          breakdown: "谁 ставится на место ответа: 那是(老师)的书 → 那是(谁)的书?",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch3 = data.chapters.find((c) => c.id === 3);
if (!ch3) {
  console.error("Chapter 3 not found!");
  process.exit(1);
}

ch3.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 3 exercises added:", questions.length);
console.log("Distribution:", counts);
