// Stub the native I/O modules so importing backup.ts works under jest.
jest.mock("expo-file-system/legacy", () => ({}));
jest.mock("expo-sharing", () => ({}));
jest.mock("expo-document-picker", () => ({}));

import { buildBackup, parseBackup, restoreEntries } from "@/lib/backup";
import { SCHEMA_VERSION_KEY } from "@/lib/storage/migrations";

describe("buildBackup", () => {
  it("packs non-null entries into a versioned backup", () => {
    const backup = buildBackup(
      [
        ["total_xp", "510"],
        ["streak_data", '{"currentStreak":3}'],
        ["missing", null],
      ],
      "2026-06-07T09:00:00.000Z",
    );
    expect(backup).toEqual({
      app: "turkmen-chinese",
      version: 2,
      exportedAt: "2026-06-07T09:00:00.000Z",
      data: { total_xp: "510", streak_data: '{"currentStreak":3}' },
    });
  });
});

describe("parseBackup", () => {
  it("accepts a valid backup", () => {
    const json = JSON.stringify({
      app: "turkmen-chinese",
      version: 1,
      exportedAt: "x",
      data: { total_xp: "10" },
    });
    expect(parseBackup(json)?.data.total_xp).toBe("10");
  });

  it("rejects foreign or malformed files", () => {
    expect(parseBackup("not json")).toBeNull();
    expect(parseBackup(JSON.stringify({ app: "other", data: {} }))).toBeNull();
    expect(parseBackup(JSON.stringify({ app: "turkmen-chinese" }))).toBeNull();
  });
});

describe("restoreEntries", () => {
  it("returns only known string-valued keys", () => {
    const backup = {
      app: "turkmen-chinese",
      version: 2,
      exportedAt: "x",
      data: {
        total_xp: "10",
        bookmarked_chapters: "[1,2]",
        unknown_key: "ignored",
        app_settings: 42 as unknown as string, // non-string is skipped
        [SCHEMA_VERSION_KEY]: "1",
      },
    };
    expect(restoreEntries(backup)).toEqual([
      ["total_xp", "10"],
      ["bookmarked_chapters", "[1,2]"],
      [SCHEMA_VERSION_KEY, "1"],
    ]);
  });

  // Exam results gate the next chapter and theory steps drive the step feed —
  // dropping them on restore silently re-locks chapters the user has passed.
  it("restores exam results and step progress", () => {
    const backup = {
      app: "turkmen-chinese",
      version: 2,
      exportedAt: "x",
      data: {
        exam_results: '{"1":{"passed":true}}',
        step_progress: '{"1":["intro"]}',
        [SCHEMA_VERSION_KEY]: "1",
      },
    };
    expect(restoreEntries(backup)).toEqual([
      ["exam_results", '{"1":{"passed":true}}'],
      ["step_progress", '{"1":["intro"]}'],
      [SCHEMA_VERSION_KEY, "1"],
    ]);
  });

  it("stamps schema 1 on a file written before versioning", () => {
    const backup = {
      app: "turkmen-chinese",
      version: 1,
      exportedAt: "x",
      data: { total_xp: "10" },
    };
    expect(restoreEntries(backup)).toEqual([
      ["total_xp", "10"],
      [SCHEMA_VERSION_KEY, "1"],
    ]);
  });
});
