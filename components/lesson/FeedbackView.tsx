import { SpeakingOption } from "@/constants/CourseData";
import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

export function FeedbackView({
  correctOption,
  isCorrect,
  onContinue,
  onRetry,
  attemptCount,
  maxAttempts,
  transcription,
}: {
  correctOption: SpeakingOption;
  isCorrect: boolean | null;
  onContinue: () => void;
  onRetry?: () => void;
  attemptCount: number;
  maxAttempts: number;
  transcription?: { expected: string; said: string };
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const showRetryButton = onRetry && !isCorrect && attemptCount < maxAttempts;
  const showCorrectAnswer = !isCorrect && attemptCount >= maxAttempts;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isCorrect ? colors.successBg : colors.primaryAccentBg,
          borderColor: isCorrect ? colors.successColor : colors.primaryAccentColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name={isCorrect ? "checkmark-circle" : "close-circle"}
          size={36}
          color={isCorrect ? colors.successColor : colors.primaryAccentColor}
        />
        <View style={styles.headerText}>
          <ThemedText style={styles.title}>
            {isCorrect
              ? T.feedback.correct
              : showRetryButton
                ? T.feedback.notQuite
                : T.feedback.keepPractising}
          </ThemedText>
          {!isCorrect && showRetryButton && (
            <ThemedText style={styles.subtitle}>
              {T.feedback.tryAgainSub}
            </ThemedText>
          )}
          {showCorrectAnswer && (
            <ThemedText style={styles.subtitle}>
              {T.feedback.nextTimeSub}
            </ThemedText>
          )}
        </View>
      </View>

      {transcription && (
        <View style={styles.transcriptionContainer}>
          <View style={styles.transcriptionRow}>
            <ThemedText style={styles.transcriptionLabel}>{T.feedback.expected}:</ThemedText>
            <ThemedText style={styles.transcriptionText}>
              {transcription.expected}
            </ThemedText>
          </View>
          <View style={styles.transcriptionRow}>
            <ThemedText style={styles.transcriptionLabel}>{T.feedback.youSaid}:</ThemedText>
            <ThemedText
              style={[
                styles.transcriptionText,
                { color: isCorrect ? colors.successColor : colors.primaryAccentColor },
              ]}
            >
              {transcription.said.charAt(0).toUpperCase() +
                transcription.said.slice(1)}
            </ThemedText>
          </View>
        </View>
      )}

      {showCorrectAnswer && (
        <View style={styles.correctAnswerSection}>
          <View style={styles.correctAnswerHeader}>
            <Ionicons
              name="bulb-outline"
              size={18}
              color={colors.successColor}
            />
            <ThemedText style={styles.correctAnswerLabel}>
              {T.feedback.correctResponse}
            </ThemedText>
          </View>
          <View style={styles.correctAnswerContent}>
            <ThemedText style={styles.correctAnswerEnglish}>
              {correctOption.english}
            </ThemedText>
            <View style={styles.correctAnswerMandarin}>
              <ThemedText style={styles.correctAnswerHanzi}>
                {correctOption.mandarin.hanzi}
              </ThemedText>
              <ThemedText style={styles.correctAnswerPinyin}>
                {correctOption.mandarin.pinyin}
              </ThemedText>
            </View>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {showRetryButton ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.retryButton]}
              onPress={onRetry}
              activeOpacity={0.85}
            >
              <Ionicons name="refresh" size={18} color={colors.textInverse} />
              <ThemedText style={styles.retryButtonText}>
                {T.feedback.tryAgainLeft(maxAttempts - attemptCount)}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={onContinue}
              activeOpacity={0.85}
            >
              <ThemedText style={styles.skipButtonText}>{T.common.skip}</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              isCorrect ? styles.continueButton : styles.continueButtonAlt,
            ]}
            onPress={onContinue}
            activeOpacity={0.85}
          >
            <ThemedText style={styles.continueButtonText}>
              {isCorrect ? T.common.continue : T.feedback.nextQuestion}
            </ThemedText>
            <Ionicons name="arrow-forward" size={18} color={colors.textInverse} />
          </TouchableOpacity>
        )}
      </View>

      {!isCorrect && attemptCount > 0 && attemptCount < maxAttempts && (
        <View style={styles.attemptIndicator}>
          <View style={styles.attemptDots}>
            {Array.from({ length: maxAttempts }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.attemptDot,
                  {
                    backgroundColor:
                      i < attemptCount
                        ? colors.primaryAccentColor
                        : colors.borderColorStrong,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      borderRadius: 20,
      borderWidth: 1.5,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 18,
    },
    headerText: { flex: 1 },
    title: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      color: c.textPrimary,
      marginBottom: 2,
    },
    subtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      lineHeight: 18,
      color: c.subduedTextColor,
    },
    correctAnswerSection: {
      backgroundColor: c.surfacePrimary,
      borderRadius: 14,
      padding: 14,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: c.borderColor,
    },
    correctAnswerHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginBottom: 10,
    },
    correctAnswerLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      color: c.successColor,
    },
    correctAnswerContent: { gap: 6 },
    correctAnswerEnglish: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textPrimary,
      marginBottom: 4,
    },
    correctAnswerMandarin: { gap: 2 },
    correctAnswerHanzi: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      color: c.primaryAccentColor,
    },
    correctAnswerPinyin: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: c.textSecondary,
    },
    buttonContainer: { gap: 10 },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 14,
      gap: 8,
    },
    retryButton: { backgroundColor: c.primaryAccentColor },
    retryButtonText: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textInverse,
    },
    skipButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: c.borderColorStrong,
    },
    skipButtonText: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textSecondary,
    },
    continueButton: { backgroundColor: c.successColor },
    continueButtonAlt: { backgroundColor: c.primaryAccentColor },
    continueButtonText: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textInverse,
    },
    attemptIndicator: { marginTop: 14, alignItems: "center" },
    attemptDots: { flexDirection: "row", gap: 6 },
    attemptDot: { width: 7, height: 7, borderRadius: 4 },
    transcriptionContainer: {
      padding: 12,
      backgroundColor: c.surfacePrimary,
      borderRadius: 10,
      marginBottom: 14,
    },
    transcriptionRow: { flexDirection: "row", marginBottom: 4 },
    transcriptionLabel: {
      fontFamily: FontFamily.semibold,
      width: 80,
      fontSize: 13,
      color: c.subduedTextColor,
    },
    transcriptionText: {
      flex: 1,
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.textPrimary,
    },
  });
}
