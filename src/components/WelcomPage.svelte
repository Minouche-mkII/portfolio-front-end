<script lang="ts">

    import {PageType} from "../types/business/page_type";
    import Computer from "./computer/Computer.svelte";
    import GalleryComponent from "./gallery/GalleryComponent.svelte";

    let currentPage = $state(PageType.lobby)

</script>

{#if currentPage === PageType.lobby}
    <button onclick={() => currentPage = PageType.computer}>computer</button>
    <button onclick={() => currentPage = PageType.gallery}>gallery</button>
{:else if currentPage === PageType.computer}
    <Computer />
{:else if currentPage === PageType.gallery}
    <GalleryComponent />
{/if}


