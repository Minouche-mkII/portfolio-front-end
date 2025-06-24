<script lang="ts">
    import {getContext} from "svelte";
    import type {Clickable} from "../../../types/business/computer/folder_type";
    import type {WindowOperation} from "../../../types/business/computer/windows_operation";
    import FileComponent from "./FileComponent.svelte";

    type Props = {
        files: Clickable[]
    }
    const { files } : Props = $props()

    const openWindow = (getContext("window-context") as WindowOperation).openWindow
</script>

<div class="folder">
    {#each files as file}
        <FileComponent {file} openWindow={ () => openWindow(file.createdWindow) } />
    {/each}
</div>

<style>
    .folder {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(2em, auto));
        justify-content: start;
    }
</style>