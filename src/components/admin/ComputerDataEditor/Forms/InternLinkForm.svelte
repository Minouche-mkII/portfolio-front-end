<script lang="ts">
    import {getAllComputerData} from "../../../../services/api/computer-data/get_computer_data_service";
    import {onMount} from "svelte";
    import type {ComputerData} from "../../../../types/dto/computer_data";
    import {splitImageContent} from "../../../../services/business/computer-data/card_details_interpretor_service";

    type Props = {content: string}
    let {content = $bindable()} : Props = $props()

    let computerDataPromise: Promise<ComputerData[]> | undefined = $state()
    onMount(() => {
        computerDataPromise = getAllComputerData()
    })

    const initialContent = splitImageContent(content)
    let data = $state(initialContent[1]+"<->"+initialContent[2])
    function setData(computerData : ComputerData) {
        data = computerData.name+"<->"+computerData.details_id
    }

    let text = $state(initialContent[0])

    $effect(() => {
        content = text+"<->"+data
    })
</script>

{#await computerDataPromise}
    <p aria-busy="true">loading</p>
{:then computerDataList}
    {#if computerDataList}
        <label>
            text:
            <input bind:value={text}/>
        </label>
        <select>
            {#each computerDataList as computerData}
                <option onclick={() => {setData(computerData)}}>
                    {computerData.name}
                </option>
            {/each}
        </select>
    {/if}
{:catch error}
    <p>an error occurred</p>
{/await}