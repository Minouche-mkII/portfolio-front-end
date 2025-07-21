<script lang="ts">
    import { T } from "@threlte/core"
    import ButtonProps from "./ButtonProps.svelte";
    import { interactivity } from '@threlte/extras'
    import Camera from "./Camera.svelte";
    import type {ChangePage} from "../../types/business/lobby/PageOperation";
    import {PageType} from "../../types/business/page_type";
    import {getContext} from "svelte";
    import ElementProps from "./ElementProps.svelte";

    let changePage = getContext("changePageContext") as ChangePage

    interactivity()
</script>


<Camera />

<T.DirectionalLight
    color={0xffffff}
    position={[5, 10, 7]}
    intensity={2.3}
/>

<T.HemisphereLight
    skyColor={0xffffff}
    groundColor={0x202020}
    intensity={0.2}
/>
<T.AmbientLight intensity={0.3} />

<ButtonProps
    position={[0, 0, -2]}
    scale={9}
    modelPath="/models/desk.glb"
    onClick={() => changePage(PageType.computer)}
/>

<ButtonProps
    position={[-7, 0, -2]}
    scale={9}
    modelPath="/models/draw-table.glb"
    onClick={() => changePage(PageType.gallery)}
/>

<ButtonProps
    position={[5, 0, -2]}
    scale={9}
    modelPath="/models/polaroid.glb"
    onClick={() => changePage(PageType.aboutMe)}
/>

<ElementProps
    position={[-2, 0, 10]}
    scale={4}
    modelPath="/models/bed.glb"
    rotation={0}
/>

<ElementProps
    position={[10, 0, 0.5]}
    scale={3}
    modelPath="/models/music.glb"
    rotation={Math.PI/2}
/>
