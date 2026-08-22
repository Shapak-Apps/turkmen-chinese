import { z } from "zod";

// streak_data
export const StreakDataSchema = z.object({
  lastActiveDate: z.string().nullable().default(null),
  currentStreak: z.number().default(0),
  longestStreak: z.number().default(0),
});

// bookmarked_chapters — нечисловые записи отфильтровываются, список выживает
export const BookmarkedChaptersSchema = z
  .array(z.unknown())
  .transform((val) =>
    val.filter((v): v is number => typeof v === "number"),
  );

// lesson_progress — одна битая запись роняет только себя, а не весь ключ
export const LessonProgressSchema = z
  .record(z.string(), z.unknown())
  .transform((val) => {
    const out: Record<string, number> = {};
    for (const [key, entry] of Object.entries(val)) {
      if (typeof entry === "number") out[key] = entry;
    }
    return out;
  });

// speaking_listening_stats
export const SpeakingListeningStatsSchema = z.object({
  lastUpdate: z.string().default(() => new Date().toISOString()),
  questionsAnswered: z.number().default(0),
  questionsListened: z.number().default(0),
  conversationTurns: z.number().default(0),
});

// app_settings — одно невалидное поле фолбэчится само, остальные три выживают
export const SettingsSchema = z.object({
  strokeLeniency: z.enum(["easy", "medium", "hard"]).catch("medium"),
  hintThreshold: z.enum(["3", "5", "never"]).catch("3"),
  strokeMode: z.enum(["learn", "test"]).catch("learn"),
  remindersEnabled: z.boolean().catch(true),
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

// одна битая запись главы роняет только себя — иначе из-за одного
// повреждённого экзамена hasPassedExam снова залочит пользователю главы
export const ExamResultsSchema = z
  .record(z.string(), z.unknown())
  .transform((val) => {
    const out: Record<string, z.infer<typeof ExamResultSchema>> = {};
    for (const [key, entry] of Object.entries(val)) {
      const res = ExamResultSchema.safeParse(entry);
      if (res.success) out[key] = res.data;
    }
    return out;
  });

// step_progress — выживают только записи-массивы строк
export const StepProgressSchema = z
  .record(z.string(), z.unknown())
  .transform((val) => {
    const out: Record<string, string[]> = {};
    for (const [key, entry] of Object.entries(val)) {
      if (Array.isArray(entry) && entry.every((x) => typeof x === "string")) {
        out[key] = entry as string[];
      }
    }
    return out;
  });