import { THEORY_DATA } from "@/assets/data/theory_content";
import { ThemedText } from "@/components/themed-text";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { COURSE_DATA } from "@/constants/CourseData";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { getAllProgress } from "@/lib/lessonProgress";
import { useStreak } from "@/lib/streak";
import { useXP } from "@/lib/xp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return "Salam ertir";
  if (hour >= 11 && hour < 17) return "Salam günortan";
  if (hour >= 17 && hour < 22) return "Salam agşam";
  return "Salam gije";
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
  // All done — return chapter 30 as celebration
  const last = COURSE_DATA.chapters.find((c) => c.id === 30);
  return {
    id: 30,
    title: last?.title.split(" — ")[1] ?? "",
    hanzi: "完",
  };
}

export default function LessonsContent() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const { xp, refresh: refreshXP } = useXP();
  const streak = useStreak();

  useFocusEffect(
    useCallback(() => {
      getAllProgress().then(setProgress);
      refreshXP();
      streak.refresh();
    }, [refreshXP, streak]),
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
  const greeting = getGreeting();
  const isStarting = completedChapterIds.size === 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Watermark */}
      <View pointerEvents="none" style={styles.watermarkContainer}>
        <ThemedText style={styles.watermark}>学</ThemedText>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero with Aman */}
        <View style={styles.heroBlock}>
          <View style={styles.amanRow}>
            <View style={styles.amanAvatar}>
              <Image source={CHARACTERS.aman.source} style={styles.amanImg} />
            </View>
            <View style={styles.speechBubble}>
              <View style={styles.bubbleTail} />
              <ThemedText style={styles.greeting}>{greeting}!</ThemedText>
              <ThemedText style={styles.subtitle}>
                {isStarting
                  ? "Şu gün başlaýarys"
                  : `${completedChapterIds.size}/30 bap geçildi`}
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
              <Ionicons name="trophy" size={14} color={Colors.warningColor} />
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

        {/* Stats chips */}
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

        {/* Hero "Continue" card */}
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
              <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick links row */}
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => {
              haptics.tap();
              router.push({ pathname: "/chapters" });
            }}
            activeOpacity={0.85}
          >
            <View style={[styles.quickIcon, { backgroundColor: Colors.primaryAccentBg }]}>
              <Ionicons name="book-outline" size={22} color={Colors.primaryAccentColor} />
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
            <View style={[styles.quickIcon, { backgroundColor: Colors.successBg }]}>
              <Ionicons name="hand-left-outline" size={22} color={Colors.successColor} />
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
            <View style={[styles.quickIcon, { backgroundColor: Colors.surfaceTertiary }]}>
              <Ionicons name="settings-outline" size={22} color={Colors.textSecondary} />
            </View>
            <ThemedText style={styles.quickTitle}>Sazlamalar</ThemedText>
            <ThemedText style={styles.quickSubtitle}>Tertibi</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Progress bar */}
        {completedChapterIds.size > 0 && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressLabel}>Umumy ilerleme</ThemedText>
              <ThemedText style={styles.progressPercent}>
                {Math.round((completedChapterIds.size / 30) * 100)}%
              </ThemedText>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(completedChapterIds.size / 30) * 100}%` },
                ]}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.surfacePrimary },
  watermarkContainer: {
    position: "absolute",
    top: 60,
    right: -40,
    opacity: 0.04,
  },
  watermark: {
    fontFamily: FontFamily.bold,
    fontSize: 320,
    color: Colors.primaryAccentColor,
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
    backgroundColor: Colors.primaryAccentBg,
    borderWidth: 2,
    borderColor: Colors.primaryAccentColor,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  amanImg: { width: "100%", height: "100%", resizeMode: "cover" },
  speechBubble: {
    flex: 1,
    backgroundColor: Colors.surfaceSecondary,
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
    borderRightColor: Colors.surfaceSecondary,
  },
  heroChipsRow: {
    flexDirection: "row",
    gap: 8,
  },
  headerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.surfacePrimary,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.pill,
    ...Shadow.sm,
  },
  headerChipValue: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  headerChipUnit: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.subduedTextColor,
  },
  streakFire: { fontSize: 14 },
  greeting: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.3,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceSecondary,
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
    color: Colors.primaryAccentColor,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.borderColor,
  },

  heroCard: {
    flexDirection: "row",
    backgroundColor: Colors.primaryAccentColor,
    borderRadius: Radius.xl,
    overflow: "hidden",
    marginBottom: 24,
    minHeight: 160,
    ...Shadow.md,
  },
  heroBg: {
    width: 140,
    backgroundColor: Colors.primaryAccentColorDark,
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
    color: Colors.textInverse,
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
    color: Colors.textInverse,
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surfacePrimary,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
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
    color: Colors.textPrimary,
    textAlign: "center",
  },
  quickSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.subduedTextColor,
    marginTop: 1,
  },

  progressSection: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    padding: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  progressPercent: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.primaryAccentColor,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.borderColor,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primaryAccentColor,
    borderRadius: 4,
  },
});
