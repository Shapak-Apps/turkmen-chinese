import { ThemedText } from "@/components/themed-text";
import { Colors, FontFamily } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function PageWrapper({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollView style={styles.pageScroll} contentContainerStyle={styles.pageContent}>
      <ThemedText style={styles.pageLabel}>{label}</ThemedText>
      <ThemedText style={styles.pageTitle}>{title}</ThemedText>
      {children}
    </ScrollView>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={22} color={Colors.primaryAccentColor} />
      </View>
      <View style={styles.featureContent}>
        <ThemedText style={styles.featureTitle}>{title}</ThemedText>
        <ThemedText style={styles.featureDesc}>{desc}</ThemedText>
      </View>
    </View>
  );
}

function StepRow({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepNum}>
        <ThemedText style={styles.stepNumText}>{n}</ThemedText>
      </View>
      <View style={styles.stepContent}>
        <ThemedText style={styles.stepTitle}>{title}</ThemedText>
        <ThemedText style={styles.stepDesc}>{desc}</ThemedText>
      </View>
    </View>
  );
}

// ── Pages ───────────────────────────────────────────────────

function WelcomePage() {
  return (
    <PageWrapper label="Salam" title="Programma hakynda">
      <ThemedText style={styles.body}>
        Bu programma türkmen dilinde gepleýänler üçin hytaý dilini öwretmek üçin döredildi. Maksadymyz — sada we düşnükli ýol bilen başlangyç derejäni özleşdirmek.
      </ThemedText>
      <ThemedText style={styles.body}>
        Programma doly oflaýn işleýär — internet gerek däl. Ähli sözlükler, grammatika, sesler we hiýeroglifler telefonyňyzda saklanýar.
      </ThemedText>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <ThemedText style={styles.statValue}>31</ThemedText>
          <ThemedText style={styles.statLabel}>bap</ThemedText>
        </View>
        <View style={styles.statBox}>
          <ThemedText style={styles.statValue}>600+</ThemedText>
          <ThemedText style={styles.statLabel}>gönükme</ThemedText>
        </View>
        <View style={styles.statBox}>
          <ThemedText style={styles.statValue}>768</ThemedText>
          <ThemedText style={styles.statLabel}>hiýeroglif</ThemedText>
        </View>
        <View style={styles.statBox}>
          <ThemedText style={styles.statValue}>1632</ThemedText>
          <ThemedText style={styles.statLabel}>pinýin sesi</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.body}>
        Esasy pelsepe: ilki teoriýa (sözler, grammatika, dialoglar), soň gönükmeler, soň synag. Ýalňyşlyk — öwrenmegiň bir bölegi, basyşsyz, asuda öwreniň.
      </ThemedText>
    </PageWrapper>
  );
}

function MainScreenPage() {
  return (
    <PageWrapper label="Esasy ekran" title="Üç plitka">
      <ThemedText style={styles.body}>
        Programmany açanyňyzda «Hytaý dilini öwreniň» ekrany peýda bolar. Onda üç plitka bar:
      </ThemedText>

      <FeatureCard
        icon="hand-left-outline"
        title="Hoş geldiňiz"
        desc="Programma hakynda we hytaý dili hakynda umumy maglumat. Täze öwrenip başlaýanlar üçin başlangyç nokat."
      />
      <FeatureCard
        icon="book-outline"
        title="Sapaklar"
        desc="31 bapyň doly sanawy. Her bap üçin teoriýa, gönükmeler we synag bar."
      />
      <FeatureCard
        icon="settings-outline"
        title="Sazlamalar"
        desc="Hiýeroglif ýazuwynyň gatylygy, kömek, režim. Şahsy tertibiňize sazlap bolýar."
      />

      <ThemedText style={styles.body}>
        Plitka basyň — degişli bölüm açylar. Ýokarda «Yza» ok bilen yzyna gaýtmak mümkin.
      </ThemedText>
    </PageWrapper>
  );
}

