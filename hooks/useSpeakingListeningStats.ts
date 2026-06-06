import { getStats } from "@/lib/speakingListeningStats";
import { useEffect, useState } from "react";

interface Stats {
  minutesSpoken: number;
  minutesListened: number;
  questionsAnswered: number;
  questionsListened: number;
  conversationTurns: number;
}

export const useSpeakingListeningStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setStats(await getStats());
    } catch (err) {
      console.error("Failed to load speaking/listening stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { stats, loading, refresh };
};
