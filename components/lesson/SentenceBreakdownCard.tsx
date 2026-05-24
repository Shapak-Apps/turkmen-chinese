import { Word } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../themed-text";

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
  width: number;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const CARD_MAX_HEIGHT = SCREEN_HEIGHT * 0.75;
const CARD_MIN_HEIGHT = 90;
const OPEN_POSITION = 0;
const CLOSED_POSITION = CARD_MAX_HEIGHT - CARD_MIN_HEIGHT;

export default function SentenceBreakdownCard({
  sentence,
  disabled,
}: {
  sentence: {
    english: string;
    pinyin: string;
    hanzi: string;
    words: Word[];
    breakdown: string;
  };
  disabled?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(CLOSED_POSITION);
  const context = useSharedValue({ y: 0 });
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const cardRef = useRef<Animated.View>(null);
  const tooltipWidthRef = useRef<number>(0);
  const hanziWordRefs = useRef<Array<View | null>>([]);
  const pinyinWordRefs = useRef<Array<View | null>>([]);
  const [selectedWord, setSelectedWord] = useState<{
    type: "hanzi" | "pinyin";
    index: number;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const closeCard = () => {
    "worklet";
    translateY.value = withSpring(CLOSED_POSITION, {
      damping: 30,
      stiffness: 200,
      mass: 1,
    });
  };

  const openCard = () => {
    "worklet";
    translateY.value = withSpring(OPEN_POSITION, {
      damping: 30,
      stiffness: 200,
      mass: 1,
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = context.value.y + event.translationY;
      translateY.value = Math.max(translateY.value, OPEN_POSITION);
    })
    .onEnd(() => {
      if (translateY.value > CLOSED_POSITION / 2) {
        closeCard();
      } else {
        openCard();
      }
    });

  const hideTooltip = () => {
    setTooltip(null);
    setSelectedWord(null);
  };

  const playAudio = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
      return;
    }

    const text = sentence.hanzi || sentence.pinyin;
    if (!text) return;

    setIsPlaying(true);
    Speech.speak(text, {
      language: "zh-CN",
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const showTooltip = (word: Word, type: "hanzi" | "pinyin", index: number) => {
    const wordRef =
      type === "hanzi"
        ? hanziWordRefs.current[index]
        : pinyinWordRefs.current[index];
    if (!wordRef) return;

    wordRef.measureInWindow((wordX, wordY, wordWidth) => {
      cardRef.current?.measureInWindow((cardX, cardY) => {
        setTooltip({
          visible: true,
          text: word.english,
          x: wordX + wordWidth / 2,
          y: wordY - cardY,
          width: wordWidth,
        });
        setSelectedWord({ type, index });
      });
    });
  };

  const renderInteractiveSentence = (type: "hanzi" | "pinyin") => (
    <Pressable onPress={hideTooltip}>
      <View style={styles.interactiveSentenceContainer}>
        {sentence.words.map((word, index) => (
          <Pressable
            key={index}
            ref={(ref) => {
              if (type === "hanzi") hanziWordRefs.current[index] = ref;
              else pinyinWordRefs.current[index] = ref;
            }}
            onPress={() => showTooltip(word, type, index)}
          >
            <ThemedText
              style={[
                type === "hanzi" ? styles.hanziValue : styles.pinyinValue,
                selectedWord &&
                  selectedWord.type === type &&
                  selectedWord.index === index &&
                  styles.selectedWord,
              ]}
            >
              {word[type]}{" "}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </Pressable>
  );

  const cardInner = (
    <Animated.View
      ref={cardRef}
      pointerEvents={disabled ? "none" : "auto"}
      style={[
        styles.cardContainer,
        {
          height: CARD_MAX_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
          opacity: disabled ? 0.6 : 1,
        },
        animatedStyle,
      ]}
    >
      <Pressable style={{ flex: 1 }} onPress={hideTooltip}>
        <Pressable
          onPress={() => {
            if (translateY.value === OPEN_POSITION) {
              closeCard();
            } else {
              openCard();
            }
          }}
          style={styles.handleContainer}
        >
          <View style={styles.handle}></View>
        </Pressable>

        <View style={styles.peekContent}>
          <Ionicons name="help-circle-outline" size={20} color={Colors.subduedTextColor} />
          <ThemedText style={styles.peekText}>
            Swipe up for detailed help
          </ThemedText>
        </View>

        <ScrollView
          style={styles.fullContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText style={styles.title}>Sentence Breakdown</ThemedText>

          <View style={styles.wordHintContainer}>
            <ThemedText style={styles.wordHintText}>
              Tap any word to see its meaning
            </ThemedText>
          </View>

          <View style={styles.breakdownItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThemedText style={styles.label}>Pinyin:</ThemedText>
              <Pressable
                onPress={playAudio}
                disabled={disabled}
                style={styles.playButton}
                hitSlop={8}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={20}
                  color={Colors.primaryAccentColor}
                />
              </Pressable>
            </View>
            {renderInteractiveSentence("pinyin")}
          </View>
          <View style={styles.breakdownItem}>
            <ThemedText style={styles.label}>Hanzi:</ThemedText>
            {renderInteractiveSentence("hanzi")}
          </View>
          <View style={styles.breakdownItem}>
            <ThemedText style={styles.label}>English:</ThemedText>
            <ThemedText style={styles.englishValue}>
              {sentence.english}
            </ThemedText>
          </View>
          <View style={styles.breakdownItem}>
            <ThemedText style={styles.label}>Breakdown:</ThemedText>
            <ThemedText style={styles.breakdownText}>
              {sentence.breakdown}
            </ThemedText>
          </View>
        </ScrollView>
      </Pressable>

      {tooltip?.visible && (
        <View
          style={[
            styles.tooltipContainer,
            {
              top: tooltip.y - 48,
              left: Math.max(
                8,
                Math.min(
                  tooltip.x - tooltipWidthRef.current / 2,
                  SCREEN_WIDTH - tooltipWidthRef.current - 8,
                ),
              ),
            },
          ]}
          onLayout={(e) => {
            tooltipWidthRef.current = e.nativeEvent.layout.width;
          }}
        >
          <ThemedText style={styles.tooltipText}>{tooltip.text}</ThemedText>
        </View>
      )}
    </Animated.View>
  );

  if (disabled) {
    return cardInner;
  }

  return <GestureDetector gesture={panGesture}>{cardInner}</GestureDetector>;
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    bottom: -CARD_MIN_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: Colors.surfacePrimary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: Colors.divider,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 0,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderColorStrong,
  },
  peekContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  peekText: {
    marginLeft: 8,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.subduedTextColor,
  },
  fullContent: { paddingHorizontal: 24, paddingTop: 10 },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  breakdownItem: { marginBottom: 28 },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.subduedTextColor,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  interactiveSentenceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  pinyinValue: {
    fontFamily: FontFamily.medium,
    fontSize: 17,
    color: Colors.textPrimary,
    lineHeight: 28,
  },
  hanziValue: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
    lineHeight: 34,
  },
  englishValue: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  breakdownText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  tooltipContainer: {
    position: "absolute",
    backgroundColor: Colors.textPrimary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 6,
  },
  tooltipText: {
    fontFamily: FontFamily.medium,
    color: Colors.textInverse,
    fontSize: 13,
    textAlign: "center",
  },
  selectedWord: {
    paddingHorizontal: 2,
    textDecorationLine: "underline",
    textDecorationColor: Colors.primaryAccentColor,
    textDecorationStyle: "solid",
  },
  wordHintContainer: { marginBottom: 18 },
  wordHintText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    fontStyle: "italic",
  },
  playButton: {
    marginLeft: 10,
    backgroundColor: Colors.primaryAccentBg,
    borderRadius: 14,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
