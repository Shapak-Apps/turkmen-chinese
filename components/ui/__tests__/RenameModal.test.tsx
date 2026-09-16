/// <reference types="jest" />
import RenameModal from "@/components/ui/RenameModal";
import { fireEvent, render } from "@testing-library/react-native";

// 15000ms: the first test in a file pays the warm-up of the test renderer
jest.setTimeout(15000);

jest.mock("@/lib/haptics", () => ({
    haptics: { tap: jest.fn(), success: jest.fn(), error: jest.fn(), heavy: jest.fn() },
}));

const { haptics } = jest.requireMock("@/lib/haptics");

beforeEach(() => {
    jest.clearAllMocks();
});

describe("RenameModal", () => {
    it("does not call onSave when field is whitespace only", async () => {
        const onSave = jest.fn().mockResolvedValue(undefined);
        const onClose = jest.fn();
        const { getByText, getByPlaceholderText } = await render(
            <RenameModal
                visible={true}
                currentName="Batyr"
                onClose={onClose}
                onSave={onSave}
            />,
        );

        await fireEvent.changeText(getByPlaceholderText("Adyňy ýaz..."), "   ");
        await fireEvent.press(getByText("Sakla"));

        expect(onSave).not.toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onSave with trimmed name", async () => {
        const onSave = jest.fn().mockResolvedValue(undefined);
        const onClose = jest.fn();
        const { getByText, getByPlaceholderText } = await render(
            <RenameModal
                visible={true}
                currentName="Batyr"
                onClose={onClose}
                onSave={onSave}
            />,
        );

        await fireEvent.changeText(getByPlaceholderText("Adyňy ýaz..."), "  Batyr  ");
        await fireEvent.press(getByText("Sakla"));

        expect(onSave).toHaveBeenCalledWith("Batyr");
        expect(haptics.success).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });

    it("resets draft to currentName on reopen", async () => {
        const onSave = jest.fn().mockResolvedValue(undefined);
        const onClose = jest.fn();
        const { getByPlaceholderText, rerender } = await render(
            <RenameModal
                visible={true}
                currentName="Batyr"
                onClose={onClose}
                onSave={onSave}
            />,
        );

        let input = getByPlaceholderText("Adyňy ýaz...");
        await fireEvent.changeText(input, "Gurban");

        await rerender(
            <RenameModal
                visible={false}
                currentName="Batyr"
                onClose={onClose}
                onSave={onSave}
            />,
        );
        await rerender(
            <RenameModal
                visible={true}
                currentName="Batyr"
                onClose={onClose}
                onSave={onSave}
            />,
        );

        input = getByPlaceholderText("Adyňy ýaz...");
        expect(input.props.value).toBe("Batyr");
    });
});
