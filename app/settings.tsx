import { ThemedText } from "@/components/themed-text";
import { FontFamily, Radius, Spacing, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { exportProgress, importProgress } from "@/lib/backup";
import { haptics } from "@/lib/haptics";
import { syncStreakReminder } from "@/lib/notifications";
import { resetOnboarding } from "@/lib/onboarding";
import {
  HintThreshold,
  Leniency,
  StrokeMode,
  useSettings,
} from "@/lib/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { T } from "@/lib/strings";
import { router } from "expo-router";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo } from "react";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.segmented}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.segment, active && styles.segmentActive]}
          >
            <ThemedText style={[styles.segmentText, active && styles.segmentTextActive]}>
              {opt.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { settings, updateSetting, loaded } = useSettings();

  const leniencyOptions: Option<Leniency>[] = [
    { value: "easy", label: "Aňsat" },
    { value: "medium", label: "Orta" },
    { value: "hard", label: "Kyn" },
  ];

  const hintOptions: Option<HintThreshold>[] = [
    { value: "3", label: "3 ýalňyş" },
    { value: "5", label: "5 ýalňyş" },
    { value: "never", label: "Görkezme" },
  ];

  const modeOptions: Option<StrokeMode>[] = [
    { value: "learn", label: "Öwrenmek" },
    { value: "test", label: "Synag" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Sazlamalar</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {!loaded ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primaryAccentColor} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText style={styles.sectionTitle}>Iýeroglif ýazuwy</ThemedText>

          <View style={styles.settingBlock}>
            <ThemedText style={styles.settingLabel}>Gatylyk</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Ýazuwyňyň näçe takyk barlanmalydygy
            </ThemedText>
            <Segmented
              options={leniencyOptions}
              value={settings.strokeLeniency}
              onChange={(v) => updateSetting("strokeLeniency", v)}
            />
          </View>

          <View style={styles.settingBlock}>
            <ThemedText style={styles.settingLabel}>Kömek görkez</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Näçe ýalňyşdan soň dogry çyzyk görkezilsin
            </ThemedText>
            <Segmented
              options={hintOptions}
              value={settings.hintThreshold}
              onChange={(v) => updateSetting("hintThreshold", v)}
            />
          </View>

          <View style={styles.settingBlock}>
            <ThemedText style={styles.settingLabel}>Režim</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Öwrenmek: ýalňyşlar petiklemeýär. Synag: köp ýalňyş = gönükme geçilmedi
            </ThemedText>
            <Segmented
              options={modeOptions}
              value={settings.strokeMode}
              onChange={(v) => updateSetting("strokeMode", v)}
            />
          </View>

          <ThemedText style={[styles.sectionTitle, { marginTop: 12 }]}>
            Ýatlatmalar
          </ThemedText>
          <View style={styles.toggleRow}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <ThemedText style={styles.settingLabel}>Gündelik ýatlatma</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Her gün streagyňy dowam etmegi ýatladýar
              </ThemedText>
            </View>
            <Switch
              value={settings.remindersEnabled}
              onValueChange={(v) => {
                haptics.tap();
                updateSetting("remindersEnabled", v);
                void syncStreakReminder(v);
              }}
              trackColor={{
                true: colors.primaryAccentColor,
                false: colors.borderColorStrong,
              }}
              thumbColor={colors.surfacePrimary}
            />
          </View>

          <ThemedText style={[styles.sectionTitle, { marginTop: 12 }]}>
            Maglumatlar
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.actionRow,
              pressed && styles.actionRowPressed,
            ]}
            onPress={async () => {
              haptics.tap();
              const r = await exportProgress(new Date().toISOString());
              if (!r.ok && r.reason !== "cancelled") {
                Alert.alert(T.backup.failed);
              }
            }}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="download-outline"
                size={22}
                color={colors.primaryAccentColor}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.actionTitle}>{T.backup.exportTitle}</ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                {T.backup.exportSubtitle}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.actionRow,
              pressed && styles.actionRowPressed,
            ]}
            onPress={async () => {
              haptics.tap();
              const r = await importProgress();
              if (r.ok) Alert.alert(T.backup.importDone);
              else if (r.reason !== "cancelled") Alert.alert(T.backup.failed);
            }}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="cloud-upload-outline"
                size={22}
                color={colors.primaryAccentColor}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.actionTitle}>{T.backup.importTitle}</ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                {T.backup.importSubtitle}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.subduedTextColor} />
          </Pressable>

          <ThemedText style={[styles.sectionTitle, { marginTop: 12 }]}>
            Beýleki
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.actionRow,
              pressed && styles.actionRowPressed,
            ]}
            onPress={async () => {
              haptics.tap();
              await resetOnboarding();
              router.replace("/onboarding");
            }}
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="play-circle-outline"
                size={22}
                color={colors.primaryAccentColor}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.actionTitle}>
                Tanyşlygy täzeden görkez
              </ThemedText>
              <ThemedText style={styles.actionSubtitle}>
                4 sahypalyk programma syny
              </ThemedText>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.subduedTextColor}
            />
          </Pressable>
        </ScrollView>
      )}
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
    loading: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    scrollContent: {
      padding: Spacing.lg,
      paddingBottom: 40,
    },
    sectionTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.subduedTextColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 12,
      marginTop: 4,
    },
    settingBlock: {
      backgroundColor: c.surfacePrimary,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: c.borderColor,
      padding: 16,
      marginBottom: 14,
    },
    toggleRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: c.surfacePrimary,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: c.borderColor,
      padding: 16,
      marginBottom: 14,
    },
    settingLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 16,
      color: c.textPrimary,
      marginBottom: 4,
    },
    settingDescription: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
      marginBottom: 14,
      lineHeight: 18,
    },
    segmented: {
      flexDirection: "row",
      backgroundColor: c.surfaceTertiary,
      borderRadius: Radius.md,
      padding: 3,
      gap: 3,
    },
    segment: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: Radius.sm,
    },
    segmentActive: {
      backgroundColor: c.primaryAccentColor,
    },
    segmentText: {
      fontFamily: FontFamily.medium,
      fontSize: 14,
      color: c.textSecondary,
    },
    segmentTextActive: {
      fontFamily: FontFamily.semibold,
      color: c.textInverse,
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: Radius.lg,
      backgroundColor: c.surfacePrimary,
      borderWidth: 1,
      borderColor: c.borderColor,
      gap: 12,
    },
    actionRowPressed: {
      backgroundColor: c.surfaceSecondary,
    },
    actionIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: c.primaryAccentBg,
      alignItems: "center",
      justifyContent: "center",
    },
    actionTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textPrimary,
    },
    actionSubtitle: {
      fontFamily: FontFamily.regular,
      fontSize: 12,
      color: c.subduedTextColor,
      marginTop: 2,
    },
  });
}
