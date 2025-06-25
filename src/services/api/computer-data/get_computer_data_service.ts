import {BACKEND_URL} from "$lib/config";
import type {Detail} from "../../../types/dto/detail";
import {HttpError} from "../../utils/http_error";
import type {ComputerData} from "../../../types/dto/computer_data";

export async function getComputerDataAsFolders() : Promise<Map<string,ComputerDataInFolder[]>> {
    let response = await fetch(BACKEND_URL + "computer-data/as_folders")
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    const json = await response.json()
    return new Map(Object.entries(json));
}

export async function getAllComputerData() : Promise<ComputerData[]> {
    let response = await fetch(BACKEND_URL + "computer-data")
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    return await response.json()
}

export async function getComputerData(id: string) : Promise<ComputerData> {
    let response = await fetch(BACKEND_URL + "computer-data/" + id);
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    return await response.json();
}

export async function getComputerDataDetails(id: string) : Promise<Detail[]> {
    let response = await fetch(BACKEND_URL + "computer-data/detail/" + id);
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    return await response.json();
}