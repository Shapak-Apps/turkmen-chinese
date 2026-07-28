import type { Question } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";
import AudioWaveform from "./AudioWaveform";

export default function AudioPrompt({
  isPlaying,
  hasListenedToAudio,
  onPlay,
  onRevealMandarin,
  currentQuestion,
  showMandarin,
  scaleAnim,
  instructionOpacity,
  listeningOpacity,
  listeningScale,
  fadeAnim,
}: {
  isPlaying: boolean;
  hasListenedToAudio: boolean;
  onPlay: () => void;
  onRevealMandarin: () => void;
  currentQuestion: Extract<Question, { mandarin: { hanzi: string; pinyin: string } }>;
  showMandarin: boolean;
  scaleAnim: Animated.Value;
  instructionOpacity: Animated.Value;
  listeningOpacity: Animated.Value;
  listeningScale: Animated.Value;
  fadeAnim: Animated.Value;
}) {
  const playbackDisabled = isPlaying || hasListenedToAudio;
  return (
    <>
      <Pressable
        disabled={playbackDisabled}
        onPress={playbackDisabled ? undefined : () => requestAnimationFrame(onPlay)}
        onPressIn={() => {
          if (playbackDisabled) {
            return;
          }

          Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          if (playbackDisabled) {
            return;
          }

          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
      >
        <Animated.View
          style={[
            styles.playButton,
            {
              backgroundColor: playbackDisabled
                ? Colors.primaryAccentBgStrong
                : Colors.primaryAccentColor,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {isPlaying ? (
            <MaterialIcons name="graphic-eq" size={36} color="white" />
          ) : (
            <Ionicons name="play" size={36} color="white" />
          )}
        </Animated.View>
      </Pressable>
      <AudioWaveform isPlaying={isPlaying} />

      <View
        style={[
          styles.promptTextContainer,
          { minHeight: currentQuestion.type === "listening_mc" ? 0 : 50 },
        ]}
      >
        {!hasListenedToAudio ? (
          <View style={styles.listeningPrompt}>
            <Animated.View
              style={[
                styles.instructionContainer,
                { opacity: instructionOpacity },
              ]}
            >
              <ThemedText style={[styles.instructionText, { marginBottom: 8 }]}>
                {T.audioPrompt.tapToListen}
              </ThemedText>
              <ThemedText style={[styles.instructionHint]}>
                {T.audioPrompt.playsOnce}
              </ThemedText>
            </Animated.View>
            <Animated.View
              style={[
                styles.listeningContainer,
                {
                  opacity: listeningOpacity,
                  transform: [{ scale: listeningScale }],
                },
              ]}
            >
              <ThemedText style={styles.revealButtonText}>
                {T.audioPrompt.listening}
              </ThemedText>
            </Animated.View>
          </View>
        ) : showMandarin ? (
          <TouchableOpacity onPress={onRevealMandarin}>
            <Animated.View style={[styles.mandarinText, { opacity: fadeAnim }]}>
              <ThemedText style={styles.pinyin}>
                {currentQuestion.mandarin.pinyin}
              </ThemedText>
              <ThemedText style={styles.hanzi}>
                {currentQuestion.mandarin.hanzi}
              </ThemedText>
            </Animated.View>
          </TouchableOpacity>
        ) : (
          currentQuestion.type !== "listening_mc" && (
            <TouchableOpacity
              style={styles.revealButton}
              onPress={onRevealMandarin}
              hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
            >
              <ThemedText style={styles.instructionText}>
                {T.audioPrompt.revealWhatSaid}
              </ThemedText>
            </TouchableOpacity>
          )
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  playButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primaryAccentColor,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primaryAccentColor,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  mandarinText: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  pinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  hanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
  },
  revealButton: {
    marginBottom: 8,
    marginTop: 16,
    alignItems: "center",
  },
  revealButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.subduedTextColor,
    marginBottom: 4,
  },
  promptTextContainer: { alignItems: "center" },
  listeningPrompt: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    minHeight: 60,
  },
  instructionContainer: { alignItems: "center" },
  listeningContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  instructionText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    textAlign: "center",
    color: Colors.subduedTextColor,
  },
  instructionHint: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    textAlign: "center",
    color: Colors.subduedTextColor,
  },
});
