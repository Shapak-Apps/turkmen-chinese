import {
  type AnalyticsProps,
  Events,
  screen,
  setAnalyticsBackend,
  track,
} from "@/lib/analytics";

afterEach(() => setAnalyticsBackend(null));

describe("analytics facade", () => {
  it("is a safe no-op when no backend is set", () => {
    expect(() => track("anything")).not.toThrow();
    expect(() => screen("Home")).not.toThrow();
  });

  it("forwards track/screen to the configured backend", () => {
    const calls: [string, string, AnalyticsProps?][] = [];
    setAnalyticsBackend({
      track: (e, p) => calls.push(["track", e, p]),
      screen: (n, p) => calls.push(["screen", n, p]),
    });
    track(Events.LessonComplete, { accuracy: 90 });
    screen("Home");
    expect(calls).toEqual([
      ["track", "lesson_complete", { accuracy: 90 }],
      ["screen", "Home", undefined],
    ]);
  });

  it("swallows backend errors so analytics can't break the app", () => {
    setAnalyticsBackend({
      track: () => {
        throw new Error("boom");
      },
      screen: () => {
        throw new Error("boom");
      },
    });
    expect(() => track("x")).not.toThrow();
    expect(() => screen("y")).not.toThrow();
  });

  it("stops forwarding once the backend is cleared", () => {
    let count = 0;
    setAnalyticsBackend({ track: () => count++, screen: () => count++ });
    track("a");
    setAnalyticsBackend(null);
    track("b");
    expect(count).toBe(1);
  });
});
