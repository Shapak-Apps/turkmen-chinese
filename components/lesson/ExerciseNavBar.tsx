import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useEffect, useMemo, useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

interface Props {
  total: number;
  currentIndex: number;
  visitedIndices: Set<number>;
  wrongIndices: Set<number>;
  onJumpTo: (index: number) => void;
}

const CIRCLE_SIZE = 32;
const GAP = 8;

export default function ExerciseNavBar({
  total,
  currentIndex,
  visitedIndices,
  wrongIndices,
  onJumpTo,
}: Props) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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

          return (
            <Pressable
              key={i}
              onPress={() => onJumpTo(i)}
              style={[
                styles.circle,
                isVisited && !isWrong && styles.circleCorrect,
                isWrong && styles.circleWrong,
                isCurrent && styles.circleCurrent,
              ]}
            >
              <ThemedText
                style={[
                  styles.number,
                  (isVisited || isWrong) && styles.numberLight,
                  isCurrent && !isVisited && !isWrong && styles.numberCurrent,
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

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    bar: {
      borderTopWidth: 1,
      borderTopColor: c.divider,
      backgroundColor: c.surfacePrimary,
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
      backgroundColor: c.surfaceTertiary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "transparent",
    },
    circleCurrent: {
      borderColor: c.primaryAccentColor,
      backgroundColor: c.primaryAccentBg,
    },
    circleCorrect: {
      backgroundColor: c.successColor,
      borderColor: c.successColor,
    },
    circleWrong: {
      backgroundColor: c.primaryAccentColor,
      borderColor: c.primaryAccentColor,
    },
    number: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.textSecondary,
    },
    numberLight: {
      color: c.textInverse,
    },
    numberCurrent: {
      color: c.primaryAccentColor,
    },
  });
}