function ChaptersPage() {
  return (
    <PageWrapper label="Sapaklar" title="31 bap">
      <ThemedText style={styles.body}>
        Sapaklar Boya Chinese Elementary I okuw kitabynyň gurluşy boýunça düzüldi. Her bap belli bir tema bagyşlanan: salamlaşmak, ýaşaýyş, wagt, maşgala, söwda we beýlekiler.
      </ThemedText>

      <View style={styles.chapterCard}>
        <ThemedText style={styles.chapterBadge}>0-njy bap</ThemedText>
        <View style={styles.chapterContent}>
          <ThemedText style={styles.chapterTitle}>Aýdylyşy (语音)</ThemedText>
          <ThemedText style={styles.chapterDesc}>
            Pinýin, tonlar, başlangyç we soňlangyç sesler. Diňe teoriýa, 1632 ses faýly bilen.
          </ThemedText>
        </View>
      </View>

      <View style={styles.chapterCard}>
        <ThemedText style={styles.chapterBadge2}>1-30 bap</ThemedText>
        <View style={styles.chapterContent}>
          <ThemedText style={styles.chapterTitle}>Esasy sapaklar</ThemedText>
          <ThemedText style={styles.chapterDesc}>
            Her bapda 17-22 täze söz, 3-4 grammatika düzgüni, 1-2 dialog we 20 gönükme. Üç bölüm: Teoriýa / Gönükmeler / Bap synagy.
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.body}>
        Dialoglardaky personajlar — Aman (Türkmenistandan gelen student), Gulnara (Kanadaly student), Çžan Weý we mugallymlar. Olaryň üsti bilen gündelik durmuşda ulanylýan diller öwrenilýär.
      </ThemedText>

      <ThemedText style={styles.body}>
        Sapaklary tertibinde geçmek maslahat berilýär — her soňraky bap öňküleriň üstüne gurulýar.
      </ThemedText>
    </PageWrapper>
  );
}

function TheoryPage() {
  return (
    <PageWrapper label="Teoriýa" title="Sapagyň materialy">
      <ThemedText style={styles.body}>
        Teoriýa ekrany sahypadan-sahypa süýşürilýär (swipe). Her sahypa aýratyn bir bölüme bagyşlanan:
      </ThemedText>

      <StepRow
        n="1"
        title="Giriş"
        desc="Bapda kim, näme öwreniljekdigi hakda gysga maglumat."
      />
      <StepRow
        n="2"
        title="Täze sözler"
        desc="17-22 söz: hiýeroglif + pinýin + türkmen/rus terjimesi. 🖌️ basyň — hiýeroglifiň näçe gezek ýazylýandygy animasiýa bilen görkeziler."
      />
      <StepRow
        n="3"
        title="Grammatika"
        desc="Her düzgün aýratyn sahypada: düşündirişi we mysallary."
      />
      <StepRow
        n="4"
        title="Dialoglar"
        desc="Hytaýça tekstler, pinýin we terjime. Diňläp, gaýtalap öwreniň."
      />
      <StepRow
        n="5"
        title="Maslahatlar"
        desc="Bapy ýatda saklamak we ulanmak boýunça birnäçe maslahat."
      />

      <ThemedText style={styles.body}>
        Aşaky panelde «Yza» / «Öňe» düwmeleri, sahypa belgisi (3/7 ýaly) we nokat-görkezijiler bar. Sahypany islän tertipde okap bilersiňiz.
      </ThemedText>
    </PageWrapper>
  );
}

function ExercisesPage() {
  return (
    <PageWrapper label="Gönükmeler" title="Üç ugurly menýu">
      <ThemedText style={styles.body}>
        «Gönükmeler» bölümini açanyňyzda menýu peýda bolar. Üç saýlaw bar:
      </ThemedText>

      <FeatureCard
        icon="library-outline"
        title="Sapagyň sözleri"
        desc="Sapakdaky ähli sözleri kart görnüşinde gaýtalamak. Gönükmelere geçmezden öň sözlügi pugtalandyrmak üçin."
      />
      <FeatureCard
        icon="checkbox-outline"
        title="Gönükmelere geç"
        desc="Sekiz görnüşli 20 gönükme: kart, saýlaw, diňle, doldur, jübütle, grammatika, jogap, hiýeroglif. Aşakda her gönükmäniň belgisi (1-20) bar — basyp böküp bolýar."
      />
      <FeatureCard
        icon="brush-outline"
        title="Hiýerogliflerini ýaz"
        desc="Bapdaky ähli hiýeroglifleri barmak bilen ýazmak. Her hiýeroglif aýratyn karta — basanyňda ýazuw režimi açylar."
      />

      <ThemedText style={styles.body}>
        Gönükmeden çykmak isleseňiz, ýokarky sag burçda «X» düwmesini basyň — tassyklama soralar.
      </ThemedText>
    </PageWrapper>
  );
}

