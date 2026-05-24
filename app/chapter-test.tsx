import LessonContent from "@/components/lesson/LessonContent";
import VocabularyIntroScreen from "@/components/lesson/VocabularyIntroScreen";
import { ThemedText } from "@/components/themed-text";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { COURSE_DATA, Question } from "@/constants/CourseData";
import { Colors, FontFamily, Spacing } from "@/constants/theme";
import { getChapterVocabulary } from "@/lib/vocabulary";
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

function BackHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
      </Pressable>
      <View style={styles.headerTitleContainer}>
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );
}

export default function ChapterTestScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const [isStudyingVocabulary, setIsStudyingVocabulary] = useState(true);

  const { questions, id, words } = useMemo(() => {
    if (!chapterId) return { questions: [] as Question[], id: "", words: [] };

    const chapter = COURSE_DATA.chapters.find(
      (ch) => ch.id === Number(chapterId),
    );
    if (!chapter) return { questions: [] as Question[], id: "", words: [] };

    const allQuestions = chapter.lessons.flatMap((l) => l.questions);
    const selected = shuffleArray(allQuestions).slice(0, TEST_QUESTION_COUNT);

    return {
      questions: selected,
      id: `test-${chapterId}`,
      words: getChapterVocabulary(Number(chapterId)),
    };
  }, [chapterId]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Synag" />
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

  if (isStudyingVocabulary) {
    return (
      <SafeAreaView style={styles.container}>
        <VocabularyIntroScreen
          key={id}
          words={words}
          onStartLesson={() => setIsStudyingVocabulary(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LessonContent questions={questions} lessonId={id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfacePrimary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
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
    color: Colors.textPrimary,
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
    backgroundColor: Colors.warningBg,
    borderWidth: 2,
    borderColor: Colors.warningColor,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 8,
  },
  placeholderImg: { width: "100%", height: "100%", resizeMode: "cover" },
  placeholderTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  placeholderText: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: Colors.subduedTextColor,
    textAlign: "center",
    lineHeight: 22,
  },
});
