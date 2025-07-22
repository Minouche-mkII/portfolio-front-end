<script lang="ts">
    import {splitImageContent} from "../../../../services/business/computer-data/card_details_interpretor_service";

    type Props = { content: string }
    let { content = $bindable() } : Props = $props()
    let splitContent = splitImageContent(content)
    let link = $state(splitContent[0])
    let description = $state(splitContent[1])
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