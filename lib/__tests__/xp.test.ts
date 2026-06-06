import AsyncStorage from "@react-native-async-storage/async-storage";
import { addXP, getTotalXP, resetXP, XP_REWARDS } from "@/lib/xp";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("xp", () => {
  it("returns 0 when nothing is stored", async () => {
    expect(await getTotalXP()).toBe(0);
  });

  it("accumulates added XP", async () => {
    expect(await addXP(10)).toBe(10);
    expect(await addXP(500)).toBe(510);
    expect(await getTotalXP()).toBe(510);
  });

  it("treats a corrupted (non-numeric) stored value as 0", async () => {
    await AsyncStorage.setItem("total_xp", "not-a-number");
    expect(await getTotalXP()).toBe(0);
  });

  it("resetXP clears the total", async () => {
    await addXP(100);
    await resetXP();
    expect(await getTotalXP()).toBe(0);
  });

  it("exposes the expected reward economy", () => {
    expect(XP_REWARDS).toEqual({
      CORRECT_ANSWER: 10,
      LESSON_COMPLETE: 500,
      PERFECT_LESSON_BONUS: 100,
    });
  });
});
