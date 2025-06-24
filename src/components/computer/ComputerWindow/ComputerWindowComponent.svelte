<script lang="ts">
    import {getContext, type Snippet} from "svelte";
    import type {ComputerWindow} from "../../../types/business/computer/WindowType";
    import type {WindowOperation} from "../../../types/business/computer/windows_operation";

    type Props = {
        child: Snippet,
        window: ComputerWindow,
        index: number
    }
    let {child, window, index}: Props = $props()

    const closeWindow = (getContext("window-context") as WindowOperation).closeWindow
    function close() {
        closeWindow(index)
    }
</script>

<div class="computer-window">
    <div class="page-header">
        <button onclick={() => closeWindow(index)}>x</button>
    </div>
    <div class="window-content">
        {@render child()}
    </div>
</div>

<style>
    .computer-window {
        border: white solid 2px;
        border-radius: 4px;
        position: absolute;
    }
    .page-header {
        border-bottom: white solid 2px;
        display: flex;
        justify-content: flex-end;
    }
</style>