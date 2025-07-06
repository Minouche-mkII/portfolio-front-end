<script lang="ts">
    import {getPage} from "../../services/business/computer-data/gallery-loader-service.svelte";
    import type {PageDTO} from "../../types/dto/page-dto";
    import GalleryPageComponent from "./GalleryPage/GalleryPageComponent.svelte";

    type Props = {
        pageList: string[],
        pageIndex: number
    }

    let { pageList, pageIndex } : Props = $props()

    let currentPage: PageDTO | undefined = $state(undefined)
    let errorLoadingPage = $state(false)
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


<div class="page">
    {#if errorLoadingPage}
        <p>An error occurred</p>
    {:else if currentPage}
        <GalleryPageComponent page={currentPage} />
    {/if}
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
</style>