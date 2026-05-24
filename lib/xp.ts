import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const XP_KEY = "total_xp";

export const XP_REWARDS = {
  CORRECT_ANSWER: 10,
  LESSON_COMPLETE: 500,
  PERFECT_LESSON_BONUS: 100,
};

export async function getTotalXP(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(XP_KEY);
    if (!raw) return 0;
    const n = Number(raw);
    return isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

export async function addXP(amount: number): Promise<number> {
  const current = await getTotalXP();
  const next = current + amount;
  try {
    await AsyncStorage.setItem(XP_KEY, String(next));
  } catch {}
  return next;
}

export async function resetXP(): Promise<void> {
  try {
    await AsyncStorage.removeItem(XP_KEY);
  } catch {}
}

export function useXP() {
  const [xp, setXP] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const value = await getTotalXP();
    setXP(value);
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { xp, loaded, refresh };
}
