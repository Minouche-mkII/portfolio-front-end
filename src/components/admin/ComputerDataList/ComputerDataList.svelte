<script lang="ts">
    import {
        getComputerDataAsFolders
    } from "../../../services/api/computer-data/get_computer_data_service.js";
    import {onMount} from "svelte";
    import ComputerDataArticle from "./ComputerDataArticle.svelte";

    let promise: Promise<Map<string, ComputerDataInFolder[]>>;
    onMount(() => {
        promise = getComputerDataAsFolders()
    })

    function typeSafe(list? : ComputerDataInFolder[]) : ComputerDataInFolder[] {
        return list == undefined ? [] : list;
    }
</script>

<section class="container">
    <h1>Page admin</h1>
    <a href="/admin/new-computer-data">nouveau</a>
    {#await promise}
        <p aria-busy="true">loading</p>
    {:then computerDataList}
        {#if computerDataList}
            {#each computerDataList.keys() as folder}
                <h2>{folder}</h2>
                <div class="grid">
                    {#each typeSafe(computerDataList.get(folder)) as computerData}
                        <ComputerDataArticle {computerData} />
                    {/each}
                </div>
            {/each}
        {/if}
    {:catch error}
        <p>Error loading data</p>
    {/await}
</section>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(17rem, auto));
        justify-content: start;
        gap: 1rem;
    }
</style>