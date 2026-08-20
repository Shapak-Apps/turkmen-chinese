import { FlashcardOption } from "@/constants/CourseData";
import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { haptics } from "@/lib/haptics";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
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

export default function FlashcardMode({
  hanzi,
  pinyin,
  instruction,
  options,
  correctOptionId,
  onAnswer,
}: {
  hanzi: string;
  pinyin: string;
  instruction: string;
  options: FlashcardOption[];
  correctOptionId: number;
  onAnswer: (correct: boolean) => void;
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const wiggle = useSharedValue(0);

  const wiggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: wiggle.value }],
  }));

  useEffect(() => {
    if (answered && selectedId !== correctOptionId) {
      wiggle.value = withSequence(
        withTiming(-10, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(-8, { duration: 60 }),
        withTiming(8, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    }
  }, [answered, correctOptionId, selectedId, wiggle]);

  const handleSelect = (id: number) => {
    if (answered) return;
    haptics.tap();
    setSelectedId(id);
  };

  const handleCheck = () => {
    if (selectedId === null || answered) return;
    setAnswered(true);
  };

  const handleContinue = () => {
    onAnswer(selectedId === correctOptionId);
  };

  const playAudio = () => {
    Speech.speak(hanzi, { language: "zh-CN" });
  };

  const getOptionStyle = (id: number) => {
    if (!answered) {
      return id === selectedId
        ? { borderColor: colors.primaryAccentColor, backgroundColor: colors.primaryAccentBg }
        : { borderColor: colors.borderColor, backgroundColor: colors.surfacePrimary };
    }
    if (id === correctOptionId) {
      return {
        borderColor: colors.successColor,
        backgroundColor: colors.successBg,
      };
    }
    if (id === selectedId && id !== correctOptionId) {
      return {
        borderColor: colors.primaryAccentColor,
        backgroundColor: colors.primaryAccentBg,
      };
    }
    return {
      borderColor: colors.borderColor,
      backgroundColor: colors.surfacePrimary,
      opacity: 0.5,
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wordSection, wiggleStyle]}>
        <TouchableOpacity onPress={playAudio} style={styles.speakerButton} accessibilityRole="button" accessibilityLabel={T.a11y.playAudio}>
          <Ionicons name="volume-high" size={22} color={colors.primaryAccentColor} />
        </TouchableOpacity>
        <ThemedText style={styles.hanziText}>{hanzi}</ThemedText>
        <ThemedText style={styles.pinyinText}>{pinyin}</ThemedText>
      </Animated.View>

      <ThemedText style={styles.instruction}>{instruction}</ThemedText>

      <ScrollView
        style={styles.optionsScroll}
        contentContainerStyle={styles.optionsGrid}
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => (
          <Pressable
            key={option.id}
            style={[styles.optionCard, getOptionStyle(option.id)]}
            onPress={() => handleSelect(option.id)}
            disabled={answered}
          >
            <ThemedText style={styles.optionEnglish}>{option.english}</ThemedText>
            {answered && (
              <ThemedText style={styles.optionChinese}>{option.pinyin}</ThemedText>
            )}
          </Pressable>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor:
              selectedId === null
                ? colors.surfaceTertiary
                : colors.primaryAccentColor,
          },
        ]}
        onPress={answered ? handleContinue : handleCheck}
        disabled={selectedId === null}
        activeOpacity={0.85}
      >
        <ThemedText
          style={[
            styles.actionButtonText,
            { color: selectedId === null ? colors.subduedTextColor : colors.textInverse },
          ]}
        >
          {answered ? T.common.continue : T.common.check}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    wordSection: {
      alignItems: "center",
      paddingVertical: 28,
      backgroundColor: c.primaryAccentBg,
      borderRadius: 18,
      marginBottom: 18,
    },
    speakerButton: { marginBottom: 8 },
    hanziText: {
      fontFamily: FontFamily.bold,
      fontSize: 52,
      lineHeight: 60,
      color: c.primaryAccentColor,
      marginBottom: 4,
    },
    pinyinText: {
      fontFamily: FontFamily.medium,
      fontSize: 18,
      color: c.textSecondary,
    },
    instruction: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: c.subduedTextColor,
      textAlign: "center",
      marginBottom: 16,
    },
    optionsScroll: { flex: 1 },
    optionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    optionCard: {
      width: "47%",
      padding: 16,
      borderRadius: 14,
      borderWidth: 1.5,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 76,
    },
    optionEnglish: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textPrimary,
      textAlign: "center",
    },
    optionChinese: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: c.subduedTextColor,
      marginTop: 4,
      textAlign: "center",
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
    },
  });
}
