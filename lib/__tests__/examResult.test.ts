import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EXAM_PASS_THRESHOLD,
  computeAccuracy,
  isPassingScore,
  saveExamResult,
  getExamResult,
  getAllExamResults,
  hasPassedExam,
} from "@/lib/examResult";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("computeAccuracy", () => {
  it("rounds to a whole percent", () => {
    expect(computeAccuracy(7, 10)).toBe(70);
    expect(computeAccuracy(2, 3)).toBe(67);
    expect(computeAccuracy(1, 3)).toBe(33);
  });

  it("is 0 when there are no questions", () => {
    expect(computeAccuracy(0, 0)).toBe(0);
  });
});

describe("isPassingScore", () => {
  it("passes exactly at the threshold", () => {
    expect(isPassingScore(EXAM_PASS_THRESHOLD)).toBe(true);
    expect(isPassingScore(EXAM_PASS_THRESHOLD - 1)).toBe(false);
    expect(isPassingScore(100)).toBe(true);
  });
});

describe("examResult storage", () => {
  it("has no result before any attempt", async () => {
    expect(await getExamResult(1)).toBeNull();
    expect(await hasPassedExam(1)).toBe(false);
    expect(await getAllExamResults()).toEqual({});
  });

  it("stores a passing attempt", async () => {
    const result = await saveExamResult(1, { correct: 8, total: 10 });
    expect(result.accuracy).toBe(80);
    expect(result.passed).toBe(true);
    expect(result.attempts).toBe(1);
    expect(result.bestAccuracy).toBe(80);
    expect(await hasPassedExam(1)).toBe(true);
  });

  it("marks a below-threshold attempt as not passed", async () => {
    const result = await saveExamResult(2, { correct: 6, total: 10 });
    expect(result.accuracy).toBe(60);
    expect(result.passed).toBe(false);
    expect(await hasPassedExam(2)).toBe(false);
  });

  it("counts attempts and keeps the best accuracy across retakes", async () => {
    await saveExamResult(3, { correct: 5, total: 10 }); // 50%
    const second = await saveExamResult(3, { correct: 9, total: 10 }); // 90%
    expect(second.attempts).toBe(2);
    expect(second.bestAccuracy).toBe(90);
    expect(second.accuracy).toBe(90);
  });

  it("keeps passed sticky even if a later retake fails", async () => {
    await saveExamResult(4, { correct: 8, total: 10 }); // pass 80%
    const retake = await saveExamResult(4, { correct: 4, total: 10 }); // fail 40%
    expect(retake.accuracy).toBe(40);
    expect(retake.passed).toBe(true); // already passed once
    expect(retake.bestAccuracy).toBe(80);
    expect(await hasPassedExam(4)).toBe(true);
  });

  it("tracks chapters independently", async () => {
    await saveExamResult(1, { correct: 7, total: 10 });
    await saveExamResult(2, { correct: 3, total: 10 });
    const all = await getAllExamResults();
    expect(all["1"].passed).toBe(true);
    expect(all["2"].passed).toBe(false);
    expect(await getExamResult(99)).toBeNull();
  });
});
