<script lang="ts">
    import ComputerDataEditor from "../../../../components/admin/ComputerDataEditor/ComputerDataEditor.svelte";
    import type {Detail} from "../../../../types/dto/detail";

    let { data } = $props()
    const computerData =  data.computerData as ComputerData
    const details = data.detail as Detail[]
</script>

<ComputerDataEditor edit={true} {computerData} {details}/>