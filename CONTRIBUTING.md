# Contributing to Turkmen-Chinese

Thanks for helping with the Turkmen translation and review work. This guide
explains how to set up the project, what to check before opening a pull request,
and the content rules that keep the textbook data correct.

## Project setup

The app is an Expo / React Native project:

```bash
npm install
npx expo run:android
```

For a quick web preview, you can also use:

```bash
npx expo start --web
```

## Before opening a pull request

Run the same checks that CI runs:

```bash
npx tsc --noEmit
npm test
```

Keep changes focused and include a short description of what the PR changes.

## Content rules

This project translates Turkmen values only. Hanzi and pinyin come from the
textbook and must never be edited.

Before inventing a Turkmen term, check `glossary-ru-tm.md`. One Russian source
string must map to one Turkmen term across all 30 chapters, so terminology stays
consistent.

After editing glossary data, rebuild the glossary and confirm it reports zero
conflicts:

```bash
python scripts/build_glossary.py
```

## Where to start

Issues tagged with these labels are good entry points:

- `good first issue` — small, well-scoped tasks
- `help wanted` — tasks the maintainers want help with
- `translation` — Turkmen translation and review work
- `content` — lesson, phrase, and exercise content

If you are reviewing the translation, also read `glossary-decisions.md` first so
new terms follow the decisions already made.
