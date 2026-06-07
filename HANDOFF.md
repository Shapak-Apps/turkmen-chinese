# HANDOFF — TurkmenLearn Chinese / Şapak — Hytaý dili

> **Единственный живой документ проекта.** Сведён 2026-06-06 из старых
> STATUS / TZ / ROADMAP / WORKLOG / CURRICULUM_RESEARCH (они удалены, но
> остаются в git-истории — `git log --diff-filter=D --name-only` чтобы найти).

**Последнее обновление:** 2026-06-07 15:28
**Версия:** v1.0 (полировка до 7/10 почти завершена) → впереди **редизайн на Stepik-шаги**
**Платформа:** Windows · PowerShell · Pixel_9_Pro AVD · Android (React Native / Expo)
**Путь:** `C:\Users\seydi\turkmen-chinese`

---

## 🎯 Где остановились (2026-06-07)

Прошли большой спринт **«довести качество до 7/10»** по инвест-аудиту.
**Детальный трекер со всеми галочками — в [`improve.md`](improve.md)** (читать его).

Итог спринта:
- **UI/UX · Content · Clean Code — на ~7** ✅
- **Business — почти 7:** reward-гард (XP за первое прохождение), фикс stats,
  пуш-напоминания, локальный бэкап (export/import), каркас аналитики + PostHog
  (**спит до вставки ключа** в `lib/analyticsConfig.ts`). Осталось: keystore.
- **~42 коммита**, **34 теста + CI** (GitHub Actions: tsc/lint/test), tsc/lint чисты.
- Приложение **собирается и запускается** через `npx expo run:android`.

**Ветка:** `main` · **Git origin:** не настроен (только локально).

---

## 🚀 СЛЕДУЮЩИЙ БОЛЬШОЙ ЭТАП — редизайн на Stepik-шаги (решено 2026-06-07)

Меняем модель курса со «спокойной/открытой» на **Stepik-style: линейные шаги с
замками**. Все решения приняты:

**Структура.** Убираем 3 параллельные карточки главы (Teoriýa / Gönükmeler /
Bap synagy) → заменяем на **линейную ленту шагов с замками**.

**Зерно шагов — вариант B (мелко, ~8 шагов/глава):** каждая секция теории =
отдельный шаг (Giriş, Sözler, Grammatika×N, Dialog×N), блок практики = шаг,
экзамен = шаг. Итого ~8 × 30 глав ≈ **250 шагов**.

**Гейтинг — жёсткий Stepik + чекпойнт:** шаги внутри главы открываются строго по
порядку (замок на каждом); следующая глава открывается **после сдачи экзамена**.
Правила «сдал»:
- 📖 теория — долистал до конца (авто-зачёт, завалить нельзя);
- ✏️ практика — прошёл все упражнения (ошибки не блокируют, но пройти надо);
- 🏆 экзамен — **≥ 70%** (единственное, что можно завалить → пересдача).

**Два визуала:**
1. **Лента шагов главы** (вместо 3 карточек) — вертикальный список с ✓/▶/🔒.
2. **GitHub-карта прогресса — НА ГЛАВНОМ экране** (`(tabs)/lessons.tsx`): все шаги
   курса квадратами (зелёный=сдан, рамка=текущий, серый/замок=закрыт).

**⚠️ Фундамент №1 (делать первым):** настоящий **Bap synagy с порогом 70%**.
Сейчас это 15 случайных упражнений без «сдал/не сдал» (`app/chapter-test.tsx`) —
гейтинг не на чём держать. Детали в разделе «Backlog v2 → Bap synagy» ниже.

**Объём:** это **редизайн ядра**, не полировка. Нужны: (а) модель шагов (разбить
контент главы на шаги + порядок), (б) логика разблокировки (расширить
`lib/lessonProgress.ts` — сейчас он считает завершения; нужен per-step
pass/unlock), (в) переделка `app/chapter-detail.tsx` в ленту шагов, (г) новый
компонент-карта на главном. Меняется философия на «обязательное освоение»
(отходим от старого ТЗ «без давления» — это осознанное решение владельца).

**С чего начать в новой сессии:** с фундамента — реализовать настоящий экзамен
(70% + экран результата + сохранение pass/fail), затем модель шагов и разблокировку,
потом UI (лента шагов + карта на главном).

