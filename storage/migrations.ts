import AsyncStorage from "@react-native-async-storage/async-storage";

export const SCHEMA_VERSION_KEY = "@app/schemaVersion";
export const CURRENT_SCHEMA_VERSION = 1;

// migrations[i] = переезд данных с версии i на i+1.
// Пока старые форматы валидируются zod'ом, 0→1 только фиксирует версию.
const migrations: Record<number, () => Promise<void>> = {
  0: async () => {},
};

export async function runMigrations(): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);
    let version = raw === null ? 0 : Number(raw);
    if (!Number.isFinite(version) || version < 0) version = 0;

    while (version < CURRENT_SCHEMA_VERSION) {
      await migrations[version]?.();
      version += 1;
    }
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, String(version));
  } catch (err) {
    console.error("[storage] миграции не удались", err);
  }
}