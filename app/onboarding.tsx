import { ThemedText } from "@/components/themed-text";
import { CHARACTERS } from "@/constants/CharacterAvatars";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { Events, track } from "@/lib/analytics";
import { markOnboarded } from "@/lib/onboarding";
import { setUserName } from "@/lib/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type ViewToken,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface SlideData {
  key: string;
  title: string;
  subtitle: string;
  illustration: React.ReactNode;
}

function WelcomeIllustration() {
  return (
    <View style={styles.heroCircle}>
      <Image source={CHARACTERS.aman.source} style={styles.heroImg} />
      <View style={styles.waveBadge}>
        <ThemedText style={styles.waveBadgeText}>👋</ThemedText>
      </View>
    </View>
  );
}

function StructureIllustration() {
  return (
    <View style={styles.structureGrid}>
      <View style={[styles.structureCard, { backgroundColor: Colors.primaryAccentBg }]}>
        <View style={[styles.structureIcon, { backgroundColor: Colors.primaryAccentColor }]}>
          <Ionicons name="book" size={26} color={Colors.textInverse} />
        </View>
        <ThemedText style={styles.structureLabel}>Teoriýa</ThemedText>
      </View>
      <Ionicons name="arrow-down" size={20} color={Colors.subduedTextColor} />
      <View style={[styles.structureCard, { backgroundColor: Colors.successBg }]}>
        <View style={[styles.structureIcon, { backgroundColor: Colors.successColor }]}>
          <Ionicons name="pencil" size={26} color={Colors.textInverse} />
        </View>
        <ThemedText style={styles.structureLabel}>Gönükmeler</ThemedText>
      </View>
      <Ionicons name="arrow-down" size={20} color={Colors.subduedTextColor} />
      <View style={[styles.structureCard, { backgroundColor: Colors.warningBg }]}>
        <View style={[styles.structureIcon, { backgroundColor: Colors.warningColor }]}>
          <Ionicons name="trophy" size={26} color={Colors.textInverse} />
        </View>
        <ThemedText style={styles.structureLabel}>Bap synagy</ThemedText>
      </View>
    </View>
  );
}

function GamificationIllustration() {
  return (
    <View style={styles.gameRow}>
      <View style={[styles.gameCard, { backgroundColor: Colors.warningBg }]}>
        <View style={styles.gameIconBig}>
          <Ionicons name="trophy" size={36} color={Colors.warningColor} />
        </View>
        <ThemedText style={styles.gameValue}>+10</ThemedText>
        <ThemedText style={styles.gameLabel}>XP / jogap</ThemedText>
      </View>
      <View style={[styles.gameCard, { backgroundColor: Colors.primaryAccentBg }]}>
        <View style={styles.gameIconBig}>
          <ThemedText style={{ fontSize: 36 }}>🔥</ThemedText>
        </View>
        <ThemedText style={styles.gameValue}>Streak</ThemedText>
        <ThemedText style={styles.gameLabel}>her gün</ThemedText>
      </View>
    </View>
  );
}

function ReadyIllustration() {
  return (
    <View style={styles.heroCircle}>
      <Image source={CHARACTERS.aman.source} style={styles.heroImg} />
      <View style={styles.readyBadge}>
        <Ionicons name="rocket" size={22} color={Colors.textInverse} />
      </View>
    </View>
  );
}

