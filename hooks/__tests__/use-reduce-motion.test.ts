/// <reference types="jest" />
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { act, renderHook } from "@testing-library/react-native";
import { AccessibilityInfo } from "react-native";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

const flush = () =>
  act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });

describe("useReduceMotion", () => {
  const listeners: Array<(enabled: boolean) => void> = [];
  let removeMock: jest.Mock;

  beforeEach(() => {
    listeners.length = 0;
    removeMock = jest.fn();
    jest
      .spyOn(AccessibilityInfo, "addEventListener")
      .mockImplementation((_eventType, handler) => {
        // addEventListener is overloaded; the spy sees the widest signature,
        // so the handler is narrowed through unknown on purpose.
        listeners.push(handler as unknown as (enabled: boolean) => void);
        return { remove: removeMock } as unknown as ReturnType<
          typeof AccessibilityInfo.addEventListener
        >;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("is null until the initial OS read resolves, then the read value", async () => {
    const gate = deferred<boolean>();
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockReturnValue(gate.promise);

    const { result } = await renderHook(() => useReduceMotion());
    expect(result.current).toBeNull();

    await act(async () => {
      gate.resolve(true);
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(result.current).toBe(true);
  });

  it("resolves to false when the setting is off", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockResolvedValue(false);

    const { result } = await renderHook(() => useReduceMotion());
    await flush();
    expect(result.current).toBe(false);
  });

  it("falls back to false when the read rejects, so callers never hold forever", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockRejectedValue(new Error("bridge down"));

    const { result } = await renderHook(() => useReduceMotion());
    await flush();
    expect(result.current).toBe(false);
  });

  it("follows reduceMotionChanged events and unsubscribes on unmount", async () => {
    jest
      .spyOn(AccessibilityInfo, "isReduceMotionEnabled")
      .mockResolvedValue(false);

    const { result, unmount } = await renderHook(() => useReduceMotion());
    await flush();
    expect(listeners).toHaveLength(1);

    await act(async () => {
      listeners[0](true);
    });
    expect(result.current).toBe(true);

    await unmount();
    expect(removeMock).toHaveBeenCalledTimes(1);
  });
});
