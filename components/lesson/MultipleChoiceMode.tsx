import { SpeakingOption } from "@/constants/CourseData";
import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { haptics } from "@/lib/haptics";
import { T } from "@/lib/strings";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function MultipleChoiceMode({
  options,
  selectedOption,
  handleOptionPress,
  isLoading,
  showResult,
  instruction,
}: {
  options: SpeakingOption[];
  selectedOption: number | null;
  handleOptionPress: (id: number) => void;
  isLoading: boolean;
  showResult: boolean;
  instruction?: string;
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.promptContainer}>
        <ThemedText style={styles.sectionTitle}>
          {instruction || T.practice.chooseAnswer}
        </ThemedText>
      </View>
      <ScrollView
        style={styles.optionsScrollView}
        contentContainerStyle={styles.optionsContentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isLoading && !showResult}
      >
        {options.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <Pressable
              key={option.id}
              style={[
                styles.optionButton,
                {
                  backgroundColor: isSelected
                    ? colors.primaryAccentBg
                    : colors.surfacePrimary,
                  borderColor: isSelected
                    ? colors.primaryAccentColor
                    : colors.borderColor,
                  opacity: isLoading || showResult ? 0.7 : 1,
                },
              ]}
              onPress={() => {
                haptics.tap();
                handleOptionPress(option.id);
              }}
              disabled={isLoading || showResult}
            >
              <ThemedText
                style={[
                  styles.optionText,
                  isSelected && { color: colors.primaryAccentColor },
                ]}
              >
                {option.english}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    sectionTitle: {
      fontFamily: FontFamily.semibold,
      fontSize: 16,
      color: c.textPrimary,
      textAlign: "center",
      marginBottom: 18,
    },
    promptContainer: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 50,
    },
    optionsScrollView: { flex: 1 },
    optionsContentContainer: { paddingBottom: 0, gap: 12 },
    optionButton: {
      padding: 18,
      borderRadius: 14,
      borderWidth: 1.5,
    },
    optionText: {
      fontFamily: FontFamily.medium,
      fontSize: 15,
      color: c.textPrimary,
      flex: 1,
    },
  });
}
