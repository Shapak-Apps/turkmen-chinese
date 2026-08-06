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
npm start
```

`npm start` Expo development serverini başladýar.

Zerur bolsa, aşakdaky buýruklary hem ulanyp bilersiňiz:

```bash
npm run android
npm run ios
npm run web
```

### Kurs mazmuny

Kurs 30 bapdan ybarat.

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
npm start
```

`npm start` starts the Expo development server.

If needed, you can also run:

```bash
npm run android
npm run ios
npm run web
```

### Content organization

The course contains 30 chapters.

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
