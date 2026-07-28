# -*- coding: utf-8 -*-
"""Prep a chapter for translation: print theory line bounds + split exercise
strings into glossary-covered (auto) vs new (to translate).

Usage:  python scripts/next_chapter.py 11
Then: Read the theory block at the printed lines, translate via Edit (keep line
count), paste the NEW skeleton into scripts/apply_chapter.py and fill translations.
"""
import json, re, io, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH = int(sys.argv[1]) if len(sys.argv) > 1 else 11
CYR = re.compile("[А-Яа-яЁё]")

# theory line bounds
th = io.open(os.path.join(ROOT, "assets", "data", "theory_content.ts"), encoding="utf-8").read()
def ln(n):
    m = th.find(f"\n  {n}: {{")
    return th[:m].count("\n") + 2 if m >= 0 else None
print(f"THEORY: read lines {ln(CH)}..{(ln(CH+1) or '?')-1 if ln(CH+1) else '?'}  (offset={ln(CH)})")

# exercise strings
glo = json.load(io.open(os.path.join(ROOT, "glossary-ru-tm.json"), encoding="utf-8"))
d = json.load(io.open(os.path.join(ROOT, "assets", "data", "course_content.json"), encoding="utf-8"))
chapter = next(c for c in d["chapters"] if c["id"] == CH)
print("TITLE:", chapter.get("title"))

seen = []
def collect(o):
    if isinstance(o, str):
        if CYR.search(o) and o not in seen: seen.append(o)
    elif isinstance(o, dict):
        for v in o.values(): collect(v)
    elif isinstance(o, list):
        for v in o: collect(v)
collect(chapter)

cov = [s for s in seen if s in glo]
new = [s for s in seen if s not in glo]
print(f"\n=== АВТО из глоссария ({len(cov)}) — подставятся сами ===")
for s in cov:
    print(f"  {s!r} -> {glo[s]!r}")
print(f"\n=== НОВЫЕ ({len(new)}) — скелет для NEW в apply_chapter.py ===")
for s in new:
    print(f' {json.dumps(s, ensure_ascii=False)}: "",')
