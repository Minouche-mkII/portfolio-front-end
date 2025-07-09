export async function POST({ cookies }) {
    cookies.set('token', '', {
        path: '/',
        expires: new Date(0),
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    return new Response(null, { status: 204 });
}