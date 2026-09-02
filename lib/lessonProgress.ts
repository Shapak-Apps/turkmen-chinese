import { getValidated, setJson } from "@/lib/storage/safeStorage";
import { LessonProgressSchema } from "@/lib/storage/schemas";

const STATS_KEY = "lesson_progress";

export interface LessonProgress {
  [lessonId: string]: number; // lessonID -> completionCount
}

const readProgress = async (): Promise<LessonProgress> =>
  getValidated(STATS_KEY, LessonProgressSchema, {});

const writeProgress = async (data: LessonProgress) => {
  await setJson(STATS_KEY, data);
};

export const incrementLessonCompletion = async (lessonId: string) => {
  const progress = await readProgress();
  progress[lessonId] = (progress[lessonId] || 0) + 1;
  await writeProgress(progress);
};

export const getAllProgress = async (): Promise<LessonProgress> => {
  return await readProgress();
};

/** Whether a lesson has ever been completed — used to grant XP rewards only once. */
export const hasCompletedLesson = async (lessonId: string): Promise<boolean> => {
  const progress = await readProgress();
  return (progress[lessonId] || 0) > 0;
};
