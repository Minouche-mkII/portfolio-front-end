<script lang="ts">
    import ComputerDataEditor from "../../../../components/admin/ComputerDataEditor/ComputerDataEditor.svelte";

    let { data } = $props()
    console.log(data.computerData)
    console.log(data.detail)
</script>
