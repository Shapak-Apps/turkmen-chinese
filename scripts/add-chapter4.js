/**
 * Adds 20 exercises to Chapter 4 (图书馆在哪儿) based on Boya Chinese Elementary I
 * 课堂练习 — pages 47-49 of the book.
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
  // ── 1-6 Flashcards (key vocab from Ch4) ──────────────────────────
  {
    id: 4101,
    type: "flashcard",
    mandarin: { hanzi: "图书馆", pinyin: "Túshūguǎn" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "школа", hanzi: "学校", pinyin: "xuéxiào" },
      { id: 2, english: "общежитие", hanzi: "宿舍", pinyin: "sùshè" },
      { id: 3, english: "библиотека", hanzi: "图书馆", pinyin: "túshūguǎn" },
      { id: 4, english: "учебный корпус", hanzi: "教学楼", pinyin: "jiàoxuélóu" },
    ],
    correctOptionId: 3,
  },
  {
    id: 4102,
    type: "flashcard",
    mandarin: { hanzi: "在", pinyin: "Zài" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "быть (кем)", hanzi: "是", pinyin: "shì" },
      { id: 2, english: "находиться (где)", hanzi: "在", pinyin: "zài" },
      { id: 3, english: "знать", hanzi: "知道", pinyin: "zhīdào" },
      { id: 4, english: "приходить", hanzi: "来", pinyin: "lái" },
    ],
    correctOptionId: 2,
  },
  {
    id: 4103,
    type: "flashcard",
    mandarin: { hanzi: "哪儿", pinyin: "Nǎr" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "здесь", hanzi: "这儿", pinyin: "zhèr" },
      { id: 2, english: "там", hanzi: "那儿", pinyin: "nàr" },
      { id: 3, english: "где", hanzi: "哪儿", pinyin: "nǎr" },
      { id: 4, english: "какой", hanzi: "哪", pinyin: "nǎ" },
    ],
    correctOptionId: 3,
  },
  {
    id: 4104,
    type: "flashcard",
    mandarin: { hanzi: "学校", pinyin: "Xuéxiào" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "библиотека", hanzi: "图书馆", pinyin: "túshūguǎn" },
      { id: 2, english: "общежитие", hanzi: "宿舍", pinyin: "sùshè" },
      { id: 3, english: "школа, учебное заведение", hanzi: "学校", pinyin: "xuéxiào" },
      { id: 4, english: "здание", hanzi: "楼", pinyin: "lóu" },
    ],
    correctOptionId: 3,
  },
  {
    id: 4105,
    type: "flashcard",
    mandarin: { hanzi: "宿舍", pinyin: "Sùshè" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "общежитие", hanzi: "宿舍", pinyin: "sùshè" },
      { id: 2, english: "школа", hanzi: "学校", pinyin: "xuéxiào" },
      { id: 3, english: "библиотека", hanzi: "图书馆", pinyin: "túshūguǎn" },
      { id: 4, english: "магазин", hanzi: "商店", pinyin: "shāngdiàn" },
    ],
    correctOptionId: 1,
  },
  {
    id: 4106,
    type: "flashcard",
    mandarin: { hanzi: "知道", pinyin: "Zhīdào" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "знакомиться", hanzi: "认识", pinyin: "rènshi" },
      { id: 2, english: "знать (факт)", hanzi: "知道", pinyin: "zhīdào" },
      { id: 3, english: "представлять", hanzi: "介绍", pinyin: "jièshào" },
      { id: 4, english: "находиться", hanzi: "在", pinyin: "zài" },
    ],
    correctOptionId: 2,
  },

  // ── 7-10 Fill-in-the-blank (选词填空 из книги стр. 49) ────────
  {
    id: 4107,
    type: "fill_blank",
    sentence: "___是学生宿舍楼吗?",
    sentencePinyin: "___ shì xuésheng sùshèlóu ma?",
    blankedWord: "这儿",
    correctAnswer: "这儿",
    hint: "указание на близкое место — «здесь, это место»",
    instruction: "Вставь пропущенное слово: «Это (место) — общежитие студентов?»",
    options: [
      { id: 1, hanzi: "在", pinyin: "zài" },
      { id: 2, hanzi: "是", pinyin: "shì" },
      { id: 3, hanzi: "这儿", pinyin: "zhèr" },
      { id: 4, hanzi: "哪儿", pinyin: "nǎr" },
    ],
  },
  {
    id: 4108,
    type: "fill_blank",
    sentence: "这儿不是图书馆，图书馆在___。",
    sentencePinyin: "Zhèr bú shì túshūguǎn, túshūguǎn zài ___.",
    blankedWord: "那儿",
    correctAnswer: "那儿",
    hint: "указание на отдалённое место — «там»",
    instruction: "Вставь пропущенное слово: «Здесь не библиотека, библиотека там.»",
    options: [
      { id: 1, hanzi: "这儿", pinyin: "zhèr" },
      { id: 2, hanzi: "那儿", pinyin: "nàr" },
      { id: 3, hanzi: "哪儿", pinyin: "nǎr" },
      { id: 4, hanzi: "是", pinyin: "shì" },
    ],
  },
  {
    id: 4109,
    type: "fill_blank",
    sentence: "教学楼___图书馆的北边。",
    sentencePinyin: "Jiàoxuélóu ___ túshūguǎn de běibian.",
    blankedWord: "在",
    correctAnswer: "在",
    hint: "глагол «находиться (где-то)»",
    instruction: "Вставь пропущенное слово: «Учебный корпус находится к северу от библиотеки.»",
    options: [
      { id: 1, hanzi: "是", pinyin: "shì" },
      { id: 2, hanzi: "在", pinyin: "zài" },
      { id: 3, hanzi: "的", pinyin: "de" },
      { id: 4, hanzi: "那儿", pinyin: "nàr" },
    ],
  },
  {
    id: 4110,
    type: "fill_blank",
    sentence: "请问，卫生间在___?",
    sentencePinyin: "Qǐngwèn, wèishēngjiān zài ___?",
    blankedWord: "哪儿",
    correctAnswer: "哪儿",
    hint: "вопросительное слово «где»",
    instruction: "Вставь пропущенное слово: «Простите, где туалет?»",
    options: [
      { id: 1, hanzi: "这儿", pinyin: "zhèr" },
      { id: 2, hanzi: "那儿", pinyin: "nàr" },
      { id: 3, hanzi: "哪儿", pinyin: "nǎr" },
      { id: 4, hanzi: "是", pinyin: "shì" },
    ],
  },

  // ── 11-13 Multiple choice (адаптация 替换练习, стр. 47-48) ────
  {
    id: 4111,
    type: "multiple_choice",
    mandarin: { hanzi: "图书馆在哪儿？", pinyin: "Túshūguǎn zài nǎr?" },
    instruction: "«Где библиотека?» Библиотека к северу от общежития. Как ответить?",
    options: [
      {
        id: 1,
        english: "图书馆在宿舍楼的北边。",
        mandarin: {
          hanzi: "图书馆在宿舍楼的北边",
          pinyin: "Túshūguǎn zài sùshèlóu de běibian",
          words: [
            { hanzi: "图书馆", pinyin: "túshūguǎn", english: "библиотека" },
            { hanzi: "在", pinyin: "zài", english: "находиться" },
            { hanzi: "宿舍", pinyin: "sùshè", english: "общежитие" },
            { hanzi: "楼", pinyin: "lóu", english: "здание" },
            { hanzi: "北边", pinyin: "běibian", english: "север, с севера" },
          ],
          breakdown: "X 在 Y 的 северная-сторона = «X к северу от Y».",
        },
      },
      {
        id: 2,
        english: "图书馆是我的。",
        mandarin: {
          hanzi: "图书馆是我的",
          pinyin: "Túshūguǎn shì wǒ de",
          words: [],
          breakdown: "«Библиотека — моя» — бессмыслица, не ответ.",
        },
      },
      {
        id: 3,
        english: "我不知道图书馆。",
        mandarin: {
          hanzi: "我不知道图书馆",
          pinyin: "Wǒ bù zhīdào túshūguǎn",
          words: [],
          breakdown: "Грамматически странный ответ — нужно «不知道» без «图书馆».",
        },
      },
      {
        id: 4,
        english: "图书馆哪儿？",
        mandarin: {
          hanzi: "图书馆哪儿",
          pinyin: "Túshūguǎn nǎr",
          words: [],
          breakdown: "Незавершённый вопрос — не ответ.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 4112,
    type: "multiple_choice",
    mandarin: { hanzi: "右边的楼是图书馆吗？", pinyin: "Yòubian de lóu shì túshūguǎn ma?" },
    instruction: "«То здание справа — библиотека?» На самом деле библиотека слева. Как ответить?",
    options: [
      {
        id: 1,
        english: "不，图书馆是左边的楼。",
        mandarin: {
          hanzi: "不，图书馆是左边的楼",
          pinyin: "Bù, túshūguǎn shì zuǒbian de lóu",
          words: [
            { hanzi: "不", pinyin: "bù", english: "нет" },
            { hanzi: "左边", pinyin: "zuǒbian", english: "слева" },
            { hanzi: "楼", pinyin: "lóu", english: "здание" },
          ],
          breakdown: "«Нет, библиотека — здание слева.» 左边的楼 = «здание слева».",
        },
      },
      {
        id: 2,
        english: "是，右边的楼。",
        mandarin: {
          hanzi: "是，右边的楼",
          pinyin: "Shì, yòubian de lóu",
          words: [],
          breakdown: "Подтверждение — но по факту библиотека не справа.",
        },
      },
      {
        id: 3,
        english: "在北边。",
        mandarin: {
          hanzi: "在北边",
          pinyin: "Zài běibian",
          words: [],
          breakdown: "«На северной стороне» — не отвечает на left/right.",
        },
      },
      {
        id: 4,
        english: "我不知道。",
        mandarin: {
          hanzi: "我不知道",
          pinyin: "Wǒ bù zhīdào",
          words: [],
          breakdown: "«Не знаю» — но ты знаешь, поэтому не лучший ответ.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 4113,
    type: "multiple_choice",
    mandarin: { hanzi: "请问，图书馆在哪儿？", pinyin: "Qǐngwèn, túshūguǎn zài nǎr?" },
    instruction: "Тебя спросили где библиотека, но ты не из этого университета. Как вежливо ответить?",
    options: [
      {
        id: 1,
        english: "对不起，我不是这个学校的学生，不知道。",
        mandarin: {
          hanzi: "对不起，我不是这个学校的学生，不知道",
          pinyin: "Duìbuqǐ, wǒ bú shì zhège xuéxiào de xuésheng, bù zhīdào",
          words: [
            { hanzi: "对不起", pinyin: "duìbuqǐ", english: "извините" },
            { hanzi: "学校", pinyin: "xuéxiào", english: "школа" },
            { hanzi: "知道", pinyin: "zhīdào", english: "знать" },
          ],
          breakdown: "Вежливый отказ: извинение + причина + «не знаю».",
        },
      },
      {
        id: 2,
        english: "没关系。",
        mandarin: {
          hanzi: "没关系",
          pinyin: "Méi guānxi",
          words: [],
          breakdown: "«Ничего страшного» — это ответ на извинение, а не на вопрос.",
        },
      },
      {
        id: 3,
        english: "不用谢。",
        mandarin: {
          hanzi: "不用谢",
          pinyin: "Búyòng xiè",
          words: [],
          breakdown: "«Не за что» — ответ на спасибо.",
        },
      },
      {
        id: 4,
        english: "图书馆在这儿。",
        mandarin: {
          hanzi: "图书馆在这儿",
          pinyin: "Túshūguǎn zài zhèr",
          words: [],
          breakdown: "«Библиотека здесь» — неправда, если ты не знаешь.",
        },
      },
    ],
    correctOptionId: 1,
  },

  // ── 14-15 Listening MC ─────────────────────────────────────────
  {
    id: 4114,
    type: "listening_mc",
    mandarin: {
      hanzi: "图书馆在哪儿",
      pinyin: "Túshūguǎn zài nǎr",
      words: [
        { hanzi: "图书馆", pinyin: "túshūguǎn", english: "библиотека" },
        { hanzi: "在", pinyin: "zài", english: "находиться" },
        { hanzi: "哪儿", pinyin: "nǎr", english: "где" },
      ],
      breakdown: "«Где находится библиотека?» Вопрос со словом 哪儿.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Где библиотека? — 图书馆在哪儿" },
      { id: 2, english: "Библиотека здесь — 图书馆在这儿" },
      { id: 3, english: "Библиотека там — 图书馆在那儿" },
      { id: 4, english: "Где общежитие? — 宿舍在哪儿" },
    ],
    correctOptionId: 1,
  },
  {
    id: 4115,
    type: "listening_mc",
    mandarin: {
      hanzi: "图书馆在宿舍楼的北边",
      pinyin: "Túshūguǎn zài sùshèlóu de běibian",
      words: [
        { hanzi: "图书馆", pinyin: "túshūguǎn", english: "библиотека" },
        { hanzi: "在", pinyin: "zài", english: "находиться" },
        { hanzi: "宿舍", pinyin: "sùshè", english: "общежитие" },
        { hanzi: "楼", pinyin: "lóu", english: "здание" },
        { hanzi: "北边", pinyin: "běibian", english: "север" },
      ],
      breakdown: "X 在 Y 的 направление = местоположение относительно ориентира.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Библиотека к северу от общежития — 图书馆在宿舍楼的北边" },
      { id: 2, english: "Библиотека к западу от общежития — 图书馆在宿舍楼的西边" },
      { id: 3, english: "Общежитие к северу от библиотеки — 宿舍楼在图书馆的北边" },
      { id: 4, english: "Учебный корпус к северу — 教学楼在北边" },
    ],
    correctOptionId: 1,
  },

  // ── 16-17 Grammar ──────────────────────────────────────────────
  {
    id: 4116,
    type: "grammar",
    rule: {
      title: "Глагол 在 (zài) — «находиться где-то»",
      explanation:
        "在 — глагол «находиться, быть в каком-то месте».\n\n" +
        "Схема: Подлежащее + 在 + Место\n\n" +
        "我在学校。— Я в школе.\n" +
        "图书馆在那儿。— Библиотека находится там.\n\n" +
        "С вопросом «где»: Подлежащее + 在 + 哪儿?\n" +
        "图书馆在哪儿? — Где библиотека?\n\n" +
        "Отрицание: 不在\n" +
        "图书馆不在这儿。— Библиотека не здесь.",
      examples: [
        { hanzi: "我在图书馆。", pinyin: "Wǒ zài túshūguǎn.", english: "Я в библиотеке." },
        { hanzi: "老师在哪儿？", pinyin: "Lǎoshī zài nǎr?", english: "Где учитель?" },
        { hanzi: "大卫不在这儿。", pinyin: "Dàwèi bú zài zhèr.", english: "Давэя здесь нет." },
      ],
    },
    practice: [
      {
        question: "Как спросить «Где твоя книга?»",
        options: [
          { id: 1, text: "你的书在哪儿？" },
          { id: 2, text: "你的书哪儿在？" },
          { id: 3, text: "你的书是哪儿？" },
          { id: 4, text: "哪儿你的书在？" },
        ],
        correctOptionId: 1,
      },
      {
        question: "Как ответить «Я в общежитии»?",
        options: [
          { id: 1, text: "我宿舍在" },
          { id: 2, text: "我是宿舍" },
          { id: 3, text: "我在宿舍" },
          { id: 4, text: "宿舍我在" },
        ],
        correctOptionId: 3,
      },
    ],
  },
  {
    id: 4117,
    type: "grammar",
    rule: {
      title: "Слова направления: 东/西/南/北/左/右 + 边",
      explanation:
        "Чтобы сказать «к северу от X», «справа от X», используется схема:\n\n" +
        "X + 的 + направление + 边\n\n" +
        "Направления:\n" +
        "东 (восток) → 东边\n" +
        "西 (запад) → 西边\n" +
        "南 (юг) → 南边\n" +
        "北 (север) → 北边\n" +
        "左 (лево) → 左边\n" +
        "右 (право) → 右边\n\n" +
        "Обрати внимание на порядок: сначала идёт ориентир (от чего), потом направление. Это противоположно русскому.\n\n" +
        "Пример: 图书馆在宿舍楼的北边 = «Библиотека к северу от общежития».",
      examples: [
        { hanzi: "日本在中国的东边。", pinyin: "Rìběn zài Zhōngguó de dōngbian.", english: "Япония к востоку от Китая." },
        { hanzi: "加拿大在美国的北边。", pinyin: "Jiānádà zài Měiguó de běibian.", english: "Канада к северу от США." },
        { hanzi: "李军在大卫的右边。", pinyin: "Lǐ Jūn zài Dàwèi de yòubian.", english: "Ли Цзюнь справа от Давэя." },
      ],
    },
    practice: [
      {
        question: "Как сказать «Учебный корпус справа от библиотеки»?",
        options: [
          { id: 1, text: "教学楼在图书馆的右边" },
          { id: 2, text: "教学楼右边图书馆的在" },
          { id: 3, text: "右边教学楼在图书馆的" },
          { id: 4, text: "教学楼是右边图书馆的" },
        ],
        correctOptionId: 1,
      },
      {
        question: "Как сказать «Магазин к югу от школы»?",
        options: [
          { id: 1, text: "商店在学校的南边" },
          { id: 2, text: "商店学校南边在" },
          { id: 3, text: "学校在商店的南边" },
          { id: 4, text: "南边商店学校的在" },
        ],
        correctOptionId: 1,
      },
    ],
  },

  // ── 18 Match pairs ─────────────────────────────────────────────
  {
    id: 4118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "图书馆", leftPinyin: "túshūguǎn", right: "библиотека" },
      { id: 2, left: "宿舍", leftPinyin: "sùshè", right: "общежитие" },
      { id: 3, left: "学校", leftPinyin: "xuéxiào", right: "школа" },
      { id: 4, left: "这儿", leftPinyin: "zhèr", right: "здесь" },
      { id: 5, left: "那儿", leftPinyin: "nàr", right: "там" },
      { id: 6, left: "哪儿", leftPinyin: "nǎr", right: "где" },
      { id: 7, left: "左边", leftPinyin: "zuǒbian", right: "слева" },
      { id: 8, left: "右边", leftPinyin: "yòubian", right: "справа" },
    ],
  },

  // ── 19-20 Single response ──────────────────────────────────────
  {
    id: 4119,
    type: "single_response",
    mandarin: { hanzi: "请问，图书馆在哪儿？", pinyin: "Qǐngwèn, túshūguǎn zài nǎr?" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Простите, где библиотека?",
        mandarin: {
          hanzi: "请问，图书馆在哪儿",
          pinyin: "Qǐngwèn, túshūguǎn zài nǎr",
          words: [
            { hanzi: "请问", pinyin: "qǐngwèn", english: "простите, можно спросить" },
            { hanzi: "图书馆", pinyin: "túshūguǎn", english: "библиотека" },
            { hanzi: "在", pinyin: "zài", english: "находиться" },
            { hanzi: "哪儿", pinyin: "nǎr", english: "где" },
          ],
          breakdown: "请问 — вежливое начало вопроса у незнакомых. Далее: X + 在 + 哪儿?",
        },
      },
    ],
  },
  {
    id: 4120,
    type: "single_response",
    mandarin: { hanzi: "图书馆在宿舍楼的北边。", pinyin: "Túshūguǎn zài sùshèlóu de běibian." },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Библиотека к северу от общежития.",
        mandarin: {
          hanzi: "图书馆在宿舍楼的北边",
          pinyin: "Túshūguǎn zài sùshèlóu de běibian",
          words: [
            { hanzi: "图书馆", pinyin: "túshūguǎn", english: "библиотека" },
            { hanzi: "在", pinyin: "zài", english: "находиться" },
            { hanzi: "宿舍楼", pinyin: "sùshèlóu", english: "общежитие (здание)" },
            { hanzi: "的", pinyin: "de", english: "(притяж.)" },
            { hanzi: "北边", pinyin: "běibian", english: "север" },
          ],
          breakdown: "X + 在 + Y + 的 + направление-边 = местоположение относительно Y.",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch4 = data.chapters.find((c) => c.id === 4);
if (!ch4) {
  console.error("Chapter 4 not found!");
  process.exit(1);
}

ch4.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 4 exercises added:", questions.length);
console.log("Distribution:", counts);
