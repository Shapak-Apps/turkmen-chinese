import { SpeakingOption } from "@/constants/CourseData";
import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

export default function SingleResponseMode({
  option,
  optionSelectionAnim,
  onContinue,
}: {
  option: SpeakingOption;
  optionSelectionAnim: Animated.Value;
  onContinue?: () => void;
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.promptContainer}>
        <Animated.View
          style={[
            styles.sayItPromptContainer,
            {
              opacity: optionSelectionAnim,
              transform: [
                {
                  translateY: optionSelectionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ThemedText style={styles.sayItPrompt}>
            {T.shadowing.prompt}
          </ThemedText>
        </Animated.View>
      </View>
      <View style={styles.singleResponseContainer}>
        <ThemedText style={styles.singleResponseEnglish}>
          {option.english}
        </ThemedText>
        <TouchableOpacity
          style={styles.revealButton}
          onPress={() => setShowAnswer((v) => !v)}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          {!showAnswer ? (
            <ThemedText style={styles.instructionText}>
              {T.shadowing.reveal}
            </ThemedText>
          ) : (
            <View style={styles.singleResponseMandarin}>
              <ThemedText style={styles.optionDetailsHanzi}>
                {option.mandarin.hanzi}
              </ThemedText>
              <ThemedText style={styles.optionDetailsPinyin}>
                {option.mandarin.pinyin}
              </ThemedText>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {onContinue && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={onContinue}
          activeOpacity={0.85}
        >
          <ThemedText style={styles.continueButtonText}>
            {T.common.continue}
          </ThemedText>
          <Ionicons name="arrow-forward" size={18} color={colors.textInverse} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    promptContainer: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 50,
    },
    sayItPromptContainer: { position: "absolute", bottom: 20 },
    sayItPrompt: {
      fontFamily: FontFamily.semibold,
      fontSize: 16,
      color: c.primaryAccentColor,
      textAlign: "center",
    },
    revealButton: { marginBottom: 8, marginTop: 16, alignItems: "center" },
    instructionText: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      textAlign: "center",
      color: c.subduedTextColor,
    },
    optionDetailsHanzi: {
      fontFamily: FontFamily.bold,
      fontSize: 28,
      color: c.primaryAccentColor,
      marginBottom: 6,
    },
    optionDetailsPinyin: {
      fontFamily: FontFamily.medium,
      fontSize: 15,
      color: c.textSecondary,
    },
    singleResponseContainer: {
      padding: 20,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: c.primaryAccentColor,
      backgroundColor: c.primaryAccentBg,
      alignItems: "center",
    },
    singleResponseEnglish: {
      fontFamily: FontFamily.semibold,
      fontSize: 17,
      color: c.textPrimary,
      textAlign: "center",
    },
    singleResponseMandarin: { alignItems: "center", marginTop: 12 },
    continueButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 14,
      gap: 8,
      marginTop: 20,
      backgroundColor: c.primaryAccentColor,
    },
    continueButtonText: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textInverse,
    },
  });
}
