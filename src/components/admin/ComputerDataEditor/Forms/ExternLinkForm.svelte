<script lang="ts">
    type Props = { content: string }
    let { content = $bindable() } : Props = $props()
    let link = $state("")
    let description = $state("")
    $effect(() => {
        content = link + '<->' + description
    })
</script>

<label>
    Lien :
    <input bind:value={link}/>
</label>
<label>
    Description :
    <input bind:value={description}/>
</label>