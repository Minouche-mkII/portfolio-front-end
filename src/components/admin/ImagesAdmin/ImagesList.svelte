<script lang="ts">
    import {deleteImage, getAllImages, uploadImage} from "../../../services/api/files/images-service";
    import type {Image} from "../../../types/dto/image_dto";
    import {BACKEND_URL} from "$lib/config";
    import {onMount} from "svelte";

    type Props = { onSelected: (image: Image) => void }
    let { onSelected }: Props = $props()

    let search = $state("")
    let alt = $state("")

    let imagesList: Image[] | undefined = $state()
    let selectedImage: Image | null = $state(null)
    let error = $state(false)
    let operationText = $state("")

    onMount(() => {
        loadImageList()
    })

    async function loadImageList() {
        try {
            imagesList = await getAllImages()
        } catch(err) {
            error = true
            console.log(err)
        }
    }

    function sendFile() {
        const input = document.getElementById("file-upload") as HTMLInputElement;
        const file = input.files?.[0]
        if(!file) {
            return
        }
        uploadImage(file, alt).then((path) => {
            operationText = "success"
            loadImageList().then(() => {
                autoSelectImage(path, alt)
            })
        }).catch((err) => {
            console.log(err)
            operationText = "error"
        })
    }

    function autoSelectImage(path: string, alt: string) {
        search = alt
        if(imagesList) {
            console.log(JSON.stringify(imagesList, null, 2))
            console.log(path)
            selectedImage = imagesList.filter((img) => img.path === path)[0]
        }
    }

    function confirmSelect() {
        if(selectedImage) {
            onSelected(selectedImage)
        } else {
            alert("veuillez selectionner une image")
        }
    }

    function deleteSelect() {
        if(selectedImage) {
            if(window.confirm("êtes vous sûr de vouloir supprimer cette image ? cette opération est irreversible"))
            deleteImage(selectedImage._id).then(() => {
                operationText = "success"
                loadImageList()
            }).catch((err) => {
                console.log(err)
                operationText = "error"
            })
        }
    }

    let displayedImage : Image[] | null = $state(null)
    $effect(() => {
        if(!imagesList) {
            displayedImage = null
            return
        }
        displayedImage = imagesList.filter((image) => image.alt.toLowerCase().includes(search.toLowerCase()))
    })
</script>

<section id="ImagesAdmin">
    <div id="newImageForm">
        <input id="file-upload" type="file" accept="image/png, image/jpg, image/webp" />
        <label>
            alt :
            <input bind:value={alt}/>
        </label>
        <button onclick={sendFile}>Envoyer</button>
    </div>
    <label>
        recherche :
        <input bind:value={search}/>
    </label>
    <button onclick={confirmSelect}>séléctionner</button>
    <button onclick={deleteSelect}>supprimer</button>
    <p>{operationText}</p>
    <div id="listImages">
        {#if displayedImage}
            {#each displayedImage as currentImage (currentImage._id)}
                <button onclick={() => selectedImage = currentImage}
                class="{selectedImage?._id === currentImage._id? 'selected': ''} imgButton">
                    <img src="{BACKEND_URL+currentImage.path}" alt="{alt}">
                    {currentImage.alt}
                </button>
            {/each}
        {:else if error}
            <p>error</p>
        {:else}
            <p>loading</p>
        {/if}
    </div>

</section>

<style>
    .selected {
        background: orange;
    }
    .imgButton {
        height: 17em;
        width: 17em;
        border: 2px white solid;
        border-radius: 4px;
        margin: 1em;
    }
    .imgButton img {
        height: 15em;
        width: 15em;
    }
</style>
