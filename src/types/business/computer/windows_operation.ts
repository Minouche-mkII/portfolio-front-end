import type {InitWindow} from "./WindowType";

export type WindowOperation = {
    openWindow: (window: InitWindow) => void;
    closeWindow: (index: number) => void;
    getMaxZIndex: () => number;
    setUserSelect: (userSelect: boolean) => void;
}