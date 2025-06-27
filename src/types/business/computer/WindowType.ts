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
    logo: string,
    name: string,
    type: WindowType,
    data: DetailWindow | FolderWindow
}

export type InitWindow = {
    logo: string,
    name: string,
    type: WindowType,
    data: DetailWindow | FolderWindow
}

