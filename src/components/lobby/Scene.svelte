<script lang="ts">
    import { T } from "@threlte/core"
    import ButtonProps from "./ButtonProps.svelte";
    import { interactivity } from '@threlte/extras'
    import Camera from "./Camera.svelte";


    interactivity()
</script>


<Camera />

<T.DirectionalLight
        color={0xffffff}
        position={[5, 10, 7]}
        intensity={2}
        castShadow
/>

<T.HemisphereLight
        skyColor={0xffffe0}
        groundColor={0x202020}
        intensity={0.5}
/>
<T.AmbientLight intensity={0.3} />
<ButtonProps position={[0, 0, 0]} scale={9} modelPath="/models/desk/desk.glb"/>




