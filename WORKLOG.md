# Work Log — TurkmenLearn: Chinese

---

## 2026-05-27 (Сессия 8 — продолжение) — Имя пользователя + About экран в стиле Şapak

### Имя пользователя в приветствии

Раньше главный экран показывал «Salam günortan! Şu gün başlaýarys» — звучало неестественно. Решили персонализировать.

**`lib/user.ts`** — новый модуль:
- `getUserName()` / `setUserName(name)` / `clearUserName()`
- `useUserName()` хук
- AsyncStorage ключ `user_name`

**Onboarding (`app/onboarding.tsx`):**
- 4-й экран «Başlaýalyň!» заменён на «Adyňy ýaz» с TextInput
- Кнопка «Başla» disabled пока имя не введено (минимум 1 символ)
- При нажатии — имя сохраняется + `markOnboarded()` + редирект на главный

**Главный экран (`app/(tabs)/lessons.tsx`):**
- Приветствие: `getGreeting(name)` → `Salam {имя}!`
- Подзаголовок: «Okuwy dowam edýäris!»
- Fallback «Salam öwreniji» если имя пустое

**Profile (`app/(tabs)/profile.tsx`):**
- Имя теперь динамическое через `useUserName()`, не хардкод «Aman»
- Рядом с именем pencil-иконка → тап = модалка «Adyňy üýtget»
- Модалка с TextInput, кнопками «Goý» (отмена) и красная «Sakla»

### About экран (Awtor we wersiýa)

Полный редизайн под формат sibling-приложения `Şapak — Ykjam Terjime`.

**`app/about.tsx`** (полностью переписан):
- Главный экран: иконка приложения + имя «Şapak — Hytaý dili» + версия + 2 пункта меню → footer «© 2026 Şapak Apps»
- **Модал «Awtorlar barada»** — секции с цветными иконками:
  - 🚩 Wezipe (Mission) — команда Şapak из Mary, Türkmenistan
  - ▦ Mümkinçilikler (Features) — 6 фич с иконками
  - ✉ Habarlaşmak (Contact) — кликабельный shapak.app@gmail.com (mailto)
  - 📄 Lisenziýa — MIT + источники (Boya, Twemoji, Hanzi Writer, Inter)
- **Модал «Şapak Apps»** — серия приложений:
  - Hero с большим логотипом Şapak
  - ℹ Toplum barada — описание серии
  - 🌐 Şapak — Ykjam Terjime (бейдж «1-nji programma»)
  - 🏫 Şapak — Hytaý dili (бейдж «2-nji programma», подсвечен красной рамкой как текущий)
  - 🚀 Indiki — планы (английский, русский и т.д.)

**Брендинг:**
- Email сменён с `seydi.charyev@gmail.com` (личного) на `shapak.app@gmail.com` (команда)
- Название приложения в About: «Şapak — Hytaý dili» (соответствует формату Şapak — Ykjam Terjime)
- Только туркменский (без мульти-языка)

### Ассеты

**`assets/images/shapak_logo.png`** — скопирован из `turkmen-phrasebook/assets/shapak_logo.png` (CC- логотип бренда «şapak.» с солнечной вспышкой на чёрном фоне).

Используется:
- В пункте меню «Şapak programmalar toplumy» (маленькая иконка в чёрном квадратике)
- В hero модалки «Şapak Apps» (полноразмерный логотип)

Главный About-экран — используется наш реальный app icon (`assets/images/icon.png`, оранжевый 文A на бежевом).

### Новые/изменённые файлы
- **Новый:** `lib/user.ts`
- **Полностью переписан:** `app/about.tsx`
- **Обновлены:** `app/onboarding.tsx` (4-й экран с name input), `app/(tabs)/lessons.tsx` (greeting), `app/(tabs)/profile.tsx` (rename modal)

### Git
4 коммита сегодня:
- `f017a0a` feat: personalized greeting with user name
- `1acab62` feat: About screen with author, version, credits
- `461d8b9` feat: About screen redesigned with Şapak Apps branding
- `79ea08e` feat: use real app icon + Şapak brand logo in About

### Что осталось / завтра
- Финальное тестирование APK на телефоне
- Сжать аватарки PNG (~6 МБ → ~1 МБ через tinypng)
- Возможно: переименовать app.json `name` с «TurkmenLearn: Chinese» на «Şapak — Hytaý dili» (но это меняет имя на главном экране Android — обсудить)

---

## 2026-05-27 (Сессия 8) — Геймификация: XP, Streak, Profile, Bookmarks, Onboarding

### Контекст
После большого редизайна в сессии 7 (14.05) приложение стало визуально хорошим, но «не живым». Решили добавить геймификационные механики по плану из `ROADMAP.md` (4 этапа).

### Этап 1 — Фундамент (XP + Streak)

**`lib/xp.ts`** — новый модуль:
- `getTotalXP()`, `addXP(amount)`, `useXP()` хук
- AsyncStorage ключ `total_xp`
- Константы: +10 XP за правильный ответ, +500 XP за завершение урока, +100 XP бонус за 100% accuracy

