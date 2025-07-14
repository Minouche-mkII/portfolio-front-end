import {serverSideAuth} from "../../../../services/api/server-side/server-side-auth-service";
import {HttpError} from "../../../../services/utils/http_error";

export async function POST({ request, cookies }) {
    type Props = { password: string };
    const { password }: Props = await request.json();
    try {
        const token = await serverSideAuth(password)
        cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: "/",
            maxAge: 60 * 60 * 2
        });
        return new Response(JSON.stringify({
            token: token,
        }), {headers: new Headers({"Content-Type": "application/json"}) });
    } catch (e) {
        const status = (e as HttpError).code || 500;
        const message = (e as HttpError).message || "Internal Server Error";

        console.log("erreur svelkit Server Side : "+e, )
        return new Response(JSON.stringify({ error: message }), {
            status,
            headers: { "Content-Type": "application/json" }
        });
    }
}