const SLIDES: SlideData[] = [
  {
    key: "welcome",
    title: "Salam! Men Aman 👋",
    subtitle:
      "Bu programma bilen sen hytaý dilini özbaşdak öwrenip bilersiň. Programma esasan oflaýn işleýär — sözlükler, grammatika, gönükmeler we iýeroglifler telefonyňda saklanýar. Diňe aýdylyş seslerini diňlemek üçin internet gerek bolup biler.",
    illustration: <WelcomeIllustration />,
  },
  {
    key: "structure",
    title: "Sapaklar 3 bölekden",
    subtitle:
      "Her bap üçin: ilki teoriýa (sözler, grammatika, dialoglar) → soň gönükmeler → soň özüňi syna.",
    illustration: <StructureIllustration />,
  },
  {
    key: "gamification",
    title: "XP we Streak",
    subtitle:
      "Her dogry jogap +10 XP, sapak tamamlanyşy +500 XP. Her gün bir gönükme — streak ösýär 🔥",
    illustration: <GamificationIllustration />,
  },
  {
    key: "name",
    title: "Adyňy ýaz",
    subtitle: "Aman saňa şahsy ýüzlenmek üçin adyňy bilmeli",
    illustration: <ReadyIllustration />,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const finish = async () => {
    haptics.success();
    const trimmed = nameInput.trim();
    if (trimmed.length > 0) {
      await setUserName(trimmed);
    }
    await markOnboarded();
    track(Events.OnboardingComplete);
    Keyboard.dismiss();
    router.replace("/(tabs)/lessons");
  };

  const next = () => {
    if (currentIndex < SLIDES.length - 1) {
      haptics.tap();
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      void finish();
    }
  };

  const skip = () => {
    haptics.tap();
    void finish();
  };

  const isLast = currentIndex === SLIDES.length - 1;
  const canProceed = !isLast || nameInput.trim().length > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header with skip */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
        <Pressable onPress={skip} hitSlop={12} style={styles.skipBtn}>
          <ThemedText style={styles.skipText}>Geç</ThemedText>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <View style={styles.illustrationWrap}>{item.illustration}</View>
            <ThemedText style={styles.slideTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.slideSubtitle}>{item.subtitle}</ThemedText>
            {item.key === "name" && (
              <View style={styles.nameInputWrap}>
                <TextInput
                  style={styles.nameInput}
                  placeholder="Adyňy ýaz..."
                  placeholderTextColor={Colors.subduedTextColor}
                  value={nameInput}
                  onChangeText={setNameInput}
                  autoCapitalize="words"
                  maxLength={20}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    if (nameInput.trim().length > 0) void finish();
                  }}
                />
              </View>
            )}
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        keyboardShouldPersistTaps="handled"
      />

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: 16 + insets.bottom }]}>
        <Pressable
          style={({ pressed }) => [
            styles.ctaBtn,
            !canProceed && styles.ctaBtnDisabled,
            pressed && canProceed && styles.ctaPressed,
          ]}
          onPress={canProceed ? next : undefined}
          disabled={!canProceed}
        >
          <ThemedText style={styles.ctaText}>
            {isLast ? "Başla" : "Dowam et"}
          </ThemedText>
          <Ionicons
            name={isLast ? "rocket" : "arrow-forward"}
            size={18}
            color={Colors.textInverse}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.borderColor,
  },
  dotActive: {
    backgroundColor: Colors.primaryAccentColor,
    width: 20,
  },
  skipBtn: {
    width: 60,
    alignItems: "flex-end",
  },
  skipText: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.subduedTextColor,
  },

  slide: {
    paddingHorizontal: Spacing["2xl"],
    paddingTop: 20,
    alignItems: "center",
  },
  illustrationWrap: {
    height: 260,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  slideTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    color: Colors.textPrimary,
    textAlign: "center",
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  slideSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 8,
  },

  bottomBar: {
    paddingHorizontal: Spacing["2xl"],
    paddingTop: 12,
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primaryAccentColor,
    paddingVertical: 16,
    borderRadius: Radius.lg,
    ...Shadow.md,
  },
  ctaPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  ctaBtnDisabled: { opacity: 0.4 },
  ctaText: {
    fontFamily: FontFamily.semibold,
    fontSize: 17,
    color: Colors.textInverse,
  },

  nameInputWrap: {
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  nameInput: {
    fontFamily: FontFamily.semibold,
    fontSize: 18,
    color: Colors.textPrimary,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.lg,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.borderColor,
    textAlign: "center",
  },

  /* Welcome / Ready illustrations */
  heroCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primaryAccentBg,
    borderWidth: 4,
    borderColor: Colors.primaryAccentColor,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "cover",
  },
  waveBadge: {
    position: "absolute",
    right: -8,
    bottom: -8,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surfacePrimary,
    borderWidth: 2,
    borderColor: Colors.primaryAccentColor,
    alignItems: "center",
    justifyContent: "center",
  },
  waveBadgeText: { fontSize: 28 },
  readyBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.successColor,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.surfacePrimary,
  },

  /* Structure illustration */
  structureGrid: {
    alignItems: "center",
    gap: 8,
  },
  structureCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: Radius.md,
    gap: 12,
    minWidth: 200,
  },
  structureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  structureLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  /* Gamification illustration */
  gameRow: {
    flexDirection: "row",
    gap: 14,
  },
  gameCard: {
    width: 120,
    paddingVertical: 18,
    borderRadius: Radius.lg,
    alignItems: "center",
  },
  gameIconBig: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Colors.surfacePrimary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  gameValue: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  gameLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
});
