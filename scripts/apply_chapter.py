# -*- coding: utf-8 -*-
"""Apply Turkmen translations to ONE chapter's EXERCISES (course_content.json).

Reusable per-chapter applier for the Turkmenization task. Only two things change
per chapter: CH and the NEW dict. Everything else (glossary merge, duplicate-option
guard, chapter-slice isolation, cyrillic check) is fixed.

Theory (theory_content.ts) is translated separately by hand via Edit, section by
section (introduction+vocabulary / grammar / dialogues+tips), PRESERVING line count.

Workflow per chapter N:
  1. Split strings:  python scripts/next_chapter.py N   (prints glossary hits + NEW to fill)
  2. Read theory block, translate it via Edit (keep line count identical!).
  3. Fill CH + NEW below, run:  python scripts/apply_chapter.py
  4. Verify (tsc, tests, cyrillic, dup check across 1..N).
  5. Rebuild glossary: bump DONE in scripts/build_glossary.py, run it.
  6. Update HANDOFF progress line.

The script REFUSES to write if any string lacks a translation, any option-set has
duplicate values, or cyrillic remains in the chapter slice.
"""
import json, re, io, collections, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, "assets", "data", "course_content.json")
CYR = re.compile("[А-Яа-яЁё]")

# ============================================================
# EDIT THESE TWO PER CHAPTER
# ============================================================
CH = 30

