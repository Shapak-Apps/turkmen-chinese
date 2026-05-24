/**
 * Adds 20 exercises to Chapter 8 (你的电话号码是多少) based on Boya Chinese Elementary I
 * 课堂练习 — pages 74-76. Focus: numbers/phones, 吧 (suggestion), 几 vs 多少, 怎么走.
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
    id: 8101,
    type: "flashcard",
    mandarin: { hanzi: "电话", pinyin: "Diànhuà" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "мобильный телефон", hanzi: "手机", pinyin: "shǒujī" },
      { id: 2, english: "телефон", hanzi: "电话", pinyin: "diànhuà" },
      { id: 3, english: "номер", hanzi: "号码", pinyin: "hàomǎ" },
      { id: 4, english: "комната", hanzi: "房间", pinyin: "fángjiān" },
    ],
    correctOptionId: 2,
  },
  {
    id: 8102,
    type: "flashcard",
    mandarin: { hanzi: "号码", pinyin: "Hàomǎ" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "телефон", hanzi: "电话", pinyin: "diànhuà" },
      { id: 2, english: "комната", hanzi: "房间", pinyin: "fángjiān" },
      { id: 3, english: "номер", hanzi: "号码", pinyin: "hàomǎ" },
      { id: 4, english: "адрес", hanzi: "地址", pinyin: "dìzhǐ" },
    ],
    correctOptionId: 3,
  },
  {
    id: 8103,
    type: "flashcard",
    mandarin: { hanzi: "多少", pinyin: "Duōshao" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "сколько (больших)", hanzi: "多少", pinyin: "duōshao" },
      { id: 2, english: "сколько (малых)", hanzi: "几", pinyin: "jǐ" },
      { id: 3, english: "как", hanzi: "怎么", pinyin: "zěnme" },
      { id: 4, english: "что", hanzi: "什么", pinyin: "shénme" },
    ],
    correctOptionId: 1,
  },
  {
    id: 8104,
    type: "flashcard",
    mandarin: { hanzi: "周末", pinyin: "Zhōumò" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "сегодня", hanzi: "今天", pinyin: "jīntiān" },
      { id: 2, english: "завтра", hanzi: "明天", pinyin: "míngtiān" },
      { id: 3, english: "выходные", hanzi: "周末", pinyin: "zhōumò" },
      { id: 4, english: "время", hanzi: "时间", pinyin: "shíjiān" },
    ],
    correctOptionId: 3,
  },
  {
    id: 8105,
    type: "flashcard",
    mandarin: { hanzi: "怎么", pinyin: "Zěnme" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "что", hanzi: "什么", pinyin: "shénme" },
      { id: 2, english: "как, каким образом", hanzi: "怎么", pinyin: "zěnme" },
      { id: 3, english: "где", hanzi: "哪儿", pinyin: "nǎr" },
      { id: 4, english: "кто", hanzi: "谁", pinyin: "shéi" },
    ],
    correctOptionId: 2,
  },
  {
    id: 8106,
    type: "flashcard",
    mandarin: { hanzi: "手机", pinyin: "Shǒujī" },
    instruction: "Что значит это слово?",
    options: [
      { id: 1, english: "телефон", hanzi: "电话", pinyin: "diànhuà" },
      { id: 2, english: "мобильный телефон", hanzi: "手机", pinyin: "shǒujī" },
      { id: 3, english: "компьютер", hanzi: "电脑", pinyin: "diànnǎo" },
      { id: 4, english: "номер", hanzi: "号码", pinyin: "hàomǎ" },
    ],
    correctOptionId: 2,
  },

  // ── 7-10 Fill-in-the-blank (几 vs 多少, 吧, 怎么 из книги стр. 76) ──
  {
    id: 8107,
    type: "fill_blank",
    sentence: "你的电话号码是___?",
    sentencePinyin: "Nǐ de diànhuà hàomǎ shì ___?",
    blankedWord: "多少",
    correctAnswer: "多少",
    hint: "«сколько» для больших чисел (номер телефона — много цифр)",
    instruction: "Вставь пропущенное слово: «Какой у тебя номер телефона?»",
    options: [
      { id: 1, hanzi: "几", pinyin: "jǐ" },
      { id: 2, hanzi: "多少", pinyin: "duōshao" },
      { id: 3, hanzi: "什么", pinyin: "shénme" },
      { id: 4, hanzi: "哪", pinyin: "nǎ" },
    ],
  },
  {
    id: 8108,
    type: "fill_blank",
    sentence: "你们早上___点上课?",
    sentencePinyin: "Nǐmen zǎoshang ___ diǎn shàngkè?",
    blankedWord: "几",
    correctAnswer: "几",
    hint: "«сколько» для малых чисел (часы — 1-24, с 几)",
    instruction: "Вставь пропущенное слово: «Во сколько у вас начинаются занятия утром?»",
    options: [
      { id: 1, hanzi: "几", pinyin: "jǐ" },
      { id: 2, hanzi: "多少", pinyin: "duōshao" },
      { id: 3, hanzi: "怎么", pinyin: "zěnme" },
      { id: 4, hanzi: "哪", pinyin: "nǎ" },
    ],
  },
  {
    id: 8109,
    type: "fill_blank",
    sentence: "去你们学校___走呢?",
    sentencePinyin: "Qù nǐmen xuéxiào ___ zǒu ne?",
    blankedWord: "怎么",
    correctAnswer: "怎么",
    hint: "вопросительное «как, каким образом»",
    instruction: "Вставь пропущенное слово: «А как добраться до вашего университета?»",
    options: [
      { id: 1, hanzi: "几", pinyin: "jǐ" },
      { id: 2, hanzi: "多少", pinyin: "duōshao" },
      { id: 3, hanzi: "怎么", pinyin: "zěnme" },
      { id: 4, hanzi: "哪儿", pinyin: "nǎr" },
    ],
  },
  {
    id: 8110,
    type: "fill_blank",
    sentence: "我们去看电影___!",
    sentencePinyin: "Wǒmen qù kàn diànyǐng ___!",
    blankedWord: "吧",
    correctAnswer: "吧",
    hint: "частица «давай...» — мягкое предложение",
    instruction: "Вставь пропущенное слово: «Давай пойдём в кино!»",
    options: [
      { id: 1, hanzi: "吗", pinyin: "ma" },
      { id: 2, hanzi: "吧", pinyin: "ba" },
      { id: 3, hanzi: "呢", pinyin: "ne" },
      { id: 4, hanzi: "了", pinyin: "le" },
    ],
  },

  // ── 11-13 Multiple choice (из диалогов и 替换练习 стр. 75) ─────
  {
    id: 8111,
    type: "multiple_choice",
    mandarin: { hanzi: "周末你有空儿吗？", pinyin: "Zhōumò nǐ yǒu kòngr ma?" },
    instruction: "«На выходных свободна?» Ты хочешь пригласить в университет на экскурсию. Как?",
    options: [
      {
        id: 1,
        english: "来我们学校玩儿吧！",
        mandarin: {
          hanzi: "来我们学校玩儿吧",
          pinyin: "Lái wǒmen xuéxiào wánr ba",
          words: [
            { hanzi: "来", pinyin: "lái", english: "приходить" },
            { hanzi: "我们", pinyin: "wǒmen", english: "мы" },
            { hanzi: "学校", pinyin: "xuéxiào", english: "университет" },
            { hanzi: "玩儿", pinyin: "wánr", english: "гулять" },
            { hanzi: "吧", pinyin: "ba", english: "(предложение)" },
          ],
          breakdown: "«Приезжай к нам в университет!» 吧 превращает утверждение в предложение.",
        },
      },
      {
        id: 2,
        english: "来我们学校玩儿吗？",
        mandarin: {
          hanzi: "来我们学校玩儿吗",
          pinyin: "Lái wǒmen xuéxiào wánr ma",
          words: [],
          breakdown: "С 吗 это просто вопрос «приедешь?», менее дружеское приглашение.",
        },
      },
      {
        id: 3,
        english: "我们学校来玩儿吧！",
        mandarin: {
          hanzi: "我们学校来玩儿吧",
          pinyin: "Wǒmen xuéxiào lái wánr ba",
          words: [],
          breakdown: "Неправильный порядок: 来 должно идти перед 学校.",
        },
      },
      {
        id: 4,
        english: "你去学校。",
        mandarin: {
          hanzi: "你去学校",
          pinyin: "Nǐ qù xuéxiào",
          words: [],
          breakdown: "«Ты идёшь в университет» — не предложение, а утверждение.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 8112,
    type: "multiple_choice",
    mandarin: { hanzi: "你的电话号码是多少？", pinyin: "Nǐ de diànhuà hàomǎ shì duōshao?" },
    instruction: "«Какой у тебя номер телефона?» Твой номер 63861023. Как сказать?",
    options: [
      {
        id: 1,
        english: "六三八六幺〇二三。",
        mandarin: {
          hanzi: "六三八六幺〇二三",
          pinyin: "Liù sān bā liù yāo líng èr sān",
          words: [
            { hanzi: "幺", pinyin: "yāo", english: "один (в номерах)" },
            { hanzi: "〇", pinyin: "líng", english: "ноль" },
          ],
          breakdown: "Номера читаются по одной цифре. 1 → 幺 (yāo), 0 → 〇 (líng).",
        },
      },
      {
        id: 2,
        english: "六千三百八十六千零二十三。",
        mandarin: {
          hanzi: "六千三百八十六千零二十三",
          pinyin: "Liù qiān sān bǎi bā shí liù qiān líng èr shí sān",
          words: [],
          breakdown: "Номера НЕ читаются как обычные числа — только по одной цифре.",
        },
      },
      {
        id: 3,
        english: "六三八六一〇二三。",
        mandarin: {
          hanzi: "六三八六一〇二三",
          pinyin: "Liù sān bā liù yī líng èr sān",
          words: [],
          breakdown: "Допустимо, но 1 в номерах обычно произносится как 幺 (yāo), чтобы не путать с 七.",
        },
      },
      {
        id: 4,
        english: "电话是多少。",
        mandarin: {
          hanzi: "电话是多少",
          pinyin: "Diànhuà shì duōshao",
          words: [],
          breakdown: "Это сам вопрос, а не ответ.",
        },
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 8113,
    type: "multiple_choice",
    mandarin: { hanzi: "去你们学校怎么走？", pinyin: "Qù nǐmen xuéxiào zěnme zǒu?" },
    instruction: "«Как добраться до вашего университета?» На автобусе 21 или 106. Как правильно ответить?",
    options: [
      {
        id: 1,
        english: "21路和106路公共汽车都到。",
        mandarin: {
          hanzi: "21路和106路公共汽车都到",
          pinyin: "Èrshíyī lù hé yāo líng liù lù gōnggòng qìchē dōu dào",
          words: [
            { hanzi: "路", pinyin: "lù", english: "маршрут" },
            { hanzi: "和", pinyin: "hé", english: "и" },
            { hanzi: "公共汽车", pinyin: "gōnggòng qìchē", english: "автобус" },
            { hanzi: "都", pinyin: "dōu", english: "все" },
            { hanzi: "到", pinyin: "dào", english: "доезжать" },
          ],
          breakdown: "«Автобусы 21 и 106 оба идут.» 和 = «и», 都 = «все, оба».",
        },
      },
      {
        id: 2,
        english: "21路也106路公共汽车。",
        mandarin: {
          hanzi: "21路也106路公共汽车",
          pinyin: "Èrshíyī lù yě yāo líng liù lù gōnggòng qìchē",
          words: [],
          breakdown: "也 значит «тоже», не соединяет существительные. Нужно 和.",
        },
      },
      {
        id: 3,
        english: "21路是106路。",
        mandarin: {
          hanzi: "21路是106路",
          pinyin: "Èrshíyī lù shì yāo líng liù lù",
          words: [],
          breakdown: "«21 маршрут — это 106 маршрут» — бессмыслица.",
        },
      },
      {
        id: 4,
        english: "我不知道怎么走。",
        mandarin: {
          hanzi: "我不知道怎么走",
          pinyin: "Wǒ bù zhīdào zěnme zǒu",
          words: [],
          breakdown: "«Не знаю как добраться» — но ты знаешь, поэтому не лучший ответ.",
        },
      },
    ],
    correctOptionId: 1,
  },

  // ── 14-15 Listening MC ─────────────────────────────────────────
  {
    id: 8114,
    type: "listening_mc",
    mandarin: {
      hanzi: "你的电话号码是多少",
      pinyin: "Nǐ de diànhuà hàomǎ shì duōshao",
      words: [
        { hanzi: "电话", pinyin: "diànhuà", english: "телефон" },
        { hanzi: "号码", pinyin: "hàomǎ", english: "номер" },
        { hanzi: "多少", pinyin: "duōshao", english: "сколько" },
      ],
      breakdown: "«Какой у тебя номер телефона?» Для номеров всегда 多少, не 几.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Какой у тебя номер телефона? — 你的电话号码是多少" },
      { id: 2, english: "Какой у тебя номер мобильного? — 你的手机号码是多少" },
      { id: 3, english: "Какой у тебя номер комнаты? — 你的房间号是多少" },
      { id: 4, english: "Сколько у тебя друзей? — 你有几个朋友" },
    ],
    correctOptionId: 1,
  },
  {
    id: 8115,
    type: "listening_mc",
    mandarin: {
      hanzi: "我们去看电影吧",
      pinyin: "Wǒmen qù kàn diànyǐng ba",
      words: [
        { hanzi: "我们", pinyin: "wǒmen", english: "мы" },
        { hanzi: "去", pinyin: "qù", english: "идти" },
        { hanzi: "看", pinyin: "kàn", english: "смотреть" },
        { hanzi: "电影", pinyin: "diànyǐng", english: "кино" },
        { hanzi: "吧", pinyin: "ba", english: "(предложение)" },
      ],
      breakdown: "«Давай пойдём в кино!» 吧 превращает утверждение в дружеское предложение.",
    },
    instruction: "Послушай и выбери правильный перевод",
    options: [
      { id: 1, english: "Давай пойдём в кино! — 我们去看电影吧" },
      { id: 2, english: "Пойдём в кино? — 我们去看电影吗" },
      { id: 3, english: "Давай пойдём в библиотеку! — 我们去图书馆吧" },
      { id: 4, english: "Мы смотрим кино — 我们看电影" },
    ],
    correctOptionId: 1,
  },

  // ── 16-17 Grammar ──────────────────────────────────────────────
  {
    id: 8116,
    type: "grammar",
    rule: {
      title: "Частица 吧 (2) — предложение «давай...»",
      explanation:
        "Второе значение 吧 (первое — «подтверждение», Глава 7). В конце утверждения 吧 превращает его в МЯГКОЕ ПРЕДЛОЖЕНИЕ, типа «давай» или «давайте».\n\n" +
        "Схема: Предложение + 吧！\n\n" +
        "Без 吧: 我们去图书馆。— «Мы идём в библиотеку» (утверждение)\n" +
        "С 吧: 我们去图书馆吧！— «Давай пойдём в библиотеку!»\n\n" +
        "Это не приказ, а дружеское предложение. Отличить от «подтверждения» легко — здесь нет вопроса в конце.",
      examples: [
        { hanzi: "来我们学校玩儿吧！", pinyin: "Lái wǒmen xuéxiào wánr ba!", english: "Приезжай к нам в университет!" },
        { hanzi: "我们骑自行车去吧！", pinyin: "Wǒmen qí zìxíngchē qù ba!", english: "Давай поедем на велосипедах!" },
        { hanzi: "来我家玩儿吧！", pinyin: "Lái wǒ jiā wánr ba!", english: "Приходи ко мне в гости!" },
      ],
    },
    practice: [
      {
        question: "Как мягко предложить «Давай поедем в библиотеку на велосипедах»?",
        options: [
          { id: 1, text: "我们骑自行车去图书馆吧" },
          { id: 2, text: "我们骑自行车去图书馆吗" },
          { id: 3, text: "我们吧骑自行车去图书馆" },
          { id: 4, text: "骑自行车图书馆去我们吧" },
        ],
        correctOptionId: 1,
      },
      {
        question: "Какой смысл у 我们去看电影吧?",
        options: [
          { id: 1, text: "Вопрос «идём ли мы в кино?»" },
          { id: 2, text: "Предложение «давай пойдём в кино»" },
          { id: 3, text: "Приказ «иди смотреть кино»" },
          { id: 4, text: "Отрицание «мы не пойдём в кино»" },
        ],
        correctOptionId: 2,
      },
    ],
  },
  {
    id: 8117,
    type: "grammar",
    rule: {
      title: "几 vs 多少 — когда что использовать",
      explanation:
        "Оба значат «сколько», но разница в ожидаемой величине:\n\n" +
        "• 几 (jǐ) — ожидается МАЛОЕ число (обычно до 10). Требует счётного слова.\n" +
        "  几点? — Который час? (1-24)\n" +
        "  你有几个朋友? — Сколько у тебя друзей? (ожидаю 1-10)\n\n" +
        "• 多少 (duōshao) — БОЛЬШОЕ число или точно не знаешь. Счётное слово НЕ обязательно.\n" +
        "  你的电话是多少? — Какой у тебя номер? (много цифр)\n" +
        "  多少学生? — Сколько студентов?\n\n" +
        "❗ Для номеров (телефона, дома, автобуса) ВСЕГДА 多少.",
      examples: [
        { hanzi: "你的房间号是多少？", pinyin: "Nǐ de fángjiān hào shì duōshao?", english: "Какой у тебя номер комнаты?" },
        { hanzi: "你的宿舍是几号楼？", pinyin: "Nǐ de sùshè shì jǐ hào lóu?", english: "В каком корпусе общежитие? (ожидается 1-9)" },
        { hanzi: "你有几个中国朋友？", pinyin: "Nǐ yǒu jǐ ge Zhōngguó péngyou?", english: "Сколько у тебя китайских друзей?" },
      ],
    },
    practice: [
      {
        question: "Как правильно спросить «Какой у Давэя номер телефона?»",
        options: [
          { id: 1, text: "大卫的电话号码是几？" },
          { id: 2, text: "大卫的电话号码是多少？" },
          { id: 3, text: "大卫的电话号码是几个？" },
          { id: 4, text: "大卫的电话号码是什么？" },
        ],
        correctOptionId: 2,
      },
      {
        question: "Как спросить «Сколько у тебя братьев?» (ожидается 1-3)?",
        options: [
          { id: 1, text: "你有多少哥哥？" },
          { id: 2, text: "你哥哥多少？" },
          { id: 3, text: "你有几个哥哥？" },
          { id: 4, text: "你哥哥几？" },
        ],
        correctOptionId: 3,
      },
    ],
  },

  // ── 18 Match pairs ─────────────────────────────────────────────
  {
    id: 8118,
    type: "match_pairs",
    instruction: "Соедини слова с переводом",
    pairs: [
      { id: 1, left: "电话", leftPinyin: "diànhuà", right: "телефон" },
      { id: 2, left: "号码", leftPinyin: "hàomǎ", right: "номер" },
      { id: 3, left: "多少", leftPinyin: "duōshao", right: "сколько (больш.)" },
      { id: 4, left: "怎么", leftPinyin: "zěnme", right: "как" },
      { id: 5, left: "周末", leftPinyin: "zhōumò", right: "выходные" },
      { id: 6, left: "手机", leftPinyin: "shǒujī", right: "мобильник" },
      { id: 7, left: "公共汽车", leftPinyin: "gōnggòng qìchē", right: "автобус" },
      { id: 8, left: "房间", leftPinyin: "fángjiān", right: "комната" },
    ],
  },

  // ── 19-20 Single response ──────────────────────────────────────
  {
    id: 8119,
    type: "single_response",
    mandarin: { hanzi: "你的电话号码是多少？", pinyin: "Nǐ de diànhuà hàomǎ shì duōshao?" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Какой у тебя номер телефона?",
        mandarin: {
          hanzi: "你的电话号码是多少",
          pinyin: "Nǐ de diànhuà hàomǎ shì duōshao",
          words: [
            { hanzi: "你", pinyin: "nǐ", english: "ты" },
            { hanzi: "的", pinyin: "de", english: "(притяж.)" },
            { hanzi: "电话", pinyin: "diànhuà", english: "телефон" },
            { hanzi: "号码", pinyin: "hàomǎ", english: "номер" },
            { hanzi: "多少", pinyin: "duōshao", english: "сколько" },
          ],
          breakdown: "Стандартный вопрос о номере телефона. Для номеров всегда 多少.",
        },
      },
    ],
  },
  {
    id: 8120,
    type: "single_response",
    mandarin: { hanzi: "来我们学校玩儿吧！", pinyin: "Lái wǒmen xuéxiào wánr ba!" },
    instruction: "Прочти вслух фразу",
    options: [
      {
        id: 1,
        english: "Приезжай к нам в университет в гости!",
        mandarin: {
          hanzi: "来我们学校玩儿吧",
          pinyin: "Lái wǒmen xuéxiào wánr ba",
          words: [
            { hanzi: "来", pinyin: "lái", english: "приходить" },
            { hanzi: "我们", pinyin: "wǒmen", english: "мы" },
            { hanzi: "学校", pinyin: "xuéxiào", english: "университет" },
            { hanzi: "玩儿", pinyin: "wánr", english: "гулять" },
            { hanzi: "吧", pinyin: "ba", english: "(предложение)" },
          ],
          breakdown: "Мягкое дружеское приглашение. 吧 в конце = «давай».",
        },
      },
    ],
  },
];

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
const ch8 = data.chapters.find((c) => c.id === 8);
if (!ch8) {
  console.error("Chapter 8 not found!");
  process.exit(1);
}

ch8.lessons[0].questions = questions;
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

const counts = {};
questions.forEach((q) => {
  counts[q.type] = (counts[q.type] || 0) + 1;
});

console.log("Chapter 8 exercises added:", questions.length);
console.log("Distribution:", counts);
