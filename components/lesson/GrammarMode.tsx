import {
  GrammarExample,
  GrammarPractice,
} from "@/constants/CourseData";
import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { T } from "@/lib/strings";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

export default function GrammarMode({
  rule,
  practice,
  onAnswer,
}: {
  rule: {
    title: string;
    explanation: string;
    examples: GrammarExample[];
  };
  practice: GrammarPractice[];
  onAnswer: (correct: boolean) => void;
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [showPractice, setShowPractice] = useState(false);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [allCorrect, setAllCorrect] = useState(true);

  const currentPractice = practice[currentPracticeIndex];

  const handleStartPractice = () => {
    setShowPractice(true);
  };

  const handleSelect = (id: number) => {
    if (answered) return;
    setSelectedId(id);
  };

  const handleCheck = () => {
    if (selectedId === null || answered) return;
    setAnswered(true);
    if (selectedId !== currentPractice.correctOptionId) {
      setAllCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentPracticeIndex < practice.length - 1) {
      setCurrentPracticeIndex((prev) => prev + 1);
      setSelectedId(null);
      setAnswered(false);
    } else {
      onAnswer(allCorrect);
    }
  };

  const getOptionStyle = (id: number) => {
    if (!answered) {
      return id === selectedId
        ? { borderColor: colors.primaryAccentColor, backgroundColor: colors.primaryAccentBg }
        : { borderColor: colors.borderColor, backgroundColor: colors.surfacePrimary };
    }
    if (id === currentPractice.correctOptionId) {
      return { borderColor: colors.successColor, backgroundColor: colors.successBg };
    }
    if (id === selectedId && id !== currentPractice.correctOptionId) {
      return { borderColor: colors.primaryAccentColor, backgroundColor: colors.primaryAccentBg };
    }
    return { borderColor: colors.borderColor, backgroundColor: colors.surfacePrimary, opacity: 0.5 };
  };

  if (!showPractice) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.ruleTitle}>{rule.title}</ThemedText>

          <View style={styles.explanationCard}>
            <ThemedText style={styles.explanationText}>{rule.explanation}</ThemedText>
          </View>

          {rule.examples.length > 0 && (
            <View style={styles.examplesSection}>
              <ThemedText style={styles.examplesLabel}>{T.practice.examples}</ThemedText>
              {rule.examples.map((example, idx) => (
                <View key={idx} style={styles.exampleCard}>
                  <ThemedText style={styles.exampleHanzi}>{example.hanzi}</ThemedText>
                  <ThemedText style={styles.examplePinyin}>{example.pinyin}</ThemedText>
                  <ThemedText style={styles.exampleEnglish}>{example.english}</ThemedText>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primaryAccentColor }]}
          onPress={handleStartPractice}
          activeOpacity={0.85}
        >
          <ThemedText style={styles.actionButtonText}>
            {T.practice.startPractice(practice.length)}
          </ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.practiceProgress}>
        <ThemedText style={styles.practiceProgressText}>
          {T.practice.questionProgress(currentPracticeIndex + 1, practice.length)}
        </ThemedText>
      </View>

      <ThemedText style={styles.practiceQuestion}>
        {currentPractice.question}
      </ThemedText>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentPractice.options.map((option) => (
          <Pressable
            key={option.id}
            style={[styles.practiceOption, getOptionStyle(option.id)]}
            onPress={() => handleSelect(option.id)}
            disabled={answered}
          >
            <ThemedText style={styles.practiceOptionText}>{option.text}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor:
              selectedId === null ? colors.surfaceTertiary : colors.primaryAccentColor,
          },
        ]}
        onPress={answered ? handleNext : handleCheck}
        disabled={selectedId === null}
        activeOpacity={0.85}
      >
        <ThemedText
          style={[
            styles.actionButtonText,
            { color: selectedId === null ? colors.subduedTextColor : colors.textInverse },
          ]}
        >
          {answered
            ? currentPracticeIndex < practice.length - 1
              ? T.common.next
              : T.common.continue
            : T.common.check}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    scrollView: { flex: 1 },
    ruleTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 24,
      color: c.textPrimary,
      letterSpacing: -0.4,
      textAlign: "center",
      marginVertical: 18,
    },
    explanationCard: {
      backgroundColor: c.surfaceSecondary,
      padding: 18,
      borderRadius: 14,
      marginBottom: 18,
    },
    explanationText: {
      fontFamily: FontFamily.regular,
      fontSize: 15,
      lineHeight: 22,
      color: c.textSecondary,
    },
    examplesSection: { marginBottom: 18 },
    examplesLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.subduedTextColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10,
    },
    exampleCard: {
      padding: 14,
      borderRadius: 12,
      backgroundColor: c.primaryAccentBg,
      marginBottom: 10,
    },
    exampleHanzi: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      color: c.primaryAccentColor,
      marginBottom: 4,
    },
    examplePinyin: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: c.textPrimary,
      marginBottom: 4,
    },
    exampleEnglish: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
    },
    practiceProgress: { alignItems: "center", paddingVertical: 12 },
    practiceProgressText: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.subduedTextColor,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    practiceQuestion: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      lineHeight: 26,
      color: c.textPrimary,
      textAlign: "center",
      marginBottom: 20,
    },
    practiceOption: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 1.5,
      marginBottom: 10,
    },
    practiceOptionText: {
      fontFamily: FontFamily.medium,
      fontSize: 15,
      color: c.textPrimary,
    },
    actionButton: {
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 16,
      marginBottom: 20,
    },
    actionButtonText: {
      fontFamily: FontFamily.semibold,
      fontSize: 16,
      color: c.textInverse,
    },
  });
}
