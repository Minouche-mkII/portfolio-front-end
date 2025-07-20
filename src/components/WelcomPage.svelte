<script lang="ts">

    import {PageType} from "../types/business/page_type";
    import Computer from "./computer/Computer.svelte";
    import GalleryComponent from "./gallery/GalleryComponent.svelte";
    import AboutMe from "./about-me/AboutMe.svelte";
    import SocialComponent from "./social/SocialComponent.svelte";
    import Lobby from "./lobby/Lobby.svelte";

    let currentPage = $state(PageType.lobby)

    function escape(ev: KeyboardEvent) {
        if(ev.key === "Escape") {
            currentPage = PageType.lobby
        }
    }

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
{/if}

<svelte:window onkeyup={escape} />





