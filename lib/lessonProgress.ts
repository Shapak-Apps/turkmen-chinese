import AsyncStorage from "@react-native-async-storage/async-storage";
import { getValidated } from "@/storage/safeStorage";
import { LessonProgressSchema } from "@/storage/schemas";

const STATS_KEY = "lesson_progress";

export interface LessonProgress {
  [lessonId: string]: number;
}

const readProgress = async (): Promise<LessonProgress> =>
  getValidated(STATS_KEY, LessonProgressSchema, {});

const writeProgress = async (data: LessonProgress) => {
  try {
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("lessonProgress: failed to write", err);
  }
};

export const incrementLessonCompletion = async (lessonId: string) => {
  const progress = await readProgress();
  progress[lessonId] = (progress[lessonId] || 0) + 1;
  await writeProgress(progress);
};

export const getAllProgress = async (): Promise<LessonProgress> => {
  return await readProgress();
};

export const hasCompletedLesson = async (lessonId: string): Promise<boolean> => {
  const progress = await readProgress();
  return (progress[lessonId] || 0) > 0;
};
