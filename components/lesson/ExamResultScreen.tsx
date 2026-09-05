import { CHARACTERS } from "@/constants/CharacterAvatars";
import { Colors, FontFamily, Radius } from "@/constants/theme";
import type { ExamResult } from "@/lib/examResult";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { haptics } from "@/lib/haptics";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { ThemedText } from "../themed-text";
import type { TypeBreakdown } from "./LessonContent";

export default function ExamResultScreen({
  result,
  byType,
  onRetake,
  onContinue,
}: {
  result: ExamResult;
  byType: TypeBreakdown[];
  onRetake: () => void;
  onContinue: () => void;
}) {
  const passed = result.passed;
  const accent = passed ? Colors.successColor : Colors.primaryAccentColor;
  const accentBg = passed ? Colors.successBg : Colors.primaryAccentBg;

  const reduceMotion = useReduceMotion();
  const confettiRef = useRef<any>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (passed) {
      haptics.success();
      setTimeout(() => {
        confettiRef.current?.start();
        haptics.heavy();
      }, 400);
    } else {
      haptics.error();
    }

    if (reduceMotion) {
      scaleAnim.setValue(1);
      fadeAnim.setValue(1);
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.badgeContainer,
            { transform: [{ scale: scaleAnim }], opacity: fadeAnim },
          ]}
        >
          <View style={[styles.amanCircle, { backgroundColor: accentBg, borderColor: accent }]}>
            <Image source={CHARACTERS.aman.source} style={styles.amanImg} />
            <View style={[styles.statusBadge, { backgroundColor: accent }]}>
              <Ionicons
                name={passed ? "checkmark" : "refresh"}
                size={22}
                color={Colors.textInverse}
              />
            </View>
          </View>
          <ThemedText style={styles.title}>
            {passed ? T.exam.passedTitle : T.exam.failedTitle}
          </ThemedText>
          <ThemedText style={styles.message}>
            {passed ? T.exam.passedMessage : T.exam.failedMessage}
          </ThemedText>
        </Animated.View>

        {/* Score card */}
        <Animated.View style={[styles.scoreCard, { opacity: fadeAnim }]}>
          <View style={[styles.scoreIcon, { backgroundColor: accent + "20" }]}>
            <Ionicons
              name={passed ? "trophy" : "ribbon-outline"}
              size={36}
              color={accent}
            />
          </View>
          <View style={styles.scoreText}>
            <ThemedText style={[styles.scoreValue, { color: accent }]}>
              {result.accuracy}%
            </ThemedText>
            <ThemedText style={styles.scoreLabel}>
              {T.exam.scoreLabel(result.correct, result.total)}
            </ThemedText>
          </View>
        </Animated.View>

        {/* Threshold + best score */}
        <Animated.View style={[styles.metaRow, { opacity: fadeAnim }]}>
          <View style={styles.metaItem}>
            <Ionicons name="flag-outline" size={15} color={Colors.subduedTextColor} />
            <ThemedText style={styles.metaText}>{T.exam.thresholdNote}</ThemedText>
          </View>
          {result.attempts > 1 && (
            <View style={styles.metaItem}>
              <Ionicons name="star-outline" size={15} color={Colors.subduedTextColor} />
              <ThemedText style={styles.metaText}>
                {T.exam.bestScore(result.bestAccuracy)}
              </ThemedText>
            </View>
          )}
        </Animated.View>

        {/* Breakdown by exercise type */}
        {byType.length > 0 && (
          <Animated.View style={[styles.breakdown, { opacity: fadeAnim }]}>
            <ThemedText style={styles.breakdownTitle}>
              {T.exam.breakdownTitle}
            </ThemedText>
            {byType.map((b) => {
              const allCorrect = b.correct === b.total;
              return (
                <View key={b.type} style={styles.breakdownRow}>
                  <ThemedText style={styles.breakdownLabel}>
                    {T.exam.types[b.type] ?? b.type}
                  </ThemedText>
                  <View style={styles.breakdownRight}>
                    <ThemedText
                      style={[
                        styles.breakdownValue,
                        { color: allCorrect ? Colors.successColor : Colors.textSecondary },
                      ]}
                    >
                      {b.correct}/{b.total}
                    </ThemedText>
                    <Ionicons
                      name={allCorrect ? "checkmark-circle" : "ellipse-outline"}
                      size={16}
                      color={allCorrect ? Colors.successColor : Colors.borderColor}
                    />
                  </View>
                </View>
              );
            })}
          </Animated.View>
        )}
      </ScrollView>

      <Animated.View style={[styles.actionButtons, { opacity: fadeAnim }]}>
        {passed ? (
          <>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: Colors.successColor }]}
              onPress={onContinue}
              activeOpacity={0.85}
            >
              <ThemedText style={styles.primaryButtonText}>{T.common.continue}</ThemedText>
              <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onRetake}
              activeOpacity={0.85}
            >
              <Ionicons name="refresh-outline" size={18} color={Colors.textSecondary} />
              <ThemedText style={styles.secondaryButtonText}>{T.exam.retake}</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: Colors.primaryAccentColor }]}
              onPress={onRetake}
              activeOpacity={0.85}
            >
              <Ionicons name="refresh" size={18} color={Colors.textInverse} />
              <ThemedText style={styles.primaryButtonText}>{T.exam.retake}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onContinue}
              activeOpacity={0.85}
            >
              <ThemedText style={styles.secondaryButtonText}>{T.a11y.back}</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>

      {passed && !reduceMotion && (
        <ConfettiCannon
          ref={confettiRef}
          count={250}
          origin={{ x: -10, y: 0 }}
          autoStart={false}
          fadeOut
          fallSpeed={3500}
          explosionSpeed={400}
          colors={[
            Colors.successColor,
            Colors.primaryAccentColor,
            "#FFD700",
            Colors.warningColor,
            "#FF8FA3",
            "#7ED4AD",
          ]}
        />
      )}
      <LinearGradient
        style={styles.gradient}
        colors={[accentBg, Colors.surfacePrimary]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    zIndex: -1,
  },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingTop: 56, paddingBottom: 200 },
  badgeContainer: { alignItems: "center", marginBottom: 28 },
  amanCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    marginBottom: 18,
  },
  amanImg: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    resizeMode: "cover",
  },
  statusBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.surfacePrimary,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 6,
    textAlign: "center",
  },
  message: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    marginBottom: 14,
  },
  scoreIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  scoreText: { flex: 1 },
  scoreValue: {
    fontFamily: FontFamily.bold,
    fontSize: 30,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  scoreLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.subduedTextColor,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.subduedTextColor,
  },
  breakdown: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.surfaceSecondary,
    marginBottom: 24,
  },
  breakdownTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: Colors.subduedTextColor,
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
  },
  breakdownLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  breakdownRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  breakdownValue: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
  actionButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.surfacePrimary,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: Radius.lg,
    gap: 8,
  },
  primaryButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 16,
    color: Colors.textInverse,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
