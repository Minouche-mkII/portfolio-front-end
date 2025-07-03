<script lang="ts">
    import type {Detail} from "../../../../types/dto/detail";
    import ImageForm from "./ImageForm.svelte";
    import InternLinkForm from "./InternLinkForm.svelte";
    import ExternLinkForm from "./ExternLinkForm.svelte";

    type Props = {
        detail: Detail
    }
    let {detail = $bindable()}: Props = $props()

</script>

<select bind:value={detail.type}>
    <option value="title">titre</option>
    <option value="paragraph">paragraphe</option>
    <option value="image">image</option>
    <option value="image-badge">badge image</option>
    <option value="text-badge">badge textuel</option>
    <option value="intern-link">lien interne</option>
    <option value="extern-link">lien externe</option>
    <option value="row">ligne</option>
    <option value="column">colonne</option>
    <option value="hr" onclick={() => detail.content = ""}>séparateur</option>
</select>
{#if detail.type === "row"}
    <input bind:value={detail.content}>
{:else if detail.type ==="image"}
    <ImageForm onSelected={(newPath, newAlt) => {
        detail.content = `${newPath}<->${newAlt}`
    }}/>
{:else if detail.type === "paragraph"}
    <textarea bind:value={detail.content}></textarea>
{:else if detail.type === "title"}
    <input bind:value={detail.content}>
{:else if detail.type === "intern-link"}
    <InternLinkForm bind:content={detail.content}/>
{:else if detail.type === "extern-link"}
    <ExternLinkForm bind:content={detail.content}/>
{:else if detail.type === "column"}
    <input bind:value={detail.content} />
{:else if detail.type === "image-badge"}
    <ImageForm onSelected={(newPath, newAlt) => {
        detail.content = `${newPath}<->${newAlt}`
    }}/>
{:else if detail.type === "text-badge"}
    <input bind:value={detail.content}>
{/if}