NEW = {
    "Упражнения к Главе 30": "30-njy baba gönükmeler",
    "поп-музыка": "pop-aýdym",
    "народная песня": "halk aýdymy",
    "рок": "rok",
    "классика": "klassika",
    "произношение": "aýdylyş",
    "тоны": "äheňler",
    "бояться": "gorkmak",
    "не любить": "halamazlyk",
    "стандартный": "standart",
    "плохой": "erbet",
    "правильный": "dogry",
    "багаж": "goş-golam",
    "сумка": "sumka",
    "чемодан": "çemodan",
    "собирать (вещи), убирать": "goş ýygnamak, arassalamak",
    "пойти": "gitmek",
    "восклицательная частица (多...啊!)": "gygyryş bölejigi (多...啊!)",
    "Вставь пропущенное слово: «Какой же стыд!»": "Ýetmeýän sözi goý: «Ýaman utanç ahyry!»",
    "«бояться»": "«gorkmak»",
    "Вставь пропущенное слово: «Ты боишься выступать?»": "Ýetmeýän sözi goý: «Çykyş etmekden gorkýarsyňmy?»",
    "сч.слово для песен": "aýdymlar üçin sanaýyş söz",
    "Вставь пропущенное слово: «Планирую спеть одну китайскую песню.»": "Ýetmeýän sözi goý: «Bir hytaý aýdymyny aýtmagy meýilleşdirýärin.»",
    "«полдня»": "«ýarym gün»",
    "Вставь пропущенное слово: «Вчера полдня собирал.»": "Ýetmeýän sözi goý: «Düýn ýarym gün ýygnadym.»",
    "«Зачем готовиться?» Хочу спеть китайскую народную песню. Как?": "«Näme üçin taýýarlanmaly?» Hytaý halk aýdymyny aýtmak isleýärin. Nädip?",
    "(сч.сл. песен)": "(aýdymlar üçin sanaýyş söz)",
    "народная": "halk",
    "Отрицание + намерение + счётное слово 首.": "Inkär + niýet + 首 sanaýyş sözi.",
    "«Не пою» — противоречит.": "«Aýdym aýtmaýaryn» — gapma-garşy.",
    "«Англ. песни хорошие» — но ты не хочешь.": "«Iňlis aýdymlary gowy» — ýöne sen islänok.",
    "«Что если произношение плохое?» Будет стыдно! Как выразить?": "«Aýdylyş erbet bolsa näme?» Utanç bolar! Nädip aýtmaly?",
    "репутация": "abraý",
    "какой же": "ýaman",
    "Условие + восклицание с 多...啊.": "Şert + 多...啊 bilen gygyryş.",
    "«Произношение хорошее» — противоречит.": "«Aýdylyş gowy» — gapma-garşy.",
    "«Не надо бояться» — говорит другой, не ты.": "«Gorkma» — başga biri aýdýar, sen däl.",
    "«Пойдём вместе?» Ты ещё не собрала вещи, в другой раз. Как?": "«Bile gideliňmi?» Sen entek goş-golamyňy taýýarlamadyň, başga gezek. Nädip?",
    "в след. раз": "indiki gezek",
    "Отрицательный результативный + предложение в след. раз.": "Inkär netijeli işlik + indiki gezek teklibi.",
    "«Не хочу» — без причины невежливо.": "«Islämok» — sebäpsiz sylagsyz.",
    "«Багажа нет» — бессмыслица.": "«Goş-golam ýok» — manysyz.",
    "«Вместе» — но не можешь сейчас.": "«Bile» — ýöne häzir bolmaýar.",
    "вечер встреч": "duşuşyk agşamy",
    "要 + план.": "要 + meýilnama.",
    "Я иду на вечер встреч — 我要参加联欢会": "Duşuşyk agşamyna gidýärin — 我要参加联欢会",
    "Я не иду — 我不去": "Men gitmeýärin — 我不去",
    "Вечер отменён — 晚会取消了": "Agşamlyk ýatyryldy — 晚会取消了",
    "Готовлю номер — 准备节目": "Çykyş taýýarlaýaryn — 准备节目",
    "Эмфатическое восклицание.": "Emfatik gygyryş.",
    "Какой же стыд! — 多没面子啊": "Ýaman utanç ahyry! — 多没面子啊",
    "Очень весело — 很热闹": "Örän şadyýan — 很热闹",
    "Мне всё равно — 没关系": "Maňa tapawudy ýok — 没关系",
    "Это хорошо — 很好": "Bu gowy — 很好",
    "多……啊 — «какой же X!»": "多……啊 — «edil şu X!»",
    "Эмфатическое восклицание.\n\nСхема: 多 + Прил. + 啊\n\n多好啊！— Как же хорошо!\n多漂亮啊！— Какая же красота!\n多没面子啊！— Какой же стыд!\n\nЭквивалент русского «какой же X!» / «до чего же X!».":
        "Emfatik gygyryş.\n\nShema: 多 + Sypat + 啊\n\n多好啊！— Örän gowy ahyry!\n多漂亮啊！— Ýaman owadan ahyry!\n多没面子啊！— Ýaman utanç ahyry!\n\n«Bu nähili-de X!» diýen gygyryşyň deňi.",
    "Как там красиво!": "Ol ýerde ýaman owadan!",
    "Как же нервничают!": "Ýaman dartgynly ahyry!",
    "Как сказать «Какая же вкусная еда!»?": "«Edil şu nahar örän tagamly!» diýip nädip aýtmaly?",
    "Что выражает 多...啊?": "多...啊 näme bildirýär?",
    "Эмоциональное восклицание": "Duýgy gygyryşy",
    "Отрицание": "Inkär",
    "Сравнение": "Deňeşdirme",
    "怕 — «бояться»": "怕 — «gorkmak»",
    "怕 (pà) = «бояться».\n\n1) Полный глагол: Подл. + 怕 + Объект\n  我怕狗。— Боюсь собак.\n\n2) Перед глаголом (боюсь сделать):\n  我怕说错。— Боюсь ошибиться.\n  你是怕表演吧？— Боишься выступать?\n\n3) 怕 + придаточное:\n  我怕他不来。— Боюсь, он не придёт.":
        "怕 (pà) = «gorkmak».\n\n1) Doly işlik: Eýe + 怕 + Obýekt\n  我怕狗。— Itlerden gorkýaryn.\n\n2) Işlikden öň (etmekden gorkmak):\n  我怕说错。— Ýalňyş aýtmakdan gorkýaryn.\n  你是怕表演吧？— Çykyş etmekden gorkýarsyňmy?\n\n3) 怕 + eýerjeň sözlem:\n  我怕他不来。— Gorkýaryn, ol gelmez öýdýän.",
    "Я не боюсь холода.": "Sowukdan gorkamok.",
    "Боюсь, не придёт.": "Gorkýaryn, gelmez öýdýän.",
    "Как сказать «Боюсь выступать»?": "«Çykyş etmekden gorkýaryn» diýip nädip aýtmaly?",
    "怕 может стоять перед?": "怕 nireden öň durup biler?",
    "Только объектом (существительным)": "Diňe obýektden (atdan) öň",
    "Только глаголом": "Diňe işlikden öň",
    "Существительным, глаголом или целой фразой": "Atdan, işlikden ýa-da bütin sözlemden öň",
    "Только прилагательным": "Diňe sypatdan öň",
    "собирать": "ýygnamak",
    "Я иду на вечер встреч.": "Duşuşyk agşamyna gidýärin.",
    "собираюсь": "niýetlenýärin",
    "要 + глагол = план на будущее.": "要 + işlik = geljek üçin meýilnama.",
    "Какой же стыд!": "Ýaman utanç ahyry!",
    "多 + оценка + 啊 — эмоциональное восклицание.": "多 + baha + 啊 — duýgy gygyryşy.",
}
# ============================================================

