import { Question, SpeakingOption } from "@/constants/CourseData";
import { type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Events, track } from "@/lib/analytics";
import { haptics } from "@/lib/haptics";
import { hasCompletedLesson, incrementLessonCompletion } from "@/lib/lessonProgress";
import { computeLessonStats, type LessonStats } from "@/lib/lessonStats";
import {
  recordQuestionAnswered,
  recordQuestionListened,
} from "@/lib/speakingListeningStats";
import { markActiveDay } from "@/lib/streak";
import { T } from "@/lib/strings";
import { addXP, XP_REWARDS } from "@/lib/xp";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import ConfirmDialog from "../ui/ConfirmDialog";
import AudioPrompt from "./AudioPrompt";
import ExerciseNavBar from "./ExerciseNavBar";
import { FeedbackView } from "./FeedbackView";
import FillBlankMode from "./FillBlankMode";
import FlashcardMode from "./FlashcardMode";
import GrammarMode from "./GrammarMode";
import LessonCompleteScreen from "./LessonCompleteScreen";
import ListeningMultipleChoiceMode from "./ListeningMultipleChoiceMode";
import MatchPairsMode from "./MatchPairsMode";
import MultipleChoiceMode from "./MultipleChoiceMode";
import ProgressHeader from "./ProgressHeader";
import SentenceBreakdownCard from "./SentenceBreakdownCard";
import SingleResponseMode from "./SingleResponseMode";
import StrokeOrderMode from "./StrokeOrderMode";

// LessonStats/TypeBreakdown теперь живут в lib/lessonStats.ts (чистый модуль,
// покрыт тестами). Реэкспорт — чтобы существующие импортёры этого файла
// (chapter-test, ExamResultScreen, LessonCompleteScreen) не менялись.
export type { LessonStats, TypeBreakdown } from "@/lib/lessonStats";

const MAX_ATTEMPTS = 3;

