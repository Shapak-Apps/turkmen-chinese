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
  "Hytaý bogny üç bölekden durýar:\n\n" +
  "声母 (shēngmǔ) — başlangyç ses (bognuň başyndaky çekimsiz)\n" +
  "韵母 (yùnmǔ) — soňky ses (bognuň çekimli bölegi)\n" +
  "声调 (shēngdiào) — ton\n\n" +
  "Başlangyç ses + Soňlangyç ses + Ton = Bogun\n\n" +
  "Meselem: b + a + 4-nji ton = bà (kaka)\n\n" +
  "Hytaý dilinde 21 başlangyç we 38 soňky ses bar. Olaryň utgaşmasy 400 töweregi bogun, 4 ton bilen bolsa 1600-den gowrak görnüş emele getirýär.";

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
  { tone: "1", description: "Tekiz, ýokary", pinyin: "mā", hanzi: "妈", meaning: "eje", audio: "ma1", pitch: "55" },
  { tone: "2", description: "Göterilýän", pinyin: "má", hanzi: "麻", meaning: "kenep", audio: "ma2", pitch: "35" },
  { tone: "3", description: "Peselip-göterilýän", pinyin: "mǎ", hanzi: "马", meaning: "at", audio: "ma3", pitch: "214" },
  { tone: "4", description: "Peselýän", pinyin: "mà", hanzi: "骂", meaning: "sögmek", audio: "ma4", pitch: "51" },
];

export const TONES_DESCRIPTION =
  "Hytaý dilinde 4 sany esasy ton bar. Şol bir bogun dürli ton bilen aýdylanda başga söz bolýar!\n\n" +
  "1-nji ton (55) — ses tekiz we ýokary, bir nota aýdyp duran ýaly.\n" +
  "2-nji ton (35) — ses ýokary galýar, geň galyp «Hä?» diýip soran ýaly.\n" +
  "3-nji ton (214) — ses aşak düşýär, soň ýokary galýar, oýlanyp «Hmm...» diýen ýaly.\n" +
  "4-nji ton (51) — ses birden aşak gaçýar, gaty «Ýok!» diýen ýaly.";

// ============================================================
// SECTION 5: Sound Changes (音变)
// ============================================================
export const SOUND_CHANGES: SoundChangeRule[] = [
  {
    title: "3-nji tonuň düzgüni (三声变调)",
    explanation:
      "Iki sany 3-nji ton yzly-yzyna gelende, birinjisi 2-nji tona öwrülýär.\nÝazuwda ton üýtgemeýär — diňe aýdylanda üýtgeýär.",
    examples: [
      { pinyin: "nǐ hǎo → ní hǎo", hanzi: "你好", meaning: "salam", audio: "ni3" },
      { pinyin: "shǒubiǎo → shóubiǎo", hanzi: "手表", meaning: "sagat", audio: "shou3" },
      { pinyin: "lǎohǔ → láohǔ", hanzi: "老虎", meaning: "gaplaň", audio: "lao3" },
    ],
  },
  {
    title: "一 (yī) tonunyň üýtgemegi",
    explanation:
      "一 (bir) adatça yī (1-nji ton) bilen aýdylýar.\n" +
      "4-nji tonuň öňünde → yí (2-nji ton).\n" +
      "1-nji, 2-nji, 3-nji tonuň öňünde → yì (4-nji ton).",
    examples: [
      { pinyin: "yī tiān", hanzi: "一天", meaning: "bir gün", audio: "yi1" },
      { pinyin: "yì nián", hanzi: "一年", meaning: "bir ýyl", audio: "yi4" },
      { pinyin: "yí bĕn", hanzi: "一本", meaning: "bir (kitap)", audio: "yi2" },
      { pinyin: "yí gè", hanzi: "一个", meaning: "bir (sany)", audio: "yi2" },
    ],
  },
  {
    title: "不 (bù) tonunyň üýtgemegi",
    explanation:
      "不 (däl) adatça bù (4-nji ton) bilen aýdylýar.\n" +
      "4-nji tonuň öňünde → bú (2-nji ton).",
    examples: [
      { pinyin: "bù tīng", hanzi: "不听", meaning: "diňlemezlik", audio: "bu4" },
      { pinyin: "bù xué", hanzi: "不学", meaning: "öwrenmezlik", audio: "bu4" },
      { pinyin: "bú shì", hanzi: "不是", meaning: "däl", audio: "bu2" },
      { pinyin: "bú qù", hanzi: "不去", meaning: "gitmezlik", audio: "bu2" },
    ],
  },
  {
    title: "Ýeňil ton (轻声)",
    explanation:
      "Käbir bogunlar gysga we ýeňil, aýdyň tonsuz aýdylýar. Bu ýeňil ton.",
    examples: [
      { pinyin: "māma", hanzi: "妈妈", meaning: "eje", audio: "ma1" },
      { pinyin: "wǒmen", hanzi: "我们", meaning: "biz", audio: "wo3" },
      { pinyin: "péngyou", hanzi: "朋友", meaning: "dost", audio: "peng2" },
      { pinyin: "gēge", hanzi: "哥哥", meaning: "aga", audio: "ge1" },
    ],
  },
  {
    title: "R-leşme (儿化)",
    explanation:
      "Bognuň soňuna «r» sesiniň goşulmagy — Pekin aýdylyşynyň häsiýetli aýratynlygy.",
    examples: [
      { pinyin: "huà → huàr", hanzi: "画儿", meaning: "surat", audio: "hua4" },
      { pinyin: "cuò → cuòr", hanzi: "错儿", meaning: "ýalňyşlyk", audio: "cuo4" },
      { pinyin: "xìn → xìnr", hanzi: "信儿", meaning: "habar", audio: "xin4" },
    ],
  },
];

