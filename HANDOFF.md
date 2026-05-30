# HANDOFF — TurkmenLearn Chinese / Şapak — Hytaý dili

**Дата:** 2026-05-27
**Версия:** v1.0.0 (готовится к релизу)
**Платформа:** Windows · PowerShell · Pixel_9_Pro AVD
**Путь:** `C:\Users\seydi\turkmen-chinese`

---

## 🎯 Где остановились

Закончили **большую сессию редизайна + геймификации**. Пользователь установил release APK на телефон, идёт ручное тестирование. Продолжим завтра в новой сессии.

**Последний коммит:** `2bfc136 docs: update STATUS/WORKLOG for 2026-05-27`
**Ветка:** `main`
**Git origin:** не настроен (только локальный репозиторий)

---

## ✅ Что готово (v1.0)

### Контент
- 31 глава теории по учебнику Boya Chinese Elementary I (`assets/data/theory_content.ts`)
- 600 упражнений 8 типов (`assets/data/course_content.json`)
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

---

## 🔄 Что в процессе

**Финальное тестирование release APK на телефоне** — пользователь установил APK, проверяет вручную. На момент окончания сессии всё работало OK, но полного прохождения курса не было.

**Команда сборки APK** (если понадобится пересборка):
```powershell
cd C:\Users\seydi\turkmen-chinese\android
.\gradlew assembleRelease
# APK в: android\app\build\outputs\apk\release\app-release.apk
```

---

## 📋 Что планировали на следующую сессию

### Срочное
1. **Завершить QA на устройстве** — пройти 2-3 главы целиком, проверить:
   - XP начисляется (+10 каждый ответ, +500 урок)
   - Streak увеличивается при первом правильном ответе за день
   - Bookmarks toggle работает + фильтр
   - Closed captions появляются во время «Diňle» в диалогах
   - Aman аватарка везде где должна быть
2. **Сжать аватарки PNG** через [tinypng.com](https://tinypng.com) — 6 файлов в `assets/characters/`. Сейчас ~6 МБ, должно стать ~1 МБ. Положить с теми же именами.
3. **Зафиксить найденные баги**

### Опциональное (обсуждалось но не решено)
- **Переименование приложения?** Сейчас в `app.json` `name: "TurkmenLearn: Chinese"`. Может стоит переименовать в **«Şapak — Hytaý dili»** для соответствия серии. Это поменяет имя на главном экране Android. Пользователь хотел обсудить.
- **Подпись APK для Play Store** — нужен release keystore (`.jks`). Сейчас собирается debug-key. См. `android/app/build.gradle`.
- **Иконка/Splash для Play Store** + скриншоты — нужно отдельно подготовить.

### v2 (отложено)
- Полноценный Bap synagy с порогом 70% (см. TZ.md Этап 8)
- Substantive rewrite диалогов глав 3-30 для полной copyright-чистоты
- Conversation Mode (код есть в `components/conversation/`, скрыт через `href: null`)
- Speech recognition для оценки произношения
- AI-фичи

---

## 🧠 Важный контекст для следующего ассистента

### Технические особенности

**SVG-импорты требуют полной перезагрузки Metro.** При добавлении новых `.svg` в `assets/` — Metro кэширует резолвер. Нужно `Ctrl+C` → `npx expo start -c` (флаг `-c` чистит кэш). Hot reload `r` не подхватывает изменения `metro.config.js` или новые папки с SVG.

**PNG/изображения работают через `require()`** в `constants/CharacterAvatars.ts` и `app/about.tsx` — это статические импорты, нельзя динамическое имя файла.

**Tabs vs Stack** в `(tabs)/_layout.tsx` — была проблема с белым экраном когда `tabBarStyle: { display: "none" }`. Сейчас используется обычный `Tabs` с видимым нижним баром и 2 табами (lessons + profile, conversations скрыт через `href: null`). Если когда-нибудь захочется снова скрыть tab bar — НЕ ставь `display: "none"` на tabBarStyle, это ломает рендер на Android. Лучше использовать `Stack`.

**Локализация:** UI на туркменском, объяснения учебного материала — на русском (комбинация выбрана для туркменоговорящих с русским вторым). Hanzi/pinyin без изменений. AboutScreen и онбординг только на туркменском.

### Структура проекта

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

### Известные quirks

1. **`assets/animations/`** — пустая папка, остаток от попытки добавить Lottie (отказались, LottieFiles потребовал Premium)
2. **`Conversation` код** есть в `components/conversation/` но `app/conversation.tsx` доступ скрыт через `href: null` в табах — оставлено для v2
3. **Boya PDF и boya_pages** вынесены из репо в `~/Desktop/Boya Chinese Source/` (см. STATUS.md), в `.gitignore`
4. **expo-av deprecated warning** при запуске — нормально, миграция на expo-audio в v2
5. **Существует sibling-приложение** `C:\Users\seydi\Shapak-Apps\turkmen-phrasebook` — оттуда взят `shapak_logo.png` и формат About-экрана. Это другое приложение той же команды.

### Полезные команды

```powershell
# Запуск dev-сервера
cd C:\Users\seydi\turkmen-chinese
npx expo start
# При проблемах с резолвером SVG/новых ассетов:
npx expo start -c

# Сборка release APK (10-30 мин первый раз)
cd android
.\gradlew assembleRelease

# Установить APK на телефон по USB
cd C:\Users\seydi\turkmen-chinese
adb install -r android\app\build\outputs\apk\release\app-release.apk

# Сборка + установка одной командой
npx expo run:android --variant release

# Git status / последний коммит
git log --oneline -5
git status
```

### Где смотреть документацию

- **`STATUS.md`** — текущее состояние, что готово, что осталось
- **`WORKLOG.md`** — детальный лог по сессиям (последняя — 2026-05-27)
- **`TZ.md`** — техническое задание, этапы 1-13
- **`ROADMAP.md`** — план геймификации (всё выполнено)
- **`HANDOFF.md`** — этот файл

---

## 🔑 Важные решения принятые в этой сессии

1. **XP economy:** «большие» числа — +10/+500/+100
2. **Streak activity:** считается «активный день» = хотя бы 1 правильный ответ
3. **Profile placement:** раскрыт как 2-й таб с видимой нижней панелью (вместо скрытого `href: null`)
4. **Brand:** **Şapak Apps** (команда из Mary, Türkmenistan), email **shapak.app@gmail.com**
5. **Username flow:** введение на 4-м экране онбординга, изменение через pencil-icon в Profile
6. **Greeting:** «Salam {имя}!» / «Okuwy dowam edýäris!» (без greeting по времени)
7. **App name внутри About:** «Şapak — Hytaý dili» (но `app.json` всё ещё `TurkmenLearn: Chinese` — обсудить смену)
8. **License/credits:** Boya, Twemoji (CC-BY 4.0), Hanzi Writer (MIT), Inter (OFL), MIT для приложения

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

---

**До следующей сессии 👋**
