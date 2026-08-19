# Contributing to Hytaý dili 1

Thanks for helping! This guide gets you from zero to your first pull request.

## Setup

1. Fork the repository and clone your fork.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app on a device or emulator:

   ```bash
   npx expo run:android
   ```

Android is the only supported target.

## Before you open a pull request

Run the same three checks CI runs (see `.github/workflows/ci.yml`):

```bash
npx tsc --noEmit   # type check
npm run lint       # lint
npm test           # jest
```

If all three are green locally, CI will be green too.

## The content rule

Translate Turkmen values only. Hanzi and pinyin come from the textbook and must never be edited.

## The terminology rule

Check `glossary-ru-tm.md` and `glossary-decisions.md` before inventing a term. One Russian source string must map to one Turkmen term across all 30 chapters.

Notes on the glossary:

- `glossary-ru-tm.md` is **generated**, not edited by hand. The trigger for a rebuild is editing `assets/data/theory_content.ts` or `assets/data/course_content.json`.
- Contributors **read** the glossary; **maintainers rebuild** it. Rebuilding the glossary with 0 conflicts is a maintainer step — do not try to run the build script on a fresh clone (it depends on local files that are not part of the repository).

## Labels for newcomers

Look for these labels if you want to start small:

- `good first issue`
- `help wanted`
- `translation`
- `content`