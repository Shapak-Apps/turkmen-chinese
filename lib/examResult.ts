import AsyncStorage from "@react-native-async-storage/async-storage";

// ============================================================
// Результаты экзаменов глав (Bap synagy).
//
// Это ФУНДАМЕНТ Stepik-гейтинга: «сдал/не сдал» по порогу. Хранится отдельно
// от lessonProgress (тот считает завершения упражнений), потому что экзамен —
// это оценка, а не счётчик прохождений. На этом модуле будет строиться
// разблокировка следующей главы.
// ============================================================

/** Порог сдачи экзамена в процентах (по первой попытке на каждый вопрос). */
export const EXAM_PASS_THRESHOLD = 70;

const STORAGE_KEY = "exam_results";

export interface ExamResult {
  /** Точность последней попытки, % (по первой попытке на вопрос). */
  accuracy: number;
  /** Правильных вопросов в последней попытке. */
  correct: number;
  /** Всего вопросов в экзамене. */
  total: number;
  /** Сдан ли экзамен (последняя попытка ≥ порога ИЛИ когда-либо сдавал). */
  passed: boolean;
  /** Сколько раз экзамен проходился. */
  attempts: number;
  /** Лучшая точность за все попытки, %. */
  bestAccuracy: number;
  /** ISO-время последней попытки. */
  updatedAt: string;
}

type ExamResults = Record<string, ExamResult>;

/** Процент правильных (целое), безопасно при total === 0. */
export const computeAccuracy = (correct: number, total: number): number =>
  total > 0 ? Math.round((correct / total) * 100) : 0;

/** Достаточно ли точности для сдачи. */
export const isPassingScore = (accuracy: number): boolean =>
  accuracy >= EXAM_PASS_THRESHOLD;

const readAll = async (): Promise<ExamResults> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ExamResults;
  } catch {
    return {};
  }
};

const writeAll = async (data: ExamResults) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("examResult: failed to write", err);
  }
};

/**
 * Сохранить результат попытки экзамена. Накапливает попытки, держит лучший
 * результат и «прилипающую» сдачу (passed остаётся true, даже если потом
 * пересдал хуже). Возвращает обновлённую запись.
 */
export const saveExamResult = async (
  chapterId: number,
  attempt: { correct: number; total: number },
): Promise<ExamResult> => {
  const all = await readAll();
  const prev = all[chapterId];

  const accuracy = computeAccuracy(attempt.correct, attempt.total);
  const passedNow = isPassingScore(accuracy);

  const result: ExamResult = {
    accuracy,
    correct: attempt.correct,
    total: attempt.total,
    passed: passedNow || (prev?.passed ?? false),
    attempts: (prev?.attempts ?? 0) + 1,
    bestAccuracy: Math.max(accuracy, prev?.bestAccuracy ?? 0),
    updatedAt: new Date().toISOString(),
  };

  all[chapterId] = result;
  await writeAll(all);
  return result;
};

/** Результат экзамена главы или null, если ещё не проходился. */
export const getExamResult = async (
  chapterId: number,
): Promise<ExamResult | null> => {
  const all = await readAll();
  return all[chapterId] ?? null;
};

/** Все результаты экзаменов (для карты прогресса / гейтинга). */
export const getAllExamResults = async (): Promise<ExamResults> => {
  return await readAll();
};

/** Сдан ли экзамен главы — основа разблокировки следующей главы. */
export const hasPassedExam = async (chapterId: number): Promise<boolean> => {
  const result = await getExamResult(chapterId);
  return result?.passed ?? false;
};
