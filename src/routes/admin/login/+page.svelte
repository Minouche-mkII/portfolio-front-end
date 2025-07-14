<script lang="ts">
    import {tryAuth} from "../../../services/api/auth/auth_service.js";
    import {HttpError} from "../../../services/utils/http_error";
    import {goto} from "$app/navigation";

    let password = $state("")

    let error = $state("")
    async function login() {
        try {
            await tryAuth(password)
            await goto("/admin")
        } catch (e) {
            console.log(e)
            if ((e as HttpError).code === 401) {
                error = "Mot de passe invalide"
            } else {
                error = "Une erreur est survenue"
            }
        }
    }
</script>

<form>
    {#if error !== ""}
        <p>{error}</p>
    {/if}
    <label>
        Mot de passe :
        <input type="password" bind:value={password}/>
    </label>
    <input type="submit" value="se connecter" onclick={login}>
</form>
