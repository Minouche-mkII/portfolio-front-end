<script lang="ts">
    import {Spring} from "svelte/motion";
    import {PerspectiveCamera} from "three";

    import { T } from "@threlte/core"
    import {tick} from "svelte";

    const CAM_DISTANCE = 15

    let targetRotation = 3
    let currentRotation = 3
    let cameraX = $state(Math.cos(currentRotation)*CAM_DISTANCE)
    let cameraY = $state(Math.sin(currentRotation)*CAM_DISTANCE)

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
            animate()
            dragging = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }

    function goRight() {
        targetRotation += 1
    }

    function goLeft() {
        targetRotation -= 1
    }

    async function updateCamera() {
        cameraX = Math.cos(Math.PI/4*currentRotation)*CAM_DISTANCE
        cameraY = Math.sin(Math.PI/4*currentRotation)*CAM_DISTANCE
        await tick()
        cameraRef.lookAt(0, 0, 0)
    }

    function animate() {
        const difference = currentRotation - targetRotation
        if(difference < 0) {
            currentRotation += 0.1
        } else {
            currentRotation -= 0.1
        }
        updateCamera()
        if(!(Math.abs(difference) < 0.2)) {
            setTimeout(() => {
                animate()
            }, 15)
        } else {
            currentRotation = targetRotation
        }
    }
</script>

<T.PerspectiveCamera
        makeDefault
        position={[cameraX, 12, cameraY]}
        oncreate={(ref) => {
        cameraRef = ref
        updateCamera()
    }}
/>


<svelte:window onmousedown={onMouseDown} />
