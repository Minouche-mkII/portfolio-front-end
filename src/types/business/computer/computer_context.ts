import type {ComputerWindow} from "./WindowType";

export type ComputerContext = {
    openedWindows: ComputerWindow[],
    computerData: Map<string, ComputerDataInFolder[]>,
    lastIndex: number
}