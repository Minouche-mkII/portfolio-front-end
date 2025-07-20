<script lang="ts">

    import {PageType} from "../types/business/page_type";
    import Computer from "./computer/Computer.svelte";
    import GalleryComponent from "./gallery/GalleryComponent.svelte";
    import AboutMe from "./about-me/AboutMe.svelte";
    import SocialComponent from "./social/SocialComponent.svelte";
    import Lobby from "./lobby/Lobby.svelte";
    import {setContext} from "svelte";

    let currentPage = $state(PageType.lobby)

    function escape(ev: KeyboardEvent) {
        if(ev.key === "Escape") {
            currentPage = PageType.lobby
        }
    }

    function changePage(page: PageType) {
        currentPage = page
    }

    setContext("changePageContext", changePage)

    let warning = $state(true)

    function closeWarning() {
        warning = false
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

{#if warning}
    <div id="photosensible-warning">
        <h1>⚠️ Warning : photosensitive epilepsy</h1>
        <p> This portfolio contains bright visual effects, high contrast, and rapid animations that may trigger seizures in individuals with photosensitive epilepsy. Please proceed with caution.</p>
        <button onclick={closeWarning}>Got it !</button>
    </div>
{/if}

<svelte:window onkeyup={escape} />


<style>
    #photosensible-warning {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        padding: 1em;
        border-radius: 15px;
    }
    #photosensible-warning button:hover {
        transform: scale(1.2);
    }
    #photosensible-warning button {
        transition-duration: 0.2s;
        font-size: 2em;
        background-color: var(--secondary);
        color: var(--font);
        border: white solid 1px;
        border-radius: 1em;
        padding: 5px 9px 5px 9px;
        margin: auto;
        display: block;
    }
</style>




