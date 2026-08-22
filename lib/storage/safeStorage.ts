import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";

export async function getValidated<T>(
  key: string,
  schema: z.ZodType<T>,
  fallback: T,
): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return fallback;

    const res = schema.safeParse(JSON.parse(raw));
    if (res.success) return res.data;

    console.warn(`safeStorage: invalid data in key "${key}", falling back`);
    return fallback;
  } catch (err) {
    console.warn(`safeStorage: failed to read key "${key}"`, err);
    return fallback;
  }
}

export async function setJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`safeStorage: failed to write key "${key}"`, err);
  }
}