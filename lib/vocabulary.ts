import { Word } from "@/constants/CourseData";
import { THEORY_DATA } from "@/assets/data/theory_content";

export const getChapterVocabulary = (chapterId: number): Word[] => {
  const chapter = THEORY_DATA[chapterId];
  if (!chapter) return [];
  return chapter.vocabulary.map((w) => ({
    hanzi: w.hanzi,
    pinyin: w.pinyin,
    english: w.translation,
  }));
};

export const getChapterUniqueHanzi = (chapterId: number): string[] => {
  const chapter = THEORY_DATA[chapterId];
  if (!chapter) return [];
  const joined = chapter.vocabulary.map((w) => w.hanzi).join("");
  return [...new Set([...joined].filter((c) => /[一-鿿]/.test(c)))];
};
