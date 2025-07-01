import {isAuthenticated} from "../../services/api/server-side/server-side-auth-service";
import {redirect} from "@sveltejs/kit";

export async function load({cookies}) {
    const authenticated = await isAuthenticated(cookies.get("token"))
    if (!authenticated) {
        throw redirect(303, '/admin/login')
    }
}