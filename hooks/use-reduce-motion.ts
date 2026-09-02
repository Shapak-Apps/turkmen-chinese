import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Whether the OS "reduce motion" setting is on. Starts as false and flips once
 * the initial read resolves, so animations that fire on mount are gated by the
 * value from the previous render — acceptable here: the animated screens all
 * run their effects after user input, not on the first frame.
 */
export function useReduceMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let active = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active) setReduceMotion(enabled);
      })
      .catch(() => {});

    const sub = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setReduceMotion,
    );

    return () => {
      active = false;
      sub.remove();
    };
  }, []);

  return reduceMotion;
}
