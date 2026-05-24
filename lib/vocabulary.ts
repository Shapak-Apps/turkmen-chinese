import { Question, Word } from "@/constants/CourseData";
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

export const getUniqueWordsFromQuestions = (questions: Question[]): Word[] => {
  const allWords = new Map<string, Word>();
  questions.forEach((question) => {
    let wordSource: Word[] = [];

    if (question.type === "listening_mc") {
      wordSource = question.mandarin.words || [];
    } else if (
      question.type === "multiple_choice" ||
      question.type === "single_response"
    ) {
      wordSource = question.options.flatMap(
        (opt: { mandarin: { words: Word[] } }) => opt.mandarin.words || [],
      );
    }

    wordSource.forEach((word: Word) => {
      if (word && word.hanzi && !allWords.has(word.hanzi)) {
        allWords.set(word.hanzi, word);
      }
    });
  });

  return Array.from(allWords.values());
};
