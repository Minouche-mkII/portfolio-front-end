<script lang="ts">
    import {onMount} from "svelte";
    import {logOut} from "../../../services/api/auth/auth_service";
    import {goto} from "$app/navigation";

    let error = $state("")

    onMount(() => {
        logOut().then(() => {
            goto("/admin/login")
        }).catch(() => {
            error = "an error occurred"
        })
    })
</script>

{#if error !== ""}
    <p>{error}</p>
{/if}