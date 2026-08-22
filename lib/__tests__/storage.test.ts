import { beforeEach, describe, expect, it } from "@jest/globals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CURRENT_SCHEMA_VERSION,
  runMigrations,
  SCHEMA_VERSION_KEY,
} from "@/lib/storage/migrations";
import { getValidated } from "@/lib/storage/safeStorage";
import {
  ExamResultsSchema,
  LessonProgressSchema,
  SettingsSchema,
  StreakDataSchema,
  StepProgressSchema,
} from "@/lib/storage/schemas";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("getValidated", () => {
  const fallback = { lastActiveDate: null, currentStreak: 7, longestStreak: 7 };

  it("returns the fallback when the key is missing", async () => {
    expect(await getValidated("streak_data", StreakDataSchema, fallback)).toEqual(fallback);
  });

  it("returns the fallback on broken JSON", async () => {
    await AsyncStorage.setItem("streak_data", "{not json");
    expect(await getValidated("streak_data", StreakDataSchema, fallback)).toEqual(fallback);
  });

  it("returns the fallback on a wrong shape", async () => {
    await AsyncStorage.setItem("streak_data", JSON.stringify([1, 2, 3]));
    expect(await getValidated("streak_data", StreakDataSchema, fallback)).toEqual(fallback);
  });

  it("returns parsed data when the shape is valid", async () => {
    const stored = { lastActiveDate: "2026-08-22", currentStreak: 3, longestStreak: 5 };
    await AsyncStorage.setItem("streak_data", JSON.stringify(stored));
    expect(await getValidated("streak_data", StreakDataSchema, fallback)).toEqual(stored);
  });
});

describe("per-entry salvage", () => {
  it("exam_results: one broken entry drops only itself", async () => {
    const good = {
      accuracy: 80,
      correct: 8,
      total: 10,
      passed: true,
      attempts: 1,
      bestAccuracy: 80,
      updatedAt: "2026-08-22T00:00:00.000Z",
    };
    await AsyncStorage.setItem(
      "exam_results",
      JSON.stringify({ "1": good, "2": { accuracy: 50 } }),
    );
    const res = await getValidated("exam_results", ExamResultsSchema, {});
    expect(Object.keys(res)).toEqual(["1"]);
    expect(res["1"]).toEqual(good);
  });

  it("lesson_progress: non-number entries are dropped", async () => {
    await AsyncStorage.setItem("lesson_progress", JSON.stringify({ a: 3, b: "x", c: null }));
    expect(await getValidated("lesson_progress", LessonProgressSchema, {})).toEqual({ a: 3 });
  });

  it("step_progress: non-array entries are dropped", async () => {
    await AsyncStorage.setItem(
      "step_progress",
      JSON.stringify({ "1": ["a", "b"], "2": "x", "3": [1] }),
    );
    expect(await getValidated("step_progress", StepProgressSchema, {})).toEqual({ "1": ["a", "b"] });
  });

  it("app_settings: one invalid enum keeps the other fields", async () => {
    await AsyncStorage.setItem(
      "app_settings",
      JSON.stringify({ strokeLeniency: "easy", hintThreshold: "99", remindersEnabled: false }),
    );
    const s = await getValidated("app_settings", SettingsSchema, {
      strokeLeniency: "medium",
      hintThreshold: "3",
      strokeMode: "learn",
      remindersEnabled: true,
    });
    expect(s.strokeLeniency).toBe("easy");
    expect(s.remindersEnabled).toBe(false);
    expect(s.hintThreshold).toBe("3"); // salvaged per-field, not reset
    expect(s.strokeMode).toBe("learn");
  });
});

describe("runMigrations", () => {
  it("fresh install stamps the current version and runs nothing", async () => {
    await runMigrations();
    expect(await AsyncStorage.getItem(SCHEMA_VERSION_KEY)).toBe(String(CURRENT_SCHEMA_VERSION));
  });

  it("a version written by a newer build is left untouched", async () => {
    const newer = String(CURRENT_SCHEMA_VERSION + 1);
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, newer);
    await runMigrations();
    expect(await AsyncStorage.getItem(SCHEMA_VERSION_KEY)).toBe(newer);
  });

  it("a corrupt version is treated as 0 and healed", async () => {
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, "not-a-number");
    await runMigrations();
    expect(await AsyncStorage.getItem(SCHEMA_VERSION_KEY)).toBe(String(CURRENT_SCHEMA_VERSION));
  });
});
