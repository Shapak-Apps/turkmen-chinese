import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STREAK_KEY = "streak_data";

export interface StreakData {
  lastActiveDate: string | null;
  currentStreak: number;
  longestStreak: number;
}

const DEFAULT: StreakData = {
  lastActiveDate: null,
  currentStreak: 0,
  longestStreak: 0,
};

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function read(): Promise<StreakData> {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw) as Partial<StreakData>;
    return {
      lastActiveDate: parsed.lastActiveDate ?? null,
      currentStreak: parsed.currentStreak ?? 0,
      longestStreak: parsed.longestStreak ?? 0,
    };
  } catch {
    return { ...DEFAULT };
  }
}

async function write(data: StreakData): Promise<void> {
  try {
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {}
}

export async function getStreak(): Promise<StreakData> {
  return read();
}

/**
 * Call on app start. Resets currentStreak to 0 if last active was more than 1 day ago.
 * Returns whether streak was reset.
 */
export async function checkAndResetIfNeeded(): Promise<{
  data: StreakData;
  wasReset: boolean;
}> {
  const data = await read();

  if (!data.lastActiveDate) return { data, wasReset: false };

  const today = todayKey();
  const yesterday = yesterdayKey();

  if (data.lastActiveDate === today || data.lastActiveDate === yesterday) {
    return { data, wasReset: false };
  }

  const reset: StreakData = {
    ...data,
    currentStreak: 0,
  };
  await write(reset);
  return { data: reset, wasReset: true };
}

/**
 * Call when user completes a correct action. Increments streak only on first activity of the day.
 * Returns updated data and whether the streak grew this call.
 */
export async function markActiveDay(): Promise<{
  data: StreakData;
  grew: boolean;
}> {
  const data = await read();
  const today = todayKey();
  const yesterday = yesterdayKey();

  if (data.lastActiveDate === today) {
    return { data, grew: false };
  }

  const continuing = data.lastActiveDate === yesterday;
  const newCurrent = continuing ? data.currentStreak + 1 : 1;

  const next: StreakData = {
    lastActiveDate: today,
    currentStreak: newCurrent,
    longestStreak: Math.max(data.longestStreak, newCurrent),
  };
  await write(next);
  return { data: next, grew: true };
}

export async function resetStreak(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STREAK_KEY);
  } catch {}
}

export function useStreak() {
  const [data, setData] = useState<StreakData>(DEFAULT);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const d = await read();
    setData(d);
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...data, loaded, refresh };
}
