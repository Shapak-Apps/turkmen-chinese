import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const USER_NAME_KEY = "user_name";

export async function getUserName(): Promise<string | null> {
  try {
    const v = await AsyncStorage.getItem(USER_NAME_KEY);
    if (!v) return null;
    const trimmed = v.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

export async function setUserName(name: string): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_NAME_KEY, name.trim());
  } catch {}
}

export async function clearUserName(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_NAME_KEY);
  } catch {}
}

export function useUserName() {
  const [name, setName] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const v = await getUserName();
    setName(v);
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(async (newName: string) => {
    await setUserName(newName);
    setName(newName.trim());
  }, []);

  return { name, loaded, save, refresh };
}
