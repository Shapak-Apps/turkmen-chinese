import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { haptics } from "@/lib/haptics";
import React from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface Props extends Omit<PressableProps, "onPressIn" | "onPressOut"> {
  scaleTo?: number;
  haptic?: "tap" | "select" | "heavy" | "none";
}

export default function AnimatedPressable({
  scaleTo = 0.97,
  haptic = "tap",
  onPress,
  style,
  children,
  ...rest
}: Props) {
  const reduceMotion = useReduceMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      onPressIn={() => {
        scale.value = reduceMotion
          ? scaleTo
          : withSpring(scaleTo, { damping: 18, stiffness: 350 });
      }}
      onPressOut={() => {
        scale.value = reduceMotion
          ? 1
          : withSpring(1, { damping: 14, stiffness: 280 });
      }}
      onPress={(e) => {
        if (haptic !== "none") haptics[haptic]();
        onPress?.(e);
      }}
      style={[animatedStyle, style as any]}
      {...rest}
    >
      {children as React.ReactNode}
    </AnimatedPressableBase>
  );
}
