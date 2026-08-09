# RELEASE — публикация «Hytaý dili 1»

Рабочий документ для сессии по выпуску в сторы. Составлен 2026-08-06.

**Пакет:** `com.turkmenlearn.chinese` (и Android, и iOS) · **slug:** `turkmen-learn-chinese` · **версия:** `1.0.0`

⚠️ Имя пакета менять нельзя после первой загрузки. Оно уже зафиксировано.

---

## 1. Сначала — проверить иконку

Иконка и сплеш заменены 2026-08-06 (знак `HYTAÝÇA1` в рамке, белым по красному `#B3261E`).
**Вживую их никто не видел** — иконка попадает в нативный манифест, в Expo Go она не появится.

```
npx expo prebuild --platform android --clean
npx expo run:android
```

Что смотреть, по пунктам:

- [x] **Иконка в лаунчере.** Надпись читается? На старых плотных экранах она рисуется мельче
- [x] **Форма маски.** Android режет иконку в круг, квадрат со скруглением или каплю — в зависимости от прошивки. Рамка знака не должна обрезаться. Передний слой вписан в безопасную зону 66%, но проверить надо глазами
- [x] **Тематическая иконка.** Настройки → Обои и стиль → Темы значков (Android 13+). Должен появиться монохромный силуэт, не пустой квадрат
- [x] **Сплеш.** Красный фон, знак по центру, без белой рамки вокруг экрана
- [x] **Ярлык под иконкой** — `Hytaý dili 1`, туркменские буквы не бьются

