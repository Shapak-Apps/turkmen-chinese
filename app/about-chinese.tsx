import { ThemedText } from "@/components/themed-text";
import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { T } from "@/lib/strings";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
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
  colors,
}: {
  label: string;
  title: string;
  children: ReactNode;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <ScrollView style={styles.pageScroll} contentContainerStyle={styles.pageContent}>
      <ThemedText style={styles.pageLabel}>{label}</ThemedText>
      <ThemedText style={styles.pageTitle}>{title}</ThemedText>
      {children}
    </ScrollView>
  );
}

function ToneRow({
  tone,
  pinyin,
  hanzi,
  meaning,
  colors,
}: {
  tone: string;
  pinyin: string;
  hanzi: string;
  meaning: string;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.toneRow}>
      <ThemedText style={styles.toneLabel}>{tone}</ThemedText>
      <ThemedText style={styles.toneHanzi}>{hanzi}</ThemedText>
      <ThemedText style={styles.tonePinyin}>{pinyin}</ThemedText>
      <ThemedText style={styles.toneMeaning}>{meaning}</ThemedText>
    </View>
  );
}

function PhraseRow({
  hanzi,
  pinyin,
  meaning,
  colors,
}: {
  hanzi: string;
  pinyin: string;
  meaning: string;
  colors: ThemeColors;
}) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.phraseRow}>
      <ThemedText style={styles.phraseHanzi}>{hanzi}</ThemedText>
      <ThemedText style={styles.phrasePinyin}>{pinyin}</ThemedText>
      <ThemedText style={styles.phraseMeaning}>{meaning}</ThemedText>
    </View>
  );
}

function WhatIsChinesePage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="汉语" title="Hytaý dili näme?" colors={colors}>
      <ThemedText style={styles.body}>
        Hytaý dili (mandarin) — dünýäde iň köp gepleşilýän dil: 1 milliarddan gowrak adam ony ene dili hökmünde ulanýar. Ol Hytaýyň, Taýwanyň we Singapuryň resmi dili.
      </ThemedText>
      <ThemedText style={styles.body}>
        Resmi ady — putunhua (普通话), ýagny «umumy dil». Ol Pekin şiwesine esaslanýar we tutuş Hytaýda bilimde, köpçülikleýin habar beriş serişdelerinde we döwlet edaralarynda ulanylýar.
      </ThemedText>
      <ThemedText style={styles.body}>
        Hytaýda köp sanly şiwe bar — kanton, şanhaý, hokkien we beýlekiler. Olar biri-birinden şeýle bir tapawutlanýar welin, dürli şiwede gepleýänler biri-birini eşidip düşünmän bilerler. Emma putunhua ähli ýerde düşnükli — biz hem şu programmada şony öwrenýäris.
      </ThemedText>
      <ThemedText style={styles.body}>
        Hytaý dili — BMG-niň alty resmi dilinden biri. Ony dünýäde 100 milliondan gowrak adam daşary ýurt dili hökmünde öwrenýär.
      </ThemedText>
    </PageWrapper>
  );
}

function DifferencesPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="特点" title="Hytaý diliniň tapawudy näme?" colors={colors}>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>🔤</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Elipbiý ýok</ThemedText>
          <ThemedText style={styles.factDesc}>
            Hytaý dilinde iýeroglifler (汉字) ulanylýar. Her iýeroglif — bu söz ýa-da sözüň bir bölegi. Esasy iýeroglifleriň sany 3 500 töweregi, gazet okamak üçin şonça-da ýeterlik. HSK 1-2 üçin bary-ýogy 300 çemesi iýeroglifi bilmek gerek.
          </ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>🎵</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Tonly dil</ThemedText>
          <ThemedText style={styles.factDesc}>
            Şol bir ses dürli tonlar bilen aýdylanda düýbünden başga sözleri aňladýar. Jemi 4 ton we 1 ýeňil ton bar. Başlaýanlar üçin iň öwrenişilmedik bölegi şu, ýöne maşk bilen çalt özleşdirilýär.
          </ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>📐</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Ýönekeý grammatika</ThemedText>
          <ThemedText style={styles.factDesc}>
            Işlik üýtgemeýär, jyns ýok, köplük san goşulmasy ýok, artikl ýok. Işlik hemişe birmeňzeş: 我去 (men gidýärin), 他去 (ol gidýär), 他们去 (olar gidýärler) — üç ýerde-de şol bir 去. Söz tertibi: Eýe — Işlik — Obýekt.
          </ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>🔬</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Logikaly sözler</ThemedText>
          <ThemedText style={styles.factDesc}>
            Hytaý sözleriniň köpüsi ýönekeý böleklerden düzülýär. Meselem: 电 (elektrik) + 脑 (beýni) = 电脑 (kompýuter). 火 (ot) + 车 (ulag) = 火车 (otly). Esasy iýeroglifleri bilseňiz, çylşyrymly sözleriň manysyny çaklap bolýar.
          </ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>🕐</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Zaman işligi üýtgetmeýär</ThemedText>
          <ThemedText style={styles.factDesc}>
            Geçen, häzirki we geljek zaman işligiň üýtgemegi bilen däl-de, bölejikler we kontekst arkaly aňladylýar. «Men düýn iýdim» we «men ertir iýerin» — 吃 (chī, iýmek) işligi iki ýerde-de şol bir görnüşde galýar. Bu ýewropa dillerindäkiden has aňsat.
          </ThemedText>
        </View>
      </View>
    </PageWrapper>
  );
}

function TonesPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="声调" title="Hytaý diliniň 4 tony" colors={colors}>
      <ThemedText style={styles.body}>
        Tonlar — aýdylyşyň iň möhüm bölegi. «ma» diýen bir bogun 4 dürli sözi aňladyp biler:
      </ThemedText>
      <View style={styles.toneTable}>
        <ToneRow tone="1-nji — tekiz" pinyin="mā" hanzi="妈" meaning="eje" colors={colors} />
        <ToneRow tone="2-nji — göterilýän" pinyin="má" hanzi="麻" meaning="kenep" colors={colors} />
        <ToneRow tone="3-nji — peselip-göterilýän" pinyin="mǎ" hanzi="马" meaning="at" colors={colors} />
        <ToneRow tone="4-nji — peselýän" pinyin="mà" hanzi="骂" meaning="sögmek" colors={colors} />
      </View>
      <ThemedText style={styles.body}>
        Birinji ton (ā) — ses tekiz we ýokary, bir nota aýdyp duran ýaly. Ikinji ton (á) — ses ýokary galýar, geň galyp «Hä?» diýip soran ýaly. Üçünji ton (ǎ) — ses ilki aşak düşýär, soň ýokary galýar, oýlanyp «Hmm...» diýen ýaly. Dördünji ton (à) — ses birden aşak gaçýar, gaty buýruk bilen «Ýok!» diýen ýaly.
      </ThemedText>
      <ThemedText style={styles.body}>
        Ýene ýeňil ton bar — ol gysga we basymsyz, käbir sözleriň soňunda ulanylýar. Meselem: 妈妈 (māma) — ikinji bogun ýeňil, aýdyň tonsuz aýdylýar.
      </ThemedText>
      <ThemedText style={styles.body}>
        Alada etmäň! Maşk bilen tonlar tebigy bolup gidýär. Bu programma olary eşitmäge we tapawutlandyrmaga kömek eder.
      </ThemedText>
    </PageWrapper>
  );
}

function PinyinPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="拼音" title="Pinýin näme?" colors={colors}>
      <ThemedText style={styles.body}>
        Pinýin (拼音) — hytaý sözleriniň aýdylyşyny latyn harplary (A-Z) bilen ýazmagyň resmi ulgamy. Ol 1958-nji ýylda hytaý dilini öwrenmegi aňsatlaşdyrmak üçin döredildi.
      </ThemedText>
      <View style={styles.exampleCard}>
        <ThemedText style={styles.exampleHanzi}>你好</ThemedText>
        <ThemedText style={styles.examplePinyin}>nǐ hǎo</ThemedText>
        <ThemedText style={styles.exampleMeaning}>Salam</ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Harplaryň köpüsi türkmen elipbiýindäki ýaly okalýar, ýöne möhüm tapawutlar bar:
      </ThemedText>
      <ThemedText style={styles.listItem}>• «c» — «ts» ýaly okalýar («k» däl)</ThemedText>
      <ThemedText style={styles.listItem}>• «q» — ýumşak «ç» ýaly</ThemedText>
      <ThemedText style={styles.listItem}>• «x» — ýumşak «s» ýaly («s» bilen «ş» aralygynda)</ThemedText>
      <ThemedText style={styles.listItem}>• «zh» — «j» ýaly</ThemedText>
      <ThemedText style={styles.listItem}>• «sh» — «ş» ýaly</ThemedText>
      <ThemedText style={styles.listItem}>• «r» — ýumşak «ž» ýaly</ThemedText>
      <ThemedText style={styles.body}>
        Bu programmada her söz iýeroglifi (汉字) we pinýini bilen görkezilýär — aýdylyşy ädimme-ädim öwrenip bilersiň.
      </ThemedText>
    </PageWrapper>
  );
}

function CharactersPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="汉字" title="Iýeroglifler nähili gurlan" colors={colors}>
      <ThemedText style={styles.body}>
        Iýeroglifler çyzyklardan (çyzyklardan) durýar. Esasy çyzyklar 8 sany: keseligine, dikligine, çepe egilýän, saga egilýän, nokat, çeňňek, döwük we ýokary galýan.
      </ThemedText>
      <ThemedText style={styles.body}>
        Köp iýeroglifiň düzüminde radikal (kök) bar — bu manyny ýaňzydýan bölek. Mysallar:
      </ThemedText>
      <ThemedText style={styles.listItem}>• 氵(suw) — sözlerde: 河 (derýa), 海 (deňiz), 湖 (köl)</ThemedText>
      <ThemedText style={styles.listItem}>• 木 (agaç) — sözlerde: 林 (tokaý), 森 (gür tokaý), 桌 (stol)</ThemedText>
      <ThemedText style={styles.listItem}>• 口 (agyz) — sözlerde: 吃 (iýmek), 喝 (içmek), 叫 (çagyrmak)</ThemedText>
      <ThemedText style={styles.listItem}>• 女 (aýal) — sözlerde: 妈 (eje), 姐 (uýa), 好 (gowy)</ThemedText>
      <ThemedText style={styles.body}>
        Çyzyklaryň ýazylyş tertibi möhüm! Umumy düzgün: ýokardan aşak, çepden saga. Dogry tertip çalt ýazmaga we iýeroglifleri tanamaga kömek edýär.
      </ThemedText>
    </PageWrapper>
  );
}

function NumbersPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="数字" title="Hytaý sanlary" colors={colors}>
      <ThemedText style={styles.body}>
        Hytaý sanlary örän logikaly. 1-10 öwrenseň, 99-a çenli sanap bilersiň:
      </ThemedText>
      <View style={styles.numbersGrid}>
        {[
          ["一", "yī", "1"],
          ["二", "èr", "2"],
          ["三", "sān", "3"],
          ["四", "sì", "4"],
          ["五", "wǔ", "5"],
          ["六", "liù", "6"],
          ["七", "qī", "7"],
          ["八", "bā", "8"],
          ["九", "jiǔ", "9"],
          ["十", "shí", "10"],
        ].map(([hanzi, pinyin, num]) => (
          <View key={num} style={styles.numberCell}>
            <ThemedText style={styles.numberHanzi}>{hanzi}</ThemedText>
            <ThemedText style={styles.numberPinyin}>{pinyin}</ThemedText>
            <ThemedText style={styles.numberNum}>{num}</ThemedText>
          </View>
        ))}
      </View>
      <ThemedText style={styles.body}>
        Kada ýönekeý — ilki onluklary, soň birlikleri aýdýarsyň:
      </ThemedText>
      <ThemedText style={styles.listItem}>• 11 = 十一 (shí yī) — «on-bir»</ThemedText>
      <ThemedText style={styles.listItem}>• 20 = 二十 (èr shí) — «iki-on»</ThemedText>
      <ThemedText style={styles.listItem}>• 35 = 三十五 (sān shí wǔ) — «üç-on-bäş»</ThemedText>
      <ThemedText style={styles.listItem}>• 99 = 九十九 (jiǔ shí jiǔ) — «dokuz-on-dokuz»</ThemedText>
    </PageWrapper>
  );
}

function PhrasesPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="词组" title="Ilkinji jümleler" colors={colors}>
      <ThemedText style={styles.body}>
        Ine, ilkinji baplarda öwrenjek birnäçe jümle:
      </ThemedText>
      <View style={styles.phraseTable}>
        <PhraseRow hanzi="你好" pinyin="nǐ hǎo" meaning="Salam" colors={colors} />
        <PhraseRow hanzi="谢谢" pinyin="xièxie" meaning="Sag bol" colors={colors} />
        <PhraseRow hanzi="再见" pinyin="zàijiàn" meaning="Sag boluň" colors={colors} />
        <PhraseRow hanzi="对不起" pinyin="duìbuqǐ" meaning="Bagyşlaň" colors={colors} />
        <PhraseRow hanzi="我叫..." pinyin="wǒ jiào..." meaning="Meniň adym..." colors={colors} />
        <PhraseRow hanzi="你好吗?" pinyin="nǐ hǎo ma?" meaning="Ýagdaýlaryň nähili?" colors={colors} />
        <PhraseRow hanzi="很好" pinyin="hěn hǎo" meaning="Örän gowy" colors={colors} />
        <PhraseRow hanzi="我不懂" pinyin="wǒ bù dǒng" meaning="Men düşünemok" colors={colors} />
      </View>
    </PageWrapper>
  );
}

function WordOrderPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="语序" title="Sözlemde söz tertibi" colors={colors}>
      <ThemedText style={styles.body}>
        Hytaý dilinde söz tertibi berk: Eýe + Işlik + Obýekt. Türkmençeden tapawudy — işlik obýektden ÖŇ gelýär.
      </ThemedText>
      <View style={styles.exampleCard}>
        <ThemedText style={styles.exampleHanzi}>我 喝 茶</ThemedText>
        <ThemedText style={styles.examplePinyin}>wǒ hē chá</ThemedText>
        <ThemedText style={styles.exampleMeaning}>Men çaý içýärin (men + içmek + çaý)</ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Wagt we ýer hemişe işlikden ÖŇ goýulýar:
      </ThemedText>
      <View style={styles.exampleCard}>
        <ThemedText style={styles.exampleHanzi}>我 明天 去 北京</ThemedText>
        <ThemedText style={styles.examplePinyin}>wǒ míngtiān qù Běijīng</ThemedText>
        <ThemedText style={styles.exampleMeaning}>
          Men ertir Pekine giderin{"\n"}(men + ertir + gitmek + Pekin)
        </ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Sözlemiň soňuna 吗 (ma) bölejigini goşup, sorag ýasap bolýar:
      </ThemedText>
      <ThemedText style={styles.listItem}>• 你好. (Nǐ hǎo.) = Salam.</ThemedText>
      <ThemedText style={styles.listItem}>• 你好吗? (Nǐ hǎo ma?) = Ýagdaýlaryň nähili?</ThemedText>
    </PageWrapper>
  );
}

function StudyStructurePage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="学习" title="Okuw nähili gurlan" colors={colors}>
      <ThemedText style={styles.body}>
        Programma HSK (汉语水平考试) standartyna eýerýär — bu hytaý dili derejesini bahalandyrmagyň dünýäde ykrar edilen resmi ulgamy:
      </ThemedText>
      <View style={styles.levelCard}>
        <ThemedText style={styles.levelBadge}>HSK 1</ThemedText>
        <ThemedText style={styles.levelDesc}>
          150 söz, 15 bap. Salamlaşmak, sanlar, wagt, maşgala, iýmit, ulag, ýönekeý sözlemler
        </ThemedText>
      </View>
      <View style={styles.levelCard}>
        <ThemedText style={styles.levelBadge2}>HSK 2</ThemedText>
        <ThemedText style={styles.levelDesc}>
          300 söz (jemi), 15 bap. Deňeşdirme, geçen zaman, ugurlar, haýyşlar, has çylşyrymly grammatika
        </ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Her bap 3 bölekden ybarat:
      </ThemedText>
      <ThemedText style={styles.listItem}>1. Teoriýa — täze sözler, grammatika düzgünleri we mysallar</ThemedText>
      <ThemedText style={styles.listItem}>2. Gönükmeler — dürli görnüşli ýumuşlar bilen maşk (kartoçka, saýlama, boşluk doldurma, jübütleme, grammatika)</ThemedText>
      <ThemedText style={styles.listItem}>3. Bap synagy — 15 sany tötänleýin sorag; bapy tamamlamak üçin 70% ýygnamaly</ThemedText>
    </PageWrapper>
  );
}