// ============================================================
// SECTION 6: Spelling Rules (拼写规则)
// ============================================================
export const SPELLING_RULES: SpellingRule[] = [
  {
    rule: "ü → yu",
    explanation: "Eger ü soňky sesiniň öňünde başlangyç ses ýok bolsa, y goşulýar we nokatlar aýrylýar: ü → yu.",
  },
  {
    rule: "i → yi",
    explanation: "Eger i soňky sesiniň öňünde başlangyç ses ýok bolsa, y goşulýar: i → yi.",
  },
  {
    rule: "i... → y...",
    explanation: "i bilen başlaýan soňky sesler (ia, ie, iao...) başlangyç sessiz gelende: i → y bolýar (ya, ye, yao...).",
  },
  {
    rule: "u → wu",
    explanation: "Eger u soňky sesiniň öňünde başlangyç ses ýok bolsa, w goşulýar: u → wu.",
  },
  {
    rule: "u... → w...",
    explanation: "u bilen başlaýan soňky sesler (ua, uo, uai...) başlangyç sessiz gelende: u → w bolýar (wa, wo, wai...).",
  },
  {
    rule: "j, q, x + ü → ju, qu, xu",
    explanation: "j, q, x-den soň ü-niň üstündäki nokatlar aýrylýar: jü → ju, qü → qu, xü → xu.",
  },
  {
    rule: "iou → iu, uei → ui, uen → un",
    explanation: "Başlangyç ses bilen gelende iou → iu, uei → ui, uen → un görnüşinde gysgalýar: liou → liu, guei → gui, luen → lun.",
  },
];

export const SPELLING_TONE_RULES =
  "Ton belgisi esasy çekimliniň üstünde goýulýar (has batly we agzy has giň açyp aýdylýanyň üstünde).\n\n" +
  "Ileri tutulyş: a > o > e > i > u > ü\n\n" +
  "Bogunda diňe bir çekimli bar bolsa — ton şonuň üstünde goýulýar.\n" +
  "Iki çekimli bar bolsa — ton ileri tutulyşda ýokarda duranyň üstünde.\n" +
  "Kadadan çykma: u bilen i ýanaşyk gelse — ton ikinjisiniň üstünde (liú, guì).";

// ============================================================
// SECTION 7: Daily Expressions (日常用语)
// ============================================================
export const DAILY_EXPRESSIONS: DailyPhrase[] = [
  { hanzi: "你好。", pinyin: "Nǐ hǎo.", meaning: "Salam. / Ýagdaýlaryň nähili?" },
  { hanzi: "早上好。", pinyin: "Zǎoshang hǎo.", meaning: "Ertiriň haýyrly." },
  { hanzi: "下午好。", pinyin: "Xiàwǔ hǎo.", meaning: "Gündiziň haýyrly." },
  { hanzi: "晚上好。", pinyin: "Wǎnshang hǎo.", meaning: "Agşamyň haýyrly." },
  { hanzi: "晚安。", pinyin: "Wǎn'ān.", meaning: "Gije ýagşy." },
  { hanzi: "谢谢。", pinyin: "Xièxie.", meaning: "Sag bol." },
  { hanzi: "不客气。", pinyin: "Bú kèqi.", meaning: "Hiç zat däl." },
  { hanzi: "对不起。", pinyin: "Duìbuqǐ.", meaning: "Bagyşlaň." },
  { hanzi: "没关系。", pinyin: "Méi guānxi.", meaning: "Zyýany ýok." },
  { hanzi: "再见。", pinyin: "Zàijiàn.", meaning: "Sag boluň." },
  { hanzi: "明天见。", pinyin: "Míngtiān jiàn.", meaning: "Ertire çenli." },
  { hanzi: "请进。", pinyin: "Qǐng jìn.", meaning: "Geçiň, hoş geldiňiz." },
  { hanzi: "认识你很高兴。", pinyin: "Rènshi nǐ hěn gāoxìng.", meaning: "Tanyşanyma örän şat." },
];

// ============================================================
// SECTION 8: Classroom Expressions (课堂用语)
// ============================================================
export const CLASSROOM_EXPRESSIONS: DailyPhrase[] = [
  { hanzi: "读生词", pinyin: "dú shēngcí", meaning: "täze sözleri okamak" },
  { hanzi: "听", pinyin: "tīng", meaning: "diňlemek" },
  { hanzi: "听写", pinyin: "tīngxiě", meaning: "diktant" },
  { hanzi: "作业", pinyin: "zuòyè", meaning: "öý işi" },
  { hanzi: "老师", pinyin: "lǎoshī", meaning: "mugallym" },
  { hanzi: "打开书", pinyin: "dǎkāi shū", meaning: "kitaby açyň" },
  { hanzi: "读课文", pinyin: "dú kèwén", meaning: "sapagyň tekstini okamak" },
  { hanzi: "跟我读", pinyin: "gēn wǒ dú", meaning: "meniň yzymdan gaýtalaň" },
  { hanzi: "做练习", pinyin: "zuò liànxí", meaning: "gönükme etmek" },
  { hanzi: "再说一遍", pinyin: "zài shuō yí biàn", meaning: "ýene bir gezek aýdyň" },
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
  { stroke: "㇊", name: "竖弯", pinyin: "shùwān" },
  { stroke: "乛", name: "横折弯", pinyin: "héngzhéwān" },
  { stroke: "亅", name: "弯钩", pinyin: "wāngōu" },
  { stroke: "𠃌", name: "竖钩", pinyin: "shùgōu" },
  { stroke: "乚", name: "斜钩", pinyin: "xiégōu" },
  { stroke: "⺄", name: "卧钩", pinyin: "wògōu" },
  { stroke: "㇂", name: "横钩", pinyin: "hénggōu" },
];
