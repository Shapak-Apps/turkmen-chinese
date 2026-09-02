import { useEffect, useState } from "react";
import { getValidated, setJson } from "@/lib/storage/safeStorage";
import { SettingsSchema } from "@/lib/storage/schemas";

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
  return getValidated(SETTINGS_KEY, SettingsSchema, DEFAULT_SETTINGS);
}

export async function saveSettings(settings: Settings): Promise<void> {
  await setJson(SETTINGS_KEY, settings);
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
