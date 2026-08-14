import { FontFamily, type ThemeColors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { T } from "@/lib/strings";
import { useMemo } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function ConfirmDialog({
  visible,
  title,
  description,
  confirmLabel = T.dialog.confirm,
  cancelLabel = T.dialog.cancel,
  onCancel,
  onConfirm,
  destructive = false,
}: {
  visible: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View style={styles.card}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {description ? (
            <ThemedText style={styles.description}>{description}</ThemedText>
          ) : null}

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancel,
                pressed && styles.pressed,
              ]}
              onPress={onCancel}
            >
              <ThemedText style={styles.cancelText}>{cancelLabel}</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                destructive ? styles.destructive : styles.confirm,
                pressed && styles.pressed,
              ]}
              onPress={onConfirm}
            >
              <ThemedText style={styles.confirmText}>{confirmLabel}</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      justifyContent: "center",
      padding: 20,
    },
    card: {
      backgroundColor: c.surfacePrimary,
      borderRadius: 18,
      padding: 20,
    },
    title: {
      fontFamily: FontFamily.bold,
      fontSize: 18,
      color: c.textPrimary,
    },
    description: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      lineHeight: 20,
      color: c.textSecondary,
      marginTop: 8,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 20,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    pressed: { opacity: 0.85 },
    cancel: {
      backgroundColor: c.surfaceTertiary,
    },
    cancelText: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textPrimary,
    },
    confirm: {
      backgroundColor: c.primaryAccentColor,
    },
    destructive: {
      backgroundColor: c.primaryAccentColor,
    },
    confirmText: {
      fontFamily: FontFamily.semibold,
      fontSize: 14,
      color: c.textInverse,
    },
  });
}
