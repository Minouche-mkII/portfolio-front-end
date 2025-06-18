
<script lang="ts">
    let { details, name } = $props();

    function splitImageContent(content: string) {
        return content.split("||")
    }

    function formatParagraphContent(p : string) {
        let regex = "/\\{\\{\\$\\s*(.*?)\\s*\\}\\}/g"
        // text between {{$ ... }}
        return p.replace(regex, applyFormat)
    }

    function applyFormat(match: string, content: string) {
        return ""
    }
</script>

<div class="container">
    <h1>{name}</h1>
    {#each details as part}
        {#if part.type === "title"}
            <h2>{part.content}</h2>
        {:else if part.type === "paragraph"}
            <p>{part.content}</p>
        {:else if part.type === "image"}
            {@const intermediateStrings = splitImageContent(part.content)}
            <img src="{intermediateStrings[0]}" alt="{intermediateStrings[1]}">
        {/if}
    {/each}
</div>