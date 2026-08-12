// ============================================================
// Единый источник всех строк интерфейса (туркменский).
//
// Сюда входит ТОЛЬКО UI-чром: кнопки, лейблы, статусы, заголовки.
// Учебный контент (объяснения, упражнения, переводы слов) сюда НЕ входит —
// он в assets/data/* и туркменизируется командой переводчиков отдельно.
//
// 👉 Команде переводчиков: правьте значения только в этом файле.
//    Туркменские формулировки ниже — рабочая версия, требует вычитки носителем.
// ============================================================

export const T = {
  common: {
    continue: "Dowam et",
    next: "Indiki",
    check: "Barla",
    skip: "Geç",
  },

  // Экран обратной связи после ответа (FeedbackView)
  feedback: {
    correct: "Berekella!",
    notQuite: "Az galdy",
    keepPractising: "Maşk et",
    tryAgainSub: "Ýene synan — başararsyň!",
    nextTimeSub: "Indiki gezek şeýle aýt",
    expected: "Garaşylýan",
    youSaid: "Sen aýtdyň",
    correctResponse: "Dogry jogap",
    nextQuestion: "Indiki sorag",
    tryAgainLeft: (n: number) => `Ýene synan (${n} galdy)`,
  },

  // Экран завершения урока (LessonCompleteScreen)
  complete: {
    title: "Sapak tamamlandy!",
    perfExcellent: "Ajaýyp!", // ≥90%
    perfGreat: "Örän gowy!", // ≥75%
    perfGood: "Gowy!", // ≥60%
    perfKeep: "Maşk etmegi dowam et!", // <60%
    correctCount: (correct: number, total: number) => `${correct}/${total} dogry`,
    inThisLesson: "BU SAPAKDA",
    correctAnswers: (n: number) => `${n} dogry jogap`,
    lessonComplete: "Sapak tamamlandy",
    bonus100: "⭐ 100% bonus",
    reviewTitle: "Gaýtala",
    reviewSubtitle: "Şu soraglara üns ber",
    reviewMistakes: "Ýalňyşlary gaýtala",
  },

  // Шаги главы (Stepik-лента)
  steps: {
    // Лейблы по subtype шага (lookup: T.steps.labels[step.subtype])
    labels: {
      intro: "Giriş",
      vocab: "Sözler",
      grammar: "Grammatika",
      dialogue: "Dialog",
      practice: "Gönükmeler",
      exam: "Bap synagy",
    } as Record<string, string>,
    progress: (done: number, total: number) => `${done} / ${total} ädim`,
    locked: "Ýapyk",
  },

  // Экзамен главы (Bap synagy) — экран результата с порогом 70%
  exam: {
    passedTitle: "Synag tabşyryldy!",
    failedTitle: "Synag geçilmedi",
    passedMessage: "Indiki baba geçip bilersiň.",
    failedMessage: "Geçmek üçin azyndan 70% gerek. Gaýtadan synanyş.",
    scoreLabel: (correct: number, total: number) => `${correct}/${total} dogry`,
    thresholdNote: "Geçmek üçin 70% gerek",
    breakdownTitle: "Görnüşler boýunça",
    bestScore: (pct: number) => `Iň gowy netije: ${pct}%`,
    retake: "Gaýtadan synanyş",
    passBadge: "Geçdiň",
    // Названия типов упражнений для разбивки в результатах
    types: {
      single_response: "Gepleýiş",
      multiple_choice: "Saýlama",
      listening_mc: "Diňleme",
      flashcard: "Kartoçka",
      fill_blank: "Boşlugy doldurma",
      match_pairs: "Jübütleme",
      grammar: "Grammatika",
      stroke_order: "Çyzyklaryň tertibi",
    } as Record<string, string>,
  },

  // Режимы упражнений (Flashcard / FillBlank / MultipleChoice / Grammar / MatchPairs)
  practice: {
    chooseAnswer: "Jogaby saýla:",
    hintLabel: "Kömek",
    examples: "Mysallar",
    startPractice: (n: number) => `Maşk (${n} sorag)`,
    questionProgress: (current: number, total: number) => `${current} / ${total} sorag`,
    matched: (matched: number, total: number) => `${matched} / ${total} jübütlendi`,
  },

  // Заголовки и состояния экранов
  screen: {
    theoryTitle: "Teoriýa",
    theoryPlaceholder: "Teoriýa ýakyn wagtda goşular.",
    chapterNotFound: "Bap tapylmady",
    matchPairsLabel: "Jübütleri birikdir",
  },

  // Диалог подтверждения (дефолтные подписи, обычно переопределяются)
  dialog: {
    confirm: "Tassykla",
    cancel: "Ýatyr",
  },

  // Запись произношения (LessonContent) — фича в плане на доработку
  speaking: {
    micPermissionTitle: "Mikrofon rugsady",
    micPermissionBody: "Gepleýşi maşk etmek üçin mikrofon gerek.",
    recordingErrorTitle: "Ýazgy ýalňyşlygy",
    couldNotStart: "Ýazgyny başladyp bolmady.",
    noAudio: "Ses ýazga alynmady.",
    couldNotProcess: "Ýazgyny işläp bolmady.",
    analyzing: "Aýdylyş barlanýar...",
  },

  // Упражнение на произношение — режим «повтори вслух» (shadowing)
  shadowing: {
    prompt: "Diňläp, bu jümläni hytaýça gaýtala",
    reveal: "Aýdylyşyny görmek üçin bas",
  },

  // Аудио-подсказка перед аудио-вопросами (AudioPrompt)
  audioPrompt: {
    tapToListen: "Diňlemek üçin oýnat düwmesine bas",
    playsOnce: "Ses her jogapdan öň bir gezek çalynýar",
    listening: "Diňlenýär...",
    revealWhatSaid: "Näme aýdylanyny görmek üçin şu ýere bas",
  },

  // Аудирование — «что ты услышал?» (ListeningMultipleChoiceMode)
  listening: {
    whatDidYouHear: "Näme eşitdiň?",
  },

  // Разбор предложения по словам (SentenceBreakdownCard)
  breakdown: {
    title: "Sözlem derňewi",
    tapWordForMeaning: "Manysyny görmek üçin islendik söze bas",
    breakdownLabel: "Derňew:",
  },

  // Диалог подтверждения выхода из упражнения (ConfirmDialog в LessonContent)
  exitLesson: {
    title: "Gönükmeden çykmak",
    message: "Hakykatdan hem çykmak isleýärsiňmi? Öňegidişligiň ýitiriler.",
    stay: "Ýok",
    leave: "Çyk",
  },

  // Локальный бэкап прогресса (экспорт/импорт в файл)
  backup: {
    exportTitle: "Maglumatlary ýatda sakla",
    exportSubtitle: "XP, streak we öňegidişligi faýla göçür",
    importTitle: "Maglumatlary dikelt",
    importSubtitle: "Ýatda saklanan faýldan yzyna ýükle",
    importDone: "Dikeldildi. Programmany täzeden aç.",
    failed: "Bir zat ýalňyş gitdi. Gaýtadan synanyş.",
  },

  // Локальные пуш-напоминания о streak
  notifications: {
    reminderTitle: "Streagyňy ýitirme! 🔥",
    reminderBody: "Şu gün hytaý dilini birazajyk maşk et.",
  },

  // Подписи для скринридеров (accessibilityLabel) на icon-only кнопках
  a11y: {
    back: "Yza gaýt",
    exit: "Çyk",
    playAudio: "Diňle",
    addBookmark: "Bellige goş",
    removeBookmark: "Belligi aýyr",
    strokeOrder: "Ýazylyşyny görkez",
  },
};
