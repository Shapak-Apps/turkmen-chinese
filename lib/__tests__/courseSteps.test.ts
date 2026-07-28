import {
  buildChapterSteps,
  getChapterQuestionCount,
  getOrderedChapterIds,
  isChapterExaminable,
} from "@/lib/courseSteps";

describe("courseSteps — chapter ids", () => {
  it("returns ordered chapter ids", () => {
    const ids = getOrderedChapterIds();
    expect(ids.length).toBeGreaterThan(0);
    const sorted = [...ids].sort((a, b) => a - b);
    expect(ids).toEqual(sorted);
  });
});

describe("buildChapterSteps", () => {
  it("builds a linear, correctly ordered step list for a real chapter", () => {
    const steps = buildChapterSteps(1);
    expect(steps.length).toBeGreaterThan(0);

    // index is sequential and 0-based
    steps.forEach((s, i) => expect(s.index).toBe(i));

    // keys are unique within the chapter
    const keys = steps.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);

    // chapter 1 has questions → ends with practice then exam
    expect(steps.at(-2)?.subtype).toBe("practice");
    expect(steps.at(-1)?.subtype).toBe("exam");
    expect(steps.at(-1)?.kind).toBe("exam");
  });

  it("orders theory before practice/exam: intro → vocab → grammar → dialogue", () => {
    const steps = buildChapterSteps(1);
    const subtypes = steps.map((s) => s.subtype);

    const firstGrammar = subtypes.indexOf("grammar");
    const firstDialogue = subtypes.indexOf("dialogue");
    const practiceAt = subtypes.indexOf("practice");

    // intro & vocab come first (when present)
    if (subtypes.includes("intro")) expect(subtypes.indexOf("intro")).toBe(0);
    if (firstGrammar >= 0 && firstDialogue >= 0) {
      expect(firstGrammar).toBeLessThan(firstDialogue);
    }
    if (firstDialogue >= 0) {
      expect(firstDialogue).toBeLessThan(practiceAt);
    }
  });

  it("numbers grammar/dialogue steps with sectionIndex", () => {
    const steps = buildChapterSteps(1);
    const grammar = steps.filter((s) => s.subtype === "grammar");
    grammar.forEach((s, i) => {
      expect(s.key).toBe(`grammar-${i}`);
      expect(s.sectionIndex).toBe(i);
      expect(s.title.length).toBeGreaterThan(0); // carries the content title
    });
  });

  it("matches practice/exam presence to whether the chapter has questions", () => {
    const steps = buildChapterSteps(1);
    const hasExam = steps.some((s) => s.subtype === "exam");
    expect(hasExam).toBe(isChapterExaminable(1));
    expect(getChapterQuestionCount(1)).toBeGreaterThan(0);
  });

  it("returns no steps for an unknown chapter", () => {
    expect(buildChapterSteps(9999)).toEqual([]);
    expect(isChapterExaminable(9999)).toBe(false);
    expect(getChapterQuestionCount(9999)).toBe(0);
  });
});
