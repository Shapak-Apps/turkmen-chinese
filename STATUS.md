# STATUS - TurkmenLearn Chinese

**Last Updated:** 2026-05-16

---

## 🎉 v1.0 готов

После большого редизайна + добавления геймификации (см. WORKLOG 2026-05-14 и 2026-05-16) — приложение готово к релизу.

**Git:** инициализирован 2026-05-16, ветка `main`, первый коммит `dcab977`.

**Что готово к финальному APK:**
- ✅ Полный редизайн (красный/зелёный/Inter, см. WORKLOG)
- ✅ Маскот Aman + 5 второстепенных персонажей с аватарками
- ✅ Геймификация: XP, Streak, Profile-таб, Bookmarks, Onboarding
- ✅ Chat-bubbles диалогов с auto-play TTS + closed captions
- ✅ Хаптик-фидбек везде, spring/wiggle анимации
- ✅ About the App контент (8 страниц на туркменском)

**Текущая задача:** тестирование release APK на реальном устройстве.

---

## ⚠️ Чистка диска C: (03.05.2026)

### ✅ Что НЕ трогали в этом проекте
- `node_modules` (~9.2 GB) — на месте, проект запускается без переустановки
- Исходники, `android/`, `assets/`, `app.json`, `package-lock.json` — целы
- `.git`, ветки, локальные изменения — на месте

### ⚠️ Что повлияет на следующую сборку Android

**Глобальный Gradle cache почищен** (`C:\Users\seydi\.gradle\caches` — ~7.5 GB удалено).

Это значит:
- При следующей команде `npx expo run:android` или `cd android && ./gradlew assembleRelease` Gradle будет **скачивать все зависимости заново** (Android SDK артефакты, npm-нативные модули и т.п.)
- Первая сборка займёт **10-30 минут** (вместо обычных 2-5 мин)
- Повторные сборки потом снова быстрые — кэш восстановится сам

### 📦 NDK status
В `C:\Users\seydi\AppData\Local\Android\Sdk\ndk` оставлена только версия **`29.0.14206865`** (удалены 6 старых: 25/26/27/28 + два устаревших патча 29).

Если этот проект потребует другую версию NDK при сборке — Android Studio автоматически предложит скачать.

### 🤖 Android emulator
Оставлен только **Pixel 9 Pro** AVD (удалён Medium_Phone). Для тестов запускай через Android Studio Device Manager.

**После 16.05.2026:** AVD один раз был сброшен через Wipe Data (когда Expo Go обновлялся) — данные приложения и app cache сброшены, но AVD работает.

---

## 🗑️ Что удалено вне проекта (но связанное с RN/Expo разработкой)
- Старые версии Android API platforms — оставлены: 34, 35, 36
- Старые версии build-tools — оставлены: 34.0.0, 35.0.0, 37.0.0
- npm/yarn/pnpm cache — почищены полностью

---

## 📂 Связанные ресурсы
- Auto-memory: `C:\Users\seydi\.claude\projects\C--Users-seydi\memory\project_turkmen_chinese.md`
- Источник материалов: `C:\Users\seydi\Desktop\Boya Chinese Source\` (НЕ удалён)
- Roadmap геймификации (выполнен): `ROADMAP.md`

---

## 📋 Что осталось до релиза в Play Store

1. **Тест на устройстве** — установлен APK, в процессе ручного QA
2. **Сжать аватарки** — 6 PNG (~6 МБ) через tinypng.com → ~1 МБ
3. **Финальный release APK** после фиксов
4. **Подпись APK** для Play Store (нужен keystore)
5. **Иконка/Splash для маркета** + скриншоты

## ⏸ Отложено в v2

- Полноценный Bap synagy с порогом 70% и отдельным экраном результатов
- Substantive rewrite диалогов глав 3-30 (сейчас только имена)
- Conversation Mode (код есть, скрыт за `href: null`)
- Speech recognition для оценки произношения
- AI-фичи: ChatGPT-учитель, объяснение ошибок
- Лидерборд, друзья (требуют backend)
- Push-уведомления о streak
