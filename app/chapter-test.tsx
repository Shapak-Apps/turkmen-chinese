import ExamResultScreen from "@/components/lesson/ExamResultScreen";
import LessonContent, { LessonStats } from "@/components/lesson/LessonContent";
import { ThemedText } from "@/components/themed-text";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { COURSE_DATA, Question } from "@/constants/CourseData";
import { FontFamily, Spacing, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { ExamResult, saveExamResult } from "@/lib/examResult";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEST_QUESTION_COUNT = 15;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function BackHeader({ title, colors }: { title: string; colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
        <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
      </Pressable>
      <View style={styles.headerTitleContainer}>
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );
}

function leaveTest() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push("/lessons");
  }
}

export default function ChapterTestScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  // Bumping this re-shuffles questions and remounts the runner for a retake.
  const [attemptKey, setAttemptKey] = useState(0);
  const [stats, setStats] = useState<LessonStats | null>(null);
  const [outcome, setOutcome] = useState<ExamResult | null>(null);

  const { questions, lessonId } = useMemo(() => {
    if (!chapterId) return { questions: [] as Question[], lessonId: "" };

    const chapter = COURSE_DATA.chapters.find(
      (ch) => ch.id === Number(chapterId),
    );
    if (!chapter) return { questions: [] as Question[], lessonId: "" };

    const allQuestions = chapter.lessons.flatMap((l) => l.questions);
    const selected = shuffleArray(allQuestions).slice(0, TEST_QUESTION_COUNT);

    return { questions: selected, lessonId: `test-${chapterId}` };
    // attemptKey is intentionally a dependency: a retake reshuffles questions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, attemptKey]);

  const handleComplete = async (finalStats: LessonStats) => {
    const correct = finalStats.firstTryCorrect ?? finalStats.correctAnswers;
    const result = await saveExamResult(Number(chapterId), {
      correct,
      total: finalStats.totalQuestions,
    });
    setStats(finalStats);
    setOutcome(result);
  };

  const handleRetake = () => {
    setStats(null);
    setOutcome(null);
    setAttemptKey((k) => k + 1);
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Synag" colors={colors} />
        <View style={styles.placeholder}>
          <View style={styles.placeholderAvatar}>
            <Image source={CHARACTERS.aman.source} style={styles.placeholderImg} />
          </View>
          <ThemedText style={styles.placeholderTitle}>Synag taýýarlanýar</ThemedText>
          <ThemedText style={styles.placeholderText}>
            Bu sapak üçin synag ýakyn wagtda goşular.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (outcome && stats) {
    return (
      <SafeAreaView style={styles.container}>
        <ExamResultScreen
          result={outcome}
          byType={stats.byType ?? []}
          onRetake={handleRetake}
          onContinue={leaveTest}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LessonContent
        key={attemptKey}
        mode="exam"
        questions={questions}
        lessonId={lessonId}
        onComplete={handleComplete}
      />
    </SafeAreaView>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.surfacePrimary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitleContainer: {
      flex: 1,
      alignItems: "center",
    },
    headerTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      color: c.textPrimary,
    },
    placeholder: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
      gap: 14,
    },
    placeholderAvatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: c.warningBg,
      borderWidth: 2,
      borderColor: c.warningColor,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginBottom: 8,
    },
    placeholderImg: { width: "100%", height: "100%", resizeMode: "cover" },
    placeholderTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      color: c.textPrimary,
      textAlign: "center",
    },
    placeholderText: {
      fontFamily: FontFamily.regular,
      fontSize: 15,
      color: c.subduedTextColor,
      textAlign: "center",
      lineHeight: 22,
    },
  });
}
