import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getStats,
  recordConversationTurn,
  recordQuestionAnswered,
  recordQuestionListened,
} from "@/lib/speakingListeningStats";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("speakingListeningStats", () => {
  it("starts at zero", async () => {
    const s = await getStats();
    expect(s).toMatchObject({
      minutesSpoken: 0,
      minutesListened: 0,
      questionsAnswered: 0,
      questionsListened: 0,
      conversationTurns: 0,
    });
  });

  it("counts answered/listened questions and derives minutes", async () => {
    await recordQuestionAnswered();
    await recordQuestionAnswered();
    await recordQuestionListened();
    const s = await getStats();
    expect(s.questionsAnswered).toBe(2);
    expect(s.questionsListened).toBe(1);
    expect(s.minutesSpoken).toBe(1); // 2 * 0.5
    expect(s.minutesListened).toBe(0.5); // 1 * 0.5
  });

  it("does not let conversation turns clobber question-derived minutes", async () => {
    // The old bug: answering after a conversation turn reset minutesSpoken.
    await recordQuestionAnswered(); // spoken 0.5
    await recordConversationTurn(); // +1 spoken, +1 listened
    await recordQuestionAnswered(); // spoken should now be 1.0 + 1 = 2.0, not reset to 1.0
    const s = await getStats();
    expect(s.questionsAnswered).toBe(2);
    expect(s.conversationTurns).toBe(1);
    expect(s.minutesSpoken).toBe(2); // 2*0.5 + 1*1
    expect(s.minutesListened).toBe(1); // 0*0.5 + 1*1
  });
});
