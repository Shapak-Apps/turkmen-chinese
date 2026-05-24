import { MatchPair } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";

export default function MatchPairsMode({
  instruction,
  pairs,
  onAnswer,
}: {
  instruction: string;
  pairs: MatchPair[];
  onAnswer: (correct: boolean) => void;
}) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const wrongAnim = useRef(new Animated.Value(0)).current;

  const shuffledRight = useMemo(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs]);

  useEffect(() => {
    if (matchedIds.size === pairs.length && pairs.length > 0) {
      const timer = setTimeout(() => {
        onAnswer(mistakes === 0);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [matchedIds, pairs.length, mistakes, onAnswer]);

  const handleLeftPress = (id: number) => {
    if (matchedIds.has(id)) return;
    setSelectedLeft(id);
    setWrongPair(null);

    if (selectedRight !== null) {
      checkMatch(id, selectedRight);
    }
  };

  const handleRightPress = (id: number) => {
    if (matchedIds.has(id)) return;
    setSelectedRight(id);
    setWrongPair(null);

    if (selectedLeft !== null) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: number, rightId: number) => {
    if (leftId === rightId) {
      haptics.success();
      setMatchedIds((prev) => new Set(prev).add(leftId));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      haptics.error();
      setMistakes((prev) => prev + 1);
      setWrongPair({ left: leftId, right: rightId });
      Animated.sequence([
        Animated.timing(wrongAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(wrongAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(null);
      });
    }
  };

  const getCardStyle = (id: number, side: "left" | "right") => {
    const isMatched = matchedIds.has(id);
    const isWrong = side === "left" ? wrongPair?.left === id : wrongPair?.right === id;
    const isSelected = side === "left" ? selectedLeft === id : selectedRight === id;

    if (isMatched)
      return {
        borderColor: Colors.successColor,
        backgroundColor: Colors.successBg,
        opacity: 0.7,
      };
    if (isWrong)
      return {
        borderColor: Colors.primaryAccentColor,
        backgroundColor: Colors.primaryAccentBg,
      };
    if (isSelected)
      return {
        borderColor: Colors.primaryAccentColor,
        backgroundColor: Colors.primaryAccentBg,
      };
    return {
      borderColor: Colors.borderColor,
      backgroundColor: Colors.surfacePrimary,
    };
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.instruction}>{instruction}</ThemedText>

      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          {pairs.map((pair) => (
            <Pressable
              key={`left-${pair.id}`}
              style={[styles.card, getCardStyle(pair.id, "left")]}
              onPress={() => handleLeftPress(pair.id)}
              disabled={matchedIds.has(pair.id)}
            >
              <ThemedText style={styles.cardHanzi}>{pair.left}</ThemedText>
              {pair.leftPinyin && (
                <ThemedText style={styles.cardPinyin}>{pair.leftPinyin}</ThemedText>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.column}>
          {shuffledRight.map((pair) => (
            <Pressable
              key={`right-${pair.id}`}
              style={[styles.card, getCardStyle(pair.id, "right")]}
              onPress={() => handleRightPress(pair.id)}
              disabled={matchedIds.has(pair.id)}
            >
              <ThemedText style={styles.cardEnglish}>{pair.right}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.progressContainer}>
        <ThemedText style={styles.progressText}>
          {matchedIds.size} / {pairs.length} matched
        </ThemedText>
      </View>
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
  columnsContainer: { flexDirection: "row", gap: 12, flex: 1 },
  column: { flex: 1, gap: 10 },
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  cardHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
  },
  cardPinyin: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
  cardEnglish: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  progressContainer: { alignItems: "center", paddingVertical: 16 },
  progressText: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
});