---

## 📋 Что ещё осталось (помимо Stepik)

- 🟠 **Keystore** — release собирается debug-ключом (`android/app/build.gradle:112`),
  Play отклонит локальную сборку. Нужен `.jks` (keytool) или EAS + Play App Signing.
  Это «локальная настройка», владелец готов сделать сам по инструкции.
- 🟠 **Декомпозиция `LessonContent.tsx`** (983 стр.) — крупный рефактор, лучше с
  запущенным приложением. (Совпадёт с Stepik-редизайном — его всё равно трогать.)

### ⏸ Отложено по решению владельца (всё держим локально)
- **Активация PostHog** — вставить `phc_`-ключ в `lib/analyticsConfig.ts` (см. память).
- **Облачный бэкап** (Supabase) — пока локального экспорта/импорта достаточно.
- **Туркменизация контента** — фаза команды переводчиков после готовности (RU =
  placeholder by design). UI-строки уже централизованы в `lib/strings.ts`.

### ⚠️ Device-QA (накопилось — проверить на устройстве)
reward-гард (повтор без XP) · shadowing-произношение (нет микрофона, «Dowam et») ·
пуш-напоминание (промпт + 19:00) · масштаб шрифта · доступность · локальный бэкап ·
глава 0 видна в Sapaklar · локализация (экран завершения — туркменский).

### Опциональное (обсуждалось, не решено)
- **Переименование приложения?** Сейчас в `app.json` `name: "TurkmenLearn: Chinese"`.
  Может стоит переименовать в **«Şapak — Hytaý dili»** для соответствия серии.
  Это поменяет имя на главном экране Android. Пользователь хотел обсудить.

---

## ✅ Что готово (v1.0)

### Контент
- 31 глава теории по учебнику Boya Chinese Elementary I (`assets/data/theory_content.ts`)
- 600 упражнений 8 типов (`assets/data/course_content.json`) — 30 глав × 20
- 1632 mp3 пиньинь (`assets/audio/pinyin/`)
- 768 иероглифов offline для stroke order (`assets/data/hanzi_data.json`)
- Персонажи переименованы (copyright cleanup 2026-04-29)

### Дизайн-система
- Палитра: 🔴 `#B91C1C` (китайский) + 🟢 `#00853E` (туркменский) + ⚪ белый + slate
- Шрифт Inter (4 веса через `@expo-google-fonts/inter`)
- Радиусы/spacing/shadow в токенах (`constants/theme.ts`)
- 11 экранов + 18 lesson-компонентов на новых токенах

### Иллюстрации и персонажи
- 31 Twemoji-SVG для глав (`assets/illustrations/ch0-30.svg`) — `react-native-svg-transformer` + `metro.config.js`
- 6 PNG-аватарок персонажей (`assets/characters/*.png`) — AI-сгенерированные пользователем
- Маппинг A/B → персонаж per chapter в `constants/CharacterAvatars.ts`
- Aman-маскот на главном/LessonComplete/welcome/empty states

### Интерактивность
- `lib/haptics.ts` — везде в навигации и упражнениях
- `components/ui/AnimatedPressable.tsx`, `AnimatedCounter.tsx`
- Wiggle на неправильный ответ (FlashcardMode, FillBlankMode)
- Confetti на завершение урока (250 частиц, бренд-цвета)
- Chat-bubbles диалогов с auto-play TTS + closed captions

### Геймификация
- `lib/xp.ts` — +10/ответ, +500/урок, +100 бонус 100%
- `lib/streak.ts` — markActiveDay при первом правильном ответе за день, reset через 1+ день
- `lib/bookmarks.ts` — закладки глав с фильтром
- `lib/onboarding.ts` + `app/onboarding.tsx` — 4 экрана swipe для первого запуска
- `lib/user.ts` — имя пользователя (вводится в онбординге, меняется в Profile)

### Структура
- **Tabs:** Esasy (home) + Profil (person-circle)
- **Profile-таб раскрыт** (был скрыт через `href: null`), `(tabs)/profile.tsx` полностью переписан
- About экран в формате Şapak Apps (2 модалки: Awtorlar + серия Şapak Apps)
- Брендинг **Şapak Apps** (команда из Mary, email **shapak.app@gmail.com**)

