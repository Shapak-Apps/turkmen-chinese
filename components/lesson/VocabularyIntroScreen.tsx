import { Word } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import ConfirmDialog from "../ui/ConfirmDialog";
import Flashcard from "./Flashcard";
import ProgressHeader from "./ProgressHeader";

interface StudyCard {
  key: string;
  word: Word;
  direction: "zh-en" | "en-zh";
}

interface DeckBuckets {
  recognition: StudyCard[];
  recall: StudyCard[];
  total: number;
}

type StudyPhase = "recognition" | "recall";

interface StudyState {
  phase: StudyPhase;
  queue: string[];
  recallKeys: string[];
  cards: Record<string, StudyCard>;
  total: number;
  completed: number;
}

const buildDeck = (words: Word[]): DeckBuckets => {
  const recognition: StudyCard[] = words.map((word) => ({
    key: `${word.hanzi}-recognition`,
    word,
    direction: "zh-en",
  }));

  const recall: StudyCard[] = words.map((word) => ({
    key: `${word.hanzi}-recall`,
    word,
    direction: "en-zh",
  }));

  return {
    recognition,
    recall,
    total: recognition.length + recall.length,
  };
};

const initializeStudyState = (deck: DeckBuckets): StudyState => {
  const cards: Record<string, StudyCard> = {};
  [...deck.recognition, ...deck.recall].forEach((entry) => {
    cards[entry.key] = entry;
  });

  return {
    phase: "recognition",
    queue: deck.recognition.map((entry) => entry.key),
    recallKeys: deck.recall.map((entry) => entry.key),
    cards,
    total: deck.total,
    completed: 0,
  };
};

export default function VocabularyIntroScreen({
  words,
  onStartLesson,
  onExit,
}: {
  words: Word[];
  onStartLesson: () => void;
  onExit?: () => void;
}) {
  const deck = useMemo(() => buildDeck(words), [words]);
  const [state, setState] = useState<StudyState>(() =>
    initializeStudyState(deck),
  );
  const [exitConfirmVisible, setExitConfirmVisible] = useState(false);

  useEffect(() => {
    if (
      state.queue.length === 0 &&
      state.recallKeys.length === 0 &&
      state.completed >= state.total
    ) {
      onStartLesson();
    }
  }, [
    state.queue.length,
    state.recallKeys.length,
    state.completed,
    state.total,
    onStartLesson,
  ]);

  const handleGrade = useCallback((grade: "again" | "good") => {
    setState((prev) => {
      if (!prev.queue.length) {
        return prev;
      }

      const [activeKey, ...restQueue] = prev.queue;
      const entry = prev.cards[activeKey];

      if (!entry) {
        return { ...prev, queue: restQueue };
      }

      let queue = [...restQueue];
      let completed = prev.completed;
      let phase: StudyPhase = prev.phase;
      let recallKeys = prev.recallKeys;

      if (grade === "again") {
        const insertIndex = Math.min(2, queue.length);
        queue.splice(insertIndex, 0, activeKey);
      } else {
        completed = Math.min(prev.total, prev.completed + 1);
      }

      if (
        queue.length === 0 &&
        phase === "recognition" &&
        recallKeys.length > 0
      ) {
        queue = [...recallKeys];
        recallKeys = [];
        phase = "recall";
      }

      return {
        ...prev,
        queue,
        completed,
        phase,
        recallKeys,
      };
    });
  }, []);

  if (deck.total === 0) {
    onStartLesson();
    return null;
  }

  const progressPercent =
    state.total === 0 ? 0 : (state.completed / state.total) * 100;

  const currentKey = state.queue[0];
  const currentCard = currentKey ? state.cards[currentKey] : undefined;
  const headerCount = currentCard
    ? Math.min(state.completed + 1, state.total)
    : state.completed;

  return (
    <View style={styles.container}>
      <ConfirmDialog
        visible={exitConfirmVisible}
        title="Gönükmeden çykmak"
        description="Hakykatdan hem çykmak isleýärsiňizmi? Öňegidişligiňiz ýatdan çykar."
        cancelLabel="Ýok"
        confirmLabel="Çyk"
        destructive
        onCancel={() => setExitConfirmVisible(false)}
        onConfirm={() => {
          setExitConfirmVisible(false);
          if (onExit) {
            onExit();
          } else if (router.canGoBack()) {
            router.back();
          } else {
            router.push("/lessons");
          }
        }}
      />
      <ProgressHeader
        progress={progressPercent}
        currentCount={headerCount}
        totalCount={state.total}
        onClose={() => setExitConfirmVisible(true)}
      />

      <View style={styles.content}>
        <View style={styles.instructionContainer}>
          <ThemedText style={styles.instructionTitle}>
            Sapagyň sözleri
          </ThemedText>
          <ThemedText style={styles.instructionText}>
            Öwürmek üçin basyň. Bilmeýänleriňizi gaýtalaň.
          </ThemedText>
        </View>

        {currentCard ? (
          <View style={styles.flashcardContainer}>
            <Flashcard
              key={currentCard.key}
              word={currentCard.word}
              direction={currentCard.direction}
            />
          </View>
        ) : null}

        <View style={styles.bottomActions}>
          <View style={styles.gradeButtons}>
            <Pressable
              onPress={() => handleGrade("again")}
              disabled={!currentCard}
              style={({ pressed }) => [
                styles.gradeButton,
                styles.againButton,
                !currentCard ? styles.disabledButton : null,
                pressed && !!currentCard ? styles.pressedButton : null,
              ]}
            >
              <ThemedText style={styles.gradeButtonText}>Gaýtala</ThemedText>
            </Pressable>
            <Pressable
              onPress={() => handleGrade("good")}
              disabled={!currentCard}
              style={({ pressed }) => [
                styles.gradeButton,
                styles.gotItButton,
                !currentCard ? styles.disabledButton : null,
                pressed && !!currentCard ? styles.pressedButton : null,
              ]}
            >
              <ThemedText style={styles.gradeButtonTextWhite}>
                Bilýärin
              </ThemedText>
            </Pressable>
          </View>

          <Pressable
            onPress={onStartLesson}
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.skipButtonPressed,
            ]}
          >
            <ThemedText style={styles.skipButtonText}>
              Gönükmelere geç
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 28 },
  instructionContainer: { marginBottom: 24, paddingHorizontal: 8 },
  instructionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 6,
    textAlign: "center",
  },
  instructionText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.subduedTextColor,
    textAlign: "center",
    lineHeight: 20,
  },
  flashcardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  bottomActions: { marginTop: "auto", paddingTop: 16, gap: 14 },
  gradeButtons: { flexDirection: "row", width: "100%", gap: 12 },
  gradeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  againButton: {
    backgroundColor: Colors.surfaceTertiary,
  },
  gotItButton: {
    backgroundColor: Colors.successColor,
  },
  disabledButton: { opacity: 0.4 },
  pressedButton: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  gradeButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  gradeButtonTextWhite: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textInverse,
  },
  skipButton: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  skipButtonPressed: { opacity: 0.6 },
  skipButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.subduedTextColor,
  },
});
