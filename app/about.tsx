import { ThemedText } from "@/components/themed-text";
import { FontFamily, Radius, Shadow, Spacing, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { haptics } from "@/lib/haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import { T } from "@/lib/strings";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const APP_ICON = require("../assets/images/icon.png");
const SHAPAK_LOGO = require("../assets/images/shapak_logo.png");

const APP_VERSION =
  Constants.expoConfig?.version ?? Constants.manifest?.version ?? "1.0.0";

const APP_NAME = "Hytaý dili 1";
const TEAM_EMAIL = "shapak.apps@gmail.com";
const GITHUB_REPO_URL = "https://github.com/Shapak-Apps/turkmen-chinese";
const GITHUB_ORG_URL = "https://github.com/Shapak-Apps";
const WEBSITE_URL = "https://shapak-apps.github.io";
const YEAR = new Date().getFullYear();

type ModalType = "authors" | "series" | null;

function Section({
  icon,
  color,
  title,
  badge,
  highlight,
  children,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  badge?: string;
  highlight?: boolean;
  children: React.ReactNode;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={[styles.sectionCard, highlight && styles.sectionCardHighlight]}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color={color} />
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        {badge && (
          <View style={styles.sectionBadge}>
            <ThemedText style={styles.sectionBadgeText}>{badge}</ThemedText>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}

function FeatureRow({
  icon,
  text,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIconBox}>
        <Ionicons name={icon} size={16} color={colors.primaryAccentColor} />
      </View>
      <ThemedText style={styles.featureText}>{text}</ThemedText>
    </View>
  );
}

export default function AboutScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    haptics.tap();
    setActiveModal(type);
  };

  const closeModal = () => setActiveModal(null);

  const openEmail = () => {
    haptics.tap();
    Linking.openURL(`mailto:${TEAM_EMAIL}?subject=${APP_NAME}`).catch(() => {});
  };

  const openLink = (url: string) => {
    haptics.tap();
    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Programma barada</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <View style={styles.appBadge}>
            <Image source={APP_ICON} style={styles.appIconImg} />
          </View>
          <ThemedText style={styles.appName}>{APP_NAME}</ThemedText>
          <View style={styles.versionPill}>
            <ThemedText style={styles.versionPillText}>
              Wersiýa {APP_VERSION}
            </ThemedText>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openModal("authors")}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: colors.primaryAccentBg },
                ]}
              >
                <Ionicons name="people" size={22} color={colors.primaryAccentColor} />
              </View>
              <View style={styles.menuText}>
                <ThemedText style={styles.menuTitle}>Awtorlar barada</ThemedText>
                <ThemedText style={styles.menuSubtitle}>Kim döretdi</ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openModal("series")}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIcon, styles.menuIconShapak]}>
                <Image source={SHAPAK_LOGO} style={styles.menuShapakImg} />
              </View>
              <View style={styles.menuText}>
                <ThemedText style={styles.menuTitle}>
                  Şapak programmalar toplumy
                </ThemedText>
                <ThemedText style={styles.menuSubtitle}>
                  Beýleki programmalar
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            © {YEAR} Şapak Apps
          </ThemedText>
        </View>
      </ScrollView>

      <Modal
        visible={activeModal === "authors"}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={closeModal} hitSlop={12} style={styles.modalClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </Pressable>
            <ThemedText style={styles.modalTitle}>Awtorlar barada</ThemedText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            <Section icon="flag" color={colors.successColor} title="Wezipe" colors={colors}>
              <ThemedText style={styles.sectionText}>
                Şapak — Türkmenistanyň Mary welaýaty, Mary şäherinde ýerleşýän
                döredijiler topary tarapyndan döredildi.
                {"\n\n"}
                Biziň maksadymyz — Türkmenistanyň ilatyna daşary ýurt dillerini
                öwrenmegi has aňsat we elýeterli etmekdir. Bu programma serimiziň
                ikinji programmasy bolup, hytaý diline bagyşlanan.
              </ThemedText>
            </Section>

            <Section icon="apps" color={colors.warningColor} title="Mümkinçilikler" colors={colors}>
              <FeatureRow icon="book" text="31 bap (başlangyç dereje)" colors={colors} />
              <FeatureRow icon="checkbox" text="600+ gönükme (8 dürli görnüş)" colors={colors} />
              <FeatureRow icon="brush" text="Iýeroglif ýazuwy (768 oflaýn)" colors={colors} />
              <FeatureRow icon="volume-high" text="1632 pinýin ses faýly" colors={colors} />
              <FeatureRow icon="chatbubbles" text="Auto-play dialoglar" colors={colors} />
              <FeatureRow icon="trophy" text="XP we Streak sistemasy" colors={colors} />
            </Section>

            <Section icon="mail" color="#8B5CF6" title="Habarlaşmak" colors={colors}>
              <Pressable style={styles.emailBtn} onPress={openEmail}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={colors.primaryAccentColor}
                />
                <ThemedText style={styles.emailText}>{TEAM_EMAIL}</ThemedText>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={colors.primaryAccentColor}
                />
              </Pressable>
              <Pressable
                style={[styles.emailBtn, styles.linkBtnGap]}
                onPress={() => openLink(GITHUB_REPO_URL)}
              >
                <Ionicons
                  name="logo-github"
                  size={18}
                  color={colors.primaryAccentColor}
                />
                <ThemedText style={styles.emailText}>
                  Açyk çeşme kody — GitHub
                </ThemedText>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={colors.primaryAccentColor}
                />
              </Pressable>
              <ThemedText style={styles.sectionHint}>
                Teklipler, ýalňyşlyklar ýa-da soraglar üçin ýazyň.
              </ThemedText>
            </Section>

            <Section
              icon="document-text"
              color={colors.subduedTextColor}
              title="Lisenziýa"
              colors={colors}
            >
              <ThemedText style={styles.sectionText}>
                Programma MIT lisenziýasy bilen açyk çeşmäni esas alýar.
                {"\n\n"}
                Ulanylan çeşmeler: Twemoji (CC-BY 4.0), Hanzi Writer (MIT),
                Inter şrift (OFL).
              </ThemedText>
            </Section>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={activeModal === "series"}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={closeModal} hitSlop={12} style={styles.modalClose}>
              <Ionicons name="close" size={24} color={colors.textPrimary} />
            </Pressable>
            <ThemedText style={styles.modalTitle}>Şapak Apps</ThemedText>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.seriesHero}>
              <Image source={SHAPAK_LOGO} style={styles.seriesLogo} />
              <ThemedText style={styles.seriesTagline}>
                Türkmen dilinde — daşary ýurt dillerini öwretmek üçin programmalar toplumy
              </ThemedText>
            </View>

            <Section
              icon="information-circle"
              color={colors.primaryAccentColor}
              title="Toplum barada"
              colors={colors}
            >
              <ThemedText style={styles.sectionText}>
                Şapak Apps — Türkmenistanyň ilatyna daşary ýurt dillerini
                öwrenmegi has aňsat we elýeterli etmek üçin döredilen programmalar
                toplumy.
                {"\n\n"}
                Programmalar türkmen ulanyjylar üçin niýetlense-de, dünýäniň
                islendik künjeginden ulanmak mümkin.
              </ThemedText>
            </Section>

            <Section icon="link" color="#8B5CF6" title="Salgylar" colors={colors}>
              <Pressable
                style={styles.emailBtn}
                onPress={() => openLink(WEBSITE_URL)}
              >
                <Ionicons
                  name="globe-outline"
                  size={18}
                  color={colors.primaryAccentColor}
                />
                <ThemedText style={styles.emailText}>
                  shapak-apps.github.io
                </ThemedText>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={colors.primaryAccentColor}
                />
              </Pressable>
              <Pressable
                style={[styles.emailBtn, styles.linkBtnGap]}
                onPress={() => openLink(GITHUB_ORG_URL)}
              >
                <Ionicons
                  name="logo-github"
                  size={18}
                  color={colors.primaryAccentColor}
                />
                <ThemedText style={styles.emailText}>
                  github.com/Shapak-Apps
                </ThemedText>
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={colors.primaryAccentColor}
                />
              </Pressable>
            </Section>

            <Section
              icon="globe"
              color={colors.successColor}
              title="Şapak — Ykjam Terjime"
              badge="1-nji programma"
              colors={colors}
            >
              <ThemedText style={styles.sectionText}>
                Toplumyň ilkinji programmasy — 31 dilli gepleşik kitaby, tekst
                we sesli terjimeçi, AI kömekçileri.
              </ThemedText>
            </Section>

            <Section
              icon="school"
              color={colors.primaryAccentColor}
              title={APP_NAME}
              badge="2-nji programma"
              highlight
              colors={colors}
            >
              <ThemedText style={styles.sectionText}>
                Häzirki programma — hytaý dilini öwretmek üçin doly kurs.
                31 bap, 600+ gönükme, iýeroglif ýazuwy, pinýin sesleri.
              </ThemedText>
            </Section>

            <Section icon="rocket" color={colors.warningColor} title="Indiki" colors={colors}>
              <ThemedText style={styles.sectionText}>
                Toplumyň beýleki programmalary işjeň döredilýär. Iňlis dili,
                rus dili we beýleki diller boýunça programmalara garaşyň.
              </ThemedText>
            </Section>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.surfaceSecondary },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
      paddingVertical: 12,
      backgroundColor: c.surfacePrimary,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
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
      color: c.textPrimary,
    },
    scrollContent: {
      paddingHorizontal: Spacing.lg,
      paddingTop: 24,
      paddingBottom: 32,
    },

    logoContainer: {
      alignItems: "center",
      paddingVertical: 16,
      marginBottom: 24,
    },
    appBadge: {
      width: 96,
      height: 96,
      borderRadius: 24,
      overflow: "hidden",
      marginBottom: 14,
      ...Shadow.md,
    },
    appIconImg: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    appName: {
      fontFamily: FontFamily.bold,
      fontSize: 22,
      color: c.textPrimary,
      letterSpacing: -0.4,
      textAlign: "center",
    },
    versionPill: {
      marginTop: 10,
      backgroundColor: c.primaryAccentBg,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: Radius.pill,
    },
    versionPillText: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.primaryAccentColor,
      letterSpacing: 0.3,
    },

    menuContainer: {
      backgroundColor: c.surfacePrimary,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: c.borderColor,
      marginBottom: 24,
      overflow: "hidden",
      ...Shadow.sm,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
      paddingHorizontal: 14,
    },
    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    menuIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
    },
    menuIconShapak: {
      backgroundColor: "#000000",
      overflow: "hidden",
    },
    menuShapakImg: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    menuText: { flex: 1 },
    menuTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textPrimary,
    },
    menuSubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: c.subduedTextColor,
      marginTop: 2,
    },
    menuDivider: {
      height: 1,
      backgroundColor: c.divider,
      marginLeft: 70,
    },

    footer: {
      alignItems: "center",
      paddingVertical: 16,
    },
    footerText: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: c.subduedTextColor,
    },

    modalContainer: { flex: 1, backgroundColor: c.surfaceSecondary },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
      paddingVertical: 14,
      backgroundColor: c.surfacePrimary,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    modalClose: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    modalTitle: {
      flex: 1,
      fontFamily: FontFamily.bold,
      fontSize: 17,
      color: c.textPrimary,
      textAlign: "center",
    },
    modalScroll: {
      paddingHorizontal: Spacing.lg,
      paddingTop: 16,
      paddingBottom: 32,
    },

    seriesHero: {
      alignItems: "center",
      paddingVertical: 12,
      marginBottom: 16,
    },
    seriesLogo: {
      width: 240,
      height: 80,
      resizeMode: "contain",
      marginBottom: 10,
    },
    seriesTagline: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
      textAlign: "center",
      marginTop: 6,
      paddingHorizontal: 12,
      lineHeight: 18,
    },

    sectionCard: {
      backgroundColor: c.surfacePrimary,
      borderRadius: Radius.lg,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.borderColor,
    },
    sectionCardHighlight: {
      borderColor: c.primaryAccentColor,
      borderWidth: 2,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 12,
    },
    sectionTitle: {
      flex: 1,
      fontFamily: FontFamily.bold,
      fontSize: 15,
      color: c.textPrimary,
    },
    sectionBadge: {
      backgroundColor: c.primaryAccentBg,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: Radius.sm,
    },
    sectionBadgeText: {
      fontFamily: FontFamily.semibold,
      fontSize: 10,
      color: c.primaryAccentColor,
    },
    sectionText: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      lineHeight: 21,
      color: c.textSecondary,
    },
    sectionHint: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: c.subduedTextColor,
      marginTop: 10,
    },

    featureRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 6,
    },
    featureIconBox: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: c.primaryAccentBg,
      alignItems: "center",
      justifyContent: "center",
    },
    featureText: {
      flex: 1,
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: c.textPrimary,
    },

    emailBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: c.primaryAccentBg,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: Radius.md,
    },
    emailText: {
      flex: 1,
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.primaryAccentColor,
    },
    linkBtnGap: {
      marginTop: 10,
    },
  });
}