function TipsPage({ colors }: { colors: ThemeColors }) {
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <PageWrapper label="建议" title="Öwreniş boýunça maslahatlar" colors={colors}>
      <ThemedText style={styles.tipItem}>
        Tonlary ilkinji günden ünsli diňläň. Ýalňyş endikleri soň düzetmek kyn. Her mysaldan soň ses bilen gaýtalaň.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Iýeroglifleri kem-kemden öwreniň. Birbada 100 sanysyny ýat tutjak bolmaň. Günde 5 iýeroglif, ýöne berk — bir hepdede unudyljak 50-den has gowudyr.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Her gün, azyndan 10 minut geçiň. Yzygiderlik uzyn sapaklardan möhümdir. Beýni arakesmeli, ýygy gaýtalamada has gowy ýatda saklaýar.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Ýalňyşdan gorkmaň. Her ýalňyş — öwrenmegiň bir pursaty. Hytaýlylar daşary ýurtlular olaryň dilinde gepleşjek bolanda hemişe begenýärler.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Gönükmeleri gaýtadan geçiň. Synagda 100%-den az ýygnasaňyz — yzyna dolanyp, ýene bir gezek geçiň. Gaýtalamak — ýatda saklamagyň açary.
      </ThemedText>
      <ThemedText style={styles.tipItem}>
        Sözleri aýratyn däl-de, kontekstde öwreniň. Jümle aýratyn sözden gowy ýatda galýar. Meselem: diňe «喝» (içmek) däl-de, «我喝茶» (men çaý içýärin) diýip ýat tutuň.
      </ThemedText>
    </PageWrapper>
  );
}

