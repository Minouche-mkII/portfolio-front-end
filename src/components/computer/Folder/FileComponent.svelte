<script lang="ts">
    import type {Clickable} from "../../../types/business/computer/folder_type";
    type Props = { file: Clickable, openWindow: () => void }
    const { file, openWindow} : Props = $props()
</script>
<div class="computerFile" >
    <button onclick={openWindow}>
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
        color: var(--font);
        border: none;
        border-radius: 5%;
    }
    button img {
        height: 80%;
        width: 80%;
    }
    button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>