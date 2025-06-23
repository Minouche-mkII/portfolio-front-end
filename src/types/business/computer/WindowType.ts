type FolderWindow = {
    computerDataList: ComputerDataInFolder[]
}

type DetailWindow = {
    computerData: ComputerDataInFolder,
}

enum WindowType {
    Folder,
    Detail
}

type ComputerWindow = {
    x: number,
    y: number,
    type: WindowType,
    data: DetailWindow | FolderWindow
}

