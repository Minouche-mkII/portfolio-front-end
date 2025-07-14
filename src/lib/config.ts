import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

let url: string

if(dev) {
    url = import.meta.env.VITE_BACKEND_URL
} else {
    url = env.PUBLIC_BACKEND_URL || "test"
}

export const BACKEND_URL: string = url