### Типы упражнений (8)
1. `single_response` — произнеси/выбери фразу
2. `multiple_choice` — выбери правильный перевод
3. `listening_mc` — послушай и выбери
4. `flashcard` — карточка слова (сетка 2×2)
5. `fill_blank` — заполнить пропуск
6. `match_pairs` — соединить пары (китайский ↔ перевод)
7. `grammar` — правило + практика (квиз)
8. `stroke_order` — рисуешь иероглиф пальцем (`@jamsch/react-native-hanzi-writer`)

---

## 📚 Главы Boya Chinese Elementary I (0-30)

Приложение построено на учебнике **Boya Chinese Elementary I, 2nd Edition** (博雅汉语·初级起步篇),
а **не** на HSK (с HSK ушли на этапе реструктуризации). Каждая глава: intro → новые слова →
грамматика → диалоги → советы, затем 20 упражнений.

| # | 中文 | EN | Фокус грамматики |
|---|---|---|---|
| 0 | 语音 | Pronunciation | инициали/финали/тоны (только теория, 1632 mp3) |
| 1 | 你好 | Hello | 是-句, вопросы с 吗 |
| 2 | 你是哪国人 | Nationality | национальности |
| 3 | 那是你的书吗 | Is That Your Book? | 这/那 + 的 + 谁/什么 |
| 4 | 图书馆在哪儿 | Where Is the Library? | 在, 哪儿, 方位词 |
| 5 | 在北京大学的东边 | East of PKU | 有/没有, 的时候 (итог Unit 1) |
| 6 | 现在几点 | What Time Is It? | числа 0-100, время, 几, 太...了 |
| 7 | 明天你有课吗 | Class Tomorrow? | части дня, 有/没有, 吧 |
| 8 | 你的电话号码是多少 | Phone Number? | номера, 吧, 几 vs 多少, 怎么走 |
| 9 | 多少钱一瓶 | How Much per Bottle? | деньги 块/毛, сч. слова, 二 vs 两 |
| 10 | 你家有几口人 | Family Size | семья, 口/条, 还 |
| 11 | 北京的冬天比较冷 | Beijing Winter | погода, 怎么样, 不A不B, 很/比较/最 |
| 12 | 你在干什么呢 | What Are You Doing? | 正在/在...呢, дни недели, 每...都, 从...到 |
| 13 | 我去图书馆借书 | Going to Library | посл. глаголы, 先...然后, 咱们, A不A |
| 14 | 我喜欢淡颜色的 | I Like Light Colors | цвета, 挺...的, 的-фраза, 有点儿 |
| 15 | 明天是我朋友的生日 | Friend's Birthday | подарки, 还是, 比如, 一直, 可+глагол |
| 16 | 周末你干什么 | Weekends | удвоение V-V, 又/了, 在+место+глагол |
| 17 | 做客（一） | Visiting 1 | этикет, 会, 就是, 还是 |
| 18 | 做客（二） | Visiting 2 | север/юг, 得, 不是...吗, 如果...就, 啦 |
| 19 | 现在习惯了 | Used to It Now | привычки, 了 (изменение), 就 vs 才 |
| 20 | 看病人 | Visiting a Patient | больница, 死了, 别+глагол, 一个人 |
| 21 | 我喝了半斤白酒 | Half a Jin | 又, V+了+кол-во+объект, 好像, 地 |
| 22 | 他感冒了 | Caught a Cold | болезни, 能, 最好, даты (年月日) |
| 23 | 你学了多长时间汉语 | How Long Studied? | V+了+время, 大概, 就 (все значения) |
| 24 | 你吃了早饭来找我 | After Breakfast | повелительные, 我+V+什么, 了(4), Время+Место+Глагол |
| 25 | 你得多锻炼锻炼了 | More Exercise | модальные (会/能/要/得/可以), 别+V+了, 得+多+V-V |
| 26 | 快考试了 | Exam Is Coming | 快/要/快要...了, 只好, 可能 |
| 27 | 爸爸妈妈让我回家 | Mom & Dad Want Me Home | 极了, 想 vs 要, 趟/次, 让 |
| 28 | 考得怎么样 | How Did Exam Go? | V+得+прил., 都, 为什么, 也许 |
| 29 | 我们已经买好票了 | Bought Tickets | результативные V+完/好/到/见/懂, 张, 终于 |
| 30 | 我要参加联欢会 | Going to the Party | 多...啊, 怕, 首/次, обзор модальных |

