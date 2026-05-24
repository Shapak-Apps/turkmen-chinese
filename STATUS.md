# STATUS - TurkmenLearn Chinese

**Last Updated:** 2026-05-03

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

---

## 🗑️ Что удалено вне проекта (но связанное с RN/Expo разработкой)
- Старые версии Android API platforms — оставлены: 34, 35, 36
- Старые версии build-tools — оставлены: 34.0.0, 35.0.0, 37.0.0
- npm/yarn/pnpm cache — почищены полностью

---

## 📂 Связанные ресурсы
- Auto-memory: `C:\Users\seydi\.claude\projects\C--Users-seydi\memory\project_turkmen_chinese.md`
- Источник материалов: `C:\Users\seydi\Desktop\Boya Chinese Source\` (НЕ удалён)
