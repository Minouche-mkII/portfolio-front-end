<script lang="ts">

    import {getPage, getPageList} from "../../services/business/computer-data/gallery-loader-service.svelte";
    import type {PageDTO} from "../../types/dto/page-dto";
    import {onMount} from "svelte";
    import GalleryPageComponent from "./GalleryPage/GalleryPageComponent.svelte";

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
</script>

<div id="gallery">
    <div class="book">
        {#if errorLoadingIds}
            <p>An error occurred</p>
        {:else if pageList}
            {#if pageIndex > 0}
                <button id="left-button" onclick={() => pageIndex--}>&#x3C;&#x3C;</button>
            {/if}
                <div class="page">
                    {#if errorLoadingPage}
                        <p>An error occurred</p>
                    {:else if currentPage}
                        <GalleryPageComponent page={currentPage} />
                    {/if}
                </div>
            {#if pageIndex < pageList.length - 1}
                <button id="right-button" onclick={() => pageIndex++}>&#x3E;&#x3E;</button>
            {/if}
        {:else}
            <p>loading</p>
        {/if}
    </div>
</div>
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
        height: 30vh;
        margin: auto 2em auto 2em;
    }
    button:hover {
        transform: scale(1.4, 1);
    }
    #left-button {
        border-radius: 50% 10px 10px 50%;
    }
    #right-button {
        border-radius: 10px 50% 50% 10px;
    }
</style>