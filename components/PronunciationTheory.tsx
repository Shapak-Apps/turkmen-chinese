import { ThemedText } from "@/components/themed-text";
import { Colors, FontFamily } from "@/constants/theme";
import {
  INTRO_TEXT,
  INITIALS,
  FINALS,
  TONES,
  TONES_DESCRIPTION,
  SOUND_CHANGES,
  SPELLING_RULES,
  SPELLING_TONE_RULES,
  DAILY_EXPRESSIONS,
  CLASSROOM_EXPRESSIONS,
  STROKES,
} from "@/assets/data/pronunciation_data";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Map of audio file requires — expo needs static requires
const audioCache: Record<string, Audio.Sound> = {};

async function playPinyin(filename: string) {
  try {
    if (audioCache[filename]) {
      await audioCache[filename].replayAsync();
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri: `https://raw.githubusercontent.com/davinfifield/mp3-chinese-pinyin-sound/master/mp3/${filename}.mp3` },
      { shouldPlay: true }
    );
    audioCache[filename] = sound;
  } catch {
    const text = filename.replace(/[0-9]/g, "");
    Speech.speak(text, { language: "zh-CN", rate: 0.8 });
  }
}

function speakChinese(text: string) {
  Speech.speak(text, { language: "zh-CN", rate: 0.8 });
}

// ── UI Components ──────────────────────────────────────────

function Body({ text }: { text: string }) {
  return <ThemedText style={s.body}>{text}</ThemedText>;
}

function AudioCell({ label, sub, onPress }: { label: string; sub?: string; onPress: () => void }) {
  return (
    <Pressable style={s.audioCell} onPress={onPress}>
      <ThemedText style={s.audioCellLabel}>{label}</ThemedText>
      {sub ? <ThemedText style={s.audioCellSub}>{sub}</ThemedText> : null}
      <Ionicons name="volume-medium-outline" size={14} color={Colors.subduedTextColor} />
    </Pressable>
  );
}

function PageWrapper({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <ScrollView style={s.pageScroll} contentContainerStyle={s.pageContent}>
      <ThemedText style={s.pageLabel}>{label}</ThemedText>
      <ThemedText style={s.pageTitle}>{title}</ThemedText>
      {children}
    </ScrollView>
  );
}

// ── Page components ───────────────────────────────────────

function IntroPage() {
  return (
    <PageWrapper label="Giriş" title="Hytaý bogny nähili gurlan">
      <Body text={INTRO_TEXT} />
      <View style={s.formulaCard}>
        <ThemedText style={s.formulaText}>声母 + 韵母 + 声调 = 音节</ThemedText>
        <ThemedText style={s.formulaSub}>initial + final + tone = syllable</ThemedText>
      </View>
    </PageWrapper>
  );
}

function InitialsPage() {
  return (
    <PageWrapper label="声母" title="21 başlangyç ses">
      <Body text="Başlangyç ses (声母) — bognuň başyndaky çekimsiz ses. Eşitmek üçin basyň." />
      {INITIALS.map((group) => (
        <View key={group.name} style={s.groupBlock}>
          <ThemedText style={s.groupName}>
            {group.name} — {group.nameEn}
          </ThemedText>
          <View style={s.cellGrid}>
            {group.initials.map((item) => (
              <AudioCell
                key={item.initial}
                label={item.initial}
                sub={item.demo}
                onPress={() => playPinyin(item.audio)}
              />
            ))}
          </View>
        </View>
      ))}
    </PageWrapper>
  );
}

function FinalsPage() {
  return (
    <PageWrapper label="韵母" title="38 soňky ses">
      <Body text="Soňlangyç ses (韵母) — bognuň çekimli bölegi. Eşitmek üçin basyň." />
      {FINALS.map((group) => (
        <View key={group.name} style={s.groupBlock}>
          <ThemedText style={s.groupName}>
            {group.name} — {group.nameEn}
          </ThemedText>
          <View style={s.cellGrid}>
            {group.finals.map((item) => (
              <AudioCell
                key={item.final}
                label={item.final}
                onPress={() => playPinyin(item.audio)}
              />
            ))}
          </View>
        </View>
      ))}
    </PageWrapper>
  );
}

