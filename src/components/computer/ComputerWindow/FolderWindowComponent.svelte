<script lang="ts">
    import ComputerWindowComponent from "./ComputerWindowComponent.svelte";

    type Props = {
        window: ComputerWindow
    }
    let {window}: Props = $props()
    const computerDataList = (window.data as FolderWindow).computerDataList
</script>

{#snippet folder()}
{/snippet}

<ComputerWindowComponent child={folder} {window}/>