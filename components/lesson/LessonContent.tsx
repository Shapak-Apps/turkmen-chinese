import { Question, SpeakingOption } from "@/constants/CourseData";
import { Colors, FontFamily } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { incrementLessonCompletion } from "@/lib/lessonProgress";
import { markActiveDay } from "@/lib/streak";
import { addXP, XP_REWARDS } from "@/lib/xp";
import {
  recordQuestionAnswered,
  recordQuestionListened,
} from "@/lib/speakingListeningStats";
import { Audio, InterruptionModeIOS } from "expo-av";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Animated, StyleSheet, View } from "react-native";
import { compareTwoStrings } from "string-similarity";
import { ThemedText } from "../themed-text";
import ConfirmDialog from "../ui/ConfirmDialog";
import AudioPrompt from "./AudioPrompt";
import { FeedbackView } from "./FeedbackView";
import LessonCompleteScreen from "./LessonCompleteScreen";
import ListeningMultipleChoiceMode from "./ListeningMultipleChoiceMode";
import MultipleChoiceMode from "./MultipleChoiceMode";
import ProgressHeader from "./ProgressHeader";
import SentenceBreakdownCard from "./SentenceBreakdownCard";
import SingleResponseMode from "./SingleResponseMode";
import FillBlankMode from "./FillBlankMode";
import FlashcardMode from "./FlashcardMode";
import GrammarMode from "./GrammarMode";
import MatchPairsMode from "./MatchPairsMode";
import StrokeOrderMode from "./StrokeOrderMode";
import ExerciseNavBar from "./ExerciseNavBar";

interface WrongQuestion {
  english: string;
  mandarin: {
    hanzi: string;
    pinyin: string;
  };
  attempts: number;
}

export interface LessonStats {
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  wrongQuestions?: WrongQuestion[];
}

const MAX_ATTEMPTS = 3;

