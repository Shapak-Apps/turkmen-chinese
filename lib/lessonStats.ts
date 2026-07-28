import type { Question } from "@/constants/CourseData";
import { T } from "@/lib/strings";

export interface WrongQuestion {
  english: string;
  mandarin: {
    hanzi: string;
    pinyin: string;
  };
  attempts: number;
}

export interface TypeBreakdown {
  type: string;
  correct: number;
  total: number;
}

export interface LessonStats {
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  wrongQuestions?: WrongQuestion[];
  /** Правильных вопросов с первой попытки (честная метрика для экзамена). */
  firstTryCorrect?: number;
  /** Разбивка по типам упражнений (для экрана результата экзамена). */
  byType?: TypeBreakdown[];
}

/**
 * Чистая агрегация завершённого прохождения урока/экзамена в LessonStats.
 * `wrongQuestions` и `questionAttempts` ключуются по id вопроса.
 *
 * Вынесено из LessonContent, чтобы скоринг не зависел от UI и покрывался тестами.
 */
export function computeLessonStats(
  questions: Question[],
  correctAnswersCount: number,
  wrongQuestions: Set<number>,
  questionAttempts: Record<number, number>,
): LessonStats {
  const accuracy = Math.round((correctAnswersCount / questions.length) * 100);

  const wrongQuestionsList = questions
    .filter((q) => wrongQuestions.has(q.id))
    .map((q) => {
      let english = "";
      let hanzi = "";
      let pinyin = "";

      if (q.type === "listening_mc") {
        english =
          q.options.find((opt) => opt.id === q.correctOptionId)?.english || "";
        hanzi = q.mandarin.hanzi;
        pinyin = q.mandarin.pinyin;
      } else if (q.type === "multiple_choice" || q.type === "single_response") {
        const option = q.options[0];
        english = option.english;
        hanzi = option.mandarin.hanzi;
        pinyin = option.mandarin.pinyin;
      } else if (q.type === "flashcard") {
        const correct = q.options.find((opt) => opt.id === q.correctOptionId);
        english = correct?.english || "";
        hanzi = q.mandarin.hanzi;
        pinyin = q.mandarin.pinyin;
      } else if (q.type === "fill_blank") {
        english = q.correctAnswer;
        hanzi = q.sentence;
        pinyin = q.sentencePinyin;
      } else if (q.type === "match_pairs") {
        english = T.screen.matchPairsLabel;
        hanzi = q.pairs.map((p) => p.left).join(", ");
        pinyin = "";
      } else if (q.type === "grammar") {
        english = q.rule.title;
        hanzi = "";
        pinyin = "";
      } else if (q.type === "stroke_order") {
        english = q.instruction || "Hiýeroglif ýaz";
        hanzi = q.characters.join("");
        pinyin = "";
      }

      return {
        english,
        mandarin: {
          hanzi,
          pinyin,
        },
        attempts: questionAttempts[q.id] || 1,
      };
    });

  // First-try metrics — a question counts as passed only if it was never wrong
  // (not in wrongQuestions). This is the honest score for the exam and the
  // basis for the per-type breakdown.
  const firstTryCorrect = questions.length - wrongQuestions.size;
  const typeAgg: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q) => {
    const agg = (typeAgg[q.type] ??= { correct: 0, total: 0 });
    agg.total += 1;
    if (!wrongQuestions.has(q.id)) agg.correct += 1;
  });
  const byType = Object.entries(typeAgg).map(([type, v]) => ({
    type,
    correct: v.correct,
    total: v.total,
  }));

  return {
    correctAnswers: correctAnswersCount,
    totalQuestions: questions.length,
    accuracy,
    wrongQuestions:
      wrongQuestionsList.length > 0 ? wrongQuestionsList : undefined,
    firstTryCorrect,
    byType,
  };
}