function TonesPage() {
  return (
    <PageWrapper label="声调" title="4 ton">
      <Body text={TONES_DESCRIPTION} />
      <View style={s.toneTable}>
        {TONES.map((t) => (
          <Pressable key={t.tone} style={s.toneRow} onPress={() => playPinyin(t.audio)}>
            <View style={[s.toneBadge, { backgroundColor: toneColor(t.tone) }]}>
              <ThemedText style={s.toneBadgeText}>{t.tone}</ThemedText>
            </View>
            <View style={s.toneInfo}>
              <ThemedText style={s.toneDesc}>{t.description}</ThemedText>
              <ThemedText style={s.tonePitch}>({t.pitch})</ThemedText>
            </View>
            <ThemedText style={s.toneHanzi}>{t.hanzi}</ThemedText>
            <ThemedText style={s.tonePinyin}>{t.pinyin}</ThemedText>
            <ThemedText style={s.toneMeaning}>{t.meaning}</ThemedText>
            <Ionicons name="volume-medium-outline" size={16} color={Colors.subduedTextColor} />
          </Pressable>
        ))}
      </View>
    </PageWrapper>
  );
}

function SoundChangesPage() {
  return (
    <PageWrapper label="音变" title="Tonuň üýtgemegi">
      {SOUND_CHANGES.map((rule) => (
        <View key={rule.title} style={s.ruleBlock}>
          <ThemedText style={s.ruleTitle}>{rule.title}</ThemedText>
          <Body text={rule.explanation} />
          <View style={s.ruleExamples}>
            {rule.examples.map((ex, i) => (
              <Pressable key={i} style={s.ruleExRow} onPress={() => speakChinese(ex.hanzi)}>
                <ThemedText style={s.ruleExHanzi}>{ex.hanzi}</ThemedText>
                <ThemedText style={s.ruleExPinyin}>{ex.pinyin}</ThemedText>
                <ThemedText style={s.ruleExMeaning}>{ex.meaning}</ThemedText>
                <Ionicons name="volume-medium-outline" size={14} color={Colors.subduedTextColor} />
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </PageWrapper>
  );
}

function SpellingPage() {
  return (
    <PageWrapper label="拼写规则" title="Pinýin ýazuw düzgünleri">
      {SPELLING_RULES.map((r, i) => (
        <View key={i} style={s.spellingRow}>
          <ThemedText style={s.spellingRule}>{r.rule}</ThemedText>
          <ThemedText style={s.spellingExpl}>{r.explanation}</ThemedText>
        </View>
      ))}
      <View style={s.divider} />
      <ThemedText style={s.ruleTitle}>Ton belgisi nirä goýulýar?</ThemedText>
      <Body text={SPELLING_TONE_RULES} />
    </PageWrapper>
  );
}

function DailyExpressionsPage() {
  return (
    <PageWrapper label="日常用语" title="Gündelik jümleler">
      <Body text="Ilkinji günden gerek boljak 13 sany esasy jümle. Diňlemek üçin basyň." />
      <View style={s.phraseTable}>
        {DAILY_EXPRESSIONS.map((p, i) => (
          <Pressable key={i} style={s.phraseRow} onPress={() => speakChinese(p.hanzi)}>
            <ThemedText style={s.phraseHanzi}>{p.hanzi}</ThemedText>
            <ThemedText style={s.phrasePinyin}>{p.pinyin}</ThemedText>
            <ThemedText style={s.phraseMeaning}>{p.meaning}</ThemedText>
            <Ionicons name="volume-medium-outline" size={14} color={Colors.subduedTextColor} />
          </Pressable>
        ))}
      </View>
    </PageWrapper>
  );
}

function ClassroomPage() {
  return (
    <PageWrapper label="课堂用语" title="Sapakda ulanylýan sözler">
      <View style={s.phraseTable}>
        {CLASSROOM_EXPRESSIONS.map((p, i) => (
          <Pressable key={i} style={s.phraseRow} onPress={() => speakChinese(p.hanzi)}>
            <ThemedText style={s.phraseHanzi}>{p.hanzi}</ThemedText>
            <ThemedText style={s.phrasePinyin}>{p.pinyin}</ThemedText>
            <ThemedText style={s.phraseMeaning}>{p.meaning}</ThemedText>
            <Ionicons name="volume-medium-outline" size={14} color={Colors.subduedTextColor} />
          </Pressable>
        ))}
      </View>
    </PageWrapper>
  );
}

function StrokesPage() {
  return (
    <PageWrapper label="汉字笔画表" title="Iýeroglif çyzyklarynyň tablisasy">
      <Body text="Her iýeroglif çyzyklardan durýar. Ine, esasy görnüşleri:" />
      <View style={s.strokeGrid}>
        {STROKES.map((st, i) => (
          <View key={i} style={s.strokeCell}>
            <ThemedText style={s.strokeChar}>{st.stroke}</ThemedText>
            <ThemedText style={s.strokeName}>{st.name}</ThemedText>
            <ThemedText style={s.strokePinyin}>{st.pinyin}</ThemedText>
          </View>
        ))}
      </View>
    </PageWrapper>
  );
}

// ── Main Component ─────────────────────────────────────────

const PAGES: { key: string; render: () => React.ReactNode }[] = [
  { key: "intro", render: () => <IntroPage /> },
  { key: "initials", render: () => <InitialsPage /> },
  { key: "finals", render: () => <FinalsPage /> },
  { key: "tones", render: () => <TonesPage /> },
  { key: "sound-changes", render: () => <SoundChangesPage /> },
  { key: "spelling", render: () => <SpellingPage /> },
  { key: "daily", render: () => <DailyExpressionsPage /> },
  { key: "classroom", render: () => <ClassroomPage /> },
  { key: "strokes", render: () => <StrokesPage /> },
];

export default function PronunciationTheory() {
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
    if (index >= 0 && index < PAGES.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={PAGES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH }}>{item.render()}</View>
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
      <View style={[s.bottomNav, { paddingBottom: 12 + insets.bottom }]}>
        <Pressable
          style={[s.navButton, currentPage === 0 && s.navButtonDisabled]}
          onPress={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={currentPage === 0 ? Colors.borderColorStrong : Colors.primaryAccentColor}
          />
          <ThemedText style={[s.navButtonText, currentPage === 0 && s.navButtonTextDisabled]}>
            Yza
          </ThemedText>
        </Pressable>

        <View style={s.pageIndicator}>
          <ThemedText style={s.pageNumber}>
            {currentPage + 1} / {PAGES.length}
          </ThemedText>
          <View style={s.dots}>
            {PAGES.map((_, i) => (
              <View key={i} style={[s.dot, i === currentPage && s.dotActive]} />
            ))}
          </View>
        </View>

        <Pressable
          style={[s.navButton, currentPage === PAGES.length - 1 && s.navButtonDisabled]}
          onPress={() => goTo(currentPage + 1)}
          disabled={currentPage === PAGES.length - 1}
        >
          <ThemedText
            style={[
              s.navButtonText,
              currentPage === PAGES.length - 1 && s.navButtonTextDisabled,
            ]}
          >
            Öňe
          </ThemedText>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentPage === PAGES.length - 1 ? Colors.borderColorStrong : Colors.primaryAccentColor}
          />
        </Pressable>
      </View>
    </View>
  );
}

function toneColor(tone: string) {
  switch (tone) {
    case "1": return Colors.primaryAccentColor;
    case "2": return Colors.successColor;
    case "3": return "#1D4ED8";
    case "4": return "#7C3AED";
    default: return Colors.subduedTextColor;
  }
}

// ── Styles ─────────────────────────────────────────────────

const s = StyleSheet.create({
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

  formulaCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.primaryAccentBg,
    marginVertical: 8,
  },
  formulaText: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
  },
  formulaSub: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginTop: 4,
  },

  groupBlock: { marginBottom: 16 },
  groupName: {
    fontFamily: FontFamily.semibold,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  cellGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },

  audioCell: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    minWidth: 64,
    gap: 2,
  },
  audioCellLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.primaryAccentColor,
  },
  audioCellSub: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  toneTable: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 8,
  },
  toneRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 8,
  },
  toneBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  toneBadgeText: {
    fontFamily: FontFamily.bold,
    color: Colors.textInverse,
    fontSize: 13,
  },
  toneInfo: { flex: 1 },
  toneDesc: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  tonePitch: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.subduedTextColor,
  },
  toneHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
    width: 30,
    textAlign: "center",
  },
  tonePinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textPrimary,
    width: 40,
  },
  toneMeaning: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.subduedTextColor,
    width: 56,
    textAlign: "right",
  },

  ruleBlock: {
    marginBottom: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.warningBg,
  },
  ruleTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  ruleExamples: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.surfacePrimary,
  },
  ruleExRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 8,
  },
  ruleExHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.primaryAccentColor,
    width: 50,
  },
  ruleExPinyin: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  ruleExMeaning: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },

  spellingRow: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 8,
  },
  spellingRule: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: Colors.primaryAccentColor,
    marginBottom: 4,
  },
  spellingExpl: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: 16 },

  phraseTable: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  phraseRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: 6,
  },
  phraseHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.primaryAccentColor,
    width: 90,
  },
  phrasePinyin: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  phraseMeaning: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    textAlign: "right",
  },

  strokeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  strokeCell: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    width: "22%",
  },
  strokeChar: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: Colors.primaryAccentColor,
  },
  strokeName: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  strokePinyin: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.subduedTextColor,
  },

  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
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
});
