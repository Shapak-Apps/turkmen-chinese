import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  buildChapterSteps,
  getOrderedChapterIds,
  isChapterExaminable,
} from "@/lib/courseSteps";
import { hasCompletedLesson } from "@/lib/lessonProgress";
import { getAllExamResults } from "@/lib/examResult";
import { getValidated } from "@/lib/storage/safeStorage";
import { StepProgressSchema } from "@/lib/storage/schemas";

export type StepState = "done" | "current" | "locked";

export interface StepWithState {
  step: import("@/lib/courseSteps").CourseStep;
  state: StepState;
  done: boolean;
}

export const computeStepStates = (
  steps: import("@/lib/courseSteps").CourseStep[],
  flags: { theoryDone: Set<string>; practiceDone: boolean; examPassed: boolean },
): StepWithState[] => {
  let currentAssigned = false;
  return steps.map((step) => {
    const done =
      step.kind === "exam"
        ? flags.examPassed
        : step.kind === "practice"
          ? flags.practiceDone
          : flags.theoryDone.has(step.key);

    let state: StepState;
    if (done) {
      state = "done";
    } else if (!currentAssigned) {
      state = "current";
      currentAssigned = true;
    } else {
      state = "locked";
    }
    return { step, state, done };
  });
};

export const isChapterUnlocked = (
  index: number,
  examinable: boolean[],
  passed: boolean[],
): boolean => {
  for (let i = index - 1; i >= 0; i--) {
    if (examinable[i]) return passed[i];
  }
  return true;
};

const STORAGE_KEY = "step_progress";

type TheoryProgress = Record<string, string[]>;

const readAll = async (): Promise<TheoryProgress> =>
  getValidated(STORAGE_KEY, StepProgressSchema, {});

const writeAll = async (data: TheoryProgress) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("stepProgress: failed to write", err);
  }
};

export const markTheoryStepDone = async (chapterId: number, stepKey: string) => {
  const all = await readAll();
  const list = all[chapterId] ?? [];
  if (!list.includes(stepKey)) {
    all[chapterId] = [...list, stepKey];
    await writeAll(all);
  }
};

export const getTheoryStepsDone = async (
  chapterId: number,
): Promise<Set<string>> => {
  const all = await readAll();
  return new Set(all[chapterId] ?? []);
};

export const isTheoryStepDone = async (
  chapterId: number,
  stepKey: string,
): Promise<boolean> => {
  const all = await readAll();
  return (all[chapterId] ?? []).includes(stepKey);
};

export interface ChapterStepStates {
  steps: StepWithState[];
  doneCount: number;
  total: number;
  examPassed: boolean;
}

export const getChapterStepStates = async (
  chapterId: number,
): Promise<ChapterStepStates> => {
  const steps = buildChapterSteps(chapterId);
  const [theoryDone, practiceDone, examResults] = await Promise.all([
    getTheoryStepsDone(chapterId),
    hasCompletedLesson(`chapter-${chapterId}`),
    getAllExamResults(),
  ]);
  const examPassed = examResults[chapterId]?.passed ?? false;

  const withState = computeStepStates(steps, {
    theoryDone,
    practiceDone,
    examPassed,
  });
  return {
    steps: withState,
    doneCount: withState.filter((s) => s.done).length,
    total: withState.length,
    examPassed,
  };
};

export interface ChapterUnlock {
  chapterId: number;
  unlocked: boolean;
  passed: boolean;
  total: number;
  doneCount: number;
}

export const getCourseUnlocks = async (): Promise<ChapterUnlock[]> => {
  const ids = getOrderedChapterIds();
  const [allTheory, examResults] = await Promise.all([
    readAll(),
    getAllExamResults(),
  ]);
  const practiceDoneFlags = await Promise.all(
    ids.map((id) => hasCompletedLesson(`chapter-${id}`)),
  );

  const examinable = ids.map((id) => isChapterExaminable(id));
  const passed = ids.map((id) => examResults[id]?.passed ?? false);

  return ids.map((chapterId, i) => {
    const steps = buildChapterSteps(chapterId);
    const withState = computeStepStates(steps, {
      theoryDone: new Set(allTheory[chapterId] ?? []),
      practiceDone: practiceDoneFlags[i],
      examPassed: passed[i],
    });
    return {
      chapterId,
      unlocked: isChapterUnlocked(i, examinable, passed),
      passed: passed[i],
      total: withState.length,
      doneCount: withState.filter((s) => s.done).length,
    };
  });
};
