import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const ONBOARDED_KEY = "has_onboarded";

export async function hasOnboarded(): Promise<boolean> {
  try {
    const v = await AsyncStorage.getItem(ONBOARDED_KEY);
    return v === "true";
  } catch {
    return false;
  }
}

export async function markOnboarded(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDED_KEY, "true");
  } catch {}
}

export async function resetOnboarding(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ONBOARDED_KEY);
  } catch {}
}

export function useOnboardingState() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  const refresh = useCallback(async () => {
    const v = await hasOnboarded();
    setOnboarded(v);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { onboarded, refresh };
}
