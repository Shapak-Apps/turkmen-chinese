import { ThemedText } from "@/components/themed-text";
import LessonContent from "@/components/lesson/LessonContent";
import StrokeOrderMode from "@/components/lesson/StrokeOrderMode";
import VocabularyIntroScreen from "@/components/lesson/VocabularyIntroScreen";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { COURSE_DATA } from "@/constants/CourseData";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import { T } from "@/lib/strings";
import {
  getChapterUniqueHanzi,
  getChapterVocabulary,
  getUniqueWordsFromQuestions,
} from "@/lib/vocabulary";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Mode = "menu" | "vocabulary" | "exercises" | "stroke_order";

function BackHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        hitSlop={20}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel={T.a11y.back}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
      </Pressable>
      <View style={styles.headerTitleContainer}>
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );
}

export default function PractiseScreen() {
  const { lessonId, chapterId } = useLocalSearchParams<{
    lessonId?: string;
    chapterId?: string;
  }>();
  const [mode, setMode] = useState<Mode>("menu");

  const { questions, id, words, hanzi } = useMemo(() => {
    if (chapterId) {
      const chapter = COURSE_DATA.chapters.find(
        (ch) => ch.id === Number(chapterId),
      );
      if (!chapter) return { questions: [], id: "", words: [], hanzi: [] };

      const allQuestions = chapter.lessons.flatMap((l) => l.questions);
      return {
        questions: allQuestions,
        id: `chapter-${chapterId}`,
        words: getChapterVocabulary(Number(chapterId)),
        hanzi: getChapterUniqueHanzi(Number(chapterId)),
      };
    }

    if (lessonId) {
      const allLessons = COURSE_DATA.chapters.flatMap((c) =>
        c.review ? [...c.lessons, c.review] : c.lessons,
      );
      const currentLesson = allLessons.find((l) => l.id === Number(lessonId));
      const lessonQuestions = currentLesson ? currentLesson.questions : [];
      return {
        questions: lessonQuestions,
        id: lessonId,
        words: getUniqueWordsFromQuestions(lessonQuestions),
        hanzi: [],
      };
    }

    return { questions: [], id: "", words: [], hanzi: [] };
  }, [chapterId, lessonId]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Gönükmeler" />
        <View style={styles.placeholder}>
          <View style={styles.placeholderAvatar}>
            <Image source={CHARACTERS.aman.source} style={styles.placeholderImg} />
          </View>
          <ThemedText style={styles.placeholderTitle}>Gönükmeler taýýarlanýar</ThemedText>
          <ThemedText style={styles.placeholderText}>
            Bu sapak üçin gönükmeler ýakyn wagtda goşular.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (mode === "menu") {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Gönükmeler" />
        <View style={styles.menuContent}>
          <ThemedText style={styles.menuHeading}>
            Nireden başlamak isleýärsiň?
          </ThemedText>

          <TouchableOpacity
            style={styles.menuCard}
            activeOpacity={0.85}
            onPress={() => setMode("vocabulary")}
          >
            <View style={[styles.menuIcon, { backgroundColor: Colors.primaryAccentBg }]}>
              <Ionicons name="library-outline" size={24} color={Colors.primaryAccentColor} />
            </View>
            <View style={styles.menuCardContent}>
              <ThemedText style={styles.menuCardTitle}>Sapagyň sözleri</ThemedText>
              <ThemedText style={styles.menuCardSubtitle}>
                {words.length > 0
                  ? `${words.length} sözi gaýtala`
                  : "Sözleri gaýtala"}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            activeOpacity={0.85}
            onPress={() => setMode("exercises")}
          >
            <View style={[styles.menuIcon, { backgroundColor: Colors.successBg }]}>
              <Ionicons name="checkbox-outline" size={24} color={Colors.successColor} />
            </View>
            <View style={styles.menuCardContent}>
              <ThemedText style={styles.menuCardTitle}>Gönükmelere geç</ThemedText>
              <ThemedText style={styles.menuCardSubtitle}>
                {questions.length} gönükme
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
          </TouchableOpacity>

          {hanzi.length > 0 && (
            <TouchableOpacity
              style={styles.menuCard}
              activeOpacity={0.85}
              onPress={() => setMode("stroke_order")}
            >
              <View style={[styles.menuIcon, { backgroundColor: Colors.warningBg }]}>
                <Ionicons name="brush-outline" size={24} color={Colors.warningColor} />
              </View>
              <View style={styles.menuCardContent}>
                <ThemedText style={styles.menuCardTitle}>Iýerogliflerini ýaz</ThemedText>
                <ThemedText style={styles.menuCardSubtitle}>
                  {hanzi.length} iýeroglif
                </ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  if (mode === "vocabulary") {
    return (
      <SafeAreaView style={styles.container}>
        <VocabularyIntroScreen
          key={id}
          words={words}
          onStartLesson={() => setMode("exercises")}
          onExit={() => setMode("menu")}
        />
      </SafeAreaView>
    );
  }

  if (mode === "stroke_order") {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader title="Iýerogliflerini ýaz" onBack={() => setMode("menu")} />
        <StrokeOrderMode
          key={`stroke-${id}`}
          characters={hanzi}
          instruction="Sapagyň iýerogliflerini ýaz"
          onAnswer={() => setMode("menu")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LessonContent
        questions={questions}
        lessonId={id}
        onExit={() => setMode("menu")}
      />
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
    backgroundColor: Colors.primaryAccentBg,
    borderWidth: 2,
    borderColor: Colors.primaryAccentColor,
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
  menuContent: {
    flex: 1,
    padding: Spacing["2xl"],
    paddingTop: 32,
    gap: 12,
  },
  menuHeading: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    gap: 14,
    ...Shadow.sm,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  menuCardContent: {
    flex: 1,
  },
  menuCardTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  menuCardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
});
