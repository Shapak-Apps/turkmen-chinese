# Hytaý dili 1

## Türkmençe

**Hytaý dili 1** — türkmen dilinden hytaý dilini öwrenmek üçin niýetlenen, internetsiz işleýän okuw programmasy.

### Tehnologiýalar

- React Native
- Expo
- TypeScript

### Ýerli gurşawda işletmek

```bash
npm install
npx expo run:android
```

Bu ýeke-täk işleýän ýol. Programma nätiw modullary ulanýar (bildiriş, faýl saýlaýjy,
iýeroglif ýazuwy), şonuň üçin **Expo Go bilen işlemeýär**, we web görnüşi hem ýok.
`npx expo run:android` dev-build ýygnaýar we enjama gurnaýar; soňra Metro-ny täzeden
başlatmak üçin `npx expo start --dev-client` ýeterlik.

### Kurs mazmuny

Kursda 31 bap bar: 0-njy bap — aýdylyş, 1–30-njy baplar — esasy okuw materialy.

- Teoriýa: `assets/data/theory_content.ts`
- Türgenleşikler: `assets/data/course_content.json`

### Interfeis setirleri

Interfeis setirleriniň hemmesi bir faýlda ýerleşýär:

```text
lib/strings.ts
```

### Terjimeçiler üçin düzgün

Diňe türkmen bahalaryny terjime ediň. Hanzi we pinyin ýazgylaryny üýtgetmäň.

### Barlaglar

```bash
npm run lint
npx tsc --noEmit
npm test
```

Häzirki wagtda 63 test bar.

### Ygtyýarnama

MIT

---

## English

**Hytaý dili 1** is an offline learning app for studying Chinese from Turkmen.

### Stack

- React Native
- Expo
- TypeScript

### Run locally

```bash
npm install
npx expo run:android
```

This is the only working way. The app uses native modules (notifications, document
picker, hanzi writer), so **Expo Go does not work** and there is no web build.
`npx expo run:android` builds a dev client and installs it; after that
`npx expo start --dev-client` is enough to restart Metro.

### Content organization

The course has 31 chapters: chapter 0 is pronunciation, chapters 1-30 are the main course.

- Theory: `assets/data/theory_content.ts`
- Exercises: `assets/data/course_content.json`

### Interface strings

All interface strings live in one file:

```text
lib/strings.ts
```

### Rule for translators

Translate Turkmen values only. Never modify hanzi or pinyin.

### Checks

```bash
npm run lint
npx tsc --noEmit
npm test
```

There are currently 63 tests.

### License

MIT
