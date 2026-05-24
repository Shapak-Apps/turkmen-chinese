/**
 * Adds 20 exercises to each of Chapters 24-26 based on Boya Chinese Elementary I.
 */
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "assets", "data", "course_content.json");

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 24 — 你吃了早饭来找我 (commands, 了(4) sequence, Time+Place)
// ═══════════════════════════════════════════════════════════════════
const ch24 = [
  { id: 24101, type: "flashcard", mandarin: { hanzi: "聚会", pinyin: "Jùhuì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "вечеринка, собрание", hanzi: "聚会", pinyin: "jùhuì" },
    { id: 2, english: "встреча", hanzi: "见面", pinyin: "jiàn miàn" },
    { id: 3, english: "занятие", hanzi: "课", pinyin: "kè" },
    { id: 4, english: "экскурсия", hanzi: "旅行", pinyin: "lǚxíng" },
  ], correctOptionId: 1 },
  { id: 24102, type: "flashcard", mandarin: { hanzi: "早饭", pinyin: "Zǎofàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "ужин", hanzi: "晚饭", pinyin: "wǎnfàn" },
    { id: 2, english: "обед", hanzi: "午饭", pinyin: "wǔfàn" },
    { id: 3, english: "завтрак", hanzi: "早饭", pinyin: "zǎofàn" },
    { id: 4, english: "еда", hanzi: "饭", pinyin: "fàn" },
  ], correctOptionId: 3 },
  { id: 24103, type: "flashcard", mandarin: { hanzi: "放心", pinyin: "Fàng xīn" }, instruction: "Что значит это выражение?", options: [
    { id: 1, english: "не волноваться", hanzi: "放心", pinyin: "fàng xīn" },
    { id: 2, english: "волноваться", hanzi: "担心", pinyin: "dān xīn" },
    { id: 3, english: "спешить", hanzi: "着急", pinyin: "zháojí" },
    { id: 4, english: "переживать", hanzi: "难过", pinyin: "nánguò" },
  ], correctOptionId: 1 },
  { id: 24104, type: "flashcard", mandarin: { hanzi: "见面", pinyin: "Jiàn miàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "видеть", hanzi: "看", pinyin: "kàn" },
    { id: 2, english: "встречаться", hanzi: "见面", pinyin: "jiàn miàn" },
    { id: 3, english: "знакомиться", hanzi: "认识", pinyin: "rènshi" },
    { id: 4, english: "искать", hanzi: "找", pinyin: "zhǎo" },
  ], correctOptionId: 2 },
  { id: 24105, type: "flashcard", mandarin: { hanzi: "祝", pinyin: "Zhù" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "желать, поздравлять", hanzi: "祝", pinyin: "zhù" },
    { id: 2, english: "дарить", hanzi: "送", pinyin: "sòng" },
    { id: 3, english: "встречать", hanzi: "见", pinyin: "jiàn" },
    { id: 4, english: "помогать", hanzi: "帮", pinyin: "bāng" },
  ], correctOptionId: 1 },
  { id: 24106, type: "flashcard", mandarin: { hanzi: "找", pinyin: "Zhǎo" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "идти", hanzi: "去", pinyin: "qù" },
    { id: 2, english: "встретить", hanzi: "见", pinyin: "jiàn" },
    { id: 3, english: "искать", hanzi: "找", pinyin: "zhǎo" },
    { id: 4, english: "ждать", hanzi: "等", pinyin: "děng" },
  ], correctOptionId: 3 },
  { id: 24107, type: "fill_blank", sentence: "你吃___早饭来找我。", sentencePinyin: "Nǐ chī ___ zǎofàn lái zhǎo wǒ.", blankedWord: "了", correctAnswer: "了", hint: "последовательность V1+了+V2", instruction: "Вставь пропущенное слово: «Поешь и приходи ко мне.»", options: [
    { id: 1, hanzi: "了", pinyin: "le" },
    { id: 2, hanzi: "过", pinyin: "guò" },
    { id: 3, hanzi: "的", pinyin: "de" },
    { id: 4, hanzi: "着", pinyin: "zhe" },
  ] },
  { id: 24108, type: "fill_blank", sentence: "你___心吧！", sentencePinyin: "Nǐ ___ xīn ba!", blankedWord: "放", correctAnswer: "放", hint: "«положить сердце» = не волнуйся", instruction: "Вставь пропущенное слово: «Не волнуйся!»", options: [
    { id: 1, hanzi: "放", pinyin: "fàng" },
    { id: 2, hanzi: "担", pinyin: "dān" },
    { id: 3, hanzi: "用", pinyin: "yòng" },
    { id: 4, hanzi: "开", pinyin: "kāi" },
  ] },
  { id: 24109, type: "fill_blank", sentence: "___她生日快乐！", sentencePinyin: "___ tā shēngrì kuàilè!", blankedWord: "祝", correctAnswer: "祝", hint: "«желать»", instruction: "Вставь пропущенное слово: «Поздравь её с днём рождения!»", options: [
    { id: 1, hanzi: "祝", pinyin: "zhù" },
    { id: 2, hanzi: "送", pinyin: "sòng" },
    { id: 3, hanzi: "过", pinyin: "guò" },
    { id: 4, hanzi: "说", pinyin: "shuō" },
  ] },
  { id: 24110, type: "fill_blank", sentence: "明天八点半___你们宿舍门口见面。", sentencePinyin: "Míngtiān bā diǎn bàn ___ nǐmen sùshè ménkǒu jiàn miàn.", blankedWord: "在", correctAnswer: "在", hint: "«в (месте)»", instruction: "Вставь пропущенное слово: «Завтра в 8:30 встретимся у вашего общежития.»", options: [
    { id: 1, hanzi: "在", pinyin: "zài" },
    { id: 2, hanzi: "是", pinyin: "shì" },
    { id: 3, hanzi: "从", pinyin: "cóng" },
    { id: 4, hanzi: "到", pinyin: "dào" },
  ] },
  { id: 24111, type: "multiple_choice", mandarin: { hanzi: "你们晚上去哪儿？", pinyin: "Nǐmen wǎnshang qù nǎr?" }, instruction: "«Куда вечером?» В караоке. Предупреди «не задерживайтесь поздно».", options: [
    { id: 1, english: "我们去唱卡拉OK。好好儿玩儿，别太晚了。", mandarin: { hanzi: "我们去唱卡拉OK。好好儿玩儿，别太晚了", pinyin: "Wǒmen qù chàng kǎlā OK. Hǎohāor wánr, bié tài wǎn le", words: [{ hanzi: "卡拉OK", pinyin: "kǎlā OK", english: "караоке" }, { hanzi: "别太晚", pinyin: "bié tài wǎn", english: "не поздно" }], breakdown: "План + пожелание + запрет с 别." } },
    { id: 2, english: "不去哪儿。", mandarin: { hanzi: "不去哪儿", pinyin: "Bù qù nǎr", words: [], breakdown: "«Никуда» — но ты идёшь." } },
    { id: 3, english: "太晚了别去。", mandarin: { hanzi: "太晚了别去", pinyin: "Tài wǎn le bié qù", words: [], breakdown: "«Слишком поздно, не ходи» — это тебе не запрещают." } },
    { id: 4, english: "早一点儿睡。", mandarin: { hanzi: "早一点儿睡", pinyin: "Zǎo yìdiǎnr shuì", words: [], breakdown: "«Ложись пораньше» — не отвечает на куда." } },
  ], correctOptionId: 1 },
  { id: 24112, type: "multiple_choice", mandarin: { hanzi: "今天是小美生日，你来吗？", pinyin: "Jīntiān shì Xiǎoměi shēngrì, nǐ lái ma?" }, instruction: "«У Сяомэй ДР, придёшь?» Ты парень, это девчачья тусовка. Как отказаться вежливо?", options: [
    { id: 1, english: "你们女生一起玩儿，我去干什么？", mandarin: { hanzi: "你们女生一起玩儿，我去干什么", pinyin: "Nǐmen nǚshēng yìqǐ wánr, wǒ qù gàn shénme", words: [{ hanzi: "女生", pinyin: "nǚshēng", english: "девушки" }], breakdown: "Риторический «зачем мне туда?»" } },
    { id: 2, english: "我不去。", mandarin: { hanzi: "我不去", pinyin: "Wǒ bú qù", words: [], breakdown: "«Не пойду» — резко, без объяснения." } },
    { id: 3, english: "我去！", mandarin: { hanzi: "我去", pinyin: "Wǒ qù", words: [], breakdown: "«Пойду» — но ты хочешь отказать." } },
    { id: 4, english: "生日没有。", mandarin: { hanzi: "生日没有", pinyin: "Shēngrì méiyǒu", words: [], breakdown: "«Дня рождения нет» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 24113, type: "multiple_choice", mandarin: { hanzi: "明天去哪儿玩儿？", pinyin: "Míngtiān qù nǎr wánr?" }, instruction: "«Куда завтра?» В музей, встретимся у общежития в 8:30. Как?", options: [
    { id: 1, english: "明天八点半在你们宿舍门口见面，行吗？", mandarin: { hanzi: "明天八点半在你们宿舍门口见面，行吗", pinyin: "Míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn, xíng ma", words: [{ hanzi: "门口", pinyin: "ménkǒu", english: "у входа" }, { hanzi: "见面", pinyin: "jiàn miàn", english: "встретиться" }], breakdown: "Порядок: Время + Место + Глагол." } },
    { id: 2, english: "在门口明天见面八点半。", mandarin: { hanzi: "在门口明天见面八点半", pinyin: "Zài ménkǒu míngtiān jiàn miàn bā diǎn bàn", words: [], breakdown: "Неправильный порядок." } },
    { id: 3, english: "明天不见。", mandarin: { hanzi: "明天不见", pinyin: "Míngtiān bú jiàn", words: [], breakdown: "«Завтра не увидимся» — противоположно." } },
    { id: 4, english: "见面八点半。", mandarin: { hanzi: "见面八点半", pinyin: "Jiàn miàn bā diǎn bàn", words: [], breakdown: "Без времени-места перед глаголом." } },
  ], correctOptionId: 1 },
  { id: 24114, type: "listening_mc", mandarin: { hanzi: "你吃了早饭来找我", pinyin: "Nǐ chī le zǎofàn lái zhǎo wǒ", words: [{ hanzi: "吃了", pinyin: "chī le", english: "поев" }, { hanzi: "找", pinyin: "zhǎo", english: "найти" }], breakdown: "Последовательность V1+了+V2." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Поешь и приходи ко мне — 你吃了早饭来找我" },
    { id: 2, english: "Я пришёл за завтраком — 我来吃早饭" },
    { id: 3, english: "Завтра приду тебя искать — 明天来找你" },
    { id: 4, english: "Поищи завтрак — 找早饭" },
  ], correctOptionId: 1 },
  { id: 24115, type: "listening_mc", mandarin: { hanzi: "放心吧", pinyin: "Fàng xīn ba", words: [{ hanzi: "放心", pinyin: "fàng xīn", english: "не волноваться" }], breakdown: "Успокоение собеседника." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Не волнуйся — 放心吧" },
    { id: 2, english: "Извини — 不好意思" },
    { id: 3, english: "Спасибо — 谢谢" },
    { id: 4, english: "Пока — 再见" },
  ], correctOptionId: 1 },
  { id: 24116, type: "grammar", rule: {
    title: "了 (4) — последовательность действий",
    explanation: "了 между двумя глаголами = V1 ЗАКОНЧИЛОСЬ, ПОТОМ V2.\n\nСхема: V1 + 了 + O1 + V2 + O2\n\n你吃了早饭来找我。\n«Поешь завтрак — потом ко мне.»\n\n我去了咖啡店上课。— Сначала в кофейню, потом на пары.\n\nПохоже на 先...然后..., но короче.",
    examples: [
      { hanzi: "我换了钱去买东西。", pinyin: "Wǒ huàn le qián qù mǎi dōngxi.", english: "Обменяю и куплю." },
      { hanzi: "吃了饭看书。", pinyin: "Chī le fàn kàn shū.", english: "Поев, читаю." },
    ],
  }, practice: [
    { question: "Как сказать «Выпил кофе и пошёл на занятия»?", options: [
      { id: 1, text: "喝咖啡了上课" },
      { id: 2, text: "喝了咖啡上课" },
      { id: 3, text: "上课喝咖啡了" },
      { id: 4, text: "咖啡上课了" },
    ], correctOptionId: 2 },
    { question: "Что значит «我洗了澡睡觉»?", options: [
      { id: 1, text: "Помоюсь одновременно со сном" },
      { id: 2, text: "Приму душ, потом спать" },
      { id: 3, text: "Сплю вместо душа" },
      { id: 4, text: "Не помоюсь" },
    ], correctOptionId: 2 },
  ] },
  { id: 24117, type: "grammar", rule: {
    title: "Порядок: Подл. + Время + Место + Глагол",
    explanation: "Когда и время, и место — оба ПЕРЕД глаголом. Сначала время, потом место.\n\nСхема: Подл. + Время + 在+Место + Глагол + Объект\n\n我们明天八点半在你们宿舍门口见面。\n«Мы завтра в 8:30 у входа встретимся.»",
    examples: [
      { hanzi: "今天下课以后我在图书馆学习。", pinyin: "Jīntiān xià kè yǐhòu wǒ zài túshūguǎn xuéxí.", english: "После пар в библиотеке позанимаюсь." },
      { hanzi: "他每天在家喝咖啡。", pinyin: "Tā měi tiān zài jiā hē kāfēi.", english: "Он каждый день дома пьёт кофе." },
    ],
  }, practice: [
    { question: "Как сказать «Завтра в 7 в аудитории»?", options: [
      { id: 1, text: "在教室明天七点" },
      { id: 2, text: "明天七点在教室" },
      { id: 3, text: "七点明天教室在" },
      { id: 4, text: "教室在明天七点" },
    ], correctOptionId: 2 },
    { question: "В каком порядке идут время и место?", options: [
      { id: 1, text: "Место, потом время" },
      { id: 2, text: "Время, потом место" },
      { id: 3, text: "Только место" },
      { id: 4, text: "Только время" },
    ], correctOptionId: 2 },
  ] },
  { id: 24118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "聚会", leftPinyin: "jùhuì", right: "вечеринка" },
    { id: 2, left: "早饭", leftPinyin: "zǎofàn", right: "завтрак" },
    { id: 3, left: "放心", leftPinyin: "fàng xīn", right: "не волнуйся" },
    { id: 4, left: "见面", leftPinyin: "jiàn miàn", right: "встретиться" },
    { id: 5, left: "祝", leftPinyin: "zhù", right: "желать" },
    { id: 6, left: "找", leftPinyin: "zhǎo", right: "искать" },
    { id: 7, left: "门口", leftPinyin: "ménkǒu", right: "у входа" },
    { id: 8, left: "上网", leftPinyin: "shàng wǎng", right: "в интернет" },
  ] },
  { id: 24119, type: "single_response", mandarin: { hanzi: "你吃了早饭来找我，好吗？", pinyin: "Nǐ chī le zǎofàn lái zhǎo wǒ, hǎo ma?" }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Поешь завтрак и заходи за мной, хорошо?", mandarin: { hanzi: "你吃了早饭来找我，好吗", pinyin: "Nǐ chī le zǎofàn lái zhǎo wǒ, hǎo ma", words: [
      { hanzi: "吃了", pinyin: "chī le", english: "поешь" },
      { hanzi: "找", pinyin: "zhǎo", english: "найти" },
    ], breakdown: "V1+了+O+V2: последовательность." } },
  ] },
  { id: 24120, type: "single_response", mandarin: { hanzi: "明天八点半在你们宿舍门口见面。", pinyin: "Míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Завтра в 8:30 у вашего общежития встретимся.", mandarin: { hanzi: "明天八点半在你们宿舍门口见面", pinyin: "Míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn", words: [
      { hanzi: "明天", pinyin: "míngtiān", english: "завтра" },
      { hanzi: "门口", pinyin: "ménkǒu", english: "у входа" },
    ], breakdown: "Время (明天八点半) + место (在...门口) + глагол (见面)." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 25 — 你得多锻炼锻炼了 (modal verbs, 别+V+了, 多+V-V)
// ═══════════════════════════════════════════════════════════════════
const ch25 = [
  { id: 25101, type: "flashcard", mandarin: { hanzi: "锻炼", pinyin: "Duànliàn" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "отдыхать", hanzi: "休息", pinyin: "xiūxi" },
    { id: 2, english: "заниматься спортом", hanzi: "锻炼", pinyin: "duànliàn" },
    { id: 3, english: "играть", hanzi: "玩儿", pinyin: "wánr" },
    { id: 4, english: "бежать", hanzi: "跑", pinyin: "pǎo" },
  ], correctOptionId: 2 },
  { id: 25102, type: "flashcard", mandarin: { hanzi: "跑步", pinyin: "Pǎo bù" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "бегать (для упражнений)", hanzi: "跑步", pinyin: "pǎo bù" },
    { id: 2, english: "гулять", hanzi: "散步", pinyin: "sàn bù" },
    { id: 3, english: "танцевать", hanzi: "跳舞", pinyin: "tiào wǔ" },
    { id: 4, english: "спать", hanzi: "睡觉", pinyin: "shuì jiào" },
  ], correctOptionId: 1 },
  { id: 25103, type: "flashcard", mandarin: { hanzi: "参加", pinyin: "Cānjiā" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "записаться", hanzi: "报名", pinyin: "bào míng" },
    { id: 2, english: "участвовать", hanzi: "参加", pinyin: "cānjiā" },
    { id: 3, english: "начинать", hanzi: "开始", pinyin: "kāishǐ" },
    { id: 4, english: "идти", hanzi: "去", pinyin: "qù" },
  ], correctOptionId: 2 },
  { id: 25104, type: "flashcard", mandarin: { hanzi: "空气", pinyin: "Kōngqì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "ветер", hanzi: "风", pinyin: "fēng" },
    { id: 2, english: "воздух", hanzi: "空气", pinyin: "kōngqì" },
    { id: 3, english: "погода", hanzi: "天气", pinyin: "tiānqì" },
    { id: 4, english: "дождь", hanzi: "雨", pinyin: "yǔ" },
  ], correctOptionId: 2 },
  { id: 25105, type: "flashcard", mandarin: { hanzi: "新鲜", pinyin: "Xīnxiān" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "новый", hanzi: "新", pinyin: "xīn" },
    { id: 2, english: "свежий", hanzi: "新鲜", pinyin: "xīnxiān" },
    { id: 3, english: "чистый", hanzi: "干净", pinyin: "gānjìng" },
    { id: 4, english: "холодный", hanzi: "冷", pinyin: "lěng" },
  ], correctOptionId: 2 },
  { id: 25106, type: "flashcard", mandarin: { hanzi: "忘", pinyin: "Wàng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "помнить", hanzi: "记得", pinyin: "jìde" },
    { id: 2, english: "забыть", hanzi: "忘", pinyin: "wàng" },
    { id: 3, english: "знать", hanzi: "知道", pinyin: "zhīdào" },
    { id: 4, english: "учить", hanzi: "学", pinyin: "xué" },
  ], correctOptionId: 2 },
  { id: 25107, type: "fill_blank", sentence: "明天早上有课，我___早点儿起床。", sentencePinyin: "Míngtiān zǎoshang yǒu kè, wǒ ___ zǎo diǎnr qǐ chuáng.", blankedWord: "得", correctAnswer: "得", hint: "«должен» (děi)", instruction: "Вставь пропущенное слово: «Завтра пары, надо рано встать.»", options: [
    { id: 1, hanzi: "得", pinyin: "děi" },
    { id: 2, hanzi: "会", pinyin: "huì" },
    { id: 3, hanzi: "能", pinyin: "néng" },
    { id: 4, hanzi: "是", pinyin: "shì" },
  ] },
  { id: 25108, type: "fill_blank", sentence: "你也___看书了。", sentencePinyin: "Nǐ yě ___ kàn shū le.", blankedWord: "别", correctAnswer: "别", hint: "«хватит» (запрет)", instruction: "Вставь пропущенное слово: «И ты хватит читать.»", options: [
    { id: 1, hanzi: "别", pinyin: "bié" },
    { id: 2, hanzi: "不", pinyin: "bù" },
    { id: 3, hanzi: "没", pinyin: "méi" },
    { id: 4, hanzi: "还", pinyin: "hái" },
  ] },
  { id: 25109, type: "fill_blank", sentence: "你得___锻炼锻炼了。", sentencePinyin: "Nǐ děi ___ duànliàn duànliàn le.", blankedWord: "多", correctAnswer: "多", hint: "«побольше»", instruction: "Вставь пропущенное слово: «Тебе надо побольше тренироваться.»", options: [
    { id: 1, hanzi: "多", pinyin: "duō" },
    { id: 2, hanzi: "少", pinyin: "shǎo" },
    { id: 3, hanzi: "也", pinyin: "yě" },
    { id: 4, hanzi: "最", pinyin: "zuì" },
  ] },
  { id: 25110, type: "fill_blank", sentence: "我___打太极拳。", sentencePinyin: "Wǒ ___ dǎ tàijíquán.", blankedWord: "会", correctAnswer: "会", hint: "«уметь по обучению»", instruction: "Вставь пропущенное слово: «Я умею тайцзи.»", options: [
    { id: 1, hanzi: "会", pinyin: "huì" },
    { id: 2, hanzi: "能", pinyin: "néng" },
    { id: 3, hanzi: "要", pinyin: "yào" },
    { id: 4, hanzi: "得", pinyin: "děi" },
  ] },
  { id: 25111, type: "multiple_choice", mandarin: { hanzi: "明天早上你能叫我吗？", pinyin: "Míngtiān zǎoshang nǐ néng jiào wǒ ma?" }, instruction: "«Разбудишь меня утром?» У тебя есть будильник. Как?", options: [
    { id: 1, english: "我有闹钟，没问题。", mandarin: { hanzi: "我有闹钟，没问题", pinyin: "Wǒ yǒu nàozhōng, méi wèntí", words: [{ hanzi: "闹钟", pinyin: "nàozhōng", english: "будильник" }], breakdown: "«Без проблем» — позитивное согласие." } },
    { id: 2, english: "我不能叫你。", mandarin: { hanzi: "我不能叫你", pinyin: "Wǒ bù néng jiào nǐ", words: [], breakdown: "«Не могу» — отказ без причины." } },
    { id: 3, english: "叫不叫。", mandarin: { hanzi: "叫不叫", pinyin: "Jiào bu jiào", words: [], breakdown: "Вопрос, не ответ." } },
    { id: 4, english: "明天不见。", mandarin: { hanzi: "明天不见", pinyin: "Míngtiān bú jiàn", words: [], breakdown: "«Завтра не увидимся» — не к теме." } },
  ], correctOptionId: 1 },
  { id: 25112, type: "multiple_choice", mandarin: { hanzi: "你出了很多汗，累吗？", pinyin: "Nǐ chū le hěn duō hàn, lèi ma?" }, instruction: "«Ты весь потный, устал?» Друг советует побольше тренироваться. Как?", options: [
    { id: 1, english: "看起来，你得多锻炼锻炼了。", mandarin: { hanzi: "看起来，你得多锻炼锻炼了", pinyin: "Kàn qǐlai, nǐ děi duō duànliàn duànliàn le", words: [{ hanzi: "多", pinyin: "duō", english: "побольше" }, { hanzi: "锻炼锻炼", pinyin: "duànliàn duànliàn", english: "тренироваться" }], breakdown: "«Похоже + надо побольше тренироваться.»" } },
    { id: 2, english: "不锻炼。", mandarin: { hanzi: "不锻炼", pinyin: "Bù duànliàn", words: [], breakdown: "«Не тренируюсь» — противоположно совету." } },
    { id: 3, english: "你太棒了。", mandarin: { hanzi: "你太棒了", pinyin: "Nǐ tài bàng le", words: [], breakdown: "«Ты крутой» — не совет." } },
    { id: 4, english: "累死了。", mandarin: { hanzi: "累死了", pinyin: "Lèi sǐ le", words: [], breakdown: "«Ужасно устал» — это своё состояние." } },
  ], correctOptionId: 1 },
  { id: 25113, type: "multiple_choice", mandarin: { hanzi: "你怎么这么早睡觉？", pinyin: "Nǐ zěnme zhème zǎo shuì jiào?" }, instruction: "«Что так рано?» Завтра утром тайцзи, надо встать рано. Как?", options: [
    { id: 1, english: "明天早上有太极拳课，我要早点儿起床。", mandarin: { hanzi: "明天早上有太极拳课，我要早点儿起床", pinyin: "Míngtiān zǎoshang yǒu tàijíquán kè, wǒ yào zǎo diǎnr qǐ chuáng", words: [{ hanzi: "太极拳", pinyin: "tàijíquán", english: "тайцзи" }, { hanzi: "起床", pinyin: "qǐ chuáng", english: "вставать" }], breakdown: "Причина + план." } },
    { id: 2, english: "我喜欢睡觉。", mandarin: { hanzi: "我喜欢睡觉", pinyin: "Wǒ xǐhuan shuì jiào", words: [], breakdown: "«Я люблю спать» — не причина «рано»." } },
    { id: 3, english: "不累。", mandarin: { hanzi: "不累", pinyin: "Bú lèi", words: [], breakdown: "«Не устал» — не ответ." } },
    { id: 4, english: "太极拳没有。", mandarin: { hanzi: "太极拳没有", pinyin: "Tàijíquán méiyǒu", words: [], breakdown: "«Тайцзи нет» — но ты записался." } },
  ], correctOptionId: 1 },
  { id: 25114, type: "listening_mc", mandarin: { hanzi: "你得多锻炼锻炼了", pinyin: "Nǐ děi duō duànliàn duànliàn le", words: [{ hanzi: "得", pinyin: "děi", english: "надо" }, { hanzi: "锻炼", pinyin: "duànliàn", english: "тренироваться" }], breakdown: "Совет с удвоенным глаголом." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Тебе надо больше тренироваться — 你得多锻炼锻炼了" },
    { id: 2, english: "Я тренируюсь — 我在锻炼" },
    { id: 3, english: "Не тренируйся — 别锻炼" },
    { id: 4, english: "Тренируемся вместе — 一起锻炼" },
  ], correctOptionId: 1 },
  { id: 25115, type: "listening_mc", mandarin: { hanzi: "早上的空气真新鲜", pinyin: "Zǎoshang de kōngqì zhēn xīnxiān", words: [{ hanzi: "空气", pinyin: "kōngqì", english: "воздух" }, { hanzi: "新鲜", pinyin: "xīnxiān", english: "свежий" }], breakdown: "Утренний комплимент погоде." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Утренний воздух такой свежий — 早上的空气真新鲜" },
    { id: 2, english: "Вечером холодно — 晚上很冷" },
    { id: 3, english: "Утром очень тепло — 早上很暖" },
    { id: 4, english: "Весна свежая — 春天新鲜" },
  ], correctOptionId: 1 },
  { id: 25116, type: "grammar", rule: {
    title: "Модальные глаголы — обзор",
    explanation: "Все модальные глаголы ставятся ПЕРЕД основным.\n\n• 会 — уметь (навык): 我会打太极拳\n• 可以 — можно (разрешение): 可以说英语\n• 能 — мочь (физ./обст.): 玛丽能用汉语聊天儿\n• 要 — хотеть/собираться: 我要去跑步\n• 得 (děi) — должен: 我得早起\n\nОтрицание: 不会/不可以/不能/不要, но 不用 (вместо 不得).",
    examples: [
      { hanzi: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", english: "Я умею говорить." },
      { hanzi: "我得早起。", pinyin: "Wǒ děi zǎo qǐ.", english: "Я должен вставать рано." },
    ],
  }, practice: [
    { question: "Какое отрицание для 得?", options: [
      { id: 1, text: "不得" },
      { id: 2, text: "没得" },
      { id: 3, text: "不用" },
      { id: 4, text: "别得" },
    ], correctOptionId: 3 },
    { question: "Для «умения» используется...?", options: [
      { id: 1, text: "能" },
      { id: 2, text: "会" },
      { id: 3, text: "要" },
      { id: 4, text: "得" },
    ], correctOptionId: 2 },
  ] },
  { id: 25117, type: "grammar", rule: {
    title: "别 + V + 了 — «перестань делать»",
    explanation: "别 + Глагол + 了 = «хватит, перестань» (прекратить ТЕКУЩЕЕ действие).\n\nРазница:\n• 别说 — не говори (вообще)\n• 别说了 — хватит говорить (сейчас)\n\n别吃了 — перестань есть\n别看了 — хватит смотреть\n别哭了 — не плачь больше",
    examples: [
      { hanzi: "别说了！", pinyin: "Bié shuō le!", english: "Хватит говорить!" },
      { hanzi: "别吃了，太晚了。", pinyin: "Bié chī le, tài wǎn le.", english: "Хватит есть, уже поздно." },
    ],
  }, practice: [
    { question: "Как сказать «Хватит пить»?", options: [
      { id: 1, text: "别喝" },
      { id: 2, text: "别喝了" },
      { id: 3, text: "不喝" },
      { id: 4, text: "没喝了" },
    ], correctOptionId: 2 },
    { question: "Разница 别说 и 别说了?", options: [
      { id: 1, text: "Одинаково" },
      { id: 2, text: "别说 — общий запрет, 别说了 — прекрати сейчас" },
      { id: 3, text: "别说 — грубее" },
      { id: 4, text: "别说了 — о прошлом" },
    ], correctOptionId: 2 },
  ] },
  { id: 25118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "锻炼", leftPinyin: "duànliàn", right: "тренироваться" },
    { id: 2, left: "跑步", leftPinyin: "pǎo bù", right: "бегать" },
    { id: 3, left: "参加", leftPinyin: "cānjiā", right: "участвовать" },
    { id: 4, left: "空气", leftPinyin: "kōngqì", right: "воздух" },
    { id: 5, left: "新鲜", leftPinyin: "xīnxiān", right: "свежий" },
    { id: 6, left: "太极拳", leftPinyin: "tàijíquán", right: "тайцзи" },
    { id: 7, left: "闹钟", leftPinyin: "nàozhōng", right: "будильник" },
    { id: 8, left: "散步", leftPinyin: "sàn bù", right: "гулять" },
  ] },
  { id: 25119, type: "single_response", mandarin: { hanzi: "你得多锻炼锻炼了。", pinyin: "Nǐ děi duō duànliàn duànliàn le." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Тебе пора больше тренироваться.", mandarin: { hanzi: "你得多锻炼锻炼了", pinyin: "Nǐ děi duō duànliàn duànliàn le", words: [
      { hanzi: "得", pinyin: "děi", english: "надо" },
      { hanzi: "多", pinyin: "duō", english: "больше" },
    ], breakdown: "得 + 多 + удвоенный глагол + 了." } },
  ] },
  { id: 25120, type: "single_response", mandarin: { hanzi: "早上的空气真新鲜。", pinyin: "Zǎoshang de kōngqì zhēn xīnxiān." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Утренний воздух такой свежий.", mandarin: { hanzi: "早上的空气真新鲜", pinyin: "Zǎoshang de kōngqì zhēn xīnxiān", words: [
      { hanzi: "空气", pinyin: "kōngqì", english: "воздух" },
      { hanzi: "新鲜", pinyin: "xīnxiān", english: "свежий" },
    ], breakdown: "真 + прилагательное для эмоциональной оценки." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// CHAPTER 26 — 快考试了 (future: 快...了, 只好, 可能)
// ═══════════════════════════════════════════════════════════════════
const ch26 = [
  { id: 26101, type: "flashcard", mandarin: { hanzi: "考试", pinyin: "Kǎoshì" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "экзамен", hanzi: "考试", pinyin: "kǎoshì" },
    { id: 2, english: "задание", hanzi: "作业", pinyin: "zuòyè" },
    { id: 3, english: "диктант", hanzi: "听写", pinyin: "tīngxiě" },
    { id: 4, english: "тест", hanzi: "测试", pinyin: "cèshì" },
  ], correctOptionId: 1 },
  { id: 26102, type: "flashcard", mandarin: { hanzi: "放假", pinyin: "Fàng jià" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "уйти в отпуск / на каникулы", hanzi: "放假", pinyin: "fàng jià" },
    { id: 2, english: "работать", hanzi: "工作", pinyin: "gōngzuò" },
    { id: 3, english: "просить отпуск", hanzi: "请假", pinyin: "qǐng jià" },
    { id: 4, english: "выходные", hanzi: "周末", pinyin: "zhōumò" },
  ], correctOptionId: 1 },
  { id: 26103, type: "flashcard", mandarin: { hanzi: "可能", pinyin: "Kěnéng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "обязательно", hanzi: "一定", pinyin: "yídìng" },
    { id: 2, english: "возможно, может быть", hanzi: "可能", pinyin: "kěnéng" },
    { id: 3, english: "конечно", hanzi: "当然", pinyin: "dāngrán" },
    { id: 4, english: "трудно", hanzi: "难", pinyin: "nán" },
  ], correctOptionId: 2 },
  { id: 26104, type: "flashcard", mandarin: { hanzi: "只好", pinyin: "Zhǐhǎo" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "лучше бы", hanzi: "最好", pinyin: "zuìhǎo" },
    { id: 2, english: "приходится, только и остаётся", hanzi: "只好", pinyin: "zhǐhǎo" },
    { id: 3, english: "только", hanzi: "只", pinyin: "zhǐ" },
    { id: 4, english: "хорошо", hanzi: "好", pinyin: "hǎo" },
  ], correctOptionId: 2 },
  { id: 26105, type: "flashcard", mandarin: { hanzi: "旅行", pinyin: "Lǚxíng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "путешествовать", hanzi: "旅行", pinyin: "lǚxíng" },
    { id: 2, english: "идти", hanzi: "去", pinyin: "qù" },
    { id: 3, english: "летать", hanzi: "飞", pinyin: "fēi" },
    { id: 4, english: "уезжать", hanzi: "走", pinyin: "zǒu" },
  ], correctOptionId: 1 },
  { id: 26106, type: "flashcard", mandarin: { hanzi: "决定", pinyin: "Juédìng" }, instruction: "Что значит это слово?", options: [
    { id: 1, english: "решить", hanzi: "决定", pinyin: "juédìng" },
    { id: 2, english: "думать", hanzi: "想", pinyin: "xiǎng" },
    { id: 3, english: "планировать", hanzi: "打算", pinyin: "dǎsuàn" },
    { id: 4, english: "согласиться", hanzi: "同意", pinyin: "tóngyì" },
  ], correctOptionId: 1 },
  { id: 26107, type: "fill_blank", sentence: "___考试了。", sentencePinyin: "___ kǎoshì le.", blankedWord: "快", correctAnswer: "快", hint: "«скоро» (вот-вот)", instruction: "Вставь пропущенное слово: «Скоро экзамен.»", options: [
    { id: 1, hanzi: "快", pinyin: "kuài" },
    { id: 2, hanzi: "早", pinyin: "zǎo" },
    { id: 3, hanzi: "晚", pinyin: "wǎn" },
    { id: 4, hanzi: "就", pinyin: "jiù" },
  ] },
  { id: 26108, type: "fill_blank", sentence: "我基础不好，___努力学习了。", sentencePinyin: "Wǒ jīchǔ bù hǎo, ___ nǔlì xuéxí le.", blankedWord: "只好", correctAnswer: "只好", hint: "«приходится»", instruction: "Вставь пропущенное слово: «База слабая, приходится упорно учиться.»", options: [
    { id: 1, hanzi: "只好", pinyin: "zhǐhǎo" },
    { id: 2, hanzi: "最好", pinyin: "zuìhǎo" },
    { id: 3, hanzi: "当然", pinyin: "dāngrán" },
    { id: 4, hanzi: "可能", pinyin: "kěnéng" },
  ] },
  { id: 26109, type: "fill_blank", sentence: "还没决定，___去东北。", sentencePinyin: "Hái méi juédìng, ___ qù Dōngběi.", blankedWord: "可能", correctAnswer: "可能", hint: "«возможно»", instruction: "Вставь пропущенное слово: «Ещё не решил, возможно, на северо-восток.»", options: [
    { id: 1, hanzi: "可能", pinyin: "kěnéng" },
    { id: 2, hanzi: "一定", pinyin: "yídìng" },
    { id: 3, hanzi: "必须", pinyin: "bìxū" },
    { id: 4, hanzi: "最", pinyin: "zuì" },
  ] },
  { id: 26110, type: "fill_blank", sentence: "快要___了。", sentencePinyin: "Kuàiyào ___ le.", blankedWord: "放假", correctAnswer: "放假", hint: "глагол «уйти на каникулы»", instruction: "Вставь пропущенное слово: «Вот-вот каникулы.»", options: [
    { id: 1, hanzi: "放假", pinyin: "fàng jià" },
    { id: 2, hanzi: "请假", pinyin: "qǐng jià" },
    { id: 3, hanzi: "工作", pinyin: "gōngzuò" },
    { id: 4, hanzi: "考试", pinyin: "kǎoshì" },
  ] },
  { id: 26111, type: "multiple_choice", mandarin: { hanzi: "你真用功！", pinyin: "Nǐ zhēn yònggōng!" }, instruction: "«Как ты усердна!» Скоро экзамен, база слабая — приходится. Как объяснить?", options: [
    { id: 1, english: "快考试了，我基础不好，只好努力学习了。", mandarin: { hanzi: "快考试了，我基础不好，只好努力学习了", pinyin: "Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le", words: [{ hanzi: "基础", pinyin: "jīchǔ", english: "база" }, { hanzi: "只好", pinyin: "zhǐhǎo", english: "приходится" }], breakdown: "Причина + вынужденный результат." } },
    { id: 2, english: "我不用功。", mandarin: { hanzi: "我不用功", pinyin: "Wǒ bú yònggōng", words: [], breakdown: "Отрицание факта." } },
    { id: 3, english: "没有考试。", mandarin: { hanzi: "没有考试", pinyin: "Méiyǒu kǎoshì", words: [], breakdown: "«Нет экзамена» — неверно." } },
    { id: 4, english: "快放假。", mandarin: { hanzi: "快放假", pinyin: "Kuài fàng jià", words: [], breakdown: "Без 了 — неполно." } },
  ], correctOptionId: 1 },
  { id: 26112, type: "multiple_choice", mandarin: { hanzi: "假期去旅行吗？", pinyin: "Jiàqī qù lǚxíng ma?" }, instruction: "«На каникулах в путешествие?» Ещё не решили, может на северо-восток. Как?", options: [
    { id: 1, english: "还没决定，可能去东北。", mandarin: { hanzi: "还没决定，可能去东北", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi", words: [{ hanzi: "决定", pinyin: "juédìng", english: "решить" }, { hanzi: "东北", pinyin: "Dōngběi", english: "Северо-Восток" }], breakdown: "Неопределённость + предположение с 可能." } },
    { id: 2, english: "不去旅行。", mandarin: { hanzi: "不去旅行", pinyin: "Bú qù lǚxíng", words: [], breakdown: "«Не поеду» — противоречит." } },
    { id: 3, english: "可能不去。", mandarin: { hanzi: "可能不去", pinyin: "Kěnéng bú qù", words: [], breakdown: "«Может, не поеду» — но ты хочешь поехать." } },
    { id: 4, english: "东北没有。", mandarin: { hanzi: "东北没有", pinyin: "Dōngběi méiyǒu", words: [], breakdown: "«Северо-Востока нет» — бессмыслица." } },
  ], correctOptionId: 1 },
  { id: 26113, type: "multiple_choice", mandarin: { hanzi: "为什么在写明信片？", pinyin: "Wèi shénme zài xiě míngxìnpiàn?" }, instruction: "«Почему пишешь открытки?» Рождество и Новый год. Как?", options: [
    { id: 1, english: "圣诞节快到了，新年也要来了。", mandarin: { hanzi: "圣诞节快到了，新年也要来了", pinyin: "Shèngdàn Jié kuài dào le, xīnnián yě yào lái le", words: [{ hanzi: "圣诞节", pinyin: "Shèngdàn Jié", english: "Рождество" }, { hanzi: "新年", pinyin: "xīnnián", english: "Новый год" }], breakdown: "Две конструкции «скоро»: 快...了 + 要...了." } },
    { id: 2, english: "我没写。", mandarin: { hanzi: "我没写", pinyin: "Wǒ méi xiě", words: [], breakdown: "«Не пишу» — противоречит." } },
    { id: 3, english: "明信片贵。", mandarin: { hanzi: "明信片贵", pinyin: "Míngxìnpiàn guì", words: [], breakdown: "Не отвечает на «почему»." } },
    { id: 4, english: "圣诞节过了。", mandarin: { hanzi: "圣诞节过了", pinyin: "Shèngdàn Jié guò le", words: [], breakdown: "«Рождество прошло» — неверно." } },
  ], correctOptionId: 1 },
  { id: 26114, type: "listening_mc", mandarin: { hanzi: "快考试了", pinyin: "Kuài kǎoshì le", words: [{ hanzi: "快...了", pinyin: "kuài...le", english: "скоро" }], breakdown: "Конструкция «вот-вот»." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Скоро экзамен — 快考试了" },
    { id: 2, english: "Экзамен закончился — 考试完了" },
    { id: 3, english: "Быстрый экзамен — 很快的考试" },
    { id: 4, english: "Не экзамен — 不是考试" },
  ], correctOptionId: 1 },
  { id: 26115, type: "listening_mc", mandarin: { hanzi: "可能去东北", pinyin: "Kěnéng qù Dōngběi", words: [{ hanzi: "可能", pinyin: "kěnéng", english: "возможно" }, { hanzi: "东北", pinyin: "Dōngběi", english: "Северо-Восток" }], breakdown: "Предположение с 可能." }, instruction: "Послушай и выбери перевод", options: [
    { id: 1, english: "Возможно, поедем на северо-восток — 可能去东北" },
    { id: 2, english: "Точно на запад — 一定去西" },
    { id: 3, english: "Не на север — 不去北边" },
    { id: 4, english: "Северо-восток далеко — 东北很远" },
  ], correctOptionId: 1 },
  { id: 26116, type: "grammar", rule: {
    title: "快……了 / 要……了 / 快要……了 — «скоро»",
    explanation: "Все три означают «вот-вот, скоро».\n\nСхемы:\n• 快 + V/прил. + 了\n• 要 + V/прил. + 了\n• 快要 + V/прил. + 了\n\n快考试了。— Скоро экзамен.\n快要放假了。— Вот-вот каникулы.\n新年要来了。— Новый год приближается.\n\n❗ 了 в конце обязательно.",
    examples: [
      { hanzi: "圣诞节快到了。", pinyin: "Shèngdàn Jié kuài dào le.", english: "Скоро Рождество." },
      { hanzi: "新年要来了。", pinyin: "Xīnnián yào lái le.", english: "Приближается Новый год." },
    ],
  }, practice: [
    { question: "Как сказать «Скоро каникулы»?", options: [
      { id: 1, text: "快放假" },
      { id: 2, text: "快要放假了" },
      { id: 3, text: "放假快了" },
      { id: 4, text: "了快放假" },
    ], correctOptionId: 2 },
    { question: "Что обязательно в конце?", options: [
      { id: 1, text: "吗" },
      { id: 2, text: "了" },
      { id: 3, text: "呢" },
      { id: 4, text: "吧" },
    ], correctOptionId: 2 },
  ] },
  { id: 26117, type: "grammar", rule: {
    title: "只好 — «приходится, ничего не остаётся»",
    explanation: "只好 (zhǐhǎo) = «волей-неволей, только и остаётся».\n\nСхема: (Подл.+) 只好 + Глагол\n\n我基础不好，只好努力学习了。\n«Слабая база — приходится упорно учиться.»\n\nЧасто с 了 в конце для усиления вынужденности.",
    examples: [
      { hanzi: "下雨了，只好在家。", pinyin: "Xià yǔ le, zhǐhǎo zài jiā.", english: "Дождь — приходится дома." },
      { hanzi: "没有饺子，只好吃面条儿。", pinyin: "Méiyǒu jiǎozi, zhǐhǎo chī miàntiáor.", english: "Пельменей нет — придётся лапшу." },
    ],
  }, practice: [
    { question: "Какой смысл у 只好?", options: [
      { id: 1, text: "Желание" },
      { id: 2, text: "Вынужденно, приходится" },
      { id: 3, text: "С радостью" },
      { id: 4, text: "Лучшее" },
    ], correctOptionId: 2 },
    { question: "Как сказать «Он не пришёл, пришлось мне ждать»?", options: [
      { id: 1, text: "他没来，只好我等" },
      { id: 2, text: "他没来，我只好等" },
      { id: 3, text: "只好他没来我等" },
      { id: 4, text: "我等他没来只好" },
    ], correctOptionId: 2 },
  ] },
  { id: 26118, type: "match_pairs", instruction: "Соедини слова с переводом", pairs: [
    { id: 1, left: "考试", leftPinyin: "kǎoshì", right: "экзамен" },
    { id: 2, left: "放假", leftPinyin: "fàng jià", right: "каникулы" },
    { id: 3, left: "可能", leftPinyin: "kěnéng", right: "возможно" },
    { id: 4, left: "只好", leftPinyin: "zhǐhǎo", right: "приходится" },
    { id: 5, left: "旅行", leftPinyin: "lǚxíng", right: "путешествовать" },
    { id: 6, left: "决定", leftPinyin: "juédìng", right: "решить" },
    { id: 7, left: "圣诞节", leftPinyin: "Shèngdàn Jié", right: "Рождество" },
    { id: 8, left: "邮局", leftPinyin: "yóujú", right: "почта" },
  ] },
  { id: 26119, type: "single_response", mandarin: { hanzi: "快考试了，我只好努力学习了。", pinyin: "Kuài kǎoshì le, wǒ zhǐhǎo nǔlì xuéxí le." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Скоро экзамен — приходится упорно учиться.", mandarin: { hanzi: "快考试了，我只好努力学习了", pinyin: "Kuài kǎoshì le, wǒ zhǐhǎo nǔlì xuéxí le", words: [
      { hanzi: "快...了", pinyin: "kuài...le", english: "скоро" },
      { hanzi: "只好", pinyin: "zhǐhǎo", english: "приходится" },
    ], breakdown: "Причина (скоро) + следствие (приходится)." } },
  ] },
  { id: 26120, type: "single_response", mandarin: { hanzi: "还没决定，可能去东北。", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi." }, instruction: "Прочти вслух фразу", options: [
    { id: 1, english: "Ещё не решил, возможно поеду на северо-восток.", mandarin: { hanzi: "还没决定，可能去东北", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi", words: [
      { hanzi: "决定", pinyin: "juédìng", english: "решить" },
      { hanzi: "可能", pinyin: "kěnéng", english: "возможно" },
    ], breakdown: "还没 + глагол + 可能 + предположение." } },
  ] },
];

// ═══════════════════════════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════════════════════════
const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
for (const [num, questions] of [[24, ch24], [25, ch25], [26, ch26]]) {
  const chapter = data.chapters.find((c) => c.id === num);
  chapter.lessons[0].questions = questions;
  const counts = {};
  questions.forEach((q) => { counts[q.type] = (counts[q.type] || 0) + 1; });
  console.log(`Chapter ${num}: ${questions.length} exercises`, counts);
}
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