function TestAndStrokePage() {
  return (
    <PageWrapper label="Synag we ýazuw" title="Bap synagy we hiýeroglif">
      <View style={styles.bigBlock}>
        <View style={styles.bigBlockHeader}>
          <Ionicons name="checkmark-done-outline" size={24} color={Colors.primaryAccentColor} />
          <ThemedText style={styles.bigBlockTitle}>Bap synagy</ThemedText>
        </View>
        <ThemedText style={styles.bigBlockBody}>
          Sapakda ähli zady öwrenip bolanyňyzdan soň özüňizi barlap bilersiňiz. Bapyň 20 gönükmesinden 15-si tötänleýin saýlanýar.
        </ThemedText>
        <ThemedText style={styles.bigBlockBody}>
          Synagy birnäçe gezek geçip bilersiňiz — her gezek başgaça soraglar düşer. Sözleri we grammatikany berkitmek üçin amatly.
        </ThemedText>
      </View>

      <View style={styles.bigBlock}>
        <View style={styles.bigBlockHeader}>
          <Ionicons name="brush-outline" size={24} color={Colors.primaryAccentColor} />
          <ThemedText style={styles.bigBlockTitle}>Hiýeroglif ýazuwy</ThemedText>
        </View>
        <ThemedText style={styles.bigBlockBody}>
          Iki ýerde ulanylýar:
        </ThemedText>
        <ThemedText style={styles.listItem}>• Teoriýada — sözüň ýanyndaky 🖌️ basyň, hiýeroglifiň ýazylyşy animasiýa bilen görkeziler.</ThemedText>
        <ThemedText style={styles.listItem}>• Gönükmelerde — barmak bilen ekranda çyzýarsyňyz, her zarbany dogry tertipde.</ThemedText>
        <ThemedText style={styles.bigBlockBody}>
          768 hiýeroglif programmanyň içinde saklanýar — internet gerek däl.
        </ThemedText>
      </View>
    </PageWrapper>
  );
}

function SettingsPage() {
  return (
    <PageWrapper label="Sazlamalar" title="Şahsy tertibi sazlaň">
      <ThemedText style={styles.body}>
        Hiýeroglif ýazuwynyň gatylygyny we kömek görnüşini şahsy gerekligiňize görä üýtgedip bolýar. «Sazlamalar» plitkasy esasy ekrandan açylýar.
      </ThemedText>

      <View style={styles.settingCard}>
        <ThemedText style={styles.settingTitle}>Gatylyk</ThemedText>
        <ThemedText style={styles.settingDesc}>
          Çyzgynyň takyklygyna näçe ýumşak garamaly:
        </ThemedText>
        <ThemedText style={styles.listItem}>• Aňsat — başlaýanlar üçin, kiçi ýalňyşlyklara ýol berýär</ThemedText>
        <ThemedText style={styles.listItem}>• Orta — adaty derejä</ThemedText>
        <ThemedText style={styles.listItem}>• Kyn — takyk çyzgy talap edýär</ThemedText>
      </View>

      <View style={styles.settingCard}>
        <ThemedText style={styles.settingTitle}>Kömek görkez</ThemedText>
        <ThemedText style={styles.settingDesc}>
          Näçe ýalňyşdan soň kömek (indiki zarbanyň ýolunyň çyzygy) görkezilsin:
        </ThemedText>
        <ThemedText style={styles.listItem}>• 3 ýalňyşdan soň</ThemedText>
        <ThemedText style={styles.listItem}>• 5 ýalňyşdan soň</ThemedText>
        <ThemedText style={styles.listItem}>• Görkezme — kömek hiç haçan görkezilmesin</ThemedText>
      </View>

      <View style={styles.settingCard}>
        <ThemedText style={styles.settingTitle}>Režim</ThemedText>
        <ThemedText style={styles.settingDesc}>
          Ýalňyşlyk näçe gymmat:
        </ThemedText>
        <ThemedText style={styles.listItem}>• Öwrenmek — ýalňyşlyklar päsgel bermeýär, dowam edip bilersiňiz</ThemedText>
        <ThemedText style={styles.listItem}>• Synag — köp ýalňyş = synap gaýtadan başlamaly</ThemedText>
      </View>
    </PageWrapper>
  );
}

function TipsPage() {
  return (
    <PageWrapper label="Maslahatlar" title="Nähili öwrenmeli">
      <ThemedText style={styles.tipItem}>
        Her gün azajyk geçiň — günde 10-15 minut köp ýagdaýy birden 2 sagatdan has peýdaly. Yzygiderlik beýnä iň gowusy.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Ses bilen gaýtalaň. Diňe okamak ýeterlik däl — hytaýça ses bilen aýdyň, beýniňiz tonlary we ahangy hakydyna alar.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Tonlara üns beriň. Bir we şol bir ses dürli tonda dürli many berýär. Ilkibada kyn, soň özbaşdak gelýär.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Hiýeroglifleri tertibinde ýazyň. Zarbalaryň dogry tertibi okamak we ýatda saklamak üçin möhüm.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Ýalňyşlykdan gorkmaň. Her ýalňyş — öwrenmegiň bir bölegi. Gönükmäni täzeden geçip bilersiňiz.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Bap synagyny birnäçe gezek geçiň. Her gezek başga soraglar düşýär — pugta ýatda saklamak üçin iň oňat usul.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        0-njy bapy äsgermäň — pinýini we tonlary ilki gowy öwrenseňiz, soň ähli sözler aňsatlaşar.
      </ThemedText>
    </PageWrapper>
  );
}

