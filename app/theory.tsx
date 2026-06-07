import { ThemedText } from "@/components/themed-text";
import { getChapterSpeakers, type Character } from "@/constants/CharacterAvatars";
import { COURSE_DATA } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import {
  THEORY_DATA,
  type DialogueLine,
  type GrammarExample,
  type TheoryChapter,
  type TheoryWord,
} from "@/assets/data/theory_content";
import PronunciationTheory from "@/components/PronunciationTheory";
import StrokeOrderModal from "@/components/StrokeOrderModal";
import { haptics } from "@/lib/haptics";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Speech from "expo-speech";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ViewToken,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function speak(text: string) {
  Speech.speak(text, { language: "zh-CN", rate: 0.8 });
}

// --- Page content components ---

function IntroductionPage({ theory, chapterId }: { theory: TheoryChapter; chapterId: number }) {
  return (
    <ScrollView style={styles.pageScroll} contentContainerStyle={styles.pageContent}>
      <ThemedText style={styles.pageLabel}>Giriş</ThemedText>
      <ThemedText style={styles.pageTitle}>Sapak {chapterId}</ThemedText>
      <ThemedText style={styles.body}>{theory.introduction}</ThemedText>
    </ScrollView>
  );
}

function VocabularyPage({ vocabulary }: { vocabulary: TheoryWord[] }) {
  const [strokeChars, setStrokeChars] = useState<string[] | null>(null);

  return (
    <ScrollView style={styles.pageScroll} contentContainerStyle={styles.pageContent}>
      <ThemedText style={styles.pageLabel}>Täze sözler</ThemedText>
      <ThemedText style={styles.pageTitle}>词语表</ThemedText>
      <View style={styles.wordTable}>
        {vocabulary.map((word, i) => (
          <View key={i} style={styles.wordRow}>
            <Pressable style={styles.wordTextArea} onPress={() => speak(word.hanzi)}>
              <ThemedText style={styles.wordHanzi}>{word.hanzi}</ThemedText>
              <ThemedText style={styles.wordPinyin}>{word.pinyin}</ThemedText>
              <ThemedText style={styles.wordTranslation}>{word.translation}</ThemedText>
            </Pressable>
            <Pressable onPress={() => speak(word.hanzi)} hitSlop={8} accessibilityRole="button" accessibilityLabel={T.a11y.playAudio}>
              <Ionicons name="volume-medium-outline" size={18} color={Colors.subduedTextColor} />
            </Pressable>
            <Pressable
              onPress={() => setStrokeChars([...word.hanzi])}
              hitSlop={8}
              style={styles.strokeButton}
              accessibilityRole="button"
              accessibilityLabel={T.a11y.strokeOrder}
            >
              <Ionicons name="brush-outline" size={18} color={Colors.primaryAccentColor} />
            </Pressable>
          </View>
        ))}
      </View>

      <StrokeOrderModal
        visible={strokeChars !== null}
        characters={strokeChars ?? []}
        onClose={() => setStrokeChars(null)}
      />
    </ScrollView>
  );
}

