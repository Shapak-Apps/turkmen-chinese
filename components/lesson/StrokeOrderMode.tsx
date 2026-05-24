import { Colors, FontFamily } from "@/constants/theme";
import HANZI_DATA from "@/assets/data/hanzi_data.json";
import {
  HINT_VALUES,
  LENIENCY_VALUES,
  useSettings,
} from "@/lib/settings";
import {
  HanziWriter,
  useHanziWriter,
} from "@jamsch/react-native-hanzi-writer";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

interface CharacterJson {
  strokes: string[];
  medians: number[][][];
}

async function loadCharacterData(char: string): Promise<CharacterJson> {
  const data = (HANZI_DATA as Record<string, CharacterJson>)[char];
  if (!data) throw new Error(`No stroke data for ${char}`);
  return data;
}

interface WriterModalProps {
  char: string | null;
  leniency: number;
  showHintAfterMisses: number | false;
  alreadyDone: boolean;
  onComplete: (mistakes: number) => void;
  onClose: () => void;
}

function WriterModal({
  char,
  leniency,
  showHintAfterMisses,
  alreadyDone,
  onComplete,
  onClose,
}: WriterModalProps) {
  return (
    <Modal
      visible={char !== null}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Pressable onPress={onClose} hitSlop={20} style={styles.closeButton}>
            <Ionicons name="close" size={26} color={Colors.textPrimary} />
          </Pressable>
          <View style={{ flex: 1 }} />
        </View>

        {char && (
          <WriterBody
            key={char}
            char={char}
            leniency={leniency}
            showHintAfterMisses={showHintAfterMisses}
            alreadyDone={alreadyDone}
            onComplete={onComplete}
          />
        )}
      </View>
    </Modal>
  );
}

interface WriterBodyProps {
  char: string;
  leniency: number;
  showHintAfterMisses: number | false;
  alreadyDone: boolean;
  onComplete: (mistakes: number) => void;
}

