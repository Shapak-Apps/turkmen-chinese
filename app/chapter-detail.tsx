import { THEORY_DATA } from "@/assets/data/theory_content";
import { ThemedText } from "@/components/themed-text";
import { CHAPTER_ILLUSTRATIONS } from "@/constants/ChapterIllustrations";
import { COURSE_DATA } from "@/constants/CourseData";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import { useBookmarks } from "@/lib/bookmarks";
import { haptics } from "@/lib/haptics";
import { getAllProgress } from "@/lib/lessonProgress";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UNITS: { range: [number, number]; title: string; subtitle: string }[] = [
  { range: [1, 5], title: "Bölüm 1", subtitle: "Tanyşlyk we ýer" },
  { range: [6, 10], title: "Bölüm 2", subtitle: "Wagt we sanlar" },
  { range: [11, 15], title: "Bölüm 3", subtitle: "Gündelik durmuş" },
  { range: [16, 20], title: "Bölüm 4", subtitle: "Adamlar we hyzmat" },
  { range: [21, 25], title: "Bölüm 5", subtitle: "Saglyk we okuw" },
  { range: [26, 30], title: "Bölüm 6", subtitle: "Geljek meýiller" },
];

function getUnit(chapterId: number) {
  return UNITS.find((u) => chapterId >= u.range[0] && chapterId <= u.range[1]);
}

