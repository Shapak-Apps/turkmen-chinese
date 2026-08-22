import courseData from "@/assets/data/course_content.json";
import Ionicons from "@expo/vector-icons/Ionicons";

export interface CourseData {
  chapters: Chapter[];
  scenarios: ConversationScenario[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  isFree: boolean;
  description: string;
  goal: string;
  tasks: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  phrasebook?: PhrasebookEntry[];
}

interface PhrasebookEntry {
  hanzi: string;
  pinyin: string;
  english: string;
}

export interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
  review?: Lesson;
}

export interface Lesson {
  id: number; // в course_content.json все 30 id — числа
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  completionCount?: number; // в JSON этого поля нет вообще
  questions: Question[];
}

interface BaseQuestion {
  id: number;
}

interface MandarinPrompt {
  hanzi: string;
  pinyin: string;
}

export interface Word {
  hanzi: string;
  pinyin: string;
  english: string;
}

interface MandarinPhrase {
  hanzi: string;
  pinyin: string;
  words: Word[];
  breakdown: string;
}

export interface SpeakingOption {
  id: number;
  english: string;
  mandarin: MandarinPhrase;
}

export interface ListeningOption {
  id: number;
  english: string;
}

// --- Existing question types ---

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  mandarin: MandarinPrompt;
  options: SpeakingOption[];
  correctOptionId: number;
  instruction?: string;
}

interface SingleResponseQuestion extends BaseQuestion {
  type: "single_response";
  mandarin: MandarinPrompt;
  options: [SpeakingOption];
}

interface ListeningMultipleChoiceQuestion extends BaseQuestion {
  type: "listening_mc";
  mandarin: MandarinPrompt & {
    words: Word[];
    breakdown: string;
  };
  options: ListeningOption[];
  correctOptionId: number;
}

// --- New question types ---

export interface FlashcardOption {
  id: number;
  english: string;
  hanzi: string;
  pinyin: string;
}

interface FlashcardQuestion extends BaseQuestion {
  type: "flashcard";
  mandarin: MandarinPrompt;
  instruction: string;
  options: FlashcardOption[];
  correctOptionId: number;
}

interface FillBlankOption {
  id: number;
  hanzi: string;
  pinyin?: string;
}

interface FillBlankQuestion extends BaseQuestion {
  type: "fill_blank";
  sentence: string;
  sentencePinyin: string;
  blankedWord: string;
  correctAnswer: string;
  hint?: string;
  instruction: string;
  options?: FillBlankOption[];
}

export interface MatchPair {
  id: number;
  left: string;
  leftPinyin?: string;
  right: string;
}

interface MatchPairsQuestion extends BaseQuestion {
  type: "match_pairs";
  instruction: string;
  pairs: MatchPair[];
}

export interface GrammarExample {
  hanzi: string;
  pinyin: string;
  english: string;
}

export interface GrammarPracticeOption {
  id: number;
  text: string;
}

export interface GrammarPractice {
  question: string;
  options: GrammarPracticeOption[];
  correctOptionId: number;
}

interface GrammarQuestion extends BaseQuestion {
  type: "grammar";
  rule: {
    title: string;
    explanation: string;
    examples: GrammarExample[];
  };
  practice: GrammarPractice[];
}

interface StrokeOrderQuestion extends BaseQuestion {
  type: "stroke_order";
  characters: string[];
  instruction?: string;
}

export type Question =
  | MultipleChoiceQuestion
  | SingleResponseQuestion
  | ListeningMultipleChoiceQuestion
  | FlashcardQuestion
  | FillBlankQuestion
  | MatchPairsQuestion
  | GrammarQuestion
  | StrokeOrderQuestion;

// Bundled content is validated in CI by lib/__tests__/courseData.test.ts —
// parsing the 895 KB bundle on the JS thread at every cold start is not worth it.
export const COURSE_DATA = courseData as unknown as CourseData;
