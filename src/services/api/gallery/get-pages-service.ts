import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";
import type {PageDTO} from "../../../types/dto/page-dto";

export async function getAllPagesIds(){
    let response = await fetch(BACKEND_URL+"gallery/all-ids")
    if(!response.ok){
        throw new HttpError(response.status, response.statusText);
    }
    return (await response.json()) as string[];
}

export async function getPageById(id: string){
    let response = await fetch(BACKEND_URL+"gallery/"+id);
    if(!response.ok){
        throw new HttpError(response.status, response.statusText);
    }
    return (await response.json()) as PageDTO;
}

export async function getAllPages(id: string){
    let response = await fetch(BACKEND_URL+"gallery");
    if(!response.ok){
        throw new HttpError(response.status, response.statusText);
    }
    return (await response.json()) as PageDTO[];
}