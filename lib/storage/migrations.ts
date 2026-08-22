import AsyncStorage from "@react-native-async-storage/async-storage";

export const SCHEMA_VERSION_KEY = "@app/schemaVersion";
export const CURRENT_SCHEMA_VERSION = 1;

// migrations[i] = переезд данных с версии i на i+1.
// Отсутствие записи — баг, а не no-op: логируем и останавливаемся,
// вместо того чтобы молча пометить данные как мигрированные.
const migrations: Record<number, () => Promise<void>> = {
  0: async () => {},
};

export async function runMigrations(): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);

    // Свежая установка: данных нет, мигрировать нечего —
    // один раз фиксируем текущую версию и выходим.
    if (raw === null) {
      await AsyncStorage.setItem(SCHEMA_VERSION_KEY, String(CURRENT_SCHEMA_VERSION));
      return;
    }

    let version = Number(raw);
    if (!Number.isFinite(version) || version < 0) version = 0;

    while (version < CURRENT_SCHEMA_VERSION) {
      const step = migrations[version];
      if (!step) {
        console.error(`migrations: ${version} -> ${version + 1} is not registered, stopping`);
        return;
      }
      await step();
      version += 1;
      // Версия пишется после КАЖДОГО успешного шага: если цепочка упадёт,
      // при следующем запуске повторится только последний непройденный шаг.
      await AsyncStorage.setItem(SCHEMA_VERSION_KEY, String(version));
    }
  } catch (err) {
    console.error("migrations: failed", err);
  }
}
