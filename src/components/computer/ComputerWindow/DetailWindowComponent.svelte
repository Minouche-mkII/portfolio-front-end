<script lang="ts">
    import ComputerWindowComponent from "./ComputerWindowComponent.svelte";
    import DetailsPreview from "../DetailsPreview.svelte";
    import {getDetails} from "../../../services/business/computer-data/details_loader_service";

    type Props = {
        window: ComputerWindow
    }
    let {window}: Props = $props()
    const computerData = (window.data as DetailWindow).computerData
    const detailsPromise = getDetails(computerData.detailsId)
    const name = computerData.name
</script>

{#snippet detailsPreviewRender()}
    {#await detailsPromise}
        <p aria-busy="true">Loading ...</p>
    {:then details}
        <DetailsPreview {name} {details}/>
    {:catch error}
        <p>An error occurred</p>
    {/await}
{/snippet}

<ComputerWindowComponent child={detailsPreviewRender} {window}/>