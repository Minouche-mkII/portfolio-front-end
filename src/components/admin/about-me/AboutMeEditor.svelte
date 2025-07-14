<script lang="ts">
    import ComputerDataEditor from "../ComputerDataEditor/ComputerDataEditor.svelte";
    import type {ComputerData} from "../../../types/dto/computer_data";
    import type {Detail} from "../../../types/dto/detail";
    import {onMount} from "svelte";
    import {getAboutMe} from "../../../services/api/about-me/about-me-service";

    let computerData : ComputerData = {
        _id: "",
        name: "",
        illustration_src: "",
        parent_folder: "",
        priority: 0,
        details_id: ""
    }

    let details: Detail[] | undefined = $state(undefined)
    let status = $state("loading")
    onMount(() => {
        getAboutMe().then((aboutMe) => {
            details = aboutMe
            status = ""
        }).catch(() => {
            status = "an error occurred"
        })
    })
</script>

{#if details}
    <ComputerDataEditor edit={true} aboutMe={true} {computerData} {details} />
{:else}
    <p>{status}</p>
{/if}