export default function AboutChineseScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const PAGES = useMemo(
    () => [
      { key: "what-is", render: () => <WhatIsChinesePage colors={colors} /> },
      { key: "differences", render: () => <DifferencesPage colors={colors} /> },
      { key: "tones", render: () => <TonesPage colors={colors} /> },
      { key: "pinyin", render: () => <PinyinPage colors={colors} /> },
      { key: "characters", render: () => <CharactersPage colors={colors} /> },
      { key: "numbers", render: () => <NumbersPage colors={colors} /> },
      { key: "phrases", render: () => <PhrasesPage colors={colors} /> },
      { key: "word-order", render: () => <WordOrderPage colors={colors} /> },
      { key: "study", render: () => <StudyStructurePage colors={colors} /> },
      { key: "tips", render: () => <TipsPage colors={colors} /> },
    ],
    [colors],
  );

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
        <Pressable
          onPress={() => router.back()}
          hitSlop={20}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={T.a11y.back}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle}>Hytaý dili hakynda</ThemedText>
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
            color={currentPage === 0 ? colors.borderColorStrong : colors.primaryAccentColor}
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
          style={[styles.navButton, currentPage === PAGES.length - 1 && styles.navButtonDisabled]}
          onPress={() => goTo(currentPage + 1)}
          disabled={currentPage === PAGES.length - 1}
        >
          <ThemedText
            style={[styles.navButtonText, currentPage === PAGES.length - 1 && styles.navButtonTextDisabled]}
          >
            Öňe
          </ThemedText>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={currentPage === PAGES.length - 1 ? colors.borderColorStrong : colors.primaryAccentColor}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.surfacePrimary },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    backButton: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
    headerTitleContainer: { flex: 1, alignItems: "center" },
    headerTitle: { fontFamily: FontFamily.bold, fontSize: 18, color: c.textPrimary },

    pageScroll: { flex: 1 },
    pageContent: { padding: 20, paddingBottom: 20 },
    pageLabel: {
      fontFamily: FontFamily.semibold,
      fontSize: 12,
      color: c.primaryAccentColor,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      marginBottom: 8,
    },
    pageTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 26,
      lineHeight: 32,
      letterSpacing: -0.4,
      color: c.textPrimary,
      marginBottom: 16,
    },

    body: {
      fontFamily: FontFamily.regular,
      fontSize: 15,
      lineHeight: 24,
      color: c.textSecondary,
      marginBottom: 12,
    },
    factCard: {
      flexDirection: "row",
      padding: 14,
      borderRadius: 14,
      backgroundColor: c.surfaceSecondary,
      marginBottom: 10,
      gap: 12,
      alignItems: "flex-start",
    },
    factIcon: { fontSize: 28 },
    factContent: { flex: 1 },
    factTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 15,
      color: c.textPrimary,
      marginBottom: 4,
    },
    factDesc: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      lineHeight: 20,
      color: c.subduedTextColor,
    },
    toneTable: {
      borderRadius: 12,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: c.borderColor,
      marginVertical: 12,
    },
    toneRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    toneLabel: {
      flex: 2,
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: c.textSecondary,
    },
    toneHanzi: {
      flex: 1,
      fontFamily: FontFamily.bold,
      fontSize: 24,
      textAlign: "center",
      color: c.primaryAccentColor,
    },
    tonePinyin: {
      flex: 1,
      fontFamily: FontFamily.medium,
      fontSize: 15,
      textAlign: "center",
      color: c.textPrimary,
    },
    toneMeaning: {
      flex: 1.5,
      fontFamily: FontFamily.regular,
      fontSize: 13,
      textAlign: "right",
      color: c.subduedTextColor,
    },
    exampleCard: {
      alignItems: "center",
      padding: 20,
      borderRadius: 16,
      backgroundColor: c.primaryAccentBg,
      marginVertical: 12,
    },
    exampleHanzi: {
      fontFamily: FontFamily.bold,
      fontSize: 36,
      color: c.primaryAccentColor,
    },
    examplePinyin: {
      fontFamily: FontFamily.medium,
      fontSize: 17,
      color: c.textPrimary,
      marginTop: 6,
    },
    exampleMeaning: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      color: c.textSecondary,
      marginTop: 4,
      textAlign: "center",
    },
    numbersGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginVertical: 12,
    },
    numberCell: {
      width: "18%",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: c.successBg,
    },
    numberHanzi: {
      fontFamily: FontFamily.bold,
      fontSize: 22,
      color: c.successColor,
    },
    numberPinyin: {
      fontFamily: FontFamily.medium,
      fontSize: 11,
      color: c.successColorDark,
      marginTop: 2,
    },
    numberNum: {
      fontFamily: FontFamily.regular,
      fontSize: 11,
      color: c.subduedTextColor,
      marginTop: 2,
    },
    phraseTable: {
      borderRadius: 12,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: c.borderColor,
      marginVertical: 12,
    },
    phraseRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.divider,
    },
    phraseHanzi: {
      flex: 1,
      fontFamily: FontFamily.bold,
      fontSize: 20,
      color: c.primaryAccentColor,
    },
    phrasePinyin: {
      flex: 1.2,
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: c.textPrimary,
    },
    phraseMeaning: {
      flex: 1.3,
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
      textAlign: "right",
    },
    levelCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      borderRadius: 12,
      backgroundColor: c.surfaceSecondary,
      marginBottom: 8,
      gap: 12,
    },
    levelBadge: {
      fontFamily: FontFamily.bold,
      fontSize: 12,
      color: c.textInverse,
      backgroundColor: c.primaryAccentColor,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      overflow: "hidden",
      letterSpacing: 0.4,
    },
    levelBadge2: {
      fontFamily: FontFamily.bold,
      fontSize: 12,
      color: c.textInverse,
      backgroundColor: c.successColor,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      overflow: "hidden",
      letterSpacing: 0.4,
    },
    levelDesc: {
      flex: 1,
      fontFamily: FontFamily.regular,
      fontSize: 13,
      lineHeight: 20,
      color: c.subduedTextColor,
    },
    listItem: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      lineHeight: 22,
      color: c.textSecondary,
      marginBottom: 6,
      paddingLeft: 4,
    },
    tipItem: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      lineHeight: 22,
      color: c.textSecondary,
      marginBottom: 10,
      paddingLeft: 14,
      borderLeftWidth: 3,
      borderLeftColor: c.successColor,
      paddingVertical: 4,
    },

    bottomNav: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: c.divider,
      backgroundColor: c.surfacePrimary,
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
      color: c.primaryAccentColor,
    },
    navButtonTextDisabled: { color: c.borderColorStrong },
    pageIndicator: { alignItems: "center", gap: 6 },
    pageNumber: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: c.subduedTextColor,
    },
    dots: { flexDirection: "row", gap: 6 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: c.borderColorStrong },
    dotActive: { backgroundColor: c.primaryAccentColor, width: 20 },
  });
}