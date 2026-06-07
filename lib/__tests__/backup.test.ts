// Stub the native I/O modules so importing backup.ts works under jest.
jest.mock("expo-file-system/legacy", () => ({}));
jest.mock("expo-sharing", () => ({}));
jest.mock("expo-document-picker", () => ({}));

import { buildBackup, parseBackup, restoreEntries } from "@/lib/backup";

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
      version: 1,
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
      version: 1,
      exportedAt: "x",
      data: {
        total_xp: "10",
        bookmarked_chapters: "[1,2]",
        unknown_key: "ignored",
        app_settings: 42 as unknown as string, // non-string is skipped
      },
    };
    expect(restoreEntries(backup)).toEqual([
      ["total_xp", "10"],
      ["bookmarked_chapters", "[1,2]"],
    ]);
  });
});
