import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseStep } from "@/lib/courseSteps";
import { incrementLessonCompletion } from "@/lib/lessonProgress";
import { saveExamResult } from "@/lib/examResult";
import {
  computeStepStates,
  isChapterUnlocked,
  markTheoryStepDone,
  getTheoryStepsDone,
  isTheoryStepDone,
  getChapterStepStates,
  getCourseUnlocks,
} from "@/lib/stepProgress";

beforeEach(async () => {
  await AsyncStorage.clear();
});

const mk = (
  key: string,
  kind: CourseStep["kind"],
  subtype: CourseStep["subtype"],
  index: number,
): CourseStep => ({ key, chapterId: 1, kind, subtype, index, title: "" });

const SAMPLE: CourseStep[] = [
  mk("intro", "theory", "intro", 0),
  mk("vocab", "theory", "vocab", 1),
  mk("practice", "practice", "practice", 2),
  mk("exam", "exam", "exam", 3),
];

describe("computeStepStates — strict sequential gating", () => {
  const states = (
    theoryDone: string[],
    practiceDone: boolean,
    examPassed: boolean,
  ) =>
    computeStepStates(SAMPLE, {
      theoryDone: new Set(theoryDone),
      practiceDone,
      examPassed,
    }).map((s) => s.state);

  it("opens only the first step when nothing is done", () => {
    expect(states([], false, false)).toEqual([
      "current",
      "locked",
      "locked",
      "locked",
    ]);
  });

  it("advances the current marker as theory steps complete", () => {
    expect(states(["intro"], false, false)).toEqual([
      "done",
      "current",
      "locked",
      "locked",
    ]);
    expect(states(["intro", "vocab"], false, false)).toEqual([
      "done",
      "done",
      "current",
      "locked",
    ]);
  });

  it("unlocks the exam only after practice is done", () => {
    expect(states(["intro", "vocab"], true, false)).toEqual([
      "done",
      "done",
      "done",
      "current",
    ]);
  });

  it("marks everything done once the exam is passed", () => {
    expect(states(["intro", "vocab"], true, true)).toEqual([
      "done",
      "done",
      "done",
      "done",
    ]);
  });

  it("derives exam/practice done from their own flags, not theory", () => {
    const result = computeStepStates(SAMPLE, {
      theoryDone: new Set(["intro", "vocab"]),
      practiceDone: false,
      examPassed: true,
    });
    expect(result.find((s) => s.step.key === "exam")?.done).toBe(true);
    expect(result.find((s) => s.step.key === "practice")?.done).toBe(false);
  });
});

describe("isChapterUnlocked — cross-chapter gating", () => {
  // c0 = pronunciation (no exam), c1, c2 examinable
  const examinable = [false, true, true];

  it("unlocks the first chapter and the first examinable chapter unconditionally", () => {
    const passed = [false, false, false];
    expect(isChapterUnlocked(0, examinable, passed)).toBe(true); // pronunciation
    expect(isChapterUnlocked(1, examinable, passed)).toBe(true); // first examinable
  });

  it("locks a later chapter until the previous exam is passed", () => {
    expect(isChapterUnlocked(2, examinable, [false, false, false])).toBe(false);
    expect(isChapterUnlocked(2, examinable, [false, true, false])).toBe(true);
  });

  it("treats non-examinable predecessors as transparent", () => {
    // c1 non-examinable, c0 examinable+passed → c2 (index 2) unlocked via c0
    const ex = [true, false, true];
    expect(isChapterUnlocked(2, ex, [true, false, false])).toBe(true);
    expect(isChapterUnlocked(2, ex, [false, false, false])).toBe(false);
  });
});

describe("theory step storage", () => {
  it("records and reads completed theory steps idempotently", async () => {
    expect(await getTheoryStepsDone(1)).toEqual(new Set());
    await markTheoryStepDone(1, "intro");
    await markTheoryStepDone(1, "intro"); // idempotent
    await markTheoryStepDone(1, "vocab");
    expect(await getTheoryStepsDone(1)).toEqual(new Set(["intro", "vocab"]));
    expect(await isTheoryStepDone(1, "intro")).toBe(true);
    expect(await isTheoryStepDone(1, "grammar-0")).toBe(false);
    expect(await getTheoryStepsDone(2)).toEqual(new Set()); // independent
  });
});

describe("getChapterStepStates — integration across stores", () => {
  it("composes theory store + practice (lessonProgress) + exam (examResult)", async () => {
    const before = await getChapterStepStates(1);
    expect(before.total).toBeGreaterThan(0);
    expect(before.doneCount).toBe(0);
    expect(before.steps[0].state).toBe("current");

    await markTheoryStepDone(1, "intro");
    await incrementLessonCompletion("chapter-1"); // practice done
    await saveExamResult(1, { correct: 8, total: 10 }); // exam passed (80%)

    const after = await getChapterStepStates(1);
    expect(after.examPassed).toBe(true);
    expect(after.doneCount).toBeGreaterThanOrEqual(2);
    expect(after.steps.find((s) => s.step.key === "practice")?.done).toBe(true);
    expect(after.steps.find((s) => s.step.key === "exam")?.done).toBe(true);
  });
});

describe("getCourseUnlocks — course map data", () => {
  it("unlocks the next chapter only after the previous exam is passed", async () => {
    const before = await getCourseUnlocks();
    const c1 = before.find((c) => c.chapterId === 1)!;
    const c2 = before.find((c) => c.chapterId === 2)!;
    expect(c1.unlocked).toBe(true); // first examinable chapter
    expect(c2.unlocked).toBe(false); // gated by chapter 1
    expect(c2.passed).toBe(false);

    await saveExamResult(1, { correct: 9, total: 10 }); // pass chapter 1

    const after = await getCourseUnlocks();
    expect(after.find((c) => c.chapterId === 1)!.passed).toBe(true);
    expect(after.find((c) => c.chapterId === 2)!.unlocked).toBe(true);
  });
});
