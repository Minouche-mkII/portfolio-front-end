<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from "./Scene.svelte";
    import {ACESFilmicToneMapping} from "three";
</script>

<div id="lobby">
    <Canvas
        colorSpace="srgb"
        toneMapping={ACESFilmicToneMapping}
    >
        <Scene/>
    </Canvas>
</div>

<style>
    #lobby {
        display: block;
        height: 95vh;
        overflow: hidden;
    }
</style>
