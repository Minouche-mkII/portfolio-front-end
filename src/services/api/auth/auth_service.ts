import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";

export async function tryAuth(password: string) {
    const response = await fetch('login/try', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "password": password
        }),
        credentials: "include"
    })
    if (!response.ok) {
        console.log(response.status +" "+response.statusText);
        throw new HttpError(response.status, response.statusText);
    }
    let token = (await response.json()).token
    sessionStorage.setItem("auth_token", token);
}

export function getBearerToken(): string {
    return `Bearer ${sessionStorage.getItem("auth_token")}`;
}

export async function logOut() {
    sessionStorage.removeItem("auth_token");
    const response = await fetch('logout/try', {
        method: 'POST',
    });
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }
}