# -*- coding: utf-8 -*-
"""Build RU->TM glossary by pairing content-ru-backup (RU) with working files (TM)
for already-translated chapters. Detects conflicts. Writes glossary-ru-tm.json + .md.

Usage: edit DONE + THEORY_END for the last translated chapter, then run.
THEORY line boundaries are auto-detected, so only DONE needs updating per chapter."""
import json, re, io, collections, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DONE = tuple(range(1, 31))         # chapters already translated (1..30, ALL DONE)
CYR = re.compile("[А-Яа-яЁё]")
STR = re.compile(r'"((?:[^"\\]|\\.)*)"')

pairs = collections.defaultdict(collections.Counter)
src = collections.defaultdict(set)

# 1. exercises — walk both trees by identical path
a = json.load(io.open(os.path.join(ROOT, "content-ru-backup", "course_content.json"), encoding="utf-8"))
b = json.load(io.open(os.path.join(ROOT, "assets", "data", "course_content.json"), encoding="utf-8"))

def walk(x, y):
    if isinstance(x, str) and isinstance(y, str):
        if CYR.search(x) and x != y:
            pairs[x][y] += 1; src[x].add("gönükme")
    elif isinstance(x, dict) and isinstance(y, dict):
        for k in x:
            if k in y: walk(x[k], y[k])
    elif isinstance(x, list) and isinstance(y, list) and len(x) == len(y):
        for i in range(len(x)): walk(x[i], y[i])

for ch in DONE:
    walk(a["chapters"][ch], b["chapters"][ch])

# 2. theory — pair quoted literals line-by-line, over the translated chapters' span
la = io.open(os.path.join(ROOT, "content-ru-backup", "theory_content.ts"), encoding="utf-8").read().split("\n")
lb = io.open(os.path.join(ROOT, "assets", "data", "theory_content.ts"), encoding="utf-8").read().split("\n")
assert len(la) == len(lb), "theory line count mismatch — TM must preserve RU line count"

def ch_start(lines, n):
    for i, ln in enumerate(lines):
        if ln.rstrip() == f"  {n}: {{":
            return i
    return None

theory_start = ch_start(lb, DONE[0])
theory_end = ch_start(lb, DONE[-1] + 1) or len(lb)
for i in range(theory_start, theory_end):
    sa, sb = STR.findall(la[i]), STR.findall(lb[i])
    if len(sa) != len(sb): continue
    for ru, tm in zip(sa, sb):
        if CYR.search(ru) and ru != tm:
            pairs[ru][tm] += 1; src[ru].add("teoriýa")

# 3. conflicts guard
conflicts = {ru: dict(c) for ru, c in pairs.items() if len(c) > 1}
if conflicts:
    print("CONFLICTS — not writing:")
    for ru, v in conflicts.items(): print(" ", repr(ru), v)
    raise SystemExit(1)

glo = {ru: c.most_common(1)[0][0] for ru, c in pairs.items()}
print("glossary entries:", len(glo), "| conflicts: 0")

io.open(os.path.join(ROOT, "glossary-ru-tm.json"), "w", encoding="utf-8", newline="\n").write(
    json.dumps(glo, ensure_ascii=False, indent=2, sort_keys=True) + "\n")

def is_term(s):
    return len(s.split()) <= 3 and not re.search(r"[.?!]", s)

terms = sorted((k, v) for k, v in glo.items() if is_term(k))
phrases = sorted((k, v) for k, v in glo.items() if not is_term(k))
esc = lambda s: s.replace("|", "\\|").replace("\n", " ⏎ ")

md = ["# Глоссарий RU → TM (туркменизация контента)", "",
      "Собран автоматически: сопоставление `content-ru-backup/` (русский оригинал) с",
      f"рабочими файлами по уже переведённым главам **{DONE[0]}-{DONE[-1]}**. Конфликтов нет — каждый",
      "русский термин даёт ровно один туркменский.", "",
      "> ⚠️ Туркменский здесь — **рабочий черновик**, требует вычитки носителем.",
      "> Утвердите термин один раз здесь — и он будет одинаков во всех 30 главах.", "",
      "Машиночитаемая копия: `glossary-ru-tm.json` (её подхватывают скрипты перевода).", "",
      f"## Термины ({len(terms)})", "", "| Русский | Туркменский | Где |", "|---|---|---|"]
for k, v in terms:
    md.append(f"| {esc(k)} | {esc(v)} | {', '.join(sorted(src[k]))} |")
md += ["", f"## Повторяющиеся фразы и объяснения ({len(phrases)})", "",
       "| Русский | Туркменский | Где |", "|---|---|---|"]
for k, v in phrases:
    md.append(f"| {esc(k)} | {esc(v)} | {', '.join(sorted(src[k]))} |")
io.open(os.path.join(ROOT, "glossary-ru-tm.md"), "w", encoding="utf-8", newline="\n").write("\n".join(md) + "\n")
print(f"terms: {len(terms)} | phrases: {len(phrases)}")

# 4. coverage preview
for ch in range(DONE[-1] + 1, min(DONE[-1] + 4, len(b["chapters"]))):
    if not b["chapters"][ch]["lessons"]: continue
    seen = []
    def collect(o):
        if isinstance(o, str):
            if CYR.search(o) and o not in seen: seen.append(o)
        elif isinstance(o, dict):
            for v in o.values(): collect(v)
        elif isinstance(o, list):
            for v in o: collect(v)
    collect(b["chapters"][ch])
    cov = [s for s in seen if s in glo]
    print(f"ch{ch}: {len(seen)} unique RU | glossary covers {len(cov)} ({100*len(cov)//max(len(seen),1)}%) | new: {len(seen)-len(cov)}")
