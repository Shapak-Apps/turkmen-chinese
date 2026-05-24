import type { Question } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
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
  isRecognizing,
  hasListenedToAudio,
  onPlay,
  onStartRecord,
  onStopRecord,
  onRevealMandarin,
  currentQuestion,
  showMandarin,
  selectedOption,
  scaleAnim,
  instructionOpacity,
  listeningOpacity,
  listeningScale,
  fadeAnim,
}: {
  isPlaying: boolean;
  isRecognizing: boolean;
  hasListenedToAudio: boolean;
  onPlay: () => void;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onRevealMandarin: () => void;
  currentQuestion: Extract<Question, { mandarin: { hanzi: string; pinyin: string } }>;
  showMandarin: boolean;
  selectedOption: number | null;
  scaleAnim: Animated.Value;
  instructionOpacity: Animated.Value;
  listeningOpacity: Animated.Value;
  listeningScale: Animated.Value;
  fadeAnim: Animated.Value;
}) {
  const playbackDisabled = !selectedOption && (isPlaying || hasListenedToAudio);
  return (
    <>
      <Pressable
        disabled={playbackDisabled}
        onPress={
          selectedOption
            ? isRecognizing
              ? onStopRecord
              : () => requestAnimationFrame(onStartRecord)
            : playbackDisabled
              ? undefined
              : () => requestAnimationFrame(onPlay)
        }
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
              backgroundColor: selectedOption
                ? isRecognizing
                  ? Colors.primaryAccentColorDark
                  : Colors.primaryAccentColor
                : playbackDisabled
                  ? Colors.primaryAccentBgStrong
                  : Colors.primaryAccentColor,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {selectedOption ? (
            isRecognizing ? (
              <MaterialIcons name="stop" size={36} color="white" />
            ) : (
              <Ionicons name="mic" size={36} color="white" />
            )
          ) : isPlaying ? (
            <MaterialIcons name="graphic-eq" size={36} color="white" />
          ) : (
            <Ionicons name="play" size={36} color="white" />
          )}
        </Animated.View>
      </Pressable>
      {selectedOption && isRecognizing ? (
        <View style={styles.recordingStatus}>
          <View style={styles.recordingIndicatorLarge}>
            <View style={styles.recordingDotLarge}></View>
          </View>
          <ThemedText style={styles.recordingText}>Recording...</ThemedText>
        </View>
      ) : (
        <AudioWaveform isPlaying={isPlaying} />
      )}

      <View
        style={[
          styles.promptTextContainer,
          { minHeight: currentQuestion.type === "listening_mc" ? 0 : 50 },
        ]}
      >
        {selectedOption ? (
          <View style={styles.recordingPromptTop}>
            <ThemedText style={styles.recordingPromptText}>
              {isRecognizing
                ? "Speak your response now"
                : "Tap the microphone to record"}
            </ThemedText>
          </View>
        ) : !hasListenedToAudio ? (
          <View style={styles.listeningPrompt}>
            <Animated.View
              style={[
                styles.instructionContainer,
                { opacity: instructionOpacity },
              ]}
            >
              <ThemedText style={[styles.instructionText, { marginBottom: 8 }]}>
                Tap play to listen carefully
              </ThemedText>
              <ThemedText style={[styles.instructionHint]}>
                The audio plays once before each response
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
                Listening...
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
                Tap here to reveal what was said
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
  recordingStatus: {
    alignItems: "center",
    marginVertical: 16,
  },
  recordingIndicatorLarge: { marginBottom: 8 },
  recordingDotLarge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primaryAccentColor,
  },
  recordingText: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.primaryAccentColor,
  },
  promptTextContainer: { alignItems: "center" },
  recordingPromptTop: { alignItems: "center", padding: 12 },
  recordingPromptText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.subduedTextColor,
    textAlign: "center",
  },
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
