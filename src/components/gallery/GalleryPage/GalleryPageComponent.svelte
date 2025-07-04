<script lang="ts">
    import type {PageDTO} from "../../../types/dto/page-dto";
    import GalleryImageComponent from "./GalleryImageComponent.svelte";

    type Props = {
        page: PageDTO
    }
    let { page } : Props = $props()

</script>

<div class="galleryPage">
    {#each page.images as image (image)}
        <GalleryImageComponent {image}/>
    {/each}
</div>

<style>
    .galleryPage {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 1em;
    }
</style>