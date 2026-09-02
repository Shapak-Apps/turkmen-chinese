import { getValidated, setJson } from "@/lib/storage/safeStorage";
import { SpeakingListeningStatsSchema } from "@/lib/storage/schemas";

const STATS_KEY = "speaking_listening_stats";

const MINUTES_PER_QUESTION = 0.5;
const MINUTES_PER_CONVERSATION_TURN = 1;

export interface SpeakingListeningStats {
  lastUpdate: string;
  questionsAnswered: number;
  questionsListened: number;
  conversationTurns: number;
}

const getDefaultStats = (): SpeakingListeningStats => ({
  lastUpdate: new Date().toISOString(),
  questionsAnswered: 0,
  questionsListened: 0,
  conversationTurns: 0,
});

const readStats = async (): Promise<SpeakingListeningStats> =>
  getValidated(STATS_KEY, SpeakingListeningStatsSchema, getDefaultStats());

const writeStats = async (stats: SpeakingListeningStats) => {
  await setJson(STATS_KEY, stats);
};

export const recordQuestionAnswered = async () => {
  const stats = await readStats();
  stats.questionsAnswered += 1;
  stats.lastUpdate = new Date().toISOString();
  await writeStats(stats);
};

export const recordQuestionListened = async () => {
  const stats = await readStats();
  stats.questionsListened += 1;
  stats.lastUpdate = new Date().toISOString();
  await writeStats(stats);
};

export const recordConversationTurn = async () => {
  const stats = await readStats();
  stats.conversationTurns += 1;
  stats.lastUpdate = new Date().toISOString();
  await writeStats(stats);
};

/**
 * All-time totals, with minutes DERIVED from the canonical counters so the
 * fields can never be clobbered by mixing assignment and increment.
 */
export const getStats = async () => {
  const stats = await readStats();
  const minutesSpoken =
    stats.questionsAnswered * MINUTES_PER_QUESTION +
    stats.conversationTurns * MINUTES_PER_CONVERSATION_TURN;
  const minutesListened =
    stats.questionsListened * MINUTES_PER_QUESTION +
    stats.conversationTurns * MINUTES_PER_CONVERSATION_TURN;
  return {
    minutesSpoken: Math.round(minutesSpoken * 10) / 10,
    minutesListened: Math.round(minutesListened * 10) / 10,
    questionsAnswered: stats.questionsAnswered,
    questionsListened: stats.questionsListened,
    conversationTurns: stats.conversationTurns,
  };
};
