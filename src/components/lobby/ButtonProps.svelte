<script lang="ts">
    import { T } from "@threlte/core"
    import {Spring} from "svelte/motion";
    import {type ThrelteGltf, useGltf} from '@threlte/extras'
    import {onMount} from "svelte";
    import {
        Mesh,
        MeshStandardMaterial,
        MeshToonMaterial, NearestFilter, TextureLoader,
    } from "three";

    type Props = {
        position: [x: number, y: number, z: number],
        scale: number,
        modelPath: string
    }

    let {position, scale, modelPath} : Props = $props()

    const displayedScale = new Spring(scale, {
        stiffness: 0.1,
        damping: 0.28
    })

    let model: ThrelteGltf<{
        nodes: Record<string, any>
        materials: Record<string, any>
    }> | undefined = $state(undefined)

    onMount(() => {
        useGltf(modelPath).then((gltf) => {
            model = gltf
            model.scene.traverse((child) => {
                if((child as Mesh).isMesh) {
                    const mesh = child as Mesh
                    const oldMat = mesh.material as MeshStandardMaterial
                    const toonMat = new MeshToonMaterial({
                        color: oldMat.color,
                        map: oldMat.map,
                    });
                    mesh.material = toonMat
                }
            })
        })
    })

</script>

{#if model}
    <T.Mesh
        is={model.scene}
        scale={displayedScale.current}
        {position}
        onpointerenter={() => {
            displayedScale.target = 1.1*scale
        }}
        onpointerleave={() => {
            displayedScale.target = scale
        }}
    >
        <T.MeshStandardMaterial/>
    </T.Mesh>
{/if}