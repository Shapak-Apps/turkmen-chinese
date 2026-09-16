import { ThemedText } from "@/components/themed-text";
import { Colors, FontFamily, Radius } from "@/constants/theme";
import { haptics } from "@/lib/haptics";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";

interface RenameModalProps {
    visible: boolean;
    currentName: string | null;
    onClose: () => void;
    onSave: (newName: string) => Promise<void>;
}

export default function RenameModal({
    visible,
    currentName,
    onClose,
    onSave,
}: RenameModalProps) {
    const [nameDraft, setNameDraft] = useState("");

    useEffect(() => {
        if (visible) {
            setNameDraft(currentName ?? "");
        }
    }, [visible, currentName]);

    const confirmRename = async () => {
        const trimmed = nameDraft.trim();
        if (trimmed.length === 0) {
            onClose();
            return;
        }
        haptics.success();
        await onSave(trimmed);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.modalBackdrop}
                onPress={onClose}
            >
                <Pressable
                    style={styles.modalCard}
                    onPress={(e) => e.stopPropagation()}
                >
                    <ThemedText style={styles.modalTitle}>Adyňy üýtget</ThemedText>
                    <TextInput
                        style={styles.modalInput}
                        value={nameDraft}
                        onChangeText={setNameDraft}
                        autoFocus
                        maxLength={20}
                        autoCapitalize="words"
                        returnKeyType="done"
                        onSubmitEditing={confirmRename}
                        placeholder="Adyňy ýaz..."
                        placeholderTextColor={Colors.subduedTextColor}
                    />
                    <View style={styles.modalActions}>
                        <Pressable
                            style={[styles.modalBtn, styles.modalBtnSecondary]}
                            onPress={onClose}
                        >
                            <ThemedText style={styles.modalBtnSecondaryText}>Goý</ThemedText>
                        </Pressable>
                        <Pressable
                            style={[styles.modalBtn, styles.modalBtnPrimary]}
                            onPress={confirmRename}
                        >
                            <ThemedText style={styles.modalBtnPrimaryText}>Sakla</ThemedText>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        justifyContent: "center",
        padding: 24,
    },
    modalCard: {
        backgroundColor: Colors.surfacePrimary,
        borderRadius: Radius.lg,
        padding: 20,
    },
    modalTitle: {
        fontFamily: FontFamily.bold,
        fontSize: 18,
        color: Colors.textPrimary,
        marginBottom: 14,
    },
    modalInput: {
        fontFamily: FontFamily.semibold,
        fontSize: 17,
        color: Colors.textPrimary,
        backgroundColor: Colors.surfaceSecondary,
        borderRadius: Radius.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: Colors.borderColor,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 18,
    },
    modalBtn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: Radius.md,
    },
    modalBtnSecondary: { backgroundColor: Colors.surfaceTertiary },
    modalBtnSecondaryText: {
        fontFamily: FontFamily.semibold,
        fontSize: 14,
        color: Colors.textPrimary,
    },
    modalBtnPrimary: { backgroundColor: Colors.primaryAccentColor },
    modalBtnPrimaryText: {
        fontFamily: FontFamily.semibold,
        fontSize: 14,
        color: Colors.textInverse,
    },
});