function WriterBody({
  char,
  leniency,
  showHintAfterMisses,
  alreadyDone,
  onComplete,
}: WriterBodyProps) {
  const writer = useHanziWriter({
    character: char,
    loader: loadCharacterData,
  });

  const quizActive = writer.quiz.useStore((s) => s.active);
  const [mistakes, setMistakes] = useState(0);
  const [justCompleted, setJustCompleted] = useState(false);

  const startQuiz = () => {
    setMistakes(0);
    setJustCompleted(false);
    writer.quiz.start({
      leniency,
      quizStartStrokeNum: 0,
      showHintAfterMisses,
      onMistake: () => setMistakes((prev) => prev + 1),
      onComplete: ({ totalMistakes }) => {
        setJustCompleted(true);
        onComplete(totalMistakes);
      },
    });
  };

  const playSound = () => {
    Speech.speak(char, { language: "zh-CN" });
  };

  return (
    <View style={styles.writerBody}>
      <View style={styles.charHeader}>
        <ThemedText style={styles.charTitle}>{char}</ThemedText>
        <TouchableOpacity onPress={playSound} style={styles.speakerButton}>
          <Ionicons
            name="volume-high"
            size={24}
            color={Colors.primaryAccentColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.writerWrapper}>
        <HanziWriter
          writer={writer}
          style={styles.writer}
          loading={
            <View style={styles.loadingBox}>
              <ActivityIndicator
                size="large"
                color={Colors.primaryAccentColor}
              />
              <ThemedText style={styles.mutedText}>Ýüklenýär...</ThemedText>
            </View>
          }
          error={
            <View style={styles.loadingBox}>
              <Ionicons name="alert-circle-outline" size={36} color={Colors.borderColorStrong} />
              <ThemedText style={styles.mutedText}>
                Bu hiýeroglif üçin maglumat ýok
              </ThemedText>
            </View>
          }
        >
          <HanziWriter.GridLines color={Colors.borderColor} width={1} />
          <HanziWriter.Svg>
            <HanziWriter.Outline color={Colors.surfaceTertiary} />
            <HanziWriter.Character color={Colors.primaryAccentColor} />
            <HanziWriter.QuizStrokes />
            <HanziWriter.QuizMistakeHighlighter
              color={Colors.warningColor}
              strokeDuration={400}
            />
          </HanziWriter.Svg>
        </HanziWriter>
      </View>

      {quizActive ? (
        <ThemedText style={styles.mistakesText}>
          Ýalňyşlar: {mistakes}
        </ThemedText>
      ) : justCompleted ? (
        <View style={styles.doneBox}>
          <Ionicons name="checkmark-circle" size={26} color={Colors.successColor} />
          <ThemedText style={styles.doneText}>
            Ýazyldy! Ýalňyş: {mistakes}
          </ThemedText>
        </View>
      ) : (
        <TouchableOpacity style={styles.writeButton} onPress={startQuiz}>
          <Ionicons name="brush-outline" size={20} color={Colors.textInverse} />
          <ThemedText style={styles.writeButtonText}>
            {alreadyDone ? "Täzeden ýaz" : "Ýaz"}
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

interface Props {
  characters: string[];
  instruction?: string;
  onAnswer: (correct: boolean) => void;
}

export default function StrokeOrderMode({
  characters,
  instruction,
  onAnswer,
}: Props) {
  const { settings, loaded } = useSettings();
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const [doneChars, setDoneChars] = useState<Set<string>>(new Set());
  const [mistakesByChar, setMistakesByChar] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    setActiveChar(null);
    setDoneChars(new Set());
    setMistakesByChar({});
  }, [characters]);

  if (!loaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryAccentColor} />
      </View>
    );
  }

  const leniency = LENIENCY_VALUES[settings.strokeLeniency];
  const hintValue = HINT_VALUES[settings.hintThreshold];
  const showHintAfterMisses: number | false =
    hintValue === Infinity ? false : hintValue;

  const handleCharComplete = (mistakes: number) => {
    if (!activeChar) return;
    setMistakesByChar((prev) => ({ ...prev, [activeChar]: mistakes }));
    setDoneChars((prev) => {
      const next = new Set(prev);
      next.add(activeChar);
      return next;
    });
  };

  const handleContinue = () => {
    if (settings.strokeMode === "learn") {
      onAnswer(doneChars.size > 0);
    } else {
      const totalMistakes = Object.values(mistakesByChar).reduce(
        (a, b) => a + b,
        0,
      );
      const totalStrokes = characters.reduce((sum, c) => {
        const data = (HANZI_DATA as Record<string, CharacterJson>)[c];
        return sum + (data?.strokes.length || 0);
      }, 0);
      const limit = Math.max(3, totalStrokes * 2);
      const allWritten = doneChars.size === characters.length;
      onAnswer(allWritten && totalMistakes <= limit);
    }
  };

  const canContinue = doneChars.size > 0;
  const allDone = doneChars.size === characters.length;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {instruction && (
          <ThemedText style={styles.instruction}>{instruction}</ThemedText>
        )}

        <View style={styles.progressRow}>
          <ThemedText style={styles.progressText}>
            {doneChars.size} / {characters.length}
          </ThemedText>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(doneChars.size / characters.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.grid}>
          {characters.map((char) => {
            const isDone = doneChars.has(char);
            return (
              <Pressable
                key={char}
                style={[styles.card, isDone && styles.cardDone]}
                onPress={() => setActiveChar(char)}
              >
                <ThemedText
                  style={[styles.cardChar, isDone && styles.cardCharDone]}
                >
                  {char}
                </ThemedText>
                {isDone && (
                  <View style={styles.cardCheck}>
                    <Ionicons name="checkmark" size={14} color={Colors.textInverse} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canContinue && styles.continueButtonDisabled,
            allDone && styles.continueButtonHighlight,
          ]}
          onPress={handleContinue}
          disabled={!canContinue}
        >
          <ThemedText style={styles.continueButtonText}>
            {allDone ? "Hemmesi ýazyldy — dowam et" : "Dowam et"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <WriterModal
        char={activeChar}
        leniency={leniency}
        showHintAfterMisses={showHintAfterMisses}
        alreadyDone={activeChar ? doneChars.has(activeChar) : false}
        onComplete={handleCharComplete}
        onClose={() => setActiveChar(null)}
      />
    </View>
  );
}

const CARD_SIZE = 84;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 20 },
  instruction: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 20,
  },
  progressRow: { alignItems: "center", marginBottom: 20, gap: 8 },
  progressText: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: Colors.surfaceTertiary,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.successColor,
    borderRadius: 3,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "flex-start",
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 16,
    backgroundColor: Colors.surfacePrimary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
    }),
  },
  cardDone: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.successColor,
  },
  cardChar: {
    fontFamily: FontFamily.bold,
    fontSize: 38,
    color: Colors.primaryAccentColor,
  },
  cardCharDone: {
    color: Colors.successColorDark,
  },
  cardCheck: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.successColor,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.surfacePrimary,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.surfacePrimary,
  },
  continueButton: {
    backgroundColor: Colors.subduedTextColor,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  continueButtonDisabled: { backgroundColor: Colors.borderColorStrong },
  continueButtonHighlight: { backgroundColor: Colors.successColor },
  continueButtonText: {
    fontFamily: FontFamily.semibold,
    color: Colors.textInverse,
    fontSize: 16,
  },

  modalContainer: { flex: 1, backgroundColor: Colors.surfacePrimary },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  closeButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  writerBody: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  charHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  charTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 40,
    color: Colors.primaryAccentColor,
  },
  speakerButton: { padding: 8 },
  writerWrapper: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.surfaceSecondary,
  },
  writer: { width: 300, height: 300 },
  loadingBox: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  mutedText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    textAlign: "center",
  },
  mistakesText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginTop: 16,
  },
  writeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.primaryAccentColor,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginTop: 20,
  },
  writeButtonText: {
    fontFamily: FontFamily.semibold,
    color: Colors.textInverse,
    fontSize: 16,
  },
  doneBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.successBg,
    borderRadius: 14,
  },
  doneText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.successColorDark,
  },
});
