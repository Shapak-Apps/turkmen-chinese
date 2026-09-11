import { Colors, FontFamily } from "@/constants/theme";
import { useEffect, useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

interface Props {
  total: number;
  currentIndex: number;
  visitedIndices: Set<number>;
  wrongIndices: Set<number>;
  correctIndices: Set<number>;
  onJumpTo: (index: number) => void;
}

const CIRCLE_SIZE = 32;
const GAP = 8;

export default function ExerciseNavBar({
  total,
  currentIndex,
  visitedIndices,
  wrongIndices,
  correctIndices,
  onJumpTo,
}: Props) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const offset = Math.max(
      0,
      currentIndex * (CIRCLE_SIZE + GAP) - CIRCLE_SIZE,
    );
    scrollRef.current?.scrollTo({ x: offset, animated: true });
  }, [currentIndex]);

  return (
    <View style={styles.bar}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = i === currentIndex;
          const isVisited = visitedIndices.has(i);
          const isWrong = wrongIndices.has(i);
          const isCorrect = correctIndices.has(i);

          return (
            <Pressable
              key={i}
              onPress={() => onJumpTo(i)}
              style={[
                styles.circle,
                isCorrect && styles.circleCorrect,
                isWrong && styles.circleWrong,
                !isCorrect && !isWrong && isVisited && styles.circleVisited,
                isCurrent && styles.circleCurrent,
              ]}
            >
              <ThemedText
                style={[
                  styles.number,
                  (isCorrect || isWrong) && styles.numberLight,
                  isCurrent && !isCorrect && !isWrong && styles.numberCurrent,
                ]}
              >
                {i + 1}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.surfacePrimary,
    paddingVertical: 10,
  },
  content: {
    paddingHorizontal: 16,
    gap: GAP,
    alignItems: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Colors.surfaceTertiary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  circleCurrent: {
    borderColor: Colors.primaryAccentColor,
    backgroundColor: Colors.primaryAccentBg,
  },
  circleVisited: {
    backgroundColor: Colors.surfaceTertiary,
  },
  circleCorrect: {
    backgroundColor: Colors.successColor,
    borderColor: Colors.successColor,
  },
  circleWrong: {
    backgroundColor: Colors.primaryAccentColor,
    borderColor: Colors.primaryAccentColor,
  },
  number: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  numberLight: {
    color: Colors.textInverse,
  },
  numberCurrent: {
    color: Colors.primaryAccentColor,
  },
});
