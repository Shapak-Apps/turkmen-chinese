import { Colors, FontFamily } from "@/constants/theme";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { haptics } from "@/lib/haptics";
import { T } from "@/lib/strings";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../themed-text";

interface BlankOption {
  id: number;
  hanzi: string;
  pinyin?: string;
}

export default function FillBlankMode({
  sentence,
  sentencePinyin,
  blankedWord,
  correctAnswer,
  hint,
  instruction,
  options,
  onAnswer,
}: {
  sentence: string;
  sentencePinyin: string;
  blankedWord: string;
  correctAnswer: string;
  hint?: string;
  instruction: string;
  options?: BlankOption[];
  onAnswer: (correct: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const reduceMotion = useReduceMotion();
  const wiggle = useSharedValue(0);

  const wiggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: wiggle.value }],
  }));

  useEffect(() => {
    if (answered && !isCorrect) {
      if (reduceMotion) return;
      wiggle.value = withSequence(
        withTiming(-10, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    }
  }, [answered, isCorrect, reduceMotion, wiggle]);

  const displaySentence = sentence.replace(blankedWord, "______");
  const displayPinyin = sentencePinyin;

  const handleOptionPress = (opt: BlankOption) => {
    if (answered) return;
    haptics.tap();
    setSelectedId(opt.id);
    const correct = opt.hanzi === correctAnswer;
    setIsCorrect(correct);
    setAnswered(true);
  };

  const handleContinue = () => {
    onAnswer(isCorrect);
  };

  const playAudio = () => {
    Speech.speak(sentence, { language: "zh-CN" });
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.instruction}>{instruction}</ThemedText>

      <Animated.View style={wiggleStyle}>
        <TouchableOpacity onPress={playAudio} style={styles.sentenceCard} activeOpacity={0.85}>
          <ThemedText style={styles.sentenceText}>{displaySentence}</ThemedText>
          <ThemedText style={styles.pinyinText}>{displayPinyin}</ThemedText>
        </TouchableOpacity>
      </Animated.View>

      {hint && (
        <View style={styles.hintContainer}>
          <ThemedText style={styles.hintText}>{T.practice.hintLabel}: {hint}</ThemedText>
        </View>
      )}

      {options && options.length > 0 && (
        <View style={styles.optionsGrid}>
          {options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const isThisCorrect = opt.hanzi === correctAnswer;

            let bgColor = Colors.surfacePrimary;
            let borderColor = Colors.borderColor;

            if (answered) {
              if (isThisCorrect) {
                bgColor = Colors.successBg;
                borderColor = Colors.successColor;
              } else if (isSelected && !isThisCorrect) {
                bgColor = Colors.primaryAccentBg;
                borderColor = Colors.primaryAccentColor;
              }
            } else if (isSelected) {
              borderColor = Colors.primaryAccentColor;
              bgColor = Colors.primaryAccentBg;
            }

            return (
              <Pressable
                key={opt.id}
                style={[styles.optionButton, { backgroundColor: bgColor, borderColor }]}
                onPress={() => handleOptionPress(opt)}
                disabled={answered}
              >
                <ThemedText style={styles.optionHanzi}>{opt.hanzi}</ThemedText>
                {opt.pinyin && (
                  <ThemedText style={styles.optionPinyin}>{opt.pinyin}</ThemedText>
                )}
              </Pressable>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: answered
              ? Colors.primaryAccentColor
              : Colors.surfaceTertiary,
          },
        ]}
        onPress={handleContinue}
        disabled={!answered}
        activeOpacity={0.85}
      >
        <ThemedText
          style={[
            styles.actionButtonText,
            { color: answered ? Colors.textInverse : Colors.subduedTextColor },
          ]}
        >
          {T.common.continue}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  instruction: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 18,
    marginTop: 12,
  },
  sentenceCard: {
    backgroundColor: Colors.primaryAccentBg,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  sentenceText: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 30,
    color: Colors.primaryAccentColor,
    textAlign: "center",
    marginBottom: 6,
  },
  pinyinText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  hintContainer: {
    backgroundColor: Colors.warningBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  hintText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.warningTextColor,
    textAlign: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionButton: {
    width: "48%",
    padding: 18,
    borderWidth: 1.5,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  optionHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    color: Colors.primaryAccentColor,
    marginBottom: 4,
  },
  optionPinyin: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  actionButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
  },
});
