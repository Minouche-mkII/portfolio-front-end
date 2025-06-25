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
    id: number,
    x: number,
    y: number,
    height: number,
    width: number,
    type: WindowType,
    data: DetailWindow | FolderWindow
}

export type InitWindow = {
    type: WindowType,
    data: DetailWindow | FolderWindow
}

