
let popUpStatus: Map<string, boolean> = new Map();

export function hasBeenClosed(id: string) {
    let status = popUpStatus.get(id);
    if (!status) {
        popUpStatus.set(id, false)
        return false
    }
    return status
}

export function markAsClosed(id: string) {
    popUpStatus.set(id, true)
}