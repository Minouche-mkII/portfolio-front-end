<script lang="ts">

    import {getPage, getPageList} from "../../services/business/computer-data/gallery-loader-service.svelte";
    import type {GalleryImageDTO, PageDTO} from "../../types/dto/page-dto";
    import {onMount, setContext} from "svelte";
    import GalleryPageComponent from "./GalleryPage/GalleryPageComponent.svelte";
    import type {ImageOrigin} from "../../types/business/gallery/image_origin_type";
    import ImageCardComponent from "./GalleryPage/ImageCardComponent.svelte";

    let pageList: string[] | undefined = $state()
    let pageIndex = $state(0)
    let currentPage: PageDTO | undefined = $state(undefined)

    let errorLoadingIds = $state(false)
    let errorLoadingPage = $state(false)
    onMount(() => {
        getPageList().then((pagesId) => {
            pageList = pagesId
        }).catch((e) => {
            errorLoadingIds = true
        })
    })
    $effect(() => {
        if(pageList) {
            getPage(pageList[pageIndex]).then((page) => {
                currentPage = page
                errorLoadingPage = false
            }).catch((e) => {
                errorLoadingPage = true
            })
        }
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
    let leftButtonDisabled = $derived(pageIndex <= 0)

    setContext("modal-card", openModal)
</script>

{#if modal}
    <ImageCardComponent origin={modalOrigin} image={modalImage} onRemove={closeModal}/>
{/if}

<div id="gallery">
    {#if errorLoadingIds}
        <p>An error occurred</p>
    {:else if pageList}
        <div class="book">
            <div class="page">
                {#if errorLoadingPage}
                    <p>An error occurred</p>
                {:else if currentPage}
                    <GalleryPageComponent page={currentPage} />
                {/if}
            </div>
            {@render buttonDiv()}
        </div>
    {:else}
        <p>loading</p>
    {/if}
</div>

{#snippet buttonDiv()}
    <div id="buttons-div">
        <button id="right-button" onclick={() => pageIndex++} disabled={rightButtonDisabled}>&#x3E;&#x3E;</button>
        <button id="left-button" onclick={() => pageIndex--} disabled={leftButtonDisabled}>&#x3C;&#x3C;</button>
    </div>
{/snippet}
<style>
    .page {
        background-color: white;
        border-radius: 0 15px 15px 0;
        aspect-ratio: 1 / 1;
        height: 90vh;
        margin: 0 auto;
        padding-bottom: 1em;
        padding-left: 2em;
        box-shadow:  0 0 3em 2em rgba(0, 0, 0, 1);
    }
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
        border: white solid 3px;
        color: white;
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
        transform: scale(1.4, 1);
    }
    #left-button {
        border-radius: 0 0 1em 3em;
    }
    #right-button {
        border-radius: 1em 3em 0 0;
    }
</style>