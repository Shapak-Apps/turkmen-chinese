import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllProgress, incrementLessonCompletion } from "@/lib/lessonProgress";

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe("lessonProgress", () => {
  it("is empty by default", async () => {
    expect(await getAllProgress()).toEqual({});
  });

  it("counts completions per lesson", async () => {
    await incrementLessonCompletion("chapter-1");
    expect(await getAllProgress()).toEqual({ "chapter-1": 1 });

    await incrementLessonCompletion("chapter-1");
    expect((await getAllProgress())["chapter-1"]).toBe(2);
  });

  it("tracks lessons independently", async () => {
    await incrementLessonCompletion("chapter-1");
    await incrementLessonCompletion("chapter-2");
    expect(await getAllProgress()).toEqual({ "chapter-1": 1, "chapter-2": 1 });
  });
});
