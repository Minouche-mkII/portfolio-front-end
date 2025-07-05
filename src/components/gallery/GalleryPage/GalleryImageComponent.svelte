<script lang="ts">

    import type {GalleryImageDTO} from "../../../types/dto/page-dto";
    import {BACKEND_URL} from "$lib/config";
    import ImageCardComponent from "./ImageCardComponent.svelte";

    type Props = {
        image: GalleryImageDTO,
    }
    let { image } : Props = $props()
    let style = $derived(`grid-column: span ${image.horizontal_span}; grid-row: span ${image.vertical_span};`)
    let imgRatio = $derived(`aspect-ratio:${image.horizontal_span} / ${image.vertical_span} ;`)
    let origin = $state({
        x: 0,
        y: 0,
        mouseX: 0,
        mouseY: 0,
        baseWidth: 0,
        baseHeight: 0,
        naturalWidth: 0,
        naturalHeight: 0
    })

    let modal = $state(false)
    function openModal(event: MouseEvent) {
        const coordinates = (event.currentTarget as HTMLElement).getBoundingClientRect()
        const image = (event.currentTarget as HTMLElement).querySelector("img") as HTMLImageElement
        origin = {
            x: coordinates.x,
            y: coordinates.y,
            mouseX: event.clientX,
            mouseY: event.clientY,
            baseWidth: coordinates.width,
            baseHeight: coordinates.height,
            naturalHeight: image.naturalHeight,
            naturalWidth: image.naturalWidth
        }
        modal = true
    }

    function closeModal() {
        modal = false
    }
</script>

<div role="button" class="image-preview" {style} tabindex="0" onclick={openModal}>
    <img style="{imgRatio}" src="{BACKEND_URL+image.src}" alt="{image.alt}" class="{modal ? 'hide': ''}">
</div>

{#if modal}
    <ImageCardComponent {origin} {image} onRemove={closeModal}/>
{/if}

<style>
    .image-preview {
        margin: 7px;
        cursor: pointer;
        user-select: none;
        transition: 0.5s ease;
    }
    .image-preview:hover {
        transform: scale(1.15);
        box-shadow: 0 0 5em 1em rgba(0, 0, 0, 1);
    }
    img {
        width: 100%;
        height: 100%;
    }
    .hide {
        opacity: 0;
    }
</style>
