<script lang="ts">
    import { Canvas } from '@threlte/core'
    import Scene from "./Scene.svelte";
</script>

<div id="lobby">
    <Canvas>
        <Scene />
    </Canvas>
</div>

<style>
    #lobby {
        display: block;
        height: 95vh;
        overflow: hidden;
    }
</style>
