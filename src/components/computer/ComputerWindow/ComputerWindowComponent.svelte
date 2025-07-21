<script lang="ts">
    import {getContext, onMount, type Snippet, tick} from "svelte";
    import type {ComputerWindow} from "../../../types/business/computer/WindowType";
    import type {WindowOperation} from "../../../types/business/computer/windows_operation";

    type Props = {
        child: Snippet,
        window: ComputerWindow,
        index: number
    }
    let {child, window: computerWindow = $bindable(), index}: Props = $props()

    const windowOperation = (getContext("window-context") as WindowOperation)
    function close(event: MouseEvent) {
        setTimeout(() => windowOperation.closeWindow(index), 200)
        animationClass = "quitAnimation"
    }

    let animationClass = $state("inAnimation")
    let style = $state("")
    let zIndex = $state(0)
    let cursorStyle = $state("auto")
    let resizableRight = false
    let resizableLeft = false
    let resizableTop = false
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
        const windowLengthEnd = computerWindow.x + computerWindow.width
        if(event.clientY - computerWindow.y > 8 && event.clientX < windowLengthEnd - 25) {
            windowOperation.setUserSelect(false)
            const target = event.target as HTMLElement
            offsetX = event.clientX - target.getBoundingClientRect().left;
            offsetY = event.clientY - target.getBoundingClientRect().top;
            window.addEventListener("mousemove", drag)
            window.addEventListener("mouseup", stopDragging)
        }
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
        if(resizableTop) {
            window.addEventListener("mousemove", resizeTop)
        }
        window.addEventListener("mouseup", stopResize)
    }

    function isResizable(event: MouseEvent) {
        const x = event.x - computerWindow.x
        const y = event.y - computerWindow.y
        resizableLeft = x < 12
        resizableRight = x > (computerWindow.width - 12)
        resizableTop = y < 8
        resizableBottom = y > (computerWindow.height - 12)
        let horizonalAxis = (resizableLeft ? "w" : (resizableRight ? "e" : ""))
        let verticalAxis = (resizableTop ? "n" : (resizableBottom ? "s" : ""))
        if (verticalAxis == "" && horizonalAxis == "") {
            cursorStyle = "auto"
        } else {
            cursorStyle = verticalAxis+horizonalAxis+"-resize"
        }
    }

    function setNotResizable() {
        cursorStyle = "auto"
    }

    function resizeRight(event: MouseEvent) {
        windowOperation.setUserSelect(false)
        computerWindow.width = event.x - computerWindow.x
    }

    function resizeLeft(event: MouseEvent) {
        windowOperation.setUserSelect(false)
        let difference = computerWindow.x - event.x
        computerWindow.width += difference
        computerWindow.x = event.x
    }

    function resizeBottom(event: MouseEvent) {
        windowOperation.setUserSelect(false)
        computerWindow.height = event.y - computerWindow.y
    }

    function resizeTop(event: MouseEvent) {
        windowOperation.setUserSelect(false)
        let difference = computerWindow.y - event.y
        computerWindow.height += difference + 5
        computerWindow.y = event.y - 5
    }

    function stopResize() {
        window.removeEventListener("mouseup", stopResize)
        window.removeEventListener("mousemove", resizeLeft)
        window.removeEventListener("mousemove", resizeRight)
        window.removeEventListener("mousemove", resizeBottom)
        window.removeEventListener("mousemove", resizeTop)
        windowOperation.setUserSelect(true)
    }

</script>

<div role = "tabpanel" tabindex="{index}" class="computer-window {animationClass}"
     {style} onmousedown={grabWindow} onmousemove={isResizable} onmouseup={setNotResizable}
>
    <div role="toolbar" tabindex="0" class="page-header" onmousedown={startDragging}>
        <p>{@html computerWindow.logo} {computerWindow.name}</p>
        <button onclick={close}>x</button>
    </div>
    <div class="window-content">
        {@render child()}
    </div>
</div>

<style>
    @keyframes windowArrive {
        from {
            transform: rotate(25deg) scale(0.1);
        }
        to {
            transform: rotate(0deg) scale(1);
        }
    }
    @keyframes windowQuit {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(1.2);
            opacity: 0.2;
        }
    }
    .computer-window.quitAnimation {
        pointer-events: none;
        animation: windowQuit 0.2s cubic-bezier(.34,-0.75,.79,.48) both;
    }
    .computer-window.inAnimation {
        animation: windowArrive cubic-bezier(.12,.65,.74,1.53) 0.2s;
    }
    .computer-window {
        border: white solid 2px;
        border-radius: 4px;
        position: fixed;
        background-color: var(--background);
        display: flex;
        flex-direction: column;
        box-shadow: 2px 2px 7px #818181;
    }
    .window-content {
        flex: 1;
        overflow: auto;
    }
    .page-header {
        border-bottom: white solid 2px;
        display: flex;
        height:2em;
    }
    .page-header button {
        border: none;
        background: none;
        color: white;
        height: auto;
        width: 2em;
        margin: 0 0 0 auto;
    }
    .page-header p {
        margin: 0 0 0 8px;
        font-size: 16px;
        align-self: center;
    }
    button:hover {
        background-color: var(--secondary);
    }
</style>