const PAGES: { key: string; render: () => React.ReactNode }[] = [
  { key: "welcome", render: () => <WelcomePage /> },
  { key: "main", render: () => <MainScreenPage /> },
  { key: "chapters", render: () => <ChaptersPage /> },
  { key: "theory", render: () => <TheoryPage /> },
  { key: "exercises", render: () => <ExercisesPage /> },
  { key: "test-stroke", render: () => <TestAndStrokePage /> },
  { key: "settings", render: () => <SettingsPage /> },
  { key: "tips", render: () => <TipsPage /> },
];

export default function AboutAppScreen() {
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
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Programma hakynda</ThemedText>
        </View>
        <View style={{ width: 40 }} />
      </View>

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

      <View style={[styles.bottomNav, { paddingBottom: 12 + insets.bottom }]}>
        <Pressable
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
          onPress={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={currentPage === 0 ? "#ccc" : Colors.primaryAccentColor}
          />
          <ThemedText
            style={[styles.navButtonText, currentPage === 0 && styles.navButtonTextDisabled]}
          >
            Yza
          </ThemedText>
        </Pressable>

        <View style={styles.pageIndicator}>
          <ThemedText style={styles.pageNumber}>
            {currentPage + 1} / {PAGES.length}
          </ThemedText>
          <View style={styles.dots}>
            {PAGES.map((_, i) => (
              <View key={i} style={[styles.dot, i === currentPage && styles.dotActive]} />
            ))}
          </View>
        </View>

        <Pressable
          style={[
            styles.navButton,
            currentPage === PAGES.length - 1 && styles.navButtonDisabled,
          ]}
          onPress={() => goTo(currentPage + 1)}
          disabled={currentPage === PAGES.length - 1}
        >
          <ThemedText
            style={[
              styles.navButtonText,
              currentPage === PAGES.length - 1 && styles.navButtonTextDisabled,
            ]}
          >
            Öňe
          </ThemedText>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentPage === PAGES.length - 1 ? "#ccc" : Colors.primaryAccentColor}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  backButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitleContainer: { flex: 1, alignItems: "center" },
  headerTitle: { fontFamily: FontFamily.bold, fontSize: 18, color: Colors.textPrimary },

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
  listItem: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 6,
    paddingLeft: 4,
  },

  statsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 12 },
  statBox: {
    flex: 1,
    minWidth: "22%",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: Colors.primaryAccentBg,
  },
  statValue: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.primaryAccentColor,
  },
  statLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.subduedTextColor,
    marginTop: 4,
  },

  featureCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 10,
    gap: 12,
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryAccentBg,
    alignItems: "center",
    justifyContent: "center",
  },
  featureContent: { flex: 1 },
  featureTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  featureDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.subduedTextColor,
  },

  stepRow: { flexDirection: "row", marginBottom: 14, gap: 12, alignItems: "flex-start" },
  stepNum: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryAccentColor,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.textInverse,
    lineHeight: 16,
  },
  stepContent: { flex: 1, paddingTop: 2 },
  stepTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  stepDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.subduedTextColor,
  },

  chapterCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 10,
    gap: 12,
  },
  chapterBadge: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.textInverse,
    backgroundColor: Colors.primaryAccentColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    overflow: "hidden",
    letterSpacing: 0.4,
  },
  chapterBadge2: {
    fontFamily: FontFamily.bold,
    fontSize: 11,
    color: Colors.textInverse,
    backgroundColor: Colors.successColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    overflow: "hidden",
    letterSpacing: 0.4,
  },
  chapterContent: { flex: 1 },
  chapterTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  chapterDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.subduedTextColor,
  },

  bigBlock: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: Colors.primaryAccentBg,
    marginBottom: 14,
  },
  bigBlockHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  bigBlockTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 17,
    color: Colors.textPrimary,
  },
  bigBlockBody: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  settingCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 10,
  },
  settingTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  settingDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginBottom: 8,
  },

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
