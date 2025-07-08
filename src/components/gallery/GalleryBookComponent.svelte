<script lang="ts">
    import {getPage} from "../../services/business/computer-data/gallery-loader-service.svelte";
    import type {PageDTO} from "../../types/dto/page-dto";
    import GalleryPageComponent from "./GalleryPage/GalleryPageComponent.svelte";
    import {tick} from "svelte";

    type Props = {
        pageList: string[],
        pageIndex: number,
        fromDirection: string
    }

    let { pageList, pageIndex, fromDirection } : Props = $props()

    let currentPage: PageDTO | undefined = $state(undefined)
    let errorLoadingPage = $state(false)
    let previousPage: PageDTO | undefined | null = $state(undefined)
    let nextPage: PageDTO | undefined | null = $state(undefined)
    $effect(() => {
        if(pageList) {
            getPage(pageList[pageIndex]).then((page) => {
                currentPage = page
                errorLoadingPage = false
            }).catch((e) => {
                errorLoadingPage = true
            })
            if(fromDirection === "previous") {
                nextPage = {
                    _id: "",
                    images: []
                }
                animateNextPage()
                getPage(pageList[pageIndex+1]).then((page) => {
                    nextPage = page
                })
            } else {
                nextPage = null
            }
            if (fromDirection === "next") {
                previousPage = {
                    _id: "",
                    images: []
                }
                animatePreviousPage()
                getPage(pageList[pageIndex-1]).then((page) => {
                    previousPage = page
                })
            } else {
                previousPage = null
            }
        }
    })

    const pageBehindKeyFrame = {
        transform: "rotateY(-360deg)",
        zIndex: "-1"
    }

    const pageMidTransitionFrame = {
        transform: "translate(-100%) rotateY(-180deg)",
        zIndex: "-1"
    }

    const pageCurrentKeyFrame = {
        zIndex: "3"
    }

    const animParameters = {
        duration: 500,
        easing: "cubic-bezier(0.5, -0.3, 1, 1.3)"
    }

    async function animatePreviousPage() {
        await tick()
        const elementPreviousPage = document.getElementById("previous-page") as HTMLElement
        const animation = elementPreviousPage.animate(
            [
                pageCurrentKeyFrame,
                pageMidTransitionFrame,
                pageBehindKeyFrame
            ],
            animParameters
        )
        animation.finished.then(() => previousPage = null)
    }

    async function animateNextPage() {
        await tick()
        const elementCurrentPage = document.getElementById("current-page") as HTMLElement
        const animation = elementCurrentPage.animate(
            [
                pageBehindKeyFrame,
                pageMidTransitionFrame,
                pageCurrentKeyFrame
            ],
            animParameters
        )
        animation.finished.then(() => nextPage = null)
    }
</script>

{#if previousPage}
    <div class="page" id="previous-page">
        <GalleryPageComponent page={previousPage} />
    </div>
{/if}
<div class="page" id="current-page">
    {#if errorLoadingPage}
        <p>An error occurred</p>
    {:else if currentPage}
        <GalleryPageComponent page={currentPage} />
    {/if}
</div>
{#if nextPage}
    <div class="page" id="next-page">
        <GalleryPageComponent page={nextPage} />
    </div>
{/if}

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
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }
    .page:after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background-color: white;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        transform: rotateY(180deg);
        transform-style: preserve-3d;
    }
    #current-page {
        position: relative;
    }
    #previous-page {
        position: absolute;
        z-index: +1;
    }
    #next-page {
        position: absolute;
        z-index: -1;
    }
</style>