import { SpeakingOption } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import { useState } from "react";
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
}: {
  option: SpeakingOption;
  optionSelectionAnim: Animated.Value;
}) {
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
            Record this response in Mandarin
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
              Tap here to reveal how to say it
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
    </View>
  );
}

const styles = StyleSheet.create({
  promptContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
  },
  sayItPromptContainer: { position: "absolute", bottom: 20 },
  sayItPrompt: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.primaryAccentColor,
    textAlign: "center",
  },
  revealButton: { marginBottom: 8, marginTop: 16, alignItems: "center" },
  instructionText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    textAlign: "center",
    color: Colors.subduedTextColor,
  },
  optionDetailsHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: Colors.primaryAccentColor,
    marginBottom: 6,
  },
  optionDetailsPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  singleResponseContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.primaryAccentColor,
    backgroundColor: Colors.primaryAccentBg,
    alignItems: "center",
  },
  singleResponseEnglish: {
    fontFamily: FontFamily.semibold,
    fontSize: 17,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  singleResponseMandarin: { alignItems: "center", marginTop: 12 },
});
