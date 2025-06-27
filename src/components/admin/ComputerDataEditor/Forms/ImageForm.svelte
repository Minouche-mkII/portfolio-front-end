<script lang="ts">
    import {uploadImage} from "../../../../services/api/files/images-service";
    import {splitImageContent} from "../../../../services/business/computer-data/card_details_interpretor_service";
    import ImagesList from "../../ImagesAdmin/ImagesList.svelte";
    import type {Image} from "../../../../types/dto/image_dto";

    type props = {
        content: string
    }
    let {content = $bindable()} : props = $props()
    let opened = $state(false)

    function selectImage (selectedImage: Image) {
        content = `${selectedImage.path}<->${selectedImage.alt}`
        opened = false
    }
</script>

<button onclick={() => opened = true}>Ouvrir formulaire image</button>

{#if opened}
    <div class="modal">
        <button onclick={() => {opened = false}}>fermer</button>
        <ImagesList onSelected = {selectImage}/>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 5%;
        left: 5%;
        width: 90%;
        height: 90%;
        background: #151313;
        padding: 2em;
        border : 5px solid white;
        border-radius: 15px;
    }
</style>