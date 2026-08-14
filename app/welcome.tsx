import { ThemedText } from "@/components/themed-text";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { FontFamily, Radius, Shadow, Spacing, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { T } from "@/lib/strings";
import { router } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Hoş geldiň</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.amanIntro}>
          <View style={styles.amanCircle}>
            <Image source={CHARACTERS.aman.source} style={styles.amanImg} />
          </View>
          <View style={styles.amanText}>
            <ThemedText style={styles.amanGreeting}>Salam! Men Aman 👋</ThemedText>
            <ThemedText style={styles.amanSub}>
              Saýla, näme öwrenmek isleýärsiň
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => router.push("/about-app")}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.primaryAccentBg }]}>
            <Ionicons name="information-circle-outline" size={26} color={colors.primaryAccentColor} />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>Programma hakynda</ThemedText>
            <ThemedText style={styles.cardSubtitle}>
              Nädip ulanmaly, sapaklaryň gurluşy
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => router.push("/about-chinese")}
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.successBg }]}>
            <Ionicons name="language-outline" size={26} color={colors.successColor} />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>Hytaý dili hakynda</ThemedText>
            <ThemedText style={styles.cardSubtitle}>
              Mandarin, tonlar, pinýin, öwrenmegiň ýollary
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
        </TouchableOpacity>
      </View>
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
    content: {
      flex: 1,
      paddingHorizontal: Spacing["2xl"],
      paddingTop: Spacing["2xl"],
      gap: 12,
    },
    amanIntro: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      paddingBottom: 8,
      marginBottom: 4,
    },
    amanCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: c.primaryAccentBg,
      borderWidth: 2,
      borderColor: c.primaryAccentColor,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    amanImg: { width: "100%", height: "100%", resizeMode: "cover" },
    amanText: { flex: 1 },
    amanGreeting: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      color: c.textPrimary,
      letterSpacing: -0.3,
    },
    amanSub: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
      marginTop: 2,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: c.borderColor,
      backgroundColor: c.surfacePrimary,
      gap: 14,
      ...Shadow.sm,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: Radius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 16,
      color: c.textPrimary,
      marginBottom: 2,
    },
    cardSubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
    },
  });
}
