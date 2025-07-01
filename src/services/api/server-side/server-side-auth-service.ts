import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";

export async function isAuthenticated(token: string | undefined): Promise<boolean> {
    if (!token) {
        return false;
    }
    const response = await fetch(BACKEND_URL+'logged', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (!response.ok) {
        if(response.status === 401){
            return false;
        }
        throw new HttpError(response.status, response.statusText);
    }
    return true;
}

export async function serverSideAuth(password: string): Promise<string> {
    const formData = new FormData();
    formData.append("password", password);
    const response = await fetch(BACKEND_URL+'login', {
        method: 'POST',
        body: formData
    })
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
    return (await response.json()).token
}
