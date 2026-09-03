import { THEORY_DATA } from "@/assets/data/theory_content";
import { ThemedText } from "@/components/themed-text";
import { CHAPTER_ILLUSTRATIONS } from "@/constants/ChapterIllustrations";
import { COURSE_DATA } from "@/constants/CourseData";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import { useBookmarks } from "@/lib/bookmarks";
import { haptics } from "@/lib/haptics";
import { getAllProgress } from "@/lib/lessonProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import { T } from "@/lib/strings";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface Unit {
  range: [number, number];
  title: string;
  subtitle: string;
}

const UNITS: Unit[] = [
  { range: [0, 0], title: "Başlangyç", subtitle: "Aýdylyş · 语音" },
  { range: [1, 5], title: "Bölüm 1", subtitle: "Tanyşlyk we ýer" },
  { range: [6, 10], title: "Bölüm 2", subtitle: "Wagt we sanlar" },
  { range: [11, 15], title: "Bölüm 3", subtitle: "Gündelik durmuş" },
  { range: [16, 20], title: "Bölüm 4", subtitle: "Adamlar we hyzmat" },
  { range: [21, 25], title: "Bölüm 5", subtitle: "Saglyk we okuw" },
  { range: [26, 30], title: "Bölüm 6", subtitle: "Geljek meýiller" },
];

function getChapterTranslation(fallbackTitle: string): string {
  const parts = fallbackTitle.split(" — ");
  return parts[1] ?? "";
}

