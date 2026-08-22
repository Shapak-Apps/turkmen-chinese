import {
  buildChapterSteps,
  CourseStep,
  getOrderedChapterIds,
  isChapterExaminable,
} from "@/lib/courseSteps";
import { hasCompletedLesson } from "@/lib/lessonProgress";
import { getAllExamResults } from "@/lib/examResult";
import { getValidated, setJson } from "@/lib/storage/safeStorage";
import { StepProgressSchema } from "@/lib/storage/schemas";

// ============================================================
// Прогресс и РАЗБЛОКИРОВКА шагов (Stepik-гейтинг).
//
// Источники истины переиспользуются, чтобы не плодить дубли:
// • экзамен → examResult (passed)
// • практика → lessonProgress (`chapter-${id}` завершён)
// • теория → НОВОЕ хранилище здесь (раньше «долистал теорию» нигде не трекалось)
//
// Гейтинг строгий: внутри главы шаги открываются по порядку; следующая глава
// открывается после сдачи экзамена предыдущей (главы без экзамена пропускаются
// при подсчёте «предыдущей»).
// ============================================================

export type StepState = "done" | "current" | "locked";

export interface StepWithState {
  step: CourseStep;
  state: StepState;
  done: boolean;
}

// ---- Pure core (без I/O — легко тестируется) ----

/**
 * Разложить шаги по состояниям. Все пройденные → "done"; первый непройденный →
 * "current" (разблокирован); остальные → "locked". Робастно к «дыркам»: если
 * ранний шаг не пройден, а поздний пройден, ранний всё равно станет current.
 */
export const computeStepStates = (
  steps: CourseStep[],
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

/**
 * Разблокирована ли глава по позиции в упорядоченном списке. Глава открыта, если
 * сдан ближайший предыдущий ЭКЗАМЕНУЕМЫЙ chapter (главы без экзамена прозрачны
 * для гейтинга). Первая глава (и любая без экзаменуемых предшественников) открыта.
 */
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

// ---- Theory-step storage ----

const STORAGE_KEY = "step_progress";

type TheoryProgress = Record<string, string[]>;

const readAll = async (): Promise<TheoryProgress> =>
  getValidated(STORAGE_KEY, StepProgressSchema, {});

const writeAll = async (data: TheoryProgress) => {
  await setJson(STORAGE_KEY, data);
};

/** Отметить теоретический шаг пройденным (долистал до конца). Идемпотентно. */
export const markTheoryStepDone = async (chapterId: number, stepKey: string) => {
  const all = await readAll();
  const list = all[chapterId] ?? [];
  if (!list.includes(stepKey)) {
    all[chapterId] = [...list, stepKey];
    await writeAll(all);
  }
};

/** Множество пройденных теоретических шагов главы. */
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

// ---- Async aggregators (то, что потребляет UI) ----

export interface ChapterStepStates {
  steps: StepWithState[];
  doneCount: number;
  total: number;
  /** Сдан ли экзамен главы (для подписи/перехода). */
  examPassed: boolean;
}

/** Лента шагов одной главы с состояниями — данные для экрана главы. */
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

/**
 * Сводка по всем главам для карты прогресса на главном: разблокировка
 * (кросс-главный гейтинг) + сколько шагов сдано в каждой главе.
 */
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
