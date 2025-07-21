<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from "./Scene.svelte";
    import {ACESFilmicToneMapping} from "three";
    import {setContext, tick} from "svelte";
    import type {MenuToolTipOperations} from "../../types/business/lobby/menuToolTip";
    import TutorialTipsPopUp from "../TutorialTipsPopUp.svelte";

    let menuToolTip = $state("")

    async function setToolTip(toolTip : string) {
        menuToolTip = ""
        await tick()
        menuToolTip = toolTip
    }

    function removeToolTip(toolTip: string) {
        if(toolTip === menuToolTip) {
            menuToolTip = ""
        }
    }

    const operations : MenuToolTipOperations = {setToolTip, removeToolTip}
    setContext("MenuToolTip", operations)
</script>

<div id="lobby">
    <Canvas
        shadows
        colorSpace="srgb"
        toneMapping={ACESFilmicToneMapping}
    >
        <Scene/>
    </Canvas>
    {#if menuToolTip !== ""}
        <div id="menu-tooltip">
            <p>{menuToolTip}</p>
        </div>
    {/if}
</div>

<TutorialTipsPopUp src="/tutorial-lobby.webp" prompt="Click and drag with the mouse to move the camera around" id="lobbyTutorial" />

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.2) ;
        }
        60% {
            transform: translate(-50%, -50%) scale(1.3) ;
        }
        to {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%);
        }
    }
    #lobby {
        display: block;
        height: 98vh;
        overflow: hidden;
    }
    #menu-tooltip {
        animation: fadeIn 0.2s ease;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    #menu-tooltip > p {
        font-size: 27px;
        text-shadow: #ff12b8 1px 1px 12px;
    }
</style>
