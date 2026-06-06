import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkAndResetIfNeeded,
  getStreak,
  markActiveDay,
  resetStreak,
} from "@/lib/streak";

// Pin the local clock to noon on the given Y-M-D so date-key math is deterministic.
function setToday(year: number, month: number, day: number) {
  jest.setSystemTime(new Date(year, month - 1, day, 12, 0, 0));
}

beforeEach(async () => {
  jest.useFakeTimers();
  await AsyncStorage.clear();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("markActiveDay", () => {
  it("starts a streak on the first active day", async () => {
    setToday(2026, 6, 6);
    const { data, grew } = await markActiveDay();
    expect(grew).toBe(true);
    expect(data.currentStreak).toBe(1);
    expect(data.longestStreak).toBe(1);
    expect(data.lastActiveDate).toBe("2026-06-06");
  });

  it("does not grow twice on the same day", async () => {
    setToday(2026, 6, 6);
    await markActiveDay();
    const { data, grew } = await markActiveDay();
    expect(grew).toBe(false);
    expect(data.currentStreak).toBe(1);
  });

  it("increments on consecutive days and tracks the longest", async () => {
    setToday(2026, 6, 6);
    await markActiveDay();
    setToday(2026, 6, 7);
    await markActiveDay();
    setToday(2026, 6, 8);
    const { data } = await markActiveDay();
    expect(data.currentStreak).toBe(3);
    expect(data.longestStreak).toBe(3);
  });

  it("restarts at 1 after missing a day, keeping the longest", async () => {
    setToday(2026, 6, 6);
    await markActiveDay();
    setToday(2026, 6, 7);
    await markActiveDay(); // current 2, longest 2
    setToday(2026, 6, 10); // skipped 8 and 9
    const { data } = await markActiveDay();
    expect(data.currentStreak).toBe(1);
    expect(data.longestStreak).toBe(2);
  });
});

describe("checkAndResetIfNeeded", () => {
  it("does nothing when there is no history", async () => {
    setToday(2026, 6, 6);
    const { wasReset } = await checkAndResetIfNeeded();
    expect(wasReset).toBe(false);
  });

  it("keeps the streak if last active was today or yesterday", async () => {
    setToday(2026, 6, 6);
    await markActiveDay(); // active "today"
    setToday(2026, 6, 7); // now 6/6 is "yesterday"
    const { data, wasReset } = await checkAndResetIfNeeded();
    expect(wasReset).toBe(false);
    expect(data.currentStreak).toBe(1);
  });

  it("resets currentStreak to 0 after a gap but preserves longest", async () => {
    setToday(2026, 6, 6);
    await markActiveDay();
    setToday(2026, 6, 7);
    await markActiveDay(); // current 2, longest 2
    setToday(2026, 6, 12); // big gap
    const { data, wasReset } = await checkAndResetIfNeeded();
    expect(wasReset).toBe(true);
    expect(data.currentStreak).toBe(0);
    expect(data.longestStreak).toBe(2);
  });
});

describe("resetStreak", () => {
  it("wipes everything back to defaults", async () => {
    setToday(2026, 6, 6);
    await markActiveDay();
    await resetStreak();
    expect(await getStreak()).toEqual({
      lastActiveDate: null,
      currentStreak: 0,
      longestStreak: 0,
    });
  });
});
