<script lang="ts">
    import {getContext} from "svelte";
    import type {Clickable} from "../../types/business/computer/folder_type";
    import type {WindowOperation} from "../../types/business/computer/windows_operation";

    type Props = {
        files: Clickable[]
    }
    const { files } : Props = $props()

    const openWindow = (getContext("window-context") as WindowOperation).openWindow
</script>

<div class="folder">
    {#each files as file}
        <div class="computerFile" >
            <button onclick={() => openWindow(file.createdWindow)}>
                <img src="{file.src}" alt="{file.alt}"/>
                {file.name}
            </button>
        </div>
    {/each}
</div>

<style>
    .folder {
        display: flex;
    }
    button {
        height: 9em;
        width: 9em;
        margin: 1em;
        background: none;
        color: white;
        border: none;
    }
    button img {
        height: 80%;
        width: 80%;
    }
</style>