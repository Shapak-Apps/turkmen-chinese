/**
 * Adds 20 exercises to each of Chapters 21-23 based on Boya Chinese Elementary I.
 */
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "assets", "data", "course_content.json");

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 21 — 我喝了半斤白酒 (drinking culture, 又, V+了+quantity, 好像)
// ═══════════════════════════════════════════════════════════════════
const ch21 = [
  { id: 21101, type: "flashcard", mandarin: { hanzi: "白酒", pinyin: "Báijiǔ" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "пиво", hanzi: "啤酒", pinyin: "píjiǔ" },
    { id: 2, english: "крепкий алкоголь", hanzi: "白酒", pinyin: "báijiǔ" },
    { id: 3, english: "вода", hanzi: "水", pinyin: "shuǐ" },
    { id: 4, english: "чай", hanzi: "茶", pinyin: "chá" },
  ], correctOptionId: 2 },
  { id: 21102, type: "flashcard", mandarin: { hanzi: "头疼", pinyin: "Tóuténg" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "кашель", hanzi: "咳嗽", pinyin: "késou" },
    { id: 2, english: "головная боль", hanzi: "头疼", pinyin: "tóuténg" },
    { id: 3, english: "температура", hanzi: "发烧", pinyin: "fāshāo" },
    { id: 4, english: "усталость", hanzi: "累", pinyin: "lèi" },
  ], correctOptionId: 2 },
  { id: 21103, type: "flashcard", mandarin: { hanzi: "醉", pinyin: "Zuì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "пить", hanzi: "喝", pinyin: "hē" },
    { id: 2, english: "тошнить", hanzi: "吐", pinyin: "tù" },
    { id: 3, english: "напиться", hanzi: "醉", pinyin: "zuì" },
    { id: 4, english: "наливать", hanzi: "倒", pinyin: "dào" },
  ], correctOptionId: 3 },
  { id: 21104, type: "flashcard", mandarin: { hanzi: "好像", pinyin: "Hǎoxiàng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "кажется, похоже", hanzi: "好像", pinyin: "hǎoxiàng" },
    { id: 2, english: "определённо", hanzi: "一定", pinyin: "yídìng" },
    { id: 3, english: "примерно", hanzi: "大概", pinyin: "dàgài" },
    { id: 4, english: "хорошо", hanzi: "好", pinyin: "hǎo" },
  ], correctOptionId: 1 },
  { id: 21105, type: "flashcard", mandarin: { hanzi: "热情", pinyin: "Rèqíng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "радушный, гостеприимный", hanzi: "热情", pinyin: "rèqíng" },
    { id: 2, english: "жаркий", hanzi: "热", pinyin: "rè" },
    { id: 3, english: "холодный", hanzi: "冷", pinyin: "lěng" },
    { id: 4, english: "спокойный", hanzi: "安静", pinyin: "ānjìng" },
  ], correctOptionId: 1 },
  { id: 21106, type: "flashcard", mandarin: { hanzi: "生气", pinyin: "Shēng qì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "быть рад", hanzi: "高兴", pinyin: "gāoxìng" },
    { id: 2, english: "сердиться", hanzi: "生气", pinyin: "shēng qì" },
    { id: 3, english: "грустить", hanzi: "难过", pinyin: "nánguò" },
    { id: 4, english: "волноваться", hanzi: "着急", pinyin: "zháojí" },
  ], correctOptionId: 2 },
  { id: 21107, type: "fill_blank", sentence: "昨天晚上___熬夜了吗?", sentencePinyin: "Zuótiān wǎnshang ___ áo yè le ma?", blankedWord: "又", correctAnswer: "又", hint: "«снова» (о прошлом)", instruction: "Вставь пропущенное слово: «Вчера опять не спал всю ночь?»", options: [
    { id: 1, hanzi: "又", pinyin: "yòu" },
    { id: 2, hanzi: "再", pinyin: "zài" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 21108, type: "fill_blank", sentence: "我喝___半斤白酒。", sentencePinyin: "Wǒ hē ___ bàn jīn báijiǔ.", blankedWord: "了", correctAnswer: "了", hint: "частица завершённости с количеством", instruction: "Вставь пропущенное слово: «Я выпил полцзиня байцзю.»", options: [
    { id: 1, hanzi: "了", pinyin: "le" },
    { id: 2, hanzi: "的", pinyin: "de" },
    { id: 3, hanzi: "得", pinyin: "de" },
    { id: 4, hanzi: "过", pinyin: "guò" },
  ] },
  { id: 21109, type: "fill_blank", sentence: "你___还很困。", sentencePinyin: "Nǐ ___ hái hěn kùn.", blankedWord: "好像", correctAnswer: "好像", hint: "«кажется»", instruction: "Вставь пропущенное слово: «Ты, кажется, ещё сонный.»", options: [
    { id: 1, hanzi: "好像", pinyin: "hǎoxiàng" },
    { id: 2, hanzi: "一定", pinyin: "yídìng" },
    { id: 3, hanzi: "可能", pinyin: "kěnéng" },
    { id: 4, hanzi: "真", pinyin: "zhēn" },
  ] },
  { id: 21110, type: "fill_blank", sentence: "他们不停___给我倒酒。", sentencePinyin: "Tāmen bù tíng ___ gěi wǒ dào jiǔ.", blankedWord: "地", correctAnswer: "地", hint: "частица наречия перед глаголом", instruction: "Вставь пропущенное слово: «Они без остановки мне подливали.»", options: [
    { id: 1, hanzi: "地", pinyin: "de" },
    { id: 2, hanzi: "的", pinyin: "de" },
    { id: 3, hanzi: "得", pinyin: "de" },
    { id: 4, hanzi: "了", pinyin: "le" },
  ] },
  { id: 21111, type: "multiple_choice", mandarin: { hanzi: "你怎么喝那么多酒呢？", pinyin: "Nǐ zěnme hē nàme duō jiǔ ne?" }, instruction: "«Зачем столько выпил?» Китайцы радушные, подливали. Как объяснить?", options: [
    { id: 1, english: "他们太热情了，一直不停地给我倒酒。", mandarin: { hanzi: "他们太热情了，一直不停地给我倒酒", pinyin: "Tāmen tài rèqíng le, yìzhí bù tíng de gěi wǒ dào jiǔ", words: [{ hanzi: "热情", pinyin: "rèqíng", english: "радушный" }, { hanzi: "倒", pinyin: "dào", english: "наливать" }], breakdown: "Объяснение причины + как именно (不停地)." } },
    { id: 2, english: "我喜欢喝酒。", mandarin: { hanzi: "我喜欢喝酒", pinyin: "Wǒ xǐhuan hē jiǔ", words: [], breakdown: "«Я люблю пить» — не объясняет столько." } },
    { id: 3, english: "他们没有热情。", mandarin: { hanzi: "他们没有热情", pinyin: "Tāmen méiyǒu rèqíng", words: [], breakdown: "«Они без радушия» — противоположно." } },
    { id: 4, english: "酒太贵了。", mandarin: { hanzi: "酒太贵了", pinyin: "Jiǔ tài guì le", words: [], breakdown: "«Алкоголь дорог» — не о количестве." } },
  ], correctOptionId: 1 },
  { id: 21112, type: "multiple_choice", mandarin: { hanzi: "老师生气了吗？", pinyin: "Lǎoshī shēng qì le ma?" }, instruction: "«Учитель рассердился?» Непохоже. Как ответить?", options: [
    { id: 1, english: "好像没生气。", mandarin: { hanzi: "好像没生气", pinyin: "Hǎoxiàng méi shēng qì", words: [{ hanzi: "好像", pinyin: "hǎoxiàng", english: "кажется" }], breakdown: "«Кажется, не сердился» — мягкое предположение." } },
    { id: 2, english: "生气了老师。", mandarin: { hanzi: "生气了老师", pinyin: "Shēng qì le lǎoshī", words: [], breakdown: "Неправильный порядок." } },
    { id: 3, english: "我生气了。", mandarin: { hanzi: "我生气了", pinyin: "Wǒ shēng qì le", words: [], breakdown: "«Я рассердился» — не о учителе." } },
    { id: 4, english: "老师热情。", mandarin: { hanzi: "老师热情", pinyin: "Lǎoshī rèqíng", words: [], breakdown: "«Учитель радушный» — не о сердитости." } },
  ], correctOptionId: 1 },
  { id: 21113, type: "multiple_choice", mandarin: { hanzi: "你帮我倒杯水，好吗？", pinyin: "Nǐ bāng wǒ dào bēi shuǐ, hǎo ma?" }, instruction: "Просишь налить воды. Вежливое согласие и совет поспать. Как?", options: [
    { id: 1, english: "好的。你好像还很困，继续睡吧！", mandarin: { hanzi: "好的。你好像还很困，继续睡吧", pinyin: "Hǎo de. Nǐ hǎoxiàng hái hěn kùn, jìxù shuì ba", words: [{ hanzi: "继续", pinyin: "jìxù", english: "продолжать" }], breakdown: "Согласие + наблюдение + совет с 吧." } },
    { id: 2, english: "不帮。", mandarin: { hanzi: "不帮", pinyin: "Bù bāng", words: [], breakdown: "«Не помогу» — грубо." } },
    { id: 3, english: "我喝水。", mandarin: { hanzi: "我喝水", pinyin: "Wǒ hē shuǐ", words: [], breakdown: "«Я пью воду» — не о помощи." } },
    { id: 4, english: "水没有。", mandarin: { hanzi: "水没有", pinyin: "Shuǐ méiyǒu", words: [], breakdown: "«Воды нет» — отказ без причины." } },
  ], correctOptionId: 1 },
  { id: 21114, type: "listening_mc", mandarin: { hanzi: "我喝了半斤白酒", pinyin: "Wǒ hē le bàn jīn báijiǔ", words: [{ hanzi: "喝了", pinyin: "hē le", english: "выпил" }, { hanzi: "半斤", pinyin: "bàn jīn", english: "полцзиня (250г)" }], breakdown: "V + 了 + количество + объект." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Я выпил полцзиня байцзю — 我喝了半斤白酒" },
    { id: 2, english: "Я выпью байцзю — 我喝白酒" },
    { id: 3, english: "Я не пью байцзю — 我不喝白酒" },
    { id: 4, english: "Я выпил пива — 我喝了啤酒" },
  ], correctOptionId: 1 },
  { id: 21115, type: "listening_mc", mandarin: { hanzi: "好像没生气", pinyin: "Hǎoxiàng méi shēng qì", words: [{ hanzi: "好像", pinyin: "hǎoxiàng", english: "кажется" }, { hanzi: "生气", pinyin: "shēng qì", english: "сердиться" }], breakdown: "Мягкое предположение." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Кажется, не сердится — 好像没生气" },
    { id: 2, english: "Точно рассержен — 一定生气了" },
    { id: 3, english: "Я рассержен — 我生气了" },
    { id: 4, english: "Не волнуйся — 别着急" },
  ], correctOptionId: 1 },
  { id: 21116, type: "grammar", rule: {
    title: "V + 了 + количество + Объект",
    explanation: "Вторая форма 了 — срaзу после глагола, когда речь о ЗАВЕРШЁННОМ действии с КОНКРЕТНЫМ количеством.\n\nСхема: V + 了 + [число+сч.слово] + Объект\n\n我喝了半斤白酒。— Выпил полцзиня.\n他们吃了十个饺子。— Съели 10 пельменей.\n妹妹买了一件衣服。— Сестра купила одну вещь.",
    examples: [
      { hanzi: "我喝了半斤白酒。", pinyin: "Wǒ hē le bàn jīn báijiǔ.", english: "Выпил полцзиня." },
      { hanzi: "他们吃了十个饺子。", pinyin: "Tāmen chī le shí ge jiǎozi.", english: "Съели 10 пельменей." },
    ],
  }, practice: [
    { question: "Как сказать «Я купил 3 книги»?", options: [
      { id: 1, text: "我买三本书了" },
      { id: 2, text: "我买了三本书" },
      { id: 3, text: "我三本书买了" },
      { id: 4, text: "书买三本我了" },
    ], correctOptionId: 2 },
    { question: "Где ставится 了 при указании количества?", options: [
      { id: 1, text: "В конце" },
      { id: 2, text: "Сразу после глагола" },
      { id: 3, text: "Перед подлежащим" },
      { id: 4, text: "После объекта" },
    ], correctOptionId: 2 },
  ] },
  { id: 21117, type: "grammar", rule: {
    title: "好像 — «кажется, похоже»",
    explanation: "好像 (hǎoxiàng) = «кажется», неуверенное суждение. Перед глаголом/прилагательным.\n\nСхема: Подл. + 好像 + Сказуемое\n\n你好像还很困。— Ты как будто ещё сонный.\n老师好像没生气。— Учитель вроде не сердится.",
    examples: [
      { hanzi: "好像没问题。", pinyin: "Hǎoxiàng méi wèntí.", english: "Кажется, проблем нет." },
      { hanzi: "他好像不在家。", pinyin: "Tā hǎoxiàng bú zài jiā.", english: "Его, кажется, нет дома." },
    ],
  }, practice: [
    { question: "Как сказать «Он, кажется, болен»?", options: [
      { id: 1, text: "他好像病了" },
      { id: 2, text: "好像他病了" },
      { id: 3, text: "他病了好像" },
      { id: 4, text: "病他好像了" },
    ], correctOptionId: 1 },
    { question: "好像 выражает...?", options: [
      { id: 1, text: "Уверенность" },
      { id: 2, text: "Предположение" },
      { id: 3, text: "Приказ" },
      { id: 4, text: "Запрет" },
    ], correctOptionId: 2 },
  ] },
  { id: 21118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "白酒", leftPinyin: "báijiǔ", right: "крепкий алк." },
    { id: 2, left: "头疼", leftPinyin: "tóuténg", right: "голова болит" },
    { id: 3, left: "醉", leftPinyin: "zuì", right: "напиться" },
    { id: 4, left: "好像", leftPinyin: "hǎoxiàng", right: "кажется" },
    { id: 5, left: "热情", leftPinyin: "rèqíng", right: "радушный" },
    { id: 6, left: "生气", leftPinyin: "shēng qì", right: "сердиться" },
    { id: 7, left: "倒", leftPinyin: "dào", right: "наливать" },
    { id: 8, left: "渴", leftPinyin: "kě", right: "хотеть пить" },
  ] },
  { id: 21119, type: "single_response", mandarin: { hanzi: "我喝了半斤白酒，头很疼。", pinyin: "Wǒ hē le bàn jīn báijiǔ, tóu hěn téng." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Я выпил полцзиня байцзю, голова очень болит.", mandarin: { hanzi: "我喝了半斤白酒，头很疼", pinyin: "Wǒ hē le bàn jīn báijiǔ, tóu hěn téng", words: [
      { hanzi: "喝了", pinyin: "hē le", english: "выпил" },
      { hanzi: "半斤", pinyin: "bàn jīn", english: "250г" },
      { hanzi: "疼", pinyin: "téng", english: "болит" },
    ], breakdown: "V+了+кол-во+объект + следствие." } },
  ] },
  { id: 21120, type: "single_response", mandarin: { hanzi: "你好像还很困。", pinyin: "Nǐ hǎoxiàng hái hěn kùn." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Ты, кажется, ещё очень сонный.", mandarin: { hanzi: "你好像还很困", pinyin: "Nǐ hǎoxiàng hái hěn kùn", words: [
      { hanzi: "好像", pinyin: "hǎoxiàng", english: "кажется" },
      { hanzi: "还", pinyin: "hái", english: "всё ещё" },
      { hanzi: "困", pinyin: "kùn", english: "сонный" },
    ], breakdown: "好像 + 还 + прилагательное." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 22 — 他感冒了 (sickness, 能, 最好, dates)
// ═══════════════════════════════════════════════════════════════════
const ch22 = [
  { id: 22101, type: "flashcard", mandarin: { hanzi: "感冒", pinyin: "Gǎnmào" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "простуда", hanzi: "感冒", pinyin: "gǎnmào" },
    { id: 2, english: "температура", hanzi: "发烧", pinyin: "fāshāo" },
    { id: 3, english: "головная боль", hanzi: "头疼", pinyin: "tóuténg" },
    { id: 4, english: "кашель", hanzi: "咳嗽", pinyin: "késou" },
  ], correctOptionId: 1 },
  { id: 22102, type: "flashcard", mandarin: { hanzi: "能", pinyin: "Néng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "уметь (навык)", hanzi: "会", pinyin: "huì" },
    { id: 2, english: "мочь (по обстоятельствам)", hanzi: "能", pinyin: "néng" },
    { id: 3, english: "должен", hanzi: "得", pinyin: "děi" },
    { id: 4, english: "хотеть", hanzi: "想", pinyin: "xiǎng" },
  ], correctOptionId: 2 },
  { id: 22103, type: "flashcard", mandarin: { hanzi: "发烧", pinyin: "Fāshāo" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "кашлять", hanzi: "咳嗽", pinyin: "késou" },
    { id: 2, english: "температурить", hanzi: "发烧", pinyin: "fāshāo" },
    { id: 3, english: "болеть голова", hanzi: "头疼", pinyin: "tóuténg" },
    { id: 4, english: "простыть", hanzi: "感冒", pinyin: "gǎnmào" },
  ], correctOptionId: 2 },
  { id: 22104, type: "flashcard", mandarin: { hanzi: "最好", pinyin: "Zuìhǎo" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "самый лучший", hanzi: "最好的", pinyin: "zuì hǎo de" },
    { id: 2, english: "лучше всего бы, было бы лучше", hanzi: "最好", pinyin: "zuìhǎo" },
    { id: 3, english: "должен", hanzi: "必须", pinyin: "bìxū" },
    { id: 4, english: "можно", hanzi: "可以", pinyin: "kěyǐ" },
  ], correctOptionId: 2 },
  { id: 22105, type: "flashcard", mandarin: { hanzi: "休息", pinyin: "Xiūxi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "работать", hanzi: "工作", pinyin: "gōngzuò" },
    { id: 2, english: "учиться", hanzi: "学习", pinyin: "xuéxí" },
    { id: 3, english: "отдыхать", hanzi: "休息", pinyin: "xiūxi" },
    { id: 4, english: "спать", hanzi: "睡觉", pinyin: "shuì jiào" },
  ], correctOptionId: 3 },
  { id: 22106, type: "flashcard", mandarin: { hanzi: "请假", pinyin: "Qǐng jià" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "просить отпуск", hanzi: "请假", pinyin: "qǐng jià" },
    { id: 2, english: "пригласить", hanzi: "请客", pinyin: "qǐng kè" },
    { id: 3, english: "вопрос", hanzi: "问题", pinyin: "wèntí" },
    { id: 4, english: "работать", hanzi: "工作", pinyin: "gōngzuò" },
  ], correctOptionId: 1 },
  { id: 22107, type: "fill_blank", sentence: "大卫今天不___来上课了。", sentencePinyin: "Dàwèi jīntiān bù ___ lái shàng kè le.", blankedWord: "能", correctAnswer: "能", hint: "«мочь» (по обстоятельствам)", instruction: "Вставь пропущенное слово: «Давэй сегодня не может прийти.»", options: [
    { id: 1, hanzi: "能", pinyin: "néng" },
    { id: 2, hanzi: "会", pinyin: "huì" },
    { id: 3, hanzi: "是", pinyin: "shì" },
    { id: 4, hanzi: "要", pinyin: "yào" },
  ] },
  { id: 22108, type: "fill_blank", sentence: "医生说___休息一天。", sentencePinyin: "Yīshēng shuō ___ xiūxi yì tiān.", blankedWord: "最好", correctAnswer: "最好", hint: "совет «лучше бы»", instruction: "Вставь пропущенное слово: «Врач сказал, лучше отдохнуть день.»", options: [
    { id: 1, hanzi: "最好", pinyin: "zuìhǎo" },
    { id: 2, hanzi: "最", pinyin: "zuì" },
    { id: 3, hanzi: "更好", pinyin: "gèng hǎo" },
    { id: 4, hanzi: "应该", pinyin: "yīnggāi" },
  ] },
  { id: 22109, type: "fill_blank", sentence: "今天是12___31号。", sentencePinyin: "Jīntiān shì shí'èr ___ sānshíyī hào.", blankedWord: "月", correctAnswer: "月", hint: "«месяц»", instruction: "Вставь пропущенное слово: «Сегодня 31 декабря.»", options: [
    { id: 1, hanzi: "月", pinyin: "yuè" },
    { id: 2, hanzi: "日", pinyin: "rì" },
    { id: 3, hanzi: "年", pinyin: "nián" },
    { id: 4, hanzi: "星期", pinyin: "xīngqī" },
  ] },
  { id: 22110, type: "fill_blank", sentence: "他感冒___，不能来上课。", sentencePinyin: "Tā gǎnmào ___, bù néng lái shàng kè.", blankedWord: "了", correctAnswer: "了", hint: "изменение состояния", instruction: "Вставь пропущенное слово: «Он простудился, не может прийти.»", options: [
    { id: 1, hanzi: "了", pinyin: "le" },
    { id: 2, hanzi: "的", pinyin: "de" },
    { id: 3, hanzi: "过", pinyin: "guò" },
    { id: 4, hanzi: "着", pinyin: "zhe" },
  ] },
  { id: 22111, type: "multiple_choice", mandarin: { hanzi: "他病了吗？", pinyin: "Tā bìng le ma?" }, instruction: "«Он заболел?» Простудился — голова болит, температура, кашляет. Как?", options: [
    { id: 1, english: "对，他感冒了。头疼，发烧，还有点儿咳嗽。", mandarin: { hanzi: "对，他感冒了。头疼，发烧，还有点儿咳嗽", pinyin: "Duì, tā gǎnmào le. Tóuténg, fāshāo, hái yǒudiǎnr késou", words: [{ hanzi: "感冒", pinyin: "gǎnmào", english: "простуда" }, { hanzi: "发烧", pinyin: "fāshāo", english: "температурить" }], breakdown: "Стандартный список симптомов простуды." } },
    { id: 2, english: "他没病。", mandarin: { hanzi: "他没病", pinyin: "Tā méi bìng", words: [], breakdown: "«Он не болен» — противоречит." } },
    { id: 3, english: "他去上课了。", mandarin: { hanzi: "他去上课了", pinyin: "Tā qù shàng kè le", words: [], breakdown: "«Пошёл на пары» — но он болен." } },
    { id: 4, english: "我感冒了。", mandarin: { hanzi: "我感冒了", pinyin: "Wǒ gǎnmào le", words: [], breakdown: "«Я простыл» — речь о нём." } },
  ], correctOptionId: 1 },
  { id: 22112, type: "multiple_choice", mandarin: { hanzi: "怎么感冒了？", pinyin: "Zěnme gǎnmào le?" }, instruction: "«Как простыл?» Под дождём без зонта. Как объяснить?", options: [
    { id: 1, english: "回来的时候下雨了，他没带伞，所以感冒了。", mandarin: { hanzi: "回来的时候下雨了，他没带伞，所以感冒了", pinyin: "Huílai de shíhou xià yǔ le, tā méi dài sǎn, suǒyǐ gǎnmào le", words: [{ hanzi: "下雨", pinyin: "xià yǔ", english: "идти (о дожде)" }, { hanzi: "伞", pinyin: "sǎn", english: "зонт" }], breakdown: "Причинно-следственная связь через 所以." } },
    { id: 2, english: "他喜欢下雨。", mandarin: { hanzi: "他喜欢下雨", pinyin: "Tā xǐhuan xià yǔ", words: [], breakdown: "«Он любит дождь» — не причина." } },
    { id: 3, english: "没有感冒。", mandarin: { hanzi: "没有感冒", pinyin: "Méiyǒu gǎnmào", words: [], breakdown: "«Не простыл» — противоречит." } },
    { id: 4, english: "伞没有。", mandarin: { hanzi: "伞没有", pinyin: "Sǎn méiyǒu", words: [], breakdown: "«Зонта нет» — не полное объяснение." } },
  ], correctOptionId: 1 },
  { id: 22113, type: "multiple_choice", mandarin: { hanzi: "医生怎么说？", pinyin: "Yīshēng zěnme shuō?" }, instruction: "«Что сказал врач?» Выписал лекарства, поставил укол, советует отдых. Как?", options: [
    { id: 1, english: "给他开了一点儿药，又打了一针。医生还说最好休息一天。", mandarin: { hanzi: "给他开了一点儿药，又打了一针。医生还说最好休息一天", pinyin: "Gěi tā kāi le yìdiǎnr yào, yòu dǎ le yì zhēn. Yīshēng hái shuō zuìhǎo xiūxi yì tiān", words: [{ hanzi: "开", pinyin: "kāi", english: "выписать" }, { hanzi: "针", pinyin: "zhēn", english: "укол" }, { hanzi: "最好", pinyin: "zuìhǎo", english: "лучше бы" }], breakdown: "Перечисление действий с V+了." } },
    { id: 2, english: "医生没说话。", mandarin: { hanzi: "医生没说话", pinyin: "Yīshēng méi shuō huà", words: [], breakdown: "«Не говорил» — неверно." } },
    { id: 3, english: "医生生气了。", mandarin: { hanzi: "医生生气了", pinyin: "Yīshēng shēng qì le", words: [], breakdown: "«Рассердился» — не по теме." } },
    { id: 4, english: "不知道。", mandarin: { hanzi: "不知道", pinyin: "Bù zhīdào", words: [], breakdown: "«Не знаю» — но ты в курсе." } },
  ], correctOptionId: 1 },
  { id: 22114, type: "listening_mc", mandarin: { hanzi: "他感冒了", pinyin: "Tā gǎnmào le", words: [{ hanzi: "感冒", pinyin: "gǎnmào", english: "простудиться" }, { hanzi: "了", pinyin: "le", english: "(изменение)" }], breakdown: "«Он простудился». Изменение через 了." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Он простудился — 他感冒了" },
    { id: 2, english: "Он не болен — 他没病" },
    { id: 3, english: "У него температура — 他发烧" },
    { id: 4, english: "Он кашляет — 他咳嗽" },
  ], correctOptionId: 1 },
  { id: 22115, type: "listening_mc", mandarin: { hanzi: "最好休息一天", pinyin: "Zuìhǎo xiūxi yì tiān", words: [{ hanzi: "最好", pinyin: "zuìhǎo", english: "лучше бы" }, { hanzi: "休息", pinyin: "xiūxi", english: "отдыхать" }], breakdown: "Совет «лучше отдохнуть день»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Лучше отдохнуть день — 最好休息一天" },
    { id: 2, english: "Отдыхать один час — 休息一个小时" },
    { id: 3, english: "Работать весь день — 工作一天" },
    { id: 4, english: "Учиться лучше всех — 学习最好" },
  ], correctOptionId: 1 },
  { id: 22116, type: "grammar", rule: {
    title: "Глагол 能 — «мочь, быть в состоянии»",
    explanation: "能 (néng) = физическая возможность или возможность по обстоятельствам.\n\nСхема: Подл. + 能 + Глагол\n\nРазница 能 vs 会:\n• 会 — уметь по обучению (навык)\n• 能 — могу физически / по ситуации\n\n大卫今天不能来上课。— Сегодня не может прийти.\n我学汉语了，能唱中文歌。— Учил китайский, могу петь.",
    examples: [
      { hanzi: "他感冒了，不能来。", pinyin: "Tā gǎnmào le, bù néng lái.", english: "Простыл, не может прийти." },
      { hanzi: "能和我一起去吗？", pinyin: "Néng hé wǒ yìqǐ qù ma?", english: "Можешь со мной?" },
    ],
  }, practice: [
    { question: "В чём разница 能 и 会?", options: [
      { id: 1, text: "Одинаково" },
      { id: 2, text: "能 — физ. возможность, 会 — навык по обучению" },
      { id: 3, text: "能 — долг, 会 — желание" },
      { id: 4, text: "能 — прошлое, 会 — будущее" },
    ], correctOptionId: 2 },
    { question: "Как сказать «Сегодня не могу прийти»?", options: [
      { id: 1, text: "今天不会来" },
      { id: 2, text: "今天不能来" },
      { id: 3, text: "今天不要来" },
      { id: 4, text: "今天没来" },
    ], correctOptionId: 2 },
  ] },
  { id: 22117, type: "grammar", rule: {
    title: "Даты: год + месяц + число",
    explanation: "Порядок даты в китайском: ОТ БОЛЬШЕГО К МЕНЬШЕМУ.\n\nСхема: XXXX 年 X 月 X 日(号)\n\n2012年11月15日 — 15 ноября 2012.\n1999年4月3日 — 3 апреля 1999.\n\n日 (формально) vs 号 (разговорно).\n\nГод читается по цифрам: 2012 = 二〇一二.",
    examples: [
      { hanzi: "今天是12月31号。", pinyin: "Jīntiān shì shí'èr yuè sānshíyī hào.", english: "Сегодня 31 декабря." },
      { hanzi: "我的生日是6月28号。", pinyin: "Wǒ de shēngrì shì liù yuè èrshíbā hào.", english: "Мой день рождения 28 июня." },
    ],
  }, practice: [
    { question: "Как сказать «3 марта»?", options: [
      { id: 1, text: "3号3月" },
      { id: 2, text: "3月3号" },
      { id: 3, text: "月3号3" },
      { id: 4, text: "3号月3" },
    ], correctOptionId: 2 },
    { question: "Какой порядок даты в китайском?", options: [
      { id: 1, text: "День-месяц-год" },
      { id: 2, text: "Месяц-день-год" },
      { id: 3, text: "Год-месяц-день (от большего к меньшему)" },
      { id: 4, text: "День-год-месяц" },
    ], correctOptionId: 3 },
  ] },
  { id: 22118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "感冒", leftPinyin: "gǎnmào", right: "простуда" },
    { id: 2, left: "能", leftPinyin: "néng", right: "мочь" },
    { id: 3, left: "发烧", leftPinyin: "fāshāo", right: "температура" },
    { id: 4, left: "咳嗽", leftPinyin: "késou", right: "кашель" },
    { id: 5, left: "药", leftPinyin: "yào", right: "лекарство" },
    { id: 6, left: "最好", leftPinyin: "zuìhǎo", right: "лучше бы" },
    { id: 7, left: "休息", leftPinyin: "xiūxi", right: "отдыхать" },
    { id: 8, left: "伞", leftPinyin: "sǎn", right: "зонт" },
  ] },
  { id: 22119, type: "single_response", mandarin: { hanzi: "他感冒了，不能来上课。", pinyin: "Tā gǎnmào le, bù néng lái shàng kè." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Он простудился, не может прийти на пары.", mandarin: { hanzi: "他感冒了，不能来上课", pinyin: "Tā gǎnmào le, bù néng lái shàng kè", words: [
      { hanzi: "感冒", pinyin: "gǎnmào", english: "простуда" },
      { hanzi: "不能", pinyin: "bù néng", english: "не может" },
    ], breakdown: "感冒了 (изменение) + 不能 (по обстоятельствам)." } },
  ] },
  { id: 22120, type: "single_response", mandarin: { hanzi: "医生说最好休息一天。", pinyin: "Yīshēng shuō zuìhǎo xiūxi yì tiān." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Врач сказал, что лучше отдохнуть день.", mandarin: { hanzi: "医生说最好休息一天", pinyin: "Yīshēng shuō zuìhǎo xiūxi yì tiān", words: [
      { hanzi: "医生", pinyin: "yīshēng", english: "врач" },
      { hanzi: "最好", pinyin: "zuìhǎo", english: "лучше бы" },
    ], breakdown: "Косвенная речь + совет с 最好." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 23 — 你学了多长时间汉语 (duration, 大概, 就)
// ═══════════════════════════════════════════════════════════════════
const ch23 = [
  { id: 23101, type: "flashcard", mandarin: { hanzi: "迟到", pinyin: "Chídào" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "опоздать", hanzi: "迟到", pinyin: "chídào" },
    { id: 2, english: "прийти рано", hanzi: "早到", pinyin: "zǎo dào" },
    { id: 3, english: "прийти вовремя", hanzi: "准时", pinyin: "zhǔnshí" },
    { id: 4, english: "уйти", hanzi: "走", pinyin: "zǒu" },
  ], correctOptionId: 1 },
  { id: 23102, type: "flashcard", mandarin: { hanzi: "堵车", pinyin: "Dǔ chē" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "машина", hanzi: "车", pinyin: "chē" },
    { id: 2, english: "пробка", hanzi: "堵车", pinyin: "dǔ chē" },
    { id: 3, english: "автобус", hanzi: "公共汽车", pinyin: "gōnggòng qìchē" },
    { id: 4, english: "парковка", hanzi: "停车", pinyin: "tíng chē" },
  ], correctOptionId: 2 },
  { id: 23103, type: "flashcard", mandarin: { hanzi: "小时", pinyin: "Xiǎoshí" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "минута", hanzi: "分钟", pinyin: "fēnzhōng" },
    { id: 2, english: "час (продолж.)", hanzi: "小时", pinyin: "xiǎoshí" },
    { id: 3, english: "день", hanzi: "天", pinyin: "tiān" },
    { id: 4, english: "утро", hanzi: "早上", pinyin: "zǎoshang" },
  ], correctOptionId: 2 },
  { id: 23104, type: "flashcard", mandarin: { hanzi: "大概", pinyin: "Dàgài" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "точно", hanzi: "一定", pinyin: "yídìng" },
    { id: 2, english: "примерно, около", hanzi: "大概", pinyin: "dàgài" },
    { id: 3, english: "очень", hanzi: "很", pinyin: "hěn" },
    { id: 4, english: "всего", hanzi: "一共", pinyin: "yígòng" },
  ], correctOptionId: 2 },
  { id: 23105, type: "flashcard", mandarin: { hanzi: "翻译", pinyin: "Fānyì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "писать", hanzi: "写", pinyin: "xiě" },
    { id: 2, english: "говорить", hanzi: "说", pinyin: "shuō" },
    { id: 3, english: "перевод", hanzi: "翻译", pinyin: "fānyì" },
    { id: 4, english: "грамматика", hanzi: "语法", pinyin: "yǔfǎ" },
  ], correctOptionId: 3 },
  { id: 23106, type: "flashcard", mandarin: { hanzi: "倒霉", pinyin: "Dǎoméi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "повезло", hanzi: "幸运", pinyin: "xìngyùn" },
    { id: 2, english: "не повезло", hanzi: "倒霉", pinyin: "dǎoméi" },
    { id: 3, english: "счастливый", hanzi: "幸福", pinyin: "xìngfú" },
    { id: 4, english: "грустный", hanzi: "难过", pinyin: "nánguò" },
  ], correctOptionId: 2 },
  { id: 23107, type: "fill_blank", sentence: "你学___多长时间汉语?", sentencePinyin: "Nǐ xué ___ duō cháng shíjiān Hànyǔ?", blankedWord: "了", correctAnswer: "了", hint: "длительность V+了+время", instruction: "Вставь пропущенное слово: «Как долго ты учишь китайский?»", options: [
    { id: 1, hanzi: "了", pinyin: "le" },
    { id: 2, hanzi: "过", pinyin: "guò" },
    { id: 3, hanzi: "的", pinyin: "de" },
    { id: 4, hanzi: "得", pinyin: "de" },
  ] },
  { id: 23108, type: "fill_blank", sentence: "___二十分钟吧。", sentencePinyin: "___ èrshí fēnzhōng ba.", blankedWord: "大概", correctAnswer: "大概", hint: "«примерно»", instruction: "Вставь пропущенное слово: «Минут 20 примерно.»", options: [
    { id: 1, hanzi: "大概", pinyin: "dàgài" },
    { id: 2, hanzi: "一定", pinyin: "yídìng" },
    { id: 3, hanzi: "最", pinyin: "zuì" },
    { id: 4, hanzi: "很", pinyin: "hěn" },
  ] },
  { id: 23109, type: "fill_blank", sentence: "平时一个钟头___能到。", sentencePinyin: "Píngshí yí ge zhōngtóu ___ néng dào.", blankedWord: "就", correctAnswer: "就", hint: "«уже, сразу»", instruction: "Вставь пропущенное слово: «Обычно за час уже добираюсь.»", options: [
    { id: 1, hanzi: "就", pinyin: "jiù" },
    { id: 2, hanzi: "才", pinyin: "cái" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "都", pinyin: "dōu" },
  ] },
  { id: 23110, type: "fill_blank", sentence: "我学汉语学___半年___。", sentencePinyin: "Wǒ xué Hànyǔ xué ___ bàn nián ___.", blankedWord: "了", correctAnswer: "了", hint: "V+了+время+了 — «уже полгода и продолжается»", instruction: "Вставь первое пропущенное слово: «Я учу китайский уже полгода.»", options: [
    { id: 1, hanzi: "了", pinyin: "le" },
    { id: 2, hanzi: "过", pinyin: "guò" },
    { id: 3, hanzi: "着", pinyin: "zhe" },
    { id: 4, hanzi: "在", pinyin: "zài" },
  ] },
  { id: 23111, type: "multiple_choice", mandarin: { hanzi: "对不起，我迟到了。", pinyin: "Duìbuqǐ, wǒ chídào le." }, instruction: "Ты опоздала — велосипед сломался, шина лопнула. Как объяснить?", options: [
    { id: 1, english: "我的自行车坏了，轮胎破了。", mandarin: { hanzi: "我的自行车坏了，轮胎破了", pinyin: "Wǒ de zìxíngchē huài le, lúntāi pò le", words: [{ hanzi: "坏", pinyin: "huài", english: "сломаться" }, { hanzi: "破", pinyin: "pò", english: "лопнуть" }], breakdown: "Перечисление через 了 (изменение)." } },
    { id: 2, english: "我没有自行车。", mandarin: { hanzi: "我没有自行车", pinyin: "Wǒ méiyǒu zìxíngchē", words: [], breakdown: "«Нет велосипеда» — противоречит." } },
    { id: 3, english: "我不迟到。", mandarin: { hanzi: "我不迟到", pinyin: "Wǒ bù chídào", words: [], breakdown: "«Не опаздываю» — отрицание." } },
    { id: 4, english: "自行车太贵。", mandarin: { hanzi: "自行车太贵", pinyin: "Zìxíngchē tài guì", words: [], breakdown: "«Велосипед дорог» — не о поломке." } },
  ], correctOptionId: 1 },
  { id: 23112, type: "multiple_choice", mandarin: { hanzi: "换轮胎换了多长时间？", pinyin: "Huàn lúntāi huàn le duō cháng shíjiān?" }, instruction: "«Долго меняла шину?» Полчаса примерно. Как?", options: [
    { id: 1, english: "大概换了半个小时。", mandarin: { hanzi: "大概换了半个小时", pinyin: "Dàgài huàn le bàn ge xiǎoshí", words: [{ hanzi: "大概", pinyin: "dàgài", english: "примерно" }, { hanzi: "半个小时", pinyin: "bàn ge xiǎoshí", english: "полчаса" }], breakdown: "大概 + V+了+время." } },
    { id: 2, english: "不换轮胎。", mandarin: { hanzi: "不换轮胎", pinyin: "Bù huàn lúntāi", words: [], breakdown: "«Не меняю» — противоречит." } },
    { id: 3, english: "一分钟。", mandarin: { hanzi: "一分钟", pinyin: "Yì fēnzhōng", words: [], breakdown: "«Минуту» — слишком быстро." } },
    { id: 4, english: "半个小时换。", mandarin: { hanzi: "半个小时换", pinyin: "Bàn ge xiǎoshí huàn", words: [], breakdown: "Порядок: время должно быть после V+了." } },
  ], correctOptionId: 1 },
  { id: 23113, type: "multiple_choice", mandarin: { hanzi: "你学了多长时间英语？", pinyin: "Nǐ xué le duō cháng shíjiān Yīngyǔ?" }, instruction: "«Как долго английский?» Со средней школы, уже 10 лет. Как?", options: [
    { id: 1, english: "我从初中开始学习，已经学了十年了。", mandarin: { hanzi: "我从初中开始学习，已经学了十年了", pinyin: "Wǒ cóng chūzhōng kāishǐ xuéxí, yǐjīng xué le shí nián le", words: [{ hanzi: "初中", pinyin: "chūzhōng", english: "ср. школа" }, { hanzi: "从...开始", pinyin: "cóng...kāishǐ", english: "с...начал" }], breakdown: "Полная форма V+了+время+了 = «до сих пор»." } },
    { id: 2, english: "十年英语学了。", mandarin: { hanzi: "十年英语学了", pinyin: "Shí nián Yīngyǔ xué le", words: [], breakdown: "Неправильный порядок." } },
    { id: 3, english: "不学英语。", mandarin: { hanzi: "不学英语", pinyin: "Bù xué Yīngyǔ", words: [], breakdown: "«Не учу» — противоречит." } },
    { id: 4, english: "英语没有。", mandarin: { hanzi: "英语没有", pinyin: "Yīngyǔ méiyǒu", words: [], breakdown: "«Английского нет» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 23114, type: "listening_mc", mandarin: { hanzi: "你学了多长时间汉语", pinyin: "Nǐ xué le duō cháng shíjiān Hànyǔ", words: [{ hanzi: "多长时间", pinyin: "duō cháng shíjiān", english: "как долго" }], breakdown: "«Как долго учишь китайский?»" }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Как долго ты учишь китайский? — 你学了多长时间汉语" },
    { id: 2, english: "Когда начал учить? — 什么时候开始学" },
    { id: 3, english: "Сколько тебе лет? — 你多大" },
    { id: 4, english: "Ты любишь китайский? — 你喜欢汉语吗" },
  ], correctOptionId: 1 },
  { id: 23115, type: "listening_mc", mandarin: { hanzi: "大概半个小时", pinyin: "Dàgài bàn ge xiǎoshí", words: [{ hanzi: "大概", pinyin: "dàgài", english: "примерно" }, { hanzi: "半个小时", pinyin: "bàn ge xiǎoshí", english: "полчаса" }], breakdown: "Приблизительное время." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Примерно полчаса — 大概半个小时" },
    { id: 2, english: "Один час — 一个小时" },
    { id: 3, english: "Минут 30 — 三十分钟" },
    { id: 4, english: "Весь день — 一整天" },
  ], correctOptionId: 1 },
  { id: 23116, type: "grammar", rule: {
    title: "V + 了 + длительность + (Объект)",
    explanation: "«Делал X уже Y времени»:\n\n• Без объекта: V + 了 + Время\n  我学了十年。— Учил 10 лет.\n\n• С объектом (вариант): V + 了 + Время + 的 + Объект\n  我学了十年的英语。\n\n• С объектом (вариант 2): V + Объект + V + 了 + Время\n  我学汉语学了半年。\n\n• «До сих пор»: V + 了 + Время + 了\n  我学汉语学了半年了。— Учу уже полгода (и продолжаю).",
    examples: [
      { hanzi: "换轮胎换了多长时间？", pinyin: "Huàn lúntāi huàn le duō cháng shíjiān?", english: "Сколько менял?" },
      { hanzi: "已经学了十年了。", pinyin: "Yǐjīng xué le shí nián le.", english: "Уже 10 лет." },
    ],
  }, practice: [
    { question: "Как спросить «Сколько времени смотришь ТВ?»", options: [
      { id: 1, text: "看电视多长时间?" },
      { id: 2, text: "看电视看了多长时间?" },
      { id: 3, text: "电视多长时间看?" },
      { id: 4, text: "你多长时间看电视了?" },
    ], correctOptionId: 2 },
    { question: "Разница «学了十年» и «学了十年了»?", options: [
      { id: 1, text: "Одинаково" },
      { id: 2, text: "С вторым 了 — «до сих пор учусь», без — закончил" },
      { id: 3, text: "Вторая форма грубее" },
      { id: 4, text: "Вторая форма неправильная" },
    ], correctOptionId: 2 },
  ] },
  { id: 23117, type: "grammar", rule: {
    title: "大概 — «примерно, около»",
    explanation: "大概 (dàgài) ставится перед числом или всем предложением = «примерно».\n\nСхема: 大概 + число/предложение\n\n大概二十分钟吧。— Минут 20.\n大概二十五岁吧。— Лет 25.\n他大概去图书馆了。— Наверное, ушёл в библиотеку.\n\nЧасто с 吧 в конце — «примерно... наверное».",
    examples: [
      { hanzi: "大概要两百块。", pinyin: "Dàgài yào liǎng bǎi kuài.", english: "Около 200 юаней." },
      { hanzi: "大概八点到。", pinyin: "Dàgài bā diǎn dào.", english: "Около 8 прибуду." },
    ],
  }, practice: [
    { question: "Как сказать «Примерно 30 минут»?", options: [
      { id: 1, text: "三十分钟大概" },
      { id: 2, text: "大概三十分钟" },
      { id: 3, text: "分钟大概三十" },
      { id: 4, text: "三十大概分钟" },
    ], correctOptionId: 2 },
    { question: "大概 означает...?", options: [
      { id: 1, text: "Точно" },
      { id: 2, text: "Примерно, около" },
      { id: 3, text: "Много" },
      { id: 4, text: "Мало" },
    ], correctOptionId: 2 },
  ] },
  { id: 23118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "迟到", leftPinyin: "chídào", right: "опоздать" },
    { id: 2, left: "堵车", leftPinyin: "dǔ chē", right: "пробка" },
    { id: 3, left: "小时", leftPinyin: "xiǎoshí", right: "час" },
    { id: 4, left: "大概", leftPinyin: "dàgài", right: "примерно" },
    { id: 5, left: "翻译", leftPinyin: "fānyì", right: "перевод" },
    { id: 6, left: "语法", leftPinyin: "yǔfǎ", right: "грамматика" },
    { id: 7, left: "口语", leftPinyin: "kǒuyǔ", right: "разговорный" },
    { id: 8, left: "倒霉", leftPinyin: "dǎoméi", right: "не повезло" },
  ] },
  { id: 23119, type: "single_response", mandarin: { hanzi: "你学了多长时间汉语？", pinyin: "Nǐ xué le duō cháng shíjiān Hànyǔ?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Как долго ты учишь китайский?", mandarin: { hanzi: "你学了多长时间汉语", pinyin: "Nǐ xué le duō cháng shíjiān Hànyǔ", words: [
      { hanzi: "学了", pinyin: "xué le", english: "учил(а)" },
      { hanzi: "多长时间", pinyin: "duō cháng shíjiān", english: "как долго" },
    ], breakdown: "V+了+вопрос о длительности + объект." } },
  ] },
  { id: 23120, type: "single_response", mandarin: { hanzi: "大概换了半个小时。", pinyin: "Dàgài huàn le bàn ge xiǎoshí." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Примерно полчаса меняла.", mandarin: { hanzi: "大概换了半个小时", pinyin: "Dàgài huàn le bàn ge xiǎoshí", words: [
      { hanzi: "大概", pinyin: "dàgài", english: "примерно" },
      { hanzi: "半个小时", pinyin: "bàn ge xiǎoshí", english: "полчаса" },
    ], breakdown: "大概 + V+了+время." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════════════════════════
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
for (const [num, questions] of [[21, ch21], [22, ch22], [23, ch23]]) {
  const chapter = data.chapters.find((c) => c.id === num);
  chapter.lessons[0].questions = questions;
  const counts = {};
  questions.forEach((q) => { counts[q.type] = (counts[q.type] || 0) + 1; });
  console.log(`Chapter ${num}: ${questions.length} exercises`, counts);
}
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
