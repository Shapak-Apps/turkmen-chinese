/// <reference types="jest" />
import { act, fireEvent, render } from "@testing-library/react-native";
import FillBlankMode from "@/components/lesson/FillBlankMode";
import FlashcardMode from "@/components/lesson/FlashcardMode";
import GrammarMode from "@/components/lesson/GrammarMode";
import MatchPairsMode from "@/components/lesson/MatchPairsMode";
import { T } from "@/lib/strings";

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (component: unknown) => component },
    useAnimatedStyle: (style: () => unknown) => style(),
    useSharedValue: (value: number) => ({ value }),
    withSequence: () => 0,
    withTiming: () => 0,
    withSpring: () => 0,
  };
});

jest.mock("@/lib/haptics", () => ({
  haptics: { tap: jest.fn(), success: jest.fn(), error: jest.fn(), heavy: jest.fn() },
}));

jest.mock("expo-speech", () => ({
  speak: jest.fn(),
  stop: jest.fn(),
}));

describe("FlashcardMode feedback banner", () => {
  const options = [
    { id: 1, hanzi: "水", english: "water", pinyin: "shuǐ" },
    { id: 2, hanzi: "火", english: "fire", pinyin: "huǒ" },
  ];

  it("shows the correct banner after a correct check", async () => {
    const onAnswer = jest.fn();
    const { getByText, queryByText } = await render(
      <FlashcardMode
        hanzi="水"
        pinyin="shuǐ"
        instruction="Choose"
        options={options}
        correctOptionId={1}
        onAnswer={onAnswer}
      />,
    );
    expect(queryByText(T.feedback.correct)).toBeNull();
    await fireEvent.press(getByText("water"));
    await fireEvent.press(getByText(T.common.check));
    expect(getByText(T.feedback.correct)).toBeTruthy();
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledWith(true);
  });

  it("shows the keep-practising banner after a wrong check", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <FlashcardMode
        hanzi="水"
        pinyin="shuǐ"
        instruction="Choose"
        options={options}
        correctOptionId={1}
        onAnswer={onAnswer}
      />,
    );
    await fireEvent.press(getByText("fire"));
    await fireEvent.press(getByText(T.common.check));
    expect(getByText(T.feedback.keepPractising)).toBeTruthy();
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledWith(false);
  });
});

describe("FillBlankMode feedback banner", () => {
  const options = [
    { id: 1, hanzi: "喝水" },
    { id: 2, hanzi: "吃饭" },
  ];

  it("shows the correct banner on a correct pick", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <FillBlankMode
        sentence="我喜欢喝水"
        sentencePinyin="wǒ xǐhuān hē shuǐ"
        blankedWord="喝水"
        correctAnswer="喝水"
        instruction="Fill the blank"
        options={options}
        onAnswer={onAnswer}
      />,
    );
    await fireEvent.press(getByText("喝水"));
    expect(getByText(T.feedback.correct)).toBeTruthy();
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledWith(true);
  });

  it("shows the keep-practising banner on a wrong pick", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <FillBlankMode
        sentence="我喜欢喝水"
        sentencePinyin="wǒ xǐhuān hē shuǐ"
        blankedWord="喝水"
        correctAnswer="喝水"
        instruction="Fill the blank"
        options={options}
        onAnswer={onAnswer}
      />,
    );
    await fireEvent.press(getByText("吃饭"));
    expect(getByText(T.feedback.keepPractising)).toBeTruthy();
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledWith(false);
  });
});

describe("GrammarMode feedback banner", () => {
  const rule = { title: "Rule", explanation: "Explanation", examples: [] };
  const practice = [
    {
      question: "Q1",
      options: [
        { id: 1, text: "a" },
        { id: 2, text: "b" },
      ],
      correctOptionId: 1,
    },
    {
      question: "Q2",
      options: [
        { id: 1, text: "c" },
        { id: 2, text: "d" },
      ],
      correctOptionId: 2,
    },
  ];

  it("shows the correct banner after each correct check and reports true", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <GrammarMode rule={rule} practice={practice} onAnswer={onAnswer} />,
    );
    await fireEvent.press(getByText(T.practice.startPractice(practice.length)));

    await fireEvent.press(getByText("a"));
    await fireEvent.press(getByText(T.common.check));
    expect(getByText(T.feedback.correct)).toBeTruthy();
    await fireEvent.press(getByText(T.common.next));

    await fireEvent.press(getByText("d"));
    await fireEvent.press(getByText(T.common.check));
    expect(getByText(T.feedback.correct)).toBeTruthy();
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledWith(true);
  });

  it("shows the keep-practising banner after a wrong check and reports false", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <GrammarMode rule={rule} practice={practice} onAnswer={onAnswer} />,
    );
    await fireEvent.press(getByText(T.practice.startPractice(practice.length)));

    await fireEvent.press(getByText("b"));
    await fireEvent.press(getByText(T.common.check));
    expect(getByText(T.feedback.keepPractising)).toBeTruthy();
    await fireEvent.press(getByText(T.common.next));

    await fireEvent.press(getByText("d"));
    await fireEvent.press(getByText(T.common.check));
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledWith(false);
  });
});

describe("MatchPairsMode feedback banner", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  const pairs = [
    { id: 1, left: "水", right: "water", leftPinyin: "shuǐ" },
    { id: 2, left: "火", right: "fire", leftPinyin: "huǒ" },
  ];

  it("perfect run: banner below the grid, onAnswer(true) exactly once", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <MatchPairsMode instruction="Match" pairs={pairs} onAnswer={onAnswer} />,
    );

    await fireEvent.press(getByText("水"));
    await fireEvent.press(getByText("water"));
    await fireEvent.press(getByText("火"));
    await fireEvent.press(getByText("fire"));

    expect(getByText("水")).toBeTruthy();
    expect(getByText(T.feedback.correct)).toBeTruthy();
    expect(onAnswer).not.toHaveBeenCalled();

    await fireEvent.press(getByText(T.common.continue));
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(true);
  });

  it("run with a mistake: keep-practising banner, onAnswer(false) exactly once", async () => {
    const onAnswer = jest.fn();
    const { getByText } = await render(
      <MatchPairsMode instruction="Match" pairs={pairs} onAnswer={onAnswer} />,
    );

    await fireEvent.press(getByText("水"));
    await fireEvent.press(getByText("fire"));
    await act(() => {
      jest.advanceTimersByTime(500);
    });

    await fireEvent.press(getByText("水"));
    await fireEvent.press(getByText("water"));
    await fireEvent.press(getByText("火"));
    await fireEvent.press(getByText("fire"));

    expect(getByText(T.feedback.keepPractising)).toBeTruthy();
    await fireEvent.press(getByText(T.common.continue));
    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith(false);
  });
});
