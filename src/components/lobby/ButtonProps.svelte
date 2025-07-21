<script lang="ts">
    import { T } from "@threlte/core"
    import {Spring} from "svelte/motion";
    import {type ThrelteGltf} from '@threlte/extras'
    import {getContext, onMount} from "svelte";
    import {loadAndConfigureModel} from "../../services/business/lobby/modelLoader";
    import type {MenuToolTipOperations} from "../../types/business/lobby/menuToolTip";

    type Props = {
        position: [x: number, y: number, z: number],
        scale: number,
        modelPath: string,
        onClick: () => void,
        toolTipPrompt: string
    }

    const toolTip = getContext("MenuToolTip") as MenuToolTipOperations

    let {position, scale, modelPath, onClick, toolTipPrompt} : Props = $props()

    const displayedScale = new Spring(scale, {
        stiffness: 0.1,
        damping: 0.28
    })

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
        onclick={onClick}
        is={model.scene}
        scale={displayedScale.current}
        {position}
        onpointerenter={() => {
            displayedScale.target = 1.1*scale
            toolTip.setToolTip(toolTipPrompt)
        }}
        onpointerleave={() => {
            displayedScale.target = scale
            toolTip.removeToolTip(toolTipPrompt)
        }}
    >
    </T.Mesh>
{/if}