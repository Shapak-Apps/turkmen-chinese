import type { Question } from "@/constants/CourseData";
import { computeLessonStats } from "@/lib/lessonStats";

const flashcard = (id: number): Question => ({
  id,
  type: "flashcard",
  mandarin: { hanzi: "好", pinyin: "hǎo" },
  instruction: "Saýla",
  options: [{ id: 1, english: "good", hanzi: "好", pinyin: "hǎo" }],
  correctOptionId: 1,
});

const grammar = (id: number): Question => ({
  id,
  type: "grammar",
  rule: { title: "是-jümle", explanation: "", examples: [] },
  practice: [],
});

const matchPairs = (id: number): Question => ({
  id,
  type: "match_pairs",
  instruction: "Baglaň",
  pairs: [{ id: 1, left: "好", right: "good" }],
});

describe("computeLessonStats", () => {
  it("all correct → 100%, no wrongQuestions, byType fully correct", () => {
    const questions = [flashcard(1), grammar(2), matchPairs(3)];
    const stats = computeLessonStats(questions, 3, new Set(), {});

    expect(stats.correctAnswers).toBe(3);
    expect(stats.totalQuestions).toBe(3);
    expect(stats.accuracy).toBe(100);
    expect(stats.firstTryCorrect).toBe(3);
    expect(stats.wrongQuestions).toBeUndefined();
    expect(stats.byType).toEqual([
      { type: "flashcard", correct: 1, total: 1 },
      { type: "grammar", correct: 1, total: 1 },
      { type: "match_pairs", correct: 1, total: 1 },
    ]);
  });

  it("one wrong → rounded accuracy, wrong list, per-type split, attempts", () => {
    const questions = [flashcard(1), flashcard(2), grammar(3)];
    const stats = computeLessonStats(questions, 2, new Set([2]), { 2: 3 });

    expect(stats.accuracy).toBe(67); // round(2/3 * 100)
    expect(stats.firstTryCorrect).toBe(2); // 3 total − 1 wrong
    expect(stats.wrongQuestions).toEqual([
      {
        english: "good",
        mandarin: { hanzi: "好", pinyin: "hǎo" },
        attempts: 3,
      },
    ]);
    expect(stats.byType).toEqual([
      { type: "flashcard", correct: 1, total: 2 },
      { type: "grammar", correct: 1, total: 1 },
    ]);
  });

  it("wrong without recorded attempts defaults to 1", () => {
    const questions = [flashcard(1)];
    const stats = computeLessonStats(questions, 0, new Set([1]), {});

    expect(stats.wrongQuestions?.[0].attempts).toBe(1);
    expect(stats.accuracy).toBe(0);
  });
});