---

## 🧱 Стек технологий

| Технология | Назначение |
|---|---|
| React Native 0.81 | Фреймворк |
| Expo 54 | Сборка, dev tools |
| Expo Router 6 | Навигация (file-based) |
| TypeScript 5.9 | Типизация |
| AsyncStorage | Локальное хранение прогресса/XP/Streak/Bookmarks |
| Inter (Google Fonts) | UI шрифт |
| Twemoji SVG + react-native-svg + svg-transformer | Иллюстрации глав (SVG как компоненты) |
| react-native-reanimated | Анимации (wiggle, scale, fade) |
| expo-haptics | Тактильный фидбек |
| react-native-confetti-cannon | Celebration на завершение урока |
| expo-speech | TTS (озвучка китайского) |
| expo-av | Аудио (deprecated в SDK54 → миграция на expo-audio в v2) |
| @jamsch/react-native-hanzi-writer | Анимация написания иероглифов |

---

## 🗂 Структура проекта

```
app/
├── _layout.tsx              # Root: Inter fonts, SplashScreen, streak check
├── index.tsx                # Async redirect: onboarding или /(tabs)/lessons
├── onboarding.tsx           # 4 swipe-экрана, 4-й = name input
├── (tabs)/
│   ├── _layout.tsx          # Tabs с lessons + profile
│   ├── lessons.tsx          # Главный: Aman hero + XP/Streak + Dowam et
│   ├── profile.tsx          # XP-карта, Streak, stats, menu, rename modal
│   └── conversations.tsx    # Скрыт (href: null)
├── chapters.tsx             # 6 Bölüm групп, bookmark фильтр
├── chapter-detail.tsx       # Hero hanzi+pinyin, stats, 3 action cards
├── theory.tsx               # Pager: intro/vocab/grammar/dialogue/tips
│                            # DialoguePage: chat bubbles + auto-play + captions
├── practise.tsx             # Menu из 3 опций + lesson modes
├── chapter-test.tsx         # 15 случайных упражнений (v2: full test)
├── settings.tsx             # Stroke order настройки + reset onboarding
├── about.tsx                # Şapak Apps brand, 2 modals
├── about-app.tsx            # 8 страниц "как пользоваться" (Programma hakynda)
├── about-chinese.tsx        # 10 страниц о китайском языке
└── welcome.tsx              # Aman intro + 2 ссылки (about-app/about-chinese)

lib/
├── xp.ts                    # +10/+500/+100 бонус, useXP
├── streak.ts                # markActiveDay, checkAndResetIfNeeded, useStreak
├── bookmarks.ts             # useBookmarks
├── onboarding.ts            # hasOnboarded/markOnboarded/resetOnboarding
├── user.ts                  # getUserName/setUserName/useUserName
├── haptics.ts               # tap/select/success/error/heavy
├── lessonProgress.ts        # AsyncStorage прогресс уроков
├── settings.ts              # Stroke settings (leniency/hint/mode)
└── vocabulary.ts            # getChapterVocabulary, getChapterUniqueHanzi

constants/
├── CharacterAvatars.ts      # 6 PNG персонажей + per-chapter mapping
├── ChapterIllustrations.ts  # 31 SVG (Twemoji)
├── CourseData.ts            # Загрузка course_content.json
└── theme.ts                 # Colors, FontFamily, Type, Radius, Spacing, Shadow

assets/
├── characters/              # 6 PNG ~6 МБ (надо сжать)
├── illustrations/           # 31 SVG ~108 KB
├── data/                    # course_content.json, theory_content.ts, hanzi_data.json
├── audio/pinyin/            # 1632 mp3
└── images/                  # icon.png (наш), shapak_logo.png (бренд)
```

---

## 🧠 Важный контекст / технические особенности

**SVG-импорты требуют полной перезагрузки Metro.** При добавлении новых `.svg` в
`assets/` — Metro кэширует резолвер. Нужно `Ctrl+C` → `npx expo start -c` (флаг `-c`
чистит кэш). Hot reload `r` не подхватывает изменения `metro.config.js` или новые
папки с SVG.

