<script lang="ts">
    import {getContext} from "svelte";
    import type {WindowOperation} from "../../../types/business/computer/windows_operation";
    import {WindowType} from "../../../types/business/computer/WindowType";

    type Props = { props: string[] }
    const {props} : Props = $props()
    const text = props[0]
    const computerData = {
        _id: "",
        name: props[1],
        illustration_src: "",
        details_id: props[2]
    }
    const windowOperation : WindowOperation = getContext("window-context")

    function openDetail() {
        windowOperation.openWindow({
            type: WindowType.Detail,
            logo: "&#128196",
            name: computerData.name,
            data: {
                computerData: computerData
            }
        })
    }
</script>

<button onclick={openDetail}>
    {text}
</button>