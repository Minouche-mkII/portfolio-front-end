export type ComputerContext = {
    openedWindows: ComputerWindow[],
    computerData: Map<string, ComputerDataInFolder[]>
}