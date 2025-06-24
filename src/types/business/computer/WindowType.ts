export type FolderWindow = {
    computerDataList: ComputerDataInFolder[]
}

export type DetailWindow = {
    computerData: ComputerDataInFolder,
}

export enum WindowType {
    Folder,
    Detail
}

export type ComputerWindow = {
    x: number,
    y: number,
    type: WindowType,
    data: DetailWindow | FolderWindow
}

export type InitWindow = {
    type: WindowType,
    data: DetailWindow | FolderWindow
}