**`lib/streak.ts`** — новый модуль:
- Хранит `{lastActiveDate, currentStreak, longestStreak}`
- `markActiveDay()` вызывается при первом правильном ответе за день
- `checkAndResetIfNeeded()` вызывается на старте приложения в `app/_layout.tsx`
- Streak сбрасывается до 0 если разрыв больше 1 дня
- `longestStreak` сохраняется отдельно

**Интеграция:**
- `components/lesson/LessonContent.tsx` — `addXP` + `markActiveDay` в onAnswer колбэках для всех 8 типов упражнений + в useEffect для аудио-типов
- `components/lesson/LessonCompleteScreen.tsx` — XP-карта с разбивкой: `N×10 dogry jogap +180 / Sapak tamamlandy +500 / 100% bonus +100`

### Этап 2 — Маскот Aman

Aman (PNG-аватарка в `assets/characters/aman.png`) теперь появляется на ключевых экранах:
- **Главный экран** — большая аватарка слева + speech-bubble с приветствием по времени + dynamic подзаголовок «N/30 bap geçildi»
- **LessonComplete** — Aman в круге с трофеем-бейджем (вместо просто Ionicons trophy)
- **Practise placeholder** и **Chapter-test placeholder** — Aman вместо серой иконки
- **Welcome screen** — интро «Salam! Men Aman 👋»

### Этап 2.2 — Hero-секция

В `app/(tabs)/lessons.tsx` старый header (greeting + 3 stats chips) заменён на:
- Aman avatar + speech bubble (с хвостиком-треугольником)
- Compact XP/Streak чипы под ним с подписями «XP» и «gün»
- Кликабельные → ведут в Profile-таб

### Этап 3.1 — Bookmarks глав

**`lib/bookmarks.ts`** — новый модуль с `useBookmarks` хуком, AsyncStorage ключ `bookmarked_chapters`.

**UI:**
- Chapter-detail header — кнопка-bookmark справа (контурная/заполненная)
- Chapters list — красная иконка-bookmark на заложенных карточках
- Фильтр-чип «Saýlanan (N)» — появляется только если есть закладки; toggle показывает только заложенные

### Этап 3.2 — Closed captions

В `app/theory.tsx` → DialoguePage добавлена sticky-карточка внизу:
- Появляется только во время auto-play
- Тёмный фон, бейдж с hanzi-именем спикера красный (阿曼 / 李老师)
- Большой пиньинь текущей реплики (22px bold)
- Hanzi-subtitle (14px medium)
- Padding ScrollView увеличивается на 130px чтобы последняя реплика не пряталась

### Этап 4 — Onboarding

**`lib/onboarding.ts`** — `hasOnboarded()`, `markOnboarded()`, `resetOnboarding()`, AsyncStorage ключ `has_onboarded`.

**`app/onboarding.tsx`** — 4 экрана swipe:
1. «Salam! Men Aman 👋» — большой Aman + waving emoji-бейдж
2. «Sapaklar 3 bölekden» — 3 цветные карты со стрелками: Teoriýa → Gönükmeler → Bap synagy
3. «XP we Streak» — 2 карты рядом: 🏆 «+10 XP / jogap» и 🔥 «Streak / her gün»
4. «Başlaýalyň!» — Aman с зелёным rocket-бейджем

**Логика:**
- `app/index.tsx` теперь делает async-проверку `hasOnboarded()` → Redirect либо в `/onboarding`, либо в `/(tabs)/lessons`
- В Settings добавлена опция «Tanyşlygy täzeden görkez» (сбрасывает флаг и запускает onboarding снова)

### Profile-таб раскрыт

**`app/(tabs)/_layout.tsx`** — заменён Stack обратно на Tabs (после фикса white-screen в сессии 7). Видна нижняя tab-полоса с 2 табами: Esasy (home) + Profil (person). Conversations скрыт через `href: null`.

**`app/(tabs)/profile.tsx`** — полный редизайн (был с английским и старыми классами):
- Aman avatar в красном круге сверху
- XP-карта (жёлтая) с большим числом
- Streak-карта (currentStreak + longestStreak)
- Stats-сетка: главы (X/30 с progress-bar) + слова (X/~600)
- Меню: Sazlamalar / Programma hakynda / Hytaý dili hakynda

### Изменённые/новые файлы

**Новые:**
- `lib/xp.ts`, `lib/streak.ts`, `lib/bookmarks.ts`, `lib/onboarding.ts`
- `app/onboarding.tsx`
- `ROADMAP.md` (документ с планом, выполнен)