export default function ChaptersScreen() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const { bookmarks } = useBookmarks();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      getAllProgress().then(setProgress);
    }, []),
  );

  const completedChapterIds = new Set<number>();
  Object.entries(progress).forEach(([key, count]) => {
    if (count > 0 && key.startsWith("chapter-")) {
      const n = Number(key.replace("chapter-", ""));
      if (!isNaN(n)) completedChapterIds.add(n);
    }
  });

  const nextChapterId = (() => {
    for (let i = 1; i <= 30; i++) {
      if (!completedChapterIds.has(i)) return i;
    }
    return 30;
  })();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Sapaklar</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            {completedChapterIds.size}/30 geçildi
          </ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter row */}
        {bookmarks.size > 0 && (
          <View style={styles.filterRow}>
            <Pressable
              style={[
                styles.filterChip,
                showBookmarksOnly && styles.filterChipActive,
              ]}
              onPress={() => {
                haptics.tap();
                setShowBookmarksOnly((v) => !v);
              }}
            >
              <Ionicons
                name={showBookmarksOnly ? "bookmark" : "bookmark-outline"}
                size={14}
                color={
                  showBookmarksOnly
                    ? Colors.textInverse
                    : Colors.primaryAccentColor
                }
              />
              <ThemedText
                style={[
                  styles.filterChipText,
                  showBookmarksOnly && styles.filterChipTextActive,
                ]}
              >
                Saýlanan ({bookmarks.size})
              </ThemedText>
            </Pressable>
          </View>
        )}

        {/* Units */}
        {UNITS.map((unit) => {
          const chaptersInUnit = COURSE_DATA.chapters
            .filter((ch) => ch.id >= unit.range[0] && ch.id <= unit.range[1])
            .filter((ch) => !showBookmarksOnly || bookmarks.has(ch.id));

          if (showBookmarksOnly && chaptersInUnit.length === 0) return null;

          const completedInUnit = chaptersInUnit.filter((ch) =>
            completedChapterIds.has(ch.id),
          ).length;

          const isIntroUnit = unit.range[0] === 0;

          return (
            <View key={unit.title} style={styles.unitSection}>
              <View style={styles.unitHeader}>
                <View>
                  <ThemedText style={styles.unitTitle}>{unit.title}</ThemedText>
                  <ThemedText style={styles.unitSubtitle}>
                    {unit.subtitle}
                  </ThemedText>
                </View>
                {!isIntroUnit && (
                  <View style={styles.unitProgress}>
                    <ThemedText style={styles.unitProgressText}>
                      {completedInUnit}/{chaptersInUnit.length}
                    </ThemedText>
                  </View>
                )}
              </View>

              {chaptersInUnit.map((chapter) => {
                const totalQuestions = chapter.lessons.reduce(
                  (sum, lesson) => sum + lesson.questions.length,
                  0,
                );
                const theory = THEORY_DATA[chapter.id];
                const wordCount = theory?.vocabulary?.length ?? 0;
                const translation = getChapterTranslation(chapter.title);
                const isCompleted = completedChapterIds.has(chapter.id);
                const isCurrent = chapter.id === nextChapterId;
                const isBookmarked = bookmarks.has(chapter.id);
                const Illustration = CHAPTER_ILLUSTRATIONS[chapter.id];

                return (
                  <Pressable
                    key={chapter.id}
                    style={({ pressed }) => [
                      styles.chapterCard,
                      isCurrent && styles.chapterCardCurrent,
                      isCompleted && styles.chapterCardCompleted,
                      pressed && styles.cardPressed,
                    ]}
                    onPress={() => {
                      haptics.tap();
                      router.push({
                        pathname: chapter.id === 0 ? "/theory" : "/chapter-detail",
                        params: { chapterId: String(chapter.id) },
                      });
                    }}
                  >
                    <View style={styles.chapterContent}>
                      <View style={styles.chapterTopRow}>
                        <View style={styles.chapterNumberBadge}>
                          <ThemedText style={styles.chapterNumberText}>
                            {chapter.id}
                          </ThemedText>
                        </View>
                        {isCurrent && (
                          <View style={styles.currentBadge}>
                            <ThemedText style={styles.currentBadgeText}>
                              Indiki
                            </ThemedText>
                          </View>
                        )}
                        {isCompleted && (
                          <View style={styles.completedBadge}>
                            <Ionicons
                              name="checkmark"
                              size={12}
                              color={Colors.textInverse}
                            />
                          </View>
                        )}
                        {isBookmarked && (
                          <Ionicons
                            name="bookmark"
                            size={14}
                            color={Colors.primaryAccentColor}
                            style={{ marginLeft: "auto" }}
                          />
                        )}
                      </View>
                      <ThemedText
                        style={styles.chapterTranslation}
                        numberOfLines={1}
                      >
                        {translation}
                      </ThemedText>
                      <ThemedText style={styles.chapterMeta}>
                        {wordCount > 0 && `${wordCount} söz`}
                        {wordCount > 0 && totalQuestions > 0 && " · "}
                        {totalQuestions > 0 && `${totalQuestions} gönükme`}
                        {wordCount === 0 && totalQuestions === 0 && "Diňe teoriýa"}
                      </ThemedText>
                    </View>

                    {Illustration && (
                      <View style={styles.illustrationBox}>
                        <Illustration width={52} height={52} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
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
  headerTitleContainer: { flex: 1, alignItems: "center" },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.primaryAccentColor,
    marginTop: 2,
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 16,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.pill,
    backgroundColor: Colors.primaryAccentBg,
    borderWidth: 1,
    borderColor: Colors.primaryAccentColor + "40",
  },
  filterChipActive: {
    backgroundColor: Colors.primaryAccentColor,
    borderColor: Colors.primaryAccentColor,
  },
  filterChipText: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: Colors.primaryAccentColor,
  },
  filterChipTextActive: {
    color: Colors.textInverse,
  },

  // Unit sections
  unitSection: {
    marginBottom: 24,
  },
  unitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  unitTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.primaryAccentColor,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  unitSubtitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 3,
  },
  unitProgress: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
  },
  unitProgressText: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Chapter cards
  chapterCard: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    marginBottom: 10,
    overflow: "hidden",
    minHeight: 80,
    ...Shadow.sm,
  },
  chapterCardCurrent: {
    borderColor: Colors.primaryAccentColor,
    borderWidth: 2,
    ...Shadow.md,
  },
  chapterCardCompleted: {
    backgroundColor: Colors.surfaceSecondary,
  },
  cardPressed: {
    opacity: 0.85,
  },

  chapterContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
    gap: 4,
  },
  chapterTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chapterNumberBadge: {
    backgroundColor: Colors.surfaceTertiary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  chapterNumberText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  currentBadge: {
    backgroundColor: Colors.primaryAccentColor,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  currentBadgeText: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.textInverse,
  },
  completedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.successColor,
    alignItems: "center",
    justifyContent: "center",
  },
  chapterTranslation: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.successColor,
  },
  illustrationBox: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  chapterMeta: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
  },
});
