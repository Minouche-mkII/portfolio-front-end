<script lang="ts">
    import {onMount} from "svelte";
    import ComputerDesktop from "./ComputerDesktop.svelte";
    import FolderWindowComponent from "./ComputerWindow/FolderWindowComponent.svelte";
    import DetailWindowComponent from "./ComputerWindow/DetailWindowComponent.svelte";
    import {getComputerContext} from "../../services/business/computer-data/persistant_computer_service.svelte";
    import type {ComputerContext} from "../../types/business/computer/computer_context";

    let computerContext: ComputerContext = $state({openedWindows: [], computerData: new Map([])})
    let error = $state(false)
    let loading = $state(true)
    onMount(() => {
        getComputerContext().then((context) => {
            computerContext = context
            loading = false
        }).catch((error) => {
            loading = false
            error = true
        })
    })

    function openWindow(window: ComputerWindow) {
        computerContext.openedWindows.push(window)
    }

    function closeWindow() {

    }

</script>

<div id="computer">
    {#if loading}
        <p aria-busy="true">loading</p>
    {:else if error}
        <p>An error occurred</p>
    {:else}
        <ComputerDesktop computerData={computerContext.computerData} {openWindow}/>
        {#each computerContext.openedWindows as window}
            {#if window.type === WindowType.Folder }
                <FolderWindowComponent {window}/>
            {:else if window.type === WindowType.Detail }
                <DetailWindowComponent {window}/>
            {/if}
        {/each}
    {/if}
</div>

