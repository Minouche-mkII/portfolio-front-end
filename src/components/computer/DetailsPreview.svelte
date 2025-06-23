
<script lang="ts">
    import type {FormatedCardDetail} from "../../types/business/computer/formated_detail";
    import {normalize, normalizeString} from "../../services/utils/normalizer";

    interface Props {
        name: string
        details: FormatedCardDetail[]
    }
    let { details, name }: Props = $props();

</script>

{#snippet createPart(part: FormatedCardDetail)}
    {#if part.type === "title"}
        <h2>{part.content}</h2>
    {:else if part.type === "paragraph"}
        <p>{@html part.content}</p>
    {:else if part.type === "image"}
        {@const src = normalizeString(part.content[0])}
        {@const alt = normalizeString(part.content[1])}
        <img {src} {alt}>
    {/if}
{/snippet}

<div class="container">
    <h1>{name}</h1>
    {#each details as part}
        {#if part.type === "row"}
            <div class="grid">
                {#each part.content as underPart}
                    {@render createPart(normalize<FormatedCardDetail>(underPart))}
                {/each}
             </div>
        {/if}
        {@render createPart(part)}
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(17rem, auto));
        justify-content: start;
        gap: 1rem;
    }
    img {
        width: 100%;
        border-radius: 10px;
    }
    p {
        margin-top: 0;
    }
</style>