**Изменённые:**
- `app/_layout.tsx` — checkAndResetIfNeeded на старте
- `app/index.tsx` — async проверка hasOnboarded
- `app/(tabs)/_layout.tsx` — Tabs с двумя видимыми табами
- `app/(tabs)/lessons.tsx` — Hero с Aman, XP/Streak chips
- `app/(tabs)/profile.tsx` — полная переделка
- `app/chapter-detail.tsx` — bookmark toggle в header
- `app/chapters.tsx` — bookmark indicator + filter chip
- `app/theory.tsx` — closed captions в DialoguePage
- `app/welcome.tsx` — Aman intro
- `app/practise.tsx`, `app/chapter-test.tsx` — Aman в placeholder
- `app/settings.tsx` — опция «Tanyşlygy täzeden görkez»
- `components/lesson/LessonContent.tsx` — XP/streak интеграция
- `components/lesson/LessonCompleteScreen.tsx` — Aman + XP breakdown карта

### Git
- 2026-05-16 — `git init` + первый commit (`dcab977` «Initial commit: v1.0 with full gamification»). Ветка `main`. До этого проект был без version control.

### Что осталось
- Тестирование release APK на устройстве (в процессе)
- Сжать аватарки PNG через tinypng.com
- Подпись APK для Play Store

---

## 2026-05-14 (Сессия 7) — Большой редизайн + персонажи + интерактивность

### Цель
Изначальный визуал был «дефолтный Expo» — оранжевый акцент, тяжёлые 2px бордеры, системный шрифт. Решили полностью переделать тему под бренд-цвета (флаги Туркменистана/Китая) + добавить интерактивность.

### Дизайн-система

**Палитра:**
- 🔴 Primary `#B91C1C` — китайский (hanzi, главные кнопки, акценты)
- 🟢 Success `#00853E` — туркменский (правильный ответ, completion, badges)
- ⚪ White + slate-50/100/200 — фон, поверхности
- Семантические токены в `constants/theme.ts`: primaryAccentBg/Strong, successBg/Strong, surfacePrimary/Secondary/Tertiary, divider, borderColorStrong, textPrimary/Secondary, etc.

**Типографика:**
- Inter (Google Fonts через `@expo-google-fonts/inter`) — 4 веса: 400/500/600/700
- Подключён через `expo-font` useFonts в `app/_layout.tsx`
- Шкала `Type` в theme.ts: h1/h2/h3/title/subtitle/body/label/caption/button

**Радиусы/spacing/shadow** — выделены в токены (`Radius`, `Spacing`, `Shadow`).

### Иллюстрации глав

31 SVG-эмодзи из Twemoji (jdecked/twemoji CDN) — по теме каждой главы:
- 👋 для главы 1 «Salam», 🌍 для 2 «Haýsy ýurtly», 📖 для 3 «Kitap», ❄ для 11 «Pekin gyşy», 🎉 для 30 «Baýramçylyk» и т.д.
- Установлен `react-native-svg-transformer` + `metro.config.js` для импорта SVG как React-компонентов
- `constants/ChapterIllustrations.ts` — мэппинг chapterId → SVG

### Персонажи (аватарки)

6 аватарок персонажей:
1. Aman (главный герой, туркменский студент) — генерируется/предоставляется пользователем
2. Guli (канадская студентка)
3. Zhang Wei (китайский одногруппник)
4. Li mugallym (учительница)
5. Wang mugallym (учитель)
6. Generic (для misc-персонажей)

Сначала использовался DiceBear Personas (через CDN), пользователь не одобрил → перешли на AI-генерированные PNG. Промпты под flat-style portraits сохранены в обсуждении.

**`constants/CharacterAvatars.ts`** — мэппинг + per-chapter speaker mapping (A/B → персонаж для каждой из 30 глав).

### Диалоги — чат-bubbles

`app/theory.tsx` → DialoguePage переделана:
- Спикер A — слева (зелёный фон, аватарка слева)
- Спикер B — справа (красный фон, аватарка справа)
- Кнопка «▶ Diňle» — последовательный auto-play всех реплик через TTS, текущая bubble подсвечивается оранжевой рамкой, кнопка превращается в красную «Dur»
- Tap на bubble = озвучка одной реплики
- Character chips сверху: аватарка + имя hanzi/pinyin
- Per-chapter character mapping через `getChapterSpeakers(chapterId)`

### Интерактивность

**`lib/haptics.ts`** — обёртка над expo-haptics: `tap()`, `select()`, `success()`, `error()`, `heavy()`.

**Подключение:**
- Все TouchableOpacity/Pressable на навигационных кнопках — `haptics.tap()`
- Все 7 типов упражнений на правильный ответ — `haptics.success()`, на неправильный — `haptics.error()`
- LessonComplete — `haptics.success()` + `heavy()` для confetti
- ConfettiCannon — 250 частиц (было 150), бренд-цвета (red+green+gold+amber+pink+light-green), помедленнее

**`components/ui/AnimatedPressable.tsx`** — wrap Pressable со spring-scale на press (scale 1→0.97→1).

**`components/ui/AnimatedCounter.tsx`** — анимированный счётчик чисел (от 0 до value за 800мс с ease-out). Используется в:
- Stats на главном (bap/söz/galdy)
- XP-карта в Profile
- Streak counter

