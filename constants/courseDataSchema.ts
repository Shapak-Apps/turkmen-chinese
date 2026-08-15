import Ionicons from "@expo/vector-icons/Ionicons";
import { z } from "zod";

const IconSchema = z.custom<keyof typeof Ionicons.glyphMap>(
  (val) => typeof val === "string" && val in Ionicons.glyphMap
);

const WordSchema = z.object({
  hanzi: z.string(),
  pinyin: z.string(),
  english: z.string(),
});

const MandarinPromptSchema = z.object({
  hanzi: z.string(),
  pinyin: z.string(),
});

const MandarinPhraseSchema = MandarinPromptSchema.extend({
  words: z.array(WordSchema),
  breakdown: z.string(),
});

const SpeakingOptionSchema = z.object({
  id: z.number(),
  english: z.string(),
  mandarin: MandarinPhraseSchema,
});

const ListeningOptionSchema = z.object({ id: z.number(), english: z.string() });

const FlashcardOptionSchema = z.object({
  id: z.number(),
  english: z.string(),
  hanzi: z.string(),
  pinyin: z.string(),
});

const FillBlankOptionSchema = z.object({
  id: z.number(),
  hanzi: z.string(),
  pinyin: z.string().optional(),
});

const MatchPairSchema = z.object({
  id: z.number(),
  left: z.string(),
  leftPinyin: z.string().optional(),
  right: z.string(),
});

const GrammarPracticeSchema = z.object({
  question: z.string(),
  options: z.array(z.object({ id: z.number(), text: z.string() })),
  correctOptionId: z.number(),
});

const QuestionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("multiple_choice"),
    id: z.number(),
    mandarin: MandarinPromptSchema,
    options: z.array(SpeakingOptionSchema),
    correctOptionId: z.number(),
    instruction: z.string().optional(),
  }),
  z.object({
    type: z.literal("single_response"),
    id: z.number(),
    mandarin: MandarinPromptSchema,
    options: z.tuple([SpeakingOptionSchema]),
  }),
  z.object({
    type: z.literal("listening_mc"),
    id: z.number(),
    mandarin: MandarinPhraseSchema,
    options: z.array(ListeningOptionSchema),
    correctOptionId: z.number(),
  }),
  z.object({
    type: z.literal("flashcard"),
    id: z.number(),
    mandarin: MandarinPromptSchema,
    instruction: z.string(),
    options: z.array(FlashcardOptionSchema),
    correctOptionId: z.number(),
  }),
  z.object({
    type: z.literal("fill_blank"),
    id: z.number(),
    sentence: z.string(),
    sentencePinyin: z.string(),
    blankedWord: z.string(),
    correctAnswer: z.string(),
    hint: z.string().optional(),
    instruction: z.string(),
    options: z.array(FillBlankOptionSchema).optional(),
  }),
  z.object({
    type: z.literal("match_pairs"),
    id: z.number(),
    instruction: z.string(),
    pairs: z.array(MatchPairSchema),
  }),
  z.object({
    type: z.literal("grammar"),
    id: z.number(),
    rule: z.object({
      title: z.string(),
      explanation: z.string(),
      examples: z.array(WordSchema), // hanzi/pinyin/english
    }),
    practice: z.array(GrammarPracticeSchema),
  }),
  z.object({
    type: z.literal("stroke_order"),
    id: z.number(),
    characters: z.array(z.string()),
    instruction: z.string().optional(),
  }),
]);

const LessonSchema = z.object({
  id: z.union([z.string(), z.number()]).transform((v) => String(v)),
  title: z.string(),
  icon: IconSchema,
  completionCount: z.number().default(0),
  questions: z.array(QuestionSchema),
});

const ChapterSchema = z.object({
  id: z.number(),
  title: z.string(),
  lessons: z.array(LessonSchema),
  review: LessonSchema.optional(),
});

const ConversationScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: IconSchema,
  isFree: z.boolean(),
  description: z.string(),
  goal: z.string(),
  tasks: z.array(z.string()),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  phrasebook: z.array(WordSchema).optional(),
});

export const CourseDataSchema = z.object({
  chapters: z.array(ChapterSchema),
  scenarios: z.array(ConversationScenarioSchema),
});