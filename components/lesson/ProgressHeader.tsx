import { Colors, FontFamily } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function ProgressHeader({
  progress,
  currentCount,
  totalCount,
  onClose,
  onPrev,
  onNext,
  onJumpTo,
}: {
  progress: number;
  currentCount: number;
  totalCount: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onJumpTo?: () => void;
}) {
  const canPrev = !!onPrev && currentCount > 1;
  const canNext = !!onNext && currentCount < totalCount;

  return (
    <View style={styles.header}>
      <Pressable hitSlop={20} style={styles.closeButton} onPress={onClose}>
        <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
      </Pressable>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Pressable hitSlop={12} onPress={onJumpTo} disabled={!onJumpTo}>
          <ThemedText style={styles.progressText}>
            {currentCount}/{totalCount}
          </ThemedText>
        </Pressable>
      </View>
      {onPrev && (
        <Pressable
          hitSlop={12}
          style={[styles.navButton, !canPrev && styles.navDisabled]}
          onPress={canPrev ? onPrev : undefined}
          disabled={!canPrev}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={canPrev ? Colors.primaryAccentColor : Colors.borderColorStrong}
          />
        </Pressable>
      )}
      {onNext && (
        <Pressable
          hitSlop={12}
          style={[styles.navButton, !canNext && styles.navDisabled]}
          onPress={canNext ? onNext : undefined}
          disabled={!canNext}
        >
          <Ionicons
            name="chevron-forward"
            size={22}
            color={canNext ? Colors.primaryAccentColor : Colors.borderColorStrong}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.surfacePrimary,
  },
  closeButton: {
    marginRight: 12,
    padding: 4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
    backgroundColor: Colors.surfaceTertiary,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: Colors.primaryAccentColor,
  },
  progressText: {
    fontFamily: FontFamily.semibold,
    fontSize: 13,
    color: Colors.textSecondary,
    minWidth: 42,
    textAlign: "right",
  },
  navButton: {
    marginLeft: 4,
    padding: 4,
  },
  navDisabled: {
    opacity: 0.4,
  },
});