**Wiggle на неправильный ответ** — в FlashcardMode и FillBlankMode добавлена sequence-анимация (translateX: -10/10/-8/8/0 за 300мс).

### Главный экран

`app/(tabs)/lessons.tsx` — полностью переделан:
- Greeting по времени дня (Salam ertir / günortan / agşam / gije)
- Stats-полоса (bap/söz/galdy)
- Hero «Dowam et» — большая красная карта с огромным иероглифом следующей главы, кнопка «Başla/Dowam et»
- 3 квадратные карты quick-row (Sapaklar / Hoş geldiňiz / Sazlamalar)
- Progress bar внизу с %
- Watermark 学 справа сверху (4% opacity)

### Список глав

`app/chapters.tsx` — полностью переделан:
- Группировка по 6 Unit'ам Boya с подзаголовками (Tanyşlyk / Wagt / Gündelik durmuş / etc) и счётчиком N/5
- Каждая карточка: бейдж номера, бейдж «Indiki» для текущей, ✓ для пройденной, hanzi-emoji справа
- Состояния: текущая (красный border + жирный shadow), пройденная (приглушённая)

### Экран деталей главы

`app/chapter-detail.tsx` — переделан:
- Bölüm-чип сверху
- Большой hanzi-заголовок (你好 красным 44px)
- Пиньинь под ним (nǐ hǎo)
- Перевод (Hello)
- Иллюстрация главы 80×80 справа
- Stats-сетка 4 колонки: söz/grammatika/dialog/gönükme
- Word-preview chips (первые 4 слова главы)
- 3 action-карты с галочкой если пройдено

### Исправленные баги

**White screen** — несколько часов отлаживали почему Stack + Tabs + tabBarStyle:none даёт пустой экран на Android. Решение: использовать видимую tab-bar (для onboarding Tabs нужны), либо Stack без mention'ов через Stack.Screen + sibling Views.

### Все экраны редизайн

11 экранов + 18 lesson-компонентов + 3 общих компонента — все прошли через дизайн-токены. Заменены hardcoded `#fff`/`#999`/`#34C759`/`#ef4444` на семантические Colors.*. `fontWeight: "700"` → `fontFamily: FontFamily.bold`. Borders 2px → 1px, shadow → лёгкий.

---

## 2026-04-29 (Сессия 5, часть 2) — copyright cleanup перед релизом

### Проблема
Контент приложения был построен дословно по учебнику Boya Chinese Elementary I (Peking University Press): диалоги взяты из книги, имена персонажей те же (大卫, 玛丽, 李军, 王老师, 刘老师). Перед релизом v1 + open source это derivative work — потенциальная претензия от издателя.

### Решение — Вариант А: rewrite + repo cleanup

**Свои персонажи** (все ~225 упоминаний заменены глобально по `theory_content.ts`, `course_content.json`, `scripts/build-web.js`):

| Старое (книга)   | Новое (наше)     |
|------------------|------------------|
| 大卫 / Dàwèi     | 阿曼 / Āmàn (Аман, туркменский студент) |
| 玛丽 / Mǎlì      | 古丽 / Gǔlì (Гульнара, канадка) |
| 李军 / Lǐ Jūn    | 张伟 / Zhāng Wěi |
| 王老师 (Гл.1)    | 李老师           |
| 刘老师 (Гл.2+)   | 王老师           |
| 刘明             | 王明             |
| 张红             | 王红             |

**Substantive rewrites:**
- **Глава 1** — оба диалога переписаны полностью: своя последовательность реплик, новые сюжеты (общежитие + первый урок), туркменский студент Аман.
- **Глава 2** — диалоги переписаны, Аман ≠ американец, добавлено 土库曼斯坦 (Tǔkùmànsītǎn) в словарь главы.

