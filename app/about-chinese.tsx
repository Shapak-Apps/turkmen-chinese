import { ThemedText } from "@/components/themed-text";
import { Colors, FontFamily } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { T } from "@/lib/strings";
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

function ToneRow({
  tone,
  pinyin,
  hanzi,
  meaning,
}: {
  tone: string;
  pinyin: string;
  hanzi: string;
  meaning: string;
}) {
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
}: {
  hanzi: string;
  pinyin: string;
  meaning: string;
}) {
  return (
    <View style={styles.phraseRow}>
      <ThemedText style={styles.phraseHanzi}>{hanzi}</ThemedText>
      <ThemedText style={styles.phrasePinyin}>{pinyin}</ThemedText>
      <ThemedText style={styles.phraseMeaning}>{meaning}</ThemedText>
    </View>
  );
}

// ── Pages ───────────────────────────────────────────────────

function WhatIsChinesePage() {
  return (
    <PageWrapper label="汉语" title="Что такое китайский язык?">
      <ThemedText style={styles.body}>
        Китайский (мандарин) — самый распространённый язык в мире: более 1 миллиарда носителей. Это официальный язык Китая, Тайваня и Сингапура.
      </ThemedText>
      <ThemedText style={styles.body}>
        Официальное название — путунхуа (普通话), что означает &quot;общая речь&quot;. Он основан на пекинском диалекте и используется в образовании, СМИ и государственных учреждениях по всему Китаю.
      </ThemedText>
      <ThemedText style={styles.body}>
        В Китае существует множество диалектов — кантонский, шанхайский, хоккиен и другие. Они настолько различаются, что носители разных диалектов могут не понимать друг друга на слух. Но путунхуа понимают везде, и именно его мы изучаем в этом приложении.
      </ThemedText>
      <ThemedText style={styles.body}>
        Китайский — один из шести официальных языков ООН. Его изучают более 100 миллионов человек по всему миру как иностранный язык.
      </ThemedText>
    </PageWrapper>
  );
}

