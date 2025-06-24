<script lang="ts">
    import type {Clickable} from "../../../types/business/computer/folder_type";
    type Props = { file: Clickable, openWindow: () => void }
    const { file, openWindow} : Props = $props()

    let hovered = $state(false)
</script>
<div class="computerFile" >
    <button onclick={openWindow}
        onmouseenter={() => hovered = true}
        onmouseleave={() => hovered = false}
        class="{hovered ? 'hovered': ''}"
    >
        <img src="{file.src}" alt="{file.alt}"/>
        {file.name}
    </button>
</div>

<style>
    button {
        height: 9em;
        width: 9em;
        margin: 1em;
        padding: 2px;
        background: none;
        color: white;
        border: none;
        border-radius: 5%;
    }
    button img {
        height: 80%;
        width: 80%;
    }
    .hovered {
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>