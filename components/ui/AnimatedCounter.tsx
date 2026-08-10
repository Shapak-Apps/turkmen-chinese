import { useEffect, useRef, useState } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  value: number;
  duration?: number;
  style?: TextStyle | TextStyle[];
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 800,
  style,
  suffix = "",
}: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const rafRef = useRef<number | null>(null);


  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(
        startValueRef.current + (value - startValueRef.current) * eased,
      );
      setDisplayValue(next);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, displayValue]);

  return (
    <Text style={style} maxFontSizeMultiplier={1.3}>
      {displayValue}
      {suffix}
    </Text>
  );
}
