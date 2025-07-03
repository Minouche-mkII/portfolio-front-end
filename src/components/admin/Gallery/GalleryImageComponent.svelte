<script lang="ts">

    import type {GalleryImageDTO} from "../../../types/dto/page-dto";
    import {BACKEND_URL} from "$lib/config";

    type Props = {
        image: GalleryImageDTO
    }
    let { image } : Props = $props()
</script>

<button class="image-preview">
    <img src="{BACKEND_URL+image.src}" alt="{image.alt}">
</button>

<style>
    .image-preview {
        border: none;
        background: none;
    }
    img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
    }
</style>
