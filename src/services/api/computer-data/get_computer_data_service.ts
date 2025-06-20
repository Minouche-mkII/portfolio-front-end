import {BACKEND_URL} from "$lib/config";

export async function getAllComputerData() : Promise<ComputerData[]> {
    let response = await fetch(BACKEND_URL + "computer-data/")
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export function getAllComputerDataAsFolder() : object {
    return {}
}