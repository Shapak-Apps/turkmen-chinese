import { useAppTheme } from "@/hooks/use-app-theme";
import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { type ThemeColors } from "@/constants/theme";

export default function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const waveAnims = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(0.3)),
  ).current;

  // Simulated visualization
  useEffect(() => {
    if (isPlaying) {
      const animations = waveAnims.map((anim) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random() * 0.5 + 0.5,
              duration: 150 + Math.random() * 200,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 150 + Math.random() * 200,
              useNativeDriver: true,
            }),
          ]),
        );
      });
      Animated.parallel(animations).start();
    } else {
      waveAnims.map((anim) => {
        anim.stopAnimation();
        Animated.timing(anim, {
          toValue: 0.3,
          duration: 150 + Math.random() * 200,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isPlaying, waveAnims]);

  return (
    <View style={styles.waveformContainer}>
      <View style={styles.audioWaveContainer}>
        {waveAnims.map((waveAnim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.waveBar,
              {
                transform: [{ scaleY: waveAnim }],
                height: 16 + (index % 4) * 6,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    waveformContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
      minHeight: 50,
    },
    audioWaveContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      paddingHorizontal: 20,
    },
    waveBar: {
      width: 3,
      backgroundColor: c.primaryAccentColor,
      borderRadius: 1.5,
      opacity: 0.8,
      minHeight: 8,
    },
  });
}
