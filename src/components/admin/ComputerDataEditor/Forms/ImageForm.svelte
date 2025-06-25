<script lang="ts">
    import {uploadFile} from "../../../../services/api/files/files-service";
    import {splitImageContent} from "../../../../services/business/computer-data/card_details_interpretor_service";

    type props = {
        content: string
    }
    let {content = $bindable()} : props = $props()
    const imageData = splitImageContent(content)
    let filePath = $state(imageData[0])
    let alt = $state(imageData[1])
    $effect(() => {
        content = `${filePath}<->${alt}`
    })

    function sendFile(event: Event) {
        if(!event) {
            return
        }
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0]
        if(!file) {
            return
        }
        uploadFile(file).then((path) => {
            filePath = path
        })
    }
</script>

<input type="file" accept="image/png, image/jpg, image/webp" onchange={sendFile} />
<input bind:value={alt}/>