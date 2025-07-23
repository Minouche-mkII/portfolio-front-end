<script lang="ts">

    import {PageType} from "../types/business/page_type";
    import Computer from "./computer/Computer.svelte";
    import GalleryComponent from "./gallery/GalleryComponent.svelte";
    import AboutMe from "./about-me/AboutMe.svelte";
    import SocialComponent from "./social/SocialComponent.svelte";
    import Lobby from "./lobby/Lobby.svelte";
    import {onMount, setContext} from "svelte";
    import SeizureWarning from "./SeizureWarning.svelte";
    import BackButton from "../BackButton.svelte";

    let currentPage = $state(PageType.seizureWarning)

    function escape(ev: KeyboardEvent) {
        if(ev.key === "Escape") {
            currentPage = PageType.lobby
        }
    }

    function changePage(page: PageType) {
        currentPage = page
    }

    setContext("changePageContext", changePage)

    function blockOneBack() {
        history.pushState({ page: 1 }, '', window.location.href);
    }

    onMount(() => {
        window.addEventListener('popstate', function (event) {
            currentPage = PageType.lobby
        });
    })

    $effect(() => {
        if(currentPage !== PageType.lobby && currentPage !== PageType.seizureWarning) {
            blockOneBack()
        }
    })

</script>

{#if currentPage === PageType.lobby}
    <Lobby />
{:else if currentPage === PageType.computer}
    <Computer />
{:else if currentPage === PageType.gallery}
    <GalleryComponent />
{:else if currentPage === PageType.aboutMe}
    <AboutMe />
{:else if currentPage === PageType.social}
    <SocialComponent />
{:else if currentPage === PageType.seizureWarning}
    <SeizureWarning />
{/if}

{#if currentPage !== PageType.lobby && currentPage !== PageType.seizureWarning}
    <BackButton top={currentPage !== PageType.computer} onclick={() => currentPage = PageType.lobby} />
{/if}

<svelte:window onkeyup={escape} />
