import { ImageSourcePropType } from "react-native";

export type CharacterId =
  | "aman"
  | "guli"
  | "zhang-wei"
  | "li-teacher"
  | "wang-teacher"
  | "generic";

export interface Character {
  id: CharacterId;
  source: ImageSourcePropType;
  hanzi: string;
  pinyin: string;
  displayName: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  aman: {
    id: "aman",
    source: require("../assets/characters/aman.png"),
    hanzi: "阿曼",
    pinyin: "Āmàn",
    displayName: "Aman",
  },
  guli: {
    id: "guli",
    source: require("../assets/characters/guli.png"),
    hanzi: "古丽",
    pinyin: "Gǔlì",
    displayName: "Gulnara",
  },
  "zhang-wei": {
    id: "zhang-wei",
    source: require("../assets/characters/zhang-wei.png"),
    hanzi: "张伟",
    pinyin: "Zhāng Wěi",
    displayName: "Zhang Wei",
  },
  "li-teacher": {
    id: "li-teacher",
    source: require("../assets/characters/li-teacher.png"),
    hanzi: "李老师",
    pinyin: "Lǐ lǎoshī",
    displayName: "Li mugallym",
  },
  "wang-teacher": {
    id: "wang-teacher",
    source: require("../assets/characters/wang-teacher.png"),
    hanzi: "王老师",
    pinyin: "Wáng lǎoshī",
    displayName: "Wang mugallym",
  },
  generic: {
    id: "generic",
    source: require("../assets/characters/generic.png"),
    hanzi: "",
    pinyin: "",
    displayName: "",
  },
};

/**
 * Per-chapter speaker mapping (A → first character, B → second character).
 * Based on chapter intros from theory_content.ts.
 * Aman is the protagonist (turkmen student) in most chapters.
 */
export const CHAPTER_SPEAKERS: Record<number, [CharacterId, CharacterId]> = {
  1: ["aman", "li-teacher"],
  2: ["aman", "zhang-wei"],
  3: ["aman", "zhang-wei"],
  4: ["aman", "guli"],
  5: ["aman", "guli"],
  6: ["aman", "zhang-wei"],
  7: ["aman", "zhang-wei"],
  8: ["aman", "guli"],
  9: ["aman", "generic"],
  10: ["aman", "zhang-wei"],
  11: ["aman", "guli"],
  12: ["aman", "zhang-wei"],
  13: ["aman", "zhang-wei"],
  14: ["aman", "guli"],
  15: ["aman", "zhang-wei"],
  16: ["aman", "zhang-wei"],
  17: ["aman", "wang-teacher"],
  18: ["aman", "wang-teacher"],
  19: ["aman", "guli"],
  20: ["aman", "zhang-wei"],
  21: ["aman", "zhang-wei"],
  22: ["aman", "generic"],
  23: ["aman", "li-teacher"],
  24: ["aman", "zhang-wei"],
  25: ["aman", "guli"],
  26: ["aman", "guli"],
  27: ["aman", "guli"],
  28: ["aman", "zhang-wei"],
  29: ["aman", "guli"],
  30: ["aman", "zhang-wei"],
};

export function getChapterSpeakers(chapterId: number): [Character, Character] {
  const ids = CHAPTER_SPEAKERS[chapterId] ?? ["aman", "generic"];
  return [CHARACTERS[ids[0]], CHARACTERS[ids[1]]];
}
