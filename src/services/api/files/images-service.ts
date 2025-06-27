import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";
import type {Image} from "../../../types/dto/image_dto";

type NewFileResponse = {
    file_path: string,
}

export async function uploadImage(file: File, alt: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt);
    const response = await fetch(`${BACKEND_URL}images/new`, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    const json : NewFileResponse = await response.json();
    return json.file_path
}

export async function getAllImages(): Promise<Image[]> {
    const response = await fetch(`${BACKEND_URL}images`)
    if(!response.ok) {
        console.log(response.statusText);
        throw new HttpError(response.status, response.statusText);
    }
    return response.json();
}

export async function deleteImage(id: string): Promise<void> {
    const response = await fetch(`${BACKEND_URL}images/delete/${id}`, {
        method: 'DELETE',
    })
    if(!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
}