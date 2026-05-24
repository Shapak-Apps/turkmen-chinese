/**
 * Adds 20 exercises to Chapter 5 (在北京大学的东边) based on Boya Chinese Elementary I
 * 课堂练习 — pages 54-56 of the book. Unit 1 review + 有 and 的时候.
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
  // ── 1-6 Flashcards (key vocab from Ch5) ──────────────────────────
  {
    id: 5101,
    type: "flashcard",
    mandarin: { hanzi: "专业", pinyin: "Zhuānyè" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "университет", hanzi: "大学", pinyin: "dàxué" },
      { id: 2, english: "специальность (в вузе)", hanzi: "专业", pinyin: "zhuānyè" },
      { id: 3, english: "факультет", hanzi: "系", pinyin: "xì" },
      { id: 4, english: "аспирант", hanzi: "研究生", pinyin: "yánjiūshēng" },
    ],
    correctOptionId: 2,
  },
  {
    id: 5102,
    type: "flashcard",
    mandarin: { hanzi: "有", pinyin: "Yǒu" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "быть (кем)", hanzi: "是", pinyin: "shì" },
      { id: 2, english: "находиться", hanzi: "在", pinyin: "zài" },
      { id: 3, english: "иметь; иметься", hanzi: "有", pinyin: "yǒu" },
      { id: 4, english: "знать", hanzi: "知道", pinyin: "zhīdào" },
    ],
    correctOptionId: 3,
  },
  {
    id: 5103,
    type: "flashcard",
    mandarin: { hanzi: "欢迎", pinyin: "Huānyíng" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "идти, ехать", hanzi: "去", pinyin: "qù" },
      { id: 2, english: "приветствовать; добро пожаловать", hanzi: "欢迎", pinyin: "huānyíng" },
      { id: 3, english: "приходить", hanzi: "来", pinyin: "lái" },
      { id: 4, english: "играть", hanzi: "玩儿", pinyin: "wánr" },
    ],
    correctOptionId: 2,
  },
  {
    id: 5104,
    type: "flashcard",
    mandarin: { hanzi: "时候", pinyin: "Shíhou" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "время, момент", hanzi: "时候", pinyin: "shíhou" },
      { id: 2, english: "свободное время", hanzi: "空儿", pinyin: "kòngr" },
      { id: 3, english: "день", hanzi: "天", pinyin: "tiān" },
      { id: 4, english: "час", hanzi: "小时", pinyin: "xiǎoshí" },
    ],
    correctOptionId: 1,
  },
  {
    id: 5105,
    type: "flashcard",
    mandarin: { hanzi: "旁边", pinyin: "Pángbiān" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "слева", hanzi: "左边", pinyin: "zuǒbian" },
      { id: 2, english: "справа", hanzi: "右边", pinyin: "yòubian" },
      { id: 3, english: "рядом, сбоку", hanzi: "旁边", pinyin: "pángbiān" },
      { id: 4, english: "внутри", hanzi: "里边", pinyin: "lǐbian" },
    ],
    correctOptionId: 3,
  },
  {
    id: 5106,
    type: "flashcard",
    mandarin: { hanzi: "卫生间", pinyin: "Wèishēngjiān" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "аудитория", hanzi: "教室", pinyin: "jiàoshì" },
      { id: 2, english: "библиотека", hanzi: "图书馆", pinyin: "túshūguǎn" },
      { id: 3, english: "общежитие", hanzi: "宿舍", pinyin: "sùshè" },
      { id: 4, english: "туалет, уборная", hanzi: "卫生间", pinyin: "wèishēngjiān" },
    ],
    correctOptionId: 4,
  },

  // ── 7-10 Fill-in-the-blank (选词填空 из книги стр. 54) ────────
  {
    id: 5107,
    type: "fill_blank",
    sentence: "你是留学生，我___是留学生。",
    sentencePinyin: "Nǐ shì liúxuéshēng, wǒ ___ shì liúxuéshēng.",
    blankedWord: "也",
    correctAnswer: "也",
    hint: "«тоже» — ставится перед сказуемым",
    instruction: "Вставь пропущенное слово: «Ты студент, я тоже студент.»",
    options: [
      { id: 1, hanzi: "呢", pinyin: "ne" },
      { id: 2, hanzi: "吗", pinyin: "ma" },
      { id: 3, hanzi: "也", pinyin: "yě" },
      { id: 4, hanzi: "在", pinyin: "zài" },
    ],
  },
  {
    id: 5108,
    type: "fill_blank",
    sentence: "我叫玛丽，你___?",
    sentencePinyin: "Wǒ jiào Mǎlì, nǐ ___?",
    blankedWord: "呢",
    correctAnswer: "呢",
    hint: "встречный вопрос «а ты?»",
    instruction: "Вставь пропущенное слово: «Меня зовут Мэри, а тебя?»",
    options: [
      { id: 1, hanzi: "呢", pinyin: "ne" },
      { id: 2, hanzi: "吗", pinyin: "ma" },
      { id: 3, hanzi: "也", pinyin: "yě" },
      { id: 4, hanzi: "在", pinyin: "zài" },
    ],
  },
  {
    id: 5109,
    type: "fill_blank",
    sentence: "留学生的宿舍楼在___，图书馆的东边。",
    sentencePinyin: "Liúxuéshēng de sùshèlóu zài ___, túshūguǎn de dōngbian.",
    blankedWord: "这儿",
    correctAnswer: "这儿",
    hint: "указание на близкое место — «здесь»",
    instruction: "Вставь пропущенное слово: «Общежитие студентов здесь, к востоку от библиотеки.»",
    options: [
      { id: 1, hanzi: "谁", pinyin: "shéi" },
      { id: 2, hanzi: "这儿", pinyin: "zhèr" },
      { id: 3, hanzi: "那儿", pinyin: "nàr" },
      { id: 4, hanzi: "哪儿", pinyin: "nǎr" },
    ],
  },
  {
    id: 5110,
    type: "fill_blank",
    sentence: "北京大学在___?",
    sentencePinyin: "Běijīng Dàxué zài ___?",
    blankedWord: "哪儿",
    correctAnswer: "哪儿",
    hint: "вопросительное слово «где»",
    instruction: "Вставь пропущенное слово: «Где находится Пекинский университет?»",
    options: [
      { id: 1, hanzi: "这儿", pinyin: "zhèr" },
      { id: 2, hanzi: "那儿", pinyin: "nàr" },
      { id: 3, hanzi: "哪儿", pinyin: "nǎr" },
      { id: 4, hanzi: "谁", pinyin: "shéi" },
    ],
  },

  // ── 11-13 Multiple choice (адаптация 完成对话 и 仿照例句, стр. 55-56) ─
  {
    id: 5111,
    type: "multiple_choice",
    mandarin: { hanzi: "你有空儿吗？", pinyin: "Nǐ yǒu kòngr ma?" },
    instruction: "«У тебя есть свободное время?» У тебя нет. Как правильно ответить?",
    options: [
      {
        id: 1,
        english: "我没有空儿。",
        mandarin: {
          hanzi: "我没有空儿",
          pinyin: "Wǒ méi yǒu kòngr",
          words: [
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "没有", pinyin: "méi yǒu", english: "не иметь" },
            { hanzi: "空儿", pinyin: "kòngr", english: "свободное время" },
          ],
          breakdown: "有 ВСЕГДА отрицается через 没, НЕ через 不. Правильно: 没有.",
        },
      },
      {
        id: 2,
        english: "我不有空儿。",
        mandarin: {
          hanzi: "我不有空儿",
          pinyin: "Wǒ bù yǒu kòngr",
          words: [],
          breakdown: "Ошибка: 有 нельзя отрицать через 不. Только 没有.",
        },
      },
      {
        id: 3,
        english: "我有空儿。",
        mandarin: {
          hanzi: "我有空儿",
          pinyin: "Wǒ yǒu kòngr",
          words: [],
          breakdown: "«У меня есть время» — противоположный смысл.",
        },
      },
      {
        id: 4,
        english: "空儿有我没。",
        mandarin: {
          hanzi: "空儿有我没",
          pinyin: "Kòngr yǒu wǒ méi",
          words: [],
          breakdown: "Неправильный порядок слов.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 5112,
    type: "multiple_choice",
    mandarin: { hanzi: "你的专业是什么？", pinyin: "Nǐ de zhuānyè shì shénme?" },
    instruction: "«Какая у тебя специальность?» Твоя специальность — международные отношения. Как ответить?",
    options: [
      {
        id: 1,
        english: "我的专业是国际关系。",
        mandarin: {
          hanzi: "我的专业是国际关系",
          pinyin: "Wǒ de zhuānyè shì guójì guānxi",
          words: [
            { hanzi: "专业", pinyin: "zhuānyè", english: "специальность" },
            { hanzi: "国际", pinyin: "guójì", english: "международный" },
            { hanzi: "关系", pinyin: "guānxi", english: "отношения" },
          ],
          breakdown: "«Моя специальность — международные отношения.» Схема: 我的 + X + 是 + Y.",
        },
      },
      {
        id: 2,
        english: "我是国际关系。",
        mandarin: {
          hanzi: "我是国际关系",
          pinyin: "Wǒ shì guójì guānxi",
          words: [],
          breakdown: "«Я — международные отношения» — бессмыслица, нужно 我的专业是.",
        },
      },
      {
        id: 3,
        english: "我有国际关系。",
        mandarin: {
          hanzi: "我有国际关系",
          pinyin: "Wǒ yǒu guójì guānxi",
          words: [],
          breakdown: "«У меня есть международные отношения» — не подходит по смыслу.",
        },
      },
      {
        id: 4,
        english: "国际关系是我。",
        mandarin: {
          hanzi: "国际关系是我",
          pinyin: "Guójì guānxi shì wǒ",
          words: [],
          breakdown: "Обратный порядок — бессмыслица.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 5113,
    type: "multiple_choice",
    mandarin: { hanzi: "清华大学在哪儿？", pinyin: "Qīnghuá Dàxué zài nǎr?" },
    instruction: "«Где находится Цинхуа?» Она к востоку от Пекинского университета. Как ответить?",
    options: [
      {
        id: 1,
        english: "在北京大学的东边。",
        mandarin: {
          hanzi: "在北京大学的东边",
          pinyin: "Zài Běijīng Dàxué de dōngbian",
          words: [
            { hanzi: "在", pinyin: "zài", english: "находиться" },
            { hanzi: "北京大学", pinyin: "Běijīng Dàxué", english: "Пекинский университет" },
            { hanzi: "东边", pinyin: "dōngbian", english: "восток" },
          ],
          breakdown: "Стандартная схема: 在 + Y + 的 + направление-边.",
        },
      },
      {
        id: 2,
        english: "清华大学是北京大学。",
        mandarin: {
          hanzi: "清华大学是北京大学",
          pinyin: "Qīnghuá Dàxué shì Běijīng Dàxué",
          words: [],
          breakdown: "«Цинхуа — это Пекинский университет» — неверно, это разные вузы.",
        },
      },
      {
        id: 3,
        english: "没有清华大学。",
        mandarin: {
          hanzi: "没有清华大学",
          pinyin: "Méi yǒu Qīnghuá Dàxué",
          words: [],
          breakdown: "«Нет Цинхуа» — не отвечает на вопрос о местоположении.",
        },
      },
      {
        id: 4,
        english: "清华大学不是在。",
        mandarin: {
          hanzi: "清华大学不是在",
          pinyin: "Qīnghuá Dàxué bú shì zài",
          words: [],
          breakdown: "Грамматически неправильное предложение.",
        },
      },
    ],
    correctOptionId: 1,
  },

  // ── 14-15 Listening MC ─────────────────────────────────────────
  {
    id: 5114,
    type: "listening_mc",
    mandarin: {
      hanzi: "你有空儿吗",
      pinyin: "Nǐ yǒu kòngr ma",
      words: [
        { hanzi: "你", pinyin: "nǐ", english: "ты" },
        { hanzi: "有", pinyin: "yǒu", english: "иметь" },
        { hanzi: "空儿", pinyin: "kòngr", english: "свободное время" },
        { hanzi: "吗", pinyin: "ma", english: "(вопрос. частица)" },
      ],
      breakdown: "«У тебя есть свободное время?» Стандартный вопрос с 有 + 吗.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "У тебя есть свободное время? — 你有空儿吗" },
      { id: 2, english: "Ты занят? — 你忙吗" },
      { id: 3, english: "Ты студент? — 你是学生吗" },
      { id: 4, english: "У тебя есть книга? — 你有书吗" },
    ],
    correctOptionId: 1,
  },
  {
    id: 5115,
    type: "listening_mc",
    mandarin: {
      hanzi: "卫生间在教室的旁边",
      pinyin: "Wèishēngjiān zài jiàoshì de pángbiān",
      words: [
        { hanzi: "卫生间", pinyin: "wèishēngjiān", english: "туалет" },
        { hanzi: "在", pinyin: "zài", english: "находиться" },
        { hanzi: "教室", pinyin: "jiàoshì", english: "аудитория" },
        { hanzi: "的", pinyin: "de", english: "(притяж.)" },
        { hanzi: "旁边", pinyin: "pángbiān", english: "рядом, сбоку" },
      ],
      breakdown: "«Туалет рядом с аудиторией.» Схема: X + 在 + Y + 的 + 旁边.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Туалет рядом с аудиторией — 卫生间在教室的旁边" },
      { id: 2, english: "Туалет напротив аудитории — 卫生间在教室的对面" },
      { id: 3, english: "Туалет в аудитории — 卫生间在教室里" },
      { id: 4, english: "Туалет слева от аудитории — 卫生间在教室的左边" },
    ],
    correctOptionId: 1,
  },

  // ── 16-17 Grammar ──────────────────────────────────────────────
  {
    id: 5116,
    type: "grammar",
    rule: {
      title: "Глагол 有 (yǒu) — «иметь; иметься»",
      explanation:
        "有 используется двумя способами:\n\n" +
        "1) Принадлежность («у меня есть»):\n" +
        "Подлежащее + 有 + Объект\n" +
        "我有朋友。— У меня есть друзья.\n\n" +
        "2) Существование («где-то есть»):\n" +
        "Место + 有 + Объект\n" +
        "学校有图书馆。— В университете есть библиотека.\n\n" +
        "❗️ Важно: 有 ВСЕГДА отрицается через 没, НЕ через 不!\n\n" +
        "❌ 不有\n" +
        "✅ 没有 (méi yǒu)\n\n" +
        "我没有空儿。— У меня нет свободного времени.",
      examples: [
        { hanzi: "我有一个中国朋友。", pinyin: "Wǒ yǒu yí ge Zhōngguó péngyou.", english: "У меня есть один китайский друг." },
        { hanzi: "你有空儿吗？", pinyin: "Nǐ yǒu kòngr ma?", english: "У тебя есть свободное время?" },
        { hanzi: "我没有汉语词典。", pinyin: "Wǒ méiyǒu Hànyǔ cídiǎn.", english: "У меня нет словаря китайского." },
      ],
    },
    practice: [
      {
        question: "Как сказать «У меня нет соседа по комнате»?",
        options: [
          { id: 1, text: "我不有同屋" },
          { id: 2, text: "我没有同屋" },
          { id: 3, text: "我没同屋有" },
          { id: 4, text: "我有不同屋" },
        ],
        correctOptionId: 2,
      },
      {
        question: "Как сказать «В школе есть библиотека»?",
        options: [
          { id: 1, text: "学校有图书馆" },
          { id: 2, text: "学校图书馆有" },
          { id: 3, text: "图书馆有学校" },
          { id: 4, text: "学校是图书馆" },
        ],
        correctOptionId: 1,
      },
    ],
  },
  {
    id: 5117,
    type: "grammar",
    rule: {
      title: "Выражение 的时候 (de shíhou) — «когда, в момент»",
      explanation:
        "…的时候 = «когда…, во время…». Ставится в КОНЦЕ придаточной части, перед главной.\n\n" +
        "Схема: [действие/ситуация] + 的时候，[основная часть]\n\n" +
        "有空儿的时候，欢迎你去玩儿。\n" +
        "«Когда будет время, приходи в гости.»\n\n" +
        "Порядок ОБРАТНЫЙ русскому: сначала условие/время, потом основное действие.\n\n" +
        "Русский: «Приходи, КОГДА будет время»\n" +
        "Китайский: «КОГДА время — приходи»",
      examples: [
        { hanzi: "有空儿的时候，欢迎你去玩儿。", pinyin: "Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.", english: "Когда будет время, приходи в гости." },
        { hanzi: "我有空儿的时候去图书馆。", pinyin: "Wǒ yǒu kòngr de shíhou qù túshūguǎn.", english: "Когда у меня есть время, иду в библиотеку." },
      ],
    },
    practice: [
      {
        question: "Как правильно сказать «Когда есть время, играю с друзьями»?",
        options: [
          { id: 1, text: "我和朋友玩儿有空儿的时候" },
          { id: 2, text: "有空儿的时候，我和朋友玩儿" },
          { id: 3, text: "有空儿，我的时候和朋友玩儿" },
          { id: 4, text: "时候的有空儿，我和朋友玩儿" },
        ],
        correctOptionId: 2,
      },
      {
        question: "Какой порядок слов правильный?",
        options: [
          { id: 1, text: "你不忙的时候，我们一起玩儿" },
          { id: 2, text: "我们一起玩儿的时候，你不忙" },
          { id: 3, text: "时候不忙的你，一起玩儿我们" },
          { id: 4, text: "一起玩儿你不忙的时候，我们" },
        ],
        correctOptionId: 1,
      },
    ],
  },

  // ── 18 Match pairs ─────────────────────────────────────────────
  {
    id: 5118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "专业", leftPinyin: "zhuānyè", right: "специальность" },
      { id: 2, left: "有", leftPinyin: "yǒu", right: "иметь" },
      { id: 3, left: "空儿", leftPinyin: "kòngr", right: "свободное время" },
      { id: 4, left: "欢迎", leftPinyin: "huānyíng", right: "добро пожаловать" },
      { id: 5, left: "旁边", leftPinyin: "pángbiān", right: "рядом" },
      { id: 6, left: "卫生间", leftPinyin: "wèishēngjiān", right: "туалет" },
      { id: 7, left: "研究生", leftPinyin: "yánjiūshēng", right: "аспирант" },
      { id: 8, left: "现代", leftPinyin: "xiàndài", right: "современный" },
    ],
  },

  // ── 19-20 Single response ──────────────────────────────────────
  {
    id: 5119,
    type: "single_response",
    mandarin: { hanzi: "我是北京大学的留学生。", pinyin: "Wǒ shì Běijīng Dàxué de liúxuéshēng." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Я — иностранная студентка Пекинского университета.",
        mandarin: {
          hanzi: "我是北京大学的留学生",
          pinyin: "Wǒ shì Běijīng Dàxué de liúxuéshēng",
          words: [
            { hanzi: "我", pinyin: "wǒ", english: "я" },
            { hanzi: "是", pinyin: "shì", english: "быть" },
            { hanzi: "北京大学", pinyin: "Běijīng Dàxué", english: "Пекинский университет" },
            { hanzi: "的", pinyin: "de", english: "(притяж.)" },
            { hanzi: "留学生", pinyin: "liúxuéshēng", english: "иностр. студент" },
          ],
          breakdown: "Я + быть + университет + 的 + студент. Использует 的 для принадлежности (студент университета).",
        },
      },
    ],
  },
  {
    id: 5120,
    type: "single_response",
    mandarin: { hanzi: "有空儿的时候，欢迎你去玩儿。", pinyin: "Yǒu kòngr de shíhou, huānyíng nǐ qù wánr." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Когда будет время — приходи в гости.",
        mandarin: {
          hanzi: "有空儿的时候，欢迎你去玩儿",
          pinyin: "Yǒu kòngr de shíhou, huānyíng nǐ qù wánr",
          words: [
            { hanzi: "有", pinyin: "yǒu", english: "иметь" },
            { hanzi: "空儿", pinyin: "kòngr", english: "свободное время" },
            { hanzi: "的时候", pinyin: "de shíhou", english: "когда" },
            { hanzi: "欢迎", pinyin: "huānyíng", english: "приветствовать" },
            { hanzi: "去", pinyin: "qù", english: "идти" },
            { hanzi: "玩儿", pinyin: "wánr", english: "играть" },
          ],
          breakdown: "Типичная форма приглашения. Условие идёт первым (的时候), потом основное действие.",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch5 = data.chapters.find((c) => c.id === 5);
if (!ch5) {
  console.error("Chapter 5 not found!");
  process.exit(1);
}

ch5.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 5 exercises added:", questions.length);
console.log("Distribution:", counts);
