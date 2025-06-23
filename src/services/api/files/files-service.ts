import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";

type NewFileResponse = {
    file_path: string,
}

export async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${BACKEND_URL}new-image`, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    const json : NewFileResponse = await response.json();
    return json.file_path
}