<script lang="ts">
    import type {PageDTO} from "../../../types/dto/page-dto";
    import GalleryPageComponent from "../../gallery/GalleryPage/GalleryPageComponent.svelte";
    import PageFormComponent from "./PageFormComponent.svelte";

    type Props = {
        page: PageDTO
    }
    let { page } : Props = $props()
    let edit = $state(false)
    let buttonPrompt = $derived(edit ? "fermer": "editer")

    function toggleForm() {
        edit = !edit
    }

</script>

<div class = "page-editor">
    <div class="page">
        <GalleryPageComponent {page}/>
    </div>
    <button onclick={toggleForm}>{buttonPrompt}</button>
    {#if edit}
        <PageFormComponent {page}/>
    {/if}
</div>

<style>
    .page {
        width: 40%;
        margin: 1em;
    }
    .page-editor {
        display: flex;
        margin: 1em;
    }
</style>