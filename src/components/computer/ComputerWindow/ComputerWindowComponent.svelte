<script lang="ts">
    import {getContext, type Snippet} from "svelte";
    import type {ComputerWindow} from "../../../types/business/computer/WindowType";
    import type {WindowOperation} from "../../../types/business/computer/windows_operation";
    import type {MouseEventHandler} from "svelte/elements";

    type Props = {
        child: Snippet,
        window: ComputerWindow,
        index: number
    }
    let {child, window: computerWindow = $bindable(), index}: Props = $props()

    const closeWindow = (getContext("window-context") as WindowOperation).closeWindow
    function close() {
        closeWindow(index)
    }

    let style = $state("")
    $effect(() => {
        style = `left: ${computerWindow.x}px; top: ${computerWindow.y}px;`+
            `width: ${computerWindow.width}px; height: ${computerWindow.height}px;`
    })

    let offsetX = 0

    function startDragging(event: MouseEvent) {
        const target = event.target as HTMLElement
        offsetX = event.clientX - target.getBoundingClientRect().left;
        window.addEventListener("mousemove", drag)
        window.addEventListener("mouseup", stopDragging)
    }

    function stopDragging() {
        window.removeEventListener("mousemove", drag)
        window.removeEventListener("mouseup", stopDragging)
    }

    function drag(event: MouseEvent) {
        computerWindow.x = event.x - offsetX
        computerWindow.y = event.y
    }

</script>

<div class="computer-window" {style}>
    <div role="toolbar" tabindex="0" class="page-header" onmousedown={startDragging}>
        <button onclick={close}>x</button>
    </div>
    <div class="window-content">
        {@render child()}
    </div>
</div>

<style>
    .computer-window {
        border: white solid 2px;
        border-radius: 4px;
        position: fixed;
        background-color: #151313;
        display: flex;
        flex-direction: column;
    }
    .window-content {
        flex: 1;
        overflow: auto;
    }
    .page-header {
        border-bottom: white solid 2px;
        display: flex;
        justify-content: flex-end;
    }
</style>