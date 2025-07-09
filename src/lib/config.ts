
let url: string

if(import.meta.env.NODE_ENV !== 'production') {
    url = import.meta.env.VITE_BACKEND_URL
} else {
    url = process.env.BACKEND_URL || ""
}

export const BACKEND_URL: string = url