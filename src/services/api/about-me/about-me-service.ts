import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";
import type {Detail} from "../../../types/dto/detail";
import {getBearerToken} from "../auth/auth_service";

export async function getAboutMe() {
    const response = await fetch(BACKEND_URL+"about-me")
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    return (await response.json()) as Detail[];
}

export async function editABoutMePage(details: Detail[]) {
    const response = await fetch(BACKEND_URL+"about-me/edit", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "authorization": getBearerToken()
        },
        body: JSON.stringify({details})
    })
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
}