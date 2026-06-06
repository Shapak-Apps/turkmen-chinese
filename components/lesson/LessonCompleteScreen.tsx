import { CHARACTERS } from "@/constants/CharacterAvatars";
import { Colors, FontFamily } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { T } from "@/lib/strings";
import { addXP, XP_REWARDS } from "@/lib/xp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
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
import { LessonStats } from "./LessonContent";

export default function LessonCompleteScreen({
  lessonStats,
  onContinue,
  onReview,
}: {
  lessonStats: LessonStats;
  onContinue: () => void;
  onReview: () => void;
}) {
  const confettiRef = useRef<any>(null);
  const xpForAnswers = lessonStats.correctAnswers * XP_REWARDS.CORRECT_ANSWER;
  const xpForCompletion = XP_REWARDS.LESSON_COMPLETE;
  const xpForPerfect =
    lessonStats.accuracy === 100 ? XP_REWARDS.PERFECT_LESSON_BONUS : 0;
  const earnedXP = xpForCompletion + xpForPerfect;
  const totalLessonXP = xpForAnswers + xpForCompletion + xpForPerfect;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    haptics.success();
    void addXP(earnedXP);
    setTimeout(() => {
      confettiRef.current?.start();
      haptics.heavy();
    }, 400);

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
  }, []);

  const getPerformanceMessage = () => {
    if (lessonStats.accuracy >= 90) return T.complete.perfExcellent;
    if (lessonStats.accuracy >= 75) return T.complete.perfGreat;
    if (lessonStats.accuracy >= 60) return T.complete.perfGood;
    return T.complete.perfKeep;
  };

  const getPerformanceColor = () => {
    if (lessonStats.accuracy >= 75) return Colors.successColor;
    if (lessonStats.accuracy >= 60) return Colors.warningColor;
    return Colors.primaryAccentColor;
  };

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
          <View style={styles.amanCircle}>
            <Image source={CHARACTERS.aman.source} style={styles.amanImg} />
            <View style={styles.trophyBadge}>
              <Ionicons name="trophy" size={22} color={Colors.textInverse} />
            </View>
          </View>
          <ThemedText style={styles.completeTitle}>{T.complete.title}</ThemedText>
          <ThemedText style={styles.performanceMessage}>
            {getPerformanceMessage()}
          </ThemedText>
        </Animated.View>

        <Animated.View style={[styles.accuracyCard, { opacity: fadeAnim }]}>
          <View
            style={[
              styles.accuracyIcon,
              { backgroundColor: getPerformanceColor() + "20" },
            ]}
          >
            <Ionicons
              name="checkmark-circle"
              size={36}
              color={getPerformanceColor()}
            />
          </View>
          <View style={styles.accuracyText}>
            <ThemedText style={styles.accuracyValue}>
              {lessonStats.accuracy}%
            </ThemedText>
            <ThemedText style={styles.accuracyLabel}>
              {T.complete.correctCount(lessonStats.correctAnswers, lessonStats.totalQuestions)}
            </ThemedText>
          </View>
        </Animated.View>

        {/* XP Earned */}
        <Animated.View style={[styles.xpCard, { opacity: fadeAnim }]}>
          <View style={styles.xpHeader}>
            <View style={styles.xpIconBox}>
              <Ionicons name="trophy" size={22} color={Colors.warningColor} />
            </View>
            <View style={styles.xpTotalCol}>
              <ThemedText style={styles.xpLabel}>{T.complete.inThisLesson}</ThemedText>
              <ThemedText style={styles.xpValue}>+{totalLessonXP} XP</ThemedText>
            </View>
          </View>

          <View style={styles.xpBreakdown}>
            <View style={styles.xpRow}>
              <ThemedText style={styles.xpRowLabel}>
                {T.complete.correctAnswers(lessonStats.correctAnswers)}
              </ThemedText>
              <ThemedText style={styles.xpRowValue}>+{xpForAnswers}</ThemedText>
            </View>
            <View style={styles.xpRow}>
              <ThemedText style={styles.xpRowLabel}>{T.complete.lessonComplete}</ThemedText>
              <ThemedText style={styles.xpRowValue}>+{xpForCompletion}</ThemedText>
            </View>
            {xpForPerfect > 0 && (
              <View style={styles.xpRow}>
                <ThemedText style={[styles.xpRowLabel, styles.xpBonusLabel]}>
                  {T.complete.bonus100}
                </ThemedText>
                <ThemedText style={[styles.xpRowValue, styles.xpBonusValue]}>
                  +{xpForPerfect}
                </ThemedText>
              </View>
            )}
          </View>
        </Animated.View>

        {lessonStats.wrongQuestions &&
          lessonStats.wrongQuestions.length > 0 && (
            <Animated.View style={[styles.wrongSection, { opacity: fadeAnim }]}>
              <View style={styles.wrongHeader}>
                <Ionicons name="alert-circle" size={22} color={Colors.primaryAccentColor} />
                <ThemedText style={styles.wrongTitle}>{T.complete.reviewTitle}</ThemedText>
              </View>
              <ThemedText style={styles.wrongSubtitle}>
                {T.complete.reviewSubtitle}
              </ThemedText>

              {lessonStats.wrongQuestions.map((question, index) => (
                <View key={index} style={styles.wrongQuestionCard}>
                  <View style={styles.wrongIndicator}>
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={Colors.primaryAccentColor}
                    />
                  </View>
                  <View style={styles.questionContent}>
                    <ThemedText style={styles.questionEnglish}>
                      {question.english}
                    </ThemedText>
                    <View style={styles.questionMandarin}>
                      <ThemedText style={styles.questionPinyin}>
                        {question.mandarin.pinyin}
                      </ThemedText>
                      <ThemedText style={styles.questionHanzi}>
                        {question.mandarin.hanzi}
                      </ThemedText>
                    </View>
                  </View>
                  {question.attempts > 0 && (
                    <View style={styles.attemptsIndicator}>
                      <Ionicons name="refresh" size={14} color={Colors.primaryAccentColor} />
                      <ThemedText style={styles.attemptsText}>
                        {question.attempts}
                      </ThemedText>
                    </View>
                  )}
                </View>
              ))}
            </Animated.View>
          )}
      </ScrollView>

      <Animated.View style={[styles.actionButtons, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.primaryButton} onPress={onContinue} activeOpacity={0.85}>
          <ThemedText style={styles.primaryButtonText}>{T.common.continue}</ThemedText>
          <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} />
        </TouchableOpacity>

        {lessonStats.wrongQuestions &&
          lessonStats.wrongQuestions.length > 0 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onReview}
              activeOpacity={0.85}
            >
              <Ionicons
                name="refresh-outline"
                size={18}
                color={Colors.primaryAccentColor}
              />
              <ThemedText style={styles.secondaryButtonText}>
                {T.complete.reviewMistakes}
              </ThemedText>
            </TouchableOpacity>
          )}
      </Animated.View>

      <ConfettiCannon
        ref={confettiRef}
        count={250}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut
        fallSpeed={3500}
        explosionSpeed={400}
        colors={[
          Colors.primaryAccentColor,
          Colors.successColor,
          "#FFD700",
          Colors.warningColor,
          "#FF8FA3",
          "#7ED4AD",
        ]}
      />
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.successBg, Colors.surfacePrimary]}
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
  badgeGradient: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    backgroundColor: Colors.successColor,
    shadowColor: Colors.successColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  amanCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.successBg,
    borderWidth: 3,
    borderColor: Colors.successColor,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    marginBottom: 18,
    shadowColor: Colors.successColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
  },
  amanImg: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    resizeMode: "cover",
  },
  trophyBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.warningColor,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.surfacePrimary,
  },
  completeTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 26,
    color: Colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 6,
    textAlign: "center",
  },
  performanceMessage: {
    fontFamily: FontFamily.medium,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  accuracyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    marginBottom: 28,
  },
  accuracyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  accuracyText: { flex: 1 },
  accuracyValue: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  accuracyLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.subduedTextColor,
  },
  xpCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.warningBg,
    borderWidth: 1,
    borderColor: Colors.warningColor + "30",
    marginBottom: 24,
  },
  xpHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  xpIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfacePrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  xpTotalCol: { flex: 1 },
  xpLabel: {
    fontFamily: FontFamily.semibold,
    fontSize: 11,
    letterSpacing: 1.2,
    color: Colors.warningColor,
    marginBottom: 2,
  },
  xpValue: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  xpBreakdown: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.warningColor + "30",
    gap: 6,
  },
  xpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpRowLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  xpRowValue: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  xpBonusLabel: { color: Colors.warningColor },
  xpBonusValue: { color: Colors.warningColor },
  wrongSection: { marginBottom: 24 },
  wrongHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  wrongTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  wrongSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.subduedTextColor,
    marginBottom: 14,
  },
  wrongQuestionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.primaryAccentBgStrong,
    backgroundColor: Colors.primaryAccentBg,
    marginBottom: 10,
  },
  wrongIndicator: { marginRight: 10, marginTop: 1 },
  questionContent: { flex: 1, marginRight: 8 },
  questionEnglish: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  questionMandarin: { gap: 2 },
  questionPinyin: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  questionHanzi: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.primaryAccentColor,
  },
  attemptsIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.primaryAccentBgStrong,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  attemptsText: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.primaryAccentColor,
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
    borderRadius: 14,
    gap: 8,
    backgroundColor: Colors.successColor,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.surfacePrimary,
    gap: 8,
  },
  secondaryButtonText: {
    fontFamily: FontFamily.semibold,
    fontSize: 15,
    color: Colors.primaryAccentColor,
  },
});
