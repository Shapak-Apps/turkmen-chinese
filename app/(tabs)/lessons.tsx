import { THEORY_DATA } from "@/assets/data/theory_content";
import { ThemedText } from "@/components/themed-text";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { COURSE_DATA } from "@/constants/CourseData";
import { FontFamily, Radius, Shadow, Spacing, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { haptics } from "@/lib/haptics";
import { getAllProgress } from "@/lib/lessonProgress";
import { ChapterUnlock, getCourseUnlocks } from "@/lib/stepProgress";
import { useStreak } from "@/lib/streak";
import { useUserName } from "@/lib/user";
import { useXP } from "@/lib/xp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getGreeting(name: string | null): string {
  const display = name && name.trim().length > 0 ? name : "öwreniji";
  return `Salam ${display}`;
}

function getNextChapter(completedIds: Set<number>): { id: number; title: string; hanzi: string } {
  for (const ch of COURSE_DATA.chapters) {
    if (ch.id === 0) continue;
    if (!completedIds.has(ch.id)) {
      const theory = THEORY_DATA[ch.id];
      const firstHanzi = theory?.vocabulary?.[0]?.hanzi ?? ch.title.split(" ")[0];
      const titleParts = ch.title.split(" — ");
      const cleanTitle = titleParts[1] ?? titleParts[0];
      return { id: ch.id, title: cleanTitle, hanzi: firstHanzi };
    }
  }
  const last = COURSE_DATA.chapters.find((c) => c.id === 30);
  return {
    id: 30,
    title: last?.title.split(" — ")[1] ?? "",
    hanzi: "完",
  };
}

