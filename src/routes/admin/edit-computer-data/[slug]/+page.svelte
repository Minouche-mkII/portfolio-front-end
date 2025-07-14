<script lang="ts">
    import ComputerDataEditor from "../../../../components/admin/ComputerDataEditor/ComputerDataEditor.svelte";
    import type {Detail} from "../../../../types/dto/detail";
    import type {ComputerData} from "../../../../types/dto/computer_data";

    let { data } = $props()
    const computerData =  data.computerData as ComputerData
    const details = data.detail as Detail[]
</script>

<ComputerDataEditor edit={true} aboutMe={false} {computerData} {details}/>