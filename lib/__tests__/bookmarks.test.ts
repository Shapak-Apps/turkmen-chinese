import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBookmarks, isBookmarked, toggleBookmark } from "@/lib/bookmarks";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("bookmarks", () => {
  it("is empty by default", async () => {
    expect(await getBookmarks()).toEqual([]);
  });

  it("toggles a chapter on and off", async () => {
    expect(await toggleBookmark(3)).toBe(true);
    expect(await isBookmarked(3)).toBe(true);
    expect(await getBookmarks()).toEqual([3]);

    expect(await toggleBookmark(3)).toBe(false);
    expect(await isBookmarked(3)).toBe(false);
    expect(await getBookmarks()).toEqual([]);
  });

  it("keeps multiple bookmarks independent", async () => {
    await toggleBookmark(1);
    await toggleBookmark(5);
    await toggleBookmark(1); // remove 1
    expect(await getBookmarks()).toEqual([5]);
  });

  it("ignores corrupted (non-array) storage", async () => {
    await AsyncStorage.setItem("bookmarked_chapters", JSON.stringify({ not: "array" }));
    expect(await getBookmarks()).toEqual([]);
  });

  it("filters out non-numeric entries", async () => {
    await AsyncStorage.setItem("bookmarked_chapters", JSON.stringify([1, "2", 3, null]));
    expect(await getBookmarks()).toEqual([1, 3]);
  });
});
