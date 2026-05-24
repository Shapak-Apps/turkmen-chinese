/**
 * Adds 20 exercises to each of Chapters 16-20 based on Boya Chinese Elementary I.
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
// CHAPTER 16 — 周末你干什么 (weekends, verb reduplication)
// ═══════════════════════════════════════════════════════════════════
const ch16 = [
  { id: 16101, type: "flashcard", mandarin: { hanzi: "周末", pinyin: "Zhōumò" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "выходные", hanzi: "周末", pinyin: "zhōumò" },
    { id: 2, english: "неделя", hanzi: "星期", pinyin: "xīngqī" },
    { id: 3, english: "день", hanzi: "天", pinyin: "tiān" },
    { id: 4, english: "праздник", hanzi: "节日", pinyin: "jiérì" },
  ], correctOptionId: 1 },
  { id: 16102, type: "flashcard", mandarin: { hanzi: "觉得", pinyin: "Juéde" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "думать", hanzi: "想", pinyin: "xiǎng" },
    { id: 2, english: "чувствовать, считать", hanzi: "觉得", pinyin: "juéde" },
    { id: 3, english: "знать", hanzi: "知道", pinyin: "zhīdào" },
    { id: 4, english: "видеть", hanzi: "看", pinyin: "kàn" },
  ], correctOptionId: 2 },
  { id: 16103, type: "flashcard", mandarin: { hanzi: "没意思", pinyin: "Méi yìsi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "интересно", hanzi: "有意思", pinyin: "yǒu yìsi" },
    { id: 2, english: "скучно, неинтересно", hanzi: "没意思", pinyin: "méi yìsi" },
    { id: 3, english: "весело", hanzi: "热闹", pinyin: "rènao" },
    { id: 4, english: "занято", hanzi: "忙", pinyin: "máng" },
  ], correctOptionId: 2 },
  { id: 16104, type: "flashcard", mandarin: { hanzi: "睡懒觉", pinyin: "Shuì lǎnjiào" }, instruction: "Что значит это выражение?", options: [
    { id: 1, english: "рано вставать", hanzi: "早起", pinyin: "zǎo qǐ" },
    { id: 2, english: "поспать подольше", hanzi: "睡懒觉", pinyin: "shuì lǎnjiào" },
    { id: 3, english: "не спать", hanzi: "不睡", pinyin: "bù shuì" },
    { id: 4, english: "мечтать", hanzi: "做梦", pinyin: "zuò mèng" },
  ], correctOptionId: 2 },
  { id: 16105, type: "flashcard", mandarin: { hanzi: "逛", pinyin: "Guàng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "покупать", hanzi: "买", pinyin: "mǎi" },
    { id: 2, english: "гулять (по магазинам)", hanzi: "逛", pinyin: "guàng" },
    { id: 3, english: "идти", hanzi: "去", pinyin: "qù" },
    { id: 4, english: "работать", hanzi: "工作", pinyin: "gōngzuò" },
  ], correctOptionId: 2 },
  { id: 16106, type: "flashcard", mandarin: { hanzi: "跳舞", pinyin: "Tiào wǔ" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "петь", hanzi: "唱歌", pinyin: "chàng gē" },
    { id: 2, english: "танцевать", hanzi: "跳舞", pinyin: "tiào wǔ" },
    { id: 3, english: "играть", hanzi: "玩儿", pinyin: "wánr" },
    { id: 4, english: "слушать", hanzi: "听", pinyin: "tīng" },
  ], correctOptionId: 2 },
  { id: 16107, type: "fill_blank", sentence: "周末可以好好儿玩儿___。", sentencePinyin: "Zhōumò kěyǐ hǎohāor wánr ___.", blankedWord: "玩儿", correctAnswer: "玩儿", hint: "удвоение глагола V-V для смягчения", instruction: "Вставь пропущенное слово: «На выходных можно вдоволь поиграть.»", options: [
    { id: 1, hanzi: "玩儿", pinyin: "wánr" },
    { id: 2, hanzi: "去", pinyin: "qù" },
    { id: 3, hanzi: "了", pinyin: "le" },
    { id: 4, hanzi: "一下", pinyin: "yíxià" },
  ] },
  { id: 16108, type: "fill_blank", sentence: "明天___是周末，太高兴了！", sentencePinyin: "Míngtiān ___ shì zhōumò, tài gāoxìng le!", blankedWord: "又", correctAnswer: "又", hint: "«снова, опять» (о повторе)", instruction: "Вставь пропущенное слово: «Завтра снова выходные, я так рад!»", options: [
    { id: 1, hanzi: "又", pinyin: "yòu" },
    { id: 2, hanzi: "再", pinyin: "zài" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 16109, type: "fill_blank", sentence: "大卫___北京大学学习汉语。", sentencePinyin: "Dàwèi ___ Běijīng Dàxué xuéxí Hànyǔ.", blankedWord: "在", correctAnswer: "在", hint: "«в (месте)» перед глаголом", instruction: "Вставь пропущенное слово: «Давэй в Пекинском университете учит китайский.»", options: [
    { id: 1, hanzi: "在", pinyin: "zài" },
    { id: 2, hanzi: "是", pinyin: "shì" },
    { id: 3, hanzi: "从", pinyin: "cóng" },
    { id: 4, hanzi: "都", pinyin: "dōu" },
  ] },
  { id: 16110, type: "fill_blank", sentence: "今天___冷了!", sentencePinyin: "Jīntiān ___ lěng le!", blankedWord: "太", correctAnswer: "太", hint: "«слишком» (конструкция 太...了)",  instruction: "Вставь пропущенное слово: «Сегодня слишком холодно!»", options: [
    { id: 1, hanzi: "太", pinyin: "tài" },
    { id: 2, hanzi: "很", pinyin: "hěn" },
    { id: 3, hanzi: "最", pinyin: "zuì" },
    { id: 4, hanzi: "比较", pinyin: "bǐjiào" },
  ] },
  { id: 16111, type: "multiple_choice", mandarin: { hanzi: "你周末都干什么呢？", pinyin: "Nǐ zhōumò dōu gàn shénme ne?" }, instruction: "«Что делаешь на выходных?» В общежитии смотришь ТВ, стираешь. Как сказать (с удвоением)?", options: [
    { id: 1, english: "在宿舍里看看电视，洗洗衣服。", mandarin: { hanzi: "在宿舍里看看电视，洗洗衣服", pinyin: "Zài sùshè li kànkan diànshì, xǐxi yīfu", words: [{ hanzi: "看看", pinyin: "kànkan", english: "посмотреть (немного)" }, { hanzi: "洗洗", pinyin: "xǐxi", english: "постирать" }], breakdown: "Удвоенные глаголы — смягчённое «немножко того, немножко этого»." } },
    { id: 2, english: "看电视洗衣服。", mandarin: { hanzi: "看电视洗衣服", pinyin: "Kàn diànshì xǐ yīfu", words: [], breakdown: "Без 在 + место, и без мягкой формы." } },
    { id: 3, english: "宿舍在看电视。", mandarin: { hanzi: "宿舍在看电视", pinyin: "Sùshè zài kàn diànshì", words: [], breakdown: "«Общежитие смотрит ТВ» — бессмыслица." } },
    { id: 4, english: "没有周末。", mandarin: { hanzi: "没有周末", pinyin: "Méiyǒu zhōumò", words: [], breakdown: "«Нет выходных» — не отвечает." } },
  ], correctOptionId: 1 },
  { id: 16112, type: "multiple_choice", mandarin: { hanzi: "明天又是周末，太高兴了！", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le!" }, instruction: "«Снова выходные!» Тебе скучно каждые выходные. Как ответить?", options: [
    { id: 1, english: "我不喜欢。每个周末我都觉得没意思。", mandarin: { hanzi: "我不喜欢。每个周末我都觉得没意思", pinyin: "Wǒ bù xǐhuan. Měi ge zhōumò wǒ dōu juéde méi yìsi", words: [{ hanzi: "觉得", pinyin: "juéde", english: "чувствовать" }, { hanzi: "没意思", pinyin: "méi yìsi", english: "скучно" }], breakdown: "Стандартный шаблон: 每...都 + чувство + оценка." } },
    { id: 2, english: "周末最好。", mandarin: { hanzi: "周末最好", pinyin: "Zhōumò zuì hǎo", words: [], breakdown: "«Выходные — лучшее» — противоположный смысл." } },
    { id: 3, english: "我喜欢星期一。", mandarin: { hanzi: "我喜欢星期一", pinyin: "Wǒ xǐhuan xīngqīyī", words: [], breakdown: "«Я люблю понедельник» — не о скуке на выходных." } },
    { id: 4, english: "没问题。", mandarin: { hanzi: "没问题", pinyin: "Méi wèntí", words: [], breakdown: "«Без проблем» — не по теме." } },
  ], correctOptionId: 1 },
  { id: 16113, type: "multiple_choice", mandarin: { hanzi: "这个周末你干什么？", pinyin: "Zhège zhōumò nǐ gàn shénme?" }, instruction: "«Что в эти выходные?» Идёшь на концерт, зовёшь друга. Как?", options: [
    { id: 1, english: "我去听音乐会。一起去，怎么样？", mandarin: { hanzi: "我去听音乐会。一起去，怎么样", pinyin: "Wǒ qù tīng yīnyuèhuì. Yìqǐ qù, zěnmeyàng", words: [{ hanzi: "音乐会", pinyin: "yīnyuèhuì", english: "концерт" }, { hanzi: "怎么样", pinyin: "zěnmeyàng", english: "как?" }], breakdown: "Объявление плана + приглашение с 怎么样." } },
    { id: 2, english: "音乐会没有。", mandarin: { hanzi: "音乐会没有", pinyin: "Yīnyuèhuì méiyǒu", words: [], breakdown: "«Концерта нет» — неверно." } },
    { id: 3, english: "我不去。", mandarin: { hanzi: "我不去", pinyin: "Wǒ bú qù", words: [], breakdown: "«Не пойду» — противоречит сюжету." } },
    { id: 4, english: "一起怎么样我。", mandarin: { hanzi: "一起怎么样我", pinyin: "Yìqǐ zěnmeyàng wǒ", words: [], breakdown: "Неправильный порядок слов." } },
  ], correctOptionId: 1 },
  { id: 16114, type: "listening_mc", mandarin: { hanzi: "太高兴了", pinyin: "Tài gāoxìng le", words: [{ hanzi: "太", pinyin: "tài", english: "слишком/очень" }, { hanzi: "高兴", pinyin: "gāoxìng", english: "рад" }], breakdown: "«Очень рад!» Эмоциональная форма 太...了." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Очень рад! — 太高兴了" },
    { id: 2, english: "Не рад — 不高兴" },
    { id: 3, english: "Рад — 很高兴" },
    { id: 4, english: "Самый рад — 最高兴" },
  ], correctOptionId: 1 },
  { id: 16115, type: "listening_mc", mandarin: { hanzi: "在宿舍里看看电视", pinyin: "Zài sùshè li kànkan diànshì", words: [{ hanzi: "在", pinyin: "zài", english: "в (месте)" }, { hanzi: "看看", pinyin: "kànkan", english: "посмотреть" }, { hanzi: "电视", pinyin: "diànshì", english: "ТВ" }], breakdown: "«В общежитии смотрю ТВ». Место перед глаголом." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "В общежитии смотрю ТВ — 在宿舍里看看电视" },
    { id: 2, english: "Смотрю ТВ в общежитии — 看电视在宿舍" },
    { id: 3, english: "В ТВ смотрю общежитие — 在电视看宿舍" },
    { id: 4, english: "Нет ТВ — 没有电视" },
  ], correctOptionId: 1 },
  { id: 16116, type: "grammar", rule: {
    title: "Удвоение глаголов: V-V — мягкая форма",
    explanation: "Глаголы удваиваются для смягчения — делают действие неформальным, лёгким.\n\n• Односложные: V+V или V+一+V\n  看看 = посмотри (немного)\n  试一试 = попробуй\n\n• Двусложные: AB+AB\n  学习学习 = немного позаниматься\n  休息休息 = немного отдохнуть\n\nОттенок: «чуть-чуть, по-быстрому».",
    examples: [
      { hanzi: "周末可以好好儿玩儿玩儿。", pinyin: "Zhōumò kěyǐ hǎohāor wánr wánr.", english: "На выходных можно отдохнуть." },
      { hanzi: "在宿舍里看看电视。", pinyin: "Zài sùshè li kànkan diànshì.", english: "В общежитии смотрю ТВ." },
    ],
  }, practice: [
    { question: "Как смягчить «看书»?", options: [
      { id: 1, text: "看看书" },
      { id: 2, text: "书看看" },
      { id: 3, text: "看了书" },
      { id: 4, text: "看的书" },
    ], correctOptionId: 1 },
    { question: "Как удваивается двусложный 学习?", options: [
      { id: 1, text: "学学习" },
      { id: 2, text: "学习习" },
      { id: 3, text: "学习学习" },
      { id: 4, text: "学学习习" },
    ], correctOptionId: 3 },
  ] },
  { id: 16117, type: "grammar", rule: {
    title: "Место действия: 在 + место + глагол",
    explanation: "«Делаю X в месте Y» — в китайском «в месте» ВСЕГДА перед глаголом.\n\nСхема: Подл. + 在 + Место + Глагол + (Объект)\n\n大卫在北京大学学习汉语。\n«Давэй в Пекине учит китайский.»\n\n❗ В КОНЕЦ ставить нельзя — это изменит смысл.",
    examples: [
      { hanzi: "在图书馆看书。", pinyin: "Zài túshūguǎn kàn shū.", english: "В библиотеке читаю." },
      { hanzi: "他在家吃饭。", pinyin: "Tā zài jiā chī fàn.", english: "Он дома ест." },
    ],
  }, practice: [
    { question: "Как сказать «Я в кафе пью кофе»?", options: [
      { id: 1, text: "我喝咖啡在咖啡店" },
      { id: 2, text: "我在咖啡店喝咖啡" },
      { id: 3, text: "我咖啡在咖啡店喝" },
      { id: 4, text: "咖啡店我喝咖啡在" },
    ], correctOptionId: 2 },
    { question: "Где ставится 在+место?", options: [
      { id: 1, text: "В конце предложения" },
      { id: 2, text: "Перед глаголом (после подл.)" },
      { id: 3, text: "После объекта" },
      { id: 4, text: "Всегда в начале" },
    ], correctOptionId: 2 },
  ] },
  { id: 16118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "周末", leftPinyin: "zhōumò", right: "выходные" },
    { id: 2, left: "觉得", leftPinyin: "juéde", right: "считать" },
    { id: 3, left: "没意思", leftPinyin: "méi yìsi", right: "скучно" },
    { id: 4, left: "睡懒觉", leftPinyin: "shuì lǎnjiào", right: "выспаться" },
    { id: 5, left: "电视", leftPinyin: "diànshì", right: "ТВ" },
    { id: 6, left: "洗", leftPinyin: "xǐ", right: "мыть" },
    { id: 7, left: "逛", leftPinyin: "guàng", right: "гулять" },
    { id: 8, left: "跳舞", leftPinyin: "tiào wǔ", right: "танцевать" },
  ] },
  { id: 16119, type: "single_response", mandarin: { hanzi: "明天又是周末，太高兴了！", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le!" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Завтра опять выходные — как я рад!", mandarin: { hanzi: "明天又是周末，太高兴了", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le", words: [
      { hanzi: "又", pinyin: "yòu", english: "снова" },
      { hanzi: "周末", pinyin: "zhōumò", english: "выходные" },
      { hanzi: "太...了", pinyin: "tài...le", english: "очень/слишком" },
    ], breakdown: "又 = снова + эмоциональное 太...了." } },
  ] },
  { id: 16120, type: "single_response", mandarin: { hanzi: "我去图书馆学习学习。", pinyin: "Wǒ qù túshūguǎn xuéxí xuéxí." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Схожу в библиотеку позаниматься.", mandarin: { hanzi: "我去图书馆学习学习", pinyin: "Wǒ qù túshūguǎn xuéxí xuéxí", words: [
      { hanzi: "去", pinyin: "qù", english: "идти" },
      { hanzi: "学习学习", pinyin: "xuéxí xuéxí", english: "позаниматься" },
    ], breakdown: "Удвоенный глагол = лёгкое «немного позаниматься»." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 17 — 做客（一）(visiting, 会, 就是)
// ═══════════════════════════════════════════════════════════════════
const ch17 = [
  { id: 17101, type: "flashcard", mandarin: { hanzi: "请进", pinyin: "Qǐng jìn" }, instruction: "Что значит это выражение?", options: [
    { id: 1, english: "до свидания", hanzi: "再见", pinyin: "zàijiàn" },
    { id: 2, english: "проходите", hanzi: "请进", pinyin: "qǐng jìn" },
    { id: 3, english: "спасибо", hanzi: "谢谢", pinyin: "xièxie" },
    { id: 4, english: "пожалуйста", hanzi: "请", pinyin: "qǐng" },
  ], correctOptionId: 2 },
  { id: 17102, type: "flashcard", mandarin: { hanzi: "客气", pinyin: "Kèqi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "сердитый", hanzi: "生气", pinyin: "shēngqì" },
    { id: 2, english: "вежливый, церемониться", hanzi: "客气", pinyin: "kèqi" },
    { id: 3, english: "занятый", hanzi: "忙", pinyin: "máng" },
    { id: 4, english: "весёлый", hanzi: "高兴", pinyin: "gāoxìng" },
  ], correctOptionId: 2 },
  { id: 17103, type: "flashcard", mandarin: { hanzi: "会", pinyin: "Huì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "уметь", hanzi: "会", pinyin: "huì" },
    { id: 2, english: "быть", hanzi: "是", pinyin: "shì" },
    { id: 3, english: "иметь", hanzi: "有", pinyin: "yǒu" },
    { id: 4, english: "хотеть", hanzi: "要", pinyin: "yào" },
  ], correctOptionId: 1 },
  { id: 17104, type: "flashcard", mandarin: { hanzi: "茶", pinyin: "Chá" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "кофе", hanzi: "咖啡", pinyin: "kāfēi" },
    { id: 2, english: "сок", hanzi: "果汁", pinyin: "guǒzhī" },
    { id: 3, english: "вода", hanzi: "水", pinyin: "shuǐ" },
    { id: 4, english: "чай", hanzi: "茶", pinyin: "chá" },
  ], correctOptionId: 4 },
  { id: 17105, type: "flashcard", mandarin: { hanzi: "随便", pinyin: "Suíbiàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "обязательно", hanzi: "一定", pinyin: "yídìng" },
    { id: 2, english: "как угодно", hanzi: "随便", pinyin: "suíbiàn" },
    { id: 3, english: "только", hanzi: "只", pinyin: "zhǐ" },
    { id: 4, english: "всегда", hanzi: "总是", pinyin: "zǒngshì" },
  ], correctOptionId: 2 },
  { id: 17106, type: "flashcard", mandarin: { hanzi: "干净", pinyin: "Gānjìng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "грязный", hanzi: "脏", pinyin: "zāng" },
    { id: 2, english: "чистый", hanzi: "干净", pinyin: "gānjìng" },
    { id: 3, english: "красивый", hanzi: "漂亮", pinyin: "piàoliang" },
    { id: 4, english: "большой", hanzi: "大", pinyin: "dà" },
  ], correctOptionId: 2 },
  { id: 17107, type: "fill_blank", sentence: "我___包饺子。", sentencePinyin: "Wǒ ___ bāo jiǎozi.", blankedWord: "会", correctAnswer: "会", hint: "«уметь»", instruction: "Вставь пропущенное слово: «Я умею лепить пельмени.»", options: [
    { id: 1, hanzi: "会", pinyin: "huì" },
    { id: 2, hanzi: "是", pinyin: "shì" },
    { id: 3, hanzi: "有", pinyin: "yǒu" },
    { id: 4, hanzi: "要", pinyin: "yào" },
  ] },
  { id: 17108, type: "fill_blank", sentence: "茶___果汁?", sentencePinyin: "Chá ___ guǒzhī?", blankedWord: "还是", correctAnswer: "还是", hint: "«или» в вопросе", instruction: "Вставь пропущенное слово: «Чай или сок?»", options: [
    { id: 1, hanzi: "和", pinyin: "hé" },
    { id: 2, hanzi: "或者", pinyin: "huòzhě" },
    { id: 3, hanzi: "还是", pinyin: "háishi" },
    { id: 4, hanzi: "也", pinyin: "yě" },
  ] },
  { id: 17109, type: "fill_blank", sentence: "我最喜欢吃的___是饺子。", sentencePinyin: "Wǒ zuì xǐhuan chī de ___ shì jiǎozi.", blankedWord: "就", correctAnswer: "就", hint: "эмфатическое «именно, как раз»", instruction: "Вставь пропущенное слово: «Что я больше всего люблю — это именно пельмени.»", options: [
    { id: 1, hanzi: "就", pinyin: "jiù" },
    { id: 2, hanzi: "都", pinyin: "dōu" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 17110, type: "fill_blank", sentence: "您的家___干净啊!", sentencePinyin: "Nín de jiā ___ gānjìng a!", blankedWord: "真", correctAnswer: "真", hint: "«действительно, правда»", instruction: "Вставь пропущенное слово: «У вас дома правда чисто!»", options: [
    { id: 1, hanzi: "真", pinyin: "zhēn" },
    { id: 2, hanzi: "很", pinyin: "hěn" },
    { id: 3, hanzi: "最", pinyin: "zuì" },
    { id: 4, hanzi: "比较", pinyin: "bǐjiào" },
  ] },
  { id: 17111, type: "multiple_choice", mandarin: { hanzi: "这是给您的礼物。", pinyin: "Zhè shì gěi nín de lǐwù." }, instruction: "Даришь подарок учителю. Как вежливо сказать при вручении?", options: [
    { id: 1, english: "一点儿心意，请收下。", mandarin: { hanzi: "一点儿心意，请收下", pinyin: "Yìdiǎnr xīnyì, qǐng shōuxià", words: [{ hanzi: "心意", pinyin: "xīnyì", english: "знак внимания" }, { hanzi: "收下", pinyin: "shōuxià", english: "принять" }], breakdown: "Стандартная формула вручения." } },
    { id: 2, english: "这个礼物贵吗？", mandarin: { hanzi: "这个礼物贵吗", pinyin: "Zhège lǐwù guì ma", words: [], breakdown: "«Это дорого?» — невежливо при подарке." } },
    { id: 3, english: "给我钱。", mandarin: { hanzi: "给我钱", pinyin: "Gěi wǒ qián", words: [], breakdown: "«Дай мне денег» — грубо и не по теме." } },
    { id: 4, english: "我没有礼物。", mandarin: { hanzi: "我没有礼物", pinyin: "Wǒ méiyǒu lǐwù", words: [], breakdown: "«У меня нет подарка» — противоречит." } },
  ], correctOptionId: 1 },
  { id: 17112, type: "multiple_choice", mandarin: { hanzi: "你们喝什么？茶还是果汁？", pinyin: "Nǐmen hē shénme? Chá háishi guǒzhī?" }, instruction: "«Что будете — чай или сок?» Не хочешь выбирать, вежливо. Как?", options: [
    { id: 1, english: "随便，什么都行。", mandarin: { hanzi: "随便，什么都行", pinyin: "Suíbiàn, shénme dōu xíng", words: [{ hanzi: "随便", pinyin: "suíbiàn", english: "как угодно" }, { hanzi: "行", pinyin: "xíng", english: "подходит" }], breakdown: "Вежливый ответ — «как угодно»." } },
    { id: 2, english: "都不要。", mandarin: { hanzi: "都不要", pinyin: "Dōu bú yào", words: [], breakdown: "«Ничего не хочу» — невежливо." } },
    { id: 3, english: "茶不是果汁。", mandarin: { hanzi: "茶不是果汁", pinyin: "Chá bú shì guǒzhī", words: [], breakdown: "«Чай — не сок» — не отвечает." } },
    { id: 4, english: "请给我钱。", mandarin: { hanzi: "请给我钱", pinyin: "Qǐng gěi wǒ qián", words: [], breakdown: "«Дайте денег» — не в контексте." } },
  ], correctOptionId: 1 },
  { id: 17113, type: "multiple_choice", mandarin: { hanzi: "你们会包饺子吗？", pinyin: "Nǐmen huì bāo jiǎozi ma?" }, instruction: "«Умеете лепить пельмени?» Не очень, но попробуете. Как?", options: [
    { id: 1, english: "不太会，我们试试吧!", mandarin: { hanzi: "不太会，我们试试吧", pinyin: "Bú tài huì, wǒmen shìshi ba", words: [{ hanzi: "不太", pinyin: "bú tài", english: "не очень" }, { hanzi: "试试", pinyin: "shìshi", english: "попробуем" }], breakdown: "Удвоенный глагол 试试 = «давайте попробуем»." } },
    { id: 2, english: "当然不会。", mandarin: { hanzi: "当然不会", pinyin: "Dāngrán bú huì", words: [], breakdown: "«Конечно не умею» — слишком категорично." } },
    { id: 3, english: "饺子不会。", mandarin: { hanzi: "饺子不会", pinyin: "Jiǎozi bú huì", words: [], breakdown: "«Пельмени не умеют» — бессмыслица." } },
    { id: 4, english: "包饺子是会吗？", mandarin: { hanzi: "包饺子是会吗", pinyin: "Bāo jiǎozi shì huì ma", words: [], breakdown: "Неестественный перепрос." } },
  ], correctOptionId: 1 },
  { id: 17114, type: "listening_mc", mandarin: { hanzi: "您的家真干净啊", pinyin: "Nín de jiā zhēn gānjìng a", words: [{ hanzi: "真", pinyin: "zhēn", english: "правда" }, { hanzi: "干净", pinyin: "gānjìng", english: "чистый" }], breakdown: "Комплимент хозяину." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "У вас дома правда чисто — 您的家真干净啊" },
    { id: 2, english: "Ваш дом большой — 您的家真大" },
    { id: 3, english: "Ваша семья большая — 您家真大" },
    { id: 4, english: "Дома никого нет — 家里没有人" },
  ], correctOptionId: 1 },
  { id: 17115, type: "listening_mc", mandarin: { hanzi: "请收下", pinyin: "Qǐng shōuxià", words: [{ hanzi: "请", pinyin: "qǐng", english: "пожалуйста" }, { hanzi: "收下", pinyin: "shōuxià", english: "принять" }], breakdown: "Вежливо при вручении подарка." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Примите, пожалуйста — 请收下" },
    { id: 2, english: "Проходите — 请进" },
    { id: 3, english: "Садитесь — 请坐" },
    { id: 4, english: "Пейте — 请喝" },
  ], correctOptionId: 1 },
  { id: 17116, type: "grammar", rule: {
    title: "Глагол 会 — «уметь»",
    explanation: "会 (huì) = «уметь», но только про НАВЫКИ (языки, готовка, вождение).\n\nСхема: Подл. + 会 + Глагол\n\n我会包饺子。— Умею лепить пельмени.\n我会说英语。— Умею говорить по-английски.\n\nОтрицание: 不会.\n他不会说英语。— Он не умеет.",
    examples: [
      { hanzi: "你会包吗？", pinyin: "Nǐ huì bāo ma?", english: "Умеешь лепить?" },
      { hanzi: "我会骑自行车。", pinyin: "Wǒ huì qí zìxíngchē.", english: "Я умею на велосипеде." },
    ],
  }, practice: [
    { question: "Как сказать «Я не умею готовить»?", options: [
      { id: 1, text: "我不是做饭" },
      { id: 2, text: "我不会做饭" },
      { id: 3, text: "我没有做饭" },
      { id: 4, text: "我不做饭会" },
    ], correctOptionId: 2 },
    { question: "Для каких умений подходит 会?", options: [
      { id: 1, text: "Для всего (дышать, есть)" },
      { id: 2, text: "Только для навыков по обучению" },
      { id: 3, text: "Только для языков" },
      { id: 4, text: "Только для спорта" },
    ], correctOptionId: 2 },
  ] },
  { id: 17117, type: "grammar", rule: {
    title: "就是 — «именно, как раз»",
    explanation: "就是 (jiùshì) усиливает: «именно это, как раз это».\n\nСхема: Подл. + 就是 + Объект\n\n我最喜欢吃的就是饺子。\n«Больше всего люблю — именно пельмени.»\n\n他就是刘老师。— Это и есть учитель Лю.\n这儿就是图书馆。— Это как раз библиотека.",
    examples: [
      { hanzi: "这儿就是图书馆。", pinyin: "Zhèr jiùshì túshūguǎn.", english: "Это как раз библиотека." },
      { hanzi: "北京大学的东边就是清华大学。", pinyin: "Běijīng Dàxué de dōngbian jiùshì Qīnghuá Dàxué.", english: "К востоку от Бэйда — Цинхуа." },
    ],
  }, practice: [
    { question: "Как выделить «Это именно мой друг»?", options: [
      { id: 1, text: "他就是我的朋友" },
      { id: 2, text: "他是就我的朋友" },
      { id: 3, text: "他就我的朋友" },
      { id: 4, text: "我的朋友就他是" },
    ], correctOptionId: 1 },
    { question: "Что значит 就是?", options: [
      { id: 1, text: "«Быстро»" },
      { id: 2, text: "«Тогда»" },
      { id: 3, text: "«Именно, как раз»" },
      { id: 4, text: "«Уже»" },
    ], correctOptionId: 3 },
  ] },
  { id: 17118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "请进", leftPinyin: "qǐng jìn", right: "проходите" },
    { id: 2, left: "客气", leftPinyin: "kèqi", right: "церемониться" },
    { id: 3, left: "会", leftPinyin: "huì", right: "уметь" },
    { id: 4, left: "茶", leftPinyin: "chá", right: "чай" },
    { id: 5, left: "果汁", leftPinyin: "guǒzhī", right: "сок" },
    { id: 6, left: "随便", leftPinyin: "suíbiàn", right: "как угодно" },
    { id: 7, left: "干净", leftPinyin: "gānjìng", right: "чистый" },
    { id: 8, left: "饺子", leftPinyin: "jiǎozi", right: "пельмени" },
  ] },
  { id: 17119, type: "single_response", mandarin: { hanzi: "请进，请进！", pinyin: "Qǐng jìn, qǐng jìn!" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Заходите, заходите!", mandarin: { hanzi: "请进，请进", pinyin: "Qǐng jìn, qǐng jìn", words: [
      { hanzi: "请", pinyin: "qǐng", english: "пожалуйста" },
      { hanzi: "进", pinyin: "jìn", english: "входить" },
    ], breakdown: "Повторение для радушия." } },
  ] },
  { id: 17120, type: "single_response", mandarin: { hanzi: "一点儿心意，请收下。", pinyin: "Yìdiǎnr xīnyì, qǐng shōuxià." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Небольшой знак внимания — примите, пожалуйста.", mandarin: { hanzi: "一点儿心意，请收下", pinyin: "Yìdiǎnr xīnyì, qǐng shōuxià", words: [
      { hanzi: "心意", pinyin: "xīnyì", english: "знак внимания" },
      { hanzi: "收下", pinyin: "shōuxià", english: "принять" },
    ], breakdown: "Скромная формула при вручении подарка." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 18 — 做客（二）(visiting part 2, 得, 如果, 不是...吗)
// ═══════════════════════════════════════════════════════════════════
const ch18 = [
  { id: 18101, type: "flashcard", mandarin: { hanzi: "好吃", pinyin: "Hǎochī" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "вкусный", hanzi: "好吃", pinyin: "hǎochī" },
    { id: 2, english: "сладкий", hanzi: "甜", pinyin: "tián" },
    { id: 3, english: "острый", hanzi: "辣", pinyin: "là" },
    { id: 4, english: "голодный", hanzi: "饿", pinyin: "è" },
  ], correctOptionId: 1 },
  { id: 18102, type: "flashcard", mandarin: { hanzi: "北方", pinyin: "Běifāng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "юг", hanzi: "南方", pinyin: "nánfāng" },
    { id: 2, english: "север", hanzi: "北方", pinyin: "běifāng" },
    { id: 3, english: "восток", hanzi: "东方", pinyin: "dōngfāng" },
    { id: 4, english: "запад", hanzi: "西方", pinyin: "xīfāng" },
  ], correctOptionId: 2 },
  { id: 18103, type: "flashcard", mandarin: { hanzi: "米饭", pinyin: "Mǐfàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "лапша", hanzi: "面条", pinyin: "miàntiáo" },
    { id: 2, english: "пельмени", hanzi: "饺子", pinyin: "jiǎozi" },
    { id: 3, english: "варёный рис", hanzi: "米饭", pinyin: "mǐfàn" },
    { id: 4, english: "хлеб", hanzi: "面包", pinyin: "miànbāo" },
  ], correctOptionId: 3 },
  { id: 18104, type: "flashcard", mandarin: { hanzi: "重要", pinyin: "Zhòngyào" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "тяжёлый", hanzi: "重", pinyin: "zhòng" },
    { id: 2, english: "важный", hanzi: "重要", pinyin: "zhòngyào" },
    { id: 3, english: "лёгкий", hanzi: "容易", pinyin: "róngyì" },
    { id: 4, english: "главный", hanzi: "主要", pinyin: "zhǔyào" },
  ], correctOptionId: 2 },
  { id: 18105, type: "flashcard", mandarin: { hanzi: "麻烦", pinyin: "Máfan" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "легко", hanzi: "容易", pinyin: "róngyì" },
    { id: 2, english: "хлопотный", hanzi: "麻烦", pinyin: "máfan" },
    { id: 3, english: "интересный", hanzi: "有意思", pinyin: "yǒu yìsi" },
    { id: 4, english: "странный", hanzi: "奇怪", pinyin: "qíguài" },
  ], correctOptionId: 2 },
  { id: 18106, type: "flashcard", mandarin: { hanzi: "超市", pinyin: "Chāoshì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "магазин", hanzi: "商店", pinyin: "shāngdiàn" },
    { id: 2, english: "супермаркет", hanzi: "超市", pinyin: "chāoshì" },
    { id: 3, english: "ТЦ", hanzi: "购物中心", pinyin: "gòuwù zhōngxīn" },
    { id: 4, english: "рынок", hanzi: "市场", pinyin: "shìchǎng" },
  ], correctOptionId: 2 },
  { id: 18107, type: "fill_blank", sentence: "做馅儿就___花很多时间。", sentencePinyin: "Zuò xiànr jiù ___ huā hěn duō shíjiān.", blankedWord: "得", correctAnswer: "得", hint: "«должен, надо» (děi)", instruction: "Вставь пропущенное слово: «Делать начинку — нужно много времени.»", options: [
    { id: 1, hanzi: "得", pinyin: "děi" },
    { id: 2, hanzi: "是", pinyin: "shì" },
    { id: 3, hanzi: "会", pinyin: "huì" },
    { id: 4, hanzi: "要", pinyin: "yào" },
  ] },
  { id: 18108, type: "fill_blank", sentence: "___想吃的话，就去买一袋。", sentencePinyin: "___ xiǎng chī dehuà, jiù qù mǎi yí dài.", blankedWord: "如果", correctAnswer: "如果", hint: "«если» (начало условия)", instruction: "Вставь пропущенное слово: «Если хочешь есть — купи пакетик.»", options: [
    { id: 1, hanzi: "如果", pinyin: "rúguǒ" },
    { id: 2, hanzi: "因为", pinyin: "yīnwèi" },
    { id: 3, hanzi: "所以", pinyin: "suǒyǐ" },
    { id: 4, hanzi: "不过", pinyin: "búguò" },
  ] },
  { id: 18109, type: "fill_blank", sentence: "超市___有速冻饺子吗?", sentencePinyin: "Chāoshì ___ yǒu sùdòng jiǎozi ma?", blankedWord: "不是", correctAnswer: "不是", hint: "«разве не...?» (риторический 不是...吗)", instruction: "Вставь пропущенное слово: «Разве в супермаркете нет замороженных пельменей?»", options: [
    { id: 1, hanzi: "是", pinyin: "shì" },
    { id: 2, hanzi: "不", pinyin: "bù" },
    { id: 3, hanzi: "不是", pinyin: "bú shì" },
    { id: 4, hanzi: "没", pinyin: "méi" },
  ] },
  { id: 18110, type: "fill_blank", sentence: "过生日啦，过节___，来客人___，一般都包饺子。", sentencePinyin: "Guò shēngrì la, guò jié ___, lái kèren ___, yìbān dōu bāo jiǎozi.", blankedWord: "啦", correctAnswer: "啦", hint: "частица перечисления «и то, и это»", instruction: "Вставь пропущенное слово: «На дни рождения, праздники, при гостях — обычно пельмени.»", options: [
    { id: 1, hanzi: "啦", pinyin: "la" },
    { id: 2, hanzi: "吗", pinyin: "ma" },
    { id: 3, hanzi: "呢", pinyin: "ne" },
    { id: 4, hanzi: "吧", pinyin: "ba" },
  ] },
  { id: 18111, type: "multiple_choice", mandarin: { hanzi: "对北方人来说，饺子重要吗？", pinyin: "Duì běifāng rén lái shuō, jiǎozi zhòngyào ma?" }, instruction: "«Для северян пельмени важны?» Очень, это национальная еда. Как?", options: [
    { id: 1, english: "是啊，饺子是很重要的一种食品。", mandarin: { hanzi: "是啊，饺子是很重要的一种食品", pinyin: "Shì a, jiǎozi shì hěn zhòngyào de yì zhǒng shípǐn", words: [{ hanzi: "重要", pinyin: "zhòngyào", english: "важный" }, { hanzi: "种", pinyin: "zhǒng", english: "(сч.сл. вид)" }, { hanzi: "食品", pinyin: "shípǐn", english: "еда" }], breakdown: "«Это важный вид еды.»" } },
    { id: 2, english: "饺子不是食品。", mandarin: { hanzi: "饺子不是食品", pinyin: "Jiǎozi bú shì shípǐn", words: [], breakdown: "«Пельмени — не еда» — бессмысленно." } },
    { id: 3, english: "北方人没有饺子。", mandarin: { hanzi: "北方人没有饺子", pinyin: "Běifāng rén méiyǒu jiǎozi", words: [], breakdown: "Неверно фактически." } },
    { id: 4, english: "我不知道。", mandarin: { hanzi: "我不知道", pinyin: "Wǒ bù zhīdào", words: [], breakdown: "«Не знаю» — не утверждение важности." } },
  ], correctOptionId: 1 },
  { id: 18112, type: "multiple_choice", mandarin: { hanzi: "包饺子麻烦吗？", pinyin: "Bāo jiǎozi máfan ma?" }, instruction: "«Лепить пельмени хлопотно?» Да, особенно когда мало людей. Как?", options: [
    { id: 1, english: "比较麻烦，特别是人少的时候。", mandarin: { hanzi: "比较麻烦，特别是人少的时候", pinyin: "Bǐjiào máfan, tèbié shì rén shǎo de shíhou", words: [{ hanzi: "特别", pinyin: "tèbié", english: "особенно" }, { hanzi: "少", pinyin: "shǎo", english: "мало" }], breakdown: "Стандартный оттенок «да, когда X»." } },
    { id: 2, english: "一点儿也不麻烦。", mandarin: { hanzi: "一点儿也不麻烦", pinyin: "Yìdiǎnr yě bù máfan", words: [], breakdown: "«Совсем не хлопотно» — противоположно." } },
    { id: 3, english: "饺子麻烦不饺子。", mandarin: { hanzi: "饺子麻烦不饺子", pinyin: "Jiǎozi máfan bù jiǎozi", words: [], breakdown: "Бессмыслица." } },
    { id: 4, english: "我不喜欢饺子。", mandarin: { hanzi: "我不喜欢饺子", pinyin: "Wǒ bù xǐhuan jiǎozi", words: [], breakdown: "Не отвечает на вопрос." } },
  ], correctOptionId: 1 },
  { id: 18113, type: "multiple_choice", mandarin: { hanzi: "大家一起包，怎么样？", pinyin: "Dàjiā yìqǐ bāo, zěnmeyàng?" }, instruction: "«Давайте вместе лепить?» Согласен — весело и интересно. Как?", options: [
    { id: 1, english: "大家一起包饺子，热闹，也挺有意思的。", mandarin: { hanzi: "大家一起包饺子，热闹，也挺有意思的", pinyin: "Dàjiā yìqǐ bāo jiǎozi, rènao, yě tǐng yǒu yìsi de", words: [{ hanzi: "热闹", pinyin: "rènao", english: "весело" }, { hanzi: "有意思", pinyin: "yǒu yìsi", english: "интересно" }], breakdown: "Позитивная реакция + обоснование." } },
    { id: 2, english: "大家不一起。", mandarin: { hanzi: "大家不一起", pinyin: "Dàjiā bù yìqǐ", words: [], breakdown: "«Все не вместе» — несогласие." } },
    { id: 3, english: "饺子没有。", mandarin: { hanzi: "饺子没有", pinyin: "Jiǎozi méiyǒu", words: [], breakdown: "Не по теме." } },
    { id: 4, english: "我一个人包。", mandarin: { hanzi: "我一个人包", pinyin: "Wǒ yí ge rén bāo", words: [], breakdown: "«Один буду лепить» — противоположно." } },
  ], correctOptionId: 1 },
  { id: 18114, type: "listening_mc", mandarin: { hanzi: "超市不是有速冻饺子吗", pinyin: "Chāoshì bú shì yǒu sùdòng jiǎozi ma", words: [{ hanzi: "超市", pinyin: "chāoshì", english: "супермаркет" }, { hanzi: "速冻", pinyin: "sùdòng", english: "замороженный" }], breakdown: "Риторическое «ведь есть же в супермаркете!»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Разве в супермаркете нет замороженных? — 超市不是有速冻饺子吗" },
    { id: 2, english: "В супермаркете нет — 超市没有" },
    { id: 3, english: "Это супермаркет — 这是超市" },
    { id: 4, english: "Я иду в супермаркет — 我去超市" },
  ], correctOptionId: 1 },
  { id: 18115, type: "listening_mc", mandarin: { hanzi: "如果想吃的话，就去买一袋", pinyin: "Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài", words: [{ hanzi: "如果", pinyin: "rúguǒ", english: "если" }, { hanzi: "袋", pinyin: "dài", english: "пакет" }], breakdown: "Условный оборот 如果...(的话)就..." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Если хочешь — купи пакетик — 如果想吃的话，就去买一袋" },
    { id: 2, english: "Хочу купить пакет — 我想买一袋" },
    { id: 3, english: "Если есть время — 如果有时间" },
    { id: 4, english: "Нет в пакете — 袋子里没有" },
  ], correctOptionId: 1 },
  { id: 18116, type: "grammar", rule: {
    title: "如果...(的话)，就... — «если..., то...»",
    explanation: "Условный оборот:\n\nСхема: 如果 + Условие + (的话)，就 + Результат\n\n如果想吃的话，就去买一袋。\n«Если хочешь есть — купи пакетик.»\n\n• 如果 (rúguǒ) — «если»\n• 的话 (dehuà) — опционально\n• 就 (jiù) — «то, тогда»",
    examples: [
      { hanzi: "如果下课早，我们就去商店。", pinyin: "Rúguǒ xià kè zǎo, wǒmen jiù qù shāngdiàn.", english: "Если рано закончим — пойдём в магазин." },
      { hanzi: "如果没有安排，我就去。", pinyin: "Rúguǒ méiyǒu ānpái, wǒ jiù qù.", english: "Если нет планов — схожу." },
    ],
  }, practice: [
    { question: "Как сказать «Если будет время — пойду в кино»?", options: [
      { id: 1, text: "如果有时间，就去看电影" },
      { id: 2, text: "有时间如果，看电影去" },
      { id: 3, text: "我去看电影如果时间" },
      { id: 4, text: "看电影如果有时间我去" },
    ], correctOptionId: 1 },
    { question: "Какое слово стоит перед результатом?", options: [
      { id: 1, text: "也" },
      { id: 2, text: "就" },
      { id: 3, text: "还" },
      { id: 4, text: "都" },
    ], correctOptionId: 2 },
  ] },
  { id: 18117, type: "grammar", rule: {
    title: "得 (děi) — «должен, надо»",
    explanation: "得 = «должен, нужно». Читается DĚI (не dé).\n\nСхема: Подл. + 得 + Глагол\n\n做馅儿就得花很多时间。\n«Делать начинку — нужно много времени.»\n\n❗ Отрицание: 不用 (не нужно), НЕ 不得!\n我得去学校。— Надо в школу.\n我不用去学校。— Не надо в школу.",
    examples: [
      { hanzi: "我得七点起床。", pinyin: "Wǒ děi qī diǎn qǐ chuáng.", english: "Мне надо встать в 7." },
      { hanzi: "他得学习。", pinyin: "Tā děi xuéxí.", english: "Ему надо учиться." },
    ],
  }, practice: [
    { question: "Как читается 得 в значении «должен»?", options: [
      { id: 1, text: "dé" },
      { id: 2, text: "de" },
      { id: 3, text: "děi" },
      { id: 4, text: "dà" },
    ], correctOptionId: 3 },
    { question: "Как правильно отрицать 得?", options: [
      { id: 1, text: "不得" },
      { id: 2, text: "没得" },
      { id: 3, text: "不用" },
      { id: 4, text: "不要得" },
    ], correctOptionId: 3 },
  ] },
  { id: 18118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "好吃", leftPinyin: "hǎochī", right: "вкусный" },
    { id: 2, left: "北方", leftPinyin: "běifāng", right: "север" },
    { id: 3, left: "南方", leftPinyin: "nánfāng", right: "юг" },
    { id: 4, left: "米饭", leftPinyin: "mǐfàn", right: "рис" },
    { id: 5, left: "重要", leftPinyin: "zhòngyào", right: "важный" },
    { id: 6, left: "麻烦", leftPinyin: "máfan", right: "хлопотный" },
    { id: 7, left: "超市", leftPinyin: "chāoshì", right: "супермаркет" },
    { id: 8, left: "如果", leftPinyin: "rúguǒ", right: "если" },
  ] },
  { id: 18119, type: "single_response", mandarin: { hanzi: "今天的饺子真好吃！", pinyin: "Jīntiān de jiǎozi zhēn hǎochī!" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Сегодня пельмени очень вкусные!", mandarin: { hanzi: "今天的饺子真好吃", pinyin: "Jīntiān de jiǎozi zhēn hǎochī", words: [
      { hanzi: "真", pinyin: "zhēn", english: "правда" },
      { hanzi: "好吃", pinyin: "hǎochī", english: "вкусный" },
    ], breakdown: "真 сильнее чем 很 — «реально/правда»." } },
  ] },
  { id: 18120, type: "single_response", mandarin: { hanzi: "如果想吃的话，就去买一袋。", pinyin: "Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Если хочешь — купи пакетик.", mandarin: { hanzi: "如果想吃的话，就去买一袋", pinyin: "Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài", words: [
      { hanzi: "如果...就", pinyin: "rúguǒ...jiù", english: "если...то" },
      { hanzi: "袋", pinyin: "dài", english: "пакет" },
    ], breakdown: "Полный условный оборот: 如果 + 的话 + 就." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 19 — 现在习惯了 (habits, 了, 就/才, age)
// ═══════════════════════════════════════════════════════════════════
const ch19 = [
  { id: 19101, type: "flashcard", mandarin: { hanzi: "习惯", pinyin: "Xíguàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "привыкать; привычка", hanzi: "习惯", pinyin: "xíguàn" },
    { id: 2, english: "изучать", hanzi: "学习", pinyin: "xuéxí" },
    { id: 3, english: "начинать", hanzi: "开始", pinyin: "kāishǐ" },
    { id: 4, english: "заканчивать", hanzi: "结束", pinyin: "jiéshù" },
  ], correctOptionId: 1 },
  { id: 19102, type: "flashcard", mandarin: { hanzi: "生活", pinyin: "Shēnghuó" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "жизнь, быт", hanzi: "生活", pinyin: "shēnghuó" },
    { id: 2, english: "работа", hanzi: "工作", pinyin: "gōngzuò" },
    { id: 3, english: "школа", hanzi: "学校", pinyin: "xuéxiào" },
    { id: 4, english: "день", hanzi: "天", pinyin: "tiān" },
  ], correctOptionId: 1 },
  { id: 19103, type: "flashcard", mandarin: { hanzi: "已经", pinyin: "Yǐjīng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "сейчас", hanzi: "现在", pinyin: "xiànzài" },
    { id: 2, english: "уже", hanzi: "已经", pinyin: "yǐjīng" },
    { id: 3, english: "только что", hanzi: "刚", pinyin: "gāng" },
    { id: 4, english: "часто", hanzi: "常常", pinyin: "chángcháng" },
  ], correctOptionId: 2 },
  { id: 19104, type: "flashcard", mandarin: { hanzi: "起床", pinyin: "Qǐ chuáng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "ложиться спать", hanzi: "睡觉", pinyin: "shuì jiào" },
    { id: 2, english: "вставать (с постели)", hanzi: "起床", pinyin: "qǐ chuáng" },
    { id: 3, english: "отдыхать", hanzi: "休息", pinyin: "xiūxi" },
    { id: 4, english: "делать", hanzi: "做", pinyin: "zuò" },
  ], correctOptionId: 2 },
  { id: 19105, type: "flashcard", mandarin: { hanzi: "才", pinyin: "Cái" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "уже (рано)", hanzi: "就", pinyin: "jiù" },
    { id: 2, english: "только (позже)", hanzi: "才", pinyin: "cái" },
    { id: 3, english: "всегда", hanzi: "总是", pinyin: "zǒngshì" },
    { id: 4, english: "никогда", hanzi: "从不", pinyin: "cóng bù" },
  ], correctOptionId: 2 },
  { id: 19106, type: "flashcard", mandarin: { hanzi: "岁", pinyin: "Suì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "год (период)", hanzi: "年", pinyin: "nián" },
    { id: 2, english: "лет (возраст)", hanzi: "岁", pinyin: "suì" },
    { id: 3, english: "день", hanzi: "天", pinyin: "tiān" },
    { id: 4, english: "месяц", hanzi: "月", pinyin: "yuè" },
  ], correctOptionId: 2 },
  { id: 19107, type: "fill_blank", sentence: "现在___习惯了。", sentencePinyin: "Xiànzài ___ xíguàn le.", blankedWord: "已经", correctAnswer: "已经", hint: "«уже»", instruction: "Вставь пропущенное слово: «Сейчас уже привык.»", options: [
    { id: 1, hanzi: "已经", pinyin: "yǐjīng" },
    { id: 2, hanzi: "刚", pinyin: "gāng" },
    { id: 3, hanzi: "常常", pinyin: "chángcháng" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 19108, type: "fill_blank", sentence: "我一般早上八点___起床。", sentencePinyin: "Wǒ yìbān zǎoshang bā diǎn ___ qǐ chuáng.", blankedWord: "才", correctAnswer: "才", hint: "«только» (позже ожидаемого)", instruction: "Вставь пропущенное слово: «Я обычно только в 8 встаю (поздно).»", options: [
    { id: 1, hanzi: "就", pinyin: "jiù" },
    { id: 2, hanzi: "才", pinyin: "cái" },
    { id: 3, hanzi: "都", pinyin: "dōu" },
    { id: 4, hanzi: "也", pinyin: "yě" },
  ] },
  { id: 19109, type: "fill_blank", sentence: "妹妹三岁___开始学跳舞。", sentencePinyin: "Mèimei sān suì ___ kāishǐ xué tiào wǔ.", blankedWord: "就", correctAnswer: "就", hint: "«уже, рано»", instruction: "Вставь пропущенное слово: «Сестра в 3 уже начала танцевать.»", options: [
    { id: 1, hanzi: "就", pinyin: "jiù" },
    { id: 2, hanzi: "才", pinyin: "cái" },
    { id: 3, hanzi: "都", pinyin: "dōu" },
    { id: 4, hanzi: "在", pinyin: "zài" },
  ] },
  { id: 19110, type: "fill_blank", sentence: "您___大年纪?", sentencePinyin: "Nín ___ dà niánjì?", blankedWord: "多", correctAnswer: "多", hint: "«насколько» (多大 = сколько лет)", instruction: "Вставь пропущенное слово: «Сколько Вам лет? (вежливо)»", options: [
    { id: 1, hanzi: "多", pinyin: "duō" },
    { id: 2, hanzi: "几", pinyin: "jǐ" },
    { id: 3, hanzi: "多少", pinyin: "duōshao" },
    { id: 4, hanzi: "什么", pinyin: "shénme" },
  ] },
  { id: 19111, type: "multiple_choice", mandarin: { hanzi: "你习惯北京的生活了吧？", pinyin: "Nǐ xíguàn Běijīng de shēnghuó le ba?" }, instruction: "«Привык к пекинской жизни?» Сначала нет, теперь привык. Как?", options: [
    { id: 1, english: "刚来的时候不习惯，现在已经习惯了。", mandarin: { hanzi: "刚来的时候不习惯，现在已经习惯了", pinyin: "Gāng lái de shíhou bù xíguàn, xiànzài yǐjīng xíguàn le", words: [{ hanzi: "刚", pinyin: "gāng", english: "только что" }, { hanzi: "已经", pinyin: "yǐjīng", english: "уже" }], breakdown: "Изменение состояния через 了." } },
    { id: 2, english: "我习惯。", mandarin: { hanzi: "我习惯", pinyin: "Wǒ xíguàn", words: [], breakdown: "Без 了 — без изменения, нейтрально." } },
    { id: 3, english: "生活北京我习惯。", mandarin: { hanzi: "生活北京我习惯", pinyin: "Shēnghuó Běijīng wǒ xíguàn", words: [], breakdown: "Неправильный порядок." } },
    { id: 4, english: "不知道。", mandarin: { hanzi: "不知道", pinyin: "Bù zhīdào", words: [], breakdown: "«Не знаю» — но ты в курсе." } },
  ], correctOptionId: 1 },
  { id: 19112, type: "multiple_choice", mandarin: { hanzi: "晚上几点睡觉？", pinyin: "Wǎnshang jǐ diǎn shuì jiào?" }, instruction: "«Во сколько ложишься?» Обычно в 12, иногда только в 2 ночи. Как?", options: [
    { id: 1, english: "一般十二点睡，有时候夜里两点钟才睡。", mandarin: { hanzi: "一般十二点睡，有时候夜里两点钟才睡", pinyin: "Yìbān shí'èr diǎn shuì, yǒu shíhou yèli liǎng diǎnzhōng cái shuì", words: [{ hanzi: "一般", pinyin: "yìbān", english: "обычно" }, { hanzi: "才", pinyin: "cái", english: "только" }], breakdown: "才 подчёркивает поздность." } },
    { id: 2, english: "我睡觉。", mandarin: { hanzi: "我睡觉", pinyin: "Wǒ shuì jiào", words: [], breakdown: "«Я сплю» — слишком общо." } },
    { id: 3, english: "两点不睡。", mandarin: { hanzi: "两点不睡", pinyin: "Liǎng diǎn bú shuì", words: [], breakdown: "«В 2 не сплю» — противоположно." } },
    { id: 4, english: "十二点就是。", mandarin: { hanzi: "十二点就是", pinyin: "Shí'èr diǎn jiùshì", words: [], breakdown: "Неестественный ответ." } },
  ], correctOptionId: 1 },
  { id: 19113, type: "multiple_choice", mandarin: { hanzi: "您多大年纪？", pinyin: "Nín duō dà niánjì?" }, instruction: "«Сколько Вам лет? (пожилому)» Примерно 60. Как вежливо?", options: [
    { id: 1, english: "大概六十岁吧。", mandarin: { hanzi: "大概六十岁吧", pinyin: "Dàgài liùshí suì ba", words: [{ hanzi: "大概", pinyin: "dàgài", english: "примерно" }, { hanzi: "吧", pinyin: "ba", english: "(смягчение)" }], breakdown: "大概 + число + 岁 + 吧 — скромно." } },
    { id: 2, english: "六十岁多少？", mandarin: { hanzi: "六十岁多少", pinyin: "Liùshí suì duōshao", words: [], breakdown: "Вопрос, а не ответ." } },
    { id: 3, english: "我不是六十岁。", mandarin: { hanzi: "我不是六十岁", pinyin: "Wǒ bú shì liùshí suì", words: [], breakdown: "«Мне не 60» — отрицание без причины." } },
    { id: 4, english: "岁大概六十我。", mandarin: { hanzi: "岁大概六十我", pinyin: "Suì dàgài liùshí wǒ", words: [], breakdown: "Порядок неправильный." } },
  ], correctOptionId: 1 },
  { id: 19114, type: "listening_mc", mandarin: { hanzi: "现在已经习惯了", pinyin: "Xiànzài yǐjīng xíguàn le", words: [{ hanzi: "已经", pinyin: "yǐjīng", english: "уже" }, { hanzi: "习惯", pinyin: "xíguàn", english: "привыкнуть" }, { hanzi: "了", pinyin: "le", english: "(изменение)" }], breakdown: "了 = «стал привычным»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Сейчас уже привык — 现在已经习惯了" },
    { id: 2, english: "Сейчас ещё не привык — 现在还没习惯" },
    { id: 3, english: "Я учусь — 我在学习" },
    { id: 4, english: "Я буду привыкать — 我会习惯" },
  ], correctOptionId: 1 },
  { id: 19115, type: "listening_mc", mandarin: { hanzi: "你来北京多长时间了", pinyin: "Nǐ lái Běijīng duō cháng shíjiān le", words: [{ hanzi: "多长时间", pinyin: "duō cháng shíjiān", english: "как долго" }], breakdown: "«Как давно ты в Пекине?»" }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Давно ты в Пекине? — 你来北京多长时间了" },
    { id: 2, english: "Ты из Пекина? — 你是北京人吗" },
    { id: 3, english: "Когда приедешь в Пекин? — 你什么时候来北京" },
    { id: 4, english: "Сколько тебе лет? — 你多大" },
  ], correctOptionId: 1 },
  { id: 19116, type: "grammar", rule: {
    title: "Частица 了 — изменение состояния",
    explanation: "了 (le) в конце = ИЗМЕНЕНИЕ или завершённость.\n\n• 我习惯了。— Я привык (раньше не был — стал).\n• 他去图书馆了。— Он ушёл.\n• 昨天下雪了。— Вчера шёл снег.\n\nОтрицание: 没 + Глагол (БЕЗ 了!).\n❌ 没去了\n✅ 没去",
    examples: [
      { hanzi: "现在已经习惯了。", pinyin: "Xiànzài yǐjīng xíguàn le.", english: "Сейчас уже привык." },
      { hanzi: "他没去图书馆。", pinyin: "Tā méi qù túshūguǎn.", english: "Он не ходил в библиотеку." },
    ],
  }, practice: [
    { question: "Как правильно отрицать «我去了»?", options: [
      { id: 1, text: "我不去了" },
      { id: 2, text: "我没去了" },
      { id: 3, text: "我没去" },
      { id: 4, text: "我不去" },
    ], correctOptionId: 3 },
    { question: "Что означает 了 в «我习惯了»?", options: [
      { id: 1, text: "Прошедшее время" },
      { id: 2, text: "Изменение состояния (стал привыкшим)" },
      { id: 3, text: "Вопрос" },
      { id: 4, text: "Множественное число" },
    ], correctOptionId: 2 },
  ] },
  { id: 19117, type: "grammar", rule: {
    title: "就 vs 才 — «рано» vs «поздно»",
    explanation: "• 就 = действие РАНО/БЫСТРО:\n  他六点就起床了 — он в 6 УЖЕ встал.\n\n• 才 = действие ПОЗДНО:\n  他八点才起床 — он только в 8 встал (поздно).\n\nОдно и то же время можно подать и как «рано» (就), и как «поздно» (才).",
    examples: [
      { hanzi: "妹妹三岁就开始跳舞。", pinyin: "Mèimei sān suì jiù kāishǐ tiào wǔ.", english: "Сестра в 3 уже начала." },
      { hanzi: "我八点才起床。", pinyin: "Wǒ bā diǎn cái qǐ chuáng.", english: "Я только в 8 встаю." },
    ],
  }, practice: [
    { question: "«Он в 5 уже ушёл» (рано)?", options: [
      { id: 1, text: "他五点就走了" },
      { id: 2, text: "他五点才走了" },
      { id: 3, text: "他走了五点" },
      { id: 4, text: "五点走他了" },
    ], correctOptionId: 1 },
    { question: "Что подчёркивает 才?", options: [
      { id: 1, text: "Что действие раннее" },
      { id: 2, text: "Что действие позднее ожидаемого" },
      { id: 3, text: "Что действие не происходит" },
      { id: 4, text: "Что действие повторяется" },
    ], correctOptionId: 2 },
  ] },
  { id: 19118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "习惯", leftPinyin: "xíguàn", right: "привыкать" },
    { id: 2, left: "生活", leftPinyin: "shēnghuó", right: "жизнь" },
    { id: 3, left: "已经", leftPinyin: "yǐjīng", right: "уже" },
    { id: 4, left: "刚", leftPinyin: "gāng", right: "только что" },
    { id: 5, left: "才", leftPinyin: "cái", right: "только (поздно)" },
    { id: 6, left: "岁", leftPinyin: "suì", right: "лет" },
    { id: 7, left: "起床", leftPinyin: "qǐ chuáng", right: "вставать" },
    { id: 8, left: "睡觉", leftPinyin: "shuì jiào", right: "спать" },
  ] },
  { id: 19119, type: "single_response", mandarin: { hanzi: "现在已经习惯了。", pinyin: "Xiànzài yǐjīng xíguàn le." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Сейчас уже привык.", mandarin: { hanzi: "现在已经习惯了", pinyin: "Xiànzài yǐjīng xíguàn le", words: [
      { hanzi: "现在", pinyin: "xiànzài", english: "сейчас" },
      { hanzi: "已经", pinyin: "yǐjīng", english: "уже" },
      { hanzi: "了", pinyin: "le", english: "(изменение)" },
    ], breakdown: "Изменение состояния через 了." } },
  ] },
  { id: 19120, type: "single_response", mandarin: { hanzi: "你来北京多长时间了？", pinyin: "Nǐ lái Běijīng duō cháng shíjiān le?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Давно ты в Пекине?", mandarin: { hanzi: "你来北京多长时间了", pinyin: "Nǐ lái Běijīng duō cháng shíjiān le", words: [
      { hanzi: "多长时间", pinyin: "duō cháng shíjiān", english: "как долго" },
      { hanzi: "了", pinyin: "le", english: "(уже прошло)" },
    ], breakdown: "Формула «как давно?»." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 20 — 看病人 (hospital, 死了, 别)
// ═══════════════════════════════════════════════════════════════════
const ch20 = [
  { id: 20101, type: "flashcard", mandarin: { hanzi: "医院", pinyin: "Yīyuàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "больница", hanzi: "医院", pinyin: "yīyuàn" },
    { id: 2, english: "школа", hanzi: "学校", pinyin: "xuéxiào" },
    { id: 3, english: "магазин", hanzi: "商店", pinyin: "shāngdiàn" },
    { id: 4, english: "банк", hanzi: "银行", pinyin: "yínháng" },
  ], correctOptionId: 1 },
  { id: 20102, type: "flashcard", mandarin: { hanzi: "医生", pinyin: "Yīshēng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "пациент", hanzi: "病人", pinyin: "bìngrén" },
    { id: 2, english: "врач", hanzi: "医生", pinyin: "yīshēng" },
    { id: 3, english: "медсестра", hanzi: "护士", pinyin: "hùshi" },
    { id: 4, english: "учитель", hanzi: "老师", pinyin: "lǎoshī" },
  ], correctOptionId: 2 },
  { id: 20103, type: "flashcard", mandarin: { hanzi: "累", pinyin: "Lèi" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "занятый", hanzi: "忙", pinyin: "máng" },
    { id: 2, english: "голодный", hanzi: "饿", pinyin: "è" },
    { id: 3, english: "уставший", hanzi: "累", pinyin: "lèi" },
    { id: 4, english: "грустный", hanzi: "难过", pinyin: "nánguò" },
  ], correctOptionId: 3 },
  { id: 20104, type: "flashcard", mandarin: { hanzi: "别", pinyin: "Bié" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "должен", hanzi: "得", pinyin: "děi" },
    { id: 2, english: "не надо (запрет)", hanzi: "别", pinyin: "bié" },
    { id: 3, english: "нет", hanzi: "不", pinyin: "bù" },
    { id: 4, english: "только", hanzi: "只", pinyin: "zhǐ" },
  ], correctOptionId: 2 },
  { id: 20105, type: "flashcard", mandarin: { hanzi: "身体", pinyin: "Shēntǐ" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "здоровье, тело", hanzi: "身体", pinyin: "shēntǐ" },
    { id: 2, english: "лицо", hanzi: "脸", pinyin: "liǎn" },
    { id: 3, english: "голова", hanzi: "头", pinyin: "tóu" },
    { id: 4, english: "душа", hanzi: "心", pinyin: "xīn" },
  ], correctOptionId: 1 },
  { id: 20106, type: "flashcard", mandarin: { hanzi: "药", pinyin: "Yào" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "еда", hanzi: "食物", pinyin: "shíwù" },
    { id: 2, english: "вода", hanzi: "水", pinyin: "shuǐ" },
    { id: 3, english: "лекарство", hanzi: "药", pinyin: "yào" },
    { id: 4, english: "чай", hanzi: "茶", pinyin: "chá" },
  ], correctOptionId: 3 },
  { id: 20107, type: "fill_blank", sentence: "累___了！", sentencePinyin: "Lèi ___ le!", blankedWord: "死", correctAnswer: "死", hint: "«до смерти» — крайняя степень", instruction: "Вставь пропущенное слово: «Ужасно устал!»", options: [
    { id: 1, hanzi: "死", pinyin: "sǐ" },
    { id: 2, hanzi: "太", pinyin: "tài" },
    { id: 3, hanzi: "最", pinyin: "zuì" },
    { id: 4, hanzi: "非常", pinyin: "fēicháng" },
  ] },
  { id: 20108, type: "fill_blank", sentence: "___客气！", sentencePinyin: "___ kèqi!", blankedWord: "别", correctAnswer: "别", hint: "«не...» (запрет)", instruction: "Вставь пропущенное слово: «Не стесняйся!»", options: [
    { id: 1, hanzi: "不", pinyin: "bù" },
    { id: 2, hanzi: "没", pinyin: "méi" },
    { id: 3, hanzi: "别", pinyin: "bié" },
    { id: 4, hanzi: "不要", pinyin: "bú yào" },
  ] },
  { id: 20109, type: "fill_blank", sentence: "一___人吃，一___人睡。", sentencePinyin: "Yí ___ rén chī, yí ___ rén shuì.", blankedWord: "个", correctAnswer: "个", hint: "«один человек» = один/одна (в одиночестве)", instruction: "Вставь пропущенное слово: «Одна ешь, одна спишь.»", options: [
    { id: 1, hanzi: "个", pinyin: "gè" },
    { id: 2, hanzi: "口", pinyin: "kǒu" },
    { id: 3, hanzi: "位", pinyin: "wèi" },
    { id: 4, hanzi: "条", pinyin: "tiáo" },
  ] },
  { id: 20110, type: "fill_blank", sentence: "你___病人吗?", sentencePinyin: "Nǐ ___ bìngrén ma?", blankedWord: "不是", correctAnswer: "不是", hint: "риторическое «разве не...?»", instruction: "Вставь пропущенное слово: «Ты же больная, разве нет?»", options: [
    { id: 1, hanzi: "不是", pinyin: "bú shì" },
    { id: 2, hanzi: "是", pinyin: "shì" },
    { id: 3, hanzi: "没", pinyin: "méi" },
    { id: 4, hanzi: "有", pinyin: "yǒu" },
  ] },
  { id: 20111, type: "multiple_choice", mandarin: { hanzi: "谢谢你来看我。", pinyin: "Xièxie nǐ lái kàn wǒ." }, instruction: "«Спасибо, что пришёл.» Вежливо отвечаешь «да что ты». Как?", options: [
    { id: 1, english: "别客气。", mandarin: { hanzi: "别客气", pinyin: "Bié kèqi", words: [{ hanzi: "别", pinyin: "bié", english: "не надо" }, { hanzi: "客气", pinyin: "kèqi", english: "церемониться" }], breakdown: "«Не церемонься» — универсальный ответ вежливости." } },
    { id: 2, english: "我不来。", mandarin: { hanzi: "我不来", pinyin: "Wǒ bù lái", words: [], breakdown: "«Я не прихожу» — противоречит." } },
    { id: 3, english: "累死了。", mandarin: { hanzi: "累死了", pinyin: "Lèi sǐ le", words: [], breakdown: "«Устал» — не ответ на благодарность." } },
    { id: 4, english: "谢谢我。", mandarin: { hanzi: "谢谢我", pinyin: "Xièxie wǒ", words: [], breakdown: "«Спасибо мне» — странно." } },
  ], correctOptionId: 1 },
  { id: 20112, type: "multiple_choice", mandarin: { hanzi: "不上课，挺舒服的吧？", pinyin: "Bú shàng kè, tǐng shūfu de ba?" }, instruction: "«Без пар, наверное кайф?» Наоборот — скучно быть одному. Как?", options: [
    { id: 1, english: "不舒服。一个人吃，一个人睡，挺无聊的。", mandarin: { hanzi: "不舒服。一个人吃，一个人睡，挺无聊的", pinyin: "Bù shūfu. Yí ge rén chī, yí ge rén shuì, tǐng wúliáo de", words: [{ hanzi: "一个人", pinyin: "yí ge rén", english: "один" }, { hanzi: "无聊", pinyin: "wúliáo", english: "скучно" }], breakdown: "«Один...один...» — подчёркивает одиночество." } },
    { id: 2, english: "舒服死了。", mandarin: { hanzi: "舒服死了", pinyin: "Shūfu sǐ le", words: [], breakdown: "«Кайф до смерти» — противоположно." } },
    { id: 3, english: "我不是病人。", mandarin: { hanzi: "我不是病人", pinyin: "Wǒ bú shì bìngrén", words: [], breakdown: "«Я не больной» — не отвечает на тему." } },
    { id: 4, english: "医生来了。", mandarin: { hanzi: "医生来了", pinyin: "Yīshēng lái le", words: [], breakdown: "«Врач пришёл» — не по теме." } },
  ], correctOptionId: 1 },
  { id: 20113, type: "multiple_choice", mandarin: { hanzi: "你中午想吃什么？", pinyin: "Nǐ zhōngwǔ xiǎng chī shénme?" }, instruction: "«Что хочешь на обед?» Хочешь Макдоналдс (но врач не одобрит). Как сказать?", options: [
    { id: 1, english: "麦当劳！我想吃麦当劳。", mandarin: { hanzi: "麦当劳！我想吃麦当劳", pinyin: "Màidāngláo! Wǒ xiǎng chī Màidāngláo", words: [{ hanzi: "想", pinyin: "xiǎng", english: "хотеть" }, { hanzi: "麦当劳", pinyin: "Màidāngláo", english: "Макдоналдс" }], breakdown: "«想 + глагол» = хотеть что-то сделать." } },
    { id: 2, english: "不想吃。", mandarin: { hanzi: "不想吃", pinyin: "Bù xiǎng chī", words: [], breakdown: "«Не хочу есть» — не отвечает «что именно»." } },
    { id: 3, english: "麦当劳不好。", mandarin: { hanzi: "麦当劳不好", pinyin: "Màidāngláo bù hǎo", words: [], breakdown: "Отрицательная оценка, не просьба." } },
    { id: 4, english: "吃饭了。", mandarin: { hanzi: "吃饭了", pinyin: "Chī fàn le", words: [], breakdown: "«Поел» — прошедшее." } },
  ], correctOptionId: 1 },
  { id: 20114, type: "listening_mc", mandarin: { hanzi: "累死了", pinyin: "Lèi sǐ le", words: [{ hanzi: "累", pinyin: "lèi", english: "устал" }, { hanzi: "死了", pinyin: "sǐ le", english: "до смерти" }], breakdown: "«Ужасно устал!» — разговорная крайняя степень." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Ужасно устал — 累死了" },
    { id: 2, english: "Не устал — 不累" },
    { id: 3, english: "Очень устал — 很累" },
    { id: 4, english: "Голоден до смерти — 饿死了" },
  ], correctOptionId: 1 },
  { id: 20115, type: "listening_mc", mandarin: { hanzi: "别客气", pinyin: "Bié kèqi", words: [{ hanzi: "别", pinyin: "bié", english: "не надо" }, { hanzi: "客气", pinyin: "kèqi", english: "церемониться" }], breakdown: "Стандартный ответ на благодарность/вежливость." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Не стесняйся — 别客气" },
    { id: 2, english: "Не говори — 别说" },
    { id: 3, english: "Не иди — 别走" },
    { id: 4, english: "Ты слишком вежлив — 你太客气了" },
  ], correctOptionId: 1 },
  { id: 20116, type: "grammar", rule: {
    title: "Прил. + 死了 — «ужасно, до смерти»",
    explanation: "Выражает КРАЙНЮЮ степень. Буквально «до смерти X».\n\nСхема: Прил. + 死了\n\n累死了 — ужасно устал\n冷死了 — жуткий холод\n饿死了 — умираю от голода\n热死了 — жара невыносимая\n\nРазговорная эмоциональная форма. В формальных — 非常 или 很.",
    examples: [
      { hanzi: "人太多，挤死了。", pinyin: "Rén tài duō, jǐ sǐ le.", english: "Людей много, давка страшная." },
      { hanzi: "今天零下十度，冷死了。", pinyin: "Jīntiān língxià shí dù, lěng sǐ le.", english: "Сегодня -10, холодрыга." },
    ],
  }, practice: [
    { question: "Как сказать «Жарко до смерти!»?", options: [
      { id: 1, text: "热了死" },
      { id: 2, text: "热死了" },
      { id: 3, text: "死热了" },
      { id: 4, text: "很热死" },
    ], correctOptionId: 2 },
    { question: "Эта форма подходит для формальной речи?", options: [
      { id: 1, text: "Да, всегда" },
      { id: 2, text: "Нет, только разговорная" },
      { id: 3, text: "Только в текстах" },
      { id: 4, text: "Только в деловой переписке" },
    ], correctOptionId: 2 },
  ] },
  { id: 20117, type: "grammar", rule: {
    title: "Запрет: 别 + Глагол — «не делай»",
    explanation: "别 (bié) + Глагол = запрет «не делай X». Мягче чем 不要.\n\nСхема: 别 + Глагол\n\n别客气！— Не стесняйся!\n别去！— Не ходи!\n别说了！— Хватит говорить!\n\n别 — только для приказа/просьбы «не делай сейчас». Для «я не буду» — 不.",
    examples: [
      { hanzi: "别吃太多。", pinyin: "Bié chī tài duō.", english: "Не ешь слишком много." },
      { hanzi: "别说了。", pinyin: "Bié shuō le.", english: "Хватит говорить." },
    ],
  }, practice: [
    { question: "Как сказать «Не спеши»?", options: [
      { id: 1, text: "不着急" },
      { id: 2, text: "别着急" },
      { id: 3, text: "没着急" },
      { id: 4, text: "不是着急" },
    ], correctOptionId: 2 },
    { question: "别 используется для...?", options: [
      { id: 1, text: "Описания привычек" },
      { id: 2, text: "Запретов/просьб «не делай»" },
      { id: 3, text: "Будущего времени" },
      { id: 4, text: "Отрицания свойств" },
    ], correctOptionId: 2 },
  ] },
  { id: 20118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "医院", leftPinyin: "yīyuàn", right: "больница" },
    { id: 2, left: "医生", leftPinyin: "yīshēng", right: "врач" },
    { id: 3, left: "病人", leftPinyin: "bìngrén", right: "пациент" },
    { id: 4, left: "累", leftPinyin: "lèi", right: "уставший" },
    { id: 5, left: "别", leftPinyin: "bié", right: "не надо" },
    { id: 6, left: "身体", leftPinyin: "shēntǐ", right: "здоровье" },
    { id: 7, left: "药", leftPinyin: "yào", right: "лекарство" },
    { id: 8, left: "考试", leftPinyin: "kǎoshì", right: "экзамен" },
  ] },
  { id: 20119, type: "single_response", mandarin: { hanzi: "累死了！", pinyin: "Lèi sǐ le!" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Ужасно устал!", mandarin: { hanzi: "累死了", pinyin: "Lèi sǐ le", words: [
      { hanzi: "累", pinyin: "lèi", english: "устал" },
      { hanzi: "死了", pinyin: "sǐ le", english: "до смерти" },
    ], breakdown: "Эмоциональная крайняя степень." } },
  ] },
  { id: 20120, type: "single_response", mandarin: { hanzi: "别客气。", pinyin: "Bié kèqi." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Не стесняйся.", mandarin: { hanzi: "别客气", pinyin: "Bié kèqi", words: [
      { hanzi: "别", pinyin: "bié", english: "не надо" },
      { hanzi: "客气", pinyin: "kèqi", english: "церемониться" },
    ], breakdown: "Универсальная вежливая формула." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// WRITE ALL
// ═══════════════════════════════════════════════════════════════════
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const assignments = [
  [16, ch16], [17, ch17], [18, ch18], [19, ch19], [20, ch20],
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
