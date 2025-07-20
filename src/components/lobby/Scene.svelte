<script lang="ts">
    import { T } from "@threlte/core"
    import ButtonProps from "./ButtonProps.svelte";
    import { interactivity } from '@threlte/extras'
    import Camera from "./Camera.svelte";
    import type {ChangePage} from "../../types/business/lobby/PageOperation";
    import {PageType} from "../../types/business/page_type";
    import {getContext} from "svelte";

    let changePage = getContext("changePageContext")

    interactivity()
</script>


<Camera />

<T.DirectionalLight
    color={0xffffff}
    position={[5, 10, 7]}
    intensity={2.3}
/>

<T.HemisphereLight
    skyColor={0xffffe0}
    groundColor={0x202020}
    intensity={0.2}
/>
<T.AmbientLight intensity={0.3} />
<ButtonProps
        position={[0, 0, 0]}
         scale={9}
         modelPath="/models/desk/desk.glb"
         onClick={() => changePage(PageType.computer)}
/>




