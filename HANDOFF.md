# HANDOFF — Hytaý dili 1 (бывш. «TurkmenLearn: Chinese» · Şapak Apps)

> **Единственный живой документ проекта.** Сведён 2026-06-06 из старых
> STATUS / TZ / ROADMAP / WORKLOG / CURRICULUM_RESEARCH (они удалены, но
> остаются в git-истории — `git log --diff-filter=D --name-only` чтобы найти).

**Последнее обновление:** 2026-07-28 (ТУРКМЕНИЗАЦИЯ КОНТЕНТА ЗАВЕРШЕНА: интерфейс + **все 30 из 30
глав** переведены на туркменский, черновик; `theory_content.ts` и `course_content.json` — **0
символов кириллицы**; глоссарий 4565 записей / 0 конфликтов. Осталось: вычитка носителем (см.
раздел «🌐 Туркменизация» ниже). Ранее: 2026-07-03 декомпозиция `LessonContent` (Этапы A+B,
эмулятор); 2026-06-07 Stepik-редизайн.
**Версия:** v1.1 (Stepik-редизайн реализован) — ядро курса переведено на линейные шаги с замками
**Платформа:** Windows · PowerShell · Pixel_9_Pro AVD · Android (React Native / Expo)
**Путь:** `C:\Users\seydi\turkmen-chinese`

---

## 🎯 Где остановились (2026-06-07)

Сначала прошли спринт **«довести качество до 7/10»** (детали — в
[`improve.md`](improve.md)), затем **реализовали Stepik-редизайн целиком**
(логика + UI, см. раздел ниже).

Итог:
- **Stepik-редизайн готов:** экзамен 70%, модель шагов, разблокировка, лента
  шагов в `chapter-detail`, GitHub-карта на главном, теория-по-шагам — проверено
  на эмуляторе Pixel 9 Pro.
- **UI/UX · Content · Clean Code — на ~7** ✅
- **Business — почти 7:** reward-гард (XP за первое прохождение), фикс stats,
  пуш-напоминания, локальный бэкап (export/import), каркас аналитики + PostHog
  (**спит до вставки ключа** в `lib/analyticsConfig.ts`). Осталось: keystore.
- **60 тестов + CI** (GitHub Actions: tsc/lint/test), tsc/lint чисты.
- Приложение **собирается и запускается** через `npx expo run:android`.

**Ветка:** `main` · **Git origin:** `https://github.com/Shapak-Apps/turkmen-chinese.git`.

---

## 🌐 Туркменизация — ЧЕРНОВОЙ ПЕРЕВОД ЗАВЕРШЁН (команда переводчиков, с 2026-07-03)

> Команда переводчиков делает туркменский перевод. Рабочий процесс: **я даю
> туркменский черновик прямо в файлах, они редактируют в файлах** (НЕ отдельный
> документ — так решил владелец). Туркменский **заменяет русский in-place** (RU был
> placeholder, не сосуществует как второй язык — переключателя RU/TM нет). Порядок:
> **сначала весь интерфейс, потом контент — по одной главе за раз** (не всё сразу).

**Сохранность русского оригинала (2 копии):** (1) **git HEAD** — канонический полный
русский всех 30 глав (файлы `theory_content.ts`/`course_content.json` до перевода);
восстановить: `git checkout HEAD -- assets/data/theory_content.ts assets/data/course_content.json`.
(2) **`content-ru-backup/`** — физическая копия рядом (в `.gitignore`, исключена из `tsconfig`;
см. её README). Русский НЕ теряется — он заменяется in-place только в рабочих файлах.

**Лист решений для переводчиков (2026-07-09):** `glossary-decisions.md` — выжимка самого
рискованного в черновом переводе, сгруппировано по приоритетам: (1) грамматические термины
(`eýe`/`habar`/`işlik`/`çalyşma`… — повторяются в КАЖДОЙ главе, ошибка размножится),
(2) заимствования (`welosiped`→возможно `tigir`, `auditoriýa`, `leksiýa`…), (3) мои
конвенции (`Shema:` ×17, `Söz.` ×8), (4) спорные формулировки (不客气→`hiç zat däl` и др.).
С частотами и прогнозом. **Утверждённые решения применяются централизованно** одной заменой
по всем главам + пересборка глоссария + автопроверки. Отдать переводчикам ДО перевода
оставшихся глав — тогда правка стоит одну операцию.

**Глоссарий RU→TM:** `glossary-ru-tm.json` (машиночитаемый, подхватывается скриптами) +
`glossary-ru-tm.md` (для переводчиков). На всех главах 1-30: **4565 записей** (1256 терминов +
3309 фраз), **0 конфликтов**. Собирается автоматически сопоставлением `content-ru-backup/`
↔ рабочих файлов: `python scripts/build_glossary.py` (границы глав определяет сам; сейчас
`DONE = tuple(range(1, 31))` — все главы). Цель была единый термин во всех 30 главах; ловит
конфликты (один русский → два разных туркменских) и отказывается писать при конфликте.

**Что где лежит:**
- **Интерфейс (UI-чром):** `lib/strings.ts` — единый файл, переводчики правят значения тут.
- **Контент:** `assets/data/theory_content.ts` (теория) + `assets/data/course_content.json`
  (упражнения). ⚠️ В `course_content.json` поле `english` в options на самом деле хранит
  **перевод-значение** (сейчас русский!), а `instruction` — промпт вопроса (русский, пер-вопросный,
  иногда специфичный вроде «Что ответить на «谢谢»?»).

**Прогресс:**
- ✅ **Интерфейс — готов (черновик, 2026-07-03):** `strings.ts` был уже туркменский; добрал
  **8 английских хардкод-строк** из компонентов → централизовал в `strings.ts` (новые секции
  `audioPrompt` / `listening` / `breakdown` / `exitLesson`) + диалог выхода `ConfirmDialog`.
  Компоненты (`AudioPrompt`, `ListeningMultipleChoiceMode`, `SentenceBreakdownCard`,
  `LessonContent`) теперь читают из `T.*`. tsc/lint/63 теста зелёные. **Осталось:** вычитка
  носителем всего `strings.ts` (формулировки рабочие, не финал).
- ✅ **Контент — ВСЕ 30 ГЛАВ ГОТОВЫ (черновик, завершено 2026-07-28).** `theory_content.ts` и
  `course_content.json` — 0 символов кириллицы, `npx tsc --noEmit` (0) и `npm test` (63/63)
  зелёные на каждой главе. **Осталось только:** вычитка носителем всего туркменского черновика
  (термины рабочие, не финальные — см. `glossary-decisions.md`). Всё закоммичено и запушено;
  последний коммит `2c6e343`.

### ▶ КАК ПЕРЕВОДИЛИ (все 30 глав готовы; процесс — для справки / на случай правок после вычитки)
Инфраструктура — persistent-скрипты в `scripts/`. Порядок ровно такой:
1. **`python scripts/next_chapter.py N`** — печатает строки теории для чтения (offset..),
   заголовок, авто-строки из глоссария и **скелет NEW** (новые строки на перевод).
2. **Прочитать блок теории** (по offset из шага 1) и **перевести via Edit** посекционно
   (introduction+vocabulary / grammar / dialogues+tips). ⚠️ **СОХРАНЯТЬ ЧИСЛО СТРОК** —
   глоссарий парит строки теории позиционно; менять число строк = сломать сборку.
   Hanzi/pinyin НЕ трогать НИГДЕ (они из учебника). Переводить только русские значения.
3. **Упражнения:** открыть `scripts/apply_chapter.py`, вписать `CH = N` и заполнить `NEW`
   (скелет из шага 1), затем **`python scripts/apply_chapter.py`**. Скрипт САМ: сверяет что
   все строки переведены, ловит **дубли вариантов** (разные RU → один TM = флэшкарта с двумя
   одинаковыми ответами, вопрос нерешаем — тогда развести термины), заменяет ТОЛЬКО срез главы N,
   проверяет валидность JSON и остаток кириллицы, и лишь тогда пишет.
4. **Проверка:** `npx tsc --noEmit` (0) · `npm test` (63) · глава N без RU / глава N+1 ещё RU.
5. **Пересобрать глоссарий:** в `scripts/build_glossary.py` поменять `DONE = tuple(range(1, N+1))`,
   запустить — ждём «0 conflicts» (иначе есть разнобой терминов — починить и перезапустить).
6. **Обновить эту строку HANDOFF** (главы 1-N готовы; следующая — N+1).

**Ловушки (уже пойманы, помнить):** туркменский беднее на синонимы — `утро`/`завтра` оба
тянут на `ertir` → развёл `早上→säher`, `明天→ertir`. Родственники развёл `aga/ini/uýa/jigi`.
Дубли-проверка в `apply_chapter.py` ловит это автоматически (до записи — «ДУБЛЬ»).
Глава 28: RU-глосс `история` встретился у ДВУХ разных иероглифов (`历史`=история, гл.27;
`故事`=сказка/рассказ, гл.28) — build_glossary матчит по точной RU-строке, значит два
разных TM-значения = гарантированный CONFLICT (а backup трогать нельзя). Унифицировал
на устоявшееся `taryh` (в туркменском разговорном тоже годится как «вот история» = случай/
рассказ) — конфликта не возникло. Если такое повторится с другой парой омонимов — тот же
приём (унификация на более раннее значение), а не попытка развести двумя TM-словами.

**Частая ловушка — конфликт глоссария МЕЖДУ главами:** одна и та же русская строка
(например «красивый», «только что», «возвращаться», «не повезло», «воздух», «свежий»,
«учиться») переводится в новой главе иначе, чем уже устоялось в старой (обычно потому что
два разных иероглифа в разных главах имеют одинаковый русский глянец). `build_glossary.py`
ловит это как `CONFLICTS` при пересборке (шаг 5) — **не игнорировать, чинить сразу**: найти
обе строки (`grep` по переводу в `theory_content.ts` / `course_content.json`), унифицировать
на более раннее/устоявшееся значение, перепроверить число строк и кириллицу, пересобрать
глоссарий заново. Иногда унификация создаёт НОВЫЙ дубль в той же MCQ (например «воздух»→«howa»
сталкивается с «погода»→«howa» в одном вопросе) — тогда развести уточнением в скобках
(`howa (dem alynýan)`) или синонимом (`täzeçe` вместо `arassa`).

**Черновики требуют вычитки носителем** — см. `glossary-decisions.md` (первоочередные решения
по терминам). Туркменские формулировки рабочие, не финальные.

---

## ✅ РЕАЛИЗОВАН — редизайн на Stepik-шаги (логика + UI, 2026-06-07)

> Ядро курса переведено со «спокойной/открытой» модели на **Stepik-style:
> линейные шаги с замками**. Логика (`examResult`/`courseSteps`/`stepProgress`) и
> UI (лента в `chapter-detail`, карта в `lessons`, теория-по-шагам в `theory`)
> готовы и проверены на эмуляторе. Ниже — исходные решения (для контекста).

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

**✅ Фундамент №1 — СДЕЛАН (2026-06-07):** настоящий **Bap synagy с порогом 70%**
реализован (`lib/examResult.ts` + `ExamResultScreen` + `mode="exam"` в
`LessonContent`). Детали и принятые решения — в разделе «Backlog v2 → Bap synagy».
**Модель шагов и разблокировка тоже готовы** (`courseSteps.ts` + `stepProgress.ts`,
см. блок про логику ниже). Осталось — только UI (лента шагов + карта на главном).

**Объём:** это **редизайн ядра**, не полировка. Нужны: (а) модель шагов (разбить
контент главы на шаги + порядок), (б) логика разблокировки (расширить
`lib/lessonProgress.ts` — сейчас он считает завершения; нужен per-step
pass/unlock), (в) переделка `app/chapter-detail.tsx` в ленту шагов, (г) новый
компонент-карта на главном. Меняется философия на «обязательное освоение»
(отходим от старого ТЗ «без давления» — это осознанное решение владельца).

**Готово из фундамента (всё «всухую», с тестами, без эмулятора):**
- ✅ Экзамен 70% (`lib/examResult.ts`, `ExamResultScreen`, `mode="exam"`).
- ✅ **Модель шагов** — `lib/courseSteps.ts`: `buildChapterSteps(id)` строит
  линейную ленту (intro → vocab → grammar×N → dialogue×N → practice → exam)
  деривацией из `THEORY_DATA` + `COURSE_DATA`.
- ✅ **Логика разблокировки** — `lib/stepProgress.ts`: строгий Stepik-гейтинг
  (`computeStepStates`), кросс-главный гейт (`isChapterUnlocked` — глава N+1
  после сдачи экзамена N), хранилище теории + агрегаторы `getChapterStepStates`
  (лента одной главы) и `getCourseUnlocks` (карта на главном). Источники истины
  переиспользованы: экзамен ← examResult, практика ← lessonProgress, теория ←
  новый ключ `step_progress`.

**✅ UI редизайна СДЕЛАН и проверен на эмуляторе (2026-06-07):**
1. ✅ **Лента шагов** заменила 3 карточки в `chapter-detail.tsx` — потребляет
   `getChapterStepStates(id)`, вертикальная лента с рельсой ✓/▶/🔒, прогресс
   «N / M ädim», навигация: теория→`/theory?step=key`, практика→`/practise`,
   экзамен→`/chapter-test`. Заблокированные шаги не нажимаются.
2. ✅ **GitHub-карта** на главном (`(tabs)/lessons.tsx`, компонент `CourseMap`) —
   потребляет `getCourseUnlocks()`, строка на главу из квадратов-шагов
   (зелёный=сдан, рамка=текущий, серый=закрыт), замок на закрытых главах,
   галочка на сданных. Заменила старый одиночный прогресс-бар.
3. ✅ **Теория по шагам:** `theory.tsx` принимает `?step=key`, открывает пейджер
   на нужной секции (`initialScrollIndex`) и зовёт `markTheoryStepDone` по
   просмотру страницы (теория = авто-зачёт). Tips-страница без шага.

**Проверено на Pixel 9 Pro:** intro→…→dialog (свайп по теории) проставил 6/8,
практика стала current, экзамен под замком; карта на главном показала
6 зелёных + 1 текущий + 1 закрытый для главы 1, главы 2-5 под замком. Скриншоты
снимались через `adb exec-out screencap`.

**Остаточные мелочи UI (не блокеры, на потом):**
- Отметка теории «на просмотр» — лениво (открыл секцию = зачёт). Для авто-зачёта
  теории это ок; при желании ужесточить до «доскроллил».
- `chapters.tsx` (список 6 Bölüm) всё ещё ведёт в ту же ленту — оставлен как
  второй вход помимо карты.
- Практика→экзамен руками не прокликивал (20 упражнений); это тот же путь
  `computeStepStates`, что и теория→практика (юнит-тест + визуально подтверждён).

---

## 📋 Что ещё осталось (помимо Stepik)

- 🟠 **Keystore** — release собирается debug-ключом (`android/app/build.gradle:112`),
  Play отклонит локальную сборку. Нужен `.jks` (keytool) или EAS + Play App Signing.
  Это «локальная настройка», владелец готов сделать сам по инструкции.
- ✅ **Декомпозиция `LessonContent.tsx`** — ЗАВЕРШЕНА (2026-07-03): Этап A (мёртвый recording-код,
  дедуп 5 `onAnswer`-обработчиков → `handleSelfContainedAnswer`, скоринг → чистый `lib/lessonStats.ts`
  +3 теста) + Этап B (мик-ветка вычищена из `AudioPrompt`, 293→226 строк; **рантайм-проверка на
  эмуляторе** — flashcard/MC/listening_mc, аудио-цикл play→listen→reveal→answer, `jumpToQuestion`,
  мик-визуал после ответа исчез). **1073 → 757 строк**, tsc/lint/63 теста зелёные. Вынос хуков
  (audio/anim/scoring) сознательно НЕ делали — риск ≫ пользы. ✅ `string-similarity` +
  `@types/string-similarity` удалены из `package.json` (2026-07-03), tsc чист.

### ⏸ Отложено по решению владельца (всё держим локально)
- **Активация PostHog** — вставить `phc_`-ключ в `lib/analyticsConfig.ts` (см. память).
- **Облачный бэкап** (Supabase) — пока локального экспорта/импорта достаточно.
- ~~**Туркменизация контента**~~ — ✅ черновой перевод ЗАВЕРШЁН 2026-07-28 (см. раздел
  «🌐 Туркменизация» выше): интерфейс + все 30 глав контента. Осталась вычитка носителем.

### ⚠️ Device-QA (накопилось — проверить на устройстве)
reward-гард (повтор без XP) · shadowing-произношение (нет микрофона, «Dowam et») ·
пуш-напоминание (промпт + 19:00) · масштаб шрифта · доступность · локальный бэкап ·
глава 0 видна в Sapaklar · локализация (экран завершения — туркменский) ·
**экзамен главы** (поток pass ≥70% и fail <70%, экран результата, разбивка по
типам, пересдача реженерит вопросы, карточка «Bap synagy» показывает сдачу/лучший
результат, конфетти только на сдаче) ·
**Stepik-поток на реальном устройстве** (на эмуляторе ок): лента шагов открывает
теорию/практику/экзамен, теория проставляет шаги, практика→экзамен разблокируется
после 20 упражнений, карта на главном обновляется, переход между главами после
сдачи экзамена.

### Опциональное (обсуждалось, не решено)
- ✅ **Переименование приложения — РЕШЕНО (2026-07-03):** официальное имя **«Hytaý dili 1»**
  (туркменское, отображаемое). Обновлено в `app.json` `name`, нативном
  `android/app/src/main/res/values/strings.xml` `app_name` и `about.tsx` `APP_NAME`.
  Английский фолбэк для Play / ASCII-мест — **`turkmen_chinese_1`**. Package
  `com.turkmenlearn.chinese` НЕ менялся (неизменяемый ID приложения). ⚠️ Имя на домашнем
  экране обновится только после пересборки (`npx expo run:android`).

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
├── lessonProgress.ts        # AsyncStorage прогресс уроков (счётчик завершений)
├── examResult.ts            # Экзамены глав: порог 70%, pass/fail, hasPassedExam
├── lessonStats.ts           # Чистый computeLessonStats + типы LessonStats (вынесено из LessonContent)
├── courseSteps.ts           # Stepik-модель: buildChapterSteps (лента шагов главы)
├── stepProgress.ts          # Stepik-гейтинг: разблокировка шагов/глав + теория-store
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

### Bap synagy — полноценный тест главы (✅ СДЕЛАНО 2026-06-07 — фундамент Stepik)
Реализован настоящий экзамен. Базовая логика вынесена в `lib/examResult.ts`
(порог 70%, накопление попыток, лучший результат, «прилипающая» сдача,
`hasPassedExam` для будущего гейтинга) + 9 юнит-тестов (`examResult.test.ts`).
- [x] Порог прохождения 70% — логика «сдал / не сдал» (`isPassingScore`)
- [x] Отдельный экран результатов (`components/lesson/ExamResultScreen.tsx`):
  pass/fail, %, счёт, разбивка по типам, лучший результат, кнопка пересдачи
- [x] Не показывать `VocabularyIntroScreen` перед тестом (убрано из `chapter-test.tsx`)
- [x] Сохранение результата отдельно от `lessonProgress` (новый ключ `exam_results`)
- [x] Свой экран с «Synag tabşyryldy/geçilmedi» и оценкой (не `LessonCompleteScreen`)
- [x] Возможность пересдать тест (пересдача реженерит вопросы — новый shuffle)

**Как устроено:** `LessonContent` получил проп `mode="exam"` + `onComplete` —
переиспользует тот же UI вопросов, но по завершении отдаёт статистику родителю
(`chapter-test.tsx`), который сохраняет результат и рисует `ExamResultScreen`.
Карточка «Bap synagy» в `chapter-detail.tsx` теперь показывает порог 70% /
сдачу / лучший результат.

**Решения по экзамену (могут быть пересмотрены владельцем):**
- **Экзамен НЕ даёт XP** — это оценка, а не практика (заодно нельзя фармить XP
  пересдачами). XP зарабатывается в Gönükmeler. Если захочешь награду за сдачу —
  это небольшой follow-up в `awardCorrectXp`/`ExamResultScreen`.
- **Счёт — по первой попытке** на каждый вопрос (честная метрика). Ретраи на
  MC/listening (MAX_ATTEMPTS=3) и shadowing (всегда «зачёт») на итог не влияют,
  но как «экзамен» это поблажки → возможный follow-up: блокировать ретраи и
  не засчитывать shadowing-вопросы в экзамене автоматически.

**Следующий шаг (UI редизайна) лучше делать с запущенным приложением:** модель
шагов + разблокировка (`lib/lessonProgress.ts`/`examResult.ts`) → лента шагов →
GitHub-карта на главном.

### AI-фичи
- [ ] Conversation Mode — фича **УДАЛЕНА** в сессии 2026-06-07 (была мёртвым кодом).
  Если понадобится в v2 — восстановить из git (коммит `89424b9`).
- [ ] Speech recognition для оценки произношения — сейчас «говорение» это shadowing
  (повтори вслух, без STT). Реальный STT = `@react-native-voice/voice` или облако.
- [ ] Генерация упражнений · объяснения ошибок (нужен LLM-провайдер)

### Прочее
- [x] ~~Туркменизация контента~~ — ✅ черновой перевод всех 30 глав сделан 2026-07-28; осталась
  вычитка носителем (см. раздел «🌐 Туркменизация»).
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
7. **App name:** официальное **«Hytaý dili 1»** (2026-07-03) — в `app.json` `name`, native `strings.xml` `app_name`, `about.tsx` `APP_NAME`. Англ. фолбэк `turkmen_chinese_1`. Package `com.turkmenlearn.chinese` неизменен.
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
- **Не делай force push** (origin настроен, но мало ли)
- **Не вызывай destructive git без подтверждения** — пользователь явно сказал что несколько раз ассеты пропадали, и git был спасением

---

## 📞 Контакт пользователя

- **Имя:** Seydi Charyev
- **Email (личный):** `seydi.charyev@gmail.com`
- **Email команды/бренда:** `shapak.app@gmail.com` (в About экране)
- **Локация:** Mary, Mary Province, Türkmenistan
- **Команда:** Şapak Apps
