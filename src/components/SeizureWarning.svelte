<script lang="ts">
    import {getContext} from "svelte";
    import type {ChangePage} from "../types/business/lobby/PageOperation";
    import {PageType} from "../types/business/page_type";

    const changePage = getContext("changePageContext") as ChangePage
    function understood() {
        changePage(PageType.lobby)
    }
</script>

<div id="photosensible-warning">
    <h1>⚠️ Warning : photosensitive epilepsy</h1>
    <p> This portfolio contains bright visual effects, high contrast, and rapid animations that may trigger seizures in individuals with photosensitive epilepsy. Please proceed with caution.</p>
    <button onclick={understood}>Got it !</button>
</div>

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