**Проверено на эмуляторе Pixel 9 Pro 2026-08-07 — все пункты пройдены, но после фикса.**
Первая сборка показала: круглая маска резала углы рамки знака — в лаунчере, в тематической
иконке и на сплеше (Android 12+ прижимает сплеш-иконку в невидимый круг). Причина: безопасная
зона 66% — это круг; рамка 603 px по стороне проходила по ширине, но её диагональ 853 px >
диаметра круга 676 px. Решение владельца (из трёх вариантов): **на Android-слоях рамку убрать** —
`android-icon-foreground.png`, `android-icon-monochrome.png`, `splash-icon.png` теперь только
надпись (диагональ 493 px, влезает с запасом); `icon.png` для iOS/сторов остался с рамкой.
⚠️ Зеркало исходников в `D:\desktop\hytay-logo\` не обновлялось — там лежат версии с рамкой.

Файлы, если понадобится править: `assets/images/icon.png`, `android-icon-foreground.png`,
`android-icon-monochrome.png`, `splash-icon.png`. Настройки — в `app.json`, блок `android.adaptiveIcon`
и плагин `expo-splash-screen`. Логотип в одну строку и исходники вариантов лежат в `D:\desktop\hytay-logo\`.

---

## 2. Что блокирует релиз прямо сейчас

| Блокер | Задача | Кто |
|---|---|---|
| **Нет release keystore** | [#6](https://github.com/Shapak-Apps/turkmen-chinese/issues/6) | владелец |
| **Туркменский черновик не вычитан** — интерфейс и 30 глав | [#3](https://github.com/Shapak-Apps/turkmen-chinese/issues/3), [#4](https://github.com/Shapak-Apps/turkmen-chinese/issues/4) | носители |
| **Термины из `glossary-decisions.md` не утверждены** | [#5](https://github.com/Shapak-Apps/turkmen-chinese/issues/5) | владелец + переводчики |

Вычитку логично закрывать через закрытый трек в Play: переводчики видят строки **в живом приложении**,
а не в JSON — сразу заметны обрезки, тон и то, как фраза сидит на экране.

### Keystore — начато 2026-08-07, остановились на шаге 1 из 5

**Разведка (проверено):** `keytool` есть в JDK от Android Studio —
`C:\Users\seydi\AppData\Local\Programs\Android Studio\jbr\bin\keytool.exe`.
Keystore от Ykjam Terjime лежит в `D:\2. SEYDI\5. Documents\Google Play Keystore\`
вместе с файлом пароля — туда же кладём новый.

⚠️ **Главная ловушка: `android/` не в git** (`.gitignore:50`, 0 отслеживаемых файлов) и полностью
пересоздаётся при `npx expo prebuild`. Значит правку `signingConfigs` прямо в
`android/app/build.gradle` снесёт следующая пересборка. Подпись надо вносить **config-плагином**,
который патчит `build.gradle` на каждом prebuild. Плагинов в проекте пока нет (`plugins/` отсутствует),
`eas.json` тоже нет.

**План на 5 шагов:**

1. ⏳ **Сгенерировать keystore** — владелец, в cmd.exe. Пароль спросит дважды, остальные поля в команде:
   ```
   "C:\Users\seydi\AppData\Local\Programs\Android Studio\jbr\bin\keytool.exe" -genkeypair -v -storetype PKCS12 -keystore "D:\2. SEYDI\5. Documents\Google Play Keystore\hytay-dili-1.jks" -alias hytay-dili-1 -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Hytay dili 1, OU=Shapak Apps, O=Shapak Apps, L=Mary, ST=Mary, C=TM"
   ```
   Параметры: alias `hytay-dili-1`, PKCS12, RSA 2048, 10000 дней (Play требует срок минимум до 22.10.2033).
2. `plugins/withReleaseSigning.js` — config-плагин, вписывает release-`signingConfig`, читает
   `keystore.properties` из корня; плагин подключается в `app.json`.
3. `keystore.properties` с реальным паролем (**в `.gitignore`**) + `keystore.properties.example` в репо.
4. Пересборка: `npx expo prebuild --platform android` → `cd android && .\gradlew bundleRelease`.
   Здесь же включить ABI splits + ProGuard и сверить target API.
5. Проверить подпись готового AAB (`apksigner verify --print-certs` / `jarsigner -verify`) —
   что подписан нашим ключом, а не debug.

**Про риск потери:** для новых приложений Play App Signing включён по умолчанию, то есть этот ключ
будет **upload key**, а не финальный ключ подписи. Его потеря не фатальна — Google сбрасывает upload key
по запросу. Бэкап всё равно обязателен, но формулировка «больше никогда не обновить» относится
к финальному ключу, который держит Google.

---

## 3. Android — Google Play

Аккаунт организации **Shapak-Apps** уже существует, через него выпущен Ykjam Terjime. Новый заводить не нужно.

**Сборка**

- [ ] Сгенерировать release keystore, **сразу положить резервную копию** рядом с `ykjam-terjime.jks` на D:
      — потеря keystore после публикации означает, что приложение больше никогда не обновить
- [ ] Собрать **AAB**, не APK — Play принимает только bundle
- [ ] Включить ABI splits и ProGuard, иначе универсальная сборка выходит под 90 МБ
- [ ] Проверить target API — Play требует свежий уровень, иначе загрузку не примут

**Карточка в консоли**

- [ ] Название, короткое и полное описание — туркменский основным, плюс русский и английский
- [ ] Скриншоты телефона: минимум 2, лучше 6–8. Показывать курс, урок, экзамен, прогресс
- [ ] Feature graphic 1024×500 — сюда идёт логотип в одну строку
- [ ] Иконка стора 512×512
- [ ] Категория: Образование
- [ ] Анкета IARC для возрастного рейтинга
- [ ] Политика конфиденциальности — **нужен свой URL**. У phrasebook она лежит на GitHub Pages,
      сделать так же для этого репозитория

**Data Safety — заполняется просто, потому что приложение офлайновое**

Проверено по коду 2026-08-06:

- сетевых вызовов нет вообще — ни `fetch`, ни `axios`
- аналитика разведена, но `POSTHOG_API_KEY` пустой, значит **никуда ничего не уходит**
- прогресс хранится локально в `AsyncStorage` (18 файлов)
- `android.permissions` пустой

Значит в анкете: данные не собираются и не передаются. ⚠️ Но если перед релизом кто-то впишет ключ
PostHog — анкету придётся переписывать, это станет сбором данных.

⚠️ `expo-notifications` в плагинах: на Android 13+ появляется `POST_NOTIFICATIONS`. Проверить, что
после `prebuild` в манифесте нет ничего лишнего сверх нужного.

⚠️ **Проверено после prebuild 2026-08-07 — лишние разрешения есть.** `android.permissions` в
`app.json` пустой, но библиотеки дописывают в манифест своё, и там оказались `RECORD_AUDIO`,
`MODIFY_AUDIO_SETTINGS`, `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `SYSTEM_ALERT_WINDOW`
(в основном от `expo-av`). Микрофоном приложение не пользуется — «говорение» это shadowing без STT,
мик-ветку вычистили из `AudioPrompt` ещё 03.07. `RECORD_AUDIO` в списке = Play спросит про запись
звука в Data Safety и покажет её пользователю в карточке. Лечится `android.blockedPermissions`
в `app.json`; после правки пересобрать и перепроверить манифест.

