/**
 * Adds 20 exercises to Chapter 2 based on Boya Chinese Elementary I
 * 课堂练习 (Exercises in Class) section — pages 35-37 of the book.
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
  // ── 1-6 Flashcards (vocabulary from book Ch2) ─────────────────────
  {
    id: 2101,
    type: "flashcard",
    mandarin: { hanzi: "同学", pinyin: "Tóngxué" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "одноклассник, однокурсник", hanzi: "同学", pinyin: "tóngxué" },
      { id: 2, english: "учитель", hanzi: "老师", pinyin: "lǎoshī" },
      { id: 3, english: "друг", hanzi: "朋友", pinyin: "péngyou" },
      { id: 4, english: "студент", hanzi: "学生", pinyin: "xuésheng" },
    ],
    correctOptionId: 1,
  },
  {
    id: 2102,
    type: "flashcard",
    mandarin: { hanzi: "介绍", pinyin: "Jièshào" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "звать, называться", hanzi: "叫", pinyin: "jiào" },
      { id: 2, english: "представлять, знакомить", hanzi: "介绍", pinyin: "jièshào" },
      { id: 3, english: "знакомиться", hanzi: "认识", pinyin: "rènshi" },
      { id: 4, english: "приходить", hanzi: "来", pinyin: "lái" },
    ],
    correctOptionId: 2,
  },
  {
    id: 2103,
    type: "flashcard",
    mandarin: { hanzi: "认识", pinyin: "Rènshi" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "знать (факт)", hanzi: "知道", pinyin: "zhīdào" },
      { id: 2, english: "представлять", hanzi: "介绍", pinyin: "jièshào" },
      { id: 3, english: "знакомиться, знать (человека)", hanzi: "认识", pinyin: "rènshi" },
      { id: 4, english: "быть", hanzi: "是", pinyin: "shì" },
    ],
    correctOptionId: 3,
  },
  {
    id: 2104,
    type: "flashcard",
    mandarin: { hanzi: "高兴", pinyin: "Gāoxìng" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "хороший", hanzi: "好", pinyin: "hǎo" },
      { id: 2, english: "рад, радостный", hanzi: "高兴", pinyin: "gāoxìng" },
      { id: 3, english: "очень", hanzi: "很", pinyin: "hěn" },
      { id: 4, english: "спасибо", hanzi: "谢谢", pinyin: "xièxie" },
    ],
    correctOptionId: 2,
  },
  {
    id: 2105,
    type: "flashcard",
    mandarin: { hanzi: "朋友", pinyin: "Péngyou" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "одноклассник", hanzi: "同学", pinyin: "tóngxué" },
      { id: 2, english: "учитель", hanzi: "老师", pinyin: "lǎoshī" },
      { id: 3, english: "студент", hanzi: "学生", pinyin: "xuésheng" },
      { id: 4, english: "друг", hanzi: "朋友", pinyin: "péngyou" },
    ],
    correctOptionId: 4,
  },
  {
    id: 2106,
    type: "flashcard",
    mandarin: { hanzi: "国", pinyin: "Guó" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "страна", hanzi: "国", pinyin: "guó" },
      { id: 2, english: "человек", hanzi: "人", pinyin: "rén" },
      { id: 3, english: "имя", hanzi: "名字", pinyin: "míngzi" },
      { id: 4, english: "фамилия", hanzi: "姓", pinyin: "xìng" },
    ],
    correctOptionId: 1,
  },

  // ── 7-10 Fill-in-the-blank (选词填空 из книги, стр. 36) ────────────
  {
    id: 2107,
    type: "fill_blank",
    sentence: "你叫___名字？",
    sentencePinyin: "Nǐ jiào ___ míngzi?",
    blankedWord: "什么",
    correctAnswer: "什么",
    hint: "вопросительное слово «что, какой»",
    instruction: "Вставь пропущенное слово: «Как тебя зовут?»",
    options: [
      { id: 1, hanzi: "哪", pinyin: "nǎ" },
      { id: 2, hanzi: "呢", pinyin: "ne" },
      { id: 3, hanzi: "什么", pinyin: "shénme" },
      { id: 4, hanzi: "吗", pinyin: "ma" },
    ],
  },
  {
    id: 2108,
    type: "fill_blank",
    sentence: "我是学生，你___？",
    sentencePinyin: "Wǒ shì xuésheng, nǐ ___?",
    blankedWord: "呢",
    correctAnswer: "呢",
    hint: "частица встречного вопроса «а ты?»",
    instruction: "Вставь пропущенное слово: «Я студент, а ты?»",
    options: [
      { id: 1, hanzi: "哪", pinyin: "nǎ" },
      { id: 2, hanzi: "呢", pinyin: "ne" },
      { id: 3, hanzi: "什么", pinyin: "shénme" },
      { id: 4, hanzi: "吗", pinyin: "ma" },
    ],
  },
  {
    id: 2109,
    type: "fill_blank",
    sentence: "大卫是___国人？",
    sentencePinyin: "Dàwèi shì ___ guó rén?",
    blankedWord: "哪",
    correctAnswer: "哪",
    hint: "вопросительное слово «какой, который»",
    instruction: "Вставь пропущенное слово: «Давэй из какой страны?»",
    options: [
      { id: 1, hanzi: "哪", pinyin: "nǎ" },
      { id: 2, hanzi: "呢", pinyin: "ne" },
      { id: 3, hanzi: "什么", pinyin: "shénme" },
      { id: 4, hanzi: "吗", pinyin: "ma" },
    ],
  },
  {
    id: 2110,
    type: "fill_blank",
    sentence: "你们是留学生___?",
    sentencePinyin: "Nǐmen shì liúxuéshēng ___?",
    blankedWord: "吗",
    correctAnswer: "吗",
    hint: "вопросительная частица",
    instruction: "Вставь пропущенное слово: «Вы иностранные студенты?»",
    options: [
      { id: 1, hanzi: "哪", pinyin: "nǎ" },
      { id: 2, hanzi: "呢", pinyin: "ne" },
      { id: 3, hanzi: "什么", pinyin: "shénme" },
      { id: 4, hanzi: "吗", pinyin: "ma" },
    ],
  },

  // ── 11-13 Multiple choice (адаптация 替换练习, стр. 36) ──────────
  {
    id: 2111,
    type: "multiple_choice",
    mandarin: { hanzi: "你是美国人吗？", pinyin: "Nǐ shì Měiguó rén ma?" },
    instruction: "На вопрос «Ты американец?» ты хочешь ответить что ты канадец. Как правильно?",
    options: [
      {
        id: 1,
        english: "不，我是加拿大人。",
        mandarin: {
          hanzi: "不，我是加拿大人",
          pinyin: "Bù, wǒ shì Jiānádà rén",
          words: [
            { hanzi: "不", pinyin: "bù", english: "нет" },
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "是", pinyin: "shì", english: "быть" },
            { hanzi: "加拿大", pinyin: "Jiānádà", english: "Канада" },
            { hanzi: "人", pinyin: "rén", english: "человек" },
          ],
          breakdown: "«Нет, я канадец.» Отрицание через 不 + страна + 人.",
        },
      },
      {
        id: 2,
        english: "是，我是美国人。",
        mandarin: {
          hanzi: "是，我是美国人",
          pinyin: "Shì, wǒ shì Měiguó rén",
          words: [
            { hanzi: "是", pinyin: "shì", english: "да" },
            { hanzi: "美国", pinyin: "Měiguó", english: "Америка" },
          ],
          breakdown: "«Да, я американец» — неверный ответ, если ты из Канады.",
        },
      },
      {
        id: 3,
        english: "我叫大卫。",
        mandarin: {
          hanzi: "我叫大卫",
          pinyin: "Wǒ jiào Dàwèi",
          words: [
            { hanzi: "叫", pinyin: "jiào", english: "зваться" },
          ],
          breakdown: "«Меня зовут Давэй» — это ответ на вопрос об имени, не о стране.",
        },
      },
      {
        id: 4,
        english: "你好！",
        mandarin: {
          hanzi: "你好",
          pinyin: "Nǐ hǎo",
          words: [{ hanzi: "你好", pinyin: "nǐ hǎo", english: "привет" }],
          breakdown: "Это приветствие, не ответ на вопрос.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 2112,
    type: "multiple_choice",
    mandarin: { hanzi: "他是美国留学生，你呢？", pinyin: "Tā shì Měiguó liúxuéshēng, nǐ ne?" },
    instruction: "«Он американский студент, а ты?» Ты тоже американский студент. Как ответить?",
    options: [
      {
        id: 1,
        english: "我也是美国留学生。",
        mandarin: {
          hanzi: "我也是美国留学生",
          pinyin: "Wǒ yě shì Měiguó liúxuéshēng",
          words: [
            { hanzi: "也", pinyin: "yě", english: "тоже" },
            { hanzi: "美国", pinyin: "Měiguó", english: "Америка" },
            { hanzi: "留学生", pinyin: "liúxuéshēng", english: "иностр. студент" },
          ],
          breakdown: "Правильный ответ с 也 (тоже) перед сказуемым.",
        },
      },
      {
        id: 2,
        english: "我是美国留学生也。",
        mandarin: {
          hanzi: "我是美国留学生也",
          pinyin: "Wǒ shì Měiguó liúxuéshēng yě",
          words: [],
          breakdown: "Ошибка: 也 НЕ ставится в конец предложения.",
        },
      },
      {
        id: 3,
        english: "他不是美国人。",
        mandarin: {
          hanzi: "他不是美国人",
          pinyin: "Tā bú shì Měiguó rén",
          words: [],
          breakdown: "«Он не американец» — неверно по смыслу.",
        },
      },
      {
        id: 4,
        english: "你好！",
        mandarin: {
          hanzi: "你好",
          pinyin: "Nǐ hǎo",
          words: [],
          breakdown: "Это приветствие, не ответ.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 2113,
    type: "multiple_choice",
    mandarin: { hanzi: "认识你很高兴。", pinyin: "Rènshi nǐ hěn gāoxìng." },
    instruction: "На фразу «Очень приятно познакомиться» ты хочешь сказать «и мне тоже». Как правильно?",
    options: [
      {
        id: 1,
        english: "我也很高兴。",
        mandarin: {
          hanzi: "我也很高兴",
          pinyin: "Wǒ yě hěn gāoxìng",
          words: [
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "也", pinyin: "yě", english: "тоже" },
            { hanzi: "很", pinyin: "hěn", english: "очень" },
            { hanzi: "高兴", pinyin: "gāoxìng", english: "рад" },
          ],
          breakdown: "«Я тоже очень рад.» Типичный ответ при знакомстве.",
        },
      },
      {
        id: 2,
        english: "我是美国人。",
        mandarin: {
          hanzi: "我是美国人",
          pinyin: "Wǒ shì Měiguó rén",
          words: [],
          breakdown: "«Я американец» — не ответ на радость знакомства.",
        },
      },
      {
        id: 3,
        english: "你呢？",
        mandarin: {
          hanzi: "你呢",
          pinyin: "Nǐ ne",
          words: [],
          breakdown: "«А ты?» — встречный вопрос, не выражение своих чувств.",
        },
      },
      {
        id: 4,
        english: "不客气。",
        mandarin: {
          hanzi: "不客气",
          pinyin: "Bú kèqi",
          words: [],
          breakdown: "«Не за что» — ответ на спасибо, не на знакомство.",
        },
      },
    ],
    correctOptionId: 1,
  },

  // ── 14-15 Listening MC (based on key phrases from Ch2 dialogues) ─
  {
    id: 2114,
    type: "listening_mc",
    mandarin: {
      hanzi: "我是中国人",
      pinyin: "Wǒ shì Zhōngguó rén",
      words: [
        { hanzi: "我", pinyin: "wǒ", english: "я" },
        { hanzi: "是", pinyin: "shì", english: "быть" },
        { hanzi: "中国", pinyin: "Zhōngguó", english: "Китай" },
        { hanzi: "人", pinyin: "rén", english: "человек" },
      ],
      breakdown: "«Я китаец.» Страна + 人 = национальность.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Я китаец — 我是中国人" },
      { id: 2, english: "Я американец — 我是美国人" },
      { id: 3, english: "Он китаец — 他是中国人" },
      { id: 4, english: "Я студент — 我是学生" },
    ],
    correctOptionId: 1,
  },
  {
    id: 2115,
    type: "listening_mc",
    mandarin: {
      hanzi: "认识你很高兴",
      pinyin: "Rènshi nǐ hěn gāoxìng",
      words: [
        { hanzi: "认识", pinyin: "rènshi", english: "знакомиться" },
        { hanzi: "你", pinyin: "nǐ", english: "ты" },
        { hanzi: "很", pinyin: "hěn", english: "очень" },
        { hanzi: "高兴", pinyin: "gāoxìng", english: "рад" },
      ],
      breakdown: "«Очень приятно познакомиться.» Стандартная фраза при знакомстве.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Очень приятно познакомиться — 认识你很高兴" },
      { id: 2, english: "Я очень рад — 我很高兴" },
      { id: 3, english: "Я не рад — 我不高兴" },
      { id: 4, english: "Очень хорошо — 很好" },
    ],
    correctOptionId: 1,
  },

  // ── 16-17 Grammar (из Language Points, стр. 34-35 + упр. 用"也" и 用"呢" стр. 37) ──
  {
    id: 2116,
    type: "grammar",
    rule: {
      title: "Наречие 也 (yě) — «тоже»",
      explanation:
        "也 ставится ПЕРЕД глаголом или прилагательным и указывает на сходство.\n\n" +
        "Схема: Подлежащее + 也 + Глагол/Прил.\n\n" +
        "Важно: 也 НЕ ставится в конец предложения (в отличие от русского «тоже»).\n\n" +
        "❌ Неправильно: 我是学生也。\n" +
        "✅ Правильно: 我也是学生。",
      examples: [
        { hanzi: "他是学生，我也是学生。", pinyin: "Tā shì xuésheng, wǒ yě shì xuésheng.", english: "Он студент, и я тоже студент." },
        { hanzi: "我也很高兴。", pinyin: "Wǒ yě hěn gāoxìng.", english: "Я тоже очень рад." },
        { hanzi: "你不是老师，他也不是老师。", pinyin: "Nǐ bú shì lǎoshī, tā yě bú shì lǎoshī.", english: "Ты не учитель, и он тоже не учитель." },
      ],
    },
    practice: [
      {
        question: "Как правильно сказать «Он тоже американец»?",
        options: [
          { id: 1, text: "他也是美国人" },
          { id: 2, text: "他是美国人也" },
          { id: 3, text: "也他是美国人" },
          { id: 4, text: "他是也美国人" },
        ],
        correctOptionId: 1,
      },
      {
        question: "Как правильно сказать «Я тоже не учитель»?",
        options: [
          { id: 1, text: "我不是也老师" },
          { id: 2, text: "我也不是老师" },
          { id: 3, text: "也我不是老师" },
          { id: 4, text: "我不也是老师" },
        ],
        correctOptionId: 2,
      },
    ],
  },
  {
    id: 2117,
    type: "grammar",
    rule: {
      title: "Частица 呢 (ne) — встречный вопрос",
      explanation:
        "呢 ставится в конец короткого встречного вопроса. Это сокращение — вместо того чтобы повторять весь вопрос.\n\n" +
        "Схема: Существительное/Местоимение + 呢？\n\n" +
        "Смысл 呢 берётся из контекста предыдущего предложения:\n" +
        "• После вопроса про имя → 你呢？ = «А как тебя зовут?»\n" +
        "• После вопроса про страну → 你呢？ = «А ты откуда?»",
      examples: [
        { hanzi: "我是美国人，你呢？", pinyin: "Wǒ shì Měiguó rén, nǐ ne?", english: "Я американец, а ты?" },
        { hanzi: "我叫大卫，她呢？", pinyin: "Wǒ jiào Dàwèi, tā ne?", english: "Меня зовут Давэй, а её?" },
        { hanzi: "我很高兴，你呢？", pinyin: "Wǒ hěn gāoxìng, nǐ ne?", english: "Я очень рад, а ты?" },
      ],
    },
    practice: [
      {
        question: "«我是中国人。» Как встречно спросить «а ты?»",
        options: [
          { id: 1, text: "你呢？" },
          { id: 2, text: "你是？" },
          { id: 3, text: "呢你？" },
          { id: 4, text: "你啊？" },
        ],
        correctOptionId: 1,
      },
      {
        question: "«我叫大卫。» Как спросить «а её как зовут?»",
        options: [
          { id: 1, text: "她什么？" },
          { id: 2, text: "呢她？" },
          { id: 3, text: "她呢？" },
          { id: 4, text: "她吗？" },
        ],
        correctOptionId: 3,
      },
    ],
  },

  // ── 18 Match pairs ────────────────────────────────────────────
  {
    id: 2118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "同学", leftPinyin: "tóngxué", right: "одноклассник" },
      { id: 2, left: "朋友", leftPinyin: "péngyou", right: "друг" },
      { id: 3, left: "高兴", leftPinyin: "gāoxìng", right: "рад" },
      { id: 4, left: "认识", leftPinyin: "rènshi", right: "знакомиться" },
      { id: 5, left: "介绍", leftPinyin: "jièshào", right: "представлять" },
      { id: 6, left: "美国", leftPinyin: "Měiguó", right: "Америка" },
      { id: 7, left: "中国", leftPinyin: "Zhōngguó", right: "Китай" },
      { id: 8, left: "加拿大", leftPinyin: "Jiānádà", right: "Канада" },
    ],
  },

  // ── 19-20 Single response (фразы из диалогов Главы 2) ─────────
  {
    id: 2119,
    type: "single_response",
    mandarin: { hanzi: "我是美国人。", pinyin: "Wǒ shì Měiguó rén." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Я американец.",
        mandarin: {
          hanzi: "我是美国人",
          pinyin: "Wǒ shì Měiguó rén",
          words: [
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "是", pinyin: "shì", english: "быть" },
            { hanzi: "美国", pinyin: "Měiguó", english: "Америка" },
            { hanzi: "人", pinyin: "rén", english: "человек" },
          ],
          breakdown: "Я + быть + Америка + человек = «Я американец».",
        },
      },
    ],
  },
  {
    id: 2120,
    type: "single_response",
    mandarin: { hanzi: "认识你很高兴。", pinyin: "Rènshi nǐ hěn gāoxìng." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Очень приятно познакомиться.",
        mandarin: {
          hanzi: "认识你很高兴",
          pinyin: "Rènshi nǐ hěn gāoxìng",
          words: [
            { hanzi: "认识", pinyin: "rènshi", english: "знакомиться" },
            { hanzi: "你", pinyin: "nǐ", english: "ты" },
            { hanzi: "很", pinyin: "hěn", english: "очень" },
            { hanzi: "高兴", pinyin: "gāoxìng", english: "рад" },
          ],
          breakdown: "Знать + ты + очень + рад = «Очень приятно с тобой познакомиться».",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch2 = data.chapters.find((c) => c.id === 2);
if (!ch2) {
  console.error("Chapter 2 not found!");
  process.exit(1);
}

ch2.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 2 exercises added:", questions.length);
console.log("Distribution:", counts);
