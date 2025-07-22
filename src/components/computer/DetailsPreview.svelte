
<script lang="ts">
    import type {FormatedCardDetail} from "../../types/business/computer/formated_detail";
    import {normalize, normalizeArrayString, normalizeString} from "../../services/utils/normalizer";
    import InternLinkComponent from "./Details/InternLinkComponent.svelte";
    import ImageBadgeComponent from "./Details/ImageBadgeComponent.svelte";

    interface Props {
        name: string
        details: FormatedCardDetail[]
    }
    let { details, name }: Props = $props();
</script>

{#snippet createPart(part: FormatedCardDetail)}
    {#if part.type === "title"}
        {@const style = "animation: typing 2s steps("+part.content.length+", end);"}
        <h2 style="{style}">{part.content}</h2>
    {:else if part.type === "paragraph"}
        <div class="paragraph-div">
            <p>{@html part.content}</p>
        </div>
    {:else if part.type === "image"}
        {@const src = normalizeString(part.content[0])}
        {@const alt = normalizeString(part.content[1])}
        <div class="image-div">
            <img {src} {alt}>
        </div>
    {:else if part.type === "intern-link"}
        <div>
            <InternLinkComponent props={normalizeArrayString(part.content)}/>
        </div>
    {:else if part.type === "extern-link"}
        <div>
            <div class="cool-link">
                <a target="_blank" rel="noopener noreferrer" href="{normalizeString(part.content[0])}">{normalizeString(part.content[1])}</a>
            </div>
        </div>
    {:else if part.type === "column"}
        <div>
            {#each part.content as underPart}
                {@render createPart(normalize<FormatedCardDetail>(underPart))}
            {/each}
        </div>
    {:else if part.type === "image-badge"}
        <ImageBadgeComponent content={normalizeArrayString(part.content)}/>
    {:else if part.type === "text-badge"}
        <p class="text-badge">{part.content}</p>
    {:else if part.type === "hr"}
        <hr />
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
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        gap: 1rem;
    }
    .grid > div {
        flex: 1 1 19em;
        min-width: 19em;
        max-width: 100%;
    }
    img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: 10px;
        object-fit: contain;
    }
    p {
        margin-top: 0;
    }
    .container {
        margin: 2em;
        max-width: 100em;
    }
    .text-badge{
        border-radius: 25px;
        border: solid 1px white;
        padding: 5px 15px 5px 15px;
        margin: 0 10px 1em 0;
        display: inline-block;
    }
    a {
        text-decoration: none;
        color: var(--font);
    }
    a:after {
        content: " \01F517";
    }
    @keyframes typing {
        from {
            width: 0;
            overflow: hidden;
            white-space: nowrap;
        }
        to { width: 100% }
    }
    .image-div {
        margin-bottom: 1em;
    }
</style>