export default function ChapterDetailScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const id = chapterId != null ? Number(chapterId) : 1;
  const isPronunciation = id === 0;
  const [progress, setProgress] = useState<Record<string, number>>({});
  const { bookmarks, toggle: toggleBookmark } = useBookmarks();
  const isBookmarked = bookmarks.has(id);

  useFocusEffect(
    useCallback(() => {
      getAllProgress().then(setProgress);
    }, []),
  );

  // Chapter 0 (Pronunciation) is theory-only — redirect to the theory screen.
  useEffect(() => {
    if (isPronunciation) {
      router.replace({ pathname: "/theory", params: { chapterId: "0" } });
    }
  }, [isPronunciation]);

  const chapter = COURSE_DATA.chapters.find((ch) => ch.id === id);

  if (isPronunciation) {
    return null; // redirecting via the effect above
  }

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>{T.screen.chapterNotFound}</ThemedText>
      </SafeAreaView>
    );
  }

  const totalQuestions = chapter.lessons.reduce(
    (sum, lesson) => sum + lesson.questions.length,
    0,
  );

  const theory = THEORY_DATA[id];
  const keyWord = theory?.vocabulary?.[0];
  const titleHanzi = chapter.title.split(" — ")[0] || keyWord?.hanzi || "";
  const titleTranslation = chapter.title.split(" — ")[1] || "";
  const pinyin = keyWord?.pinyin ?? "";

  const wordCount = theory?.vocabulary?.length ?? 0;
  const grammarCount = theory?.grammar?.length ?? 0;
  const dialogueCount = theory?.dialogues?.length ?? 0;

  const previewWords = theory?.vocabulary?.slice(0, 4) ?? [];

  const Illustration = CHAPTER_ILLUSTRATIONS[id];
  const unit = getUnit(id);

  const exerciseDone = (progress[`chapter-${id}`] ?? 0) > 0;
  const testDone = (progress[`test-${id}`] ?? 0) > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => {
            haptics.tap();
            void toggleBookmark(id);
          }}
          hitSlop={20}
          style={styles.bookmarkButton}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={
              isBookmarked ? Colors.primaryAccentColor : Colors.textSecondary
            }
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero block */}
        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            {unit && (
              <ThemedText style={styles.unitChip}>
                {unit.title} · {unit.subtitle}
              </ThemedText>
            )}
            <ThemedText style={styles.chapterLabel}>
              {chapter.id}-NJI BAP
            </ThemedText>
            <ThemedText style={styles.hanziTitle}>{titleHanzi}</ThemedText>
            {pinyin ? (
              <ThemedText style={styles.pinyinTitle}>{pinyin}</ThemedText>
            ) : null}
            {titleTranslation ? (
              <ThemedText style={styles.translation}>
                {titleTranslation}
              </ThemedText>
            ) : null}
          </View>
          {Illustration && (
            <View style={styles.heroIllustration}>
              <Illustration width={80} height={80} />
            </View>
          )}
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ThemedText style={styles.statValue}>{wordCount}</ThemedText>
            <ThemedText style={styles.statLabel}>söz</ThemedText>
          </View>
          <View style={styles.statSep} />
          <View style={styles.statBox}>
            <ThemedText style={styles.statValue}>{grammarCount}</ThemedText>
            <ThemedText style={styles.statLabel}>grammatika</ThemedText>
          </View>
          <View style={styles.statSep} />
          <View style={styles.statBox}>
            <ThemedText style={styles.statValue}>{dialogueCount}</ThemedText>
            <ThemedText style={styles.statLabel}>dialog</ThemedText>
          </View>
          <View style={styles.statSep} />
          <View style={styles.statBox}>
            <ThemedText style={styles.statValue}>{totalQuestions}</ThemedText>
            <ThemedText style={styles.statLabel}>gönükme</ThemedText>
          </View>
        </View>

        {/* Vocabulary preview chips */}
        {previewWords.length > 0 && (
          <View style={styles.previewSection}>
            <ThemedText style={styles.previewLabel}>Sözlerden</ThemedText>
            <View style={styles.previewChips}>
              {previewWords.map((word, idx) => (
                <View key={idx} style={styles.wordChip}>
                  <ThemedText style={styles.wordChipHanzi}>{word.hanzi}</ThemedText>
                  <ThemedText style={styles.wordChipPinyin}>
                    {word.pinyin}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Action cards */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => {
              haptics.tap();
              router.push({
                pathname: "/theory",
                params: { chapterId: String(chapter.id) },
              });
            }}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.primaryAccentBg }]}>
              <Ionicons name="book-outline" size={22} color={Colors.primaryAccentColor} />
            </View>
            <View style={styles.actionContent}>
              <ThemedText style={styles.actionTitle}>Teoriýa</ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                Sözler, grammatika, dialoglar
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => {
              haptics.tap();
              router.push({
                pathname: "/practise",
                params: { chapterId: String(chapter.id) },
              });
            }}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.successBg }]}>
              <Ionicons name="pencil-outline" size={22} color={Colors.successColor} />
            </View>
            <View style={styles.actionContent}>
              <ThemedText style={styles.actionTitle}>Gönükmeler</ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                {totalQuestions > 0
                  ? `Türgenleşik · ${totalQuestions} sorag`
                  : "Ýakyn wagtda goşular"}
              </ThemedText>
            </View>
            {exerciseDone && (
              <View style={styles.doneBadge}>
                <Ionicons name="checkmark" size={14} color={Colors.textInverse} />
              </View>
            )}
            <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.85}
            onPress={() => {
              haptics.tap();
              router.push({
                pathname: "/chapter-test",
                params: { chapterId: String(chapter.id) },
              });
            }}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.warningBg }]}>
              <Ionicons name="trophy-outline" size={22} color={Colors.warningColor} />
            </View>
            <View style={styles.actionContent}>
              <ThemedText style={styles.actionTitle}>Bap synagy</ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                15 tötänleýin gönükme
              </ThemedText>
            </View>
            {testDone && (
              <View style={styles.doneBadge}>
                <Ionicons name="checkmark" size={14} color={Colors.textInverse} />
              </View>
            )}
            <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: Spacing["2xl"],
    paddingBottom: 32,
  },

  // Hero
  hero: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  heroLeft: { flex: 1 },
  heroIllustration: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  unitChip: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.subduedTextColor,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  chapterLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.primaryAccentColor,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  hanziTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 44,
    lineHeight: 50,
    color: Colors.primaryAccentColor,
    letterSpacing: -1,
  },
  pinyinTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  translation: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },

  // Stats row
  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    marginBottom: 20,
    alignItems: "center",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
  statSep: {
    width: 1,
    height: 24,
    backgroundColor: Colors.borderColor,
  },

  // Vocabulary preview
  previewSection: {
    marginBottom: 24,
  },
  previewLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.subduedTextColor,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  previewChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wordChip: {
    backgroundColor: Colors.primaryAccentBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.md,
    alignItems: "center",
    minWidth: 64,
  },
  wordChipHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 17,
    color: Colors.primaryAccentColor,
  },
  wordChipPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  // Action cards
  actions: { gap: 12 },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    gap: 12,
    ...Shadow.sm,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  actionContent: { flex: 1 },
  actionTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
  doneBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.successColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
