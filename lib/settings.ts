import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const SETTINGS_KEY = "app_settings";

export type Leniency = "easy" | "medium" | "hard";
export type HintThreshold = "3" | "5" | "never";
export type StrokeMode = "learn" | "test";

export interface Settings {
  strokeLeniency: Leniency;
  hintThreshold: HintThreshold;
  strokeMode: StrokeMode;
  remindersEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  strokeLeniency: "medium",
  hintThreshold: "3",
  strokeMode: "learn",
  remindersEnabled: true,
};

export const LENIENCY_VALUES: Record<Leniency, number> = {
  easy: 1.5,
  medium: 1.0,
  hard: 0.5,
};

export const HINT_VALUES: Record<HintThreshold, number> = {
  "3": 3,
  "5": 5,
  never: Infinity,
};

export async function getSettings(): Promise<Settings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn("settings: failed to save", err);
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s);
      setLoaded(true);
    });
  }, []);

  const updateSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    await saveSettings(next);
  };

  return { settings, updateSetting, loaded };
}
