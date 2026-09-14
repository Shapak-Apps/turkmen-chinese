import { Colors, FontFamily } from "@/constants/theme";
import { T } from "@/lib/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

/**
 * Compact in-exercise confirmation: "Berekella!" on a correct answer,
 * "Ýene maşk et" on a wrong one. Reuses the FeedbackView header strings,
 * icon and colours so the self-contained modes confirm answers without a
 * second continue tap. No new Turkmen text (issue #28).
 */
export function FeedbackBanner({ isCorrect }: { isCorrect: boolean }) {
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isCorrect ? Colors.successBg : Colors.primaryAccentBg,
                    borderColor: isCorrect ? Colors.successColor : Colors.primaryAccentColor,
                },
            ]}
        >
            <Ionicons
                name={isCorrect ? "checkmark-circle" : "close-circle"}
                size={36}
                color={isCorrect ? Colors.successColor : Colors.primaryAccentColor}
            />
            <ThemedText style={styles.title}>
                {isCorrect ? T.feedback.correct : T.feedback.keepPractising}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 12,
    },
    title: {
        fontFamily: FontFamily.bold,
        fontSize: 18,
        color: Colors.textPrimary,
    },
});
