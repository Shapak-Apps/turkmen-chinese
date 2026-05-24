import { SpeakingOption } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  const showRetryButton = onRetry && !isCorrect && attemptCount < maxAttempts;
  const showCorrectAnswer = !isCorrect && attemptCount >= maxAttempts;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isCorrect ? Colors.successBg : Colors.primaryAccentBg,
          borderColor: isCorrect ? Colors.successColor : Colors.primaryAccentColor,
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons
          name={isCorrect ? "checkmark-circle" : "close-circle"}
          size={36}
          color={isCorrect ? Colors.successColor : Colors.primaryAccentColor}
        />
        <View style={styles.headerText}>
          <ThemedText style={styles.title}>
            {isCorrect
              ? "Great job!"
              : showRetryButton
                ? "Not quite"
                : "Keep practising"}
          </ThemedText>
          {!isCorrect && showRetryButton && (
            <ThemedText style={styles.subtitle}>
              Try again - you&apos;ve got this!
            </ThemedText>
          )}
          {showCorrectAnswer && (
            <ThemedText style={styles.subtitle}>
              Here&apos;s what to say next time
            </ThemedText>
          )}
        </View>
      </View>

      {transcription && (
        <View style={styles.transcriptionContainer}>
          <View style={styles.transcriptionRow}>
            <ThemedText style={styles.transcriptionLabel}>Expected:</ThemedText>
            <ThemedText style={styles.transcriptionText}>
              {transcription.expected}
            </ThemedText>
          </View>
          <View style={styles.transcriptionRow}>
            <ThemedText style={styles.transcriptionLabel}>You said:</ThemedText>
            <ThemedText
              style={[
                styles.transcriptionText,
                { color: isCorrect ? Colors.successColor : Colors.primaryAccentColor },
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
              color={Colors.successColor}
            />
            <ThemedText style={styles.correctAnswerLabel}>
              Correct Response
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
              <Ionicons name="refresh" size={18} color={Colors.textInverse} />
              <ThemedText style={styles.retryButtonText}>
                Try Again ({maxAttempts - attemptCount} left)
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={onContinue}
              activeOpacity={0.85}
            >
              <ThemedText style={styles.skipButtonText}>Skip</ThemedText>
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
              {isCorrect ? "Continue" : "Next Question"}
            </ThemedText>
            <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} />
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
                        ? Colors.primaryAccentColor
                        : Colors.borderColorStrong,
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

const styles = StyleSheet.create({
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
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: Colors.subduedTextColor,
  },
  correctAnswerSection: {
    backgroundColor: Colors.surfacePrimary,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
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
    color: Colors.successColor,
  },
  correctAnswerContent: { gap: 6 },
  correctAnswerEnglish: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  correctAnswerMandarin: { gap: 2 },
  correctAnswerHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.primaryAccentColor,
  },
  correctAnswerPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textSecondary,
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
  retryButton: { backgroundColor: Colors.primaryAccentColor },
  retryButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textInverse,
  },
  skipButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.borderColorStrong,
  },
  skipButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  continueButton: { backgroundColor: Colors.successColor },
  continueButtonAlt: { backgroundColor: Colors.primaryAccentColor },
  continueButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textInverse,
  },
  attemptIndicator: { marginTop: 14, alignItems: "center" },
  attemptDots: { flexDirection: "row", gap: 6 },
  attemptDot: { width: 7, height: 7, borderRadius: 4 },
  transcriptionContainer: {
    padding: 12,
    backgroundColor: Colors.surfacePrimary,
    borderRadius: 10,
    marginBottom: 14,
  },
  transcriptionRow: { flexDirection: "row", marginBottom: 4 },
  transcriptionLabel: {
    fontFamily: FontFamily.semibold,
    width: 80,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
  transcriptionText: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textPrimary,
  },
});
