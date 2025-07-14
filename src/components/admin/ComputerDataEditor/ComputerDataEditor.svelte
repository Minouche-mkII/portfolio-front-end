<script lang="ts">
    import DetailsPreview from "../../computer/DetailsPreview.svelte";
    import type {Detail} from "../../../types/dto/detail";
    import {interpretCardDetails} from "../../../services/business/computer-data/card_details_interpretor_service";
    import ComputerDataEditorForm from "./ComputerDataEditorForm.svelte";
    import type {ComputerData} from "../../../types/dto/computer_data";

    type Props =  {
        edit: boolean,
        aboutMe: boolean,
        computerData: ComputerData,
        details: Detail[]
    }
    const props: Props = $props()
    let computerData = $state(props.computerData)
    let details = $state(props.details)
    let formatedDetails = $derived(interpretCardDetails(details))
    let aboutMe = props.aboutMe
</script>

<div class="editor">
    <div>
        <DetailsPreview name={computerData.name} details={formatedDetails}/>
    </div>
    <div>
        <ComputerDataEditorForm edit={props.edit} {aboutMe} bind:computerData={computerData} bind:details={details}/>
    </div>
</div>

<style>
   .editor {
       display: flex;
   }
   .editor div {
       flex: 1;
   }
</style>