**UI и репо:**
- Убрано «Boya Chinese» из subtitle главного экрана и списка глав ([app/(tabs)/lessons.tsx:49](app/(tabs)/lessons.tsx#L49), [app/chapters.tsx:22](app/chapters.tsx#L22)) → теперь «Hytaý dili».
- `Boya Chinese/` (PDF) и `boya_pages/` (244 PNG) перенесены вне репо в `~/Desktop/Boya Chinese Source/`.
- `.gitignore` обновлён — папки больше никогда не попадут в репо.
- Комментарий в `pronunciation_data.ts` без упоминания Boya.

**Stroke order:**
- Перегенерирован `assets/data/hanzi_data.json` через `node scripts/bundle-hanzi.js` — 768 иероглифов (+1: 阿, 伟, 坦 для новых имён и Туркменистана).

### Что НЕ сделано (приемлемо для v1)
- Главы 3-30 диалогов — только механическая замена имён, без substantive rewrite. Структурно похожи на оригинал, но с другими персонажами. Юридический риск снижен на ~70%, не на 100%.
- TZ.md / WORKLOG.md / `scripts/add-chapter*.js` всё ещё упоминают «Boya Chinese» в комментариях. Очистить перед open source push.
- `web/index.html` (HTML preview) не перегенерирован — dev tool, не shipping.

---

## 2026-04-29 (Сессия 5, часть 1) — решение по Bap synagy

### Bap synagy переносится в v2
При ревью открытых задач обнаружили, что **Bap synagy (тест главы) ни в TZ, ни в WORKLOG не отмечен как отдельный этап**. Фактическое состояние `app/chapter-test.tsx`: работает как обычные упражнения — 15 случайных из 20, тот же `LessonContent`, тот же `LessonCompleteScreen`. Порога 70% нет, отдельного экрана результатов нет, перед тестом показывается `VocabularyIntroScreen`.

**Решение:** не дорабатывать сейчас. Приоритет — выпустить v1. Полноценный тест с порогом, оценкой и отдельным экраном результатов — Этап 8 в v2.

В TZ.md добавлен Этап 8 «Bap synagy (тест главы) — ⏸ ОТЛОЖЕНО до v2» со списком того, что нужно доделать. AI-фичи переехали на Этап 9.

### Открытые задачи v1
- About the App — написать контент (заглушка `«Mazmun ýakyn wagtda goşular»`)
- Финальный release APK + тест на устройстве + фиксы багов
- ← в упражнениях → «предыдущее» (отложено)

---

## 2026-04-23 (Сессия 4) — финал контента + UX-редизайн

### Упражнения глав 2-30 (580 новых упражнений)
- Глава 1 уже была готова (сессия 3). Добавил упражнения для **глав 2-30** по единому шаблону: 6 flashcard + 4 fill_blank + 3 multiple_choice + 2 listening_mc + 2 grammar + 1 match_pairs + 2 single_response = 20 на главу.
- Итого **600 упражнений** в приложении.
- Источник: секции 课堂练习 Boya Chinese + диалоги/Language Points из теории.
- Скрипты-добавители в `scripts/`: по одному на главу или батчами (add-chapters-9-15.js, 16-20.js, 21-23.js, 24-26.js, 27-30.js).
- Перед этим нормализовал структуру глав 2-30: переписал `title` с HSK-названий на Boya, схлопнул sub-lessons в одну `lessons[0]` с `title: "Gönükmeler"`.

### Offline hanzi writer
- Всегда использует локальный `assets/data/hanzi_data.json` (767 уникальных иероглифов, 1.69 MB).
- Кастомный loader в StrokeOrderModal/StrokeOrderMode передаёт данные из JSON, fallback на CDN в библиотеке не срабатывает.
- `scripts/bundle-hanzi.js` пересобирает JSON из `node_modules/hanzi-writer-data/` по найденным в контенте иероглифам.

### Settings экран + хранилище
- Новый экран `app/settings.tsx` с 3 настройками для stroke order: Gatylyk (easy/medium/hard), Kömek görkez (3/5/never), Режим (learn/test).
- `lib/settings.ts`: `useSettings()` хук + AsyncStorage ключ `app_settings`. Константы LENIENCY_VALUES, HINT_VALUES для использования в StrokeOrderMode.

### Stroke order квиз (8-й тип упражнения)
- `components/lesson/StrokeOrderMode.tsx` — сетка карточек всех иероглифов главы. Тап → модалка с HanziWriter, рисуешь пальцем. Галочка + зелёный цвет когда написан. Progress bar внизу.
- В Главе 1 исходно добавили 2 stroke_order упражнения (你, 你好), потом убрали из 20-упражненческой последовательности — сделали отдельной картой в меню.

### Редизайн flow Gönükmeler (меню из 3 карточек)
- `app/practise.tsx` — теперь сначала меню с 3 опциями: (1) Sapagyň sözleri (словарь из theory), (2) Gönükmelere geç (20 упражнений), (3) Hiýerogliflerini ýaz (stroke order сеткой).
- `onExit` проп в VocabularyIntroScreen и LessonContent — при выходе возвращает в меню (setMode("menu")), а не на chapter-detail.

### Словарь через теорию (не через упражнения)
- `lib/vocabulary.ts`: `getChapterVocabulary(chapterId)` берёт словарь из `theory_content.ts` (а не из упражнений, как было). Теперь перед упражнениями ученик видит все 17-22 слова из учебника, а не только те что случайно попали в exercises.
- `getChapterUniqueHanzi(chapterId)` — для stroke order: все уникальные CJK иероглифы словаря главы.
- `getUniqueWordsFromQuestions(q)` — legacy fallback для старого lessonId-flow.

### Bottom navigation упражнений
- `components/lesson/ExerciseNavBar.tsx` — горизонтальная лента нумерованных кружков 1-20 внизу экрана. Автоскролл к текущему. Тап = мгновенный прыжок. Цветовая логика: оранжевый border = current, зелёный fill = правильно, красный fill = неправильно, серый = не посещён.
- Убрал ← → из ProgressHeader (они мало заметны, были дублирующими). Иконку X заменил на стандартный arrow-back.

### Rename Maşklar → Gönükmeler
- Переименовал термин "exercises" глобально: Maşklar → Gönükmeler, Maşkdan çykmak → Gönükmeden çykmak, N maşk → N gönükme, и т.д. Обновил UI strings + course_content.json.

### Hytaý dili hakynda (about-chinese) — горизонтальный свайп
- Раньше: вертикальный ScrollView с 10 секциями одним куском.
- Стало: FlatList horizontal pagingEnabled, 10 страниц, каждая — отдельная тема (汉语/特点/声调/拼音/汉字/数字/词组/语序/学习/建议). Навигация Yza/Öňe + точки-индикаторы внизу. Единый стиль с Главой 0 Pronunciation.

### Изменённые / новые файлы (ключевые)
- **Новые:** `lib/settings.ts`, `lib/vocabulary.ts`, `app/settings.tsx`, `components/lesson/StrokeOrderMode.tsx`, `components/lesson/ExerciseNavBar.tsx`, `scripts/add-chapter{2..30}.js` + батчи.
- **Обновлённые:** `app/practise.tsx` (меню flow), `app/about-chinese.tsx` (горизонтальный), `app/(tabs)/lessons.tsx` (плитка Sazlamalar → /settings), `components/lesson/LessonContent.tsx` (onExit, ExerciseNavBar, visitedIndices), `components/lesson/VocabularyIntroScreen.tsx` (words prop + onExit), `components/lesson/ProgressHeader.tsx` (arrow-back иконка), `constants/CourseData.ts` (StrokeOrderQuestion type), `assets/data/course_content.json` (Boya titles + 600 упражнений), `assets/data/hanzi_data.json` (767 chars).

### Что осталось (на следующую сессию)
- **About the App** — написать контент (сейчас заглушка «Mazmun ýakyn wagtda goşular»).
- **← в упражнениях → «предыдущее»** (сейчас exit с confirm; обсудили, отложили).
- **Финальный release APK** + тестирование на устройстве.
- **Profile экран** (низкий приоритет).

---

## 2026-04-04 (Сессия 1)

### Сборка APK
- Собрали release APK через Android Studio: `.\gradlew.bat assembleRelease`
- Debug APK не работал на телефоне (нужен Metro) — перешли на release
- APK успешно установлен и запущен на телефоне

### Глава 1: контент по Boya Chinese
- Прочитали PDF книги Boya Chinese Elementary I (сканированный, без текстового слоя)
- Извлекли страницы как изображения через PyMuPDF
- Нашли Главу 1 你好 (стр. 27-31 PDF)
- Переписали theory_content.ts — полностью по книге:
  - 17 новых слов (词语表) из книги
  - 2 грамматических правила: «是» 字句, вопросы с 吗
  - 2 диалога из книги (Давэй+Ли Цзюнь, Давэй+учитель Ван)
  - 4 совета
- Обновили web-превью (build-web.js) с новым контентом

### Переход с HSK на Boya Chinese
- Решение: структура приложения теперь по книге Boya Chinese, а не по HSK Standard Course
- Главный экран переименован на туркменский:
  - Welcome → **Hoş geldiňiz**
  - HSK 1 → **Sapaklar** (один список глав 0-30)
  - HSK 2 → **убран**
  - Settings → **Sazlamalar**
  - Заголовок: **Hytaý dilini öwreniň**
- chapters.tsx: один список всех 31 глав без деления на HSK1/HSK2
- chapter-detail.tsx: убрано деление по цветам HSK1/HSK2
- TZ.md: полностью переписан под Boya Chinese

### Очистка упражнений
- Все 781 старых упражнений очищены из course_content.json
- Exercises и Chapter Test показывают заглушку на туркменском:
  - "Maşklar taýýarlanýar" (Упражнения готовятся)
  - "Synag taýýarlanýar" (Тест готовится)

### Навигация — кнопки назад
- Аудит всех экранов: practise.tsx и chapter-test.tsx не имели кнопки назад
- Добавлен хедер с кнопкой назад в оба экрана
- Все остальные экраны уже имели кнопку назад

### Theory — горизонтальные страницы (swipe)
- Переделали экран Theory с длинного скролла на **горизонтальные страницы**
- FlatList с `pagingEnabled` + `horizontal`
- Каждая секция = отдельная страница:
  - Введение (Giriş)
  - Новые слова (Täze sözler)
  - Грамматика — каждое правило на отдельной странице
  - Диалоги — каждый на отдельной странице
  - Советы (Maslahatlar)
- Навигация внизу: **Yza / Öňe** + номер страницы (3/7) + точки-индикаторы
- Для Главы 1: 7 страниц

### Написание иероглифов (Stroke Order)
- Установлена библиотека `@jamsch/react-native-hanzi-writer`
- Создан компонент `StrokeOrderModal.tsx`:
  - Модальное окно с анимацией написания иероглифа
  - Кнопка "Ýazylyşy" — запускает анимацию штрих за штрихом
  - Для слов из нескольких иероглифов — навигация между ними (1/2)
- Интегрирован в страницу "Täze sözler" — иконка 🖌️ рядом с каждым словом

### Изменённые файлы
- `app/(tabs)/lessons.tsx` — главный экран на туркменском, убран HSK2
- `app/chapters.tsx` — один список глав, без фильтра HSK
- `app/chapter-detail.tsx` — убрано деление HSK1/HSK2
- `app/theory.tsx` — горизонтальные страницы вместо скролла
- `app/practise.tsx` — заглушка + кнопка назад
- `app/chapter-test.tsx` — заглушка + кнопка назад
- `assets/data/theory_content.ts` — Глава 1 по Boya Chinese
- `assets/data/course_content.json` — упражнения очищены
- `scripts/build-web.js` — обновлён контент Главы 1
- `components/StrokeOrderModal.tsx` — новый компонент
- `TZ.md` — полностью переписан
- `package.json` — добавлена зависимость @jamsch/react-native-hanzi-writer

---

## Что дальше (план)
1. **Главы 2-30 теория** — ✅ ГОТОВО (2026-04-15)
2. **Упражнения** — 🔄 Глава 1 готова (2026-04-15), главы 2-30 TODO
3. **Stroke Order квиз** — тип упражнения где рисуешь иероглиф пальцем
4. **Локализация UI** — ✅ основные экраны готовы (2026-04-15), Profile остался
5. **About the App** — 🔄 локализован, но содержания нет
6. **Settings** — создать экран настроек
7. **Offline hanzi writer** — забандлить hanzi-writer-data локально вместо CDN

---

## 2026-04-15 (Сессия 3) — Упражнения Главы 1 + локализация навигации

### Упражнения — Глава 1 (20 штук)
Добавили **20 упражнений** в `course_content.json` для главы 1 (你好 Hello) как референс для остальных глав:
- 8 × `flashcard` — выбор перевода для 8 ключевых слов (你好, 老师, 学生, 留学生, 谢谢, 不客气, 您, 名字)
- 3 × `multiple_choice` — ситуативные вопросы (как вежливо поздороваться, что ответить на 谢谢)
- 3 × `listening_mc` — слушай (TTS через expo-speech) и выбери иероглиф
- 4 × `fill_blank` — вставь 是/吗/什么/不 в предложение
- 1 × `match_pairs` — соединить 8 иероглифов с переводами
- 1 × `single_response` — прочти фразу 我是留学生

Источник: секция 课堂练习 учебника Boya, страницы 30-31.

### Архитектурные изменения

**Вариант (b) — один блок упражнений на главу:**
- Было: каждая глава с 2+ sub-lesson ("Tones & Pinyin Basics", "Greetings" — от старого fork)
- Стало: одна запись `lessons[0]` с названием "Maşklar" и всеми упражнениями
- Теория (параллельная структура) осталась как есть — тоже один блок на главу

### Рефакторинг компонентов упражнений

**`MultipleChoiceMode`** — убрана фаза записи голоса:
- Была логика: выбери → появлялся микрофон → произнеси → проверка
- Стало: выбери → сразу проверка (как у listening_mc)
- Убран текст "Now, say it in Mandarin" + иконка mic-outline на выбранной опции
- Используется `instruction` поле (русский)

**`FillBlankMode`** — переделан с ввода клавиатурой на 4 варианта:
- Причина: на Android эмуляторе и у учеников нет китайской раскладки (IME)
- Теперь: 4 карточки 2×2 с иероглифами + пиньинь, тап = выбор
- Добавлено поле `options` в JSON для fill_blank вопросов
- Подсказка теперь на русском: "Подсказка:", кнопка "Дальше"

**`ProgressHeader`** — добавлены стрелки навигации:
- Кнопки ← → в правой части хедера
- Позволяет прыгать между упражнениями без прохождения
- Серые когда на первом/последнем

### Локализация UI (основные экраны)

Туркменский:
- `app/chapter-detail.tsx`: CHAPTER N → N-NJI BAP, Theory → Teoriýa, Exercises → Maşklar, Chapter Test → Bap synagy
- `app/chapters.tsx`: убрали "X lessons", показываем только "Y maşk"
- `app/welcome.tsx`: Welcome → Hoş geldiňiz, About the App → Programma hakynda, About Chinese Language → Hytaý dili hakynda
- `app/about-app.tsx` и `about-chinese.tsx`: заголовки на туркменском
- `components/lesson/VocabularyIntroScreen.tsx`: Lesson Vocabulary → Sapagyň sözleri, Again → Gaýtala, Got it → Bilýärin, Skip to Lesson → Maşklara geç
- ConfirmDialog при выходе: Maşkdan çykmak / Çyk / Ýok

Русский (для учебного контента):
- `components/lesson/LessonCompleteScreen.tsx`: Lesson Complete! → Урок пройден!, performance messages, Continue → Продолжить, Practice Again → Повторить ошибки
- `components/lesson/FillBlankMode.tsx`: Hint → Подсказка, Continue → Дальше
- `components/lesson/MultipleChoiceMode.tsx`: Choose your response → Выбери ответ

### Фикс навигации

- После завершения урока (`onContinue` в LessonCompleteScreen) теперь **`router.back()`** вместо `router.push("/lessons")` — возврат в chapter-detail, а не на главную
- Exit dialog также возвращает `router.back()`
- Добавлен fallback на `/lessons` если `canGoBack()` false

### Изменённые файлы
- `assets/data/course_content.json` — добавлены 20 упражнений Главы 1, убраны старые sub-lessons
- `components/lesson/MultipleChoiceMode.tsx` — убрана голосовая фаза
- `components/lesson/FillBlankMode.tsx` — переделан с input на 4 варианта
- `components/lesson/ProgressHeader.tsx` — добавлены кнопки ← →
- `components/lesson/LessonContent.tsx` — handleOptionPress, onContinue → back, ConfirmDialog туркменский, проброс options для fill_blank
- `components/lesson/LessonCompleteScreen.tsx` — русский
- `components/lesson/VocabularyIntroScreen.tsx` — туркменский
- `app/chapter-detail.tsx` — туркменский
- `app/chapters.tsx` — meta текст туркменский
- `app/welcome.tsx`, `app/about-app.tsx`, `app/about-chinese.tsx` — заголовки туркменские
- `TZ.md` — добавлен Этап 4.7 (упражнения), обновлён Этап 5 (локализация)

### Тестирование на эмуляторе
- Запущен через `npx expo start` + `a` (Android emulator)
- Все 20 упражнений Главы 1 проходят
- TTS через expo-speech работает
- LessonCompleteScreen показывается в конце
- Навигация по стрелкам работает

---

## 2026-04-15 (Сессия 2) — Теория всех 30 глав

### Что сделано
Написана **полная теория для глав 2-30** по учебнику Boya Chinese Elementary I.

**Глава 1 была уже готова (Сессия 1), остальные 29 глав — в этой сессии:**

- **Главы 2-5** (Unit 1): 你是哪国人 / 那是你的书吗 / 图书馆在哪儿 / 在北京大学的东边
- **Главы 6-10** (Unit 2): 现在几点 / 明天你有课吗 / 你的电话号码是多少 / 多少钱一瓶 / 你家有几口人
- **Главы 11-15** (Unit 3): 北京的冬天比较冷 / 你在干什么呢 / 我去图书馆借书 / 我喜欢浅颜色的 / 明天是我朋友的生日
- **Главы 16-20** (Unit 4): 周末你干什么 / 做客(一) / 做客(二) / 现在习惯了 / 看病人
- **Главы 21-25** (Unit 5): 我喝了半斤白酒 / 他感冒了 / 你学了多长时间汉语 / 你吃了早饭来找我 / 你得多锻炼锻炼了
- **Главы 26-30** (Unit 6): 快考试了 / 爸爸妈妈让我回家 / 考得怎么样 / 我们已经买好票了 / 我要参加联欢会

### Структура каждой главы (по образцу Главы 1)
- **Introduction** — кто персонажи, что будет изучаться
- **Vocabulary** — 15-28 новых слов (hanzi + pinyin + RU перевод)
- **Grammar** — 3-4 правила с объяснением + примеры
- **Dialogues** — 1-2 диалога из книги (точно по тексту)
- **Tips** — 4-5 педагогических советов на русском

### Важно про контент
- **Что строго по книге:** словарь, тексты диалогов (hanzi + pinyin), названия грамматических тем, имена персонажей, Proper Nouns
- **Что — мои добавления (не из книги):** переводы на русский (в книге китайский + английский), Tips, формулировки объяснений грамматики на русском
- **Восстановлены обрезанные участки** диалогов где скан обрезался

### Извлечение страниц
- Использован PyMuPDF для извлечения страниц PDF в boya_pages/ (DPI 200)
- В прошлую сессию было 35 страниц, в этой — добрали до 244 (весь учебник)

### Изменённые файлы
- `assets/data/theory_content.ts` — добавлены главы 2-30 (теперь все 30 глав)
- `scripts/build-web.js` — синхронизированы те же главы для HTML-превью
- `web/index.html` — пересобран, теперь 320 КБ (вместо 70 КБ)
- `TZ.md` — обновлён статус 4.3 ✅, помечены все 30 глав готовыми
- `boya_pages/` — ~210 новых страниц PDF извлечено

### Прогресс
- **Теория: 31/31 глава** (0 + 1-30) — ✅ 100%
- Проверено через HTML-превью (`web/index.html`) — все главы открываются
- **Объём:** ~700+ слов, ~100 грамматических правил, ~50 диалогов