function DifferencesPage() {
  return (
    <PageWrapper label="特点" title="Чем китайский отличается?">
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>&#128292;</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Нет алфавита</ThemedText>
          <ThemedText style={styles.factDesc}>В китайском используются иероглифы (汉字). Каждый иероглиф — это слово или часть слова. Основных иероглифов около 3 500, и этого достаточно чтобы читать газету. Для HSK 1-2 нужно знать всего около 300 иероглифов.</ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>&#127925;</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Тональный язык</ThemedText>
          <ThemedText style={styles.factDesc}>Один и тот же звук с разными тонами означает совершенно разные слова. Всего 4 тона + 1 нейтральный. Это самая непривычная часть для новичков, но она быстро осваивается с практикой.</ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>&#128208;</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Простая грамматика</ThemedText>
          <ThemedText style={styles.factDesc}>Нет спряжений глаголов, нет рода, нет множественного числа, нет артиклей. Глагол всегда одинаковый: &quot;я иду&quot;, &quot;он иду&quot;, &quot;они иду&quot; — 我去, 他去, 他们去. Порядок слов: Подлежащее-Сказуемое-Дополнение.</ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>&#128300;</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Логичные слова</ThemedText>
          <ThemedText style={styles.factDesc}>Многие китайские слова составлены из простых частей. Например: 电 (электричество) + 脑 (мозг) = 电脑 (компьютер). 火 (огонь) + 车 (машина) = 火车 (поезд). Зная базовые иероглифы, можно угадать значение сложных слов.</ThemedText>
        </View>
      </View>
      <View style={styles.factCard}>
        <ThemedText style={styles.factIcon}>&#128336;</ThemedText>
        <View style={styles.factContent}>
          <ThemedText style={styles.factTitle}>Время без спряжений</ThemedText>
          <ThemedText style={styles.factDesc}>Прошедшее, настоящее и будущее время выражаются не через изменение глагола, а через частицы и контекст. &quot;Я вчера ел&quot; и &quot;я завтра ем&quot; — глагол 吃 (ch&#299;, есть) не меняется. Это намного проще, чем в европейских языках.</ThemedText>
        </View>
      </View>
    </PageWrapper>
  );
}

function TonesPage() {
  return (
    <PageWrapper label="声调" title="4 тона китайского">
      <ThemedText style={styles.body}>
        Тоны — самая важная часть произношения. Один слог &quot;ma&quot; может означать 4 разных слова:
      </ThemedText>
      <View style={styles.toneTable}>
        <ToneRow tone="1-й — ровный" pinyin="m&#257;" hanzi="&#22920;" meaning="мама" />
        <ToneRow tone="2-й — восходящий" pinyin="m&#225;" hanzi="&#40635;" meaning="конопля" />
        <ToneRow tone="3-й — нисх.-восх." pinyin="m&#462;" hanzi="&#39532;" meaning="лошадь" />
        <ToneRow tone="4-й — нисходящий" pinyin="m&#224;" hanzi="&#39554;" meaning="ругать" />
      </View>
      <ThemedText style={styles.body}>
        Первый тон (&#257;) — голос ровный и высокий, как будто вы поёте одну ноту. Второй тон (&#225;) — голос поднимается вверх, как когда вы удивлённо спрашиваете &quot;Да?&quot;. Третий тон (&#462;) — голос сначала опускается, потом поднимается, как когда вы задумчиво говорите &quot;Хм...&quot;. Четвёртый тон (&#224;) — голос резко падает, как строгая команда &quot;Нет!&quot;.
      </ThemedText>
      <ThemedText style={styles.body}>
        Есть ещё нейтральный тон (лёгкий) — он короткий и безударный, используется в конце некоторых слов. Например: 妈妈 (m&#257;ma) — второй слог произносится легко, без выраженного тона.
      </ThemedText>
      <ThemedText style={styles.body}>
        Не переживайте! С практикой тоны становятся естественными. Это приложение поможет вам слышать и различать их.
      </ThemedText>
    </PageWrapper>
  );
}

function PinyinPage() {
  return (
    <PageWrapper label="拼音" title="Что такое пиньинь?">
      <ThemedText style={styles.body}>
        Пиньинь (拼音) — официальная система записи произношения китайских слов латинскими буквами (A-Z). Она была создана в 1958 году для упрощения изучения китайского.
      </ThemedText>
      <View style={styles.exampleCard}>
        <ThemedText style={styles.exampleHanzi}>&#20320;&#22909;</ThemedText>
        <ThemedText style={styles.examplePinyin}>n&#464; h&#462;o</ThemedText>
        <ThemedText style={styles.exampleMeaning}>Привет</ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Большинство букв читаются как в латинице, но есть важные отличия:
      </ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &quot;c&quot; читается как &quot;ц&quot; (не &quot;к&quot;)</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &quot;q&quot; читается как мягкое &quot;ч&quot;</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &quot;x&quot; читается как мягкое &quot;с&quot; (между &quot;с&quot; и &quot;ш&quot;)</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &quot;zh&quot; читается как &quot;дж&quot;</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &quot;sh&quot; читается как &quot;ш&quot;</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &quot;r&quot; читается как мягкое &quot;ж&quot;</ThemedText>
      <ThemedText style={styles.body}>
        В этом приложении каждое слово показывается с иероглифом (汉字) и пиньинем, чтобы вы учили произношение шаг за шагом.
      </ThemedText>
    </PageWrapper>
  );
}

function CharactersPage() {
  return (
    <PageWrapper label="汉字" title="Как устроены иероглифы">
      <ThemedText style={styles.body}>
        Иероглифы состоят из черт (штрихов). Базовых черт всего 8: горизонтальная, вертикальная, откидная влево, откидная вправо, точка, крюк, ломаная, поднимающаяся.
      </ThemedText>
      <ThemedText style={styles.body}>
        Многие иероглифы содержат ключи (радикалы) — смысловые элементы, которые подсказывают значение. Примеры:
      </ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 氵(вода) — в словах: 河 (река), 海 (море), 湖 (озеро)</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 木 (дерево) — в словах: 林 (лес), 森 (чаща), 桌 (стол)</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 口 (рот) — в словах: 吃 (есть), 喝 (пить), 叫 (звать)</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 女 (женщина) — в словах: 妈 (мама), 姐 (сестра), 好 (хороший)</ThemedText>
      <ThemedText style={styles.body}>
        Порядок написания черт важен! Общее правило: сверху вниз, слева направо. Правильный порядок помогает писать быстрее и узнавать иероглифы.
      </ThemedText>
    </PageWrapper>
  );
}

function NumbersPage() {
  return (
    <PageWrapper label="数字" title="Китайские числа">
      <ThemedText style={styles.body}>
        Китайские числа очень логичны. Выучив 1-10, можно считать до 99:
      </ThemedText>
      <View style={styles.numbersGrid}>
        {[
          ["\u4e00", "y\u012b", "1"], ["\u4e8c", "\u00e8r", "2"], ["\u4e09", "s\u0101n", "3"],
          ["\u56db", "s\u00ec", "4"], ["\u4e94", "w\u01d4", "5"], ["\u516d", "li\u00f9", "6"],
          ["\u4e03", "q\u012b", "7"], ["\u516b", "b\u0101", "8"], ["\u4e5d", "ji\u01d4", "9"],
          ["\u5341", "sh\u00ed", "10"],
        ].map(([hanzi, pinyin, num]) => (
          <View key={num} style={styles.numberCell}>
            <ThemedText style={styles.numberHanzi}>{hanzi}</ThemedText>
            <ThemedText style={styles.numberPinyin}>{pinyin}</ThemedText>
            <ThemedText style={styles.numberNum}>{num}</ThemedText>
          </View>
        ))}
      </View>
      <ThemedText style={styles.body}>
        Принцип простой — называете десятки, потом единицы:
      </ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 11 = 十一 (sh&#237; y&#299;) — &quot;десять-один&quot;</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 20 = 二十 (&#232;r sh&#237;) — &quot;два-десять&quot;</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 35 = 三十五 (s&#257;n sh&#237; w&#468;) — &quot;три-десять-пять&quot;</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; 99 = 九十九 (ji&#468; sh&#237; ji&#468;) — &quot;девять-десять-девять&quot;</ThemedText>
    </PageWrapper>
  );
}

function PhrasesPage() {
  return (
    <PageWrapper label="词组" title="Первые фразы">
      <ThemedText style={styles.body}>
        Вот несколько фраз, которые вы выучите в первых главах:
      </ThemedText>
      <View style={styles.phraseTable}>
        <PhraseRow hanzi="&#20320;&#22909;" pinyin="n&#464; h&#462;o" meaning="Привет" />
        <PhraseRow hanzi="&#35874;&#35874;" pinyin="xi&#232;xie" meaning="Спасибо" />
        <PhraseRow hanzi="&#20877;&#35265;" pinyin="z&#224;iji&#224;n" meaning="До свидания" />
        <PhraseRow hanzi="&#23545;&#19981;&#36215;" pinyin="du&#236;buq&#464;" meaning="Извините" />
        <PhraseRow hanzi="&#25105;&#21483;..." pinyin="w&#466; ji&#224;o..." meaning="Меня зовут..." />
        <PhraseRow hanzi="&#20320;&#22909;&#21527;?" pinyin="n&#464; h&#462;o ma?" meaning="Как дела?" />
        <PhraseRow hanzi="&#24456;&#22909;" pinyin="h&#283;n h&#462;o" meaning="Очень хорошо" />
        <PhraseRow hanzi="&#25105;&#19981;&#25026;" pinyin="w&#466; b&#249; d&#466;ng" meaning="Я не понимаю" />
      </View>
    </PageWrapper>
  );
}

function WordOrderPage() {
  return (
    <PageWrapper label="语序" title="Порядок слов в предложении">
      <ThemedText style={styles.body}>
        Китайский язык имеет фиксированный порядок слов: Подлежащее + Сказуемое + Дополнение (как в английском).
      </ThemedText>
      <View style={styles.exampleCard}>
        <ThemedText style={styles.exampleHanzi}>&#25105; &#21917; &#33590;</ThemedText>
        <ThemedText style={styles.examplePinyin}>w&#466; h&#275; ch&#225;</ThemedText>
        <ThemedText style={styles.exampleMeaning}>Я пью чай (Я + пить + чай)</ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Время и место ставятся ПЕРЕД глаголом (не после, как в русском):
      </ThemedText>
      <View style={styles.exampleCard}>
        <ThemedText style={styles.exampleHanzi}>&#25105; &#26126;&#22825; &#21435; &#21271;&#20140;</ThemedText>
        <ThemedText style={styles.examplePinyin}>w&#466; m&#237;ngti&#257;n q&#249; B&#283;ij&#299;ng</ThemedText>
        <ThemedText style={styles.exampleMeaning}>Я завтра поеду в Пекин{"\n"}(Я + завтра + ехать + Пекин)</ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Вопрос можно задать просто добавив частицу &#21527; (ma) в конец:
      </ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &#20320;&#22909;. (N&#464; h&#462;o.) = Привет.</ThemedText>
      <ThemedText style={styles.listItem}>&#8226; &#20320;&#22909;&#21527;? (N&#464; h&#462;o ma?) = Как дела?</ThemedText>
    </PageWrapper>
  );
}

function StudyStructurePage() {
  return (
    <PageWrapper label="学习" title="Как устроено обучение">
      <ThemedText style={styles.body}>
        Приложение следует стандарту HSK (&#27721;&#35821;&#27700;&#24179;&#32771;&#35797;) — официальной системе оценки уровня китайского языка, признанной во всём мире:
      </ThemedText>
      <View style={styles.levelCard}>
        <ThemedText style={styles.levelBadge}>HSK 1</ThemedText>
        <ThemedText style={styles.levelDesc}>150 слов, 15 глав. Приветствия, числа, время, семья, еда, транспорт, простые предложения</ThemedText>
      </View>
      <View style={styles.levelCard}>
        <ThemedText style={styles.levelBadge2}>HSK 2</ThemedText>
        <ThemedText style={styles.levelDesc}>300 слов (всего), 15 глав. Сравнения, прошедшее время, направления, просьбы, более сложная грамматика</ThemedText>
      </View>
      <ThemedText style={styles.body}>
        Каждая глава состоит из 3 частей:
      </ThemedText>
      <ThemedText style={styles.listItem}>1. Теория — новые слова, грамматические правила и примеры</ThemedText>
      <ThemedText style={styles.listItem}>2. Упражнения — практика через разные типы заданий (карточки, выбор ответа, заполнение пропусков, соединение пар, грамматика)</ThemedText>
      <ThemedText style={styles.listItem}>3. Тест — 15 случайных вопросов, наберите 70% чтобы завершить главу</ThemedText>
    </PageWrapper>
  );
}

function TipsPage() {
  return (
    <PageWrapper label="建议" title="Советы по изучению">
      <ThemedText style={styles.tipItem}>Слушайте тоны внимательно с самого начала. Неправильные привычки потом трудно исправить. Повторяйте вслух за каждым примером.</ThemedText>
      <ThemedText style={styles.tipItem}>Учите иероглифы постепенно. Не пытайтесь запомнить 100 штук за раз. Лучше 5 иероглифов в день, но твёрдо, чем 50 которые забудутся через неделю.</ThemedText>
      <ThemedText style={styles.tipItem}>Занимайтесь каждый день, хотя бы 10 минут. Регулярность важнее длинных занятий. Мозг лучше запоминает при частом повторении с перерывами.</ThemedText>
      <ThemedText style={styles.tipItem}>Не бойтесь ошибок. Каждая ошибка — это момент обучения. Китайцы всегда рады, когда иностранцы пытаются говорить на их языке.</ThemedText>
      <ThemedText style={styles.tipItem}>Используйте упражнения повторно. Если набрали меньше 100% в тесте — вернитесь и пройдите снова. Повторение — ключ к запоминанию.</ThemedText>
      <ThemedText style={styles.tipItem}>Учите слова в контексте, а не изолированно. Фраза запоминается лучше, чем отдельное слово. Пример: вместо просто &quot;喝&quot; (пить) запомните &quot;我喝茶&quot; (я пью чай).</ThemedText>
    </PageWrapper>
  );
}

const PAGES: { key: string; render: () => React.ReactNode }[] = [
  { key: "what-is", render: () => <WhatIsChinesePage /> },
  { key: "differences", render: () => <DifferencesPage /> },
  { key: "tones", render: () => <TonesPage /> },
  { key: "pinyin", render: () => <PinyinPage /> },
  { key: "characters", render: () => <CharactersPage /> },
  { key: "numbers", render: () => <NumbersPage /> },
  { key: "phrases", render: () => <PhrasesPage /> },
  { key: "word-order", render: () => <WordOrderPage /> },
  { key: "study", render: () => <StudyStructurePage /> },
  { key: "tips", render: () => <TipsPage /> },
];

export default function AboutChineseScreen() {
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
        <Pressable onPress={() => router.back()} hitSlop={20} style={styles.backButton} accessibilityRole="button" accessibilityLabel={T.a11y.back}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
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
  factCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 10,
    gap: 12,
    alignItems: "flex-start",
  },
  factIcon: { fontSize: 28 },
  factContent: { flex: 1 },
  factTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  factDesc: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.subduedTextColor,
  },
  toneTable: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: 12,
  },
  toneRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  toneLabel: {
    flex: 2,
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  toneHanzi: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 24,
    textAlign: "center",
    color: Colors.primaryAccentColor,
  },
  tonePinyin: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 15,
    textAlign: "center",
    color: Colors.textPrimary,
  },
  toneMeaning: {
    flex: 1.5,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    textAlign: "right",
    color: Colors.subduedTextColor,
  },
  exampleCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.primaryAccentBg,
    marginVertical: 12,
  },
  exampleHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 36,
    color: Colors.primaryAccentColor,
  },
  examplePinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 17,
    color: Colors.textPrimary,
    marginTop: 6,
  },
  exampleMeaning: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textSecondary,
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
    backgroundColor: Colors.successBg,
  },
  numberHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.successColor,
  },
  numberPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 11,
    color: Colors.successColorDark,
    marginTop: 2,
  },
  numberNum: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.subduedTextColor,
    marginTop: 2,
  },
  phraseTable: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: 12,
  },
  phraseRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  phraseHanzi: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.primaryAccentColor,
  },
  phrasePinyin: {
    flex: 1.2,
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  phraseMeaning: {
    flex: 1.3,
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    textAlign: "right",
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 8,
    gap: 12,
  },
  levelBadge: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.textInverse,
    backgroundColor: Colors.primaryAccentColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    overflow: "hidden",
    letterSpacing: 0.4,
  },
  levelBadge2: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.textInverse,
    backgroundColor: Colors.successColor,
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
    color: Colors.subduedTextColor,
  },
  listItem: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 6,
    paddingLeft: 4,
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