function CourseMap({
  data,
  onOpen,
  colors,
}: {
  data: ChapterUnlock[];
  onOpen: (chapterId: number) => void;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  const rows = data.filter((c) => c.total > 0);
  if (rows.length === 0) return null;

  return (
    <View style={styles.mapSection}>
      <View style={styles.mapHeader}>
        <ThemedText style={styles.mapTitle}>Okuw kartasy</ThemedText>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, styles.squareDone]} />
          <ThemedText style={styles.legendText}>geçildi</ThemedText>
          <View style={[styles.legendDot, styles.squareCurrent]} />
          <ThemedText style={styles.legendText}>häzir</ThemedText>
        </View>
      </View>

      {rows.map((ch) => (
        <Pressable
          key={ch.chapterId}
          style={[styles.mapRow, !ch.unlocked && styles.mapRowLocked]}
          disabled={!ch.unlocked}
          onPress={() => onOpen(ch.chapterId)}
          accessibilityRole="button"
          accessibilityLabel={`${ch.chapterId}-nji bap`}
        >
          <ThemedText style={styles.mapRowLabel}>{ch.chapterId}</ThemedText>
          <View style={styles.squares}>
            {Array.from({ length: ch.total }).map((_, i) => {
              const done = i < ch.doneCount;
              const current =
                ch.unlocked && i === ch.doneCount && ch.doneCount < ch.total;
              return (
                <View
                  key={i}
                  style={[
                    styles.square,
                    done && styles.squareDone,
                    current && styles.squareCurrent,
                    !ch.unlocked && styles.squareLocked,
                  ]}
                />
              );
            })}
          </View>
          {ch.passed ? (
            <Ionicons name="checkmark-circle" size={16} color={colors.successColor} />
          ) : !ch.unlocked ? (
            <Ionicons name="lock-closed" size={13} color={colors.borderColorStrong} />
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

export default function LessonsContent() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [progress, setProgress] = useState<Record<string, number>>({});
  const [courseMap, setCourseMap] = useState<ChapterUnlock[]>([]);
  const { xp, refresh: refreshXP } = useXP();
  const streak = useStreak();
  const { name, refresh: refreshName } = useUserName();

  useFocusEffect(
    useCallback(() => {
      getAllProgress().then(setProgress);
      getCourseUnlocks().then(setCourseMap);
      refreshXP();
      streak.refresh();
      refreshName();
    }, [refreshXP, streak, refreshName]),
  );

  const completedChapterIds = new Set<number>();
  Object.entries(progress).forEach(([key, count]) => {
    if (count > 0 && key.startsWith("chapter-")) {
      const n = Number(key.replace("chapter-", ""));
      if (!isNaN(n)) completedChapterIds.add(n);
    }
  });

  const wordsLearned = Array.from(completedChapterIds).reduce((sum, id) => {
    return sum + (THEORY_DATA[id]?.vocabulary?.length ?? 0);
  }, 0);

  const next = getNextChapter(completedChapterIds);
  const greeting = getGreeting(name);
  const isStarting = completedChapterIds.size === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View pointerEvents="none" style={styles.watermarkContainer}>
        <ThemedText style={styles.watermark}>学</ThemedText>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBlock}>
          <View style={styles.amanRow}>
            <View style={styles.amanAvatar}>
              <Image source={CHARACTERS.aman.source} style={styles.amanImg} />
            </View>
            <View style={styles.speechBubble}>
              <View style={styles.bubbleTail} />
              <ThemedText style={styles.greeting}>{greeting}!</ThemedText>
              <ThemedText style={styles.subtitle}>
                Okuwy dowam edýäris!
              </ThemedText>
            </View>
          </View>

          <View style={styles.heroChipsRow}>
            <Pressable
              style={styles.headerChip}
              onPress={() => {
                haptics.tap();
                router.push("/(tabs)/profile");
              }}
            >
              <Ionicons name="trophy" size={14} color={colors.warningColor} />
              <AnimatedCounter value={xp} style={styles.headerChipValue} />
              <ThemedText style={styles.headerChipUnit}>XP</ThemedText>
            </Pressable>
            <Pressable
              style={styles.headerChip}
              onPress={() => {
                haptics.tap();
                router.push("/(tabs)/profile");
              }}
            >
              <ThemedText style={styles.streakFire}>🔥</ThemedText>
              <AnimatedCounter
                value={streak.currentStreak}
                style={styles.headerChipValue}
              />
              <ThemedText style={styles.headerChipUnit}>gün</ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <AnimatedCounter value={completedChapterIds.size} style={styles.statValue} />
            <ThemedText style={styles.statLabel}>bap geçildi</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statChip}>
            <AnimatedCounter value={wordsLearned} style={styles.statValue} />
            <ThemedText style={styles.statLabel}>söz öwrenildi</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statChip}>
            <AnimatedCounter value={30 - completedChapterIds.size} style={styles.statValue} />
            <ThemedText style={styles.statLabel}>galdy</ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.9}
          onPress={() => {
            haptics.tap();
            router.push({
              pathname: "/chapter-detail",
              params: { chapterId: String(next.id) },
            });
          }}
        >
          <View style={styles.heroBg}>
            <ThemedText style={styles.heroHanzi}>{next.hanzi}</ThemedText>
          </View>
          <View style={styles.heroContent}>
            <ThemedText style={styles.heroLabel}>
              {isStarting ? "Başlamak" : "Dowam et"}
            </ThemedText>
            <ThemedText style={styles.heroChapter}>
              {next.id}-NJI BAP
            </ThemedText>
            <ThemedText style={styles.heroTitle} numberOfLines={2}>
              {next.title}
            </ThemedText>
            <View style={styles.heroAction}>
              <ThemedText style={styles.heroActionText}>
                {isStarting ? "Başla" : "Dowam et"}
              </ThemedText>
              <Ionicons name="arrow-forward" size={18} color={colors.textInverse} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => {
              haptics.tap();
              router.push({ pathname: "/chapters" });
            }}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: colors.primaryAccentBg }]}>
              <Ionicons name="book-outline" size={22} color={colors.primaryAccentColor} />
            </View>
            <ThemedText style={styles.quickTitle}>Sapaklar</ThemedText>
            <ThemedText style={styles.quickSubtitle}>0–30</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => {
              haptics.tap();
              router.push("/welcome");
            }}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: colors.successBg }]}>
              <Ionicons name="hand-left-outline" size={22} color={colors.successColor} />
            </View>
            <ThemedText style={styles.quickTitle}>Hoş geldiňiz</ThemedText>
            <ThemedText style={styles.quickSubtitle}>Başlangyç</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => {
              haptics.tap();
              router.push("/settings");
            }}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: colors.surfaceTertiary }]}>
              <Ionicons name="settings-outline" size={22} color={colors.textSecondary} />
            </View>
            <ThemedText style={styles.quickTitle}>Sazlamalar</ThemedText>
            <ThemedText style={styles.quickSubtitle}>Tertibi</ThemedText>
          </TouchableOpacity>
        </View>

        <CourseMap
          data={courseMap}
          onOpen={(chapterId) => {
            haptics.tap();
            router.push({
              pathname: "/chapter-detail",
              params: { chapterId: String(chapterId) },
            });
          }}
          colors={colors}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: c.surfacePrimary },
    watermarkContainer: {
      position: "absolute",
      top: 60,
      right: -40,
      opacity: 0.04,
    },
    watermark: {
      fontFamily: FontFamily.bold,
      fontSize: 320,
      color: c.primaryAccentColor,
      lineHeight: 320,
    },
    scrollContent: {
      paddingHorizontal: Spacing["2xl"],
      paddingBottom: 32,
    },

    heroBlock: {
      paddingTop: 20,
      paddingBottom: 20,
    },
    amanRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 14,
    },
    amanAvatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: c.primaryAccentBg,
      borderWidth: 2,
      borderColor: c.primaryAccentColor,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    amanImg: { width: "100%", height: "100%", resizeMode: "cover" },
    speechBubble: {
      flex: 1,
      backgroundColor: c.surfaceSecondary,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: Radius.lg,
      position: "relative",
    },
    bubbleTail: {
      position: "absolute",
      left: -8,
      top: 20,
      width: 0,
      height: 0,
      borderTopWidth: 8,
      borderTopColor: "transparent",
      borderBottomWidth: 8,
      borderBottomColor: "transparent",
      borderRightWidth: 10,
      borderRightColor: c.surfaceSecondary,
    },
    heroChipsRow: {
      flexDirection: "row",
      gap: 8,
    },
    headerChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: c.surfacePrimary,
      borderWidth: 1,
      borderColor: c.borderColor,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: Radius.pill,
      ...Shadow.sm,
    },
    headerChipValue: {
      fontFamily: FontFamily.bold,
      fontSize: 14,
      color: c.textPrimary,
    },
    headerChipUnit: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: c.subduedTextColor,
    },
    streakFire: { fontSize: 14 },
    greeting: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      lineHeight: 26,
      letterSpacing: -0.3,
      color: c.textPrimary,
      marginBottom: 2,
    },
    subtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.textSecondary,
    },

    statsRow: {
      flexDirection: "row",
      backgroundColor: c.surfaceSecondary,
      borderRadius: Radius.lg,
      paddingVertical: 14,
      marginBottom: 20,
      alignItems: "center",
    },
    statChip: {
      flex: 1,
      alignItems: "center",
    },
    statValue: {
      fontFamily: FontFamily.bold,
      fontSize: 22,
      lineHeight: 26,
      color: c.primaryAccentColor,
      letterSpacing: -0.3,
    },
    statLabel: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: c.subduedTextColor,
      marginTop: 2,
    },
    statDivider: {
      width: 1,
      height: 28,
      backgroundColor: c.borderColor,
    },

    heroCard: {
      flexDirection: "row",
      backgroundColor: c.primaryAccentColor,
      borderRadius: Radius.xl,
      overflow: "hidden",
      marginBottom: 24,
      minHeight: 160,
      ...Shadow.md,
    },
    heroBg: {
      width: 140,
      backgroundColor: c.primaryAccentColorDark,
      alignItems: "center",
      justifyContent: "center",
    },
    heroHanzi: {
      fontFamily: FontFamily.bold,
      fontSize: 76,
      lineHeight: 84,
      color: "rgba(255,255,255,0.95)",
      textAlign: "center",
    },
    heroContent: {
      flex: 1,
      padding: 18,
      justifyContent: "space-between",
    },
    heroLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 11,
      color: "rgba(255,255,255,0.75)",
      textTransform: "uppercase",
      letterSpacing: 1.2,
    },
    heroChapter: {
      fontFamily: FontFamily.bold,
      fontSize: 13,
      color: "rgba(255,255,255,0.85)",
      letterSpacing: 0.5,
      marginTop: 2,
    },
    heroTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 19,
      lineHeight: 24,
      color: c.textInverse,
      marginTop: 6,
      marginBottom: 12,
    },
    heroAction: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      backgroundColor: "rgba(255,255,255,0.18)",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: Radius.pill,
    },
    heroActionText: {
      fontFamily: FontFamily.semibold,
      fontSize: 13,
      color: c.textInverse,
    },

    quickRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 24,
    },
    quickCard: {
      flex: 1,
      backgroundColor: c.surfacePrimary,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: c.borderColor,
      paddingVertical: 14,
      paddingHorizontal: 12,
      alignItems: "center",
      ...Shadow.sm,
    },
    quickIcon: {
      width: 40,
      height: 40,
      borderRadius: Radius.md,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    quickTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 13,
      color: c.textPrimary,
      textAlign: "center",
    },
    quickSubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 11,
      color: c.subduedTextColor,
      marginTop: 1,
    },

    mapSection: {
      backgroundColor: c.surfaceSecondary,
      borderRadius: Radius.lg,
      padding: 16,
    },
    mapHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    mapTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 16,
      color: c.textPrimary,
    },
    legendRow: { flexDirection: "row", alignItems: "center", gap: 5 },
    legendDot: { width: 10, height: 10, borderRadius: 3 },
    legendText: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: c.subduedTextColor,
      marginRight: 4,
    },
    mapRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      gap: 10,
    },
    mapRowLocked: { opacity: 0.55 },
    mapRowLabel: {
      fontFamily: FontFamily.bold,
      fontSize: 12,
      color: c.subduedTextColor,
      width: 22,
      textAlign: "right",
    },
    squares: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
    square: {
      width: 14,
      height: 14,
      borderRadius: 3,
      backgroundColor: c.borderColor,
    },
    squareDone: { backgroundColor: c.successColor },
    squareCurrent: {
      backgroundColor: c.primaryAccentBg,
      borderWidth: 1.5,
      borderColor: c.primaryAccentColor,
    },
    squareLocked: { backgroundColor: c.borderColor },
  });
}
