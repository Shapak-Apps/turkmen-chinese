import AsyncStorage from "@react-native-async-storage/async-storage";
import { getValidated } from "@/lib/storage/safeStorage";
import { ExamResultsSchema } from "@/lib/storage/schemas";

export const EXAM_PASS_THRESHOLD = 70;

const STORAGE_KEY = "exam_results";

export interface ExamResult {
  accuracy: number;
  correct: number;
  total: number;
  passed: boolean;
  attempts: number;
  bestAccuracy: number;
  updatedAt: string;
}

type ExamResults = Record<string, ExamResult>;

export const computeAccuracy = (correct: number, total: number): number =>
  total > 0 ? Math.round((correct / total) * 100) : 0;

export const isPassingScore = (accuracy: number): boolean =>
  accuracy >= EXAM_PASS_THRESHOLD;

const readAll = async (): Promise<ExamResults> =>
  getValidated(STORAGE_KEY, ExamResultsSchema, {});

const writeAll = async (data: ExamResults) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("examResult: failed to write", err);
  }
};

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

export const getExamResult = async (
  chapterId: number,
): Promise<ExamResult | null> => {
  const all = await readAll();
  return all[chapterId] ?? null;
};

export const getAllExamResults = async (): Promise<ExamResults> => {
  return await readAll();
};

export const hasPassedExam = async (chapterId: number): Promise<boolean> => {
  const result = await getExamResult(chapterId);
  return result?.passed ?? false;
};