export default function LessonContent({
  questions,
  lessonId,
  onExit,
  mode = "lesson",
  onComplete,
}: {
  questions: Question[];
  lessonId: string;
  onExit?: () => void;
  /**
   * "lesson" — обычный урок: начисляет XP и показывает LessonCompleteScreen.
   * "exam" — экзамен главы: XP не начисляет (оценка, а не практика), а по
   * завершении вызывает onComplete с итоговой статистикой; родитель сам
   * рисует экран результата (ExamResultScreen).
   */
  mode?: "lesson" | "exam";
  onComplete?: (stats: LessonStats) => void;
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [exitConfirmVisible, setExitConfirmVisible] = useState(false);
  const [showMandarin, setShowMandarin] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasListenedToAudio, setHasListenedToAudio] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex],
  );
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);

  // Lesson completion
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const [lessonStats, setLessonStats] = useState<LessonStats | null>(null);
  // XP is rewarded only the first time a lesson is completed. Replays and the
  // "review mistakes" re-run award no XP, so the counter can't be farmed.
  const rewardableRef = useRef(true);
  const [awardCompletionXp, setAwardCompletionXp] = useState(true);
  const [questionAttempts, setQuestionAttempts] = useState<
    Record<number, number>
  >({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<Set<number>>(new Set());
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(() => new Set([0]));

  const wrongIndices = useMemo(() => {
    const s = new Set<number>();
    questions.forEach((q, i) => {
      if (wrongQuestions.has(q.id)) s.add(i);
    });
    return s;
  }, [questions, wrongQuestions]);

  // Suppress XP rewards if this lesson was already completed in a past session.
  useEffect(() => {
    hasCompletedLesson(lessonId).then((done) => {
      if (done) rewardableRef.current = false;
    });
  }, [lessonId]);

  useEffect(() => {
    track(Events.LessonStart, { lessonId });
  }, [lessonId]);

  // Grant the per-correct-answer XP only while the lesson is still rewardable.
  // Exams are assessments, not practice — they never award XP (also prevents
  // farming XP by retaking the exam).
  const awardCorrectXp = () => {
    if (mode === "exam") return;
    if (rewardableRef.current) void addXP(XP_REWARDS.CORRECT_ANSWER);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity pinyin/hanzi
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const optionsAnimValue = useRef(new Animated.Value(0)).current;
  const audioSectionAnimHeight = useRef(new Animated.Value(400)).current;
  const optionSelectionAnim = useRef(new Animated.Value(0)).current;
  const instructionOpacity = useRef(new Animated.Value(1)).current;
  const listeningOpacity = useRef(new Animated.Value(0)).current;
  const listeningScale = useRef(new Animated.Value(0.95)).current;
  const [hasStartedFirstPlay, setHasStartedFirstPlay] = useState(false);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const selectedSentence = useMemo((): SpeakingOption | null => {
    // New types handle their own feedback — no selected sentence needed
    if (
      currentQuestion.type === "flashcard" ||
      currentQuestion.type === "fill_blank" ||
      currentQuestion.type === "match_pairs" ||
      currentQuestion.type === "grammar" ||
      currentQuestion.type === "stroke_order"
    ) {
      return null;
    }

    if (currentQuestion.type === "listening_mc") {
      if (showResult) {
        const correctEnglish =
          currentQuestion.options.find(
            (opt: { id: number; english: string }) => opt.id === currentQuestion.correctOptionId,
          )?.english || "";
        return {
          id: currentQuestion.id,
          english: correctEnglish,
          mandarin: {
            ...currentQuestion.mandarin,
          },
        };
      }
      return null;
    }

    if (!selectedOption) return null;
    return currentQuestion.options.find((opt: SpeakingOption) => opt.id === selectedOption)!;
  }, [selectedOption, currentQuestion, showResult]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  useEffect(() => {
    Speech.stop();
    setIsSpeechPlaying(false);
  }, [currentQuestion]);

  useEffect(() => {
    if (showResult) {
      if (isCorrect) {
        haptics.success();
        if (
          attemptCount === 0 ||
          (attemptCount > 0 && wrongQuestions.has(currentQuestion.id))
        ) {
          setCorrectAnswersCount((prev) => prev + 1);
          awardCorrectXp();
          void markActiveDay();
        }
      } else {
        haptics.error();
        setQuestionAttempts((prev) => ({
          ...prev,
          [currentQuestion.id]: (prev[currentQuestion.id] || 0) + 1,
        }));

        if (attemptCount === 0) {
          setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult, isCorrect, attemptCount, currentQuestion.id]);

  useEffect(() => {
    if (isSpeechPlaying && !hasStartedFirstPlay && !hasListenedToAudio) {
      setHasStartedFirstPlay(true);
      Animated.parallel([
        Animated.timing(instructionOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(listeningOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(listeningScale, {
            toValue: 1.05,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(listeningScale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [isSpeechPlaying, hasStartedFirstPlay, hasListenedToAudio, instructionOpacity, listeningOpacity, listeningScale]);

  useEffect(() => {
    if (
      currentQuestion.type === "single_response" &&
      currentQuestion.options.length > 0 &&
      hasListenedToAudio
    ) {
      // Shadowing: reveal the model phrase but do NOT select an option — that
      // would summon the (removed) record mic. The user repeats aloud, no scoring.
      Animated.timing(optionSelectionAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentQuestion, hasListenedToAudio, optionSelectionAnim]);

  const finishListening = () => {
    if (hasListenedToAudio) return;
    setHasListenedToAudio(true);
    setIsSpeechPlaying(false);
    void recordQuestionListened();
    Animated.parallel([
      Animated.timing(audioSectionAnimHeight, {
        toValue: 200,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(optionsAnimValue, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const playAudio = () => {
    if (
      currentQuestion.type === "flashcard" ||
      currentQuestion.type === "fill_blank" ||
      currentQuestion.type === "match_pairs" ||
      currentQuestion.type === "grammar" ||
      currentQuestion.type === "stroke_order"
    ) {
      return;
    }
    const textToSpeak =
      currentQuestion.mandarin.hanzi || currentQuestion.mandarin.pinyin;

    if (isSpeechPlaying) {
      Speech.stop();
      setIsSpeechPlaying(false);
      return;
    }

    setIsSpeechPlaying(true);
    Speech.speak(textToSpeak, {
      language: "zh-CN",
      onDone: () => {
        setIsSpeechPlaying(false);
        finishListening();
      },
      onStopped: () => {
        setIsSpeechPlaying(false);
      },
      onError: () => {
        setIsSpeechPlaying(false);
      },
    });
  };

  const handleRevealMandarin = () => {
    if (showMandarin) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShowMandarin(false));
    } else {
      setShowMandarin(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleOptionPress = (id: number) => {
    if (currentQuestion.type === "listening_mc" || currentQuestion.type === "multiple_choice") {
      setSelectedOption(id);
      setIsCorrect(id === currentQuestion.correctOptionId);
      setShowResult(true);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    const isDeselecting = selectedOption === id;
    const newSelectedOption = isDeselecting ? null : id;
    setSelectedOption(newSelectedOption);
    Animated.timing(optionSelectionAnim, {
      toValue: isDeselecting ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const nextQuestion = () => {
    Animated.timing(audioSectionAnimHeight, {
      toValue: 400,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      if (currentQuestionIndex < questions.length - 1) {
        const next = currentQuestionIndex + 1;
        resetState();
        setCurrentQuestionIndex(next);
        setVisitedIndices((prev) => new Set(prev).add(next));
      } else {
        const finalStats = computeLessonStats(
          questions,
          correctAnswersCount,
          wrongQuestions,
          questionAttempts,
        );

        track(Events.LessonComplete, {
          lessonId,
          accuracy: finalStats.accuracy,
        });

        // Exam: hand the result to the parent, which renders ExamResultScreen
        // and owns persistence. No XP, no built-in completion screen.
        if (mode === "exam" && onComplete) {
          onComplete(finalStats);
          return;
        }

        // Capture whether this completion earns XP, then close the reward
        // window so an in-session "review mistakes" replay grants nothing.
        setAwardCompletionXp(rewardableRef.current);
        rewardableRef.current = false;
        setLessonStats(finalStats);
        setShowCompleteScreen(true);
      }
    });
  };

  // Speaking is shadowing practice (no STT): the user repeats aloud, then
  // continues. Counts as completed (participation), never as wrong.
  const handleShadowingContinue = () => {
    haptics.success();
    setCorrectAnswersCount((prev) => prev + 1);
    void recordQuestionAnswered();
    awardCorrectXp();
    void markActiveDay();
    nextQuestion();
  };

  // Self-contained modes (flashcard/fill_blank/match_pairs/grammar/stroke_order)
  // report only pass/fail; scoring, XP and advancing are identical for all five.
  const handleSelfContainedAnswer = (correct: boolean) => {
    if (correct) {
      haptics.success();
      setCorrectAnswersCount((prev) => prev + 1);
      void recordQuestionAnswered();
      awardCorrectXp();
      void markActiveDay();
    } else {
      haptics.error();
      setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
    }
    nextQuestion();
  };

  const handleRetry = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(false);
      setIsCorrect(null);
      setAttemptCount((prev) => prev + 1);

      if (currentQuestion.type === "listening_mc") {
        setSelectedOption(null);
      } else {
        setHasListenedToAudio(true);

        if (currentQuestion.type === "multiple_choice") {
          optionSelectionAnim.setValue(0);
          setSelectedOption(null);
        } else {
          optionSelectionAnim.setValue(1);
        }

        audioSectionAnimHeight.setValue(200);
        optionsAnimValue.setValue(1);
        instructionOpacity.setValue(0);
        listeningOpacity.setValue(0);
      }

      scaleAnim.setValue(1);
    });
  };

  const jumpToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length || index === currentQuestionIndex) {
      return;
    }
    resetState();
    setCurrentQuestionIndex(index);
    setVisitedIndices((prev) => new Set(prev).add(index));
  };

  const resetState = () => {
    setShowMandarin(false);
    setSelectedOption(null);
    setShowResult(false);
    setHasListenedToAudio(false);
    setAttemptCount(0);
    Speech.stop();
    setIsSpeechPlaying(false);
    fadeAnim.setValue(0);
    scaleAnim.setValue(1);
    optionsAnimValue.setValue(0);
    optionSelectionAnim.setValue(0);
    instructionOpacity.setValue(1);
    listeningOpacity.setValue(0);
    listeningScale.setValue(0.95);
    setHasStartedFirstPlay(false);
  };

  if (showCompleteScreen && lessonStats) {
    return (
      <LessonCompleteScreen
        lessonStats={lessonStats}
        awardXp={awardCompletionXp}
        onContinue={async () => {
          await incrementLessonCompletion(lessonId);
          if (onExit) {
            onExit();
          } else if (router.canGoBack()) {
            router.back();
          } else {
            router.push("/lessons");
          }
        }}
        onReview={() => {
          setShowCompleteScreen(false);
          setLessonStats(null);
          setCurrentQuestionIndex(0);
          setQuestionAttempts({});
          setCorrectAnswersCount(0);
          setWrongQuestions(new Set());
          setVisitedIndices(new Set([0]));
          resetState();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ConfirmDialog
        visible={exitConfirmVisible}
        title={T.exitLesson.title}
        description={T.exitLesson.message}
        cancelLabel={T.exitLesson.stay}
        confirmLabel={T.exitLesson.leave}
        destructive
        onConfirm={async () => {
          setExitConfirmVisible(false);
          Speech.stop();
          if (onExit) {
            onExit();
          } else if (router.canGoBack()) {
            router.back();
          } else {
            router.push("/lessons");
          }
        }}
        onCancel={() => setExitConfirmVisible(false)}
      />
      <ProgressHeader
        progress={progress}
        currentCount={currentQuestionIndex + 1}
        totalCount={questions.length}
        onClose={() => setExitConfirmVisible(true)}
      />

      {/* New exercise types — self-contained with their own answer handling */}
      {currentQuestion.type === "flashcard" && (
        <FlashcardMode
          key={currentQuestion.id}
          hanzi={currentQuestion.mandarin.hanzi}
          pinyin={currentQuestion.mandarin.pinyin}
          instruction={currentQuestion.instruction}
          options={currentQuestion.options}
          correctOptionId={currentQuestion.correctOptionId}
          onAnswer={handleSelfContainedAnswer}
        />
      )}

      {currentQuestion.type === "fill_blank" && (
        <FillBlankMode
          key={currentQuestion.id}
          sentence={currentQuestion.sentence}
          sentencePinyin={currentQuestion.sentencePinyin}
          blankedWord={currentQuestion.blankedWord}
          correctAnswer={currentQuestion.correctAnswer}
          hint={currentQuestion.hint}
          instruction={currentQuestion.instruction}
          options={currentQuestion.options}
          onAnswer={handleSelfContainedAnswer}
        />
      )}

      {currentQuestion.type === "match_pairs" && (
        <MatchPairsMode
          key={currentQuestion.id}
          instruction={currentQuestion.instruction}
          pairs={currentQuestion.pairs}
          onAnswer={handleSelfContainedAnswer}
        />
      )}

      {currentQuestion.type === "grammar" && (
        <GrammarMode
          key={currentQuestion.id}
          rule={currentQuestion.rule}
          practice={currentQuestion.practice}
          onAnswer={handleSelfContainedAnswer}
        />
      )}

      {currentQuestion.type === "stroke_order" && (
        <StrokeOrderMode
          key={currentQuestion.id}
          characters={currentQuestion.characters}
          instruction={currentQuestion.instruction}
          onAnswer={handleSelfContainedAnswer}
        />
      )}

      {/* Original exercise types — audio-based */}
      {(currentQuestion.type === "multiple_choice" ||
        currentQuestion.type === "single_response" ||
        currentQuestion.type === "listening_mc" && (
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.audioSection,
              {
                backgroundColor: colors.surfaceSecondary,
                minHeight: audioSectionAnimHeight,
                flex: hasListenedToAudio ? 0 : 1,
                justifyContent: "center",
                opacity: showResult ? 0.6 : 1,
              },
            ]}
            pointerEvents={showResult ? "none" : "auto"}
          >
            <AudioPrompt
              isPlaying={isSpeechPlaying}
              hasListenedToAudio={hasListenedToAudio}
              onPlay={playAudio}
              onRevealMandarin={handleRevealMandarin}
              currentQuestion={currentQuestion}
              showMandarin={showMandarin}
              scaleAnim={scaleAnim}
              instructionOpacity={instructionOpacity}
              listeningOpacity={listeningOpacity}
              listeningScale={listeningScale}
              fadeAnim={fadeAnim}
            />
          </Animated.View>

          {hasListenedToAudio && (

          <View style={styles.content}>
            <Animated.View
              style={[
                styles.audioSection,
                {
                  backgroundColor: Colors.surfaceSecondary,
                  minHeight: audioSectionAnimHeight,
                  flex: hasListenedToAudio ? 0 : 1,
                  justifyContent: "center",
                  opacity: showResult ? 0.6 : 1,
                },
              ]}
              pointerEvents={showResult ? "none" : "auto"}
            >
              <AudioPrompt
                isPlaying={isSpeechPlaying}
                hasListenedToAudio={hasListenedToAudio}
                onPlay={playAudio}
                onRevealMandarin={handleRevealMandarin}
                currentQuestion={currentQuestion}
                showMandarin={showMandarin}
                scaleAnim={scaleAnim}
                instructionOpacity={instructionOpacity}
                listeningOpacity={listeningOpacity}
                listeningScale={listeningScale}
                fadeAnim={fadeAnim}
              />
            </Animated.View>

            {hasListenedToAudio && (
              <Animated.View
                style={[
                  styles.optionsSection,
                  {
                    opacity: Animated.multiply(
                      optionsAnimValue,
                      showResult ? 0.5 : 1,
                    ),
                    transform: [
                      {
                        translateY: optionsAnimValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                    ],
                  },
                ]}
                pointerEvents={showResult ? "none" : "auto"}
              >
                {currentQuestion.type === "multiple_choice" && (
                  <MultipleChoiceMode
                    options={currentQuestion.options}
                    selectedOption={selectedOption}
                    handleOptionPress={handleOptionPress}
                    isLoading={false}
                    showResult={showResult}
                    instruction={currentQuestion.instruction}
                  />
                )}
                {currentQuestion.type === "listening_mc" && (
                  <ListeningMultipleChoiceMode
                    options={currentQuestion.options}
                    selectedOption={selectedOption}
                    handleOptionPress={handleOptionPress}
                    isLoading={false}
                    showResult={showResult}
                  />
                )}
                {currentQuestion.type === "single_response" && (
                  <SingleResponseMode
                    option={currentQuestion.options[0]}
                    optionSelectionAnim={optionSelectionAnim}
                    onContinue={handleShadowingContinue}
                  />
                )}
              </Animated.View>
            )}

            {/* Feedback view */}
            {showResult && selectedSentence && (
              <Animated.View
                style={[
                  styles.feedbackWrapper,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <FeedbackView
                  correctOption={selectedSentence}
                  isCorrect={isCorrect}
                  onContinue={nextQuestion}
                  onRetry={
                    attemptCount < MAX_ATTEMPTS && !isCorrect
                      ? handleRetry
                      : undefined
                  }
                  attemptCount={isCorrect ? attemptCount : attemptCount + 1}
                  maxAttempts={MAX_ATTEMPTS}
                />
              </Animated.View>
            )}
          </View>
        )}

      {/* Sentence Breakdown Card */}
      {currentQuestion.type === "listening_mc" &&
        hasListenedToAudio && (
          <SentenceBreakdownCard
            sentence={{
              english:
                currentQuestion.options.find(
                  (opt) => opt.id === currentQuestion.correctOptionId,
                )?.english || "",
              pinyin: currentQuestion.mandarin.pinyin,
              hanzi: currentQuestion.mandarin.hanzi,
              words: currentQuestion.mandarin.words,
              breakdown: currentQuestion.mandarin.breakdown,
            }}
            disabled={showResult}
          />
        )}
      {(currentQuestion.type === "multiple_choice" ||
        currentQuestion.type === "single_response") &&
        selectedSentence && (
          <SentenceBreakdownCard
            sentence={{
              english: selectedSentence.english,
              pinyin: selectedSentence.mandarin.pinyin,
              hanzi: selectedSentence.mandarin.hanzi,
              words: selectedSentence.mandarin.words,
              breakdown: selectedSentence.mandarin.breakdown,
            }}
            disabled={showResult}
          />
        )}

      <ExerciseNavBar
        total={questions.length}
        currentIndex={currentQuestionIndex}
        visitedIndices={visitedIndices}
        wrongIndices={wrongIndices}
        onJumpTo={jumpToQuestion}
      />
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.surfacePrimary },
    content: { flex: 1, paddingHorizontal: 20 },
    audioSection: {
      alignItems: "center",
      marginBottom: 32,
      padding: 18,
      borderRadius: 18,
      marginTop: 18,
    },
    optionsSection: {
      flex: 1,
      marginBottom: 24,
    },
    feedbackWrapper: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingBottom: 20,
      zIndex: 1000,
    },
  });
}
