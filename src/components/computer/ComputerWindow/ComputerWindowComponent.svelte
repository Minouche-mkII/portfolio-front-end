<script lang="ts">
    import {getContext, onMount, type Snippet} from "svelte";
    import type {ComputerWindow} from "../../../types/business/computer/WindowType";
    import type {WindowOperation} from "../../../types/business/computer/windows_operation";

    type Props = {
        child: Snippet,
        window: ComputerWindow,
        index: number
    }
    let {child, window: computerWindow = $bindable(), index}: Props = $props()

    const windowOperation = (getContext("window-context") as WindowOperation)
    function close() {
        windowOperation.closeWindow(index)
    }

    let style = $state("")
    let zIndex = $state(0)
    let cursorStyle = $state("auto")
    let resizableRight = false
    let resizableLeft = false
    let resizableBottom = false
    $effect(() => {
        style = `left: ${computerWindow.x}px; top: ${computerWindow.y}px;`+
            `width: ${computerWindow.width}px; height: ${computerWindow.height}px;`+
            `z-index: ${zIndex}; cursor: ${cursorStyle};`
    })

    onMount(() => setOnTop())

    let offsetX = 0
    let offsetY = 0

    function startDragging(event: MouseEvent) {
        windowOperation.setUserSelect(false)
        const target = event.target as HTMLElement
        offsetX = event.clientX - target.getBoundingClientRect().left;
        offsetY = event.clientY - target.getBoundingClientRect().top;
        window.addEventListener("mousemove", drag)
        window.addEventListener("mouseup", stopDragging)
    }

    function stopDragging() {
        windowOperation.setUserSelect(true)
        window.removeEventListener("mousemove", drag)
        window.removeEventListener("mouseup", stopDragging)
    }

    function drag(event: MouseEvent) {
        computerWindow.x = event.x - offsetX
        computerWindow.y = event.y - offsetY
        if(computerWindow.y < 0) {
            computerWindow.y = 0
        }
    }

    function setOnTop() {
        zIndex = windowOperation.getMaxZIndex()+1
    }

    function grabWindow(event: MouseEvent) {
        setOnTop()
        if(resizableRight) {
            window.addEventListener("mousemove", resizeRight)
        }
        if(resizableLeft) {
            window.addEventListener("mousemove", resizeLeft)
        }
        if(resizableBottom) {
            window.addEventListener("mousemove", resizeBottom)
        }
        window.addEventListener("mouseup", stopResize)
    }

    function isResizable(event: MouseEvent) {
        const x = event.x - computerWindow.x
        const y = event.y - computerWindow.y
        resizableLeft = x < 12
        resizableRight = x > (computerWindow.width - 12)
        resizableBottom = y > (computerWindow.height - 12)
        if(resizableBottom) {
            if(resizableRight) {
                cursorStyle = "se-resize"
            } else if (resizableLeft) {
                cursorStyle = "sw-resize"
            } else {
                cursorStyle = "s-resize"
            }
        } else if (resizableRight) {
            cursorStyle = "e-resize"
        } else if (resizableLeft) {
            cursorStyle = "w-resize"
        } else {
            cursorStyle = "auto"
        }
    }

    function setNotResizable() {
        cursorStyle = "auto"
    }

    function resizeRight(event: MouseEvent) {
        computerWindow.width = event.x - computerWindow.x
    }

    function resizeLeft(event: MouseEvent) {
        let difference = computerWindow.x - event.x
        computerWindow.width += difference
        computerWindow.x = event.x
    }

    function resizeBottom(event: MouseEvent) {
        computerWindow.height = event.y - computerWindow.y
    }

    function stopResize() {
        window.removeEventListener("mouseup", stopResize)
        window.removeEventListener("mousemove", resizeLeft)
        window.removeEventListener("mousemove", resizeRight)
        window.removeEventListener("mousemove", resizeBottom)
    }

</script>

<div role = "tabpanel" tabindex="{index}" class="computer-window"
     {style} onmousedown={grabWindow} onmousemove={isResizable} onmouseleave={setNotResizable}
>
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