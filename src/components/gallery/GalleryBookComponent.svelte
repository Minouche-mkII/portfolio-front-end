<script lang="ts">
    import {getPage} from "../../services/business/gallery/gallery-loader-service.svelte.js";
    import type {PageDTO} from "../../types/dto/page-dto";
    import GalleryPageComponent from "./GalleryPage/GalleryPageComponent.svelte";
    import {tick} from "svelte";

    const pageAnimDuration = 500

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
            if(pageIndex != -1) {
                getPage(pageList[pageIndex]).then((page) => {
                    currentPage = page
                    errorLoadingPage = false
                }).catch((e) => {
                    errorLoadingPage = true
                })
            }
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
                if(pageIndex != 0) {
                    getPage(pageList[pageIndex - 1]).then((page) => {
                        previousPage = page
                    })
                }
                animatePreviousPage()
            } else {
                previousPage = null
            }
        }
    })

    const animParameters = {
        duration: pageAnimDuration,
        easing: "cubic-bezier(0.5, -0.3, 1, 1.3)"
    }

    const coveredPageKeyFrame = {
        transform : "translate(8%) scale(0.9) "
    }

    const showedPageKeyFrame = {
        transform : "translate(0) scale(1) "
    }

    const keyframes = [
        {
            zIndex: "3"
        },
        {
            transform: "translate(-100%) rotateY(-180deg)",
            zIndex: "-1"
        },
        {
            transform: "rotateY(-360deg)",
            zIndex: "-1"
        }
    ]

    const spiralKeyFrames = [

        {
            transform: "translate(-50%)"
        },
        {
            transform: "translate(-42%)"
        },
        {
            transform: "translate(-50%)"
        }
    ]

    async function animatePreviousPage() {
        await tick()
        const elementPreviousPage = document.getElementById("previous-page") as HTMLElement
        const elementCurrentPage = document.getElementById("current-page") as HTMLElement
        const spiralElement = document.getElementById("spirals") as HTMLElement
        const animation = elementPreviousPage.animate(
            keyframes,
            animParameters
        )
        elementCurrentPage.animate(
            [
                coveredPageKeyFrame,
                showedPageKeyFrame
            ],
            {
                duration: pageAnimDuration,
                easing: "ease"
            }
        )
        spiralElement.animate(
            spiralKeyFrames,
            {
                duration: pageAnimDuration,
                easing: "ease"
            }
        )
        animation.finished.then(() => previousPage = null)
    }

    async function animateNextPage() {
        await tick()
        const elementCurrentPage = document.getElementById("current-page") as HTMLElement
        const elementNextPage = document.getElementById("next-page") as HTMLElement
        const spiralElement = document.getElementById("spirals") as HTMLElement
        elementCurrentPage.style.visibility = "hidden"
        const animation = elementCurrentPage.animate(
            keyframes,
            animParameters
        )
        elementNextPage.animate(
            [
                showedPageKeyFrame,
                coveredPageKeyFrame
            ],
            {
                duration: pageAnimDuration,
                easing: "cubic-bezier(.19,-0.61,.92,.74)"
            }
        )
        spiralElement.animate(
            spiralKeyFrames,
            {
                duration: pageAnimDuration,
                easing: "cubic-bezier(.19,-0.61,.92,.74)"
            }
        )
        animation.reverse()
        setTimeout(() => {
            elementCurrentPage.style.visibility = "visible"
        }, 150)
        animation.finished.then(() => nextPage = null)
    }
</script>

<div id="backgroundPage" class="page">
</div>

{#if nextPage}
    <div class="page" id="next-page">
        <GalleryPageComponent page={nextPage} />
    </div>
{/if}
{#if previousPage}
    {#if pageIndex === 0}
        <div class="page cover" id="previous-page">
            <h1>Gallery</h1>
            <img src="/galleryCover.webp" alt="gallery book cover" />
        </div>
    {:else}
        <div class="page" id="previous-page">
            <GalleryPageComponent page={previousPage} />
        </div>
    {/if}
{/if}
{#if pageIndex === -1}
    <div class="cover page" id="current-page">
        <h1>Gallery</h1>
        <img src="/galleryCover.webp" alt="gallery book cover" />
    </div>
{:else}
    <div class="page" id="current-page">
        {#if errorLoadingPage}
            <p>An error occurred</p>
        {:else if currentPage}
            <GalleryPageComponent page={currentPage} />
        {/if}
    </div>
{/if}


<div id="spirals">
    {#each { length: 8 } as _ }
        <img class="spiral" alt="decorative book spiral" src="/spiral.webp" />
    {/each}
</div>

<style>
    .page {
        background-color: #ededed;
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
        background-color: #ededed;
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
    .page.cover {
        background-color: var(--primary);
        color: white;
        text-align: center;
    }
    .page.cover > h1 {
        font-size: 60px;
        margin: 2% 0 0 0;
    }
    .page.cover > img {
        max-width: 100%;
        margin: auto;
    }
    #backgroundPage {
        position: absolute;
        left: 2%;
        z-index: -10;
    }
    #spirals {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transform: translate(-50%);
        height: 90vh;
        user-select: none;
    }
    #spirals img {
        z-index: 20;
    }
</style>