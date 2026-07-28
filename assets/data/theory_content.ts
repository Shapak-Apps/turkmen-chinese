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
      "Bu bapda siz hytaý dilinde salamlaşmagy, öz-özüňi tanyşdyrmagy we iň ýönekeý söhbetdeşlik geçirmegi öwrenersiňiz. Esasy grammatika düzgüni — 是 (shì — bolmak) işlikli sözlemler we 吗 (ma) bölejigi bilen soraglar.\n\n" +
      "Gahrymanlar: 阿曼 (Āmàn) — Pekine okamaga täze gelen türkmen talyby, 张伟 (Zhāng Wěi) — hytaýly kursdaşy, 李老师 (Lǐ lǎoshī) — hytaý dili mugallymy.",

    vocabulary: [
      { hanzi: "你好", pinyin: "nǐ hǎo", translation: "salam" },
      { hanzi: "好", pinyin: "hǎo", translation: "gowy, ýagşy" },
      { hanzi: "你", pinyin: "nǐ", translation: "sen" },
      { hanzi: "是", pinyin: "shì", translation: "bolmak; hawa" },
      { hanzi: "老师", pinyin: "lǎoshī", translation: "mugallym" },
      { hanzi: "吗", pinyin: "ma", translation: "sorag bölejigi" },
      { hanzi: "不", pinyin: "bù", translation: "däl, ýok" },
      { hanzi: "我", pinyin: "wǒ", translation: "men" },
      { hanzi: "学生", pinyin: "xuésheng", translation: "talyp, okuwçy" },
      { hanzi: "她", pinyin: "tā", translation: "ol (aýal)" },
      { hanzi: "谢谢", pinyin: "xièxie", translation: "sag bol, minnetdar" },
      { hanzi: "不客气", pinyin: "bú kèqi", translation: "hiç zat däl, arzuw etme" },
      { hanzi: "您", pinyin: "nín", translation: "Siz (hormatly görnüş)" },
      { hanzi: "留学生", pinyin: "liúxuéshēng", translation: "daşary ýurtly talyp" },
      { hanzi: "叫", pinyin: "jiào", translation: "çagyrmak, atlandyrmak" },
      { hanzi: "什么", pinyin: "shénme", translation: "näme, haýsy" },
      { hanzi: "名字", pinyin: "míngzi", translation: "at" },
    ],

    grammar: [
      {
        title: "«是» 字句 — 是 bilen sözlemler",
        explanation:
          "是 (shì) — «bolmak» işligi. Bu «men talyp», «ol mugallym» ýaly sözlemler üçin esasy işlikdir.\n\n" +
          "Tassyklama:  Eýe + 是 + At\n" +
          "Inkär:  Eýe + 不 + 是 + At\n" +
          "Sorag:  Eýe + 是 + At + 吗？\n\n" +
          "Üns beriň: inkärde 不是 «bú shì» diýlip aýdylýar (不 4-nji tonuň öňünde tonuny üýtgedýär).",
        examples: [
          { hanzi: "我是老师。", pinyin: "Wǒ shì lǎoshī.", translation: "Men mugallym." },
          { hanzi: "她是学生。", pinyin: "Tā shì xuésheng.", translation: "Ol talyp." },
          { hanzi: "我不是老师。", pinyin: "Wǒ bú shì lǎoshī.", translation: "Men mugallym däl." },
          { hanzi: "我不是留学生。", pinyin: "Wǒ bú shì liúxuéshēng.", translation: "Men daşary ýurtly talyp däl." },
          { hanzi: "你是老师吗？", pinyin: "Nǐ shì lǎoshī ma?", translation: "Sen mugallymmy?" },
          { hanzi: "阿曼是留学生吗？", pinyin: "Āmàn shì liúxuéshēng ma?", translation: "Aman daşary ýurtly talypmy?" },
        ],
      },
      {
        title: "用「吗」的疑问句 — 吗 bölejigi bilen soraglar",
        explanation:
          "Tassyklamany «hawa/ýok» soragyna öwürmek üçin, diňe sözlemiň soňuna 吗 goşuň. Söz tertibi üýtgemeýär!\n\n" +
          "Tassyklama → Sorag:\n" +
          "你好。→ 你好吗？\n" +
          "他是老师。→ 他是老师吗？\n\n" +
          "Bu hytaý dilinde sorag bermegiň iň ýönekeý usulydyr.",
        examples: [
          { hanzi: "你好吗？", pinyin: "Nǐ hǎo ma?", translation: "Ýagdaýlaryň nähili? (söz. «Sen gowumy?»)" },
          { hanzi: "阿曼是留学生吗？", pinyin: "Āmàn shì liúxuéshēng ma?", translation: "Aman daşary ýurtly talypmy?" },
          { hanzi: "她不是老师吗？", pinyin: "Tā bú shì lǎoshī ma?", translation: "Ol mugallym dälmi?" },
          { hanzi: "他叫张伟吗？", pinyin: "Tā jiào Zhāng Wěi ma?", translation: "Onuň ady Zhang Weými?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Umumy ýaşaýyş jaýynda tanyşlyk (阿曼 we 张伟)",
        lines: [
          { speaker: "A", hanzi: "你好！我叫阿曼。", pinyin: "Nǐ hǎo! Wǒ jiào Āmàn.", translation: "Salam! Meniň adym Aman." },
          { speaker: "B", hanzi: "你好，阿曼！", pinyin: "Nǐ hǎo, Āmàn!", translation: "Salam, Aman!" },
          { speaker: "A", hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", translation: "Adyň näme?" },
          { speaker: "B", hanzi: "我叫张伟。", pinyin: "Wǒ jiào Zhāng Wěi.", translation: "Meniň adym Zhang Wei." },
          { speaker: "A", hanzi: "你是学生吗？", pinyin: "Nǐ shì xuésheng ma?", translation: "Sen talypmy?" },
          { speaker: "B", hanzi: "是，我是学生。", pinyin: "Shì, wǒ shì xuésheng.", translation: "Hawa, men talyp." },
          { speaker: "A", hanzi: "我是留学生。谢谢！", pinyin: "Wǒ shì liúxuéshēng. Xièxie!", translation: "Men bolsa daşary ýurtly talyp. Sag bol!" },
          { speaker: "B", hanzi: "不客气。", pinyin: "Bú kèqi.", translation: "Hiç zat däl." },
        ],
      },
      {
        title: "Ilkinji sapakda (阿曼 we 李老师)",
        lines: [
          { speaker: "A", hanzi: "老师，您好！", pinyin: "Lǎoshī, nín hǎo!", translation: "Salam, mugallym!" },
          { speaker: "B", hanzi: "你好！你叫什么名字？", pinyin: "Nǐ hǎo! Nǐ jiào shénme míngzi?", translation: "Salam! Adyň näme?" },
          { speaker: "A", hanzi: "我叫阿曼。我是留学生。", pinyin: "Wǒ jiào Āmàn. Wǒ shì liúxuéshēng.", translation: "Meniň adym Aman. Men daşary ýurtly talyp." },
          { speaker: "B", hanzi: "阿曼，你好。", pinyin: "Āmàn, nǐ hǎo.", translation: "Aman, salam." },
          { speaker: "A", hanzi: "老师，谢谢您！", pinyin: "Lǎoshī, xièxie nín!", translation: "Mugallym, size minnetdar!" },
          { speaker: "B", hanzi: "不客气。", pinyin: "Bú kèqi.", translation: "Hiç zat däl." },
        ],
      },
    ],

    tips: [
      "您 (nín) — «siz» hormatly görnüşi. Mugallymlara, ýaşulylara, tanamaýan adamlara ýüzlenende ulanyň. Adaty söhbetdeşlikde 你 (nǐ) ýeterlik.",
      "«Meniň adym...» diýmek üçin 我叫... (wǒ jiào...) ulanyň. Ady soramak üçin — 你叫什么名字？(nǐ jiào shénme míngzi?).",
      "不 adatça 4-nji ton bilen aýdylýar (bù), emma başga 4-nji tonuň öňünde 2-nji tona öwrülýär: 不是 → bú shì.",
      "Aýdylyşyny eşitmek üçin iýeroglifleriň we mysallaryň üstüne basyň.",
    ],
  },

  2: {
    introduction:
      "Bu bapda siz nireden bolýandygyňyzy gürrüň bermegi we söhbetdeşiňiziň milletini soramagy öwrenersiňiz. Köplük san goşulmasy 们, «hem» manysyndaky 也 hal-sözi we gysga garşylykly soraglar üçin 呢 sorag bölejigi bilen tanşarsyňyz.\n\n" +
      "Gahrymanlar: 王老师 (Wáng lǎoshī) — 王明 (Wáng Míng) atly mugallym, 阿曼 (Āmàn) — türkmen talyby, 古丽 (Gǔlì) — kanadaly talyp gyz, 张伟 (Zhāng Wěi) — hytaýly kursdaş.",

    vocabulary: [
      { hanzi: "同学", pinyin: "tóngxué", translation: "synpdaş, kursdaş" },
      { hanzi: "们", pinyin: "men", translation: "köplük san goşulmasy (adamlar üçin)" },
      { hanzi: "来", pinyin: "lái", translation: "gelmek; (bu ýerde) häzir, häzir men..." },
      { hanzi: "介绍", pinyin: "jièshào", translation: "tanyşdyrmak" },
      { hanzi: "一下儿", pinyin: "yíxiàr", translation: "azajyk, birneme (hereketi ýumşadýar)" },
      { hanzi: "姓", pinyin: "xìng", translation: "familiýa; familiýasy bolmak" },
      { hanzi: "的", pinyin: "de", translation: "degişlilik bölejigi (≈ «-yň», «kimiň»)" },
      { hanzi: "哪", pinyin: "nǎ", translation: "haýsy" },
      { hanzi: "国", pinyin: "guó", translation: "ýurt" },
      { hanzi: "人", pinyin: "rén", translation: "adam" },
      { hanzi: "他", pinyin: "tā", translation: "ol (erkek)" },
      { hanzi: "认识", pinyin: "rènshi", translation: "tanyşmak, tanamak (kimdir birini)" },
      { hanzi: "很", pinyin: "hěn", translation: "örän" },
      { hanzi: "高兴", pinyin: "gāoxìng", translation: "şat, begençli" },
      { hanzi: "也", pinyin: "yě", translation: "hem, şeýle hem" },
      { hanzi: "呢", pinyin: "ne", translation: "garşylykly sorag bölejigi (a sen?)" },
      { hanzi: "朋友", pinyin: "péngyou", translation: "dost" },
      { hanzi: "王明", pinyin: "Wáng Míng", translation: "Wan Min (at)" },
      { hanzi: "美国", pinyin: "Měiguó", translation: "Amerika, ABŞ" },
      { hanzi: "古丽", pinyin: "Gǔlì", translation: "Gülnara (at)" },
      { hanzi: "加拿大", pinyin: "Jiānádà", translation: "Kanada" },
      { hanzi: "中国", pinyin: "Zhōngguó", translation: "Hytaý" },
      { hanzi: "土库曼斯坦", pinyin: "Tǔkùmànsītǎn", translation: "Türkmenistan" },
    ],

    grammar: [
      {
        title: "们 goşulmasy — köplük san",
        explanation:
          "们 (men) adamlary aňladýan çalyşmalara we atlara olary köplük sana öwürmek üçin goşulýar.\n\n" +
          "Çalyşma + 们:\n" +
          "我 (men) → 我们 (biz)\n" +
          "你 (sen) → 你们 (siz)\n" +
          "他/她 (ol) → 他们/她们 (olar)\n\n" +
          "At (adamlar) + 们:\n" +
          "老师 → 老师们 (mugallymlar)\n" +
          "同学 → 同学们 (synpdaşlar)\n\n" +
          "Möhüm: 们 DIŇE adamlar bilen ulanylýar. 书们 (kitaplar) diýip bolmaýar — zatlar üçin köplük san görkezilmeýär.",
        examples: [
          { hanzi: "同学们好！", pinyin: "Tóngxuémen hǎo!", translation: "Salam, synpdaşlar!" },
          { hanzi: "我们是留学生。", pinyin: "Wǒmen shì liúxuéshēng.", translation: "Biz daşary ýurtly talyplar." },
          { hanzi: "你们是老师吗？", pinyin: "Nǐmen shì lǎoshī ma?", translation: "Siz mugallymmy?" },
          { hanzi: "他们不是中国人。", pinyin: "Tāmen bú shì Zhōngguó rén.", translation: "Olar hytaýly däl." },
        ],
      },
      {
        title: "也 hal-sözi — «hem»",
        explanation:
          "也 (yě — «hem, şeýle hem») işligiň ýa-da sypatyň öňünde goýulýar we meňzeşligi görkezýär.\n\n" +
          "Shema: Eýe + 也 + Işlik/Sypat.\n\n" +
          "Möhüm: 也 sözlemiň soňuna goýulmaýar, hemişe habaryň (işligiň) öňünde durýar.\n\n" +
          "❌ Nädogry: 我是学生也。\n" +
          "✅ Dogry: 我也是学生。",
        examples: [
          { hanzi: "他是学生，我也是学生。", pinyin: "Tā shì xuésheng, wǒ yě shì xuésheng.", translation: "Ol talyp, men hem talyp." },
          { hanzi: "我也很高兴。", pinyin: "Wǒ yě hěn gāoxìng.", translation: "Men hem örän şat." },
          { hanzi: "张伟是中国人，王明也是中国人。", pinyin: "Zhāng Wěi shì Zhōngguó rén, Wáng Míng yě shì Zhōngguó rén.", translation: "Zhang Wei hytaýly, Wan Min hem hytaýly." },
          { hanzi: "你不是老师，他也不是老师。", pinyin: "Nǐ bú shì lǎoshī, tā yě bú shì lǎoshī.", translation: "Sen mugallym däl, ol hem mugallym däl." },
        ],
      },
      {
        title: "呢 bölejigi — garşylykly sorag «A sen?»",
        explanation:
          "呢 (ne) gysga garşylykly soragyň soňuna goýulýar. Bu gysgaltma: tutuş soragy gaýtalamagyň ýerine — 呢 goşýarsyň.\n\n" +
          "Shema: At/Çalyşma + 呢？\n\n" +
          "呢-niň manysy öňki sözlemiň kontekstinden alynýar:\n" +
          "• Öň at hakda soralan bolsa → 你呢？ = «A seniň adyň näme?»\n" +
          "• Millet hakda bolsa → 你呢？ = «A sen nireden?»\n" +
          "• Kär hakda bolsa → 你呢？ = «A sen (kim bolup işleýärsiň)?»",
        examples: [
          { hanzi: "我是美国人，你呢？", pinyin: "Wǒ shì Měiguó rén, nǐ ne?", translation: "Men amerikaly, a sen? (haýsy ýurtdan?)" },
          { hanzi: "我叫阿曼，她呢？", pinyin: "Wǒ jiào Āmàn, tā ne?", translation: "Meniň adym Aman, a onuň (aýalyň) ady näme?" },
          { hanzi: "我很高兴，你呢？", pinyin: "Wǒ hěn gāoxìng, nǐ ne?", translation: "Men örän şat, a sen?" },
          { hanzi: "他是老师，你呢？", pinyin: "Tā shì lǎoshī, nǐ ne?", translation: "Ol mugallym, a sen?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Mugallym bilen tanyşlyk (王老师 we talyplar)",
        lines: [
          { speaker: "A", hanzi: "同学们好！", pinyin: "Tóngxuémen hǎo!", translation: "Salam, synpdaşlar!" },
          { speaker: "B", hanzi: "老师好！", pinyin: "Lǎoshī hǎo!", translation: "Salam, mugallym!" },
          { speaker: "A", hanzi: "我来介绍一下儿。我姓王，叫王明，是你们的老师。你叫什么名字？", pinyin: "Wǒ lái jièshào yíxiàr. Wǒ xìng Wáng, jiào Wáng Míng, shì nǐmen de lǎoshī. Nǐ jiào shénme míngzi?", translation: "Häzir özümi tanyşdyraýyn. Meniň familiýam Wan, adym Wan Min, men siziň mugallymyňyz. Adyň näme?" },
          { speaker: "B", hanzi: "我叫阿曼。", pinyin: "Wǒ jiào Āmàn.", translation: "Meniň adym Aman." },
          { speaker: "A", hanzi: "你是哪国人？", pinyin: "Nǐ shì nǎ guó rén?", translation: "Sen haýsy ýurtdan?" },
          { speaker: "B", hanzi: "我是土库曼斯坦人。", pinyin: "Wǒ shì Tǔkùmànsītǎn rén.", translation: "Men Türkmenistandan." },
        ],
      },
      {
        title: "Naharhanada tanyşlyk (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "你好！我叫阿曼。", pinyin: "Nǐ hǎo! Wǒ jiào Āmàn.", translation: "Salam! Meniň adym Aman." },
          { speaker: "B", hanzi: "你好！我叫古丽。认识你很高兴。", pinyin: "Nǐ hǎo! Wǒ jiào Gǔlì. Rènshi nǐ hěn gāoxìng.", translation: "Salam! Meniň adym Gülnara. Tanyşanyma örän şat." },
          { speaker: "A", hanzi: "我也很高兴。你是哪国人？", pinyin: "Wǒ yě hěn gāoxìng. Nǐ shì nǎ guó rén?", translation: "Maňa-da örän ýakymly. Sen haýsy ýurtdan?" },
          { speaker: "B", hanzi: "我是加拿大人。你呢？", pinyin: "Wǒ shì Jiānádà rén. Nǐ ne?", translation: "Men kanadaly. A sen?" },
          { speaker: "A", hanzi: "我是土库曼斯坦人。", pinyin: "Wǒ shì Tǔkùmànsītǎn rén.", translation: "Men Türkmenistandan." },
          { speaker: "B", hanzi: "张伟也是我们的同学。他是中国人。", pinyin: "Zhāng Wěi yě shì wǒmen de tóngxué. Tā shì Zhōngguó rén.", translation: "Zhang Wei hem biziň kursdaşymyz. Ol hytaýly." },
        ],
      },
    ],

    tips: [
      "«Millet» formulasy: 哪国人？(haýsy ýurtdan?) → Ýurt + 人: 美国人 (amerikaly), 中国人 (hytaýly), 加拿大人 (kanadaly). Islendik ýurt üçin şeýle: 俄罗斯人 (rus), 土库曼人 (türkmen).",
      "我来介绍一下儿 — kimdir birini tanyşdyrmazdan öňki edepli sözbaşy. Söz. «men häzir birneme tanyşdyraýyn». 一下儿 hereketi ýumşadýar, ony ýeňilleşdirýär.",
      "姓 we 叫 tapawudy: 姓 — diňe familiýa (我姓刘), 叫 — doly at ýa-da at (我叫王明). 我姓王明 diýip bolmaýar.",
      "认识 vs 知道: ikisi hem «bilmek» diýlip terjime edilýär, emma 认识 — adam bilen şahsy tanyşlyk hakda, 知道 — bir fakty bilmek. «Men ony şahsy tanaýaryn» = 我认识他.",
    ],
  },

  3: {
    introduction:
      "Bu bapda siz zatlary görkezmegi («bu», «ol»), 谁 (kim) we 什么 (näme) sözleri bilen sorag bermegi, şeýle-de degişliligi görkezmek üçin 的 bölejigini ulanmagy öwrenersiňiz («kimiň?», «meniň kitabym»).\n\n" +
      "Gahrymanlar: 阿曼, 古丽 (kitap we sözlük hakda gürleşýärler), 中村 (Zhōngcūn) — ýaponly talyp, olar ýapon saz žurnaly hakda gürleşýärler.",

    vocabulary: [
      { hanzi: "那", pinyin: "nà", translation: "ol, şol" },
      { hanzi: "谁", pinyin: "shéi / shuí", translation: "kim" },
      { hanzi: "书", pinyin: "shū", translation: "kitap" },
      { hanzi: "同屋", pinyin: "tóngwū", translation: "otagdaş" },
      { hanzi: "汉语", pinyin: "Hànyǔ", translation: "hytaý dili" },
      { hanzi: "课本", pinyin: "kèběn", translation: "okuw kitaby" },
      { hanzi: "词典", pinyin: "cídiǎn", translation: "sözlük" },
      { hanzi: "就是", pinyin: "jiùshì", translation: "ýagny, diýmek (düşündiriş üçin)" },
      { hanzi: "日语", pinyin: "Rìyǔ", translation: "ýapon dili" },
      { hanzi: "这", pinyin: "zhè", translation: "bu, şu" },
      { hanzi: "杂志", pinyin: "zázhì", translation: "žurnal" },
      { hanzi: "音乐", pinyin: "yīnyuè", translation: "saz, musyka" },
      { hanzi: "汉日词典", pinyin: "Hàn-Rì Cídiǎn", translation: "Hytaý-ýapon sözlügi" },
      { hanzi: "中村", pinyin: "Zhōngcūn", translation: "Nakamura (ýapon familiýasy)" },
      { hanzi: "日本", pinyin: "Rìběn", translation: "Ýaponiýa" },
    ],

    grammar: [
      {
        title: "Görkezme çalyşmalary 这 / 那",
        explanation:
          "这 (zhè) — «bu» (gepleýäne ýakyn zat).\n" +
          "那 (nà) — «ol» (has uzakdaky zat).\n\n" +
          "Shema: 这/那 + 是 + At\n\n" +
          "Köplenç degişliligi görkezmek üçin 的 bilen bile ulanylýar:\n" +
          "这是我的书。— Bu meniň kitabym.\n" +
          "那是老师的词典。— Ol sözlük mugallymyňky.\n\n" +
          "Inkärde: 这/那 + 不是 + ...",
        examples: [
          { hanzi: "这是汉语课本。", pinyin: "Zhè shì Hànyǔ kèběn.", translation: "Bu hytaý dili okuw kitaby." },
          { hanzi: "那是音乐杂志。", pinyin: "Nà shì yīnyuè zázhì.", translation: "Ol saz žurnaly." },
          { hanzi: "这是老师的书。", pinyin: "Zhè shì lǎoshī de shū.", translation: "Bu mugallymyň kitaby." },
          { hanzi: "那不是我的词典。", pinyin: "Nà bú shì wǒ de cídiǎn.", translation: "Ol sözlük meniňki däl." },
        ],
      },
      {
        title: "的 bölejigi — degişlilik we kesgitleme",
        explanation:
          "的 (de) kesgitleme bilen kesgitlenýän sözüň arasynda goýulýar. Tertip HEMIŞE: kesgitleme + 的 + esasy söz.\n\n" +
          "Shema: A + 的 + B  =  «A-a degişli/degişli bolan B»\n\n" +
          "我的书 — meniň kitabym\n" +
          "老师的词典 — mugallymyň sözlügi\n" +
          "古丽的朋友 — Gülnaranyň dosty\n\n" +
          "我/你/他 çalyşmalary hem-de ýakyn garyndaşlar/dostlar bilen 的 taşlanyp bilner: 我朋友 (meniň dostum), 我同屋 (meniň otagdaşym). Emma adaty zatlar bilen 的 hökman: 我的书, 我的词典.",
        examples: [
          { hanzi: "这是我的课本。", pinyin: "Zhè shì wǒ de kèběn.", translation: "Bu meniň okuw kitabym." },
          { hanzi: "那是谁的书？", pinyin: "Nà shì shéi de shū?", translation: "Bu kimiň kitaby?" },
          { hanzi: "那是我同屋的书。", pinyin: "Nà shì wǒ tóngwū de shū.", translation: "Ol kitap meniň otagdaşymyňky." },
          { hanzi: "她是我朋友的同屋。", pinyin: "Tā shì wǒ péngyou de tóngwū.", translation: "Ol (aýal) meniň dostumyň otagdaşy." },
        ],
      },
      {
        title: "谁 / 什么 bilen ýörite soraglar",
        explanation:
          "Hytaýçada sorag sözleri jogabyň durmaly ÝERINE goýulýar. Soragda we tassyklamada söz tertibi birmeňzeş — rusça/iňlisçe ýaly hiç hili ýer çalyşma ýok.\n\n" +
          "谁 (shéi) — «kim / kimiň»\n" +
          "什么 (shénme) — «näme / haýsy»\n\n" +
          "Tassyklama: 那是我的书。\n" +
          "Sorag:  那是谁的书？ («我» ýerine 谁 goýulýar)\n\n" +
          "Tassyklama: 这是课本。\n" +
          "Sorag: 这是什么？ («课本» ýerine 什么 goýulýar)\n\n" +
          "吗 bilen beýle soraglar ULANYLMAÝAR — 那是谁的书吗？ diýip bolmaýar.",
        examples: [
          { hanzi: "那是谁？", pinyin: "Nà shì shéi?", translation: "Ol kim (ol ýerde)?" },
          { hanzi: "这是什么？", pinyin: "Zhè shì shénme?", translation: "Bu näme?" },
          { hanzi: "这是什么书？", pinyin: "Zhè shì shénme shū?", translation: "Bu haýsy kitap?" },
          { hanzi: "那是谁的词典？", pinyin: "Nà shì shéi de cídiǎn?", translation: "Bu kimiň sözlügi?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Bu kimiň kitaby? (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，那是谁的书？是你的书吗？", pinyin: "Gǔlì, nà shì shéi de shū? Shì nǐ de shū ma?", translation: "Gülnara, bu kimiň kitaby? Seniňkimi?" },
          { speaker: "B", hanzi: "不是，那是我同屋的书。", pinyin: "Bú shì, nà shì wǒ tóngwū de shū.", translation: "Ýok, bu meniň otagdaşymyň kitaby." },
          { speaker: "A", hanzi: "是汉语课本吗？", pinyin: "Shì Hànyǔ kèběn ma?", translation: "Bu hytaý dili okuw kitabymy?" },
          { speaker: "B", hanzi: "不是，是《汉日词典》。", pinyin: "Bú shì, shì «Hàn-Rì Cídiǎn».", translation: "Ýok, bu «Hytaý-ýapon sözlügi»." },
          { speaker: "A", hanzi: "什么词典？", pinyin: "Shénme cídiǎn?", translation: "Haýsy sözlük?" },
          { speaker: "B", hanzi: "《汉日词典》，就是汉语、日语词典。", pinyin: "«Hàn-Rì Cídiǎn», jiù shì Hànyǔ, Rìyǔ cídiǎn.", translation: "«Hytaý-ýapon», ýagny hytaý we ýapon dili sözlügi." },
        ],
      },
      {
        title: "Bu haýsy žurnal? (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "这是什么杂志？", pinyin: "Zhè shì shénme zázhì?", translation: "Bu haýsy žurnal?" },
          { speaker: "B", hanzi: "音乐杂志。", pinyin: "Yīnyuè zázhì.", translation: "Saz žurnaly." },
          { speaker: "A", hanzi: "是日本的杂志吗？", pinyin: "Shì Rìběn de zázhì ma?", translation: "Ýaponmy?" },
          { speaker: "B", hanzi: "是，是日本的杂志。", pinyin: "Shì, shì Rìběn de zázhì.", translation: "Hawa, ýapon žurnaly." },
          { speaker: "A", hanzi: "是你的吗？", pinyin: "Shì nǐ de ma?", translation: "Seniňkimi?" },
          { speaker: "B", hanzi: "不是，是我朋友的。", pinyin: "Bú shì, shì wǒ péngyou de.", translation: "Ýok, dostumyňky." },
        ],
      },
    ],

    tips: [
      "的-dan soň at kontekstden düşnükli bolsa taşlanyp bilner: 是我的 («bu meniňki»), 是朋友的 («bu dostuňky»). Aýratyn hem jogaplarda köp ulanylýar: A: 是你的书吗？ B: 不，是我朋友的。",
      "谁 «shéi» hem, «shuí» hem okalýar — ikisi hem dogry, emma gepleşikde köplenç «shéi».",
      "就是 düşündiriş ýa-da anyklama üçin ulanylýar: «bu diýmek», «ýagny». Düşnüksiz sözi düşündirmek islänňde peýdaly: X，就是 Y — «X, ýagny Y».",
      "Ýakyn gatnaşyklar — 的-syz: 我朋友, 我同屋, 我老师, 我爸爸 (meniň kakam). Zatlar/düşünjeler bilen — 的 bilen: 我的书, 我的杂志, 我的名字.",
    ],
  },

  4: {
    introduction:
      "Bu bapda siz bir zadyň nirede ýerleşýändigini soramagy we ýerleşişini beýan etmegi öwrenersiňiz. 在 (zài — ýerleşmek) işligi, 哪儿 (nirede) sorag sözi we ugur sözleri bilen tanşarsyňyz: 东/西/南/北/左/右 + 边.\n\n" +
      "Ýagdaý: 古丽 uniwersitet çäginde kitaphanany gözleýär we duşýan talyplardan soraýar.",

    vocabulary: [
      { hanzi: "请问", pinyin: "qǐngwèn", translation: "bagyşlaň, sorasam bolarmy" },
      { hanzi: "图书馆", pinyin: "túshūguǎn", translation: "kitaphana" },
      { hanzi: "在", pinyin: "zài", translation: "ýerleşmek (bir ýerde)" },
      { hanzi: "哪儿", pinyin: "nǎr", translation: "nirede" },
      { hanzi: "对不起", pinyin: "duìbuqǐ", translation: "bagyşlaň" },
      { hanzi: "个", pinyin: "gè", translation: "sanaýyş sözi (ählumumy)" },
      { hanzi: "学校", pinyin: "xuéxiào", translation: "mekdep, okuw jaýy" },
      { hanzi: "知道", pinyin: "zhīdào", translation: "bilmek (fakty)" },
      { hanzi: "没关系", pinyin: "méi guānxi", translation: "hiç zat däl, möhüm däl" },
      { hanzi: "这儿", pinyin: "zhèr", translation: "şu ýerde" },
      { hanzi: "教学", pinyin: "jiàoxué", translation: "okuw, sapak bermek" },
      { hanzi: "楼", pinyin: "lóu", translation: "bina, jaý" },
      { hanzi: "那儿", pinyin: "nàr", translation: "ol ýerde" },
      { hanzi: "宿舍", pinyin: "sùshè", translation: "umumy ýaşaýyş jaýy" },
      { hanzi: "北边", pinyin: "běibian", translation: "demirgazyk tarap, demirgazyga" },
      { hanzi: "左边", pinyin: "zuǒbian", translation: "çep tarap, çepde" },
      { hanzi: "右边", pinyin: "yòubian", translation: "sag tarap, sagda" },
      { hanzi: "不用谢", pinyin: "búyòng xiè", translation: "minnetdarlyga zerurlyk ýok" },
      { hanzi: "不用", pinyin: "búyòng", translation: "gerek däl, hökman däl" },
      { hanzi: "东边", pinyin: "dōngbian", translation: "gündogar tarap" },
      { hanzi: "西边", pinyin: "xībian", translation: "günbatar tarap" },
      { hanzi: "南边", pinyin: "nánbian", translation: "günorta tarap" },
    ],

    grammar: [
      {
        title: "在 işligi — bir ýerde ýerleşmek",
        explanation:
          "在 (zài) — «ýerleşmek, bir ýerde bolmak» işligi. Zadyň ýa-da adamyň ýerleşişini görkezmek üçin ulanylýar.\n\n" +
          "Shema 1:  Eýe + 在 + Ýer\n" +
          "图书馆在那儿。— Kitaphana ol ýerde ýerleşýär.\n" +
          "我在学校。— Men mekdepde.\n\n" +
          "Shema 2 (ters tertip):  Ýer + 是 + Eýe\n" +
          "那儿是图书馆。— Ol ýer — kitaphana.\n" +
          "教学楼的北边是图书馆。— Okuw binasynyň demirgazyk tarapynda — kitaphana.\n\n" +
          "Inkär: 不在 (bú zài) — 图书馆不在这儿。",
        examples: [
          { hanzi: "图书馆在哪儿？", pinyin: "Túshūguǎn zài nǎr?", translation: "Kitaphana nirede ýerleşýär?" },
          { hanzi: "图书馆在宿舍楼的北边。", pinyin: "Túshūguǎn zài sùshèlóu de běibian.", translation: "Kitaphana umumy ýaşaýyş jaýynyň demirgazygynda." },
          { hanzi: "加拿大在美国的北边。", pinyin: "Jiānádà zài Měiguó de běibian.", translation: "Kanada ABŞ-nyň demirgazygynda." },
          { hanzi: "日本在中国的东边。", pinyin: "Rìběn zài Zhōngguó de dōngbian.", translation: "Ýaponiýa Hytaýyň gündogarynda." },
        ],
      },
      {
        title: "哪儿 sorag sözi — nirede",
        explanation:
          "哪儿 (nǎr) — «nirede». Jogabyň durmaly ýerine goýulýar (ýagny 在-dan soň).\n\n" +
          "Shema: Eýe + 在 + 哪儿？\n\n" +
          "Jogap: Eýe + 在 + anyk ýer\n\n" +
          "Möhüm: sorag sözleri bilen (哪儿, 谁, 什么) 吗 ULANYLMAÝAR.\n" +
          "❌ 图书馆在哪儿吗？\n" +
          "✅ 图书馆在哪儿？\n\n" +
          "Toplum: 这儿 (şu ýerde) / 那儿 (ol ýerde) / 哪儿 (nirede) — birinji iýeroglife görä ugur al: 这=bu, 那=ol, 哪=haýsy.",
        examples: [
          { hanzi: "你的书在哪儿？", pinyin: "Nǐ de shū zài nǎr?", translation: "Seniň kitabyň nirede?" },
          { hanzi: "老师在哪儿？", pinyin: "Lǎoshī zài nǎr?", translation: "Mugallym nirede?" },
          { hanzi: "你们的学校在哪儿？", pinyin: "Nǐmen de xuéxiào zài nǎr?", translation: "Siziň mekdebiňiz nirede?" },
          { hanzi: "阿曼在这儿，古丽在那儿。", pinyin: "Āmàn zài zhèr, Gǔlì zài nàr.", translation: "Aman şu ýerde, Gülnara bolsa ol ýerde." },
        ],
      },
      {
        title: "Ugur sözleri (方位词): 东/西/南/北/左/右 + 边",
        explanation:
          "«X-iň demirgazygynda», «X-iň sagynda» we ş.m. diýmek üçin şu shema ulanylýar:\n\n" +
          "X + 的 + ugur + 边\n\n" +
          "Ugurlar:\n" +
          "东 (dōng) — gündogar → 东边\n" +
          "西 (xī) — günbatar → 西边\n" +
          "南 (nán) — günorta → 南边\n" +
          "北 (běi) — demirgazyk → 北边\n" +
          "左 (zuǒ) — çep → 左边\n" +
          "右 (yòu) — sag → 右边\n\n" +
          "Mysal: 图书馆在宿舍楼的北边 = «Kitaphana umumy ýaşaýyş jaýynyň demirgazygynda» (söz. «kitaphana umumy ýaşaýyş jaýynyň demirgazyk tarapynda ýerleşýär»).\n\n" +
          "Bu ters tertip: ilki «ugrukdyryjy» (nämeden), soň ugur gelýär.",
        examples: [
          { hanzi: "教学楼在图书馆的北边。", pinyin: "Jiàoxuélóu zài túshūguǎn de běibian.", translation: "Okuw binasy kitaphananyň demirgazygynda." },
          { hanzi: "张伟在阿曼的右边。", pinyin: "Zhāng Wěi zài Āmàn de yòubian.", translation: "Zhang Wei Amanyň sagynda." },
          { hanzi: "古丽的左边是阿曼。", pinyin: "Gǔlì de zuǒbian shì Āmàn.", translation: "Gülnaranyň çepinde — Aman." },
          { hanzi: "宿舍楼在西边。", pinyin: "Sùshèlóu zài xībian.", translation: "Umumy ýaşaýyş jaýy günbatar tarapda." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Kitaphanany gözlemek — şowsuz (古丽 we talyp A)",
        lines: [
          { speaker: "A", hanzi: "同学，请问，图书馆在哪儿？", pinyin: "Tóngxué, qǐngwèn, túshūguǎn zài nǎr?", translation: "Talyp, bagyşlaň, kitaphana nirede?" },
          { speaker: "B", hanzi: "对不起，我不是这个学校的学生，不知道。", pinyin: "Duìbuqǐ, wǒ bú shì zhège xuéxiào de xuésheng, bù zhīdào.", translation: "Bagyşlaň, men bu uniwersitetiň talyby däl, bilemok." },
          { speaker: "A", hanzi: "没关系。", pinyin: "Méi guānxi.", translation: "Hiç zat däl." },
        ],
      },
      {
        title: "Kitaphanany gözlemek — tapdy (古丽 we talyp B)",
        lines: [
          { speaker: "A", hanzi: "同学，这儿是图书馆吗？", pinyin: "Tóngxué, zhèr shì túshūguǎn ma?", translation: "Talyp, şu ýer kitaphanamy?" },
          { speaker: "B", hanzi: "不是，这是教学楼，图书馆在那儿，宿舍楼的北边。", pinyin: "Bú shì, zhè shì jiàoxuélóu, túshūguǎn zài nàr, sùshèlóu de běibian.", translation: "Ýok, bu okuw binasy. Kitaphana ol ýerde, umumy ýaşaýyş jaýynyň demirgazygynda." },
          { speaker: "A", hanzi: "是左边的楼吗？", pinyin: "Shì zuǒbian de lóu ma?", translation: "Çepdäki binamy?" },
          { speaker: "B", hanzi: "不，右边的楼。", pinyin: "Bù, yòubian de lóu.", translation: "Ýok, sagdaky." },
          { speaker: "A", hanzi: "谢谢。", pinyin: "Xièxie.", translation: "Sag bol." },
          { speaker: "B", hanzi: "不用谢。", pinyin: "Búyòng xiè.", translation: "Hiç zat däl." },
        ],
      },
    ],

    tips: [
      "请问 (qǐngwèn) — tanamaýan adamlardan sorag bermegiň edepli başlangyjy. Söz. «sorap göreýin». Köçede örän peýdaly jümle.",
      "对不起 / 没关系 — «bagyşla / hiç zat däl» standart jübüti. Ikisini bile ýat tut, olar jübüt bolup gelýär.",
      "不用谢 we 不客气 — ikisi hem «hiç zat däl» diýmek. 不客气 has ýumşak we ählumumy, 不用谢 has gepleşik görnüşi.",
      "Hytaýçada ugur sözleri jübütlerde üýtgeýär: 这儿 şu ýerde / 那儿 ol ýerde / 哪儿 nirede. 儿 goşulmasyna üns ber — ol demirgazyk (Pekin) şiwesine mahsus.",
      "个 (gè) sanaýyş sözi — iň ählumumy. San/görkezme bilen atyň arasynda goýulýar: 这个学校 (bu mekdep), 一个朋友 (bir dost). 这学校 diýip bolmaýar — 个 gerek.",
    ],
  },

  5: {
    introduction:
      "Bu Unit 1-iň jemleýji baby — geçilenleriň gaýtalanmagy we giňeldilmegi. Siz öz okuwyňyz hakda gürrüň bermegi (uniwersitet, hünär), 有 (eýe bolmak, bar bolmak) işligini we 的时候 (haçan, pursatynda) aňlatmasyny ulanmagy öwrenersiňiz.\n\n" +
      "Gahrymanlar: 古丽 Sinhua uniwersitetinden 王红 (Wáng Hóng) atly talyp gyz bilen tanyşýar. Şol bir wagtda 阿曼 hajathanany gözleýär.",

    vocabulary: [
      { hanzi: "专业", pinyin: "zhuānyè", translation: "hünär (ýokary okuw jaýynda)" },
      { hanzi: "国际", pinyin: "guójì", translation: "halkara" },
      { hanzi: "关系", pinyin: "guānxi", translation: "gatnaşyklar, aragatnaşyklar" },
      { hanzi: "中文", pinyin: "Zhōngwén", translation: "hytaý dili (ýazuw, edebi)" },
      { hanzi: "系", pinyin: "xì", translation: "fakultet, kafedra" },
      { hanzi: "研究生", pinyin: "yánjiūshēng", translation: "aspirant, magistrant" },
      { hanzi: "现代", pinyin: "xiàndài", translation: "häzirki zaman" },
      { hanzi: "文学", pinyin: "wénxué", translation: "edebiýat" },
      { hanzi: "有", pinyin: "yǒu", translation: "eýe bolmak; bar bolmak" },
      { hanzi: "空儿", pinyin: "kòngr", translation: "boş wagt" },
      { hanzi: "时候", pinyin: "shíhou", translation: "wagt, pursat" },
      { hanzi: "欢迎", pinyin: "huānyíng", translation: "garşylamak, hoş geldiňiz" },
      { hanzi: "去", pinyin: "qù", translation: "gitmek (bir ýere)" },
      { hanzi: "玩儿", pinyin: "wánr", translation: "oýnamak, wagt geçirmek" },
      { hanzi: "卫生间", pinyin: "wèishēngjiān", translation: "hajathana" },
      { hanzi: "教室", pinyin: "jiàoshì", translation: "auditoriýa, synp otagy" },
      { hanzi: "旁边", pinyin: "pángbiān", translation: "gapdalynda, ýanynda" },
      { hanzi: "对", pinyin: "duì", translation: "dogry" },
      { hanzi: "王红", pinyin: "Wáng Hóng", translation: "Wan Hun (aýal ady)" },
      { hanzi: "北京大学", pinyin: "Běijīng Dàxué", translation: "Pekin uniwersiteti (Beýda)" },
      { hanzi: "清华大学", pinyin: "Qīnghuá Dàxué", translation: "Sinhua uniwersiteti" },
    ],

    grammar: [
      {
        title: "有 işligi — eýe bolmak; bar bolmak",
        explanation:
          "有 (yǒu) — «eýe bolmak, saklamak» ýa-da «bar bolmak, ýaşamak». Hytaýçadaky iň ýygy işlikleriň biri.\n\n" +
          "1-nji many — degişlilik («mende bar»):\n" +
          "Eýe + 有 + Obýekt\n" +
          "我有朋友。— Meniň dostlarym bar.\n" +
          "她有一个同屋。— Onuň bir otagdaşy bar.\n\n" +
          "2-nji many — bar bolmak («bir ýerde bar»):\n" +
          "Ýer + 有 + Obýekt\n" +
          "学校有图书馆。— Uniwersitetde kitaphana bar.\n" +
          "教室里有老师。— Auditoriýada mugallym bar.\n\n" +
          "Inkär DIŇE 没 arkaly (不 DÄL):\n" +
          "❌ 不有\n" +
          "✅ 没有 (méi yǒu) — «bolmazlyk»\n\n" +
          "我没有空儿。— Meniň boş wagtym ýok.",
        examples: [
          { hanzi: "我有一个中国朋友。", pinyin: "Wǒ yǒu yí ge Zhōngguó péngyou.", translation: "Meniň bir hytaýly dostum bar." },
          { hanzi: "你有空儿吗？", pinyin: "Nǐ yǒu kòngr ma?", translation: "Seniň boş wagtyň barmy?" },
          { hanzi: "北京大学有图书馆。", pinyin: "Běijīng Dàxué yǒu túshūguǎn.", translation: "Pekin uniwersitetinde kitaphana bar." },
          { hanzi: "我没有汉语词典。", pinyin: "Wǒ méiyǒu Hànyǔ cídiǎn.", translation: "Mende hytaý dili sözlügi ýok." },
        ],
      },
      {
        title: "的时候 aňlatmasy — «haçan, bir zadyň pursatynda»",
        explanation:
          "…的时候 (de shíhou) «haçan…, wagtynda…» diýmegi aňladýar. Eýerjeň bölegiň SOŇUNDA, esasy bölekden öň goýulýar.\n\n" +
          "Shema:  [Hereket/ýagdaý] + 的时候，[esasy bölek]\n\n" +
          "有空儿的时候，欢迎你去玩儿。\n" +
          "«Boş wagtyň bolanda, myhmançylyga gel».\n\n" +
          "Möhüm: tertip rusçanyň TERSINE. Ilki şert/wagt aýdylýar, soň esasy hereket.\n\n" +
          "Rusça: esasy hereket öňde durup bilýär\n" +
          "Hytaýça: «HAÇAN wagt — gel»",
        examples: [
          { hanzi: "有空儿的时候，欢迎你去玩儿。", pinyin: "Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.", translation: "Wagtyň bolanda — myhmançylyga gel." },
          { hanzi: "我有空儿的时候去图书馆。", pinyin: "Wǒ yǒu kòngr de shíhou qù túshūguǎn.", translation: "Boş wagtym bolanda, kitaphana gidýärin." },
          { hanzi: "你不忙的时候，我们一起玩儿。", pinyin: "Nǐ bù máng de shíhou, wǒmen yìqǐ wánr.", translation: "Sen boş bolanda, bilelikde oýnarys." },
        ],
      },
      {
        title: "Ýene ugur sözleri: 旁边, 前边, 后边, 里边",
        explanation:
          "4-nji bapda 东边/西边/南边/北边 we 左边/右边 öwrendik. Indi ýene birnäçe ugur goşalyň:\n\n" +
          "旁边 (pángbiān) — gapdalynda, ýanynda\n" +
          "前边 (qiánbian) — öňünde\n" +
          "后边 (hòubian) — yzynda\n" +
          "里边 (lǐbian) — içinde\n" +
          "外边 (wàibian) — daşynda\n" +
          "上边 (shàngbian) — ýokarsynda\n" +
          "下边 (xiàbian) — aşagynda\n\n" +
          "Shema şol bir: X + 的 + ugur\n" +
          "卫生间在教室的旁边。— Hajathana auditoriýanyň gapdalynda.\n" +
          "图书馆在宿舍的前边。— Kitaphana umumy ýaşaýyş jaýynyň öňünde.",
        examples: [
          { hanzi: "卫生间在教室的旁边。", pinyin: "Wèishēngjiān zài jiàoshì de pángbiān.", translation: "Hajathana auditoriýanyň gapdalynda." },
          { hanzi: "老师在阿曼的前边。", pinyin: "Lǎoshī zài Āmàn de qiánbian.", translation: "Mugallym Amanyň öňünde." },
          { hanzi: "图书馆里边有很多书。", pinyin: "Túshūguǎn lǐbian yǒu hěn duō shū.", translation: "Kitaphananyň içinde köp kitap bar." },
          { hanzi: "我的朋友在我旁边。", pinyin: "Wǒ de péngyou zài wǒ pángbiān.", translation: "Meniň dostum meniň ýanymda." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Uniwersitetde tanyşlyk (古丽 we 王红)",
        lines: [
          { speaker: "A", hanzi: "你好！你叫什么名字？", pinyin: "Nǐ hǎo! Nǐ jiào shénme míngzi?", translation: "Salam! Adyň näme?" },
          { speaker: "B", hanzi: "我叫王红。你呢？", pinyin: "Wǒ jiào Wáng Hóng. Nǐ ne?", translation: "Meniň adym Wan Hun. A seniň?" },
          { speaker: "A", hanzi: "我叫古丽。我是北京大学的留学生。我的专业是国际关系。你呢？", pinyin: "Wǒ jiào Gǔlì. Wǒ shì Běijīng Dàxué de liúxuéshēng. Wǒ de zhuānyè shì guójì guānxi. Nǐ ne?", translation: "Meniň adym Gülnara. Men Pekin uniwersitetiniň daşary ýurtly talyby. Meniň hünärim — halkara gatnaşyklar. A sen?" },
          { speaker: "B", hanzi: "我是清华大学中文系的研究生。我的专业是现代文学。", pinyin: "Wǒ shì Qīnghuá Dàxué Zhōngwén xì de yánjiūshēng. Wǒ de zhuānyè shì xiàndài wénxué.", translation: "Men Sinhua uniwersitetiniň hytaý dili fakultetiniň aspiranty. Meniň hünärim — häzirki zaman edebiýaty." },
          { speaker: "A", hanzi: "清华大学在哪儿？", pinyin: "Qīnghuá Dàxué zài nǎr?", translation: "Sinhua nirede ýerleşýär?" },
          { speaker: "B", hanzi: "在北京大学的东边。有空儿的时候，欢迎你去玩儿。", pinyin: "Zài Běijīng Dàxué de dōngbian. Yǒu kòngr de shíhou, huānyíng nǐ qù wánr.", translation: "Pekin uniwersitetiniň gündogarynda. Wagtyň bolanda — myhmançylyga gel." },
        ],
      },
      {
        title: "Hajathana nirede? (阿曼 we talyp)",
        lines: [
          { speaker: "A", hanzi: "请问，卫生间在哪儿？", pinyin: "Qǐngwèn, wèishēngjiān zài nǎr?", translation: "Bagyşlaň, hajathana nirede?" },
          { speaker: "B", hanzi: "在那儿，教室的旁边。", pinyin: "Zài nàr, jiàoshì de pángbiān.", translation: "Ol ýerde, auditoriýanyň gapdalynda." },
          { speaker: "A", hanzi: "是西边的教室吗？", pinyin: "Shì xībian de jiàoshì ma?", translation: "Günbatar tarapdaky auditoriýamy?" },
          { speaker: "B", hanzi: "对。", pinyin: "Duì.", translation: "Hawa, dogry." },
        ],
      },
    ],

    tips: [
      "欢迎你去玩儿 — edepli çakylyk. Söz. «seni oýnamaga gelmäge garşylaýaryn». Anyk sebäpsiz myhmançylyga çagyranyňda ulanylýar. Bu idioma, göni terjime etme.",
      "北京大学 (Běijīng Dàxué) we 清华大学 (Qīnghuá Dàxué) — Hytaýyň iň abraýly iki ýokary okuw jaýy. Köplenç 北大 (Běidà) we 清华 (Qīnghuá) diýlip gysgaldylýar.",
      "有 — HEMIŞE 没 arkaly inkär edilýär (没有). Bu 不 kabul etmeýän ýeke-täk işlik. Şobada ýat tut: 不有 ýok.",
      "中文 vs 汉语: ikisi hem «hytaý dili» diýmek. 汉语 — umumy termin (han dili), köplenç dilden söz hakda. 中文 — adatça ýazuw, edebi dil. Fakultetde ol 中文系.",
      "对 (duì) — ählumumy «hawa/dogry». Soraglara jogapda 是-den has tebigy. «Sen talypmy?» → 对 (hawa).",
    ],
  },

  6: {
    introduction:
      "Bu bapda siz wagty aýtmagy (sagat we minut), 100-e çenli sanamagy we 几 (näçe) bilen wagt hakda sorag bermegi öwrenersiňiz. Şeýle hem 太……了 («aşa») gurluşy we 一会儿见 («görüşýänçäk») aňlatmasy bilen tanşarsyňyz.\n\n" +
      "Ýagdaýlar: 古丽 中村-dan Ýaponiýada sapaklaryň haçan başlaýandygyny soraýar, soň 阿曼-dan leksiýanyň näçede başlajakdygyny bilýär.",

    vocabulary: [
      { hanzi: "大学", pinyin: "dàxué", translation: "uniwersitet" },
      { hanzi: "早上", pinyin: "zǎoshang", translation: "säher" },
      { hanzi: "几", pinyin: "jǐ", translation: "näçe (10-a çenli sanlar üçin)" },
      { hanzi: "点", pinyin: "diǎn", translation: "sagat (sagatda), nokat" },
      { hanzi: "上课", pinyin: "shàngkè", translation: "sapaga başlamak, sapaga gitmek" },
      { hanzi: "大部分", pinyin: "dàbùfen", translation: "köpçüligi, esasy bölegi" },
      { hanzi: "九", pinyin: "jiǔ", translation: "dokuz" },
      { hanzi: "我们", pinyin: "wǒmen", translation: "biz" },
      { hanzi: "八", pinyin: "bā", translation: "sekiz" },
      { hanzi: "五十", pinyin: "wǔshí", translation: "elli" },
      { hanzi: "分", pinyin: "fēn", translation: "minut" },
      { hanzi: "下课", pinyin: "xià kè", translation: "sapagy tamamlamak" },
      { hanzi: "十", pinyin: "shí", translation: "on" },
      { hanzi: "半", pinyin: "bàn", translation: "ýarym" },
      { hanzi: "太……了", pinyin: "tài...le", translation: "aşa (örän)" },
      { hanzi: "早", pinyin: "zǎo", translation: "ir, irki" },
      { hanzi: "讲座", pinyin: "jiǎngzuò", translation: "leksiýa, çykyş" },
      { hanzi: "开始", pinyin: "kāishǐ", translation: "başlamak" },
      { hanzi: "六", pinyin: "liù", translation: "alty" },
      { hanzi: "现在", pinyin: "xiànzài", translation: "häzir" },
      { hanzi: "差", pinyin: "chà", translation: "ýetmezlik, (bir zada) galanda" },
      { hanzi: "一", pinyin: "yī", translation: "bir" },
      { hanzi: "刻", pinyin: "kè", translation: "çärýek sagat (15 minut)" },
      { hanzi: "一会儿", pinyin: "yíhuìr", translation: "basym, birazdan" },
      { hanzi: "见", pinyin: "jiàn", translation: "görüşmek, duşuşmak" },
    ],

    grammar: [
      {
        title: "0-dan 100-e çenli sanlar",
        explanation:
          "0-10 sanlary — esasy, olary ýat tutmaly:\n" +
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
          "11-19: 十 + birlik\n" +
          "11 = 十一 (shí yī), 15 = 十五, 19 = 十九\n\n" +
          "20-99: onluk + 十 + birlik\n" +
          "20 = 二十 (èrshí), 25 = 二十五, 99 = 九十九\n\n" +
          "100 = 一百 (yìbǎi)\n\n" +
          "Logika ýönekeý: 35 sözme-söz «üç-on-bäş» (三十五).",
        examples: [
          { hanzi: "十五", pinyin: "shíwǔ", translation: "15" },
          { hanzi: "二十一", pinyin: "èrshíyī", translation: "21" },
          { hanzi: "五十", pinyin: "wǔshí", translation: "50" },
          { hanzi: "九十九", pinyin: "jiǔshíjiǔ", translation: "99" },
        ],
      },
      {
        title: "Wagty nädip aýtmaly (钟点表达法)",
        explanation:
          "Shema: [sagat] 点 [minut] 分\n\n" +
          "8:00 — 八点 (bā diǎn)\n" +
          "8:05 — 八点零五分 (零 líng = nol 10 minutdan az bolanda hökman)\n" +
          "8:10 — 八点十分\n" +
          "8:15 — 八点十五分 ÝA-DA 八点一刻 (bir 刻 = 15 minut)\n" +
          "8:30 — 八点三十分 ÝA-DA 八点半 (ýarym sagat)\n" +
          "8:45 — 八点四十五分 ÝA-DA 八点三刻 ÝA-DA 差一刻九点 («9-a çärýek galanda»)\n" +
          "8:50 — 八点五十分 ÝA-DA 差十分九点 («9-a 10 minut galanda»)\n\n" +
          "«Sagat näçe?» soragy: 现在几点？ (xiànzài jǐ diǎn?)\n" +
          "«Näçede?» soragy: 几点 + işlik → 几点上课？(sapaklar näçede başlaýar?)",
        examples: [
          { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "Häzir sagat näçe?" },
          { hanzi: "现在八点半。", pinyin: "Xiànzài bā diǎn bàn.", translation: "Häzir sekiz ýarym (8:30)." },
          { hanzi: "差一刻六点。", pinyin: "Chà yí kè liù diǎn.", translation: "Alta çärýek galdy (5:45)." },
          { hanzi: "你们几点上课？", pinyin: "Nǐmen jǐ diǎn shàng kè?", translation: "Sizde sapaklar näçede başlaýar?" },
          { hanzi: "我们八点五十分上课。", pinyin: "Wǒmen bā diǎn wǔshí fēn shàng kè.", translation: "Bizde sapaklar 8:50-de." },
        ],
      },
      {
        title: "Sorag 几 — «näçe»",
        explanation:
          "几 (jǐ) — «näçe», emma diňe GARAŞYLÝAN KIÇI sanlar üçin (adatça 10-a çenli). Has uly san garaşylýan bolsa — 多少 ulanylýar (indiki baplarda bolar).\n\n" +
          "几 + sanaýyş sözi + at\n" +
          "几点? — sagat näçe? (hökman 24-den az)\n" +
          "几个朋友? — näçe dost? (az sanly)\n\n" +
          "Jogapda 几-niň ýerine anyk san goýulýar:\n" +
          "几点？→ 八点\n" +
          "几个朋友？→ 三个朋友\n\n" +
          "几 eýýäm soragy öz içine alýar — 吗 GOŞULMAÝAR.",
        examples: [
          { hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "Häzir sagat näçe?" },
          { hanzi: "几点下课？", pinyin: "Jǐ diǎn xià kè?", translation: "Sapaklar näçede tamamlanýar?" },
          { hanzi: "你有几个朋友？", pinyin: "Nǐ yǒu jǐ ge péngyou?", translation: "Seniň näçe dostuň bar?" },
          { hanzi: "讲座几点开始？", pinyin: "Jiǎngzuò jǐ diǎn kāishǐ?", translation: "Leksiýa näçede başlaýar?" },
        ],
      },
      {
        title: "太……了 gurluşy — «aşa»",
        explanation:
          "太…了 (tài…le) ýokary derejäni aňladýar, köplenç nägilelik ýa-da haýranlyk öwüşgini bilen.\n\n" +
          "Shema:  太 + Sypat/Işlik + 了\n\n" +
          "太早了！— Aşa ir!\n" +
          "太好了！— Ajaýyp! (bu ýerde — oňyn)\n" +
          "太累了。— Örän ýadadym.\n\n" +
          "Inkärde 了 adatça taşlanýar: 不太早 («aşa ir däl»).\n" +
          "太 了-syz tamamlanmadyk ýaly eşidilýär — 了 diýen ýaly hemişe gerek.",
        examples: [
          { hanzi: "八点上课，太早了！", pinyin: "Bā diǎn shàngkè, tài zǎo le!", translation: "Sapaklar 8-de — bu aşa ir!" },
          { hanzi: "太好了！", pinyin: "Tài hǎo le!", translation: "Ajaýyp!" },
          { hanzi: "这个学校太大了。", pinyin: "Zhège xuéxiào tài dà le.", translation: "Bu mekdep aşa uly." },
          { hanzi: "不太早。", pinyin: "Bú tài zǎo.", translation: "Beýle hem ir däl." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Ýaponiýada sapaklar (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，日本的大学早上几点上课？", pinyin: "Zhōngcūn, Rìběn de dàxué zǎoshang jǐ diǎn shàngkè?", translation: "Nakamura, Ýaponiýanyň uniwersitetlerinde ertirine sapaklar näçede başlaýar?" },
          { speaker: "B", hanzi: "大部分是九点，我们学校是八点五十分。", pinyin: "Dàbùfen shì jiǔ diǎn, wǒmen xuéxiào shì bā diǎn wǔshí fēn.", translation: "Köpüsinde 9-da, biziň mekdebimizde — 8:50-de." },
          { speaker: "A", hanzi: "几点下课？", pinyin: "Jǐ diǎn xià kè?", translation: "Näçede tamamlanýar?" },
          { speaker: "B", hanzi: "十点半。", pinyin: "Shí diǎn bàn.", translation: "On ýarymda." },
          { speaker: "A", hanzi: "北京大学早上八点上课，太早了。", pinyin: "Běijīng Dàxué zǎoshang bā diǎn shàngkè, tài zǎo le.", translation: "Pekin uniwersitetinde sapaklar ertirine 8-de — aşa ir!" },
        ],
      },
      {
        title: "Leksiýa näçede? (古丽 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，讲座几点开始？", pinyin: "Āmàn, jiǎngzuò jǐ diǎn kāishǐ?", translation: "Aman, leksiýa näçede başlaýar?" },
          { speaker: "B", hanzi: "六点。", pinyin: "Liù diǎn.", translation: "6-da." },
          { speaker: "A", hanzi: "现在几点？", pinyin: "Xiànzài jǐ diǎn?", translation: "A häzir sagat näçe?" },
          { speaker: "B", hanzi: "差一刻六点。", pinyin: "Chà yí kè liù diǎn.", translation: "Alta çärýek galdy." },
          { speaker: "A", hanzi: "谢谢！一会儿见。", pinyin: "Xièxie! Yíhuìr jiàn.", translation: "Sag bol! Görüşýänçäk." },
        ],
      },
    ],

    tips: [
      "一 (yī) indiki bogna görä tonuny üýtgedýär: 4-nji tonuň öňünde → 2-nji (yí kè, yí ge), 1/2/3-nji tonuň öňünde → 4-nji (yì bēi, yì nián, yì wǎn). Ýeke özi — 1-nji ton (yī).",
      "零 (líng = nol) 〇 (tegelek) iýeroglifi bilen hem ýazylýar. Meselem 2026-njy ýyl = 二〇二六年. Wagt sanlarynda (8:05) 零 hökman, ýogsam düşnüksiz.",
      "Hoşlaşmak formulalary: 一会儿见 (görüşýänçäk, birazdan), 明天见 (ertire çenli), 再见 (sag boluň). Ählisi «[wagt]见» görnüşinde gurulýar.",
      "上课 / 下课 — sözme-söz «sapaga çykmak» / «sapakdan düşmek». Meňzeş jübütler: 上班/下班 (iş), 上车/下车 (ulag).",
      "Gepleşikde hytaýlylar takyk «三十分» we «十五分» diýenden, 半 (ýarym sagat) we 一刻/三刻 (çärýekler) diýmegi köp ulanýarlar. Şu gysgaltmalary ulanmagy öwren.",
    ],
  },

  7: {
    introduction:
      "Bu bapda siz günüň meýilnamalary hakda gürlemegi (säher / günortadan soň / agşam), 有 bilen bir zadyň barlygyny soramagy, çaklama üçin 吧 bölejigini we 上/下/里/外 sözlerini sypat hökmünde ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaýlar: 古丽 中村-dan welosiped karz alýar, 阿曼 古丽-ni kino çagyrýar.",

    vocabulary: [
      { hanzi: "明天", pinyin: "míngtiān", translation: "ertir" },
      { hanzi: "课", pinyin: "kè", translation: "sapak, ders" },
      { hanzi: "上午", pinyin: "shàngwǔ", translation: "günortadan öň, ertirki wagt (10-12)" },
      { hanzi: "下午", pinyin: "xiàwǔ", translation: "günortadan soň, gündiz" },
      { hanzi: "没(有)", pinyin: "méi(yǒu)", translation: "bolmazlyk, ýok" },
      { hanzi: "自行车", pinyin: "zìxíngchē", translation: "welosiped" },
      { hanzi: "吧", pinyin: "ba", translation: "bölejik (çaklama / teklip)" },
      { hanzi: "事", pinyin: "shì", translation: "iş, mesele" },
      { hanzi: "可是", pinyin: "kěshì", translation: "emma, ýöne" },
      { hanzi: "没问题", pinyin: "méi wèntí", translation: "mesele ýok" },
      { hanzi: "钥匙", pinyin: "yàoshi", translation: "açar" },
      { hanzi: "车", pinyin: "chē", translation: "ulag, welosiped, maşyn" },
      { hanzi: "下", pinyin: "xià", translation: "aşak, aşagynda" },
      { hanzi: "车棚", pinyin: "chēpéng", translation: "welosiped duralgasy, ulag üçin ýapyk" },
      { hanzi: "里", pinyin: "lǐ", translation: "içinde, -da" },
      { hanzi: "后边", pinyin: "hòubian", translation: "yzynda, arkasynda" },
      { hanzi: "今天", pinyin: "jīntiān", translation: "şu gün" },
      { hanzi: "晚上", pinyin: "wǎnshang", translation: "agşam" },
      { hanzi: "时间", pinyin: "shíjiān", translation: "wagt" },
      { hanzi: "电影院", pinyin: "diànyǐngyuàn", translation: "kinoteatr" },
      { hanzi: "电影", pinyin: "diànyǐng", translation: "kinofilm, kino" },
      { hanzi: "听说", pinyin: "tīngshuō", translation: "eşitdim, diýýärler" },
      { hanzi: "有名", pinyin: "yǒumíng", translation: "meşhur, belli" },
      { hanzi: "当然", pinyin: "dāngrán", translation: "elbetde, hökman" },
    ],

    grammar: [
      {
        title: "有 bilen sözlemler (gaýtalama + inkär)",
        explanation:
          "5-nji bapda 有 işligi bilen tanyşdyk. Indi berkideliň we inkär soraglary goşalyň.\n\n" +
          "Shemalar:\n" +
          "Tassyklama:  Eýe + 有 + Obýekt\n" +
          "Inkär:  Eýe + 没有 + Obýekt (不有 DÄL!)\n" +
          "Sorag:  Eýe + 有 + Obýekt + 吗？\n\n" +
          "Doly sorag «bar ýa ýok»:  Eýe + 有没有 + Obýekt？\n" +
          "— 你有没有自行车？= Seniň welosipediň barmy ýa ýok?\n\n" +
          "Jogapda obýekti gaýtalaman diňe 有 / 没有 diýip bolýar.",
        examples: [
          { hanzi: "明天你有课吗？", pinyin: "Míngtiān nǐ yǒu kè ma?", translation: "Ertir seniň sapagyň barmy?" },
          { hanzi: "我上午有课，下午没有。", pinyin: "Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu.", translation: "Günortadan öň bar, günortadan soň — ýok." },
          { hanzi: "我没有自行车。", pinyin: "Wǒ méiyǒu zìxíngchē.", translation: "Meniň welosipedim ýok." },
          { hanzi: "你有没有钥匙？", pinyin: "Nǐ yǒu méiyǒu yàoshi?", translation: "Seniň açaryň barmy ýa ýok?" },
        ],
      },
      {
        title: "吧 bölejigi (1) — «çaklamany tassyklamak»",
        explanation:
          "吧 (ba) soragyň soňunda «men şeýle pikir edýärin — tassykla?» diýmegi aňladýar. Ýagny gepleýän diýen ýaly ynamly we tassyklama soraýar.\n\n" +
          "Shema:  Tassyklama + 吧？\n\n" +
          "你有自行车吧？— «Seniň welosipediň bar, şeýlemi?»\n\n" +
          "吗-dan tapawudy:\n" +
          "• 你有自行车吗？— Ýönekeý sorag «seniň welosipediň barmy?» (bilemok)\n" +
          "• 你有自行车吧？— «Seniň bar, şeýlemi?» (bar diýip pikir edýärin)\n\n" +
          "Bu 吧-niň manylarynyň biri. Beýlekisi (teklip «geliň») — indiki bapda.",
        examples: [
          { hanzi: "你有自行车吧？", pinyin: "Nǐ yǒu zìxíngchē ba?", translation: "Seniň welosipediň bar, şeýlemi?" },
          { hanzi: "你是美国留学生吧？", pinyin: "Nǐ shì Měiguó liúxuéshēng ba?", translation: "Sen amerikaly talyp, şeýlemi?" },
          { hanzi: "那是图书馆吧？", pinyin: "Nà shì túshūguǎn ba?", translation: "Ol kitaphana, şeýlemi?" },
          { hanzi: "你们明天有汉语课吧？", pinyin: "Nǐmen míngtiān yǒu Hànyǔ kè ba?", translation: "Ertir sizde hytaý dili sapagy bar, şeýlemi?" },
        ],
      },
      {
        title: "Ugur sözleri atyň bölegi hökmünde: X + 里/上/下/后…",
        explanation:
          "4-5-nji baplarda doly görnüşleri öwrendik: 里边, 上边, 下边 we ş.m. Emma olar atdan göni SOŇ gelende, 边 taşlanyp bilner we diňe 里, 上, 下, 后, 前, 外 galýar (旁 taşlanyp bilinmeýär).\n\n" +
          "Shema:  At + ýer (里/上/下/前/后/外)\n\n" +
          "车棚里 — welosiped duralgasynda\n" +
          "宿舍楼后 — umumy ýaşaýyş jaýynyň arkasynda\n" +
          "桌子上 — stoluň üstünde\n" +
          "教室外 — auditoriýanyň daşynda\n\n" +
          "Bu has gepleşik usuly, 的-syz we 边-syz.",
        examples: [
          { hanzi: "车在车棚里。", pinyin: "Chē zài chēpéng li.", translation: "Welosiped duralgada." },
          { hanzi: "她的自行车在楼后。", pinyin: "Tā de zìxíngchē zài lóu hòu.", translation: "Onuň welosipedi binanyň arkasynda." },
          { hanzi: "古丽在车棚里。", pinyin: "Gǔlì zài chēpéng li.", translation: "Gülnara welosiped duralgasynda." },
          { hanzi: "老师在教室里。", pinyin: "Lǎoshī zài jiàoshì li.", translation: "Mugallym auditoriýada." },
        ],
      },
      {
        title: "Wagt sözleri hal hökmünde",
        explanation:
          "Wagt sözleri (今天, 明天, 晚上, 上午, 八点…) işligiň ÖŇÜNDE ýa-da sözlemiň başynda goýulýar.\n\n" +
          "Shema 1:  Eýe + [Wagt] + Işlik + …\n" +
          "我明天八点有课。\n\n" +
          "Shema 2:  [Wagt] + Eýe + Işlik + …\n" +
          "今天晚上你有时间吗？\n\n" +
          "Birnäçe wagt sözüni birleşdirip bolýar (uludan kiçä):\n" +
          "今天晚上八点 — şu gün agşam 8-de.\n" +
          "明天下午 — ertir günortadan soň.\n\n" +
          "HYTAÝÇADA wagt soňuna goýulmaýar:\n" +
          "❌ 我有课明天\n" +
          "✅ 我明天有课",
        examples: [
          { hanzi: "今天晚上你有时间吗？", pinyin: "Jīntiān wǎnshang nǐ yǒu shíjiān ma?", translation: "Şu gün agşam seniň wagtyň barmy?" },
          { hanzi: "我明天八点有课。", pinyin: "Wǒ míngtiān bā diǎn yǒu kè.", translation: "Ertir 8-de meniň sapagym bar." },
          { hanzi: "电影晚上有电影。", pinyin: "Diànyǐng wǎnshang yǒu diànyǐng.", translation: "Agşam kino görkezerler." },
          { hanzi: "阿曼下午有事。", pinyin: "Āmàn xiàwǔ yǒu shì.", translation: "Amanyň günortadan soň işi bar." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Welosiped karz alýarys (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，明天你有课吗？", pinyin: "Zhōngcūn, míngtiān nǐ yǒu kè ma?", translation: "Nakamura, ertir seniň sapagyň barmy?" },
          { speaker: "B", hanzi: "我上午有课，下午没有。", pinyin: "Wǒ shàngwǔ yǒu kè, xiàwǔ méiyǒu.", translation: "Günortadan öň bar, günortadan soň ýok." },
          { speaker: "A", hanzi: "你有自行车吧？", pinyin: "Nǐ yǒu zìxíngchē ba?", translation: "Seniň welosipediň bar, şeýlemi?" },
          { speaker: "B", hanzi: "有。什么事？", pinyin: "Yǒu. Shénme shì?", translation: "Bar. Näme boldy?" },
          { speaker: "A", hanzi: "我明天下午去见朋友，可是我没有自行车……", pinyin: "Wǒ míngtiān xiàwǔ qù jiàn péngyou, kěshì wǒ méiyǒu zìxíngchē...", translation: "Ertir günortadan soň dostlarymyň ýanyna barýaryn, emma meniň welosipedim ýok…" },
          { speaker: "B", hanzi: "没问题，我有。这是钥匙，车在楼下车棚里。", pinyin: "Méi wèntí, wǒ yǒu. Zhè shì yàoshi, chē zài lóu xià chēpéng li.", translation: "Mesele ýok, mende bar. Ine açar, welosiped aşakda duralgada." },
          { speaker: "A", hanzi: "是宿舍楼后边的车棚吗？", pinyin: "Shì sùshèlóu hòubian de chēpéng ma?", translation: "Duralga umumy ýaşaýyş jaýynyň arkasyndamy?" },
          { speaker: "B", hanzi: "对。", pinyin: "Duì.", translation: "Hawa." },
        ],
      },
      {
        title: "Kino gideliň (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，今天晚上你有时间吗？", pinyin: "Gǔlì, jīntiān wǎnshang nǐ yǒu shíjiān ma?", translation: "Gülnara, şu gün agşam seniň wagtyň barmy?" },
          { speaker: "B", hanzi: "有。有事吗？", pinyin: "Yǒu. Yǒu shì ma?", translation: "Bar. Näme boldy?" },
          { speaker: "A", hanzi: "学校电影院有电影，你去吗？", pinyin: "Xuéxiào diànyǐngyuàn yǒu diànyǐng, nǐ qù ma?", translation: "Mekdebiň kinoteatrynda kinofilm görkezýärler, gidersiňmi?" },
          { speaker: "B", hanzi: "什么电影？", pinyin: "Shénme diànyǐng?", translation: "Haýsy kinofilm?" },
          { speaker: "A", hanzi: "我不知道名字，可是听说很有名。", pinyin: "Wǒ bù zhīdào míngzi, kěshì tīngshuō hěn yǒumíng.", translation: "Adyny bilemok, emma örän meşhur diýýärler." },
          { speaker: "B", hanzi: "我当然去。", pinyin: "Wǒ dāngrán qù.", translation: "Elbetde giderin." },
        ],
      },
    ],

    tips: [
      "Günüň bölünişi: 早上 (5-9) → 上午 (9-12) → 中午 (12-13) → 下午 (13-18) → 晚上 (18-24). Anyk döwri görkezmek üçin gerekli sözi ulan.",
      "可是 we 但是 ikisi hem «emma» diýmek. 可是 birneme has gepleşik, 但是 has bitarap. Biri-biriniň ýerine diýen ýaly ulanylýar.",
      "没有 köplenç 没 (méi) diýlip gysgaldylýar: 我没课 = meniň sapagym ýok. Emma başda doly görnüşi 没有 diýmek gowy.",
      "Garşylykly jübütleri ýat tut: 今天/明天 (şu gün/ertir), 上午/下午 (günortadan öň/soň), 里/外 (içinde/daşynda), 前/后 (öňünde/arkasynda).",
      "当然 (dāngrán) — razylyk üçin örän peýdaly söz: «elbetde!», «hökman!». Taýýarlygy nygtamak isläniňde 好-nyň ýerine ulan.",
    ],
  },

  8: {
    introduction:
      "Bu bapda siz telefon, otag, awtobus ugrunyň belgisini aýtmagy, «nädip barmaly?» diýip soramagy we 吧 bölejigi arkaly «geliň...» diýip teklip etmegi öwrenersiňiz. Şeýle hem 几 / 多少 tapawudy bilen tanşarsyňyz.\n\n" +
      "Ýagdaý: 王红 古丽-a jaň edip, Sinhua myhmançylyga çagyrýar, olar salgy we telefon belgileri bilen alyşýarlar.",

    vocabulary: [
      { hanzi: "周末", pinyin: "zhōumò", translation: "dynç günleri" },
      { hanzi: "啊", pinyin: "a", translation: "duýgy öwüşginli bölejik" },
      { hanzi: "不过", pinyin: "búguò", translation: "emma, ýöne (可是-den ýumşak)" },
      { hanzi: "怎么", pinyin: "zěnme", translation: "nädip, nähili" },
      { hanzi: "走", pinyin: "zǒu", translation: "gitmek, ýöremek, barmak" },
      { hanzi: "路", pinyin: "lù", translation: "ugur, ýol" },
      { hanzi: "和", pinyin: "hé", translation: "we (atlaryň arasyndaky baglaýjy)" },
      { hanzi: "公共汽车", pinyin: "gōnggòng qìchē", translation: "awtobus (jemgyýetçilik)" },
      { hanzi: "都", pinyin: "dōu", translation: "ählisi, ikisi hem" },
      { hanzi: "到", pinyin: "dào", translation: "gelmek, barmak" },
      { hanzi: "骑", pinyin: "qí", translation: "münmek (welosipede/motosikle)" },
      { hanzi: "快", pinyin: "kuài", translation: "çalt, tiz" },
      { hanzi: "分钟", pinyin: "fēnzhōng", translation: "minut (dowamlylyk)" },
      { hanzi: "就", pinyin: "jiù", translation: "eýýäm, şobada (çaltlygy nygtaýar)" },
      { hanzi: "校园", pinyin: "xiàoyuán", translation: "kampus, talyplar şäherjigi" },
      { hanzi: "东南", pinyin: "dōngnán", translation: "günorta-gündogar" },
      { hanzi: "东", pinyin: "dōng", translation: "gündogar" },
      { hanzi: "号", pinyin: "hào", translation: "belgi" },
      { hanzi: "房间", pinyin: "fángjiān", translation: "otag" },
      { hanzi: "多少", pinyin: "duōshao", translation: "näçe (uly sanlar üçin)" },
      { hanzi: "室", pinyin: "shì", translation: "otag (salgyda)" },
      { hanzi: "电话", pinyin: "diànhuà", translation: "telefon" },
      { hanzi: "号码", pinyin: "hàomǎ", translation: "belgi (telefon, seriýa)" },
      { hanzi: "手机", pinyin: "shǒujī", translation: "el telefony" },
      { hanzi: "等", pinyin: "děng", translation: "garaşmak" },
    ],

    grammar: [
      {
        title: "吧 bölejigi (2) — teklip «geliň...»",
        explanation:
          "Bu 吧-niň ikinji manysy (birinjisi — «tassyklama», 7-nji bap). Bu ýerde tassyklamanyň soňunda 吧 ony «geliň» ýaly ÝUMŞAK TEKLIBE öwürýär.\n\n" +
          "Shema:  Sözlem + 吧！\n\n" +
          "吧-syz: 我们去图书馆。— «Biz kitaphana gidýäris» (tassyklama)\n" +
          "吧 bilen: 我们去图书馆吧！— «Geliň kitaphana gideliň!»\n\n" +
          "Bu buýruk däl, dostlukly teklip.",
        examples: [
          { hanzi: "来我们学校玩儿吧！", pinyin: "Lái wǒmen xuéxiào wánr ba!", translation: "Geliň biziň uniwersitetimize myhmançylyga!" },
          { hanzi: "我们去图书馆吧！", pinyin: "Wǒmen qù túshūguǎn ba!", translation: "Geliň kitaphana gideliň!" },
          { hanzi: "我们骑自行车去吧！", pinyin: "Wǒmen qí zìxíngchē qù ba!", translation: "Geliň welosipedli gideliň!" },
          { hanzi: "来我家玩儿吧！", pinyin: "Lái wǒ jiā wánr ba!", translation: "Meniň öýüme myhmançylyga gel!" },
        ],
      },
      {
        title: "呢 bölejigi (2) — ýörite soraglary ýumşatmak",
        explanation:
          "2-nji bapda garşylykly soraglar üçin 呢-ni öwrendik (你呢？). Bu ikinji manysy: ÝÖRITE soragyň (怎么/哪儿/谁/什么 bilen) soňunda 呢 ony ýumşadýar, has oýlanyşykly edýär.\n\n" +
          "呢-syz: 去图书馆怎么走？— «Kitaphana nädip geçmeli?» (göni sorag)\n" +
          "呢 bilen: 去图书馆怎么走呢？— «A kitaphana nädip geçmeli?» (ýumşak, oýlanyşykly)\n\n" +
          "Tapawut inçe we rusçadaky «a?» öwüşginine meňzeş: «a nädip geçmeli?», «a bu nirede?».",
        examples: [
          { hanzi: "去你们学校怎么走呢？", pinyin: "Qù nǐmen xuéxiào zěnme zǒu ne?", translation: "A siziň uniwersitetiňize nädip barmaly?" },
          { hanzi: "这是谁的书呢？", pinyin: "Zhè shì shéi de shū ne?", translation: "A bu kimiň kitaby?" },
          { hanzi: "古丽在哪儿呢？", pinyin: "Gǔlì zài nǎr ne?", translation: "A Gülnara nirede?" },
          { hanzi: "去图书馆怎么走呢？", pinyin: "Qù túshūguǎn zěnme zǒu ne?", translation: "A kitaphana nädip geçmeli?" },
        ],
      },
      {
        title: "Belgiler: telefonlar, otaglar, awtobuslar",
        explanation:
          "Belgiler BIR SANDAN okalýar (adaty sanlar «kyrk bäş» diýlip okalýanyndan tapawutlylykda).\n\n" +
          "Mysal: telefon 63861023 → 六三八六一〇二三 (liù sān bā liù yī líng èr sān).\n\n" +
          "Möhüm: belgilerdäki «1» sany köplenç 一 (yī) ýerine 幺 (yāo) diýlip aýdylýar. Bu telefonda «ýedi» (qī) bilen bulaşdyrmazlyk üçin.\n\n" +
          "• Öý/otag belgisi: 502室 → 五〇二室 (wǔ líng èr shì)\n" +
          "• Awtobus ugry: 21路 → 二十一路 (adaty san) ýa-da 二一路 (sanlar)\n" +
          "• Uly awtobus belgileri: 108路 → 幺〇八路 (yāo líng bā lù)",
        examples: [
          { hanzi: "我的房间号是201。", pinyin: "Wǒ de fángjiān hào shì èr líng yāo.", translation: "Meniň otagymyň belgisi 201." },
          { hanzi: "我的电话是63861023。", pinyin: "Wǒ de diànhuà shì liù sān bā liù yāo líng èr sān.", translation: "Meniň telefonym 6386-1023." },
          { hanzi: "108路公共汽车到北京大学。", pinyin: "Yāo líng bā lù gōnggòng qìchē dào Běijīng Dàxué.", translation: "108 awtobus Pekin uniwersitetine gidýär." },
          { hanzi: "我的宿舍是东5号楼502室。", pinyin: "Wǒ de sùshè shì dōng wǔ hào lóu wǔ líng èr shì.", translation: "Meniň umumy ýaşaýyş jaýym — gündogar 5-nji bina, 502-nji otag." },
        ],
      },
      {
        title: "几 vs 多少 — haçan haýsyny ulanmaly",
        explanation:
          "Ikisi hem «näçe» diýmek, emma tapawut garaşylýan ululykda:\n\n" +
          "• 几 (jǐ) — KIÇI san garaşylýar (adatça 10-a çenli). Sanaýyş sözi talap edýär.\n" +
          "  你有几个朋友？— Näçe dostuň bar? (1-10 garaşýaryn)\n" +
          "  几点？— Sagat näçe? (1-24)\n\n" +
          "• 多少 (duōshao) — ULY san garaşylýar ÝA-DA näçedigini takyk bilmeýärsiň. Sanaýyş sözi HÖKMAN däl.\n" +
          "  你的电话是多少？— Seniň belgiň näçe? (köp san)\n" +
          "  多少钱？— Näçe pul?\n" +
          "  多少学生？— Näçe talyp? (köp bolup biler)\n\n" +
          "Belgiler üçin (telefon, öý, awtobus) HEMIŞE 多少.",
        examples: [
          { hanzi: "你的房间号是多少？", pinyin: "Nǐ de fángjiān hào shì duōshao?", translation: "Seniň otagyň belgisi näçe?" },
          { hanzi: "你的宿舍是几号楼？", pinyin: "Nǐ de sùshè shì jǐ hào lóu?", translation: "Seniň umumy ýaşaýyş jaýyň näçenji bina? (1-9 garaşylýar)" },
          { hanzi: "阿曼的电话号码是多少？", pinyin: "Āmàn de diànhuà hàomǎ shì duōshao?", translation: "Amanyň telefon belgisi näçe?" },
          { hanzi: "你有几个中国朋友？", pinyin: "Nǐ yǒu jǐ ge Zhōngguó péngyou?", translation: "Näçe hytaýly dostuň bar?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Sinhua myhmançylyga (王红 we 古丽 telefonda)",
        lines: [
          { speaker: "A", hanzi: "古丽，周末你有空儿吗？", pinyin: "Gǔlì, zhōumò nǐ yǒu kòngr ma?", translation: "Gülnara, dynç günleri boşmuň?" },
          { speaker: "B", hanzi: "有。什么事？", pinyin: "Yǒu. Shénme shì?", translation: "Hawa. Näme boldy?" },
          { speaker: "A", hanzi: "来我们学校玩儿吧！", pinyin: "Lái wǒmen xuéxiào wánr ba!", translation: "Geliň biziň uniwersitetimize myhmançylyga!" },
          { speaker: "B", hanzi: "好啊！不过，去你们学校怎么走呢？", pinyin: "Hǎo a! Búguò, qù nǐmen xuéxiào zěnme zǒu ne?", translation: "Bolýar! A siziňkä nädip barmaly?" },
          { speaker: "A", hanzi: "21路和106路公共汽车都到。骑自行车也很快，十五分钟就到。", pinyin: "Èrshíyī lù hé yāo líng liù lù gōnggòng qìchē dōu dào. Qí zìxíngchē yě hěn kuài, shíwǔ fēnzhōng jiù dào.", translation: "21 we 106 awtobuslaryň ikisi hem gidýär. Welosipedli hem çalt — 15 minutda ýetýärsiň." },
          { speaker: "B", hanzi: "你的宿舍在哪儿？", pinyin: "Nǐ de sùshè zài nǎr?", translation: "A seniň umumy ýaşaýyş jaýyň nirede?" },
          { speaker: "A", hanzi: "在校园的东南边，是东5号楼。", pinyin: "Zài xiàoyuán de dōngnánbian, shì dōng wǔ hào lóu.", translation: "Kampusyň günorta-gündogarynda, gündogar 5-nji bina." },
          { speaker: "B", hanzi: "你的房间号是多少？", pinyin: "Nǐ de fángjiān hào shì duōshao?", translation: "Seniň otagyň belgisi näçe?" },
          { speaker: "A", hanzi: "502号。我的宿舍是东5号楼502室。", pinyin: "Wǔ líng èr hào. Wǒ de sùshè shì dōng wǔ hào lóu wǔ líng èr shì.", translation: "502. Meniň umumy ýaşaýyş jaýym — gündogar 5-nji bina, 502-nji otag." },
          { speaker: "B", hanzi: "你的电话号码是多少？", pinyin: "Nǐ de diànhuà hàomǎ shì duōshao?", translation: "Seniň telefon belgiň näçe?" },
          { speaker: "A", hanzi: "63861023。你有手机吗？", pinyin: "Liù sān bā liù yāo líng èr sān. Nǐ yǒu shǒujī ma?", translation: "6386-1023. Seniň el telefonyň barmy?" },
          { speaker: "B", hanzi: "没有，不过我朋友有。", pinyin: "Méiyǒu, búguò wǒ péngyou yǒu.", translation: "Ýok, ýöne dostumda bar." },
          { speaker: "A", hanzi: "号码是多少？", pinyin: "Hàomǎ shì duōshao?", translation: "Belgisi näçe?" },
          { speaker: "B", hanzi: "13695670132。", pinyin: "Yāo sān liù jiǔ wǔ liù qī líng yāo sān èr.", translation: "13695670132." },
          { speaker: "A", hanzi: "好，我等你。", pinyin: "Hǎo, wǒ děng nǐ.", translation: "Bolýar, saňa garaşýaryn." },
        ],
      },
    ],

    tips: [
      "Belgilerdäki 1 sany = 幺 (yāo), 一 däl. Bu 七 (qī) bilen bulaşdyrmazlyk üçin. Ähli hytaýlylar belgileri 一 däl-de 幺 arkaly aýdýarlar.",
      "就 (jiù) çaltlygy/aňsatlygy nygtaýar: 十五分钟就到 = «bary-ýogy 15 minutda ýetýärsiň». «eýýäm», «şobada» diýlip terjime edilýär, emma köplenç diňe «hemme zat şu» duýgy öwüşgini.",
      "和 we 跟 tapawudy: ikisi hem atlaryň arasynda «we» diýmek. 和 (hé) — standart ýazuw, 跟 (gēn) — gepleşik. 8-nji bapda entek diňe 和.",
      "不过 可是 we 但是-den ýumşak. «dogrusy», «şeýle-de bolsa» diýip terjime edip bolýar. Köplenç ýumşak garşy çykmak islänňde ulanylýar.",
      "Hytaýda salgy tertibi rusçanyň TERSINE: ýurt → şäher → etrap → bina → otag. 北京大学东5号楼502室 — «Pekin uniwersiteti, gündogar 5-nji bina, 502-nji otag».",
    ],
  },

  9: {
    introduction:
      "Bu bapda siz dükanda söwda etmegi öwrenersiňiz: bahany soramagy, ýuanda pul sanamagy, sanaýyş sözlerini (瓶, 本) ulanmagy we 二 / 两 (iki) tapawutlandyrmagy.\n\n" +
      "Ýagdaýlar: 阿曼 kioskda piwo we suw satyn alýar, 古丽 kitap dükanynda iňlis-hytaý sözlügini satyn alýar.",

    vocabulary: [
      { hanzi: "师傅", pinyin: "shīfu", translation: "işgärlere hormatly ýüzlenme (ussa, şef)" },
      { hanzi: "买", pinyin: "mǎi", translation: "satyn almak" },
      { hanzi: "啤酒", pinyin: "píjiǔ", translation: "piwo" },
      { hanzi: "售货员", pinyin: "shòuhuòyuán", translation: "satyjy, kassir" },
      { hanzi: "瓶", pinyin: "píng", translation: "çüýşe (sanaýyş sözi)" },
      { hanzi: "钱", pinyin: "qián", translation: "pul" },
      { hanzi: "块", pinyin: "kuài", translation: "ýuan (gepleşik)" },
      { hanzi: "两", pinyin: "liǎng", translation: "iki (sanaýyş sözünden öň)" },
      { hanzi: "再", pinyin: "zài", translation: "ýene, täzeden" },
      { hanzi: "水", pinyin: "shuǐ", translation: "suw" },
      { hanzi: "一共", pinyin: "yígòng", translation: "jemi, umumy" },
      { hanzi: "毛", pinyin: "máo", translation: "mao, ýuanyň 1/10-y (gepleşik)" },
      { hanzi: "给", pinyin: "gěi", translation: "bermek" },
      { hanzi: "小姐", pinyin: "xiǎojie", translation: "gyz, hanym" },
      { hanzi: "看", pinyin: "kàn", translation: "seretmek, garamak" },
      { hanzi: "这些", pinyin: "zhèxiē", translation: "bular (köplük)" },
      { hanzi: "要", pinyin: "yào", translation: "islemek, gerek bolmak" },
      { hanzi: "本", pinyin: "běn", translation: "kitap üçin sanaýyş sözi" },
      { hanzi: "小", pinyin: "xiǎo", translation: "kiçi" },
      { hanzi: "零钱", pinyin: "língqián", translation: "ownuk pul, gaýtargy" },
    ],

    grammar: [
      {
        title: "Sanaýyş sözleri (量词) — sanlar bilen hökman!",
        explanation:
          "Hytaýçada sanyň (ýa-da 这/那) bilen atyň arasynda sanaýyş sözi HÖKMAN goýulýar. «bir kitap» diýip 一书 diýip bolmaýar — 一本书 gerek.\n\n" +
          "Shema:  San / 这 / 那 / 几 + Sanaýyş sözi + At\n\n" +
          "Esasy sanaýyş sözleri:\n" +
          "个 (ge) — ählumumy (adamlar, zatlar)\n" +
          "本 (běn) — kitaplar, sözlükler, žurnallar\n" +
          "瓶 (píng) — çüýşeler\n" +
          "块 (kuài) — bölekler; ýuanlar (pulda)\n" +
          "辆 (liàng) — ulag (maşyn, welosiped)\n" +
          "位 (wèi) — adamlar üçin edepli (mugallymlar, myhmanlar)\n" +
          "条 (tiáo) — uzyn zatlar (it, ýol, derýa)\n\n" +
          "Atyň özi düşnükli bolsa käte taşlanyp bilner:\n" +
          "— 多少钱一瓶？— Bir çüýşesi näçe? (haýsy çüýşedigi düşnükli)",
        examples: [
          { hanzi: "我要一本小词典。", pinyin: "Wǒ yào yì běn xiǎo cídiǎn.", translation: "Maňa bir kiçi sözlük gerek." },
          { hanzi: "我买两瓶啤酒。", pinyin: "Wǒ mǎi liǎng píng píjiǔ.", translation: "Men iki çüýşe piwo satyn alýaryn." },
          { hanzi: "21路公共汽车。", pinyin: "Èrshíyī lù gōnggòng qìchē.", translation: "21-nji ugur awtobusy." },
          { hanzi: "一位老师", pinyin: "yí wèi lǎoshī", translation: "bir mugallym (edepli)" },
        ],
      },
      {
        title: "二 we 两 — ikisi hem «iki», emma başga",
        explanation:
          "二 (èr) we 两 (liǎng) — ikisi hem «2» diýmek, emma dürlüçe ulanylýar:\n\n" +
          "二 (èr) — ulanylýar:\n" +
          "• Sanananda (一, 二, 三...)\n" +
          "• Goşma sanlarda (十二=12, 二十=20, 二十二=22)\n" +
          "• Tertip sanlarda (第二 — ikinji, 二号 — 2-nji belgi)\n" +
          "• Salgylarda we belgilerde (二号楼 — 2-nji bina)\n\n" +
          "两 (liǎng) — ulanylýar:\n" +
          "• Sanaýyş sözünden öň: 两本书 (2 kitap), 两个朋友 (2 dost), 两瓶水\n" +
          "• «Uly» sanlaryň öňünde: 两千 (2000), 两万 (20000), 两亿\n\n" +
          "Ýönekeý düzgün: yzyndan sanaýyş sözi ýa-da «müň/million» gelse → 两. Beýleki ýagdaýlarda → 二.",
        examples: [
          { hanzi: "两本书", pinyin: "liǎng běn shū", translation: "iki kitap" },
          { hanzi: "十二块", pinyin: "shí'èr kuài", translation: "12 ýuan" },
          { hanzi: "第二号楼", pinyin: "dì èr hào lóu", translation: "2-nji belgili bina" },
          { hanzi: "两千块", pinyin: "liǎng qiān kuài", translation: "2000 ýuan" },
        ],
      },
      {
        title: "Ýuandaky pul — 块 / 毛 / 分",
        explanation:
          "Hytaý puly (人民币, RMB):\n\n" +
          "• 元 (yuán) — ýuan (ýazuwda). Gepleşikde: 块 (kuài).\n" +
          "• 角 (jiǎo) — ýuanyň 1/10-y. Gepleşikde: 毛 (máo).\n" +
          "• 分 (fēn) — ýuanyň 1/100-i (ownuk pul, seýrek ulanylýar).\n\n" +
          "Baha shemasy:\n" +
          "5.50 ýuan → 五块五（毛）— 5 ýuan 5 mao\n" +
          "12.50 ýuan → 十二块五（毛）\n" +
          "6.20 ýuan → 六块二（毛）\n" +
          "74.82 ýuan → 七十四块八毛二（分）\n\n" +
          "Iň soňky «毛/分» gepleşikde adatça taşlanýar.\n\n" +
          "«Näçe durýar?»:  多少钱？ / 多少钱一瓶？",
        examples: [
          { hanzi: "多少钱一瓶？", pinyin: "Duōshao qián yì píng?", translation: "Bir çüýşesi näçe?" },
          { hanzi: "三块五。", pinyin: "Sān kuài wǔ.", translation: "3 ýuan 5 mao." },
          { hanzi: "一共九块四毛钱。", pinyin: "Yígòng jiǔ kuài sì máo qián.", translation: "Jemi 9 ýuan 4 mao." },
          { hanzi: "二十二块。", pinyin: "Èrshí'èr kuài.", translation: "22 ýuan." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Azyk dükanynda (阿曼 we satyjy)",
        lines: [
          { speaker: "A", hanzi: "师傅，我买啤酒。", pinyin: "Shīfu, wǒ mǎi píjiǔ.", translation: "Ussa, men piwo satyn aljak." },
          { speaker: "B", hanzi: "你买几瓶？", pinyin: "Nǐ mǎi jǐ píng?", translation: "Näçe çüýşe?" },
          { speaker: "A", hanzi: "多少钱一瓶？", pinyin: "Duōshao qián yì píng?", translation: "Bir çüýşesi näçe?" },
          { speaker: "B", hanzi: "三块五。", pinyin: "Sān kuài wǔ.", translation: "3 ýuan 5 mao." },
          { speaker: "A", hanzi: "我买两瓶，再买两瓶水。", pinyin: "Wǒ mǎi liǎng píng, zài mǎi liǎng píng shuǐ.", translation: "Iki çüýşe alýaryn, ýene iki çüýşe suw." },
          { speaker: "B", hanzi: "两瓶啤酒七块，两瓶水两块四，一共是九块四毛钱。", pinyin: "Liǎng píng píjiǔ qī kuài, liǎng píng shuǐ liǎng kuài sì, yígòng shì jiǔ kuài sì máo qián.", translation: "Iki çüýşe piwo — 7 ýuan, iki çüýşe suw — 2.40, jemi 9.40." },
          { speaker: "A", hanzi: "给你钱。", pinyin: "Gěi nǐ qián.", translation: "Ine pul." },
        ],
      },
      {
        title: "Kitap dükanynda (古丽 we satyjy)",
        lines: [
          { speaker: "A", hanzi: "小姐，有英汉词典吗？", pinyin: "Xiǎojie, yǒu Yīng-Hàn cídiǎn ma?", translation: "Hanym, iňlis-hytaý sözlügi barmy?" },
          { speaker: "B", hanzi: "有。你看，这些都是，你要哪本呢？", pinyin: "Yǒu. Nǐ kàn, zhèxiē dōu shì, nǐ yào nǎ běn ne?", translation: "Bar. Ine serediň, bularyň ählisi. Haýsyny isleýärsiňiz?" },
          { speaker: "A", hanzi: "我要这本小词典。多少钱一本？", pinyin: "Wǒ yào zhè běn xiǎo cídiǎn. Duōshao qián yì běn?", translation: "Şu kiçi sözlügi isleýärin. Bir sanysy näçe?" },
          { speaker: "B", hanzi: "二十二块。", pinyin: "Èrshí'èr kuài.", translation: "22 ýuan." },
          { speaker: "A", hanzi: "对不起，我没有零钱。", pinyin: "Duìbuqǐ, wǒ méiyǒu língqián.", translation: "Bagyşlaň, mende ownuk pul ýok." },
          { speaker: "B", hanzi: "没关系。", pinyin: "Méi guānxi.", translation: "Hiç zat däl." },
        ],
      },
    ],

    tips: [
      "师傅 (shīfu) — taksiçilere, ussalara, satyjylara, işçilere ýüzlenme. Söz. «mugallym-ussa». Islendik durmuş ýagdaýynda örän edepli we ýerlikli.",
      "Esasy sanaýyş sözi 个 (ge) dogrusyny bilmeseň diýen ýaly hemişe bolýar. Emma bilseň — laýygyny ulan (kitaplar üçin 本, çüýşeler üçin 瓶 we ş.m.), has sowatly eşidilýär.",
      "Bahada iň soňky «毛/分» köplenç taşlanýar: 三块五 = 3 ýuan 5 mao (3.50 göz öňünde tutulýar). Eger 3 ýuan 5 fen bolsa — doly 三块零五分 diýerdiler.",
      "要 (yào) — dükanda «islemek/almak». «Men şuny alýaryn» = 我要这本. 我买-dan has gepleşik we ynamly.",
      "英汉 / 汉英 / 汉日 — «dil1-dil2 sözlük» gurluşy = birinjiden ikinjä. 英汉词典 = iňlis-hytaý (iňlisçeden hytaýça).",
    ],
  },

  10: {
    introduction:
      "Bu Unit 2-niň jemleýji baby — gaýtalama we giňeltme. Siz öz maşgalaňyz hakda gürrüň bermegi, 口 (maşgala agzalary üçin) we 条 (itler, derýalar, ýollar üçin) sanaýyş sözlerini, şeýle hem 还 («ýene, üstesine») sözüni ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 古丽 we 王红 maşgala suratyna seredip, biri-birine öz maşgalalary hakda gürrüň berýärler.",

    vocabulary: [
      { hanzi: "照片", pinyin: "zhàopiàn", translation: "surat, fotosurat" },
      { hanzi: "家", pinyin: "jiā", translation: "maşgala, öý" },
      { hanzi: "口", pinyin: "kǒu", translation: "maşgala agzalary üçin sanaýyş sözi" },
      { hanzi: "爷爷", pinyin: "yéye", translation: "ata (kaka tarapdan)" },
      { hanzi: "奶奶", pinyin: "nǎinai", translation: "mama (kaka tarapdan)" },
      { hanzi: "爸爸", pinyin: "bàba", translation: "kaka" },
      { hanzi: "妈妈", pinyin: "māma", translation: "eje" },
      { hanzi: "哥哥", pinyin: "gēge", translation: "aga" },
      { hanzi: "姐姐", pinyin: "jiějie", translation: "uýa" },
      { hanzi: "家庭", pinyin: "jiātíng", translation: "maşgala (jemgyýetiň öýjügi hökmünde)" },
      { hanzi: "一般", pinyin: "yìbān", translation: "adatça, umuman" },
      { hanzi: "只", pinyin: "zhǐ", translation: "diňe, ýalňyz" },
      { hanzi: "孩子", pinyin: "háizi", translation: "çaga" },
      { hanzi: "弟弟", pinyin: "dìdi", translation: "ini" },
      { hanzi: "妹妹", pinyin: "mèimei", translation: "jigi" },
      { hanzi: "还", pinyin: "hái", translation: "ýene, üstesine, şeýle hem" },
      { hanzi: "条", pinyin: "tiáo", translation: "sanaýyş sözi (uzyn/inçe zatlar)" },
      { hanzi: "狗", pinyin: "gǒu", translation: "it" },
      { hanzi: "这样", pinyin: "zhèyàng", translation: "şeýle, şu görnüşde" },
    ],

    grammar: [
      {
        title: "口 sanaýyş sözi — maşgala agzalary üçin",
        explanation:
          "口 (kǒu) — MAŞGALADAKY adamlary sanamak üçin ýörite sanaýyş sözi. Başga ýagdaýlarda adamlar üçin 口 ULANYLMAÝAR — ol ýerde 个.\n\n" +
          "Sorag:  你家有几口人？— «Seniň maşgalaňda näçe adam bar?»\n" +
          "Jogap:  我家有五口人。— «Meniň maşgalamda bäş adam bar.»\n\n" +
          "Diýip bolmaýar:\n" +
          "❌ 五口学生 (bäş talyp — ol ýerde 个)\n" +
          "❌ 五口朋友 (bäş dost — ol ýerde 个)\n\n" +
          "Diňe:  ⃝口 + 人 (maşgala hakda).",
        examples: [
          { hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", translation: "Seniň maşgalaňda näçe adam bar?" },
          { hanzi: "我家有五口人。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén.", translation: "Meniň maşgalamda bäş adam bar." },
          { hanzi: "一共六口人。", pinyin: "Yígòng liù kǒu rén.", translation: "Jemi alty adam." },
          { hanzi: "我家有四口人：爸爸、妈妈、哥哥和我。", pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, gēge hé wǒ.", translation: "Biziň maşgalamyzda dört adam: kaka, eje, aga we men." },
        ],
      },
      {
        title: "条 sanaýyş sözi — uzyn/inçe zatlar üçin",
        explanation:
          "条 (tiáo) uzyn, inçe ýa-da çeýe görnüşli zatlar üçin ulanylýar.\n\n" +
          "条 bilen näme sanalýar:\n" +
          "• Itler — 一条狗 (bir it)\n" +
          "• Balyklar — 一条鱼\n" +
          "• Derýalar — 一条河\n" +
          "• Ýollar — 一条路\n" +
          "• Köçeler — 一条街\n" +
          "• Balaklar/ýubkalar — 一条裤子\n" +
          "• Şarflar/polotensalar — 一条围巾\n\n" +
          "Logika — «uzyn we inçe/çeýe».",
        examples: [
          { hanzi: "我家有一条狗。", pinyin: "Wǒ jiā yǒu yì tiáo gǒu.", translation: "Biziň öýümizde it bar." },
          { hanzi: "还有一条狗。", pinyin: "Hái yǒu yì tiáo gǒu.", translation: "Ýene bir it bar." },
          { hanzi: "北京有很多条路。", pinyin: "Běijīng yǒu hěn duō tiáo lù.", translation: "Pekinde köp ýol bar." },
          { hanzi: "两条鱼", pinyin: "liǎng tiáo yú", translation: "iki balyk" },
        ],
      },
      {
        title: "还 hal-sözi — «ýene, üstesine, şeýle hem»",
        explanation:
          "还 (hái) eýýäm aýdylana bir zat goşýar. Işligiň öňünde goýulýar.\n\n" +
          "Shema:  Eýe + 还 + Işlik + Obýekt\n\n" +
          "我有爸爸、妈妈，还有一个哥哥。\n" +
          "«Meniň kakam, ejem, ýene bir agam bar.»\n\n" +
          "Köplenç 还有… = «ýene bar…» — sanawlar üçin ajaýyp aňlatma.\n\n" +
          "还-niň başga manylary:\n" +
          "• «Entek hem»: 我还在家 — Men entek hem öýde.\n" +
          "• «Birneme» (sypat bilen): 还好 — erbet däl.\n" +
          "10-njy bapda diňe «ýene, üstesine»-ä üns berilýär.",
        examples: [
          { hanzi: "我家有爸爸、妈妈，还有一条狗。", pinyin: "Wǒ jiā yǒu bàba, māma, hái yǒu yì tiáo gǒu.", translation: "Biziň öýümizde kaka, eje, ýene bir it bar." },
          { hanzi: "我有美国朋友，还有日本朋友。", pinyin: "Wǒ yǒu Měiguó péngyou, hái yǒu Rìběn péngyou.", translation: "Meniň amerikaly, ýene ýaponly dostlarym bar." },
          { hanzi: "我有一个姐姐，还有一个妹妹。", pinyin: "Wǒ yǒu yí ge jiějie, hái yǒu yí ge mèimei.", translation: "Meniň uýam, ýene jigim bar." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Maşgalalar hakda (古丽 we 王红)",
        lines: [
          { speaker: "A", hanzi: "这是你的照片吗？", pinyin: "Zhè shì nǐ de zhàopiàn ma?", translation: "Bu seniň suratyňmy?" },
          { speaker: "B", hanzi: "对，是我家的照片。", pinyin: "Duì, shì wǒ jiā de zhàopiàn.", translation: "Hawa, bu meniň maşgalamyň suraty." },
          { speaker: "A", hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", translation: "Seniň maşgalaňda näçe adam bar?" },
          { speaker: "B", hanzi: "我家有五口人：爷爷、奶奶、爸爸、妈妈和我。", pinyin: "Wǒ jiā yǒu wǔ kǒu rén: yéye, nǎinai, bàba, māma hé wǒ.", translation: "Biziň maşgalamyzda bäş adam: ata, mama, kaka, eje we men." },
          { speaker: "A", hanzi: "你没有哥哥姐姐吗？", pinyin: "Nǐ méiyǒu gēge jiějie ma?", translation: "A aga-uýaň ýokmy?" },
          { speaker: "B", hanzi: "没有，现在中国家庭一般只有一个孩子。古丽，你家都有什么人？", pinyin: "Méiyǒu, xiànzài Zhōngguó jiātíng yìbān zhǐ yǒu yí ge háizi. Gǔlì, nǐ jiā dōu yǒu shénme rén?", translation: "Ýok, häzir hytaý maşgalalarynda adatça diňe bir çaga bolýar. A seniň maşgalaňda kimler bar, Gülnara?" },
          { speaker: "A", hanzi: "我家有爸爸、妈妈、哥哥、弟弟、妹妹，还有一条狗。", pinyin: "Wǒ jiā yǒu bàba, māma, gēge, dìdi, mèimei, hái yǒu yì tiáo gǒu.", translation: "Bizde kaka, eje, aga, ini, jigi, ýene bir it bar." },
          { speaker: "B", hanzi: "一共六口人？", pinyin: "Yígòng liù kǒu rén?", translation: "Jemi alty adammy?" },
          { speaker: "A", hanzi: "不，七口。", pinyin: "Bù, qī kǒu.", translation: "Ýok, ýedi." },
          { speaker: "B", hanzi: "爸爸、妈妈、一个哥哥、一个弟弟、一个妹妹和你，六口，对吧？", pinyin: "Bàba, māma, yí ge gēge, yí ge dìdi, yí ge mèimei hé nǐ, liù kǒu, duì ba?", translation: "Kaka, eje, bir aga, bir ini, bir jigi we sen, alty, şeýlemi?" },
          { speaker: "A", hanzi: "不对，还有一条狗。", pinyin: "Bú duì, hái yǒu yì tiáo gǒu.", translation: "Ýok, ýene bir it bar!" },
          { speaker: "B", hanzi: "是这样……", pinyin: "Shì zhèyàng...", translation: "Ine şeýle..." },
        ],
      },
    ],

    tips: [
      "Hytaýda 2015-nji ýyla çenli «bir çaga syýasaty» (一胎政策) hereket etdi — 王红 ýaly maşgalalaryň köpüsinde 2003-nji ýylda diňe bir çaga bardy. Bu möhüm medeni kontekst.",
      "Maşgala ugurlary boýunça: 爷爷/奶奶 — kaka tarapdan, 外公/外婆 (wàigōng/wàipó) — eje tarapdan. Häzirki Hytaýda 爷爷/奶奶 köplenç islendik ata-mama üçin umumy ulanylýar.",
      "Hytaýçada doganlar HEMIŞE ýaşy boýunça bölünýär: 哥哥 (uly) ≠ 弟弟 (kiçi). Umumy «dogan» sözi ýok.",
      "Garyndaş atlaryndaky goşa sözler (爸爸, 妈妈, 哥哥) — çagalyk/mähirli görnüş. Resmi sözleşikde başga sözler bolup biler (父亲 fùqin — ata, 母亲 mǔqin — ene).",
      "对吧？ soňunda — «şeýlemi? dogrumy?» (7-nji bapdaky «吧» ýaly — çaklamany tassyklamak). Örän ýygy gepleşik jümlesi.",
    ],
  },

  11: {
    introduction:
      "Bu bapda siz howa hakda gürrüň bermegi, pasyllary deňeşdirmegi we sypatlary habar hökmünde (是-siz) ulanmagy öwrenersiňiz. 怎么样 sowaly («nähili?»), 不A不B gurluşy («ne A, ne B — edil ýerbe-ýer») we 比较 hal-sözi bilen tanyşarsyňyz.\n\n" +
      "Ýagdaý: 古丽 中村-den şu gün howanyň nähilidigini soraýar, 阿曼 王老师 bilen Pekiniň pasyllary hakda gürrüň edýär.",

    vocabulary: [
      { hanzi: "天气", pinyin: "tiānqì", translation: "howa" },
      { hanzi: "怎么样", pinyin: "zěnmeyàng", translation: "nähili?" },
      { hanzi: "不太", pinyin: "bú tài", translation: "gaty ... däl, onçakly däl" },
      { hanzi: "风", pinyin: "fēng", translation: "ýel" },
      { hanzi: "雨", pinyin: "yǔ", translation: "ýagyş" },
      { hanzi: "冷", pinyin: "lěng", translation: "sowuk" },
      { hanzi: "度", pinyin: "dù", translation: "gradus" },
      { hanzi: "晴天", pinyin: "qíngtiān", translation: "açyk howa" },
      { hanzi: "秋天", pinyin: "qiūtiān", translation: "güýz" },
      { hanzi: "热", pinyin: "rè", translation: "yssy" },
      { hanzi: "舒服", pinyin: "shūfu", translation: "amatly, rahat" },
      { hanzi: "最", pinyin: "zuì", translation: "iň" },
      { hanzi: "季节", pinyin: "jìjié", translation: "pasyl" },
      { hanzi: "冬天", pinyin: "dōngtiān", translation: "gyş" },
      { hanzi: "比较", pinyin: "bǐjiào", translation: "birneme, deňeşdirilende" },
      { hanzi: "差不多", pinyin: "chàbuduō", translation: "takmynan, golaý" },
      { hanzi: "零下", pinyin: "língxià", translation: "noldan aşak" },
      { hanzi: "常常", pinyin: "chángcháng", translation: "ýygy-ýygydan, adatça" },
      { hanzi: "下", pinyin: "xià", translation: "ýagmak (ýagyş/gar barada)" },
      { hanzi: "雪", pinyin: "xuě", translation: "gar" },
      { hanzi: "常", pinyin: "cháng", translation: "ýygy" },
      { hanzi: "喜欢", pinyin: "xǐhuan", translation: "halamak, ýaramak" },
      { hanzi: "夏天", pinyin: "xiàtiān", translation: "tomus" },
      { hanzi: "游泳", pinyin: "yóuyǒng", translation: "ýüzmek" },
      { hanzi: "春天", pinyin: "chūntiān", translation: "ýaz" },
      { hanzi: "北京", pinyin: "Běijīng", translation: "Pekin" },
    ],

    grammar: [
      {
        title: "怎么样 sowaly — «nähili?»",
        explanation:
          "怎么样 (zěnmeyàng) — ýagdaý, hil, pikir hakda soraýar. Sözlemiň SOŇUNA goýulýar.\n\n" +
          "Shema:  At + 怎么样？\n\n" +
          "今天的天气怎么样？— Şu gün howa nähili?\n" +
          "这个电影怎么样？— Bu kino nähili?\n\n" +
          "Şeýle hem teklip hökmünde ýygy ulanylýar:\n" +
          "我们去图书馆，怎么样？— Kitaphana gideliň, dogrumy?",
        examples: [
          { hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?", translation: "Şu gün howa nähili?" },
          { hanzi: "北京秋天的天气怎么样？", pinyin: "Běijīng qiūtiān de tiānqì zěnmeyàng?", translation: "Pekinde güýzüň howasy nähili?" },
          { hanzi: "爷爷的身体怎么样？", pinyin: "Yéye de shēntǐ zěnmeyàng?", translation: "Atanyň saglygy nähili?" },
          { hanzi: "这件毛衣怎么样？", pinyin: "Zhè jiàn máoyī zěnmeyàng?", translation: "Bu switer nähili?" },
        ],
      },
      {
        title: "是-syz habar bolýan sypat",
        explanation:
          "Hytaýçada sypat ÖZÜ habar bolýar — 是 GEREK DÄL.\n\n" +
          "❌ 这个学校是小 (nädogry!)\n" +
          "✅ 这个学校很小。— Bu mekdep örän kiçi.\n\n" +
          "Möhüm: hal-sözsüz (很, 比较, 挺, 太…) sypat deňeşdirme ýaly eşidilýär:\n" +
          "• 我的房间大。— Meniň otagym uly (başga birinden uly diýen many aňladýar).\n" +
          "• 我的房间很大。— Meniň otagym ýönekeý uly (bitarap many).\n\n" +
          "Şonuň üçin 很, «örän» diýen manyny aňlatmak islemedik ýagdaýynda-da, köplenç goşulýar — bu «grammatik dolgy».",
        examples: [
          { hanzi: "听说北京的冬天很冷。", pinyin: "Tīngshuō Běijīng de dōngtiān hěn lěng.", translation: "Aýdylyşyna görä, Pekiniň gyşy sowuk." },
          { hanzi: "那个学校很小。", pinyin: "Nàge xuéxiào hěn xiǎo.", translation: "Ol mekdep kiçi." },
          { hanzi: "今天的天气不太好。", pinyin: "Jīntiān de tiānqì bú tài hǎo.", translation: "Şu gün howa onçakly gowy däl." },
          { hanzi: "这个电影很有名。", pinyin: "Zhège diànyǐng hěn yǒumíng.", translation: "Bu kino örän meşhur." },
        ],
      },
      {
        title: "不A不B — «ne A, ne B» = «edil ýerbe-ýer»",
        explanation:
          "不+sypat1 + 不+sypat2 gurluşy (sypat1 bilen sypat2 antonim bolanda) «gaty X-de däl, gaty Y-de-de däl — edil ýerbe-ýer» diýen manyny aňladýar.\n\n" +
          "Bu oňyn häsiýetlendirme, kämil deňagramlylygy aňladýar.\n\n" +
          "不冷不热 — ne sowuk, ne yssy (edil ýerbe-ýer)\n" +
          "不大不小 — ne uly, ne kiçi\n" +
          "不早不晚 — ne ir, ne giç\n" +
          "不快不慢 — ne çalt, ne haýal",
        examples: [
          { hanzi: "北京的秋天不冷不热，很舒服。", pinyin: "Běijīng de qiūtiān bù lěng bú rè, hěn shūfu.", translation: "Pekiniň güýzi ne sowuk, ne yssy, örän amatly." },
          { hanzi: "这件毛衣不大不小。", pinyin: "Zhè jiàn máoyī bú dà bù xiǎo.", translation: "Bu switer ne uly, ne kiçi — edil ölçegli." },
          { hanzi: "我们不早不晚到了。", pinyin: "Wǒmen bù zǎo bù wǎn dào le.", translation: "Biz ne ir, ne giç bardyk — wagtynda geldik." },
        ],
      },
      {
        title: "Dereje hal-sözleri: 很, 比较, 挺, 最, 太, 不太",
        explanation:
          "Hytaýçada hiliň derejesini aňlatmagyň köp usuly bar:\n\n" +
          "• 很 (hěn) — «örän» / bitarap dolgy\n" +
          "• 比较 (bǐjiào) — «birneme, deňeşdirilende»\n" +
          "• 挺 (tǐng) — «bütinleý, birneme» (gepleşik dilinde, köplenç 的 bilen)\n" +
          "• 最 (zuì) — «iň»\n" +
          "• 太 (tài) — «aşa» (了 bilen)\n" +
          "• 不太 (bú tài) — «gaty ... däl, onçakly däl»\n\n" +
          "Shema:  Eýe + hal-söz + sypat\n\n" +
          "Güýji boýunça: 不太 < 比较 ≈ 挺 < 很 < 最 < 太.",
        examples: [
          { hanzi: "北京的冬天比较冷。", pinyin: "Běijīng de dōngtiān bǐjiào lěng.", translation: "Pekiniň gyşy birneme sowuk." },
          { hanzi: "最冷差不多零下十五度。", pinyin: "Zuì lěng chàbuduō língxià shíwǔ dù.", translation: "Iň sowuk günlerde takmynan minus 15 gradus." },
          { hanzi: "今天不太冷。", pinyin: "Jīntiān bú tài lěng.", translation: "Şu gün gaty sowuk däl." },
          { hanzi: "太热了！", pinyin: "Tài rè le!", translation: "Aşa yssy!" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Şu günki howa (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "今天的天气怎么样？", pinyin: "Jīntiān de tiānqì zěnmeyàng?", translation: "Şu gün howa nähili?" },
          { speaker: "B", hanzi: "不太好，有风，下午还有雨。", pinyin: "Bú tài hǎo, yǒu fēng, xiàwǔ hái yǒu yǔ.", translation: "Onçakly gowy däl, ýelli, günortadan soň ýene ýagyş bar." },
          { speaker: "A", hanzi: "冷吗？", pinyin: "Lěng ma?", translation: "Sowukmy?" },
          { speaker: "B", hanzi: "不冷，二十度。", pinyin: "Bù lěng, èrshí dù.", translation: "Sowuk däl, ýigrimi gradus." },
          { speaker: "A", hanzi: "明天呢？", pinyin: "Míngtiān ne?", translation: "A ertir näme?" },
          { speaker: "B", hanzi: "明天是晴天。", pinyin: "Míngtiān shì qíngtiān.", translation: "Ertir açyk howa." },
        ],
      },
      {
        title: "Pekiniň pasyllary (阿曼 we 王老师)",
        lines: [
          { speaker: "A", hanzi: "老师，北京秋天的天气怎么样？", pinyin: "Lǎoshī, Běijīng qiūtiān de tiānqì zěnmeyàng?", translation: "Mugallym, Pekinde güýzüň howasy nähili?" },
          { speaker: "B", hanzi: "北京的秋天不冷不热，很舒服，是最好的季节。", pinyin: "Běijīng de qiūtiān bù lěng bú rè, hěn shūfu, shì zuì hǎo de jìjié.", translation: "Pekiniň güýzi ne sowuk, ne yssy, örän amatly — iň gowy pasyl." },
          { speaker: "A", hanzi: "冬天呢？听说北京的冬天很冷，是吗？", pinyin: "Dōngtiān ne? Tīngshuō Běijīng de dōngtiān hěn lěng, shì ma?", translation: "A gyş näme? Aýdylyşyna görä, Pekiniň gyşy örän sowuk, şeýlemi?" },
          { speaker: "B", hanzi: "对，北京的冬天比较冷，最冷差不多零下十五度。", pinyin: "Duì, Běijīng de dōngtiān bǐjiào lěng, zuì lěng chàbuduō língxià shíwǔ dù.", translation: "Hawa, Pekiniň gyşy birneme sowuk, iň sowuk günlerde takmynan minus 15 gradus." },
          { speaker: "A", hanzi: "常常下雪吗？", pinyin: "Chángcháng xià xuě ma?", translation: "Ýygy-ýygydan gar ýagýarmy?" },
          { speaker: "B", hanzi: "不常下雪。阿曼，你最喜欢哪个季节？", pinyin: "Bù cháng xià xuě. Āmàn, nǐ zuì xǐhuan nǎge jìjié?", translation: "Ýygy ýagmaýar. Aman, seniň iň halaýan pasylyň haýsy?" },
          { speaker: "A", hanzi: "我喜欢夏天，我喜欢游泳。老师，您呢？", pinyin: "Wǒ xǐhuan xiàtiān, wǒ xǐhuan yóuyǒng. Lǎoshī, nín ne?", translation: "Men tomusy halaýaryn, ýüzmegi halaýaryn. Mugallym, siz näme?" },
          { speaker: "B", hanzi: "我喜欢春天。", pinyin: "Wǒ xǐhuan chūntiān.", translation: "Men ýazy halaýaryn." },
        ],
      },
    ],

    tips: [
      "Hytaýda temperatura Sels boýunça, Farenheýt boýunça däl. 二十度 = 20°C. «Minus» = 零下 (língxià — «noldan aşak»): 零下十度 = -10°C.",
      "Dört pasyl: 春天 (ýaz), 夏天 (tomus), 秋天 (güýz), 冬天 (gyş). Ählisi 天 bilen gutarýar.",
      "下雨 (ýagyş ýagýar) we 下雪 (gar ýagýar) — göni manysy «ýagyş/gar düşýär». Bu ýerde 下 işligi = «düşmek, ýagmak».",
      "不太 sypatdan öň = «onçakly ... däl». 不太好 (onçakly gowy däl), 不太冷 (onçakly sowuk däl) — ýumşak razylaşmazlygy aňlatmagyň sylagly görnüşi.",
      "差不多 (chàbuduō) — «takmynan, golaý, ol-a-bir» diýen manyda örän ýygy ulanylýan söz. Göni manysy «biraz ýetenok». Gepleşik hytaý diliniň açar jümlesi.",
    ],
  },

  12: {
    introduction:
      "Bu bapda siz edil häzir edýän işiňiz hakda gürrüň bermegi (häzirki dowamly zaman), hepdäniň günlerini atlandyrmagy we «-den... çenli» (从……到……) aňlatmalaryny ulanmagy öwrenersiňiz. Şeýle hem 每 («her») sözi bilen tanyşarsyňyz.\n\n" +
      "Ýagdaý: 阿曼 we 古丽 telefonda kimiň näme edýändigi hakda gürrüň edýärler — 阿曼 öý işini edýär, 古丽 bolsa dosty bilen barda.",

    vocabulary: [
      { hanzi: "喂", pinyin: "wèi", translation: "alo (telefonda)" },
      { hanzi: "啊", pinyin: "a", translation: "a, o (bölejik)" },
      { hanzi: "在", pinyin: "zài", translation: "häzir (dowam edýän hereketi görkezýär)" },
      { hanzi: "干", pinyin: "gàn", translation: "etmek, meşgullanmak (gepleşik dilinde)" },
      { hanzi: "做", pinyin: "zuò", translation: "etmek" },
      { hanzi: "作业", pinyin: "zuòyè", translation: "öý işi" },
      { hanzi: "每", pinyin: "měi", translation: "her" },
      { hanzi: "天", pinyin: "tiān", translation: "gün" },
      { hanzi: "多", pinyin: "duō", translation: "köp" },
      { hanzi: "星期三", pinyin: "xīngqīsān", translation: "çarşenbe" },
      { hanzi: "从……到", pinyin: "cóng...dào", translation: "-den... çenli" },
      { hanzi: "中午", pinyin: "zhōngwǔ", translation: "günortan" },
      { hanzi: "节", pinyin: "jié", translation: "sapaklar üçin sanaýyş sözi (para)" },
      { hanzi: "听写", pinyin: "tīngxiě", translation: "diktant" },
      { hanzi: "所以", pinyin: "suǒyǐ", translation: "şonuň üçin, şeýlelikde" },
      { hanzi: "酒吧", pinyin: "jiǔbā", translation: "bar" },
      { hanzi: "喝", pinyin: "hē", translation: "içmek" },
      { hanzi: "咖啡", pinyin: "kāfēi", translation: "kofe" },
      { hanzi: "书店", pinyin: "shūdiàn", translation: "kitap dükany" },
      { hanzi: "对面", pinyin: "duìmiàn", translation: "garşysynda" },
      { hanzi: "自己", pinyin: "zìjǐ", translation: "özi, özbaşdak" },
      { hanzi: "正在", pinyin: "zhèngzài", translation: "edil häzir, hereketiň dowamynda" },
      { hanzi: "唱", pinyin: "chàng", translation: "aýdym aýtmak" },
      { hanzi: "歌", pinyin: "gē", translation: "aýdym" },
      { hanzi: "回", pinyin: "huí", translation: "gaýdyp gelmek" },
    ],

    grammar: [
      {
        title: "Häzirki dowamly zaman: 正在/在...呢",
        explanation:
          "«Men edil häzir X edýärin» diýmek üçin hytaýçada şu gurluşlaryň biri ulanylýar:\n\n" +
          "• 正在 + Işlik + (Obýekt) + 呢\n" +
          "• 在 + Işlik + (Obýekt) + 呢\n" +
          "• Işlik + (Obýekt) + 呢\n\n" +
          "Üç görnüşi hem takmynan bir manyny aňladýar. Iň doly görnüşi — 正在……呢.\n\n" +
          "Inkär: 没 + Işlik (在 we 呢-siz).\n" +
          "— 他没看电影。— Ol kino görenok (häzir).",
        examples: [
          { hanzi: "你在干什么呢？", pinyin: "Nǐ zài gàn shénme ne?", translation: "Sen häzir näme edýärsiň?" },
          { hanzi: "我正在做作业呢。", pinyin: "Wǒ zhèngzài zuò zuòyè ne.", translation: "Men edil häzir öý işimi edýärin." },
          { hanzi: "他们正在唱歌呢。", pinyin: "Tāmen zhèngzài chàng gē ne.", translation: "Olar häzir aýdym aýdýarlar." },
          { hanzi: "外面下雨呢。", pinyin: "Wàimiàn xià yǔ ne.", translation: "Daşarda ýagyş ýagýar." },
        ],
      },
      {
        title: "Hepdäniň günleri",
        explanation:
          "Hepdäniň günleri şu shema boýunça gurulýar: 星期 + san (1-6) ýa-da 天/日.\n\n" +
          "星期一 xīngqīyī — duşenbe\n" +
          "星期二 xīngqī'èr — sişenbe\n" +
          "星期三 xīngqīsān — çarşenbe\n" +
          "星期四 xīngqīsì — penşenbe\n" +
          "星期五 xīngqīwǔ — anna\n" +
          "星期六 xīngqīliù — şenbe\n" +
          "星期日 / 星期天 xīngqīrì / xīngqītiān — ýekşenbe\n\n" +
          "Sorag: 今天(是)星期几？— Şu gün haýsy gün?\n" +
          "Jogap: 今天(是)星期三。— Çarşenbe.",
        examples: [
          { hanzi: "今天是星期三。", pinyin: "Jīntiān shì xīngqīsān.", translation: "Şu gün çarşenbe." },
          { hanzi: "明天是星期几？", pinyin: "Míngtiān shì xīngqī jǐ?", translation: "Ertir haýsy gün?" },
          { hanzi: "星期天我不上课。", pinyin: "Xīngqītiān wǒ bú shàng kè.", translation: "Ýekşenbe günleri meniň sapagym ýok." },
          { hanzi: "星期一到星期五", pinyin: "xīngqīyī dào xīngqīwǔ", translation: "duşenbeden anna çenli" },
        ],
      },
      {
        title: "每……都 — «her X hemişe...»",
        explanation:
          "每 (měi) — «her». Köplenç işlikden öň 都 (dōu — «ählisi, hemişe») bilen bile gelýär, sebäbi aýrylmazlygyny nygtamak üçin.\n\n" +
          "Shema:  每 + [sanaýyş sözi] + At + 都 + Işlik\n\n" +
          "每天都 — her gün (ähli günler)\n" +
          "每个人都 — her adam (ählisi)\n" +
          "每个星期都 — her hepde\n\n" +
          "都-siz doly bolmadyk ýaly eşidilýär. Ýat tut: 每 diýen ýaly hemişe 都 bilen jübüt gelýär.",
        examples: [
          { hanzi: "你每天都有很多作业吗？", pinyin: "Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?", translation: "Seniň her gün köp öý işiň barmy?" },
          { hanzi: "我每天早上都喝咖啡。", pinyin: "Wǒ měi tiān zǎoshang dōu hē kāfēi.", translation: "Men her ertir kofe içýärin." },
          { hanzi: "他们每个人都知道。", pinyin: "Tāmen měi ge rén dōu zhīdào.", translation: "Olaryň her biri bilýär." },
          { hanzi: "阿曼每天晚上都去酒吧。", pinyin: "Āmàn měi tiān wǎnshang dōu qù jiǔbā.", translation: "Aman her agşam bara gidýär." },
        ],
      },
      {
        title: "从……到…… — «-den... çenli»",
        explanation:
          "从 A 到 B «A-dan B-çenli» diýen manyny aňladýar — hem wagt, hem ýer üçin.\n\n" +
          "Shema:  从 + [nokat 1] + 到 + [nokat 2]\n\n" +
          "Wagt:\n" +
          "从早上八点到中午十二点 — ertirki 8-den günortanky 12-ä çenli\n" +
          "从星期一到星期五 — duşenbeden anna çenli\n\n" +
          "Ýer:\n" +
          "从北京到上海 — Pekinden Şanhaýa çenli\n" +
          "从家到学校 — öýden mekdebe çenli\n\n" +
          "Hemişe jübüt gelýär: 从 bar bolsa, 到 hem bolmaly.",
        examples: [
          { hanzi: "从早上八点到中午十二点，我有四节课。", pinyin: "Cóng zǎoshang bā diǎn dào zhōngwǔ shí'èr diǎn, wǒ yǒu sì jié kè.", translation: "Ertirki 8-den günortanky 12-ä çenli meniň 4 sapagym bar." },
          { hanzi: "我从八点到十一点有课。", pinyin: "Wǒ cóng bā diǎn dào shíyī diǎn yǒu kè.", translation: "Meniň 8-den 11-e çenli sapagym bar." },
          { hanzi: "他们从星期一到星期五都有课。", pinyin: "Tāmen cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.", translation: "Olaryň duşenbeden anna çenli sapaklary bar." },
          { hanzi: "从北京到上海很远。", pinyin: "Cóng Běijīng dào Shànghǎi hěn yuǎn.", translation: "Pekinden Şanhaýa çenli uzak." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Telefon arkaly gürrüň (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "喂，你好！", pinyin: "Wèi, nǐ hǎo!", translation: "Alo, salam!" },
          { speaker: "B", hanzi: "喂，阿曼，是我，古丽。", pinyin: "Wèi, Āmàn, shì wǒ, Gǔlì.", translation: "Alo, Aman, bu men, Gülnara." },
          { speaker: "A", hanzi: "啊，古丽，你好！", pinyin: "A, Gǔlì, nǐ hǎo!", translation: "A, Gülnara, salam!" },
          { speaker: "B", hanzi: "阿曼，你在干什么呢？", pinyin: "Āmàn, nǐ zài gàn shénme ne?", translation: "Aman, sen häzir näme edýärsiň?" },
          { speaker: "A", hanzi: "做作业呢。", pinyin: "Zuò zuòyè ne.", translation: "Öý işimi edýärin." },
          { speaker: "B", hanzi: "是吗？你每天都有很多作业吗？", pinyin: "Shì ma? Nǐ měi tiān dōu yǒu hěn duō zuòyè ma?", translation: "Hakykatdanmy? Seniň her gün köp öý işiň barmy?" },
          { speaker: "A", hanzi: "不是。今天是星期三，从早上八点到中午十二点，我有四节课，明天还有听写，所以作业很多。你呢？在干什么呢？", pinyin: "Bú shì. Jīntiān shì xīngqīsān, cóng zǎoshang bā diǎn dào zhōngwǔ shí'èr diǎn, wǒ yǒu sì jié kè, míngtiān hái yǒu tīngxiě, suǒyǐ zuòyè hěn duō. Nǐ ne? Zài gàn shénme ne?", translation: "Ýok. Şu gün çarşenbe, ertirki 8-den günortanky 12-ä çenli meniň 4 sapagym bardy, ertir ýene diktant bar, şonuň üçin öý işi köp. Sen näme? Näme edýärsiň?" },
          { speaker: "B", hanzi: "我在酒吧喝咖啡呢。", pinyin: "Wǒ zài jiǔbā hē kāfēi ne.", translation: "Men barda kofe içýärin." },
          { speaker: "A", hanzi: "哪个酒吧？", pinyin: "Nǎge jiǔbā?", translation: "Haýsy barda?" },
          { speaker: "B", hanzi: "学校书店对面的那个。", pinyin: "Xuéxiào shūdiàn duìmiàn de nàge.", translation: "Mekdebiň kitap dükanynyň garşysyndaky." },
          { speaker: "A", hanzi: "你自己吗？", pinyin: "Nǐ zìjǐ ma?", translation: "Sen ýeke özüňmi?" },
          { speaker: "B", hanzi: "不，还有我的同屋和她的朋友，他们正在唱歌呢。", pinyin: "Bù, hái yǒu wǒ de tóngwū hé tā de péngyou, tāmen zhèngzài chàng gē ne.", translation: "Ýok, ýene meniň otagdaşym we onuň dosty bar, olar edil häzir aýdym aýdýarlar." },
          { speaker: "A", hanzi: "明天你们没有课吗？", pinyin: "Míngtiān nǐmen méiyǒu kè ma?", translation: "Ertir sizde sapak ýokmy?" },
          { speaker: "B", hanzi: "有，我们十点就回宿舍。", pinyin: "Yǒu, wǒmen shí diǎn jiù huí sùshè.", translation: "Bar, biz 10-da ýatakhana gaýdyp geleris." },
        ],
      },
    ],

    tips: [
      "喂 (wèi) — diňe telefon üçin! Ýüzbe-ýüz salamlaşmakda ulanylmaýar. Jaňda ilkinji söz HEMIŞE 喂.",
      "干 (gàn) we 做 (zuò) — ikisi hem «etmek» diýen manyny berýär. 干 — has gepleşik dilinde we umumy («näme bilen meşgullanýarsyň?»), 做 — has anyk («bir zat etmek»).",
      "节 (jié) — sapaklar/paralar üçin sanaýyş sözi. «Üç para» = 三节课, 三个课 däl.",
      "Hytaýçada «hepde» düşünjesi: 星期 (xīngqī) — adaty, 周 (zhōu) — has resmi (周末 — dynç günleri, 周一 — duşenbe), 礼拜 (lǐbài) — gepleşik dilinde.",
      "所以 (suǒyǐ) — «şonuň üçin». Köplenç 因为 (yīnwèi — «sebäbi») bilen jübüt gelýär: 因为...所以... — «sebäbi... şonuň üçin...».",
    ],
  },

  13: {
    introduction:
      "Bu bapda siz yzly-yzyna birnäçe işlik bilen sözlem gurmagy (gitmek + etmek), 先……然后 («ilki... soň») baglaýjysyny, 不 arkaly alternatiw sorag (贵不贵?) we 咱们-i 我们-den tapawutlandyrmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 阿曼 we 张伟 bilelikde banka we dükana barýarlar, 古丽 we 中村 söwda merkezine gitmegi meýilleşdirýärler.",

    vocabulary: [
      { hanzi: "借", pinyin: "jiè", translation: "karz almak, karz bermek" },
      { hanzi: "先", pinyin: "xiān", translation: "ilki, ilkinji" },
      { hanzi: "银行", pinyin: "yínháng", translation: "bank" },
      { hanzi: "换", pinyin: "huàn", translation: "çalyşmak, çalşyrmak" },
      { hanzi: "然后", pinyin: "ránhòu", translation: "soň, ondan soň" },
      { hanzi: "商店", pinyin: "shāngdiàn", translation: "dükan" },
      { hanzi: "东西", pinyin: "dōngxi", translation: "zat, zatlar" },
      { hanzi: "咱们", pinyin: "zánmen", translation: "biz (sen bilen men)" },
      { hanzi: "一起", pinyin: "yìqǐ", translation: "bilelikde" },
      { hanzi: "关门", pinyin: "guān mén", translation: "gapyny ýapmak, ýapylmak" },
      { hanzi: "关", pinyin: "guān", translation: "ýapmak" },
      { hanzi: "星期天", pinyin: "xīngqītiān", translation: "ýekşenbe" },
      { hanzi: "打算", pinyin: "dǎsuàn", translation: "meýilleşdirmek, niýetlenmek" },
      { hanzi: "购物中心", pinyin: "gòuwù zhōngxīn", translation: "söwda merkezi" },
      { hanzi: "购物", pinyin: "gòu wù", translation: "söwda etmek" },
      { hanzi: "中心", pinyin: "zhōngxīn", translation: "merkez" },
      { hanzi: "贵", pinyin: "guì", translation: "gymmat" },
      { hanzi: "还可以", pinyin: "hái kěyǐ", translation: "erbet däl, bolýar" },
      { hanzi: "质量", pinyin: "zhìliàng", translation: "hil" },
      { hanzi: "不错", pinyin: "búcuò", translation: "erbet däl, gowy" },
      { hanzi: "正", pinyin: "zhèng", translation: "edil, hut" },
      { hanzi: "衣服", pinyin: "yīfu", translation: "eşik" },
      { hanzi: "开门", pinyin: "kāi mén", translation: "gapyny açmak, açylmak" },
      { hanzi: "开", pinyin: "kāi", translation: "açmak" },
    ],

    grammar: [
      {
        title: "连动句 — Yzly-yzyna gelýän işlikler (gitmek + etmek)",
        explanation:
          "Hytaýçada bir sözlemde iki işlik yzly-yzyna gelip biler, we 2-nji işlik 1-niň MAKSADYNY düşündirýär.\n\n" +
          "Shema:  Eýe + Işlik1 + [Ýer1] + Işlik2 + [Obýekt2]\n\n" +
          "Logika:  «bir ýere gitmek → bir zat etmek üçin»\n\n" +
          "我去图书馆借书。\n" +
          "göni manysy: «men gidýärin (kitaphana) kitap almak» = «kitaphana kitap almaga gidýärin»\n\n" +
          "Birinji işlik adatça 去 (şol ýere gitmek), 来 (bu ýere gelmek). Ikinjisi — ol ýerde näme etjekdigi.\n\n" +
          "Tapawut: beýleki köp dillerde (meselem rusçada) ýerlik predlogy gerek bolýar, hytaýçada bolsa hiç zat gerek däl — diňe 去 + ýer.",
        examples: [
          { hanzi: "我去图书馆借书。", pinyin: "Wǒ qù túshūguǎn jiè shū.", translation: "Kitaphana kitap almaga gidýärin." },
          { hanzi: "我去商店买东西。", pinyin: "Wǒ qù shāngdiàn mǎi dōngxi.", translation: "Dükana söwda etmäge gidýärin." },
          { hanzi: "阿曼去银行换钱。", pinyin: "Āmàn qù yínháng huàn qián.", translation: "Aman pul çalyşmaga banka gidýär." },
          { hanzi: "学生们去教学楼上课。", pinyin: "Xuéshēngmen qù jiàoxuélóu shàng kè.", translation: "Talyplar sapaga okuw binasyna gidýärler." },
        ],
      },
      {
        title: "先……，然后…… — «ilki..., soň...»",
        explanation:
          "Hereketleriň yzygiderligini beýan etmek üçin 先 (ilki) — 然后 (soň) jübüti ulanylýar.\n\n" +
          "Shema:  先 + Hereket1，然后 + Hereket2\n\n" +
          "我先去银行换钱，然后去商店买东西。\n" +
          "«Ilki banka pul çalyşmaga gidýärin, soň dükana söwda etmäge.»\n\n" +
          "Ikisi hem işlikden ÖŇ goýulýar. 然后-ni 再 (zài — ýene, gaýtadan) bilen çalşyp bolýar.",
        examples: [
          { hanzi: "我先去银行换钱，然后去商店买东西。", pinyin: "Wǒ xiān qù yínháng huàn qián, ránhòu qù shāngdiàn mǎi dōngxi.", translation: "Ilki banka, soň dükana." },
          { hanzi: "明天我先去银行，然后去商店。", pinyin: "Míngtiān wǒ xiān qù yínháng, ránhòu qù shāngdiàn.", translation: "Ertir ilki banka, soň dükana." },
          { hanzi: "张伟先去电影院，然后回宿舍。", pinyin: "Zhāng Wěi xiān qù diànyǐngyuàn, ránhòu huí sùshè.", translation: "Zhang Wei ilki kinoteatra, soň ýatakhana gidýär." },
          { hanzi: "他先去商店买东西，然后去书店买词典。", pinyin: "Tā xiān qù shāngdiàn mǎi dōngxi, ránhòu qù shūdiàn mǎi cídiǎn.", translation: "Ol ilki dükana söwda etmäge, soň kitap dükanyna sözlük almaga gidýär." },
        ],
      },
      {
        title: "咱们 vs 我们 — «biz» sözüniň inçe tapawudy",
        explanation:
          "Iki söz hem «biz» diýen manyny berýär, emma diňleýjini öz içine alyş boýunça tapawutlanýar:\n\n" +
          "• 咱们 (zánmen) — HEMIŞE diňleýjini öz içine alýar: «sen we men / biz seniň bilen»\n" +
          "• 我们 (wǒmen) — diňleýjini öz içine alyp ýa-da almazlygy mümkin (belli däl)\n\n" +
          "Mysal:\n" +
          "咱们一起去吧！— Bile gideliň! (sen hökman meniň bilen barýarsyň)\n" +
          "我们一起去吧！— Şol many, ýöne birneme näbelli\n\n" +
          "ÖZ toparyň hakda gürrüň berseň (diňleýji ol toparda ÝOK) — diňe 我们:\n" +
          "我们学校 — biziň mekdebimiz (sen ol mekdepde däl)\n\n" +
          "咱们 — demirgazyk/Pekin stili, günortada az ulanylýar.",
        examples: [
          { hanzi: "咱们一起去吧！", pinyin: "Zánmen yìqǐ qù ba!", translation: "Bile gideliň (sen we men)!" },
          { hanzi: "咱们几点去？", pinyin: "Zánmen jǐ diǎn qù?", translation: "Näçede gideris (biz seniň bilen)?" },
          { hanzi: "明天是星期天，咱们去酒吧吧。", pinyin: "Míngtiān shì xīngqītiān, zánmen qù jiǔbā ba.", translation: "Ertir ýekşenbe, bara gideliň." },
          { hanzi: "我们学校很大。", pinyin: "Wǒmen xuéxiào hěn dà.", translation: "Biziň uniwersitetimiz uly." },
        ],
      },
      {
        title: "Alternatiw sorag: A不A / V不V",
        explanation:
          "吗-niň deregine şeýle sorag berip bolýar: sypaty/işligi arasynda 不 bilen gaýtalamaly.\n\n" +
          "Shemalar:\n" +
          "• Sypat + 不 + Sypat = Sypat + 吗\n" +
          "  冷不冷？ = 冷吗？ — Sowukmy?\n\n" +
          "• Işlik + 不 + Işlik = Işlik + 吗\n" +
          "  去不去？ = 去吗？ — Gidýärsiňmi (ýa-da ýok)?\n" +
          "  是不是？ = 是吗？ — Şeýlemi?\n" +
          "  有没有？ = 有吗？ — Barmy ýa-da ýok?\n\n" +
          "Möhüm: bu görnüşde 吗 ULANYLMAÝAR!\n" +
          "❌ 冷不冷吗？\n" +
          "✅ 冷不冷？\n\n" +
          "Bu görnüş 吗 bilen deňeşdirilende has göni we «barlaýjy» ýaly eşidilýär.",
        examples: [
          { hanzi: "那儿的东西贵不贵？", pinyin: "Nàr de dōngxi guì bu guì?", translation: "Ol ýerde gymmatmy?" },
          { hanzi: "你买不买东西？", pinyin: "Nǐ mǎi bu mǎi dōngxi?", translation: "Sen bir zat satyn alýarsyňmy ýa-da ýok?" },
          { hanzi: "你是不是美国人？", pinyin: "Nǐ shì bu shì Měiguó rén?", translation: "Sen amerikalymy ýa-da ýok?" },
          { hanzi: "今天有没有作业？", pinyin: "Jīntiān yǒu méi yǒu zuòyè?", translation: "Şu gün öý işi barmy ýa-da ýok?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Banka we dükana (阿曼 we 张伟)",
        lines: [
          { speaker: "A", hanzi: "你好，张伟。你去哪儿？", pinyin: "Nǐ hǎo, Zhāng Wěi. Nǐ qù nǎr?", translation: "Salam, Zhang Wei. Nirä gidýärsiň?" },
          { speaker: "B", hanzi: "我去图书馆借书，你呢？", pinyin: "Wǒ qù túshūguǎn jiè shū, nǐ ne?", translation: "Kitaphana kitap almaga. Sen näme?" },
          { speaker: "A", hanzi: "我先去银行换钱，然后去商店买东西。", pinyin: "Wǒ xiān qù yínháng huàn qián, ránhòu qù shāngdiàn mǎi dōngxi.", translation: "Ilki banka pul çalyşmaga, soň dükana söwda etmäge." },
          { speaker: "B", hanzi: "我也要去银行，咱们一起去吧！", pinyin: "Wǒ yě yào qù yínháng, zánmen yìqǐ qù ba!", translation: "Maňa-da banka gerek — bile gideliň!" },
          { speaker: "A", hanzi: "你不去图书馆吗？", pinyin: "Nǐ bú qù túshūguǎn ma?", translation: "Kitaphana gitmeýärsiňmi?" },
          { speaker: "B", hanzi: "没关系，图书馆不关门。", pinyin: "Méi guānxi, túshūguǎn bù guān mén.", translation: "Zyýany ýok, kitaphana ýapylmaýar." },
        ],
      },
      {
        title: "Söwda merkezine gitmek (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，明天是星期天，你打算干什么？", pinyin: "Zhōngcūn, míngtiān shì xīngqītiān, nǐ dǎsuàn gàn shénme?", translation: "Nakamura, ertir ýekşenbe, näme meýilleşdirýärsiň?" },
          { speaker: "B", hanzi: "我打算去商店买东西。", pinyin: "Wǒ dǎsuàn qù shāngdiàn mǎi dōngxi.", translation: "Söwda etmäge gitmegi meýilleşdirýärin." },
          { speaker: "A", hanzi: "是学校的商店吗？", pinyin: "Shì xuéxiào de shāngdiàn ma?", translation: "Mekdebiň dükanynamy?" },
          { speaker: "B", hanzi: "不，是购物中心。", pinyin: "Bù, shì gòuwù zhōngxīn.", translation: "Ýok, söwda merkezine." },
          { speaker: "A", hanzi: "那儿的东西贵不贵？", pinyin: "Nàr de dōngxi guì bu guì?", translation: "Ol ýerde gymmatmy?" },
          { speaker: "B", hanzi: "还可以。那儿的东西很多，质量也不错。", pinyin: "Hái kěyǐ. Nàr de dōngxi hěn duō, zhìliàng yě búcuò.", translation: "Erbet däl. Ol ýerde köp zat bar, hili-de erbet däl." },
          { speaker: "A", hanzi: "我正打算买衣服呢，明天和你一起去，好不好？", pinyin: "Wǒ zhèng dǎsuàn mǎi yīfu ne, míngtiān hé nǐ yìqǐ qù, hǎo bu hǎo?", translation: "Men edil häzir eşik almagy meýilleşdirýärdim — ertir seniň bilen bile gideli, bolýarmy?" },
          { speaker: "B", hanzi: "好啊！", pinyin: "Hǎo a!", translation: "Bolýar!" },
          { speaker: "A", hanzi: "咱们几点去？", pinyin: "Zánmen jǐ diǎn qù?", translation: "Näçede gideris?" },
          { speaker: "B", hanzi: "购物中心九点开门，咱们十点去吧。", pinyin: "Gòuwù zhōngxīn jiǔ diǎn kāi mén, zánmen shí diǎn qù ba.", translation: "Söwda merkezi 9-da açylýar, 10-da gideliň." },
        ],
      },
    ],

    tips: [
      "还可以 (hái kěyǐ) — «erbet däl, bolýar, ýaramaz däl». Bitarap baha — erbet däl, ýöne ajaýyp-da däl. Hytaý gepleşiginde göni «erbet» diýmek sylagsyzlyk hasaplanýar, şonuň üçin bu jümle örän peýdaly.",
      "不错 (búcuò) göni manysy «ýalňyşlyk däl» = «erbet däl, gowy». 还可以-den güýçli. «Hil erbet däl» = 质量不错.",
      "打算 (dǎsuàn) — «meýilleşdirmek, niýetlenmek». 计划-den (resmi meýilnama) tapawutlylykda, 打算 gündelik meýiller üçin ulanylýar: 我打算去... «men gitmegi meýilleşdirýärin...».",
      "开门/关门 görnüşleri — dükanlar hakda: 几点开门？ (näçede açylýar?), 几点关门？ (näçede ýapylýar?).",
      "A不A soragyny 很 bilen ulanyp BOLMAÝAR: ❌ 很冷不冷 — beýle ýok. Diňe 冷不冷? bolýar. «Örän» diýmek isleseň — sözlemi başgaça gur.",
    ],
  },

  14: {
    introduction:
      "Bu bapda siz zatlary (eşikleri, ulaglary) reňki, ölçegi, hili boýunça beýan etmegi öwrenersiňiz. 挺 («birneme») hal-sözi, 有(一)点儿 («azajyk, birneme») aňlatmasy we «X的» gurluşy (aty çalyşýan) bilen tanyşarsyňyz.\n\n" +
      "Ýagdaý: 古丽 中村 bilen switer saýlaýar, soň 阿曼 onuň bilen täze welosipedi hakda gürrüň edýär.",

    vocabulary: [
      { hanzi: "件", pinyin: "jiàn", translation: "eşik üçin sanaýyş sözi" },
      { hanzi: "白", pinyin: "bái", translation: "ak" },
      { hanzi: "毛衣", pinyin: "máoyī", translation: "switer" },
      { hanzi: "挺", pinyin: "tǐng", translation: "birneme, bütinleý" },
      { hanzi: "好看", pinyin: "hǎokàn", translation: "owadan, gelşikli" },
      { hanzi: "容易", pinyin: "róngyì", translation: "aňsat" },
      { hanzi: "脏", pinyin: "zāng", translation: "hapa" },
      { hanzi: "蓝", pinyin: "lán", translation: "gök" },
      { hanzi: "颜色", pinyin: "yánsè", translation: "reňk" },
      { hanzi: "有点儿", pinyin: "yǒudiǎnr", translation: "azajyk, birneme" },
      { hanzi: "深", pinyin: "shēn", translation: "goýy (reňk), çuň" },
      { hanzi: "浅", pinyin: "qiǎn", translation: "açyk (reňk), çuň däl" },
      { hanzi: "黄", pinyin: "huáng", translation: "sary" },
      { hanzi: "漂亮", pinyin: "piàoliang", translation: "owadan" },
      { hanzi: "它", pinyin: "tā", translation: "ol (zatlar üçin)" },
      { hanzi: "昨天", pinyin: "zuótiān", translation: "düýn" },
      { hanzi: "新", pinyin: "xīn", translation: "täze" },
      { hanzi: "辆", pinyin: "liàng", translation: "ulag üçin sanaýyş sözi" },
      { hanzi: "旧", pinyin: "jiù", translation: "köne, ulanylan" },
      { hanzi: "便宜", pinyin: "piányi", translation: "arzan" },
      { hanzi: "丢", pinyin: "diū", translation: "ýitirmek, ogurlamak" },
      { hanzi: "别的", pinyin: "bié de", translation: "başga" },
      { hanzi: "黑", pinyin: "hēi", translation: "gara" },
      { hanzi: "灰", pinyin: "huī", translation: "çal" },
      { hanzi: "绿", pinyin: "lǜ", translation: "ýaşyl" },
    ],

    grammar: [
      {
        title: "挺 + sypat + 的 — «birneme, bütinleý»",
        explanation:
          "挺 (tǐng) — «birneme, bütinleý». 很-niň gepleşik dilindäki alternatiwasy. Köplenç soňunda 的 bilen gelýär.\n\n" +
          "Shema:  挺 + Sypat + 的\n\n" +
          "挺好看的 — birneme owadan\n" +
          "挺漂亮的 — birneme gözel\n" +
          "挺冷的 — birneme sowuk\n\n" +
          "挺 güýji boýunça takmynan 很 ýaly, ýöne has gepleşik dilinde we mähirli eşidilýär. Gündelik gürrüňdeşlik üçin ajaýyp.",
        examples: [
          { hanzi: "那件白毛衣挺好看的。", pinyin: "Nà jiàn bái máoyī tǐng hǎokàn de.", translation: "Ol ak switer birneme owadan." },
          { hanzi: "你的毛衣挺漂亮的。", pinyin: "Nǐ de máoyī tǐng piàoliang de.", translation: "Seniň switeriň birneme gözel." },
          { hanzi: "学校商店的东西挺便宜的。", pinyin: "Xuéxiào shāngdiàn de dōngxi tǐng piányi de.", translation: "Uniwersitetiň dükanyndaky zatlar birneme arzan." },
          { hanzi: "北京的冬天挺冷的。", pinyin: "Běijīng de dōngtiān tǐng lěng de.", translation: "Pekiniň gyşy birneme sowuk." },
        ],
      },
      {
        title: "的-jümle — «X bolan zat»",
        explanation:
          "X + 的 (yzyndan at gelmese) kontekst düşnükli bolsa, aty çalyşýan aýratyn jümlä öwrülýär.\n\n" +
          "X şular bolup biler:\n" +
          "• Sypat:  白的 (ak, ak zat), 贵的 (gymmat zat)\n" +
          "• At/Çalyşma:  我的 (meniňki), 老师的 (mugallymyňky)\n" +
          "• Işlik:  我买的 (men satyn alan zat), 昨天吃的 (düýn iýilen zat)\n\n" +
          "Mysal:\n" +
          "这件毛衣白。— Bu switer ak.\n" +
          "我喜欢白的。— Men agyny halaýaryn (ak zat — switer göz öňünde tutulýar).\n\n" +
          "Bu gepleşikde örän ýygy gurluş.",
        examples: [
          { hanzi: "白的容易脏。", pinyin: "Bái de róngyì zāng.", translation: "Agy aňsat hapalanýar." },
          { hanzi: "我喜欢浅颜色的。", pinyin: "Wǒ xǐhuan qiǎn yánsè de.", translation: "Men açyk reňkleri halaýaryn (açyk reňkli zatlary)." },
          { hanzi: "这辆自行车是我昨天买的。", pinyin: "Zhè liàng zìxíngchē shì wǒ zuótiān mǎi de.", translation: "Bu welosiped — men düýn satyn alan zadym." },
          { hanzi: "这本词典是英文的。", pinyin: "Zhè běn cídiǎn shì Yīngwén de.", translation: "Bu sözlük — iňlis dilinde." },
        ],
      },
      {
        title: "有(一)点儿 + sypat — «azajyk, birneme»",
        explanation:
          "有(一)点儿 (yǒu(yì)diǎnr) sypatdan ÖŇ goýulýar we «azajyk, birneme» diýen manyny berýär. Köplenç ýaramaz öwüşgin bilen.\n\n" +
          "Shema:  有(一)点儿 + Sypat\n\n" +
          "有点儿冷 — azajyk sowuk (we bu erbet)\n" +
          "有点儿贵 — birneme gymmatrak\n" +
          "有点儿深 — azajyk goýurak\n\n" +
          "Möhüm: işlikden soň gelýän (一)点儿 (有-siz) bilen bulaşdyrma — bu ýaramaz öwüşginsiz «azajyk».\n\n" +
          "Deňeşdir:\n" +
          "• 有点儿贵 — «gymmatrak» (şikaýat)\n" +
          "• 便宜一点儿 — «azajyk arzanrak» (haýyş)",
        examples: [
          { hanzi: "这件的颜色有点儿深。", pinyin: "Zhè jiàn de yánsè yǒudiǎnr shēn.", translation: "Munuň reňki azajyk goýy." },
          { hanzi: "今天有点儿冷。", pinyin: "Jīntiān yǒudiǎnr lěng.", translation: "Şu gün azajyk sowugrak." },
          { hanzi: "黑颜色的有点儿贵。", pinyin: "Hēi yánsè de yǒudiǎnr guì.", translation: "Gara reňki birneme gymmatrak." },
          { hanzi: "他有点儿不高兴。", pinyin: "Tā yǒudiǎnr bù gāoxìng.", translation: "Ol birneme gynanýar." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Switer saýlaýarys (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，你看，那件白毛衣怎么样？", pinyin: "Zhōngcūn, nǐ kàn, nà jiàn bái máoyī zěnmeyàng?", translation: "Nakamura, seret, ol ak switer nähili?" },
          { speaker: "B", hanzi: "挺好看的。不过，白的容易脏。这件蓝的怎么样？", pinyin: "Tǐng hǎokàn de. Búguò, bái de róngyì zāng. Zhè jiàn lán de zěnmeyàng?", translation: "Birneme owadan. Ýöne agy aňsat hapalanýar. Bu gögi nähili?" },
          { speaker: "A", hanzi: "这件的颜色有点儿深，我喜欢浅颜色的。", pinyin: "Zhè jiàn de yánsè yǒudiǎnr shēn, wǒ xǐhuan qiǎn yánsè de.", translation: "Munuň reňki azajyk goýy, men açyk reňkleri halaýaryn." },
          { speaker: "B", hanzi: "那件黄的呢？", pinyin: "Nà jiàn huáng de ne?", translation: "Ol saryny näme diýýärsiň?" },
          { speaker: "A", hanzi: "不错，挺漂亮的，就买它吧。", pinyin: "Búcuò, tǐng piàoliang de, jiù mǎi tā ba.", translation: "Erbet däl, birneme gözel — muny satyn alaýyn." },
        ],
      },
      {
        title: "Täze welosiped (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，这是你的自行车吗？", pinyin: "Gǔlì, zhè shì nǐ de zìxíngchē ma?", translation: "Gülnara, bu seniň welosipediňmi?" },
          { speaker: "B", hanzi: "对，这是我昨天买的，怎么样？", pinyin: "Duì, zhè shì wǒ zuótiān mǎi de, zěnmeyàng?", translation: "Hawa, düýn satyn aldym. Nähili?" },
          { speaker: "A", hanzi: "挺漂亮的，是新的吗？", pinyin: "Tǐng piàoliang de, shì xīn de ma?", translation: "Birneme gözel. Täzemi?" },
          { speaker: "B", hanzi: "对，我买的是一辆旧的，旧的比较便宜，也不容易丢。", pinyin: "Duì, wǒ mǎi de shì yí liàng jiù de, jiù de bǐjiào piányi, yě bù róngyì diū.", translation: "Ýok, men könesini satyn aldym, könesi birneme arzan, ony ogurlamak-da aňsat däl." },
          { speaker: "A", hanzi: "有别的颜色吗？", pinyin: "Yǒu bié de yánsè ma?", translation: "Başga reňkleri barmy?" },
          { speaker: "B", hanzi: "有，有黑的、蓝的、还有灰的、黄的。你喜欢什么颜色的？", pinyin: "Yǒu, yǒu hēi de, lán de, hái yǒu huī de, huáng de. Nǐ xǐhuan shénme yánsè de?", translation: "Bar — garasy, gögi, çaly, sarysy bar. Saňa haýsy reňk ýarýar?" },
          { speaker: "A", hanzi: "我喜欢绿的。", pinyin: "Wǒ xǐhuan lǜ de.", translation: "Men ýaşyly halaýaryn." },
        ],
      },
    ],

    tips: [
      "Eşik üçin sanaýyş sözler: 件 (jiàn) — ýokarky eşikler üçin (köýnek, switer, palto), 条 (tiáo) — aşaky eşikler üçin (balak, ýubka). «Bir köýnek» = 一件衬衫, «bir balak» = 一条裤子.",
      "深 we 浅 reňkler hakda: 深蓝 — goýy gök, 浅蓝 — açyk gök. Suw hakda 深/浅 = çuň/çuň däl.",
      "它 (tā) — zatlar we haýwanlar üçin «ol». Gepleşikde hytaýlar köplenç çalyşmalary taşlaýarlar, 它 bolsa 他/她-den seýrek ulanylýar.",
      "Häsiýetlendirmede garşylykly sözler: 新/旧 (täze/köne), 贵/便宜 (gymmat/arzan), 深/浅 (goýy/açyk), 大/小 (uly/kiçi).",
      "别的 (bié de) = «başga, aýry». «Başga reňkler» = 别的颜色. 其他的 (qítā de)-e meňzeş, ýöne 别的 has gepleşik dilinde.",
    ],
  },

  15: {
    introduction:
      "Bu Unit 3-niň jemleýji baby. Siz sowgatlar hakda gürrüň bermegi, «A ýa-da B» saýlawyny (还是), 比如 arkaly mysal getirmegi we 一直 («hemişe») ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 中村 joranyň doglan gününe tort taýýarlaýar, 张伟 阿曼 bilen gyza näme sowgat bermelidigini maslahatlaşýar.",

    vocabulary: [
      { hanzi: "晚饭", pinyin: "wǎnfàn", translation: "agşamlyk" },
      { hanzi: "以后", pinyin: "yǐhòu", translation: "soň, ondan soň" },
      { hanzi: "一直", pinyin: "yìzhí", translation: "hemişe, yzygider" },
      { hanzi: "忙", pinyin: "máng", translation: "başagaý, meşgul" },
      { hanzi: "准备", pinyin: "zhǔnbèi", translation: "taýýarlanmak, taýýarlamak" },
      { hanzi: "礼物", pinyin: "lǐwù", translation: "sowgat" },
      { hanzi: "生日", pinyin: "shēngrì", translation: "doglan gün" },
      { hanzi: "蛋糕", pinyin: "dàngāo", translation: "tort" },
      { hanzi: "送", pinyin: "sòng", translation: "sowgat bermek, ugratmak" },
      { hanzi: "说", pinyin: "shuō", translation: "gürlemek, aýtmak" },
      { hanzi: "特别", pinyin: "tèbié", translation: "aýratyn" },
      { hanzi: "男", pinyin: "nán", translation: "erkek" },
      { hanzi: "还是", pinyin: "háishi", translation: "ýa-da (soragda)" },
      { hanzi: "女", pinyin: "nǚ", translation: "aýal" },
      { hanzi: "可", pinyin: "kě", translation: "bolýar, mynasyp (işlikden öň)" },
      { hanzi: "比如", pinyin: "bǐrú", translation: "meselem" },
      { hanzi: "巧克力", pinyin: "qiǎokèlì", translation: "şokolad" },
      { hanzi: "甜", pinyin: "tián", translation: "süýji" },
      { hanzi: "号", pinyin: "hào", translation: "ölçeg (eşik üçin)" },
      { hanzi: "那么", pinyin: "nàme", translation: "onda, şeýle bolsa" },
      { hanzi: "束", pinyin: "shù", translation: "desse (gül) üçin sanaýyş sözi" },
      { hanzi: "花", pinyin: "huā", translation: "gül" },
      { hanzi: "主意", pinyin: "zhǔyi", translation: "pikir"},
    ],

    grammar: [
      {
        title: "还是 — alternatiw sorag «A ýa-da B?»",
        explanation:
          "还是 (háishi) iki wariantyň arasynda «A ýa-da B?» soragyny gurýar.\n\n" +
          "Shema:  Wariant A + 还是 + Wariant B?\n\n" +
          "男的还是女的？— Erkek ýa-da aýal?\n" +
          "你喝水还是喝咖啡？— Suw işjekmi ýa-da kofe?\n" +
          "你去还是我去？— Sen gidjekmi ýa-da men?\n\n" +
          "Möhüm: 或者 (huòzhě — «ýa-da») bilen bulaşdyrma, ol AÝDYŇLARDA ulanylýar:\n" +
          "• 还是 — soraglarda\n" +
          "• 或者 — aýdyňlarda (men şu gün ýa-da ertir gidip bilerin)",
        examples: [
          { hanzi: "男的还是女的？", pinyin: "Nán de háishi nǚ de?", translation: "Erkek ýa-da aýal?" },
          { hanzi: "你喜欢红的还是蓝的？", pinyin: "Nǐ xǐhuan hóng de háishi lán de?", translation: "Saňa gyzyl ýarýarmy ýa-da gök?" },
          { hanzi: "你去还是我去？", pinyin: "Nǐ qù háishi wǒ qù?", translation: "Sen gidjekmi ýa-da men?" },
          { hanzi: "你喝水还是喝咖啡？", pinyin: "Nǐ hē shuǐ háishi hē kāfēi?", translation: "Suw işjekmi ýa-da kofe?" },
        ],
      },
      {
        title: "比如 — «meselem»",
        explanation:
          "比如 (bǐrú) — «meselem, aýdaly». Mysal getirýär.\n\n" +
          "Shema:  Umumy aýdyň，比如 + Mysal\n\n" +
          "可送的东西很多，比如巧克力。\n" +
          "«Sowgat berere köp zat bar, meselem şokolad.»\n\n" +
          "Hytaýçada 比如 köplenç sözlemiň ortasynda girizme söz hökmünde goýulýar. Şeýle hem 比如说 (bǐrúshuō) ulanylyp bilner — has gepleşik dilinde.",
        examples: [
          { hanzi: "可送的很多啊，比如巧克力。", pinyin: "Kě sòng de hěn duō a, bǐrú qiǎokèlì.", translation: "Sowgat berere köp zat bar, meselem şokolad." },
          { hanzi: "我喜欢很多颜色，比如蓝的、绿的。", pinyin: "Wǒ xǐhuan hěn duō yánsè, bǐrú lán de, lǜ de.", translation: "Maňa köp reňk ýarýar, meselem gök, ýaşyl." },
          { hanzi: "北京有很多大学，比如北京大学、清华大学。", pinyin: "Běijīng yǒu hěn duō dàxué, bǐrú Běijīng Dàxué, Qīnghuá Dàxué.", translation: "Pekinde köp uniwersitet bar, meselem Beýda, Sinhua." },
        ],
      },
      {
        title: "一直 — «hemişe, yzygider»",
        explanation:
          "一直 (yìzhí) — «hemişe, arasyz, dyngysyz». Işlikden ÖŇ goýulýar.\n\n" +
          "Shema:  Eýe + 一直 + Işlik\n\n" +
          "Köplenç dowamly zaman bilen gelýär (正在...呢):\n" +
          "你一直在忙 — «sen şu wagta çenli hemişe başagaý bolduň»\n" +
          "他一直在学汉语 — «ol hemişe hytaý dilini öwrenýär»\n\n" +
          "Şeýle hem «göni öňe»:\n" +
          "一直走 — «göni ýöremek»",
        examples: [
          { hanzi: "从晚饭以后到现在，你一直在忙。", pinyin: "Cóng wǎnfàn yǐhòu dào xiànzài, nǐ yìzhí zài máng.", translation: "Agşamlykdan bäri şu wagta çenli sen hemişe başagaý." },
          { hanzi: "他一直在学汉语。", pinyin: "Tā yìzhí zài xué Hànyǔ.", translation: "Ol hemişe hytaý dilini öwrenýär." },
          { hanzi: "一直走就到了。", pinyin: "Yìzhí zǒu jiù dào le.", translation: "Göni ýöre — baryp ýetersiň." },
        ],
      },
      {
        title: "可 + Işlik — «bolýar/mynasyp etmek»",
        explanation:
          "可 (kě) işlikden öň «bolýar, muny etmek mynasyp» diýen manyny berýär — ýagny bu hereketiň manysy bar / mümkin.\n\n" +
          "Shema:  可 + Işlik + 的 + (At)\n\n" +
          "可送的很多 — sowgat berere köp zat bar (göni manysy: «sowgat-mynasyp köp»)\n" +
          "可看的电影很多 — görere mynasyp kino köp\n" +
          "可去的地方很多 — gidere köp ýer bar\n\n" +
          "Bu kitap dilindäki/sylagly görnüş. Gepleşikde has köp 可以 (kěyǐ) — «bolýar» diýilýär.",
        examples: [
          { hanzi: "可送的很多啊，比如巧克力。", pinyin: "Kě sòng de hěn duō a, bǐrú qiǎokèlì.", translation: "Sowgat berere köp zat bar, meselem şokolad." },
          { hanzi: "电影可看的很多。", pinyin: "Diànyǐng kě kàn de hěn duō.", translation: "Görere mynasyp kino köp." },
          { hanzi: "星期天可去的地方很多。", pinyin: "Xīngqītiān kě qù de dìfang hěn duō.", translation: "Ýekşenbe güni gidere köp ýer bar." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Doglan güne tort (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，从晚饭以后到现在，你一直在忙，忙什么呢？", pinyin: "Zhōngcūn, cóng wǎnfàn yǐhòu dào xiànzài, nǐ yìzhí zài máng, máng shénme ne?", translation: "Nakamura, agşamlykdan bäri şu wagta çenli sen hemişe başagaý — näme bilen meşgullanýarsyň?" },
          { speaker: "B", hanzi: "我在准备礼物呢。", pinyin: "Wǒ zài zhǔnbèi lǐwù ne.", translation: "Sowgat taýýarlaýaryn." },
          { speaker: "A", hanzi: "准备礼物？", pinyin: "Zhǔnbèi lǐwù?", translation: "Sowgatmy?" },
          { speaker: "B", hanzi: "对，明天是我朋友的生日，我做一个蛋糕送给她，你说好不好？", pinyin: "Duì, míngtiān shì wǒ péngyou de shēngrì, wǒ zuò yí ge dàngāo sòng gěi tā, nǐ shuō hǎo bu hǎo?", translation: "Hawa, ertir joram doglan gün. Tort edip oňa sowgat bermekçi, sen näme diýýärsiň?" },
          { speaker: "A", hanzi: "你自己做？", pinyin: "Nǐ zìjǐ zuò?", translation: "Özüň edermiň?" },
          { speaker: "B", hanzi: "对啊，自己做的比较特别。", pinyin: "Duì a, zìjǐ zuò de bǐjiào tèbié.", translation: "Hawa, öz eliň bilen edilen has aýratyn." },
        ],
      },
      {
        title: "Gyza näme sowgat bermeli? (张伟 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，你说，送生日礼物，什么东西比较好？", pinyin: "Āmàn, nǐ shuō, sòng shēngrì lǐwù, shénme dōngxi bǐjiào hǎo?", translation: "Aman, sen näme diýýärsiň, doglan güne näme sowgat bermek gowurak?" },
          { speaker: "B", hanzi: "你打算送给谁？男的还是女的？", pinyin: "Nǐ dǎsuàn sòng gěi shéi? Nán de háishi nǚ de?", translation: "Kime bermekçi? Erkege ýa-da aýala?" },
          { speaker: "A", hanzi: "女的。", pinyin: "Nǚ de.", translation: "Aýala." },
          { speaker: "B", hanzi: "可送的很多啊，比如巧克力。", pinyin: "Kě sòng de hěn duō a, bǐrú qiǎokèlì.", translation: "Sowgat berere köp zat bar, meselem şokolad." },
          { speaker: "A", hanzi: "巧克力有点儿甜，她不喜欢甜的。", pinyin: "Qiǎokèlì yǒudiǎnr tián, tā bù xǐhuan tián de.", translation: "Şokolad birneme süýji, ol süýjini halamaýar." },
          { speaker: "B", hanzi: "衣服呢？", pinyin: "Yīfu ne?", translation: "Eşik nähili?" },
          { speaker: "A", hanzi: "她的衣服号我不知道，也不知道她喜欢什么颜色。", pinyin: "Tā de yīfu hào wǒ bù zhīdào, yě bù zhīdào tā xǐhuan shénme yánsè.", translation: "Onuň eşik ölçegini bilemok, haýsy reňki halaýanyny-da bilemok." },
          { speaker: "B", hanzi: "那么送一束花吧，每个女孩子都喜欢花。", pinyin: "Nàme sòng yí shù huā ba, měi ge nǚ háizi dōu xǐhuan huā.", translation: "Onda bir desse gül ber, her gyz güli halaýar." },
          { speaker: "A", hanzi: "这个主意挺不错的。", pinyin: "Zhège zhǔyi tǐng búcuò de.", translation: "Bu pikir birneme gowy." },
        ],
      },
    ],

    tips: [
      "送-niň iki manysy bar: «sowgat bermek» (送礼物) we «ugratmak» (送朋友回家). Kontekst hemişe düşnükli.",
      "Hytaý medeniýetinde sowgat berilmeýän zatlar: sagat (送钟 = 送终 «soňky ýola ugratmak» ýaly eşidilýär), aýakgap (aýrylyşyk simwoly), zontik (伞 «散» — «aýrylyşyk» ýaly eşidilýär). Ygtybarly sowgatlar: gül, çaý, miwe, şokolad.",
      "一束花 = «bir desse gül». 束 — desseler üçin sanaýyş sözi. Aýry-aýry güller üçin 朵 (duǒ) ulanylýar: 一朵花.",
      "比如 ≈ 比如说 — ikisi hem «meselem». Birinjisi birneme resmi, ikinjisi gepleşik dilinde. Ikisi-de mysalyň başynda gelýär.",
      "主意 (zhǔyi) — «pikir, oý». 这个主意不错 = «erbet däl pikir». Şeýle hem 好主意！— «Ajaýyp pikir!».",
    ],
  },

  16: {
    introduction:
      "Bu bapda siz öz dynç günleriňiz we boş wagtyňyz hakda gürrüň bermegi, işlikleriň gaýtalanmagyny (gepleşigi ýumşatmak üçin), 太……了 gurluşyny we ýer hal-sözüni (在+ýer işlikden öň) ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 阿曼 (işjeň dynç güni janköýeri) kursdaşy (ýalňyz öýde ýadaýan) bilen gürleşýär — her kimiň dynç güni hakda öz garaýşy bar.",

    vocabulary: [
      { hanzi: "又", pinyin: "yòu", translation: "ýene, gaýtadan" },
      { hanzi: "了", pinyin: "le", translation: "bölejik (tamamlanma/üýtgeşme)" },
      { hanzi: "看起来", pinyin: "kànqǐlai", translation: "meňzeýär, görnüşi boýunça" },
      { hanzi: "啦", pinyin: "la", translation: "bölejik (duýgy taýdan nygtaýar)" },
      { hanzi: "可以", pinyin: "kěyǐ", translation: "bolýar, mümkinçiligi bar" },
      { hanzi: "好好儿", pinyin: "hǎohāor", translation: "gowyja, doly-dolusy" },
      { hanzi: "觉得", pinyin: "juéde", translation: "duýmak, hasaplamak" },
      { hanzi: "没意思", pinyin: "méi yìsi", translation: "gyzykly däl" },
      { hanzi: "电视", pinyin: "diànshì", translation: "telewizor" },
      { hanzi: "洗", pinyin: "xǐ", translation: "ýuwmak" },
      { hanzi: "睡懒觉", pinyin: "shuì lǎnjiào", translation: "köpräk ýatmak, ukusyny almak" },
      { hanzi: "睡觉", pinyin: "shuì jiào", translation: "ýatmak" },
      { hanzi: "出去", pinyin: "chūqu", translation: "çykyp gitmek" },
      { hanzi: "逛", pinyin: "guàng", translation: "gezmek (dükanlarda)" },
      { hanzi: "学习", pinyin: "xuéxí", translation: "okamak, öwrenmek" },
      { hanzi: "不同", pinyin: "bùtóng", translation: "dürli, başga-başga" },
      { hanzi: "安排", pinyin: "ānpái", translation: "meýilleşdirmek, meýilnama" },
      { hanzi: "上", pinyin: "shàng", translation: "geçen, öňki" },
      { hanzi: "包", pinyin: "bāo", translation: "gaplamak, ýasamak (pelmeni)" },
      { hanzi: "饺子", pinyin: "jiǎozi", translation: "pelmeni, jiaozi" },
      { hanzi: "迪厅", pinyin: "dítīng", translation: "diskoteka" },
      { hanzi: "跳舞", pinyin: "tiào wǔ", translation: "tans etmek" },
      { hanzi: "听", pinyin: "tīng", translation: "diňlemek" },
      { hanzi: "音乐会", pinyin: "yīnyuèhuì", translation: "konsert" },
    ],

    grammar: [
      {
        title: "Işlikleriň gaýtalanmagy: V-V (ýumşak, ýeňil görnüş)",
        explanation:
          "Hytaýçada işlikler köplenç gaýtalanýar, hereketi has resmi däl, ýeňil, wagt taýdan gysga etmek üçin.\n\n" +
          "Shemalar:\n" +
          "• Bir bogunly işlik:  V + V  ýa-da  V + 一 + V\n" +
          "  看看 = seret\n" +
          "  试试 = synanyş\n" +
          "  看一看 = azajyk seret\n\n" +
          "• Iki bogunly işlik:  AB + AB\n" +
          "  学习学习 = azajyk okamak\n" +
          "  休息休息 = azajyk dynç almak\n\n" +
          "Öwüşgin: «azajyk, ýeňilräk, synanyş». Gündelik gepleşikde örän ýygy.",
        examples: [
          { hanzi: "周末可以好好儿玩儿玩儿。", pinyin: "Zhōumò kěyǐ hǎohāor wánr wánr.", translation: "Dynç günleri gowyja dynç alyp bolýar." },
          { hanzi: "在宿舍里看看电视，洗洗衣服。", pinyin: "Zài sùshè li kànkan diànshì, xǐxi yīfu.", translation: "Ýatakhanada telewizora seredýärin, eşiklerimi ýuwýaryn." },
          { hanzi: "和朋友逛逛商店。", pinyin: "Hé péngyou guàngguang shāngdiàn.", translation: "Dostum bilen dükanlarda gezeris." },
          { hanzi: "去图书馆学习学习。", pinyin: "Qù túshūguǎn xuéxí xuéxí.", translation: "Kitaphana azajyk okamaga giderin." },
        ],
      },
      {
        title: "太……了 gurluşy (giňeldilen) — «aşa»",
        explanation:
          "Bu gurluşy 6-njy bapda görüpdik (太早了). 16-njy bapda ähli öwüşginlerini berkideliň:\n\n" +
          "Shema:  太 + Sypat/Işlik + 了\n\n" +
          "Şulary aňladyp biler:\n" +
          "• Ýaramaz («aşa»):  太累了！— Aşa ýadadym!\n" +
          "• Oňyn («örän gowy»):  太高兴了！— Örän şat!\n" +
          "• Bitarap (ýönekeý ýokary derejä):  太好了！— Ajaýyp!\n\n" +
          "Kontekst gowy ýa-da erbetdigini kesgitleýär. 了 bölejigi diýen ýaly hemişe hökmany — onsuz sözlem kesik ýaly eşidilýär.",
        examples: [
          { hanzi: "明天又是周末，太高兴了！", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le!", translation: "Ertir ýene dynç güni — örän şat!" },
          { hanzi: "今天太冷了。", pinyin: "Jīntiān tài lěng le.", translation: "Şu gün aşa sowuk." },
          { hanzi: "这个房间太舒服了！", pinyin: "Zhège fángjiān tài shūfu le!", translation: "Bu otag örän amatly!" },
          { hanzi: "这件毛衣的颜色太浅了，我不喜欢。", pinyin: "Zhè jiàn máoyī de yánsè tài qiǎn le, wǒ bù xǐhuan.", translation: "Bu switeriň reňki aşa açyk, halamok." },
        ],
      },
      {
        title: "Ýer hal-sözi: 在 + ýer + işlik",
        explanation:
          "«Y ýerinde X edýärin»: hytaýçada «ýerde» HEMIŞE işlikden ÖŇ goýulýar.\n\n" +
          "Shema:  Eýe + 在 + Ýer + Işlik + (Obýekt)\n\n" +
          "阿曼在北京大学学习汉语。\n" +
          "«Aman Pekin uniwersitetinde hytaý dilini öwrenýär.»\n\n" +
          "ÜNS BER — rusçada tertip ters:\n" +
          "• Rusça: «Aman hytaý dilini öwrenýär PEKINDE»\n" +
          "• Hytaýça: «Aman PEKINDE hytaý dilini öwrenýär»\n\n" +
          "Ýeri sözlemiň soňuna goýup bolmaýar — bu başga many berýär (ýersiz 在 işligi).",
        examples: [
          { hanzi: "在宿舍里看电视。", pinyin: "Zài sùshè li kàn diànshì.", translation: "Ýatakhanada telewizor görýärin." },
          { hanzi: "阿曼在北京大学学习汉语。", pinyin: "Āmàn zài Běijīng Dàxué xuéxí Hànyǔ.", translation: "Aman Pekin uniwersitetinde hytaý dilini öwrenýär." },
          { hanzi: "他在图书馆看书。", pinyin: "Tā zài túshūguǎn kàn shū.", translation: "Ol kitaphanada okaýar." },
          { hanzi: "他们在购物中心买东西。", pinyin: "Tāmen zài gòuwù zhōngxīn mǎi dōngxi.", translation: "Olar söwda merkezinde satyn alýarlar." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Dynç günleri hakda (阿曼 we kursdaşy)",
        lines: [
          { speaker: "A", hanzi: "明天又是周末，太高兴了！", pinyin: "Míngtiān yòu shì zhōumò, tài gāoxìng le!", translation: "Ertir ýene dynç güni — örän şat!" },
          { speaker: "B", hanzi: "看起来，你很喜欢周末。", pinyin: "Kànqǐlai, nǐ hěn xǐhuan zhōumò.", translation: "Görnüşi ýaly, sen dynç günlerini gaty halaýarsyň." },
          { speaker: "A", hanzi: "当然喜欢啦！周末可以好好儿玩儿玩儿，你不喜欢吗？", pinyin: "Dāngrán xǐhuan la! Zhōumò kěyǐ hǎohāor wánr wánr, nǐ bù xǐhuan ma?", translation: "Elbetde halaýaryn! Dynç günleri gowyja dynç alyp bolýar — sen halamaýarsyňmy?" },
          { speaker: "B", hanzi: "我不喜欢。每个周末，我都觉得没意思。", pinyin: "Wǒ bù xǐhuan. Měi ge zhōumò, wǒ dōu juéde méi yìsi.", translation: "Men halamaýaryn. Her dynç güni maňa gyzykly däl." },
          { speaker: "A", hanzi: "你周末都干什么呢？", pinyin: "Nǐ zhōumò dōu gàn shénme ne?", translation: "Sen dynç günleri näme edýärsiň?" },
          { speaker: "B", hanzi: "在宿舍里看看电视，洗洗衣服，做做作业，睡睡懒觉……", pinyin: "Zài sùshè li kànkan diànshì, xǐxi yīfu, zuòzuo zuòyè, shuìshui lǎnjiào...", translation: "Ýatakhanada telewizora seredýärin, eşik ýuwýaryn, öý işimi edýärin, köpräk ýatýaryn…" },
          { speaker: "A", hanzi: "你不和朋友一起出去玩儿吗？", pinyin: "Nǐ bù hé péngyou yìqǐ chūqu wánr ma?", translation: "Dostlaryň bilen gezmäge çykmaýarsyňmy?" },
          { speaker: "B", hanzi: "有时候和朋友一起逛逛商店，有时候去图书馆学习学习。你周末都干什么呢？", pinyin: "Yǒu shíhou hé péngyou yìqǐ guàngguang shāngdiàn, yǒu shíhou qù túshūguǎn xuéxí xuéxí. Nǐ zhōumò dōu gàn shénme ne?", translation: "Käwagt dostlar bilen dükanlarda gezýärin, käwagt kitaphana gidýärin. Sen dynç günleri näme edýärsiň?" },
          { speaker: "A", hanzi: "我每个周末都有不同的安排。上个周末到朋友家包饺子，上上个周末去迪厅跳舞……", pinyin: "Wǒ měi ge zhōumò dōu yǒu bù tóng de ānpái. Shàng ge zhōumò dào péngyou jiā bāo jiǎozi, shàng shàng ge zhōumò qù dítīng tiào wǔ...", translation: "Meniň her dynç günüm dürli meýilnamam bar. Geçen dynç güni dostumyň öýünde pelmeni ýasadym, ondan öňkü dynç güni diskotekada tans etdim…" },
          { speaker: "B", hanzi: "这个周末你干什么？", pinyin: "Zhège zhōumò nǐ gàn shénme?", translation: "Bu dynç güni näme meýilleşdirýärsiň?" },
          { speaker: "A", hanzi: "我去听音乐会。一起去，怎么样？", pinyin: "Wǒ qù tīng yīnyuèhuì. Yìqǐ qù, zěnmeyàng?", translation: "Men konserte gidýärin. Bile gideliň, nähili?" },
          { speaker: "B", hanzi: "好啊，太好了！", pinyin: "Hǎo a, tài hǎo le!", translation: "Bolýar, ajaýyp!" },
        ],
      },
    ],

    tips: [
      "Gaýtalama işligi «ýumşadýar». Deňeşdir: 看书 («oka») bilen 看看书 («azajyk oka»). Haýyşlar üçin hemişe gaýtalanan görnüş gowurak — has sylagly.",
      "上 wagt manysynda = «geçen»: 上星期 (geçen hepde), 上个月 (geçen aý), 上个周末 (geçen dynç güni). 上上 = «ondan öňki».",
      "又 we 再: ikisi hem «ýene». 又 — geçmiş/gaýtalanýan barada («ýene-de»), 再 — geljek barada («ýene ederin»). 又是周末 = «ýene dynç güni» (yzygider bolup durýar).",
      "啦 (la) = 了+啊, duýgy bölejigi. Höwesi görkezýär: 当然喜欢啦! («elbetde halaýaryn!»). Ýeňil dostlukly äheň berýär.",
      "好好儿 (hǎohāor) — «gowyja, düýpli». Işlikden öň goýulýar: 好好儿玩儿 (gowyja dynç almak), 好好儿学习 (gowyja okamak).",
    ],
  },

  17: {
    introduction:
      "Bu bapda siz myhmançylyga barmagy öwrenersiňiz: öý eýelerini salamlamak, sowgat bermek, sylagly klişeler aýtmak. 会 («başarmak») işligi, nygtaýjy 就是 we beýleki etiket kadalary bilen tanyşarsyňyz.\n\n" +
      "Ýagdaý: 阿曼 we 古丽 王老师-niň myhmançylygyna barýarlar — sowgat alyşýarlar we pelmeni ýasaýarlar.",

    vocabulary: [
      { hanzi: "做客", pinyin: "zuò kè", translation: "myhmançylykda bolmak" },
      { hanzi: "请进", pinyin: "qǐng jìn", translation: "geçiň, hoş geldiňiz" },
      { hanzi: "真", pinyin: "zhēn", translation: "hakykatdanam, çyndan" },
      { hanzi: "干净", pinyin: "gānjìng", translation: "arassa" },
      { hanzi: "坐", pinyin: "zuò", translation: "oturmak" },
      { hanzi: "哎呀", pinyin: "āiyā", translation: "eý, waý (haýran galma)" },
      { hanzi: "客气", pinyin: "kèqi", translation: "sylagly, çekinmek" },
      { hanzi: "一点儿", pinyin: "yìdiǎnr", translation: "azajyk, birneme" },
      { hanzi: "心意", pinyin: "xīnyì", translation: "üns alamaty" },
      { hanzi: "收下", pinyin: "shōuxià", translation: "kabul etmek (sowgat)" },
      { hanzi: "茶", pinyin: "chá", translation: "çaý" },
      { hanzi: "果汁", pinyin: "guǒzhī", translation: "miwe suwy" },
      { hanzi: "随便", pinyin: "suíbiàn", translation: "islendik, tapawudy ýok" },
      { hanzi: "行", pinyin: "xíng", translation: "bolýar, laýyk gelýär" },
      { hanzi: "路上", pinyin: "lùshàng", translation: "ýolda" },
      { hanzi: "顺利", pinyin: "shùnlì", translation: "rahat, kynçylyksyz" },
      { hanzi: "挤", pinyin: "jǐ", translation: "gysyk, doly" },
      { hanzi: "打车", pinyin: "dǎ chē", translation: "taksi tutmak" },
      { hanzi: "空调", pinyin: "kōngtiáo", translation: "kondisioner" },
      { hanzi: "大巴", pinyin: "dàbā", translation: "uly awtobus" },
      { hanzi: "地铁", pinyin: "dìtiě", translation: "metro" },
      { hanzi: "饿", pinyin: "è", translation: "ac" },
      { hanzi: "吃", pinyin: "chī", translation: "iýmek" },
      { hanzi: "会", pinyin: "huì", translation: "başarmak" },
      { hanzi: "试", pinyin: "shì", translation: "synanyşmak" },
    ],

    grammar: [
      {
        title: "会 işligi — «başarmak (öwrenmek arkaly)»",
        explanation:
          "会 (huì) — «başarmak», ýöne diňe ÖWRENILEN başarnyklar barada: dilde gepleşmek, nahar bişirmek, ulag sürmek.\n\n" +
          "Shema:  Eýe + 会 + Işlik + (Obýekt)\n\n" +
          "我会包饺子。— Men pelmeni ýasap bilýärin.\n" +
          "我会说英语。— Men iňlisçe gepläp bilýärin.\n\n" +
          "Inkär: 不会.\n" +
          "他不会说英语。— Ol iňlisçe gepläp bilenok.\n\n" +
          "会-niň başga manylary hem bar (mümkinçilik, ähtimallyk) — olary soň öwreneris. Häzirlikçe — diňe «başarmak».",
        examples: [
          { hanzi: "你们会包吗？", pinyin: "Nǐmen huì bāo ma?", translation: "Siz ýasap bilýärsiňizmi?" },
          { hanzi: "我会包饺子。", pinyin: "Wǒ huì bāo jiǎozi.", translation: "Men pelmeni ýasap bilýärin." },
          { hanzi: "我会说英语，他不会说英语。", pinyin: "Wǒ huì shuō Yīngyǔ, tā bú huì shuō Yīngyǔ.", translation: "Men iňlisçe gepläp bilýärin, ol bolsa bilenok." },
          { hanzi: "你会骑自行车吗？", pinyin: "Nǐ huì qí zìxíngchē ma?", translation: "Sen welosipedde sürüp bilýärsiňmi?" },
        ],
      },
      {
        title: "就是 — nygtaýjy «edil, hut»",
        explanation:
          "就是 (jiùshì) eýe bilen habaryň arasynda — güýçlendirmek üçin: «edil şu, hut şeýle».\n\n" +
          "Shema:  Eýe + 就是 + Obýekt/Beýan\n\n" +
          "我最喜欢吃的就是饺子。\n" +
          "«Iýmekde iň halaýanym — edil pelmeni.»\n\n" +
          "他就是王老师。— Bu edil Wan mugallym.\n" +
          "这儿就是图书馆。— Bu edil kitaphana.\n\n" +
          "«Edil, hut, ine şu» diýip terjime edilýär.",
        examples: [
          { hanzi: "我最喜欢吃的就是饺子。", pinyin: "Wǒ zuì xǐhuan chī de jiùshì jiǎozi.", translation: "Iýmekde iň halaýanym — edil pelmeni." },
          { hanzi: "他就是王老师。", pinyin: "Tā jiùshì Wáng lǎoshī.", translation: "Bu edil Wan mugallym." },
          { hanzi: "这儿就是图书馆。", pinyin: "Zhèr jiùshì túshūguǎn.", translation: "Bu ýerde edil kitaphana." },
          { hanzi: "北京大学的东边就是清华大学。", pinyin: "Běijīng Dàxué de dōngbian jiùshì Qīnghuá Dàxué.", translation: "Beýdanyň gündogarynda edil Sinhua bar." },
        ],
      },
      {
        title: "A 还是 B — «A ýa-da B?» gaýtalamasy (是 bilen)",
        explanation:
          "15-nji bapda 还是-ni saýlaw üçin öwrendik. 17-nji bapda «是 A 还是 B» wariantyny gaýtalaýarys.\n\n" +
          "Shemalar:\n" +
          "• 是 A 还是 B？— «bar/bolmak» many göz öňünde tutulsa\n" +
          "• A 还是 B？— has ýönekeý, 是-siz\n\n" +
          "茶还是果汁？— Çaý ýa-da miwe suwy?\n" +
          "你们一般坐公共汽车还是打车？— Adatça awtobusda ýa-da taksi bilen?\n\n" +
          "Jogapda 是-ni taşlap bolýar.",
        examples: [
          { hanzi: "茶还是果汁？", pinyin: "Chá háishi guǒzhī?", translation: "Çaý ýa-da miwe suwy?" },
          { hanzi: "你是美国人还是加拿大人？", pinyin: "Nǐ shì Měiguó rén háishi Jiānádà rén?", translation: "Sen amerikalymy ýa-da kanadaly?" },
          { hanzi: "你喝茶还是喝咖啡？", pinyin: "Nǐ hē chá háishi hē kāfēi?", translation: "Sen çaý içjekmi ýa-da kofe?" },
          { hanzi: "是你去还是我去？", pinyin: "Shì nǐ qù háishi wǒ qù?", translation: "Sen gidjekmi ýa-da men?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "王老师-niň myhmançylygynda (阿曼, 古丽, 王老师)",
        lines: [
          { speaker: "A", hanzi: "请进，请进！", pinyin: "Qǐng jìn, qǐng jìn!", translation: "Geçiň, geçiň!" },
          { speaker: "B", hanzi: "老师，您的家真干净啊！", pinyin: "Lǎoshī, nín de jiā zhēn gānjìng a!", translation: "Mugallym, öýüňiz hakykatdanam arassa!" },
          { speaker: "A", hanzi: "是吗？来，坐这儿吧！", pinyin: "Shì ma? Lái, zuò zhèr ba!", translation: "Şeýlemi? Geliň, şu ýerde oturyň!" },
          { speaker: "B", hanzi: "这是给您的礼物。", pinyin: "Zhè shì gěi nín de lǐwù.", translation: "Bu size sowgat." },
          { speaker: "A", hanzi: "哎呀！你们太客气了。", pinyin: "Āiyā! Nǐmen tài kèqi le.", translation: "Eý! Siz gaty çekinipsiňiz." },
          { speaker: "B", hanzi: "一点儿心意，请收下。", pinyin: "Yìdiǎnr xīnyì, qǐng shōuxià.", translation: "Kiçijik üns alamaty — kabul ediň." },
          { speaker: "A", hanzi: "谢谢！你们喝什么？茶还是果汁？", pinyin: "Xièxie! Nǐmen hē shénme? Chá háishi guǒzhī?", translation: "Sag boluň! Näme içersiňiz? Çaý ýa-da miwe suwy?" },
          { speaker: "B", hanzi: "随便，什么都行。", pinyin: "Suíbiàn, shénme dōu xíng.", translation: "Tapawudy ýok, islendigi bolýar." },
          { speaker: "A", hanzi: "路上顺利吗？", pinyin: "Lùshàng shùnlì ma?", translation: "Ýolda kynçylyksyz geldiňizmi?" },
          { speaker: "B", hanzi: "不太顺利，车上有点儿挤。", pinyin: "Bú tài shùnlì, chē shàng yǒudiǎnr jǐ.", translation: "Onçakly rahat däldi, awtobusda azajyk gysykdy." },
          { speaker: "A", hanzi: "你们饿不饿？中午在我家吃饺子，怎么样？", pinyin: "Nǐmen è bu è? Zhōngwǔ zài wǒ jiā chī jiǎozi, zěnmeyàng?", translation: "Siz açmy? Günortan meniň öýümde pelmeni iýeli, nähili?" },
          { speaker: "B", hanzi: "太好了，我最喜欢吃的就是饺子。", pinyin: "Tài hǎo le, wǒ zuì xǐhuan chī de jiùshì jiǎozi.", translation: "Ajaýyp, iýmekde iň halaýanym — edil pelmeni!" },
          { speaker: "A", hanzi: "你们会包吗？", pinyin: "Nǐmen huì bāo ma?", translation: "Siz ýasap bilýärsiňizmi?" },
          { speaker: "B", hanzi: "不太会，我们试试吧！", pinyin: "Bú tài huì, wǒmen shìshi ba!", translation: "Onçakly başarmok, synanyşalyň!" },
        ],
      },
    ],

    tips: [
      "Sowgat edebi: 一点儿心意 («kiçijik üns alamaty») — sowgat berlende ulanylýan adaty kiçigöwünlilik formulasy. Öý eýesi jogap edip 太客气了 («gaty çekindiňiz») diýýär.",
      "随便 / 什么都行 — saýlaw hödürlenende örän sylagly jogap. Göni manysy «islendik / hemmesi bolýar». Sylagsyzlyk DÄL, tersine — öz halanyňy zorlamazlyk terbiýelilik hasaplanýar.",
      "饺子 — Hytaýda, aýratyn hem Täze ýylda (春节) simwoliki nahar. Görnüşi gadymy pula meňzeýär, baýlygy aňladýar. Bütin maşgala bolup ýasamak — dessur.",
      "真 (zhēn) sypatdan öň = «hakykatdanam, çyndan»: 真干净 (hakykatdanam arassa), 真好吃 (çyndan tagamly). 很-den güýçli.",
      "哎呀 (āiyā) — haýran galma/gorky/göwnüçökgünlik üçin umumy gykylyk. Kontekst äheňi kesgitleýär. Sowgat alanyňda: haýran galma + sylagly garşy çykyş.",
    ],
  },

  18: {
    introduction:
      "Myhmançylygyň dowamy (Part 2). Siz mysallary sanamagy (A啦 B啦 C啦), 得 («gerek») ulanmagy, 不是……吗? ritorik soragyny we 如果……就…… («eger... onda...») şert dolanyşygyny öwrenersiňiz.\n\n" +
      "Ýagdaý: stoluň başynda demirgazyk we günorta hytaýlaryň iýmit tapawudy hakda, hem-de pelmenini özüň ýasamak ýa-da doňdurylanyny satyn almak haýsynyň aňsatdygy hakda gürrüň edýärler.",

    vocabulary: [
      { hanzi: "好吃", pinyin: "hǎochī", translation: "tagamly" },
      { hanzi: "味道", pinyin: "wèidào", translation: "tagam, ys" },
      { hanzi: "北方", pinyin: "běifāng", translation: "demirgazyk (Hytaýyň)" },
      { hanzi: "过", pinyin: "guò", translation: "geçirmek (wagt), baýram etmek" },
      { hanzi: "节", pinyin: "jié", translation: "baýram" },
      { hanzi: "客人", pinyin: "kèren", translation: "myhman" },
      { hanzi: "南方", pinyin: "nánfāng", translation: "günorta (Hytaýyň)" },
      { hanzi: "米饭", pinyin: "mǐfàn", translation: "gaýnadylan tüwi" },
      { hanzi: "面食", pinyin: "miànshí", translation: "un önümleri" },
      { hanzi: "对……来说", pinyin: "duì...lái shuō", translation: "-e görä, ... üçin aýdylanda" },
      { hanzi: "重要", pinyin: "zhòngyào", translation: "möhüm" },
      { hanzi: "种", pinyin: "zhǒng", translation: "görnüş, sort" },
      { hanzi: "食品", pinyin: "shípǐn", translation: "azyk, iýmit" },
      { hanzi: "麻烦", pinyin: "máfan", translation: "kynçylykly, azap bermek" },
      { hanzi: "少", pinyin: "shǎo", translation: "az" },
      { hanzi: "馅儿", pinyin: "xiànr", translation: "içlik" },
      { hanzi: "得", pinyin: "děi", translation: "gerek, borç" },
      { hanzi: "花", pinyin: "huā", translation: "sarp etmek (wagt, pul)" },
      { hanzi: "超市", pinyin: "chāoshì", translation: "supermarket" },
      { hanzi: "速冻", pinyin: "sùdòng", translation: "doňdurylan" },
      { hanzi: "如果", pinyin: "rúguǒ", translation: "eger" },
      { hanzi: "的话", pinyin: "dehuà", translation: "bolsa (şert bölejigi)" },
      { hanzi: "想", pinyin: "xiǎng", translation: "islemek" },
      { hanzi: "袋", pinyin: "dài", translation: "haltajyk, halta" },
      { hanzi: "偷懒", pinyin: "tōu lǎn", translation: "ýalta bolmak, ýaltanmak" },
      { hanzi: "大家", pinyin: "dàjiā", translation: "hemmeler" },
      { hanzi: "热闹", pinyin: "rènao", translation: "gyzgalaňly, şadyýan" },
      { hanzi: "有意思", pinyin: "yǒu yìsi", translation: "gyzykly" },
    ],

    grammar: [
      {
        title: "啦 arkaly sanamak: A啦 B啦 C啦",
        explanation:
          "Sanawyň her agzasyndan soň 啦 (la) bölejigi = «…, …, … (dürli)». Resmi däl sanawy «hem şu, hem ol» öwüşgini bilen döredýär.\n\n" +
          "Shema:  A 啦，B 啦，C 啦……\n\n" +
          "过生日啦，过节啦，来客人啦 — 一般都包饺子吃。\n" +
          "«Doglan günler, baýramlar, myhman gelende — adatça pelmeni ýasalýar.»\n\n" +
          "啦 dürli ýagdaýlary bir umumy konteksde birleşdirýär. Sanawdan soň köplenç 都 («şu ählisi») gelýär.",
        examples: [
          { hanzi: "过生日啦，过节啦，来客人啦，一般都包饺子吃。", pinyin: "Guò shēngrì la, guò jié la, lái kèren la, yìbān dōu bāo jiǎozi chī.", translation: "Doglan günler, baýramlar, myhmanlar — adatça pelmeni ýasalýar." },
          { hanzi: "我们大学有很多国家的留学生，美国啦，日本啦，英国啦……", pinyin: "Wǒmen dàxué yǒu hěn duō guójiā de liúxuéshēng, Měiguó la, Rìběn la, Yīngguó la...", translation: "Biziň uniwersitetimizde dürli ýurtlardan talyplar bar — ABŞ-dan, Ýaponiýadan, Angliýadan…" },
          { hanzi: "阿曼去商店买很多东西，衣服啦，食品啦，啤酒啦。", pinyin: "Āmàn qù shāngdiàn mǎi hěn duō dōngxi, yīfu la, shípǐn la, píjiǔ la.", translation: "Aman dükanda köp zat satyn alýar — eşik, azyk, piwo." },
        ],
      },
      {
        title: "得 (děi) — «gerek, borçly»",
        explanation:
          "得 (bu manyda DĚI okalýar, DÉ däl!) «gerek, borçly, mejbur» diýen manyny berýär. Işlikden öň goýulýar.\n\n" +
          "Shema:  Eýe + 得 + Işlik + (Obýekt)\n\n" +
          "做馅儿就得花很多时间。\n" +
          "«Içlik etmek — köp wagt sarp etmeli.»\n\n" +
          "Inkär: 不用 (gerek däl), 不得 DÄL!\n" +
          "• 我得去学校。— Maňa mekdebe gitmeli.\n" +
          "• 我不用去学校。— Maňa mekdebe gitmek gerek däl.\n\n" +
          "Üns ber: 得 ýazgysynyň 3 okalyşy bar — dé (almak), děi (gerek), de (dereje görkezijisi). Bu ýerde diňe DĚI.",
        examples: [
          { hanzi: "做馅儿就得花很多时间。", pinyin: "Zuò xiànr jiù děi huā hěn duō shíjiān.", translation: "Içlik etmek — köp wagt sarp etmeli." },
          { hanzi: "明天早上八点有课，我得七点起床。", pinyin: "Míngtiān zǎoshang bā diǎn yǒu kè, wǒ děi qī diǎn qǐ chuáng.", translation: "Ertir sagat 8-de sapak bar, maňa 7-de turmaly." },
          { hanzi: "包饺子比较麻烦，我得花很多时间。", pinyin: "Bāo jiǎozi bǐjiào máfan, wǒ děi huā hěn duō shíjiān.", translation: "Pelmeni ýasamak birneme kynçylykly, köp wagt sarp etmeli bolar." },
        ],
      },
      {
        title: "Ritorik sorag: 不是……吗？",
        explanation:
          "不是……吗？ — hakykatda AÝDYŇ bolan ritorik sorag. Manysy: «X dälmi näme? (ahyryn X-ä!)».\n\n" +
          "Shema:  不是 + Aýdyň + 吗？\n\n" +
          "超市不是有速冻饺子吗？\n" +
          "= «Supermarketde doňdurylan pelmeni ýokmy näme? (Ahyryn bar-a!)»\n\n" +
          "Ulanylýar:\n" +
          "• Aýan hakykaty ýatlatanyňda\n" +
          "• Ýumşak garşy çykanyňda\n" +
          "• Unudylan zada haýran galanyňda\n\n" +
          "Bu adaty manydaky sorag DÄL — jogabyň aýan we oňyn boljakdygy göz öňünde tutulýar.",
        examples: [
          { hanzi: "超市不是有速冻饺子吗？", pinyin: "Chāoshì bú shì yǒu sùdòng jiǎozi ma?", translation: "Supermarketde doňdurylan pelmeni ýokmy näme?" },
          { hanzi: "你不是美国人吗？", pinyin: "Nǐ bú shì Měiguó rén ma?", translation: "Sen amerikaly dälmi näme? (ahyryn amerikaly-la)" },
          { hanzi: "你们不是朋友吗？", pinyin: "Nǐmen bú shì péngyou ma?", translation: "Siz dost dälmi näme?" },
          { hanzi: "你不是喜欢喝咖啡吗？", pinyin: "Nǐ bú shì xǐhuan hē kāfēi ma?", translation: "Sen kofe halaýardyň-la, dälmi?" },
        ],
      },
      {
        title: "Şert dolanyşygy: 如果……(的话)，就……",
        explanation:
          "如果 A (的话)，就 B — «eger A bolsa, onda B». Klassyky şert dolanyşygy.\n\n" +
          "Shema:  如果 + Şert + (的话)，就 + Netije\n\n" +
          "• 如果 (rúguǒ) — şertiň başynda «eger»\n" +
          "• 的话 (dehuà) — şertiň soňunda opsional bölejik\n" +
          "• 就 (jiù) — netijäniň başynda «onda, şonda»\n\n" +
          "3 elementiň hemmesini ýa-da diňe bir bölegini ulanyp bolýar. Iň azyndan: «Şert, 就 Netije». Ýöne doly görnüşi has aýdyň.",
        examples: [
          { hanzi: "如果想吃的话，就去买一袋。", pinyin: "Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài.", translation: "Eger iýesiň gelse — bir haltajyk satyn al." },
          { hanzi: "如果坐地铁的话，比较快，也比较便宜。", pinyin: "Rúguǒ zuò dìtiě dehuà, bǐjiào kuài, yě bǐjiào piányi.", translation: "Eger metro bilen gitseň — has çalt we has arzan." },
          { hanzi: "如果下课早，我们就去商店。", pinyin: "Rúguǒ xià kè zǎo, wǒmen jiù qù shāngdiàn.", translation: "Eger sapaklar irräk gutarsa, biz dükana gideris." },
          { hanzi: "如果没有安排的话，我就去。", pinyin: "Rúguǒ méiyǒu ānpái dehuà, wǒ jiù qù.", translation: "Eger meýilnamam bolmasa, giderin." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Demirgazyk vs Günorta (王老师, 阿曼, 古丽)",
        lines: [
          { speaker: "A", hanzi: "老师，今天的饺子真好吃！", pinyin: "Lǎoshī, jīntiān de jiǎozi zhēn hǎochī!", translation: "Mugallym, şu günki pelmeniler hakykatdanam tagamly!" },
          { speaker: "B", hanzi: "是啊，味道挺不错的。老师，中国人都喜欢吃饺子吗？", pinyin: "Shì a, wèidào tǐng búcuò de. Lǎoshī, Zhōngguó rén dōu xǐhuan chī jiǎozi ma?", translation: "Hawa, tagamy birneme gowy. Mugallym, ähli hytaýlar pelmeni halaýarmy?" },
          { speaker: "A", hanzi: "大部分北方人都喜欢吃饺子。过生日啦，过节啦，来客人啦，一般都包饺子吃。", pinyin: "Dàbùfen běifāng rén dōu xǐhuan chī jiǎozi. Guò shēngrì la, guò jié la, lái kèren la, yìbān dōu bāo jiǎozi chī.", translation: "Demirgazyklylaryň köpüsi halaýar. Doglan günler, baýramlar, myhman gelende — adatça pelmeni ýasalýar." },
          { speaker: "B", hanzi: "南方人不吃饺子吗？", pinyin: "Nánfāng rén bù chī jiǎozi ma?", translation: "Günortalylar iýmeýärmi?" },
          { speaker: "A", hanzi: "不常吃。南方人喜欢吃米饭，不太喜欢吃面食。", pinyin: "Bù cháng chī. Nánfāng rén xǐhuan chī mǐfàn, bú tài xǐhuan chī miànshí.", translation: "Ýygy iýmeýärler. Günortalylar tüwini halaýar, un önümlerini onçakly halamaýarlar." },
          { speaker: "B", hanzi: "是这样啊！对北方人来说，饺子是很重要的一种食品吧？", pinyin: "Shì zhèyàng a! Duì běifāng rén lái shuō, jiǎozi shì hěn zhòngyào de yì zhǒng shípǐn ba?", translation: "Ine şeýlemi! Demirgazyklylar üçin pelmeni möhüm azyk, şeýlemi?" },
          { speaker: "A", hanzi: "是啊！不过，包饺子比较麻烦，特别是人少的时候。", pinyin: "Shì a! Búguò, bāo jiǎozi bǐjiào máfan, tèbié shì rén shǎo de shíhou.", translation: "Hawa! Ýöne pelmeni ýasamak birneme kynçylykly, aýratyn hem adam az bolanda." },
          { speaker: "B", hanzi: "对，做馅儿就得花很多时间呢。", pinyin: "Duì, zuò xiànr jiù děi huā hěn duō shíjiān ne.", translation: "Hawa, diňe içlik etmek üçin-de köp wagt gerek." },
          { speaker: "C", hanzi: "超市不是有速冻饺子吗？如果想吃的话，就去买一袋。", pinyin: "Chāoshì bú shì yǒu sùdòng jiǎozi ma? Rúguǒ xiǎng chī dehuà, jiù qù mǎi yí dài.", translation: "Supermarketde doňdurylan ýokmy näme? Iýesiň gelse — bir haltajyk satyn al." },
          { speaker: "A", hanzi: "你真会偷懒。不过，大家一起包饺子，热闹，也挺有意思的。", pinyin: "Nǐ zhēn huì tōu lǎn. Búguò, dàjiā yìqǐ bāo jiǎozi, rènao, yě tǐng yǒu yìsi de.", translation: "Sen hakykatdanam ýalta! Ýöne hemmeler bile pelmeni ýasasa, gyzgalaňly, hakykatdanam gyzykly." },
          { speaker: "B", hanzi: "速冻饺子的味道怎么样？好吃吗？", pinyin: "Sùdòng jiǎozi de wèidào zěnmeyàng? Hǎochī ma?", translation: "Doňdurylan pelmeniniň tagamy nähili? Tagamlymy?" },
          { speaker: "C", hanzi: "也很好吃。", pinyin: "Yě hěn hǎochī.", translation: "Ol-da tagamly." },
        ],
      },
    ],

    tips: [
      "Hytaýyň Demirgazygy vs Günortasy: Demirgazyk (北方) un önümlerini halaýar (面食: pelmeni, lapşa, çörek), Günorta (南方) — tüwini (米饭). Serhet şertli Huaýhe derýasy boýunça geçýär. Möhüm medeni fakt.",
      "对……来说 — «kimdir biriniň garaýşyndan, kimdir biri üçin». Örän ýygy ulanylýan formula: 对学生来说 (talyplar üçin), 对我来说 (meniň üçin), 对中国人来说 (hytaýlaryň garaýşyndan).",
      "得 DĚI vs DÉ: 得 DĚI — gerek (many taýdan). 得 DÉ — almak. Şeýle hem 得 DE — dereje goşulmasy (走得快 — çalt ýöreýär). Üç dürli omonim söz.",
      "如果…的话 — adatça 的话 şertiň SOŇUNA goýulýar. Üçüsinden (如果, 的话, 就) haýsydyr biri ýeterlik, ýöne näçe köp element bolsa, şonça-da aýdyň.",
      "偷懒 göni manysy «ýalançylygy ogurlamak» = «ýalta bolmak, işden gaçmak». Meşhur aňlatma. 你真会偷懒 — «sen hakykatdanam ýalta!» (dostlukly şaka).",
    ],
  },

  19: {
    introduction:
      "Bu bapda siz endikler we öwrenişme wagty hakda gürrüň bermegi, ýagdaý üýtgemesi üçin 了 bölejigini ulanmagy, 就 (irräk) bilen 才 (giç) tapawutlandyrmagy we ýaşy dürli usulda soramagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 王老师 阿曼-den onuň Pekindäki durmuşy hakda soraýar — öwrenişdimi, haçan ýatýar.",

    vocabulary: [
      { hanzi: "多", pinyin: "duō", translation: "nähili, näçe (soragda)" },
      { hanzi: "长", pinyin: "cháng", translation: "uzyn, uzak" },
      { hanzi: "年", pinyin: "nián", translation: "ýyl" },
      { hanzi: "习惯", pinyin: "xíguàn", translation: "öwrenişmek; endik" },
      { hanzi: "生活", pinyin: "shēnghuó", translation: "durmuş, ýaşaýyş" },
      { hanzi: "刚", pinyin: "gāng", translation: "edil şu wagt, ýaňy" },
      { hanzi: "已经", pinyin: "yǐjīng", translation: "eýýäm" },
      { hanzi: "不好意思", pinyin: "bù hǎoyìsi", translation: "bagyşlaň, oňaýsyz" },
      { hanzi: "才", pinyin: "cái", translation: "diňe (garaşylandan giç)" },
      { hanzi: "起床", pinyin: "qǐ chuáng", translation: "düşekden turmak" },
      { hanzi: "床", pinyin: "chuáng", translation: "krowat, düşek" },
      { hanzi: "睡", pinyin: "shuì", translation: "ýatmak, uklamak" },
      { hanzi: "夜里", pinyin: "yèli", translation: "gije" },
      { hanzi: "点钟", pinyin: "diǎnzhōng", translation: "sagat (sagatda)" },
      { hanzi: "早睡早起", pinyin: "zǎo shuì zǎo qǐ", translation: "ir ýatyp, ir turmak" },
      { hanzi: "工作", pinyin: "gōngzuò", translation: "işlemek; iş" },
      { hanzi: "毛病", pinyin: "máobìng", translation: "kemçilik, erbet endik" },
      { hanzi: "改", pinyin: "gǎi", translation: "üýtgetmek, düzetmek" },
      { hanzi: "大", pinyin: "dà", translation: "uly; ulurak (ýaşda)" },
      { hanzi: "年纪", pinyin: "niánjì", translation: "ýaş" },
      { hanzi: "大概", pinyin: "dàgài", translation: "takmynan" },
      { hanzi: "岁", pinyin: "suì", translation: "ýaşynda" },
    ],

    grammar: [
      {
        title: "了 bölejigi (1) — ýagdaýyň üýtgemegi / tamamlanma",
        explanation:
          "了 (le) sözlemiň soňunda hereketiň/ýagdaýyň ÜÝTGEMEGINI ýa-da tamamlanmagyny görkezýär.\n\n" +
          "Shema:  Sözlem + 了\n\n" +
          "• 我习惯了。— Men öwrenişdim (indi). (öň öwrenişmändim — öwrenişdim)\n" +
          "• 他去图书馆了。— Ol kitaphana gitdi. (eýýäm gitdi)\n" +
          "• 昨天下雪了。— Düýn gar ýagdy. (tamamlanan hereket)\n\n" +
          "Inkär: 没 + Işlik (了-SIZ).\n" +
          "❌ 没去了 → ✅ 没去\n" +
          "• 他没去图书馆。— Ol kitaphana gitmedi.\n\n" +
          "Bu hytaýçadaky iň çylşyrymly bölejikleriň biri — 了-niň köp manysy bar. Häzirlikçe ýat tut: «üýtgeme ýa-da tamamlanma».",
        examples: [
          { hanzi: "现在已经习惯了。", pinyin: "Xiànzài yǐjīng xíguàn le.", translation: "Häzir eýýäm öwrenişdim." },
          { hanzi: "他去图书馆了。", pinyin: "Tā qù túshūguǎn le.", translation: "Ol kitaphana gitdi." },
          { hanzi: "他没去图书馆。", pinyin: "Tā méi qù túshūguǎn.", translation: "Ol kitaphana gitmedi." },
          { hanzi: "昨天下雪了。", pinyin: "Zuótiān xià xuě le.", translation: "Düýn gar ýagdy." },
        ],
      },
      {
        title: "还 hal-sözi (2) — «entek, häzirlikçe»",
        explanation:
          "还-ni «ýene, üstesine» manysynda eýýäm görüpdik (10-njy bap). Bu ýerde ikinji many — «entek, häzirlikçe (dowam edýär)».\n\n" +
          "Shema:  还 + Işlik/Sypat (+ 没…)\n\n" +
          "• 这还没习惯。— Muňa entek öwrenişmedim. (entek däl)\n" +
          "• 已经十二点了，他还在学习。— Eýýäm 12, ol entek okaýar.\n\n" +
          "Köplenç 没 bilen — «entek däl»:\n" +
          "• 还没习惯 — entek öwrenişmedim\n" +
          "• 还没来 — entek gelmedi\n" +
          "• 还没吃饭 — entek naharlanmady",
        examples: [
          { hanzi: "这还没习惯。", pinyin: "Zhè hái méi xíguàn.", translation: "Muňa entek öwrenişmedim." },
          { hanzi: "已经夜里十二点了，他还在学习。", pinyin: "Yǐjīng yèli shí'èr diǎn le, tā hái zài xuéxí.", translation: "Eýýäm gijäniň ýarysy, ol entek okaýar." },
          { hanzi: "来北京半年了，他还没习惯早上八点上课。", pinyin: "Lái Běijīng bàn nián le, tā hái méi xíguàn zǎoshang bā diǎn shàng kè.", translation: "Pekine gelenine ýarym ýyl boldy, ertirki 8-däki sapaklara entek öwrenişmedi." },
          { hanzi: "已经三十岁了，他还没有女朋友。", pinyin: "Yǐjīng sānshí suì le, tā hái méiyǒu nǚ péngyou.", translation: "Eýýäm 30 ýaşynda, gyz dosty entek ýok." },
        ],
      },
      {
        title: "就 vs 才 — «irräk» vs «garaşylandan giç»",
        explanation:
          "Wagt manysyny üýtgedýän iki örän möhüm söz:\n\n" +
          "• 就 (jiù) — hereketiň IRRÄK/ÇALT bolandygyny nygtaýar:\n" +
          "  他早上六点就起床了。— Ol eýýäm 6-da turdy (irräk).\n" +
          "  妹妹三岁就开始学跳舞。— Uýam 3 ýaşynda EÝÝÄM tans öwrenip başlady.\n\n" +
          "• 才 (cái) — hereketiň GIJIRÄK/HAÝAL bolandygyny nygtaýar:\n" +
          "  他早上八点才起床。— Ol diňe 8-de turdy (giç).\n" +
          "  古丽七点半才去教室。— Gülnara diňe 7:30-da otaga gitdi.\n\n" +
          "Bir wagt (meselem, 8 sagat) hem «irräk» (就), hem «giç» (才) hökmünde beýan edilip bilner — garaşylan zada bagly.",
        examples: [
          { hanzi: "我一般早上八点才起床。", pinyin: "Wǒ yìbān zǎoshang bā diǎn cái qǐ chuáng.", translation: "Men adatça diňe ertirki 8-de turýaryn (giç)." },
          { hanzi: "有时候夜里两点钟才睡。", pinyin: "Yǒu shíhou yèli liǎng diǎnzhōng cái shuì.", translation: "Käwagt diňe gijäniň 2-sinde ýatýaryn." },
          { hanzi: "他上个星期就回国了。", pinyin: "Tā shàng ge xīngqī jiù huí guó le.", translation: "Ol eýýäm geçen hepde watanyna gitdi (irräk)." },
          { hanzi: "妹妹三岁就开始学跳舞。", pinyin: "Mèimei sān suì jiù kāishǐ xué tiào wǔ.", translation: "Uýam eýýäm 3 ýaşynda tans öwrenip başlady." },
        ],
      },
      {
        title: "Ýaşy nädip soramaly",
        explanation:
          "Hytaýçada ýaş soramagyň söhbetdeşiň ýaşyna görä ÜÇ görnüşi bar:\n\n" +
          "1) ÇAGALAR (<10 ýaş): 几岁？\n" +
          "   • 你今年几岁了？— Saňa näçe ýaş?\n" +
          "   • 我六岁。— Maňa 6 ýaş.\n\n" +
          "2) ULULAR (10+): 多大？\n" +
          "   • 你多大？— Saňa näçe ýaş?\n" +
          "   • 我二十二。— 22.\n\n" +
          "3) GARRYLAR (sylagly): 多大年纪？ / 多大岁数？\n" +
          "   • 您多大年纪？— Size näçe ýaş? (hormat bilen)\n\n" +
          "Bulaşdyrmazlyk möhüm — çaga üçin 多大 geň eşidilýär, garry üçin bolsa 几岁 gödek.",
        examples: [
          { hanzi: "你今年几岁了？", pinyin: "Nǐ jīnnián jǐ suì le?", translation: "Saňa näçe ýaş? (çaga)" },
          { hanzi: "你多大？", pinyin: "Nǐ duō dà?", translation: "Saňa näçe ýaş? (ula)" },
          { hanzi: "您多大年纪？", pinyin: "Nín duō dà niánjì?", translation: "Size näçe ýaş? (garra)" },
          { hanzi: "大概二十五岁吧。", pinyin: "Dàgài èrshíwǔ suì ba.", translation: "Takmynan 25 ýaş." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Endikler we ýaş (王老师 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，你来北京多长时间了？", pinyin: "Āmàn, nǐ lái Běijīng duō cháng shíjiān le?", translation: "Aman, sen Pekine gelenine näçe wagt boldy?" },
          { speaker: "B", hanzi: "差不多半年多。", pinyin: "Chàbuduō bàn nián duō.", translation: "Takmynan ýarym ýyldan biraz köp." },
          { speaker: "A", hanzi: "习惯北京的生活了吧？", pinyin: "Xíguàn Běijīng de shēnghuó le ba?", translation: "Pekiniň durmuşyna öwrenişdiňmi indi?" },
          { speaker: "B", hanzi: "刚来的时候不习惯，现在已经习惯了。", pinyin: "Gāng lái de shíhou bù xíguàn, xiànzài yǐjīng xíguàn le.", translation: "Ilki gelenimde öwrenişmändim, indi bolsa eýýäm öwrenişdim." },
          { speaker: "A", hanzi: "早上八点上课也习惯了吗？", pinyin: "Zǎoshang bā diǎn shàng kè yě xíguàn le ma?", translation: "Ertirki 8-däki sapaklara-da öwrenişdiňmi?" },
          { speaker: "B", hanzi: "不好意思，这还没习惯。在美国，我一般早上八点才起床。", pinyin: "Bù hǎoyìsi, zhè hái méi xíguàn. Zài Měiguó, wǒ yìbān zǎoshang bā diǎn cái qǐ chuáng.", translation: "Bagyşlaň, muňa entek öwrenişmedim. ABŞ-da men adatça diňe ertirki 8-de turýardym." },
          { speaker: "A", hanzi: "是吗？现在晚上几点睡觉？", pinyin: "Shì ma? Xiànzài wǎnshang jǐ diǎn shuì jiào?", translation: "Şeýlemi? Häzir agşam näçede ýatýarsyň?" },
          { speaker: "B", hanzi: "一般十二点睡，有时候夜里两点钟才睡。不过，早上八点有课的话，就早一点儿睡。", pinyin: "Yìbān shí'èr diǎn shuì, yǒu shíhou yèli liǎng diǎnzhōng cái shuì. Búguò, zǎoshang bā diǎn yǒu kè dehuà, jiù zǎo yìdiǎnr shuì.", translation: "Adatça 12-de ýatýaryn, käwagt diňe gijäniň 2-sinde. Ýöne ertirki 8-de sapak bar bolsa, azajyk irräk ýatýaryn." },
          { speaker: "A", hanzi: "早睡早起比较好吧？我是学生的时候，也喜欢睡懒觉。工作以后，这个毛病就改了。", pinyin: "Zǎo shuì zǎo qǐ bǐjiào hǎo ba? Wǒ shì xuéshēng de shíhou, yě xǐhuan shuì lǎnjiào. Gōngzuò yǐhòu, zhège máobìng jiù gǎi le.", translation: "«Ir ýat, ir tur» — şeýle has gowudyr? Men talyp wagtym-da köpräk ýatmagy halardym. Işe başlanymdan soň bu endigi üýtgetdim." },
          { speaker: "B", hanzi: "是吗？那时候您多大年纪？", pinyin: "Shì ma? Nà shíhou nín duō dà niánjì?", translation: "Şeýlemi? Şonda size näçe ýaş bardy?" },
          { speaker: "A", hanzi: "大概二十五岁吧。", pinyin: "Dàgài èrshíwǔ suì ba.", translation: "Takmynan 25 ýaş." },
        ],
      },
    ],

    tips: [
      "刚 (gāng) we 刚才 (gāngcái) — ikisi hem «edil şu wagt», ýöne 刚 = işlikden öň (刚来 — ýaňy geldi), 刚才 = özbaşdak wagt sözi (刚才他来了 — ol ýaňy geldi).",
      "多长时间了？ — «haçandan bäri?» diýen adaty formula. Döwür bilen jogap berilýär: 半年了 (ýarym ýyl), 三年了 (üç ýyl). Bu ýerde 了 = «eýýäm geçdi».",
      "早睡早起 — türkmen dilindäki «Ir turan guş gurt tutar» pähimine meňzeş hytaý arzuw-nakyly. Zähmetsöýerlik we düzgün-tertibiň medeni gymmaty.",
      "不好意思 — göni manysy «oňaýsyz/utanç», ýöne gündelik durmuşda ýumşak «bagyşlaň» hökmünde ulanylýar (kimdir birini biynjalyk edeniňde, ownuk zat üçin ötünç soranyňda). 对不起-den ýumşak.",
      "毛病 (máobìng) — «kemçilik, kesel, erbet endik». Adam hakda: 他有很多毛病 (onuň köp kemçiligi bar). Tehnika hakda: 电脑有毛病了 (kompýuter döwüldi).",
    ],
  },

  20: {
    introduction:
      "Bu Unit 4-iň jemleýji baby. Siz «sypat+死了» («örän...») gurluşyny, inkär buýrugy 别 («etme») ulanmagy öwrenersiňiz we 16-19-njy baplaryň grammatikasyny gaýtalarsyňyz.\n\n" +
      "Ýagdaý: 阿曼 syrkawlan 古丽-ni hassahanada görmäge barýar. Olar syrkawlamak bilen okamagyň haýsysynyň gowudygy hakda degişýärler.",

    vocabulary: [
      { hanzi: "看", pinyin: "kàn", translation: "myhman görmek, seretmek" },
      { hanzi: "别客气", pinyin: "bié kèqi", translation: "çekinme, arkaýyn bol" },
      { hanzi: "别", pinyin: "bié", translation: "etme (gadagançylyk)" },
      { hanzi: "无聊", pinyin: "wúliáo", translation: "gyzyksyz" },
      { hanzi: "医院", pinyin: "yīyuàn", translation: "hassahana" },
      { hanzi: "做梦", pinyin: "zuò mèng", translation: "düýş görmek, arzuw etmek" },
      { hanzi: "幸福", pinyin: "xìngfú", translation: "bagtly" },
      { hanzi: "背", pinyin: "bèi", translation: "ýatdan öwrenmek" },
      { hanzi: "生词", pinyin: "shēngcí", translation: "täze sözler" },
      { hanzi: "考试", pinyin: "kǎoshì", translation: "synag, synag tabşyrmak" },
      { hanzi: "累", pinyin: "lèi", translation: "ýadan" },
      { hanzi: "死", pinyin: "sǐ", translation: "ölmek; ölesi (aşa derejäniň goşulmasy)" },
      { hanzi: "住", pinyin: "zhù", translation: "ýaşamak" },
      { hanzi: "问", pinyin: "wèn", translation: "sormak" },
      { hanzi: "医生", pinyin: "yīshēng", translation: "lukman, doktor" },
      { hanzi: "同意", pinyin: "tóngyì", translation: "ylalaşmak" },
      { hanzi: "对了", pinyin: "duì le", translation: "aýtmagyn, ýeri" },
      { hanzi: "炒", pinyin: "chǎo", translation: "gowurmak" },
      { hanzi: "菜", pinyin: "cài", translation: "nahar, gök önüm" },
      { hanzi: "面条儿", pinyin: "miàntiáor", translation: "lapşa" },
      { hanzi: "病人", pinyin: "bìngrén", translation: "syrkaw, näsag" },
      { hanzi: "身体", pinyin: "shēntǐ", translation: "beden, saglyk" },
      { hanzi: "药", pinyin: "yào", translation: "derman" },
      { hanzi: "麦当劳", pinyin: "Màidāngláo", translation: "Makdonalds" },
    ],

    grammar: [
      {
        title: "Sypat + 死了 — «örän, ölesi»",
        explanation:
          "«Sypat + 死了» gurluşy IŇ ÝOKARY derejäni aňladýar. Göni manysy «ölesi X», many taýdan: «örän X, iň X».\n\n" +
          "Shema:  Sypat + 死了\n\n" +
          "累死了！— Men örän ýadadym!\n" +
          "冷死了！— Örän sowuk!\n" +
          "饿死了！— Ölesi ajykdym!\n" +
          "热死了！— Yssy çydardan ýokary!\n\n" +
          "Bu örän gepleşik dilindäki we duýgy taýdan görnüş. Resmi ýagdaýlarda 非常 (örän) ýa-da 很 gowurak.\n\n" +
          "Esasan negatiw sypatlar bilen işleýär (ýadawlyk, açlyk, gyzyksyzlyk, sowuk, yssy).",
        examples: [
          { hanzi: "考试啦……累死了。", pinyin: "Kǎoshì la... lèi sǐ le.", translation: "Ýene synaglar… örän ýadadym." },
          { hanzi: "人太多，挤死了。", pinyin: "Rén tài duō, jǐ sǐ le.", translation: "Adam aşa köp, ölesi gysyk." },
          { hanzi: "今天零下十度，冷死了。", pinyin: "Jīntiān língxià shí dù, lěng sǐ le.", translation: "Şu gün -10, örän sowuk." },
          { hanzi: "饿死了！", pinyin: "È sǐ le!", translation: "Ölesi ajykdym!" },
        ],
      },
      {
        title: "Gadagan: 别 + Işlik — «etme»",
        explanation:
          "别 (bié) + Işlik «X etme» gadaganyny aňladýar. 不要-den has ýumşak görnüş.\n\n" +
          "Shema:  别 + Işlik + (Obýekt)\n\n" +
          "别客气！— Çekinme! / Arkaýyn bol!\n" +
          "别去！— Gitme!\n" +
          "别说了！— Ýeterlik, gepleme!\n\n" +
          "别 köplenç buýruk/haýyş sözlemlerinde bolýar. «Etmerin» diýmek üçin 不 ulanylýar (不去 — gitmerin).\n\n" +
          "别 — diňe «häzir etme» buýrugy/haýyşy üçin.",
        examples: [
          { hanzi: "别客气。", pinyin: "Bié kèqi.", translation: "Çekinme." },
          { hanzi: "别客气，请喝茶。", pinyin: "Bié kèqi, qǐng hē chá.", translation: "Çekinmäň, çaý içiň." },
          { hanzi: "别吃太多。", pinyin: "Bié chī tài duō.", translation: "Aşa köp iýme." },
          { hanzi: "别说了。", pinyin: "Bié shuō le.", translation: "Ýeterlik, gepleme." },
        ],
      },
      {
        title: "一个人 — «ýeke, ýalňyz»",
        explanation:
          "一个人 (yí ge rén) göni manysy «bir adam», ýöne sözlemlerde «özi, ýeke-täk» diýen manyny berýär.\n\n" +
          "Shema:  一个人 + Işlik\n\n" +
          "一个人吃 — ýeke iýmek\n" +
          "一个人睡 — ýeke ýatmak\n" +
          "一个人玩儿 — ýeke oýnamak\n\n" +
          "Duýgy täsirini güýçlendirmek üçin köplenç gaýtalanýar:\n" +
          "一个人吃，一个人睡，一个人玩儿 — hemme zat ýeke-täk.\n\n" +
          "«Özi, ýeke» diýip terjime edilýär. Gussa ýa-da özbaşdaklyk hakda gürrüňde ulanylýar.",
        examples: [
          { hanzi: "一个人吃，一个人睡，一个人玩儿，挺无聊的。", pinyin: "Yí ge rén chī, yí ge rén shuì, yí ge rén wánr, tǐng wúliáo de.", translation: "Ýeke iýýärsiň, ýeke ýatýarsyň, ýeke oýnaýarsyň — örän gyzyksyz." },
          { hanzi: "我一个人住。", pinyin: "Wǒ yí ge rén zhù.", translation: "Men ýeke ýaşaýaryn." },
          { hanzi: "她一个人去北京了。", pinyin: "Tā yí ge rén qù Běijīng le.", translation: "Ol ýeke özi Pekine gitdi." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Hassahanada (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，怎么样？现在好一点儿了吗？", pinyin: "Gǔlì, zěnmeyàng? Xiànzài hǎo yìdiǎnr le ma?", translation: "Gülnara, nähili? Häzir azajyk gowulaşdymy?" },
          { speaker: "B", hanzi: "好一点儿了。谢谢你来看我。", pinyin: "Hǎo yìdiǎnr le. Xièxie nǐ lái kàn wǒ.", translation: "Azajyk gowulaşdy. Gelenim üçin sag bol." },
          { speaker: "A", hanzi: "别客气。不上课，也没有作业，挺舒服的吧？", pinyin: "Bié kèqi. Bú shàng kè, yě méiyǒu zuòyè, tǐng shūfu de ba?", translation: "Çekinme. Sapak-da ýok, öý işi-de ýok — birneme rahatdyr-a?" },
          { speaker: "B", hanzi: "不舒服。一个人吃，一个人睡，一个人玩儿，挺无聊的。", pinyin: "Bù shūfu. Yí ge rén chī, yí ge rén shuì, yí ge rén wánr, tǐng wúliáo de.", translation: "Asla rahat däl. Ýeke iýýärin, ýeke ýatýaryn, ýeke wagt geçirýärin — örän gyzyksyz." },
          { speaker: "A", hanzi: "你在医院都干什么呢？", pinyin: "Nǐ zài yīyuàn dōu gàn shénme ne?", translation: "Sen hassahanada näme edýärsiň?" },
          { speaker: "B", hanzi: "看看书，听听音乐，睡睡觉，做做梦……", pinyin: "Kànkan shū, tīngting yīnyuè, shuìshui jiào, zuòzuo mèng...", translation: "Azajyk okaýaryn, azajyk saz diňleýärin, ýatýaryn, düýş görýärin…" },
          { speaker: "A", hanzi: "你太幸福了！我每天在学校背生词啦，听写啦，做作业啦，考试啦……累死了。", pinyin: "Nǐ tài xìngfú le! Wǒ měi tiān zài xuéxiào bèi shēngcí la, tīngxiě la, zuò zuòyè la, kǎoshì la... lèi sǐ le.", translation: "Sen näme bagtly! Meniň her günüm mekdepde täze sözler, diktantlar, öý işi, synaglar… örän ýadadym." },
          { speaker: "B", hanzi: "那咱们换换，怎么样？你来医院住，我去上课。", pinyin: "Nà zánmen huànhuan, zěnmeyàng? Nǐ lái yīyuàn zhù, wǒ qù shàng kè.", translation: "Onda çalyşalyň, nähili? Sen hassahana ýat, men sapaga gideýin." },
          { speaker: "A", hanzi: "好啊，不过你得问问医生行不行。如果医生同意的话，咱们就换。对了，你中午想吃什么？米饭，炒菜，面条儿，还是饺子？", pinyin: "Hǎo a, búguò nǐ děi wènwen yīshēng xíng bu xíng. Rúguǒ yīshēng tóngyì dehuà, zánmen jiù huàn. Duì le, nǐ zhōngwǔ xiǎng chī shénme? Mǐfàn, chǎo cài, miàntiáor, háishi jiǎozi?", translation: "Bolýar, ýöne ilki lukmandan sora, bolýarmy diýip. Eger lukman razy bolsa, çalşalyň. Aýtmagyn, günortan näme iýesiň gelýär? Tüwi, gowurma, lapşa ýa-da pelmeni?" },
          { speaker: "B", hanzi: "麦当劳！我想吃麦当劳。", pinyin: "Màidāngláo! Wǒ xiǎng chī Màidāngláo.", translation: "Makdonalds! Makdonalds iýesim gelýär." },
          { speaker: "A", hanzi: "你不是病人吗？身体不好，还得吃药……吃面条儿吧！", pinyin: "Nǐ bú shì bìngrén ma? Shēntǐ bù hǎo, hái děi chī yào... chī miàntiáor ba!", translation: "Sen syrkawmy näme? Saglygyň erbet, derman-da içmeli — lapşa iý!" },
        ],
      },
    ],

    tips: [
      "好一点儿了 — «azajyk gowulaşdy». 了 bölejigi üýtgemäni görkezýär. Sagalýan adama aýdylýan adaty sylagly jümle.",
      "别客气 — sylaglylygyň umumy jogaby: myhmançylykda, minnetdarlyk bildireninde, haýyş edeninde. «Arkaýyn bol, resmiýetsiz» diýen manyny berýär.",
      "看病人 we 看医生: 看病人 — «syrkawy görmäge barmak», 看医生 / 看病 — «lukmana barmak». Bu ýerde 看 işligi = «barmak, görmek».",
      "背生词啦，听写啦，做作业啦 sanawyndaky 啦 bölejigi — 18-nji bapdaky ýaly. «Hem şu, hem ol, hem beýlekisi...» duýgy öwüşginini berýär.",
      "对了 (duì le) — «aýtmagyn, ýeri!» Mowzugy üýtgetmek, bir zady ýatlamak. Örän ýygy gepleşik jümlesi.",
    ],
  },

  21: {
    introduction:
      "Bu bapda siz 又-ni (ýene, gaýtalama), 了 bölejiginiň (2) sanlar bilen ulanylyşyny (V+了+mukdar+O) we 好像-ni («öýdýän») ulanmagy öwrenersiňiz. Mowzuk — hytaý myhmansöýerlik medeniýeti we alkogol.\n\n" +
      "Ýagdaý: 古丽 阿曼-ny alkogolyň täsirinden syrkaw ýagdaýda tapýar. Düýn hytaý dostlary ony baýjiu bilen sylapdyrlar — ol ýarym jin (250g!) güýçli alkogol içipdir.",

    vocabulary: [
      { hanzi: "生气", pinyin: "shēng qì", translation: "gaharlanmak" },
      { hanzi: "好像", pinyin: "hǎoxiàng", translation: "meňzeýär, öýdýän" },
      { hanzi: "脸色", pinyin: "liǎnsè", translation: "ýüz reňki, görnüş" },
      { hanzi: "熬夜", pinyin: "áo yè", translation: "gije ýatman oturmak" },
      { hanzi: "斤", pinyin: "jīn", translation: "jin (500g)" },
      { hanzi: "白酒", pinyin: "báijiǔ", translation: "baýjiu (güýçli alkogol)" },
      { hanzi: "头", pinyin: "tóu", translation: "kelle" },
      { hanzi: "疼", pinyin: "téng", translation: "agyrmak" },
      { hanzi: "疯", pinyin: "fēng", translation: "dälirmek" },
      { hanzi: "醉", pinyin: "zuì", translation: "serhoş bolmak" },
      { hanzi: "吐", pinyin: "tù", translation: "gaýtarmak" },
      { hanzi: "饭", pinyin: "fàn", translation: "nahar, tüwi" },
      { hanzi: "热情", pinyin: "rèqíng", translation: "myhmansöýer, mähirli" },
      { hanzi: "不停", pinyin: "bù tíng", translation: "duranok, arasyz" },
      { hanzi: "地", pinyin: "de", translation: "hereket ýagdaýynyň bölejigi" },
      { hanzi: "倒", pinyin: "dào", translation: "guýmak" },
      { hanzi: "酒", pinyin: "jiǔ", translation: "arak, çakyr" },
      { hanzi: "有的", pinyin: "yǒude", translation: "käbirleri" },
      { hanzi: "请客", pinyin: "qǐng kè", translation: "myhman etmek, hödür-kerem etmek" },
      { hanzi: "劝酒", pinyin: "quàn jiǔ", translation: "içmäge yralamak" },
      { hanzi: "渴", pinyin: "kě", translation: "suwsamak" },
      { hanzi: "帮", pinyin: "bāng", translation: "kömek etmek" },
      { hanzi: "杯", pinyin: "bēi", translation: "käse, stakan" },
      { hanzi: "困", pinyin: "kùn", translation: "ukusy gelýän" },
      { hanzi: "继续", pinyin: "jìxù", translation: "dowam etmek" },
    ],

    grammar: [
      {
        title: "又 — «ýene, gaýtadan» (geçmiş/gaýtalanma üçin)",
        explanation:
          "又 (yòu) gaýtalanmany görkezýär, adatça EÝÝÄM bolup geçen ýa-da yzygider bolýan hereketler üçin.\n\n" +
          "Shema:  Eýe + 又 + Işlik (+ 了)\n\n" +
          "昨天晚上又熬夜了吗？— Düýn agşam ýene gije ýatman oturdyňmy?\n" +
          "他昨天又去图书馆了。— Ol düýn ýene kitaphana gitdi.\n\n" +
          "再 bilen tapawudy (ol hem «ýene»):\n" +
          "• 又 — geçmiş/adaty barada («ýene-de»)\n" +
          "• 再 — geljek barada («ýene ederin»)",
        examples: [
          { hanzi: "昨天晚上又熬夜了吗？", pinyin: "Zuótiān wǎnshang yòu áo yè le ma?", translation: "Düýn agşam ýene ýatmadyňmy?" },
          { hanzi: "他今天早上又睡懒觉了。", pinyin: "Tā jīntiān zǎoshang yòu shuì lǎnjiào le.", translation: "Ol şu gün ertir ýene köpräk ýatdy." },
          { hanzi: "他昨天又去图书馆了。", pinyin: "Tā zuótiān yòu qù túshūguǎn le.", translation: "Ol düýn ýene kitaphana gitdi." },
        ],
      },
      {
        title: "了 (2) — V + 了 + mukdar + Obýekt (ortadaky tamamlanma)",
        explanation:
          "了-niň ikinji görnüşi — işlikden EDIL SOŇ goýulýar (soňunda däl!), KONKRET mukdar bilen TAMAMLANAN hereket barada gürrüň gidende.\n\n" +
          "Shema:  V + 了 + [san+sanaýyş sözi] + Obýekt\n\n" +
          "我喝了半斤白酒。— Men ýarym jin baýjiu içdim.\n" +
          "妹妹买了一件衣服。— Uýam bir zat satyn aldy.\n" +
          "他们吃了十个饺子。— Olar 10 pelmeni iýdi.\n\n" +
          "Soňundaky 了-den tapawudy (19-njy bap):\n" +
          "• 我喝白酒了。— Men baýjiu içdim. (fakt boldy)\n" +
          "• 我喝了半斤白酒。— Men ýarym jin baýjiu içdim. (mukdary görkezilýär)\n\n" +
          "Bu «完成了» — konkret mukdar/san bilen tamamlanan hereket.",
        examples: [
          { hanzi: "我喝了半斤白酒。", pinyin: "Wǒ hē le bàn jīn báijiǔ.", translation: "Men ýarym jin baýjiu içdim." },
          { hanzi: "妹妹买了一件衣服。", pinyin: "Mèimei mǎi le yí jiàn yīfu.", translation: "Uýam bir zat satyn aldy." },
          { hanzi: "他们吃了十个饺子。", pinyin: "Tāmen chī le shí ge jiǎozi.", translation: "Olar 10 pelmeni iýdi." },
        ],
      },
      {
        title: "好像 — «meňzeýär, öýdýän»",
        explanation:
          "好像 (hǎoxiàng) — «öýdýän», ynamsyz pikir. Işlikden ýa-da sypatdan öň goýulýar.\n\n" +
          "Shema:  Eýe + 好像 + Habar\n\n" +
          "你好像还很困。— Sen öýdýän entek örän ukyňy gelýär.\n" +
          "老师好像没生气。— Mugallym öýdýän gaharlanmady.\n" +
          "好像没问题。— Öýdýän kynçylyk ýok.\n\n" +
          "Ulanylýar:\n" +
          "• Ynamsyz bolsaň, ýöne çak edýän bolsaň\n" +
          "• Deňeşdireniňde («edil ... ýaly»)\n" +
          "• Aýdyňy ýumşadanyňda",
        examples: [
          { hanzi: "你好像还很困。", pinyin: "Nǐ hǎoxiàng hái hěn kùn.", translation: "Sen öýdýän entek örän ukyňy gelýär." },
          { hanzi: "老师好像没生气。", pinyin: "Lǎoshī hǎoxiàng méi shēng qì.", translation: "Mugallym öýdýän gaharlanmady." },
          { hanzi: "你的脸色不太好，昨天又熬夜了吗？", pinyin: "Nǐ de liǎnsè bú tài hǎo, zuótiān yòu áo yè le ma?", translation: "Ýüz reňkiň onçakly gowy däl, düýn ýene gije ýatmadyňmy?" },
        ],
      },
    ],

    dialogues: [
      {
        title: "Näme üçin sapakda ýok? (古丽 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，你怎么还在睡觉？老师问，你怎么没去上课？", pinyin: "Āmàn, nǐ zěnme hái zài shuì jiào? Lǎoshī wèn, nǐ zěnme méi qù shàng kè?", translation: "Aman, sen entek ýatyrsyňmy? Mugallym näme üçin sapaga gelmediňi sorady." },
          { speaker: "B", hanzi: "真不好意思。老师生气了吗？", pinyin: "Zhēn bù hǎoyìsi. Lǎoshī shēng qì le ma?", translation: "Utandyryjy. Mugallym gaharlandymy?" },
          { speaker: "A", hanzi: "好像没生气。你的脸色不太好，昨天又熬夜了吗？", pinyin: "Hǎoxiàng méi shēng qì. Nǐ de liǎnsè bú tài hǎo, zuótiān yòu áo yè le ma?", translation: "Öýdýän ýok. Ýüz reňkiň onçakly gowy däl, düýn ýene gije ýatmadyňmy?" },
          { speaker: "B", hanzi: "没有。不过，我喝了半斤白酒，头很疼。", pinyin: "Méiyǒu. Búguò, wǒ hē le bàn jīn báijiǔ, tóu hěn téng.", translation: "Ýok. Ýöne men ýarym jin baýjiu içdim, kellim örän agyrýar." },
          { speaker: "A", hanzi: "半斤？你疯了？", pinyin: "Bàn jīn? Nǐ fēng le?", translation: "Ýarym jin? Sen dälirdiňmi?" },
          { speaker: "B", hanzi: "没醉，不过，醉了，也吐了。", pinyin: "Méi zuì, búguò, zuì le, yě tù le.", translation: "Serhoş bolmadym. Ýok, serhoş boldum, gaýtardym-da." },
          { speaker: "A", hanzi: "你怎么喝那么多酒呢？", pinyin: "Nǐ zěnme hē nàme duō jiǔ ne?", translation: "Näme üçin şeýle köp içdiň?" },
          { speaker: "B", hanzi: "昨天我去一个中国朋友家吃饭，他们太热情了，一直不停地给我倒酒。", pinyin: "Zuótiān wǒ qù yí ge Zhōngguó péngyou jiā chī fàn, tāmen tài rèqíng le, yìzhí bù tíng de gěi wǒ dào jiǔ.", translation: "Düýn bir hytaý dostumyň öýüne nahar iýmäge gitdim, olar örän mähirlidi — durman maňa guýup durdular." },
          { speaker: "A", hanzi: "有的中国人请客的时候喜欢劝酒，你不知道吗？", pinyin: "Yǒude Zhōngguó rén qǐng kè de shíhou xǐhuan quàn jiǔ, nǐ bù zhīdào ma?", translation: "Käbir hytaýlar myhman edeninde içmäge yralamagy halaýar. Bilmediňmi?" },
          { speaker: "B", hanzi: "现在我知道了。哎呀，我很渴，你帮我倒杯水，好吗？", pinyin: "Xiànzài wǒ zhīdào le. Āiyā, wǒ hěn kě, nǐ bāng wǒ dào bēi shuǐ, hǎo ma?", translation: "Indi bilýärin. Eý, örän suwsadym — maňa bir käse suw guýup berermiň?" },
          { speaker: "A", hanzi: "好的。你好像还很困，继续睡吧！", pinyin: "Hǎo de. Nǐ hǎoxiàng hái hěn kùn, jìxù shuì ba!", translation: "Bolýar. Sen öýdýän entek örän ukyňy gelýär, dowam edip ýat!" },
        ],
      },
    ],

    tips: [
      "斤 (jīn) — hytaý agram ölçegi = 500 g. 半斤 = 250 g. Ýarym jin güýçli baýjiu (40-60°) — bu örän köp.",
      "白酒 (báijiǔ) — hytaý däneli güýçli araky, 40-60°. Medeni hadysa. Iş agşamlyklarynda we myhmançylykda ret etmek sylagsyzlyk hasaplanýar.",
      "劝酒 (quàn jiǔ) — «içmäge yralamak». Saçak medeniýetiniň möhüm bölegi. Öý eýesi tost we ýene içmegi teklip etmek arkaly myhmansöýerligini görkezýär.",
      "怎么 (zěnme) soragda «nähili?» ýa-da «näme üçin?». Kontekst kesgitleýär: 你怎么还在睡觉？= «Näme üçin sen entek ýatyrsyň?». 这个字怎么写？ = «Bu ýazgy nähili ýazylýar?»",
      "地 (de) bölejigi — hal-sözden/sypatdan soň işlikden öň: 不停地 (durman), 高兴地 (şatlyk bilen). 的 (eýeçilik) we 得 (dereje) bilen bulaşdyrma.",
    ],
  },

  22: {
    introduction:
      "Bu bapda siz keseller hakda gürrüň bermegi, 能 işligini («bilmek, mümkin bolmak»), 最好 («etseň gowy bolar») we hytaýça sene ýazmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 阿曼 futbol duşuşygyndan soň ýagyşda üşütdi. 古丽 mugallyma onuň sapaklardan boşadylmagyny soraýan haty gowşurýar.",

    vocabulary: [
      { hanzi: "能", pinyin: "néng", translation: "bilmek, mümkin bolmak" },
      { hanzi: "病", pinyin: "bìng", translation: "keselletmek; kesel" },
      { hanzi: "感冒", pinyin: "gǎnmào", translation: "üşütme, sowuklama" },
      { hanzi: "头疼", pinyin: "tóuténg", translation: "kelle agyrysy" },
      { hanzi: "发烧", pinyin: "fāshāo", translation: "gyzdyrmasy bolmak" },
      { hanzi: "咳嗽", pinyin: "késou", translation: "üsgürmek" },
      { hanzi: "前天", pinyin: "qiántiān", translation: "öňňin" },
      { hanzi: "场", pinyin: "chǎng", translation: "duşuşyklar/oýunlar üçin sanaýyş sözi" },
      { hanzi: "足球", pinyin: "zúqiú", translation: "futbol" },
      { hanzi: "比赛", pinyin: "bǐsài", translation: "ýaryş, duşuşyk" },
      { hanzi: "回来", pinyin: "huílai", translation: "gaýdyp gelmek" },
      { hanzi: "带", pinyin: "dài", translation: "özi bilen almak" },
      { hanzi: "伞", pinyin: "sǎn", translation: "zont" },
      { hanzi: "看病", pinyin: "kàn bìng", translation: "lukmana barmak" },
      { hanzi: "开", pinyin: "kāi", translation: "ýazyp bermek (dermanhat)" },
      { hanzi: "打针", pinyin: "dǎ zhēn", translation: "sanjym etmek" },
      { hanzi: "最好", pinyin: "zuìhǎo", translation: "iň gowusy" },
      { hanzi: "休息", pinyin: "xiūxi", translation: "dynç almak" },
      { hanzi: "请假条", pinyin: "qǐngjiàtiáo", translation: "rugsat haty" },
      { hanzi: "请假", pinyin: "qǐng jià", translation: "rugsat soramak" },
      { hanzi: "希望", pinyin: "xīwàng", translation: "umyt etmek, islemek" },
      { hanzi: "批准", pinyin: "pīzhǔn", translation: "makullamak" },
      { hanzi: "月", pinyin: "yuè", translation: "aý" },
      { hanzi: "日", pinyin: "rì", translation: "sene, gün" },
    ],

    grammar: [
      {
        title: "能 işligi — «bilmek, mümkin bolmak»",
        explanation:
          "能 (néng) şu wagt MÜMKINÇILIGI/BAŞARNYGY görkezýär (bedenç ýa-da ýagdaýa görä).\n\n" +
          "Shema:  Eýe + 能 + Işlik + (Obýekt)\n\n" +
          "阿曼今天又不能来上课了。\n" +
          "«Aman şu gün ýene sapaga gelip bilenok.»\n\n" +
          "能 bilen 会-niň tapawudy:\n" +
          "• 会 (huì) — öwrenip bilmek (başarnyk): 我会开车 — sürüp bilýärin\n" +
          "• 能 (néng) — beden ýa-da ýagdaý taýdan bilmek: 我今天能来 — şu gün gelip bilerin\n\n" +
          "Inkär: 不能 — bilemok (bolmaýar, gadagan, ýagdaý mümkinçilik bermeýär).",
        examples: [
          { hanzi: "阿曼今天又不能来上课了。", pinyin: "Āmàn jīntiān yòu bù néng lái shàng kè le.", translation: "Aman şu gün ýene sapaga gelip bilenok." },
          { hanzi: "我学汉语了，所以我能唱中文歌。", pinyin: "Wǒ xué Hànyǔ le, suǒyǐ wǒ néng chàng Zhōngwén gē.", translation: "Men hytaý dilini öwrendim, şonuň üçin hytaý aýdymlaryny aýdyp bilýärin." },
          { hanzi: "你有时间吗？能和我一起去吗？", pinyin: "Nǐ yǒu shíjiān ma? Néng hé wǒ yìqǐ qù ma?", translation: "Wagtyň barmy? Meniň bilen bile gidip bilýärsiňmi?" },
          { hanzi: "他感冒了，不能来上课了。", pinyin: "Tā gǎnmào le, bù néng lái shàng kè le.", translation: "Ol üşütdi, sapaga gelip bilenok." },
        ],
      },
      {
        title: "最好 + V — «etseň gowy bolar»",
        explanation:
          "最好 (zuìhǎo) işlikden öň maslahat ýa-da tabşyryk aňladýar: «iň gowusy...».\n\n" +
          "Shema:  (Eýe +) 最好 + Işlik\n\n" +
          "医生说最好休息一天。\n" +
          "«Lukman aýtdy — bir gün dynç alsaň gowy bolar.»\n\n" +
          "应该 (yīnggāi — borçly) bilen tapawudy:\n" +
          "• 应该 — has kesgitli, «borçly»\n" +
          "• 最好 — ýumşagrak, «etseň gowy bolar»",
        examples: [
          { hanzi: "医生还说最好休息一天。", pinyin: "Yīshēng hái shuō zuìhǎo xiūxi yì tiān.", translation: "Lukman ýene bir gün dynç alsaň gowy bolar diýdi." },
          { hanzi: "你感冒了，最好休息三天。", pinyin: "Nǐ gǎnmào le, zuìhǎo xiūxi sān tiān.", translation: "Sen üşütdiň, 3 gün dynç alsaň gowy bolar." },
          { hanzi: "明天有考试，你最好准备准备。", pinyin: "Míngtiān yǒu kǎoshì, nǐ zuìhǎo zhǔnbèi zhǔnbèi.", translation: "Ertir synag bar, azajyk taýýarlansaň gowy bolar." },
          { hanzi: "八点上课，你最好七点就起床。", pinyin: "Bā diǎn shàng kè, nǐ zuìhǎo qī diǎn jiù qǐ chuáng.", translation: "8-de sapak bar — 7-de tursaň gowy bolar." },
        ],
      },
      {
        title: "Seneler: ýyl + aý + gün",
        explanation:
          "Hytaýçada sene tertibi ULUDAN KIÇÄ: ýyl → aý → gün.\n\n" +
          "Shema:  XXXX 年 X 月 X 日\n\n" +
          "2012年11月15日 — 2012-nji ýylyň 15-nji noýabry\n" +
          "1999年4月3日 — 1999-njy ýylyň 3-nji apreli\n\n" +
          "Gepleşik dilinde 日 (rì) köplenç 号 (hào) bilen çalşyrylýar:\n" +
          "4月3号 — 3-nji aprel (gepleşik dilinde)\n" +
          "12月31号 — 31-nji dekabr\n\n" +
          "Ýyl sanlar boýunça okalýar: 2012 = 二〇一二 (èr líng yī èr).",
        examples: [
          { hanzi: "2012年11月15日", pinyin: "Èr líng yī èr nián shíyī yuè shíwǔ rì", translation: "2012-nji ýylyň 15-nji noýabry" },
          { hanzi: "1999年4月3日", pinyin: "Yī jiǔ jiǔ jiǔ nián sì yuè sān rì", translation: "1999-njy ýylyň 3-nji apreli" },
          { hanzi: "今天是12月31号。", pinyin: "Jīntiān shì shí'èr yuè sānshíyī hào.", translation: "Şu gün 31-nji dekabr." },
          { hanzi: "我的生日是6月28号。", pinyin: "Wǒ de shēngrì shì liù yuè èrshíbā hào.", translation: "Meniň doglan günüm 28-nji iýun." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Dawei-den hat (古丽 we 王老师)",
        lines: [
          { speaker: "A", hanzi: "老师，阿曼今天又不能来上课了。", pinyin: "Lǎoshī, Āmàn jīntiān yòu bù néng lái shàng kè le.", translation: "Mugallym, Aman şu gün ýene sapaga gelip bilenok." },
          { speaker: "B", hanzi: "是吗？他病了吗？", pinyin: "Shì ma? Tā bìng le ma?", translation: "Şeýlemi? Ol keselländimi?" },
          { speaker: "A", hanzi: "对，他感冒了。头疼，发烧，还有点儿咳嗽。", pinyin: "Duì, tā gǎnmào le. Tóuténg, fāshāo, hái yǒudiǎnr késou.", translation: "Hawa, üşütdi. Kellesi agyrýar, gyzdyrmasy bar, azajyk üsgürýär." },
          { speaker: "B", hanzi: "怎么感冒了？", pinyin: "Zěnme gǎnmào le?", translation: "Nädip üşütdi?" },
          { speaker: "A", hanzi: "前天他去看了一场足球比赛，回来的时候下雨了，他没带伞，所以感冒了。", pinyin: "Qiántiān tā qù kàn le yì chǎng zúqiú bǐsài, huílai de shíhou xià yǔ le, tā méi dài sǎn, suǒyǐ gǎnmào le.", translation: "Öňňin futbol duşuşygyna gitdi, gaýdyp gelýärkä ýagyş ýagdy, zonty ýokdy — üşütdi." },
          { speaker: "B", hanzi: "去医院看病了吗？", pinyin: "Qù yīyuàn kàn bìng le ma?", translation: "Hassahana lukmana bardymy?" },
          { speaker: "A", hanzi: "去了。医生说是感冒，给他开了一点儿药，又打了一针。医生还说最好休息一天。这是他的请假条。", pinyin: "Qù le. Yīshēng shuō shì gǎnmào, gěi tā kāi le yìdiǎnr yào, yòu dǎ le yì zhēn. Yīshēng hái shuō zuìhǎo xiūxi yì tiān. Zhè shì tā de qǐngjiàtiáo.", translation: "Bardy. Lukman üşütme diýdi, oňa azajyk derman ýazyp berdi we sanjym etdi. Ýene bir gün dynç alsaň gowy bolar diýdi. Ine onuň rugsat haty." },
          { speaker: "B", hanzi: "好的，我知道了。谢谢！", pinyin: "Hǎo de, wǒ zhīdào le. Xièxie!", translation: "Bolýar, düşündim. Sag boluň!" },
        ],
      },
    ],

    tips: [
      "请假条 haty — hytaý mekdebinde/uniwersitetinde adaty format. Gurluşy: ýüzlenme (老师) → düşündiriş → haýyş → gol → sene.",
      "发烧 / 咳嗽 / 头疼 — üşütmäniň adaty alamatlar toplumy. Bir blok hökmünde ýat tut — lukman ilkinji nobatda şu barada sorar.",
      "看 dürli kontekstlerde: 看书 (okamak), 看电影 (görmek), 看病 (lukmana barmak), 看朋友 (dosty görmäge barmak). Örän köp manyly işlik.",
      "打针 (sanjym etmek) — Hytaýda lukmanlar üşütmede köplenç derrew sanjym edýär. Günbatar lukmançylygyndan medeni tapawut.",
      "月 (yuè) — aý (tertip belgili): 一月 (ýanwar), 二月 (fewral)... 十二月 (dekabr). 个-siz: 三月 (三个月 dälde — bu eýýäm «3 aý»).",
    ],
  },

  23: {
    introduction:
      "Bu bapda siz dowamlylyk hakda soramagy (V + 了 + wagt), 大概-ni (takmynan) ulanmagy, duýdansyz hereketleri (了) uzak dowam edýänlerden tapawutlandyrmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 古丽 ýol dyknyşygy we ýarylan şina sebäpli 王红 bilen duşuşyga gijä galdy. Soňra olar dilleri näçe ýyl öwrenýändikleri hakda gürrüň edýärler.",

    vocabulary: [
      { hanzi: "迟到", pinyin: "chídào", translation: "gijä galmak" },
      { hanzi: "堵车", pinyin: "dǔ chē", translation: "ýol dyknyşygy" },
      { hanzi: "堵", pinyin: "dǔ", translation: "petiklemek, bogmak" },
      { hanzi: "坏", pinyin: "huài", translation: "döwülmek; erbet" },
      { hanzi: "轮胎", pinyin: "lúntāi", translation: "şina, tigir" },
      { hanzi: "破", pinyin: "pò", translation: "ýarylmak, jyrylmak" },
      { hanzi: "倒霉", pinyin: "dǎoméi", translation: "şowsuz bolmak" },
      { hanzi: "小时", pinyin: "xiǎoshí", translation: "sagat (dowamlylyk)" },
      { hanzi: "平时", pinyin: "píngshí", translation: "adatça, adaty wagtda" },
      { hanzi: "钟头", pinyin: "zhōngtóu", translation: "sagat" },
      { hanzi: "着急", pinyin: "zháojí", translation: "howsala düşmek" },
      { hanzi: "用", pinyin: "yòng", translation: "ulanmak" },
      { hanzi: "写", pinyin: "xiě", translation: "ýazmak" },
      { hanzi: "作文", pinyin: "zuòwén", translation: "düzme" },
      { hanzi: "口语", pinyin: "kǒuyǔ", translation: "gepleşik dili" },
      { hanzi: "看", pinyin: "kàn", translation: "pikirime görä, hasaplamak" },
      { hanzi: "学", pinyin: "xué", translation: "öwrenmek" },
      { hanzi: "初中", pinyin: "chūzhōng", translation: "orta mekdep" },
      { hanzi: "那么", pinyin: "nàme", translation: "şeýle, şonça" },
      { hanzi: "语法", pinyin: "yǔfǎ", translation: "grammatika" },
      { hanzi: "简单", pinyin: "jiǎndān", translation: "ýönekeý" },
      { hanzi: "翻译", pinyin: "fānyì", translation: "terjime, terjime etmek" },
      { hanzi: "下", pinyin: "xià", translation: "indiki" },
      { hanzi: "学期", pinyin: "xuéqī", translation: "semestr" },
    ],

    grammar: [
      {
        title: "V + 了 + dowamlylyk + (的) + Obýekt — «X-i eýýäm Y wagt etdim»",
        explanation:
          "«Nämedir bir zady näçe wagt etdim» diýip nädip soramaly/aýtmaly? Shemasy çylşyrymly: işlik gaýtalanýar.\n\n" +
          "Shema:  V + 了 + Wagt  (obýekt bolmasa)\n" +
          "Obýektli shema:  V + 了 + Wagt + 的 + Obýekt  ÝA-DA  V + Obýekt + V + 了 + Wagt\n\n" +
          "我学了十年英语。— Men iňlis dilini 10 ýyl öwrendim.\n" +
          "换轮胎换了多长时间？— Tigiri näçe wagt çalyşdyň?\n" +
          "我学汉语学了半年了。— Men hytaý dilini eýýäm ýarym ýyl öwrenýärin.\n\n" +
          "«Näçe wagt etdiň?» sorag: V + 了 + 多长时间？",
        examples: [
          { hanzi: "换轮胎换了多长时间？", pinyin: "Huàn lúntāi huàn le duō cháng shíjiān?", translation: "Tigiri näçe wagt çalyşdyň?" },
          { hanzi: "我学了十年英语。", pinyin: "Wǒ xué le shí nián Yīngyǔ.", translation: "Men iňlis dilini 10 ýyl öwrendim." },
          { hanzi: "弟弟已经看了四十分钟电视。", pinyin: "Dìdi yǐjīng kàn le sìshí fēnzhōng diànshì.", translation: "Ininim eýýäm 40 minut telewizor görýär." },
          { hanzi: "你学了多长时间汉语？", pinyin: "Nǐ xué le duō cháng shíjiān Hànyǔ?", translation: "Sen hytaý dilini näçe wagt öwrenýärsiň?" },
        ],
      },
      {
        title: "就-niň syny — dürli manylar",
        explanation:
          "就 (jiù) — örän köp manyly söz. Ähli manylaryny tertipläliň:\n\n" +
          "1) «Eýýäm» (garaşylandan öň):\n" +
          "   古丽早上六点就起床了。\n\n" +
          "2) «Derrew, çalt»:\n" +
          "   学校离家很近，一天就会了。\n\n" +
          "3) Güýçlendirmek üçin:\n" +
          "   这儿就是图书馆。\n\n" +
          "4) Yzygiderlik «we şonda»:\n" +
          "   我去找他，他就在家。\n\n" +
          "5) Şertde: 如果…, 就…\n\n" +
          "Ähli ýagdaýlarda 就 «edil şu, ýakynlyk, az aralyk/wagt» diýen manyny berýär.",
        examples: [
          { hanzi: "平时一个钟头就能到。", pinyin: "Píngshí yí ge zhōngtóu jiù néng dào.", translation: "Adatça bir sagatda ýetip barýaryn." },
          { hanzi: "质量不错，也不贵，就买它了。", pinyin: "Zhìliàng búcuò, yě bú guì, jiù mǎi tā le.", translation: "Hili gowy, gymmat-da däl — muny alaýyn." },
          { hanzi: "那座白楼就是图书馆。", pinyin: "Nà zuò bái lóu jiùshì túshūguǎn.", translation: "Ine ol ak bina — edil kitaphana." },
          { hanzi: "工作以后这个毛病就改了。", pinyin: "Gōngzuò yǐhòu zhège máobìng jiù gǎi le.", translation: "Işe başlanymdan soň bu endigi üýtgetdim." },
        ],
      },
      {
        title: "大概 — «takmynan, golaý, belki»",
        explanation:
          "大概 (dàgài) sandan ýa-da bütin sözlemden öň goýulýar we «takmynan, golaý» diýen manyny berýär.\n\n" +
          "Shema:  大概 + san/wagt/sözlem\n\n" +
          "大概二十分钟吧。— Takmynan 20 minut.\n" +
          "大概二十五岁吧。— Takmynan 25 ýaş.\n" +
          "他大概去图书馆了。— Ol, megerem, kitaphana gitdi.\n\n" +
          "Köplenç soňunda 吧 durýar — «takmynan... megerem».",
        examples: [
          { hanzi: "大概二十分钟吧。", pinyin: "Dàgài èrshí fēnzhōng ba.", translation: "Takmynan 20 minut." },
          { hanzi: "大概要两百块。", pinyin: "Dàgài yào liǎng bǎi kuài.", translation: "Takmynan 200 ýuan durýar." },
          { hanzi: "大概八点到。", pinyin: "Dàgài bā diǎn dào.", translation: "Takmynan sagat 8-de ýeterin." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Gijä galma (古丽 we 王红)",
        lines: [
          { speaker: "A", hanzi: "对不起，我迟到了。", pinyin: "Duìbuqǐ, wǒ chídào le.", translation: "Bagyşla, men gijä galdym." },
          { speaker: "B", hanzi: "没关系。路上堵车了吗？", pinyin: "Méi guānxi. Lùshàng dǔ chē le ma?", translation: "Zyýany ýok. Ýolda dyknyşyk boldumy?" },
          { speaker: "A", hanzi: "没有。我的自行车坏了，轮胎破了。", pinyin: "Méiyǒu. Wǒ de zìxíngchē huài le, lúntāi pò le.", translation: "Ýok. Welosipedim döwüldi, şinasy ýaryldy." },
          { speaker: "B", hanzi: "是吗？真倒霉。换轮胎换了多长时间？", pinyin: "Shì ma? Zhēn dǎoméi. Huàn lúntāi huàn le duō cháng shíjiān?", translation: "Şeýlemi? Hakykatdanam şowsuzlyk. Näçe wagt çalyşdyň?" },
          { speaker: "A", hanzi: "大概换了半个小时。平时一个钟头就能到，可是今天我花了一个半小时。你等了多长时间？", pinyin: "Dàgài huàn le bàn ge xiǎoshí. Píngshí yí ge zhōngtóu jiù néng dào, kěshì jīntiān wǒ huā le yí ge bàn xiǎoshí. Nǐ děng le duō cháng shíjiān?", translation: "Takmynan ýarym sagat çalyşdym. Adatça bir sagatda ýetip barýaryn, ýöne şu gün bir ýarym sagat sarp etdim. Sen näçe wagt garaşdyň?" },
          { speaker: "B", hanzi: "大概二十分钟吧。", pinyin: "Dàgài èrshí fēnzhōng ba.", translation: "Takmynan 20 minut." },
          { speaker: "A", hanzi: "着急了吧？真对不起。", pinyin: "Zháojí le ba? Zhēn duìbuqǐ.", translation: "Howsala düşdüň-le? Ötünç soraýaryn." },
          { speaker: "B", hanzi: "没事儿。", pinyin: "Méi shìr.", translation: "Zyýany ýok." },
        ],
      },
      {
        title: "Dilleri näçe wagt öwrenýärsiň? (古丽 we 王红)",
        lines: [
          { speaker: "A", hanzi: "你用英语写的作文真不错。", pinyin: "Nǐ yòng Yīngyǔ xiě de zuòwén zhēn búcuò.", translation: "Iňlis dilinde ýazan düzmäň hakykatdanam erbet däl." },
          { speaker: "B", hanzi: "谢谢！不过，我的口语还不行。", pinyin: "Xièxie! Búguò, wǒ de kǒuyǔ hái bù xíng.", translation: "Sag boluň! Ýöne gepleşigim entek gowy däl." },
          { speaker: "A", hanzi: "我看挺好的。你学了多长时间英语？", pinyin: "Wǒ kàn tǐng hǎo de. Nǐ xué le duō cháng shíjiān Yīngyǔ?", translation: "Meniň pikirimçe birneme gowy. Näçe wagt öwrenýärsiň?" },
          { speaker: "B", hanzi: "我从初中开始学习，已经学了十年了。", pinyin: "Wǒ cóng chūzhōng kāishǐ xuéxí, yǐjīng xué le shí nián le.", translation: "Orta mekdepden başladym, eýýäm 10 ýyl bolýar." },
          { speaker: "A", hanzi: "十年？那么长时间？", pinyin: "Shí nián? Nàme cháng shíjiān?", translation: "10 ýyl? Şonça köp wagtmy?" },
          { speaker: "B", hanzi: "是啊！我的语法还可以，简单的翻译也没问题，可是不太会说。你学了多长时间汉语？", pinyin: "Shì a! Wǒ de yǔfǎ hái kěyǐ, jiǎndān de fānyì yě méi wèntí, kěshì bú tài huì shuō. Nǐ xué le duō cháng shíjiān Hànyǔ?", translation: "Hawa! Grammatikam erbet däl, ýönekeý terjimeler-de kynçylyksyz, ýöne gepläp bilemok diýen ýaly. Sen hytaý dilini näçe wagt öwrenýärsiň?" },
          { speaker: "A", hanzi: "我学了半年了。", pinyin: "Wǒ xué le bàn nián le.", translation: "Ýarym ýyl bolýar." },
          { speaker: "B", hanzi: "下学期你还在北京学习吗？", pinyin: "Xià xuéqī nǐ hái zài Běijīng xuéxí ma?", translation: "Indiki semestrde-de Pekinde okaýarsyňmy?" },
          { speaker: "A", hanzi: "当然啦，我打算在中国学习两年呢。", pinyin: "Dāngrán la, wǒ dǎsuàn zài Zhōngguó xuéxí liǎng nián ne.", translation: "Elbetde, Hytaýda 2 ýyl okamagy meýilleşdirýärin." },
        ],
      },
    ],

    tips: [
      "«小时» bilen «钟头»-niň tapawudy: ikisi hem «sagat». 小时 has resmi, 钟头 gepleşik dilinde. Ikisi-de 个 talap edýär: 一个小时 / 一个钟头.",
      "真倒霉 — «hakykatdanam şowsuzlyk», meşhur gepleşik şikaýaty. Göni manysy «hakykatdanam ters öwrüldi».",
      "没事儿 (méi shìr) — «zyýany ýok, howatyr etme». Öňüňde ötünç soranlarynda jogap berilýär. Manydaşlary: 没关系, 没问题.",
      "初中 (orta mekdep) vs 高中 (ýokary synp mekdebi) vs 小学 (başlangyç mekdep). Hytaý bilim basgançagy: 小学 (6 ýyl) → 初中 (3) → 高中 (3) → 大学 (4).",
      "V了多长时间 jogaby bilen: «10 ýyl öwrenýärin» = 学了十年 (tamamlandymy? ýa-da entek öwrenýärmi?). Eger ŞU WAGTA ÇENLI öwrenýän bolsa — ikinji 了 goş: 学了十年了. Bu «eýýäm 10 ýyl we dowam edýärin».",
    ],
  },

  24: {
    introduction:
      "Bu bapda siz buýruk sözlemlerini («geliň!»), ritorik sorag 我+V+什么-ni («maňa näme üçin X?»), 了 (4) bölejigini hereketleriň yzygiderligi üçin we Wagt + Ýer tertibini işlikden öň ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 张伟 we 王红 telefonda gürleşýärler — nahar we 小美-niň doglan güni toýy hakda gürrüň edýärler.",

    vocabulary: [
      { hanzi: "打", pinyin: "dǎ", translation: "oýnamak (el bilen oýun)" },
      { hanzi: "球", pinyin: "qiú", translation: "top" },
      { hanzi: "食堂", pinyin: "shítáng", translation: "naharhana" },
      { hanzi: "两", pinyin: "liǎng", translation: "lýan (~50g agram ölçegi)" },
      { hanzi: "聚会", pinyin: "jùhuì", translation: "toý, ýygnanyşyk" },
      { hanzi: "祝", pinyin: "zhù", translation: "gutlamak, arzuw etmek" },
      { hanzi: "快乐", pinyin: "kuàilè", translation: "şatlykly, bagtly" },
      { hanzi: "碗", pinyin: "wǎn", translation: "käse, okara" },
      { hanzi: "葡萄酒", pinyin: "pútáojiǔ", translation: "üzüm çakyry" },
      { hanzi: "冰激凌", pinyin: "bīngjīlíng", translation: "doňdurma" },
      { hanzi: "女生", pinyin: "nǚshēng", translation: "gyz talyp" },
      { hanzi: "卡拉OK", pinyin: "kǎlā OK", translation: "karaoke" },
      { hanzi: "晚", pinyin: "wǎn", translation: "giç" },
      { hanzi: "放心", pinyin: "fàng xīn", translation: "arkaýyn bolmak" },
      { hanzi: "美术馆", pinyin: "měishùguǎn", translation: "çeperçilik muzeýi" },
      { hanzi: "展览", pinyin: "zhǎnlǎn", translation: "sergi" },
      { hanzi: "没意见", pinyin: "méi yìjiàn", translation: "garşy däl" },
      { hanzi: "意见", pinyin: "yìjiàn", translation: "pikir" },
      { hanzi: "早饭", pinyin: "zǎofàn", translation: "ertirlik" },
      { hanzi: "找", pinyin: "zhǎo", translation: "gözlemek" },
      { hanzi: "门口", pinyin: "ménkǒu", translation: "gapynyň agzynda, girelgede" },
      { hanzi: "见面", pinyin: "jiàn miàn", translation: "duşuşmak" },
      { hanzi: "上网", pinyin: "shàng wǎng", translation: "internete girmek" },
      { hanzi: "聊天儿", pinyin: "liáo tiānr", translation: "gürrüňleşmek" },
    ],

    grammar: [
      {
        title: "Buýruk sözlemleri (buýruk / haýyş / maslahat)",
        explanation:
          "Buýruk sözlemi tabşyryk, haýyş ýa-da teklip berýär. Eýe adatça 你/你们/咱们/我们.\n\n" +
          "Görnüşler:\n" +
          "(1) Aýdyň + (吧):\n" +
          "   你放心吧！— Arkaýyn bol!\n" +
          "   我们一起去吧！— Bile gideliň!\n" +
          "   你们好好儿玩儿吧！— Gowyja dynç alyň!\n\n" +
          "(2) 不要 ýa-da 别 arkaly inkär:\n" +
          "   早睡早起身体好，不要睡懒觉。\n" +
          "   明天早上起床，别迟到了。\n" +
          "   你们已经喝了两杯了，别喝了！\n\n" +
          "Eýe köplenç taşlanýar («sen» göz öňünde tutulýar).",
        examples: [
          { hanzi: "你放心吧！", pinyin: "Nǐ fàng xīn ba!", translation: "Arkaýyn bol!" },
          { hanzi: "我们一起去吧！", pinyin: "Wǒmen yìqǐ qù ba!", translation: "Bile gideliň!" },
          { hanzi: "别太晚了。", pinyin: "Bié tài wǎn le.", translation: "Aşa giç bolma." },
          { hanzi: "你们已经喝了两杯了，别喝了！", pinyin: "Nǐmen yǐjīng hē le liǎng bēi le, bié hē le!", translation: "Siz eýýäm iki käse içdiňiz — ýeterlik!" },
        ],
      },
      {
        title: "Ritorik sorag: 我+V+什么 = «maňa näme üçin X?»",
        explanation:
          "«我+işlik+什么» gurluşy «maňa näme üçin X etmeli?» diýen manyny berýär (etmek GEREK DÄL diýen many bilen).\n\n" +
          "Shema:  Eýe + V + 什么?\n\n" +
          "你们女生一起玩儿，我去干什么？\n" +
          "«Siz gyzlar bile gezýärsiňiz — men ol ýerde näme etjek?» (= men ol ýerde ýerliksiz)\n\n" +
          "Bu RITORIK sorag görnüşi — jogabyň «hiç zat» boljakdygy göz öňünde tutulýar.\n\n" +
          "Köplenç 这不是… ýa-da V不V bilen başlaýar:\n" +
          "这不是你的事，你去干什么？ — Bu seniň işiň däl, näme üçin araşa girýärsiň?",
        examples: [
          { hanzi: "你们女生一起玩儿，我去干什么？", pinyin: "Nǐmen nǚshēng yìqǐ wánr, wǒ qù gàn shénme?", translation: "Siz gyzlar bile gezýärsiňiz, men ol ýerde näme etjek?" },
          { hanzi: "这不是你的事，你去干什么？", pinyin: "Zhè bú shì nǐ de shì, nǐ qù gàn shénme?", translation: "Bu seniň işiň däl, näme üçin araşa girýärsiň?" },
          { hanzi: "你不会说汉语，你去干什么？", pinyin: "Nǐ bú huì shuō Hànyǔ, nǐ qù gàn shénme?", translation: "Sen hytaýça gepläp bilenok, näme üçin ol ýere barýarsyň?" },
        ],
      },
      {
        title: "了 (4) — hereketleriň yzygiderligi (hereket1 + 了, soň hereket2)",
        explanation:
          "了-niň dördünji manysy — iki işligiň arasynda. Birinji hereket TAMAMLANÝAR, SOŇ ikinjisi başlaýar.\n\n" +
          "Shema:  V1 + 了 + O1 + V2 + O2\n\n" +
          "你吃了早饭来找我。\n" +
          "«Ertirligi iý (soň) maňa gel.»\n\n" +
          "我去了咖啡店上课。— Ilki kafa, soň sapaga.\n" +
          "我换了钱去买东西。— Ilki puly çalşaryn, soň söwda ederin.\n\n" +
          "Ikinji hereket DIŇE birinjiden soň bolar. 先…然后…-den tapawudy (şol bir pikir, ýöne has resmi).",
        examples: [
          { hanzi: "你吃了早饭来找我。", pinyin: "Nǐ chī le zǎofàn lái zhǎo wǒ.", translation: "Ertirligi iý-de gel." },
          { hanzi: "我去了咖啡店上课。", pinyin: "Wǒ qù le kāfēidiàn shàng kè.", translation: "Kafa girerin — soň sapaga." },
          { hanzi: "我换了钱去买东西。", pinyin: "Wǒ huàn le qián qù mǎi dōngxi.", translation: "Puly çalşaryn — soň söwda ederin." },
        ],
      },
      {
        title: "Tertip: Eýe + Wagt + Ýer + Işlik",
        explanation:
          "Sözlemde hem WAGT, hem ÝER bar bolsa — ikisi hem işlikden ÖŇ goýulýar: ilki wagt, soň ýer.\n\n" +
          "Shema:  Eýe + Wagt + 在+Ýer + Işlik + Obýekt\n\n" +
          "我们明天八点半在你们宿舍门口见面。\n" +
          "«Biz ertir sagat 8:30-da siziň ýatakhanaňyzyň gapysynda duşuşarys.»\n\n" +
          "Logika: uly konteksden (haçan) kiçä (nirede) — hereket.",
        examples: [
          { hanzi: "我们明天八点半在你们宿舍门口见面。", pinyin: "Wǒmen míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn.", translation: "Ertir sagat 8:30-da ýatakhananyň gapysynda duşuşarys." },
          { hanzi: "今天下课以后我在图书馆学习。", pinyin: "Jīntiān xià kè yǐhòu wǒ zài túshūguǎn xuéxí.", translation: "Şu gün sapakdan soň kitaphanada okaryn." },
          { hanzi: "他每天早上在家喝咖啡。", pinyin: "Tā měi tiān zǎoshang zài jiā hē kāfēi.", translation: "Ol her ertir öýde kofe içýär." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Joranyň doglan güni (张伟 we 王红 telefonda)",
        lines: [
          { speaker: "A", hanzi: "喂，王红，是我。", pinyin: "Wèi, Wáng Hóng, shì wǒ.", translation: "Alo, Wan Hun, bu men." },
          { speaker: "B", hanzi: "张伟，你吃饭了吗？", pinyin: "Zhāng Wěi, nǐ chī fàn le ma?", translation: "Zhang Wei, nahar iýdiňmi?" },
          { speaker: "A", hanzi: "还没呢。刚打球回来，我想去食堂吃几两饺子，你去吗？", pinyin: "Hái méi ne. Gāng dǎ qiú huílai, wǒ xiǎng qù shítáng chī jǐ liǎng jiǎozi, nǐ qù ma?", translation: "Entek ýok. Ýaňy top oýnap gaýtdym, naharhana birnäçe lýan pelmeni iýmäge gitmek isleýärin — sen barýarsyňmy?" },
          { speaker: "B", hanzi: "不去了。今天是小美二十三岁生日，我们宿舍聚会。", pinyin: "Bú qù le. Jīntiān shì Xiǎoměi èrshísān suì shēngrì, wǒmen sùshè jùhuì.", translation: "Barmaýaryn. Şu gün Sýaomeýniň 23 ýaşy dolýar — ýatakhanamyzda toý bar." },
          { speaker: "A", hanzi: "是吗？那祝她生日快乐。", pinyin: "Shì ma? Nà zhù tā shēngrì kuàilè.", translation: "Şeýlemi? Onda oňa doglan güni gutlaryn." },
          { speaker: "B", hanzi: "今天我们做了很多好吃的。我已经吃了一碗面条儿，还喝了一杯葡萄酒，现在在吃冰激凌呢。你也来吧！", pinyin: "Jīntiān wǒmen zuò le hěn duō hǎochī de. Wǒ yǐjīng chī le yì wǎn miàntiáor, hái hē le yì bēi pútáojiǔ, xiànzài zài chī bīngjīlíng ne. Nǐ yě lái ba!", translation: "Biz köp tagamly zat bişirdik. Men eýýäm bir käse lapşa iýdim, bir käse üzüm çakyry-da içdim, häzir doňdurma iýýärin. Sen-de geliber!" },
          { speaker: "A", hanzi: "你们女生一起玩儿，我去干什么？晚上你们还有别的安排吗？", pinyin: "Nǐmen nǚshēng yìqǐ wánr, wǒ qù gàn shénme? Wǎnshang nǐmen hái yǒu bié de ānpái ma?", translation: "Siz gyzlar bile gezýärsiňiz — men ol ýerde näme etjek? Agşam ýene bir ýere gitjekmi?" },
          { speaker: "B", hanzi: "我们打算一起去唱卡拉OK。", pinyin: "Wǒmen dǎsuàn yìqǐ qù chàng kǎlā OK.", translation: "Bile karaokä gitmegi meýilleşdirýäris." },
          { speaker: "A", hanzi: "好好儿玩儿，早一点儿回来，别太晚了。", pinyin: "Hǎohāor wánr, zǎo yìdiǎnr huílai, bié tài wǎn le.", translation: "Gowyja dynç alyň, azajyk irräk geliň, aşa giç etmäň." },
          { speaker: "B", hanzi: "放心吧！对了，明天又是周末了，我们去哪儿玩儿？", pinyin: "Fàng xīn ba! Duì le, míngtiān yòu shì zhōumò le, wǒmen qù nǎr wánr?", translation: "Arkaýyn bol! Aýtmagyn, ertir ýene dynç güni — nirä gideris?" },
          { speaker: "A", hanzi: "听说美术馆的展览很不错，去看展览怎么样？", pinyin: "Tīngshuō měishùguǎn de zhǎnlǎn hěn búcuò, qù kàn zhǎnlǎn zěnmeyàng?", translation: "Eşidişime görä, çeperçilik muzeýinde gowy sergi bar, sergä baralymy?" },
          { speaker: "B", hanzi: "好啊，没意见。你吃了早饭来找我，好吗？", pinyin: "Hǎo a, méi yìjiàn. Nǐ chī le zǎofàn lái zhǎo wǒ, hǎo ma?", translation: "Bolýar, garşy däl. Ertirligi iý-de meni almaga gel, bolýarmy?" },
          { speaker: "A", hanzi: "好，明天八点半在你们宿舍门口见面，行吗？", pinyin: "Hǎo, míngtiān bā diǎn bàn zài nǐmen sùshè ménkǒu jiàn miàn, xíng ma?", translation: "Bolýar, ertir sagat 8:30-da siziň ýatakhanaňyzyň gapysynda duşuşarys, bolýarmy?" },
          { speaker: "B", hanzi: "行。那今天你干什么？", pinyin: "Xíng. Nà jīntiān nǐ gàn shénme?", translation: "Bolýar. Onda şu gün näme edýärsiň?" },
          { speaker: "A", hanzi: "和同学上网聊天儿吧。明天见！", pinyin: "Hé tóngxué shàng wǎng liáo tiānr ba. Míngtiān jiàn!", translation: "Kursdaşym bilen internetde gürrüňleşerin. Ertire çenli!" },
          { speaker: "B", hanzi: "明天见！", pinyin: "Míngtiān jiàn!", translation: "Ertire çenli!" },
        ],
      },
    ],

    tips: [
      "几两饺子 — «birnäçe lýan pelmeni». 两 (liǎng) bu ýerde agram ölçegi ≈ 50g (10 两 = 1 斤 = 500g). Naharhanalarda pelmeni köplenç sanyna däl-de, agramyna görä satylýar.",
      "祝…生日快乐 — «doglan günüň gutly bolsun!» diýmegiň adaty görnüşi. 祝你生日快乐! = Doglan günüň gutly bolsun! Şeýle hem 祝 + 新年快乐 (Täze ýylyň gutly bolsun).",
      "放心 — «ýüregiňi köşeşdir», arkaýyn bol. 放心吧！— örän mähirli ynandyrma. Alada üçin jogap hökmünde.",
      "上网 we 聊天儿 — «internete girmek» we «gürrüňleşmek». 上网聊天儿 — internetde çat etmek. Häzirki zaman gepleşik dili.",
      "没意见 — «garşy däl, razy» (göni manysy «pikir ýok»). Teklibe ýumşak razylyk.",
    ],
  },

  25: {
    introduction:
      "Unit 5-iň jemleýji baby. Siz ähli modal işlikleri (会/能/要/得/应该) gaýtalarsyňyz we 别 + V (inkär «gerek däl») bilen tanyşarsyňyz.\n\n" +
      "Ýagdaý: 中村 taýszi toparyna ýazyldy we irden turýar. 古丽 goşulmaga karar berýär — ylgamak we hereketlenmek üçin, ýogsam düýbünden ýalta bolupdyr.",

    vocabulary: [
      { hanzi: "晚安", pinyin: "wǎn'ān", translation: "gije ýagşy" },
      { hanzi: "这么", pinyin: "zhème", translation: "şeýle, şonça" },
      { hanzi: "电视剧", pinyin: "diànshìjù", translation: "serial" },
      { hanzi: "太极拳", pinyin: "tàijíquán", translation: "taýszi" },
      { hanzi: "参加", pinyin: "cānjiā", translation: "gatnaşmak" },
      { hanzi: "班", pinyin: "bān", translation: "topar, synp" },
      { hanzi: "报名", pinyin: "bào míng", translation: "hasaba durmak" },
      { hanzi: "忘", pinyin: "wàng", translation: "unutmak" },
      { hanzi: "重新", pinyin: "chóngxīn", translation: "gaýtadan, täzeden" },
      { hanzi: "闹钟", pinyin: "nàozhōng", translation: "oýanyş sagady" },
      { hanzi: "空气", pinyin: "kōngqì", translation: "howa (dem alynýan)" },
      { hanzi: "新鲜", pinyin: "xīnxiān", translation: "täzeçe" },
      { hanzi: "湖", pinyin: "hú", translation: "köl" },
      { hanzi: "跑步", pinyin: "pǎo bù", translation: "ylgamak (türgenleşik üçin)" },
      { hanzi: "劲儿", pinyin: "jìnr", translation: "güýç" },
      { hanzi: "出", pinyin: "chū", translation: "daşyna çykmak" },
      { hanzi: "汗", pinyin: "hàn", translation: "der" },
      { hanzi: "锻炼", pinyin: "duànliàn", translation: "türgenleşmek" },
      { hanzi: "棒", pinyin: "bàng", translation: "ajaýyp, gowy" },
      { hanzi: "跑", pinyin: "pǎo", translation: "ylgamak" },
      { hanzi: "散步", pinyin: "sàn bù", translation: "gezelenç etmek" },
    ],

    grammar: [
      {
        title: "Modal işlikler — syn",
        explanation:
          "Unit 4-5-de öwrenilen ähli modal işlikleri (能愿动词) tertipläliň:\n\n" +
          "1) 会 (huì) — BAŞARMAK (öwrenip):\n" +
          "   我会打太极拳。— Taýszi başarýaryn.\n\n" +
          "2) 可以 (kěyǐ) — BOLÝAR (rugsat):\n" +
          "   如果不会说汉语的话，你可以说英语。\n\n" +
          "3) 能 (néng) — BILMEK (beden/ýagdaý taýdan):\n" +
          "   古丽能用汉语聊天儿。\n\n" +
          "4) 要 (yào) — ISLEMEK/NIÝETLENMEK (subýektiw isleg):\n" +
          "   我要去跑步。— Ylgamak isleýärin.\n\n" +
          "5) 得 (děi) — GEREK (borç):\n" +
          "   明天早上有课，我得早一点儿起床。\n\n" +
          "Ählisi esasy işlikden ÖŇ goýulýar. Inkär: 不会, 不可以, 不能, 不要, 不用 (不得-niň deregine).",
        examples: [
          { hanzi: "我会打太极拳。", pinyin: "Wǒ huì dǎ tàijíquán.", translation: "Taýszi başarýaryn." },
          { hanzi: "阿曼可以说汉语。", pinyin: "Āmàn kěyǐ shuō Hànyǔ.", translation: "Aman hytaýça gepläp bilýär (oňa rugsat/başarýar)." },
          { hanzi: "我要去跑步，你去吗？", pinyin: "Wǒ yào qù pǎo bù, nǐ qù ma?", translation: "Ylgamaga gitmek isleýärin, sen barýarsyňmy?" },
          { hanzi: "明天早上有课，我得早一点儿起床。", pinyin: "Míngtiān zǎoshang yǒu kè, wǒ děi zǎo yìdiǎnr qǐ chuáng.", translation: "Ertir ertirine sapak bar, azajyk irräk turmaly." },
        ],
      },
      {
        title: "别 + V + 了 — «bes et, ýeterlik»",
        explanation:
          "20-nji bapda 别 + V = «etme» öwrenipdik. Soňunda 了 goşulan wariantyny goşalyň:\n\n" +
          "Shema:  别 + Işlik + 了\n\n" +
          "你也别看书了。— Saňa-da okamak ýeterlik.\n" +
          "别说了！— Ýeterlik, gepleme!\n" +
          "别吃了！— Iýmegi bes et!\n\n" +
          "Bu ýerde 了 «häzirki hereketi bes et» diýen manyny berýär. 了-siz — umumy gadagan.\n" +
          "• 别说 — gepleme (umuman)\n" +
          "• 别说了 — ýeterlik, gepleme (häzir)",
        examples: [
          { hanzi: "你也别看书了，早一点儿睡吧！", pinyin: "Nǐ yě bié kàn shū le, zǎo yìdiǎnr shuì ba!", translation: "Saňa-da okamak ýeterlik, irräk ýat!" },
          { hanzi: "别吃了，已经太晚了。", pinyin: "Bié chī le, yǐjīng tài wǎn le.", translation: "Iýmegi bes et, eýýäm aşa giç." },
          { hanzi: "别说了！", pinyin: "Bié shuō le!", translation: "Ýeterlik, gepleme!" },
        ],
      },
      {
        title: "得 (děi) gaýtalamada + 多 + V — «X-i köpräk etmeli»",
        explanation:
          "«Köpräk bir zat etmeli» maslahat formulasy — gaýtalanan işlikden öň 多 bilen.\n\n" +
          "Shema:  (Eýe) 得 + 多 + V-V (+ 了)\n\n" +
          "你得多锻炼锻炼了。— Saňa köpräk türgenleşmeli.\n" +
          "你得多学习学习。— Saňa köpräk okamaly.\n" +
          "你得多听听音乐。— Köpräk saz diňle.\n\n" +
          "Soňundaky 了 maslahatyň zerurlygyny nygtaýar (eýýäm wagty geldi!).",
        examples: [
          { hanzi: "你得多锻炼锻炼了。", pinyin: "Nǐ děi duō duànliàn duànliàn le.", translation: "Saňa köpräk türgenleşmeli!" },
          { hanzi: "你出了很多汗。看起来，你得多锻炼锻炼了。", pinyin: "Nǐ chū le hěn duō hàn. Kàn qǐlai, nǐ děi duō duànliàn duànliàn le.", translation: "Sen köp derledin. Görnüşi ýaly, saňa köpräk türgenleşmeli." },
          { hanzi: "你得多学习学习汉语。", pinyin: "Nǐ děi duō xuéxí xuéxí Hànyǔ.", translation: "Saňa hytaý dilini köpräk öwrenmeli." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Taýsza ýazylma (中村 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "晚安，中村。", pinyin: "Wǎn'ān, Zhōngcūn.", translation: "Gije ýagşy, Nakamura." },
          { speaker: "B", hanzi: "你怎么这么早就睡觉？不看电视剧了吗？", pinyin: "Nǐ zěnme zhème zǎo jiù shuì jiào? Bú kàn diànshìjù le ma?", translation: "Näme üçin şeýle irräk ýatýarsyň? Serialy görmeýärsiňmi?" },
          { speaker: "A", hanzi: "不看了。明天早上有太极拳课，我要早一点儿起床。", pinyin: "Bú kàn le. Míngtiān zǎoshang yǒu tàijíquán kè, wǒ yào zǎo yìdiǎnr qǐ chuáng.", translation: "Görmeýärin. Ertir ertirine taýszi sapagy bar, azajyk irräk turmaly." },
          { speaker: "B", hanzi: "你也参加太极拳班了？太好了，我也报名了。", pinyin: "Nǐ yě cānjiā tàijíquán bān le? Tài hǎo le, wǒ yě bào míng le.", translation: "Sen-de taýszi toparyna gatnaşýarsyňmy? Ajaýyp, men-de hasaba durdum!" },
          { speaker: "A", hanzi: "你也喜欢打太极拳吗？", pinyin: "Nǐ yě xǐhuan dǎ tàijíquán ma?", translation: "Sen-de taýszini halaýarsyňmy?" },
          { speaker: "B", hanzi: "喜欢。我刚来中国的时候学了半年太极拳，可是现在都忘了，所以我要重新学。", pinyin: "Xǐhuan. Wǒ gāng lái Zhōngguó de shíhou xué le bàn nián tàijíquán, kěshì xiànzài dōu wàng le, suǒyǐ wǒ yào chóngxīn xué.", translation: "Halaýaryn. Hytaýa täze gelenimde ýarym ýyl taýszi öwrendim, ýöne indi ählisini unutdym, şonuň üçin täzeden öwrenmeli." },
          { speaker: "A", hanzi: "那明天我们一起开始吧！明天早上你能叫我吗？", pinyin: "Nà míngtiān wǒmen yìqǐ kāishǐ ba! Míngtiān zǎoshang nǐ néng jiào wǒ ma?", translation: "Onda ertir bile başlalyň! Ertir ertirine meni oýaryp bilersiňmi?" },
          { speaker: "B", hanzi: "我有闹钟，没问题。", pinyin: "Wǒ yǒu nàozhōng, méi wèntí.", translation: "Meniň oýanyş sagadym bar, kynçylyk ýok." },
          { speaker: "A", hanzi: "你也别看书了，早一点儿睡吧！", pinyin: "Nǐ yě bié kàn shū le, zǎo yìdiǎnr shuì ba!", translation: "Saňa-da okamak ýeterlik, irräk ýat!" },
        ],
      },
      {
        title: "Ertirki ylgawda (中村 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "早上的空气真新鲜。", pinyin: "Zǎoshang de kōngqì zhēn xīnxiān.", translation: "Ertirki howa hakykatdanam arassa." },
          { speaker: "B", hanzi: "是呀！我还要去湖边跑步，你去吗？", pinyin: "Shì ya! Wǒ hái yào qù hú biān pǎo bù, nǐ qù ma?", translation: "Hawa! Men ýene köl boýunda ylgajak, sen barýarsyňmy?" },
          { speaker: "A", hanzi: "不去了。打了一个小时太极拳，有点儿累，没劲儿了。", pinyin: "Bú qù le. Dǎ le yí ge xiǎoshí tàijíquán, yǒudiǎnr lèi, méi jìnr le.", translation: "Barmaýaryn. Bir sagat taýszi etdim, azajyk ýadadym, güýjüm ýok." },
          { speaker: "B", hanzi: "你出了很多汗。看起来，你得多锻炼锻炼了。", pinyin: "Nǐ chū le hěn duō hàn. Kàn qǐlai, nǐ děi duō duànliàn duànliàn le.", translation: "Sen köp derledin. Görnüşi ýaly, saňa köpräk türgenleşmeli." },
          { speaker: "A", hanzi: "是呀！你的身体真棒，不累吗？", pinyin: "Shì ya! Nǐ de shēntǐ zhēn bàng, bú lèi ma?", translation: "Hakykatdanam! Seniň bedeniň örän ajaýyp, ýadamaýarsyňmy?" },
          { speaker: "B", hanzi: "不累，我每天跑步。", pinyin: "Bú lèi, wǒ měi tiān pǎo bù.", translation: "Ýadamaýaryn, men her gün ylgaýaryn." },
          { speaker: "A", hanzi: "是吗？我怎么不知道？", pinyin: "Shì ma? Wǒ zěnme bù zhīdào?", translation: "Şeýlemi? Men näme üçin bilmedim?" },
          { speaker: "B", hanzi: "我跑步的时候，你还在睡觉呢。", pinyin: "Wǒ pǎo bù de shíhou, nǐ hái zài shuì jiào ne.", translation: "Men ylgaýarkam, sen entek ýatyrsyň." },
          { speaker: "A", hanzi: "真不好意思。你每天跑多长时间？", pinyin: "Zhēn bù hǎoyìsi. Nǐ měi tiān pǎo duō cháng shíjiān?", translation: "Utandyryjy. Sen her gün näçe wagt ylgaýarsyň?" },
          { speaker: "B", hanzi: "大概跑半个小时。以后我吃了晚饭也去散散步。", pinyin: "Dàgài pǎo bàn ge xiǎoshí. Yǐhòu wǒ chī le wǎnfàn yě qù sànsan bù.", translation: "Takmynan ýarym sagat ylgaýaryn. Agşamlykdan soň-da azajyk gezelenç edýärin." },
        ],
      },
    ],

    tips: [
      "太极拳 (tàijíquán) — hytaý söweş gimnastikasy. Garrylaryň arasynda örän meşhur, ýöne ýaşlar-da köplenç meşgullanýar. Seýilgählerde ertirlik adaty görnüş.",
      "跑 bilen 跑步-niň tapawudy: 跑 — ýönekeý «ylgamak». 跑步 — «türgenleşik üçin ylgamak». «Ertirine ylgaýaryn» = 跑步, «itden gaçdy» bolsa = 跑.",
      "劲儿 (jìnr) — «güýç, energiýa». 没劲儿 = «güýji ýok, ýadan». Örän gepleşik dilindäki, Pekin sözi, -r goşulmasy bilen.",
      "身体真棒 — «beden ajaýyp, saglyk gowy». 棒 (bàng) = «ajaýyp», örän güýçli öwgi.",
      "闹钟 — «oýanyş sagady». 闹 = sesli, 钟 = sagat. «Sesli sagat» — edil oýanyş sagady!",
    ],
  },

  26: {
    introduction:
      "Bu bapda siz 快……了 / 要……了 («basym X») arkaly geljek wakalar hakda gürrüň bermegi, 只好-ny («başga alaç ýok») we 可能-ni («belki») ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: synaglar golaýlaşýar. 古丽 kitaphanada ýatdan öwrenýär, 阿曼 dynç alyşda Hytaýyň demirgazyk-gündogaryna gitmegi meýilleşdirýär. 中村 Roždestwo açyk hatlaryny ýazýar.",

    vocabulary: [
      { hanzi: "接", pinyin: "jiē", translation: "jaňa jogap bermek, garşylamak" },
      { hanzi: "电", pinyin: "diàn", translation: "elektrik" },
      { hanzi: "用功", pinyin: "yònggōng", translation: "yhlasly, zähmetsöýer" },
      { hanzi: "快", pinyin: "kuài", translation: "basym" },
      { hanzi: "基础", pinyin: "jīchǔ", translation: "esas" },
      { hanzi: "只好", pinyin: "zhǐhǎo", translation: "mejbur bolmak, başga alaç ýok" },
      { hanzi: "努力", pinyin: "nǔlì", translation: "yhlas etmek, tutanýerli" },
      { hanzi: "快要", pinyin: "kuàiyào", translation: "basym, ine-ine" },
      { hanzi: "放假", pinyin: "fàng jià", translation: "dynç alşa çykmak" },
      { hanzi: "假期", pinyin: "jiàqī", translation: "dynç alyş, rugsat" },
      { hanzi: "旅行", pinyin: "lǚxíng", translation: "syýahat etmek" },
      { hanzi: "决定", pinyin: "juédìng", translation: "karar bermek; karar" },
      { hanzi: "可能", pinyin: "kěnéng", translation: "belki, mümkin bolmak" },
      { hanzi: "出发", pinyin: "chūfā", translation: "ýola çykmak" },
      { hanzi: "考虑", pinyin: "kǎolǜ", translation: "pikirlenmek, oýlanmak" },
      { hanzi: "明信片", pinyin: "míngxìnpiàn", translation: "açyk hat" },
      { hanzi: "圣诞节", pinyin: "Shèngdàn Jié", translation: "Roždestwo" },
      { hanzi: "新年", pinyin: "xīnnián", translation: "Täze ýyl" },
      { hanzi: "寄", pinyin: "jì", translation: "poçta bilen ugratmak" },
      { hanzi: "贺卡", pinyin: "hèkǎ", translation: "gutlag açyk haty" },
      { hanzi: "办法", pinyin: "bànfǎ", translation: "usul, çäre" },
      { hanzi: "亲戚", pinyin: "qīnqi", translation: "garyndaş" },
      { hanzi: "整整", pinyin: "zhěngzhěng", translation: "bütin, doly" },
      { hanzi: "邮局", pinyin: "yóujú", translation: "poçta" },
      { hanzi: "再", pinyin: "zài", translation: "soň, ondan soň" },
      { hanzi: "刚才", pinyin: "gāngcái", translation: "edil şu wagt" },
      { hanzi: "邮票", pinyin: "yóupiào", translation: "poçta markasy" },
      { hanzi: "排队", pinyin: "pái duì", translation: "nobata durmak" },
      { hanzi: "东北", pinyin: "Dōngběi", translation: "Demirgazyk-Gündogar (Hytaýyň)" },
    ],

    grammar: [
      {
        title: "快……了 / 要……了 / 快要……了 — «basym, ine-ine»",
        explanation:
          "Üç gurluş hem «ine-ine, basym bolar» diýen manyny berýär.\n\n" +
          "Shemalar (resmiligiň artýan tertibinde):\n" +
          "• 快 + Işlik/Sypat + 了\n" +
          "• 要 + Işlik/Sypat + 了\n" +
          "• 快要 + Işlik/Sypat + 了\n\n" +
          "快考试了。— Basym synag.\n" +
          "快要放假了。— Ine-ine dynç alyş başlar.\n" +
          "新年要来了。— Täze ýyl golaýlaşýar.\n\n" +
          "ÝAKYN geljekdäki wakalar üçin ulanylýar. Soňundaky 了 hökmany.",
        examples: [
          { hanzi: "快考试了。", pinyin: "Kuài kǎoshì le.", translation: "Basym synag." },
          { hanzi: "快要放假了。", pinyin: "Kuàiyào fàng jià le.", translation: "Ine-ine dynç alyş başlar." },
          { hanzi: "新年要来了，我要给朋友寄贺卡。", pinyin: "Xīnnián yào lái le, wǒ yào gěi péngyou jì hèkǎ.", translation: "Basym Täze ýyl — dostlaryma gutlag açyk hatlaryny ugradaryn." },
        ],
      },
      {
        title: "只好 — «başga alaç ýok»",
        explanation:
          "只好 (zhǐhǎo) — «mejbur, islesem-islemesem, başga alaç ýok».\n\n" +
          "Shema:  (Eýe +) 只好 + Işlik\n\n" +
          "我基础不好，只好努力学习了。\n" +
          "«Esasym gowşak, tutanýerli okamaly boldum.»\n\n" +
          "Many: has gowy wariant ýok, mejbur.\n\n" +
          "Köplenç soňunda 了 bilen — mejburlygy nygtamak üçin.",
        examples: [
          { hanzi: "快考试了，我基础不好，只好努力学习了。", pinyin: "Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le.", translation: "Basym synag, esasym gowşak — tutanýerli okamaly boldum." },
          { hanzi: "下雨了，不能出去玩儿，只好在家里看电视。", pinyin: "Xià yǔ le, bù néng chū qù wánr, zhǐhǎo zài jiā li kàn diànshì.", translation: "Ýagyş ýagýar, daşaryk çykyp bolanok — öýde telewizor görmeli boldum." },
          { hanzi: "没有饺子了，只好吃面条儿吧。", pinyin: "Méiyǒu jiǎozi le, zhǐhǎo chī miàntiáor ba.", translation: "Pelmeni ýok — lapşa iýmeli bolar." },
        ],
      },
      {
        title: "可能 — «belki, mümkin»",
        explanation:
          "可能 (kěnéng) işlikden/jümläden öň mümkinçilik, çak aňladýar.\n\n" +
          "Shema:  (Eýe +) 可能 + Habar\n\n" +
          "可能去东北。— Belki, demirgazyk-gündogara gideris.\n" +
          "我们可能下个周末去。— Belki, indiki dynç güni gideris.\n\n" +
          "Şeýle hem at hökmünde «mümkinçilik»:\n" +
          "有可能 — mümkinçilik bar\n" +
          "没有可能 — mümkinçilik ýok\n\n" +
          "会 (ähtimallyk) bilen tapawudy: 可能 ýumşak, «belki». 会 has ynamly, «megerem».",
        examples: [
          { hanzi: "还没决定，可能去东北。", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi.", translation: "Entek karar bermedim, belki demirgazyk-gündogara." },
          { hanzi: "我们可能下个周末去。", pinyin: "Wǒmen kěnéng xià ge zhōumò qù.", translation: "Belki, indiki dynç güni gideris." },
          { hanzi: "他可能生病了，所以没来上课。", pinyin: "Tā kěnéng shēng bìng le, suǒyǐ méi lái shàng kè.", translation: "Ol belki keselländir, şonuň üçin sapaga gelmedi." },
          { hanzi: "我刚才可能下雨了，我们别去玩儿吧。", pinyin: "Wǒ gāngcái kěnéng xià yǔ le, wǒmen bié qù wánr ba.", translation: "Ýaňy belki ýagyş ýagdy, gitmäliň." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Synaga taýýarlyk (阿曼 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "今天你去哪儿了？我打你的手机，可是你没接。", pinyin: "Jīntiān nǐ qù nǎr le? Wǒ dǎ nǐ de shǒujī, kěshì nǐ méi jiē.", translation: "Sen şu gün nirä gitdiň? Men saňa jaň etdim, ýöne sen jogap bermediň." },
          { speaker: "B", hanzi: "不好意思，手机没电了。我去图书馆了，在那儿看了一个上午书。", pinyin: "Bù hǎoyìsi, shǒujī méi diàn le. Wǒ qù túshūguǎn le, zài nàr kàn le yí ge shàngwǔ shū.", translation: "Bagyşla, telefonymyň batareýasy gutardy. Kitaphana gitdim, ol ýerde bütin ertirini okadym." },
          { speaker: "A", hanzi: "你真用功！", pinyin: "Nǐ zhēn yònggōng!", translation: "Sen hakykatdanam yhlasly!" },
          { speaker: "B", hanzi: "快考试了，我基础不好，只好努力学习了。", pinyin: "Kuài kǎoshì le, wǒ jīchǔ bù hǎo, zhǐhǎo nǔlì xuéxí le.", translation: "Basym synag, esasym gowşak — tutanýerli okamaly boldum." },
          { speaker: "A", hanzi: "快要放假了，我们打算假期去旅行，你想和我们一起去吗？", pinyin: "Kuàiyào fàng jià le, wǒmen dǎsuàn jiàqī qù lǚxíng, nǐ xiǎng hé wǒmen yìqǐ qù ma?", translation: "Ine-ine dynç alyş başlar, biz dynç alyşda syýahat etmegi meýilleşdirýäris, sen biz bilen barmak isleýärsiňmi?" },
          { speaker: "B", hanzi: "你们打算去哪儿？", pinyin: "Nǐmen dǎsuàn qù nǎr?", translation: "Nirä gitmegi meýilleşdirýärsiňiz?" },
          { speaker: "A", hanzi: "还没决定，可能去东北。", pinyin: "Hái méi juédìng, kěnéng qù Dōngběi.", translation: "Entek karar bermedik, belki demirgazyk-gündogara." },
          { speaker: "B", hanzi: "大概什么时候出发？", pinyin: "Dàgài shénme shíhou chūfā?", translation: "Takmynan haçan ýola çykarsyňyz?" },
          { speaker: "A", hanzi: "可能下个周末。", pinyin: "Kěnéng xià ge zhōumò.", translation: "Belki, indiki dynç güni." },
          { speaker: "B", hanzi: "好，我考虑考虑。", pinyin: "Hǎo, wǒ kǎolǜ kǎolǜ.", translation: "Bolýar, pikirlenip görerin." },
        ],
      },
      {
        title: "Roždestwo açyk hatlary (古丽 we 中村)",
        lines: [
          { speaker: "A", hanzi: "中村，你在干什么呢？", pinyin: "Zhōngcūn, nǐ zài gàn shénme ne?", translation: "Nakamura, näme edýärsiň?" },
          { speaker: "B", hanzi: "给朋友写明信片呢。圣诞节快到了，新年也要来了，得写给朋友们贺卡了。", pinyin: "Gěi péngyou xiě míngxìnpiàn ne. Shèngdàn Jié kuài dào le, xīnnián yě yào lái le, děi xiě gěi péngyoumen hèkǎ le.", translation: "Dostlaryma açyk hat ýazýaryn. Basym Roždestwo, Täze ýyl-da golaýlaşýar — dostlaryma gutlag açyk hatlaryny ýazmaly." },
          { speaker: "A", hanzi: "写了那么多呀！", pinyin: "Xiě le nàme duō ya!", translation: "Şonça köp ýazypsyň-la!" },
          { speaker: "B", hanzi: "没办法，亲戚朋友多，我整整写了一个小时呢。", pinyin: "Méi bànfǎ, qīnqi péngyou duō, wǒ zhěngzhěng xiě le yí ge xiǎoshí ne.", translation: "Alaç ýok, garyndaşlarym-dostlarym köp — bütin bir sagat ýazdym." },
          { speaker: "A", hanzi: "现在邮局人很多，你一会儿再去寄吧。", pinyin: "Xiànzài yóujú rén hěn duō, nǐ yíhuìr zài qù jì ba.", translation: "Häzir poçtada adam köp — birazdan soň ugrat." },
          { speaker: "B", hanzi: "是吗？你怎么知道？", pinyin: "Shì ma? Nǐ zěnme zhīdào?", translation: "Şeýlemi? Sen nireden bilýärsiň?" },
          { speaker: "A", hanzi: "我刚才去邮局买邮票，差不多排了半个小时队。", pinyin: "Wǒ gāngcái qù yóujú mǎi yóupiào, chàbuduō pái le bàn ge xiǎoshí duì.", translation: "Men ýaňy poçta markasy almaga gitdim, takmynan ýarym sagat nobata durdum." },
          { speaker: "B", hanzi: "那好，我一会儿再去。", pinyin: "Nà hǎo, wǒ yíhuìr zài qù.", translation: "Bolýar, birazdan soň giderin." },
        ],
      },
    ],

    tips: [
      "快……了 ≠ «çalt». Bu gurluşda 快 = «basym, ine-ine». «Çalt» = 了-siz 快, «basym» bolsa = 快……了.",
      "没电了 — «batareýa gutardy». Göni manysy «elektrik ýok». Islendik elektron enjam hakda.",
      "圣诞节 (Shèngdàn Jié) — Roždestwo. 圣诞 göni manysy «mukaddes doglan gün». Hytaýda däp bolan baýram däl, ýöne şäherlerde meşhur.",
      "用功 (yònggōng) — «yhlasly, zähmetsöýer». Talyba öwgi. Göni manysy «tagalla ulanmak». 偷懒-niň göni garşysy.",
      "排队 — «nobata durmak». Hytaýlar muny başarmaýandyklaryny pikir edýärdiler, ýöne indi uly şäherlerde örän medeniýetli. 排 = hatara durmak, 队 = hatar.",
    ],
  },

  27: {
    introduction:
      "Bu bapda siz 极了-ni (iň ýokary dereje), 想 bilen 要-niň tapawudyny, hereketler üçin sanaýyş sözlerini (趟, 次) ulanmagy we dynç alyş meýilnamalary hakda gürrüň bermegi öwrenersiňiz.\n\n" +
      "Ýagdaý: 张伟 gadymy taryh boýunça magistratura taýýarlanmak üçin galýar, 阿曼 Harbine gidýär. Ikisi-de dynç alyş meýilnamalaryny we Täze ýylda öýe gaýtmagy maslahatlaşýarlar.",

    vocabulary: [
      { hanzi: "计划", pinyin: "jìhuà", translation: "meýilnama" },
      { hanzi: "待", pinyin: "dāi", translation: "galmak, bolmak" },
      { hanzi: "地方", pinyin: "dìfang", translation: "ýer" },
      { hanzi: "风景", pinyin: "fēngjǐng", translation: "tebigy görnüş" },
      { hanzi: "美", pinyin: "měi", translation: "owadan" },
      { hanzi: "极了", pinyin: "jí le", translation: "örän, iň ýokary derejede" },
      { hanzi: "复习", pinyin: "fùxí", translation: "gaýtalamak (sapak)" },
      { hanzi: "功课", pinyin: "gōngkè", translation: "sapaklar, okuw işleri" },
      { hanzi: "毕业", pinyin: "bì yè", translation: "uniwersiteti tamamlamak" },
      { hanzi: "抓紧", pinyin: "zhuājǐn", translation: "wagty netijeli ulanmak" },
      { hanzi: "方面", pinyin: "fāngmiàn", translation: "ugur, tarap" },
      { hanzi: "古代", pinyin: "gǔdài", translation: "gadymy döwür" },
      { hanzi: "历史", pinyin: "lìshǐ", translation: "taryh" },
      { hanzi: "感兴趣", pinyin: "gǎn xìngqù", translation: "gyzyklanmak" },
      { hanzi: "教授", pinyin: "jiàoshòu", translation: "professor" },
      { hanzi: "一定", pinyin: "yídìng", translation: "hökman, ynamly" },
      { hanzi: "考上", pinyin: "kǎoshang", translation: "synag berip girmek" },
      { hanzi: "考", pinyin: "kǎo", translation: "synag bermek" },
      { hanzi: "春节", pinyin: "Chūn Jié", translation: "Baharyň baýramy (Hytaý Täze ýyly)" },
      { hanzi: "让", pinyin: "ràng", translation: "etdirmek, haýyş etmek" },
      { hanzi: "问题", pinyin: "wèntí", translation: "sorag, mesele" },
      { hanzi: "应该", pinyin: "yīnggāi", translation: "borçly, gerek" },
      { hanzi: "想念", pinyin: "xiǎngniàn", translation: "küýsemek" },
      { hanzi: "趟", pinyin: "tàng", translation: "gezek (gitmek üçin sanaýyş sözi)" },
      { hanzi: "哈尔滨", pinyin: "Hā'ěrbīn", translation: "Harbin" },
      { hanzi: "张大朋", pinyin: "Zhāng Dàpéng", translation: "Zhang Dapeng (at)" },
    ],

    grammar: [
      {
        title: "Sypat + 极了 — «örän X»",
        explanation:
          "极了 (jí le) sypatdan soň = «iň ýokary derejede, örän-örän X».\n\n" +
          "Shema:  Sypat + 极了\n\n" +
          "风景美极了。— Peýzaž iň owadany.\n" +
          "好极了！— Ajaýyp!\n" +
          "冷极了！— Örän sowuk!\n\n" +
          "Dereje:\n" +
          "• 很 — ýönekeý örän\n" +
          "• 挺……的 — bütinleý\n" +
          "• 太……了 — aşa\n" +
          "• 极了 — iň ýokary derejede (edebi, güýçli)\n\n" +
          "极了 hemişe sypatdan SOŇ goýulýar, öňünde 很/太 bolmaýar.",
        examples: [
          { hanzi: "哈尔滨冬天的风景美极了。", pinyin: "Hā'ěrbīn dōngtiān de fēngjǐng měi jí le.", translation: "Harbiniň gyşky tebigy görnüşi örän owadan." },
          { hanzi: "那儿的风景漂亮极了。", pinyin: "Nàr de fēngjǐng piàoliang jí le.", translation: "Ol ýerdäki tebigy görnüş örän gözel." },
          { hanzi: "他的汉语好极了。", pinyin: "Tā de Hànyǔ hǎo jí le.", translation: "Onuň hytaý dili örän gowy." },
        ],
      },
      {
        title: "想 vs 要 — «isleýärin»",
        explanation:
          "Iki işlik hem «islemek» diýen manyny berýär, ýöne öwüşginde tapawut bar:\n\n" +
          "• 想 (xiǎng) — arzuw, isleg, oýlanma, hökman hereket bolmaz:\n" +
          "  我想去中国。— Hytaýa gitmegi arzuw edýärin.\n" +
          "  我想学汉语。— Hytaý dilini öwrenmek isleýärin.\n\n" +
          "• 要 (yào) — güýçli niýet/karar, basym hereket bolar:\n" +
          "  我要去跑步。— Ylgamaga gidýärin. (karar boldy!)\n" +
          "  我要考研究生。— Magistratura synag bererin. (meýilnama)\n\n" +
          "Inkär:\n" +
          "• 不想 — islemeýärin (ýumşak)\n" +
          "• 不要 — «islemedik» üçin ULANYLMAÝAR! «Etme!» diýen many berýär (gadagan)\n\n" +
          "«Islemeýärin» üçin hemişe 不想.",
        examples: [
          { hanzi: "我想去别的地方看看。", pinyin: "Wǒ xiǎng qù bié de dìfang kànkan.", translation: "Başga ýerleri görmek isleýärin." },
          { hanzi: "我朋友想去哈尔滨。", pinyin: "Wǒ péngyou xiǎng qù Hā'ěrbīn.", translation: "Dostum Harbine gitmek isleýär." },
          { hanzi: "我要考研究生。", pinyin: "Wǒ yào kǎo yánjiūshēng.", translation: "Magistratura synag bererin." },
          { hanzi: "我不想考研究生。", pinyin: "Wǒ bù xiǎng kǎo yánjiūshēng.", translation: "Magistratura synag bermek islämok." },
        ],
      },
      {
        title: "Hereketler üçin sanaýyş sözler: 趟 / 次 / 遍 / 下",
        explanation:
          "Hytaýçada hereketler hem sanalýar! Hereketler üçin sanaýyş sözler — işlikden EDIL SOŇ:\n\n" +
          "Shema:  V + 了 + san + 趟/次/遍/下\n\n" +
          "• 趟 (tàng) — gezelenç, gezek (bir ýere gitmek barada):\n" +
          "  回家一趟 — öýe bir gezek gitmek\n\n" +
          "• 次 (cì) — gezek (umumy san):\n" +
          "  去过三次 — 3 gezek boldum\n\n" +
          "• 遍 (biàn) — doly gezek (başyndan ahyryna çenli):\n" +
          "  看了一遍 — bütinleý okadym\n\n" +
          "• 下 (xià) — gysga gezek (gysga hereket):\n" +
          "  看一下 — bir seret",
        examples: [
          { hanzi: "我得安排时间回家一趟。", pinyin: "Wǒ děi ānpái shíjiān huí jiā yí tàng.", translation: "Öýe bir gezek gitmek üçin wagt tapmaly." },
          { hanzi: "我去过三次北京。", pinyin: "Wǒ qù guo sān cì Běijīng.", translation: "Pekinde 3 gezek boldum." },
          { hanzi: "这本书我看了两遍。", pinyin: "Zhè běn shū wǒ kàn le liǎng biàn.", translation: "Bu kitaby 2 gezek okadym." },
        ],
      },
      {
        title: "让 — «kimdir birine X etdirmek»",
        explanation:
          "让 (ràng) — «kimdir birine haýyş/rugsat/tabşyryk bilen bir zat etdirmek» kauzatiw işligi.\n\n" +
          "Shema:  Eýe + 让 + Kim + Işlik\n\n" +
          "爸爸妈妈让我回家。\n" +
          "«Kaka-eje meni öýe gelmegi haýyş edýär.» (göni manysy: «ata-eneler meniň gaýdyp gelmegimi edýär»)\n\n" +
          "老师让我们做作业。— Mugallym bize öý işini etmegi tabşyrýar.\n" +
          "妈妈不让我看电视。— Eje telewizor görmäge rugsat bermeýär.\n\n" +
          "Inkär: 不让 — rugsat bermeýär.",
        examples: [
          { hanzi: "爸爸妈妈让我回家。", pinyin: "Bàba māma ràng wǒ huí jiā.", translation: "Kaka-eje meni öýe çagyrýar." },
          { hanzi: "老师让我们做作业。", pinyin: "Lǎoshī ràng wǒmen zuò zuòyè.", translation: "Mugallym bize öý işini tabşyrdy." },
          { hanzi: "医生让我休息一天。", pinyin: "Yīshēng ràng wǒ xiūxi yì tiān.", translation: "Lukman maňa bir gün dynç almagy tabşyrdy." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Dynç alyş meýilnamalary (张伟 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "快放假了，你有什么计划？", pinyin: "Kuài fàng jià le, nǐ yǒu shénme jìhuà?", translation: "Basym dynç alyş, näme meýilnamaň bar?" },
          { speaker: "B", hanzi: "我打算去旅行。来中国快半年了，我一直待在北京，想去别的地方看看。", pinyin: "Wǒ dǎsuàn qù lǚxíng. Lái Zhōngguó kuài bàn nián le, wǒ yìzhí dāi zài Běijīng, xiǎng qù bié de dìfang kànkan.", translation: "Syýahat etmegi meýilleşdirýärin. Hytaýa gelenime basym ýarym ýyl bolar, hemişe Pekinde boldum — başga ýerleri-de görmek isleýärin." },
          { speaker: "A", hanzi: "你打算去哪儿旅行？", pinyin: "Nǐ dǎsuàn qù nǎr lǚxíng?", translation: "Nirä syýahat etmegi meýilleşdirýärsiň?" },
          { speaker: "B", hanzi: "还没决定。我的朋友想去哈尔滨。", pinyin: "Hái méi juédìng. Wǒ de péngyou xiǎng qù Hā'ěrbīn.", translation: "Entek karar bermedim. Dostum Harbine gitmek isleýär." },
          { speaker: "A", hanzi: "哈尔滨？那个地方冬天非常冷。", pinyin: "Hā'ěrbīn? Nàge dìfang dōngtiān fēicháng lěng.", translation: "Harbinmi? Ol ýerde gyşyna örän sowuk." },
          { speaker: "B", hanzi: "不过听说哈尔滨冬天的风景美极了，我想去看看。你假期怎么过？", pinyin: "Búguò tīngshuō Hā'ěrbīn dōngtiān de fēngjǐng měi jí le, wǒ xiǎng qù kànkan. Nǐ jiàqī zěnme guò?", translation: "Ýöne eşidişime görä, Harbiniň gyşky tebigy görnüşi örän owadan, görmek isleýärin. Sen dynç alşyňy nädip geçirersiň?" },
          { speaker: "A", hanzi: "我打算在学校复习功课。", pinyin: "Wǒ dǎsuàn zài xuéxiào fùxí gōngkè.", translation: "Uniwersitetde galyp sapaklary gaýtalamagy meýilleşdirýärin." },
          { speaker: "B", hanzi: "复习功课？你那么用功啊？", pinyin: "Fùxí gōngkè? Nǐ nàme yònggōng a?", translation: "Sapaklary gaýtalamak? Sen şeýle yhlasly-la?" },
          { speaker: "A", hanzi: "快要毕业了，我要考研究生，所以得抓紧时间复习复习。", pinyin: "Kuàiyào bì yè le, wǒ yào kǎo yánjiūshēng, suǒyǐ děi zhuājǐn shíjiān fùxí fùxí.", translation: "Basym uniwersiteti tamamlaýaryn, magistratura synag bererin, şonuň üçin wagty netijeli ulanyp gaýtalamaly." },
          { speaker: "B", hanzi: "是吗？你打算考哪个方面的研究生？", pinyin: "Shì ma? Nǐ dǎsuàn kǎo nǎge fāngmiàn de yánjiūshēng?", translation: "Şeýlemi? Haýsy ugurdan magistratura synag berjek?" },
          { speaker: "A", hanzi: "我对中国古代历史很感兴趣，想考张大朋教授的。", pinyin: "Wǒ duì Zhōngguó gǔdài lìshǐ hěn gǎn xìngqù, xiǎng kǎo Zhāng Dàpéng jiàoshòu de.", translation: "Men Hytaýyň gadymy taryhy bilen örän gyzyklanýaryn, Zhang Dapeng professoryň ýanyna synag bermek isleýärin." },
          { speaker: "B", hanzi: "真棒！你一定能考上。那你春节不回家了？", pinyin: "Zhēn bàng! Nǐ yídìng néng kǎoshang. Nà nǐ Chūn Jié bù huí jiā le?", translation: "Ajaýyp! Sen hökman synagdan geçersiň. Onda Täze ýylda öýe gitmeýärsiňmi?" },
          { speaker: "A", hanzi: "大概要回家几天，爸爸妈妈也让我回家。我正在考虑这个问题呢。", pinyin: "Dàgài yào huí jiā jǐ tiān, bàba māma yě ràng wǒ huí jiā. Wǒ zhèngzài kǎolǜ zhège wèntí ne.", translation: "Takmynan birnäçe günlük öýe giderin, kaka-eje-de meni öýe çagyrýar. Edil häzir bu barada pikirlenýärin." },
          { speaker: "B", hanzi: "回家看看也是应该的，你爸妈一定很想念你。", pinyin: "Huí jiā kànkan yě shì yīnggāi de, nǐ bàmā yídìng hěn xiǎngniàn nǐ.", translation: "Öýe baryp görmek gerek, ata-eneleriň seni hökman gaty küýseýändir." },
          { speaker: "A", hanzi: "是啊，我得安排时间回家一趟。", pinyin: "Shì a, wǒ děi ānpái shíjiān huí jiā yí tàng.", translation: "Hawa, öýe bir gezek gitmek üçin wagt tapmaly." },
        ],
      },
    ],

    tips: [
      "春节 (Chūn Jié) — Hytaý Täze ýyly (Baharyň baýramy). Iň möhüm hytaý baýramy. Aý senenamasy boýunça, adatça fewralda. Biziň Täze ýylymyzyň deňi.",
      "考上 — «synagdan geçip girmek». Çylşyrymly netijeli işlik: 考 (synag bermek) + 上 (netije). 上-siz — ýönekeý «synag bermek».",
      "对X感兴趣 — «X bilen gyzyklanmak». Durnukly formula. 对 + mowzuk + 感兴趣. «Taryh bilen gyzyklanýaryn» = 对历史感兴趣.",
      "想念 — «küýsemek». 我想念你 = «Men seni küýseýärin». Köplenç 想-e gysgaldylýar: 我想你 — «seni küýseýärin».",
      "哈尔滨 — Heýlungjyan welaýatynyň paýtagty, Hytaýyň iň demirgazykdaky uly şäheri. Ýyllyk Buz festiwaly (冰雪节) bilen meşhur.",
    ],
  },

  28: {
    introduction:
      "Bu bapda siz hereketiň nähili ýerine ýetirilendigini bahalandyrmagy (V+得+sypat), 都-ni «hemmesi» we «eýýäm» hökmünde tapawutlandyrmagy, 也许-ni («belki»), 为什么-ni («näme üçin») we 够-ni («ýeterlik») ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 古丽 we 王红 synaglary maslahatlaşýarlar. 古丽 gynanýar — iýeroglifleri haýal okaýar we ýazýar, wagt ýetmedi.",

    vocabulary: [
      { hanzi: "星期", pinyin: "xīngqī", translation: "hepde" },
      { hanzi: "门", pinyin: "mén", translation: "sapak üçin sanaýyş sözi" },
      { hanzi: "完", pinyin: "wán", translation: "gutarmak" },
      { hanzi: "有些", pinyin: "yǒuxiē", translation: "käbirleri" },
      { hanzi: "报告", pinyin: "bàogào", translation: "hasabat" },
      { hanzi: "得", pinyin: "de", translation: "gurluş bölejigi (bahadan öň)" },
      { hanzi: "放松", pinyin: "fàngsōng", translation: "gowşamak" },
      { hanzi: "紧张", pinyin: "jǐnzhāng", translation: "dartgynly, aljyraňňy" },
      { hanzi: "效果", pinyin: "xiàoguǒ", translation: "netije, täsir" },
      { hanzi: "呀", pinyin: "ya", translation: "modal bölejik" },
      { hanzi: "道", pinyin: "dào", translation: "tabşyryklar üçin sanaýyş sözi" },
      { hanzi: "题", pinyin: "tí", translation: "tabşyryk, sorag" },
      { hanzi: "为什么", pinyin: "wèi shénme", translation: "näme üçin" },
      { hanzi: "够", pinyin: "gòu", translation: "ýeterlik bolmak, ýeterlik" },
      { hanzi: "阅读", pinyin: "yuèdú", translation: "okamak (çuňňur)" },
      { hanzi: "汉字", pinyin: "Hànzì", translation: "iýeroglifler" },
      { hanzi: "难", pinyin: "nán", translation: "kyn" },
      { hanzi: "慢", pinyin: "màn", translation: "haýal" },
      { hanzi: "确实", pinyin: "quèshí", translation: "hakykatdanam" },
      { hanzi: "记", pinyin: "jì", translation: "ýat tutmak, ýazyp goýmak" },
      { hanzi: "方法", pinyin: "fāngfǎ", translation: "usul" },
      { hanzi: "编", pinyin: "biān", translation: "düzmek" },
      { hanzi: "故事", pinyin: "gùshi", translation: "taryh" },
      { hanzi: "也许", pinyin: "yěxǔ", translation: "belki, mümkin bolmak" },
      { hanzi: "帮助", pinyin: "bāngzhù", translation: "kömek, kömek etmek" },
      { hanzi: "担心", pinyin: "dān xīn", translation: "howsala düşmek, gynanmak" },
      { hanzi: "解决", pinyin: "jiějué", translation: "çözmek (mesele)" },
      { hanzi: "欧美", pinyin: "Ōu-Měi", translation: "Ýewropa we Amerika" },
    ],

    grammar: [
      {
        title: "V + 得 + Sypat — «X-i nähili etmek»",
        explanation:
          "«çalt ylgaýar», «haýal ýazýar», «gowy aýdym aýdýar» diýip nädip aýtmaly? Hytaýçada — işlikden soň 得 (de) arkaly.\n\n" +
          "Shema:  V + 得 + [örän/däl/…] + Sypat\n\n" +
          "写得很慢。— Haýal ýazýaryn.\n" +
          "考得怎么样？— Nähili tabşyrdyň? (göni manysy: «tabşyrmak nähili boldy?»)\n" +
          "跑得很快。— Çalt ylgaýar.\n\n" +
          "Eger obýekt bar bolsa, shema çylşyrymlaşýar:\n" +
          "V + O + V + 得 + Sypat.  (işlik gaýtalanýar!)\n" +
          "我写汉字写得很慢。— Iýeroglifleri haýal ýazýaryn.\n\n" +
          "得 DĚI (gerek) bilen bulaşdyrma. Bu ýerde ol gurluş bölejigi DE — hemişe işlik bilen beýanyň arasynda.",
        examples: [
          { hanzi: "考试考得怎么样？", pinyin: "Kǎoshì kǎo de zěnmeyàng?", translation: "Synagy nähili tabşyrdyň?" },
          { hanzi: "我看汉字看得很慢，写汉字也写得很慢。", pinyin: "Wǒ kàn Hànzì kàn de hěn màn, xiě Hànzì yě xiě de hěn màn.", translation: "Iýeroglifleri haýal okaýaryn, ýazýaryn hem haýal." },
          { hanzi: "他洗衣服洗得不太干净。", pinyin: "Tā xǐ yīfu xǐ de bú tài gānjìng.", translation: "Ol egin-eşiklerini onçakly arassa ýuwmaýar." },
          { hanzi: "他跑步跑得很快。", pinyin: "Tā pǎo bù pǎo de hěn kuài.", translation: "Ol çalt ylgaýar." },
        ],
      },
      {
        title: "都 — «hemmesi» vs «eýýäm»",
        explanation:
          "都 (dōu) iki many berýär:\n\n" +
          "1) «HEMMESI, IKISI-DE» (habardan öň, sanawdan soň):\n" +
          "   我的朋友都来了。— Ähli dostlarym geldi.\n" +
          "   大家对汉语都感兴趣。— Hemmesi hytaý dili bilen gyzyklanýar.\n" +
          "   从星期一到星期五，我们每天都有课。\n\n" +
          "2) «EÝÝÄM» (wagtdan öň, geň galma öwüşgini bilen):\n" +
          "   都八点半了，你怎么还不起床？\n" +
          "   «Eýýäm 8:30, näme üçin turmaýarsyň?»\n\n" +
          "Kontekst boýunça aňsat tapawutlandyrylýar: adamlardan soň = «hemmesi», wagt/sandan öň = «eýýäm».",
        examples: [
          { hanzi: "我的朋友都来了。", pinyin: "Wǒ de péngyou dōu lái le.", translation: "Ähli dostlar geldi." },
          { hanzi: "大家对汉语都感兴趣。", pinyin: "Dàjiā duì Hànyǔ dōu gǎn xìngqù.", translation: "Hemmesi hytaý dili bilen gyzyklanýar." },
          { hanzi: "都八点半了，你怎么还不起床？", pinyin: "Dōu bā diǎn bàn le, nǐ zěnme hái bù qǐ chuáng?", translation: "Eýýäm 8:30, näme üçin turmaýarsyň?" },
          { hanzi: "他来北京半年了，还没有中国朋友。", pinyin: "Tā lái Běijīng bàn nián le, hái méiyǒu Zhōngguó péngyou.", translation: "Ol Pekinde ýarym ýyl boldy, emma entek hytaý dosty ýok." },
        ],
      },
      {
        title: "为什么 — «näme üçin?»",
        explanation:
          "为什么 (wèi shénme) — «näme üçin?». Adatça soragyň başynda ýa-da eýeden soň goýulýar.\n\n" +
          "Shema:  Eýe + 为什么 + Işlik/Sypat + …?\n\n" +
          "你为什么没做？— Näme üçin etmediň?\n" +
          "你为什么不去？— Näme üçin gitmeýärsiň?\n\n" +
          "Jogap köplenç 因为 (yīnwèi — sebäbi) arkaly berilýär:\n" +
          "— 因为时间不够了。— Sebäbi wagt ýetmedi.",
        examples: [
          { hanzi: "你为什么没做？", pinyin: "Nǐ wèi shénme méi zuò?", translation: "Näme üçin etmediň?" },
          { hanzi: "你为什么不去？", pinyin: "Nǐ wèi shénme bú qù?", translation: "Näme üçin gitmeýärsiň?" },
          { hanzi: "因为时间不够了。", pinyin: "Yīnwèi shíjiān bú gòu le.", translation: "Sebäbi wagt ýetmedi." },
        ],
      },
      {
        title: "也许 — «belki» (可能-niň manydaşy)",
        explanation:
          "也许 (yěxǔ) — «belki, mümkin bolmak». Manysy boýunça 可能-niň manydaşy, ýöne birneme ýumşak, edebi.\n\n" +
          "Shema:  也许 + Habar\n\n" +
          "借给我看吧，也许会有帮助。\n" +
          "«Ber görereýin — belki kömek eder.»\n\n" +
          "• 可能 — «belki» (bitarap)\n" +
          "• 也许 — «bolup biler» (ýumşak, birneme az ynamly)\n" +
          "• 或许 (huòxǔ) — «megerem» (ýazuw stili)",
        examples: [
          { hanzi: "借给我看吧，也许会有帮助。", pinyin: "Jiè gěi wǒ kàn ba, yěxǔ huì yǒu bāngzhù.", translation: "Ber görereýin — belki kömek eder." },
          { hanzi: "他也许不来了。", pinyin: "Tā yěxǔ bù lái le.", translation: "Ol, belki, gelmez." },
          { hanzi: "也许明天下雨。", pinyin: "Yěxǔ míngtiān xià yǔ.", translation: "Belki, ertir ýagyş ýagar." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Synaglar hakda (古丽 we 王红)",
        lines: [
          { speaker: "A", hanzi: "王红，你们什么时候开始考试？", pinyin: "Wáng Hóng, nǐmen shénme shíhou kāishǐ kǎoshì?", translation: "Wan Hun, siziň synaglaryňyz haçan başlaýar?" },
          { speaker: "B", hanzi: "已经开始了。上个星期考了两门，这个星期还有一门就完了。", pinyin: "Yǐjīng kāishǐ le. Shàng ge xīngqī kǎo le liǎng mén, zhège xīngqī hái yǒu yì mén jiù wán le.", translation: "Eýýäm başlady. Geçen hepde 2-sini tabşyrdym, bu hepde ýene biri galdy — şonuň bilen gutarýar." },
          { speaker: "A", hanzi: "你们只考三门课那么少？", pinyin: "Nǐmen zhǐ kǎo sān mén kè nàme shǎo?", translation: "Bary-ýogy 3 sapak tabşyrýarsyňyzmy?" },
          { speaker: "B", hanzi: "我们有些课不考试，只写报告。你们什么时候考试？", pinyin: "Wǒmen yǒuxiē kè bù kǎoshì, zhǐ xiě bàogào. Nǐmen shénme shíhou kǎoshì?", translation: "Käbir sapaklardan diňe hasabat ýazýarys. Siz haçan?" },
          { speaker: "A", hanzi: "明天开始。现在我每天复习，看书看得头疼，都快累死了。", pinyin: "Míngtiān kāishǐ. Xiànzài wǒ měi tiān fùxí, kàn shū kàn de tóu téng, dōu kuài lèi sǐ le.", translation: "Ertir başlaýar. Häzir her gün gaýtalaýaryn, okamakdan kellämi agyrýar, ýadawlykdan ölesim gelýär diýen ýaly." },
          { speaker: "B", hanzi: "是啊，我也是。今天晚上去放松一下，怎么样？", pinyin: "Shì a, wǒ yě shì. Jīntiān wǎnshang qù fàngsōng yíxià, zěnmeyàng?", translation: "Hawa, men-de şeýle. Agşam gowşamaga gideliňmi?" },
          { speaker: "A", hanzi: "好吧！太紧张的话，学习效果也不好。", pinyin: "Hǎo ba! Tài jǐnzhāng dehuà, xuéxí xiàoguǒ yě bù hǎo.", translation: "Bolýar! Aşa dartgynly bolsaň, okuwyň netijesi hem erbet bolýar." },
          { speaker: "B", hanzi: "对呀！会学习，也要会休息，对吧？", pinyin: "Duì ya! Huì xuéxí, yě yào huì xiūxi, duì ba?", translation: "Dogry! Okamagy başarmak = dynç almagy hem başarmak, şeýlemi?" },
        ],
      },
      {
        title: "Nähili tabşyrdyň? (王红 we 古丽)",
        lines: [
          { speaker: "A", hanzi: "古丽，考试考得怎么样？", pinyin: "Gǔlì, kǎoshì kǎo de zěnmeyàng?", translation: "Gülnara, synagy nähili tabşyrdyň?" },
          { speaker: "B", hanzi: "不太好，有两个生词忘了怎么写，还有一道题没有做。", pinyin: "Bú tài hǎo, yǒu liǎng ge shēngcí wàng le zěnme xiě, hái yǒu yí dào tí méiyǒu zuò.", translation: "Onçakly gowy däl, iki täze sözüň nähili ýazylýandygyny unutdym, ýene bir tabşyrygy hem ýetişmedim." },
          { speaker: "A", hanzi: "是吗？为什么？", pinyin: "Shì ma? Wèi shénme?", translation: "Şeýlemi? Näme üçin?" },
          { speaker: "B", hanzi: "时间不够了。", pinyin: "Shíjiān bú gòu le.", translation: "Wagt ýetmedi." },
          { speaker: "A", hanzi: "哪道题你没做？", pinyin: "Nǎ dào tí nǐ méi zuò?", translation: "Haýsy tabşyrygy?" },
          { speaker: "B", hanzi: "阅读。汉字太难了！我看汉字看得很慢，写汉字也写得很慢。", pinyin: "Yuèdú. Hànzì tài nán le! Wǒ kàn Hànzì kàn de hěn màn, xiě Hànzì yě xiě de hěn màn.", translation: "Okamak. Iýeroglifler örän kyn! Haýal okaýaryn, haýal ýazýaryn." },
          { speaker: "A", hanzi: "对欧美人来说，汉字确实有点儿难。", pinyin: "Duì Ōu-Měi rén lái shuō, Hànzì quèshí yǒudiǎnr nán.", translation: "Ýewropalylar we amerikalylar üçin iýeroglifler hakykatdanam biraz kyn." },
          { speaker: "B", hanzi: "你有什么记汉字的好方法吗？", pinyin: "Nǐ yǒu shénme jì Hànzì de hǎo fāngfǎ ma?", translation: "Iýeroglifleri ýat tutmagyň gowy usullaryny bilýärsiňmi?" },
          { speaker: "A", hanzi: "我有一本给留学生编的汉字故事书，你想看吗？", pinyin: "Wǒ yǒu yì běn gěi liúxuéshēng biān de Hànzì gùshi shū, nǐ xiǎng kàn ma?", translation: "Meniň daşary ýurtly talyplar üçin düzülen iýeroglif hekaýalary kitabym bar, görmek isleýärsiňmi?" },
          { speaker: "B", hanzi: "好啊，借给我看吧，也许会有帮助。", pinyin: "Hǎo a, jiè gěi wǒ kàn ba, yěxǔ huì yǒu bāngzhù.", translation: "Bolýar, ber görereýin — belki kömek eder." },
          { speaker: "A", hanzi: "别担心，你一定能解决这个问题。", pinyin: "Bié dān xīn, nǐ yídìng néng jiějué zhège wèntí.", translation: "Aljyrama, sen bu meseläni hökman çözersiň." },
        ],
      },
    ],

    tips: [
      "得 (de) bahadan öň — 得 ýazgysynyň üç wezipesiniň biri. Bulaşdyrmaz ýaly: 得 DE — HEMIŞE işlik bilen beýanyň arasynda (写得快). Işlikden öň bolsa — bu děi «gerek» (我得写).",
      "门 — okuw sapaklary üçin sanaýyş söz: 一门课 (bir sapak), 三门课 (üç sapak). 三个课 diýip bolmaýar.",
      "道 — soraglar, tabşyryklar, naharlar üçin sanaýyş söz: 一道题 (tabşyryk), 一道菜 (nahar).",
      "看X看得Y — obýekt we baha bilen işligiň gaýtalanma shemasy. «Iýeroglifleri haýal okaýaryn» = 我看汉字看得很慢. 看 işligi gaýtalanýar!",
      "18-nji Bapdaky 对X来说 bu ýerde hem köp ulanylýar: 对欧美人来说 = «ýewropalylaryň we amerikalylaryň nazarynda». Pikir ýöretmek üçin örän peýdaly formula.",
    ],
  },

  29: {
    introduction:
      "Bu bapda siz netijeli işlikleri (V+好了, V+完了) ulanmagy, biletler üçin sanaýyş sözi (张) we otly bilen syýahat hakda gürrüň bermegi öwrenersiňiz.\n\n" +
      "Ýagdaý: 阿曼 ähli synaglary tabşyrdy we Harbin üçin bilet satyn aldy. 张伟 ony ugramazyndan öň dostlukly ýygnanyşyga çagyrýar.",

    vocabulary: [
      { hanzi: "全部", pinyin: "quánbù", translation: "hemmesi, bütinleý" },
      { hanzi: "终于", pinyin: "zhōngyú", translation: "ahyrsoňy" },
      { hanzi: "别提", pinyin: "biétí", translation: "agzamaga degmeýär (erbet)" },
      { hanzi: "提", pinyin: "tí", translation: "gozgamak (mowzugy)" },
      { hanzi: "糟糕", pinyin: "zāogāo", translation: "erbet, heläkçilik" },
      { hanzi: "声调", pinyin: "shēngdiào", translation: "äheň" },
      { hanzi: "错", pinyin: "cuò", translation: "ýalňyşlyk, nädogry" },
      { hanzi: "谦虚", pinyin: "qiānxū", translation: "kiçigöwünli" },
      { hanzi: "嗐", pinyin: "hài", translation: "ah (duýgy sözi)" },
      { hanzi: "火车", pinyin: "huǒchē", translation: "otly" },
      { hanzi: "票", pinyin: "piào", translation: "bilet" },
      { hanzi: "张", pinyin: "zhāng", translation: "sanaýyş sözi (ýasy zatlar)" },
      { hanzi: "卧铺", pinyin: "wòpù", translation: "ýatak orny (otluda)" },
      { hanzi: "另外", pinyin: "lìngwài", translation: "başga, goşmaça" },
      { hanzi: "硬座", pinyin: "yìngzuò", translation: "gaty oturgyç" },
      { hanzi: "上", pinyin: "shàng", translation: "münmek (otla)" },
      { hanzi: "补", pinyin: "bǔ", translation: "goşmaça tölemek, üstüni doldurmak" },
      { hanzi: "联欢", pinyin: "liánhuān", translation: "duşuşyk üçin ýygnanyşmak" },
      { hanzi: "晚会", pinyin: "wǎnhuì", translation: "toý" },
      { hanzi: "表演", pinyin: "biǎoyǎn", translation: "çykyş etmek" },
      { hanzi: "节目", pinyin: "jiémù", translation: "çykyş, program" },
    ],

    grammar: [
      {
        title: "Netijeli işlikler: V + 完/好/到/见/懂 + 了",
        explanation:
          "Netijeli işlik = hereket + onuň NETIJESI (bir sözde). Esasy işlikden soň netijäni görkezýän ikinji işlik goýulýar.\n\n" +
          "Shema:  V + Netije + 了\n\n" +
          "Ýygy duş gelýän netijeler:\n" +
          "• 完 (wán) — gutarmak: 考完了 (ahyryna çenli tabşyrdy), 做完了 (edip gutardy)\n" +
          "• 好 (hǎo) — hilli/ahyryna çenli etmek: 买好了 (gerekli ýaly satyn aldy), 准备好了 (taýýarlady)\n" +
          "• 到 (dào) — netijä ýetmek: 看到了 (gördi), 找到了 (tapdy)\n" +
          "• 见 (jiàn) — kabul etdi: 听见了 (eşitdi)\n" +
          "• 懂 (dǒng) — düşündi: 看懂了 (okap düşündi)\n\n" +
          "Inkär: 没 + V + Netije (了-siz):\n" +
          "我还没准备好。— Men entek taýýarlanmadym.",
        examples: [
          { hanzi: "今天全部考完了吧？", pinyin: "Jīntiān quánbù kǎo wán le ba?", translation: "Şu gün hemmesini tabşyrdyňmy?" },
          { hanzi: "我们已经买好票了。", pinyin: "Wǒmen yǐjīng mǎi hǎo piào le.", translation: "Biz eýýäm biletleri satyn aldyk." },
          { hanzi: "我找到了我的自行车。", pinyin: "Wǒ zhǎo dào le wǒ de zìxíngchē.", translation: "Men welosipedimi tapdym." },
          { hanzi: "你听见了吗？", pinyin: "Nǐ tīng jiàn le ma?", translation: "Sen eşitdiňmi?" },
          { hanzi: "我看懂了这本书。", pinyin: "Wǒ kàn dǒng le zhè běn shū.", translation: "Men bu kitaby okap düşündim." },
        ],
      },
      {
        title: "张 sanaýyş sözi — ýasy zatlar üçin",
        explanation:
          "张 (zhāng) — ýasy zatlar üçin sanaýyş söz.\n\n" +
          "Shema:  San + 张 + At\n\n" +
          "张 arkaly sanalýan zatlar:\n" +
          "• 票 — bilet: 一张票, 三张卧铺票\n" +
          "• 纸 — kagyz: 一张纸\n" +
          "• 照片 — surat: 一张照片\n" +
          "• 桌子 — stol: 一张桌子\n" +
          "• 床 — krowat: 一张床\n" +
          "• 地图 — karta: 一张地图\n\n" +
          "Logika: ýatyryp bolýan we ýasy/dörtburç görnüşli zatlaryň hemmesi.",
        examples: [
          { hanzi: "只买到三张卧铺票。", pinyin: "Zhǐ mǎi dào sān zhāng wòpù piào.", translation: "Diňe 3 ýatak orunly bilet satyn alyp bildim." },
          { hanzi: "另外一张是硬座票。", pinyin: "Lìngwài yì zhāng shì yìngzuò piào.", translation: "Ýene biri gaty oturgyç bileti." },
          { hanzi: "这是我家的照片。", pinyin: "Zhè shì wǒ jiā de zhàopiàn.", translation: "Bu meniň maşgalamyň suraty." },
          { hanzi: "买一张北京地图。", pinyin: "Mǎi yì zhāng Běijīng dìtú.", translation: "Pekiniň kartasyny satyn almak." },
        ],
      },
      {
        title: "终于 — «ahyrsoňy»",
        explanation:
          "终于 (zhōngyú) — «ahyrsoňy, iň soňunda». Uzak garaşandan/zähmet çekenden soň ýeňillik duýgusyny bildirýär.\n\n" +
          "Shema:  Eýe + 终于 + Işlik (+ 了)\n\n" +
          "考了三天，终于考完了。— 3 gün synag berdim, ahyrsoňy hemmesi gutardy.\n" +
          "他终于来了。— Ol ahyrsoňy geldi.\n\n" +
          "Köplenç soňunda 了 — garaşyşdan soňky tamamlanmagy nygtaýar.",
        examples: [
          { hanzi: "考了三天，终于考完了。", pinyin: "Kǎo le sān tiān, zhōngyú kǎo wán le.", translation: "3 gün synag berdim, ahyrsoňy hemmesi gutardy." },
          { hanzi: "他终于来了。", pinyin: "Tā zhōngyú lái le.", translation: "Ol ahyrsoňy geldi." },
          { hanzi: "我终于习惯了北京的生活。", pinyin: "Wǒ zhōngyú xíguàn le Běijīng de shēnghuó.", translation: "Men ahyrsoňy Pekiniň durmuşyna öwrenişdim." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Synaglardan soň (张伟 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，今天全部考完了吧？", pinyin: "Āmàn, jīntiān quánbù kǎo wán le ba?", translation: "Aman, şu gün hemmesini tabşyrdyňmy?" },
          { speaker: "B", hanzi: "考了三天，终于考完了。", pinyin: "Kǎo le sān tiān, zhōngyú kǎo wán le.", translation: "3 gün synag berdim — ahyrsoňy hemmesi gutardy." },
          { speaker: "A", hanzi: "考得怎么样？", pinyin: "Kǎo de zěnmeyàng?", translation: "Nähili?" },
          { speaker: "B", hanzi: "别提了，考得糟糕极了，特别是声调和汉字，错得比较多。", pinyin: "Biétí le, kǎo de zāogāo jí le, tèbié shì shēngdiào hé Hànzì, cuò de bǐjiào duō.", translation: "Sorama, örän erbet — aýratyn hem äheňler we iýeroglifler, ýalňyşlyk köp." },
          { speaker: "A", hanzi: "你是谦虚吧？平时我看你说得挺不错的。", pinyin: "Nǐ shì qiānxū ba? Píngshí wǒ kàn nǐ shuō de tǐng búcuò de.", translation: "Kiçigöwünlilik edýäňmi? Adatça sen erbet däl gepleýärsiň." },
          { speaker: "B", hanzi: "嗐！已经考完了，不想考试的事了。", pinyin: "Hài! Yǐjīng kǎo wán le, bù xiǎng kǎoshì de shì le.", translation: "Ah! Eýýäm tabşyrdym, synag hakda başga pikirlenesim gelenok." },
          { speaker: "A", hanzi: "你什么时候去旅行？", pinyin: "Nǐ shénme shíhou qù lǚxíng?", translation: "Syýahata haçan gidýärsiň?" },
          { speaker: "B", hanzi: "星期日出发。", pinyin: "Xīngqīrì chūfā.", translation: "Ýekşenbe güni ugraýaryn." },
          { speaker: "A", hanzi: "决定去哪儿了吗？", pinyin: "Juédìng qù nǎr le ma?", translation: "Nirä gitjegiňi karar berdiňmi?" },
          { speaker: "B", hanzi: "决定了，去哈尔滨。", pinyin: "Juédìng le, qù Hā'ěrbīn.", translation: "Berdim, Harbine." },
          { speaker: "A", hanzi: "你们怎么去？坐火车去吗？", pinyin: "Nǐmen zěnme qù? Zuò huǒchē qù ma?", translation: "Nädip gidýärsiňiz? Otlyda-my?" },
          { speaker: "B", hanzi: "对，我们已经买好票了，不过只买到三张卧铺票，另外一张是硬座票。", pinyin: "Duì, wǒmen yǐjīng mǎi hǎo piào le, búguò zhǐ mǎi dào sān zhāng wòpù piào, lìngwài yì zhāng shì yìngzuò piào.", translation: "Hawa, biletleri eýýäm satyn aldyk. Ýöne diňe 3 ýatak orunly, dördünjisi — oturgyç bileti." },
          { speaker: "A", hanzi: "你可以上车补卧铺票，可能还有卧铺。", pinyin: "Nǐ kěyǐ shàng chē bǔ wòpù piào, kěnéng hái yǒu wòpù.", translation: "Otlyda ýatak orny üçin goşmaça töläp bilersiň — belki ýene bar bolar." },
          { speaker: "B", hanzi: "是吗？那太好了。", pinyin: "Shì ma? Nà tài hǎo le.", translation: "Şeýlemi? Ajaýyp." },
          { speaker: "A", hanzi: "这个星期六我们系里有一个联欢晚会，你能来吗？", pinyin: "Zhège xīngqīliù wǒmen xì li yǒu yí ge liánhuān wǎnhuì, nǐ néng lái ma?", translation: "Bu şenbe bizde fakultetde dostlukly ýygnanyşyk bar — gelip bilersiňmi?" },
          { speaker: "B", hanzi: "我们星期日下午出发，应该没问题。去参加中国学生的晚会，要准备什么东西？", pinyin: "Wǒmen xīngqīrì xiàwǔ chūfā, yīnggāi méi wèntí. Qù cānjiā Zhōngguó xuésheng de wǎnhuì, yào zhǔnbèi shénme dōngxi?", translation: "Biz ýekşenbe güni günortan ugraýarys — ýetişmeli. Hytaý talyplarynyň ýygnanyşygyna näme taýýarlamaly?" },
          { speaker: "A", hanzi: "不用准备。不过，也许会让你表演一个节目。", pinyin: "Búyòng zhǔnbèi. Búguò, yěxǔ huì ràng nǐ biǎoyǎn yí ge jiémù.", translation: "Hiç zat taýýarlamaly däl. Ýöne, belki bir çykyş etmegiňi haýyş ederler." },
          { speaker: "B", hanzi: "这个……", pinyin: "Zhège...", translation: "Ýeri…" },
        ],
      },
    ],

    tips: [
      "火车 Hytaýda şäherara esasy ulag görnüşi. Klaslar: 硬座 (gaty oturgyç, arzan), 软座 (ýumşak oturgyç), 硬卧 (gaty ýatak orny), 软卧 (ýumşak kupe).",
      "补票 — «bilet üçin goşmaça tölemek». Hytaýyň däp bolan tejribesi: orun ýetmese — oturgyç bileti alýarsyň, otlyda ýatak ornuna (卧铺) çenli goşmaça töleýärsiň.",
      "别提了 — gepleşik dilinde «sorama-da, betbagtçylyk!» diýen aňlatma. Erbet bir zat bolanda we gürrüň bermek islemeýän wagtyň ulanylýar.",
      "谦虚 — «kiçigöwünli». Möhüm hytaý gymmatlygy. Öweniňde 哪里哪里 (näme diýýärsiňiz-le) ýa-da 谦虚 diýip jogap bermek adat — öz üstünlikleriňi kiçeltmek.",
      "联欢 + 晚会 = «duşuşyk agşamy, dostlukly ýygnanyşyk». Hytaý ýokary okuw jaýlarynda adaty çäre — aýdym, tans, çykyşlar bilen.",
    ],
  },

  30: {
    introduction:
      "Bu tutuş okuw kitabynyň jemleýji baby! Siz ähli esasy gurluşlary gaýtalarsyňyz we çykyşa taýýarlanmak hakda gürrüň bermegi, 怕 (gorkmak) we emfatik 多……啊 («ahyry-ha edil şu X!») ulanmagy öwrenersiňiz.\n\n" +
      "Ýagdaý: 阿曼 fakultet ýygnanyşygyna taýýarlanýar. Ol hytaý halk aýdymyny aýtmagy karar etdi, ýöne aýdylyşy sebäpli howsala düşýär.",

    vocabulary: [
      { hanzi: "行李", pinyin: "xíngli", translation: "goş-golam" },
      { hanzi: "收拾", pinyin: "shōushi", translation: "goş ýygnamak, arassalamak" },
      { hanzi: "半天", pinyin: "bàntiān", translation: "ýarym gün" },
      { hanzi: "整天", pinyin: "zhěng tiān", translation: "bütin gün" },
      { hanzi: "联欢会", pinyin: "liánhuānhuì", translation: "duşuşyk agşamy" },
      { hanzi: "需要", pinyin: "xūyào", translation: "zerur bolmak, gerek" },
      { hanzi: "英文", pinyin: "Yīngwén", translation: "iňlis dili" },
      { hanzi: "首", pinyin: "shǒu", translation: "aýdymlar üçin sanaýyş sözi" },
      { hanzi: "流行", pinyin: "liúxíng", translation: "meşhur" },
      { hanzi: "歌曲", pinyin: "gēqǔ", translation: "aýdym" },
      { hanzi: "民歌", pinyin: "míngē", translation: "halk aýdymy" },
      { hanzi: "好听", pinyin: "hǎotīng", translation: "diňlemäge ýakymly" },
      { hanzi: "发音", pinyin: "fāyīn", translation: "aýdylyş" },
      { hanzi: "懂", pinyin: "dǒng", translation: "düşünmek" },
      { hanzi: "熟悉", pinyin: "shúxī", translation: "tanyş, gowy bilmek" },
      { hanzi: "歌词", pinyin: "gēcí", translation: "aýdymyň sözleri" },
      { hanzi: "标准", pinyin: "biāozhǔn", translation: "standart" },
      { hanzi: "面子", pinyin: "miànzi", translation: "abraý, at-abraý" },
      { hanzi: "光盘", pinyin: "guāngpán", translation: "disk (CD)" },
      { hanzi: "次", pinyin: "cì", translation: "gezek (sanaýyş sözi)" },
      { hanzi: "怕", pinyin: "pà", translation: "gorkmak" },
    ],

    grammar: [
      {
        title: "多……啊 — emfatik «edil şu X!»",
        explanation:
          "多……啊 gurluşy geň galma/gygyryş öwüşgini bilen ýokary derejäni bildirýär.\n\n" +
          "Shema:  多 + Sypat + 啊\n\n" +
          "多没面子啊！— Ýaman utanç ahyry!\n" +
          "多好啊！— Örän gowy ahyry!\n" +
          "多漂亮啊！— Ýaman owadan ahyry!\n\n" +
          "«Bu nähili-de X!» diýen gygyryşa meňzeýär.\n\n" +
          "Gygyryş äheňinde terjime edilýär, duýgyny bildirýär. Köplenç ritoriki äheň bilen.",
        examples: [
          { hanzi: "可是，我的发音太不标准的话，那多没面子啊！", pinyin: "Kěshì, wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a!", translation: "Ýöne aýdylyşym aşa standart bolmasa — bu ýaman utanç ahyry!" },
          { hanzi: "看，那儿的风景多漂亮啊！", pinyin: "Kàn, nàr de fēngjǐng duō piàoliang a!", translation: "Seret, ol ýerdäki tebigy görnüş ýaman owadan!" },
          { hanzi: "快考试了，学生们多紧张啊！", pinyin: "Kuài kǎoshì le, xuéshēngmen duō jǐnzhāng a!", translation: "Basym synag, talyplar ýaman dartgynly ahyry!" },
        ],
      },
      {
        title: "怕 — «gorkmak»",
        explanation:
          "怕 (pà) — «gorkmak». Bolup biler:\n\n" +
          "1) Doly işlik hökmünde:  Eýe + 怕 + Obýekt\n" +
          "   我怕狗。— Itlerden gorkýaryn.\n" +
          "   我不怕冷。— Sowukdan gorkamok.\n\n" +
          "2) Başga işlikden öň (etmekden gorkmak):\n" +
          "   我怕说错。— Ýalňyş aýtmakdan gorkýaryn.\n" +
          "   你是怕表演节目吧？— Çykyş etmekden gorkýarsyňmy?\n\n" +
          "3) 怕 + eýerjeň sözlem:\n" +
          "   我怕他不来。— Gorkýaryn, ol gelmez öýdýän.",
        examples: [
          { hanzi: "你是怕表演节目吧？", pinyin: "Nǐ shì pà biǎoyǎn jiémù ba?", translation: "Çykyş etmekden gorkýarsyňmy?" },
          { hanzi: "有点儿。", pinyin: "Yǒudiǎnr.", translation: "Azajyk." },
          { hanzi: "我不怕冷。", pinyin: "Wǒ bú pà lěng.", translation: "Sowukdan gorkamok." },
          { hanzi: "我怕他不来。", pinyin: "Wǒ pà tā bù lái.", translation: "Gorkýaryn, ol gelmez öýdýän." },
        ],
      },
      {
        title: "首 we 次 sanaýyş sözleri — aýdymlar we gezekler üçin",
        explanation:
          "• 首 (shǒu) — AÝDYMLAR we GOŞGULAR üçin sanaýyş söz:\n" +
          "  一首歌 — bir aýdym\n" +
          "  一首民歌 — bir halk aýdymy\n" +
          "  几首英文歌 — birnäçe iňlis aýdymy\n\n" +
          "• 次 (cì) — GEZEK üçin sanaýyş söz (hemişe sandan soň, işlikden öň ýa-da soň):\n" +
          "  一次 — bir gezek\n" +
          "  两次 — iki gezek\n" +
          "  去过一次北京 — Pekinde bir gezek boldum\n\n" +
          "遍 bilen tapawudy: 次 — ýönekeý gezek, 遍 — başyndan ahyryna çenli bir gezek.",
        examples: [
          { hanzi: "我不想唱英文歌，我打算唱一首中文歌。", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.", translation: "Iňlisçe aýdym aýtmak islämok, hytaýça bir aýdym aýtjak." },
          { hanzi: "不，我想唱一首民歌。", pinyin: "Bù, wǒ xiǎng chàng yì shǒu míngē.", translation: "Ýok, bir halk aýdymyny aýtmak isleýärin." },
          { hanzi: "借来用用，也许会有帮助。", pinyin: "Jiè lái yòng yòng, yěxǔ huì yǒu bāngzhù.", translation: "Karz alyp ulanaýyn, belki kömek eder." },
        ],
      },
      {
        title: "Modal işlikleriň gaýtalanyşy: 想/要/得/会/能/可以",
        explanation:
          "Okuwyň ahyrynda — ähli modal işlikleri anyk mysallar bilen berkideliň:\n\n" +
          "• 想 + V — isleýärin (isleg):\n" +
          "  我想唱一首民歌。\n\n" +
          "• 要 + V — niýetlenýärin (karar berdim):\n" +
          "  我要参加联欢会。\n\n" +
          "• 得 + V — gerek (borç):\n" +
          "  得写给朋友们贺卡。\n\n" +
          "• 会 + V — başarýaryn:\n" +
          "  会说汉语。\n\n" +
          "• 能 + V — bilýärin (ýagdaýa görä):\n" +
          "  他们能听懂吗？\n\n" +
          "• 可以 + V — bolýar (rugsat):\n" +
          "  你可以上车补票。\n\n" +
          "Ähli bu sözler + işlik. Nädogry saýlaw manyny düýpli üýtgedýär — tapawutlary ýat tut.",
        examples: [
          { hanzi: "今天我要参加一个中国学生的联欢会。", pinyin: "Jīntiān wǒ yào cānjiā yí ge Zhōngguó xuéshēng de liánhuānhuì.", translation: "Şu gün hytaý talyplarynyň ýygnanyşygyna gitjek." },
          { hanzi: "我不想唱英文歌，我打算唱一首中文歌。", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.", translation: "Iňlisçe aýdym aýtmak islämok, hytaýça aýdym aýtjak." },
          { hanzi: "他们能听懂吗？", pinyin: "Tāmen néng tīng dǒng ma?", translation: "Olar düşünip bilerlermi?" },
          { hanzi: "我的同屋有中国民歌的光盘，借来用用。", pinyin: "Wǒ de tóngwū yǒu Zhōngguó míngē de guāngpán, jiè lái yòng yòng.", translation: "Otagdaşymda hytaý halk aýdymlarynyň diski bar — karz alyp ulanaýyn." },
        ],
      },
    ],

    dialogues: [
      {
        title: "Gitmezden öň (古丽 we 阿曼)",
        lines: [
          { speaker: "A", hanzi: "阿曼，快要出发了，你准备好行李了吗？", pinyin: "Āmàn, kuàiyào chūfā le, nǐ zhǔnbèi hǎo xíngli le ma?", translation: "Aman, basym ugraýarys, goş-golamyňy taýýarladyňmy?" },
          { speaker: "B", hanzi: "我昨天收拾了半天，早就准备好了。", pinyin: "Wǒ zuótiān shōushi le bàntiān, zǎo jiù zhǔnbèi hǎo le.", translation: "Düýn ýarym gün ýygnadym — eýýäm taýýar." },
          { speaker: "A", hanzi: "那你整天在房间里干什么？", pinyin: "Nà nǐ zhěng tiān zài fángjiān li gàn shénme?", translation: "Onda bütin gün otagda näme etdiň?" },
          { speaker: "B", hanzi: "今天我要参加一个中国学生的联欢会，正在准备节目呢。", pinyin: "Jīntiān wǒ yào cānjiā yí ge Zhōngguó xuéshēng de liánhuānhuì, zhèngzài zhǔnbèi jiémù ne.", translation: "Şu gün hytaý talyplarynyň ýygnanyşygyna gitjek, çykyş taýýarlaýaryn." },
          { speaker: "A", hanzi: "你唱歌唱得那么好，还需要准备吗？", pinyin: "Nǐ chàng gē chàng de nàme hǎo, hái xūyào zhǔnbèi ma?", translation: "Sen şeýle gowy aýdym aýdýarsyň, näme üçin taýýarlanmaly?" },
          { speaker: "B", hanzi: "我不想唱英文歌，我打算唱一首中文歌。", pinyin: "Wǒ bù xiǎng chàng Yīngwén gē, wǒ dǎsuàn chàng yì shǒu Zhōngwén gē.", translation: "Iňlisçe aýtmak islämok — hytaýça bir aýdym aýtjak." },
          { speaker: "A", hanzi: "好极了。你打算唱流行歌曲吗？", pinyin: "Hǎo jí le. Nǐ dǎsuàn chàng liúxíng gēqǔ ma?", translation: "Ajaýyp. Meşhur aýdymmy?" },
          { speaker: "B", hanzi: "不，我想唱一首民歌。", pinyin: "Bù, wǒ xiǎng chàng yì shǒu míngē.", translation: "Ýok, halk aýdymy." },
          { speaker: "A", hanzi: "民歌？民歌很好听啊。", pinyin: "Míngē? Míngē hěn hǎotīng a.", translation: "Halk aýdymymy? Bu diňlemäge ýakymly." },
          { speaker: "B", hanzi: "我的发音不太好，他们能听懂吗？", pinyin: "Wǒ de fāyīn bú tài hǎo, tāmen néng tīng dǒng ma?", translation: "Meniň aýdylyşym onçakly gowy däl — düşünerlermi?" },
          { speaker: "A", hanzi: "如果是有名的民歌，他们一定很熟悉歌词，没问题吧。", pinyin: "Rúguǒ shì yǒumíng de míngē, tāmen yídìng hěn shúxī gēcí, méi wèntí ba.", translation: "Eger belli halk aýdymy bolsa, olar sözlerini gowy bilýändir, kynçylyk bolmaz." },
          { speaker: "B", hanzi: "可是，我的发音太不标准的话，那多没面子啊！", pinyin: "Kěshì, wǒ de fāyīn tài bù biāozhǔn dehuà, nà duō méi miànzi a!", translation: "Ýöne aýdylyşym aşa standart bolmasa — ýaman utanç ahyry!" },
          { speaker: "A", hanzi: "我的同屋有中国民歌的光盘，借来用用，也许会有帮助。", pinyin: "Wǒ de tóngwū yǒu Zhōngguó míngē de guāngpán, jiè lái yòng yòng, yěxǔ huì yǒu bāngzhù.", translation: "Otagdaşymda hytaý halk aýdymlarynyň diski bar — karz alaýyn, belki kömek eder." },
          { speaker: "B", hanzi: "谢谢！你今天有空儿吗？和我一起去怎么样？", pinyin: "Xièxie! Nǐ jīntiān yǒu kòngr ma? Hé wǒ yìqǐ qù zěnmeyàng?", translation: "Sag bol! Şu gün wagtyň barmy? Bile gideliňmi?" },
          { speaker: "A", hanzi: "我还没准备好行李呢，下次吧！", pinyin: "Wǒ hái méi zhǔnbèi hǎo xíngli ne, xià cì ba!", translation: "Men entek goş-golamymy taýýarlamadym, indiki gezek!" },
          { speaker: "B", hanzi: "你是怕表演节目吧？", pinyin: "Nǐ shì pà biǎoyǎn jiémù ba?", translation: "Çykyş etmekden gorkýarsyňmy?" },
          { speaker: "A", hanzi: "有点儿。", pinyin: "Yǒudiǎnr.", translation: "Azajyk." },
        ],
      },
    ],

    tips: [
      "民歌 (míngē) — halk aýdymy. Hytaýda örän meşhur žanr. Belli aýdymlar: 茉莉花 (Jasmin gülü), 康定情歌 (Kandiniň söýgi aýdymy). Hytaý dilini öwrenmek üçin ajaýyp.",
      "面子 (miànzi) — «abraý, at-abraý». Hytaý medeniýetiniň esasy düşünjesi. 没面子 — abraýdan gaçmak, utanç bolmak. 给面子 — hormat goýmak (abraý bermek). Işewürlik gatnaşyklarynda möhüm düşünje.",
      "光盘 — CD/DVD. Streaming döwründe söz könelişýär, ýöne 2012-nji ýylyň okuw kitabynda häzirki. Häzir köplenç 下载 (ýükläp almak) ýa-da diňe 听音乐 diýilýär.",
      "发音 (aýdylyş) — hytaý diliniň iň kyn böleklerinden biri. Äheňler (声调) + dogry aýdyş. Olarsyz iýeroglifler dogry bolsa-da saňa düşünmezler.",
      "Boya Chinese Elementary 1-i tamamlanyň bilen gutlaýaryn! 30 bap, 700+ söz, ähli esasy grammatik gurluşlar. Indiki dereje — Boya Chinese Elementary 2 (31-60-njy baplar).",
    ],
  },
};
