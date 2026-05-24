import { ThemedText } from "@/components/themed-text";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Hoş geldiňiz</ThemedText>
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
          <View style={[styles.iconContainer, { backgroundColor: Colors.primaryAccentBg }]}>
            <Ionicons name="information-circle-outline" size={26} color={Colors.primaryAccentColor} />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>Programma hakynda</ThemedText>
            <ThemedText style={styles.cardSubtitle}>
              Nädip ulanmaly, sapaklaryň gurluşy
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => router.push("/about-chinese")}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.successBg }]}>
            <Ionicons name="language-outline" size={26} color={Colors.successColor} />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>Hytaý dili hakynda</ThemedText>
            <ThemedText style={styles.cardSubtitle}>
              Mandarin, tonlar, pinýin, öwrenmegiň ýollary
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.subduedTextColor} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: Colors.primaryAccentBg,
    borderWidth: 2,
    borderColor: Colors.primaryAccentColor,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  amanImg: { width: "100%", height: "100%", resizeMode: "cover" },
  amanText: { flex: 1 },
  amanGreeting: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  amanSub: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
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
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
});
