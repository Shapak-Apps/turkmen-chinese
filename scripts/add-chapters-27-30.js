/**
 * Adds 20 exercises to each of Chapters 27-30 based on Boya Chinese Elementary I.
 * Final batch! Completes the book.
 */
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "assets", "data", "course_content.json");

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 27 — 爸爸妈妈让我回家 (极了, 想/要, 趟/次, 让)
// ═══════════════════════════════════════════════════════════════════
const ch27 = [
  { id: 27101, type: "flashcard", mandarin: { hanzi: "旅行", pinyin: "Lǚxíng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "путешествовать", hanzi: "旅行", pinyin: "lǚxíng" },
    { id: 2, english: "идти", hanzi: "去", pinyin: "qù" },
    { id: 3, english: "переехать", hanzi: "搬家", pinyin: "bān jiā" },
    { id: 4, english: "летать", hanzi: "飞", pinyin: "fēi" },
  ], correctOptionId: 1 },
  { id: 27102, type: "flashcard", mandarin: { hanzi: "计划", pinyin: "Jìhuà" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "план", hanzi: "计划", pinyin: "jìhuà" },
    { id: 2, english: "решение", hanzi: "决定", pinyin: "juédìng" },
    { id: 3, english: "идея", hanzi: "主意", pinyin: "zhǔyi" },
    { id: 4, english: "способ", hanzi: "办法", pinyin: "bànfǎ" },
  ], correctOptionId: 1 },
  { id: 27103, type: "flashcard", mandarin: { hanzi: "风景", pinyin: "Fēngjǐng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "погода", hanzi: "天气", pinyin: "tiānqì" },
    { id: 2, english: "пейзаж", hanzi: "风景", pinyin: "fēngjǐng" },
    { id: 3, english: "ветер", hanzi: "风", pinyin: "fēng" },
    { id: 4, english: "небо", hanzi: "天", pinyin: "tiān" },
  ], correctOptionId: 2 },
  { id: 27104, type: "flashcard", mandarin: { hanzi: "历史", pinyin: "Lìshǐ" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "литература", hanzi: "文学", pinyin: "wénxué" },
    { id: 2, english: "история", hanzi: "历史", pinyin: "lìshǐ" },
    { id: 3, english: "наука", hanzi: "科学", pinyin: "kēxué" },
    { id: 4, english: "искусство", hanzi: "艺术", pinyin: "yìshù" },
  ], correctOptionId: 2 },
  { id: 27105, type: "flashcard", mandarin: { hanzi: "春节", pinyin: "Chūn Jié" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "Рождество", hanzi: "圣诞节", pinyin: "Shèngdàn Jié" },
    { id: 2, english: "Праздник Весны (КНГ)", hanzi: "春节", pinyin: "Chūn Jié" },
    { id: 3, english: "Новый год", hanzi: "新年", pinyin: "xīnnián" },
    { id: 4, english: "выходной", hanzi: "假期", pinyin: "jiàqī" },
  ], correctOptionId: 2 },
  { id: 27106, type: "flashcard", mandarin: { hanzi: "教授", pinyin: "Jiàoshòu" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "учитель", hanzi: "老师", pinyin: "lǎoshī" },
    { id: 2, english: "профессор", hanzi: "教授", pinyin: "jiàoshòu" },
    { id: 3, english: "аспирант", hanzi: "研究生", pinyin: "yánjiūshēng" },
    { id: 4, english: "декан", hanzi: "院长", pinyin: "yuànzhǎng" },
  ], correctOptionId: 2 },
  { id: 27107, type: "fill_blank", sentence: "风景美___！", sentencePinyin: "Fēngjǐng měi ___!", blankedWord: "极了", correctAnswer: "极了", hint: "«крайне, чрезвычайно»", instruction: "Вставь пропущенное слово: «Пейзаж — просто потрясный!»", options: [
    { id: 1, hanzi: "极了", pinyin: "jí le" },
    { id: 2, hanzi: "太了", pinyin: "tài le" },
    { id: 3, hanzi: "很", pinyin: "hěn" },
    { id: 4, hanzi: "最", pinyin: "zuì" },
  ] },
  { id: 27108, type: "fill_blank", sentence: "爸爸妈妈___我回家。", sentencePinyin: "Bàba māma ___ wǒ huí jiā.", blankedWord: "让", correctAnswer: "让", hint: "«просить, заставлять» (каузатив)", instruction: "Вставь пропущенное слово: «Родители просят меня приехать.»", options: [
    { id: 1, hanzi: "让", pinyin: "ràng" },
    { id: 2, hanzi: "要", pinyin: "yào" },
    { id: 3, hanzi: "得", pinyin: "děi" },
    { id: 4, hanzi: "能", pinyin: "néng" },
  ] },
  { id: 27109, type: "fill_blank", sentence: "我得安排时间回家一___。", sentencePinyin: "Wǒ děi ānpái shíjiān huí jiā yí ___.", blankedWord: "趟", correctAnswer: "趟", hint: "сч.слово для поездок", instruction: "Вставь пропущенное слово: «Надо найти время съездить домой.»", options: [
    { id: 1, hanzi: "趟", pinyin: "tàng" },
    { id: 2, hanzi: "次", pinyin: "cì" },
    { id: 3, hanzi: "遍", pinyin: "biàn" },
    { id: 4, hanzi: "下", pinyin: "xià" },
  ] },
  { id: 27110, type: "fill_blank", sentence: "我___去别的地方看看。", sentencePinyin: "Wǒ ___ qù bié de dìfang kànkan.", blankedWord: "想", correctAnswer: "想", hint: "«хотел бы» (желание, мечта)", instruction: "Вставь пропущенное слово: «Хочу посмотреть другие места.»", options: [
    { id: 1, hanzi: "想", pinyin: "xiǎng" },
    { id: 2, hanzi: "要", pinyin: "yào" },
    { id: 3, hanzi: "得", pinyin: "děi" },
    { id: 4, hanzi: "会", pinyin: "huì" },
  ] },
  { id: 27111, type: "multiple_choice", mandarin: { hanzi: "快放假了，你有什么计划？", pinyin: "Kuài fàng jià le, nǐ yǒu shénme jìhuà?" }, instruction: "«Скоро каникулы, какие планы?» Хочу в путешествие — полгода всё в Пекине. Как?", options: [
    { id: 1, english: "我打算去旅行，一直待在北京，想去别的地方看看。", mandarin: { hanzi: "我打算去旅行，一直待在北京，想去别的地方看看", pinyin: "Wǒ dǎsuàn qù lǚxíng, yìzhí dāi zài Běijīng, xiǎng qù bié de dìfang kànkan", words: [{ hanzi: "打算", pinyin: "dǎsuàn", english: "планировать" }, { hanzi: "别的", pinyin: "bié de", english: "другой" }], breakdown: "План + обоснование + желание." } },
    { id: 2, english: "没有计划。", mandarin: { hanzi: "没有计划", pinyin: "Méiyǒu jìhuà", words: [], breakdown: "«Нет планов» — но есть." } },
    { id: 3, english: "北京没有。", mandarin: { hanzi: "北京没有", pinyin: "Běijīng méiyǒu", words: [], breakdown: "Бессмыслица." } },
    { id: 4, english: "不去旅行。", mandarin: { hanzi: "不去旅行", pinyin: "Bú qù lǚxíng", words: [], breakdown: "Противоречит." } },
  ], correctOptionId: 1 },
  { id: 27112, type: "multiple_choice", mandarin: { hanzi: "你春节回家吗？", pinyin: "Nǐ Chūn Jié huí jiā ma?" }, instruction: "«На Новый год едешь домой?» Да, родители просят. Как?", options: [
    { id: 1, english: "要回家几天，爸爸妈妈也让我回家。", mandarin: { hanzi: "要回家几天，爸爸妈妈也让我回家", pinyin: "Yào huí jiā jǐ tiān, bàba māma yě ràng wǒ huí jiā", words: [{ hanzi: "让", pinyin: "ràng", english: "просить сделать" }], breakdown: "让 + кто + глагол." } },
    { id: 2, english: "不让我回家。", mandarin: { hanzi: "不让我回家", pinyin: "Bú ràng wǒ huí jiā", words: [], breakdown: "«Не позволяют» — противоречит." } },
    { id: 3, english: "爸爸没有妈妈。", mandarin: { hanzi: "爸爸没有妈妈", pinyin: "Bàba méiyǒu māma", words: [], breakdown: "Бессмыслица." } },
    { id: 4, english: "春节没有家。", mandarin: { hanzi: "春节没有家", pinyin: "Chūn Jié méiyǒu jiā", words: [], breakdown: "Бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 27113, type: "multiple_choice", mandarin: { hanzi: "你考研究生吗？", pinyin: "Nǐ kǎo yánjiūshēng ma?" }, instruction: "Да, интересуюсь древней китайской историей. Как?", options: [
    { id: 1, english: "我对中国古代历史很感兴趣。", mandarin: { hanzi: "我对中国古代历史很感兴趣", pinyin: "Wǒ duì Zhōngguó gǔdài lìshǐ hěn gǎn xìngqù", words: [{ hanzi: "对...感兴趣", pinyin: "duì...gǎn xìngqù", english: "интересоваться" }], breakdown: "Устойчивая формула 对 + тема + 感兴趣." } },
    { id: 2, english: "历史没有。", mandarin: { hanzi: "历史没有", pinyin: "Lìshǐ méiyǒu", words: [], breakdown: "Бессмыслица." } },
    { id: 3, english: "不想考。", mandarin: { hanzi: "不想考", pinyin: "Bù xiǎng kǎo", words: [], breakdown: "«Не хочу» — противоречит." } },
    { id: 4, english: "古代是什么？", mandarin: { hanzi: "古代是什么", pinyin: "Gǔdài shì shénme", words: [], breakdown: "Это вопрос, не ответ." } },
  ], correctOptionId: 1 },
  { id: 27114, type: "listening_mc", mandarin: { hanzi: "哈尔滨冬天的风景美极了", pinyin: "Hā'ěrbīn dōngtiān de fēngjǐng měi jí le", words: [{ hanzi: "风景", pinyin: "fēngjǐng", english: "пейзаж" }, { hanzi: "极了", pinyin: "jí le", english: "крайне" }], breakdown: "Прил. + 极了 = максимальная степень." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Харбинская зима — красотища — 哈尔滨冬天的风景美极了" },
    { id: 2, english: "В Харбине холодно — 哈尔滨很冷" },
    { id: 3, english: "Пекин красивый — 北京很美" },
    { id: 4, english: "Зима в Пекине — 北京的冬天" },
  ], correctOptionId: 1 },
  { id: 27115, type: "listening_mc", mandarin: { hanzi: "爸爸妈妈让我回家", pinyin: "Bàba māma ràng wǒ huí jiā", words: [{ hanzi: "让", pinyin: "ràng", english: "просить" }], breakdown: "Каузативное 让." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Родители просят меня приехать — 爸爸妈妈让我回家" },
    { id: 2, english: "Я еду с родителями — 我和父母一起回家" },
    { id: 3, english: "Мама не пускает — 妈妈不让我回家" },
    { id: 4, english: "Родители дома — 爸爸妈妈在家" },
  ], correctOptionId: 1 },
  { id: 27116, type: "grammar", rule: {
    title: "Прил. + 极了 — «крайне X»",
    explanation: "极了 после прилагательного = максимальная степень.\n\nСхема: Прил. + 极了\n\n风景美极了。— Пейзаж — красотища.\n好极了！— Превосходно!\n冷极了！— Жуткий холод!\n\n极了 сильнее чем 很/挺/太. Без 很/太 перед прилагательным.",
    examples: [
      { hanzi: "好极了！", pinyin: "Hǎo jí le!", english: "Отлично!" },
      { hanzi: "漂亮极了！", pinyin: "Piàoliang jí le!", english: "Красота!" },
    ],
  }, practice: [
    { question: "Как сказать «Еда — изумительная»?", options: [
      { id: 1, text: "好吃极了" },
      { id: 2, text: "极了好吃" },
      { id: 3, text: "很好吃极了" },
      { id: 4, text: "太好吃极了" },
    ], correctOptionId: 1 },
    { question: "Где ставится 极了?", options: [
      { id: 1, text: "Перед прилагательным" },
      { id: 2, text: "После прилагательного" },
      { id: 3, text: "Перед подлежащим" },
      { id: 4, text: "В начале" },
    ], correctOptionId: 2 },
  ] },
  { id: 27117, type: "grammar", rule: {
    title: "让 — «просить/велеть кого-то сделать»",
    explanation: "让 (ràng) — каузативный глагол.\n\nСхема: Подл. + 让 + Кто + Глагол\n\n爸爸妈妈让我回家。— Родители просят меня приехать.\n老师让我们做作业。— Учитель велит делать уроки.\n妈妈不让我看电视。— Мама не разрешает.",
    examples: [
      { hanzi: "医生让我休息。", pinyin: "Yīshēng ràng wǒ xiūxi.", english: "Врач велел отдыхать." },
      { hanzi: "他让我等他。", pinyin: "Tā ràng wǒ děng tā.", english: "Он попросил ждать." },
    ],
  }, practice: [
    { question: "Как сказать «Родители разрешают мне путешествовать»?", options: [
      { id: 1, text: "父母让我旅行" },
      { id: 2, text: "父母我让旅行" },
      { id: 3, text: "旅行让父母我" },
      { id: 4, text: "让父母我旅行" },
    ], correctOptionId: 1 },
    { question: "Отрицание 让?", options: [
      { id: 1, text: "没让" },
      { id: 2, text: "不让" },
      { id: 3, text: "别让" },
      { id: 4, text: "不是让" },
    ], correctOptionId: 2 },
  ] },
  { id: 27118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "旅行", leftPinyin: "lǚxíng", right: "путешествовать" },
    { id: 2, left: "计划", leftPinyin: "jìhuà", right: "план" },
    { id: 3, left: "风景", leftPinyin: "fēngjǐng", right: "пейзаж" },
    { id: 4, left: "历史", leftPinyin: "lìshǐ", right: "история" },
    { id: 5, left: "春节", leftPinyin: "Chūn Jié", right: "Новый год (КНГ)" },
    { id: 6, left: "教授", leftPinyin: "jiàoshòu", right: "профессор" },
    { id: 7, left: "让", leftPinyin: "ràng", right: "просить" },
    { id: 8, left: "想念", leftPinyin: "xiǎngniàn", right: "скучать" },
  ] },
  { id: 27119, type: "single_response", mandarin: { hanzi: "爸爸妈妈让我回家。", pinyin: "Bàba māma ràng wǒ huí jiā." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Родители зовут меня домой.", mandarin: { hanzi: "爸爸妈妈让我回家", pinyin: "Bàba māma ràng wǒ huí jiā", words: [
      { hanzi: "让", pinyin: "ràng", english: "просить" },
      { hanzi: "回家", pinyin: "huí jiā", english: "вернуться домой" },
    ], breakdown: "Кто + 让 + кого + глагол." } },
  ] },
  { id: 27120, type: "single_response", mandarin: { hanzi: "哈尔滨冬天的风景美极了。", pinyin: "Hā'ěrbīn dōngtiān de fēngjǐng měi jí le." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Харбинская зима — красота неописуемая.", mandarin: { hanzi: "哈尔滨冬天的风景美极了", pinyin: "Hā'ěrbīn dōngtiān de fēngjǐng měi jí le", words: [
      { hanzi: "哈尔滨", pinyin: "Hā'ěrbīn", english: "Харбин" },
      { hanzi: "美极了", pinyin: "měi jí le", english: "красотища" },
    ], breakdown: "极了 = максимальная эмоциональная степень." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 28 — 考得怎么样 (V+得+прил., 都, 为什么, 也许)
// ═══════════════════════════════════════════════════════════════════
const ch28 = [
  { id: 28101, type: "flashcard", mandarin: { hanzi: "汉字", pinyin: "Hànzì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "иероглифы", hanzi: "汉字", pinyin: "Hànzì" },
    { id: 2, english: "буквы", hanzi: "字母", pinyin: "zìmǔ" },
    { id: 3, english: "слова", hanzi: "词", pinyin: "cí" },
    { id: 4, english: "предложения", hanzi: "句子", pinyin: "jùzi" },
  ], correctOptionId: 1 },
  { id: 28102, type: "flashcard", mandarin: { hanzi: "难", pinyin: "Nán" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "лёгкий", hanzi: "容易", pinyin: "róngyì" },
    { id: 2, english: "трудный", hanzi: "难", pinyin: "nán" },
    { id: 3, english: "простой", hanzi: "简单", pinyin: "jiǎndān" },
    { id: 4, english: "сложный", hanzi: "复杂", pinyin: "fùzá" },
  ], correctOptionId: 2 },
  { id: 28103, type: "flashcard", mandarin: { hanzi: "慢", pinyin: "Màn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "быстрый", hanzi: "快", pinyin: "kuài" },
    { id: 2, english: "медленный", hanzi: "慢", pinyin: "màn" },
    { id: 3, english: "поздний", hanzi: "晚", pinyin: "wǎn" },
    { id: 4, english: "ранний", hanzi: "早", pinyin: "zǎo" },
  ], correctOptionId: 2 },
  { id: 28104, type: "flashcard", mandarin: { hanzi: "够", pinyin: "Gòu" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "хватать, достаточно", hanzi: "够", pinyin: "gòu" },
    { id: 2, english: "много", hanzi: "多", pinyin: "duō" },
    { id: 3, english: "мало", hanzi: "少", pinyin: "shǎo" },
    { id: 4, english: "все", hanzi: "都", pinyin: "dōu" },
  ], correctOptionId: 1 },
  { id: 28105, type: "flashcard", mandarin: { hanzi: "也许", pinyin: "Yěxǔ" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "конечно", hanzi: "当然", pinyin: "dāngrán" },
    { id: 2, english: "возможно, может быть", hanzi: "也许", pinyin: "yěxǔ" },
    { id: 3, english: "обязательно", hanzi: "一定", pinyin: "yídìng" },
    { id: 4, english: "никогда", hanzi: "从不", pinyin: "cóng bù" },
  ], correctOptionId: 2 },
  { id: 28106, type: "flashcard", mandarin: { hanzi: "紧张", pinyin: "Jǐnzhāng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "расслабленный", hanzi: "放松", pinyin: "fàngsōng" },
    { id: 2, english: "напряжённый, нервный", hanzi: "紧张", pinyin: "jǐnzhāng" },
    { id: 3, english: "спокойный", hanzi: "安静", pinyin: "ānjìng" },
    { id: 4, english: "весёлый", hanzi: "高兴", pinyin: "gāoxìng" },
  ], correctOptionId: 2 },
  { id: 28107, type: "fill_blank", sentence: "我写汉字写___很慢。", sentencePinyin: "Wǒ xiě Hànzì xiě ___ hěn màn.", blankedWord: "得", correctAnswer: "得", hint: "структурная частица DE — перед оценкой", instruction: "Вставь пропущенное слово: «Пишу иероглифы медленно.»", options: [
    { id: 1, hanzi: "得", pinyin: "de" },
    { id: 2, hanzi: "的", pinyin: "de" },
    { id: 3, hanzi: "地", pinyin: "de" },
    { id: 4, hanzi: "了", pinyin: "le" },
  ] },
  { id: 28108, type: "fill_blank", sentence: "___八点半了，你怎么还不起床?", sentencePinyin: "___ bā diǎn bàn le, nǐ zěnme hái bù qǐ chuáng?", blankedWord: "都", correctAnswer: "都", hint: "«уже» (перед временем, удивление)", instruction: "Вставь пропущенное слово: «Уже 8:30, почему не встаёшь?»", options: [
    { id: 1, hanzi: "都", pinyin: "dōu" },
    { id: 2, hanzi: "已经", pinyin: "yǐjīng" },
    { id: 3, hanzi: "才", pinyin: "cái" },
    { id: 4, hanzi: "也", pinyin: "yě" },
  ] },
  { id: 28109, type: "fill_blank", sentence: "你___什么没做?", sentencePinyin: "Nǐ ___ shénme méi zuò?", blankedWord: "为", correctAnswer: "为", hint: "«почему» — 为什么", instruction: "Вставь пропущенное слово: «Почему не сделал?»", options: [
    { id: 1, hanzi: "为", pinyin: "wèi" },
    { id: 2, hanzi: "因", pinyin: "yīn" },
    { id: 3, hanzi: "怎", pinyin: "zěn" },
    { id: 4, hanzi: "是", pinyin: "shì" },
  ] },
  { id: 28110, type: "fill_blank", sentence: "时间不___了。", sentencePinyin: "Shíjiān bù ___ le.", blankedWord: "够", correctAnswer: "够", hint: "«хватает, достаточно»", instruction: "Вставь пропущенное слово: «Времени не хватило.»", options: [
    { id: 1, hanzi: "够", pinyin: "gòu" },
    { id: 2, hanzi: "多", pinyin: "duō" },
    { id: 3, hanzi: "好", pinyin: "hǎo" },
    { id: 4, hanzi: "少", pinyin: "shǎo" },
  ] },
  { id: 28111, type: "multiple_choice", mandarin: { hanzi: "考试考得怎么样？", pinyin: "Kǎoshì kǎo de zěnmeyàng?" }, instruction: "«Как сдал?» Не очень, не хватило времени, не всё успел. Как?", options: [
    { id: 1, english: "不太好，时间不够了，有一道题没做。", mandarin: { hanzi: "不太好，时间不够了，有一道题没做", pinyin: "Bú tài hǎo, shíjiān bú gòu le, yǒu yí dào tí méi zuò", words: [{ hanzi: "够", pinyin: "gòu", english: "хватать" }, { hanzi: "道", pinyin: "dào", english: "(сч.сл. вопросов)" }], breakdown: "Оценка + причина + последствие." } },
    { id: 2, english: "考试太好了。", mandarin: { hanzi: "考试太好了", pinyin: "Kǎoshì tài hǎo le", words: [], breakdown: "«Экзамен отличный» — противоречит." } },
    { id: 3, english: "没有考试。", mandarin: { hanzi: "没有考试", pinyin: "Méiyǒu kǎoshì", words: [], breakdown: "«Экзамена нет» — неверно." } },
    { id: 4, english: "没做题。", mandarin: { hanzi: "没做题", pinyin: "Méi zuò tí", words: [], breakdown: "«Не делал заданий» — слишком общо." } },
  ], correctOptionId: 1 },
  { id: 28112, type: "multiple_choice", mandarin: { hanzi: "汉字难吗？", pinyin: "Hànzì nán ma?" }, instruction: "«Иероглифы трудные?» Читаю и пишу медленно. Как?", options: [
    { id: 1, english: "汉字太难了！我看汉字看得很慢，写汉字也写得很慢。", mandarin: { hanzi: "汉字太难了！我看汉字看得很慢，写汉字也写得很慢", pinyin: "Hànzì tài nán le! Wǒ kàn Hànzì kàn de hěn màn, xiě Hànzì yě xiě de hěn màn", words: [{ hanzi: "慢", pinyin: "màn", english: "медленный" }], breakdown: "V+O+V+得+прил: «читаю иероглифы медленно»." } },
    { id: 2, english: "很快。", mandarin: { hanzi: "很快", pinyin: "Hěn kuài", words: [], breakdown: "«Быстро» — противоречит." } },
    { id: 3, english: "汉字不难。", mandarin: { hanzi: "汉字不难", pinyin: "Hànzì bù nán", words: [], breakdown: "«Не трудные» — не к теме." } },
    { id: 4, english: "我会汉字。", mandarin: { hanzi: "我会汉字", pinyin: "Wǒ huì Hànzì", words: [], breakdown: "«Я знаю иероглифы» — не оценивает сложность." } },
  ], correctOptionId: 1 },
  { id: 28113, type: "multiple_choice", mandarin: { hanzi: "你有什么记汉字的方法？", pinyin: "Nǐ yǒu shénme jì Hànzì de fāngfǎ?" }, instruction: "«Знаешь методы запоминания?» Есть книжка с историями, может поможет. Как?", options: [
    { id: 1, english: "我有一本汉字故事书，借给你看吧，也许会有帮助。", mandarin: { hanzi: "我有一本汉字故事书，借给你看吧，也许会有帮助", pinyin: "Wǒ yǒu yì běn Hànzì gùshi shū, jiè gěi nǐ kàn ba, yěxǔ huì yǒu bāngzhù", words: [{ hanzi: "也许", pinyin: "yěxǔ", english: "возможно" }, { hanzi: "帮助", pinyin: "bāngzhù", english: "помощь" }], breakdown: "Предложение + возможная польза." } },
    { id: 2, english: "没有方法。", mandarin: { hanzi: "没有方法", pinyin: "Méiyǒu fāngfǎ", words: [], breakdown: "«Нет методов» — не помогает." } },
    { id: 3, english: "汉字很难。", mandarin: { hanzi: "汉字很难", pinyin: "Hànzì hěn nán", words: [], breakdown: "Не отвечает на вопрос." } },
    { id: 4, english: "我记不住。", mandarin: { hanzi: "我记不住", pinyin: "Wǒ jì bu zhù", words: [], breakdown: "«Не могу запомнить» — о своей проблеме." } },
  ], correctOptionId: 1 },
  { id: 28114, type: "listening_mc", mandarin: { hanzi: "考得怎么样", pinyin: "Kǎo de zěnmeyàng", words: [{ hanzi: "得", pinyin: "de", english: "(структ.)" }, { hanzi: "怎么样", pinyin: "zěnmeyàng", english: "как?" }], breakdown: "V+得+怎么样 = «как сдал?»" }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Как сдал? — 考得怎么样" },
    { id: 2, english: "Сдаёшь? — 考试吗" },
    { id: 3, english: "Почему не сдал? — 为什么没考" },
    { id: 4, english: "Хорошо сдал — 考得很好" },
  ], correctOptionId: 1 },
  { id: 28115, type: "listening_mc", mandarin: { hanzi: "我写汉字写得很慢", pinyin: "Wǒ xiě Hànzì xiě de hěn màn", words: [{ hanzi: "写", pinyin: "xiě", english: "писать" }, { hanzi: "慢", pinyin: "màn", english: "медленно" }], breakdown: "V+O+V+得+прил." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Я пишу иероглифы медленно — 我写汉字写得很慢" },
    { id: 2, english: "Я пишу быстро — 我写得很快" },
    { id: 3, english: "Я не умею писать — 我不会写" },
    { id: 4, english: "Иероглифы трудные — 汉字很难" },
  ], correctOptionId: 1 },
  { id: 28116, type: "grammar", rule: {
    title: "V + 得 + Прилагательное — оценка действия",
    explanation: "«Делать X каким образом» через 得.\n\nСхема: V + 得 + Прил.\n\n写得很慢 — пишу медленно.\n考得怎么样? — как сдал?\n跑得很快 — бежит быстро.\n\nЕсли есть объект — глагол повторяется:\nV + O + V + 得 + Прил.\n我写汉字写得慢。\n\n❗ Это 得 DE (структурная частица), НЕ DĚI (должен).",
    examples: [
      { hanzi: "他跑得很快。", pinyin: "Tā pǎo de hěn kuài.", english: "Он бежит быстро." },
      { hanzi: "你说得真好。", pinyin: "Nǐ shuō de zhēn hǎo.", english: "Ты очень хорошо говоришь." },
    ],
  }, practice: [
    { question: "Как сказать «Он поёт хорошо»?", options: [
      { id: 1, text: "他唱歌唱得很好" },
      { id: 2, text: "他很好唱歌" },
      { id: 3, text: "他唱得很好歌" },
      { id: 4, text: "歌他唱很好" },
    ], correctOptionId: 1 },
    { question: "Разница 得 DE и 得 DĚI?", options: [
      { id: 1, text: "Одинаковое" },
      { id: 2, text: "DE — перед оценкой, DĚI — перед глаголом (должен)" },
      { id: 3, text: "DE — настоящее, DĚI — прошедшее" },
      { id: 4, text: "DE — формальное, DĚI — разговорное" },
    ], correctOptionId: 2 },
  ] },
  { id: 28117, type: "grammar", rule: {
    title: "都 — «все» vs «уже»",
    explanation: "都 имеет два значения:\n\n1) «ВСЕ, ОБА» (перед сказуемым, после перечисления):\n  大家都感兴趣。— Все интересуются.\n  每天都有课。— Каждый день есть пары.\n\n2) «УЖЕ» (перед временем/числом, с удивлением):\n  都八点半了！— Уже 8:30!\n  都30岁了，还没工作。— Уже 30, а работы нет.",
    examples: [
      { hanzi: "我的朋友都来了。", pinyin: "Wǒ de péngyou dōu lái le.", english: "Все друзья пришли." },
      { hanzi: "都十一点了。", pinyin: "Dōu shíyī diǎn le.", english: "Уже 11 часов." },
    ],
  }, practice: [
    { question: "Что значит «都八点了»?", options: [
      { id: 1, text: "Все ушли в 8" },
      { id: 2, text: "Уже 8 часов!" },
      { id: 3, text: "Все восьмерки" },
      { id: 4, text: "Восемь минут" },
    ], correctOptionId: 2 },
    { question: "«Все мои друзья студенты» — где 都?", options: [
      { id: 1, text: "都我的朋友是学生" },
      { id: 2, text: "我的朋友都是学生" },
      { id: 3, text: "我的朋友是都学生" },
      { id: 4, text: "我的朋友是学生都" },
    ], correctOptionId: 2 },
  ] },
  { id: 28118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "汉字", leftPinyin: "Hànzì", right: "иероглифы" },
    { id: 2, left: "难", leftPinyin: "nán", right: "трудный" },
    { id: 3, left: "慢", leftPinyin: "màn", right: "медленный" },
    { id: 4, left: "够", leftPinyin: "gòu", right: "хватать" },
    { id: 5, left: "也许", leftPinyin: "yěxǔ", right: "возможно" },
    { id: 6, left: "紧张", leftPinyin: "jǐnzhāng", right: "нервный" },
    { id: 7, left: "为什么", leftPinyin: "wèi shénme", right: "почему" },
    { id: 8, left: "方法", leftPinyin: "fāngfǎ", right: "способ" },
  ] },
  { id: 28119, type: "single_response", mandarin: { hanzi: "考试考得怎么样？", pinyin: "Kǎoshì kǎo de zěnmeyàng?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Как сдал экзамен?", mandarin: { hanzi: "考试考得怎么样", pinyin: "Kǎoshì kǎo de zěnmeyàng", words: [
      { hanzi: "考", pinyin: "kǎo", english: "сдавать" },
      { hanzi: "得", pinyin: "de", english: "(оценка)" },
    ], breakdown: "V+O+V+得+怎么样: повтор глагола + оценка." } },
  ] },
  { id: 28120, type: "single_response", mandarin: { hanzi: "我看汉字看得很慢。", pinyin: "Wǒ kàn Hànzì kàn de hěn màn." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Я читаю иероглифы медленно.", mandarin: { hanzi: "我看汉字看得很慢", pinyin: "Wǒ kàn Hànzì kàn de hěn màn", words: [
      { hanzi: "看", pinyin: "kàn", english: "читать" },
      { hanzi: "慢", pinyin: "màn", english: "медленно" },
    ], breakdown: "Удвоение глагола с оценкой." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 29 — 我们已经买好票了 (result verbs, 张, 终于)
// ═══════════════════════════════════════════════════════════════════
const ch29 = [
  { id: 29101, type: "flashcard", mandarin: { hanzi: "火车", pinyin: "Huǒchē" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "машина", hanzi: "车", pinyin: "chē" },
    { id: 2, english: "поезд", hanzi: "火车", pinyin: "huǒchē" },
    { id: 3, english: "автобус", hanzi: "公共汽车", pinyin: "gōnggòng qìchē" },
    { id: 4, english: "самолёт", hanzi: "飞机", pinyin: "fēijī" },
  ], correctOptionId: 2 },
  { id: 29102, type: "flashcard", mandarin: { hanzi: "票", pinyin: "Piào" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "билет", hanzi: "票", pinyin: "piào" },
    { id: 2, english: "деньги", hanzi: "钱", pinyin: "qián" },
    { id: 3, english: "карта", hanzi: "地图", pinyin: "dìtú" },
    { id: 4, english: "паспорт", hanzi: "护照", pinyin: "hùzhào" },
  ], correctOptionId: 1 },
  { id: 29103, type: "flashcard", mandarin: { hanzi: "终于", pinyin: "Zhōngyú" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "сначала", hanzi: "先", pinyin: "xiān" },
    { id: 2, english: "наконец", hanzi: "终于", pinyin: "zhōngyú" },
    { id: 3, english: "всегда", hanzi: "总是", pinyin: "zǒngshì" },
    { id: 4, english: "часто", hanzi: "常常", pinyin: "chángcháng" },
  ], correctOptionId: 2 },
  { id: 29104, type: "flashcard", mandarin: { hanzi: "糟糕", pinyin: "Zāogāo" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "отлично", hanzi: "很好", pinyin: "hěn hǎo" },
    { id: 2, english: "ужасно, кошмар", hanzi: "糟糕", pinyin: "zāogāo" },
    { id: 3, english: "интересно", hanzi: "有意思", pinyin: "yǒu yìsi" },
    { id: 4, english: "скучно", hanzi: "无聊", pinyin: "wúliáo" },
  ], correctOptionId: 2 },
  { id: 29105, type: "flashcard", mandarin: { hanzi: "联欢", pinyin: "Liánhuān" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "вечеринка", hanzi: "聚会", pinyin: "jùhuì" },
    { id: 2, english: "собираться (на встречу)", hanzi: "联欢", pinyin: "liánhuān" },
    { id: 3, english: "свадьба", hanzi: "婚礼", pinyin: "hūnlǐ" },
    { id: 4, english: "концерт", hanzi: "音乐会", pinyin: "yīnyuèhuì" },
  ], correctOptionId: 2 },
  { id: 29106, type: "flashcard", mandarin: { hanzi: "表演", pinyin: "Biǎoyǎn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "петь", hanzi: "唱", pinyin: "chàng" },
    { id: 2, english: "танцевать", hanzi: "跳舞", pinyin: "tiào wǔ" },
    { id: 3, english: "выступать", hanzi: "表演", pinyin: "biǎoyǎn" },
    { id: 4, english: "смотреть", hanzi: "看", pinyin: "kàn" },
  ], correctOptionId: 3 },
  { id: 29107, type: "fill_blank", sentence: "我们已经买___票了。", sentencePinyin: "Wǒmen yǐjīng mǎi ___ piào le.", blankedWord: "好", correctAnswer: "好", hint: "результат. глагол: «купили как надо»", instruction: "Вставь пропущенное слово: «Мы уже купили билеты.»", options: [
    { id: 1, hanzi: "好", pinyin: "hǎo" },
    { id: 2, hanzi: "完", pinyin: "wán" },
    { id: 3, hanzi: "到", pinyin: "dào" },
    { id: 4, hanzi: "见", pinyin: "jiàn" },
  ] },
  { id: 29108, type: "fill_blank", sentence: "考了三天，___考完了。", sentencePinyin: "Kǎo le sān tiān, ___ kǎo wán le.", blankedWord: "终于", correctAnswer: "终于", hint: "«наконец-то»", instruction: "Вставь пропущенное слово: «Сдавал 3 дня, наконец всё.»", options: [
    { id: 1, hanzi: "终于", pinyin: "zhōngyú" },
    { id: 2, hanzi: "就", pinyin: "jiù" },
    { id: 3, hanzi: "才", pinyin: "cái" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 29109, type: "fill_blank", sentence: "只买到三___卧铺票。", sentencePinyin: "Zhǐ mǎi dào sān ___ wòpù piào.", blankedWord: "张", correctAnswer: "张", hint: "сч.слово для плоских объектов (билеты)", instruction: "Вставь пропущенное слово: «Купили только 3 плацкартных билета.»", options: [
    { id: 1, hanzi: "张", pinyin: "zhāng" },
    { id: 2, hanzi: "个", pinyin: "gè" },
    { id: 3, hanzi: "本", pinyin: "běn" },
    { id: 4, hanzi: "条", pinyin: "tiáo" },
  ] },
  { id: 29110, type: "fill_blank", sentence: "今天全部考___了。", sentencePinyin: "Jīntiān quánbù kǎo ___ le.", blankedWord: "完", correctAnswer: "完", hint: "«закончить» (результат)", instruction: "Вставь пропущенное слово: «Сегодня всё сдали.»", options: [
    { id: 1, hanzi: "完", pinyin: "wán" },
    { id: 2, hanzi: "好", pinyin: "hǎo" },
    { id: 3, hanzi: "到", pinyin: "dào" },
    { id: 4, hanzi: "起", pinyin: "qǐ" },
  ] },
  { id: 29111, type: "multiple_choice", mandarin: { hanzi: "你什么时候出发？", pinyin: "Nǐ shénme shíhou chūfā?" }, instruction: "«Когда отправляешься?» В воскресенье, билеты уже куплены. Как?", options: [
    { id: 1, english: "星期日出发。我们已经买好票了。", mandarin: { hanzi: "星期日出发。我们已经买好票了", pinyin: "Xīngqīrì chūfā. Wǒmen yǐjīng mǎi hǎo piào le", words: [{ hanzi: "买好", pinyin: "mǎi hǎo", english: "купили (как надо)" }], breakdown: "Результативный глагол V+好+了." } },
    { id: 2, english: "没有票。", mandarin: { hanzi: "没有票", pinyin: "Méiyǒu piào", words: [], breakdown: "«Билетов нет» — противоречит." } },
    { id: 3, english: "不出发。", mandarin: { hanzi: "不出发", pinyin: "Bù chūfā", words: [], breakdown: "«Не отправляюсь» — противоречит." } },
    { id: 4, english: "票太贵。", mandarin: { hanzi: "票太贵", pinyin: "Piào tài guì", words: [], breakdown: "Не отвечает на «когда»." } },
  ], correctOptionId: 1 },
  { id: 29112, type: "multiple_choice", mandarin: { hanzi: "考得怎么样？", pinyin: "Kǎo de zěnmeyàng?" }, instruction: "«Как сдал?» Ужасно, особенно тоны и иероглифы. Как?", options: [
    { id: 1, english: "别提了，考得糟糕极了，特别是声调和汉字。", mandarin: { hanzi: "别提了，考得糟糕极了，特别是声调和汉字", pinyin: "Biétí le, kǎo de zāogāo jí le, tèbié shì shēngdiào hé Hànzì", words: [{ hanzi: "别提", pinyin: "biétí", english: "не спрашивай" }, { hanzi: "糟糕", pinyin: "zāogāo", english: "ужасно" }], breakdown: "Экспрессивный ответ + конкретика." } },
    { id: 2, english: "考得真棒。", mandarin: { hanzi: "考得真棒", pinyin: "Kǎo de zhēn bàng", words: [], breakdown: "«Отлично» — противоречит." } },
    { id: 3, english: "没有考。", mandarin: { hanzi: "没有考", pinyin: "Méiyǒu kǎo", words: [], breakdown: "«Не сдавал» — неверно." } },
    { id: 4, english: "考试很容易。", mandarin: { hanzi: "考试很容易", pinyin: "Kǎoshì hěn róngyì", words: [], breakdown: "«Экзамен лёгкий» — противоречит «ужасно»." } },
  ], correctOptionId: 1 },
  { id: 29113, type: "multiple_choice", mandarin: { hanzi: "你能来联欢晚会吗？", pinyin: "Nǐ néng lái liánhuān wǎnhuì ma?" }, instruction: "«Придёшь на вечер?» Выезжаем в воскресенье днём — успею. Как?", options: [
    { id: 1, english: "我们星期日下午出发，应该没问题。", mandarin: { hanzi: "我们星期日下午出发，应该没问题", pinyin: "Wǒmen xīngqīrì xiàwǔ chūfā, yīnggāi méi wèntí", words: [{ hanzi: "应该", pinyin: "yīnggāi", english: "должно" }], breakdown: "Причина + результат." } },
    { id: 2, english: "不能来。", mandarin: { hanzi: "不能来", pinyin: "Bù néng lái", words: [], breakdown: "«Не смогу» — противоречит." } },
    { id: 3, english: "晚会没有。", mandarin: { hanzi: "晚会没有", pinyin: "Wǎnhuì méiyǒu", words: [], breakdown: "«Вечера нет» — неверно." } },
    { id: 4, english: "我不去。", mandarin: { hanzi: "我不去", pinyin: "Wǒ bú qù", words: [], breakdown: "Слишком коротко и невежливо." } },
  ], correctOptionId: 1 },
  { id: 29114, type: "listening_mc", mandarin: { hanzi: "我们已经买好票了", pinyin: "Wǒmen yǐjīng mǎi hǎo piào le", words: [{ hanzi: "买好", pinyin: "mǎi hǎo", english: "купили" }, { hanzi: "票", pinyin: "piào", english: "билеты" }], breakdown: "Результативный глагол V+好." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Мы уже купили билеты — 我们已经买好票了" },
    { id: 2, english: "Мы хотим билеты — 我们要票" },
    { id: 3, english: "Билетов нет — 没有票" },
    { id: 4, english: "Билеты дорогие — 票很贵" },
  ], correctOptionId: 1 },
  { id: 29115, type: "listening_mc", mandarin: { hanzi: "终于考完了", pinyin: "Zhōngyú kǎo wán le", words: [{ hanzi: "终于", pinyin: "zhōngyú", english: "наконец" }, { hanzi: "考完", pinyin: "kǎo wán", english: "сдал до конца" }], breakdown: "终于 + V+完+了 = долгожданное завершение." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Наконец всё сдал — 终于考完了" },
    { id: 2, english: "Не сдал — 没考" },
    { id: 3, english: "Пойду сдавать — 要去考" },
    { id: 4, english: "Экзамен сложный — 考试很难" },
  ], correctOptionId: 1 },
  { id: 29116, type: "grammar", rule: {
    title: "Результативные глаголы: V + 完/好/到/见/懂 + 了",
    explanation: "Результативный глагол = действие + РЕЗУЛЬТАТ. Второй глагол после основного.\n\nСхема: V + Результат + 了\n\n• 完 — закончить: 考完了 (сдал)\n• 好 — сделать как надо: 买好了\n• 到 — достигнуть: 找到了 (нашёл)\n• 见 — воспринял: 听见了\n• 懂 — понял: 看懂了\n\nОтрицание: 没 + V+Результат (БЕЗ 了):\n还没准备好 — ещё не готов.",
    examples: [
      { hanzi: "考完了。", pinyin: "Kǎo wán le.", english: "Сдал." },
      { hanzi: "找到了我的自行车。", pinyin: "Zhǎo dào le wǒ de zìxíngchē.", english: "Нашёл велосипед." },
    ],
  }, practice: [
    { question: "Как сказать «Я ещё не прочитал книгу»?", options: [
      { id: 1, text: "我没看完书" },
      { id: 2, text: "我不看完书" },
      { id: 3, text: "我没看完书了" },
      { id: 4, text: "我看不完书" },
    ], correctOptionId: 1 },
    { question: "Что значит V+到?", options: [
      { id: 1, text: "Не получилось" },
      { id: 2, text: "Достигли результата (нашли, услышали)" },
      { id: 3, text: "Закончили" },
      { id: 4, text: "Начали" },
    ], correctOptionId: 2 },
  ] },
  { id: 29117, type: "grammar", rule: {
    title: "Счётное слово 张 — плоские объекты",
    explanation: "张 (zhāng) — для плоских предметов.\n\nЧто считается через 张:\n• 票 — билет: 一张票\n• 纸 — бумага: 一张纸\n• 照片 — фото: 一张照片\n• 桌子 — стол: 一张桌子\n• 床 — кровать: 一张床\n• 地图 — карта: 一张地图",
    examples: [
      { hanzi: "三张卧铺票。", pinyin: "Sān zhāng wòpù piào.", english: "3 плацкартных билета." },
      { hanzi: "一张照片。", pinyin: "Yì zhāng zhàopiàn.", english: "Одно фото." },
    ],
  }, practice: [
    { question: "Как сказать «2 билета»?", options: [
      { id: 1, text: "两个票" },
      { id: 2, text: "两张票" },
      { id: 3, text: "两条票" },
      { id: 4, text: "两本票" },
    ], correctOptionId: 2 },
    { question: "Какое счётное слово для фотографий?", options: [
      { id: 1, text: "本" },
      { id: 2, text: "个" },
      { id: 3, text: "张" },
      { id: 4, text: "瓶" },
    ], correctOptionId: 3 },
  ] },
  { id: 29118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "火车", leftPinyin: "huǒchē", right: "поезд" },
    { id: 2, left: "票", leftPinyin: "piào", right: "билет" },
    { id: 3, left: "终于", leftPinyin: "zhōngyú", right: "наконец" },
    { id: 4, left: "糟糕", leftPinyin: "zāogāo", right: "ужасно" },
    { id: 5, left: "卧铺", leftPinyin: "wòpù", right: "плацкарт" },
    { id: 6, left: "表演", leftPinyin: "biǎoyǎn", right: "выступать" },
    { id: 7, left: "全部", leftPinyin: "quánbù", right: "всё" },
    { id: 8, left: "节目", leftPinyin: "jiémù", right: "номер" },
  ] },
  { id: 29119, type: "single_response", mandarin: { hanzi: "我们已经买好票了。", pinyin: "Wǒmen yǐjīng mǎi hǎo piào le." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Мы уже купили билеты.", mandarin: { hanzi: "我们已经买好票了", pinyin: "Wǒmen yǐjīng mǎi hǎo piào le", words: [
      { hanzi: "已经", pinyin: "yǐjīng", english: "уже" },
      { hanzi: "买好", pinyin: "mǎi hǎo", english: "купили" },
    ], breakdown: "已经 + V+好+了 = завершённое подготовительное действие." } },
  ] },
  { id: 29120, type: "single_response", mandarin: { hanzi: "考了三天，终于考完了。", pinyin: "Kǎo le sān tiān, zhōngyú kǎo wán le." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Сдавал три дня, наконец всё.", mandarin: { hanzi: "考了三天，终于考完了", pinyin: "Kǎo le sān tiān, zhōngyú kǎo wán le", words: [
      { hanzi: "终于", pinyin: "zhōngyú", english: "наконец" },
      { hanzi: "考完", pinyin: "kǎo wán", english: "сдал" },
    ], breakdown: "Длительность + 终于 + результат." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 30 — 我要参加联欢会 (FINAL! 多...啊, 怕, 首/次)
// ═══════════════════════════════════════════════════════════════════
const ch30 = [
  { id: 30101, type: "flashcard", mandarin: { hanzi: "民歌", pinyin: "Míngē" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "поп-музыка", hanzi: "流行歌曲", pinyin: "liúxíng gēqǔ" },
    { id: 2, english: "народная песня", hanzi: "民歌", pinyin: "míngē" },
    { id: 3, english: "рок", hanzi: "摇滚", pinyin: "yáogǔn" },
    { id: 4, english: "классика", hanzi: "古典", pinyin: "gǔdiǎn" },
  ], correctOptionId: 2 },
  { id: 30102, type: "flashcard", mandarin: { hanzi: "发音", pinyin: "Fāyīn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "слова", hanzi: "词", pinyin: "cí" },
    { id: 2, english: "произношение", hanzi: "发音", pinyin: "fāyīn" },
    { id: 3, english: "грамматика", hanzi: "语法", pinyin: "yǔfǎ" },
    { id: 4, english: "тоны", hanzi: "声调", pinyin: "shēngdiào" },
  ], correctOptionId: 2 },
  { id: 30103, type: "flashcard", mandarin: { hanzi: "怕", pinyin: "Pà" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "бояться", hanzi: "怕", pinyin: "pà" },
    { id: 2, english: "волноваться", hanzi: "担心", pinyin: "dān xīn" },
    { id: 3, english: "любить", hanzi: "爱", pinyin: "ài" },
    { id: 4, english: "не любить", hanzi: "不喜欢", pinyin: "bù xǐhuan" },
  ], correctOptionId: 1 },
  { id: 30104, type: "flashcard", mandarin: { hanzi: "标准", pinyin: "Biāozhǔn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "стандартный", hanzi: "标准", pinyin: "biāozhǔn" },
    { id: 2, english: "плохой", hanzi: "差", pinyin: "chà" },
    { id: 3, english: "правильный", hanzi: "对", pinyin: "duì" },
    { id: 4, english: "хороший", hanzi: "好", pinyin: "hǎo" },
  ], correctOptionId: 1 },
  { id: 30105, type: "flashcard", mandarin: { hanzi: "行李", pinyin: "Xíngli" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "одежда", hanzi: "衣服", pinyin: "yīfu" },
    { id: 2, english: "багаж", hanzi: "行李", pinyin: "xíngli" },
    { id: 3, english: "сумка", hanzi: "包", pinyin: "bāo" },
    { id: 4, english: "чемодан", hanzi: "箱子", pinyin: "xiāngzi" },
  ], correctOptionId: 2 },
  { id: 30106, type: "flashcard", mandarin: { hanzi: "收拾", pinyin: "Shōushi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "собирать (вещи), убирать", hanzi: "收拾", pinyin: "shōushi" },
    { id: 2, english: "купить", hanzi: "买", pinyin: "mǎi" },
    { id: 3, english: "пойти", hanzi: "去", pinyin: "qù" },
    { id: 4, english: "готовить", hanzi: "准备", pinyin: "zhǔnbèi" },
  ], correctOptionId: 1 },
  { id: 30107, type: "fill_blank", sentence: "多没面子___！", sentencePinyin: "Duō méi miànzi ___!", blankedWord: "啊", correctAnswer: "啊", hint: "восклицательная частица (多...啊!)", instruction: "Вставь пропущенное слово: «Какой же стыд!»", options: [
    { id: 1, hanzi: "啊", pinyin: "a" },
    { id: 2, hanzi: "吗", pinyin: "ma" },
    { id: 3, hanzi: "了", pinyin: "le" },
    { id: 4, hanzi: "吧", pinyin: "ba" },
  ] },
  { id: 30108, type: "fill_blank", sentence: "你是___表演节目吧?", sentencePinyin: "Nǐ shì ___ biǎoyǎn jiémù ba?", blankedWord: "怕", correctAnswer: "怕", hint: "«бояться»", instruction: "Вставь пропущенное слово: «Ты боишься выступать?»", options: [
    { id: 1, hanzi: "怕", pinyin: "pà" },
    { id: 2, hanzi: "要", pinyin: "yào" },
    { id: 3, hanzi: "想", pinyin: "xiǎng" },
    { id: 4, hanzi: "会", pinyin: "huì" },
  ] },
  { id: 30109, type: "fill_blank", sentence: "我打算唱一___中文歌。", sentencePinyin: "Wǒ dǎsuàn chàng yì ___ Zhōngwén gē.", blankedWord: "首", correctAnswer: "首", hint: "сч.слово для песен", instruction: "Вставь пропущенное слово: «Планирую спеть одну китайскую песню.»", options: [
    { id: 1, hanzi: "首", pinyin: "shǒu" },
    { id: 2, hanzi: "个", pinyin: "gè" },
    { id: 3, hanzi: "本", pinyin: "běn" },
    { id: 4, hanzi: "张", pinyin: "zhāng" },
  ] },
  { id: 30110, type: "fill_blank", sentence: "我昨天收拾了___天。", sentencePinyin: "Wǒ zuótiān shōushi le ___ tiān.", blankedWord: "半", correctAnswer: "半", hint: "«полдня»", instruction: "Вставь пропущенное слово: «Вчера полдня собирал.»", options: [
    { id: 1, hanzi: "半", pinyin: "bàn" },
    { id: 2, hanzi: "整", pinyin: "zhěng" },
    { id: 3, hanzi: "全", pinyin: "quán" },
    { id: 4, hanzi: "一", pinyin: "yī" },
  ] },
  { id: 30111, type: "multiple_choice", mandarin: { hanzi: "你唱歌那么好，还需要准备吗？", pinyin: "Nǐ chàng gē nàme hǎo, hái xūyào zhǔnbèi ma?" }, instruction: "«Зачем готовиться?» Хочу спеть китайскую народную песню. Как?", options: [
    { id: 1, english: "我不想唱英文歌，想唱一首民歌。", mandarin: { hanzi: "我不想唱英文歌，想唱一首民歌", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, xiǎng chàng yì shǒu míngē", words: [{ hanzi: "首", pinyin: "shǒu", english: "(сч.сл. песен)" }, { hanzi: "民歌", pinyin: "míngē", english: "народная" }], breakdown: "Отрицание + намерение + счётное слово 首." } },
    { id: 2, english: "不唱歌。", mandarin: { hanzi: "不唱歌", pinyin: "Bú chàng gē", words: [], breakdown: "«Не пою» — противоречит." } },
    { id: 3, english: "民歌没有。", mandarin: { hanzi: "民歌没有", pinyin: "Míngē méiyǒu", words: [], breakdown: "Бессмыслица." } },
    { id: 4, english: "英文歌很好。", mandarin: { hanzi: "英文歌很好", pinyin: "Yīngwén gē hěn hǎo", words: [], breakdown: "«Англ. песни хорошие» — но ты не хочешь." } },
  ], correctOptionId: 1 },
  { id: 30112, type: "multiple_choice", mandarin: { hanzi: "发音不标准怎么办？", pinyin: "Fāyīn bù biāozhǔn zěnme bàn?" }, instruction: "«Что если произношение плохое?» Будет стыдно! Как выразить?", options: [
    { id: 1, english: "我的发音太不标准的话，那多没面子啊！", mandarin: { hanzi: "我的发音太不标准的话，那多没面子啊", pinyin: "Wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a", words: [{ hanzi: "面子", pinyin: "miànzi", english: "репутация" }, { hanzi: "多...啊", pinyin: "duō...a", english: "какой же" }], breakdown: "Условие + восклицание с 多...啊." } },
    { id: 2, english: "发音好。", mandarin: { hanzi: "发音好", pinyin: "Fāyīn hǎo", words: [], breakdown: "«Произношение хорошее» — противоречит." } },
    { id: 3, english: "不用怕。", mandarin: { hanzi: "不用怕", pinyin: "Bú yòng pà", words: [], breakdown: "«Не надо бояться» — говорит другой, не ты." } },
    { id: 4, english: "没有发音。", mandarin: { hanzi: "没有发音", pinyin: "Méiyǒu fāyīn", words: [], breakdown: "Бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 30113, type: "multiple_choice", mandarin: { hanzi: "和我一起去怎么样？", pinyin: "Hé wǒ yìqǐ qù zěnmeyàng?" }, instruction: "«Пойдём вместе?» Ты ещё не собрала вещи, в другой раз. Как?", options: [
    { id: 1, english: "我还没准备好行李呢，下次吧！", mandarin: { hanzi: "我还没准备好行李呢，下次吧", pinyin: "Wǒ hái méi zhǔnbèi hǎo xíngli ne, xià cì ba", words: [{ hanzi: "行李", pinyin: "xíngli", english: "багаж" }, { hanzi: "下次", pinyin: "xià cì", english: "в след. раз" }], breakdown: "Отрицательный результативный + предложение в след. раз." } },
    { id: 2, english: "我不想去。", mandarin: { hanzi: "我不想去", pinyin: "Wǒ bù xiǎng qù", words: [], breakdown: "«Не хочу» — без причины невежливо." } },
    { id: 3, english: "行李没有。", mandarin: { hanzi: "行李没有", pinyin: "Xíngli méiyǒu", words: [], breakdown: "«Багажа нет» — бессмыслица." } },
    { id: 4, english: "一起！", mandarin: { hanzi: "一起", pinyin: "Yìqǐ", words: [], breakdown: "«Вместе» — но не можешь сейчас." } },
  ], correctOptionId: 1 },
  { id: 30114, type: "listening_mc", mandarin: { hanzi: "我要参加联欢会", pinyin: "Wǒ yào cānjiā liánhuānhuì", words: [{ hanzi: "参加", pinyin: "cānjiā", english: "участвовать" }, { hanzi: "联欢会", pinyin: "liánhuānhuì", english: "вечер встреч" }], breakdown: "要 + план." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Я иду на вечер встреч — 我要参加联欢会" },
    { id: 2, english: "Я не иду — 我不去" },
    { id: 3, english: "Вечер отменён — 晚会取消了" },
    { id: 4, english: "Готовлю номер — 准备节目" },
  ], correctOptionId: 1 },
  { id: 30115, type: "listening_mc", mandarin: { hanzi: "多没面子啊", pinyin: "Duō méi miànzi a", words: [{ hanzi: "多...啊", pinyin: "duō...a", english: "какой же" }, { hanzi: "面子", pinyin: "miànzi", english: "репутация" }], breakdown: "Эмфатическое восклицание." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Какой же стыд! — 多没面子啊" },
    { id: 2, english: "Очень весело — 很热闹" },
    { id: 3, english: "Мне всё равно — 没关系" },
    { id: 4, english: "Это хорошо — 很好" },
  ], correctOptionId: 1 },
  { id: 30116, type: "grammar", rule: {
    title: "多……啊 — «какой же X!»",
    explanation: "Эмфатическое восклицание.\n\nСхема: 多 + Прил. + 啊\n\n多好啊！— Как же хорошо!\n多漂亮啊！— Какая же красота!\n多没面子啊！— Какой же стыд!\n\nЭквивалент русского «какой же X!» / «до чего же X!».",
    examples: [
      { hanzi: "看，那儿的风景多漂亮啊！", pinyin: "Kàn, nàr de fēngjǐng duō piàoliang a!", english: "Как там красиво!" },
      { hanzi: "快考试了，学生们多紧张啊！", pinyin: "Kuài kǎoshì le, xuéshēngmen duō jǐnzhāng a!", english: "Как же нервничают!" },
    ],
  }, practice: [
    { question: "Как сказать «Какая же вкусная еда!»?", options: [
      { id: 1, text: "多好吃啊" },
      { id: 2, text: "很好吃啊" },
      { id: 3, text: "太好吃啊" },
      { id: 4, text: "最好吃啊" },
    ], correctOptionId: 1 },
    { question: "Что выражает 多...啊?", options: [
      { id: 1, text: "Вопрос" },
      { id: 2, text: "Эмоциональное восклицание" },
      { id: 3, text: "Отрицание" },
      { id: 4, text: "Сравнение" },
    ], correctOptionId: 2 },
  ] },
  { id: 30117, type: "grammar", rule: {
    title: "怕 — «бояться»",
    explanation: "怕 (pà) = «бояться».\n\n1) Полный глагол: Подл. + 怕 + Объект\n  我怕狗。— Боюсь собак.\n\n2) Перед глаголом (боюсь сделать):\n  我怕说错。— Боюсь ошибиться.\n  你是怕表演吧？— Боишься выступать?\n\n3) 怕 + придаточное:\n  我怕他不来。— Боюсь, он не придёт.",
    examples: [
      { hanzi: "我不怕冷。", pinyin: "Wǒ bú pà lěng.", english: "Я не боюсь холода." },
      { hanzi: "我怕他不来。", pinyin: "Wǒ pà tā bù lái.", english: "Боюсь, не придёт." },
    ],
  }, practice: [
    { question: "Как сказать «Боюсь выступать»?", options: [
      { id: 1, text: "我怕表演" },
      { id: 2, text: "我是表演怕" },
      { id: 3, text: "表演我怕" },
      { id: 4, text: "怕我表演" },
    ], correctOptionId: 1 },
    { question: "怕 может стоять перед?", options: [
      { id: 1, text: "Только объектом (существительным)" },
      { id: 2, text: "Только глаголом" },
      { id: 3, text: "Существительным, глаголом или целой фразой" },
      { id: 4, text: "Только прилагательным" },
    ], correctOptionId: 3 },
  ] },
  { id: 30118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "民歌", leftPinyin: "míngē", right: "народная" },
    { id: 2, left: "发音", leftPinyin: "fāyīn", right: "произношение" },
    { id: 3, left: "怕", leftPinyin: "pà", right: "бояться" },
    { id: 4, left: "标准", leftPinyin: "biāozhǔn", right: "стандартный" },
    { id: 5, left: "行李", leftPinyin: "xíngli", right: "багаж" },
    { id: 6, left: "收拾", leftPinyin: "shōushi", right: "собирать" },
    { id: 7, left: "面子", leftPinyin: "miànzi", right: "репутация" },
    { id: 8, left: "联欢会", leftPinyin: "liánhuānhuì", right: "вечер встреч" },
  ] },
  { id: 30119, type: "single_response", mandarin: { hanzi: "我要参加联欢会。", pinyin: "Wǒ yào cānjiā liánhuānhuì." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Я иду на вечер встреч.", mandarin: { hanzi: "我要参加联欢会", pinyin: "Wǒ yào cānjiā liánhuānhuì", words: [
      { hanzi: "要", pinyin: "yào", english: "собираюсь" },
      { hanzi: "参加", pinyin: "cānjiā", english: "участвовать" },
    ], breakdown: "要 + глагол = план на будущее." } },
  ] },
  { id: 30120, type: "single_response", mandarin: { hanzi: "多没面子啊！", pinyin: "Duō méi miànzi a!" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Какой же стыд!", mandarin: { hanzi: "多没面子啊", pinyin: "Duō méi miànzi a", words: [
      { hanzi: "多", pinyin: "duō", english: "какой" },
      { hanzi: "面子", pinyin: "miànzi", english: "репутация" },
    ], breakdown: "多 + оценка + 啊 — эмоциональное восклицание." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════════════════════════
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
for (const [num, questions] of [[27, ch27], [28, ch28], [29, ch29], [30, ch30]]) {
  const chapter = data.chapters.find((c) => c.id === num);
  chapter.lessons[0].questions = questions;
  const counts = {};
  questions.forEach((q) => { counts[q.type] = (counts[q.type] || 0) + 1; });
  console.log(`Chapter ${num}: ${questions.length} exercises`, counts);
}
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
console.log("\n🎉 ALL 30 CHAPTERS COMPLETE! 🎉");
