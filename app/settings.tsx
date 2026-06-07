import { ThemedText } from "@/components/themed-text";
import { Colors, FontFamily, Radius, Spacing } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
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
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Sazlamalar</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {!loaded ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.primaryAccentColor} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText style={styles.sectionTitle}>Hiýeroglif ýazuwy</ThemedText>

          <View style={styles.settingBlock}>
            <ThemedText style={styles.settingLabel}>Gatylyk</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Ýazuwyňyzyň näçe takyk barlanmalydygy
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
                color={Colors.primaryAccentColor}
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
              color={Colors.subduedTextColor}
            />
          </Pressable>
        </ScrollView>
      )}
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
    color: Colors.subduedTextColor,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 4,
  },
  settingBlock: {
    backgroundColor: Colors.surfacePrimary,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 16,
    marginBottom: 14,
  },
  settingLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginBottom: 14,
    lineHeight: 18,
  },
  segmented: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceTertiary,
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
    backgroundColor: Colors.primaryAccentColor,
  },
  segmentText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  segmentTextActive: {
    fontFamily: FontFamily.semibold,
    color: Colors.textInverse,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surfacePrimary,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    gap: 12,
  },
  actionRowPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryAccentBg,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  actionSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
});
