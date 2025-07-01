import {PRODUCTION} from "$lib/config";

export async function POST({ cookies }) {
    cookies.set('token', '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        secure: PRODUCTION,
        sameSite: 'lax'
    });

    return new Response(null, { status: 204 });
}