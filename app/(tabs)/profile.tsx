import { getStats } from "@/lib/speakingListeningStats";
import { THEORY_DATA } from "@/assets/data/theory_content";
import { ThemedText } from "@/components/themed-text";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import {
  FontFamily,
  Radius,
  Shadow,
  Spacing,
  type ThemeColors,
} from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { haptics } from "@/lib/haptics";
import { getAllProgress } from "@/lib/lessonProgress";
import { useStreak } from "@/lib/streak";
import { useUserName } from "@/lib/user";
import { useXP } from "@/lib/xp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { xp, refresh: refreshXP } = useXP();
  const streak = useStreak();
  const { name, refresh: refreshName, save: saveName } = useUserName();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [renameOpen, setRenameOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  useFocusEffect(
    useCallback(() => {
      refreshXP();
      streak.refresh();
      refreshName();
      getAllProgress().then(setProgress);
    }, [refreshXP, streak, refreshName]),
  );

  const openRename = () => {
    haptics.tap();
    setNameDraft(name ?? "");
    setRenameOpen(true);
  };

  const confirmRename = async () => {
    const trimmed = nameDraft.trim();
    if (trimmed.length === 0) {
      setRenameOpen(false);
      return;
    }
    haptics.success();
    await saveName(trimmed);
    setRenameOpen(false);
  };

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

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avatar */}
        <View style={styles.heroSection}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatarRing}>
              <Image
                source={CHARACTERS.aman.source}
                style={styles.avatarImg}
              />
            </View>
          </View>
          <Pressable
            onPress={openRename}
            hitSlop={8}
            style={styles.heroNameRow}
          >
            <ThemedText style={styles.heroName}>
              {name ?? "Öwreniji"}
            </ThemedText>
            <Ionicons
              name="pencil"
              size={16}
              color={colors.subduedTextColor}
            />
          </Pressable>
          <ThemedText style={styles.heroSubtitle}>
            Hytaý dilini öwrenýär
          </ThemedText>
        </View>

        {/* XP big card */}
        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <View style={styles.xpIconCircle}>
              <Ionicons name="trophy" size={22} color={colors.warningColor} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.xpLabel}>JEMI XP</ThemedText>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <AnimatedCounter value={xp} style={styles.xpValue} />
                <ThemedText style={styles.xpUnit}> XP</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Streak card */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <View
              style={[
                styles.streakIcon,
                streak.currentStreak === 0 && styles.streakIconInactive,
              ]}
            >
              <ThemedText style={styles.streakEmoji}>🔥</ThemedText>
            </View>
            <View>
              <ThemedText style={styles.streakLabel}>HÄZIRKI STREAK</ThemedText>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <AnimatedCounter
                  value={streak.currentStreak}
                  style={styles.streakValue}
                />
                <ThemedText style={styles.streakUnit}> gün</ThemedText>
              </View>
            </View>
          </View>
          <View style={styles.streakRight}>
            <ThemedText style={styles.streakBestLabel}>Iň gowy</ThemedText>
            <ThemedText style={styles.streakBestValue}>
              {streak.longestStreak}
            </ThemedText>
          </View>
        </View>

        {/* Progress stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <AnimatedCounter
              value={completedChapterIds.size}
              style={styles.statValue}
            />
            <ThemedText style={styles.statLabel}>baplar geçildi</ThemedText>
            <View style={styles.statBar}>
              <View
                style={[
                  styles.statBarFill,
                  { backgroundColor: colors.primaryAccentColor },
                ]}
              />
            </View>
            <ThemedText style={styles.statSubtle}>
              {completedChapterIds.size} / 30
            </ThemedText>
          </View>

          <View style={styles.statBox}>
            <AnimatedCounter value={wordsLearned} style={styles.statValue} />
            <ThemedText style={styles.statLabel}>sözler</ThemedText>
            <View style={styles.statBar}>
              <View
                style={[
                  styles.statBarFill,
                  { backgroundColor: colors.successColor },
                ]}
              />
            </View>
            <ThemedText style={styles.statSubtle}>~600</ThemedText>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Menýu</ThemedText>
          <View style={styles.menuList}>
            <MenuItem
              icon="settings-outline"
              title="Sazlamalar"
              subtitle="Hiýeroglif ýazuwy, gatylyk"
              onPress={() => router.push("/settings")}
              colors={colors}
            />
            <MenuItem
              icon="information-circle-outline"
              title="Programma hakynda"
              subtitle="Programmany nähili ulanmaly"
              onPress={() => router.push("/about-app")}
              colors={colors}
            />
            <MenuItem
              icon="language-outline"
              title="Hytaý dili hakynda"
              subtitle="Mandarin, tonlar, pinýin"
              onPress={() => router.push("/about-chinese")}
              colors={colors}
            />
            <MenuItem
              icon="person-circle-outline"
              title="Awtor we wersiýa"
              subtitle="Programma barada maglumat"
              onPress={() => router.push("/about")}
              isLast
              colors={colors}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={renameOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setRenameOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setRenameOpen(false)}
        >
          <Pressable
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}
          >
            <ThemedText style={styles.modalTitle}>Adyňy üýtget</ThemedText>
            <TextInput
              style={styles.modalInput}
              value={nameDraft}
              onChangeText={setNameDraft}
              autoFocus
              maxLength={20}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={confirmRename}
              placeholder="Adyňy ýaz..."
              placeholderTextColor={colors.subduedTextColor}
            />
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalBtn, styles.modalBtnSecondary]}
                onPress={() => setRenameOpen(false)}
              >
                <ThemedText style={styles.modalBtnSecondaryText}>Goý</ThemedText>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, styles.modalBtnPrimary]}
                onPress={confirmRename}
              >
                <ThemedText style={styles.modalBtnPrimaryText}>Sakla</ThemedText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  isLast,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  isLast?: boolean;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createMenuItemStyles(colors), [colors]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        !isLast && styles.menuItemBorder,
        pressed && styles.menuItemPressed,
      ]}
      onPress={() => {
        haptics.tap();
        onPress();
      }}
    >
      <View style={styles.menuItemIcon}>
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
      </View>
      <View style={styles.menuItemBody}>
        <ThemedText style={styles.menuItemTitle}>{title}</ThemedText>
        <ThemedText style={styles.menuItemSubtitle}>{subtitle}</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
    </Pressable>
  );
}

function createMenuItemStyles(c: ThemeColors) {
  return StyleSheet.create({
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 14,
      gap: 12,
    },
    menuItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    menuItemPressed: {
      backgroundColor: c.surfaceSecondary,
    },
    menuItemIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.surfaceSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    menuItemBody: { flex: 1 },
    menuItemTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textPrimary,
    },
    menuItemSubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: c.subduedTextColor,
      marginTop: 2,
    },
  });
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: c.surfacePrimary },
    scrollContent: {
      paddingHorizontal: Spacing["2xl"],
      paddingBottom: 32,
    },

    heroSection: {
      alignItems: "center",
      paddingTop: 24,
      paddingBottom: 24,
    },
    avatarOuter: {
      marginBottom: 14,
    },
    avatarRing: {
      width: 116,
      height: 116,
      borderRadius: 58,
      backgroundColor: c.primaryAccentBg,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderWidth: 3,
      borderColor: c.primaryAccentColor,
    },
    avatarImg: { width: "100%", height: "100%", resizeMode: "cover" },
    heroNameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    heroName: {
      fontFamily: FontFamily.bold,
      fontSize: 26,
      color: c.textPrimary,
      letterSpacing: -0.4,
    },
    heroSubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      color: c.subduedTextColor,
      marginTop: 4,
    },

    xpCard: {
      backgroundColor: c.warningBg,
      borderRadius: Radius.lg,
      padding: 18,
      marginBottom: 12,
    },
    xpHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    xpIconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: c.surfacePrimary,
      alignItems: "center",
      justifyContent: "center",
    },
    xpLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 11,
      color: c.warningColor,
      letterSpacing: 1.2,
      marginBottom: 2,
    },
    xpValue: {
      fontFamily: FontFamily.bold,
      fontSize: 32,
      color: c.textPrimary,
      letterSpacing: -0.5,
    },
    xpUnit: {
      fontFamily: FontFamily.semibold,
      fontSize: 16,
      color: c.textSecondary,
    },

    streakCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.surfacePrimary,
      borderWidth: 1,
      borderColor: c.borderColor,
      borderRadius: Radius.lg,
      padding: 16,
      marginBottom: 20,
      ...Shadow.sm,
    },
    streakLeft: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    streakIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: c.primaryAccentBg,
      alignItems: "center",
      justifyContent: "center",
    },
    streakIconInactive: {
      backgroundColor: c.surfaceTertiary,
      opacity: 0.5,
    },
    streakEmoji: { fontSize: 22 },
    streakLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 11,
      color: c.subduedTextColor,
      letterSpacing: 1,
      marginBottom: 2,
    },
    streakValue: {
      fontFamily: FontFamily.bold,
      fontSize: 24,
      color: c.textPrimary,
    },
    streakUnit: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: c.textSecondary,
    },
    streakRight: {
      paddingLeft: 12,
      borderLeftWidth: 1,
      borderLeftColor: c.divider,
      alignItems: "flex-end",
    },
    streakBestLabel: {
      fontFamily: FontFamily.regular,
      fontSize: 11,
      color: c.subduedTextColor,
    },
    streakBestValue: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      color: c.textPrimary,
    },

    statsGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 24,
    },
    statBox: {
      flex: 1,
      backgroundColor: c.surfacePrimary,
      borderWidth: 1,
      borderColor: c.borderColor,
      borderRadius: Radius.lg,
      padding: 14,
      ...Shadow.sm,
    },
    statValue: {
      fontFamily: FontFamily.bold,
      fontSize: 26,
      color: c.textPrimary,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontFamily: FontFamily.medium,
      fontSize: 12,
      color: c.subduedTextColor,
      marginTop: 2,
      marginBottom: 12,
    },
    statBar: {
      height: 4,
      backgroundColor: c.surfaceTertiary,
      borderRadius: 2,
      overflow: "hidden",
      marginBottom: 6,
    },
    statBarFill: {
      height: "100%",
      borderRadius: 2,
    },
    statSubtle: {
      fontFamily: FontFamily.regular,
      fontSize: 11,
      color: c.subduedTextColor,
      textAlign: "right",
    },

    section: { marginBottom: 24 },
    sectionTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.subduedTextColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10,
    },
    menuList: {
      backgroundColor: c.surfacePrimary,
      borderWidth: 1,
      borderColor: c.borderColor,
      borderRadius: Radius.lg,
      overflow: "hidden",
      ...Shadow.sm,
    },

    modalBackdrop: {
      flex: 1,
      backgroundColor: c.scrim,
      justifyContent: "center",
      padding: 24,
    },
    modalCard: {
      backgroundColor: c.surfacePrimary,
      borderRadius: Radius.lg,
      padding: 20,
    },
    modalTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      color: c.textPrimary,
      marginBottom: 14,
    },
    modalInput: {
      fontFamily: FontFamily.semibold,
      fontSize: 17,
      color: c.textPrimary,
      backgroundColor: c.surfaceSecondary,
      borderRadius: Radius.md,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 2,
      borderColor: c.borderColor,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 18,
    },
    modalBtn: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: Radius.md,
    },
    modalBtnSecondary: { backgroundColor: c.surfaceTertiary },
    modalBtnSecondaryText: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textPrimary,
    },
    modalBtnPrimary: { backgroundColor: c.primaryAccentColor },
    modalBtnPrimaryText: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textInverse,
    },
  });
}
