<script lang="ts">

    import {getPage, getPageList} from "../../services/business/gallery/gallery-loader-service.svelte.js";
    import type {GalleryImageDTO, PageDTO} from "../../types/dto/page-dto";
    import {onMount, setContext} from "svelte";
    import GalleryPageComponent from "./GalleryPage/GalleryPageComponent.svelte";
    import type {ImageOrigin} from "../../types/business/gallery/image_origin_type";
    import ImageCardComponent from "./GalleryPage/ImageCardComponent.svelte";
    import GalleryBookComponent from "./GalleryBookComponent.svelte";
    import EscapeTip from "../EscapeTip.svelte";

    let pageList: string[] | undefined = $state()
    let pageIndex = $state(-1)

    let errorLoadingIds = $state(false)
    onMount(() => {
        getPageList().then((pagesId) => {
            pageList = pagesId
        }).catch((e) => {
            errorLoadingIds = true
        })
    })

    let modal = $state(false)
    let modalImage : GalleryImageDTO = $state({
        src: "",
        alt: "",
        horizontal_span:0,
        vertical_span:0,
        note:""
    })
    let modalOrigin : ImageOrigin = $state({
        x: 0,
        y: 0,
        mouseX: 0,
        mouseY: 0,
        baseWidth: 0,
        baseHeight: 0,
        naturalWidth: 0,
        naturalHeight: 0
    })
    let closeModalCallBack = () => {}

    function openModal(origin: ImageOrigin, image: GalleryImageDTO, closeCallBack: () => void) {
        modalOrigin = origin
        modalImage = image
        closeModalCallBack = closeCallBack
        modal = true
    }

    function closeModal() {
        modal = false
        closeModalCallBack()
    }

    let rightButtonDisabled = $derived(pageList ? (pageIndex > pageList.length - 2): true)
    let leftButtonDisabled = $derived(pageIndex <= -1)

    setContext("modal-card", openModal)

    let fromDirection = $state("")

    function nextPage() {
        fromDirection = "next"
        pageIndex++
    }

    function previousPage() {
        fromDirection = "previous"
        pageIndex--
    }
</script>

{#if modal}
    <ImageCardComponent origin={modalOrigin} image={modalImage} onRemove={closeModal}/>
{/if}

<div id="gallery">
    {#if errorLoadingIds}
        <p>An error occurred</p>
    {:else if pageList}
        <div class="book">
            <GalleryBookComponent {pageList} {pageIndex} {fromDirection} />
            {@render buttonDiv()}
        </div>
    {:else}
        <p>loading</p>
    {/if}
</div>


<EscapeTip />

{#snippet buttonDiv()}
    <div id="buttons-div">
        <button id="left-button" onclick={previousPage} disabled={leftButtonDisabled}>&#x3C;&#x3C;</button>
        <button id="right-button" onclick={nextPage} disabled={rightButtonDisabled}>&#x3E;&#x3E;</button>
    </div>
{/snippet}
<style>
    .book {
        display: flex;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #gallery {
        height: 95vh;
        display: flex;
        vertical-align: center;
    }
    button {
        background-color: transparent;
        width: 3em;
        border: var(--font) solid 3px;
        color: var(--font);
        font-size: 20px;
        transition: 0.2s ease;
        height: 50%;
        margin: auto 2em auto 2em;
    }
    button:disabled {
        color: gray;
        border-color: gray;
    }
    button:hover:enabled {
        width: 4em;
        margin: auto 1.5em auto 1.5em;
    }
    #left-button:hover:enabled {
        border-radius: 1em 3em 6px 6px;
    }
    #right-button:hover:enabled {
        border-radius: 6px 6px 1em 3em;
    }
    #left-button {
        border-radius: 1em 3em 0 0;
    }
    #right-button {
        border-radius: 0 0 1em 3em;
    }
</style>