<script lang="ts">
    import type {Detail} from "../../../../types/dto/detail";
    import ImageForm from "./ImageForm.svelte";
    import InternLinkForm from "./InternLinkForm.svelte";

    type Props = {
        detail: Detail
    }
    let {detail = $bindable()}: Props = $props()

</script>

<select bind:value={detail.type}>
    <option value="title">titre</option>
    <option value="paragraph">paragraphe</option>
    <option value="image">image</option>
    <option value="intern-link">lien interne</option>
    <option value="row">ligne</option>
    <option value="column">colonne</option>
    <option value="image-badge">badge image</option>
    <option value="hr" onclick={() => detail.content = ""}>séparateur</option>
</select>
{#if detail.type === "row"}
    <input bind:value={detail.content}>
{:else if detail.type ==="image"}
    <ImageForm bind:content={detail.content}/>
{:else if detail.type === "paragraph"}
    <textarea bind:value={detail.content}></textarea>
{:else if detail.type === "title"}
    <input bind:value={detail.content}>
{:else if detail.type === "intern-link"}
    <InternLinkForm bind:content={detail.content}/>
{:else if detail.type === "column"}
    <input bind:value={detail.content} />
{:else if detail.type === "image-badge"}
    <ImageForm bind:content={detail.content}/>
{/if}