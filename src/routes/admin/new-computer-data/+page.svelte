<script lang="ts">
    import ComputerDataEditor from "../../../components/admin/ComputerDataEditor/ComputerDataEditor.svelte";
    import type {Detail} from "../../../types/dto/detail";

    const computerData : ComputerData = {
        _id: null,
        name: "",
        illustration_src: "<->",
        parent_folder: "",
        priority: 0,
        details_id: "",
    }
    const details : Detail[] = []
</script>

<ComputerDataEditor edit={false} {computerData} {details}/>
