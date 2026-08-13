import { Word } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function Flashcard({
  word,
  direction,
}: {
  word: Word;
  direction: "en-zh" | "zh-en";
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsFlipped(false);
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsFlipped(true);
  };

  const FrontContent = () => {
    if (direction === "en-zh") {
      return (
        <ThemedText style={styles.englishFront}>{word.english}</ThemedText>
      );
    }

    return (
      <View style={styles.mandarinContent}>
        <ThemedText style={styles.pinyin}>{word.pinyin}</ThemedText>
        <ThemedText style={styles.hanzi}>{word.hanzi}</ThemedText>
      </View>
    );
  };

  const BackContent = () => {
    if (direction === "en-zh") {
      return (
        <View style={styles.mandarinContent}>
          <ThemedText style={[styles.pinyin, styles.mandarinBackText]}>
            {word.pinyin}
          </ThemedText>
          <ThemedText style={[styles.hanzi, styles.mandarinBackText]}>
            {word.hanzi}
          </ThemedText>
        </View>
      );
    }

    return (
      <ThemedText style={[styles.englishBack, styles.mandarinBackText]}>
        {word.english}
      </ThemedText>
    );
  };

  return (
    <Pressable onPress={isFlipped ? flipToFront : flipToBack}>
      <View>
        <Animated.View
          style={[styles.card, styles.cardFront, frontAnimatedStyle]}
        >
          {FrontContent()}
        </Animated.View>
        <Animated.View
          style={[styles.card, styles.cardBack, backAnimatedStyle]}
        >
          {BackContent()}
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 340,
    maxHeight: 440,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  cardFront: {
    backgroundColor: Colors.surfacePrimary,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  cardBack: {
    backgroundColor: Colors.primaryAccentColor,
    position: "absolute",
    top: 0,
  },
  mandarinContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  pinyin: {
    fontFamily: FontFamily.semibold,
    fontSize: 36,
    lineHeight: 44,
    color: Colors.textSecondary,
    textAlign: "center",
    maxWidth: "90%",
  },
  hanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 56,
    lineHeight: 64,
    color: Colors.primaryAccentColor,
    textAlign: "center",
    maxWidth: "90%",
  },
  mandarinBackText: {
    color: Colors.textInverse,
  },
  englishFront: {
    fontFamily: FontFamily.semibold,
    fontSize: 32,
    lineHeight: 40,
    color: Colors.textPrimary,
    textAlign: "center",
    maxWidth: "90%",
  },
  englishBack: {
    fontFamily: FontFamily.medium,
    fontSize: 30,
    lineHeight: 38,
    color: Colors.textInverse,
    textAlign: "center",
    maxWidth: "90%",
  },
});
