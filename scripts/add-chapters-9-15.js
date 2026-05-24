/**
 * Adds 20 exercises to each of Chapters 9-15 based on Boya Chinese Elementary I.
 * Source: 课堂练习 sections + theory_content.ts.
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

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 9 — 多少钱一瓶 (shopping, prices, measure words)
// ═══════════════════════════════════════════════════════════════════
const ch9 = [
  { id: 9101, type: "flashcard", mandarin: { hanzi: "买", pinyin: "Mǎi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "продавать", hanzi: "卖", pinyin: "mài" },
    { id: 2, english: "покупать", hanzi: "买", pinyin: "mǎi" },
    { id: 3, english: "давать", hanzi: "给", pinyin: "gěi" },
    { id: 4, english: "хотеть", hanzi: "要", pinyin: "yào" },
  ], correctOptionId: 2 },
  { id: 9102, type: "flashcard", mandarin: { hanzi: "钱", pinyin: "Qián" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "юань", hanzi: "块", pinyin: "kuài" },
    { id: 2, english: "мелочь", hanzi: "零钱", pinyin: "língqián" },
    { id: 3, english: "деньги", hanzi: "钱", pinyin: "qián" },
    { id: 4, english: "цена", hanzi: "价钱", pinyin: "jiàqian" },
  ], correctOptionId: 3 },
  { id: 9103, type: "flashcard", mandarin: { hanzi: "块", pinyin: "Kuài" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "юань (разговорн.)", hanzi: "块", pinyin: "kuài" },
    { id: 2, english: "цзяо (1/10)", hanzi: "毛", pinyin: "máo" },
    { id: 3, english: "деньги", hanzi: "钱", pinyin: "qián" },
    { id: 4, english: "копейка", hanzi: "分", pinyin: "fēn" },
  ], correctOptionId: 1 },
  { id: 9104, type: "flashcard", mandarin: { hanzi: "两", pinyin: "Liǎng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "два (в счёте)", hanzi: "二", pinyin: "èr" },
    { id: 2, english: "два (перед сч.словом)", hanzi: "两", pinyin: "liǎng" },
    { id: 3, english: "пара", hanzi: "双", pinyin: "shuāng" },
    { id: 4, english: "несколько", hanzi: "几", pinyin: "jǐ" },
  ], correctOptionId: 2 },
  { id: 9105, type: "flashcard", mandarin: { hanzi: "瓶", pinyin: "Píng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "книга (сч.сл.)", hanzi: "本", pinyin: "běn" },
    { id: 2, english: "бутылка (сч.сл.)", hanzi: "瓶", pinyin: "píng" },
    { id: 3, english: "транспорт (сч.сл.)", hanzi: "辆", pinyin: "liàng" },
    { id: 4, english: "штука (универс.)", hanzi: "个", pinyin: "gè" },
  ], correctOptionId: 2 },
  { id: 9106, type: "flashcard", mandarin: { hanzi: "要", pinyin: "Yào" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "хотеть, нуждаться", hanzi: "要", pinyin: "yào" },
    { id: 2, english: "идти", hanzi: "去", pinyin: "qù" },
    { id: 3, english: "смотреть", hanzi: "看", pinyin: "kàn" },
    { id: 4, english: "покупать", hanzi: "买", pinyin: "mǎi" },
  ], correctOptionId: 1 },
  { id: 9107, type: "fill_blank", sentence: "我要一___小词典。", sentencePinyin: "Wǒ yào yì ___ xiǎo cídiǎn.", blankedWord: "本", correctAnswer: "本", hint: "счётное слово для книг/словарей", instruction: "Вставь счётное слово: «Мне нужен маленький словарь.»", options: [
    { id: 1, hanzi: "本", pinyin: "běn" },
    { id: 2, hanzi: "瓶", pinyin: "píng" },
    { id: 3, hanzi: "个", pinyin: "gè" },
    { id: 4, hanzi: "辆", pinyin: "liàng" },
  ] },
  { id: 9108, type: "fill_blank", sentence: "我买___瓶啤酒。", sentencePinyin: "Wǒ mǎi ___ píng píjiǔ.", blankedWord: "两", correctAnswer: "两", hint: "«два» перед счётным словом",  instruction: "Вставь пропущенное слово: «Я покупаю две бутылки пива.»", options: [
    { id: 1, hanzi: "二", pinyin: "èr" },
    { id: 2, hanzi: "两", pinyin: "liǎng" },
    { id: 3, hanzi: "二十", pinyin: "èrshí" },
    { id: 4, hanzi: "几", pinyin: "jǐ" },
  ] },
  { id: 9109, type: "fill_blank", sentence: "这本词典二十___块。", sentencePinyin: "Zhè běn cídiǎn èrshí ___ kuài.", blankedWord: "二", correctAnswer: "二", hint: "«два» в составном числе (22)", instruction: "Вставь пропущенное слово: «Этот словарь 22 юаня.»", options: [
    { id: 1, hanzi: "二", pinyin: "èr" },
    { id: 2, hanzi: "两", pinyin: "liǎng" },
    { id: 3, hanzi: "十", pinyin: "shí" },
    { id: 4, hanzi: "百", pinyin: "bǎi" },
  ] },
  { id: 9110, type: "fill_blank", sentence: "多少___一瓶?", sentencePinyin: "Duōshao ___ yì píng?", blankedWord: "钱", correctAnswer: "钱", hint: "«деньги» — «сколько стоит»", instruction: "Вставь пропущенное слово: «Сколько за бутылку?»", options: [
    { id: 1, hanzi: "钱", pinyin: "qián" },
    { id: 2, hanzi: "块", pinyin: "kuài" },
    { id: 3, hanzi: "毛", pinyin: "máo" },
    { id: 4, hanzi: "分", pinyin: "fēn" },
  ] },
  { id: 9111, type: "multiple_choice", mandarin: { hanzi: "多少钱一瓶？", pinyin: "Duōshao qián yì píng?" }, instruction: "«Сколько за бутылку?» Цена 3.50 юаней. Как правильно ответить?", options: [
    { id: 1, english: "三块五。", mandarin: { hanzi: "三块五", pinyin: "Sān kuài wǔ", words: [{ hanzi: "块", pinyin: "kuài", english: "юань" }], breakdown: "3 юаня 5 мао. Последнее 毛 часто опускается." } },
    { id: 2, english: "三元五分。", mandarin: { hanzi: "三元五分", pinyin: "Sān yuán wǔ fēn", words: [], breakdown: "Формально правильно, но в разговоре 块/毛, не 元/分." } },
    { id: 3, english: "三十五块。", mandarin: { hanzi: "三十五块", pinyin: "Sānshíwǔ kuài", words: [], breakdown: "«35 юаней» — неверная сумма." } },
    { id: 4, english: "五块三。", mandarin: { hanzi: "五块三", pinyin: "Wǔ kuài sān", words: [], breakdown: "«5.30» — обратный порядок." } },
  ], correctOptionId: 1 },
  { id: 9112, type: "multiple_choice", mandarin: { hanzi: "你要哪本？", pinyin: "Nǐ yào nǎ běn?" }, instruction: "«Какую вы хотите?» Ты хочешь этот маленький словарь. Как ответить?", options: [
    { id: 1, english: "我要这本小词典。", mandarin: { hanzi: "我要这本小词典", pinyin: "Wǒ yào zhè běn xiǎo cídiǎn", words: [{ hanzi: "要", pinyin: "yào", english: "хотеть" }, { hanzi: "本", pinyin: "běn", english: "(сч.сл. книг)" }], breakdown: "我要 + 这 + 本 + 小 + 词典." } },
    { id: 2, english: "我要这词典。", mandarin: { hanzi: "我要这词典", pinyin: "Wǒ yào zhè cídiǎn", words: [], breakdown: "Нельзя без счётного слова: нужно 这本词典." } },
    { id: 3, english: "我买这。", mandarin: { hanzi: "我买这", pinyin: "Wǒ mǎi zhè", words: [], breakdown: "Незавершено, нужен объект." } },
    { id: 4, english: "这多少钱。", mandarin: { hanzi: "这多少钱", pinyin: "Zhè duōshao qián", words: [], breakdown: "«Сколько это стоит» — вопрос, не ответ." } },
  ], correctOptionId: 1 },
  { id: 9113, type: "multiple_choice", mandarin: { hanzi: "我没有零钱。", pinyin: "Wǒ méiyǒu língqián." }, instruction: "«У меня нет мелочи.» Что вежливо ответить?", options: [
    { id: 1, english: "没关系。", mandarin: { hanzi: "没关系", pinyin: "Méi guānxi", words: [], breakdown: "«Ничего страшного» — стандартный вежливый ответ." } },
    { id: 2, english: "对不起。", mandarin: { hanzi: "对不起", pinyin: "Duìbuqǐ", words: [], breakdown: "«Извините» — это собеседнику уже извинился, вы не должны." } },
    { id: 3, english: "不用谢。", mandarin: { hanzi: "不用谢", pinyin: "Búyòng xiè", words: [], breakdown: "«Не за что» — ответ на спасибо, не подходит." } },
    { id: 4, english: "我不知道。", mandarin: { hanzi: "我不知道", pinyin: "Wǒ bù zhīdào", words: [], breakdown: "«Не знаю» — не связано." } },
  ], correctOptionId: 1 },
  { id: 9114, type: "listening_mc", mandarin: { hanzi: "多少钱一瓶", pinyin: "Duōshao qián yì píng", words: [{ hanzi: "多少", pinyin: "duōshao", english: "сколько" }, { hanzi: "钱", pinyin: "qián", english: "деньги" }, { hanzi: "瓶", pinyin: "píng", english: "бутылка" }], breakdown: "«Сколько за бутылку?» Стандартный вопрос в магазине." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Сколько за бутылку? — 多少钱一瓶" },
    { id: 2, english: "Сколько бутылок? — 几瓶" },
    { id: 3, english: "Сколько за книгу? — 多少钱一本" },
    { id: 4, english: "Эта бутылка — 这瓶" },
  ], correctOptionId: 1 },
  { id: 9115, type: "listening_mc", mandarin: { hanzi: "一共九块四毛钱", pinyin: "Yígòng jiǔ kuài sì máo qián", words: [{ hanzi: "一共", pinyin: "yígòng", english: "всего" }, { hanzi: "块", pinyin: "kuài", english: "юань" }, { hanzi: "毛", pinyin: "máo", english: "мао (1/10)" }], breakdown: "Итоговая сумма: 9 юаней 4 мао = 9.40." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Итого 9.40 — 一共九块四毛钱" },
    { id: 2, english: "Итого 4.90 — 一共四块九毛钱" },
    { id: 3, english: "Всего 14 юаней — 一共十四块钱" },
    { id: 4, english: "У меня 9.40 — 我有九块四毛钱" },
  ], correctOptionId: 1 },
  { id: 9116, type: "grammar", rule: {
    title: "Счётные слова (量词) — обязательны с числами",
    explanation: "Между числом (или 这/那/几) и существительным ВСЕГДА ставится счётное слово.\n\nСхема: Число + 量词 + Сущ.\n\nОсновные:\n个 (ge) — универсальное\n本 (běn) — книги, словари\n瓶 (píng) — бутылки\n块 (kuài) — юани\n辆 (liàng) — транспорт\n位 (wèi) — вежливое для людей",
    examples: [
      { hanzi: "一本词典", pinyin: "yì běn cídiǎn", english: "один словарь" },
      { hanzi: "两瓶啤酒", pinyin: "liǎng píng píjiǔ", english: "две бутылки пива" },
      { hanzi: "一辆自行车", pinyin: "yí liàng zìxíngchē", english: "один велосипед" },
    ],
  }, practice: [
    { question: "Как правильно сказать «три книги»?", options: [
      { id: 1, text: "三书" },
      { id: 2, text: "三本书" },
      { id: 3, text: "三个书" },
      { id: 4, text: "本三书" },
    ], correctOptionId: 2 },
    { question: "Какое счётное слово для бутылок?", options: [
      { id: 1, text: "本" },
      { id: 2, text: "辆" },
      { id: 3, text: "瓶" },
      { id: 4, text: "个" },
    ], correctOptionId: 3 },
  ] },
  { id: 9117, type: "grammar", rule: {
    title: "二 и 两 — оба «два», но разные",
    explanation: "二 (èr):\n• в счёте (一二三...)\n• в составных числах (十二, 二十, 二十二)\n• в номерах (二号楼)\n\n两 (liǎng):\n• перед счётным словом: 两本书, 两个朋友\n• перед 千/万/亿\n\nПростое правило: счётное слово → 两; иначе → 二.",
    examples: [
      { hanzi: "两本书", pinyin: "liǎng běn shū", english: "две книги" },
      { hanzi: "十二块", pinyin: "shí'èr kuài", english: "12 юаней" },
      { hanzi: "两千块", pinyin: "liǎng qiān kuài", english: "2000 юаней" },
    ],
  }, practice: [
    { question: "Как правильно сказать «два друга»?", options: [
      { id: 1, text: "二个朋友" },
      { id: 2, text: "两个朋友" },
      { id: 3, text: "二朋友" },
      { id: 4, text: "两朋友" },
    ], correctOptionId: 2 },
    { question: "Как правильно сказать «22 юаня»?", options: [
      { id: 1, text: "二十两块" },
      { id: 2, text: "两十二块" },
      { id: 3, text: "二十二块" },
      { id: 4, text: "两十两块" },
    ], correctOptionId: 3 },
  ] },
  { id: 9118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "买", leftPinyin: "mǎi", right: "покупать" },
    { id: 2, left: "钱", leftPinyin: "qián", right: "деньги" },
    { id: 3, left: "块", leftPinyin: "kuài", right: "юань" },
    { id: 4, left: "瓶", leftPinyin: "píng", right: "бутылка" },
    { id: 5, left: "要", leftPinyin: "yào", right: "хотеть" },
    { id: 6, left: "啤酒", leftPinyin: "píjiǔ", right: "пиво" },
    { id: 7, left: "零钱", leftPinyin: "língqián", right: "мелочь" },
    { id: 8, left: "给", leftPinyin: "gěi", right: "давать" },
  ] },
  { id: 9119, type: "single_response", mandarin: { hanzi: "多少钱一瓶？", pinyin: "Duōshao qián yì píng?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Сколько за бутылку?", mandarin: { hanzi: "多少钱一瓶", pinyin: "Duōshao qián yì píng", words: [
      { hanzi: "多少", pinyin: "duōshao", english: "сколько" },
      { hanzi: "钱", pinyin: "qián", english: "деньги" },
      { hanzi: "一瓶", pinyin: "yì píng", english: "одна бутылка" },
    ], breakdown: "Сколько + деньги + одна бутылка. Типичный вопрос в магазине." } },
  ] },
  { id: 9120, type: "single_response", mandarin: { hanzi: "我要这本小词典。", pinyin: "Wǒ yào zhè běn xiǎo cídiǎn." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Я хочу этот маленький словарь.", mandarin: { hanzi: "我要这本小词典", pinyin: "Wǒ yào zhè běn xiǎo cídiǎn", words: [
      { hanzi: "要", pinyin: "yào", english: "хотеть" },
      { hanzi: "这本", pinyin: "zhè běn", english: "эта (книга)" },
      { hanzi: "小", pinyin: "xiǎo", english: "маленький" },
      { hanzi: "词典", pinyin: "cídiǎn", english: "словарь" },
    ], breakdown: "Я + хочу + эта (сч.сл.) + маленький + словарь." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 10 — 你家有几口人 (family)
// ═══════════════════════════════════════════════════════════════════
const ch10 = [
  { id: 10101, type: "flashcard", mandarin: { hanzi: "家", pinyin: "Jiā" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "семья, дом", hanzi: "家", pinyin: "jiā" },
    { id: 2, english: "школа", hanzi: "学校", pinyin: "xuéxiào" },
    { id: 3, english: "комната", hanzi: "房间", pinyin: "fángjiān" },
    { id: 4, english: "ребёнок", hanzi: "孩子", pinyin: "háizi" },
  ], correctOptionId: 1 },
  { id: 10102, type: "flashcard", mandarin: { hanzi: "爸爸", pinyin: "Bàba" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "мама", hanzi: "妈妈", pinyin: "māma" },
    { id: 2, english: "папа", hanzi: "爸爸", pinyin: "bàba" },
    { id: 3, english: "дедушка", hanzi: "爷爷", pinyin: "yéye" },
    { id: 4, english: "старший брат", hanzi: "哥哥", pinyin: "gēge" },
  ], correctOptionId: 2 },
  { id: 10103, type: "flashcard", mandarin: { hanzi: "哥哥", pinyin: "Gēge" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "младший брат", hanzi: "弟弟", pinyin: "dìdi" },
    { id: 2, english: "старшая сестра", hanzi: "姐姐", pinyin: "jiějie" },
    { id: 3, english: "старший брат", hanzi: "哥哥", pinyin: "gēge" },
    { id: 4, english: "младшая сестра", hanzi: "妹妹", pinyin: "mèimei" },
  ], correctOptionId: 3 },
  { id: 10104, type: "flashcard", mandarin: { hanzi: "孩子", pinyin: "Háizi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "ребёнок", hanzi: "孩子", pinyin: "háizi" },
    { id: 2, english: "студент", hanzi: "学生", pinyin: "xuésheng" },
    { id: 3, english: "семья", hanzi: "家庭", pinyin: "jiātíng" },
    { id: 4, english: "друг", hanzi: "朋友", pinyin: "péngyou" },
  ], correctOptionId: 1 },
  { id: 10105, type: "flashcard", mandarin: { hanzi: "还", pinyin: "Hái" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "тоже", hanzi: "也", pinyin: "yě" },
    { id: 2, english: "ещё, вдобавок", hanzi: "还", pinyin: "hái" },
    { id: 3, english: "только", hanzi: "只", pinyin: "zhǐ" },
    { id: 4, english: "оба", hanzi: "都", pinyin: "dōu" },
  ], correctOptionId: 2 },
  { id: 10106, type: "flashcard", mandarin: { hanzi: "狗", pinyin: "Gǒu" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "кошка", hanzi: "猫", pinyin: "māo" },
    { id: 2, english: "рыба", hanzi: "鱼", pinyin: "yú" },
    { id: 3, english: "собака", hanzi: "狗", pinyin: "gǒu" },
    { id: 4, english: "птица", hanzi: "鸟", pinyin: "niǎo" },
  ], correctOptionId: 3 },
  { id: 10107, type: "fill_blank", sentence: "你家有几___人?", sentencePinyin: "Nǐ jiā yǒu jǐ ___ rén?", blankedWord: "口", correctAnswer: "口", hint: "счётное слово для членов семьи", instruction: "Вставь счётное слово: «Сколько человек в твоей семье?»", options: [
    { id: 1, hanzi: "个", pinyin: "gè" },
    { id: 2, hanzi: "口", pinyin: "kǒu" },
    { id: 3, hanzi: "位", pinyin: "wèi" },
    { id: 4, hanzi: "本", pinyin: "běn" },
  ] },
  { id: 10108, type: "fill_blank", sentence: "我家有一___狗。", sentencePinyin: "Wǒ jiā yǒu yì ___ gǒu.", blankedWord: "条", correctAnswer: "条", hint: "счётное слово для длинных/гибких объектов (включая собак, рыб)", instruction: "Вставь счётное слово: «У нас дома одна собака.»", options: [
    { id: 1, hanzi: "个", pinyin: "gè" },
    { id: 2, hanzi: "条", pinyin: "tiáo" },
    { id: 3, hanzi: "口", pinyin: "kǒu" },
    { id: 4, hanzi: "只", pinyin: "zhǐ" },
  ] },
  { id: 10109, type: "fill_blank", sentence: "爸爸、妈妈，___有一个哥哥。", sentencePinyin: "Bàba, māma, ___ yǒu yí ge gēge.", blankedWord: "还", correctAnswer: "还", hint: "«ещё, вдобавок» — добавление",  instruction: "Вставь пропущенное слово: «Папа, мама, и ещё старший брат.»", options: [
    { id: 1, hanzi: "也", pinyin: "yě" },
    { id: 2, hanzi: "还", pinyin: "hái" },
    { id: 3, hanzi: "都", pinyin: "dōu" },
    { id: 4, hanzi: "就", pinyin: "jiù" },
  ] },
  { id: 10110, type: "fill_blank", sentence: "中国家庭一般___有一个孩子。", sentencePinyin: "Zhōngguó jiātíng yìbān ___ yǒu yí ge háizi.", blankedWord: "只", correctAnswer: "只", hint: "«только, лишь»",  instruction: "Вставь пропущенное слово: «Китайские семьи обычно имеют только одного ребёнка.»", options: [
    { id: 1, hanzi: "都", pinyin: "dōu" },
    { id: 2, hanzi: "也", pinyin: "yě" },
    { id: 3, hanzi: "只", pinyin: "zhǐ" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 10111, type: "multiple_choice", mandarin: { hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?" }, instruction: "«Сколько человек в твоей семье?» В твоей семье 5 человек. Как ответить?", options: [
    { id: 1, english: "我家有五口人。", mandarin: { hanzi: "我家有五口人", pinyin: "Wǒ jiā yǒu wǔ kǒu rén", words: [{ hanzi: "口", pinyin: "kǒu", english: "(сч.сл. семьи)" }], breakdown: "Особое счётное слово 口 используется ТОЛЬКО для членов семьи." } },
    { id: 2, english: "我家有五个人。", mandarin: { hanzi: "我家有五个人", pinyin: "Wǒ jiā yǒu wǔ ge rén", words: [], breakdown: "Понятно, но для семьи стандарт — 口, не 个." } },
    { id: 3, english: "我家五人。", mandarin: { hanzi: "我家五人", pinyin: "Wǒ jiā wǔ rén", words: [], breakdown: "Без 有 и без счётного слова — неверно." } },
    { id: 4, english: "五家人。", mandarin: { hanzi: "五家人", pinyin: "Wǔ jiā rén", words: [], breakdown: "«5 семей людей» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 10112, type: "multiple_choice", mandarin: { hanzi: "你没有哥哥姐姐吗？", pinyin: "Nǐ méiyǒu gēge jiějie ma?" }, instruction: "«Нет братьев/сестёр?» Сейчас в Китае обычно только один ребёнок. Как объяснить?", options: [
    { id: 1, english: "中国家庭一般只有一个孩子。", mandarin: { hanzi: "中国家庭一般只有一个孩子", pinyin: "Zhōngguó jiātíng yìbān zhǐ yǒu yí ge háizi", words: [{ hanzi: "一般", pinyin: "yìbān", english: "обычно" }, { hanzi: "只", pinyin: "zhǐ", english: "только" }], breakdown: "Стандартная фраза про политику одного ребёнка." } },
    { id: 2, english: "我不知道。", mandarin: { hanzi: "我不知道", pinyin: "Wǒ bù zhīdào", words: [], breakdown: "«Не знаю» — но ты же объясняешь свою ситуацию." } },
    { id: 3, english: "中国家庭很大。", mandarin: { hanzi: "中国家庭很大", pinyin: "Zhōngguó jiātíng hěn dà", words: [], breakdown: "«Китайская семья большая» — противоположный смысл." } },
    { id: 4, english: "我有弟弟。", mandarin: { hanzi: "我有弟弟", pinyin: "Wǒ yǒu dìdi", words: [], breakdown: "«У меня есть младший брат» — противоречит вопросу." } },
  ], correctOptionId: 1 },
  { id: 10113, type: "multiple_choice", mandarin: { hanzi: "你家都有什么人？", pinyin: "Nǐ jiā dōu yǒu shénme rén?" }, instruction: "«Кто есть в твоей семье?» В семье: папа, мама, старший брат. Как перечислить?", options: [
    { id: 1, english: "有爸爸、妈妈，还有一个哥哥。", mandarin: { hanzi: "有爸爸、妈妈，还有一个哥哥", pinyin: "Yǒu bàba, māma, hái yǒu yí ge gēge", words: [{ hanzi: "还有", pinyin: "hái yǒu", english: "и ещё есть" }], breakdown: "Для списка используется 还有 (и ещё)." } },
    { id: 2, english: "爸爸妈妈哥哥。", mandarin: { hanzi: "爸爸妈妈哥哥", pinyin: "Bàba māma gēge", words: [], breakdown: "Без глагола и союза — неграмотно." } },
    { id: 3, english: "有爸爸也妈妈也哥哥。", mandarin: { hanzi: "有爸爸也妈妈也哥哥", pinyin: "Yǒu bàba yě māma yě gēge", words: [], breakdown: "也 для списков не используется, нужно 还有." } },
    { id: 4, english: "我不想说。", mandarin: { hanzi: "我不想说", pinyin: "Wǒ bù xiǎng shuō", words: [], breakdown: "«Не хочу говорить» — грубо." } },
  ], correctOptionId: 1 },
  { id: 10114, type: "listening_mc", mandarin: { hanzi: "你家有几口人", pinyin: "Nǐ jiā yǒu jǐ kǒu rén", words: [{ hanzi: "几", pinyin: "jǐ", english: "сколько" }, { hanzi: "口", pinyin: "kǒu", english: "(сч.сл. семьи)" }], breakdown: "Стандартный вопрос о составе семьи." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Сколько у вас в семье? — 你家有几口人" },
    { id: 2, english: "Сколько у тебя братьев? — 你有几个哥哥" },
    { id: 3, english: "Где твой дом? — 你家在哪儿" },
    { id: 4, english: "У тебя есть дом? — 你有家吗" },
  ], correctOptionId: 1 },
  { id: 10115, type: "listening_mc", mandarin: { hanzi: "还有一条狗", pinyin: "Hái yǒu yì tiáo gǒu", words: [{ hanzi: "还有", pinyin: "hái yǒu", english: "и ещё" }, { hanzi: "条", pinyin: "tiáo", english: "(сч.сл.)" }, { hanzi: "狗", pinyin: "gǒu", english: "собака" }], breakdown: "«И ещё собака» — 条 используется для собак." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "И ещё собака — 还有一条狗" },
    { id: 2, english: "Есть собака — 有一条狗" },
    { id: 3, english: "И ещё кошка — 还有一只猫" },
    { id: 4, english: "Собака большая — 狗很大" },
  ], correctOptionId: 1 },
  { id: 10116, type: "grammar", rule: {
    title: "Счётное слово 口 — для членов семьи",
    explanation: "口 (kǒu) — специальное счётное слово для подсчёта человек В СЕМЬЕ. В других контекстах для людей используется 个.\n\nВопрос: 你家有几口人？\nОтвет: 我家有五口人。\n\nНЕЛЬЗЯ сказать 五口学生 или 五口朋友 — только про семью.",
    examples: [
      { hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", english: "Сколько в семье?" },
      { hanzi: "我家有五口人。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén.", english: "В семье 5 человек." },
    ],
  }, practice: [
    { question: "Как спросить «Сколько человек в семье Ли Цзюня»?", options: [
      { id: 1, text: "李军家有几个人？" },
      { id: 2, text: "李军家有几口人？" },
      { id: 3, text: "李军有几口？" },
      { id: 4, text: "李军家几口？" },
    ], correctOptionId: 2 },
    { question: "Можно ли сказать «三口学生»?", options: [
      { id: 1, text: "Да, правильно" },
      { id: 2, text: "Нет, 口 только для семьи" },
      { id: 3, text: "Да, но редко" },
      { id: 4, text: "Нет, нужно 三本学生" },
    ], correctOptionId: 2 },
  ] },
  { id: 10117, type: "grammar", rule: {
    title: "Наречие 还 — «ещё, вдобавок»",
    explanation: "还 (hái) добавляет что-то к уже сказанному. Ставится перед глаголом.\n\nЧасто в форме 还有... для продолжения списка:\n我有爸爸、妈妈，还有一个哥哥。\n«У меня папа, мама и ещё старший брат.»",
    examples: [
      { hanzi: "我家有爸爸、妈妈，还有一条狗。", pinyin: "Wǒ jiā yǒu bàba, māma, hái yǒu yì tiáo gǒu.", english: "Папа, мама и ещё собака." },
      { hanzi: "我有姐姐，还有一个妹妹。", pinyin: "Wǒ yǒu jiějie, hái yǒu yí ge mèimei.", english: "Старшая сестра и ещё младшая." },
    ],
  }, practice: [
    { question: "Как продолжить «У меня есть книга...» добавив «и ещё словарь»?", options: [
      { id: 1, text: "...也词典" },
      { id: 2, text: "...还有词典" },
      { id: 3, text: "...都词典" },
      { id: 4, text: "...就词典" },
    ], correctOptionId: 2 },
    { question: "Где обычно ставится 还?", options: [
      { id: 1, text: "В конце предложения" },
      { id: 2, text: "Перед глаголом" },
      { id: 3, text: "После объекта" },
      { id: 4, text: "В начале предложения всегда" },
    ], correctOptionId: 2 },
  ] },
  { id: 10118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "家", leftPinyin: "jiā", right: "семья" },
    { id: 2, left: "爸爸", leftPinyin: "bàba", right: "папа" },
    { id: 3, left: "妈妈", leftPinyin: "māma", right: "мама" },
    { id: 4, left: "哥哥", leftPinyin: "gēge", right: "ст. брат" },
    { id: 5, left: "姐姐", leftPinyin: "jiějie", right: "ст. сестра" },
    { id: 6, left: "弟弟", leftPinyin: "dìdi", right: "мл. брат" },
    { id: 7, left: "妹妹", leftPinyin: "mèimei", right: "мл. сестра" },
    { id: 8, left: "孩子", leftPinyin: "háizi", right: "ребёнок" },
  ] },
  { id: 10119, type: "single_response", mandarin: { hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Сколько человек в твоей семье?", mandarin: { hanzi: "你家有几口人", pinyin: "Nǐ jiā yǒu jǐ kǒu rén", words: [
      { hanzi: "你家", pinyin: "nǐ jiā", english: "твоя семья" },
      { hanzi: "有", pinyin: "yǒu", english: "иметь" },
      { hanzi: "几口", pinyin: "jǐ kǒu", english: "сколько (людей в семье)" },
    ], breakdown: "Классический вопрос о семье с 口." } },
  ] },
  { id: 10120, type: "single_response", mandarin: { hanzi: "我家有爸爸、妈妈，还有一条狗。", pinyin: "Wǒ jiā yǒu bàba, māma, hái yǒu yì tiáo gǒu." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "У нас дома папа, мама и ещё собака.", mandarin: { hanzi: "我家有爸爸、妈妈，还有一条狗", pinyin: "Wǒ jiā yǒu bàba, māma, hái yǒu yì tiáo gǒu", words: [
      { hanzi: "还有", pinyin: "hái yǒu", english: "и ещё есть" },
      { hanzi: "一条", pinyin: "yì tiáo", english: "одна (сч.сл.)" },
    ], breakdown: "Перечисление через 还有, 条 для собаки." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 11 — 北京的冬天比较冷 (weather, seasons)
// ═══════════════════════════════════════════════════════════════════
const ch11 = [
  { id: 11101, type: "flashcard", mandarin: { hanzi: "天气", pinyin: "Tiānqì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "день", hanzi: "天", pinyin: "tiān" },
    { id: 2, english: "погода", hanzi: "天气", pinyin: "tiānqì" },
    { id: 3, english: "сезон", hanzi: "季节", pinyin: "jìjié" },
    { id: 4, english: "температура", hanzi: "温度", pinyin: "wēndù" },
  ], correctOptionId: 2 },
  { id: 11102, type: "flashcard", mandarin: { hanzi: "怎么样", pinyin: "Zěnmeyàng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "как, каково", hanzi: "怎么样", pinyin: "zěnmeyàng" },
    { id: 2, english: "сколько", hanzi: "多少", pinyin: "duōshao" },
    { id: 3, english: "как (способ)", hanzi: "怎么", pinyin: "zěnme" },
    { id: 4, english: "что", hanzi: "什么", pinyin: "shénme" },
  ], correctOptionId: 1 },
  { id: 11103, type: "flashcard", mandarin: { hanzi: "冷", pinyin: "Lěng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "жаркий", hanzi: "热", pinyin: "rè" },
    { id: 2, english: "холодный", hanzi: "冷", pinyin: "lěng" },
    { id: 3, english: "тёплый", hanzi: "暖", pinyin: "nuǎn" },
    { id: 4, english: "прохладный", hanzi: "凉", pinyin: "liáng" },
  ], correctOptionId: 2 },
  { id: 11104, type: "flashcard", mandarin: { hanzi: "热", pinyin: "Rè" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "холодный", hanzi: "冷", pinyin: "lěng" },
    { id: 2, english: "жаркий", hanzi: "热", pinyin: "rè" },
    { id: 3, english: "тёплый", hanzi: "暖", pinyin: "nuǎn" },
    { id: 4, english: "приятный", hanzi: "舒服", pinyin: "shūfu" },
  ], correctOptionId: 2 },
  { id: 11105, type: "flashcard", mandarin: { hanzi: "喜欢", pinyin: "Xǐhuan" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "любить, нравиться", hanzi: "喜欢", pinyin: "xǐhuan" },
    { id: 2, english: "хотеть", hanzi: "要", pinyin: "yào" },
    { id: 3, english: "знать", hanzi: "知道", pinyin: "zhīdào" },
    { id: 4, english: "быть рад", hanzi: "高兴", pinyin: "gāoxìng" },
  ], correctOptionId: 1 },
  { id: 11106, type: "flashcard", mandarin: { hanzi: "最", pinyin: "Zuì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "очень", hanzi: "很", pinyin: "hěn" },
    { id: 2, english: "довольно", hanzi: "比较", pinyin: "bǐjiào" },
    { id: 3, english: "самый, наиболее", hanzi: "最", pinyin: "zuì" },
    { id: 4, english: "слишком", hanzi: "太", pinyin: "tài" },
  ], correctOptionId: 3 },
  { id: 11107, type: "fill_blank", sentence: "今天的天气___?", sentencePinyin: "Jīntiān de tiānqì ___?", blankedWord: "怎么样", correctAnswer: "怎么样", hint: "вопрос «как, каково?»", instruction: "Вставь пропущенное слово: «Какая сегодня погода?»", options: [
    { id: 1, hanzi: "怎么", pinyin: "zěnme" },
    { id: 2, hanzi: "怎么样", pinyin: "zěnmeyàng" },
    { id: 3, hanzi: "什么", pinyin: "shénme" },
    { id: 4, hanzi: "多少", pinyin: "duōshao" },
  ] },
  { id: 11108, type: "fill_blank", sentence: "北京的冬天___冷。", sentencePinyin: "Běijīng de dōngtiān ___ lěng.", blankedWord: "比较", correctAnswer: "比较", hint: "«сравнительно, довольно»", instruction: "Вставь пропущенное слово: «Зима в Пекине довольно холодная.»", options: [
    { id: 1, hanzi: "很", pinyin: "hěn" },
    { id: 2, hanzi: "比较", pinyin: "bǐjiào" },
    { id: 3, hanzi: "最", pinyin: "zuì" },
    { id: 4, hanzi: "太", pinyin: "tài" },
  ] },
  { id: 11109, type: "fill_blank", sentence: "秋天是___好的季节。", sentencePinyin: "Qiūtiān shì ___ hǎo de jìjié.", blankedWord: "最", correctAnswer: "最", hint: "«самый»", instruction: "Вставь пропущенное слово: «Осень — лучший сезон.»", options: [
    { id: 1, hanzi: "最", pinyin: "zuì" },
    { id: 2, hanzi: "很", pinyin: "hěn" },
    { id: 3, hanzi: "比较", pinyin: "bǐjiào" },
    { id: 4, hanzi: "不太", pinyin: "bú tài" },
  ] },
  { id: 11110, type: "fill_blank", sentence: "今天___冷，二十度。", sentencePinyin: "Jīntiān ___ lěng, èrshí dù.", blankedWord: "不", correctAnswer: "不", hint: "отрицание", instruction: "Вставь пропущенное слово: «Сегодня не холодно, 20 градусов.»", options: [
    { id: 1, hanzi: "不", pinyin: "bù" },
    { id: 2, hanzi: "没", pinyin: "méi" },
    { id: 3, hanzi: "很", pinyin: "hěn" },
    { id: 4, hanzi: "太", pinyin: "tài" },
  ] },
  { id: 11111, type: "multiple_choice", mandarin: { hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?" }, instruction: "«Какая сегодня погода?» Не очень, ветрено, днём дождь. Как ответить?", options: [
    { id: 1, english: "不太好，有风，下午还有雨。", mandarin: { hanzi: "不太好，有风，下午还有雨", pinyin: "Bú tài hǎo, yǒu fēng, xiàwǔ hái yǒu yǔ", words: [{ hanzi: "不太", pinyin: "bú tài", english: "не очень" }, { hanzi: "风", pinyin: "fēng", english: "ветер" }, { hanzi: "雨", pinyin: "yǔ", english: "дождь" }], breakdown: "Типичный ответ с описанием: плохо + ветер + дождь." } },
    { id: 2, english: "我不知道。", mandarin: { hanzi: "我不知道", pinyin: "Wǒ bù zhīdào", words: [], breakdown: "«Не знаю» — но ты в курсе." } },
    { id: 3, english: "今天是星期三。", mandarin: { hanzi: "今天是星期三", pinyin: "Jīntiān shì xīngqīsān", words: [], breakdown: "«Сегодня среда» — не отвечает на погоду." } },
    { id: 4, english: "天气有点儿贵。", mandarin: { hanzi: "天气有点儿贵", pinyin: "Tiānqì yǒudiǎnr guì", words: [], breakdown: "«Погода дороговата» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 11112, type: "multiple_choice", mandarin: { hanzi: "北京秋天的天气怎么样？", pinyin: "Běijīng qiūtiān de tiānqì zěnmeyàng?" }, instruction: "«Какая осенью погода в Пекине?» Не холодно и не жарко, комфортно. Как сказать?", options: [
    { id: 1, english: "不冷不热，很舒服。", mandarin: { hanzi: "不冷不热，很舒服", pinyin: "Bù lěng bú rè, hěn shūfu", words: [{ hanzi: "不...不...", pinyin: "bù...bù...", english: "ни... ни..." }, { hanzi: "舒服", pinyin: "shūfu", english: "комфортно" }], breakdown: "Конструкция 不A不B = «в самый раз»." } },
    { id: 2, english: "很冷也很热。", mandarin: { hanzi: "很冷也很热", pinyin: "Hěn lěng yě hěn rè", words: [], breakdown: "«Очень холодно и очень жарко» — противоречиво." } },
    { id: 3, english: "没有天气。", mandarin: { hanzi: "没有天气", pinyin: "Méiyǒu tiānqì", words: [], breakdown: "«Нет погоды» — бессмыслица." } },
    { id: 4, english: "我喜欢秋天。", mandarin: { hanzi: "我喜欢秋天", pinyin: "Wǒ xǐhuan qiūtiān", words: [], breakdown: "«Я люблю осень» — не про погоду." } },
  ], correctOptionId: 1 },
  { id: 11113, type: "multiple_choice", mandarin: { hanzi: "你最喜欢哪个季节？", pinyin: "Nǐ zuì xǐhuan nǎge jìjié?" }, instruction: "«Какой твой любимый сезон?» Ты любишь лето, любишь плавать. Как ответить?", options: [
    { id: 1, english: "我喜欢夏天，我喜欢游泳。", mandarin: { hanzi: "我喜欢夏天，我喜欢游泳", pinyin: "Wǒ xǐhuan xiàtiān, wǒ xǐhuan yóuyǒng", words: [{ hanzi: "夏天", pinyin: "xiàtiān", english: "лето" }, { hanzi: "游泳", pinyin: "yóuyǒng", english: "плавать" }], breakdown: "«Люблю лето, люблю плавать» — стандартный ответ." } },
    { id: 2, english: "夏天是季节。", mandarin: { hanzi: "夏天是季节", pinyin: "Xiàtiān shì jìjié", words: [], breakdown: "«Лето — это сезон» — тривиально." } },
    { id: 3, english: "我不喜欢冬天。", mandarin: { hanzi: "我不喜欢冬天", pinyin: "Wǒ bù xǐhuan dōngtiān", words: [], breakdown: "Отрицание — не отвечает на любимый." } },
    { id: 4, english: "最夏天喜欢。", mandarin: { hanzi: "最夏天喜欢", pinyin: "Zuì xiàtiān xǐhuan", words: [], breakdown: "Неправильный порядок слов." } },
  ], correctOptionId: 1 },
  { id: 11114, type: "listening_mc", mandarin: { hanzi: "北京的冬天比较冷", pinyin: "Běijīng de dōngtiān bǐjiào lěng", words: [{ hanzi: "冬天", pinyin: "dōngtiān", english: "зима" }, { hanzi: "比较", pinyin: "bǐjiào", english: "довольно" }], breakdown: "«Зима в Пекине довольно холодная»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Зима в Пекине довольно холодная — 北京的冬天比较冷" },
    { id: 2, english: "Лето в Пекине жаркое — 北京的夏天很热" },
    { id: 3, english: "Весна в Пекине тёплая — 北京的春天很暖" },
    { id: 4, english: "Осень в Пекине лучший сезон — 北京的秋天最好" },
  ], correctOptionId: 1 },
  { id: 11115, type: "listening_mc", mandarin: { hanzi: "今天不太好", pinyin: "Jīntiān bú tài hǎo", words: [{ hanzi: "不太", pinyin: "bú tài", english: "не очень" }, { hanzi: "好", pinyin: "hǎo", english: "хорошо" }], breakdown: "«Сегодня не очень» — вежливая форма «плохо»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Сегодня не очень — 今天不太好" },
    { id: 2, english: "Сегодня хорошо — 今天很好" },
    { id: 3, english: "Сегодня плохо — 今天不好" },
    { id: 4, english: "Сегодня слишком хорошо — 今天太好了" },
  ], correctOptionId: 1 },
  { id: 11116, type: "grammar", rule: {
    title: "Вопрос 怎么样 — «как?, каково?»",
    explanation: "怎么样 спрашивает о состоянии, качестве, мнении. Ставится В КОНЕЦ.\n\nСхема: Существительное + 怎么样?\n\n今天的天气怎么样？— Какая сегодня погода?\n这个电影怎么样？— Как этот фильм?",
    examples: [
      { hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?", english: "Какая погода?" },
      { hanzi: "这件毛衣怎么样？", pinyin: "Zhè jiàn máoyī zěnmeyàng?", english: "Как этот свитер?" },
    ],
  }, practice: [
    { question: "Где ставится 怎么样?", options: [
      { id: 1, text: "В начале предложения" },
      { id: 2, text: "В конце предложения" },
      { id: 3, text: "Перед глаголом" },
      { id: 4, text: "После подлежащего" },
    ], correctOptionId: 2 },
    { question: "Как спросить «Как здоровье у дедушки?»", options: [
      { id: 1, text: "怎么样爷爷的身体？" },
      { id: 2, text: "爷爷的身体是怎么样？" },
      { id: 3, text: "爷爷的身体怎么样？" },
      { id: 4, text: "爷爷怎么样身体？" },
    ], correctOptionId: 3 },
  ] },
  { id: 11117, type: "grammar", rule: {
    title: "Прилагательное-сказуемое без 是",
    explanation: "В китайском прилагательное САМО является сказуемым — 是 НЕ нужно.\n\n❌ 这个学校是小\n✅ 这个学校很小。\n\nБез наречия (很, 比较, 最...) звучит как сравнение. Поэтому 很 часто добавляют даже без значения «очень».",
    examples: [
      { hanzi: "北京的冬天很冷。", pinyin: "Běijīng de dōngtiān hěn lěng.", english: "Зима в Пекине холодная." },
      { hanzi: "今天的天气不太好。", pinyin: "Jīntiān de tiānqì bú tài hǎo.", english: "Сегодня не очень." },
    ],
  }, practice: [
    { question: "Как правильно сказать «Моя комната большая»?", options: [
      { id: 1, text: "我的房间是大" },
      { id: 2, text: "我的房间很大" },
      { id: 3, text: "我的房间是很大" },
      { id: 4, text: "大我的房间" },
    ], correctOptionId: 2 },
    { question: "Зачем добавляют 很 даже без значения «очень»?", options: [
      { id: 1, text: "Для эмфазы" },
      { id: 2, text: "Это обязательно по грамматике" },
      { id: 3, text: "Без 很 звучит как сравнение" },
      { id: 4, text: "Чтобы был красивый ритм" },
    ], correctOptionId: 3 },
  ] },
  { id: 11118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "天气", leftPinyin: "tiānqì", right: "погода" },
    { id: 2, left: "冷", leftPinyin: "lěng", right: "холодный" },
    { id: 3, left: "热", leftPinyin: "rè", right: "жаркий" },
    { id: 4, left: "春天", leftPinyin: "chūntiān", right: "весна" },
    { id: 5, left: "夏天", leftPinyin: "xiàtiān", right: "лето" },
    { id: 6, left: "秋天", leftPinyin: "qiūtiān", right: "осень" },
    { id: 7, left: "冬天", leftPinyin: "dōngtiān", right: "зима" },
    { id: 8, left: "喜欢", leftPinyin: "xǐhuan", right: "любить" },
  ] },
  { id: 11119, type: "single_response", mandarin: { hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Какая сегодня погода?", mandarin: { hanzi: "今天的天气怎么样", pinyin: "Jīntiān de tiānqì zěnmeyàng", words: [
      { hanzi: "今天", pinyin: "jīntiān", english: "сегодня" },
      { hanzi: "天气", pinyin: "tiānqì", english: "погода" },
      { hanzi: "怎么样", pinyin: "zěnmeyàng", english: "как?" },
    ], breakdown: "Стандартный вопрос о погоде." } },
  ] },
  { id: 11120, type: "single_response", mandarin: { hanzi: "北京的冬天比较冷。", pinyin: "Běijīng de dōngtiān bǐjiào lěng." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Зима в Пекине довольно холодная.", mandarin: { hanzi: "北京的冬天比较冷", pinyin: "Běijīng de dōngtiān bǐjiào lěng", words: [
      { hanzi: "北京", pinyin: "Běijīng", english: "Пекин" },
      { hanzi: "冬天", pinyin: "dōngtiān", english: "зима" },
      { hanzi: "比较", pinyin: "bǐjiào", english: "довольно" },
    ], breakdown: "北京 + 的 + 冬天 + 比较 + 冷. Прилагательное как сказуемое." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 12 — 你在干什么呢 (present continuous, days of week)
// ═══════════════════════════════════════════════════════════════════
const ch12 = [
  { id: 12101, type: "flashcard", mandarin: { hanzi: "作业", pinyin: "Zuòyè" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "занятие", hanzi: "课", pinyin: "kè" },
    { id: 2, english: "домашнее задание", hanzi: "作业", pinyin: "zuòyè" },
    { id: 3, english: "диктант", hanzi: "听写", pinyin: "tīngxiě" },
    { id: 4, english: "тест", hanzi: "考试", pinyin: "kǎoshì" },
  ], correctOptionId: 2 },
  { id: 12102, type: "flashcard", mandarin: { hanzi: "每", pinyin: "Měi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "все", hanzi: "都", pinyin: "dōu" },
    { id: 2, english: "каждый", hanzi: "每", pinyin: "měi" },
    { id: 3, english: "много", hanzi: "多", pinyin: "duō" },
    { id: 4, english: "только", hanzi: "只", pinyin: "zhǐ" },
  ], correctOptionId: 2 },
  { id: 12103, type: "flashcard", mandarin: { hanzi: "正在", pinyin: "Zhèngzài" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "сейчас (находиться)", hanzi: "在", pinyin: "zài" },
    { id: 2, english: "как раз, в процессе", hanzi: "正在", pinyin: "zhèngzài" },
    { id: 3, english: "прямо", hanzi: "一直", pinyin: "yìzhí" },
    { id: 4, english: "всегда", hanzi: "总是", pinyin: "zǒngshì" },
  ], correctOptionId: 2 },
  { id: 12104, type: "flashcard", mandarin: { hanzi: "喝", pinyin: "Hē" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "есть", hanzi: "吃", pinyin: "chī" },
    { id: 2, english: "пить", hanzi: "喝", pinyin: "hē" },
    { id: 3, english: "покупать", hanzi: "买", pinyin: "mǎi" },
    { id: 4, english: "видеть", hanzi: "看", pinyin: "kàn" },
  ], correctOptionId: 2 },
  { id: 12105, type: "flashcard", mandarin: { hanzi: "咖啡", pinyin: "Kāfēi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "чай", hanzi: "茶", pinyin: "chá" },
    { id: 2, english: "вода", hanzi: "水", pinyin: "shuǐ" },
    { id: 3, english: "кофе", hanzi: "咖啡", pinyin: "kāfēi" },
    { id: 4, english: "пиво", hanzi: "啤酒", pinyin: "píjiǔ" },
  ], correctOptionId: 3 },
  { id: 12106, type: "flashcard", mandarin: { hanzi: "喂", pinyin: "Wèi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "привет", hanzi: "你好", pinyin: "nǐ hǎo" },
    { id: 2, english: "алло (по телефону)", hanzi: "喂", pinyin: "wèi" },
    { id: 3, english: "до свидания", hanzi: "再见", pinyin: "zàijiàn" },
    { id: 4, english: "конечно", hanzi: "当然", pinyin: "dāngrán" },
  ], correctOptionId: 2 },
  { id: 12107, type: "fill_blank", sentence: "你___干什么呢?", sentencePinyin: "Nǐ ___ gàn shénme ne?", blankedWord: "在", correctAnswer: "在", hint: "продолженное время «сейчас»", instruction: "Вставь пропущенное слово: «Что ты сейчас делаешь?»", options: [
    { id: 1, hanzi: "在", pinyin: "zài" },
    { id: 2, hanzi: "是", pinyin: "shì" },
    { id: 3, hanzi: "有", pinyin: "yǒu" },
    { id: 4, hanzi: "了", pinyin: "le" },
  ] },
  { id: 12108, type: "fill_blank", sentence: "今天是星期___。", sentencePinyin: "Jīntiān shì xīngqī ___.", blankedWord: "三", correctAnswer: "三", hint: "среда = xīngqīsān", instruction: "Вставь пропущенное слово: «Сегодня среда.»", options: [
    { id: 1, hanzi: "一", pinyin: "yī" },
    { id: 2, hanzi: "三", pinyin: "sān" },
    { id: 3, hanzi: "天", pinyin: "tiān" },
    { id: 4, hanzi: "日", pinyin: "rì" },
  ] },
  { id: 12109, type: "fill_blank", sentence: "我每天都___咖啡。", sentencePinyin: "Wǒ měi tiān dōu ___ kāfēi.", blankedWord: "喝", correctAnswer: "喝", hint: "глагол «пить»", instruction: "Вставь пропущенное слово: «Я каждый день пью кофе.»", options: [
    { id: 1, hanzi: "吃", pinyin: "chī" },
    { id: 2, hanzi: "喝", pinyin: "hē" },
    { id: 3, hanzi: "买", pinyin: "mǎi" },
    { id: 4, hanzi: "是", pinyin: "shì" },
  ] },
  { id: 12110, type: "fill_blank", sentence: "___早上八点___中午十二点，我有课。", sentencePinyin: "___ zǎoshang bā diǎn ___ zhōngwǔ shí'èr diǎn, wǒ yǒu kè.", blankedWord: "从...到", correctAnswer: "从", hint: "«от... до...» — пара 从...到", instruction: "Вставь первое слово: «С 8 утра до 12 у меня занятия.»", options: [
    { id: 1, hanzi: "从", pinyin: "cóng" },
    { id: 2, hanzi: "在", pinyin: "zài" },
    { id: 3, hanzi: "有", pinyin: "yǒu" },
    { id: 4, hanzi: "每", pinyin: "měi" },
  ] },
  { id: 12111, type: "multiple_choice", mandarin: { hanzi: "你在干什么呢？", pinyin: "Nǐ zài gàn shénme ne?" }, instruction: "«Что сейчас делаешь?» Делаешь уроки. Как ответить?", options: [
    { id: 1, english: "我正在做作业呢。", mandarin: { hanzi: "我正在做作业呢", pinyin: "Wǒ zhèngzài zuò zuòyè ne", words: [{ hanzi: "正在", pinyin: "zhèngzài", english: "как раз" }, { hanzi: "作业", pinyin: "zuòyè", english: "уроки" }], breakdown: "Полная форма продолженного: 正在 + глагол + 呢." } },
    { id: 2, english: "我做作业了。", mandarin: { hanzi: "我做作业了", pinyin: "Wǒ zuò zuòyè le", words: [], breakdown: "«Я сделал уроки» — прошедшее время с 了." } },
    { id: 3, english: "我没有作业。", mandarin: { hanzi: "我没有作业", pinyin: "Wǒ méiyǒu zuòyè", words: [], breakdown: "«У меня нет уроков» — не отвечает на «что делаешь»." } },
    { id: 4, english: "作业我做。", mandarin: { hanzi: "作业我做", pinyin: "Zuòyè wǒ zuò", words: [], breakdown: "Странный порядок — объект до подлежащего." } },
  ], correctOptionId: 1 },
  { id: 12112, type: "multiple_choice", mandarin: { hanzi: "今天是星期几？", pinyin: "Jīntiān shì xīngqī jǐ?" }, instruction: "«Какой сегодня день?» Пятница. Как ответить?", options: [
    { id: 1, english: "今天是星期五。", mandarin: { hanzi: "今天是星期五", pinyin: "Jīntiān shì xīngqīwǔ", words: [{ hanzi: "星期五", pinyin: "xīngqīwǔ", english: "пятница" }], breakdown: "Пятница = 星期+五 (пятое число)." } },
    { id: 2, english: "今天五。", mandarin: { hanzi: "今天五", pinyin: "Jīntiān wǔ", words: [], breakdown: "Без 星期 — неполно." } },
    { id: 3, english: "星期五天今。", mandarin: { hanzi: "星期五天今", pinyin: "Xīngqīwǔ tiān jīn", words: [], breakdown: "Порядок неправильный." } },
    { id: 4, english: "我不知道星期。", mandarin: { hanzi: "我不知道星期", pinyin: "Wǒ bù zhīdào xīngqī", words: [], breakdown: "«Не знаю недели» — бессмысленно." } },
  ], correctOptionId: 1 },
  { id: 12113, type: "multiple_choice", mandarin: { hanzi: "你每天都有很多作业吗？", pinyin: "Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?" }, instruction: "«Каждый день много уроков?» Сегодня много, так как есть диктант. Как объяснить?", options: [
    { id: 1, english: "今天作业很多，明天有听写。", mandarin: { hanzi: "今天作业很多，明天有听写", pinyin: "Jīntiān zuòyè hěn duō, míngtiān yǒu tīngxiě", words: [{ hanzi: "听写", pinyin: "tīngxiě", english: "диктант" }], breakdown: "Объяснение причины: сегодня много + причина." } },
    { id: 2, english: "每天没有作业。", mandarin: { hanzi: "每天没有作业", pinyin: "Měi tiān méiyǒu zuòyè", words: [], breakdown: "«Каждый день нет уроков» — неверно." } },
    { id: 3, english: "我不喜欢作业。", mandarin: { hanzi: "我不喜欢作业", pinyin: "Wǒ bù xǐhuan zuòyè", words: [], breakdown: "«Не люблю уроки» — не отвечает." } },
    { id: 4, english: "作业是书。", mandarin: { hanzi: "作业是书", pinyin: "Zuòyè shì shū", words: [], breakdown: "«Уроки — это книга» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 12114, type: "listening_mc", mandarin: { hanzi: "你在干什么呢", pinyin: "Nǐ zài gàn shénme ne", words: [{ hanzi: "在", pinyin: "zài", english: "(продолж.)" }, { hanzi: "干", pinyin: "gàn", english: "делать" }], breakdown: "«Что ты сейчас делаешь?» 在+глагол+呢." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Что ты сейчас делаешь? — 你在干什么呢" },
    { id: 2, english: "Что ты сделал? — 你做什么了" },
    { id: 3, english: "Что это? — 这是什么" },
    { id: 4, english: "Где ты? — 你在哪儿" },
  ], correctOptionId: 1 },
  { id: 12115, type: "listening_mc", mandarin: { hanzi: "我在酒吧喝咖啡呢", pinyin: "Wǒ zài jiǔbā hē kāfēi ne", words: [{ hanzi: "酒吧", pinyin: "jiǔbā", english: "бар" }, { hanzi: "喝", pinyin: "hē", english: "пить" }, { hanzi: "咖啡", pinyin: "kāfēi", english: "кофе" }], breakdown: "«Я в баре пью кофе»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Я в баре пью кофе — 我在酒吧喝咖啡呢" },
    { id: 2, english: "Я в библиотеке читаю — 我在图书馆看书呢" },
    { id: 3, english: "Я дома ем — 我在家吃饭呢" },
    { id: 4, english: "Я пью чай — 我喝茶" },
  ], correctOptionId: 1 },
  { id: 12116, type: "grammar", rule: {
    title: "Настоящее продолженное: 正在/在...呢",
    explanation: "Чтобы сказать «я делаю X прямо сейчас»:\n\n• 正在 + Глагол + 呢 (полная форма)\n• 在 + Глагол + 呢\n• Глагол + 呢\n\nВсе три означают примерно одно.\n\n你在干什么呢？— Что сейчас делаешь?\n我正在做作业呢。— Делаю уроки.\n\nОтрицание: 没 + Глагол (без 在 и 呢).",
    examples: [
      { hanzi: "你在干什么呢？", pinyin: "Nǐ zài gàn shénme ne?", english: "Что сейчас делаешь?" },
      { hanzi: "他们正在唱歌呢。", pinyin: "Tāmen zhèngzài chàng gē ne.", english: "Они сейчас поют." },
    ],
  }, practice: [
    { question: "Как сказать «Я сейчас пью кофе»?", options: [
      { id: 1, text: "我正在喝咖啡呢" },
      { id: 2, text: "我喝了咖啡" },
      { id: 3, text: "我喝咖啡明天" },
      { id: 4, text: "咖啡正在我喝" },
    ], correctOptionId: 1 },
    { question: "Какое значение у 呢 в конце «我吃饭呢»?", options: [
      { id: 1, text: "Встречный вопрос «а ты?»" },
      { id: 2, text: "Указание на продолжающееся действие" },
      { id: 3, text: "Вопрос" },
      { id: 4, text: "Прошедшее время" },
    ], correctOptionId: 2 },
  ] },
  { id: 12117, type: "grammar", rule: {
    title: "从...到 — «от... до...»",
    explanation: "从 A 到 B = «от A до B». И для времени, и для места.\n\nВремя:\n从早上八点到中午十二点 — с 8 утра до полудня\n从星期一到星期五 — с пн по пт\n\nМесто:\n从北京到上海 — из Пекина в Шанхай\n\nВсегда пара: если 从, то должно быть 到.",
    examples: [
      { hanzi: "从早上八点到十二点有课。", pinyin: "Cóng zǎoshang bā diǎn dào shí'èr diǎn yǒu kè.", english: "С 8 утра до 12 занятия." },
      { hanzi: "从北京到上海很远。", pinyin: "Cóng Běijīng dào Shànghǎi hěn yuǎn.", english: "От Пекина до Шанхая далеко." },
    ],
  }, practice: [
    { question: "Как сказать «с понедельника по пятницу»?", options: [
      { id: 1, text: "从星期一到星期五" },
      { id: 2, text: "星期一和星期五" },
      { id: 3, text: "星期一到星期五从" },
      { id: 4, text: "从星期五到星期一" },
    ], correctOptionId: 1 },
    { question: "Какое слово идёт в паре с 从?", options: [
      { id: 1, text: "了" },
      { id: 2, text: "也" },
      { id: 3, text: "到" },
      { id: 4, text: "在" },
    ], correctOptionId: 3 },
  ] },
  { id: 12118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "作业", leftPinyin: "zuòyè", right: "уроки" },
    { id: 2, left: "每", leftPinyin: "měi", right: "каждый" },
    { id: 3, left: "正在", leftPinyin: "zhèngzài", right: "как раз" },
    { id: 4, left: "星期", leftPinyin: "xīngqī", right: "неделя" },
    { id: 5, left: "咖啡", leftPinyin: "kāfēi", right: "кофе" },
    { id: 6, left: "酒吧", leftPinyin: "jiǔbā", right: "бар" },
    { id: 7, left: "喂", leftPinyin: "wèi", right: "алло" },
    { id: 8, left: "从...到", leftPinyin: "cóng...dào", right: "от...до" },
  ] },
  { id: 12119, type: "single_response", mandarin: { hanzi: "你在干什么呢？", pinyin: "Nǐ zài gàn shénme ne?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Что ты сейчас делаешь?", mandarin: { hanzi: "你在干什么呢", pinyin: "Nǐ zài gàn shénme ne", words: [
      { hanzi: "在", pinyin: "zài", english: "(продолж.)" },
      { hanzi: "干", pinyin: "gàn", english: "делать" },
      { hanzi: "呢", pinyin: "ne", english: "(частица)" },
    ], breakdown: "Формула продолженного: 在 + глагол + 呢." } },
  ] },
  { id: 12120, type: "single_response", mandarin: { hanzi: "我正在做作业呢。", pinyin: "Wǒ zhèngzài zuò zuòyè ne." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Я сейчас делаю уроки.", mandarin: { hanzi: "我正在做作业呢", pinyin: "Wǒ zhèngzài zuò zuòyè ne", words: [
      { hanzi: "正在", pinyin: "zhèngzài", english: "как раз" },
      { hanzi: "做", pinyin: "zuò", english: "делать" },
      { hanzi: "作业", pinyin: "zuòyè", english: "уроки" },
    ], breakdown: "Полная форма: 正在 + 做作业 + 呢." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 13 — 我去图书馆借书 (serial verbs, 先...然后)
// ═══════════════════════════════════════════════════════════════════
const ch13 = [
  { id: 13101, type: "flashcard", mandarin: { hanzi: "借", pinyin: "Jiè" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "покупать", hanzi: "买", pinyin: "mǎi" },
    { id: 2, english: "брать/давать взаймы", hanzi: "借", pinyin: "jiè" },
    { id: 3, english: "менять", hanzi: "换", pinyin: "huàn" },
    { id: 4, english: "давать", hanzi: "给", pinyin: "gěi" },
  ], correctOptionId: 2 },
  { id: 13102, type: "flashcard", mandarin: { hanzi: "银行", pinyin: "Yínháng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "школа", hanzi: "学校", pinyin: "xuéxiào" },
    { id: 2, english: "банк", hanzi: "银行", pinyin: "yínháng" },
    { id: 3, english: "магазин", hanzi: "商店", pinyin: "shāngdiàn" },
    { id: 4, english: "ТЦ", hanzi: "购物中心", pinyin: "gòuwù zhōngxīn" },
  ], correctOptionId: 2 },
  { id: 13103, type: "flashcard", mandarin: { hanzi: "咱们", pinyin: "Zánmen" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "мы (общее)", hanzi: "我们", pinyin: "wǒmen" },
    { id: 2, english: "мы (с тобой)", hanzi: "咱们", pinyin: "zánmen" },
    { id: 3, english: "вы", hanzi: "你们", pinyin: "nǐmen" },
    { id: 4, english: "они", hanzi: "他们", pinyin: "tāmen" },
  ], correctOptionId: 2 },
  { id: 13104, type: "flashcard", mandarin: { hanzi: "一起", pinyin: "Yìqǐ" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "вместе", hanzi: "一起", pinyin: "yìqǐ" },
    { id: 2, english: "отдельно", hanzi: "分开", pinyin: "fēnkāi" },
    { id: 3, english: "один", hanzi: "一个", pinyin: "yí ge" },
    { id: 4, english: "сначала", hanzi: "先", pinyin: "xiān" },
  ], correctOptionId: 1 },
  { id: 13105, type: "flashcard", mandarin: { hanzi: "东西", pinyin: "Dōngxi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "восток", hanzi: "东", pinyin: "dōng" },
    { id: 2, english: "вещь, вещи", hanzi: "东西", pinyin: "dōngxi" },
    { id: 3, english: "товар", hanzi: "商品", pinyin: "shāngpǐn" },
    { id: 4, english: "покупка", hanzi: "购物", pinyin: "gòuwù" },
  ], correctOptionId: 2 },
  { id: 13106, type: "flashcard", mandarin: { hanzi: "贵", pinyin: "Guì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "дешёвый", hanzi: "便宜", pinyin: "piányi" },
    { id: 2, english: "дорогой", hanzi: "贵", pinyin: "guì" },
    { id: 3, english: "хороший", hanzi: "好", pinyin: "hǎo" },
    { id: 4, english: "красивый", hanzi: "漂亮", pinyin: "piàoliang" },
  ], correctOptionId: 2 },
  { id: 13107, type: "fill_blank", sentence: "我去图书馆___书。", sentencePinyin: "Wǒ qù túshūguǎn ___ shū.", blankedWord: "借", correctAnswer: "借", hint: "«брать взаймы»", instruction: "Вставь пропущенное слово: «Иду в библиотеку за книгой.»", options: [
    { id: 1, hanzi: "买", pinyin: "mǎi" },
    { id: 2, hanzi: "借", pinyin: "jiè" },
    { id: 3, hanzi: "给", pinyin: "gěi" },
    { id: 4, hanzi: "换", pinyin: "huàn" },
  ] },
  { id: 13108, type: "fill_blank", sentence: "我___去银行换钱，___去商店买东西。", sentencePinyin: "Wǒ ___ qù yínháng huàn qián, ___ qù shāngdiàn mǎi dōngxi.", blankedWord: "先", correctAnswer: "先", hint: "«сначала» (первое слово пары)", instruction: "Вставь первое слово: «Сначала в банк, потом в магазин.»", options: [
    { id: 1, hanzi: "先", pinyin: "xiān" },
    { id: 2, hanzi: "然后", pinyin: "ránhòu" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "都", pinyin: "dōu" },
  ] },
  { id: 13109, type: "fill_blank", sentence: "那儿的东西贵___贵?", sentencePinyin: "Nàr de dōngxi guì ___ guì?", blankedWord: "不", correctAnswer: "不", hint: "A 不 A = вопросительная форма", instruction: "Вставь пропущенное слово: «Там дорого или нет?»", options: [
    { id: 1, hanzi: "不", pinyin: "bù" },
    { id: 2, hanzi: "没", pinyin: "méi" },
    { id: 3, hanzi: "吗", pinyin: "ma" },
    { id: 4, hanzi: "了", pinyin: "le" },
  ] },
  { id: 13110, type: "fill_blank", sentence: "___一起去吧!", sentencePinyin: "___ yìqǐ qù ba!", blankedWord: "咱们", correctAnswer: "咱们", hint: "«мы (с тобой)» — инклюзивное", instruction: "Вставь пропущенное слово: «Давай вместе (мы с тобой) пойдём!»", options: [
    { id: 1, hanzi: "我们", pinyin: "wǒmen" },
    { id: 2, hanzi: "咱们", pinyin: "zánmen" },
    { id: 3, hanzi: "你们", pinyin: "nǐmen" },
    { id: 4, hanzi: "他们", pinyin: "tāmen" },
  ] },
  { id: 13111, type: "multiple_choice", mandarin: { hanzi: "你去哪儿？", pinyin: "Nǐ qù nǎr?" }, instruction: "«Куда идёшь?» Идёшь в библиотеку за книгой. Как ответить?", options: [
    { id: 1, english: "我去图书馆借书。", mandarin: { hanzi: "我去图书馆借书", pinyin: "Wǒ qù túshūguǎn jiè shū", words: [{ hanzi: "去", pinyin: "qù", english: "идти" }, { hanzi: "借", pinyin: "jiè", english: "брать" }], breakdown: "Последовательные глаголы: 去 + место + 2-й глагол." } },
    { id: 2, english: "我图书馆去借书。", mandarin: { hanzi: "我图书馆去借书", pinyin: "Wǒ túshūguǎn qù jiè shū", words: [], breakdown: "Неправильный порядок — 去 должен быть перед местом." } },
    { id: 3, english: "我借书图书馆。", mandarin: { hanzi: "我借书图书馆", pinyin: "Wǒ jiè shū túshūguǎn", words: [], breakdown: "Место должно идти после 去, не после объекта." } },
    { id: 4, english: "借书图书馆去。", mandarin: { hanzi: "借书图书馆去", pinyin: "Jiè shū túshūguǎn qù", words: [], breakdown: "Порядок полностью неправильный." } },
  ], correctOptionId: 1 },
  { id: 13112, type: "multiple_choice", mandarin: { hanzi: "明天你打算干什么？", pinyin: "Míngtiān nǐ dǎsuàn gàn shénme?" }, instruction: "«Что планируешь завтра?» Сначала в банк, потом в магазин. Как правильно?", options: [
    { id: 1, english: "先去银行，然后去商店。", mandarin: { hanzi: "先去银行，然后去商店", pinyin: "Xiān qù yínháng, ránhòu qù shāngdiàn", words: [{ hanzi: "先", pinyin: "xiān", english: "сначала" }, { hanzi: "然后", pinyin: "ránhòu", english: "затем" }], breakdown: "Пара 先...然后 для последовательности." } },
    { id: 2, english: "去银行也去商店。", mandarin: { hanzi: "去银行也去商店", pinyin: "Qù yínháng yě qù shāngdiàn", words: [], breakdown: "也 = «тоже», не показывает последовательность." } },
    { id: 3, english: "然后银行先商店。", mandarin: { hanzi: "然后银行先商店", pinyin: "Ránhòu yínháng xiān shāngdiàn", words: [], breakdown: "Порядок перевёрнут." } },
    { id: 4, english: "银行商店去。", mandarin: { hanzi: "银行商店去", pinyin: "Yínháng shāngdiàn qù", words: [], breakdown: "Без связи и в неправильном порядке." } },
  ], correctOptionId: 1 },
  { id: 13113, type: "multiple_choice", mandarin: { hanzi: "那儿的东西贵不贵？", pinyin: "Nàr de dōngxi guì bu guì?" }, instruction: "«Там дорого?» Нормально, много всего и качество неплохое. Как ответить?", options: [
    { id: 1, english: "还可以，东西很多，质量不错。", mandarin: { hanzi: "还可以，东西很多，质量不错", pinyin: "Hái kěyǐ, dōngxi hěn duō, zhìliàng búcuò", words: [{ hanzi: "还可以", pinyin: "hái kěyǐ", english: "нормально" }, { hanzi: "不错", pinyin: "búcuò", english: "неплохо" }], breakdown: "Типичный нейтрально-положительный ответ." } },
    { id: 2, english: "太贵了。", mandarin: { hanzi: "太贵了", pinyin: "Tài guì le", words: [], breakdown: "«Слишком дорого» — а по сюжету нормально." } },
    { id: 3, english: "贵吗？", mandarin: { hanzi: "贵吗", pinyin: "Guì ma", words: [], breakdown: "Встречный вопрос, а не ответ." } },
    { id: 4, english: "我不买。", mandarin: { hanzi: "我不买", pinyin: "Wǒ bù mǎi", words: [], breakdown: "«Не куплю» — не отвечает на цену." } },
  ], correctOptionId: 1 },
  { id: 13114, type: "listening_mc", mandarin: { hanzi: "我去图书馆借书", pinyin: "Wǒ qù túshūguǎn jiè shū", words: [{ hanzi: "去", pinyin: "qù", english: "идти" }, { hanzi: "借", pinyin: "jiè", english: "брать взаймы" }], breakdown: "«Иду в библиотеку за книгой». Два глагола подряд." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Иду в библиотеку за книгой — 我去图书馆借书" },
    { id: 2, english: "Иду в магазин — 我去商店" },
    { id: 3, english: "Читаю книгу в библиотеке — 我在图书馆看书" },
    { id: 4, english: "Покупаю книгу — 我买书" },
  ], correctOptionId: 1 },
  { id: 13115, type: "listening_mc", mandarin: { hanzi: "咱们一起去吧", pinyin: "Zánmen yìqǐ qù ba", words: [{ hanzi: "咱们", pinyin: "zánmen", english: "мы (с тобой)" }, { hanzi: "一起", pinyin: "yìqǐ", english: "вместе" }], breakdown: "«Давай вместе пойдём!» 咱们 включает собеседника." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Давай вместе пойдём — 咱们一起去吧" },
    { id: 2, english: "Мы идём — 我们去" },
    { id: 3, english: "Вы идёте? — 你们去吗" },
    { id: 4, english: "Я иду один — 我自己去" },
  ], correctOptionId: 1 },
  { id: 13116, type: "grammar", rule: {
    title: "连动句 — последовательные глаголы",
    explanation: "В китайском два глагола могут идти подряд, и 2-й объясняет ЦЕЛЬ 1-го.\n\nСхема: Подл. + Глагол1 + [Место1] + Глагол2 + [Объект2]\n\n我去图书馆借书。\n«Иду в библиотеку за книгой» (иду + чтобы взять книгу)\n\nПервый глагол обычно 去/来.",
    examples: [
      { hanzi: "我去商店买东西。", pinyin: "Wǒ qù shāngdiàn mǎi dōngxi.", english: "Иду в магазин за покупками." },
      { hanzi: "大卫去银行换钱。", pinyin: "Dàwèi qù yínháng huàn qián.", english: "Давэй идёт в банк менять деньги." },
    ],
  }, practice: [
    { question: "Как правильно сказать «Иду в школу на занятия»?", options: [
      { id: 1, text: "我学校去上课" },
      { id: 2, text: "我去学校上课" },
      { id: 3, text: "上课我学校去" },
      { id: 4, text: "学校上课我去" },
    ], correctOptionId: 2 },
    { question: "В какой форме идут последовательные глаголы?", options: [
      { id: 1, text: "Подл. + глагол1 + место + глагол2 + объект" },
      { id: 2, text: "Подл. + объект + глагол1 + глагол2" },
      { id: 3, text: "Глагол + подл. + глагол" },
      { id: 4, text: "Подл. + место + глагол + объект" },
    ], correctOptionId: 1 },
  ] },
  { id: 13117, type: "grammar", rule: {
    title: "A不A / V不V — альтернативный вопрос",
    explanation: "Вместо 吗 можно задать вопрос: повторить прил./глагол с 不 между.\n\n冷不冷？= 冷吗？— Холодно?\n去不去？= 去吗？— Идёшь?\n是不是？— Это так?\n有没有？— Есть или нет?\n\n❗ С этой формой 吗 НЕ используется.",
    examples: [
      { hanzi: "那儿的东西贵不贵？", pinyin: "Nàr de dōngxi guì bu guì?", english: "Там дорого?" },
      { hanzi: "你是不是美国人？", pinyin: "Nǐ shì bu shì Měiguó rén?", english: "Ты американец?" },
    ],
  }, practice: [
    { question: "Эквивалент 你去吗?", options: [
      { id: 1, text: "你去不？" },
      { id: 2, text: "你去不去？" },
      { id: 3, text: "不去你？" },
      { id: 4, text: "去你不？" },
    ], correctOptionId: 2 },
    { question: "Можно ли сказать «冷不冷吗?»?", options: [
      { id: 1, text: "Да, правильно" },
      { id: 2, text: "Нет, 吗 не используется с A不A" },
      { id: 3, text: "Да, но очень формально" },
      { id: 4, text: "Нет, нужно «冷不不冷吗»" },
    ], correctOptionId: 2 },
  ] },
  { id: 13118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "借", leftPinyin: "jiè", right: "брать взаймы" },
    { id: 2, left: "银行", leftPinyin: "yínháng", right: "банк" },
    { id: 3, left: "换", leftPinyin: "huàn", right: "менять" },
    { id: 4, left: "咱们", leftPinyin: "zánmen", right: "мы (с тобой)" },
    { id: 5, left: "一起", leftPinyin: "yìqǐ", right: "вместе" },
    { id: 6, left: "东西", leftPinyin: "dōngxi", right: "вещи" },
    { id: 7, left: "贵", leftPinyin: "guì", right: "дорогой" },
    { id: 8, left: "打算", leftPinyin: "dǎsuàn", right: "планировать" },
  ] },
  { id: 13119, type: "single_response", mandarin: { hanzi: "我去图书馆借书。", pinyin: "Wǒ qù túshūguǎn jiè shū." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Иду в библиотеку за книгой.", mandarin: { hanzi: "我去图书馆借书", pinyin: "Wǒ qù túshūguǎn jiè shū", words: [
      { hanzi: "去", pinyin: "qù", english: "идти" },
      { hanzi: "图书馆", pinyin: "túshūguǎn", english: "библиотека" },
      { hanzi: "借书", pinyin: "jiè shū", english: "взять книгу" },
    ], breakdown: "Последовательные глаголы: идти-место-делать." } },
  ] },
  { id: 13120, type: "single_response", mandarin: { hanzi: "咱们一起去吧！", pinyin: "Zánmen yìqǐ qù ba!" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Давай вместе пойдём!", mandarin: { hanzi: "咱们一起去吧", pinyin: "Zánmen yìqǐ qù ba", words: [
      { hanzi: "咱们", pinyin: "zánmen", english: "мы с тобой" },
      { hanzi: "一起", pinyin: "yìqǐ", english: "вместе" },
      { hanzi: "吧", pinyin: "ba", english: "(давай)" },
    ], breakdown: "咱们 подразумевает «ты и я»; 吧 = предложение." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 14 — 我喜欢浅颜色的 (colors, describing things)
// ═══════════════════════════════════════════════════════════════════
const ch14 = [
  { id: 14101, type: "flashcard", mandarin: { hanzi: "颜色", pinyin: "Yánsè" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "цвет", hanzi: "颜色", pinyin: "yánsè" },
    { id: 2, english: "размер", hanzi: "大小", pinyin: "dàxiǎo" },
    { id: 3, english: "вещь", hanzi: "东西", pinyin: "dōngxi" },
    { id: 4, english: "качество", hanzi: "质量", pinyin: "zhìliàng" },
  ], correctOptionId: 1 },
  { id: 14102, type: "flashcard", mandarin: { hanzi: "毛衣", pinyin: "Máoyī" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "штаны", hanzi: "裤子", pinyin: "kùzi" },
    { id: 2, english: "свитер", hanzi: "毛衣", pinyin: "máoyī" },
    { id: 3, english: "рубашка", hanzi: "衬衫", pinyin: "chènshān" },
    { id: 4, english: "одежда", hanzi: "衣服", pinyin: "yīfu" },
  ], correctOptionId: 2 },
  { id: 14103, type: "flashcard", mandarin: { hanzi: "挺", pinyin: "Tǐng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "очень", hanzi: "很", pinyin: "hěn" },
    { id: 2, english: "довольно, вполне", hanzi: "挺", pinyin: "tǐng" },
    { id: 3, english: "самый", hanzi: "最", pinyin: "zuì" },
    { id: 4, english: "немного", hanzi: "有点儿", pinyin: "yǒudiǎnr" },
  ], correctOptionId: 2 },
  { id: 14104, type: "flashcard", mandarin: { hanzi: "新", pinyin: "Xīn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "старый", hanzi: "旧", pinyin: "jiù" },
    { id: 2, english: "новый", hanzi: "新", pinyin: "xīn" },
    { id: 3, english: "дешёвый", hanzi: "便宜", pinyin: "piányi" },
    { id: 4, english: "красивый", hanzi: "漂亮", pinyin: "piàoliang" },
  ], correctOptionId: 2 },
  { id: 14105, type: "flashcard", mandarin: { hanzi: "便宜", pinyin: "Piányi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "дорогой", hanzi: "贵", pinyin: "guì" },
    { id: 2, english: "дешёвый", hanzi: "便宜", pinyin: "piányi" },
    { id: 3, english: "хороший", hanzi: "好", pinyin: "hǎo" },
    { id: 4, english: "новый", hanzi: "新", pinyin: "xīn" },
  ], correctOptionId: 2 },
  { id: 14106, type: "flashcard", mandarin: { hanzi: "漂亮", pinyin: "Piàoliang" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "большой", hanzi: "大", pinyin: "dà" },
    { id: 2, english: "красивый", hanzi: "漂亮", pinyin: "piàoliang" },
    { id: 3, english: "хороший", hanzi: "好", pinyin: "hǎo" },
    { id: 4, english: "удобный", hanzi: "舒服", pinyin: "shūfu" },
  ], correctOptionId: 2 },
  { id: 14107, type: "fill_blank", sentence: "那件白毛衣___好看___。", sentencePinyin: "Nà jiàn bái máoyī ___ hǎokàn ___.", blankedWord: "挺", correctAnswer: "挺", hint: "разговорное «довольно» (挺...的)", instruction: "Вставь первое слово: «Тот белый свитер довольно симпатичный.»", options: [
    { id: 1, hanzi: "挺", pinyin: "tǐng" },
    { id: 2, hanzi: "很", pinyin: "hěn" },
    { id: 3, hanzi: "最", pinyin: "zuì" },
    { id: 4, hanzi: "太", pinyin: "tài" },
  ] },
  { id: 14108, type: "fill_blank", sentence: "我喜欢浅颜色___。", sentencePinyin: "Wǒ xǐhuan qiǎn yánsè ___.", blankedWord: "的", correctAnswer: "的", hint: "«的» как заменитель существительного", instruction: "Вставь пропущенное слово: «Мне нравятся светлые цвета (вещи светлых цветов).»", options: [
    { id: 1, hanzi: "的", pinyin: "de" },
    { id: 2, hanzi: "了", pinyin: "le" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "呢", pinyin: "ne" },
  ] },
  { id: 14109, type: "fill_blank", sentence: "这件的颜色___深。", sentencePinyin: "Zhè jiàn de yánsè ___ shēn.", blankedWord: "有点儿", correctAnswer: "有点儿", hint: "«чуть-чуть» (обычно с негативным оттенком)", instruction: "Вставь пропущенное слово: «У этого цвет чуть тёмноват.»", options: [
    { id: 1, hanzi: "有点儿", pinyin: "yǒudiǎnr" },
    { id: 2, hanzi: "一点儿", pinyin: "yìdiǎnr" },
    { id: 3, hanzi: "很", pinyin: "hěn" },
    { id: 4, hanzi: "最", pinyin: "zuì" },
  ] },
  { id: 14110, type: "fill_blank", sentence: "这是我昨天买___。", sentencePinyin: "Zhè shì wǒ zuótiān mǎi ___.", blankedWord: "的", correctAnswer: "的", hint: "«的» после глагольной фразы как определение", instruction: "Вставь пропущенное слово: «Это то, что я вчера купила.»", options: [
    { id: 1, hanzi: "的", pinyin: "de" },
    { id: 2, hanzi: "了", pinyin: "le" },
    { id: 3, hanzi: "就", pinyin: "jiù" },
    { id: 4, hanzi: "吗", pinyin: "ma" },
  ] },
  { id: 14111, type: "multiple_choice", mandarin: { hanzi: "那件白毛衣怎么样？", pinyin: "Nà jiàn bái máoyī zěnmeyàng?" }, instruction: "«Как тот белый свитер?» Довольно симпатичный, но белое легко пачкается. Как ответить?", options: [
    { id: 1, english: "挺好看的。不过，白的容易脏。", mandarin: { hanzi: "挺好看的。不过，白的容易脏", pinyin: "Tǐng hǎokàn de. Búguò, bái de róngyì zāng", words: [{ hanzi: "挺", pinyin: "tǐng", english: "довольно" }, { hanzi: "白的", pinyin: "bái de", english: "белое" }, { hanzi: "容易", pinyin: "róngyì", english: "легко" }, { hanzi: "脏", pinyin: "zāng", english: "грязный" }], breakdown: "挺...的 + но + 的-фраза заменяет сущ." } },
    { id: 2, english: "很脏的白。", mandarin: { hanzi: "很脏的白", pinyin: "Hěn zāng de bái", words: [], breakdown: "«Очень грязный белый» — странный порядок." } },
    { id: 3, english: "白毛衣没有。", mandarin: { hanzi: "白毛衣没有", pinyin: "Bái máoyī méiyǒu", words: [], breakdown: "«Белого свитера нет» — не про мнение." } },
    { id: 4, english: "我不知道颜色。", mandarin: { hanzi: "我不知道颜色", pinyin: "Wǒ bù zhīdào yánsè", words: [], breakdown: "«Не знаю цвет» — но цвет был указан." } },
  ], correctOptionId: 1 },
  { id: 14112, type: "multiple_choice", mandarin: { hanzi: "你喜欢什么颜色？", pinyin: "Nǐ xǐhuan shénme yánsè?" }, instruction: "«Какой цвет тебе нравится?» Тебе нравятся светлые. Как сказать?", options: [
    { id: 1, english: "我喜欢浅颜色的。", mandarin: { hanzi: "我喜欢浅颜色的", pinyin: "Wǒ xǐhuan qiǎn yánsè de", words: [{ hanzi: "浅", pinyin: "qiǎn", english: "светлый" }, { hanzi: "的", pinyin: "de", english: "(=вещи)" }], breakdown: "«Светлые (вещи)» — 的 заменяет существительное." } },
    { id: 2, english: "浅颜色。", mandarin: { hanzi: "浅颜色", pinyin: "Qiǎn yánsè", words: [], breakdown: "«Светлый цвет» — без глагола." } },
    { id: 3, english: "我浅颜色喜欢。", mandarin: { hanzi: "我浅颜色喜欢", pinyin: "Wǒ qiǎn yánsè xǐhuan", words: [], breakdown: "Неправильный порядок." } },
    { id: 4, english: "颜色没有。", mandarin: { hanzi: "颜色没有", pinyin: "Yánsè méiyǒu", words: [], breakdown: "«Цвета нет» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 14113, type: "multiple_choice", mandarin: { hanzi: "这是你的自行车吗？", pinyin: "Zhè shì nǐ de zìxíngchē ma?" }, instruction: "«Это твой велосипед?» Купила вчера, б/у, дешевле. Как объяснить?", options: [
    { id: 1, english: "对，这是我昨天买的，是一辆旧的，旧的比较便宜。", mandarin: { hanzi: "对，这是我昨天买的，是一辆旧的，旧的比较便宜", pinyin: "Duì, zhè shì wǒ zuótiān mǎi de, shì yí liàng jiù de, jiù de bǐjiào piányi", words: [{ hanzi: "辆", pinyin: "liàng", english: "(сч.сл. транспорта)" }, { hanzi: "旧", pinyin: "jiù", english: "старый" }], breakdown: "Несколько 的-фраз: 买的, 旧的, а также 辆 как сч.слово." } },
    { id: 2, english: "是新的，很贵。", mandarin: { hanzi: "是新的，很贵", pinyin: "Shì xīn de, hěn guì", words: [], breakdown: "«Новый, дорогой» — противоречит сюжету." } },
    { id: 3, english: "自行车我不买。", mandarin: { hanzi: "自行车我不买", pinyin: "Zìxíngchē wǒ bù mǎi", words: [], breakdown: "«Я не покупаю велосипед» — но куплен." } },
    { id: 4, english: "我没有自行车。", mandarin: { hanzi: "我没有自行车", pinyin: "Wǒ méiyǒu zìxíngchē", words: [], breakdown: "«У меня нет велосипеда» — неверно." } },
  ], correctOptionId: 1 },
  { id: 14114, type: "listening_mc", mandarin: { hanzi: "我喜欢浅颜色的", pinyin: "Wǒ xǐhuan qiǎn yánsè de", words: [{ hanzi: "喜欢", pinyin: "xǐhuan", english: "любить" }, { hanzi: "浅", pinyin: "qiǎn", english: "светлый" }], breakdown: "«Люблю светлые (цвета)». 的 заменяет существительное." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Люблю светлые цвета — 我喜欢浅颜色的" },
    { id: 2, english: "Люблю тёмные цвета — 我喜欢深颜色的" },
    { id: 3, english: "Люблю цвет — 我喜欢颜色" },
    { id: 4, english: "Не люблю свитер — 我不喜欢毛衣" },
  ], correctOptionId: 1 },
  { id: 14115, type: "listening_mc", mandarin: { hanzi: "挺漂亮的", pinyin: "Tǐng piàoliang de", words: [{ hanzi: "挺", pinyin: "tǐng", english: "довольно" }, { hanzi: "漂亮", pinyin: "piàoliang", english: "красивый" }], breakdown: "«Довольно красивый». Форма 挺...的." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Довольно красивый — 挺漂亮的" },
    { id: 2, english: "Очень красивый — 很漂亮" },
    { id: 3, english: "Самый красивый — 最漂亮" },
    { id: 4, english: "Не красивый — 不漂亮" },
  ], correctOptionId: 1 },
  { id: 14116, type: "grammar", rule: {
    title: "挺 + прил. + 的 — «довольно»",
    explanation: "挺 (tǐng) — «довольно, вполне». Разговорная альтернатива 很. Часто с 的 в конце.\n\nСхема: 挺 + Прилагательное + 的\n\n挺好看的 — довольно симпатичный\n挺漂亮的 — довольно красивый\n挺冷的 — довольно холодно\n\nПо силе ≈ 很, но звучит более дружелюбно.",
    examples: [
      { hanzi: "挺好看的。", pinyin: "Tǐng hǎokàn de.", english: "Довольно симпатичный." },
      { hanzi: "挺漂亮的。", pinyin: "Tǐng piàoliang de.", english: "Довольно красивый." },
    ],
  }, practice: [
    { question: "Как сказать «довольно дешёвый» (разговорно)?", options: [
      { id: 1, text: "很便宜" },
      { id: 2, text: "挺便宜的" },
      { id: 3, text: "最便宜" },
      { id: 4, text: "太便宜了" },
    ], correctOptionId: 2 },
    { question: "Что обычно идёт после 挺 + прил.?", options: [
      { id: 1, text: "了" },
      { id: 2, text: "的" },
      { id: 3, text: "呢" },
      { id: 4, text: "吗" },
    ], correctOptionId: 2 },
  ] },
  { id: 14117, type: "grammar", rule: {
    title: "的-фраза — X的 (тот, что X)",
    explanation: "X + 的 БЕЗ существительного = замена существительного, если контекст ясен.\n\nX может быть:\n• Прил.: 白的 (белое), 贵的 (дорогое)\n• Местоимение: 我的 (моё), 老师的 (учительское)\n• Глагол: 我买的 (то, что я купил)\n\n这是我昨天买的。— Это то, что я вчера купила.\n我喜欢白的。— Мне нравится белое.",
    examples: [
      { hanzi: "我喜欢浅颜色的。", pinyin: "Wǒ xǐhuan qiǎn yánsè de.", english: "Я люблю светлые цвета." },
      { hanzi: "白的容易脏。", pinyin: "Bái de róngyì zāng.", english: "Белое легко пачкается." },
    ],
  }, practice: [
    { question: "Как сказать «Я хочу чёрный» (без повтора сущ.)?", options: [
      { id: 1, text: "我要黑" },
      { id: 2, text: "我要黑的" },
      { id: 3, text: "黑的我要" },
      { id: 4, text: "我是黑" },
    ], correctOptionId: 2 },
    { question: "Что значит 我昨天买的?", options: [
      { id: 1, text: "«Вчера купил»" },
      { id: 2, text: "«То, что я вчера купил»" },
      { id: 3, text: "«Я куплю завтра»" },
      { id: 4, text: "«Вчера продал»" },
    ], correctOptionId: 2 },
  ] },
  { id: 14118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "颜色", leftPinyin: "yánsè", right: "цвет" },
    { id: 2, left: "白", leftPinyin: "bái", right: "белый" },
    { id: 3, left: "黑", leftPinyin: "hēi", right: "чёрный" },
    { id: 4, left: "蓝", leftPinyin: "lán", right: "синий" },
    { id: 5, left: "新", leftPinyin: "xīn", right: "новый" },
    { id: 6, left: "旧", leftPinyin: "jiù", right: "старый" },
    { id: 7, left: "便宜", leftPinyin: "piányi", right: "дешёвый" },
    { id: 8, left: "漂亮", leftPinyin: "piàoliang", right: "красивый" },
  ] },
  { id: 14119, type: "single_response", mandarin: { hanzi: "我喜欢浅颜色的。", pinyin: "Wǒ xǐhuan qiǎn yánsè de." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Мне нравятся светлые цвета.", mandarin: { hanzi: "我喜欢浅颜色的", pinyin: "Wǒ xǐhuan qiǎn yánsè de", words: [
      { hanzi: "喜欢", pinyin: "xǐhuan", english: "любить" },
      { hanzi: "浅", pinyin: "qiǎn", english: "светлый" },
      { hanzi: "的", pinyin: "de", english: "(=вещи)" },
    ], breakdown: "的 после прилагательного = «вещи такого типа»." } },
  ] },
  { id: 14120, type: "single_response", mandarin: { hanzi: "这是我昨天买的。", pinyin: "Zhè shì wǒ zuótiān mǎi de." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Это то, что я вчера купила.", mandarin: { hanzi: "这是我昨天买的", pinyin: "Zhè shì wǒ zuótiān mǎi de", words: [
      { hanzi: "昨天", pinyin: "zuótiān", english: "вчера" },
      { hanzi: "买", pinyin: "mǎi", english: "купить" },
      { hanzi: "的", pinyin: "de", english: "(=предмет)" },
    ], breakdown: "的 после глагольной фразы = заменитель упомянутого предмета." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 15 — 明天是我朋友的生日 (Unit 3 review, gifts, 还是)
// ═══════════════════════════════════════════════════════════════════
const ch15 = [
  { id: 15101, type: "flashcard", mandarin: { hanzi: "礼物", pinyin: "Lǐwù" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "день рождения", hanzi: "生日", pinyin: "shēngrì" },
    { id: 2, english: "подарок", hanzi: "礼物", pinyin: "lǐwù" },
    { id: 3, english: "торт", hanzi: "蛋糕", pinyin: "dàngāo" },
    { id: 4, english: "цветок", hanzi: "花", pinyin: "huā" },
  ], correctOptionId: 2 },
  { id: 15102, type: "flashcard", mandarin: { hanzi: "生日", pinyin: "Shēngrì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "день", hanzi: "天", pinyin: "tiān" },
    { id: 2, english: "выходные", hanzi: "周末", pinyin: "zhōumò" },
    { id: 3, english: "день рождения", hanzi: "生日", pinyin: "shēngrì" },
    { id: 4, english: "праздник", hanzi: "节日", pinyin: "jiérì" },
  ], correctOptionId: 3 },
  { id: 15103, type: "flashcard", mandarin: { hanzi: "还是", pinyin: "Háishi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "или (в вопросе)", hanzi: "还是", pinyin: "háishi" },
    { id: 2, english: "и", hanzi: "和", pinyin: "hé" },
    { id: 3, english: "ещё", hanzi: "还", pinyin: "hái" },
    { id: 4, english: "тоже", hanzi: "也", pinyin: "yě" },
  ], correctOptionId: 1 },
  { id: 15104, type: "flashcard", mandarin: { hanzi: "比如", pinyin: "Bǐrú" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "однако", hanzi: "不过", pinyin: "búguò" },
    { id: 2, english: "поэтому", hanzi: "所以", pinyin: "suǒyǐ" },
    { id: 3, english: "например", hanzi: "比如", pinyin: "bǐrú" },
    { id: 4, english: "и ещё", hanzi: "还有", pinyin: "hái yǒu" },
  ], correctOptionId: 3 },
  { id: 15105, type: "flashcard", mandarin: { hanzi: "一直", pinyin: "Yìzhí" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "сейчас", hanzi: "正在", pinyin: "zhèngzài" },
    { id: 2, english: "всё время, постоянно", hanzi: "一直", pinyin: "yìzhí" },
    { id: 3, english: "часто", hanzi: "常常", pinyin: "chángcháng" },
    { id: 4, english: "каждый день", hanzi: "每天", pinyin: "měi tiān" },
  ], correctOptionId: 2 },
  { id: 15106, type: "flashcard", mandarin: { hanzi: "花", pinyin: "Huā" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "торт", hanzi: "蛋糕", pinyin: "dàngāo" },
    { id: 2, english: "шоколад", hanzi: "巧克力", pinyin: "qiǎokèlì" },
    { id: 3, english: "цветок", hanzi: "花", pinyin: "huā" },
    { id: 4, english: "подарок", hanzi: "礼物", pinyin: "lǐwù" },
  ], correctOptionId: 3 },
  { id: 15107, type: "fill_blank", sentence: "男的___女的?", sentencePinyin: "Nán de ___ nǚ de?", blankedWord: "还是", correctAnswer: "还是", hint: "«или» в вопросах", instruction: "Вставь пропущенное слово: «Мужчина или женщина?»", options: [
    { id: 1, hanzi: "和", pinyin: "hé" },
    { id: 2, hanzi: "或者", pinyin: "huòzhě" },
    { id: 3, hanzi: "还是", pinyin: "háishi" },
    { id: 4, hanzi: "也", pinyin: "yě" },
  ] },
  { id: 15108, type: "fill_blank", sentence: "可送的很多，___巧克力。", sentencePinyin: "Kě sòng de hěn duō, ___ qiǎokèlì.", blankedWord: "比如", correctAnswer: "比如", hint: "«например»", instruction: "Вставь пропущенное слово: «Можно подарить много всего, например шоколад.»", options: [
    { id: 1, hanzi: "比如", pinyin: "bǐrú" },
    { id: 2, hanzi: "还有", pinyin: "hái yǒu" },
    { id: 3, hanzi: "所以", pinyin: "suǒyǐ" },
    { id: 4, hanzi: "就是", pinyin: "jiùshì" },
  ] },
  { id: 15109, type: "fill_blank", sentence: "从晚饭以后到现在，你___在忙。", sentencePinyin: "Cóng wǎnfàn yǐhòu dào xiànzài, nǐ ___ zài máng.", blankedWord: "一直", correctAnswer: "一直", hint: "«всё время, непрерывно»", instruction: "Вставь пропущенное слово: «С ужина и до сих пор ты всё время занят.»", options: [
    { id: 1, hanzi: "一直", pinyin: "yìzhí" },
    { id: 2, hanzi: "正在", pinyin: "zhèngzài" },
    { id: 3, hanzi: "常常", pinyin: "chángcháng" },
    { id: 4, hanzi: "有点儿", pinyin: "yǒudiǎnr" },
  ] },
  { id: 15110, type: "fill_blank", sentence: "巧克力有点儿___，她不喜欢甜的。", sentencePinyin: "Qiǎokèlì yǒudiǎnr ___, tā bù xǐhuan tián de.", blankedWord: "甜", correctAnswer: "甜", hint: "«сладкий»", instruction: "Вставь пропущенное слово: «Шоколад сладковат, она не любит сладкое.»", options: [
    { id: 1, hanzi: "甜", pinyin: "tián" },
    { id: 2, hanzi: "苦", pinyin: "kǔ" },
    { id: 3, hanzi: "贵", pinyin: "guì" },
    { id: 4, hanzi: "旧", pinyin: "jiù" },
  ] },
  { id: 15111, type: "multiple_choice", mandarin: { hanzi: "你在干什么呢？", pinyin: "Nǐ zài gàn shénme ne?" }, instruction: "«Что делаешь?» Готовишь подарок на день рождения друга. Как сказать?", options: [
    { id: 1, english: "我在准备礼物呢。", mandarin: { hanzi: "我在准备礼物呢", pinyin: "Wǒ zài zhǔnbèi lǐwù ne", words: [{ hanzi: "准备", pinyin: "zhǔnbèi", english: "готовить" }, { hanzi: "礼物", pinyin: "lǐwù", english: "подарок" }], breakdown: "Продолженное действие: 在...呢." } },
    { id: 2, english: "我礼物准备。", mandarin: { hanzi: "我礼物准备", pinyin: "Wǒ lǐwù zhǔnbèi", words: [], breakdown: "Неправильный порядок — объект должен после глагола." } },
    { id: 3, english: "准备礼物我了。", mandarin: { hanzi: "准备礼物我了", pinyin: "Zhǔnbèi lǐwù wǒ le", words: [], breakdown: "«Я готовил подарок» — прошедшее, не продолженное." } },
    { id: 4, english: "礼物没有。", mandarin: { hanzi: "礼物没有", pinyin: "Lǐwù méiyǒu", words: [], breakdown: "«Нет подарка» — не отвечает." } },
  ], correctOptionId: 1 },
  { id: 15112, type: "multiple_choice", mandarin: { hanzi: "送给女的什么好？", pinyin: "Sòng gěi nǚ de shénme hǎo?" }, instruction: "«Что подарить женщине?» Все девушки любят цветы. Как предложить?", options: [
    { id: 1, english: "送一束花吧，每个女孩子都喜欢花。", mandarin: { hanzi: "送一束花吧，每个女孩子都喜欢花", pinyin: "Sòng yí shù huā ba, měi ge nǚ háizi dōu xǐhuan huā", words: [{ hanzi: "束", pinyin: "shù", english: "(сч.сл. букетов)" }, { hanzi: "花", pinyin: "huā", english: "цветы" }], breakdown: "束 — счётное слово для букетов. 每...都 = все." } },
    { id: 2, english: "不送礼物。", mandarin: { hanzi: "不送礼物", pinyin: "Bú sòng lǐwù", words: [], breakdown: "«Не дари» — противоположное." } },
    { id: 3, english: "花是花。", mandarin: { hanzi: "花是花", pinyin: "Huā shì huā", words: [], breakdown: "«Цветы — цветы» — тривиально." } },
    { id: 4, english: "女的不喜欢。", mandarin: { hanzi: "女的不喜欢", pinyin: "Nǚ de bù xǐhuan", words: [], breakdown: "«Женщины не любят» — неверно." } },
  ], correctOptionId: 1 },
  { id: 15113, type: "multiple_choice", mandarin: { hanzi: "男的还是女的？", pinyin: "Nán de háishi nǚ de?" }, instruction: "«Мужчине или женщине?» Женщине. Как кратко ответить?", options: [
    { id: 1, english: "女的。", mandarin: { hanzi: "女的", pinyin: "Nǚ de", words: [{ hanzi: "女", pinyin: "nǚ", english: "женский" }, { hanzi: "的", pinyin: "de", english: "(=человек)" }], breakdown: "的 заменяет 人: «женская (персона)» = женщина." } },
    { id: 2, english: "男。", mandarin: { hanzi: "男", pinyin: "Nán", words: [], breakdown: "«Мужской» — противоположный ответ." } },
    { id: 3, english: "不知道。", mandarin: { hanzi: "不知道", pinyin: "Bù zhīdào", words: [], breakdown: "«Не знаю» — но ты знаешь." } },
    { id: 4, english: "男的还是女的。", mandarin: { hanzi: "男的还是女的", pinyin: "Nán de háishi nǚ de", words: [], breakdown: "Повтор вопроса — не ответ." } },
  ], correctOptionId: 1 },
  { id: 15114, type: "listening_mc", mandarin: { hanzi: "明天是我朋友的生日", pinyin: "Míngtiān shì wǒ péngyou de shēngrì", words: [{ hanzi: "明天", pinyin: "míngtiān", english: "завтра" }, { hanzi: "朋友", pinyin: "péngyou", english: "друг" }, { hanzi: "生日", pinyin: "shēngrì", english: "день рождения" }], breakdown: "«Завтра день рождения моего друга»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Завтра день рождения моего друга — 明天是我朋友的生日" },
    { id: 2, english: "Сегодня мой день рождения — 今天是我的生日" },
    { id: 3, english: "Мой друг пришёл — 我的朋友来了" },
    { id: 4, english: "Я не знаю моего друга — 我不认识我朋友" },
  ], correctOptionId: 1 },
  { id: 15115, type: "listening_mc", mandarin: { hanzi: "送一束花吧", pinyin: "Sòng yí shù huā ba", words: [{ hanzi: "送", pinyin: "sòng", english: "дарить" }, { hanzi: "束", pinyin: "shù", english: "(сч.сл.)" }, { hanzi: "花", pinyin: "huā", english: "цветы" }], breakdown: "«Подари букет цветов»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Подари букет цветов — 送一束花吧" },
    { id: 2, english: "Подари шоколад — 送巧克力吧" },
    { id: 3, english: "Подари торт — 送蛋糕吧" },
    { id: 4, english: "Отправь письмо — 送一封信" },
  ], correctOptionId: 1 },
  { id: 15116, type: "grammar", rule: {
    title: "还是 — альтернативный вопрос «А или Б?»",
    explanation: "还是 (háishi) между двумя вариантами = «А или Б?».\n\nСхема: Вариант A + 还是 + Вариант B?\n\n男的还是女的？— Мужчина или женщина?\n你喝水还是喝咖啡？— Воду или кофе?\n\n❗ Не путать с 或者 (huòzhě — «или» в утверждениях).",
    examples: [
      { hanzi: "你喜欢红的还是蓝的？", pinyin: "Nǐ xǐhuan hóng de háishi lán de?", english: "Красное или синее?" },
      { hanzi: "你去还是我去？", pinyin: "Nǐ qù háishi wǒ qù?", english: "Ты пойдёшь или я?" },
    ],
  }, practice: [
    { question: "Как спросить «чай или кофе»?", options: [
      { id: 1, text: "茶和咖啡？" },
      { id: 2, text: "茶还是咖啡？" },
      { id: 3, text: "茶或者咖啡？" },
      { id: 4, text: "茶也咖啡？" },
    ], correctOptionId: 2 },
    { question: "В каких предложениях используется 还是?", options: [
      { id: 1, text: "В утверждениях" },
      { id: 2, text: "В отрицательных" },
      { id: 3, text: "В вопросах с выбором" },
      { id: 4, text: "Только в пожеланиях" },
    ], correctOptionId: 3 },
  ] },
  { id: 15117, type: "grammar", rule: {
    title: "比如 — «например»",
    explanation: "比如 (bǐrú) вводит пример.\n\nСхема: Общее утверждение，比如 + Пример\n\n可送的东西很多，比如巧克力。\n«Можно подарить много всего, например шоколад.»\n\nТакже можно 比如说 (разговорное).",
    examples: [
      { hanzi: "我喜欢很多颜色，比如蓝的、绿的。", pinyin: "Wǒ xǐhuan hěn duō yánsè, bǐrú lán de, lǜ de.", english: "Мне нравятся много цветов, например синий, зелёный." },
      { hanzi: "北京有很多大学，比如北京大学。", pinyin: "Běijīng yǒu hěn duō dàxué, bǐrú Běijīng Dàxué.", english: "В Пекине много вузов, например Бэйда." },
    ],
  }, practice: [
    { question: "Где обычно стоит 比如?", options: [
      { id: 1, text: "В конце предложения" },
      { id: 2, text: "Перед примером" },
      { id: 3, text: "В начале всегда" },
      { id: 4, text: "После глагола" },
    ], correctOptionId: 2 },
    { question: "Как сказать «Я люблю фрукты, например, яблоки»?", options: [
      { id: 1, text: "我喜欢水果，比如苹果" },
      { id: 2, text: "我喜欢水果苹果比如" },
      { id: 3, text: "比如我喜欢水果苹果" },
      { id: 4, text: "我比如喜欢水果苹果" },
    ], correctOptionId: 1 },
  ] },
  { id: 15118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "礼物", leftPinyin: "lǐwù", right: "подарок" },
    { id: 2, left: "生日", leftPinyin: "shēngrì", right: "день рожд." },
    { id: 3, left: "蛋糕", leftPinyin: "dàngāo", right: "торт" },
    { id: 4, left: "还是", leftPinyin: "háishi", right: "или (в вопр.)" },
    { id: 5, left: "比如", leftPinyin: "bǐrú", right: "например" },
    { id: 6, left: "一直", leftPinyin: "yìzhí", right: "всё время" },
    { id: 7, left: "花", leftPinyin: "huā", right: "цветок" },
    { id: 8, left: "主意", leftPinyin: "zhǔyi", right: "идея" },
  ] },
  { id: 15119, type: "single_response", mandarin: { hanzi: "明天是我朋友的生日。", pinyin: "Míngtiān shì wǒ péngyou de shēngrì." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Завтра день рождения моего друга.", mandarin: { hanzi: "明天是我朋友的生日", pinyin: "Míngtiān shì wǒ péngyou de shēngrì", words: [
      { hanzi: "明天", pinyin: "míngtiān", english: "завтра" },
      { hanzi: "朋友", pinyin: "péngyou", english: "друг" },
      { hanzi: "生日", pinyin: "shēngrì", english: "день рождения" },
    ], breakdown: "Завтра + быть + мой + друг + 的 + день рождения." } },
  ] },
  { id: 15120, type: "single_response", mandarin: { hanzi: "送一束花吧，每个女孩子都喜欢花。", pinyin: "Sòng yí shù huā ba, měi ge nǚ háizi dōu xǐhuan huā." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Подари букет цветов — все девушки любят цветы.", mandarin: { hanzi: "送一束花吧，每个女孩子都喜欢花", pinyin: "Sòng yí shù huā ba, měi ge nǚ háizi dōu xǐhuan huā", words: [
      { hanzi: "送", pinyin: "sòng", english: "дарить" },
      { hanzi: "束", pinyin: "shù", english: "(сч.сл.)" },
      { hanzi: "每...都", pinyin: "měi...dōu", english: "каждая...все" },
    ], breakdown: "Предложение с 吧 + обоснование с 每...都." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// WRITE ALL
// ═══════════════════════════════════════════════════════════════════
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const assignments = [
  [9, ch9], [10, ch10], [11, ch11], [12, ch12],
  [13, ch13], [14, ch14], [15, ch15],
];

for (const [num, questions] of assignments) {
  const chapter = data.chapters.find((c) => c.id === num);
  if (!chapter) {
    console.error(`Chapter ${num} not found!`);
    continue;
  }
  chapter.lessons[0].questions = questions;
  const counts = {};
  questions.forEach((q) => {
    counts[q.type] = (counts[q.type] || 0) + 1;
  });
  console.log(`Chapter ${num}: ${questions.length} exercises`, counts);
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
console.log("\nAll written to", filePath);
