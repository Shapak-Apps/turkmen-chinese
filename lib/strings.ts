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

  // Режимы упражнений (Flashcard / FillBlank / MultipleChoice / Grammar / MatchPairs)
  practice: {
    chooseAnswer: "Jogaby saýla:",
    hintLabel: "Kömek",
    examples: "Mysallar",
    startPractice: (n: number) => `Maşk (${n} sorag)`,
    questionProgress: (current: number, total: number) => `${current} / ${total} sorag`,
    matched: (matched: number, total: number) => `${matched} / ${total} jübütlendi`,
  },
};