export default function LessonContent({
  questions,
  lessonId,
  onExit,
}: {
  questions: Question[];
  lessonId: string;
  onExit?: () => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [exitConfirmVisible, setExitConfirmVisible] = useState(false);
  const [showMandarin, setShowMandarin] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hasListenedToAudio, setHasListenedToAudio] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [transcription, setTranscription] = useState<{
    expected: string;
    said: string;
  } | null>(null);
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex],
    [questions, currentQuestionIndex],
  );
  const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);

  // Lesson completion
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const [lessonStats, setLessonStats] = useState<LessonStats | null>(null);
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
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync();
      }
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
          void addXP(XP_REWARDS.CORRECT_ANSWER);
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
  }, [isSpeechPlaying, hasStartedFirstPlay, hasListenedToAudio]);

  useEffect(() => {
    if (
      currentQuestion.type === "single_response" &&
      currentQuestion.options.length > 0 &&
      hasListenedToAudio
    ) {
      setSelectedOption(currentQuestion.options[0].id);
      Animated.timing(optionSelectionAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentQuestion, hasListenedToAudio]);

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

  const startRecording = async () => {
    if (isSpeechPlaying) {
      Speech.stop();
      setIsSpeechPlaying(false);
    }

    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        Alert.alert("Microphone Permission", "Microphone access is required to practise speaking.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        staysActiveInBackground: true,
      });

      const preset = Audio.RecordingOptionsPresets.HIGH_QUALITY;
      const { recording } = await Audio.Recording.createAsync({
        ...preset,
        ios: {
          ...preset.ios,
          extension: ".wav",
          audioQuality: Audio.IOSAudioQuality.MAX,
          outputFormat: Audio.IOSOutputFormat.LINEARPCM,
        },
        android: {
          ...preset.android,
          extension: ".wav",
          outputFormat: Audio.AndroidOutputFormat.DEFAULT,
          audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
        },
      });

      recordingRef.current = recording;
      setIsRecognizing(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
      recordingRef.current = null;
      setIsRecognizing(false);
      Alert.alert("Recording Error", "Could not start recording.");
    }
  };

  const processSpeechResult = (transcript: string) => {
    setIsLoading(false);
    setShowResult(true);

    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g;

    const rawExpected = selectedSentence?.mandarin.pinyin || "";
    const expected = rawExpected
      .toLowerCase()
      .replace(punctuationRegex, "")
      .replace(/\s+/g, "")
      .trim();

    const said = transcript
      .toLowerCase()
      .replace(punctuationRegex, "")
      .replace(/\s+/g, "")
      .trim();

    setTranscription({ expected: rawExpected, said: transcript });

    if (!said || !expected) {
      setIsCorrect(false);
    } else {
      const similarity = compareTwoStrings(expected, said);
      const isSimilarEnough = similarity >= 0.8;

      setIsCorrect(isSimilarEnough);
      if (isSimilarEnough) {
        void recordQuestionAnswered();
      }
    }

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
  };

  const stopRecording = async () => {
    setIsLoading(true);
    setIsRecognizing(false);

    try {
      const recording = recordingRef.current;
      if (!recording) {
        setIsLoading(false);
        return;
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recordingRef.current = null;

      if (!uri) {
        setIsLoading(false);
        Alert.alert("Recording Error", "No audio was recorded.");
        return;
      }

      // TODO: Add offline transcription or API-based transcription later
      // For now, skip transcription and mark as correct (practice mode)
      processSpeechResult(selectedSentence?.mandarin.pinyin || "");
    } catch (err) {
      console.error("Failed to start/stop recording:", err);
      setIsLoading(false);
      Alert.alert("Recording Error", "Could not process recording.");
    }
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
        const accuracy = Math.round(
          (correctAnswersCount / questions.length) * 100,
        );

        const wrongQuestionsList = questions
          .filter((q) => wrongQuestions.has(q.id))
          .map((q) => {
            let english = "";
            let hanzi = "";
            let pinyin = "";

            if (q.type === "listening_mc") {
              english =
                q.options.find((opt) => opt.id === q.correctOptionId)
                  ?.english || "";
              hanzi = q.mandarin.hanzi;
              pinyin = q.mandarin.pinyin;
            } else if (q.type === "multiple_choice" || q.type === "single_response") {
              const option = q.options[0];
              english = option.english;
              hanzi = option.mandarin.hanzi;
              pinyin = option.mandarin.pinyin;
            } else if (q.type === "flashcard") {
              const correct = q.options.find((opt) => opt.id === q.correctOptionId);
              english = correct?.english || "";
              hanzi = q.mandarin.hanzi;
              pinyin = q.mandarin.pinyin;
            } else if (q.type === "fill_blank") {
              english = q.correctAnswer;
              hanzi = q.sentence;
              pinyin = q.sentencePinyin;
            } else if (q.type === "match_pairs") {
              english = "Match pairs";
              hanzi = q.pairs.map((p) => p.left).join(", ");
              pinyin = "";
            } else if (q.type === "grammar") {
              english = q.rule.title;
              hanzi = "";
              pinyin = "";
            } else if (q.type === "stroke_order") {
              english = q.instruction || "Hiýeroglif ýaz";
              hanzi = q.characters.join("");
              pinyin = "";
            }

            return {
              english,
              mandarin: {
                hanzi,
                pinyin,
              },
              attempts: questionAttempts[q.id] || 1,
            };
          });

        const finalStats: LessonStats = {
          correctAnswers: correctAnswersCount,
          totalQuestions: questions.length,
          accuracy,
          wrongQuestions:
            wrongQuestionsList.length > 0 ? wrongQuestionsList : undefined,
        };

        setLessonStats(finalStats);
        setShowCompleteScreen(true);
      }
    });
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
        setIsLoading(false);
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
    setIsLoading(false);
    setTranscription(null);
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
        title="Gönükmeden çykmak"
        description="Hakykatdan hem çykmak isleýärsiňizmi? Öňegidişligiňiz ýatdan çykar."
        cancelLabel="Ýok"
        confirmLabel="Çyk"
        destructive
        onConfirm={async () => {
          setExitConfirmVisible(false);
          Speech.stop();
          if (recordingRef.current) {
            await recordingRef.current.stopAndUnloadAsync();
          }
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
          onAnswer={(correct) => {
            if (correct) {
              haptics.success();
              setCorrectAnswersCount((prev) => prev + 1);
              void recordQuestionAnswered();
              void addXP(XP_REWARDS.CORRECT_ANSWER);
              void markActiveDay();
            } else {
              haptics.error();
              setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
            }
            nextQuestion();
          }}
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
          onAnswer={(correct) => {
            if (correct) {
              haptics.success();
              setCorrectAnswersCount((prev) => prev + 1);
              void recordQuestionAnswered();
              void addXP(XP_REWARDS.CORRECT_ANSWER);
              void markActiveDay();
            } else {
              haptics.error();
              setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
            }
            nextQuestion();
          }}
        />
      )}

      {currentQuestion.type === "match_pairs" && (
        <MatchPairsMode
          key={currentQuestion.id}
          instruction={currentQuestion.instruction}
          pairs={currentQuestion.pairs}
          onAnswer={(correct) => {
            if (correct) {
              haptics.success();
              setCorrectAnswersCount((prev) => prev + 1);
              void recordQuestionAnswered();
              void addXP(XP_REWARDS.CORRECT_ANSWER);
              void markActiveDay();
            } else {
              haptics.error();
              setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
            }
            nextQuestion();
          }}
        />
      )}

      {currentQuestion.type === "grammar" && (
        <GrammarMode
          key={currentQuestion.id}
          rule={currentQuestion.rule}
          practice={currentQuestion.practice}
          onAnswer={(correct) => {
            if (correct) {
              haptics.success();
              setCorrectAnswersCount((prev) => prev + 1);
              void recordQuestionAnswered();
              void addXP(XP_REWARDS.CORRECT_ANSWER);
              void markActiveDay();
            } else {
              haptics.error();
              setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
            }
            nextQuestion();
          }}
        />
      )}

      {currentQuestion.type === "stroke_order" && (
        <StrokeOrderMode
          key={currentQuestion.id}
          characters={currentQuestion.characters}
          instruction={currentQuestion.instruction}
          onAnswer={(correct) => {
            if (correct) {
              haptics.success();
              setCorrectAnswersCount((prev) => prev + 1);
              void recordQuestionAnswered();
              void addXP(XP_REWARDS.CORRECT_ANSWER);
              void markActiveDay();
            } else {
              haptics.error();
              setWrongQuestions((prev) => new Set(prev).add(currentQuestion.id));
            }
            nextQuestion();
          }}
        />
      )}

      {/* Original exercise types — audio-based */}
      {(currentQuestion.type === "multiple_choice" ||
        currentQuestion.type === "single_response" ||
        currentQuestion.type === "listening_mc") && (
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.audioSection,
              {
                backgroundColor: Colors.surfaceSecondary,
                minHeight: audioSectionAnimHeight,
                flex: hasListenedToAudio ? 0 : 1,
                justifyContent: "center",
                opacity: isLoading || showResult ? 0.6 : 1,
              },
            ]}
            pointerEvents={isLoading || showResult ? "none" : "auto"}
          >
            <AudioPrompt
              isPlaying={isSpeechPlaying}
              isRecognizing={isRecognizing}
              hasListenedToAudio={hasListenedToAudio}
              onPlay={playAudio}
              onStartRecord={startRecording}
              onStopRecord={stopRecording}
              onRevealMandarin={handleRevealMandarin}
              currentQuestion={currentQuestion}
              showMandarin={showMandarin}
              selectedOption={selectedOption}
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
                    isLoading || showResult ? 0.5 : 1,
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
              pointerEvents={isLoading || showResult ? "none" : "auto"}
            >
              {currentQuestion.type === "multiple_choice" && (
                <MultipleChoiceMode
                  options={currentQuestion.options}
                  selectedOption={selectedOption}
                  handleOptionPress={handleOptionPress}
                  isLoading={isLoading}
                  showResult={showResult}
                  instruction={currentQuestion.instruction}
                />
              )}
              {currentQuestion.type === "listening_mc" && (
                <ListeningMultipleChoiceMode
                  options={currentQuestion.options}
                  selectedOption={selectedOption}
                  handleOptionPress={handleOptionPress}
                  isLoading={isLoading}
                  showResult={showResult}
                />
              )}
              {currentQuestion.type === "single_response" && (
                <SingleResponseMode
                  option={currentQuestion.options[0]}
                  optionSelectionAnim={optionSelectionAnim}
                />
              )}
            </Animated.View>
          )}

          {isLoading && (
            <View style={styles.bottomSection}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={Colors.primaryAccentColor}
                />
                <ThemedText style={styles.loadingText}>
                  Analyzing your pronunciation...
                </ThemedText>
              </View>
            </View>
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
                transcription={
                  transcription
                    ? {
                        expected: transcription.expected,
                        said: transcription.said,
                      }
                    : undefined
                }
              />
            </Animated.View>
          )}
        </View>
      )}

      {/* Sentence Breakdown Card */}
      {currentQuestion.type === "listening_mc" &&
        !isLoading &&
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
        !isLoading &&
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
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
  bottomSection: { marginBottom: 20 },
  loadingContainer: { alignItems: "center", padding: 20 },
  loadingText: {
    marginTop: 12,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.subduedTextColor,
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
