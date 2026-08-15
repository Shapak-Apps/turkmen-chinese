import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { getValidated } from "@/storage/safeStorage";
import { BookmarkedChaptersSchema } from "@/storage/schemas";

const BOOKMARKS_KEY = "bookmarked_chapters";

async function read(): Promise<number[]> {
  return getValidated(BOOKMARKS_KEY, BookmarkedChaptersSchema, []);
}

async function write(ids: number[]): Promise<void> {
  try {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {}
}

export async function getBookmarks(): Promise<number[]> {
  return read();
}

export async function isBookmarked(chapterId: number): Promise<boolean> {
  const list = await read();
  return list.includes(chapterId);
}

export async function toggleBookmark(chapterId: number): Promise<boolean> {
  const list = await read();
  const idx = list.indexOf(chapterId);
  if (idx >= 0) {
    list.splice(idx, 1);
    await write(list);
    return false;
  } else {
    list.push(chapterId);
    await write(list);
    return true;
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const list = await read();
    setBookmarks(new Set(list));
    setLoaded(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (chapterId: number) => {
      const nextState = await toggleBookmark(chapterId);
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (nextState) next.add(chapterId);
        else next.delete(chapterId);
        return next;
      });
      return nextState;
    },
    [],
  );

  return { bookmarks, loaded, refresh, toggle };
}