**PNG/изображения работают через `require()`** в `constants/CharacterAvatars.ts` и
`app/about.tsx` — это статические импорты, нельзя динамическое имя файла.

**Tabs vs Stack** в `(tabs)/_layout.tsx` — была проблема с белым экраном когда
`tabBarStyle: { display: "none" }`. Сейчас используется обычный `Tabs` с видимым
нижним баром и 2 табами (lessons + profile, conversations скрыт через `href: null`).
Если когда-нибудь захочется снова скрыть tab bar — НЕ ставь `display: "none"` на
tabBarStyle, это ломает рендер на Android. Лучше использовать `Stack`.

**Локализация:** UI на туркменском, объяснения учебного материала — на русском
(комбинация выбрана для туркменоговорящих с русским вторым). Hanzi/pinyin без
изменений. AboutScreen и онбординг только на туркменском.

### Известные quirks

1. **`assets/animations/`** — пустая папка, остаток от попытки добавить Lottie (отказались, LottieFiles потребовал Premium)
2. **`Conversation` код** есть в `components/conversation/` но `app/conversation.tsx` доступ скрыт через `href: null` в табах — оставлено для v2
3. **Boya PDF и boya_pages** вынесены из репо в `~/Desktop/Boya Chinese Source/`, в `.gitignore`
4. **expo-av deprecated warning** при запуске — нормально, миграция на expo-audio в v2
5. **Существует sibling-приложение** `C:\Users\seydi\Shapak-Apps\turkmen-phrasebook` — оттуда взят `shapak_logo.png` и формат About-экрана. Это другое приложение той же команды.

---

## ⚙️ Сборка и окружение

> 🛑 **Expo Go НЕ работает для этого проекта** (урок 2026-06-07). Проект bare
> (есть `android/`) + кастомные нативные модули (`posthog-react-native`,
> `expo-notifications`, `expo-document-picker`, `expo-sharing` и др.) — их нет в
> Expo Go. `npx expo start` + Expo Go = «Failed to download remote update» /
> краш. **Запускать только `npx expo run:android`** (соберёт dev-build со всеми
> модулями и поставит `com.turkmenlearn.chinese`). После добавления нативных
> модулей нужна пересборка, не reload.
>
> Эмулятору Pixel 9 Pro мало RAM (~3 ГБ, был зависший System UI) — закрывать
> лишнее / Cold Boot перед сборкой.

```powershell
# Сборка + запуск dev-build (ЕДИНСТВЕННЫЙ рабочий путь для разработки)
cd C:\Users\seydi\turkmen-chinese
npx expo run:android
# Первый раз 10-30 мин (gradle-кэш + нативные модули). Дальше быстрее.

# Тесты / типы / линт (как в CI)
npm test
npx tsc --noEmit
npm run lint

# При проблемах с резолвером SVG / новых ассетов — чистим кэш Metro:
npx expo start -c

# Сборка release APK
cd android
.\gradlew assembleRelease
# APK в: android\app\build\outputs\apk\release\app-release.apk

# Установить APK на телефон по USB
cd C:\Users\seydi\turkmen-chinese
adb install -r android\app\build\outputs\apk\release\app-release.apk

# Сборка + установка одной командой
npx expo run:android --variant release

# Git
git log --oneline -5
git status
```

### ⚠️ Первая сборка после чистки диска будет ДОЛГОЙ (10-30 мин)
**Глобальный Gradle cache был почищен (03.05.2026)** — `C:\Users\seydi\.gradle\caches`
(~7.5 GB удалено). При первой `gradlew assembleRelease` / `npx expo run:android`
Gradle скачает все зависимости заново. Повторные сборки снова быстрые (2-5 мин).

- **NDK:** оставлена только версия `29.0.14206865` в `C:\Users\seydi\AppData\Local\Android\Sdk\ndk`.
  Если проект потребует другую — Android Studio предложит скачать.
- **Android SDK:** API platforms 34/35/36, build-tools 34.0.0/35.0.0/37.0.0.
- **Эмулятор:** оставлен только **Pixel 9 Pro** AVD (запуск через Android Studio Device Manager).
  Один раз был сброшен Wipe Data при обновлении Expo Go — данные приложения сбросились, AVD работает.
- **`node_modules`** (~9.2 GB) на месте — проект запускается без переустановки.