GLO = json.load(io.open(os.path.join(ROOT, "glossary-ru-tm.json"), encoding="utf-8"))
MAP = {**GLO, **NEW}   # NEW overrides glossary if ever needed

d = json.load(io.open(PATH, encoding="utf-8"))
chapter = next(c for c in d["chapters"] if c["id"] == CH)

# collect this chapter's unique RU strings
seen = []
def collect(o):
    if isinstance(o, str):
        if CYR.search(o) and o not in seen: seen.append(o)
    elif isinstance(o, dict):
        for v in o.values(): collect(v)
    elif isinstance(o, list):
        for v in o: collect(v)
collect(chapter)

missing = [s for s in seen if s not in MAP]
if missing:
    print(f"НЕТ ПЕРЕВОДА для {len(missing)} строк — НЕ пишу. Добавь в NEW:")
    for s in missing: print("   ", repr(s))
    raise SystemExit(1)

from_glo = sum(1 for s in seen if s in GLO and s not in NEW)
print(f"строк главы {CH}: {len(seen)} | из глоссария: {from_glo} | новых: {len(seen) - from_glo}")

# duplicate-option guard: two RU options must not translate to the same TM value
def tr(x): return MAP.get(x, x)
dups = 0
for les in chapter["lessons"]:
    for q in les["questions"]:
        if q["type"] in ("flashcard", "multiple_choice", "single_response", "listening_mc"):
            vals = [tr(o.get("english")) for o in (q.get("options") or [])]
        elif q["type"] == "match_pairs":
            vals = [tr(p["right"]) for p in q["pairs"]]
        else:
            continue
        dd = [v for v, c in collections.Counter(vals).items() if c > 1 and v]
        if dd:
            dups += 1
            print(f"  ДУБЛЬ q{q['id']} ({q['type']}): {dd}  ->  {vals}")
if dups:
    print("ЕСТЬ ДУБЛИ ВАРИАНТОВ — НЕ пишу. Разведи термины (разные RU -> разный TM).")
    raise SystemExit(1)
print("дублей вариантов: нет")

# apply on the chapter-N slice only (never touches other chapters)
raw = io.open(PATH, encoding="utf-8").read()
a_this = f'      "id": {CH},\n      "title": "'
a_next = f'      "id": {CH + 1},\n      "title": "'
s1 = raw.index(a_this)
s2 = raw.index(a_next) if a_next in raw else raw.index("\n  ],", s1)  # ch30: end of chapters array
assert s1 < s2, "boundary order"
head, sl, tail = raw[:s1], raw[s1:s2], raw[s2:]

for ru in sorted(seen, key=len, reverse=True):
    sl = sl.replace(json.dumps(ru, ensure_ascii=False), json.dumps(MAP[ru], ensure_ascii=False))

new_raw = head + sl + tail
json.loads(new_raw)  # validity
rem = re.findall("[А-Яа-яЁё]+", new_raw[s1:s1 + len(sl)])
print("остаток кириллицы в срезе:", rem[:30] or "НЕТ")
if not rem:
    io.open(PATH, "w", encoding="utf-8", newline="\n").write(new_raw)
    print("WROTE FILE OK")
else:
    print("NOT WRITTEN — осталась кириллица")