**Закрытое тестирование.** Проверить в консоли, требуется ли трек «12 тестировщиков × 14 дней».
Для персональных аккаунтов, заведённых после ноября 2023, это обязательно; организации освобождены,
но правило менялось — уточнить до того, как строить сроки.

---

## 4. iOS — App Store

Аккаунт Apple есть, через него выпущен Ykjam Terjime в январе 2026.

- [ ] Mac'а нет, значит сборка через **EAS Build**: `eas build --platform ios --profile production`
- [ ] Нужен **EAS Project ID** — со страницы проекта на expo.dev, вписывается в `app.json`
      (`owner` + `extra.eas.projectId`). У phrasebook этот шаг до сих пор не сделан, он и держит его iOS-релиз
- [ ] Скриншоты для iPhone и iPad
- [ ] `ITSAppUsesNonExemptEncryption: false` в `infoPlist` — иначе на каждой загрузке будут спрашивать
- [ ] Тот же URL политики конфиденциальности
- [ ] Отправка через `eas submit --platform ios`

---

## 5. Хвосты уборки — решить в этой же сессии

Удалено 2026-08-06: шаблонные картинки Expo (`react-logo*`, `partial-react-logo`), осиротевшие
`android-icon.png` и `android-icon-background.png`, неиспользуемая `convo-minimal.png`,
`scripts/restructure.js`, и `.idea/` (там лежал `turkmen-english.iml` — файл от другого проекта).

Решено 2026-08-07 (всё удалённое остаётся в git-истории):

| Что | Решение |
|---|---|
| `scripts/add-chapter*.js` — 12 файлов | ✅ Удалены (их удаления требовал сам improve.md) |
| `scripts/reset-project.js` | ✅ Удалён + команда `reset-project` убрана из `package.json` |
| `scripts/bundle-hanzi.js` | ✅ Оставлен — пересобирает `hanzi_data.json`, если вычитка тронет иероглифы |
| `thumbnail.png` в корне | ✅ Удалён (эпоха v1.0, 790 КБ, ссылок нет) |
| `improve.md` | ✅ Удалён; 6 живых пунктов перенесены в issues [#16](https://github.com/Shapak-Apps/turkmen-chinese/issues/16)–[#19](https://github.com/Shapak-Apps/turkmen-chinese/issues/19), ссылка в HANDOFF поправлена |
| `web/index.html` + `scripts/build-web.js` | ✅ Удалены — превью со вшитыми **русскими** данными, после туркменизации не пересобиралось; вычитку покроет закрытый трек в Play |
| `android/` на диске, **3,7 ГБ** | ✅ Оставлен на время релизных сборок — мусор, в git его нет, пересоздаётся `expo run:android` |

Python-скрипты (`build_glossary.py`, `apply_chapter.py`, `next_chapter.py`) и `glossary-ru-tm.*`
**не трогать** — это рабочий процесс перевода, он понадобится после вычитки носителями.
