<script lang="ts">
    import {Spring} from "svelte/motion";
    import {PerspectiveCamera} from "three";

    import { T } from "@threlte/core"
    import {tick} from "svelte";
    import {getLastCameraPos, setLastCameraPos} from "../../services/business/lobby/camerapos";

    const CAM_DISTANCE = 13

    let targetRotation = new Spring(getLastCameraPos())
    let cameraX = $state(Math.cos(targetRotation.current)*CAM_DISTANCE)
    let cameraY = $state(Math.sin(targetRotation.current)*CAM_DISTANCE)

    let cameraRef: PerspectiveCamera = new PerspectiveCamera()

    let startX = 0;
    let dragging = false;

    function onMouseDown(event: MouseEvent) {
        startX = event.clientX;
        dragging = true;
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp() {
        dragging = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(event: MouseEvent) {
        if (!dragging) return;

        const dx = event.clientX - startX;

        if (Math.abs(dx) > 50) { // seuil de glissement
            if (dx > 0) {
                goRight()
            } else {
                goLeft()
            }
            dragging = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }

    function goRight() {
        targetRotation.target += 1
        setLastCameraPos(targetRotation.target)
    }

    function goLeft() {
        targetRotation.target -= 1
        setLastCameraPos(targetRotation.target)
    }

    $effect(() => {
        cameraX = Math.cos(Math.PI/4*targetRotation.current)*CAM_DISTANCE
        cameraY = Math.sin(Math.PI/4*targetRotation.current)*CAM_DISTANCE
        updateLook()
    })

    async function updateLook() {
        await tick()
        cameraRef.lookAt(0, 0, 0)
    }

</script>

<T.PerspectiveCamera
        makeDefault
        position={[cameraX, 14, cameraY]}
        oncreate={(ref) => {
        cameraRef = ref
        updateLook()
    }}
/>


<svelte:window onmousedown={onMouseDown} />
