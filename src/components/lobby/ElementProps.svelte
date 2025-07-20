<script lang="ts">
    import type {ThrelteGltf} from "@threlte/extras";
    import { T } from "@threlte/core"
    import {onMount} from "svelte";
    import {loadAndConfigureModel} from "../../services/business/lobby/modelLoader";

    type Props = {
        position: [x: number, y: number, z: number],
        scale: number,
        modelPath: string,
    }

    let {position, scale, modelPath} : Props = $props()

    let model: ThrelteGltf<{
        nodes: Record<string, any>
        materials: Record<string, any>
    }> | undefined = $state(undefined)

    onMount(() => {
        loadAndConfigureModel(modelPath).then((mod) => {
            model = mod
        })
    })

</script>

{#if model}
    <T.Mesh
        is={model.scene}
        {scale}
        {position}
    >
    </T.Mesh>
{/if}
