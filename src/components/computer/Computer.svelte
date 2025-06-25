<script lang="ts">
    import {onMount, setContext} from "svelte";
    import ComputerDesktop from "./ComputerDesktop.svelte";
    import FolderWindowComponent from "./ComputerWindow/FolderWindowComponent.svelte";
    import DetailWindowComponent from "./ComputerWindow/DetailWindowComponent.svelte";
    import {getComputerContext} from "../../services/business/computer-data/persistant_computer_service.svelte";
    import type {ComputerContext} from "../../types/business/computer/computer_context";
    import {type InitWindow, WindowType} from "../../types/business/computer/WindowType";

    let computerContext: ComputerContext = $state({openedWindows: [], computerData: new Map([])})
    let error = $state(false)
    let loading = $state(true)
    let lastId = 0
    let style = $state("")
    let userSelect = "all"
    onMount(() => {
        getComputerContext().then((context) => {
            computerContext = context
            loading = false
        }).catch((error) => {
            loading = false
            error = true
        })
    })

    $effect(() => {
        style = `user-select: ${userSelect};`
    })

    function openWindow(newWindow: InitWindow) {
        let width = 600, height = 300;
        if(newWindow.type === WindowType.Detail) {
            width = 1100
            height = 600
        }
        const x = window.innerWidth/2-width/2
        const y =  window.innerHeight/2-height/2
        computerContext.openedWindows.push({
            id: lastId,
            x: x,
            y: y,
            height: height,
            width: width,
            type: newWindow.type,
            data: newWindow.data,
        })
        lastId += 1
    }

    function closeWindow(index: number) {
        computerContext.openedWindows.splice(index, 1)
    }

    function getMaxZIndex () {
        let maxZIndex = 0
        const computer = document.getElementById("computer") as HTMLElement
        for(let component of computer.children) {
            let zIndex = (component as HTMLElement).style.zIndex
            let nzIndex = zIndex ? Number(zIndex) : 0
            if(nzIndex > maxZIndex) {
                maxZIndex = nzIndex
            }
        }
        return maxZIndex
    }

    function setUserSelect(canUserSelect: boolean) {
        userSelect = canUserSelect ? "all" : "none"
    }
    setContext("window-context", {
        openWindow: openWindow, closeWindow: closeWindow, getMaxZIndex: getMaxZIndex, setUserSelect: setUserSelect})
</script>

<div id="computer" role="tablist" {style}>
    {#if loading}
        <p aria-busy="true">loading</p>
    {:else if error}
        <p>An error occurred</p>
    {:else}
        <ComputerDesktop computerData={computerContext.computerData}/>
        {#each computerContext.openedWindows as window, index (window.id)}
            {#if window.type === WindowType.Folder}
                <FolderWindowComponent {window} {index}/>
            {:else if window.type === WindowType.Detail}
                <DetailWindowComponent {window} {index}/>
            {/if}
        {/each}
    {/if}
</div>

