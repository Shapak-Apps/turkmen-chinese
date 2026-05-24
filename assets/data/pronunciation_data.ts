// Chapter 0: 语音 Pronunciation — initials, finals, tones (standard Mandarin)

export interface PinyinCell {
  pinyin: string;
  audio: string; // filename without .mp3, e.g. "ba1"
}

export interface InitialGroup {
  name: string;
  nameEn: string;
  initials: { initial: string; demo: string; audio: string }[];
}

export interface FinalGroup {
  name: string;
  nameEn: string;
  finals: { final: string; audio: string }[];
}

export interface ToneExample {
  tone: string;
  description: string;
  pinyin: string;
  hanzi: string;
  meaning: string;
  audio: string;
  pitch: string;
}

export interface SoundChangeRule {
  title: string;
  explanation: string;
  examples: { pinyin: string; hanzi: string; meaning: string; audio: string }[];
}

export interface DailyPhrase {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface StrokeItem {
  stroke: string;
  name: string;
  pinyin: string;
}

export interface SpellingRule {
  rule: string;
  explanation: string;
}

// ============================================================
// SECTION 1: Introduction
// ============================================================
export const INTRO_TEXT =
  "Китайский слог состоит из трёх частей:\n\n" +
  "声母 (shēngmǔ) — инициаль (начальный согласный)\n" +
  "韵母 (yùnmǔ) — финаль (гласная часть)\n" +
  "声调 (shēngdiào) — тон\n\n" +
  "Инициаль + Финаль + Тон = Слог\n\n" +
  "Например: b + a + 4-й тон = bà (папа)\n\n" +
  "В китайском 21 инициаль и 38 финалей. Их комбинации образуют около 400 слогов, а с 4 тонами — более 1600 вариантов.";

// ============================================================
// SECTION 2: 21 Initials (声母)
// ============================================================
export const INITIALS: InitialGroup[] = [
  {
    name: "双唇音", nameEn: "Bilabial",
    initials: [
      { initial: "b", demo: "bō", audio: "bo1" },
      { initial: "p", demo: "pō", audio: "po1" },
      { initial: "m", demo: "mō", audio: "mo1" },
    ],
  },
  {
    name: "唇齿音", nameEn: "Labiodental",
    initials: [
      { initial: "f", demo: "fō", audio: "fo1" },
    ],
  },
  {
    name: "舌尖前音", nameEn: "Alveolar (blade)",
    initials: [
      { initial: "z", demo: "zī", audio: "zi1" },
      { initial: "c", demo: "cī", audio: "ci1" },
      { initial: "s", demo: "sī", audio: "si1" },
    ],
  },
  {
    name: "舌尖中音", nameEn: "Alveolar (tip)",
    initials: [
      { initial: "d", demo: "dē", audio: "de1" },
      { initial: "t", demo: "tē", audio: "te1" },
      { initial: "n", demo: "nē", audio: "ne1" },
      { initial: "l", demo: "lē", audio: "le1" },
    ],
  },
  {
    name: "舌尖后音", nameEn: "Retroflex",
    initials: [
      { initial: "zh", demo: "zhī", audio: "zhi1" },
      { initial: "ch", demo: "chī", audio: "chi1" },
      { initial: "sh", demo: "shī", audio: "shi1" },
      { initial: "r", demo: "rì", audio: "ri4" },
    ],
  },
  {
    name: "舌面音", nameEn: "Palatal",
    initials: [
      { initial: "j", demo: "jī", audio: "ji1" },
      { initial: "q", demo: "qī", audio: "qi1" },
      { initial: "x", demo: "xī", audio: "xi1" },
    ],
  },
  {
    name: "舌根音", nameEn: "Velar",
    initials: [
      { initial: "g", demo: "gē", audio: "ge1" },
      { initial: "k", demo: "kē", audio: "ke1" },
      { initial: "h", demo: "hē", audio: "he1" },
    ],
  },
];

// ============================================================
// SECTION 3: 38 Finals (韵母)
// ============================================================
export const FINALS: FinalGroup[] = [
  {
    name: "单韵母", nameEn: "Simple Finals",
    finals: [
      { final: "a", audio: "a1" },
      { final: "o", audio: "o1" },
      { final: "e", audio: "e1" },
      { final: "i", audio: "yi1" },
      { final: "u", audio: "wu1" },
      { final: "ü", audio: "lv4" },
    ],
  },
  {
    name: "复韵母", nameEn: "Compound Finals",
    finals: [
      { final: "ai", audio: "ai1" },
      { final: "ao", audio: "ao1" },
      { final: "ou", audio: "ou1" },
      { final: "ei", audio: "ei1" },
      { final: "ia", audio: "ya1" },
      { final: "ie", audio: "ye1" },
      { final: "iao", audio: "yao1" },
      { final: "iou(iu)", audio: "you1" },
      { final: "ua", audio: "wa1" },
      { final: "uo", audio: "wo1" },
      { final: "uai", audio: "wai1" },
      { final: "uei(ui)", audio: "wei1" },
      { final: "üe", audio: "yue1" },
    ],
  },
  {
    name: "鼻韵母", nameEn: "Nasal Finals",
    finals: [
      { final: "an", audio: "an1" },
      { final: "en", audio: "en1" },
      { final: "in", audio: "yin1" },
      { final: "ian", audio: "yan1" },
      { final: "uan", audio: "wan1" },
      { final: "uen(un)", audio: "wen1" },
      { final: "üan", audio: "yuan1" },
      { final: "ang", audio: "ang1" },
      { final: "eng", audio: "eng1" },
      { final: "ing", audio: "ying1" },
      { final: "iang", audio: "yang1" },
      { final: "iong", audio: "yong1" },
      { final: "uang", audio: "wang1" },
      { final: "ong", audio: "dong1" },
      { final: "ueng", audio: "weng1" },
      { final: "tion", audio: "dun1" },
      { final: "uan", audio: "wan1" },
      { final: "üan", audio: "yuan1" },
    ],
  },
];

// Remove duplicates from nasal finals — clean version
export const FINALS_CLEAN: FinalGroup[] = [
  {
    name: "单韵母", nameEn: "Simple Finals (6)",
    finals: [
      { final: "a", audio: "a1" },
      { final: "o", audio: "o1" },
      { final: "e", audio: "e1" },
      { final: "i", audio: "yi1" },
      { final: "u", audio: "wu1" },
      { final: "ü", audio: "lv4" },
    ],
  },
  {
    name: "复韵母", nameEn: "Compound Finals (13)",
    finals: [
      { final: "ai", audio: "ai1" },
      { final: "ao", audio: "ao1" },
      { final: "ou", audio: "ou1" },
      { final: "ei", audio: "ei1" },
      { final: "ia", audio: "ya1" },
      { final: "ie", audio: "ye1" },
      { final: "iao", audio: "yao1" },
      { final: "iou (iu)", audio: "you1" },
      { final: "ua", audio: "wa1" },
      { final: "uo", audio: "wo1" },
      { final: "uai", audio: "wai1" },
      { final: "uei (ui)", audio: "wei1" },
      { final: "üe", audio: "yue1" },
    ],
  },
  {
    name: "鼻韵母", nameEn: "Nasal Finals (19)",
    finals: [
      { final: "an", audio: "an1" },
      { final: "en", audio: "en1" },
      { final: "in", audio: "yin1" },
      { final: "ian", audio: "yan1" },
      { final: "uan", audio: "wan1" },
      { final: "uen (un)", audio: "wen1" },
      { final: "üan", audio: "yuan1" },
      { final: "ang", audio: "ang1" },
      { final: "eng", audio: "eng1" },
      { final: "ing", audio: "ying1" },
      { final: "iang", audio: "yang1" },
      { final: "iong", audio: "yong1" },
      { final: "uang", audio: "wang1" },
      { final: "ong", audio: "dong1" },
      { final: "ueng", audio: "weng1" },
    ],
  },
];

// ============================================================
// SECTION 4: 4 Tones (声调)
// ============================================================
export const TONES: ToneExample[] = [
  { tone: "1", description: "Ровный высокий", pinyin: "mā", hanzi: "妈", meaning: "мама", audio: "ma1", pitch: "55" },
  { tone: "2", description: "Восходящий", pinyin: "má", hanzi: "麻", meaning: "конопля", audio: "ma2", pitch: "35" },
  { tone: "3", description: "Нисх.-восходящий", pinyin: "mǎ", hanzi: "马", meaning: "лошадь", audio: "ma3", pitch: "214" },
  { tone: "4", description: "Нисходящий", pinyin: "mà", hanzi: "骂", meaning: "ругать", audio: "ma4", pitch: "51" },
];

export const TONES_DESCRIPTION =
  "В китайском языке 4 основных тона. Один и тот же слог с разными тонами — это разные слова!\n\n" +
  "1-й тон (55) — голос ровный и высокий, как будто поёте одну ноту.\n" +
  "2-й тон (35) — голос поднимается вверх, как удивлённый вопрос «Да?».\n" +
  "3-й тон (214) — голос опускается и поднимается, как задумчивое «Хм...».\n" +
  "4-й тон (51) — голос резко падает, как строгое «Нет!».";

// ============================================================
// SECTION 5: Sound Changes (音变)
// ============================================================
export const SOUND_CHANGES: SoundChangeRule[] = [
  {
    title: "Правило 3-го тона (三声变调)",
    explanation:
      "Когда два 3-х тона идут подряд, первый меняется на 2-й тон.\nНа письме тон не меняется — только при произношении.",
    examples: [
      { pinyin: "nǐ hǎo → ní hǎo", hanzi: "你好", meaning: "привет", audio: "ni3" },
      { pinyin: "shǒubiǎo → shóubiǎo", hanzi: "手表", meaning: "часы", audio: "shou3" },
      { pinyin: "lǎohǔ → láohǔ", hanzi: "老虎", meaning: "тигр", audio: "lao3" },
    ],
  },
  {
    title: "Изменение тона 一 (yī)",
    explanation:
      "一 (один) обычно произносится yī (1-й тон).\n" +
      "Перед 4-м тоном → yí (2-й тон).\n" +
      "Перед 1-м, 2-м, 3-м тоном → yì (4-й тон).",
    examples: [
      { pinyin: "yī tiān", hanzi: "一天", meaning: "один день", audio: "yi1" },
      { pinyin: "yì nián", hanzi: "一年", meaning: "один год", audio: "yi4" },
      { pinyin: "yí bĕn", hanzi: "一本", meaning: "одна (книга)", audio: "yi2" },
      { pinyin: "yí gè", hanzi: "一个", meaning: "один (штука)", audio: "yi2" },
    ],
  },
  {
    title: "Изменение тона 不 (bù)",
    explanation:
      "不 (не) обычно произносится bù (4-й тон).\n" +
      "Перед 4-м тоном → bú (2-й тон).",
    examples: [
      { pinyin: "bù tīng", hanzi: "不听", meaning: "не слушать", audio: "bu4" },
      { pinyin: "bù xué", hanzi: "不学", meaning: "не учить", audio: "bu4" },
      { pinyin: "bú shì", hanzi: "不是", meaning: "не является", audio: "bu2" },
      { pinyin: "bú qù", hanzi: "不去", meaning: "не идти", audio: "bu2" },
    ],
  },
  {
    title: "Нейтральный тон (轻声)",
    explanation:
      "Некоторые слоги произносятся коротко и легко, без выраженного тона. Это нейтральный (лёгкий) тон.",
    examples: [
      { pinyin: "māma", hanzi: "妈妈", meaning: "мама", audio: "ma1" },
      { pinyin: "wǒmen", hanzi: "我们", meaning: "мы", audio: "wo3" },
      { pinyin: "péngyou", hanzi: "朋友", meaning: "друг", audio: "peng2" },
      { pinyin: "gēge", hanzi: "哥哥", meaning: "старший брат", audio: "ge1" },
    ],
  },
  {
    title: "Эризация (儿化)",
    explanation:
      "Добавление звука «r» в конце слога — характерная черта пекинского произношения.",
    examples: [
      { pinyin: "huà → huàr", hanzi: "画儿", meaning: "картинка", audio: "hua4" },
      { pinyin: "cuò → cuòr", hanzi: "错儿", meaning: "ошибка", audio: "cuo4" },
      { pinyin: "xìn → xìnr", hanzi: "信儿", meaning: "сообщение", audio: "xin4" },
    ],
  },
];

// ============================================================
// SECTION 6: Spelling Rules (拼写规则)
// ============================================================
export const SPELLING_RULES: SpellingRule[] = [
  {
    rule: "ü → yu",
    explanation: "Если перед финалью ü нет инициали, добавляем y и убираем точки: ü → yu.",
  },
  {
    rule: "i → yi",
    explanation: "Если перед финалью i нет инициали, добавляем y: i → yi.",
  },
  {
    rule: "i... → y...",
    explanation: "Финали, начинающиеся на i (ia, ie, iao...), без инициали: i меняем на y (ya, ye, yao...).",
  },
  {
    rule: "u → wu",
    explanation: "Если перед финалью u нет инициали, добавляем w: u → wu.",
  },
  {
    rule: "u... → w...",
    explanation: "Финали, начинающиеся на u (ua, uo, uai...), без инициали: u меняем на w (wa, wo, wai...).",
  },
  {
    rule: "j, q, x + ü → ju, qu, xu",
    explanation: "После j, q, x точки над ü убираются: jü → ju, qü → qu, xü → xu.",
  },
  {
    rule: "iou → iu, uei → ui, uen → un",
    explanation: "С инициалью iou сокращается до iu, uei до ui, uen до un: liou → liu, guei → gui, luen → lun.",
  },
];

export const SPELLING_TONE_RULES =
  "Знак тона ставится на главную гласную (ту, что произносится громче и с самым открытым ртом).\n\n" +
  "Приоритет: a > o > e > i > u > ü\n\n" +
  "Если в слоге только одна гласная — тон ставится на неё.\n" +
  "Если гласных две — тон на ту, что выше в приоритете.\n" +
  "Исключение: u и i рядом — тон на вторую (liú, guì).";

// ============================================================
// SECTION 7: Daily Expressions (日常用语)
// ============================================================
export const DAILY_EXPRESSIONS: DailyPhrase[] = [
  { hanzi: "你好。", pinyin: "Nǐ hǎo.", meaning: "Привет. / Как дела?" },
  { hanzi: "早上好。", pinyin: "Zǎoshang hǎo.", meaning: "Доброе утро." },
  { hanzi: "下午好。", pinyin: "Xiàwǔ hǎo.", meaning: "Добрый день." },
  { hanzi: "晚上好。", pinyin: "Wǎnshang hǎo.", meaning: "Добрый вечер." },
  { hanzi: "晚安。", pinyin: "Wǎn'ān.", meaning: "Спокойной ночи." },
  { hanzi: "谢谢。", pinyin: "Xièxie.", meaning: "Спасибо." },
  { hanzi: "不客气。", pinyin: "Bú kèqi.", meaning: "Не за что." },
  { hanzi: "对不起。", pinyin: "Duìbuqǐ.", meaning: "Извините." },
  { hanzi: "没关系。", pinyin: "Méi guānxi.", meaning: "Ничего страшного." },
  { hanzi: "再见。", pinyin: "Zàijiàn.", meaning: "До свидания." },
  { hanzi: "明天见。", pinyin: "Míngtiān jiàn.", meaning: "До завтра." },
  { hanzi: "请进。", pinyin: "Qǐng jìn.", meaning: "Входите, пожалуйста." },
  { hanzi: "认识你很高兴。", pinyin: "Rènshi nǐ hěn gāoxìng.", meaning: "Рад(а) познакомиться." },
];

// ============================================================
// SECTION 8: Classroom Expressions (课堂用语)
// ============================================================
export const CLASSROOM_EXPRESSIONS: DailyPhrase[] = [
  { hanzi: "读生词", pinyin: "dú shēngcí", meaning: "читать новые слова" },
  { hanzi: "听", pinyin: "tīng", meaning: "слушать" },
  { hanzi: "听写", pinyin: "tīngxiě", meaning: "диктант" },
  { hanzi: "作业", pinyin: "zuòyè", meaning: "домашнее задание" },
  { hanzi: "老师", pinyin: "lǎoshī", meaning: "учитель" },
  { hanzi: "打开书", pinyin: "dǎkāi shū", meaning: "откройте книгу" },
  { hanzi: "读课文", pinyin: "dú kèwén", meaning: "читать текст урока" },
  { hanzi: "跟我读", pinyin: "gēn wǒ dú", meaning: "повторяйте за мной" },
  { hanzi: "做练习", pinyin: "zuò liànxí", meaning: "делать упражнения" },
  { hanzi: "再说一遍", pinyin: "zài shuō yí biàn", meaning: "скажите ещё раз" },
];

// ============================================================
// SECTION 9: Stroke Table (汉字笔画表)
// ============================================================
export const STROKES: StrokeItem[] = [
  { stroke: "丶", name: "点", pinyin: "diǎn" },
  { stroke: "一", name: "横", pinyin: "héng" },
  { stroke: "丨", name: "竖", pinyin: "shù" },
  { stroke: "丿", name: "撇", pinyin: "piě" },
  { stroke: "㇏", name: "捺", pinyin: "nà" },
  { stroke: "㇀", name: "提", pinyin: "tí" },
  { stroke: "丶一", name: "撇点", pinyin: "piědiǎn" },
  { stroke: "㇊", name: "竖弯", pinyin: "shùzhé" },
  { stroke: "乛", name: "横折弯", pinyin: "héngzhé" },
  { stroke: "亅", name: "弯钩", pinyin: "wāngōu" },
  { stroke: "𠃌", name: "竖钩", pinyin: "shùgōu" },
  { stroke: "乚", name: "斜钩", pinyin: "xiégōu" },
  { stroke: "⺄", name: "卧钩", pinyin: "wògōu" },
  { stroke: "㇂", name: "横钩", pinyin: "hénggōu" },
];