function GrammarPage({ rule }: { rule: { title: string; explanation: string; examples: GrammarExample[] } }) {
  return (
    <ScrollView style={styles.pageScroll} contentContainerStyle={styles.pageContent}>
      <ThemedText style={styles.pageLabel}>Grammatika</ThemedText>
      <ThemedText style={styles.pageTitle}>{rule.title}</ThemedText>
      <ThemedText style={styles.body}>{rule.explanation}</ThemedText>
      {rule.examples.length > 0 && (
        <View style={styles.examplesContainer}>
          {rule.examples.map((ex, j) => (
            <Pressable key={j} style={styles.exampleRow} onPress={() => speak(ex.hanzi)}>
              <View style={styles.exampleTextCol}>
                <ThemedText style={styles.exampleHanzi}>{ex.hanzi}</ThemedText>
                <ThemedText style={styles.examplePinyin}>{ex.pinyin}</ThemedText>
                <ThemedText style={styles.exampleTranslation}>{ex.translation}</ThemedText>
              </View>
              <Ionicons name="volume-medium-outline" size={16} color={Colors.subduedTextColor} />
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function DialoguePage({
  dialogue,
  chapterId,
}: {
  dialogue: { title: string; lines: DialogueLine[] };
  chapterId: number;
}) {
  const [speakerA, speakerB] = getChapterSpeakers(chapterId);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
      Speech.stop();
    };
  }, []);

  const playLine = (index: number, onDone?: () => void) => {
    setCurrentIndex(index);
    Speech.speak(dialogue.lines[index].hanzi, {
      language: "zh-CN",
      rate: 0.8,
      onDone: () => onDone?.(),
      onStopped: () => onDone?.(),
      onError: () => onDone?.(),
    });
  };

  const stopAll = () => {
    cancelRef.current = true;
    Speech.stop();
    setIsPlaying(false);
    setCurrentIndex(null);
  };

  const playAll = () => {
    if (isPlaying) {
      stopAll();
      return;
    }
    haptics.tap();
    cancelRef.current = false;
    setIsPlaying(true);

    const playNext = (idx: number) => {
      if (cancelRef.current || idx >= dialogue.lines.length) {
        setIsPlaying(false);
        setCurrentIndex(null);
        return;
      }
      playLine(idx, () => {
        if (cancelRef.current) {
          setIsPlaying(false);
          setCurrentIndex(null);
          return;
        }
        setTimeout(() => playNext(idx + 1), 450);
      });
    };

    playNext(0);
  };

  const playSingle = (index: number) => {
    if (isPlaying) return;
    haptics.tap();
    Speech.stop();
    playLine(index, () => setCurrentIndex(null));
  };

  const currentLine =
    currentIndex !== null ? dialogue.lines[currentIndex] : null;

  return (
    <View style={{ flex: 1 }}>
    <ScrollView
      style={styles.pageScroll}
      contentContainerStyle={[
        styles.pageContent,
        isPlaying && { paddingBottom: 130 },
      ]}
    >
      <ThemedText style={styles.pageLabel}>Dialog</ThemedText>
      <View style={styles.dialogueTitleRow}>
        <ThemedText style={styles.pageTitleInline}>{dialogue.title}</ThemedText>
        <Pressable
          style={[styles.playAllBtn, isPlaying && styles.playAllBtnActive]}
          onPress={playAll}
          hitSlop={10}
        >
          <Ionicons
            name={isPlaying ? "stop" : "play"}
            size={14}
            color={Colors.textInverse}
          />
          <ThemedText style={styles.playAllBtnText}>
            {isPlaying ? "Dur" : "Diňle"}
          </ThemedText>
        </Pressable>
      </View>

      {/* Character intro chips */}
      <View style={styles.charactersRow}>
        <CharacterChip character={speakerA} side="A" />
        <CharacterChip character={speakerB} side="B" />
      </View>

      <View style={styles.bubbleContainer}>
        {dialogue.lines.map((line, j) => {
          const isA = line.speaker === "A";
          const isActive = currentIndex === j;
          const speaker = isA ? speakerA : speakerB;

          return (
            <View
              key={j}
              style={[
                styles.bubbleRow,
                isA ? styles.bubbleRowLeft : styles.bubbleRowRight,
              ]}
            >
              {isA && (
                <View style={[styles.avatarCircle, styles.avatarCircleA]}>
                  <Image source={speaker.source} style={styles.avatarImage} />
                </View>
              )}
              <Pressable
                style={[
                  styles.bubble,
                  isA ? styles.bubbleA : styles.bubbleB,
                  isActive && styles.bubbleActive,
                ]}
                onPress={() => playSingle(j)}
              >
                <View style={styles.bubbleHeader}>
                  <ThemedText style={styles.bubbleHanzi}>{line.hanzi}</ThemedText>
                  <Ionicons
                    name={isActive ? "volume-high" : "volume-medium-outline"}
                    size={14}
                    color={isA ? Colors.successColorDark : Colors.primaryAccentColorDark}
                  />
                </View>
                <ThemedText
                  style={[
                    styles.bubblePinyin,
                    isA ? styles.bubblePinyinA : styles.bubblePinyinB,
                  ]}
                >
                  {line.pinyin}
                </ThemedText>
                <ThemedText
                  style={[
                    styles.bubbleTranslation,
                    isA ? styles.bubbleTranslationA : styles.bubbleTranslationB,
                  ]}
                >
                  {line.translation}
                </ThemedText>
              </Pressable>
              {!isA && (
                <View style={[styles.avatarCircle, styles.avatarCircleB]}>
                  <Image source={speaker.source} style={styles.avatarImage} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>

    {/* Closed captions during auto-play */}
    {isPlaying && currentLine && (
      <View style={styles.captionBar}>
        <View style={styles.captionLabel}>
          <Ionicons name="volume-high" size={12} color={Colors.textInverse} />
          <ThemedText style={styles.captionLabelText}>
            {currentLine.speaker === "A"
              ? speakerA.hanzi || "A"
              : speakerB.hanzi || "B"}
          </ThemedText>
        </View>
        <ThemedText style={styles.captionPinyin} numberOfLines={2}>
          {currentLine.pinyin}
        </ThemedText>
        <ThemedText style={styles.captionHanzi} numberOfLines={1}>
          {currentLine.hanzi}
        </ThemedText>
      </View>
    )}
    </View>
  );
}

function CharacterChip({
  character,
  side,
}: {
  character: Character;
  side: "A" | "B";
}) {
  if (!character.hanzi && !character.displayName) return null;
  return (
    <View
      style={[
        styles.charChip,
        side === "A" ? styles.charChipA : styles.charChipB,
      ]}
    >
      <View
        style={[
          styles.charChipAvatar,
          side === "A" ? styles.charChipAvatarA : styles.charChipAvatarB,
        ]}
      >
        <Image source={character.source} style={styles.charChipAvatarImage} />
      </View>
      <View style={{ flex: 1 }}>
        {character.hanzi ? (
          <ThemedText style={styles.charChipHanzi}>{character.hanzi}</ThemedText>
        ) : null}
        {character.pinyin ? (
          <ThemedText style={styles.charChipPinyin}>{character.pinyin}</ThemedText>
        ) : null}
      </View>
    </View>
  );
}

function TipsPage({ tips }: { tips: string[] }) {
  return (
    <ScrollView style={styles.pageScroll} contentContainerStyle={styles.pageContent}>
      <ThemedText style={styles.pageLabel}>Maslahatlar</ThemedText>
      <ThemedText style={styles.pageTitle}>Советы</ThemedText>
      {tips.map((tip, i) => (
        <ThemedText key={i} style={styles.tipItem}>
          {tip}
        </ThemedText>
      ))}
    </ScrollView>
  );
}

// --- Build pages array from theory data ---

type PageData =
  | { type: "intro"; theory: TheoryChapter; chapterId: number }
  | { type: "vocabulary"; vocabulary: TheoryWord[] }
  | { type: "grammar"; rule: { title: string; explanation: string; examples: GrammarExample[] } }
  | { type: "dialogue"; dialogue: { title: string; lines: DialogueLine[] }; chapterId: number }
  | { type: "tips"; tips: string[] };

function buildPages(theory: TheoryChapter, chapterId: number): PageData[] {
  const pages: PageData[] = [];

  pages.push({ type: "intro", theory, chapterId });
  pages.push({ type: "vocabulary", vocabulary: theory.vocabulary });

  for (const rule of theory.grammar) {
    pages.push({ type: "grammar", rule });
  }

  for (const dialogue of theory.dialogues) {
    pages.push({ type: "dialogue", dialogue, chapterId });
  }

  if (theory.tips.length > 0) {
    pages.push({ type: "tips", tips: theory.tips });
  }

  return pages;
}

function renderPage(page: PageData) {
  switch (page.type) {
    case "intro":
      return <IntroductionPage theory={page.theory} chapterId={page.chapterId} />;
    case "vocabulary":
      return <VocabularyPage vocabulary={page.vocabulary} />;
    case "grammar":
      return <GrammarPage rule={page.rule} />;
    case "dialogue":
      return <DialoguePage dialogue={page.dialogue} chapterId={page.chapterId} />;
    case "tips":
      return <TipsPage tips={page.tips} />;
  }
}

// --- Main pager component ---

function TheoryPager({ theory, chapterId }: { theory: TheoryChapter; chapterId: number }) {
  const pages = buildPages(theory, chapterId);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentPage(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const goTo = (index: number) => {
    if (index >= 0 && index < pages.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH }}>{renderPage(item)}</View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Bottom navigation */}
      <View style={[styles.bottomNav, { paddingBottom: 12 + insets.bottom }]}>
        {/* Yza button */}
        <Pressable
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
          onPress={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={currentPage === 0 ? Colors.borderColorStrong : Colors.primaryAccentColor}
          />
          <ThemedText
            style={[styles.navButtonText, currentPage === 0 && styles.navButtonTextDisabled]}
          >
            Yza
          </ThemedText>
        </Pressable>

        {/* Page indicator */}
        <View style={styles.pageIndicator}>
          <ThemedText style={styles.pageNumber}>
            {currentPage + 1} / {pages.length}
          </ThemedText>
          <View style={styles.dots}>
            {pages.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === currentPage && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Öňe button */}
        <Pressable
          style={[styles.navButton, currentPage === pages.length - 1 && styles.navButtonDisabled]}
          onPress={() => goTo(currentPage + 1)}
          disabled={currentPage === pages.length - 1}
        >
          <ThemedText
            style={[
              styles.navButtonText,
              currentPage === pages.length - 1 && styles.navButtonTextDisabled,
            ]}
          >
            Öňe
          </ThemedText>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentPage === pages.length - 1 ? Colors.borderColorStrong : Colors.primaryAccentColor}
          />
        </Pressable>
      </View>
    </View>
  );
}

// --- Placeholder for chapters without theory ---

function Placeholder({ chapterId, title }: { chapterId: number; title: string }) {
  return (
    <View style={styles.placeholderContainer}>
      <Ionicons name="book-outline" size={56} color={Colors.borderColorStrong} />
      <ThemedText style={styles.placeholderTitle}>
        Sapak {chapterId}: {title}
      </ThemedText>
      <ThemedText style={styles.placeholderText}>
        {T.screen.theoryPlaceholder}
      </ThemedText>
    </View>
  );
}

// --- Main screen ---

export default function TheoryScreen() {
  const { chapterId } = useLocalSearchParams<{ chapterId: string }>();
  const id = chapterId != null ? Number(chapterId) : 1;

  const chapter = COURSE_DATA.chapters.find((ch) => ch.id === id);

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>{T.screen.chapterNotFound}</ThemedText>
      </SafeAreaView>
    );
  }

  const theory = THEORY_DATA[id];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>{T.screen.theoryTitle}</ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Sapak {chapter.id}: {chapter.title}
          </ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      {id === 0 ? (
        <PronunciationTheory />
      ) : theory ? (
        <TheoryPager theory={theory} chapterId={id} />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Placeholder chapterId={chapter.id} title={chapter.title} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitleContainer: { flex: 1, alignItems: "center" },
  headerTitle: { fontFamily: FontFamily.bold, fontSize: 18, color: Colors.textPrimary },
  headerSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },

  pageScroll: { flex: 1 },
  pageContent: { padding: 20, paddingBottom: 20 },
  pageLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 12,
    color: Colors.primaryAccentColor,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  pageTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.4,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
    marginBottom: 12,
  },

  wordTable: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 8,
  },
  wordTextArea: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  wordHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
    width: 60,
  },
  wordPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textPrimary,
    width: 80,
  },
  wordTranslation: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  strokeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryAccentBg,
    alignItems: "center",
    justifyContent: "center",
  },

  examplesContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.surfaceSecondary,
    marginTop: 12,
  },
  exampleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 8,
  },
  exampleTextCol: { flex: 1 },
  exampleHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 19,
    color: Colors.primaryAccentColor,
  },
  examplePinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textPrimary,
    marginTop: 3,
  },
  exampleTranslation: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },

  dialogueTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  pageTitleInline: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.3,
    color: Colors.textPrimary,
  },
  playAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.successColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  playAllBtnActive: {
    backgroundColor: Colors.primaryAccentColor,
  },
  playAllBtnText: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.textInverse,
  },

  charactersRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  charChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 14,
    gap: 8,
  },
  charChipA: { backgroundColor: Colors.successBg },
  charChipB: { backgroundColor: Colors.primaryAccentBg },
  charChipAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  charChipAvatarA: { backgroundColor: Colors.successColor + "30" },
  charChipAvatarB: { backgroundColor: Colors.primaryAccentColor + "20" },
  charChipHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  charChipPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.subduedTextColor,
  },

  bubbleContainer: { gap: 12 },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  bubbleRowLeft: {
    justifyContent: "flex-start",
  },
  bubbleRowRight: {
    justifyContent: "flex-end",
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 2,
  },
  avatarCircleA: { backgroundColor: Colors.successColor + "25" },
  avatarCircleB: { backgroundColor: Colors.primaryAccentColor + "20" },
  avatarImage: { width: "100%", height: "100%", resizeMode: "cover" },
  charChipAvatarImage: { width: "100%", height: "100%", resizeMode: "cover" },

  captionBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: Colors.textPrimary,
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10,
  },
  captionLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: Colors.primaryAccentColor,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginBottom: 6,
  },
  captionLabelText: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.textInverse,
  },
  captionPinyin: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.textInverse,
    letterSpacing: -0.3,
  },
  captionHanzi: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  bubble: {
    maxWidth: "78%",
    padding: 12,
    borderRadius: 18,
  },
  bubbleA: {
    backgroundColor: Colors.successBg,
    borderBottomLeftRadius: 4,
  },
  bubbleB: {
    backgroundColor: Colors.primaryAccentBg,
    borderBottomRightRadius: 4,
  },
  bubbleActive: {
    borderWidth: 2,
    borderColor: Colors.warningColor,
  },
  bubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bubbleHanzi: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 19,
    lineHeight: 26,
    color: Colors.textPrimary,
  },
  bubblePinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    marginTop: 4,
  },
  bubblePinyinA: { color: Colors.successColorDark },
  bubblePinyinB: { color: Colors.primaryAccentColorDark },
  bubbleTranslation: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    marginTop: 4,
  },
  bubbleTranslationA: { color: Colors.textSecondary },
  bubbleTranslationB: { color: Colors.textSecondary },

  tipItem: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 10,
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.successColor,
    paddingVertical: 4,
  },

  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.surfacePrimary,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 4,
  },
  navButtonDisabled: { opacity: 0.4 },
  navButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.primaryAccentColor,
  },
  navButtonTextDisabled: { color: Colors.borderColorStrong },
  pageIndicator: { alignItems: "center", gap: 6 },
  pageNumber: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.borderColorStrong },
  dotActive: { backgroundColor: Colors.primaryAccentColor, width: 20 },

  placeholderContainer: { alignItems: "center", gap: 14 },
  placeholderTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.textPrimary,
    textAlign: "center",
  },
  placeholderText: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: Colors.subduedTextColor,
    textAlign: "center",
    lineHeight: 22,
  },
});
