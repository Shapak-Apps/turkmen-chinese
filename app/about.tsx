import { ThemedText } from "@/components/themed-text";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { router } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const APP_VERSION =
  Constants.expoConfig?.version ?? Constants.manifest?.version ?? "1.0.0";

const AUTHOR_NAME = "Seydi Charyev";
const AUTHOR_EMAIL = "seydi.charyev@gmail.com";
const YEAR = new Date().getFullYear();

interface Credit {
  label: string;
  source: string;
  license: string;
}

const CREDITS: Credit[] = [
  {
    label: "Boya Chinese Elementary I",
    source: "Peking University Press",
    license: "Mazmun çeşmesi",
  },
  {
    label: "Twemoji",
    source: "Twitter / jdecked",
    license: "CC-BY 4.0",
  },
  {
    label: "Hanzi Writer",
    source: "jamsch / nieldlr",
    license: "MIT",
  },
  {
    label: "Inter",
    source: "Rasmus Andersson",
    license: "SIL Open Font License",
  },
];

export default function AboutScreen() {
  const handleEmailPress = () => {
    haptics.tap();
    Linking.openURL(
      `mailto:${AUTHOR_EMAIL}?subject=TurkmenLearn Chinese — feedback`,
    ).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Awtor we wersiýa</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App identity */}
        <View style={styles.appBlock}>
          <View style={styles.appBadge}>
            <ThemedText style={styles.appBadgeText}>汉</ThemedText>
          </View>
          <ThemedText style={styles.appName}>TurkmenLearn Chinese</ThemedText>
          <ThemedText style={styles.appTagline}>
            Türkmen dilinde hytaý dilini öwretmek
          </ThemedText>
          <View style={styles.versionPill}>
            <ThemedText style={styles.versionPillText}>v{APP_VERSION}</ThemedText>
          </View>
        </View>

        {/* Author */}
        <ThemedText style={styles.sectionLabel}>AWTOR</ThemedText>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="person-outline" size={20} color={Colors.primaryAccentColor} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.rowLabel}>Awtor</ThemedText>
              <ThemedText style={styles.rowValue}>{AUTHOR_NAME}</ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={handleEmailPress}
          >
            <View style={styles.rowIcon}>
              <Ionicons name="mail-outline" size={20} color={Colors.primaryAccentColor} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.rowLabel}>Aragatnaşyk</ThemedText>
              <ThemedText style={styles.rowValueLink}>{AUTHOR_EMAIL}</ThemedText>
            </View>
            <Ionicons name="open-outline" size={16} color={Colors.subduedTextColor} />
          </Pressable>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name="document-text-outline" size={20} color={Colors.primaryAccentColor} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.rowLabel}>Lisenziýa</ThemedText>
              <ThemedText style={styles.rowValue}>MIT License</ThemedText>
            </View>
          </View>
        </View>

        {/* Credits */}
        <ThemedText style={styles.sectionLabel}>MINNETDARLYK</ThemedText>
        <ThemedText style={styles.sectionHint}>
          Programmanyň döredilmegine kömek eden çeşmeler:
        </ThemedText>
        <View style={styles.card}>
          {CREDITS.map((credit, idx) => (
            <View key={credit.label}>
              <View style={styles.creditRow}>
                <View style={{ flex: 1 }}>
                  <ThemedText style={styles.creditLabel}>{credit.label}</ThemedText>
                  <ThemedText style={styles.creditSource}>{credit.source}</ThemedText>
                </View>
                <View style={styles.creditBadge}>
                  <ThemedText style={styles.creditBadgeText}>
                    {credit.license}
                  </ThemedText>
                </View>
              </View>
              {idx < CREDITS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <ThemedText style={styles.footer}>
          © {YEAR} {AUTHOR_NAME}{"\n"}
          Made with ❤ for türkmen students learning 汉语
        </ThemedText>
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
  scrollContent: {
    paddingHorizontal: Spacing["2xl"],
    paddingTop: 24,
    paddingBottom: 40,
  },

  appBlock: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 28,
  },
  appBadge: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: Colors.primaryAccentColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    ...Shadow.md,
  },
  appBadgeText: {
    fontFamily: FontFamily.bold,
    fontSize: 48,
    lineHeight: 56,
    color: Colors.textInverse,
  },
  appName: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    textAlign: "center",
  },
  appTagline: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.subduedTextColor,
    textAlign: "center",
    marginTop: 4,
  },
  versionPill: {
    marginTop: 12,
    backgroundColor: Colors.primaryAccentBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },
  versionPillText: {
    fontFamily: FontFamily.bold,
    fontSize: 13,
    color: Colors.primaryAccentColor,
    letterSpacing: 0.5,
  },

  sectionLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.subduedTextColor,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  sectionHint: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginTop: -4,
    marginBottom: 10,
  },

  card: {
    backgroundColor: Colors.surfacePrimary,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: Radius.lg,
    marginBottom: 24,
    overflow: "hidden",
    ...Shadow.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  rowPressed: { backgroundColor: Colors.surfaceSecondary },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryAccentBg,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.subduedTextColor,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  rowValue: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginTop: 1,
  },
  rowValueLink: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.primaryAccentColor,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: 60,
  },

  creditRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  creditLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  creditSource: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
  creditBadge: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  creditBadgeText: {
    fontFamily: FontFamily.semibold,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },

  footer: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 8,
  },
});
