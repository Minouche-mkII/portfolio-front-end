import type {GalleryImageDTO, PageDTO} from "../../../types/dto/page-dto";
import {BACKEND_URL} from "$lib/config";
import {getBearerToken} from "../auth/auth_service";
import {HttpError} from "../../utils/http_error";

export async function newPage(page: GalleryImageDTO[]) {
    let response = await fetch(BACKEND_URL+"gallery/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": getBearerToken()
        },
        body: JSON.stringify({
            images: page
        })
    })
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    return (await response.json()).id as string;
}

export async function updatePage(page: PageDTO) {
    let response = await fetch(BACKEND_URL+"gallery/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": getBearerToken()
        },
        body: JSON.stringify(page)
    })
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
}

export async function deletePage(id: string) {
    let response = await fetch(BACKEND_URL+"gallery/delete/"+id, {
        method: "DELETE",
        headers: {
            "authorization": getBearerToken()
        }
    })
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
}