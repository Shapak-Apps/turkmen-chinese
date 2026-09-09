import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Whether the OS "reduce motion" setting is on, or `null` while the initial
 * `AccessibilityInfo.isReduceMotionEnabled()` read has not resolved yet.
 *
 * `null` means "not known yet", never "off". Each caller decides what the
 * unknown state means for it:
 * - screens that animate on mount (LessonCompleteScreen, ExamResultScreen)
 *   hold their entrance animation and confetti while the value is `null`,
 *   so no frame ever animates against a guessed setting;
 * - components that only animate in response to user input (pressables,
 *   flashcard/fill-blank wiggles, the breakdown card swipe) coerce with
 *   `=== true`, i.e. treat unknown as off: the read resolves long before
 *   the first tap, and animating is the safer fallback if it ever does not.
 *
 * A rejected read resolves to `false` so no caller can stay held forever.
 */
export function useReduceMotion(): boolean | null {
  const [reduceMotion, setReduceMotion] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (active) setReduceMotion(enabled);
      })
      .catch(() => {
        // Unreadable setting: fall back to "motion allowed" instead of
        // leaving mount-time callers holding on `null` forever.
        if (active) setReduceMotion(false);
      });

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
