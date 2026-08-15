import { z } from "zod";

// streak_data
export const StreakDataSchema = z.object({
  lastActiveDate: z.string().nullable().default(null),
  currentStreak: z.number().default(0),
  longestStreak: z.number().default(0),
});

// bookmarked_chapters
export const BookmarkedChaptersSchema = z.array(z.number());

// lesson_progress
export const LessonProgressSchema = z.record(z.string(), z.number());

// speaking_listening_stats
export const SpeakingListeningStatsSchema = z.object({
  lastUpdate: z.string().default(() => new Date().toISOString()),
  questionsAnswered: z.number().default(0),
  questionsListened: z.number().default(0),
  conversationTurns: z.number().default(0),
});

// app_settings
export const SettingsSchema = z.object({
  strokeLeniency: z.enum(["easy", "medium", "hard"]).default("medium"),
  hintThreshold: z.enum(["3", "5", "never"]).default("3"),
  strokeMode: z.enum(["learn", "test"]).default("learn"),
  remindersEnabled: z.boolean().default(true),
});

// exam_results
export const ExamResultSchema = z.object({
  accuracy: z.number(),
  correct: z.number(),
  total: z.number(),
  passed: z.boolean(),
  attempts: z.number(),
  bestAccuracy: z.number(),
  updatedAt: z.string(),
});
export const ExamResultsSchema = z.record(z.string(), ExamResultSchema);

// step_progress
export const StepProgressSchema = z.record(z.string(), z.array(z.string()));