---

## 🔮 Backlog v2 (отложено)

### Bap synagy — полноценный тест главы (⬆️ ПОВЫШЕН до фундамента Stepik — делать ПЕРВЫМ, 2026-06-07)
Сейчас `app/chapter-test.tsx` работает как обычные упражнения — берёт 15 случайных
из 20 через тот же `LessonContent`. Без настоящего экзамена Stepik-гейтинг держать
не на чём. Нужно:
- [ ] Порог прохождения 70% — логика «сдал / не сдал»
- [ ] Отдельный экран результатов (счёт, % правильных, разбивка по типам)
- [ ] Не показывать `VocabularyIntroScreen` перед тестом
- [ ] Сохранение результата теста отдельно от прогресса упражнений в `lessonProgress`
- [ ] Свой `LessonCompleteScreen` с заголовком «Synag tamamlandy» и оценкой
- [ ] Возможность пересдать тест

### AI-фичи
- [ ] Conversation Mode — фича **УДАЛЕНА** в сессии 2026-06-07 (была мёртвым кодом).
  Если понадобится в v2 — восстановить из git (коммит `89424b9`).
- [ ] Speech recognition для оценки произношения — сейчас «говорение» это shadowing
  (повтори вслух, без STT). Реальный STT = `@react-native-voice/voice` или облако.
- [ ] Генерация упражнений · объяснения ошибок (нужен LLM-провайдер)

### Прочее
- [ ] Туркменизация контента — фаза команды переводчиков (RU = placeholder).
- [ ] Миграция expo-av → expo-audio (expo-av deprecated)
- [ ] Лидерборд, друзья (требуют backend)
- [x] ~~Push-уведомления о streak~~ — ✅ сделано (локальные, 2026-06-07)

---

## 🔑 Важные решения

1. **XP economy:** «большие» числа — +10/+500/+100
2. **Streak activity:** «активный день» = хотя бы 1 правильный ответ
3. **Profile placement:** раскрыт как 2-й таб с видимой нижней панелью (вместо скрытого `href: null`)
4. **Brand:** **Şapak Apps** (команда из Mary, Türkmenistan), email **shapak.app@gmail.com**
5. **Username flow:** введение на 4-м экране онбординга, изменение через pencil-icon в Profile
6. **Greeting:** «Salam {имя}!» / «Okuwy dowam edýäris!» (без greeting по времени)
7. **App name внутри About:** «Şapak — Hytaý dili» (но `app.json` всё ещё `TurkmenLearn: Chinese` — обсудить смену)
8. **Учебник:** ушли с HSK на **Boya Chinese Elementary I** (структура курса по нему)
9. **License/credits:** Boya, Twemoji (CC-BY 4.0), Hanzi Writer (MIT), Inter (OFL), MIT для приложения
10. **(2026-06-07) Stepik-редизайн:** курс → линейные шаги с замками (зерно B ~8
    шагов/глава; теория=долистал, практика=прошёл, экзамен=70%); глава N+1 после
    сдачи экзамена; 2 визуала (лента шагов вместо 3 карточек + GitHub-карта на
    главном). Меняем философию на «обязательное освоение». Фундамент — настоящий экзамен.
11. **(2026-06-07) Локально-first:** аналитика (PostHog) и бэкап держим локально/спящими,
    облако не подключаем, пока владелец не скажет.

---

## ⚠️ Не делай этого

- **Не запускай Tabs с `tabBarStyle: { display: "none" }`** на Android — рендерит белый экран. Используй `Stack` если нужно скрыть tab bar.
- **Не добавляй ассеты в новые папки без полной перезагрузки Metro** (`npx expo start -c`)
- **Не амэнди опубликованные коммиты** — git настроен, истории нужно беречь
- **Не делай force push** (origin вообще нет, но мало ли)
- **Не вызывай destructive git без подтверждения** — пользователь явно сказал что несколько раз ассеты пропадали, и git был спасением

---

## 📞 Контакт пользователя

- **Имя:** Seydi Charyev
- **Email (личный):** `seydi.charyev@gmail.com`
- **Email команды/бренда:** `shapak.app@gmail.com` (в About экране)
- **Локация:** Mary, Mary Province, Türkmenistan
- **Команда:** Şapak Apps
