// Theory content for each chapter
// Chapter 1: 你好 — Hello (Pinyin, tones, greetings)

export interface TheoryWord {
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface GrammarExample {
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface TheoryGrammar {
  title: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface DialogueLine {
  speaker: string;
  hanzi: string;
  pinyin: string;
  translation: string;
}

export interface TheoryChapter {
  introduction: string;
  vocabulary: TheoryWord[];
  grammar: TheoryGrammar[];
  dialogues: { title: string; lines: DialogueLine[] }[];
  tips: string[];
}

export const THEORY_DATA: Record<number, TheoryChapter> = {
  1: {
    introduction:
      "В этой главе вы научитесь здороваться, представляться и вести простейший разговор по-китайски. Главное грамматическое правило — предложения с глаголом 是 (shì — быть) и вопросы с частицей 吗 (ma).\n\n" +
      "Персонажи: 阿曼 (Āmàn) — туркменский студент, который только приехал учиться в Пекин, 张伟 (Zhāng Wěi) — китайский одногруппник, 李老师 (Lǐ lǎoshī) — преподавательница китайского языка.",

    vocabulary: [
      { hanzi: "你好", pinyin: "nǐ hǎo", translation: "привет, здравствуйте" },
      { hanzi: "好", pinyin: "hǎo", translation: "хороший, хорошо" },
      { hanzi: "你", pinyin: "nǐ", translation: "ты" },
      { hanzi: "是", pinyin: "shì", translation: "быть; да" },
      { hanzi: "老师", pinyin: "lǎoshī", translation: "учитель, преподаватель" },
      { hanzi: "吗", pinyin: "ma", translation: "вопросительная частица" },
      { hanzi: "不", pinyin: "bù", translation: "не, нет" },
      { hanzi: "我", pinyin: "wǒ", translation: "я" },
      { hanzi: "学生", pinyin: "xuésheng", translation: "студент, ученик" },
      { hanzi: "她", pinyin: "tā", translation: "она" },
      { hanzi: "谢谢", pinyin: "xièxie", translation: "спасибо" },
      { hanzi: "不客气", pinyin: "bú kèqi", translation: "не за что, пожалуйста" },
      { hanzi: "您", pinyin: "nín", translation: "Вы (вежливая форма)" },
      { hanzi: "留学生", pinyin: "liúxuéshēng", translation: "иностранный студент" },
      { hanzi: "叫", pinyin: "jiào", translation: "звать, называться" },
      { hanzi: "什么", pinyin: "shénme", translation: "что, какой" },
      { hanzi: "名字", pinyin: "míngzi", translation: "имя" },
    ],

    grammar: [
      {
        title: "«是» 字句 — Предложения с 是",
        explanation:
          "是 (shì) — глагол «быть». Это главный глагол для предложений типа «я — студент», «она — учитель».\n\n" +
          "Утверждение:  Подлежащее + 是 + Существительное\n" +
          "Отрицание:  Подлежащее + 不 + 是 + Существительное\n" +
          "Вопрос:  Подлежащее + 是 + Существительное + 吗？\n\n" +
          "Обратите внимание: в отрицании 不是 произносится «bú shì» (不 меняет тон перед 4-м тоном).",
        examples: [
          { hanzi: "我是老师。", pinyin: "Wǒ shì lǎoshī.", translation: "Я — учитель." },
          { hanzi: "她是学生。", pinyin: "Tā shì xuésheng.", translation: "Она — студентка." },
          { hanzi: "我不是老师。", pinyin: "Wǒ bú shì lǎoshī.", translation: "Я не учитель." },
          { hanzi: "我不是留学生。", pinyin: "Wǒ bú shì liúxuéshēng.", translation: "Я не иностранный студент." },
          { hanzi: "你是老师吗？", pinyin: "Nǐ shì lǎoshī ma?", translation: "Ты учитель?" },
          { hanzi: "阿曼是留学生吗？", pinyin: "Āmàn shì liúxuéshēng ma?", translation: "Аман — иностранный студент?" },
        ],
      },
      {
        title: "用「吗」的疑问句 — Вопросы с частицей 吗",
        explanation:
          "Чтобы превратить утверждение в вопрос «да/нет», просто добавьте 吗 в конец предложения. Порядок слов не меняется!\n\n" +
          "Утверждение → Вопрос:\n" +
          "你好。→ 你好吗？\n" +
          "他是老师。→ 他是老师吗？\n\n" +
          "Это самый простой способ задать вопрос в китайском языке.",
        examples: [
          { hanzi: "你好吗？", pinyin: "Nǐ hǎo ma?", translation: "Как дела? (букв. «Ты хорошо?»)" },
          { hanzi: "阿曼是留学生吗？", pinyin: "Āmàn shì liúxuéshēng ma?", translation: "Аман — иностранный студент?" },
          { hanzi: "她不是老师吗？", pinyin: "Tā bú shì lǎoshī ma?", translation: "Она разве не учитель?" },
          { hanzi: "他叫张伟吗？", pinyin: "Tā jiào Zhāng Wěi ma?", translation: "Его зовут Чжан Вэй?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Знакомство в общежитии (阿曼 и 张伟)",
        lines: [
          { speaker: "A", hanzi: "你好！我叫阿曼。", pinyin: "Nǐ hǎo! Wǒ jiào Āmàn.", translation: "Привет! Меня зовут Аман." },
          { speaker: "B", hanzi: "你好，阿曼！", pinyin: "Nǐ hǎo, Āmàn!", translation: "Привет, Аман!" },
          { speaker: "A", hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", translation: "Как тебя зовут?" },
          { speaker: "B", hanzi: "我叫张伟。", pinyin: "Wǒ jiào Zhāng Wěi.", translation: "Меня зовут Чжан Вэй." },
          { speaker: "A", hanzi: "你是学生吗？", pinyin: "Nǐ shì xuésheng ma?", translation: "Ты студент?" },
          { speaker: "B", hanzi: "是，我是学生。", pinyin: "Shì, wǒ shì xuésheng.", translation: "Да, я студент." },
          { speaker: "A", hanzi: "我是留学生。谢谢！", pinyin: "Wǒ shì liúxuéshēng. Xièxie!", translation: "А я иностранный студент. Спасибо!" },
          { speaker: "B", hanzi: "不客气。", pinyin: "Bú kèqi.", translation: "Не за что." },
        ],
      },
      {
        title: "На первом уроке (阿曼 и 李老师)",
        lines: [
          { speaker: "A", hanzi: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", translation: "Здравствуйте, учитель!" },
          { speaker: "B", hanzi: "你好！你叫什么名字？", pinyin: "Nǐ hǎo! Nǐ jiào shénme míngzi?", translation: "Здравствуй! Как тебя зовут?" },
          { speaker: "A", hanzi: "我叫阿曼。我是留学生。", pinyin: "Wǒ jiào Āmàn. Wǒ shì liúxuéshēng.", translation: "Меня зовут Аман. Я иностранный студент." },
          { speaker: "B", hanzi: "阿曼，你好。", pinyin: "Āmàn, nǐ hǎo.", translation: "Аман, здравствуй." },
          { speaker: "A", hanzi: "老师，谢谢您！", pinyin: "Lǎoshī, xièxie nín!", translation: "Учитель, спасибо вам!" },
          { speaker: "B", hanzi: "不客气。", pinyin: "Bú kèqi.", translation: "Не за что." },
        ],
      },
    ],

    tips: [
      "您 (nín) — вежливая форма «вы». Используйте при обращении к учителям, старшим, незнакомым людям. В обычном разговоре достаточно 你 (nǐ).",
      "Чтобы сказать «меня зовут...», используйте 我叫... (wǒ jiào...). Чтобы спросить имя — 你叫什么名字？(nǐ jiào shénme míngzi?).",
      "不 обычно произносится 4-м тоном (bù), но перед другим 4-м тоном меняется на 2-й: 不是 → bú shì.",
      "Нажимайте на иероглифы и примеры, чтобы услышать произношение.",
    ],
  },

  2: {
    introduction:
      "В этой главе вы научитесь рассказывать откуда вы и спрашивать национальность собеседника. Познакомитесь с суффиксом множественного числа 们, наречием 也 («тоже») и вопросительной частицей 呢 (для коротких встречных вопросов).\n\n" +
      "Персонажи: 王老师 (Wáng lǎoshī) — учительница по имени 王明 (Wáng Míng), 阿曼 (Āmàn) — туркменский студент, 古丽 (Gǔlì) — канадская студентка, 张伟 (Zhāng Wěi) — китайский одногруппник.",

    vocabulary: [
      { hanzi: "同学", pinyin: "tóngxué", translation: "одноклассник, однокурсник" },
      { hanzi: "们", pinyin: "men", translation: "суффикс множественного числа (для людей)" },
      { hanzi: "来", pinyin: "lái", translation: "приходить; (здесь) сейчас, сейчас я..." },
      { hanzi: "介绍", pinyin: "jièshào", translation: "представлять, знакомить" },
      { hanzi: "一下儿", pinyin: "yíxiàr", translation: "немного, чуть-чуть (смягчает действие)" },
      { hanzi: "姓", pinyin: "xìng", translation: "фамилия; иметь фамилию" },
      { hanzi: "的", pinyin: "de", translation: "притяжательная частица (≈ «-ов», «чей»)" },
      { hanzi: "哪", pinyin: "nǎ", translation: "какой, который" },
      { hanzi: "国", pinyin: "guó", translation: "страна" },
      { hanzi: "人", pinyin: "rén", translation: "человек" },
      { hanzi: "他", pinyin: "tā", translation: "он" },
      { hanzi: "认识", pinyin: "rènshi", translation: "знакомиться, знать (кого-то)" },
      { hanzi: "很", pinyin: "hěn", translation: "очень" },
      { hanzi: "高兴", pinyin: "gāoxìng", translation: "рад, радостный" },
      { hanzi: "也", pinyin: "yě", translation: "тоже, также" },
      { hanzi: "呢", pinyin: "ne", translation: "частица встречного вопроса (а ты?)" },
      { hanzi: "朋友", pinyin: "péngyou", translation: "друг" },
      { hanzi: "王明", pinyin: "Wáng Míng", translation: "Ван Мин (имя)" },
      { hanzi: "美国", pinyin: "Měiguó", translation: "Америка, США" },
      { hanzi: "古丽", pinyin: "Gǔlì", translation: "Гульнара (имя)" },
      { hanzi: "加拿大", pinyin: "Jiānádà", translation: "Канада" },
      { hanzi: "中国", pinyin: "Zhōngguó", translation: "Китай" },
      { hanzi: "土库曼斯坦", pinyin: "Tǔkùmànsītǎn", translation: "Туркменистан" },
    ],

    grammar: [
      {
        title: "Суффикс 们 — множественное число",
        explanation:
          "们 (men) добавляется к местоимениям и существительным, обозначающим людей, чтобы сделать их множественным числом.\n\n" +
          "Местоимение + 们:\n" +
          "我 (я) → 我们 (мы)\n" +
          "你 (ты) → 你们 (вы)\n" +
          "他/她 (он/она) → 他们/她们 (они)\n\n" +
          "Существительное (люди) + 们:\n" +
          "老师 → 老师们 (учителя)\n" +
          "同学 → 同学们 (одноклассники)\n\n" +
          "Важно: 们 используется ТОЛЬКО с людьми. Нельзя сказать 书们 (книги) — для вещей множественное число не обозначается.",
        examples: [
          { hanzi: "同学们好！", pinyin: "Tóngxuémen hǎo!", translation: "Здравствуйте, ребята!" },
          { hanzi: "我们是留学生。", pinyin: "Wǒmen shì liúxuéshēng.", translation: "Мы — иностранные студенты." },
          { hanzi: "你们是老师吗？", pinyin: "Nǐmen shì lǎoshī ma?", translation: "Вы учителя?" },
          { hanzi: "他们不是中国人。", pinyin: "Tāmen bú shì Zhōngguó rén.", translation: "Они не китайцы." },
        ],
      },
      {
        title: "Наречие 也 — «тоже»",
        explanation:
          "也 (yě — «тоже, также») ставится перед глаголом или прилагательным и указывает на сходство.\n\n" +
          "Схема: Подлежащее + 也 + Глагол/Прил.\n\n" +
          "Важно: 也 НЕ ставится в конец предложения (как русское «тоже»), а всегда перед сказуемым.\n\n" +
          "❌ Неправильно: 我是学生也。\n" +
          "✅ Правильно: 我也是学生。",
        examples: [
          { hanzi: "他是学生，我也是学生。", pinyin: "Tā shì xuésheng, wǒ yě shì xuésheng.", translation: "Он студент, и я тоже студент." },
          { hanzi: "我也很高兴。", pinyin: "Wǒ yě hěn gāoxìng.", translation: "Я тоже очень рад." },
          { hanzi: "张伟是中国人，王明也是中国人。", pinyin: "Zhāng Wěi shì Zhōngguó rén, Wáng Míng yě shì Zhōngguó rén.", translation: "Чжан Вэй — китаец, и Ван Мин тоже китаец." },
          { hanzi: "你不是老师，他也不是老师。", pinyin: "Nǐ bú shì lǎoshī, tā yě bú shì lǎoshī.", translation: "Ты не учитель, и он тоже не учитель." },
        ],
      },
      {
        title: "Частица 呢 — встречный вопрос «А ты?»",
        explanation:
          "呢 (ne) ставится в конец короткого встречного вопроса. Это сокращение: вместо того чтобы повторять весь вопрос — добавляешь 呢.\n\n" +
          "Схема: Существительное/Местоимение + 呢？\n\n" +
          "Смысл 呢 берётся из контекста предыдущего предложения:\n" +
          "• Если до этого спрашивали про имя → 你呢？ = «А как тебя зовут?»\n" +
          "• Если про национальность → 你呢？ = «А ты откуда?»\n" +
          "• Если про профессию → 你呢？ = «А ты (кем работаешь)?»",
        examples: [
          { hanzi: "我是美国人，你呢？", pinyin: "Wǒ shì Měiguó rén, nǐ ne?", translation: "Я американец, а ты? (из какой страны?)" },
          { hanzi: "我叫阿曼，她呢？", pinyin: "Wǒ jiào Āmàn, tā ne?", translation: "Меня зовут Аман, а её (как зовут)?" },
          { hanzi: "我很高兴，你呢？", pinyin: "Wǒ hěn gāoxìng, nǐ ne?", translation: "Я очень рад, а ты?" },
          { hanzi: "他是老师，你呢？", pinyin: "Tā shì lǎoshī, nǐ ne?", translation: "Он учитель, а ты?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Знакомство с учителем (王老师 и студенты)",
        lines: [
          { speaker: "A", hanzi: "同学们好！", pinyin: "Tóngxuémen hǎo!", translation: "Здравствуйте, ребята!" },
          { speaker: "B", hanzi: "老师好！", pinyin: "Lǎoshī hǎo!", translation: "Здравствуйте, учитель!" },
          { speaker: "A", hanzi: "我来介绍一下儿。我姓王，叫王明，是你们的老师。你叫什么名字？", pinyin: "Wǒ lái jièshào yíxiàr. Wǒ xìng Wáng, jiào Wáng Míng, shì nǐmen de lǎoshī. Nǐ jiào shénme míngzi?", translation: "Сейчас я себя представлю. Моя фамилия Ван, зовут Ван Мин, я ваша учительница. Как тебя зовут?" },
          { speaker: "B", hanzi: "我叫阿曼。", pinyin: "Wǒ jiào Āmàn.", translation: "Меня зовут Аман." },
          { speaker: "A", hanzi: "你是哪国人？", pinyin: "Nǐ shì nǎ guó rén?", translation: "Из какой ты страны?" },
          { speaker: "B", hanzi: "我是土库曼斯坦人。", pinyin: "Wǒ shì Tǔkùmànsītǎn rén.", translation: "Я из Туркменистана." },
        ],
      },
      {
        title: "Знакомство в столовой (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "你好！我叫阿曼。", pinyin: "Nǐ hǎo! Wǒ jiào Āmàn.", translation: "Привет! Меня зовут Аман." },
          { speaker: "B", hanzi: "你好！我叫古丽。认识你很高兴。", pinyin: "Nǐ hǎo! Wǒ jiào Gǔlì. Rènshi nǐ hěn gāoxìng.", translation: "Привет! Меня зовут Гульнара. Очень приятно познакомиться." },
          { speaker: "A", hanzi: "我也很高兴。你是哪国人？", pinyin: "Wǒ yě hěn gāoxìng. Nǐ shì nǎ guó rén?", translation: "Мне тоже очень приятно. Из какой ты страны?" },
          { speaker: "B", hanzi: "我是加拿大人。你呢？", pinyin: "Wǒ shì Jiānádà rén. Nǐ ne?", translation: "Я канадка. А ты?" },
          { speaker: "A", hanzi: "我是土库曼斯坦人。", pinyin: "Wǒ shì Tǔkùmànsītǎn rén.", translation: "Я из Туркменистана." },
          { speaker: "B", hanzi: "张伟也是我们的同学。他是中国人。", pinyin: "Zhāng Wěi yě shì wǒmen de tóngxué. Tā shì Zhōngguó rén.", translation: "Чжан Вэй тоже наш одногруппник. Он китаец." },
        ],
      },
    ],

    tips: [
      "Формула «национальность»: 哪国人？(из какой страны?) → Страна + 人: 美国人 (американец), 中国人 (китаец), 加拿大人 (канадец). Так же для любой страны: 俄罗斯人 (россиянин), 土库曼人 (туркмен).",
      "我来介绍一下儿 — вежливая фраза-пролог перед представлением кого-то. Дословно «я сейчас немного представлю». 一下儿 смягчает действие, делает его более лёгким.",
      "Разница 姓 и 叫: 姓 — только фамилия (我姓刘), 叫 — полное имя или имя (我叫王明). Нельзя сказать 我姓王明.",
      "认识 vs 知道: оба переводятся «знать», но 认识 — про личное знакомство с человеком, 知道 — знать факт. «Я его знаю лично» = 我认识他.",
    ],
  },

  3: {
    introduction:
      "В этой главе вы научитесь указывать на предметы («это», «то»), задавать вопросы со словами 谁 (кто) и 什么 (что), а также использовать частицу 的 для обозначения принадлежности («чей?», «моя книга»).\n\n" +
      "Персонажи: 阿曼, 古丽 (обсуждают книгу и словарь), 中村 (Zhōngcūn) — японский студент, они обсуждают японский музыкальный журнал.",

    vocabulary: [
      { hanzi: "那", pinyin: "nà", translation: "то, тот" },
      { hanzi: "谁", pinyin: "shéi / shuí", translation: "кто" },
      { hanzi: "书", pinyin: "shū", translation: "книга" },
      { hanzi: "同屋", pinyin: "tóngwū", translation: "сосед по комнате" },
      { hanzi: "汉语", pinyin: "Hànyǔ", translation: "китайский язык" },
      { hanzi: "课本", pinyin: "kèběn", translation: "учебник" },
      { hanzi: "词典", pinyin: "cídiǎn", translation: "словарь" },
      { hanzi: "就是", pinyin: "jiùshì", translation: "а именно, то есть (для пояснения)" },
      { hanzi: "日语", pinyin: "Rìyǔ", translation: "японский язык" },
      { hanzi: "这", pinyin: "zhè", translation: "это, этот" },
      { hanzi: "杂志", pinyin: "zázhì", translation: "журнал" },
      { hanzi: "音乐", pinyin: "yīnyuè", translation: "музыка" },
      { hanzi: "汉日词典", pinyin: "Hàn-Rì Cídiǎn", translation: "Китайско-японский словарь" },
      { hanzi: "中村", pinyin: "Zhōngcūn", translation: "Накамура (японская фамилия)" },
      { hanzi: "日本", pinyin: "Rìběn", translation: "Япония" },
    ],

    grammar: [
      {
        title: "Указательные местоимения 这 / 那",
        explanation:
          "这 (zhè) — «это» (предмет близко к говорящему).\n" +
          "那 (nà) — «то» (предмет подальше).\n\n" +
          "Схема: 这/那 + 是 + Существительное\n\n" +
          "Часто используется вместе с 的 для указания принадлежности:\n" +
          "这是我的书。— Это моя книга.\n" +
          "那是老师的词典。— Тот словарь — учительский.\n\n" +
          "В отрицании: 这/那 + 不是 + ...",
        examples: [
          { hanzi: "这是汉语课本。", pinyin: "Zhè shì Hànyǔ kèběn.", translation: "Это учебник китайского." },
          { hanzi: "那是音乐杂志。", pinyin: "Nà shì yīnyuè zázhì.", translation: "То — музыкальный журнал." },
          { hanzi: "这是老师的书。", pinyin: "Zhè shì lǎoshī de shū.", translation: "Это книга учителя." },
          { hanzi: "那不是我的词典。", pinyin: "Nà bú shì wǒ de cídiǎn.", translation: "Тот словарь не мой." },
        ],
      },
      {
        title: "Частица 的 — принадлежность и определение",
        explanation:
          "的 (de) ставится между определением и определяемым словом. Порядок ВСЕГДА: определение + 的 + главное слово.\n\n" +
          "Схема: A + 的 + B  =  «B, принадлежащее/относящееся к A»\n\n" +
          "我的书 — моя книга\n" +
          "老师的词典 — словарь учителя\n" +
          "古丽的朋友 — друг Гульнара\n\n" +
          "С местоимениями 我/你/他 и близкими родственниками/друзьями 的 можно опускать: 我朋友 (мой друг), 我同屋 (мой сосед по комнате). Но с обычными вещами 的 обязательно: 我的书, 我的词典.",
        examples: [
          { hanzi: "这是我的课本。", pinyin: "Zhè shì wǒ de kèběn.", translation: "Это мой учебник." },
          { hanzi: "那是谁的书？", pinyin: "Nà shì shéi de shū?", translation: "Чья это книга?" },
          { hanzi: "那是我同屋的书。", pinyin: "Nà shì wǒ tóngwū de shū.", translation: "Та книга — моего соседа по комнате." },
          { hanzi: "她是我朋友的同屋。", pinyin: "Tā shì wǒ péngyou de tóngwū.", translation: "Она — соседка по комнате моего друга." },
        ],
      },
      {
        title: "Специальные вопросы с 谁 / 什么",
        explanation:
          "В китайском вопросительные слова ставятся НА ТО МЕСТО, где должен быть ответ. Порядок слов в вопросе и утверждении одинаковый — никаких перестановок как в русском/английском.\n\n" +
          "谁 (shéi) — «кто / чей»\n" +
          "什么 (shénme) — «что / какой»\n\n" +
          "Утверждение: 那是我的书。\n" +
          "Вопрос:  那是谁的书？ (на месте «我» ставится 谁)\n\n" +
          "Утверждение: 这是课本。\n" +
          "Вопрос: 这是什么？ (на месте «课本» ставится 什么)\n\n" +
          "С 吗 такие вопросы НЕ используются — нельзя сказать 那是谁的书吗？",
        examples: [
          { hanzi: "那是谁？", pinyin: "Nà shì shéi?", translation: "Кто это (там)?" },
          { hanzi: "这是什么？", pinyin: "Zhè shì shénme?", translation: "Что это?" },
          { hanzi: "这是什么书？", pinyin: "Zhè shì shénme shū?", translation: "Что это за книга?" },
          { hanzi: "那是谁的词典？", pinyin: "Nà shì shéi de cídiǎn?", translation: "Чей это словарь?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Чья это книга? (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，那是谁的书？是你的书吗？", pinyin: "Gǔlì, nà shì shéi de shū? Shì nǐ de shū ma?", translation: "Гульнара, чья это книга? Твоя?" },
          { speaker: "B", hanzi: "不是，那是我同屋的书。", pinyin: "Bú shì, nà shì wǒ tóngwū de shū.", translation: "Нет, это книга моей соседки по комнате." },
          { speaker: "A", hanzi: "是汉语课本吗？", pinyin: "Shì Hànyǔ kèběn ma?", translation: "Это учебник китайского?" },
          { speaker: "B", hanzi: "不是，是《汉日词典》。", pinyin: "Bú shì, shì «Hàn-Rì Cídiǎn».", translation: "Нет, это «Китайско-японский словарь»." },
          { speaker: "A", hanzi: "什么词典？", pinyin: "Shénme cídiǎn?", translation: "Какой словарь?" },
          { speaker: "B", hanzi: "《汉日词典》，就是汉语、日语词典。", pinyin: "«Hàn-Rì Cídiǎn», jiù shì Hànyǔ, Rìyǔ cídiǎn.", translation: "«Китайско-японский», то есть словарь китайского и японского." },
        ],
      },
      {
        title: "Что это за журнал? (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "这是什么杂志？", pinyin: "Zhè shì shénme zázhì?", translation: "Что это за журнал?" },
          { speaker: "B", hanzi: "音乐杂志。", pinyin: "Yīnyuè zázhì.", translation: "Музыкальный." },
          { speaker: "A", hanzi: "是日本的杂志吗？", pinyin: "Shì Rìběn de zázhì ma?", translation: "Японский?" },
          { speaker: "B", hanzi: "是，是日本的杂志。", pinyin: "Shì, shì Rìběn de zázhì.", translation: "Да, японский." },
          { speaker: "A", hanzi: "是你的吗？", pinyin: "Shì nǐ de ma?", translation: "Твой?" },
          { speaker: "B", hanzi: "不是，是我朋友的。", pinyin: "Bú shì, shì wǒ péngyou de.", translation: "Нет, моего друга." },
        ],
      },
    ],

    tips: [
      "После 的 существительное можно опустить, если оно понятно из контекста: 是我的 («это моё»), 是朋友的 («это друга»). Особенно часто так говорят в ответах: A: 是你的书吗？ B: 不，是我朋友的。",
      "谁 читается и «shéi», и «shuí» — оба варианта правильны, но в разговорной речи чаще «shéi».",
      "就是 употребляется для пояснения или уточнения: «это значит», «а именно». Полезно когда хочешь объяснить непонятное слово: X，就是 Y — «X, то есть Y».",
      "Близкие отношения — без 的: 我朋友, 我同屋, 我老师, 我爸爸 (мой папа). С вещами/понятиями — с 的: 我的书, 我的杂志, 我的名字.",
    ],
  },

  4: {
    introduction:
      "В этой главе вы научитесь спрашивать где что находится и описывать местоположение. Познакомитесь с глаголом 在 (zài — находиться), вопросительным словом 哪儿 (где) и словами направления: 东/西/南/北/左/右 + 边.\n\n" +
      "Ситуация: 古丽 ищет библиотеку на территории университета и спрашивает у встречных студентов.",

    vocabulary: [
      { hanzi: "请问", pinyin: "qǐngwèn", translation: "простите, можно спросить" },
      { hanzi: "图书馆", pinyin: "túshūguǎn", translation: "библиотека" },
      { hanzi: "在", pinyin: "zài", translation: "находиться (где-то)" },
      { hanzi: "哪儿", pinyin: "nǎr", translation: "где" },
      { hanzi: "对不起", pinyin: "duìbuqǐ", translation: "извините" },
      { hanzi: "个", pinyin: "gè", translation: "счётное слово (универсальное)" },
      { hanzi: "学校", pinyin: "xuéxiào", translation: "школа, учебное заведение" },
      { hanzi: "知道", pinyin: "zhīdào", translation: "знать (факт)" },
      { hanzi: "没关系", pinyin: "méi guānxi", translation: "ничего страшного, не важно" },
      { hanzi: "这儿", pinyin: "zhèr", translation: "здесь" },
      { hanzi: "教学", pinyin: "jiàoxué", translation: "обучение, преподавание" },
      { hanzi: "楼", pinyin: "lóu", translation: "здание, корпус" },
      { hanzi: "那儿", pinyin: "nàr", translation: "там" },
      { hanzi: "宿舍", pinyin: "sùshè", translation: "общежитие" },
      { hanzi: "北边", pinyin: "běibian", translation: "северная сторона, к северу" },
      { hanzi: "左边", pinyin: "zuǒbian", translation: "левая сторона, слева" },
      { hanzi: "右边", pinyin: "yòubian", translation: "правая сторона, справа" },
      { hanzi: "不用谢", pinyin: "búyòng xiè", translation: "не стоит благодарности" },
      { hanzi: "不用", pinyin: "búyòng", translation: "не нужно, не обязательно" },
      { hanzi: "东边", pinyin: "dōngbian", translation: "восточная сторона" },
      { hanzi: "西边", pinyin: "xībian", translation: "западная сторона" },
      { hanzi: "南边", pinyin: "nánbian", translation: "южная сторона" },
    ],

    grammar: [
      {
        title: "Глагол 在 — находиться где-то",
        explanation:
          "在 (zài) — глагол «находиться, быть (в каком-то месте)». Используется чтобы указать местоположение предмета или человека.\n\n" +
          "Схема 1:  Подлежащее + 在 + Место\n" +
          "图书馆在那儿。— Библиотека находится там.\n" +
          "我在学校。— Я в школе.\n\n" +
          "Схема 2 (обратный порядок):  Место + 是 + Подлежащее\n" +
          "那儿是图书馆。— Там — библиотека.\n" +
          "教学楼的北边是图书馆。— С северной стороны учебного корпуса — библиотека.\n\n" +
          "Отрицание: 不在 (bú zài) — 图书馆不在这儿。",
        examples: [
          { hanzi: "图书馆在哪儿？", pinyin: "Túshūguǎn zài nǎr?", translation: "Где находится библиотека?" },
          { hanzi: "图书馆在宿舍楼的北边。", pinyin: "Túshūguǎn zài sùshèlóu de běibian.", translation: "Библиотека — к северу от общежития." },
          { hanzi: "加拿大在美国的北边。", pinyin: "Jiānádà zài Měiguó de běibian.", translation: "Канада — к северу от США." },
          { hanzi: "日本在中国的东边。", pinyin: "Rìběn zài Zhōngguó de dōngbian.", translation: "Япония — к востоку от Китая." },
        ],
      },
      {
        title: "Вопросительное слово 哪儿 — где",
        explanation:
          "哪儿 (nǎr) — «где». Ставится на место, где должен стоять ответ (то есть после 在).\n\n" +
          "Схема: Подлежащее + 在 + 哪儿？\n\n" +
          "Ответ: Подлежащее + 在 + конкретное место\n\n" +
          "Важно: с вопросительными словами (哪儿, 谁, 什么) НЕ используется 吗.\n" +
          "❌ 图书馆在哪儿吗？\n" +
          "✅ 图书馆在哪儿？\n\n" +
          "Пара: 这儿 (здесь) / 那儿 (там) / 哪儿 (где) — ориентируйся по первому иероглифу: 这=это, 那=то, 哪=который.",
        examples: [
          { hanzi: "你的书在哪儿？", pinyin: "Nǐ de shū zài nǎr?", translation: "Где твоя книга?" },
          { hanzi: "老师在哪儿？", pinyin: "Lǎoshī zài nǎr?", translation: "Где учитель?" },
          { hanzi: "你们的学校在哪儿？", pinyin: "Nǐmen de xuéxiào zài nǎr?", translation: "Где ваша школа?" },
          { hanzi: "阿曼在这儿，古丽在那儿。", pinyin: "Āmàn zài zhèr, Gǔlì zài nàr.", translation: "Аман здесь, а Гульнара там." },
        ],
      },
      {
        title: "Слова направления (方位词): 东/西/南/北/左/右 + 边",
        explanation:
          "Чтобы сказать «к северу от X», «справа от X» и т.д., используется схема:\n\n" +
          "X + 的 + направление + 边\n\n" +
          "Направления:\n" +
          "东 (dōng) — восток → 东边\n" +
          "西 (xī) — запад → 西边\n" +
          "南 (nán) — юг → 南边\n" +
          "北 (běi) — север → 北边\n" +
          "左 (zuǒ) — лево → 左边\n" +
          "右 (yòu) — право → 右边\n\n" +
          "Пример: 图书馆在宿舍楼的北边 = «Библиотека к северу от общежития» (дословно: «библиотека находится на северной стороне общежития»).\n\n" +
          "Это обратный порядок по сравнению с русским: сначала идёт «ориентир» (от чего), потом направление.",
        examples: [
          { hanzi: "教学楼在图书馆的北边。", pinyin: "Jiàoxuélóu zài túshūguǎn de běibian.", translation: "Учебный корпус — к северу от библиотеки." },
          { hanzi: "张伟在阿曼的右边。", pinyin: "Zhāng Wěi zài Āmàn de yòubian.", translation: "Чжан Вэй — справа от Давэя." },
          { hanzi: "古丽的左边是阿曼。", pinyin: "Gǔlì de zuǒbian shì Āmàn.", translation: "Слева от Гульнара — Аман." },
          { hanzi: "宿舍楼在西边。", pinyin: "Sùshèlóu zài xībian.", translation: "Общежитие — с западной стороны." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Поиск библиотеки — неудача (古丽 и студент А)",
        lines: [
          { speaker: "A", hanzi: "同学，请问，图书馆在哪儿？", pinyin: "Tóngxué, qǐngwèn, túshūguǎn zài nǎr?", translation: "Студент, простите, где библиотека?" },
          { speaker: "B", hanzi: "对不起，我不是这个学校的学生，不知道。", pinyin: "Duìbuqǐ, wǒ bú shì zhège xuéxiào de xuésheng, bù zhīdào.", translation: "Извините, я не студент этого университета, не знаю." },
          { speaker: "A", hanzi: "没关系。", pinyin: "Méi guānxi.", translation: "Ничего страшного." },
        ],
      },
      {
        title: "Поиск библиотеки — нашла (古丽 и студент Б)",
        lines: [
          { speaker: "A", hanzi: "同学，这儿是图书馆吗？", pinyin: "Tóngxué, zhèr shì túshūguǎn ma?", translation: "Студент, это здесь библиотека?" },
          { speaker: "B", hanzi: "不是，这是教学楼，图书馆在那儿，宿舍楼的北边。", pinyin: "Bú shì, zhè shì jiàoxuélóu, túshūguǎn zài nàr, sùshèlóu de běibian.", translation: "Нет, это учебный корпус. Библиотека вон там, к северу от общежития." },
          { speaker: "A", hanzi: "是左边的楼吗？", pinyin: "Shì zuǒbian de lóu ma?", translation: "То здание слева?" },
          { speaker: "B", hanzi: "不，右边的楼。", pinyin: "Bù, yòubian de lóu.", translation: "Нет, справа." },
          { speaker: "A", hanzi: "谢谢。", pinyin: "Xièxie.", translation: "Спасибо." },
          { speaker: "B", hanzi: "不用谢。", pinyin: "Búyòng xiè.", translation: "Не за что." },
        ],
      },
    ],

    tips: [
      "请问 (qǐngwèn) — вежливое начало вопроса у незнакомых людей. Дословно: «позвольте спросить». Очень полезная фраза на улице.",
      "对不起 / 没关系 — стандартная пара «извини / ничего страшного». Запомни обе фразы вместе, они идут в паре.",
      "不用谢 и 不客气 — оба значат «не за что». 不客气 мягче и универсальнее, 不用谢 более разговорное.",
      "В китайском направления меняются парами: 这儿 здесь / 那儿 там / 哪儿 где. Обрати внимание на суффикс 儿 — он характерен для северного (пекинского) диалекта.",
      "Счётное слово 个 (gè) — самое универсальное. Ставится между числом/指示 и существительным: 这个学校 (эта школа), 一个朋友 (один друг). Нельзя сказать 这学校 — нужен 个.",
    ],
  },

  5: {
    introduction:
      "Это итоговая глава Unit 1 — повторение и расширение пройденного. Вы научитесь рассказывать о своей учёбе (университет, специальность), использовать глагол 有 (иметь, существовать) и выражение 的时候 (когда, в момент).\n\n" +
      "Персонажи: 古丽 знакомится со студенткой 王红 (Wáng Hóng) из Университета Цинхуа. Параллельно 阿曼 ищет уборную.",

    vocabulary: [
      { hanzi: "专业", pinyin: "zhuānyè", translation: "специальность (в вузе)" },
      { hanzi: "国际", pinyin: "guójì", translation: "международный" },
      { hanzi: "关系", pinyin: "guānxi", translation: "отношения, связи" },
      { hanzi: "中文", pinyin: "Zhōngwén", translation: "китайский язык (письменный, литературный)" },
      { hanzi: "系", pinyin: "xì", translation: "факультет, кафедра" },
      { hanzi: "研究生", pinyin: "yánjiūshēng", translation: "аспирант, магистрант" },
      { hanzi: "现代", pinyin: "xiàndài", translation: "современный" },
      { hanzi: "文学", pinyin: "wénxué", translation: "литература" },
      { hanzi: "有", pinyin: "yǒu", translation: "иметь; иметься, быть" },
      { hanzi: "空儿", pinyin: "kòngr", translation: "свободное время" },
      { hanzi: "时候", pinyin: "shíhou", translation: "время, момент" },
      { hanzi: "欢迎", pinyin: "huānyíng", translation: "приветствовать, добро пожаловать" },
      { hanzi: "去", pinyin: "qù", translation: "идти, ехать (куда-то)" },
      { hanzi: "玩儿", pinyin: "wánr", translation: "играть, проводить время" },
      { hanzi: "卫生间", pinyin: "wèishēngjiān", translation: "туалет, уборная" },
      { hanzi: "教室", pinyin: "jiàoshì", translation: "аудитория, классная комната" },
      { hanzi: "旁边", pinyin: "pángbiān", translation: "рядом, сбоку" },
      { hanzi: "对", pinyin: "duì", translation: "правильно, верно" },
      { hanzi: "王红", pinyin: "Wáng Hóng", translation: "Ван Хун (женское имя)" },
      { hanzi: "北京大学", pinyin: "Běijīng Dàxué", translation: "Пекинский университет (Бэйда)" },
      { hanzi: "清华大学", pinyin: "Qīnghuá Dàxué", translation: "Университет Цинхуа" },
    ],

    grammar: [
      {
        title: "Глагол 有 — иметь; иметься",
        explanation:
          "有 (yǒu) — «иметь, обладать» или «иметься, быть, существовать». Один из самых частых глаголов в китайском.\n\n" +
          "Значение 1 — принадлежность («у меня есть»):\n" +
          "Подлежащее + 有 + Объект\n" +
          "我有朋友。— У меня есть друзья.\n" +
          "她有一个同屋。— У неё есть соседка по комнате.\n\n" +
          "Значение 2 — существование («где-то есть»):\n" +
          "Место + 有 + Объект\n" +
          "学校有图书馆。— В университете есть библиотека.\n" +
          "教室里有老师。— В аудитории есть учитель.\n\n" +
          "Отрицание ТОЛЬКО через 没 (НЕ 不):\n" +
          "❌ 不有\n" +
          "✅ 没有 (méi yǒu) — «не иметь»\n\n" +
          "我没有空儿。— У меня нет свободного времени.",
        examples: [
          { hanzi: "我有一个中国朋友。", pinyin: "Wǒ yǒu yí ge Zhōngguó péngyou.", translation: "У меня есть один китайский друг." },
          { hanzi: "你有空儿吗？", pinyin: "Nǐ yǒu kòngr ma?", translation: "У тебя есть свободное время?" },
          { hanzi: "北京大学有图书馆。", pinyin: "Běijīng Dàxué yǒu túshūguǎn.", translation: "В Пекинском университете есть библиотека." },
          { hanzi: "我没有汉语词典。", pinyin: "Wǒ méiyǒu Hànyǔ cídiǎn.", translation: "У меня нет словаря китайского." },
        ],
      },
      {
        title: "Выражение 的时候 — «когда, в момент чего-то»",
        explanation:
          "…的时候 (de shíhou) означает «когда…, во время…». Ставится в КОНЦЕ придаточной части, перед главной.\n\n" +
          "Схема:  [Действие/ситуация] + 的时候，[основная часть]\n\n" +
          "有空儿的时候，欢迎你去玩儿。\n" +
          "«Когда будет свободное время, приходи в гости».\n\n" +
          "Важно: порядок ОБРАТНЫЙ русскому. Сначала говорится условие/время, потом основное действие.\n\n" +
          "Русский: «Приходи, КОГДА будет время»\n" +
          "Китайский: «КОГДА время — приходи»",
        examples: [
          { hanzi: "有空儿的时候，欢迎你去玩儿。", pinyin: "Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.", translation: "Когда будет время — приходи в гости." },
          { hanzi: "我有空儿的时候去图书馆。", pinyin: "Wǒ yǒu kòngr de shíhou qù túshūguǎn.", translation: "Когда у меня есть время, иду в библиотеку." },
          { hanzi: "你不忙的时候，我们一起玩儿。", pinyin: "Nǐ bù máng de shíhou, wǒmen yìqǐ wánr.", translation: "Когда ты не занят, поиграем вместе." },
        ],
      },
      {
        title: "Ещё слова направления: 旁边, 前边, 后边, 里边",
        explanation:
          "В Главе 4 мы изучили 东边/西边/南边/北边 и 左边/右边. Теперь добавим ещё несколько направлений:\n\n" +
          "旁边 (pángbiān) — сбоку, рядом\n" +
          "前边 (qiánbian) — впереди\n" +
          "后边 (hòubian) — сзади\n" +
          "里边 (lǐbian) — внутри\n" +
          "外边 (wàibian) — снаружи\n" +
          "上边 (shàngbian) — сверху\n" +
          "下边 (xiàbian) — снизу\n\n" +
          "Схема та же: X + 的 + направление\n" +
          "卫生间在教室的旁边。— Уборная рядом с аудиторией.\n" +
          "图书馆在宿舍的前边。— Библиотека перед общежитием.",
        examples: [
          { hanzi: "卫生间在教室的旁边。", pinyin: "Wèishēngjiān zài jiàoshì de pángbiān.", translation: "Уборная рядом с аудиторией." },
          { hanzi: "老师在阿曼的前边。", pinyin: "Lǎoshī zài Āmàn de qiánbian.", translation: "Учитель впереди Давэя." },
          { hanzi: "图书馆里边有很多书。", pinyin: "Túshūguǎn lǐbian yǒu hěn duō shū.", translation: "Внутри библиотеки много книг." },
          { hanzi: "我的朋友在我旁边。", pinyin: "Wǒ de péngyou zài wǒ pángbiān.", translation: "Мой друг рядом со мной." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Знакомство в университете (古丽 и 王红)",
        lines: [
          { speaker: "A", hanzi: "你好！你叫什么名字？", pinyin: "Nǐ hǎo! Nǐ jiào shénme míngzi?", translation: "Привет! Как тебя зовут?" },
          { speaker: "B", hanzi: "我叫王红。你呢？", pinyin: "Wǒ jiào Wáng Hóng. Nǐ ne?", translation: "Меня зовут Ван Хун. А тебя?" },
          { speaker: "A", hanzi: "我叫古丽。我是北京大学的留学生。我的专业是国际关系。你呢？", pinyin: "Wǒ jiào Gǔlì. Wǒ shì Běijīng Dàxué de liúxuéshēng. Wǒ de zhuānyè shì guójì guānxi. Nǐ ne?", translation: "Меня зовут Гульнара. Я иностранная студентка Пекинского университета. Моя специальность — международные отношения. А ты?" },
          { speaker: "B", hanzi: "我是清华大学中文系的研究生。我的专业是现代文学。", pinyin: "Wǒ shì Qīnghuá Dàxué Zhōngwén xì de yánjiūshēng. Wǒ de zhuānyè shì xiàndài wénxué.", translation: "Я аспирантка факультета китайского языка в Цинхуа. Моя специальность — современная литература." },
          { speaker: "A", hanzi: "清华大学在哪儿？", pinyin: "Qīnghuá Dàxué zài nǎr?", translation: "А где находится Цинхуа?" },
          { speaker: "B", hanzi: "在北京大学的东边。有空儿的时候，欢迎你去玩儿。", pinyin: "Zài Běijīng Dàxué de dōngbian. Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.", translation: "К востоку от Пекинского университета. Будет время — приходи в гости." },
        ],
      },
      {
        title: "Где уборная? (阿曼 и студент)",
        lines: [
          { speaker: "A", hanzi: "请问，卫生间在哪儿？", pinyin: "Qǐngwèn, wèishēngjiān zài nǎr?", translation: "Простите, где уборная?" },
          { speaker: "B", hanzi: "在那儿，教室的旁边。", pinyin: "Zài nàr, jiàoshì de pángbiān.", translation: "Вон там, рядом с аудиторией." },
          { speaker: "A", hanzi: "是西边的教室吗？", pinyin: "Shì xībian de jiàoshì ma?", translation: "Аудитория с западной стороны?" },
          { speaker: "B", hanzi: "对。", pinyin: "Duì.", translation: "Да, верно." },
        ],
      },
    ],

    tips: [
      "欢迎你去玩儿 — вежливое приглашение. Дословно: «приветствую тебя прийти поиграть». Используется когда приглашаешь в гости без конкретного повода. Это идиома, не переводи буквально.",
      "北京大学 (Běijīng Dàxué) и 清华大学 (Qīnghuá Dàxué) — два самых престижных вуза Китая. Часто сокращаются до 北大 (Běidà) и 清华 (Qīnghuá).",
      "有 — ВСЕГДА отрицается через 没 (没有). Это единственный глагол, который не принимает 不. Запомни сразу: нет 不有.",
      "中文 vs 汉语: оба означают «китайский язык». 汉语 — общий термин (язык хань), чаще о устной речи. 中文 — обычно письменный, литературный. На факультете это 中文系.",
      "对 (duì) — универсальное «да/правильно». Более естественно чем 是 в ответе на вопросы. «Ты студент?» → 对 (да).",
    ],
  },

  6: {
    introduction:
      "В этой главе вы научитесь называть время (часы и минуты), считать до 100 и задавать вопросы о времени с помощью 几 (сколько). Также познакомитесь с конструкцией 太……了 («слишком») и выражением 一会儿见 («до скорого»).\n\n" +
      "Ситуации: 古丽 спрашивает 中村 когда в Японии начинаются занятия, потом узнаёт у 阿曼 во сколько начнётся лекция.",

    vocabulary: [
      { hanzi: "大学", pinyin: "dàxué", translation: "университет" },
      { hanzi: "早上", pinyin: "zǎoshang", translation: "утро" },
      { hanzi: "几", pinyin: "jǐ", translation: "сколько (для чисел до 10)" },
      { hanzi: "点", pinyin: "diǎn", translation: "час (на часах), точка" },
      { hanzi: "上课", pinyin: "shàngkè", translation: "начинать занятие, идти на пару" },
      { hanzi: "大部分", pinyin: "dàbùfen", translation: "большинство, бóльшая часть" },
      { hanzi: "九", pinyin: "jiǔ", translation: "девять" },
      { hanzi: "我们", pinyin: "wǒmen", translation: "мы" },
      { hanzi: "八", pinyin: "bā", translation: "восемь" },
      { hanzi: "五十", pinyin: "wǔshí", translation: "пятьдесят" },
      { hanzi: "分", pinyin: "fēn", translation: "минута" },
      { hanzi: "下课", pinyin: "xià kè", translation: "заканчивать занятие" },
      { hanzi: "十", pinyin: "shí", translation: "десять" },
      { hanzi: "半", pinyin: "bàn", translation: "половина" },
      { hanzi: "太……了", pinyin: "tài...le", translation: "слишком (очень)" },
      { hanzi: "早", pinyin: "zǎo", translation: "рано, ранний" },
      { hanzi: "讲座", pinyin: "jiǎngzuò", translation: "лекция, доклад" },
      { hanzi: "开始", pinyin: "kāishǐ", translation: "начинаться, начинать" },
      { hanzi: "六", pinyin: "liù", translation: "шесть" },
      { hanzi: "现在", pinyin: "xiànzài", translation: "сейчас" },
      { hanzi: "差", pinyin: "chà", translation: "не хватать, без (чего-то до)" },
      { hanzi: "一", pinyin: "yī", translation: "один" },
      { hanzi: "刻", pinyin: "kè", translation: "четверть часа (15 мин)" },
      { hanzi: "一会儿", pinyin: "yíhuìr", translation: "скоро, через минутку" },
      { hanzi: "见", pinyin: "jiàn", translation: "увидеться, встретиться" },
    ],

    grammar: [
      {
        title: "Числа от 0 до 100",
        explanation:
          "Числа 0-10 — базовые, их надо выучить:\n" +
          "零 líng — 0\n" +
          "一 yī — 1\n" +
          "二 èr — 2\n" +
          "三 sān — 3\n" +
          "四 sì — 4\n" +
          "五 wǔ — 5\n" +
          "六 liù — 6\n" +
          "七 qī — 7\n" +
          "八 bā — 8\n" +
          "九 jiǔ — 9\n" +
          "十 shí — 10\n\n" +
          "11-19: 十 + единица\n" +
          "11 = 十一 (shí yī), 15 = 十五, 19 = 十九\n\n" +
          "20-99: десяток + 十 + единица\n" +
          "20 = 二十 (èrshí), 25 = 二十五, 99 = 九十九\n\n" +
          "100 = 一百 (yìbǎi)\n\n" +
          "Логика проста: 35 дословно «три-десять-пять» (三十五).",
        examples: [
          { hanzi: "十五", pinyin: "shíwǔ", translation: "15" },
          { hanzi: "二十一", pinyin: "èrshíyī", translation: "21" },
          { hanzi: "五十", pinyin: "wǔshí", translation: "50" },
          { hanzi: "九十九", pinyin: "jiǔshíjiǔ", translation: "99" },
        ],
      },
      {
        title: "Как называть время (钟点表达法)",
        explanation:
          "Схема: [час] 点 [минуты] 分\n\n" +
          "8:00 — 八点 (bā diǎn)\n" +
          "8:05 — 八点零五分 (零 líng = ноль обязательно для <10 мин)\n" +
          "8:10 — 八点十分\n" +
          "8:15 — 八点十五分 ИЛИ 八点一刻 (один 刻 = 15 мин)\n" +
          "8:30 — 八点三十分 ИЛИ 八点半 (полчаса)\n" +
          "8:45 — 八点四十五分 ИЛИ 八点三刻 ИЛИ 差一刻九点 («без четверти 9»)\n" +
          "8:50 — 八点五十分 ИЛИ 差十分九点 («без 10 минут 9»)\n\n" +
          "Вопрос «сколько времени?»: 现在几点？ (xiànzài jǐ diǎn?)\n" +
          "Вопрос «во сколько?»: 几点 + глагол → 几点上课？(во сколько начнутся занятия?)",
        examples: [
          { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "Сколько сейчас времени?" },
          { hanzi: "现在八点半。", pinyin: "Xiànzài bā diǎn bàn.", translation: "Сейчас половина девятого (8:30)." },
          { hanzi: "差一刻六点。", pinyin: "Chà yí kè liù diǎn.", translation: "Без четверти шесть (5:45)." },
          { hanzi: "你们几点上课？", pinyin: "Nǐmen jǐ diǎn shàng kè?", translation: "Во сколько у вас начинаются занятия?" },
          { hanzi: "我们八点五十分上课。", pinyin: "Wǒmen bā diǎn wǔshí fēn shàng kè.", translation: "У нас занятия в 8:50." },
        ],
      },
      {
        title: "Вопросительное 几 — «сколько»",
        explanation:
          "几 (jǐ) — «сколько», но только для ОЖИДАЕМО МАЛЫХ чисел (обычно до 10). Если ожидается число побольше — используется 多少 (будет в следующих главах).\n\n" +
          "几 + счётное слово + существительное\n" +
          "几点? — сколько часов? (точно меньше 24)\n" +
          "几个朋友? — сколько друзей? (небольшое число)\n\n" +
          "В ответе на место 几 ставится конкретное число:\n" +
          "几点？→ 八点\n" +
          "几个朋友？→ 三个朋友\n\n" +
          "几 уже содержит вопрос — 吗 НЕ добавляется.",
        examples: [
          { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "Сколько сейчас времени?" },
          { hanzi: "几点下课？", pinyin: "Jǐ diǎn xià kè?", translation: "Во сколько заканчиваются занятия?" },
          { hanzi: "你有几个朋友？", pinyin: "Nǐ yǒu jǐ ge péngyou?", translation: "Сколько у тебя друзей?" },
          { hanzi: "讲座几点开始？", pinyin: "Jiǎngzuò jǐ diǎn kāishǐ?", translation: "Во сколько начинается лекция?" },
        ],
      },
      {
        title: "Конструкция 太……了 — «слишком»",
        explanation:
          "太…了 (tài…le) выражает высокую степень, часто с оттенком недовольства или восхищения.\n\n" +
          "Схема:  太 + Прилагательное/Глагол + 了\n\n" +
          "太早了！— Слишком рано!\n" +
          "太好了！— Отлично! (здесь — положительно)\n" +
          "太累了。— Очень устал.\n\n" +
          "В отрицании 了 обычно опускается: 不太早 («не слишком рано»).\n" +
          "太 без 了 звучит незавершённо — 了 почти всегда нужен.",
        examples: [
          { hanzi: "八点上课，太早了！", pinyin: "Bā diǎn shàngkè, tài zǎo le!", translation: "Занятия в 8 — это слишком рано!" },
          { hanzi: "太好了！", pinyin: "Tài hǎo le!", translation: "Отлично!" },
          { hanzi: "这个学校太大了。", pinyin: "Zhège xuéxiào tài dà le.", translation: "Эта школа слишком большая." },
          { hanzi: "不太早。", pinyin: "Bú tài zǎo.", translation: "Не так уж рано." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Занятия в Японии (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，日本的大学早上几点上课？", pinyin: "Zhōngcūn, Rìběn de dàxué zǎoshang jǐ diǎn shàngkè?", translation: "Накамура, во сколько начинаются занятия в японских университетах утром?" },
          { speaker: "B", hanzi: "大部分是九点，我们学校是八点五十分。", pinyin: "Dàbùfen shì jiǔ diǎn, wǒmen xuéxiào shì bā diǎn wǔshí fēn.", translation: "В большинстве в 9, у нас в школе — в 8:50." },
          { speaker: "A", hanzi: "几点下课？", pinyin: "Jǐ diǎn xià kè?", translation: "Во сколько заканчиваются?" },
          { speaker: "B", hanzi: "十点半。", pinyin: "Shí diǎn bàn.", translation: "В половине одиннадцатого." },
          { speaker: "A", hanzi: "北京大学早上八点上课，太早了。", pinyin: "Běijīng Dàxué zǎoshang bā diǎn shàngkè, tài zǎo le.", translation: "В Пекинском университете занятия в 8 утра — слишком рано!" },
        ],
      },
      {
        title: "Во сколько лекция? (古丽 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，讲座几点开始？", pinyin: "Āmàn, jiǎngzuò jǐ diǎn kāishǐ?", translation: "Аман, во сколько начинается лекция?" },
          { speaker: "B", hanzi: "六点。", pinyin: "Liù diǎn.", translation: "В 6." },
          { speaker: "A", hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "А сейчас сколько?" },
          { speaker: "B", hanzi: "差一刻六点。", pinyin: "Chà yí kè liù diǎn.", translation: "Без четверти шесть." },
          { speaker: "A", hanzi: "谢谢！一会儿见。", pinyin: "Xièxie! Yíhuìr jiàn.", translation: "Спасибо! До скорого." },
        ],
      },
    ],

    tips: [
      "一 (yī) меняет тон в зависимости от следующего слога: перед 4-м тоном → 2-й (yí kè, yí ge), перед 1/2/3 тоном → 4-й (yì bēi, yì nián, yì wǎn). В изоляции — 1-й тон (yī).",
      "零 (líng = ноль) пишется ещё иероглифом 〇 (кружочек). Например 2026 год = 二〇二六年. В цифрах времени (8:05) 零 обязательно, иначе непонятно.",
      "Формулы прощания: 一会儿见 (до скорого, через пару минут), 明天见 (до завтра), 再见 (до свидания). Все строятся как «[время]见».",
      "上课 / 下课 — буквально «подниматься на занятие» / «спускаться с занятия». Похожие пары: 上班/下班 (работа), 上车/下车 (транспорт).",
      "В разговоре китайцы чаще говорят 半 (полчаса) и 一刻/三刻 (четверти), чем точные «三十分» и «十五分». Учись использовать эти сокращения.",
    ],
  },

  7: {
    introduction:
      "В этой главе вы научитесь говорить о планах на день (утром / днём / вечером), спрашивать о наличии чего-либо с помощью 有, использовать частицу 吧 для предположения и слова 上/下/里/外 как прилагательные.\n\n" +
      "Ситуации: 古丽 одалживает велосипед у 中村, 阿曼 зовёт 古丽 в кино.",

    vocabulary: [
      { hanzi: "明天", pinyin: "míngtiān", translation: "завтра" },
      { hanzi: "课", pinyin: "kè", translation: "занятие, урок" },
      { hanzi: "上午", pinyin: "shàngwǔ", translation: "до полудня, утро (10-12)" },
      { hanzi: "下午", pinyin: "xiàwǔ", translation: "после полудня, день" },
      { hanzi: "没(有)", pinyin: "méi(yǒu)", translation: "не иметь, нет" },
      { hanzi: "自行车", pinyin: "zìxíngchē", translation: "велосипед" },
      { hanzi: "吧", pinyin: "ba", translation: "частица (предположение / предложение)" },
      { hanzi: "事", pinyin: "shì", translation: "дело, вопрос" },
      { hanzi: "可是", pinyin: "kěshì", translation: "но, однако" },
      { hanzi: "没问题", pinyin: "méi wèntí", translation: "без проблем" },
      { hanzi: "钥匙", pinyin: "yàoshi", translation: "ключ" },
      { hanzi: "车", pinyin: "chē", translation: "машина, велосипед, транспорт" },
      { hanzi: "下", pinyin: "xià", translation: "низ, под, вниз" },
      { hanzi: "车棚", pinyin: "chēpéng", translation: "велопарковка, навес для машин" },
      { hanzi: "里", pinyin: "lǐ", translation: "внутри, в" },
      { hanzi: "后边", pinyin: "hòubian", translation: "сзади, позади" },
      { hanzi: "今天", pinyin: "jīntiān", translation: "сегодня" },
      { hanzi: "晚上", pinyin: "wǎnshang", translation: "вечер" },
      { hanzi: "时间", pinyin: "shíjiān", translation: "время" },
      { hanzi: "电影院", pinyin: "diànyǐngyuàn", translation: "кинотеатр" },
      { hanzi: "电影", pinyin: "diànyǐng", translation: "фильм, кино" },
      { hanzi: "听说", pinyin: "tīngshuō", translation: "слышал, слышно, говорят" },
      { hanzi: "有名", pinyin: "yǒumíng", translation: "знаменитый, известный" },
      { hanzi: "当然", pinyin: "dāngrán", translation: "конечно, разумеется" },
    ],

    grammar: [
      {
        title: "Предложения с 有 (повторение + отрицание)",
        explanation:
          "В Главе 5 мы познакомились с глаголом 有. Теперь закрепим и добавим отрицательные вопросы.\n\n" +
          "Схемы:\n" +
          "Утверждение:  Подл. + 有 + Объект\n" +
          "Отрицание:  Подл. + 没有 + Объект (НЕ 不有!)\n" +
          "Вопрос:  Подл. + 有 + Объект + 吗？\n\n" +
          "Полный вопрос «есть или нет»:  Подл. + 有没有 + Объект？\n" +
          "— 你有没有自行车？= У тебя есть велосипед или нет?\n\n" +
          "В ответе можно просто 有 / 没有 без повторения объекта.",
        examples: [
          { hanzi: "明天你有课吗？", pinyin: "Míngtiān nǐ yǒu kè ma?", translation: "У тебя завтра есть занятия?" },
          { hanzi: "我上午有课，下午没有。", pinyin: "Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu.", translation: "Утром есть, днём — нет." },
          { hanzi: "我没有自行车。", pinyin: "Wǒ méiyǒu zìxíngchē.", translation: "У меня нет велосипеда." },
          { hanzi: "你有没有钥匙？", pinyin: "Nǐ yǒu méiyǒu yàoshi?", translation: "У тебя есть ключ или нет?" },
        ],
      },
      {
        title: "Частица 吧 (1) — «подтверждение догадки»",
        explanation:
          "吧 (ba) в конце вопроса означает «я так думаю — подтверди?». То есть говорящий уже почти уверен и просит подтверждения.\n\n" +
          "Схема:  Утверждение + 吧？\n\n" +
          "你有自行车吧？— «У тебя ведь есть велосипед, правильно?»\n\n" +
          "Отличие от 吗:\n" +
          "• 你有自行车吗？— Просто вопрос «есть ли у тебя велосипед?» (не знаю)\n" +
          "• 你有自行车吧？— «У тебя же есть, верно?» (думаю что есть)\n\n" +
          "Это одно из значений 吧. Другое (предложение «давай») — в следующей главе.",
        examples: [
          { hanzi: "你有自行车吧？", pinyin: "Nǐ yǒu zìxíngchē ba?", translation: "У тебя же есть велосипед, верно?" },
          { hanzi: "你是美国留学生吧？", pinyin: "Nǐ shì Měiguó liúxuéshēng ba?", translation: "Ты ведь американский студент?" },
          { hanzi: "那是图书馆吧？", pinyin: "Nà shì túshūguǎn ba?", translation: "То ведь библиотека?" },
          { hanzi: "你们明天有汉语课吧？", pinyin: "Nǐmen míngtiān yǒu Hànyǔ kè ba?", translation: "У вас же завтра китайский?" },
        ],
      },
      {
        title: "Слова направления как часть существительного: X + 里/上/下/后…",
        explanation:
          "В Главе 4-5 мы учили полные формы: 里边, 上边, 下边 и т.д. Но когда они стоят сразу ПОСЛЕ существительного, 边 можно опустить и остаётся просто 里, 上, 下, 后, 前, 外, 里边/旁边 (旁 нельзя опускать).\n\n" +
          "Схема:  Существительное + место (里/上/下/前/后/外)\n\n" +
          "车棚里 — в велопарковке\n" +
          "宿舍楼后 — за общежитием\n" +
          "桌子上 — на столе\n" +
          "教室外 — снаружи аудитории\n\n" +
          "Это более разговорный способ, без 的 и без 边.",
        examples: [
          { hanzi: "车在车棚里。", pinyin: "Chē zài chēpéng li.", translation: "Велосипед в велопарковке." },
          { hanzi: "她的自行车在楼后。", pinyin: "Tā de zìxíngchē zài lóu hòu.", translation: "Её велосипед за зданием." },
          { hanzi: "古丽在车棚里。", pinyin: "Gǔlì zài chēpéng li.", translation: "Гульнара в велопарковке." },
          { hanzi: "老师在教室里。", pinyin: "Lǎoshī zài jiàoshì li.", translation: "Учитель в аудитории." },
        ],
      },
      {
        title: "Слова времени как обстоятельство",
        explanation:
          "Слова времени (今天, 明天, 晚上, 上午, 八点…) ставятся ПЕРЕД глаголом или в начало предложения.\n\n" +
          "Схема 1:  Подл. + [Время] + Глагол + …\n" +
          "我明天八点有课。\n\n" +
          "Схема 2:  [Время] + Подл. + Глагол + …\n" +
          "今天晚上你有时间吗？\n\n" +
          "Можно комбинировать несколько слов времени (от больших к меньшим):\n" +
          "今天晚上八点 — сегодня вечером в 8.\n" +
          "明天下午 — завтра днём.\n\n" +
          "В КИТАЙСКОМ время НЕ ставится в конец (как в английском/русском):\n" +
          "❌ 我有课明天\n" +
          "✅ 我明天有课",
        examples: [
          { hanzi: "今天晚上你有时间吗？", pinyin: "Jīntiān wǎnshang nǐ yǒu shíjiān ma?", translation: "У тебя есть время сегодня вечером?" },
          { hanzi: "我明天八点有课。", pinyin: "Wǒ míngtiān bā diǎn yǒu kè.", translation: "У меня завтра в 8 занятия." },
          { hanzi: "电影晚上有电影。", pinyin: "Diànyǐng wǎnshang yǒu diànyǐng.", translation: "Вечером будут показывать кино." },
          { hanzi: "阿曼下午有事。", pinyin: "Āmàn xiàwǔ yǒu shì.", translation: "У Давэя днём дела." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Одалживаем велосипед (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，明天你有课吗？", pinyin: "Zhōngcūn, míngtiān nǐ yǒu kè ma?", translation: "Накамура, у тебя завтра есть занятия?" },
          { speaker: "B", hanzi: "我上午有课，下午没有。", pinyin: "Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu.", translation: "Утром есть, днём нет." },
          { speaker: "A", hanzi: "你有自行车吧？", pinyin: "Nǐ yǒu zìxíngchē ba?", translation: "У тебя же есть велосипед, верно?" },
          { speaker: "B", hanzi: "有。什么事？", pinyin: "Yǒu. Shénme shì?", translation: "Есть. А что?" },
          { speaker: "A", hanzi: "我明天下午去见朋友，可是我没有自行车……", pinyin: "Wǒ míngtiān xiàwǔ qù jiàn péngyou, kěshì wǒ méiyǒu zìxíngchē...", translation: "Завтра днём иду к друзьям, а у меня нет велосипеда…" },
          { speaker: "B", hanzi: "没问题，我有。这是钥匙，车在楼下车棚里。", pinyin: "Méi wèntí, wǒ yǒu. Zhè shì yàoshi, chē zài lóu xià chēpéng li.", translation: "Без проблем, у меня есть. Вот ключ, велосипед внизу в велопарковке." },
          { speaker: "A", hanzi: "是宿舍楼后边的车棚吗？", pinyin: "Shì sùshèlóu hòubian de chēpéng ma?", translation: "Велопарковка за общежитием?" },
          { speaker: "B", hanzi: "对。", pinyin: "Duì.", translation: "Да." },
        ],
      },
      {
        title: "Пойдём в кино (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，今天晚上你有时间吗？", pinyin: "Gǔlì, jīntiān wǎnshang nǐ yǒu shíjiān ma?", translation: "Гульнара, у тебя есть время сегодня вечером?" },
          { speaker: "B", hanzi: "有。有事吗？", pinyin: "Yǒu. Yǒu shì ma?", translation: "Есть. А что?" },
          { speaker: "A", hanzi: "学校电影院有电影，你去吗？", pinyin: "Xuéxiào diànyǐngyuàn yǒu diànyǐng, nǐ qù ma?", translation: "В школьном кинотеатре показывают фильм, пойдёшь?" },
          { speaker: "B", hanzi: "什么电影？", pinyin: "Shénme diànyǐng?", translation: "Какой фильм?" },
          { speaker: "A", hanzi: "我不知道名字，可是听说很有名。", pinyin: "Wǒ bù zhīdào míngzi, kěshì tīngshuō hěn yǒumíng.", translation: "Названия не знаю, но говорят очень известный." },
          { speaker: "B", hanzi: "我当然去。", pinyin: "Wǒ dāngrán qù.", translation: "Конечно пойду." },
        ],
      },
    ],

    tips: [
      "Деление дня: 早上 (5-9) → 上午 (9-12) → 中午 (12-13) → 下午 (13-18) → 晚上 (18-24). Используй нужное слово, чтобы указать точный период.",
      "可是 и 但是 оба значат «но». 可是 чуть более разговорное, 但是 более нейтральное. Между собой почти взаимозаменяемы.",
      "没有 часто сокращается до 没 (méi): 我没课 = у меня нет занятий. Но при первом знакомстве лучше говорить полную форму 没有.",
      "Запомни пары-противоположности: 今天/明天 (сегодня/завтра), 上午/下午 (до/после полудня), 里/外 (внутри/снаружи), 前/后 (перед/за).",
      "当然 (dāngrán) — очень полезное слово для согласия: «конечно!», «разумеется!». Используй вместо 好 когда хочешь подчеркнуть готовность.",
    ],
  },

  8: {
    introduction:
      "В этой главе вы научитесь называть номер телефона, комнаты, маршрут автобуса, спрашивать «как добраться?» и предлагать «давай...» через частицу 吧. Также познакомитесь с разницей 几 / 多少.\n\n" +
      "Ситуация: 王红 звонит 古丽 и приглашает в гости в Цинхуа, они обмениваются адресом и телефонами.",

    vocabulary: [
      { hanzi: "周末", pinyin: "zhōumò", translation: "выходные" },
      { hanzi: "啊", pinyin: "a", translation: "частица эмоционального оттенка" },
      { hanzi: "不过", pinyin: "búguò", translation: "но, однако (мягче, чем 可是)" },
      { hanzi: "怎么", pinyin: "zěnme", translation: "как, каким образом" },
      { hanzi: "走", pinyin: "zǒu", translation: "идти, ходить, добираться" },
      { hanzi: "路", pinyin: "lù", translation: "маршрут, дорога" },
      { hanzi: "和", pinyin: "hé", translation: "и (союз между существительными)" },
      { hanzi: "公共汽车", pinyin: "gōnggòng qìchē", translation: "автобус (общественный)" },
      { hanzi: "都", pinyin: "dōu", translation: "все, оба" },
      { hanzi: "到", pinyin: "dào", translation: "прибывать, доезжать" },
      { hanzi: "骑", pinyin: "qí", translation: "ехать верхом (на велосипеде/мотоцикле)" },
      { hanzi: "快", pinyin: "kuài", translation: "быстрый, быстро" },
      { hanzi: "分钟", pinyin: "fēnzhōng", translation: "минута (длительность)" },
      { hanzi: "就", pinyin: "jiù", translation: "уже, сразу же (подчёркивает быстроту)" },
      { hanzi: "校园", pinyin: "xiàoyuán", translation: "кампус, студгородок" },
      { hanzi: "东南", pinyin: "dōngnán", translation: "юго-восток" },
      { hanzi: "东", pinyin: "dōng", translation: "восток" },
      { hanzi: "号", pinyin: "hào", translation: "номер" },
      { hanzi: "房间", pinyin: "fángjiān", translation: "комната" },
      { hanzi: "多少", pinyin: "duōshao", translation: "сколько (для больших чисел)" },
      { hanzi: "室", pinyin: "shì", translation: "комната (в адресе)" },
      { hanzi: "电话", pinyin: "diànhuà", translation: "телефон" },
      { hanzi: "号码", pinyin: "hàomǎ", translation: "номер (телефонный, серийный)" },
      { hanzi: "手机", pinyin: "shǒujī", translation: "мобильный телефон" },
      { hanzi: "等", pinyin: "děng", translation: "ждать" },
    ],

    grammar: [
      {
        title: "Частица 吧 (2) — предложение «давай...»",
        explanation:
          "Это второе значение 吧 (первое — «подтверждение», Глава 7). Здесь 吧 в конце утверждения превращает его в МЯГКОЕ ПРЕДЛОЖЕНИЕ, типа «давай» или «давайте».\n\n" +
          "Схема:  Предложение + 吧！\n\n" +
          "Без 吧: 我们去图书馆。— «Мы идём в библиотеку» (утверждение)\n" +
          "С 吧: 我们去图书馆吧！— «Давай пойдём в библиотеку!»\n\n" +
          "Это не приказ, а дружеское предложение.",
        examples: [
          { hanzi: "来我们学校玩儿吧！", pinyin: "Lái wǒmen xuéxiào wánr ba!", translation: "Давай к нам в университет в гости!" },
          { hanzi: "我们去图书馆吧！", pinyin: "Wǒmen qù túshūguǎn ba!", translation: "Давай пойдём в библиотеку!" },
          { hanzi: "我们骑自行车去吧！", pinyin: "Wǒmen qí zìxíngchē qù ba!", translation: "Давай поедем на велосипедах!" },
          { hanzi: "来我家玩儿吧！", pinyin: "Lái wǒ jiā wánr ba!", translation: "Приходи ко мне в гости!" },
        ],
      },
      {
        title: "Частица 呢 (2) — смягчение специальных вопросов",
        explanation:
          "В Главе 2 мы учили 呢 для встречных вопросов (你呢？). Это второе значение: 呢 в конце СПЕЦИАЛЬНОГО вопроса (с 怎么/哪儿/谁/什么) смягчает его, делает более раздумчивым.\n\n" +
          "Без 呢: 去图书馆怎么走？— «Как пройти в библиотеку?» (прямой вопрос)\n" +
          "С 呢: 去图书馆怎么走呢？— «А как пройти в библиотеку?» (мягче, задумчивее)\n\n" +
          "Различие тонкое и похоже на русский оттенок с «а?»: «а как пройти?», «а где это?».",
        examples: [
          { hanzi: "去你们学校怎么走呢？", pinyin: "Qù nǐmen xuéxiào zěnme zǒu ne?", translation: "А как добраться до вашего университета?" },
          { hanzi: "这是谁的书呢？", pinyin: "Zhè shì shéi de shū ne?", translation: "А чья это книга?" },
          { hanzi: "古丽在哪儿呢？", pinyin: "Gǔlì zài nǎr ne?", translation: "А где Гульнара?" },
          { hanzi: "去图书馆怎么走呢？", pinyin: "Qù túshūguǎn zěnme zǒu ne?", translation: "А как пройти в библиотеку?" },
        ],
      },
      {
        title: "Номера: телефоны, комнаты, автобусы",
        explanation:
          "Номера читаются ПО ОДНОЙ ЦИФРЕ (в отличие от обычных чисел, которые читаются как «сорок пять» и т.п.).\n\n" +
          "Пример: телефон 63861023 → 六三八六一〇二三 (liù sān bā liù yī líng èr sān).\n\n" +
          "Важно: цифра «1» в номерах часто произносится как 幺 (yāo) вместо 一 (yī). Это чтобы не перепутать с «семь» (qī) по телефону.\n\n" +
          "• Номер дома/комнаты: 502室 → 五〇二室 (wǔ líng èr shì)\n" +
          "• Маршрут автобуса: 21路 → 二十一路 (обычное число) или 二一路 (цифры)\n" +
          "• Большие номера автобусов: 108路 → 幺〇八路 (yāo líng bā lù)",
        examples: [
          { hanzi: "我的房间号是201。", pinyin: "Wǒ de fángjiān hào shì èr líng yāo.", translation: "Номер моей комнаты 201." },
          { hanzi: "我的电话是63861023。", pinyin: "Wǒ de diànhuà shì liù sān bā liù yāo líng èr sān.", translation: "Мой телефон 6386-1023." },
          { hanzi: "108路公共汽车到北京大学。", pinyin: "Yāo líng bā lù gōnggòng qìchē dào Běijīng Dàxué.", translation: "Автобус 108 идёт до Пекинского университета." },
          { hanzi: "我的宿舍是东5号楼502室。", pinyin: "Wǒ de sùshè shì dōng wǔ hào lóu wǔ líng èr shì.", translation: "Моё общежитие — восточный корпус 5, комната 502." },
        ],
      },
      {
        title: "几 vs 多少 — когда что использовать",
        explanation:
          "Оба значат «сколько», но разница в ожидаемой величине:\n\n" +
          "• 几 (jǐ) — ожидается МАЛОЕ число (обычно до 10). Требует счётного слова.\n" +
          "  你有几个朋友？— Сколько у тебя друзей? (ожидаю 1-10)\n" +
          "  几点？— Который час? (1-24)\n\n" +
          "• 多少 (duōshao) — ожидается БОЛЬШОЕ число ИЛИ точно не знаешь сколько. Счётное слово НЕ обязательно.\n" +
          "  你的电话是多少？— Какой у тебя номер? (много цифр)\n" +
          "  多少钱？— Сколько стоит?\n" +
          "  多少学生？— Сколько студентов? (может быть много)\n\n" +
          "Для номеров (телефона, дома, автобуса) ВСЕГДА 多少.",
        examples: [
          { hanzi: "你的房间号是多少？", pinyin: "Nǐ de fángjiān hào shì duōshao?", translation: "Какой у тебя номер комнаты?" },
          { hanzi: "你的宿舍是几号楼？", pinyin: "Nǐ de sùshè shì jǐ hào lóu?", translation: "В каком корпусе твоё общежитие? (ожидается 1-9)" },
          { hanzi: "阿曼的电话号码是多少？", pinyin: "Āmàn de diànhuà hàomǎ shì duōshao?", translation: "Какой у Давэя номер телефона?" },
          { hanzi: "你有几个中国朋友？", pinyin: "Nǐ yǒu jǐ ge Zhōngguó péngyou?", translation: "Сколько у тебя китайских друзей?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "В гости в Цинхуа (王红 и 古丽 по телефону)",
        lines: [
          { speaker: "A", hanzi: "古丽，周末你有空儿吗？", pinyin: "Gǔlì, zhōumò nǐ yǒu kòngr ma?", translation: "Гульнара, на выходных свободна?" },
          { speaker: "B", hanzi: "有。什么事？", pinyin: "Yǒu. Shénme shì?", translation: "Да. А что?" },
          { speaker: "A", hanzi: "来我们学校玩儿吧！", pinyin: "Lái wǒmen xuéxiào wánr ba!", translation: "Приезжай к нам в университет в гости!" },
          { speaker: "B", hanzi: "好啊！不过，去你们学校怎么走呢？", pinyin: "Hǎo a! Búguò, qù nǐmen xuéxiào zěnme zǒu ne?", translation: "Хорошо! А как к вам добраться?" },
          { speaker: "A", hanzi: "21路和106路公共汽车都到。骑自行车也很快，十五分钟就到。", pinyin: "Èrshíyī lù hé yāo líng liù lù gōnggòng qìchē dōu dào. Qí zìxíngchē yě hěn kuài, shíwǔ fēnzhōng jiù dào.", translation: "Автобусы 21 и 106 оба идут. На велосипеде тоже быстро — 15 минут и ты на месте." },
          { speaker: "B", hanzi: "你的宿舍在哪儿？", pinyin: "Nǐ de sùshè zài nǎr?", translation: "А где твоё общежитие?" },
          { speaker: "A", hanzi: "在校园的东南边，是东5号楼。", pinyin: "Zài xiàoyuán de dōngnánbian, shì dōng wǔ hào lóu.", translation: "На юго-востоке кампуса, восточный корпус 5." },
          { speaker: "B", hanzi: "你的房间号是多少？", pinyin: "Nǐ de fángjiān hào shì duōshao?", translation: "Какой у тебя номер комнаты?" },
          { speaker: "A", hanzi: "502号。我的宿舍是东5号楼502室。", pinyin: "Wǔ líng èr hào. Wǒ de sùshè shì dōng wǔ hào lóu wǔ líng èr shì.", translation: "502. Моё общежитие — восточный корпус 5, комната 502." },
          { speaker: "B", hanzi: "你的电话号码是多少？", pinyin: "Nǐ de diànhuà hàomǎ shì duōshao?", translation: "Какой у тебя номер телефона?" },
          { speaker: "A", hanzi: "63861023。你有手机吗？", pinyin: "Liù sān bā liù yāo líng èr sān. Nǐ yǒu shǒujī ma?", translation: "6386-1023. У тебя есть мобильный?" },
          { speaker: "B", hanzi: "没有，不过我朋友有。", pinyin: "Méiyǒu, búguò wǒ péngyou yǒu.", translation: "Нет, но у моего друга есть." },
          { speaker: "A", hanzi: "号码是多少？", pinyin: "Hàomǎ shì duōshao?", translation: "Какой номер?" },
          { speaker: "B", hanzi: "13695670132。", pinyin: "Yāo sān liù jiǔ wǔ liù qī líng yāo sān èr.", translation: "13695670132." },
          { speaker: "A", hanzi: "好，我等你。", pinyin: "Hǎo, wǒ děng nǐ.", translation: "Хорошо, жду тебя." },
        ],
      },
    ],

    tips: [
      "Цифра 1 в номерах = 幺 (yāo), не 一. Это чтобы не спутать с 七 (qī). Все китайцы говорят номера через 幺, а не 一.",
      "就 (jiù) подчёркивает быстроту/лёгкость: 十五分钟就到 = «и всего за 15 минут добираешься». Переводится как «уже», «сразу же», но часто только эмоциональный оттенок «и всё».",
      "Разница 和 и 跟: оба значат «и» между существительными. 和 (hé) — стандартное письменное, 跟 (gēn) — разговорное. В Главе 8 пока только 和.",
      "不过 мягче чем 可是 и 但是. Можно перевести как «правда», «впрочем». Часто используется когда хочешь возразить мягко.",
      "Порядок адреса в Китае ОБРАТНЫЙ русскому: страна → город → район → корпус → комната. 北京大学东5号楼502室 — «Пекинский университет, восточный корпус 5, комната 502».",
    ],
  },

  9: {
    introduction:
      "В этой главе вы научитесь делать покупки в магазине: спрашивать цену, считать деньги в юанях, использовать счётные слова (瓶, 本) и различать 二 / 两 (два).\n\n" +
      "Ситуации: 阿曼 покупает пиво и воду в киоске, 古丽 покупает англо-китайский словарь в книжном.",

    vocabulary: [
      { hanzi: "师傅", pinyin: "shīfu", translation: "уважительное обращение к работникам (мастер, шеф)" },
      { hanzi: "买", pinyin: "mǎi", translation: "покупать" },
      { hanzi: "啤酒", pinyin: "píjiǔ", translation: "пиво" },
      { hanzi: "售货员", pinyin: "shòuhuòyuán", translation: "продавец, кассир" },
      { hanzi: "瓶", pinyin: "píng", translation: "бутылка (счётное слово)" },
      { hanzi: "钱", pinyin: "qián", translation: "деньги" },
      { hanzi: "块", pinyin: "kuài", translation: "юань (разговорное)" },
      { hanzi: "两", pinyin: "liǎng", translation: "два (перед счётным словом)" },
      { hanzi: "再", pinyin: "zài", translation: "ещё, снова" },
      { hanzi: "水", pinyin: "shuǐ", translation: "вода" },
      { hanzi: "一共", pinyin: "yígòng", translation: "всего, в общей сумме" },
      { hanzi: "毛", pinyin: "máo", translation: "цзяо, 1/10 юаня (разговорное)" },
      { hanzi: "给", pinyin: "gěi", translation: "давать, вручать" },
      { hanzi: "小姐", pinyin: "xiǎojie", translation: "девушка, мисс" },
      { hanzi: "看", pinyin: "kàn", translation: "смотреть, глядеть" },
      { hanzi: "这些", pinyin: "zhèxiē", translation: "эти (множественное)" },
      { hanzi: "要", pinyin: "yào", translation: "хотеть, нуждаться" },
      { hanzi: "本", pinyin: "běn", translation: "счётное слово для книг" },
      { hanzi: "小", pinyin: "xiǎo", translation: "маленький" },
      { hanzi: "零钱", pinyin: "língqián", translation: "мелочь, сдача" },
    ],

    grammar: [
      {
        title: "Счётные слова (量词) — обязательны с числами!",
        explanation:
          "В китайском между числом (или 这/那) и существительным ОБЯЗАТЕЛЬНО ставится счётное слово. Нельзя сказать «одна книга» как 一书 — нужно 一本书.\n\n" +
          "Схема:  Число / 这 / 那 / 几 + Счётное слово + Существительное\n\n" +
          "Основные счётные слова:\n" +
          "个 (ge) — универсальное (люди, предметы)\n" +
          "本 (běn) — книги, словари, журналы\n" +
          "瓶 (píng) — бутылки\n" +
          "块 (kuài) — кусочки; юани (в деньгах)\n" +
          "辆 (liàng) — транспорт (машина, велосипед)\n" +
          "位 (wèi) — вежливое для людей (учителя, гости)\n" +
          "条 (tiáo) — длинные объекты (собака, дорога, река)\n\n" +
          "Само существительное иногда можно опустить, если понятно:\n" +
          "— 多少钱一瓶？— Сколько за бутылку? (什么бутылка понятно)",
        examples: [
          { hanzi: "我要一本小词典。", pinyin: "Wǒ yào yì běn xiǎo cídiǎn.", translation: "Мне нужен один маленький словарь." },
          { hanzi: "我买两瓶啤酒。", pinyin: "Wǒ mǎi liǎng píng píjiǔ.", translation: "Я покупаю две бутылки пива." },
          { hanzi: "21路公共汽车。", pinyin: "Èrshíyī lù gōnggòng qìchē.", translation: "Автобус 21-го маршрута." },
          { hanzi: "一位老师", pinyin: "yí wèi lǎoshī", translation: "один учитель (вежливо)" },
        ],
      },
      {
        title: "二 и 两 — оба «два», но разные",
        explanation:
          "二 (èr) и 两 (liǎng) — оба значат «2», но используются по-разному:\n\n" +
          "二 (èr) — используется:\n" +
          "• При счёте (一, 二, 三...)\n" +
          "• В составных числах (十二=12, 二十=20, 二十二=22)\n" +
          "• В порядковых (第二 — второй, 二号 — номер 2)\n" +
          "• В адресах и номерах (二号楼 — корпус 2)\n\n" +
          "两 (liǎng) — используется:\n" +
          "• Перед счётным словом: 两本书 (2 книги), 两个朋友 (2 друга), 两瓶水\n" +
          "• Перед «большими» числами: 两千 (2000), 两万 (20000), 两亿\n\n" +
          "Простое правило: если дальше идёт счётное слово или «тысяча/миллион» → 两. В остальных случаях → 二.",
        examples: [
          { hanzi: "两本书", pinyin: "liǎng běn shū", translation: "две книги" },
          { hanzi: "十二块", pinyin: "shí'èr kuài", translation: "12 юаней" },
          { hanzi: "第二号楼", pinyin: "dì èr hào lóu", translation: "корпус номер 2" },
          { hanzi: "两千块", pinyin: "liǎng qiān kuài", translation: "2000 юаней" },
        ],
      },
      {
        title: "Деньги в юанях — 块 / 毛 / 分",
        explanation:
          "Китайские деньги (人民币, РМБ):\n\n" +
          "• 元 (yuán) — юань (письменно). Разговорно: 块 (kuài).\n" +
          "• 角 (jiǎo) — 1/10 юаня. Разговорно: 毛 (máo).\n" +
          "• 分 (fēn) — 1/100 юаня (мелочь, редко используется).\n\n" +
          "Схема цен:\n" +
          "5.50 юаней → 五块五（毛）— 5 юаней 5 мао\n" +
          "12.50 юаней → 十二块五（毛）\n" +
          "6.20 юаней → 六块二（毛）\n" +
          "74.82 юаней → 七十四块八毛二（分）\n\n" +
          "Последнее «毛/分» в разговоре обычно опускается.\n\n" +
          "«Сколько стоит?»:  多少钱？ / 多少钱一瓶？",
        examples: [
          { hanzi: "多少钱一瓶？", pinyin: "Duōshao qián yì píng?", translation: "Сколько за бутылку?" },
          { hanzi: "三块五。", pinyin: "Sān kuài wǔ.", translation: "3 юаня 5 мао." },
          { hanzi: "一共九块四毛钱。", pinyin: "Yígòng jiǔ kuài sì máo qián.", translation: "Итого 9 юаней 4 мао." },
          { hanzi: "二十二块。", pinyin: "Èrshí'èr kuài.", translation: "22 юаня." },
        ],
      },
    ],

    dialogues: [
      {
        title: "В продуктовом магазине (阿曼 и продавец)",
        lines: [
          { speaker: "A", hanzi: "师傅，我买啤酒。", pinyin: "Shīfu, wǒ mǎi píjiǔ.", translation: "Мастер, я хочу купить пиво." },
          { speaker: "B", hanzi: "你买几瓶？", pinyin: "Nǐ mǎi jǐ píng?", translation: "Сколько бутылок?" },
          { speaker: "A", hanzi: "多少钱一瓶？", pinyin: "Duōshao qián yì píng?", translation: "Сколько за бутылку?" },
          { speaker: "B", hanzi: "三块五。", pinyin: "Sān kuài wǔ.", translation: "3 юаня 5 мао." },
          { speaker: "A", hanzi: "我买两瓶，再买两瓶水。", pinyin: "Wǒ mǎi liǎng píng, zài mǎi liǎng píng shuǐ.", translation: "Беру две, и ещё две бутылки воды." },
          { speaker: "B", hanzi: "两瓶啤酒七块，两瓶水两块四，一共是九块四毛钱。", pinyin: "Liǎng píng píjiǔ qī kuài, liǎng píng shuǐ liǎng kuài sì, yígòng shì jiǔ kuài sì máo qián.", translation: "Две бутылки пива — 7 юаней, две воды — 2.40, итого 9.40." },
          { speaker: "A", hanzi: "给你钱。", pinyin: "Gěi nǐ qián.", translation: "Вот деньги." },
        ],
      },
      {
        title: "В книжном (古丽 и продавец)",
        lines: [
          { speaker: "A", hanzi: "小姐，有英汉词典吗？", pinyin: "Xiǎojie, yǒu Yīng-Hàn cídiǎn ma?", translation: "Девушка, есть англо-китайский словарь?" },
          { speaker: "B", hanzi: "有。你看，这些都是，你要哪本呢？", pinyin: "Yǒu. Nǐ kàn, zhèxiē dōu shì, nǐ yào nǎ běn ne?", translation: "Да, есть. Вот смотрите, все эти. Какой хотите?" },
          { speaker: "A", hanzi: "我要这本小词典。多少钱一本？", pinyin: "Wǒ yào zhè běn xiǎo cídiǎn. Duōshao qián yì běn?", translation: "Хочу вот этот маленький словарь. Сколько стоит?" },
          { speaker: "B", hanzi: "二十二块。", pinyin: "Èrshí'èr kuài.", translation: "22 юаня." },
          { speaker: "A", hanzi: "对不起，我没有零钱。", pinyin: "Duìbuqǐ, wǒ méiyǒu língqián.", translation: "Извините, у меня нет мелочи." },
          { speaker: "B", hanzi: "没关系。", pinyin: "Méi guānxi.", translation: "Ничего страшного." },
        ],
      },
    ],

    tips: [
      "师傅 (shīfu) — обращение к таксистам, мастерам, продавцам, рабочим. Дословно «учитель-мастер». Очень вежливо и уместно в любом бытовом контексте.",
      "Главное счётное слово 个 (ge) подходит почти всегда, если не знаешь правильное. Но если знаешь — используй подходящее (本 для книг, 瓶 для бутылок и т.д.), звучит грамотнее.",
      "В цене последнее «毛/分» часто опускают: 三块五 = 3 юаня 5 мао (подразумевается 3.50). Если бы было 3 юаня 5 фэнь — сказали бы полностью 三块零五分.",
      "要 (yào) — «хотеть/брать» в магазине. «Я беру вот этот» = 我要这本. Более разговорно и уверенно, чем 我买.",
      "英汉 / 汉英 / 汉日 — структура «язык1-язык2 словарь» = с первого на второй. 英汉词典 = англо-китайский (с англ. на кит.).",
    ],
  },

  10: {
    introduction:
      "Это итоговая глава Unit 2 — повторение и расширение. Вы научитесь рассказывать о своей семье, использовать счётное слово 口 (для членов семьи) и 条 (для собак, рек, дорог), а также слово 还 («ещё, вдобавок»).\n\n" +
      "Ситуация: 古丽 и 王红 смотрят семейное фото и рассказывают друг другу о своих семьях.",

    vocabulary: [
      { hanzi: "照片", pinyin: "zhàopiàn", translation: "фото, фотография" },
      { hanzi: "家", pinyin: "jiā", translation: "семья, дом" },
      { hanzi: "口", pinyin: "kǒu", translation: "счётное слово для членов семьи" },
      { hanzi: "爷爷", pinyin: "yéye", translation: "дедушка (по отцу)" },
      { hanzi: "奶奶", pinyin: "nǎinai", translation: "бабушка (по отцу)" },
      { hanzi: "爸爸", pinyin: "bàba", translation: "папа" },
      { hanzi: "妈妈", pinyin: "māma", translation: "мама" },
      { hanzi: "哥哥", pinyin: "gēge", translation: "старший брат" },
      { hanzi: "姐姐", pinyin: "jiějie", translation: "старшая сестра" },
      { hanzi: "家庭", pinyin: "jiātíng", translation: "семья (как ячейка общества)" },
      { hanzi: "一般", pinyin: "yìbān", translation: "обычно, в общем" },
      { hanzi: "只", pinyin: "zhǐ", translation: "только, лишь" },
      { hanzi: "孩子", pinyin: "háizi", translation: "ребёнок" },
      { hanzi: "弟弟", pinyin: "dìdi", translation: "младший брат" },
      { hanzi: "妹妹", pinyin: "mèimei", translation: "младшая сестра" },
      { hanzi: "还", pinyin: "hái", translation: "ещё, вдобавок, также" },
      { hanzi: "条", pinyin: "tiáo", translation: "счётное слово (длинные/тонкие объекты)" },
      { hanzi: "狗", pinyin: "gǒu", translation: "собака" },
      { hanzi: "这样", pinyin: "zhèyàng", translation: "так, таким образом" },
    ],

    grammar: [
      {
        title: "Счётное слово 口 — для членов семьи",
        explanation:
          "口 (kǒu) — особое счётное слово для подсчёта человек в СЕМЬЕ. В других контекстах 口 для людей НЕ используется — там 个.\n\n" +
          "Вопрос:  你家有几口人？— «Сколько человек в твоей семье?»\n" +
          "Ответ:  我家有五口人。— «В моей семье пять человек.»\n\n" +
          "Нельзя сказать:\n" +
          "❌ 五口学生 (пять студентов — там 个)\n" +
          "❌ 五口朋友 (пять друзей — там 个)\n\n" +
          "Только:  ⃝口 + 人 (про семью).",
        examples: [
          { hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", translation: "Сколько человек в твоей семье?" },
          { hanzi: "我家有五口人。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén.", translation: "В моей семье пять человек." },
          { hanzi: "一共六口人。", pinyin: "Yígòng liù kǒu rén.", translation: "Итого шесть человек." },
          { hanzi: "我家有四口人：爸爸、妈妈、哥哥和我。", pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.", translation: "В нашей семье четверо: папа, мама, старший брат и я." },
        ],
      },
      {
        title: "Счётное слово 条 — для длинных/тонких объектов",
        explanation:
          "条 (tiáo) используется для предметов, имеющих длинную, тонкую или гибкую форму.\n\n" +
          "Что считается через 条:\n" +
          "• Собаки — 一条狗 (одна собака)\n" +
          "• Рыбы — 一条鱼\n" +
          "• Реки — 一条河\n" +
          "• Дороги — 一条路\n" +
          "• Улицы — 一条街\n" +
          "• Штаны/юбки — 一条裤子\n" +
          "• Шарфы/полотенца — 一条围巾\n\n" +
          "Логика — «длинное и тонкое/гибкое».",
        examples: [
          { hanzi: "我家有一条狗。", pinyin: "Wǒ jiā yǒu yì tiáo gǒu.", translation: "У нас дома есть собака." },
          { hanzi: "还有一条狗。", pinyin: "Hái yǒu yì tiáo gǒu.", translation: "И ещё собака." },
          { hanzi: "北京有很多条路。", pinyin: "Běijīng yǒu hěn duō tiáo lù.", translation: "В Пекине много дорог." },
          { hanzi: "两条鱼", pinyin: "liǎng tiáo yú", translation: "две рыбы" },
        ],
      },
      {
        title: "Наречие 还 — «ещё, вдобавок, также»",
        explanation:
          "还 (hái) добавляет что-то к уже сказанному. Ставится перед глаголом.\n\n" +
          "Схема:  Подл. + 还 + Глагол + Объект\n\n" +
          "我有爸爸、妈妈，还有一个哥哥。\n" +
          "«У меня есть папа, мама и ещё старший брат.»\n\n" +
          "Часто 还有… = «и ещё есть…» — идеальное выражение для списков.\n\n" +
          "还 в других значениях:\n" +
          "• «Всё ещё»: 我还在家 — Я всё ещё дома.\n" +
          "• «Довольно» (с прилагательным): 还好 — неплохо.\n" +
          "В Главе 10 акцент только на «ещё, вдобавок».",
        examples: [
          { hanzi: "我家有爸爸、妈妈，还有一条狗。", pinyin: "Wǒ jiā yǒu bàba, māma, hái yǒu yì tiáo gǒu.", translation: "У нас дома папа, мама и ещё собака." },
          { hanzi: "我有美国朋友，还有日本朋友。", pinyin: "Wǒ yǒu Měiguó péngyou, hái yǒu Rìběn péngyou.", translation: "У меня есть американские и ещё японские друзья." },
          { hanzi: "我有一个姐姐，还有一个妹妹。", pinyin: "Wǒ yǒu yí ge jiějie, hái yǒu yí ge mèimei.", translation: "У меня есть старшая сестра и ещё младшая." },
        ],
      },
    ],

    dialogues: [
      {
        title: "О семьях (古丽 и 王红)",
        lines: [
          { speaker: "A", hanzi: "这是你的照片吗？", pinyin: "Zhè shì nǐ de zhàopiàn ma?", translation: "Это твоё фото?" },
          { speaker: "B", hanzi: "对，是我家的照片。", pinyin: "Duì, shì wǒ jiā de zhàopiàn.", translation: "Да, это фото моей семьи." },
          { speaker: "A", hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", translation: "Сколько человек в твоей семье?" },
          { speaker: "B", hanzi: "我家有五口人：爷爷、奶奶、爸爸、妈妈和我。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén: yéye, nǎinai, bàba, māma hé wǒ.", translation: "В нашей семье пятеро: дедушка, бабушка, папа, мама и я." },
          { speaker: "A", hanzi: "你没有哥哥姐姐吗？", pinyin: "Nǐ méiyǒu gēge jiějie ma?", translation: "А братьев и сестёр нет?" },
          { speaker: "B", hanzi: "没有，现在中国家庭一般只有一个孩子。古丽，你家都有什么人？", pinyin: "Méiyǒu, xiànzài Zhōngguó jiātíng yìbān zhǐ yǒu yí ge háizi. Gǔlì, nǐ jiā dōu yǒu shénme rén?", translation: "Нет, сейчас в китайских семьях обычно только один ребёнок. А у тебя кто в семье, Гульнара?" },
          { speaker: "A", hanzi: "我家有爸爸、妈妈、哥哥、弟弟、妹妹，还有一条狗。", pinyin: "Wǒ jiā yǒu bàba, māma, gēge, dìdi, mèimei, hái yǒu yì tiáo gǒu.", translation: "У нас папа, мама, старший брат, младший брат, младшая сестра и ещё собака." },
          { speaker: "B", hanzi: "一共六口人？", pinyin: "Yígòng liù kǒu rén?", translation: "Итого шесть человек?" },
          { speaker: "A", hanzi: "不，七口。", pinyin: "Bù, qī kǒu.", translation: "Нет, семь." },
          { speaker: "B", hanzi: "爸爸、妈妈、一个哥哥、一个弟弟、一个妹妹和你，六口，对吧？", pinyin: "Bàba, māma, yí ge gēge, yí ge dìdi, yí ge mèimei hé nǐ, liù kǒu, duì ba?", translation: "Папа, мама, один брат, один младший, сестра и ты — шесть, верно?" },
          { speaker: "A", hanzi: "不对，还有一条狗。", pinyin: "Bú duì, hái yǒu yì tiáo gǒu.", translation: "Нет, ещё собака!" },
          { speaker: "B", hanzi: "是这样……", pinyin: "Shì zhèyàng...", translation: "Вот оно как..." },
        ],
      },
    ],

    tips: [
      "В Китае до 2015 года действовала «политика одного ребёнка» (一胎政策) — большинство семей 王红 в 2003 году имели только одного ребёнка. Это важный культурный контекст.",
      "Семья по линиям: 爷爷/奶奶 — по отцу, 外公/外婆 (wàigōng/wàipó) — по матери. В современном Китае 爷爷/奶奶 часто используется общо для любого дедушки.",
      "Братья/сёстры в китайском ВСЕГДА разделяются по возрасту: 哥哥 (старший) ≠ 弟弟 (младший). Не существует общего слова «брат».",
      "Удвоение слов в названиях родственников (爸爸, 妈妈, 哥哥) — это детская/нежная форма. В формальной речи могут быть другие слова (父亲 fùqin — отец, 母亲 mǔqin — мать).",
      "对吧？ в конце — «верно? так?» (как «吧» из Главы 7 — подтверждение догадки). Очень частая разговорная фраза.",
    ],
  },

  11: {
    introduction:
      "В этой главе вы научитесь говорить о погоде, сравнивать времена года и использовать прилагательные как сказуемое (без 是). Познакомитесь с вопросом 怎么样 («как?»), конструкцией 不А不B («ни A ни B — как раз») и наречием 比较.\n\n" +
      "Ситуации: 古丽 спрашивает у 中村 какая сегодня погода, 阿曼 обсуждает с 王老师 сезоны в Пекине.",

    vocabulary: [
      { hanzi: "天气", pinyin: "tiānqì", translation: "погода" },
      { hanzi: "怎么样", pinyin: "zěnmeyàng", translation: "как? каково?" },
      { hanzi: "不太", pinyin: "bú tài", translation: "не очень, не слишком" },
      { hanzi: "风", pinyin: "fēng", translation: "ветер" },
      { hanzi: "雨", pinyin: "yǔ", translation: "дождь" },
      { hanzi: "冷", pinyin: "lěng", translation: "холодный" },
      { hanzi: "度", pinyin: "dù", translation: "градус" },
      { hanzi: "晴天", pinyin: "qíngtiān", translation: "ясная погода" },
      { hanzi: "秋天", pinyin: "qiūtiān", translation: "осень" },
      { hanzi: "热", pinyin: "rè", translation: "жаркий" },
      { hanzi: "舒服", pinyin: "shūfu", translation: "комфортно, удобно" },
      { hanzi: "最", pinyin: "zuì", translation: "самый, наиболее" },
      { hanzi: "季节", pinyin: "jìjié", translation: "сезон, время года" },
      { hanzi: "冬天", pinyin: "dōngtiān", translation: "зима" },
      { hanzi: "比较", pinyin: "bǐjiào", translation: "сравнительно, довольно" },
      { hanzi: "差不多", pinyin: "chàbuduō", translation: "почти, примерно" },
      { hanzi: "零下", pinyin: "língxià", translation: "ниже нуля" },
      { hanzi: "常常", pinyin: "chángcháng", translation: "часто, обычно" },
      { hanzi: "下", pinyin: "xià", translation: "падать, идти (о дожде/снеге)" },
      { hanzi: "雪", pinyin: "xuě", translation: "снег" },
      { hanzi: "常", pinyin: "cháng", translation: "часто" },
      { hanzi: "喜欢", pinyin: "xǐhuan", translation: "любить, нравиться" },
      { hanzi: "夏天", pinyin: "xiàtiān", translation: "лето" },
      { hanzi: "游泳", pinyin: "yóuyǒng", translation: "плавать" },
      { hanzi: "春天", pinyin: "chūntiān", translation: "весна" },
      { hanzi: "北京", pinyin: "Běijīng", translation: "Пекин" },
    ],

    grammar: [
      {
        title: "Вопрос 怎么样 — «как?, каково?»",
        explanation:
          "怎么样 (zěnmeyàng) — спрашивает о состоянии, качестве, мнении. Ставится в КОНЕЦ предложения.\n\n" +
          "Схема:  Существительное + 怎么样？\n\n" +
          "今天的天气怎么样？— Какая сегодня погода?\n" +
          "这个电影怎么样？— Как этот фильм?\n\n" +
          "Также часто используется как предложение:\n" +
          "我们去图书馆，怎么样？— Пойдём в библиотеку, как?",
        examples: [
          { hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?", translation: "Какая сегодня погода?" },
          { hanzi: "北京秋天的天气怎么样？", pinyin: "Běijīng qiūtiān de tiānqì zěnmeyàng?", translation: "Какая погода осенью в Пекине?" },
          { hanzi: "爷爷的身体怎么样？", pinyin: "Yéye de shēntǐ zěnmeyàng?", translation: "Как здоровье у дедушки?" },
          { hanzi: "这件毛衣怎么样？", pinyin: "Zhè jiàn máoyī zěnmeyàng?", translation: "Как тебе этот свитер?" },
        ],
      },
      {
        title: "Прилагательное-сказуемое без 是",
        explanation:
          "В китайском прилагательное САМО является сказуемым — 是 НЕ нужно.\n\n" +
          "❌ 这个学校是小 (неправильно!)\n" +
          "✅ 这个学校很小。— Эта школа очень маленькая.\n\n" +
          "Важно: без наречия (很, 比较, 挺, 太…) прилагательное звучит как сравнение:\n" +
          "• 我的房间大。— Моя комната большая (подразумевает сравнение: больше другой).\n" +
          "• 我的房间很大。— Моя комната просто большая (нейтрально).\n\n" +
          "Поэтому 很 часто добавляют даже когда не хотят сказать «очень» — это «грамматическая прокладка».",
        examples: [
          { hanzi: "听说北京的冬天很冷。", pinyin: "Tīngshuō Běijīng de dōngtiān hěn lěng.", translation: "Говорят, зима в Пекине холодная." },
          { hanzi: "那个学校很小。", pinyin: "Nàge xuéxiào hěn xiǎo.", translation: "Та школа маленькая." },
          { hanzi: "今天的天气不太好。", pinyin: "Jīntiān de tiānqì bú tài hǎo.", translation: "Сегодня погода не очень." },
          { hanzi: "这个电影很有名。", pinyin: "Zhège diànyǐng hěn yǒumíng.", translation: "Этот фильм очень известный." },
        ],
      },
      {
        title: "不A不B — «ни А ни B» = «в самый раз»",
        explanation:
          "Конструкция 不+прил.1 + 不+прил.2 (где прил.1 и прил.2 — антонимы) означает «не слишком X, не слишком Y — в самый раз».\n\n" +
          "Это положительная характеристика, означает идеальный баланс.\n\n" +
          "不冷不热 — не холодно и не жарко (в самый раз)\n" +
          "不大不小 — ни большой, ни маленький\n" +
          "不早不晚 — ни рано, ни поздно\n" +
          "不快不慢 — ни быстро, ни медленно",
        examples: [
          { hanzi: "北京的秋天不冷不热，很舒服。", pinyin: "Běijīng de qiūtiān bù lěng bú rè, hěn shūfu.", translation: "Осень в Пекине — не холодно и не жарко, комфортно." },
          { hanzi: "这件毛衣不大不小。", pinyin: "Zhè jiàn máoyī bú dà bù xiǎo.", translation: "Этот свитер в самый раз по размеру." },
          { hanzi: "我们不早不晚到了。", pinyin: "Wǒmen bù zǎo bù wǎn dào le.", translation: "Мы пришли вовремя." },
        ],
      },
      {
        title: "Наречия степени: 很, 比较, 挺, 最, 太, 不太",
        explanation:
          "В китайском много способов выразить степень качества:\n\n" +
          "• 很 (hěn) — «очень» / нейтральная прокладка\n" +
          "• 比较 (bǐjiào) — «сравнительно, довольно»\n" +
          "• 挺 (tǐng) — «вполне, довольно» (разговорное, часто с 的)\n" +
          "• 最 (zuì) — «самый»\n" +
          "• 太 (tài) — «слишком» (с 了)\n" +
          "• 不太 (bú tài) — «не очень, не слишком»\n\n" +
          "Схема:  Подл. + наречие + прилагательное\n\n" +
          "По силе: 不太 < 比较 ≈ 挺 < 很 < 最 < 太.",
        examples: [
          { hanzi: "北京的冬天比较冷。", pinyin: "Běijīng de dōngtiān bǐjiào lěng.", translation: "Зима в Пекине довольно холодная." },
          { hanzi: "最冷差不多零下十五度。", pinyin: "Zuì lěng chàbuduō língxià shíwǔ dù.", translation: "В самые холодные дни — примерно минус 15." },
          { hanzi: "今天不太冷。", pinyin: "Jīntiān bú tài lěng.", translation: "Сегодня не очень холодно." },
          { hanzi: "太热了！", pinyin: "Tài rè le!", translation: "Слишком жарко!" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Погода сегодня (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?", translation: "Какая сегодня погода?" },
          { speaker: "B", hanzi: "不太好，有风，下午还有雨。", pinyin: "Bú tài hǎo, yǒu fēng, xiàwǔ hái yǒu yǔ.", translation: "Не очень, ветрено, днём ещё дождь." },
          { speaker: "A", hanzi: "冷吗？", pinyin: "Lěng ma?", translation: "Холодно?" },
          { speaker: "B", hanzi: "不冷，二十度。", pinyin: "Bù lěng, èrshí dù.", translation: "Нет, 20 градусов." },
          { speaker: "A", hanzi: "明天呢？", pinyin: "Míngtiān ne?", translation: "А завтра?" },
          { speaker: "B", hanzi: "明天是晴天。", pinyin: "Míngtiān shì qíngtiān.", translation: "Завтра солнечно." },
        ],
      },
      {
        title: "Сезоны в Пекине (阿曼 и 王老师)",
        lines: [
          { speaker: "A", hanzi: "老师，北京秋天的天气怎么样？", pinyin: "Lǎoshī, Běijīng qiūtiān de tiānqì zěnmeyàng?", translation: "Учитель, какая погода осенью в Пекине?" },
          { speaker: "B", hanzi: "北京的秋天不冷不热，很舒服，是最好的季节。", pinyin: "Běijīng de qiūtiān bù lěng bú rè, hěn shūfu, shì zuì hǎo de jìjié.", translation: "Осень в Пекине — не холодно и не жарко, очень комфортно, лучший сезон." },
          { speaker: "A", hanzi: "冬天呢？听说北京的冬天很冷，是吗？", pinyin: "Dōngtiān ne? Tīngshuō Běijīng de dōngtiān hěn lěng, shì ma?", translation: "А зима? Говорят, зимой очень холодно?" },
          { speaker: "B", hanzi: "对，北京的冬天比较冷，最冷差不多零下十五度。", pinyin: "Duì, Běijīng de dōngtiān bǐjiào lěng, zuì lěng chàbuduō língxià shíwǔ dù.", translation: "Да, зима довольно холодная, в самые холодные дни около -15." },
          { speaker: "A", hanzi: "常常下雪吗？", pinyin: "Chángcháng xià xuě ma?", translation: "Часто идёт снег?" },
          { speaker: "B", hanzi: "不常下雪。阿曼，你最喜欢哪个季节？", pinyin: "Bù cháng xià xuě. Āmàn, nǐ zuì xǐhuan nǎge jìjié?", translation: "Нечасто. Аман, а какой твой любимый сезон?" },
          { speaker: "A", hanzi: "我喜欢夏天，我喜欢游泳。老师，您呢？", pinyin: "Wǒ xǐhuan xiàtiān, wǒ xǐhuan yóuyǒng. Lǎoshī, nín ne?", translation: "Я люблю лето, люблю плавать. А вы, учитель?" },
          { speaker: "B", hanzi: "我喜欢春天。", pinyin: "Wǒ xǐhuan chūntiān.", translation: "Я люблю весну." },
        ],
      },
    ],

    tips: [
      "В Китае температура в Цельсиях, не в Фаренгейтах. 二十度 = 20°C. «Минус» = 零下 (língxià — «ниже нуля»): 零下十度 = -10°C.",
      "Четыре сезона: 春天 (весна), 夏天 (лето), 秋天 (осень), 冬天 (зима). Все заканчиваются на 天.",
      "下雨 (идёт дождь) и 下雪 (идёт снег) — буквально «падает дождь/снег». Глагол 下 здесь = «падать, идти».",
      "不太 перед прилагательным = «не очень». 不太好 (неочень), 不太冷 (не очень холодно) — вежливая форма выразить слабое несогласие.",
      "差不多 (chàbuduō) — очень частое слово «почти, примерно, около того». Буквально «не хватает немного». Ключевая фраза разговорного китайского.",
    ],
  },

  12: {
    introduction:
      "В этой главе вы научитесь говорить о том, что делаете прямо сейчас (настоящее продолженное время), называть дни недели и использовать выражения «от... до...» (从……到……). Также познакомитесь со словом 每 («каждый»).\n\n" +
      "Ситуация: 阿曼 и 古丽 разговаривают по телефону о том, кто что делает — 阿曼 делает уроки, 古丽 в баре с подругой.",

    vocabulary: [
      { hanzi: "喂", pinyin: "wèi", translation: "алло (по телефону)" },
      { hanzi: "啊", pinyin: "a", translation: "а, о (восклицание)" },
      { hanzi: "在", pinyin: "zài", translation: "сейчас (указывает на продолженное действие)" },
      { hanzi: "干", pinyin: "gàn", translation: "делать, заниматься (разговорное)" },
      { hanzi: "做", pinyin: "zuò", translation: "делать" },
      { hanzi: "作业", pinyin: "zuòyè", translation: "домашнее задание" },
      { hanzi: "每", pinyin: "měi", translation: "каждый" },
      { hanzi: "天", pinyin: "tiān", translation: "день" },
      { hanzi: "多", pinyin: "duō", translation: "много" },
      { hanzi: "星期三", pinyin: "xīngqīsān", translation: "среда" },
      { hanzi: "从……到", pinyin: "cóng...dào", translation: "от... до..." },
      { hanzi: "中午", pinyin: "zhōngwǔ", translation: "полдень" },
      { hanzi: "节", pinyin: "jié", translation: "счётное слово для уроков (пар)" },
      { hanzi: "听写", pinyin: "tīngxiě", translation: "диктант" },
      { hanzi: "所以", pinyin: "suǒyǐ", translation: "поэтому, итак" },
      { hanzi: "酒吧", pinyin: "jiǔbā", translation: "бар" },
      { hanzi: "喝", pinyin: "hē", translation: "пить" },
      { hanzi: "咖啡", pinyin: "kāfēi", translation: "кофе" },
      { hanzi: "书店", pinyin: "shūdiàn", translation: "книжный магазин" },
      { hanzi: "对面", pinyin: "duìmiàn", translation: "напротив" },
      { hanzi: "自己", pinyin: "zìjǐ", translation: "сам, самостоятельно" },
      { hanzi: "正在", pinyin: "zhèngzài", translation: "как раз (сейчас), в процессе" },
      { hanzi: "唱", pinyin: "chàng", translation: "петь" },
      { hanzi: "歌", pinyin: "gē", translation: "песня" },
      { hanzi: "回", pinyin: "huí", translation: "возвращаться" },
    ],

    grammar: [
      {
        title: "Настоящее продолженное время: 正在/在...呢",
        explanation:
          "Чтобы сказать «я делаю X прямо сейчас», в китайском используют одну из конструкций:\n\n" +
          "• 正在 + Глагол + (Объект) + 呢\n" +
          "• 在 + Глагол + (Объект) + 呢\n" +
          "• Глагол + (Объект) + 呢\n\n" +
          "Все три варианта означают примерно одно и то же. Самая полная форма — 正在……呢.\n\n" +
          "Отрицание: 没 + Глагол (без 在 и 呢).\n" +
          "— 他没看电影。— Он не смотрит фильм (сейчас).",
        examples: [
          { hanzi: "你在干什么呢？", pinyin: "Nǐ zài gàn shénme ne?", translation: "Что ты сейчас делаешь?" },
          { hanzi: "我正在做作业呢。", pinyin: "Wǒ zhèngzài zuò zuòyè ne.", translation: "Я как раз делаю уроки." },
          { hanzi: "他们正在唱歌呢。", pinyin: "Tāmen zhèngzài chàng gē ne.", translation: "Они сейчас поют." },
          { hanzi: "外面下雨呢。", pinyin: "Wàimiàn xià yǔ ne.", translation: "На улице идёт дождь." },
        ],
      },
      {
        title: "Дни недели",
        explanation:
          "Дни недели строятся по схеме: 星期 + число (1-6) или 天/日.\n\n" +
          "星期一 xīngqīyī — понедельник\n" +
          "星期二 xīngqī'èr — вторник\n" +
          "星期三 xīngqīsān — среда\n" +
          "星期四 xīngqīsì — четверг\n" +
          "星期五 xīngqīwǔ — пятница\n" +
          "星期六 xīngqīliù — суббота\n" +
          "星期日 / 星期天 xīngqīrì / xīngqītiān — воскресенье\n\n" +
          "Вопрос: 今天(是)星期几？— Сегодня какой день?\n" +
          "Ответ: 今天(是)星期三。— Среда.",
        examples: [
          { hanzi: "今天是星期三。", pinyin: "Jīntiān shì xīngqīsān.", translation: "Сегодня среда." },
          { hanzi: "明天是星期几？", pinyin: "Míngtiān shì xīngqī jǐ?", translation: "Какой завтра день?" },
          { hanzi: "星期天我不上课。", pinyin: "Xīngqītiān wǒ bú shàng kè.", translation: "В воскресенье у меня нет занятий." },
          { hanzi: "星期一到星期五", pinyin: "xīngqīyī dào xīngqīwǔ", translation: "с понедельника по пятницу" },
        ],
      },
      {
        title: "每……都 — «каждый X всегда...»",
        explanation:
          "每 (měi) — «каждый». Часто сопровождается 都 (dōu — «все, всегда») перед глаголом, чтобы подчеркнуть отсутствие исключений.\n\n" +
          "Схема:  每 + [сч.слово] + Сущ. + 都 + Глагол\n\n" +
          "每天都 — каждый день (все дни)\n" +
          "每个人都 — каждый человек (все)\n" +
          "每个星期都 — каждую неделю\n\n" +
          "Без 都 звучит неполно. Запомни: 每 почти всегда идёт в паре с 都.",
        examples: [
          { hanzi: "你每天都有很多作业吗？", pinyin: "Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?", translation: "У тебя каждый день много заданий?" },
          { hanzi: "我每天早上都喝咖啡。", pinyin: "Wǒ měi tiān zǎoshang dōu hē kāfēi.", translation: "Я каждое утро пью кофе." },
          { hanzi: "他们每个人都知道。", pinyin: "Tāmen měi ge rén dōu zhīdào.", translation: "Каждый из них знает." },
          { hanzi: "阿曼每天晚上都去酒吧。", pinyin: "Āmàn měi tiān wǎnshang dōu qù jiǔbā.", translation: "Аман каждый вечер ходит в бар." },
        ],
      },
      {
        title: "从……到…… — «от... до...»",
        explanation:
          "从 A 到 B означает «от A до B» — и для времени, и для места.\n\n" +
          "Схема:  从 + [точка 1] + 到 + [точка 2]\n\n" +
          "Время:\n" +
          "从早上八点到中午十二点 — с 8 утра до полудня\n" +
          "从星期一到星期五 — с понедельника по пятницу\n\n" +
          "Место:\n" +
          "从北京到上海 — из Пекина в Шанхай\n" +
          "从家到学校 — от дома до школы\n\n" +
          "Всегда идёт пара: если есть 从, то должно быть 到.",
        examples: [
          { hanzi: "从早上八点到中午十二点，我有四节课。", pinyin: "Cóng zǎoshang bā diǎn dào zhōngwǔ shí'èr diǎn, wǒ yǒu sì jié kè.", translation: "С 8 утра до полудня у меня 4 пары." },
          { hanzi: "我从八点到十一点有课。", pinyin: "Wǒ cóng bā diǎn dào shíyī diǎn yǒu kè.", translation: "У меня занятия с 8 до 11." },
          { hanzi: "他们从星期一到星期五都有课。", pinyin: "Tāmen cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.", translation: "У них занятия с понедельника по пятницу." },
          { hanzi: "从北京到上海很远。", pinyin: "Cóng Běijīng dào Shànghǎi hěn yuǎn.", translation: "От Пекина до Шанхая далеко." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Телефонный разговор (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "喂，你好！", pinyin: "Wèi, nǐ hǎo!", translation: "Алло, привет!" },
          { speaker: "B", hanzi: "喂，阿曼，是我，古丽。", pinyin: "Wèi, Āmàn, shì wǒ, Gǔlì.", translation: "Алло, Аман, это я, Гульнара." },
          { speaker: "A", hanzi: "啊，古丽，你好！", pinyin: "A, Gǔlì, nǐ hǎo!", translation: "А, Гульнара, привет!" },
          { speaker: "B", hanzi: "阿曼，你在干什么呢？", pinyin: "Āmàn, nǐ zài gàn shénme ne?", translation: "Аман, ты что сейчас делаешь?" },
          { speaker: "A", hanzi: "做作业呢。", pinyin: "Zuò zuòyè ne.", translation: "Делаю уроки." },
          { speaker: "B", hanzi: "是吗？你每天都有很多作业吗？", pinyin: "Shì ma? Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?", translation: "Правда? У тебя каждый день много заданий?" },
          { speaker: "A", hanzi: "不是。今天是星期三，从早上八点到中午十二点，我有四节课，明天还有听写，所以作业很多。你呢？在干什么呢？", pinyin: "Bú shì. Jīntiān shì xīngqīsān, cóng zǎoshang bā diǎn dào zhōngwǔ shí'èr diǎn, wǒ yǒu sì jié kè, míngtiān hái yǒu tīngxiě, suǒyǐ zuòyè hěn duō. Nǐ ne? Zài gàn shénme ne?", translation: "Нет. Сегодня среда, с 8 утра до 12 у меня было 4 пары, завтра ещё диктант, поэтому много заданий. А ты что делаешь?" },
          { speaker: "B", hanzi: "我在酒吧喝咖啡呢。", pinyin: "Wǒ zài jiǔbā hē kāfēi ne.", translation: "Я в баре пью кофе." },
          { speaker: "A", hanzi: "哪个酒吧？", pinyin: "Nǎge jiǔbā?", translation: "В каком баре?" },
          { speaker: "B", hanzi: "学校书店对面的那个。", pinyin: "Xuéxiào shūdiàn duìmiàn de nàge.", translation: "В том, напротив книжного." },
          { speaker: "A", hanzi: "你自己吗？", pinyin: "Nǐ zìjǐ ma?", translation: "Ты одна?" },
          { speaker: "B", hanzi: "不，还有我的同屋和她的朋友，他们正在唱歌呢。", pinyin: "Bù, hái yǒu wǒ de tóngwū hé tā de péngyou, tāmen zhèngzài chàng gē ne.", translation: "Нет, ещё моя соседка и её подруга, они как раз поют." },
          { speaker: "A", hanzi: "明天你们没有课吗？", pinyin: "Míngtiān nǐmen méiyǒu kè ma?", translation: "У вас завтра нет занятий?" },
          { speaker: "B", hanzi: "有，我们十点就回宿舍。", pinyin: "Yǒu, wǒmen shí diǎn jiù huí sùshè.", translation: "Есть, мы в 10 уже вернёмся в общежитие." },
        ],
      },
    ],

    tips: [
      "喂 (wèi) — только для телефона! Не используется для «здравствуй» лично. На звонке первое слово ВСЕГДА 喂.",
      "干 (gàn) и 做 (zuò) — оба значат «делать». 干 — более разговорное и общее («чем занимаешься?»), 做 — более конкретное («делать что-то»).",
      "节 (jié) — счётное слово для уроков/пар. «Три пары» = 三节课, не 三个课.",
      "В китайском понятия «неделя»: 星期 (xīngqī) — стандартное, 周 (zhōu) — более формальное (周末 — выходные, 周一 — пн), 礼拜 (lǐbài) — разговорное.",
      "所以 (suǒyǐ) — «поэтому». Часто идёт в паре с 因为 (yīnwèi — «потому что»): 因为...所以... — «потому что... поэтому...».",
    ],
  },

  13: {
    introduction:
      "В этой главе вы научитесь составлять предложения с несколькими глаголами подряд (идти + делать), использовать связку 先……然后 («сначала… потом»), альтернативный вопрос через 不 (贵不贵?) и отличать 咱们 от 我们.\n\n" +
      "Ситуации: 阿曼 и 张伟 идут вместе в банк и магазин, 古丽 и 中村 планируют поход в ТЦ.",

    vocabulary: [
      { hanzi: "借", pinyin: "jiè", translation: "брать/давать взаймы" },
      { hanzi: "先", pinyin: "xiān", translation: "сначала, сперва" },
      { hanzi: "银行", pinyin: "yínháng", translation: "банк" },
      { hanzi: "换", pinyin: "huàn", translation: "менять, обменивать" },
      { hanzi: "然后", pinyin: "ránhòu", translation: "затем, потом" },
      { hanzi: "商店", pinyin: "shāngdiàn", translation: "магазин" },
      { hanzi: "东西", pinyin: "dōngxi", translation: "вещь, вещи" },
      { hanzi: "咱们", pinyin: "zánmen", translation: "мы (включая собеседника)" },
      { hanzi: "一起", pinyin: "yìqǐ", translation: "вместе" },
      { hanzi: "关门", pinyin: "guān mén", translation: "закрывать дверь, закрываться" },
      { hanzi: "关", pinyin: "guān", translation: "закрывать" },
      { hanzi: "星期天", pinyin: "xīngqītiān", translation: "воскресенье" },
      { hanzi: "打算", pinyin: "dǎsuàn", translation: "планировать, собираться" },
      { hanzi: "购物中心", pinyin: "gòuwù zhōngxīn", translation: "торговый центр" },
      { hanzi: "购物", pinyin: "gòu wù", translation: "делать покупки" },
      { hanzi: "中心", pinyin: "zhōngxīn", translation: "центр" },
      { hanzi: "贵", pinyin: "guì", translation: "дорогой" },
      { hanzi: "还可以", pinyin: "hái kěyǐ", translation: "нормально, пойдёт, сносно" },
      { hanzi: "质量", pinyin: "zhìliàng", translation: "качество" },
      { hanzi: "不错", pinyin: "búcuò", translation: "неплохо, хорошо" },
      { hanzi: "正", pinyin: "zhèng", translation: "как раз, именно" },
      { hanzi: "衣服", pinyin: "yīfu", translation: "одежда" },
      { hanzi: "开门", pinyin: "kāi mén", translation: "открывать, открываться" },
      { hanzi: "开", pinyin: "kāi", translation: "открывать" },
    ],

    grammar: [
      {
        title: "连动句 — Последовательные глаголы (идти + делать)",
        explanation:
          "В китайском два глагола могут идти подряд в одном предложении, и 2-й объясняет ЦЕЛЬ 1-го.\n\n" +
          "Схема:  Подл. + Глагол1 + [Место1] + Глагол2 + [Объект2]\n\n" +
          "Логика:  «идти куда-то → чтобы делать что-то»\n\n" +
          "我去图书馆借书。\n" +
          "дословно: «я иду (в) библиотеку взять книгу» = «иду в библиотеку за книгой»\n\n" +
          "Первый глагол обычно 去 (идти туда), 来 (идти сюда). Второй — что там делать.\n\n" +
          "Отличие от русского: в русском «иду в библиотеку» — нужен предлог «в», а в китайском — ничего, просто 去 + место.",
        examples: [
          { hanzi: "我去图书馆借书。", pinyin: "Wǒ qù túshūguǎn jiè shū.", translation: "Иду в библиотеку за книгой." },
          { hanzi: "我去商店买东西。", pinyin: "Wǒ qù shāngdiàn mǎi dōngxi.", translation: "Иду в магазин за покупками." },
          { hanzi: "阿曼去银行换钱。", pinyin: "Āmàn qù yínháng huàn qián.", translation: "Аман идёт в банк менять деньги." },
          { hanzi: "学生们去教学楼上课。", pinyin: "Xuéshēngmen qù jiàoxuélóu shàng kè.", translation: "Студенты идут в учебный корпус на пары." },
        ],
      },
      {
        title: "先……，然后…… — «сначала…, потом…»",
        explanation:
          "Для описания последовательности действий используется пара 先 (сначала) — 然后 (потом).\n\n" +
          "Схема:  先 + Действие1，然后 + Действие2\n\n" +
          "我先去银行换钱，然后去商店买东西。\n" +
          "«Сначала иду в банк обменять деньги, потом в магазин за покупками.»\n\n" +
          "Оба слова ставятся ПЕРЕД глаголом. 然后 можно заменить на 再 (zài — снова, ещё).",
        examples: [
          { hanzi: "我先去银行换钱，然后去商店买东西。", pinyin: "Wǒ xiān qù yínháng huàn qián, ránhòu qù shāngdiàn mǎi dōngxi.", translation: "Сначала в банк, потом в магазин." },
          { hanzi: "明天我先去银行，然后去商店。", pinyin: "Míngtiān wǒ xiān qù yínháng, ránhòu qù shāngdiàn.", translation: "Завтра сначала в банк, потом в магазин." },
          { hanzi: "张伟先去电影院，然后回宿舍。", pinyin: "Zhāng Wěi xiān qù diànyǐngyuàn, ránhòu huí sùshè.", translation: "Чжан Вэй сначала в кино, потом в общежитие." },
          { hanzi: "他先去商店买东西，然后去书店买词典。", pinyin: "Tā xiān qù shāngdiàn mǎi dōngxi, ránhòu qù shūdiàn mǎi cídiǎn.", translation: "Он сначала в магазин, потом в книжный за словарём." },
        ],
      },
      {
        title: "咱们 vs 我们 — тонкая разница «мы»",
        explanation:
          "Оба слова значат «мы», но с разницей в инклюзивности:\n\n" +
          "• 咱们 (zánmen) — ВСЕГДА включает собеседника: «ты и я / мы с тобой»\n" +
          "• 我们 (wǒmen) — может включать или НЕ включать собеседника (неоднозначно)\n\n" +
          "Пример:\n" +
          "咱们一起去吧！— Давай вместе пойдём! (ты обязательно идёшь со мной)\n" +
          "我们一起去吧！— То же самое, но чуть двусмысленно\n\n" +
          "Когда говоришь О СВОЕЙ группе (где слушателя НЕТ) — только 我们:\n" +
          "我们学校 — наша школа (ты-то не в нашей)\n\n" +
          "咱们 — северный/пекинский стиль, южнее его используют меньше.",
        examples: [
          { hanzi: "咱们一起去吧！", pinyin: "Zánmen yìqǐ qù ba!", translation: "Давай пойдём вместе (ты и я)!" },
          { hanzi: "咱们几点去？", pinyin: "Zánmen jǐ diǎn qù?", translation: "Во сколько пойдём (мы с тобой)?" },
          { hanzi: "明天是星期天，咱们去酒吧吧。", pinyin: "Míngtiān shì xīngqītiān, zánmen qù jiǔbā ba.", translation: "Завтра воскресенье, пойдём в бар." },
          { hanzi: "我们学校很大。", pinyin: "Wǒmen xuéxiào hěn dà.", translation: "Наш университет большой." },
        ],
      },
      {
        title: "Альтернативный вопрос: A不A / V不V",
        explanation:
          "Вместо 吗 можно задать вопрос так: повторить прилагательное/глагол с 不 между ними.\n\n" +
          "Схемы:\n" +
          "• Прил. + 不 + Прил. = Прил. + 吗\n" +
          "  冷不冷？ = 冷吗？ — Холодно?\n\n" +
          "• Глагол + 不 + Глагол = Глагол + 吗\n" +
          "  去不去？ = 去吗？ — Идёшь (или нет)?\n" +
          "  是不是？ = 是吗？ — Это так?\n" +
          "  有没有？ = 有吗？ — Есть или нет?\n\n" +
          "Важно: с этой формой 吗 НЕ используется!\n" +
          "❌ 冷不冷吗？\n" +
          "✅ 冷不冷？\n\n" +
          "Такая форма звучит чуть более прямо и «проверяюще», чем с 吗.",
        examples: [
          { hanzi: "那儿的东西贵不贵？", pinyin: "Nàr de dōngxi guì bu guì?", translation: "Там дорого?" },
          { hanzi: "你买不买东西？", pinyin: "Nǐ mǎi bu mǎi dōngxi?", translation: "Ты покупаешь что-то или нет?" },
          { hanzi: "你是不是美国人？", pinyin: "Nǐ shì bu shì Měiguó rén?", translation: "Ты американец или нет?" },
          { hanzi: "今天有没有作业？", pinyin: "Jīntiān yǒu méi yǒu zuòyè?", translation: "Сегодня есть задание или нет?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "В банк и магазин (阿曼 и 张伟)",
        lines: [
          { speaker: "A", hanzi: "你好，张伟。你去哪儿？", pinyin: "Nǐ hǎo, Zhāng Wěi. Nǐ qù nǎr?", translation: "Привет, Чжан Вэй. Куда идёшь?" },
          { speaker: "B", hanzi: "我去图书馆借书，你呢？", pinyin: "Wǒ qù túshūguǎn jiè shū, nǐ ne?", translation: "В библиотеку за книгой. А ты?" },
          { speaker: "A", hanzi: "我先去银行换钱，然后去商店买东西。", pinyin: "Wǒ xiān qù yínháng huàn qián, ránhòu qù shāngdiàn mǎi dōngxi.", translation: "Сначала в банк менять деньги, потом в магазин за покупками." },
          { speaker: "B", hanzi: "我也要去银行，咱们一起去吧！", pinyin: "Wǒ yě yào qù yínháng, zánmen yìqǐ qù ba!", translation: "Мне тоже в банк — пойдём вместе!" },
          { speaker: "A", hanzi: "你不去图书馆吗？", pinyin: "Nǐ bú qù túshūguǎn ma?", translation: "А в библиотеку не идёшь?" },
          { speaker: "B", hanzi: "没关系，图书馆不关门。", pinyin: "Méi guānxi, túshūguǎn bù guān mén.", translation: "Ничего, библиотека не закрывается." },
        ],
      },
      {
        title: "Поход в ТЦ (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，明天是星期天，你打算干什么？", pinyin: "Zhōngcūn, míngtiān shì xīngqītiān, nǐ dǎsuàn gàn shénme?", translation: "Накамура, завтра воскресенье, что планируешь?" },
          { speaker: "B", hanzi: "我打算去商店买东西。", pinyin: "Wǒ dǎsuàn qù shāngdiàn mǎi dōngxi.", translation: "Планирую пойти за покупками." },
          { speaker: "A", hanzi: "是学校的商店吗？", pinyin: "Shì xuéxiào de shāngdiàn ma?", translation: "В университетский магазин?" },
          { speaker: "B", hanzi: "不，是购物中心。", pinyin: "Bù, shì gòuwù zhōngxīn.", translation: "Нет, в ТЦ." },
          { speaker: "A", hanzi: "那儿的东西贵不贵？", pinyin: "Nàr de dōngxi guì bu guì?", translation: "Там дорого?" },
          { speaker: "B", hanzi: "还可以。那儿的东西很多，质量也不错。", pinyin: "Hái kěyǐ. Nàr de dōngxi hěn duō, zhìliàng yě búcuò.", translation: "Нормально. Там много всего, и качество неплохое." },
          { speaker: "A", hanzi: "我正打算买衣服呢，明天和你一起去，好不好？", pinyin: "Wǒ zhèng dǎsuàn mǎi yīfu ne, míngtiān hé nǐ yìqǐ qù, hǎo bu hǎo?", translation: "Я как раз собиралась купить одежду — пойдём вместе?" },
          { speaker: "B", hanzi: "好啊！", pinyin: "Hǎo a!", translation: "Хорошо!" },
          { speaker: "A", hanzi: "咱们几点去？", pinyin: "Zánmen jǐ diǎn qù?", translation: "Во сколько пойдём?" },
          { speaker: "B", hanzi: "购物中心九点开门，咱们十点去吧。", pinyin: "Gòuwù zhōngxīn jiǔ diǎn kāi mén, zánmen shí diǎn qù ba.", translation: "ТЦ открывается в 9, давай в 10 пойдём." },
        ],
      },
    ],

    tips: [
      "还可以 (hái kěyǐ) — «нормально, пойдёт, ничего так». Нейтральная оценка — не плохо, но и не отлично. Очень полезная фраза в китайском общении, где прямое «плохо» считается невежливым.",
      "不错 (búcuò) дословно «не ошибка» = «неплохо, хорошо». Сильнее чем 还可以. «Качество неплохое» = 质量不错.",
      "打算 (dǎsuàn) — «планировать, собираться». В отличие от 计划 (формальный план), 打算 используется для бытовых планов: 我打算去... «я собираюсь пойти...».",
      "Формы 开门/关门 — про магазины: 几点开门？ (во сколько открывается?), 几点关门？ (во сколько закрывается?).",
      "A不A вопрос НЕЛЬЗЯ использовать с 很: ❌ 很冷不冷 — нет такого. Можно только 冷不冷? Если хочешь «очень» — переформулируй.",
    ],
  },

  14: {
    introduction:
      "В этой главе вы научитесь описывать вещи (одежду, транспорт) по цвету, размеру, качеству. Познакомитесь с наречием 挺 («довольно»), выражением 有(一)点儿 («немного, чуть-чуть») и конструкцией «X的» (заменитель существительного).\n\n" +
      "Ситуации: 古丽 выбирает свитер с 中村, потом 阿曼 обсуждает с ней её новый велосипед.",

    vocabulary: [
      { hanzi: "件", pinyin: "jiàn", translation: "счётное слово для одежды" },
      { hanzi: "白", pinyin: "bái", translation: "белый" },
      { hanzi: "毛衣", pinyin: "máoyī", translation: "свитер" },
      { hanzi: "挺", pinyin: "tǐng", translation: "довольно, вполне" },
      { hanzi: "好看", pinyin: "hǎokàn", translation: "красивый, симпатичный" },
      { hanzi: "容易", pinyin: "róngyì", translation: "лёгкий, легко" },
      { hanzi: "脏", pinyin: "zāng", translation: "грязный" },
      { hanzi: "蓝", pinyin: "lán", translation: "синий" },
      { hanzi: "颜色", pinyin: "yánsè", translation: "цвет" },
      { hanzi: "有点儿", pinyin: "yǒudiǎnr", translation: "немного, чуть-чуть" },
      { hanzi: "深", pinyin: "shēn", translation: "тёмный (цвет), глубокий" },
      { hanzi: "浅", pinyin: "qiǎn", translation: "светлый (цвет), мелкий" },
      { hanzi: "黄", pinyin: "huáng", translation: "жёлтый" },
      { hanzi: "漂亮", pinyin: "piàoliang", translation: "красивый" },
      { hanzi: "它", pinyin: "tā", translation: "оно, это (для предметов)" },
      { hanzi: "昨天", pinyin: "zuótiān", translation: "вчера" },
      { hanzi: "新", pinyin: "xīn", translation: "новый" },
      { hanzi: "辆", pinyin: "liàng", translation: "счётное слово для транспорта" },
      { hanzi: "旧", pinyin: "jiù", translation: "старый, б/у" },
      { hanzi: "便宜", pinyin: "piányi", translation: "дешёвый" },
      { hanzi: "丢", pinyin: "diū", translation: "потерять, украсть" },
      { hanzi: "别的", pinyin: "bié de", translation: "другой" },
      { hanzi: "黑", pinyin: "hēi", translation: "чёрный" },
      { hanzi: "灰", pinyin: "huī", translation: "серый" },
      { hanzi: "绿", pinyin: "lǜ", translation: "зелёный" },
    ],

    grammar: [
      {
        title: "挺 + прил. + 的 — «довольно, вполне»",
        explanation:
          "挺 (tǐng) — «довольно, вполне». Разговорная альтернатива 很. Часто сопровождается 的 в конце.\n\n" +
          "Схема:  挺 + Прилагательное + 的\n\n" +
          "挺好看的 — довольно симпатичный\n" +
          "挺漂亮的 — довольно красивый\n" +
          "挺冷的 — довольно холодно\n\n" +
          "挺 по силе примерно = 很, но звучит более разговорно и дружелюбно. Идеально для бытового общения.",
        examples: [
          { hanzi: "那件白毛衣挺好看的。", pinyin: "Nà jiàn bái máoyī tǐng hǎokàn de.", translation: "Тот белый свитер довольно симпатичный." },
          { hanzi: "你的毛衣挺漂亮的。", pinyin: "Nǐ de máoyī tǐng piàoliang de.", translation: "Твой свитер довольно красивый." },
          { hanzi: "学校商店的东西挺便宜的。", pinyin: "Xuéxiào shāngdiàn de dōngxi tǐng piányi de.", translation: "В университетском магазине вещи довольно дешёвые." },
          { hanzi: "北京的冬天挺冷的。", pinyin: "Běijīng de dōngtiān tǐng lěng de.", translation: "Зима в Пекине довольно холодная." },
        ],
      },
      {
        title: "的-фраза — «X-ный, тот, который X»",
        explanation:
          "X + 的 (без существительного после) превращается в отдельную фразу-заменитель существительного, если контекст ясен.\n\n" +
          "X может быть:\n" +
          "• Прилагательное:  白的 (белый, белая вещь), 贵的 (дорогой)\n" +
          "• Существительное/Местоимение:  我的 (мой, моё), 老师的 (учительский)\n" +
          "• Глагол:  我买的 (то что я купил), 昨天吃的 (то что вчера ел)\n\n" +
          "Пример:\n" +
          "这件毛衣白。— Этот свитер белый.\n" +
          "我喜欢白的。— Мне нравится белый (белая вещь — свитер подразумевается).\n\n" +
          "Это очень частая структура в разговоре.",
        examples: [
          { hanzi: "白的容易脏。", pinyin: "Bái de róngyì zāng.", translation: "Белое легко пачкается." },
          { hanzi: "我喜欢浅颜色的。", pinyin: "Wǒ xǐhuan qiǎn yánsè de.", translation: "Мне нравятся светлые цвета (вещи светлых цветов)." },
          { hanzi: "这辆自行车是我昨天买的。", pinyin: "Zhè liàng zìxíngchē shì wǒ zuótiān mǎi de.", translation: "Этот велосипед — тот, что я вчера купила." },
          { hanzi: "这本词典是英文的。", pinyin: "Zhè běn cídiǎn shì Yīngwén de.", translation: "Этот словарь — английский." },
        ],
      },
      {
        title: "有(一)点儿 + прил. — «немного, чуть-чуть»",
        explanation:
          "有(一)点儿 (yǒu(yì)diǎnr) ставится ПЕРЕД прилагательным и означает «немного, чуть-чуть». Часто имеет негативный оттенок.\n\n" +
          "Схема:  有(一)点儿 + Прилагательное\n\n" +
          "有点儿冷 — немного холодно (и это плохо)\n" +
          "有点儿贵 — немного дороговато\n" +
          "有点儿深 — чуть тёмноват\n\n" +
          "Важно: НЕ путать с (一)点儿 (без 有) после глагола — это «немного» без негативного оттенка.\n\n" +
          "Сравни:\n" +
          "• 有点儿贵 — «дороговато» (жалоба)\n" +
          "• 便宜一点儿 — «немного дешевле, подешевле» (просьба)",
        examples: [
          { hanzi: "这件的颜色有点儿深。", pinyin: "Zhè jiàn de yánsè yǒudiǎnr shēn.", translation: "У этого цвет чуть тёмный." },
          { hanzi: "今天有点儿冷。", pinyin: "Jīntiān yǒudiǎnr lěng.", translation: "Сегодня немного холодновато." },
          { hanzi: "黑颜色的有点儿贵。", pinyin: "Hēi yánsè de yǒudiǎnr guì.", translation: "Чёрный чуть дороговат." },
          { hanzi: "他有点儿不高兴。", pinyin: "Tā yǒudiǎnr bù gāoxìng.", translation: "Он немного расстроен." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Выбираем свитер (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，你看，那件白毛衣怎么样？", pinyin: "Zhōngcūn, nǐ kàn, nà jiàn bái máoyī zěnmeyàng?", translation: "Накамура, смотри, как тот белый свитер?" },
          { speaker: "B", hanzi: "挺好看的。不过，白的容易脏。这件蓝的怎么样？", pinyin: "Tǐng hǎokàn de. Búguò, bái de róngyì zāng. Zhè jiàn lán de zěnmeyàng?", translation: "Симпатичный. Но белое легко пачкается. А этот синий?" },
          { speaker: "A", hanzi: "这件的颜色有点儿深，我喜欢浅颜色的。", pinyin: "Zhè jiàn de yánsè yǒudiǎnr shēn, wǒ xǐhuan qiǎn yánsè de.", translation: "У этого цвет чуть тёмный, я люблю светлые." },
          { speaker: "B", hanzi: "那件黄的呢？", pinyin: "Nà jiàn huáng de ne?", translation: "А тот жёлтый?" },
          { speaker: "A", hanzi: "不错，挺漂亮的，就买它吧。", pinyin: "Búcuò, tǐng piàoliang de, jiù mǎi tā ba.", translation: "Неплохо, довольно красивый — куплю его." },
        ],
      },
      {
        title: "Новый велосипед (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，这是你的自行车吗？", pinyin: "Gǔlì, zhè shì nǐ de zìxíngchē ma?", translation: "Гульнара, это твой велосипед?" },
          { speaker: "B", hanzi: "对，这是我昨天买的，怎么样？", pinyin: "Duì, zhè shì wǒ zuótiān mǎi de, zěnmeyàng?", translation: "Да, вчера купила. Как тебе?" },
          { speaker: "A", hanzi: "挺漂亮的，是新的吗？", pinyin: "Tǐng piàoliang de, shì xīn de ma?", translation: "Красивый. Новый?" },
          { speaker: "B", hanzi: "对，我买的是一辆旧的，旧的比较便宜，也不容易丢。", pinyin: "Duì, wǒ mǎi de shì yí liàng jiù de, jiù de bǐjiào piányi, yě bù róngyì diū.", translation: "Нет, я купила б/у. Старые дешевле и их не так часто воруют." },
          { speaker: "A", hanzi: "有别的颜色吗？", pinyin: "Yǒu bié de yánsè ma?", translation: "А другие цвета есть?" },
          { speaker: "B", hanzi: "有，有黑的、蓝的、还有灰的、黄的。你喜欢什么颜色的？", pinyin: "Yǒu, yǒu hēi de, lán de, hái yǒu huī de, huáng de. Nǐ xǐhuan shénme yánsè de?", translation: "Есть — чёрные, синие, серые, жёлтые. Какой цвет тебе нравится?" },
          { speaker: "A", hanzi: "我喜欢绿的。", pinyin: "Wǒ xǐhuan lǜ de.", translation: "Я люблю зелёный." },
        ],
      },
    ],

    tips: [
      "Счётные слова для одежды: 件 (jiàn) — для верха (рубашка, свитер, пальто), 条 (tiáo) — для низа (штаны, юбка). «Одна рубашка» = 一件衬衫, «одни штаны» = 一条裤子.",
      "深 и 浅 про цвета: 深蓝 — тёмно-синий, 浅蓝 — голубой (светло-синий). Про воду 深/浅 = глубокий/мелкий.",
      "它 (tā) — «оно» для предметов и животных. В разговоре китайцы часто опускают местоимения, 它 используется реже 他/她.",
      "Слова-противоположности в описаниях: 新/旧 (новый/старый), 贵/便宜 (дорогой/дешёвый), 深/浅 (тёмный/светлый), 大/小 (большой/маленький).",
      "别的 (bié de) = «другой, иной». «Другие цвета» = 别的颜色. Похоже на 其他的 (qítā de), но 别的 более разговорное.",
    ],
  },

  15: {
    introduction:
      "Это итоговая глава Unit 3. Вы научитесь обсуждать подарки, выбор «А или Б» (还是), давать примеры через 比如 и использовать 一直 («всё время»).\n\n" +
      "Ситуации: 中村 готовит торт на день рождения подруги, 张伟 советуется с 阿曼 что подарить девушке.",

    vocabulary: [
      { hanzi: "晚饭", pinyin: "wǎnfàn", translation: "ужин" },
      { hanzi: "以后", pinyin: "yǐhòu", translation: "после, потом" },
      { hanzi: "一直", pinyin: "yìzhí", translation: "всё время, постоянно" },
      { hanzi: "忙", pinyin: "máng", translation: "занят, быть занятым" },
      { hanzi: "准备", pinyin: "zhǔnbèi", translation: "готовиться, готовить" },
      { hanzi: "礼物", pinyin: "lǐwù", translation: "подарок" },
      { hanzi: "生日", pinyin: "shēngrì", translation: "день рождения" },
      { hanzi: "蛋糕", pinyin: "dàngāo", translation: "торт" },
      { hanzi: "送", pinyin: "sòng", translation: "дарить, отправлять" },
      { hanzi: "说", pinyin: "shuō", translation: "говорить, сказать" },
      { hanzi: "特别", pinyin: "tèbié", translation: "особый, особенный" },
      { hanzi: "男", pinyin: "nán", translation: "мужской" },
      { hanzi: "还是", pinyin: "háishi", translation: "или (в вопросах)" },
      { hanzi: "女", pinyin: "nǚ", translation: "женский" },
      { hanzi: "可", pinyin: "kě", translation: "можно, стоит (перед глаголом)" },
      { hanzi: "比如", pinyin: "bǐrú", translation: "например" },
      { hanzi: "巧克力", pinyin: "qiǎokèlì", translation: "шоколад" },
      { hanzi: "甜", pinyin: "tián", translation: "сладкий" },
      { hanzi: "号", pinyin: "hào", translation: "размер (одежды)" },
      { hanzi: "那么", pinyin: "nàme", translation: "тогда, в таком случае" },
      { hanzi: "束", pinyin: "shù", translation: "счётное слово для букетов" },
      { hanzi: "花", pinyin: "huā", translation: "цветок" },
      { hanzi: "主意", pinyin: "zhǔyi", translation: "идея" },
    ],

    grammar: [
      {
        title: "还是 — альтернативный вопрос «А или Б?»",
        explanation:
          "还是 (háishi) между двумя вариантами образует вопрос «А или Б?».\n\n" +
          "Схема:  Вариант A + 还是 + Вариант B?\n\n" +
          "男的还是女的？— Мужчина или женщина?\n" +
          "你喝水还是喝咖啡？— Будешь пить воду или кофе?\n" +
          "你去还是我去？— Ты пойдёшь или я?\n\n" +
          "Важно не путать с 或者 (huòzhě — «или»), которое используется в УТВЕРЖДЕНИЯХ:\n" +
          "• 还是 — в вопросах\n" +
          "• 或者 — в утверждениях (я могу пойти сегодня или завтра)",
        examples: [
          { hanzi: "男的还是女的？", pinyin: "Nán de háishi nǚ de?", translation: "Мужчина или женщина?" },
          { hanzi: "你喜欢红的还是蓝的？", pinyin: "Nǐ xǐhuan hóng de háishi lán de?", translation: "Тебе нравится красное или синее?" },
          { hanzi: "你去还是我去？", pinyin: "Nǐ qù háishi wǒ qù?", translation: "Ты пойдёшь или я?" },
          { hanzi: "你喝水还是喝咖啡？", pinyin: "Nǐ hē shuǐ háishi hē kāfēi?", translation: "Пить воду или кофе?" },
        ],
      },
      {
        title: "比如 — «например»",
        explanation:
          "比如 (bǐrú) — «например, скажем». Вводит пример.\n\n" +
          "Схема:  Общее утверждение，比如 + Пример\n\n" +
          "可送的东西很多，比如巧克力。\n" +
          "«Можно подарить много всего, например шоколад.»\n\n" +
          "В китайском 比如 часто ставится в середину предложения как вводное слово. Также можно использовать 比如说 (bǐrúshuō) — более разговорно.",
        examples: [
          { hanzi: "可送的很多啊，比如巧克力。", pinyin: "Kě sòng de hěn duō a, bǐrú qiǎokèlì.", translation: "Можно подарить много всего, например, шоколад." },
          { hanzi: "我喜欢很多颜色，比如蓝的、绿的。", pinyin: "Wǒ xǐhuan hěn duō yánsè, bǐrú lán de, lǜ de.", translation: "Мне нравится много цветов, например синий, зелёный." },
          { hanzi: "北京有很多大学，比如北京大学、清华大学。", pinyin: "Běijīng yǒu hěn duō dàxué, bǐrú Běijīng Dàxué, Qīnghuá Dàxué.", translation: "В Пекине много университетов — например, Бэйда и Цинхуа." },
        ],
      },
      {
        title: "一直 — «всё время, постоянно»",
        explanation:
          "一直 (yìzhí) — «всё время, непрерывно, без перерыва». Ставится ПЕРЕД глаголом.\n\n" +
          "Схема:  Подл. + 一直 + Глагол\n\n" +
          "Часто сопровождается продолженным временем (正在...呢):\n" +
          "你一直在忙 — «ты всё это время был занят»\n" +
          "他一直在学汉语 — «он всё это время учит китайский»\n\n" +
          "Также «прямо вперёд»:\n" +
          "一直走 — «идти прямо»",
        examples: [
          { hanzi: "从晚饭以后到现在，你一直在忙。", pinyin: "Cóng wǎnfàn yǐhòu dào xiànzài, nǐ yìzhí zài máng.", translation: "С самого ужина и до сих пор ты всё время занят." },
          { hanzi: "他一直在学汉语。", pinyin: "Tā yìzhí zài xué Hànyǔ.", translation: "Он всё время учит китайский." },
          { hanzi: "一直走就到了。", pinyin: "Yìzhí zǒu jiù dào le.", translation: "Иди прямо — и придёшь." },
        ],
      },
      {
        title: "可 + Глагол — «можно/стоит делать»",
        explanation:
          "可 (kě) перед глаголом означает «можно, стоит это делать» — т.е. это действие имеет смысл / возможно.\n\n" +
          "Схема:  可 + Глагол + 的 + (Сущ.)\n\n" +
          "可送的很多 — есть много такого, что можно подарить (дословно: «достойного-дарения много»)\n" +
          "可看的电影很多 — есть много фильмов, которые стоит посмотреть\n" +
          "可去的地方很多 — есть много мест, куда можно пойти\n\n" +
          "Это книжная/вежливая форма. В разговоре чаще скажут 可以 (kěyǐ) — «можно».",
        examples: [
          { hanzi: "可送的很多啊，比如巧克力。", pinyin: "Kě sòng de hěn duō a, bǐrú qiǎokèlì.", translation: "Подарить можно много всего, например шоколад." },
          { hanzi: "电影可看的很多。", pinyin: "Diànyǐng kě kàn de hěn duō.", translation: "Фильмов, достойных просмотра, много." },
          { hanzi: "星期天可去的地方很多。", pinyin: "Xīngqītiān kě qù de dìfang hěn duō.", translation: "В воскресенье есть много мест, куда можно пойти." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Торт на день рождения (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，从晚饭以后到现在，你一直在忙，忙什么呢？", pinyin: "Zhōngcūn, cóng wǎnfàn yǐhòu dào xiànzài, nǐ yìzhí zài máng, máng shénme ne?", translation: "Накамура, с ужина и до сих пор ты всё возишься — чем занят?" },
          { speaker: "B", hanzi: "我在准备礼物呢。", pinyin: "Wǒ zài zhǔnbèi lǐwù ne.", translation: "Готовлю подарок." },
          { speaker: "A", hanzi: "准备礼物？", pinyin: "Zhǔnbèi lǐwù?", translation: "Подарок?" },
          { speaker: "B", hanzi: "对，明天是我朋友的生日，我做一个蛋糕送给她，你说好不好？", pinyin: "Duì, míngtiān shì wǒ péngyou de shēngrì, wǒ zuò yí ge dàngāo sòng gěi tā, nǐ shuō hǎo bu hǎo?", translation: "Да, завтра день рождения подруги. Хочу сделать торт и подарить ей, как думаешь?" },
          { speaker: "A", hanzi: "你自己做？", pinyin: "Nǐ zìjǐ zuò?", translation: "Сам сделаешь?" },
          { speaker: "B", hanzi: "对啊，自己做的比较特别。", pinyin: "Duì a, zìjǐ zuò de bǐjiào tèbié.", translation: "Да, сделанное своими руками — более особенное." },
        ],
      },
      {
        title: "Что подарить девушке? (张伟 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，你说，送生日礼物，什么东西比较好？", pinyin: "Āmàn, nǐ shuō, sòng shēngrì lǐwù, shénme dōngxi bǐjiào hǎo?", translation: "Аман, как думаешь, что лучше подарить на день рождения?" },
          { speaker: "B", hanzi: "你打算送给谁？男的还是女的？", pinyin: "Nǐ dǎsuàn sòng gěi shéi? Nán de háishi nǚ de?", translation: "Кому собираешься? Мужчине или женщине?" },
          { speaker: "A", hanzi: "女的。", pinyin: "Nǚ de.", translation: "Женщине." },
          { speaker: "B", hanzi: "可送的很多啊，比如巧克力。", pinyin: "Kě sòng de hěn duō a, bǐrú qiǎokèlì.", translation: "Да много чего можно, например шоколад." },
          { speaker: "A", hanzi: "巧克力有点儿甜，她不喜欢甜的。", pinyin: "Qiǎokèlì yǒudiǎnr tián, tā bù xǐhuan tián de.", translation: "Шоколад сладковат, а она не любит сладкое." },
          { speaker: "B", hanzi: "衣服呢？", pinyin: "Yīfu ne?", translation: "А одежда?" },
          { speaker: "A", hanzi: "她的衣服号我不知道，也不知道她喜欢什么颜色。", pinyin: "Tā de yīfu hào wǒ bù zhīdào, yě bù zhīdào tā xǐhuan shénme yánsè.", translation: "Размер не знаю, и какие цвета любит — тоже." },
          { speaker: "B", hanzi: "那么送一束花吧，每个女孩子都喜欢花。", pinyin: "Nàme sòng yí shù huā ba, měi ge nǚ háizi dōu xǐhuan huā.", translation: "Тогда подари букет цветов — все девушки любят цветы." },
          { speaker: "A", hanzi: "这个主意挺不错的。", pinyin: "Zhège zhǔyi tǐng búcuò de.", translation: "Отличная идея." },
        ],
      },
    ],

    tips: [
      "送 имеет два значения: «дарить» (送礼物) и «провожать/отправлять» (送朋友回家). Контекст всегда понятен.",
      "В китайской культуре НЕ дарят: часы (送钟 = 送终 «провожать в последний путь»), обувь (символика разлуки), зонты (伞 звучит как 散 — «расставание»). Безопасные подарки: цветы, чай, фрукты, шоколад.",
      "一束花 = «букет цветов». 束 — счётное слово для букетов. Для отдельных цветов используется 朵 (duǒ): 一朵花.",
      "比如 ≈ 比如说 — оба «например». Первое чуть формальнее, второе разговорное. Оба в начале примера.",
      "主意 (zhǔyi) — «идея, задумка». 这个主意不错 = «неплохая идея». Также 好主意！— «Отличная идея!».",
    ],
  },

  16: {
    introduction:
      "В этой главе вы научитесь рассказывать о своих выходных и досуге, использовать удвоение глаголов (для мягкости речи), конструкцию 太……了 и обстоятельство места 在+место перед глаголом.\n\n" +
      "Ситуация: 阿曼 (любитель активных выходных) разговаривает с одноклассником (скучающим домоседом) — у каждого свой взгляд на выходные.",

    vocabulary: [
      { hanzi: "又", pinyin: "yòu", translation: "снова, опять" },
      { hanzi: "了", pinyin: "le", translation: "частица (завершённость/изменение)" },
      { hanzi: "看起来", pinyin: "kànqǐlai", translation: "похоже, выглядит (что...)" },
      { hanzi: "啦", pinyin: "la", translation: "частица (эмоционально подчёркивает)" },
      { hanzi: "可以", pinyin: "kěyǐ", translation: "можно, иметь возможность" },
      { hanzi: "好好儿", pinyin: "hǎohāor", translation: "как следует, вдоволь" },
      { hanzi: "觉得", pinyin: "juéde", translation: "чувствовать, считать" },
      { hanzi: "没意思", pinyin: "méi yìsi", translation: "скучно, неинтересно" },
      { hanzi: "电视", pinyin: "diànshì", translation: "телевизор, телевидение" },
      { hanzi: "洗", pinyin: "xǐ", translation: "мыть, стирать" },
      { hanzi: "睡懒觉", pinyin: "shuì lǎnjiào", translation: "поспать подольше, выспаться" },
      { hanzi: "睡觉", pinyin: "shuì jiào", translation: "спать" },
      { hanzi: "出去", pinyin: "chūqu", translation: "выходить (куда-то)" },
      { hanzi: "逛", pinyin: "guàng", translation: "гулять (по магазинам)" },
      { hanzi: "学习", pinyin: "xuéxí", translation: "учиться, изучать" },
      { hanzi: "不同", pinyin: "bùtóng", translation: "разный, различный" },
      { hanzi: "安排", pinyin: "ānpái", translation: "планировать, планы" },
      { hanzi: "上", pinyin: "shàng", translation: "прошлый, предыдущий" },
      { hanzi: "包", pinyin: "bāo", translation: "заворачивать, лепить (пельмени)" },
      { hanzi: "饺子", pinyin: "jiǎozi", translation: "пельмени, дзяоцзы" },
      { hanzi: "迪厅", pinyin: "dítīng", translation: "дискотека" },
      { hanzi: "跳舞", pinyin: "tiào wǔ", translation: "танцевать" },
      { hanzi: "听", pinyin: "tīng", translation: "слушать" },
      { hanzi: "音乐会", pinyin: "yīnyuèhuì", translation: "концерт" },
    ],

    grammar: [
      {
        title: "Удвоение глаголов: V-V (мягкая, лёгкая форма)",
        explanation:
          "В китайском глаголы часто удваиваются, чтобы сделать действие более неформальным, лёгким, коротким по времени.\n\n" +
          "Схемы:\n" +
          "• Односложный глагол:  V + V  или  V + 一 + V\n" +
          "  看看 = посмотри\n" +
          "  试试 = попробуй\n" +
          "  看一看 = немного посмотреть\n\n" +
          "• Двусложный глагол:  AB + AB\n" +
          "  学习学习 = немного позаниматься\n" +
          "  休息休息 = немного отдохнуть\n\n" +
          "Оттенок: «немножко, ненапряжно, попробуй». Очень частое в повседневной речи.",
        examples: [
          { hanzi: "周末可以好好儿玩儿玩儿。", pinyin: "Zhōumò kěyǐ hǎohāor wánr wánr.", translation: "На выходных можно хорошо отдохнуть." },
          { hanzi: "在宿舍里看看电视，洗洗衣服。", pinyin: "Zài sùshè li kànkan diànshì, xǐxi yīfu.", translation: "В общежитии смотрю телик, стираю вещи." },
          { hanzi: "和朋友逛逛商店。", pinyin: "Hé péngyou guàngguang shāngdiàn.", translation: "С другом пройдёмся по магазинам." },
          { hanzi: "去图书馆学习学习。", pinyin: "Qù túshūguǎn xuéxí xuéxí.", translation: "Схожу в библиотеку позаниматься." },
        ],
      },
      {
        title: "Конструкция 太……了 (расширение) — «слишком»",
        explanation:
          "Мы уже видели эту конструкцию в Главе 6 (太早了). В Главе 16 закрепим все оттенки:\n\n" +
          "Схема:  太 + Прилагательное/Глагол + 了\n\n" +
          "Может выражать:\n" +
          "• Негативное («слишком»):  太累了！— Слишком устал!\n" +
          "• Позитивное («как здóрово»):  太高兴了！— Очень рад!\n" +
          "• Нейтральное (просто высокая степень):  太好了！— Отлично!\n\n" +
          "Контекст определяет, хорошо это или плохо. Частица 了 почти всегда обязательна — без неё предложение звучит оборванно.",
        examples: [
          { hanzi: "明天又是周末，太高兴了！", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le!", translation: "Завтра снова выходные — как я рад!" },
          { hanzi: "今天太冷了。", pinyin: "Jīntiān tài lěng le.", translation: "Сегодня слишком холодно." },
          { hanzi: "这个房间太舒服了！", pinyin: "Zhège fángjiān tài shūfu le!", translation: "Эта комната супер удобная!" },
          { hanzi: "这件毛衣的颜色太浅了，我不喜欢。", pinyin: "Zhè jiàn máoyī de yánsè tài qiǎn le, wǒ bù xǐhuan.", translation: "Цвет этого свитера слишком светлый, не нравится." },
        ],
      },
      {
        title: "Обстоятельство места: 在 + место + глагол",
        explanation:
          "«Делаю X в месте Y»: в китайском «в месте» ВСЕГДА ставится ПЕРЕД глаголом.\n\n" +
          "Схема:  Подл. + 在 + Место + Глагол + (Объект)\n\n" +
          "阿曼在北京大学学习汉语。\n" +
          "«Аман в Пекинском университете изучает китайский.»\n\n" +
          "ВНИМАНИЕ — обратный порядок в русском:\n" +
          "• Русский: «Аман учит китайский В ПЕКИНЕ»\n" +
          "• Китайский: «Аман В ПЕКИНЕ учит китайский»\n\n" +
          "Место нельзя ставить в конец предложения — это другой смысл (глагол 在 без места).",
        examples: [
          { hanzi: "在宿舍里看电视。", pinyin: "Zài sùshè li kàn diànshì.", translation: "В общежитии смотрю телевизор." },
          { hanzi: "阿曼在北京大学学习汉语。", pinyin: "Āmàn zài Běijīng Dàxué xuéxí Hànyǔ.", translation: "Аман в Пекинском университете учит китайский." },
          { hanzi: "他在图书馆看书。", pinyin: "Tā zài túshūguǎn kàn shū.", translation: "Он в библиотеке читает." },
          { hanzi: "他们在购物中心买东西。", pinyin: "Tāmen zài gòuwù zhōngxīn mǎi dōngxi.", translation: "Они в ТЦ покупают." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Про выходные (阿曼 и одноклассник)",
        lines: [
          { speaker: "A", hanzi: "明天又是周末，太高兴了！", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le!", translation: "Завтра опять выходные — как я рад!" },
          { speaker: "B", hanzi: "看起来，你很喜欢周末。", pinyin: "Kànqǐlai, nǐ hěn xǐhuan zhōumò.", translation: "Похоже, ты очень любишь выходные." },
          { speaker: "A", hanzi: "当然喜欢啦！周末可以好好儿玩儿玩儿，你不喜欢吗？", pinyin: "Dāngrán xǐhuan la! Zhōumò kěyǐ hǎohāor wánr wánr, nǐ bù xǐhuan ma?", translation: "Конечно люблю! На выходных можно хорошо отдохнуть — ты разве не любишь?" },
          { speaker: "B", hanzi: "我不喜欢。每个周末，我都觉得没意思。", pinyin: "Wǒ bù xǐhuan. Měi ge zhōumò, wǒ dōu juéde méi yìsi.", translation: "Не люблю. Каждые выходные мне скучно." },
          { speaker: "A", hanzi: "你周末都干什么呢？", pinyin: "Nǐ zhōumò dōu gàn shénme ne?", translation: "А что ты делаешь на выходных?" },
          { speaker: "B", hanzi: "在宿舍里看看电视，洗洗衣服，做做作业，睡睡懒觉……", pinyin: "Zài sùshè li kànkan diànshì, xǐxi yīfu, zuòzuo zuòyè, shuìshui lǎnjiào...", translation: "В общежитии смотрю телик, стираю, делаю уроки, высыпаюсь…" },
          { speaker: "A", hanzi: "你不和朋友一起出去玩儿吗？", pinyin: "Nǐ bù hé péngyou yìqǐ chūqu wánr ma?", translation: "А с друзьями не выходишь гулять?" },
          { speaker: "B", hanzi: "有时候和朋友一起逛逛商店，有时候去图书馆学习学习。你周末都干什么呢？", pinyin: "Yǒu shíhou hé péngyou yìqǐ guàngguang shāngdiàn, yǒu shíhou qù túshūguǎn xuéxí xuéxí. Nǐ zhōumò dōu gàn shénme ne?", translation: "Иногда с друзьями хожу по магазинам, иногда в библиотеку. А ты?" },
          { speaker: "A", hanzi: "我每个周末都有不同的安排。上个周末到朋友家包饺子，上上个周末去迪厅跳舞……", pinyin: "Wǒ měi ge zhōumò dōu yǒu bù tóng de ānpái. Shàng ge zhōumò dào péngyou jiā bāo jiǎozi, shàng shàng ge zhōumò qù dítīng tiào wǔ...", translation: "У меня каждые выходные разные планы. В прошлые лепил пельмени у друга, в позапрошлые ходил на дискотеку…" },
          { speaker: "B", hanzi: "这个周末你干什么？", pinyin: "Zhège zhōumò nǐ gàn shénme?", translation: "А в эти что планируешь?" },
          { speaker: "A", hanzi: "我去听音乐会。一起去，怎么样？", pinyin: "Wǒ qù tīng yīnyuèhuì. Yìqǐ qù, zěnmeyàng?", translation: "Иду на концерт. Пойдём вместе?" },
          { speaker: "B", hanzi: "好啊，太好了！", pinyin: "Hǎo a, tài hǎo le!", translation: "Давай, отлично!" },
        ],
      },
    ],

    tips: [
      "Удвоение делает глагол «мягче». Сравни: 看书 («читай/прочти») vs 看看书 («почитай чуть-чуть»). Для просьб всегда лучше удвоенная форма — вежливее.",
      "上 в контексте времени = «прошлый»: 上星期 (прошлая неделя), 上个月 (прошлый месяц), 上个周末 (прошлые выходные). 上上 = «позапрошлый».",
      "又 vs 再: оба «снова». 又 — о прошлом/повторяющемся («опять же»), 再 — о будущем («снова сделаю»). 又是周末 = «опять выходные» (регулярно происходит).",
      "啦 (la) = 了+啊, эмоциональная частица. Показывает энтузиазм: 当然喜欢啦! («конечно люблю!»). Придаёт лёгкую дружескую интонацию.",
      "好好儿 (hǎohāor) — «как следует, хорошенько». Ставится перед глаголом: 好好儿玩儿 (хорошо отдохнуть), 好好儿学习 (хорошо учиться).",
    ],
  },

  17: {
    introduction:
      "В этой главе вы научитесь идти в гости: приветствовать хозяев, дарить подарок, говорить вежливые клише. Познакомитесь с глаголом 会 («уметь»), эмфатическим 就是 и другими правилами этикета.\n\n" +
      "Ситуация: 阿曼 и 古丽 приходят в гости к 王老师 — обмениваются подарками и лепят пельмени.",

    vocabulary: [
      { hanzi: "做客", pinyin: "zuò kè", translation: "быть в гостях" },
      { hanzi: "请进", pinyin: "qǐng jìn", translation: "проходите, пожалуйста" },
      { hanzi: "真", pinyin: "zhēn", translation: "действительно, по-настоящему" },
      { hanzi: "干净", pinyin: "gānjìng", translation: "чистый" },
      { hanzi: "坐", pinyin: "zuò", translation: "сидеть, садиться" },
      { hanzi: "哎呀", pinyin: "āiyā", translation: "ой, ах (восклицание)" },
      { hanzi: "客气", pinyin: "kèqi", translation: "вежливый, церемониться" },
      { hanzi: "一点儿", pinyin: "yìdiǎnr", translation: "немного, чуть-чуть" },
      { hanzi: "心意", pinyin: "xīnyì", translation: "знак внимания" },
      { hanzi: "收下", pinyin: "shōuxià", translation: "принять (подарок)" },
      { hanzi: "茶", pinyin: "chá", translation: "чай" },
      { hanzi: "果汁", pinyin: "guǒzhī", translation: "сок" },
      { hanzi: "随便", pinyin: "suíbiàn", translation: "как угодно, без разницы" },
      { hanzi: "行", pinyin: "xíng", translation: "годится, подходит" },
      { hanzi: "路上", pinyin: "lùshàng", translation: "в пути, по дороге" },
      { hanzi: "顺利", pinyin: "shùnlì", translation: "гладко, без проблем" },
      { hanzi: "挤", pinyin: "jǐ", translation: "тесно, набит" },
      { hanzi: "打车", pinyin: "dǎ chē", translation: "взять такси" },
      { hanzi: "空调", pinyin: "kōngtiáo", translation: "кондиционер" },
      { hanzi: "大巴", pinyin: "dàbā", translation: "автобус (большой)" },
      { hanzi: "地铁", pinyin: "dìtiě", translation: "метро" },
      { hanzi: "饿", pinyin: "è", translation: "голодный" },
      { hanzi: "吃", pinyin: "chī", translation: "есть, кушать" },
      { hanzi: "会", pinyin: "huì", translation: "уметь" },
      { hanzi: "试", pinyin: "shì", translation: "пробовать" },
    ],

    grammar: [
      {
        title: "Глагол 会 — «уметь (по обучению)»",
        explanation:
          "会 (huì) — «уметь», но только про НАВЫКИ, которым научились: говорить на языке, готовить, водить машину.\n\n" +
          "Схема:  Подл. + 会 + Глагол + (Объект)\n\n" +
          "我会包饺子。— Я умею лепить пельмени.\n" +
          "我会说英语。— Я умею говорить по-английски.\n\n" +
          "Отрицание: 不会.\n" +
          "他不会说英语。— Он не умеет говорить по-английски.\n\n" +
          "Есть и другие значения 会 (возможность, вероятность) — их изучим позже. Пока — только «уметь».",
        examples: [
          { hanzi: "你们会包吗？", pinyin: "Nǐmen huì bāo ma?", translation: "Вы умеете лепить?" },
          { hanzi: "我会包饺子。", pinyin: "Wǒ huì bāo jiǎozi.", translation: "Я умею лепить пельмени." },
          { hanzi: "我会说英语，他不会说英语。", pinyin: "Wǒ huì shuō Yīngyǔ, tā bú huì shuō Yīngyǔ.", translation: "Я говорю по-английски, он — нет." },
          { hanzi: "你会骑自行车吗？", pinyin: "Nǐ huì qí zìxíngchē ma?", translation: "Ты умеешь ездить на велосипеде?" },
        ],
      },
      {
        title: "就是 — эмфатическое «именно, как раз»",
        explanation:
          "就是 (jiùshì) между подлежащим и сказуемым — для усиления: «именно это, именно так».\n\n" +
          "Схема:  Подл. + 就是 + Объект/Описание\n\n" +
          "我最喜欢吃的就是饺子。\n" +
          "«Что я больше всего люблю есть — так это пельмени.»\n\n" +
          "他就是王老师。— Это и есть учитель Ван.\n" +
          "这儿就是图书馆。— Это как раз библиотека.\n\n" +
          "Переводится как «именно», «как раз», «это и есть».",
        examples: [
          { hanzi: "我最喜欢吃的就是饺子。", pinyin: "Wǒ zuì xǐhuan chī de jiùshì jiǎozi.", translation: "Что я больше всего люблю — это пельмени." },
          { hanzi: "他就是王老师。", pinyin: "Tā jiùshì Wáng lǎoshī.", translation: "Это и есть учитель Ван." },
          { hanzi: "这儿就是图书馆。", pinyin: "Zhèr jiùshì túshūguǎn.", translation: "Здесь как раз библиотека." },
          { hanzi: "北京大学的东边就是清华大学。", pinyin: "Běijīng Dàxué de dōngbian jiùshì Qīnghuá Dàxué.", translation: "К востоку от Бэйда — как раз Цинхуа." },
        ],
      },
      {
        title: "A 还是 B — повторение «А или Б?» (с 是)",
        explanation:
          "В Главе 15 мы изучили 还是 для выбора. В Главе 17 повторяем с вариантом «是 A 还是 B».\n\n" +
          "Схемы:\n" +
          "• 是 A 还是 B？— вежливо, если подразумевается «есть/является»\n" +
          "• A 还是 B？— проще, без 是\n\n" +
          "茶还是果汁？— Чай или сок?\n" +
          "你们一般坐公共汽车还是打车？— Обычно на автобусе или на такси?\n\n" +
          "В ответе 是 можно опустить.",
        examples: [
          { hanzi: "茶还是果汁？", pinyin: "Chá háishi guǒzhī?", translation: "Чай или сок?" },
          { hanzi: "你是美国人还是加拿大人？", pinyin: "Nǐ shì Měiguó rén háishi Jiānádà rén?", translation: "Ты американец или канадец?" },
          { hanzi: "你喝茶还是喝咖啡？", pinyin: "Nǐ hē chá háishi hē kāfēi?", translation: "Ты будешь чай или кофе?" },
          { hanzi: "是你去还是我去？", pinyin: "Shì nǐ qù háishi wǒ qù?", translation: "Ты пойдёшь или я?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "В гостях у 王老师 (阿曼, 古丽, 王老师)",
        lines: [
          { speaker: "A", hanzi: "请进，请进！", pinyin: "Qǐng jìn, qǐng jìn!", translation: "Заходите, заходите!" },
          { speaker: "B", hanzi: "老师，您的家真干净啊！", pinyin: "Lǎoshī, nín de jiā zhēn gānjìng a!", translation: "Учитель, у вас дома так чисто!" },
          { speaker: "A", hanzi: "是吗？来，坐这儿吧！", pinyin: "Shì ma? Lái, zuò zhèr ba!", translation: "Правда? Проходите, садитесь сюда!" },
          { speaker: "B", hanzi: "这是给您的礼物。", pinyin: "Zhè shì gěi nín de lǐwù.", translation: "Это подарок для вас." },
          { speaker: "A", hanzi: "哎呀！你们太客气了。", pinyin: "Āiyā! Nǐmen tài kèqi le.", translation: "Ой! Вы зря так беспокоитесь." },
          { speaker: "B", hanzi: "一点儿心意，请收下。", pinyin: "Yìdiǎnr xīnyì, qǐng shōuxià.", translation: "Небольшой знак внимания — примите, пожалуйста." },
          { speaker: "A", hanzi: "谢谢！你们喝什么？茶还是果汁？", pinyin: "Xièxie! Nǐmen hē shénme? Chá háishi guǒzhī?", translation: "Спасибо! Что будете пить? Чай или сок?" },
          { speaker: "B", hanzi: "随便，什么都行。", pinyin: "Suíbiàn, shénme dōu xíng.", translation: "Без разницы, любое подойдёт." },
          { speaker: "A", hanzi: "路上顺利吗？", pinyin: "Lùshàng shùnlì ma?", translation: "Добрались без проблем?" },
          { speaker: "B", hanzi: "不太顺利，车上有点儿挤。", pinyin: "Bú tài shùnlì, chē shàng yǒudiǎnr jǐ.", translation: "Не совсем, в автобусе было тесновато." },
          { speaker: "A", hanzi: "你们饿不饿？中午在我家吃饺子，怎么样？", pinyin: "Nǐmen è bu è? Zhōngwǔ zài wǒ jiā chī jiǎozi, zěnmeyàng?", translation: "Вы не голодные? Пообедаем у меня пельменями, как?" },
          { speaker: "B", hanzi: "太好了，我最喜欢吃的就是饺子。", pinyin: "Tài hǎo le, wǒ zuì xǐhuan chī de jiùshì jiǎozi.", translation: "Отлично, я как раз обожаю пельмени!" },
          { speaker: "A", hanzi: "你们会包吗？", pinyin: "Nǐmen huì bāo ma?", translation: "Вы умеете лепить?" },
          { speaker: "B", hanzi: "不太会，我们试试吧！", pinyin: "Bú tài huì, wǒmen shìshi ba!", translation: "Не очень, попробуем!" },
        ],
      },
    ],

    tips: [
      "Этикет подарков: 一点儿心意 («небольшой знак внимания») — стандартная скромная формула при вручении. Хозяин в ответ говорит 太客气了 («зря вы так»).",
      "随便 / 什么都行 — очень вежливый ответ когда предлагают выбор. Буквально «как угодно / всё подойдёт». НЕ невежливо, наоборот — воспитанно не навязывать свои предпочтения.",
      "饺子 — символическая еда в Китае, особенно на Новый год (春节). Форма похожа на старинные деньги, означает богатство. Лепить всей семьёй — традиция.",
      "真 (zhēn) перед прилагательным = «правда, действительно»: 真干净 (правда чисто), 真好吃 (реально вкусно). Сильнее чем 很.",
      "哎呀 (āiyā) — универсальное восклицание удивления/ужаса/разочарования. Контекст определяет тон. При получении подарка: удивление + вежливое возражение.",
    ],
  },

  18: {
    introduction:
      "Продолжение визита (Part 2). Вы научитесь перечислять примеры (A啦 B啦 C啦), использовать 得 («должен»), риторический вопрос 不是……吗? и условный оборот 如果……就…… («если… то…»).\n\n" +
      "Ситуация: за столом обсуждают разницу между северными и южными китайцами в еде, и как проще — лепить пельмени самим или покупать замороженные.",

    vocabulary: [
      { hanzi: "好吃", pinyin: "hǎochī", translation: "вкусный" },
      { hanzi: "味道", pinyin: "wèidào", translation: "вкус, запах" },
      { hanzi: "北方", pinyin: "běifāng", translation: "север (Китая)" },
      { hanzi: "过", pinyin: "guò", translation: "проводить (время), праздновать" },
      { hanzi: "节", pinyin: "jié", translation: "праздник" },
      { hanzi: "客人", pinyin: "kèren", translation: "гость" },
      { hanzi: "南方", pinyin: "nánfāng", translation: "юг (Китая)" },
      { hanzi: "米饭", pinyin: "mǐfàn", translation: "варёный рис" },
      { hanzi: "面食", pinyin: "miànshí", translation: "мучные изделия" },
      { hanzi: "对……来说", pinyin: "duì...lái shuō", translation: "что касается (кого-то)" },
      { hanzi: "重要", pinyin: "zhòngyào", translation: "важный" },
      { hanzi: "种", pinyin: "zhǒng", translation: "сорт, вид" },
      { hanzi: "食品", pinyin: "shípǐn", translation: "еда, продукты" },
      { hanzi: "麻烦", pinyin: "máfan", translation: "хлопотный, доставить хлопоты" },
      { hanzi: "少", pinyin: "shǎo", translation: "мало, немного" },
      { hanzi: "馅儿", pinyin: "xiànr", translation: "начинка" },
      { hanzi: "得", pinyin: "děi", translation: "должен, приходится" },
      { hanzi: "花", pinyin: "huā", translation: "тратить (время, деньги)" },
      { hanzi: "超市", pinyin: "chāoshì", translation: "супермаркет" },
      { hanzi: "速冻", pinyin: "sùdòng", translation: "замороженный" },
      { hanzi: "如果", pinyin: "rúguǒ", translation: "если" },
      { hanzi: "的话", pinyin: "dehuà", translation: "если (частица условия)" },
      { hanzi: "想", pinyin: "xiǎng", translation: "хотеть" },
      { hanzi: "袋", pinyin: "dài", translation: "пакет, мешок" },
      { hanzi: "偷懒", pinyin: "tōu lǎn", translation: "лениться" },
      { hanzi: "大家", pinyin: "dàjiā", translation: "все, каждый" },
      { hanzi: "热闹", pinyin: "rènao", translation: "оживлённо, весело" },
      { hanzi: "有意思", pinyin: "yǒu yìsi", translation: "интересно" },
    ],

    grammar: [
      {
        title: "Перечисление через 啦: A啦 B啦 C啦",
        explanation:
          "Частица 啦 (la) после каждого элемента списка = русское «…, …, … (разные)». Создаёт неформальное перечисление с оттенком «и то, и это».\n\n" +
          "Схема:  A 啦，B 啦，C 啦……\n\n" +
          "过生日啦，过节啦，来客人啦 — 一般都包饺子吃。\n" +
          "«Дни рождения, праздники, приход гостей — обычно лепят пельмени.»\n\n" +
          "啦 объединяет разные случаи в один общий контекст. Часто после списка идёт 都 («все эти»).",
        examples: [
          { hanzi: "过生日啦，过节啦，来客人啦，一般都包饺子吃。", pinyin: "Guò shēngrì la, guò jié la, lái kèren la, yìbān dōu bāo jiǎozi chī.", translation: "Дни рождения, праздники, гости — обычно лепят пельмени." },
          { hanzi: "我们大学有很多国家的留学生，美国啦，日本啦，英国啦……", pinyin: "Wǒmen dàxué yǒu hěn duō guójiā de liúxuéshēng, Měiguó la, Rìběn la, Yīngguó la...", translation: "В нашем вузе студенты из разных стран — из США, Японии, Англии…" },
          { hanzi: "阿曼去商店买很多东西，衣服啦，食品啦，啤酒啦。", pinyin: "Āmàn qù shāngdiàn mǎi hěn duō dōngxi, yīfu la, shípǐn la, píjiǔ la.", translation: "Аман в магазине покупает много — одежду, еду, пиво." },
        ],
      },
      {
        title: "得 (děi) — «должен, надо»",
        explanation:
          "得 (в этом значении читается DĚI, не DÉ!) означает «должен, надо, приходится». Ставится перед глаголом.\n\n" +
          "Схема:  Подл. + 得 + Глагол + (Объект)\n\n" +
          "做馅儿就得花很多时间。\n" +
          "«Делать начинку — надо потратить много времени.»\n\n" +
          "Отрицание: 不用 (не нужно), НЕ 不得!\n" +
          "• 我得去学校。— Мне надо в школу.\n" +
          "• 我不用去学校。— Мне не надо в школу.\n\n" +
          "Внимание: иероглиф 得 имеет 3 чтения — dé (получать), děi (должен), de (показатель степени). Здесь только DĚI.",
        examples: [
          { hanzi: "做馅儿就得花很多时间。", pinyin: "Zuò xiànr jiù děi huā hěn duō shíjiān.", translation: "Делать начинку — нужно много времени." },
          { hanzi: "明天早上八点有课，我得七点起床。", pinyin: "Míngtiān zǎoshang bā diǎn yǒu kè, wǒ děi qī diǎn qǐ chuáng.", translation: "Завтра в 8 занятия, нужно встать в 7." },
          { hanzi: "包饺子比较麻烦，我得花很多时间。", pinyin: "Bāo jiǎozi bǐjiào máfan, wǒ děi huā hěn duō shíjiān.", translation: "Лепить пельмени хлопотно, уйдёт много времени." },
        ],
      },
      {
        title: "Риторический вопрос: 不是……吗？",
        explanation:
          "不是……吗？ — риторический вопрос, который на самом деле УТВЕРЖДЕНИЕ. Смысл: «разве не X? (ведь X же!)».\n\n" +
          "Схема:  不是 + Утверждение + 吗？\n\n" +
          "超市不是有速冻饺子吗？\n" +
          "= «Разве в супермаркете нет замороженных пельменей? (Ведь есть же!)»\n\n" +
          "Используется:\n" +
          "• Когда напоминаешь очевидный факт\n" +
          "• Когда мягко возражаешь\n" +
          "• Когда удивляешься забытому\n\n" +
          "Это НЕ вопрос в обычном смысле — ответ предполагается очевидным и положительным.",
        examples: [
          { hanzi: "超市不是有速冻饺子吗？", pinyin: "Chāoshì bú shì yǒu sùdòng jiǎozi ma?", translation: "Разве в супермаркете нет замороженных пельменей?" },
          { hanzi: "你不是美国人吗？", pinyin: "Nǐ bú shì Měiguó rén ma?", translation: "Разве ты не американец? (ведь американец же)" },
          { hanzi: "你们不是朋友吗？", pinyin: "Nǐmen bú shì péngyou ma?", translation: "Разве вы не друзья?" },
          { hanzi: "你不是喜欢喝咖啡吗？", pinyin: "Nǐ bú shì xǐhuan hē kāfēi ma?", translation: "Ты же вроде любишь кофе, разве нет?" },
        ],
      },
      {
        title: "Условный оборот: 如果……(的话)，就……",
        explanation:
          "如果 A (的话)，就 B — «если А, то Б». Классический условный оборот.\n\n" +
          "Схема:  如果 + Условие + (的话)，就 + Результат\n\n" +
          "• 如果 (rúguǒ) — «если» в начале условия\n" +
          "• 的话 (dehuà) — опциональная частица в конце условия\n" +
          "• 就 (jiù) — «то, тогда» в начале результата\n\n" +
          "Можно использовать все 3 элемента или только часть. Минимально: «Условие, 就 Результат». Но полная форма яснее.",
        examples: [
          { hanzi: "如果想吃的话，就去买一袋。", pinyin: "Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài.", translation: "Если хочешь есть — купи пакетик." },
          { hanzi: "如果坐地铁的话，比较快，也比较便宜。", pinyin: "Rúguǒ zuò dìtiě dehuà, bǐjiào kuài, yě bǐjiào piányi.", translation: "Если ехать на метро — быстрее и дешевле." },
          { hanzi: "如果下课早，我们就去商店。", pinyin: "Rúguǒ xià kè zǎo, wǒmen jiù qù shāngdiàn.", translation: "Если уроки закончатся рано — пойдём в магазин." },
          { hanzi: "如果没有安排的话，我就去。", pinyin: "Rúguǒ méiyǒu ānpái dehuà, wǒ jiù qù.", translation: "Если нет планов — схожу." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Север vs Юг (王老师, 阿曼, 古丽)",
        lines: [
          { speaker: "A", hanzi: "老师，今天的饺子真好吃！", pinyin: "Lǎoshī, jīntiān de jiǎozi zhēn hǎochī!", translation: "Учитель, пельмени сегодня очень вкусные!" },
          { speaker: "B", hanzi: "是啊，味道挺不错的。老师，中国人都喜欢吃饺子吗？", pinyin: "Shì a, wèidào tǐng búcuò de. Lǎoshī, Zhōngguó rén dōu xǐhuan chī jiǎozi ma?", translation: "Да, на вкус отличные. Учитель, все китайцы любят пельмени?" },
          { speaker: "A", hanzi: "大部分北方人都喜欢吃饺子。过生日啦，过节啦，来客人啦，一般都包饺子吃。", pinyin: "Dàbùfen běifāng rén dōu xǐhuan chī jiǎozi. Guò shēngrì la, guò jié la, lái kèren la, yìbān dōu bāo jiǎozi chī.", translation: "Большинство северян любят. На дни рождения, праздники, при гостях — обычно лепят пельмени." },
          { speaker: "B", hanzi: "南方人不吃饺子吗？", pinyin: "Nánfāng rén bù chī jiǎozi ma?", translation: "А южане не едят?" },
          { speaker: "A", hanzi: "不常吃。南方人喜欢吃米饭，不太喜欢吃面食。", pinyin: "Bù cháng chī. Nánfāng rén xǐhuan chī mǐfàn, bú tài xǐhuan chī miànshí.", translation: "Нечасто. Южане любят рис, мучное — не очень." },
          { speaker: "B", hanzi: "是这样啊！对北方人来说，饺子是很重要的一种食品吧？", pinyin: "Shì zhèyàng a! Duì běifāng rén lái shuō, jiǎozi shì hěn zhòngyào de yì zhǒng shípǐn ba?", translation: "Вот оно как! Для северян пельмени — важная еда, верно?" },
          { speaker: "A", hanzi: "是啊！不过，包饺子比较麻烦，特别是人少的时候。", pinyin: "Shì a! Búguò, bāo jiǎozi bǐjiào máfan, tèbié shì rén shǎo de shíhou.", translation: "Да! Но лепить хлопотно, особенно когда людей мало." },
          { speaker: "B", hanzi: "对，做馅儿就得花很多时间呢。", pinyin: "Duì, zuò xiànr jiù děi huā hěn duō shíjiān ne.", translation: "Да, одна начинка сколько времени требует." },
          { speaker: "C", hanzi: "超市不是有速冻饺子吗？如果想吃的话，就去买一袋。", pinyin: "Chāoshì bú shì yǒu sùdòng jiǎozi ma? Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài.", translation: "А в супермаркете разве нет замороженных? Если хочется — купи пакетик." },
          { speaker: "A", hanzi: "你真会偷懒。不过，大家一起包饺子，热闹，也挺有意思的。", pinyin: "Nǐ zhēn huì tōu lǎn. Búguò, dàjiā yìqǐ bāo jiǎozi, rènao, yě tǐng yǒu yìsi de.", translation: "Ну ты и ленивый! Но лепить вместе — весело, и правда интересно." },
          { speaker: "B", hanzi: "速冻饺子的味道怎么样？好吃吗？", pinyin: "Sùdòng jiǎozi de wèidào zěnmeyàng? Hǎochī ma?", translation: "А замороженные пельмени на вкус как? Вкусные?" },
          { speaker: "C", hanzi: "也很好吃。", pinyin: "Yě hěn hǎochī.", translation: "Тоже вкусные." },
        ],
      },
    ],

    tips: [
      "Север vs Юг Китая: Север (北方) любит мучное (面食: пельмени, лапша, лепёшки), Юг (南方) — рис (米饭). Граница проходит условно по реке Хуайхэ. Важный культурный факт.",
      "对……来说 — «с точки зрения кого-то, для кого-то». Очень употребительная формула: 对学生来说 (для студентов), 对我来说 (для меня), 对中国人来说 (с точки зрения китайцев).",
      "得 DĚI vs DÉ: 得 DĚI — должен (смысловой). 得 DÉ — получать. Также 得 DE — суффикс степени (走得快 — быстро идёт). Три разных слова-омонима.",
      "如果…的话 — обычно 的话 ставится В КОНЦЕ условия. 如果хоть одно из трёх (如果, 的话, 就) достаточно, но чем больше элементов — тем яснее.",
      "偷懒 дословно «красть лень» = «лениться, халтурить». Популярное выражение. 你真会偷懒 — «ну ты и ленивый!» (дружеская шутка).",
    ],
  },

  19: {
    introduction:
      "В этой главе вы научитесь говорить о привычках и времени привыкания, использовать частицу 了 для изменения состояния, различать 就 (раньше) и 才 (позже) и спрашивать возраст разными способами.\n\n" +
      "Ситуация: 王老师 расспрашивает 阿曼 про его жизнь в Пекине — привык ли он, когда ложится спать.",

    vocabulary: [
      { hanzi: "多", pinyin: "duō", translation: "как, насколько (в вопросе)" },
      { hanzi: "长", pinyin: "cháng", translation: "длинный, долгий" },
      { hanzi: "年", pinyin: "nián", translation: "год" },
      { hanzi: "习惯", pinyin: "xíguàn", translation: "привыкать; привычка" },
      { hanzi: "生活", pinyin: "shēnghuó", translation: "жизнь, быт" },
      { hanzi: "刚", pinyin: "gāng", translation: "только что, недавно" },
      { hanzi: "已经", pinyin: "yǐjīng", translation: "уже" },
      { hanzi: "不好意思", pinyin: "bù hǎoyìsi", translation: "извините, неловко" },
      { hanzi: "才", pinyin: "cái", translation: "только (позже, чем ожидалось)" },
      { hanzi: "起床", pinyin: "qǐ chuáng", translation: "вставать (с постели)" },
      { hanzi: "床", pinyin: "chuáng", translation: "кровать, постель" },
      { hanzi: "睡", pinyin: "shuì", translation: "спать, засыпать" },
      { hanzi: "夜里", pinyin: "yèli", translation: "ночью" },
      { hanzi: "点钟", pinyin: "diǎnzhōng", translation: "час (на часах)" },
      { hanzi: "早睡早起", pinyin: "zǎo shuì zǎo qǐ", translation: "рано ложиться и рано вставать" },
      { hanzi: "工作", pinyin: "gōngzuò", translation: "работать; работа" },
      { hanzi: "毛病", pinyin: "máobìng", translation: "недостаток, дурная привычка" },
      { hanzi: "改", pinyin: "gǎi", translation: "изменить, исправить" },
      { hanzi: "大", pinyin: "dà", translation: "большой; старший (о возрасте)" },
      { hanzi: "年纪", pinyin: "niánjì", translation: "возраст" },
      { hanzi: "大概", pinyin: "dàgài", translation: "примерно, около" },
      { hanzi: "岁", pinyin: "suì", translation: "лет (о возрасте)" },
    ],

    grammar: [
      {
        title: "Частица 了 (1) — изменение состояния / завершённость",
        explanation:
          "了 (le) в конце предложения указывает на ИЗМЕНЕНИЕ или завершённость действия/состояния.\n\n" +
          "Схема:  Предложение + 了\n\n" +
          "• 我习惯了。— Я привык (теперь). (раньше не был привыкшим — стал)\n" +
          "• 他去图书馆了。— Он ушёл в библиотеку. (уже ушёл)\n" +
          "• 昨天下雪了。— Вчера шёл снег. (завершённое действие)\n\n" +
          "Отрицание: 没 + Глагол (БЕЗ 了).\n" +
          "❌ 没去了 → ✅ 没去\n" +
          "• 他没去图书馆。— Он НЕ ходил в библиотеку.\n\n" +
          "Это одна из самых сложных частиц в китайском — у 了 много значений. Пока запомните: «изменение или завершённость».",
        examples: [
          { hanzi: "现在已经习惯了。", pinyin: "Xiànzài yǐjīng xíguàn le.", translation: "Сейчас уже привык." },
          { hanzi: "他去图书馆了。", pinyin: "Tā qù túshūguǎn le.", translation: "Он ушёл в библиотеку." },
          { hanzi: "他没去图书馆。", pinyin: "Tā méi qù túshūguǎn.", translation: "Он НЕ ходил в библиотеку." },
          { hanzi: "昨天下雪了。", pinyin: "Zuótiān xià xuě le.", translation: "Вчера шёл снег." },
        ],
      },
      {
        title: "Наречие 还 (2) — «всё ещё, пока»",
        explanation:
          "Мы уже видели 还 в значении «ещё, вдобавок» (Глава 10). Здесь второе значение — «всё ещё, пока (продолжается)».\n\n" +
          "Схема:  还 + Глагол/Прилагательное (+ 没…)\n\n" +
          "• 这还没习惯。— С этим пока не привык. (всё ещё не)\n" +
          "• 已经十二点了，他还在学习。— Уже 12, а он всё ещё учится.\n\n" +
          "Часто с 没 — «ещё не»:\n" +
          "• 还没习惯 — ещё не привык\n" +
          "• 还没来 — ещё не пришёл\n" +
          "• 还没吃饭 — ещё не ел",
        examples: [
          { hanzi: "这还没习惯。", pinyin: "Zhè hái méi xíguàn.", translation: "С этим пока не привык." },
          { hanzi: "已经夜里十二点了，他还在学习。", pinyin: "Yǐjīng yèli shí'èr diǎn le, tā hái zài xuéxí.", translation: "Уже полночь, а он всё ещё учится." },
          { hanzi: "来北京半年了，他还没习惯早上八点上课。", pinyin: "Lái Běijīng bàn nián le, tā hái méi xíguàn zǎoshang bā diǎn shàng kè.", translation: "Уже полгода в Пекине, а к занятиям в 8 утра всё не привыкнет." },
          { hanzi: "已经三十岁了，他还没有女朋友。", pinyin: "Yǐjīng sānshí suì le, tā hái méiyǒu nǚ péngyou.", translation: "Уже 30 лет, а подруги всё нет." },
        ],
      },
      {
        title: "就 vs 才 — «раньше» vs «позже, чем ожидалось»",
        explanation:
          "Два очень важных слова, которые меняют смысл времени:\n\n" +
          "• 就 (jiù) — подчёркивает что действие РАНО/БЫСТРО:\n" +
          "  他早上六点就起床了。— Он ВСТАЛ уже в 6 (рано).\n" +
          "  妹妹三岁就开始学跳舞。— Сестра в 3 УЖЕ начала танцевать.\n\n" +
          "• 才 (cái) — подчёркивает что действие ПОЗДНО/МЕДЛЕННО:\n" +
          "  他早上八点才起床。— Он встал только в 8 (поздно).\n" +
          "  古丽七点半才去教室。— Гульнара только в 7:30 пошла в аудиторию.\n\n" +
          "Одно и то же время (например, 8 часов) можно подать и как «рано» (就), и как «поздно» (才) — зависит от ожиданий.",
        examples: [
          { hanzi: "我一般早上八点才起床。", pinyin: "Wǒ yìbān zǎoshang bā diǎn cái qǐ chuáng.", translation: "Я обычно только в 8 утра встаю (поздно)." },
          { hanzi: "有时候夜里两点钟才睡。", pinyin: "Yǒu shíhou yèli liǎng diǎnzhōng cái shuì.", translation: "Иногда только в 2 ночи ложусь." },
          { hanzi: "他上个星期就回国了。", pinyin: "Tā shàng ge xīngqī jiù huí guó le.", translation: "Он ещё на прошлой неделе уехал на родину (рано)." },
          { hanzi: "妹妹三岁就开始学跳舞。", pinyin: "Mèimei sān suì jiù kāishǐ xué tiào wǔ.", translation: "Сестра уже в 3 начала танцевать." },
        ],
      },
      {
        title: "Как спрашивать возраст",
        explanation:
          "В китайском ТРИ формы вопроса о возрасте, в зависимости от возраста собеседника:\n\n" +
          "1) ДЕТИ (<10 лет): 几岁？\n" +
          "   • 你今年几岁了？— Сколько тебе лет?\n" +
          "   • 我六岁。— Мне 6.\n\n" +
          "2) ВЗРОСЛЫЕ (10+): 多大？\n" +
          "   • 你多大？— Сколько тебе?\n" +
          "   • 我二十二。— 22.\n\n" +
          "3) ПОЖИЛЫЕ (вежливо): 多大年纪？ / 多大岁数？\n" +
          "   • 您多大年纪？— Сколько Вам лет? (почтительно)\n\n" +
          "Важно не перепутать — для ребёнка 多大 звучит странно, а для старика 几岁 — грубо.",
        examples: [
          { hanzi: "你今年几岁了？", pinyin: "Nǐ jīnnián jǐ suì le?", translation: "Сколько тебе лет (ребёнку)?" },
          { hanzi: "你多大？", pinyin: "Nǐ duō dà?", translation: "Сколько тебе (взрослому)?" },
          { hanzi: "您多大年纪？", pinyin: "Nín duō dà niánjì?", translation: "Сколько Вам лет (пожилому)?" },
          { hanzi: "大概二十五岁吧。", pinyin: "Dàgài èrshíwǔ suì ba.", translation: "Примерно 25 лет." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Привычки и возраст (王老师 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，你来北京多长时间了？", pinyin: "Āmàn, nǐ lái Běijīng duō cháng shíjiān le?", translation: "Аман, ты давно в Пекине?" },
          { speaker: "B", hanzi: "差不多半年多。", pinyin: "Chàbuduō bàn nián duō.", translation: "Примерно полгода с небольшим." },
          { speaker: "A", hanzi: "习惯北京的生活了吧？", pinyin: "Xíguàn Běijīng de shēnghuó le ba?", translation: "Уже привык к пекинской жизни?" },
          { speaker: "B", hanzi: "刚来的时候不习惯，现在已经习惯了。", pinyin: "Gāng lái de shíhou bù xíguàn, xiànzài yǐjīng xíguàn le.", translation: "Сначала не привык, а теперь уже привык." },
          { speaker: "A", hanzi: "早上八点上课也习惯了吗？", pinyin: "Zǎoshang bā diǎn shàng kè yě xíguàn le ma?", translation: "А к занятиям в 8 утра привык?" },
          { speaker: "B", hanzi: "不好意思，这还没习惯。在美国，我一般早上八点才起床。", pinyin: "Bù hǎoyìsi, zhè hái méi xíguàn. Zài Měiguó, wǒ yìbān zǎoshang bā diǎn cái qǐ chuáng.", translation: "Неловко сказать, пока нет. В Америке я обычно только в 8 вставал." },
          { speaker: "A", hanzi: "是吗？现在晚上几点睡觉？", pinyin: "Shì ma? Xiànzài wǎnshang jǐ diǎn shuì jiào?", translation: "Правда? Сейчас во сколько ложишься?" },
          { speaker: "B", hanzi: "一般十二点睡，有时候夜里两点钟才睡。不过，早上八点有课的话，就早一点儿睡。", pinyin: "Yìbān shí'èr diǎn shuì, yǒu shíhou yèli liǎng diǎnzhōng cái shuì. Búguò, zǎoshang bā diǎn yǒu kè dehuà, jiù zǎo yìdiǎnr shuì.", translation: "Обычно в 12, иногда только в 2 ночи. Но если в 8 утра пары — ложусь пораньше." },
          { speaker: "A", hanzi: "早睡早起比较好吧？我是学生的时候，也喜欢睡懒觉。工作以后，这个毛病就改了。", pinyin: "Zǎo shuì zǎo qǐ bǐjiào hǎo ba? Wǒ shì xuéshēng de shíhou, yě xǐhuan shuì lǎnjiào. Gōngzuò yǐhòu, zhège máobìng jiù gǎi le.", translation: "«Рано ложись — рано вставай» — так ведь лучше? Я в студенческие годы тоже любила поспать. А после работы эту привычку изменила." },
          { speaker: "B", hanzi: "是吗？那时候您多大年纪？", pinyin: "Shì ma? Nà shíhou nín duō dà niánjì?", translation: "Правда? А сколько Вам тогда было?" },
          { speaker: "A", hanzi: "大概二十五岁吧。", pinyin: "Dàgài èrshíwǔ suì ba.", translation: "Лет 25 примерно." },
        ],
      },
    ],

    tips: [
      "刚 (gāng) и 刚才 (gāngcái) — оба «только что», но 刚 = перед глаголом (刚来 — только пришёл), 刚才 = самостоятельное слово времени (刚才他来了 — он только что пришёл).",
      "多长时间了？ — стандартная формула «как давно?». Отвечают периодом: 半年了 (полгода), 三年了 (три года). 了 тут = «уже прошло».",
      "早睡早起 — китайская поговорка-пожелание, как русское «кто рано встаёт, тому Бог подаёт». Культурная ценность трудолюбия и дисциплины.",
      "不好意思 — буквально «неловко/стыдно», но используется как мягкое «извините» в бытовых ситуациях (когда беспокоишь, просишь прощения за мелочь). Мягче чем 对不起.",
      "毛病 (máobìng) — «недостаток, болячка, дурная привычка». О человеке: 他有很多毛病 (у него много недостатков). О технике: 电脑有毛病了 (компьютер сломался).",
    ],
  },

  20: {
    introduction:
      "Это итоговая глава Unit 4. Вы научитесь использовать конструкцию «прил.+死了» («ужасно…»), отрицательную команду 别 («не делай») и повторите грамматику глав 16-19.\n\n" +
      "Ситуация: 阿曼 навещает заболевшую 古丽 в больнице. Они шутят что лучше: болеть или учиться.",

    vocabulary: [
      { hanzi: "看", pinyin: "kàn", translation: "навещать, смотреть" },
      { hanzi: "别客气", pinyin: "bié kèqi", translation: "не стесняйся, не церемонься" },
      { hanzi: "别", pinyin: "bié", translation: "не надо, не (запрет)" },
      { hanzi: "无聊", pinyin: "wúliáo", translation: "скучный, скучно" },
      { hanzi: "医院", pinyin: "yīyuàn", translation: "больница" },
      { hanzi: "做梦", pinyin: "zuò mèng", translation: "видеть сны, мечтать" },
      { hanzi: "幸福", pinyin: "xìngfú", translation: "счастливый" },
      { hanzi: "背", pinyin: "bèi", translation: "заучивать, запоминать" },
      { hanzi: "生词", pinyin: "shēngcí", translation: "новые слова" },
      { hanzi: "考试", pinyin: "kǎoshì", translation: "экзамен, сдавать экзамен" },
      { hanzi: "累", pinyin: "lèi", translation: "уставший" },
      { hanzi: "死", pinyin: "sǐ", translation: "умирать; до смерти (суффикс крайней степени)" },
      { hanzi: "住", pinyin: "zhù", translation: "жить, проживать" },
      { hanzi: "问", pinyin: "wèn", translation: "спрашивать" },
      { hanzi: "医生", pinyin: "yīshēng", translation: "врач, доктор" },
      { hanzi: "同意", pinyin: "tóngyì", translation: "соглашаться" },
      { hanzi: "对了", pinyin: "duì le", translation: "кстати, ах да" },
      { hanzi: "炒", pinyin: "chǎo", translation: "жарить (помешивая)" },
      { hanzi: "菜", pinyin: "cài", translation: "блюдо, овощи" },
      { hanzi: "面条儿", pinyin: "miàntiáor", translation: "лапша" },
      { hanzi: "病人", pinyin: "bìngrén", translation: "больной, пациент" },
      { hanzi: "身体", pinyin: "shēntǐ", translation: "тело, здоровье" },
      { hanzi: "药", pinyin: "yào", translation: "лекарство" },
      { hanzi: "麦当劳", pinyin: "Màidāngláo", translation: "Макдоналдс" },
    ],

    grammar: [
      {
        title: "Прил. + 死了 — «ужасно, до смерти»",
        explanation:
          "Конструкция «Прилагательное + 死了» выражает КРАЙНЮЮ степень. Буквально «до смерти X», смысл: «ужасно X, супер-X».\n\n" +
          "Схема:  Прил. + 死了\n\n" +
          "累死了！— Я ужасно устал!\n" +
          "冷死了！— Зверский холод!\n" +
          "饿死了！— Умираю от голода!\n" +
          "热死了！— Жара невыносимая!\n\n" +
          "Это очень разговорная и эмоциональная форма. В формальных ситуациях лучше 非常 (очень) или 很.\n\n" +
          "Работает в основном с негативными прилагательными (усталость, голод, скука, холод, жара).",
        examples: [
          { hanzi: "考试啦……累死了。", pinyin: "Kǎoshì la... lèi sǐ le.", translation: "Ещё экзамены… ужасно устал." },
          { hanzi: "人太多，挤死了。", pinyin: "Rén tài duō, jǐ sǐ le.", translation: "Людей слишком много, давка страшная." },
          { hanzi: "今天零下十度，冷死了。", pinyin: "Jīntiān língxià shí dù, lěng sǐ le.", translation: "Сегодня -10, холодрыга." },
          { hanzi: "饿死了！", pinyin: "È sǐ le!", translation: "Умираю от голода!" },
        ],
      },
      {
        title: "Запрет: 别 + Глагол — «не делай»",
        explanation:
          "别 (bié) + Глагол означает запрет «не делай X». Более мягкая форма чем 不要.\n\n" +
          "Схема:  别 + Глагол + (Объект)\n\n" +
          "别客气！— Не стесняйся! / Не церемонься!\n" +
          "别去！— Не ходи!\n" +
          "别说了！— Хватит говорить!\n\n" +
          "别 чаще всего в повелительных фразах (команда, просьба). Для описания «не буду» используют 不 (不去 — не пойду).\n\n" +
          "别 — только для приказа/просьбы «не делай сейчас».",
        examples: [
          { hanzi: "别客气。", pinyin: "Bié kèqi.", translation: "Не стесняйся." },
          { hanzi: "别客气，请喝茶。", pinyin: "Bié kèqi, qǐng hē chá.", translation: "Не церемоньтесь, пейте чай." },
          { hanzi: "别吃太多。", pinyin: "Bié chī tài duō.", translation: "Не ешь слишком много." },
          { hanzi: "别说了。", pinyin: "Bié shuō le.", translation: "Хватит говорить." },
        ],
      },
      {
        title: "一个人 — «один, в одиночестве»",
        explanation:
          "一个人 (yí ge rén) буквально «один человек», но в предложениях означает «сам, в одиночестве».\n\n" +
          "Схема:  一个人 + Глагол\n\n" +
          "一个人吃 — есть одному\n" +
          "一个人睡 — спать одному\n" +
          "一个人玩儿 — играть в одиночку\n\n" +
          "Часто повторяется для эмоционального эффекта:\n" +
          "一个人吃，一个人睡，一个人玩儿 — всё в одиночку.\n\n" +
          "Переводится как «сам/сама, одна/один». В разговоре о тоске или самостоятельности.",
        examples: [
          { hanzi: "一个人吃，一个人睡，一个人玩儿，挺无聊的。", pinyin: "Yí ge rén chī, yí ge rén shuì, yí ge rén wánr, tǐng wúliáo de.", translation: "Ешь один, спишь один, играешь один — скукотища." },
          { hanzi: "我一个人住。", pinyin: "Wǒ yí ge rén zhù.", translation: "Я живу один." },
          { hanzi: "她一个人去北京了。", pinyin: "Tā yí ge rén qù Běijīng le.", translation: "Она одна поехала в Пекин." },
        ],
      },
    ],

    dialogues: [
      {
        title: "В больнице (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，怎么样？现在好一点儿了吗？", pinyin: "Gǔlì, zěnmeyàng? Xiànzài hǎo yìdiǎnr le ma?", translation: "Гульнара, как ты? Уже получше?" },
          { speaker: "B", hanzi: "好一点儿了。谢谢你来看我。", pinyin: "Hǎo yìdiǎnr le. Xièxie nǐ lái kàn wǒ.", translation: "Получше. Спасибо, что зашёл." },
          { speaker: "A", hanzi: "别客气。不上课，也没有作业，挺舒服的吧？", pinyin: "Bié kèqi. Bú shàng kè, yě méiyǒu zuòyè, tǐng shūfu de ba?", translation: "Не стесняйся. Ни занятий, ни заданий — наверное кайф?" },
          { speaker: "B", hanzi: "不舒服。一个人吃，一个人睡，一个人玩儿，挺无聊的。", pinyin: "Bù shūfu. Yí ge rén chī, yí ge rén shuì, yí ge rén wánr, tǐng wúliáo de.", translation: "Вообще не кайф. Одна ешь, одна спишь, одна развлекаешься — скука смертная." },
          { speaker: "A", hanzi: "你在医院都干什么呢？", pinyin: "Nǐ zài yīyuàn dōu gàn shénme ne?", translation: "А что ты в больнице делаешь?" },
          { speaker: "B", hanzi: "看看书，听听音乐，睡睡觉，做做梦……", pinyin: "Kànkan shū, tīngting yīnyuè, shuìshui jiào, zuòzuo mèng...", translation: "Читаю, слушаю музыку, сплю, снятся сны…" },
          { speaker: "A", hanzi: "你太幸福了！我每天在学校背生词啦，听写啦，做作业啦，考试啦……累死了。", pinyin: "Nǐ tài xìngfú le! Wǒ měi tiān zài xuéxiào bèi shēngcí la, tīngxiě la, zuò zuòyè la, kǎoshì la... lèi sǐ le.", translation: "Как тебе повезло! У меня каждый день — новые слова, диктанты, уроки, экзамены… умираю от усталости." },
          { speaker: "B", hanzi: "那咱们换换，怎么样？你来医院住，我去上课。", pinyin: "Nà zánmen huànhuan, zěnmeyàng? Nǐ lái yīyuàn zhù, wǒ qù shàng kè.", translation: "Давай поменяемся? Ты ложись в больницу, я пойду на пары." },
          { speaker: "A", hanzi: "好啊，不过你得问问医生行不行。如果医生同意的话，咱们就换。对了，你中午想吃什么？米饭，炒菜，面条儿，还是饺子？", pinyin: "Hǎo a, búguò nǐ děi wènwen yīshēng xíng bu xíng. Rúguǒ yīshēng tóngyì dehuà, zánmen jiù huàn. Duì le, nǐ zhōngwǔ xiǎng chī shénme? Mǐfàn, chǎo cài, miàntiáor, háishi jiǎozi?", translation: "Хорошо, но сначала спроси у врача. Если согласится — поменяемся. Кстати, что хочешь на обед? Рис, овощи с мясом, лапшу или пельмени?" },
          { speaker: "B", hanzi: "麦当劳！我想吃麦当劳。", pinyin: "Màidāngláo! Wǒ xiǎng chī Màidāngláo.", translation: "Макдоналдс! Хочу Макдоналдс." },
          { speaker: "A", hanzi: "你不是病人吗？身体不好，还得吃药……吃面条儿吧！", pinyin: "Nǐ bú shì bìngrén ma? Shēntǐ bù hǎo, hái děi chī yào... chī miàntiáor ba!", translation: "Ты же больная? Здоровье плохое, ещё лекарства пить — ешь лапшу!" },
        ],
      },
    ],

    tips: [
      "好一点儿了 — «стало немного лучше». Частица 了 показывает изменение. Стандартная фраза вежливости к выздоравливающему.",
      "别客气 — универсальный ответ вежливости: в гостях, когда благодарят, когда просят. Означает «расслабься, без формальностей».",
      "看病人 и 看医生: 看病人 — «навестить больного», 看医生 / 看病 — «пойти к врачу». Глагол 看 тут = «посещать, смотреть».",
      "Частица 啦 в перечислении 背生词啦，听写啦，做作业啦 — как в Главе 18. Придаёт эмоциональный оттенок «и то, и это, и ещё…».",
      "对了 (duì le) — «кстати, ах да!» Переключение темы, вспомнил что-то. Очень частая разговорная фраза.",
    ],
  },

  21: {
    introduction:
      "В этой главе вы научитесь использовать 又 (снова, повторение), частицу 了 (2) с числами (V+了+кол-во+O) и 好像 («кажется»). Тема — китайская культура гостеприимства и алкоголь.\n\n" +
      "Ситуация: 古丽 застаёт 阿曼 больного с похмелья. Вчера китайские друзья накачали его байцзю — он выпил полцзиня (250г!) крепкого алкоголя.",

    vocabulary: [
      { hanzi: "生气", pinyin: "shēng qì", translation: "сердиться, злиться" },
      { hanzi: "好像", pinyin: "hǎoxiàng", translation: "кажется, похоже" },
      { hanzi: "脸色", pinyin: "liǎnsè", translation: "цвет лица, вид" },
      { hanzi: "熬夜", pinyin: "áo yè", translation: "не спать всю ночь" },
      { hanzi: "斤", pinyin: "jīn", translation: "цзинь (500г)" },
      { hanzi: "白酒", pinyin: "báijiǔ", translation: "байцзю (крепкий алкоголь)" },
      { hanzi: "头", pinyin: "tóu", translation: "голова" },
      { hanzi: "疼", pinyin: "téng", translation: "болеть" },
      { hanzi: "疯", pinyin: "fēng", translation: "сойти с ума" },
      { hanzi: "醉", pinyin: "zuì", translation: "напиться" },
      { hanzi: "吐", pinyin: "tù", translation: "тошнить, рвать" },
      { hanzi: "饭", pinyin: "fàn", translation: "еда, рис" },
      { hanzi: "热情", pinyin: "rèqíng", translation: "радушный, гостеприимный" },
      { hanzi: "不停", pinyin: "bù tíng", translation: "без остановки" },
      { hanzi: "地", pinyin: "de", translation: "частица обстоятельства (образа действия)" },
      { hanzi: "倒", pinyin: "dào", translation: "наливать" },
      { hanzi: "酒", pinyin: "jiǔ", translation: "алкоголь, вино" },
      { hanzi: "有的", pinyin: "yǒude", translation: "некоторые" },
      { hanzi: "请客", pinyin: "qǐng kè", translation: "угощать, быть хозяином" },
      { hanzi: "劝酒", pinyin: "quàn jiǔ", translation: "уговаривать выпить" },
      { hanzi: "渴", pinyin: "kě", translation: "хотеть пить" },
      { hanzi: "帮", pinyin: "bāng", translation: "помочь" },
      { hanzi: "杯", pinyin: "bēi", translation: "стакан, чашка" },
      { hanzi: "困", pinyin: "kùn", translation: "сонный" },
      { hanzi: "继续", pinyin: "jìxù", translation: "продолжать" },
    ],

    grammar: [
      {
        title: "又 — «снова, опять» (для прошлого/повторения)",
        explanation:
          "又 (yòu) показывает повторение, обычно для действий которые УЖЕ произошли или происходят регулярно.\n\n" +
          "Схема:  Подл. + 又 + Глагол (+ 了)\n\n" +
          "昨天晚上又熬夜了吗？— Вчера опять не спал всю ночь?\n" +
          "他昨天又去图书馆了。— Он вчера снова пошёл в библиотеку.\n\n" +
          "Разница с 再 (тоже «снова»):\n" +
          "• 又 — о прошлом/привычном («опять же»)\n" +
          "• 再 — о будущем («сделаю снова»)",
        examples: [
          { hanzi: "昨天晚上又熬夜了吗？", pinyin: "Zuótiān wǎnshang yòu áo yè le ma?", translation: "Вчера опять не спал?" },
          { hanzi: "他今天早上又睡懒觉了。", pinyin: "Tā jīntiān zǎoshang yòu shuì lǎnjiào le.", translation: "Он сегодня снова заспался." },
          { hanzi: "他昨天又去图书馆了。", pinyin: "Tā zuótiān yòu qù túshūguǎn le.", translation: "Он вчера снова ходил в библиотеку." },
        ],
      },
      {
        title: "了 (2) — V + 了 + количество + Объект (завершённость в середине)",
        explanation:
          "Вторая форма 了 — ставится СРАЗУ после глагола (не в конец!), когда речь о ЗАВЕРШЁННОМ действии с КОНКРЕТНЫМ количеством.\n\n" +
          "Схема:  V + 了 + [число+сч.слово] + Объект\n\n" +
          "我喝了半斤白酒。— Я выпил полцзиня байцзю.\n" +
          "妹妹买了一件衣服。— Сестра купила одну вещь.\n" +
          "他们吃了十个饺子。— Они съели 10 пельменей.\n\n" +
          "Отличается от 了 в конце (Глава 19):\n" +
          "• 我喝白酒了。— Я выпил байцзю. (факт состоялся)\n" +
          "• 我喝了半斤白酒。— Я выпил полцзиня байцзю. (с указанием объёма)\n\n" +
          "Это «完成了» — законченное действие с конкретным объёмом/числом.",
        examples: [
          { hanzi: "我喝了半斤白酒。", pinyin: "Wǒ hē le bàn jīn báijiǔ.", translation: "Я выпил полцзиня байцзю." },
          { hanzi: "妹妹买了一件衣服。", pinyin: "Mèimei mǎi le yí jiàn yīfu.", translation: "Сестра купила одну вещь." },
          { hanzi: "他们吃了十个饺子。", pinyin: "Tāmen chī le shí ge jiǎozi.", translation: "Они съели 10 пельменей." },
        ],
      },
      {
        title: "好像 — «кажется, похоже»",
        explanation:
          "好像 (hǎoxiàng) — «кажется», неуверенное суждение. Ставится перед глаголом или прилагательным.\n\n" +
          "Схема:  Подл. + 好像 + Сказуемое\n\n" +
          "你好像还很困。— Ты, кажется, ещё очень сонный.\n" +
          "老师好像没生气。— Учитель вроде не сердится.\n" +
          "好像没问题。— Кажется, проблем нет.\n\n" +
          "Используется когда:\n" +
          "• Не уверен, но есть предположение\n" +
          "• Сравниваешь («как будто»)\n" +
          "• Смягчаешь утверждение",
        examples: [
          { hanzi: "你好像还很困。", pinyin: "Nǐ hǎoxiàng hái hěn kùn.", translation: "Ты как будто ещё сонный." },
          { hanzi: "老师好像没生气。", pinyin: "Lǎoshī hǎoxiàng méi shēng qì.", translation: "Учитель вроде не сердится." },
          { hanzi: "你的脸色不太好，昨天又熬夜了吗？", pinyin: "Nǐ de liǎnsè bú tài hǎo, zuótiān yòu áo yè le ma?", translation: "Ты неважно выглядишь, опять не спал ночью?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Почему не на парах? (古丽 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，你怎么还在睡觉？老师问，你怎么没去上课？", pinyin: "Āmàn, nǐ zěnme hái zài shuì jiào? Lǎoshī wèn, nǐ zěnme méi qù shàng kè?", translation: "Аман, ты ещё спишь? Учитель спрашивал, почему тебя не было на паре." },
          { speaker: "B", hanzi: "真不好意思。老师生气了吗？", pinyin: "Zhēn bù hǎoyìsi. Lǎoshī shēng qì le ma?", translation: "Стыдно. Учитель рассердился?" },
          { speaker: "A", hanzi: "好像没生气。你的脸色不太好，昨天又熬夜了吗？", pinyin: "Hǎoxiàng méi shēng qì. Nǐ de liǎnsè bú tài hǎo, zuótiān yòu áo yè le ma?", translation: "Вроде нет. Ты неважно выглядишь, опять всю ночь не спал?" },
          { speaker: "B", hanzi: "没有。不过，我喝了半斤白酒，头很疼。", pinyin: "Méiyǒu. Búguò, wǒ hē le bàn jīn báijiǔ, tóu hěn téng.", translation: "Нет. Но я выпил полцзиня байцзю, голова болит." },
          { speaker: "A", hanzi: "半斤？你疯了？", pinyin: "Bàn jīn? Nǐ fēng le?", translation: "Полцзиня? Ты с ума сошёл?" },
          { speaker: "B", hanzi: "没醉，不过，醉了，也吐了。", pinyin: "Méi zuì, búguò, zuì le, yě tù le.", translation: "Не опьянел. Нет, опьянел, и тошнило." },
          { speaker: "A", hanzi: "你怎么喝那么多酒呢？", pinyin: "Nǐ zěnme hē nàme duō jiǔ ne?", translation: "Зачем ты столько выпил?" },
          { speaker: "B", hanzi: "昨天我去一个中国朋友家吃饭，他们太热情了，一直不停地给我倒酒。", pinyin: "Zuótiān wǒ qù yí ge Zhōngguó péngyou jiā chī fàn, tāmen tài rèqíng le, yìzhí bù tíng de gěi wǒ dào jiǔ.", translation: "Вчера ходил в гости к китайскому другу, они были так радушны — постоянно подливали." },
          { speaker: "A", hanzi: "有的中国人请客的时候喜欢劝酒，你不知道吗？", pinyin: "Yǒude Zhōngguó rén qǐng kè de shíhou xǐhuan quàn jiǔ, nǐ bù zhīdào ma?", translation: "Некоторые китайцы, когда угощают, любят уговаривать пить. Ты не знал?" },
          { speaker: "B", hanzi: "现在我知道了。哎呀，我很渴，你帮我倒杯水，好吗？", pinyin: "Xiànzài wǒ zhīdào le. Āiyā, wǒ hěn kě, nǐ bāng wǒ dào bēi shuǐ, hǎo ma?", translation: "Теперь знаю. Ой, очень хочется пить — налей мне воды?" },
          { speaker: "A", hanzi: "好的。你好像还很困，继续睡吧！", pinyin: "Hǎo de. Nǐ hǎoxiàng hái hěn kùn, jìxù shuì ba!", translation: "Ладно. Ты вроде ещё сонный — поспи дальше." },
        ],
      },
    ],

    tips: [
      "斤 (jīn) — китайская мера веса = 500 г. 半斤 = 250 г. Полцзиня крепкого байцзю (40-60°) — это очень много.",
      "白酒 (báijiǔ) — крепкий китайский зерновой алкоголь 40-60°. Культурный феномен. На деловых банкетах и в гостях отказываться считается невежливым.",
      "劝酒 (quàn jiǔ) — «уговаривать выпить». Важная часть застольной культуры. Хозяин показывает гостеприимство через тосты и настойчивые предложения ещё выпить.",
      "怎么 (zěnme) в вопросе «как?» или «почему?». Контекст определяет: 你怎么还在睡觉？= «Почему ты ещё спишь?». 这个字怎么写？ = «Как пишется этот иероглиф?»",
      "Частица 地 (de) — после наречия/прилагательного перед глаголом: 不停地 (безостановочно), 高兴地 (радостно). Не путать с 的 (притяжательная) и 得 (степени).",
    ],
  },

  22: {
    introduction:
      "В этой главе вы научитесь говорить о болезнях, использовать глагол 能 («мочь, быть способным»), 最好 (лучше всего бы) и записывать даты по-китайски.\n\n" +
      "Ситуация: 阿曼 простудился после футбольного матча под дождём. 古丽 передаёт учителю записку с просьбой освободить от занятий.",

    vocabulary: [
      { hanzi: "能", pinyin: "néng", translation: "мочь, быть в состоянии" },
      { hanzi: "病", pinyin: "bìng", translation: "болеть; болезнь" },
      { hanzi: "感冒", pinyin: "gǎnmào", translation: "простуда, простудиться" },
      { hanzi: "头疼", pinyin: "tóuténg", translation: "головная боль" },
      { hanzi: "发烧", pinyin: "fāshāo", translation: "температурить" },
      { hanzi: "咳嗽", pinyin: "késou", translation: "кашлять" },
      { hanzi: "前天", pinyin: "qiántiān", translation: "позавчера" },
      { hanzi: "场", pinyin: "chǎng", translation: "счётное слово для матчей/спектаклей" },
      { hanzi: "足球", pinyin: "zúqiú", translation: "футбол" },
      { hanzi: "比赛", pinyin: "bǐsài", translation: "матч, соревнование" },
      { hanzi: "回来", pinyin: "huílai", translation: "возвращаться" },
      { hanzi: "带", pinyin: "dài", translation: "брать с собой" },
      { hanzi: "伞", pinyin: "sǎn", translation: "зонт" },
      { hanzi: "看病", pinyin: "kàn bìng", translation: "идти к врачу" },
      { hanzi: "开", pinyin: "kāi", translation: "выписать (рецепт)" },
      { hanzi: "打针", pinyin: "dǎ zhēn", translation: "поставить укол" },
      { hanzi: "最好", pinyin: "zuìhǎo", translation: "лучше всего" },
      { hanzi: "休息", pinyin: "xiūxi", translation: "отдыхать" },
      { hanzi: "请假条", pinyin: "qǐngjiàtiáo", translation: "записка об отпуске" },
      { hanzi: "请假", pinyin: "qǐng jià", translation: "просить отпуск" },
      { hanzi: "希望", pinyin: "xīwàng", translation: "надеяться, желать" },
      { hanzi: "批准", pinyin: "pīzhǔn", translation: "одобрить (просьбу)" },
      { hanzi: "月", pinyin: "yuè", translation: "месяц" },
      { hanzi: "日", pinyin: "rì", translation: "число, день" },
    ],

    grammar: [
      {
        title: "Глагол 能 — «мочь, быть в состоянии»",
        explanation:
          "能 (néng) указывает на ВОЗМОЖНОСТЬ/СПОСОБНОСТЬ в данный момент (физически или по обстоятельствам).\n\n" +
          "Схема:  Подл. + 能 + Глагол + (Объект)\n\n" +
          "阿曼今天又不能来上课了。\n" +
          "«Аман сегодня опять не может прийти на занятия.»\n\n" +
          "Разница 能 vs 会:\n" +
          "• 会 (huì) — уметь по обучению (навык): 我会开车 — умею водить\n" +
          "• 能 (néng) — могу физически/по обстоятельствам: 我今天能来 — сегодня могу прийти\n\n" +
          "Отрицание: 不能 — не могу (нельзя, запрещено, не позволяют обстоятельства).",
        examples: [
          { hanzi: "阿曼今天又不能来上课了。", pinyin: "Āmàn jīntiān yòu bù néng lái shàng kè le.", translation: "Аман сегодня опять не может на занятия." },
          { hanzi: "我学汉语了，所以我能唱中文歌。", pinyin: "Wǒ xué Hànyǔ le, suǒyǐ wǒ néng chàng Zhōngwén gē.", translation: "Я учил китайский, поэтому могу петь китайские песни." },
          { hanzi: "你有时间吗？能和我一起去吗？", pinyin: "Nǐ yǒu shíjiān ma? Néng hé wǒ yìqǐ qù ma?", translation: "У тебя есть время? Можешь со мной пойти?" },
          { hanzi: "他感冒了，不能来上课了。", pinyin: "Tā gǎnmào le, bù néng lái shàng kè le.", translation: "Он простыл, не может прийти." },
        ],
      },
      {
        title: "最好 + V — «лучше бы сделать, было бы лучше»",
        explanation:
          "最好 (zuìhǎo) перед глаголом выражает совет или рекомендацию «лучше всего бы…».\n\n" +
          "Схема:  (Подл. +) 最好 + Глагол\n\n" +
          "医生说最好休息一天。\n" +
          "«Врач сказал — лучше бы отдохнуть денёк.»\n\n" +
          "Отличие от 应该 (yīnggāi — должен):\n" +
          "• 应该 — более категорично, «должен»\n" +
          "• 最好 — мягче, «было бы лучше»",
        examples: [
          { hanzi: "医生还说最好休息一天。", pinyin: "Yīshēng hái shuō zuìhǎo xiūxi yì tiān.", translation: "Врач ещё сказал, что лучше отдохнуть денёк." },
          { hanzi: "你感冒了，最好休息三天。", pinyin: "Nǐ gǎnmào le, zuìhǎo xiūxi sān tiān.", translation: "Ты простыл, лучше отдохни 3 дня." },
          { hanzi: "明天有考试，你最好准备准备。", pinyin: "Míngtiān yǒu kǎoshì, nǐ zuìhǎo zhǔnbèi zhǔnbèi.", translation: "Завтра экзамен, лучше подготовься." },
          { hanzi: "八点上课，你最好七点就起床。", pinyin: "Bā diǎn shàng kè, nǐ zuìhǎo qī diǎn jiù qǐ chuáng.", translation: "В 8 занятия — лучше в 7 вставать." },
        ],
      },
      {
        title: "Даты: год + месяц + число",
        explanation:
          "Порядок даты в китайском ОТ БОЛЬШЕГО К МЕНЬШЕМУ: год → месяц → число.\n\n" +
          "Схема:  XXXX 年 X 月 X 日\n\n" +
          "2012年11月15日 — 15 ноября 2012 года\n" +
          "1999年4月3日 — 3 апреля 1999 года\n\n" +
          "В разговорной речи 日 (rì) часто заменяется на 号 (hào):\n" +
          "4月3号 — 3 апреля (разговорно)\n" +
          "12月31号 — 31 декабря\n\n" +
          "Год читается по цифрам: 2012 = 二〇一二 (èr líng yī èr).",
        examples: [
          { hanzi: "2012年11月15日", pinyin: "Èr líng yī èr nián shíyī yuè shíwǔ rì", translation: "15 ноября 2012" },
          { hanzi: "1999年4月3日", pinyin: "Yī jiǔ jiǔ jiǔ nián sì yuè sān rì", translation: "3 апреля 1999" },
          { hanzi: "今天是12月31号。", pinyin: "Jīntiān shì shí'èr yuè sānshíyī hào.", translation: "Сегодня 31 декабря." },
          { hanzi: "我的生日是6月28号。", pinyin: "Wǒ de shēngrì shì liù yuè èrshíbā hào.", translation: "Мой день рождения 28 июня." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Записка от Давэя (古丽 и 王老师)",
        lines: [
          { speaker: "A", hanzi: "老师，阿曼今天又不能来上课了。", pinyin: "Lǎoshī, Āmàn jīntiān yòu bù néng lái shàng kè le.", translation: "Учитель, Аман сегодня опять не сможет прийти." },
          { speaker: "B", hanzi: "是吗？他病了吗？", pinyin: "Shì ma? Tā bìng le ma?", translation: "Правда? Он заболел?" },
          { speaker: "A", hanzi: "对，他感冒了。头疼，发烧，还有点儿咳嗽。", pinyin: "Duì, tā gǎnmào le. Tóuténg, fāshāo, hái yǒudiǎnr késou.", translation: "Да, простудился. Голова болит, температура, немного кашляет." },
          { speaker: "B", hanzi: "怎么感冒了？", pinyin: "Zěnme gǎnmào le?", translation: "Как это?" },
          { speaker: "A", hanzi: "前天他去看了一场足球比赛，回来的时候下雨了，他没带伞，所以感冒了。", pinyin: "Qiántiān tā qù kàn le yì chǎng zúqiú bǐsài, huílai de shíhou xià yǔ le, tā méi dài sǎn, suǒyǐ gǎnmào le.", translation: "Позавчера был на футбольном матче, на обратном пути пошёл дождь, зонтика не было — простудился." },
          { speaker: "B", hanzi: "去医院看病了吗？", pinyin: "Qù yīyuàn kàn bìng le ma?", translation: "К врачу ходил?" },
          { speaker: "A", hanzi: "去了。医生说是感冒，给他开了一点儿药，又打了一针。医生还说最好休息一天。这是他的请假条。", pinyin: "Qù le. Yīshēng shuō shì gǎnmào, gěi tā kāi le yìdiǎnr yào, yòu dǎ le yì zhēn. Yīshēng hái shuō zuìhǎo xiūxi yì tiān. Zhè shì tā de qǐngjiàtiáo.", translation: "Да. Доктор сказал — простуда, выписал лекарства и поставил укол. Ещё советовал отдохнуть день. Вот его записка." },
          { speaker: "B", hanzi: "好的，我知道了。谢谢！", pinyin: "Hǎo de, wǒ zhīdào le. Xièxie!", translation: "Хорошо, поняла. Спасибо!" },
        ],
      },
    ],

    tips: [
      "Записка 请假条 — стандартный формат в китайской школе/университете. Структура: обращение (老师) → объяснение → просьба → подпись → дата.",
      "发烧 / 咳嗽 / 头疼 — стандартный набор симптомов простуды. Запомни как один блок — врач первым делом спросит именно об этом.",
      "看 в разных контекстах: 看书 (читать), 看电影 (смотреть), 看病 (идти к врачу), 看朋友 (навестить друга). Глагол очень разнообразный.",
      "打针 (дать укол) — в Китае врачи часто сразу ставят укол при простуде. Культурная разница с западной медициной.",
      "月 (yuè) — месяц (порядковый): 一月 (январь), 二月 (февраль)... 十二月 (декабрь). Без 个: 三月 (не 三个月 = это уже «3 месяца»).",
    ],
  },

  23: {
    introduction:
      "В этой главе вы научитесь спрашивать про длительность (V + 了 + время), использовать 大概 (примерно), отличать действия внезапные (了) от длящихся.\n\n" +
      "Ситуация: 古丽 опоздала на встречу с 王红 из-за пробки и лопнувшей шины. Позже они обсуждают сколько лет учат языки.",

    vocabulary: [
      { hanzi: "迟到", pinyin: "chídào", translation: "опоздать" },
      { hanzi: "堵车", pinyin: "dǔ chē", translation: "пробка" },
      { hanzi: "堵", pinyin: "dǔ", translation: "затыкать, блокировать" },
      { hanzi: "坏", pinyin: "huài", translation: "сломаться; плохой" },
      { hanzi: "轮胎", pinyin: "lúntāi", translation: "шина, колесо" },
      { hanzi: "破", pinyin: "pò", translation: "лопнуть, порвать" },
      { hanzi: "倒霉", pinyin: "dǎoméi", translation: "не повезло" },
      { hanzi: "小时", pinyin: "xiǎoshí", translation: "час (продолжительность)" },
      { hanzi: "平时", pinyin: "píngshí", translation: "обычно, в обычное время" },
      { hanzi: "钟头", pinyin: "zhōngtóu", translation: "час" },
      { hanzi: "着急", pinyin: "zháojí", translation: "волноваться" },
      { hanzi: "用", pinyin: "yòng", translation: "использовать" },
      { hanzi: "写", pinyin: "xiě", translation: "писать" },
      { hanzi: "作文", pinyin: "zuòwén", translation: "сочинение" },
      { hanzi: "口语", pinyin: "kǒuyǔ", translation: "разговорный язык" },
      { hanzi: "看", pinyin: "kàn", translation: "с точки зрения, считать" },
      { hanzi: "学", pinyin: "xué", translation: "учиться" },
      { hanzi: "初中", pinyin: "chūzhōng", translation: "средняя школа" },
      { hanzi: "那么", pinyin: "nàme", translation: "так, настолько" },
      { hanzi: "语法", pinyin: "yǔfǎ", translation: "грамматика" },
      { hanzi: "简单", pinyin: "jiǎndān", translation: "простой" },
      { hanzi: "翻译", pinyin: "fānyì", translation: "перевод, переводить" },
      { hanzi: "下", pinyin: "xià", translation: "следующий" },
      { hanzi: "学期", pinyin: "xuéqī", translation: "семестр" },
    ],

    grammar: [
      {
        title: "V + 了 + длительность + (的) + Объект — «делал X уже Y времени»",
        explanation:
          "Как спросить/сказать «как долго делал(а) что-то»? Схема сложная: глагол повторяется.\n\n" +
          "Схема:  V + 了 + Время  (если нет объекта)\n" +
          "Схема с объектом:  V + 了 + Время + 的 + Объект  ИЛИ  V + Объект + V + 了 + Время\n\n" +
          "我学了十年英语。— Я учил английский 10 лет.\n" +
          "换轮胎换了多长时间？— Менял колесо сколько времени?\n" +
          "我学汉语学了半年了。— Я учу китайский уже полгода.\n\n" +
          "Вопрос «сколько времени делал?»:  V + 了 + 多长时间？",
        examples: [
          { hanzi: "换轮胎换了多长时间？", pinyin: "Huàn lúntāi huàn le duō cháng shíjiān?", translation: "Сколько времени менял колесо?" },
          { hanzi: "我学了十年英语。", pinyin: "Wǒ xué le shí nián Yīngyǔ.", translation: "Я учил английский 10 лет." },
          { hanzi: "弟弟已经看了四十分钟电视。", pinyin: "Dìdi yǐjīng kàn le sìshí fēnzhōng diànshì.", translation: "Младший брат уже 40 минут смотрит телевизор." },
          { hanzi: "你学了多长时间汉语？", pinyin: "Nǐ xué le duō cháng shíjiān Hànyǔ?", translation: "Как долго ты учишь китайский?" },
        ],
      },
      {
        title: "Обзор 就 — разные значения",
        explanation:
          "就 (jiù) — очень многозначное слово. Систематизируем все значения:\n\n" +
          "1) «Уже» (раньше ожидаемого):\n" +
          "   古丽早上六点就起床了。\n\n" +
          "2) «Сразу же, быстро»:\n" +
          "   学校离家很近，一天就会了。\n\n" +
          "3) Для усиления:\n" +
          "   这儿就是图书馆。\n\n" +
          "4) Последовательность «и тогда»:\n" +
          "   我去找他，他就在家。\n\n" +
          "5) В условии: 如果…, 就…\n\n" +
          "Во всех случаях 就 означает «это и есть», «близость», «малое расстояние/время».",
        examples: [
          { hanzi: "平时一个钟头就能到。", pinyin: "Píngshí yí ge zhōngtóu jiù néng dào.", translation: "Обычно за час добираюсь." },
          { hanzi: "质量不错，也不贵，就买它了。", pinyin: "Zhìliàng búcuò, yě bú guì, jiù mǎi tā le.", translation: "Качество хорошее, недорого — беру это." },
          { hanzi: "那座白楼就是图书馆。", pinyin: "Nà zuò bái lóu jiùshì túshūguǎn.", translation: "Вон то белое здание — это библиотека." },
          { hanzi: "工作以后这个毛病就改了。", pinyin: "Gōngzuò yǐhòu zhège máobìng jiù gǎi le.", translation: "После работы я эту привычку и изменила." },
        ],
      },
      {
        title: "大概 — «примерно, около, возможно»",
        explanation:
          "大概 (dàgài) ставится перед числом или целым предложением и означает «примерно, около того».\n\n" +
          "Схема:  大概 + число/время/предложение\n\n" +
          "大概二十分钟吧。— Минут 20 примерно.\n" +
          "大概二十五岁吧。— Лет 25 наверное.\n" +
          "他大概去图书馆了。— Он, наверное, ушёл в библиотеку.\n\n" +
          "Часто в конце стоит 吧 — «примерно… наверное».",
        examples: [
          { hanzi: "大概二十分钟吧。", pinyin: "Dàgài èrshí fēnzhōng ba.", translation: "Минут 20 примерно." },
          { hanzi: "大概要两百块。", pinyin: "Dàgài yào liǎng bǎi kuài.", translation: "Стоит примерно 200 юаней." },
          { hanzi: "大概八点到。", pinyin: "Dàgài bā diǎn dào.", translation: "Прибуду около 8." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Опоздание (古丽 и 王红)",
        lines: [
          { speaker: "A", hanzi: "对不起，我迟到了。", pinyin: "Duìbuqǐ, wǒ chídào le.", translation: "Извини, я опоздала." },
          { speaker: "B", hanzi: "没关系。路上堵车了吗？", pinyin: "Méi guānxi. Lùshàng dǔ chē le ma?", translation: "Ничего. Пробка?" },
          { speaker: "A", hanzi: "没有。我的自行车坏了，轮胎破了。", pinyin: "Méiyǒu. Wǒ de zìxíngchē huài le, lúntāi pò le.", translation: "Нет. Велосипед сломался, шина лопнула." },
          { speaker: "B", hanzi: "是吗？真倒霉。换轮胎换了多长时间？", pinyin: "Shì ma? Zhēn dǎoméi. Huàn lúntāi huàn le duō cháng shíjiān?", translation: "Правда? Вот невезуха. Долго меняла?" },
          { speaker: "A", hanzi: "大概换了半个小时。平时一个钟头就能到，可是今天我花了一个半小时。你等了多长时间？", pinyin: "Dàgài huàn le bàn ge xiǎoshí. Píngshí yí ge zhōngtóu jiù néng dào, kěshì jīntiān wǒ huā le yí ge bàn xiǎoshí. Nǐ děng le duō cháng shíjiān?", translation: "Полчаса примерно. Обычно за час добираюсь, а сегодня полтора часа потратила. А ты долго ждала?" },
          { speaker: "B", hanzi: "大概二十分钟吧。", pinyin: "Dàgài èrshí fēnzhōng ba.", translation: "Минут 20." },
          { speaker: "A", hanzi: "着急了吧？真对不起。", pinyin: "Zháojí le ba? Zhēn duìbuqǐ.", translation: "Волновалась, наверное? Прости." },
          { speaker: "B", hanzi: "没事儿。", pinyin: "Méi shìr.", translation: "Ничего." },
        ],
      },
      {
        title: "Сколько учишь языки? (古丽 и 王红)",
        lines: [
          { speaker: "A", hanzi: "你用英语写的作文真不错。", pinyin: "Nǐ yòng Yīngyǔ xiě de zuòwén zhēn búcuò.", translation: "Твоё английское сочинение очень неплохое." },
          { speaker: "B", hanzi: "谢谢！不过，我的口语还不行。", pinyin: "Xièxie! Búguò, wǒ de kǒuyǔ hái bù xíng.", translation: "Спасибо! Но разговорная ещё не очень." },
          { speaker: "A", hanzi: "我看挺好的。你学了多长时间英语？", pinyin: "Wǒ kàn tǐng hǎo de. Nǐ xué le duō cháng shíjiān Yīngyǔ?", translation: "На мой взгляд очень хорошо. Как долго учишь?" },
          { speaker: "B", hanzi: "我从初中开始学习，已经学了十年了。", pinyin: "Wǒ cóng chūzhōng kāishǐ xuéxí, yǐjīng xué le shí nián le.", translation: "Со средней школы — уже 10 лет." },
          { speaker: "A", hanzi: "十年？那么长时间？", pinyin: "Shí nián? Nàme cháng shíjiān?", translation: "10 лет? Так долго?" },
          { speaker: "B", hanzi: "是啊！我的语法还可以，简单的翻译也没问题，可是不太会说。你学了多长时间汉语？", pinyin: "Shì a! Wǒ de yǔfǎ hái kěyǐ, jiǎndān de fānyì yě méi wèntí, kěshì bú tài huì shuō. Nǐ xué le duō cháng shíjiān Hànyǔ?", translation: "Да! Грамматика ничего, простые переводы тоже, но говорю плохо. А ты китайский сколько?" },
          { speaker: "A", hanzi: "我学了半年了。", pinyin: "Wǒ xué le bàn nián le.", translation: "Полгода." },
          { speaker: "B", hanzi: "下学期你还在北京学习吗？", pinyin: "Xià xuéqī nǐ hái zài Běijīng xuéxí ma?", translation: "В следующем семестре тоже в Пекине учишься?" },
          { speaker: "A", hanzi: "当然啦，我打算在中国学习两年呢。", pinyin: "Dāngrán la, wǒ dǎsuàn zài Zhōngguó xuéxí liǎng nián ne.", translation: "Конечно, планирую 2 года проучиться в Китае." },
        ],
      },
    ],

    tips: [
      "Разница «小时» и «钟头»: оба «час». 小时 более формально, 钟头 разговорно. Оба требуют 个: 一个小时 / 一个钟头.",
      "真倒霉 — «вот невезуха», популярная разговорная жалоба. Буквально «правда перевернуло».",
      "没事儿 (méi shìr) — «ничего, нестрашно». Отвечают когда извиняются перед тобой. Синонимы: 没关系, 没问题.",
      "初中 (средняя школа) vs 高中 (старшая школа) vs 小学 (начальная школа). Китайская образовательная лестница: 小学 (6 лет) → 初中 (3) → 高中 (3) → 大学 (4).",
      "V了多长时间 с ответом: «учу 10 лет» = 学了十年 (завершилось? или ещё учит?). Если ДО СИХ ПОР учит — добавь второе 了: 学了十年了. Это «уже 10 лет и продолжаю».",
    ],
  },

  24: {
    introduction:
      "В этой главе вы научитесь использовать повелительные предложения («давай!»), риторический вопрос 我+V+什么 («зачем мне X?»), частицу 了 (4) для последовательности действий и порядок Время + Место перед глаголом.\n\n" +
      "Ситуации: 张伟 и 王红 созваниваются — обсуждают обед и вечеринку в честь дня рождения 小美.",

    vocabulary: [
      { hanzi: "打", pinyin: "dǎ", translation: "играть (в игру с руками)" },
      { hanzi: "球", pinyin: "qiú", translation: "мяч" },
      { hanzi: "食堂", pinyin: "shítáng", translation: "столовая" },
      { hanzi: "两", pinyin: "liǎng", translation: "лян (единица веса ~50 г)" },
      { hanzi: "聚会", pinyin: "jùhuì", translation: "вечеринка, собрание" },
      { hanzi: "祝", pinyin: "zhù", translation: "желать, поздравлять" },
      { hanzi: "快乐", pinyin: "kuàilè", translation: "радостный, счастливый" },
      { hanzi: "碗", pinyin: "wǎn", translation: "пиала, миска" },
      { hanzi: "葡萄酒", pinyin: "pútáojiǔ", translation: "вино (виноградное)" },
      { hanzi: "冰激凌", pinyin: "bīngjīlíng", translation: "мороженое" },
      { hanzi: "女生", pinyin: "nǚshēng", translation: "студентка, девушка" },
      { hanzi: "卡拉OK", pinyin: "kǎlā OK", translation: "караоке" },
      { hanzi: "晚", pinyin: "wǎn", translation: "поздно" },
      { hanzi: "放心", pinyin: "fàng xīn", translation: "не волноваться" },
      { hanzi: "美术馆", pinyin: "měishùguǎn", translation: "художественный музей" },
      { hanzi: "展览", pinyin: "zhǎnlǎn", translation: "выставка" },
      { hanzi: "没意见", pinyin: "méi yìjiàn", translation: "не возражаю" },
      { hanzi: "意见", pinyin: "yìjiàn", translation: "мнение" },
      { hanzi: "早饭", pinyin: "zǎofàn", translation: "завтрак" },
      { hanzi: "找", pinyin: "zhǎo", translation: "искать" },
      { hanzi: "门口", pinyin: "ménkǒu", translation: "у двери, у входа" },
      { hanzi: "见面", pinyin: "jiàn miàn", translation: "встречаться" },
      { hanzi: "上网", pinyin: "shàng wǎng", translation: "выходить в интернет" },
      { hanzi: "聊天儿", pinyin: "liáo tiānr", translation: "болтать" },
    ],

    grammar: [
      {
        title: "Повелительные предложения (приказ / просьба / совет)",
        explanation:
          "Повелительное предложение даёт команду, просьбу или предложение. Подлежащее обычно 你/你们/咱们/我们.\n\n" +
          "Формы:\n" +
          "(1) Утверждение + (吧):\n" +
          "   你放心吧！— Не волнуйся!\n" +
          "   我们一起去吧！— Давай пойдём вместе!\n" +
          "   你们好好儿玩儿吧！— Весело проведите время!\n\n" +
          "(2) Отрицание через 不要 или 别:\n" +
          "   早睡早起身体好，不要睡懒觉。\n" +
          "   明天早上起床，别迟到了。\n" +
          "   你们已经喝了两杯了，别喝了！\n\n" +
          "Подлежащее часто опускается («ты» подразумевается).",
        examples: [
          { hanzi: "你放心吧！", pinyin: "Nǐ fàng xīn ba!", translation: "Не волнуйся!" },
          { hanzi: "我们一起去吧！", pinyin: "Wǒmen yìqǐ qù ba!", translation: "Пойдём вместе!" },
          { hanzi: "别太晚了。", pinyin: "Bié tài wǎn le.", translation: "Не опаздывай." },
          { hanzi: "你们已经喝了两杯了，别喝了！", pinyin: "Nǐmen yǐjīng hē le liǎng bēi le, bié hē le!", translation: "Вы уже выпили по два стакана — хватит!" },
        ],
      },
      {
        title: "Риторический вопрос: 我+V+什么 = «зачем мне X?»",
        explanation:
          "Конструкция «我+глагол+什么» означает «зачем мне делать X?» (намёк что делать НЕ нужно).\n\n" +
          "Схема:  Подл. + V + 什么?\n\n" +
          "你们女生一起玩儿，我去干什么？\n" +
          "«Вы, девчонки, вместе тусите — мне-то что там делать?» (= мне там не место)\n\n" +
          "Это форма РИТОРИЧЕСКОГО вопроса — ответ предполагается «ничего».\n\n" +
          "Часто начинается с 这不是… или V不V:\n" +
          "这不是你的事，你去干什么？ — Это не твоё дело, чего ты туда лезешь?",
        examples: [
          { hanzi: "你们女生一起玩儿，我去干什么？", pinyin: "Nǐmen nǚshēng yìqǐ wánr, wǒ qù gàn shénme?", translation: "Вы, девчонки, тусите, а мне-то там что?" },
          { hanzi: "这不是你的事，你去干什么？", pinyin: "Zhè bú shì nǐ de shì, nǐ qù gàn shénme?", translation: "Это не твоё дело, что ты туда лезешь?" },
          { hanzi: "你不会说汉语，你去干什么？", pinyin: "Nǐ bú huì shuō Hànyǔ, nǐ qù gàn shénme?", translation: "Ты по-китайски не говоришь, зачем туда?" },
        ],
      },
      {
        title: "了 (4) — последовательность действий (действие1 + 了, потом действие2)",
        explanation:
          "Четвёртое значение 了 — между двумя глаголами. Первое действие ЗАКОНЧИЛОСЬ, ПОТОМ начинается второе.\n\n" +
          "Схема:  V1 + 了 + O1 + V2 + O2\n\n" +
          "你吃了早饭来找我。\n" +
          "«Поешь завтрак (потом) приходи ко мне.»\n\n" +
          "我去了咖啡店上课。— Сначала в кофейню, потом на пары.\n" +
          "我换了钱去买东西。— Сначала обменяю деньги, потом покупать.\n\n" +
          "Второе действие произойдёт ТОЛЬКО после первого. Отличается от 先…然后… (та же идея, но более формально).",
        examples: [
          { hanzi: "你吃了早饭来找我。", pinyin: "Nǐ chī le zǎofàn lái zhǎo wǒ.", translation: "Поешь и приходи." },
          { hanzi: "我去了咖啡店上课。", pinyin: "Wǒ qù le kāfēidiàn shàng kè.", translation: "Зайду в кофейню — потом на пары." },
          { hanzi: "我换了钱去买东西。", pinyin: "Wǒ huàn le qián qù mǎi dōngxi.", translation: "Обменяю деньги — потом за покупками." },
        ],
      },
      {
        title: "Порядок: Подл. + Время + Место + Глагол",
        explanation:
          "Когда в предложении есть и ВРЕМЯ, и МЕСТО — они оба ставятся ПЕРЕД глаголом в порядке: сначала время, потом место.\n\n" +
          "Схема:  Подл. + Время + 在+Место + Глагол + Объект\n\n" +
          "我们明天八点半在你们宿舍门口见面。\n" +
          "«Мы завтра в 8:30 у ваших дверей общежития встретимся.»\n\n" +
          "Логика: от большего контекста (когда) к меньшему (где) — к действию.",
        examples: [
          { hanzi: "我们明天八点半在你们宿舍门口见面。", pinyin: "Wǒmen míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn.", translation: "Встретимся завтра в 8:30 у входа в общежитие." },
          { hanzi: "今天下课以后我在图书馆学习。", pinyin: "Jīntiān xià kè yǐhòu wǒ zài túshūguǎn xuéxí.", translation: "Сегодня после пар я в библиотеке позанимаюсь." },
          { hanzi: "他每天早上在家喝咖啡。", pinyin: "Tā měi tiān zǎoshang zài jiā hē kāfēi.", translation: "Он каждое утро дома пьёт кофе." },
        ],
      },
    ],

    dialogues: [
      {
        title: "День рождения подруги (张伟 и 王红 по телефону)",
        lines: [
          { speaker: "A", hanzi: "喂，王红，是我。", pinyin: "Wèi, Wáng Hóng, shì wǒ.", translation: "Алло, Ван Хун, это я." },
          { speaker: "B", hanzi: "张伟，你吃饭了吗？", pinyin: "Zhāng Wěi, nǐ chī fàn le ma?", translation: "Чжан Вэй, ты ел?" },
          { speaker: "A", hanzi: "还没呢。刚打球回来，我想去食堂吃几两饺子，你去吗？", pinyin: "Hái méi ne. Gāng dǎ qiú huílai, wǒ xiǎng qù shítáng chī jǐ liǎng jiǎozi, nǐ qù ma?", translation: "Ещё нет. Только что с мяча вернулся, хочу в столовую за пельменями — пойдёшь?" },
          { speaker: "B", hanzi: "不去了。今天是小美二十三岁生日，我们宿舍聚会。", pinyin: "Bú qù le. Jīntiān shì Xiǎoměi èrshísān suì shēngrì, wǒmen sùshè jùhuì.", translation: "Не пойду. У Сяомэй 23-летие — у нас в общаге вечеринка." },
          { speaker: "A", hanzi: "是吗？那祝她生日快乐。", pinyin: "Shì ma? Nà zhù tā shēngrì kuàilè.", translation: "Правда? Передай поздравления." },
          { speaker: "B", hanzi: "今天我们做了很多好吃的。我已经吃了一碗面条儿，还喝了一杯葡萄酒，现在在吃冰激凌呢。你也来吧！", pinyin: "Jīntiān wǒmen zuò le hěn duō hǎochī de. Wǒ yǐjīng chī le yì wǎn miàntiáor, hái hē le yì bēi pútáojiǔ, xiànzài zài chī bīngjīlíng ne. Nǐ yě lái ba!", translation: "Мы приготовили много вкусного. Я уже съела лапши, выпила вина, сейчас ем мороженое. Приходи и ты!" },
          { speaker: "A", hanzi: "你们女生一起玩儿，我去干什么？晚上你们还有别的安排吗？", pinyin: "Nǐmen nǚshēng yìqǐ wánr, wǒ qù gàn shénme? Wǎnshang nǐmen hái yǒu bié de ānpái ma?", translation: "Вы девочки тусите — мне там делать что? Вечером куда-то идёте?" },
          { speaker: "B", hanzi: "我们打算一起去唱卡拉OK。", pinyin: "Wǒmen dǎsuàn yìqǐ qù chàng kǎlā OK.", translation: "Хотим в караоке." },
          { speaker: "A", hanzi: "好好儿玩儿，早一点儿回来，别太晚了。", pinyin: "Hǎohāor wánr, zǎo yìdiǎnr huílai, bié tài wǎn le.", translation: "Повеселитесь, но возвращайтесь пораньше, не засиживайтесь." },
          { speaker: "B", hanzi: "放心吧！对了，明天又是周末了，我们去哪儿玩儿？", pinyin: "Fàng xīn ba! Duì le, míngtiān yòu shì zhōumò le, wǒmen qù nǎr wánr?", translation: "Не волнуйся! Кстати, завтра снова выходной — куда пойдём?" },
          { speaker: "A", hanzi: "听说美术馆的展览很不错，去看展览怎么样？", pinyin: "Tīngshuō měishùguǎn de zhǎnlǎn hěn búcuò, qù kàn zhǎnlǎn zěnmeyàng?", translation: "Слышал, в музее хорошая выставка — сходим?" },
          { speaker: "B", hanzi: "好啊，没意见。你吃了早饭来找我，好吗？", pinyin: "Hǎo a, méi yìjiàn. Nǐ chī le zǎofàn lái zhǎo wǒ, hǎo ma?", translation: "Давай! Поешь позавтракай и заходи за мной." },
          { speaker: "A", hanzi: "好，明天八点半在你们宿舍门口见面，行吗？", pinyin: "Hǎo, míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn, xíng ma?", translation: "Ок, встречаемся в 8:30 у вашего общежития?" },
          { speaker: "B", hanzi: "行。那今天你干什么？", pinyin: "Xíng. Nà jīntiān nǐ gàn shénme?", translation: "Идёт. А сегодня ты что делаешь?" },
          { speaker: "A", hanzi: "和同学上网聊天儿吧。明天见！", pinyin: "Hé tóngxué shàng wǎng liáo tiānr ba. Míngtiān jiàn!", translation: "В инете с одногруппником поболтаю. До завтра!" },
          { speaker: "B", hanzi: "明天见！", pinyin: "Míngtiān jiàn!", translation: "До завтра!" },
        ],
      },
    ],

    tips: [
      "几两饺子 — «пельменей на несколько лянов». 两 (liǎng) здесь единица веса ≈ 50 г (10 两 = 1 斤 = 500 г). В столовых пельмени часто продают по весу, не по штукам.",
      "祝…生日快乐 — стандартная форма «с днём рождения!». 祝你生日快乐! = Happy Birthday! Также 祝 + 新年快乐 (с Новым годом).",
      "放心 — «успокой сердце», не волнуйся. 放心吧！— очень тёплое заверение. В ответе на заботу.",
      "上网 и 聊天儿 — «зайти в интернет» и «болтать». 上网聊天儿 — чатиться в сети. Современная разговорная лексика.",
      "没意见 — «не возражаю, согласен» (дословно «нет мнения»). Мягкое согласие с предложением.",
    ],
  },

  25: {
    introduction:
      "Итоговая глава Unit 5. Вы повторите все модальные глаголы (会/能/要/得/应该) и познакомитесь с 别 + V (отрицание для «не надо»).\n\n" +
      "Ситуация: 中村 записался в секцию тайцзи и рано встаёт. 古丽 решает присоединиться — побегать и подвигаться, а то совсем обленилась.",

    vocabulary: [
      { hanzi: "晚安", pinyin: "wǎn'ān", translation: "спокойной ночи" },
      { hanzi: "这么", pinyin: "zhème", translation: "так, настолько" },
      { hanzi: "电视剧", pinyin: "diànshìjù", translation: "сериал, ТВ-шоу" },
      { hanzi: "太极拳", pinyin: "tàijíquán", translation: "тайцзицюань" },
      { hanzi: "参加", pinyin: "cānjiā", translation: "участвовать" },
      { hanzi: "班", pinyin: "bān", translation: "класс, группа, секция" },
      { hanzi: "报名", pinyin: "bào míng", translation: "записаться" },
      { hanzi: "忘", pinyin: "wàng", translation: "забыть" },
      { hanzi: "重新", pinyin: "chóngxīn", translation: "заново, снова" },
      { hanzi: "闹钟", pinyin: "nàozhōng", translation: "будильник" },
      { hanzi: "空气", pinyin: "kōngqì", translation: "воздух" },
      { hanzi: "新鲜", pinyin: "xīnxiān", translation: "свежий" },
      { hanzi: "湖", pinyin: "hú", translation: "озеро" },
      { hanzi: "跑步", pinyin: "pǎo bù", translation: "бегать, бег" },
      { hanzi: "劲儿", pinyin: "jìnr", translation: "сила, мощь" },
      { hanzi: "出", pinyin: "chū", translation: "выходить наружу" },
      { hanzi: "汗", pinyin: "hàn", translation: "пот" },
      { hanzi: "锻炼", pinyin: "duànliàn", translation: "заниматься спортом, тренироваться" },
      { hanzi: "棒", pinyin: "bàng", translation: "превосходный, крутой" },
      { hanzi: "跑", pinyin: "pǎo", translation: "бежать" },
      { hanzi: "散步", pinyin: "sàn bù", translation: "прогуливаться" },
    ],

    grammar: [
      {
        title: "Модальные глаголы — обзор",
        explanation:
          "Систематизируем все модальные глаголы (能愿动词), изученные в Unit 4-5:\n\n" +
          "1) 会 (huì) — УМЕТЬ (по обучению):\n" +
          "   我会打太极拳。— Умею тайцзи.\n\n" +
          "2) 可以 (kěyǐ) — МОЖНО (разрешение):\n" +
          "   如果不会说汉语的话，你可以说英语。\n\n" +
          "3) 能 (néng) — МОЧЬ (физически, по обстоятельствам):\n" +
          "   古丽能用汉语聊天儿。\n\n" +
          "4) 要 (yào) — ХОЧУ/СОБИРАЮСЬ (субъективное желание):\n" +
          "   我要去跑步。— Хочу побегать.\n\n" +
          "5) 得 (děi) — ДОЛЖЕН (обязанность):\n" +
          "   明天早上有课，我得早一点儿起床。\n\n" +
          "Все ставятся ПЕРЕД основным глаголом. Отрицание: 不会, 不可以, 不能, 不要, 不用 (вместо 不得).",
        examples: [
          { hanzi: "我会打太极拳。", pinyin: "Wǒ huì dǎ tàijíquán.", translation: "Умею тайцзи." },
          { hanzi: "阿曼可以说汉语。", pinyin: "Āmàn kěyǐ shuō Hànyǔ.", translation: "Аман может говорить по-китайски (ему разрешено/у него получается)." },
          { hanzi: "我要去跑步，你去吗？", pinyin: "Wǒ yào qù pǎo bù, nǐ qù ma?", translation: "Хочу побегать, пойдёшь?" },
          { hanzi: "明天早上有课，我得早一点儿起床。", pinyin: "Míngtiān zǎoshang yǒu kè, wǒ děi zǎo yìdiǎnr qǐ chuáng.", translation: "Завтра пары, надо рано вставать." },
        ],
      },
      {
        title: "别 + V + 了 — «перестань делать, хватит»",
        explanation:
          "В Главе 20 мы учили 别 + V = «не делай». Добавим вариант с 了 в конце:\n\n" +
          "Схема:  别 + Глагол + 了\n\n" +
          "你也别看书了。— Хватит тебе тоже читать.\n" +
          "别说了！— Хватит говорить!\n" +
          "别吃了！— Перестань есть!\n\n" +
          "了 здесь означает «прекрати текущее действие». Без 了 — общий запрет.\n" +
          "• 别说 — не говори (вообще)\n" +
          "• 别说了 — хватит говорить (сейчас)",
        examples: [
          { hanzi: "你也别看书了，早一点儿睡吧！", pinyin: "Nǐ yě bié kàn shū le, zǎo yìdiǎnr shuì ba!", translation: "И ты хватит читать, ложись пораньше!" },
          { hanzi: "别吃了，已经太晚了。", pinyin: "Bié chī le, yǐjīng tài wǎn le.", translation: "Хватит есть, уже слишком поздно." },
          { hanzi: "别说了！", pinyin: "Bié shuō le!", translation: "Хватит говорить!" },
        ],
      },
      {
        title: "得 (děi) в повторении + 多 + V — «надо побольше делать X»",
        explanation:
          "Формула совета «надо побольше что-то делать» — с 多 перед удвоенным глаголом.\n\n" +
          "Схема:  (Подл.) 得 + 多 + V-V (+ 了)\n\n" +
          "你得多锻炼锻炼了。— Тебе надо побольше тренироваться.\n" +
          "你得多学习学习。— Надо тебе побольше учиться.\n" +
          "你得多听听音乐。— Слушай побольше музыку.\n\n" +
          "了 в конце подчёркивает настоятельность совета (совсем пора бы!).",
        examples: [
          { hanzi: "你得多锻炼锻炼了。", pinyin: "Nǐ děi duō duànliàn duànliàn le.", translation: "Тебе пора побольше тренироваться!" },
          { hanzi: "你出了很多汗。看起来，你得多锻炼锻炼了。", pinyin: "Nǐ chū le hěn duō hàn. Kàn qǐlai, nǐ děi duō duànliàn duànliàn le.", translation: "Ты вспотел. Похоже, надо тебе побольше заниматься." },
          { hanzi: "你得多学习学习汉语。", pinyin: "Nǐ děi duō xuéxí xuéxí Hànyǔ.", translation: "Надо тебе побольше учить китайский." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Запись на тайцзи (中村 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "晚安，中村。", pinyin: "Wǎn'ān, Zhōngcūn.", translation: "Спокойной ночи, Накамура." },
          { speaker: "B", hanzi: "你怎么这么早就睡觉？不看电视剧了吗？", pinyin: "Nǐ zěnme zhème zǎo jiù shuì jiào? Bú kàn diànshìjù le ma?", translation: "Что так рано ложишься? Сериал не смотришь?" },
          { speaker: "A", hanzi: "不看了。明天早上有太极拳课，我要早一点儿起床。", pinyin: "Bú kàn le. Míngtiān zǎoshang yǒu tàijíquán kè, wǒ yào zǎo yìdiǎnr qǐ chuáng.", translation: "Нет. Завтра утром тайцзи, надо пораньше встать." },
          { speaker: "B", hanzi: "你也参加太极拳班了？太好了，我也报名了。", pinyin: "Nǐ yě cānjiā tàijíquán bān le? Tài hǎo le, wǒ yě bào míng le.", translation: "Ты тоже записался? Отлично, я тоже!" },
          { speaker: "A", hanzi: "你也喜欢打太极拳吗？", pinyin: "Nǐ yě xǐhuan dǎ tàijíquán ma?", translation: "Ты любишь тайцзи?" },
          { speaker: "B", hanzi: "喜欢。我刚来中国的时候学了半年太极拳，可是现在都忘了，所以我要重新学。", pinyin: "Xǐhuan. Wǒ gāng lái Zhōngguó de shíhou xué le bàn nián tàijíquán, kěshì xiànzài dōu wàng le, suǒyǐ wǒ yào chóngxīn xué.", translation: "Да. Когда только приехала в Китай, полгода учила, но теперь всё забыла, надо заново." },
          { speaker: "A", hanzi: "那明天我们一起开始吧！明天早上你能叫我吗？", pinyin: "Nà míngtiān wǒmen yìqǐ kāishǐ ba! Míngtiān zǎoshang nǐ néng jiào wǒ ma?", translation: "Давай завтра вместе! Утром меня разбудишь?" },
          { speaker: "B", hanzi: "我有闹钟，没问题。", pinyin: "Wǒ yǒu nàozhōng, méi wèntí.", translation: "У меня будильник, без проблем." },
          { speaker: "A", hanzi: "你也别看书了，早一点儿睡吧！", pinyin: "Nǐ yě bié kàn shū le, zǎo yìdiǎnr shuì ba!", translation: "Ты тоже хватит читать, ложись пораньше!" },
        ],
      },
      {
        title: "На утренней пробежке (中村 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "早上的空气真新鲜。", pinyin: "Zǎoshang de kōngqì zhēn xīnxiān.", translation: "Утренний воздух такой свежий." },
          { speaker: "B", hanzi: "是呀！我还要去湖边跑步，你去吗？", pinyin: "Shì ya! Wǒ hái yào qù hú biān pǎo bù, nǐ qù ma?", translation: "Да! Я ещё пробегусь у озера, пойдёшь?" },
          { speaker: "A", hanzi: "不去了。打了一个小时太极拳，有点儿累，没劲儿了。", pinyin: "Bú qù le. Dǎ le yí ge xiǎoshí tàijíquán, yǒudiǎnr lèi, méi jìnr le.", translation: "Нет. Час тайцзи отыграл, устал, сил нет." },
          { speaker: "B", hanzi: "你出了很多汗。看起来，你得多锻炼锻炼了。", pinyin: "Nǐ chū le hěn duō hàn. Kàn qǐlai, nǐ děi duō duànliàn duànliàn le.", translation: "Ты весь потный. Похоже, тебе надо больше тренироваться." },
          { speaker: "A", hanzi: "是呀！你的身体真棒，不累吗？", pinyin: "Shì ya! Nǐ de shēntǐ zhēn bàng, bú lèi ma?", translation: "Точно! А у тебя форма — крутая, не устаёшь?" },
          { speaker: "B", hanzi: "不累，我每天跑步。", pinyin: "Bú lèi, wǒ měi tiān pǎo bù.", translation: "Не устаю, я каждый день бегаю." },
          { speaker: "A", hanzi: "是吗？我怎么不知道？", pinyin: "Shì ma? Wǒ zěnme bù zhīdào?", translation: "Да? А я что не знал?" },
          { speaker: "B", hanzi: "我跑步的时候，你还在睡觉呢。", pinyin: "Wǒ pǎo bù de shíhou, nǐ hái zài shuì jiào ne.", translation: "Когда я бегаю, ты ещё спишь." },
          { speaker: "A", hanzi: "真不好意思。你每天跑多长时间？", pinyin: "Zhēn bù hǎoyìsi. Nǐ měi tiān pǎo duō cháng shíjiān?", translation: "Стыдно. А сколько ты бегаешь?" },
          { speaker: "B", hanzi: "大概跑半个小时。以后我吃了晚饭也去散散步。", pinyin: "Dàgài pǎo bàn ge xiǎoshí. Yǐhòu wǒ chī le wǎnfàn yě qù sànsan bù.", translation: "Полчаса примерно. Вечером тоже прогуливаюсь после ужина." },
        ],
      },
    ],

    tips: [
      "太极拳 (tàijíquán) — китайская боевая гимнастика. Очень популярна у пожилых, но и молодёжь часто занимается. В парках с утра — типичная картина.",
      "Разница 跑 и 跑步: 跑 — просто «бежать». 跑步 — «бегать для упражнения». «Утром бегаю» = 跑步, а «убежал от собаки» = 跑.",
      "劲儿 (jìnr) — «сила, энергия». 没劲儿 = «нет сил, утомлён». Очень разговорное, пекинское слово с -r суффиксом.",
      "身体真棒 — «форма отличная, здоровье крутое». 棒 (bàng) = «превосходный», очень сильная похвала.",
      "闹钟 — «будильник». 闹 = шумно, 钟 = часы. «Шумные часы» — точно будильник!",
    ],
  },

  26: {
    introduction:
      "В этой главе вы научитесь говорить о будущих событиях с помощью 快……了 / 要……了 («скоро X»), использовать 只好 («ничего не остаётся кроме как») и 可能 («возможно»).\n\n" +
      "Ситуация: приближаются экзамены. 古丽 зубрит в библиотеке, 阿曼 планирует поездку на каникулах на северо-восток Китая. 中村 пишет рождественские открытки.",

    vocabulary: [
      { hanzi: "接", pinyin: "jiē", translation: "отвечать на звонок, встречать" },
      { hanzi: "电", pinyin: "diàn", translation: "электричество" },
      { hanzi: "用功", pinyin: "yònggōng", translation: "усердный, прилежный" },
      { hanzi: "快", pinyin: "kuài", translation: "скоро" },
      { hanzi: "基础", pinyin: "jīchǔ", translation: "основа" },
      { hanzi: "只好", pinyin: "zhǐhǎo", translation: "приходится, ничего не остаётся кроме" },
      { hanzi: "努力", pinyin: "nǔlì", translation: "стараться, упорно" },
      { hanzi: "快要", pinyin: "kuàiyào", translation: "скоро, вот-вот" },
      { hanzi: "放假", pinyin: "fàng jià", translation: "начаться каникулам" },
      { hanzi: "假期", pinyin: "jiàqī", translation: "каникулы, отпуск" },
      { hanzi: "旅行", pinyin: "lǚxíng", translation: "путешествовать" },
      { hanzi: "决定", pinyin: "juédìng", translation: "решить; решение" },
      { hanzi: "可能", pinyin: "kěnéng", translation: "возможно, может быть" },
      { hanzi: "出发", pinyin: "chūfā", translation: "отправляться" },
      { hanzi: "考虑", pinyin: "kǎolǜ", translation: "обдумать" },
      { hanzi: "明信片", pinyin: "míngxìnpiàn", translation: "открытка" },
      { hanzi: "圣诞节", pinyin: "Shèngdàn Jié", translation: "Рождество" },
      { hanzi: "新年", pinyin: "xīnnián", translation: "Новый год" },
      { hanzi: "寄", pinyin: "jì", translation: "отправлять почтой" },
      { hanzi: "贺卡", pinyin: "hèkǎ", translation: "поздравительная открытка" },
      { hanzi: "办法", pinyin: "bànfǎ", translation: "способ, метод" },
      { hanzi: "亲戚", pinyin: "qīnqi", translation: "родственник" },
      { hanzi: "整整", pinyin: "zhěngzhěng", translation: "ровно, целый" },
      { hanzi: "邮局", pinyin: "yóujú", translation: "почта" },
      { hanzi: "再", pinyin: "zài", translation: "затем, потом" },
      { hanzi: "刚才", pinyin: "gāngcái", translation: "только что" },
      { hanzi: "邮票", pinyin: "yóupiào", translation: "марка" },
      { hanzi: "排队", pinyin: "pái duì", translation: "стоять в очереди" },
      { hanzi: "东北", pinyin: "Dōngběi", translation: "Северо-Восток Китая" },
    ],

    grammar: [
      {
        title: "快……了 / 要……了 / 快要……了 — «скоро, вот-вот»",
        explanation:
          "Все три конструкции означают «вот-вот, скоро произойдёт».\n\n" +
          "Схемы (в порядке возрастания формальности):\n" +
          "• 快 + Глагол/Прил. + 了\n" +
          "• 要 + Глагол/Прил. + 了\n" +
          "• 快要 + Глагол/Прил. + 了\n\n" +
          "快考试了。— Скоро экзамен.\n" +
          "快要放假了。— Вот-вот начнутся каникулы.\n" +
          "新年要来了。— Новый год приближается.\n\n" +
          "Используется для событий в БЛИЗКОМ будущем. 了 в конце обязательно.",
        examples: [
          { hanzi: "快考试了。", pinyin: "Kuài kǎoshì le.", translation: "Скоро экзамен." },
          { hanzi: "快要放假了。", pinyin: "Kuàiyào fàng jià le.", translation: "Вот-вот каникулы." },
          { hanzi: "新年要来了，我要给朋友寄贺卡。", pinyin: "Xīnnián yào lái le, wǒ yào gěi péngyou jì hèkǎ.", translation: "Скоро Новый год — разошлю друзьям открытки." },
        ],
      },
      {
        title: "只好 — «ничего не остаётся кроме как»",
        explanation:
          "只好 (zhǐhǎo) — «приходится, волей-неволей, только и остаётся что».\n\n" +
          "Схема:  (Подл. +) 只好 + Глагол\n\n" +
          "我基础不好，只好努力学习了。\n" +
          "«У меня слабая база, приходится упорно учиться.»\n\n" +
          "Смысл: нет лучшего варианта, вынужденно.\n\n" +
          "Часто с 了 в конце — для подчёркивания вынужденности.",
        examples: [
          { hanzi: "快考试了，我基础不好，只好努力学习了。", pinyin: "Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le.", translation: "Скоро экзамен, база слабая — придётся упорно учиться." },
          { hanzi: "下雨了，不能出去玩儿，只好在家里看电视。", pinyin: "Xià yǔ le, bù néng chū qù wánr, zhǐhǎo zài jiā li kàn diànshì.", translation: "Дождь, гулять нельзя — остаётся только дома телик смотреть." },
          { hanzi: "没有饺子了，只好吃面条儿吧。", pinyin: "Méiyǒu jiǎozi le, zhǐhǎo chī miàntiáor ba.", translation: "Пельменей нет — придётся есть лапшу." },
        ],
      },
      {
        title: "可能 — «возможно, может быть»",
        explanation:
          "可能 (kěnéng) перед глаголом/фразой означает возможность, предположение.\n\n" +
          "Схема:  (Подл. +) 可能 + Сказуемое\n\n" +
          "可能去东北。— Возможно, поедем на северо-восток.\n" +
          "我们可能下个周末去。— Может быть, поедем в следующие выходные.\n\n" +
          "Также как существительное «возможность»:\n" +
          "有可能 — есть возможность\n" +
          "没有可能 — нет возможности\n\n" +
          "Разница с 会 (вероятность): 可能 мягче, «может быть». 会 более уверенно «скорее всего».",
        examples: [
          { hanzi: "还没决定，可能去东北。", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi.", translation: "Ещё не решил, может, на северо-восток." },
          { hanzi: "我们可能下个周末去。", pinyin: "Wǒmen kěnéng xià ge zhōumò qù.", translation: "Возможно, поедем в следующие выходные." },
          { hanzi: "他可能生病了，所以没来上课。", pinyin: "Tā kěnéng shēng bìng le, suǒyǐ méi lái shàng kè.", translation: "Он, возможно, заболел — поэтому не пришёл." },
          { hanzi: "我刚才可能下雨了，我们别去玩儿吧。", pinyin: "Wǒ gāngcái kěnéng xià yǔ le, wǒmen bié qù wánr ba.", translation: "Только что, возможно, был дождь — давай не пойдём." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Подготовка к экзаменам (阿曼 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "今天你去哪儿了？我打你的手机，可是你没接。", pinyin: "Jīntiān nǐ qù nǎr le? Wǒ dǎ nǐ de shǒujī, kěshì nǐ méi jiē.", translation: "Где ты сегодня была? Я звонил, но ты не ответила." },
          { speaker: "B", hanzi: "不好意思，手机没电了。我去图书馆了，在那儿看了一个上午书。", pinyin: "Bù hǎoyìsi, shǒujī méi diàn le. Wǒ qù túshūguǎn le, zài nàr kàn le yí ge shàngwǔ shū.", translation: "Извини, батарея села. Я была в библиотеке, читала всё утро." },
          { speaker: "A", hanzi: "你真用功！", pinyin: "Nǐ zhēn yònggōng!", translation: "Вот же трудяга!" },
          { speaker: "B", hanzi: "快考试了，我基础不好，只好努力学习了。", pinyin: "Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le.", translation: "Скоро экзамен, база слабая — пришлось попотеть." },
          { speaker: "A", hanzi: "快要放假了，我们打算假期去旅行，你想和我们一起去吗？", pinyin: "Kuàiyào fàng jià le, wǒmen dǎsuàn jiàqī qù lǚxíng, nǐ xiǎng hé wǒmen yìqǐ qù ma?", translation: "Скоро каникулы, мы поедем в путешествие — хочешь с нами?" },
          { speaker: "B", hanzi: "你们打算去哪儿？", pinyin: "Nǐmen dǎsuàn qù nǎr?", translation: "Куда собираетесь?" },
          { speaker: "A", hanzi: "还没决定，可能去东北。", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi.", translation: "Ещё не решили, может, на северо-восток." },
          { speaker: "B", hanzi: "大概什么时候出发？", pinyin: "Dàgài shénme shíhou chūfā?", translation: "Когда примерно?" },
          { speaker: "A", hanzi: "可能下个周末。", pinyin: "Kěnéng xià ge zhōumò.", translation: "Возможно, в следующие выходные." },
          { speaker: "B", hanzi: "好，我考虑考虑。", pinyin: "Hǎo, wǒ kǎolǜ kǎolǜ.", translation: "Хорошо, подумаю." },
        ],
      },
      {
        title: "Открытки на Рождество (古丽 и 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，你在干什么呢？", pinyin: "Zhōngcūn, nǐ zài gàn shénme ne?", translation: "Накамура, что делаешь?" },
          { speaker: "B", hanzi: "给朋友写明信片呢。圣诞节快到了，新年也要来了，得写给朋友们贺卡了。", pinyin: "Gěi péngyou xiě míngxìnpiàn ne. Shèngdàn Jié kuài dào le, xīnnián yě yào lái le, děi xiě gěi péngyoumen hèkǎ le.", translation: "Пишу открытки друзьям. Скоро Рождество, и Новый год на носу — надо всем разослать поздравления." },
          { speaker: "A", hanzi: "写了那么多呀！", pinyin: "Xiě le nàme duō ya!", translation: "Так много написал!" },
          { speaker: "B", hanzi: "没办法，亲戚朋友多，我整整写了一个小时呢。", pinyin: "Méi bànfǎ, qīnqi péngyou duō, wǒ zhěngzhěng xiě le yí ge xiǎoshí ne.", translation: "Ничего не поделаешь, родни и друзей много — целый час писал." },
          { speaker: "A", hanzi: "现在邮局人很多，你一会儿再去寄吧。", pinyin: "Xiànzài yóujú rén hěn duō, nǐ yíhuìr zài qù jì ba.", translation: "Сейчас на почте толпа — отправь попозже." },
          { speaker: "B", hanzi: "是吗？你怎么知道？", pinyin: "Shì ma? Nǐ zěnme zhīdào?", translation: "Да? Откуда знаешь?" },
          { speaker: "A", hanzi: "我刚才去邮局买邮票，差不多排了半个小时队。", pinyin: "Wǒ gāngcái qù yóujú mǎi yóupiào, chàbuduō pái le bàn ge xiǎoshí duì.", translation: "Я сейчас за марками ходила — почти полчаса в очереди." },
          { speaker: "B", hanzi: "那好，我一会儿再去。", pinyin: "Nà hǎo, wǒ yíhuìr zài qù.", translation: "Ладно, попозже схожу." },
        ],
      },
    ],

    tips: [
      "快……了 ≠ «быстро». В данной конструкции 快 = «скоро, вот-вот». «Быстрый» = 快 без 了, а «скоро» = 快……了.",
      "没电了 — «батарея села». Дословно «нет электричества». О любом электронном устройстве.",
      "圣诞节 (Shèngdàn Jié) — Рождество. 圣诞 буквально «святое рождение». В Китае — не традиционный, но популярный в городах праздник.",
      "用功 (yònggōng) — «усердный, трудолюбивый». Похвала студенту. Дословно «применять усилия». Прямая противоположность 偷懒.",
      "排队 — «стоять в очереди». Китайцы считали что не умеют это делать, но теперь в крупных городах очень культурно. 排 = выстраивать, 队 = ряд.",
    ],
  },

  27: {
    introduction:
      "В этой главе вы научитесь использовать 极了 (крайняя степень), разницу 想 и 要, счётные слова для действий (趟, 次) и говорить о планах на каникулы.\n\n" +
      "Ситуация: 张伟 остаётся готовиться к магистратуре по древней истории, 阿曼 едет в Харбин. Оба обсуждают планы на каникулы и возвращение домой на Новый год.",

    vocabulary: [
      { hanzi: "计划", pinyin: "jìhuà", translation: "план" },
      { hanzi: "待", pinyin: "dāi", translation: "оставаться, находиться" },
      { hanzi: "地方", pinyin: "dìfang", translation: "место" },
      { hanzi: "风景", pinyin: "fēngjǐng", translation: "пейзаж" },
      { hanzi: "美", pinyin: "měi", translation: "красивый" },
      { hanzi: "极了", pinyin: "jí le", translation: "крайне, чрезвычайно" },
      { hanzi: "复习", pinyin: "fùxí", translation: "повторять (материал)" },
      { hanzi: "功课", pinyin: "gōngkè", translation: "уроки, учебные дела" },
      { hanzi: "毕业", pinyin: "bì yè", translation: "выпускаться" },
      { hanzi: "抓紧", pinyin: "zhuājǐn", translation: "ухватиться, использовать (время)" },
      { hanzi: "方面", pinyin: "fāngmiàn", translation: "сторона, аспект" },
      { hanzi: "古代", pinyin: "gǔdài", translation: "древность" },
      { hanzi: "历史", pinyin: "lìshǐ", translation: "история" },
      { hanzi: "感兴趣", pinyin: "gǎn xìngqù", translation: "интересоваться" },
      { hanzi: "教授", pinyin: "jiàoshòu", translation: "профессор" },
      { hanzi: "一定", pinyin: "yídìng", translation: "обязательно, наверняка" },
      { hanzi: "考上", pinyin: "kǎoshang", translation: "поступить (сдав экзамен)" },
      { hanzi: "考", pinyin: "kǎo", translation: "сдавать экзамен" },
      { hanzi: "春节", pinyin: "Chūn Jié", translation: "Праздник Весны (КНГ)" },
      { hanzi: "让", pinyin: "ràng", translation: "заставлять, просить (кого-то сделать)" },
      { hanzi: "问题", pinyin: "wèntí", translation: "вопрос, проблема" },
      { hanzi: "应该", pinyin: "yīnggāi", translation: "должен, следует" },
      { hanzi: "想念", pinyin: "xiǎngniàn", translation: "скучать" },
      { hanzi: "趟", pinyin: "tàng", translation: "счётное слово для поездок" },
      { hanzi: "哈尔滨", pinyin: "Hā'ěrbīn", translation: "Харбин" },
      { hanzi: "张大朋", pinyin: "Zhāng Dàpéng", translation: "Чжан Дапэн (имя)" },
    ],

    grammar: [
      {
        title: "Прил. + 极了 — «крайне X»",
        explanation:
          "极了 (jí le) после прилагательного = «до крайности, супер-X».\n\n" +
          "Схема:  Прил. + 极了\n\n" +
          "风景美极了。— Пейзаж красивейший.\n" +
          "好极了！— Превосходно!\n" +
          "冷极了！— Жуткий холод!\n\n" +
          "Степень:\n" +
          "• 很 — просто очень\n" +
          "• 挺……的 — вполне\n" +
          "• 太……了 — слишком\n" +
          "• 极了 — крайне (литературнее, сильнее)\n\n" +
          "极了 ставится всегда ПОСЛЕ прилагательного, без 很/太 перед ним.",
        examples: [
          { hanzi: "哈尔滨冬天的风景美极了。", pinyin: "Hā'ěrbīn dōngtiān de fēngjǐng měi jí le.", translation: "Харбин зимой — красотища неописуемая." },
          { hanzi: "那儿的风景漂亮极了。", pinyin: "Nàr de fēngjǐng piàoliang jí le.", translation: "Там пейзажи — красота." },
          { hanzi: "他的汉语好极了。", pinyin: "Tā de Hànyǔ hǎo jí le.", translation: "Китайский у него — просто отличный." },
        ],
      },
      {
        title: "想 vs 要 — «хочу»",
        explanation:
          "Оба глагола значат «хотеть», но с нюансом:\n\n" +
          "• 想 (xiǎng) — мечта, желание, размышление, не обязательно будет действие:\n" +
          "  我想去中国。— Мечтаю поехать в Китай.\n" +
          "  我想学汉语。— Хочу учить китайский.\n\n" +
          "• 要 (yào) — сильное намерение/решение, скоро будет действие:\n" +
          "  我要去跑步。— Иду бегать. (решено!)\n" +
          "  我要考研究生。— Буду сдавать в магистратуру. (план)\n\n" +
          "Отрицание:\n" +
          "• 不想 — не хочется (мягко)\n" +
          "• 不要 — НЕ используется для «не хочу»! Значит «не делай!» (запрет)\n\n" +
          "Для «не хочу» всегда 不想.",
        examples: [
          { hanzi: "我想去别的地方看看。", pinyin: "Wǒ xiǎng qù bié de dìfang kànkan.", translation: "Хочу посмотреть другие места." },
          { hanzi: "我朋友想去哈尔滨。", pinyin: "Wǒ péngyou xiǎng qù Hā'ěrbīn.", translation: "Мой друг хочет в Харбин." },
          { hanzi: "我要考研究生。", pinyin: "Wǒ yào kǎo yánjiūshēng.", translation: "Буду сдавать в магистратуру." },
          { hanzi: "我不想考研究生。", pinyin: "Wǒ bù xiǎng kǎo yánjiūshēng.", translation: "Не хочу сдавать в магистратуру." },
        ],
      },
      {
        title: "Счётные слова для действий: 趟 / 次 / 遍 / 下",
        explanation:
          "В китайском действия тоже считаются! Счётные слова для действий — СРАЗУ ПОСЛЕ глагола:\n\n" +
          "Схема:  V + 了 + число + 趟/次/遍/下\n\n" +
          "• 趟 (tàng) — поездка, раз (о походе куда-то):\n" +
          "  回家一趟 — съездить домой раз\n\n" +
          "• 次 (cì) — раз (общий счёт):\n" +
          "  去过三次 — был 3 раза\n\n" +
          "• 遍 (biàn) — полный раз (от начала до конца):\n" +
          "  看了一遍 — прочитал целиком\n\n" +
          "• 下 (xià) — мимолётный раз (короткое действие):\n" +
          "  看一下 — взглянуть",
        examples: [
          { hanzi: "我得安排时间回家一趟。", pinyin: "Wǒ děi ānpái shíjiān huí jiā yí tàng.", translation: "Надо найти время съездить домой." },
          { hanzi: "我去过三次北京。", pinyin: "Wǒ qù guo sān cì Běijīng.", translation: "Был в Пекине 3 раза." },
          { hanzi: "这本书我看了两遍。", pinyin: "Zhè běn shū wǒ kàn le liǎng biàn.", translation: "Эту книгу я прочёл 2 раза." },
        ],
      },
      {
        title: "让 — «просить/велеть кого-то сделать X»",
        explanation:
          "让 (ràng) — каузативный глагол «просить/позволять/велеть кому-то сделать».\n\n" +
          "Схема:  Подл. + 让 + Кто + Глагол\n\n" +
          "爸爸妈妈让我回家。\n" +
          "«Мама и папа просят меня приехать.» (дословно: «родители делают так, что я возвращаюсь»)\n\n" +
          "老师让我们做作业。— Учитель велит нам делать уроки.\n" +
          "妈妈不让我看电视。— Мама не разрешает смотреть телик.\n\n" +
          "Отрицание: 不让 — не позволяет.",
        examples: [
          { hanzi: "爸爸妈妈让我回家。", pinyin: "Bàba māma ràng wǒ huí jiā.", translation: "Родители зовут домой." },
          { hanzi: "老师让我们做作业。", pinyin: "Lǎoshī ràng wǒmen zuò zuòyè.", translation: "Учитель задал домашку." },
          { hanzi: "医生让我休息一天。", pinyin: "Yīshēng ràng wǒ xiūxi yì tiān.", translation: "Врач велел отдохнуть день." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Планы на каникулы (张伟 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "快放假了，你有什么计划？", pinyin: "Kuài fàng jià le, nǐ yǒu shénme jìhuà?", translation: "Скоро каникулы, какие планы?" },
          { speaker: "B", hanzi: "我打算去旅行。来中国快半年了，我一直待在北京，想去别的地方看看。", pinyin: "Wǒ dǎsuàn qù lǚxíng. Lái Zhōngguó kuài bàn nián le, wǒ yìzhí dāi zài Běijīng, xiǎng qù bié de dìfang kànkan.", translation: "Думаю путешествовать. Почти полгода как в Китае, всё время в Пекине — хочу и другое увидеть." },
          { speaker: "A", hanzi: "你打算去哪儿旅行？", pinyin: "Nǐ dǎsuàn qù nǎr lǚxíng?", translation: "Куда поедешь?" },
          { speaker: "B", hanzi: "还没决定。我的朋友想去哈尔滨。", pinyin: "Hái méi juédìng. Wǒ de péngyou xiǎng qù Hā'ěrbīn.", translation: "Ещё не решил. Друг хочет в Харбин." },
          { speaker: "A", hanzi: "哈尔滨？那个地方冬天非常冷。", pinyin: "Hā'ěrbīn? Nàge dìfang dōngtiān fēicháng lěng.", translation: "Харбин? Там зимой жуткий холод." },
          { speaker: "B", hanzi: "不过听说哈尔滨冬天的风景美极了，我想去看看。你假期怎么过？", pinyin: "Búguò tīngshuō Hā'ěrbīn dōngtiān de fēngjǐng měi jí le, wǒ xiǎng qù kànkan. Nǐ jiàqī zěnme guò?", translation: "Но говорят, зимние пейзажи там — красота. Как ты проведёшь каникулы?" },
          { speaker: "A", hanzi: "我打算在学校复习功课。", pinyin: "Wǒ dǎsuàn zài xuéxiào fùxí gōngkè.", translation: "Останусь в университете повторять материал." },
          { speaker: "B", hanzi: "复习功课？你那么用功啊？", pinyin: "Fùxí gōngkè? Nǐ nàme yònggōng a?", translation: "Повторять? Такой трудяга?" },
          { speaker: "A", hanzi: "快要毕业了，我要考研究生，所以得抓紧时间复习复习。", pinyin: "Kuàiyào bì yè le, wǒ yào kǎo yánjiūshēng, suǒyǐ děi zhuājǐn shíjiān fùxí fùxí.", translation: "Скоро выпуск, буду сдавать в магистратуру — надо использовать время." },
          { speaker: "B", hanzi: "是吗？你打算考哪个方面的研究生？", pinyin: "Shì ma? Nǐ dǎsuàn kǎo nǎge fāngmiàn de yánjiūshēng?", translation: "Да? В какую специальность?" },
          { speaker: "A", hanzi: "我对中国古代历史很感兴趣，想考张大朋教授的。", pinyin: "Wǒ duì Zhōngguó gǔdài lìshǐ hěn gǎn xìngqù, xiǎng kǎo Zhāng Dàpéng jiàoshòu de.", translation: "Мне интересна древняя история Китая, хочу к профессору Чжан Дапэну." },
          { speaker: "B", hanzi: "真棒！你一定能考上。那你春节不回家了？", pinyin: "Zhēn bàng! Nǐ yídìng néng kǎoshang. Nà nǐ Chūn Jié bù huí jiā le?", translation: "Круто! Наверняка поступишь. А на Новый год не едешь домой?" },
          { speaker: "A", hanzi: "大概要回家几天，爸爸妈妈也让我回家。我正在考虑这个问题呢。", pinyin: "Dàgài yào huí jiā jǐ tiān, bàba māma yě ràng wǒ huí jiā. Wǒ zhèngzài kǎolǜ zhège wèntí ne.", translation: "Пару дней, наверное. Родители просят. Как раз думаю об этом." },
          { speaker: "B", hanzi: "回家看看也是应该的，你爸妈一定很想念你。", pinyin: "Huí jiā kànkan yě shì yīnggāi de, nǐ bàmā yídìng hěn xiǎngniàn nǐ.", translation: "Съездить надо, родители очень скучают." },
          { speaker: "A", hanzi: "是啊，我得安排时间回家一趟。", pinyin: "Shì a, wǒ děi ānpái shíjiān huí jiā yí tàng.", translation: "Да, надо найти время заглянуть." },
        ],
      },
    ],

    tips: [
      "春节 (Chūn Jié) — Китайский Новый год (Праздник Весны). Самый важный китайский праздник. По лунному календарю, обычно в феврале. Эквивалент нашего Нового года.",
      "考上 — «поступить» (успешно сдав). Сложный результативный глагол: 考 (сдавать) + 上 (результат). Без 上 — просто «сдавать экзамен».",
      "对X感兴趣 — «интересоваться X». Устойчивая формула. 对 + тема + 感兴趣. «Интересуюсь историей» = 对历史感兴趣.",
      "想念 — «скучать». 我想念你 = «Я по тебе скучаю». Часто сокращается до 想: 我想你 — «скучаю по тебе».",
      "哈尔滨 — столица провинции Хэйлунцзян, самый северный крупный город Китая. Знаменит ежегодным Ледовым фестивалем (冰雪节).",
    ],
  },

  28: {
    introduction:
      "В этой главе вы научитесь оценивать как выполнено действие (V+得+прил.), различать 都 как «все» и «уже», использовать 也许 («может быть»), 为什么 («почему») и 够 («достаточно»).\n\n" +
      "Ситуация: 古丽 и 王红 обсуждают экзамены. 古丽 расстроена — иероглифы читает и пишет медленно, времени не хватило.",

    vocabulary: [
      { hanzi: "星期", pinyin: "xīngqī", translation: "неделя" },
      { hanzi: "门", pinyin: "mén", translation: "счётное слово для предметов (курсов)" },
      { hanzi: "完", pinyin: "wán", translation: "закончить" },
      { hanzi: "有些", pinyin: "yǒuxiē", translation: "некоторые" },
      { hanzi: "报告", pinyin: "bàogào", translation: "доклад" },
      { hanzi: "得", pinyin: "de", translation: "структурная частица (перед оценкой)" },
      { hanzi: "放松", pinyin: "fàngsōng", translation: "расслабиться" },
      { hanzi: "紧张", pinyin: "jǐnzhāng", translation: "напряжённый, нервный" },
      { hanzi: "效果", pinyin: "xiàoguǒ", translation: "эффект, результат" },
      { hanzi: "呀", pinyin: "ya", translation: "модальная частица" },
      { hanzi: "道", pinyin: "dào", translation: "счётное слово для заданий" },
      { hanzi: "题", pinyin: "tí", translation: "задание, вопрос" },
      { hanzi: "为什么", pinyin: "wèi shénme", translation: "почему" },
      { hanzi: "够", pinyin: "gòu", translation: "хватать, достаточно" },
      { hanzi: "阅读", pinyin: "yuèdú", translation: "читать (углублённо)" },
      { hanzi: "汉字", pinyin: "Hànzì", translation: "иероглифы" },
      { hanzi: "难", pinyin: "nán", translation: "трудный" },
      { hanzi: "慢", pinyin: "màn", translation: "медленный" },
      { hanzi: "确实", pinyin: "quèshí", translation: "действительно" },
      { hanzi: "记", pinyin: "jì", translation: "запоминать, записывать" },
      { hanzi: "方法", pinyin: "fāngfǎ", translation: "способ" },
      { hanzi: "编", pinyin: "biān", translation: "составлять" },
      { hanzi: "故事", pinyin: "gùshi", translation: "история" },
      { hanzi: "也许", pinyin: "yěxǔ", translation: "возможно, может быть" },
      { hanzi: "帮助", pinyin: "bāngzhù", translation: "помощь, помогать" },
      { hanzi: "担心", pinyin: "dān xīn", translation: "волноваться, переживать" },
      { hanzi: "解决", pinyin: "jiějué", translation: "решать (задачу)" },
      { hanzi: "欧美", pinyin: "Ōu-Měi", translation: "Европа и Америка" },
    ],

    grammar: [
      {
        title: "V + 得 + Прилагательное — «делать X каким образом»",
        explanation:
          "Как сказать «бежит быстро», «пишет медленно», «поёт хорошо»? В китайском — через 得 (de) после глагола.\n\n" +
          "Схема:  V + 得 + [очень/не/…] + Прил.\n\n" +
          "写得很慢。— Пишу медленно.\n" +
          "考得怎么样？— Как сдал? (дословно: сдал каким?)\n" +
          "跑得很快。— Бежит быстро.\n\n" +
          "Если есть объект, схема усложняется:\n" +
          "V + O + V + 得 + Прил.  (глагол повторяется!)\n" +
          "我写汉字写得很慢。— Я пишу иероглифы медленно.\n\n" +
          "НЕ путать с 得 DĚI (должен). Здесь это структурная частица DE — всегда между глаголом и описанием.",
        examples: [
          { hanzi: "考试考得怎么样？", pinyin: "Kǎoshì kǎo de zěnmeyàng?", translation: "Как сдал экзамен?" },
          { hanzi: "我看汉字看得很慢，写汉字也写得很慢。", pinyin: "Wǒ kàn Hànzì kàn de hěn màn, xiě Hànzì yě xiě de hěn màn.", translation: "Читаю иероглифы медленно, пишу тоже медленно." },
          { hanzi: "他洗衣服洗得不太干净。", pinyin: "Tā xǐ yīfu xǐ de bú tài gānjìng.", translation: "Он стирает вещи не очень чисто." },
          { hanzi: "他跑步跑得很快。", pinyin: "Tā pǎo bù pǎo de hěn kuài.", translation: "Он быстро бегает." },
        ],
      },
      {
        title: "都 — «все» vs «уже»",
        explanation:
          "都 (dōu) имеет два значения:\n\n" +
          "1) «ВСЕ, ОБА» (перед сказуемым, после перечисления):\n" +
          "   我的朋友都来了。— Все мои друзья пришли.\n" +
          "   大家对汉语都感兴趣。— Все интересуются китайским.\n" +
          "   从星期一到星期五，我们每天都有课。\n\n" +
          "2) «УЖЕ» (перед временем, с оттенком удивления):\n" +
          "   都八点半了，你怎么还不起床？\n" +
          "   «Уже 8:30, что ж ты не встаёшь?»\n\n" +
          "По контексту легко различить: после людей = «все», перед временем/числом = «уже».",
        examples: [
          { hanzi: "我的朋友都来了。", pinyin: "Wǒ de péngyou dōu lái le.", translation: "Все мои друзья пришли." },
          { hanzi: "大家对汉语都感兴趣。", pinyin: "Dàjiā duì Hànyǔ dōu gǎn xìngqù.", translation: "Все интересуются китайским." },
          { hanzi: "都八点半了，你怎么还不起床？", pinyin: "Dōu bā diǎn bàn le, nǐ zěnme hái bù qǐ chuáng?", translation: "Уже 8:30, почему не встаёшь?" },
          { hanzi: "他来北京半年了，还没有中国朋友。", pinyin: "Tā lái Běijīng bàn nián le, hái méiyǒu Zhōngguó péngyou.", translation: "Он в Пекине полгода, а китайских друзей нет." },
        ],
      },
      {
        title: "为什么 — «почему?»",
        explanation:
          "为什么 (wèi shénme) — «почему?». Ставится обычно в начале вопроса или после подлежащего.\n\n" +
          "Схема:  Подл. + 为什么 + Глагол/Прил. + …?\n\n" +
          "你为什么没做？— Почему не сделал?\n" +
          "你为什么不去？— Почему не идёшь?\n\n" +
          "Ответ часто даётся через 因为 (yīnwèi — потому что):\n" +
          "— 因为时间不够了。— Потому что не хватило времени.",
        examples: [
          { hanzi: "你为什么没做？", pinyin: "Nǐ wèi shénme méi zuò?", translation: "Почему не сделал?" },
          { hanzi: "你为什么不去？", pinyin: "Nǐ wèi shénme bú qù?", translation: "Почему не идёшь?" },
          { hanzi: "因为时间不够了。", pinyin: "Yīnwèi shíjiān bú gòu le.", translation: "Потому что времени не хватило." },
        ],
      },
      {
        title: "也许 — «возможно» (синоним 可能)",
        explanation:
          "也许 (yěxǔ) — «возможно, быть может». По смыслу синоним 可能, но чуть мягче, литературнее.\n\n" +
          "Схема:  也许 + Сказуемое\n\n" +
          "借给我看吧，也许会有帮助。\n" +
          "«Дай посмотреть — может, поможет.»\n\n" +
          "• 可能 — «возможно» (нейтральное)\n" +
          "• 也许 — «может быть» (мягче, чуть менее уверенно)\n" +
          "• 或许 (huòxǔ) — «пожалуй» (письменный стиль)",
        examples: [
          { hanzi: "借给我看吧，也许会有帮助。", pinyin: "Jiè gěi wǒ kàn ba, yěxǔ huì yǒu bāngzhù.", translation: "Дай посмотреть — может помочь." },
          { hanzi: "他也许不来了。", pinyin: "Tā yěxǔ bù lái le.", translation: "Он, возможно, не придёт." },
          { hanzi: "也许明天下雨。", pinyin: "Yěxǔ míngtiān xià yǔ.", translation: "Возможно, завтра дождь." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Про экзамены (古丽 и 王红)",
        lines: [
          { speaker: "A", hanzi: "王红，你们什么时候开始考试？", pinyin: "Wáng Hóng, nǐmen shénme shíhou kāishǐ kǎoshì?", translation: "Ван Хун, когда у вас экзамены?" },
          { speaker: "B", hanzi: "已经开始了。上个星期考了两门，这个星期还有一门就完了。", pinyin: "Yǐjīng kāishǐ le. Shàng ge xīngqī kǎo le liǎng mén, zhège xīngqī hái yǒu yì mén jiù wán le.", translation: "Уже начались. На прошлой неделе 2 сдала, на этой ещё один — и всё." },
          { speaker: "A", hanzi: "你们只考三门课那么少？", pinyin: "Nǐmen zhǐ kǎo sān mén kè nàme shǎo?", translation: "Всего 3 предмета сдаёте?" },
          { speaker: "B", hanzi: "我们有些课不考试，只写报告。你们什么时候考试？", pinyin: "Wǒmen yǒuxiē kè bù kǎoshì, zhǐ xiě bàogào. Nǐmen shénme shíhou kǎoshì?", translation: "По некоторым пишем только доклады. А вы когда?" },
          { speaker: "A", hanzi: "明天开始。现在我每天复习，看书看得头疼，都快累死了。", pinyin: "Míngtiān kāishǐ. Xiànzài wǒ měi tiān fùxí, kàn shū kàn de tóu téng, dōu kuài lèi sǐ le.", translation: "Завтра начинаются. Каждый день повторяю, от чтения голова болит, почти умираю от усталости." },
          { speaker: "B", hanzi: "是啊，我也是。今天晚上去放松一下，怎么样？", pinyin: "Shì a, wǒ yě shì. Jīntiān wǎnshang qù fàngsōng yíxià, zěnmeyàng?", translation: "Да, и я. Вечером сходим расслабиться?" },
          { speaker: "A", hanzi: "好吧！太紧张的话，学习效果也不好。", pinyin: "Hǎo ba! Tài jǐnzhāng dehuà, xuéxí xiàoguǒ yě bù hǎo.", translation: "Давай! Когда слишком напряжён — и толку мало." },
          { speaker: "B", hanzi: "对呀！会学习，也要会休息，对吧？", pinyin: "Duì ya! Huì xuéxí, yě yào huì xiūxi, duì ba?", translation: "Верно! Уметь учиться = уметь отдыхать." },
        ],
      },
      {
        title: "Как сдал? (王红 и 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，考试考得怎么样？", pinyin: "Gǔlì, kǎoshì kǎo de zěnmeyàng?", translation: "Гульнара, как сдала?" },
          { speaker: "B", hanzi: "不太好，有两个生词忘了怎么写，还有一道题没有做。", pinyin: "Bú tài hǎo, yǒu liǎng ge shēngcí wàng le zěnme xiě, hái yǒu yí dào tí méiyǒu zuò.", translation: "Не очень, забыла как пишутся два слова, и один вопрос не успела." },
          { speaker: "A", hanzi: "是吗？为什么？", pinyin: "Shì ma? Wèi shénme?", translation: "Да? Почему?" },
          { speaker: "B", hanzi: "时间不够了。", pinyin: "Shíjiān bú gòu le.", translation: "Времени не хватило." },
          { speaker: "A", hanzi: "哪道题你没做？", pinyin: "Nǎ dào tí nǐ méi zuò?", translation: "Какой?" },
          { speaker: "B", hanzi: "阅读。汉字太难了！我看汉字看得很慢，写汉字也写得很慢。", pinyin: "Yuèdú. Hànzì tài nán le! Wǒ kàn Hànzì kàn de hěn màn, xiě Hànzì yě xiě de hěn màn.", translation: "Чтение. Иероглифы очень сложные! Читаю медленно, пишу медленно." },
          { speaker: "A", hanzi: "对欧美人来说，汉字确实有点儿难。", pinyin: "Duì Ōu-Měi rén lái shuō, Hànzì quèshí yǒudiǎnr nán.", translation: "Для европейцев и американцев иероглифы правда сложные." },
          { speaker: "B", hanzi: "你有什么记汉字的好方法吗？", pinyin: "Nǐ yǒu shénme jì Hànzì de hǎo fāngfǎ ma?", translation: "Знаешь хорошие методы запоминания?" },
          { speaker: "A", hanzi: "我有一本给留学生编的汉字故事书，你想看吗？", pinyin: "Wǒ yǒu yì běn gěi liúxuéshēng biān de Hànzì gùshi shū, nǐ xiǎng kàn ma?", translation: "У меня есть книжка с историями иероглифов для иностранцев, хочешь?" },
          { speaker: "B", hanzi: "好啊，借给我看吧，也许会有帮助。", pinyin: "Hǎo a, jiè gěi wǒ kàn ba, yěxǔ huì yǒu bāngzhù.", translation: "Давай, дай посмотреть — может поможет." },
          { speaker: "A", hanzi: "别担心，你一定能解决这个问题。", pinyin: "Bié dān xīn, nǐ yídìng néng jiějué zhège wèntí.", translation: "Не волнуйся, разберёшься." },
        ],
      },
    ],

    tips: [
      "得 (de) перед оценкой — одна из трёх функций иероглифа 得. Чтобы не путать: 得 DE — ВСЕГДА между глаголом и описанием (写得快). Если перед глаголом — это děi «должен» (我得写).",
      "门 — счётное слово для учебных курсов: 一门课 (один курс), 三门课 (три курса). Нельзя 三个课.",
      "道 — счётное слово для вопросов, задач, блюд: 一道题 (задача), 一道菜 (блюдо).",
      "看X看得Y — схема повторения глагола с объектом и оценкой. «Я читаю иероглифы медленно» = 我看汉字看得很慢. Глагол 看 повторяется!",
      "对X来说 из Главы 18 часто используется здесь: 对欧美人来说 = «с точки зрения европейцев и американцев». Крайне полезная формула для рассуждений.",
    ],
  },

  29: {
    introduction:
      "В этой главе вы научитесь использовать результативные глаголы (V+好了, V+完了), счётные слова для билетов (张) и говорить о путешествиях на поезде.\n\n" +
      "Ситуация: 阿曼 сдал все экзамены и купил билеты в Харбин. 张伟 приглашает его на вечер встреч перед отъездом.",

    vocabulary: [
      { hanzi: "全部", pinyin: "quánbù", translation: "всё, целиком" },
      { hanzi: "终于", pinyin: "zhōngyú", translation: "наконец" },
      { hanzi: "别提", pinyin: "biétí", translation: "не стоит и упоминать (плохо)" },
      { hanzi: "提", pinyin: "tí", translation: "поднимать (тему)" },
      { hanzi: "糟糕", pinyin: "zāogāo", translation: "ужасно, кошмар" },
      { hanzi: "声调", pinyin: "shēngdiào", translation: "тон" },
      { hanzi: "错", pinyin: "cuò", translation: "ошибка, неправильно" },
      { hanzi: "谦虚", pinyin: "qiānxū", translation: "скромный" },
      { hanzi: "嗐", pinyin: "hài", translation: "вздох (восклицание)" },
      { hanzi: "火车", pinyin: "huǒchē", translation: "поезд" },
      { hanzi: "票", pinyin: "piào", translation: "билет" },
      { hanzi: "张", pinyin: "zhāng", translation: "счётное слово (плоские объекты)" },
      { hanzi: "卧铺", pinyin: "wòpù", translation: "спальное место (поезд)" },
      { hanzi: "另外", pinyin: "lìngwài", translation: "другой, дополнительно" },
      { hanzi: "硬座", pinyin: "yìngzuò", translation: "жёсткий сидячий" },
      { hanzi: "上", pinyin: "shàng", translation: "садиться (в поезд)" },
      { hanzi: "补", pinyin: "bǔ", translation: "доплатить, обновить" },
      { hanzi: "联欢", pinyin: "liánhuān", translation: "собираться на встречу" },
      { hanzi: "晚会", pinyin: "wǎnhuì", translation: "вечеринка" },
      { hanzi: "表演", pinyin: "biǎoyǎn", translation: "выступать" },
      { hanzi: "节目", pinyin: "jiémù", translation: "номер, программа" },
    ],

    grammar: [
      {
        title: "Результативные глаголы: V + 完/好/到/见/懂 + 了",
        explanation:
          "Результативный глагол = действие + его РЕЗУЛЬТАТ (одним словом). После основного глагола ставится второй — указывающий на результат.\n\n" +
          "Схема:  V + Результат + 了\n\n" +
          "Частые результаты:\n" +
          "• 完 (wán) — закончить: 考完了 (сдал до конца), 做完了 (доделал)\n" +
          "• 好 (hǎo) — сделать качественно/до конца: 买好了 (купил как надо), 准备好了 (подготовил)\n" +
          "• 到 (dào) — достичь результата: 看到了 (увидел), 找到了 (нашёл)\n" +
          "• 见 (jiàn) — воспринял: 听见了 (услышал)\n" +
          "• 懂 (dǒng) — понял: 看懂了 (прочитал и понял)\n\n" +
          "Отрицание: 没 + V + Результат (БЕЗ 了):\n" +
          "我还没准备好。— Я ещё не подготовился.",
        examples: [
          { hanzi: "今天全部考完了吧？", pinyin: "Jīntiān quánbù kǎo wán le ba?", translation: "Сегодня всё сдал?" },
          { hanzi: "我们已经买好票了。", pinyin: "Wǒmen yǐjīng mǎi hǎo piào le.", translation: "Мы уже купили билеты." },
          { hanzi: "我找到了我的自行车。", pinyin: "Wǒ zhǎo dào le wǒ de zìxíngchē.", translation: "Я нашёл свой велосипед." },
          { hanzi: "你听见了吗？", pinyin: "Nǐ tīng jiàn le ma?", translation: "Ты слышал?" },
          { hanzi: "我看懂了这本书。", pinyin: "Wǒ kàn dǒng le zhè běn shū.", translation: "Я понял эту книгу." },
        ],
      },
      {
        title: "Счётное слово 张 — для плоских объектов",
        explanation:
          "张 (zhāng) — счётное слово для плоских предметов.\n\n" +
          "Схема:  Число + 张 + Сущ.\n\n" +
          "Что считается через 张:\n" +
          "• 票 — билет: 一张票, 三张卧铺票\n" +
          "• 纸 — бумага: 一张纸\n" +
          "• 照片 — фото: 一张照片\n" +
          "• 桌子 — стол: 一张桌子\n" +
          "• 床 — кровать: 一张床\n" +
          "• 地图 — карта: 一张地图\n\n" +
          "Логика: всё что можно положить плашмя и оно плоское/прямоугольное.",
        examples: [
          { hanzi: "只买到三张卧铺票。", pinyin: "Zhǐ mǎi dào sān zhāng wòpù piào.", translation: "Смог купить только 3 билета на плацкарт." },
          { hanzi: "另外一张是硬座票。", pinyin: "Lìngwài yì zhāng shì yìngzuò piào.", translation: "Ещё один — на жёсткий сидячий." },
          { hanzi: "这是我家的照片。", pinyin: "Zhè shì wǒ jiā de zhàopiàn.", translation: "Это фото моей семьи." },
          { hanzi: "买一张北京地图。", pinyin: "Mǎi yì zhāng Běijīng dìtú.", translation: "Купить карту Пекина." },
        ],
      },
      {
        title: "终于 — «наконец-то»",
        explanation:
          "终于 (zhōngyú) — «наконец, наконец-то». Выражает облегчение после долгого ожидания/труда.\n\n" +
          "Схема:  Подл. + 终于 + Глагол (+ 了)\n\n" +
          "考了三天，终于考完了。— Сдавал 3 дня, наконец всё.\n" +
          "他终于来了。— Он наконец пришёл.\n\n" +
          "Часто в конце 了 — подчёркивает завершение после ожидания.",
        examples: [
          { hanzi: "考了三天，终于考完了。", pinyin: "Kǎo le sān tiān, zhōngyú kǎo wán le.", translation: "Сдавал 3 дня, наконец всё." },
          { hanzi: "他终于来了。", pinyin: "Tā zhōngyú lái le.", translation: "Он наконец пришёл." },
          { hanzi: "我终于习惯了北京的生活。", pinyin: "Wǒ zhōngyú xíguàn le Běijīng de shēnghuó.", translation: "Я наконец привык к пекинской жизни." },
        ],
      },
    ],

    dialogues: [
      {
        title: "После экзаменов (张伟 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，今天全部考完了吧？", pinyin: "Āmàn, jīntiān quánbù kǎo wán le ba?", translation: "Аман, сегодня всё сдал?" },
          { speaker: "B", hanzi: "考了三天，终于考完了。", pinyin: "Kǎo le sān tiān, zhōngyú kǎo wán le.", translation: "Три дня сдавал — наконец всё." },
          { speaker: "A", hanzi: "考得怎么样？", pinyin: "Kǎo de zěnmeyàng?", translation: "Как?" },
          { speaker: "B", hanzi: "别提了，考得糟糕极了，特别是声调和汉字，错得比较多。", pinyin: "Biétí le, kǎo de zāogāo jí le, tèbié shì shēngdiào hé Hànzì, cuò de bǐjiào duō.", translation: "Не спрашивай, ужасно — особенно тоны и иероглифы, много ошибок." },
          { speaker: "A", hanzi: "你是谦虚吧？平时我看你说得挺不错的。", pinyin: "Nǐ shì qiānxū ba? Píngshí wǒ kàn nǐ shuō de tǐng búcuò de.", translation: "Скромничаешь? Обычно ты неплохо говоришь." },
          { speaker: "B", hanzi: "嗐！已经考完了，不想考试的事了。", pinyin: "Hài! Yǐjīng kǎo wán le, bù xiǎng kǎoshì de shì le.", translation: "Эх! Всё, сдал — не хочу больше думать." },
          { speaker: "A", hanzi: "你什么时候去旅行？", pinyin: "Nǐ shénme shíhou qù lǚxíng?", translation: "Когда в путешествие?" },
          { speaker: "B", hanzi: "星期日出发。", pinyin: "Xīngqīrì chūfā.", translation: "В воскресенье." },
          { speaker: "A", hanzi: "决定去哪儿了吗？", pinyin: "Juédìng qù nǎr le ma?", translation: "Решил куда?" },
          { speaker: "B", hanzi: "决定了，去哈尔滨。", pinyin: "Juédìng le, qù Hā'ěrbīn.", translation: "Да, в Харбин." },
          { speaker: "A", hanzi: "你们怎么去？坐火车去吗？", pinyin: "Nǐmen zěnme qù? Zuò huǒchē qù ma?", translation: "Как поедете? Поездом?" },
          { speaker: "B", hanzi: "对，我们已经买好票了，不过只买到三张卧铺票，另外一张是硬座票。", pinyin: "Duì, wǒmen yǐjīng mǎi hǎo piào le, búguò zhǐ mǎi dào sān zhāng wòpù piào, lìngwài yì zhāng shì yìngzuò piào.", translation: "Да, билеты уже купили. Но только 3 плацкарта, четвёртый — сидячий." },
          { speaker: "A", hanzi: "你可以上车补卧铺票，可能还有卧铺。", pinyin: "Nǐ kěyǐ shàng chē bǔ wòpù piào, kěnéng hái yǒu wòpù.", translation: "Можешь в поезде доплатить за плацкарт — возможно, ещё есть." },
          { speaker: "B", hanzi: "是吗？那太好了。", pinyin: "Shì ma? Nà tài hǎo le.", translation: "Правда? Отлично." },
          { speaker: "A", hanzi: "这个星期六我们系里有一个联欢晚会，你能来吗？", pinyin: "Zhège xīngqīliù wǒmen xì li yǒu yí ge liánhuān wǎnhuì, nǐ néng lái ma?", translation: "В субботу у нас на факультете вечеринка — придёшь?" },
          { speaker: "B", hanzi: "我们星期日下午出发，应该没问题。去参加中国学生的晚会，要准备什么东西？", pinyin: "Wǒmen xīngqīrì xiàwǔ chūfā, yīnggāi méi wèntí. Qù cānjiā Zhōngguó xuésheng de wǎnhuì, yào zhǔnbèi shénme dōngxi?", translation: "Мы в воскресенье днём уезжаем — должен успеть. А на китайской вечеринке что готовить?" },
          { speaker: "A", hanzi: "不用准备。不过，也许会让你表演一个节目。", pinyin: "Búyòng zhǔnbèi. Búguò, yěxǔ huì ràng nǐ biǎoyǎn yí ge jiémù.", translation: "Ничего готовить не надо. Но могут попросить что-то спеть." },
          { speaker: "B", hanzi: "这个……", pinyin: "Zhège...", translation: "Ну…" },
        ],
      },
    ],

    tips: [
      "火车 в Китае — главный вид транспорта между городами. Классы: 硬座 (жёсткий сидячий, дешёвый), 软座 (мягкий сидячий), 硬卧 (жёсткий плацкарт), 软卧 (мягкий купе).",
      "补票 — «доплатить за билет». Классическая китайская практика: не хватает мест — покупаешь сидячий, в поезде доплачиваешь до плацкарта (卧铺).",
      "别提了 — разговорная фраза «и не спрашивай, беда!». Используется когда случилось что-то плохое и неохота рассказывать.",
      "谦虚 — «скромный». Важная китайская добродетель. Когда хвалят, принято отвечать 哪里哪里 (что вы, что вы) или 谦虚 — преуменьшать свои достижения.",
      "联欢 + 晚会 = «вечер встреч, дружеская вечеринка». Типичное мероприятие в китайских вузах — с песнями, танцами, номерами.",
    ],
  },

  30: {
    introduction:
      "Это итоговая глава всего учебника! Вы повторите все ключевые конструкции и научитесь рассказывать о подготовке к выступлению, использовать 怕 (бояться) и эмфатическое 多……啊 («ведь это же X!»).\n\n" +
      "Ситуация: 阿曼 собирается на факультетскую вечеринку. Он решил спеть китайскую народную песню, но волнуется из-за произношения.",

    vocabulary: [
      { hanzi: "行李", pinyin: "xíngli", translation: "багаж" },
      { hanzi: "收拾", pinyin: "shōushi", translation: "собирать вещи, убирать" },
      { hanzi: "半天", pinyin: "bàntiān", translation: "полдня" },
      { hanzi: "整天", pinyin: "zhěng tiān", translation: "целый день" },
      { hanzi: "联欢会", pinyin: "liánhuānhuì", translation: "вечер встреч" },
      { hanzi: "需要", pinyin: "xūyào", translation: "нуждаться, нужно" },
      { hanzi: "英文", pinyin: "Yīngwén", translation: "английский (язык)" },
      { hanzi: "首", pinyin: "shǒu", translation: "счётное слово для песен" },
      { hanzi: "流行", pinyin: "liúxíng", translation: "популярный" },
      { hanzi: "歌曲", pinyin: "gēqǔ", translation: "песня" },
      { hanzi: "民歌", pinyin: "míngē", translation: "народная песня" },
      { hanzi: "好听", pinyin: "hǎotīng", translation: "приятный на слух" },
      { hanzi: "发音", pinyin: "fāyīn", translation: "произношение" },
      { hanzi: "懂", pinyin: "dǒng", translation: "понимать" },
      { hanzi: "熟悉", pinyin: "shúxī", translation: "знакомый, хорошо знать" },
      { hanzi: "歌词", pinyin: "gēcí", translation: "слова песни" },
      { hanzi: "标准", pinyin: "biāozhǔn", translation: "стандартный" },
      { hanzi: "面子", pinyin: "miànzi", translation: "лицо, репутация" },
      { hanzi: "光盘", pinyin: "guāngpán", translation: "диск (CD)" },
      { hanzi: "次", pinyin: "cì", translation: "раз (счётное слово)" },
      { hanzi: "怕", pinyin: "pà", translation: "бояться" },
    ],

    grammar: [
      {
        title: "多……啊 — эмфатическое «какой же X!»",
        explanation:
          "Конструкция 多……啊 выражает высокую степень с оттенком удивления/восклицания.\n\n" +
          "Схема:  多 + Прил. + 啊\n\n" +
          "多没面子啊！— Как же стыдно!\n" +
          "多好啊！— Как же хорошо!\n" +
          "多漂亮啊！— Какая же красота!\n\n" +
          "Похоже на русское «какой же X!» / «до чего же X!».\n\n" +
          "Переводится восклицательно, выражает эмоцию. Часто с риторической интонацией.",
        examples: [
          { hanzi: "可是，我的发音太不标准的话，那多没面子啊！", pinyin: "Kěshì, wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a!", translation: "Но если произношение неправильное — это же какой стыд!" },
          { hanzi: "看，那儿的风景多漂亮啊！", pinyin: "Kàn, nàr de fēngjǐng duō piàoliang a!", translation: "Смотри, какой там пейзаж красивый!" },
          { hanzi: "快考试了，学生们多紧张啊！", pinyin: "Kuài kǎoshì le, xuéshēngmen duō jǐnzhāng a!", translation: "Скоро экзамены, как же студенты нервничают!" },
        ],
      },
      {
        title: "怕 — «бояться»",
        explanation:
          "怕 (pà) — «бояться». Может быть:\n\n" +
          "1) Полным глаголом:  Подл. + 怕 + Объект\n" +
          "   我怕狗。— Боюсь собак.\n" +
          "   我不怕冷。— Я не боюсь холода.\n\n" +
          "2) Перед другим глаголом (боюсь сделать):\n" +
          "   我怕说错。— Боюсь ошибиться.\n" +
          "   你是怕表演节目吧？— Ты боишься выступать?\n\n" +
          "3) 怕 + придаточное:\n" +
          "   我怕他不来。— Боюсь, он не придёт.",
        examples: [
          { hanzi: "你是怕表演节目吧？", pinyin: "Nǐ shì pà biǎoyǎn jiémù ba?", translation: "Ты боишься выступать?" },
          { hanzi: "有点儿。", pinyin: "Yǒudiǎnr.", translation: "Немного." },
          { hanzi: "我不怕冷。", pinyin: "Wǒ bú pà lěng.", translation: "Я не боюсь холода." },
          { hanzi: "我怕他不来。", pinyin: "Wǒ pà tā bù lái.", translation: "Боюсь, он не придёт." },
        ],
      },
      {
        title: "Счётные слова 首 и 次 — для песен и раз",
        explanation:
          "• 首 (shǒu) — счётное слово для ПЕСЕН и СТИХОВ:\n" +
          "  一首歌 — одна песня\n" +
          "  一首民歌 — одна народная песня\n" +
          "  几首英文歌 — несколько английских песен\n\n" +
          "• 次 (cì) — счётное слово для РАЗ (всегда после числа, перед или после глагола):\n" +
          "  一次 — один раз\n" +
          "  两次 — два раза\n" +
          "  去过一次北京 — был один раз в Пекине\n\n" +
          "Разница с 遍: 次 — просто раз, 遍 — раз целиком от начала до конца.",
        examples: [
          { hanzi: "我不想唱英文歌，我打算唱一首中文歌。", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.", translation: "Не хочу петь на английском, спою китайскую песню." },
          { hanzi: "不，我想唱一首民歌。", pinyin: "Bù, wǒ xiǎng chàng yì shǒu míngē.", translation: "Нет, хочу народную песню." },
          { hanzi: "借来用用，也许会有帮助。", pinyin: "Jiè lái yòng yòng, yěxǔ huì yǒu bāngzhù.", translation: "Одолжу попользоваться, возможно поможет." },
        ],
      },
      {
        title: "Модальные обороты повторение: 想/要/得/会/能/可以",
        explanation:
          "Перед финалом обучения — закрепим все модальные глаголы на конкретном примере:\n\n" +
          "• 想 + V — хочу (желание):\n" +
          "  我想唱一首民歌。\n\n" +
          "• 要 + V — собираюсь (решил):\n" +
          "  我要参加联欢会。\n\n" +
          "• 得 + V — должен (обязанность):\n" +
          "  得写给朋友们贺卡。\n\n" +
          "• 会 + V — умею:\n" +
          "  会说汉语。\n\n" +
          "• 能 + V — могу (обстоятельства):\n" +
          "  他们能听懂吗？\n\n" +
          "• 可以 + V — можно (разрешение):\n" +
          "  你可以上车补票。\n\n" +
          "Все эти слова + глагол. Неправильный выбор сильно меняет смысл — запомни разницы.",
        examples: [
          { hanzi: "今天我要参加一个中国学生的联欢会。", pinyin: "Jīntiān wǒ yào cānjiā yí ge Zhōngguó xuéshēng de liánhuānhuì.", translation: "Сегодня иду на вечеринку китайских студентов." },
          { hanzi: "我不想唱英文歌，我打算唱一首中文歌。", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.", translation: "Не хочу петь английскую, спою китайскую." },
          { hanzi: "他们能听懂吗？", pinyin: "Tāmen néng tīng dǒng ma?", translation: "Они смогут понять?" },
          { hanzi: "我的同屋有中国民歌的光盘，借来用用。", pinyin: "Wǒ de tóngwū yǒu Zhōngguó míngē de guāngpán, jiè lái yòng yòng.", translation: "У моей соседки диск с китайскими песнями — одолжу попользоваться." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Перед отъездом (古丽 и 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，快要出发了，你准备好行李了吗？", pinyin: "Āmàn, kuàiyào chūfā le, nǐ zhǔnbèi hǎo xíngli le ma?", translation: "Аман, скоро выезжаем, собрал вещи?" },
          { speaker: "B", hanzi: "我昨天收拾了半天，早就准备好了。", pinyin: "Wǒ zuótiān shōushi le bàntiān, zǎo jiù zhǔnbèi hǎo le.", translation: "Вчера полдня собирал — давно готов." },
          { speaker: "A", hanzi: "那你整天在房间里干什么？", pinyin: "Nà nǐ zhěng tiān zài fángjiān li gàn shénme?", translation: "А целый день в комнате что делал?" },
          { speaker: "B", hanzi: "今天我要参加一个中国学生的联欢会，正在准备节目呢。", pinyin: "Jīntiān wǒ yào cānjiā yí ge Zhōngguó xuéshēng de liánhuānhuì, zhèngzài zhǔnbèi jiémù ne.", translation: "Сегодня иду на вечеринку китайских студентов, готовлю номер." },
          { speaker: "A", hanzi: "你唱歌唱得那么好，还需要准备吗？", pinyin: "Nǐ chàng gē chàng de nàme hǎo, hái xūyào zhǔnbèi ma?", translation: "Ты же так хорошо поёшь, зачем готовиться?" },
          { speaker: "B", hanzi: "我不想唱英文歌，我打算唱一首中文歌。", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.", translation: "Не хочу на английском — спою китайскую." },
          { speaker: "A", hanzi: "好极了。你打算唱流行歌曲吗？", pinyin: "Hǎo jí le. Nǐ dǎsuàn chàng liúxíng gēqǔ ma?", translation: "Отлично. Популярную?" },
          { speaker: "B", hanzi: "不，我想唱一首民歌。", pinyin: "Bù, wǒ xiǎng chàng yì shǒu míngē.", translation: "Нет, народную." },
          { speaker: "A", hanzi: "民歌？民歌很好听啊。", pinyin: "Míngē? Míngē hěn hǎotīng a.", translation: "Народную? Это хорошо." },
          { speaker: "B", hanzi: "我的发音不太好，他们能听懂吗？", pinyin: "Wǒ de fāyīn bú tài hǎo, tāmen néng tīng dǒng ma?", translation: "У меня произношение не очень — поймут?" },
          { speaker: "A", hanzi: "如果是有名的民歌，他们一定很熟悉歌词，没问题吧。", pinyin: "Rúguǒ shì yǒumíng de míngē, tāmen yídìng hěn shúxī gēcí, méi wèntí ba.", translation: "Если народная известная — слова все знают, всё будет ок." },
          { speaker: "B", hanzi: "可是，我的发音太不标准的话，那多没面子啊！", pinyin: "Kěshì, wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a!", translation: "А если произношение совсем плохое — стыд-то какой!" },
          { speaker: "A", hanzi: "我的同屋有中国民歌的光盘，借来用用，也许会有帮助。", pinyin: "Wǒ de tóngwū yǒu Zhōngguó míngē de guāngpán, jiè lái yòng yòng, yěxǔ huì yǒu bāngzhù.", translation: "У моей соседки диск с народными песнями — одолжу, может поможет." },
          { speaker: "B", hanzi: "谢谢！你今天有空儿吗？和我一起去怎么样？", pinyin: "Xièxie! Nǐ jīntiān yǒu kòngr ma? Hé wǒ yìqǐ qù zěnmeyàng?", translation: "Спасибо! У тебя сегодня есть время? Пойдём вместе?" },
          { speaker: "A", hanzi: "我还没准备好行李呢，下次吧！", pinyin: "Wǒ hái méi zhǔnbèi hǎo xíngli ne, xià cì ba!", translation: "Я ещё не собралась, в другой раз!" },
          { speaker: "B", hanzi: "你是怕表演节目吧？", pinyin: "Nǐ shì pà biǎoyǎn jiémù ba?", translation: "Ты боишься выступать?" },
          { speaker: "A", hanzi: "有点儿。", pinyin: "Yǒudiǎnr.", translation: "Немного." },
        ],
      },
    ],

    tips: [
      "民歌 (míngē) — народная песня. Очень популярный жанр в Китае. Знаменитые песни: 茉莉花 (Цветок жасмина), 康定情歌 (Любовная песня Кандина). Идеально для изучения китайского.",
      "面子 (miànzi) — «лицо, репутация». Центральное понятие китайской культуры. 没面子 — потерять лицо, опозориться. 给面子 — уважить (дать лицо). Важная концепция в деловых отношениях.",
      "光盘 — CD/DVD. В эпоху стриминга слово устаревает, но в учебнике 2012 года актуальное. Сейчас чаще скажут 下载 (скачать) или просто 听音乐.",
      "发音 (произношение) — одна из самых сложных частей китайского. Тоны (声调) + правильная артикуляция. Без них тебя не поймут, даже если иероглифы правильные.",
      "Поздравляю с завершением Boya Chinese Elementary 1! 30 глав, 700+ слов, все базовые грамматические структуры. Следующий уровень — Boya Chinese Elementary 2 (главы 31-60).",
    ],
  },
};
