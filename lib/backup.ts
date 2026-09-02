import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { runMigrations, SCHEMA_VERSION_KEY } from "@/lib/storage/migrations";

const APP_ID = "turkmen-chinese";
// v2 carries the storage schema version, so a restored file can be migrated.
const BACKUP_VERSION = 2;

// The schema version a v1 file was written at: versioning shipped together
// with format v2, so anything older can only have come from schema 1.
const LEGACY_SCHEMA_VERSION = "1";

// Every AsyncStorage key that holds user progress/state worth backing up.
const BACKUP_KEYS = [
  "total_xp",
  "streak_data",
  "bookmarked_chapters",
  "lesson_progress",
  "exam_results",
  "step_progress",
  "speaking_listening_stats",
  "user_name",
  "app_settings",
  "has_onboarded",
  SCHEMA_VERSION_KEY,
];

export interface BackupFile {
  app: string;
  version: number;
  exportedAt: string;
  data: Record<string, string>;
}

export type BackupResult =
  | { ok: true }
  | { ok: false; reason: "cancelled" | "invalid" | "error" };

// ── Pure helpers (unit-tested) ──────────────────────────────

export function buildBackup(
  entries: readonly (readonly [string, string | null])[],
  exportedAt: string,
): BackupFile {
  const data: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (value !== null) data[key] = value;
  }
  return { app: APP_ID, version: BACKUP_VERSION, exportedAt, data };
}

export function parseBackup(json: string): BackupFile | null {
  try {
    const parsed = JSON.parse(json) as Partial<BackupFile>;
    if (
      parsed.app !== APP_ID ||
      typeof parsed.data !== "object" ||
      parsed.data === null
    ) {
      return null;
    }
    return parsed as BackupFile;
  } catch {
    return null;
  }
}

/** Only known keys with string values are restored — ignores anything else. */
export function restoreEntries(backup: BackupFile): [string, string][] {
  const entries = BACKUP_KEYS.filter(
    (k) => typeof backup.data[k] === "string",
  ).map((k) => [k, backup.data[k]] as [string, string]);

  // A file without a schema version predates versioning. Without this the
  // device keeps its own, newer version, runMigrations sees nothing to do and
  // the restored data stays in the old shape — which validation then discards.
  if (typeof backup.data[SCHEMA_VERSION_KEY] !== "string") {
    entries.push([SCHEMA_VERSION_KEY, LEGACY_SCHEMA_VERSION]);
  }
  return entries;
}

// ── I/O ─────────────────────────────────────────────────────

export async function exportProgress(exportedAt: string): Promise<BackupResult> {
  try {
    const entries = await AsyncStorage.multiGet(BACKUP_KEYS);
    const backup = buildBackup(entries, exportedAt);
    const fileUri = `${FileSystem.cacheDirectory}turkmen-chinese-backup.json`;
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(backup, null, 2));
    if (!(await Sharing.isAvailableAsync())) return { ok: false, reason: "error" };
    await Sharing.shareAsync(fileUri, {
      mimeType: "application/json",
      dialogTitle: "Maglumatlary ýatda sakla",
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: "error" };
  }
}

export async function importProgress(): Promise<BackupResult> {
  try {
    const picked = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });
    if (picked.canceled) return { ok: false, reason: "cancelled" };
    const uri = picked.assets?.[0]?.uri;
    if (!uri) return { ok: false, reason: "error" };
    const json = await FileSystem.readAsStringAsync(uri);
    const backup = parseBackup(json);
    if (!backup) return { ok: false, reason: "invalid" };
    const entries = restoreEntries(backup);
    if (entries.length > 0) await AsyncStorage.multiSet(entries);
    // The restored data carries the version it was written at, so migrate it
    // now instead of waiting for the next cold start.
    await runMigrations();
    return { ok: true };
  } catch {
    return { ok: false, reason: "error" };
  }
}
