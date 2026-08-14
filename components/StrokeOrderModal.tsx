import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import HANZI_DATA from "@/assets/data/hanzi_data.json";
import {
  HanziWriter,
  useHanziWriter,
} from "@jamsch/react-native-hanzi-writer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CharacterJson {
  strokes: string[];
  medians: number[][][];
}

async function loadCharacterData(char: string): Promise<CharacterJson> {
  const data = (HANZI_DATA as Record<string, CharacterJson>)[char];
  if (!data) {
    throw new Error(`No stroke data for ${char}`);
  }
  return data;
}

function CharacterView({ char }: { char: string }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const writer = useHanziWriter({
    character: char,
    loader: loadCharacterData,
  });

  return (
    <View style={styles.charContainer}>
      <Text style={styles.charTitle} maxFontSizeMultiplier={1.3}>{char}</Text>

      <View style={styles.writerWrapper}>
        <HanziWriter
          writer={writer}
          style={styles.writer}
          loading={
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color={colors.primaryAccentColor} />
              <Text style={styles.loadingText} maxFontSizeMultiplier={1.3}>Ýüklenýär...</Text>
            </View>
          }
          error={
            <View style={styles.loadingBox}>
              <Ionicons name="alert-circle-outline" size={36} color={colors.borderColorStrong} />
              <Text style={styles.errorText} maxFontSizeMultiplier={1.3}>Bu hiýeroglif üçin maglumat ýok</Text>
            </View>
          }
        >
          <HanziWriter.GridLines color={colors.borderColor} width={1} />
          <HanziWriter.Svg>
            <HanziWriter.Outline color={colors.surfaceTertiary} />
            <HanziWriter.Character color={colors.primaryAccentColor} />
          </HanziWriter.Svg>
        </HanziWriter>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.animateButton,
            pressed && styles.pressed,
          ]}
          onPress={() =>
            writer.animator.animateCharacter({
              strokeDuration: 600,
              delayBetweenStrokes: 300,
            })
          }
        >
          <Ionicons name="play" size={18} color={colors.textInverse} />
          <Text style={styles.animateButtonText} maxFontSizeMultiplier={1.3}>Ýazylyşy</Text>
        </Pressable>
      </View>
    </View>
  );
}

interface StrokeOrderModalProps {
  visible: boolean;
  characters: string[];
  onClose: () => void;
}

export default function StrokeOrderModal({
  visible,
  characters,
  onClose,
}: StrokeOrderModalProps) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const char = characters[currentIndex];
  const hasMultiple = characters.length > 1;

  const goNext = () => {
    if (currentIndex < characters.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setCurrentIndex(0);
              onClose();
            }}
            hitSlop={10}
          >
            <Ionicons name="close" size={20} color={colors.textPrimary} />
          </Pressable>

          {char && <CharacterView key={char} char={char} />}

          {hasMultiple && (
            <View style={styles.charNav}>
              <Pressable
                style={[
                  styles.charNavButton,
                  currentIndex === 0 && styles.charNavButtonDisabled,
                ]}
                onPress={goPrev}
                disabled={currentIndex === 0}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={
                    currentIndex === 0
                      ? colors.borderColorStrong
                      : colors.primaryAccentColor
                  }
                />
              </Pressable>

              <Text style={styles.charNavText} maxFontSizeMultiplier={1.3}>
                {currentIndex + 1} / {characters.length}
              </Text>

              <Pressable
                style={[
                  styles.charNavButton,
                  currentIndex === characters.length - 1 &&
                    styles.charNavButtonDisabled,
                ]}
                onPress={goNext}
                disabled={currentIndex === characters.length - 1}
              >
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={
                    currentIndex === characters.length - 1
                      ? colors.borderColorStrong
                      : colors.primaryAccentColor
                  }
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      justifyContent: "center",
      alignItems: "center",
      padding: 28,
    },
    modal: {
      backgroundColor: c.surfacePrimary,
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 360,
      alignItems: "center",
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: c.surfaceTertiary,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
    },
    charContainer: {
      alignItems: "center",
      width: "100%",
    },
    charTitle: {
      fontFamily: FontFamily.bold,
      fontSize: 36,
      color: c.primaryAccentColor,
      marginBottom: 12,
      marginTop: 8,
    },
    writerWrapper: {
      borderWidth: 1,
      borderColor: c.borderColor,
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: c.surfaceSecondary,
    },
    writer: {
      width: 280,
      height: 280,
    },
    loadingBox: {
      width: 280,
      height: 280,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    loadingText: {
      fontFamily: FontFamily.medium,
      fontSize: 13,
      color: c.subduedTextColor,
    },
    errorText: {
      fontFamily: FontFamily.regular,
      fontSize: 13,
      color: c.subduedTextColor,
      textAlign: "center",
      paddingHorizontal: 20,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 16,
    },
    animateButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: c.primaryAccentColor,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 12,
    },
    pressed: { opacity: 0.85 },
    animateButtonText: {
      fontFamily: FontFamily.semibold,
      color: c.textInverse,
      fontSize: 15,
    },
    charNav: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginTop: 16,
    },
    charNavButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: c.surfaceTertiary,
      alignItems: "center",
      justifyContent: "center",
    },
    charNavButtonDisabled: {
      opacity: 0.4,
    },
    charNavText: {
      fontFamily: FontFamily.semibold,
      fontSize: 13,
      color: c.textSecondary,
    },
  });
}
