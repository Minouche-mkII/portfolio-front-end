<script lang="ts">

    import type {PageDTO} from "../../../types/dto/page-dto";
    import ImageForm from "../ComputerDataEditor/Forms/ImageForm.svelte";
    import {deletePage, newPage, updatePage} from "../../../services/api/gallery/edit-gallery-service";

    type Props = {
        page: PageDTO,
    }
    let { page } : Props = $props()
    let submitStatus: string | undefined = $state()

    function addImage() {
        page.images.push({
            src: "",
            alt: "",
            horizontal_span: 1,
            vertical_span: 1,
            note: ""
        })
    }

    function submit() {
        // si la page n'existe pas dans la base de données
        if (page._id === "") {
            newPage(page.images).then((id) => {
                page._id = id
                submitStatus = "success"
            }).catch((e) => {
                console.log(e)
                submitStatus = "error"
            })
        } else {
            updatePage(page).then(() => {
                submitStatus = "success"
            }).catch((e) => {
                console.log(e)
                submitStatus = "error"
            })
        }
    }

    function deleteThisPage() {
        if(window.confirm("Etes-vous sur ? Cette operation est irreversible")) {
            deletePage(page._id).then(() => {
                window.location.reload()
            }).catch((e) => {
                console.log(e)
                submitStatus = "error"
            })
        }
    }
</script>

<div class="page-form">
    {#each page.images as image, index (image)}
        <div class="gallery-image-form">
            <ImageForm onSelected={(newPath, newAlt) => {
                image.src = newPath
                image.alt = newAlt
            }}/>
            <label>
                Horizontal span :
                <input type="number" bind:value={image.horizontal_span}/>
            </label>
            <label>
                Vertical span :
                <input type="number" bind:value={image.vertical_span}/>
            </label>
            <button onclick={() => page.images.splice(index, 1)}>supprimer</button>
        </div>
    {/each}
    <div class="editorbuttons">
        <button onclick={addImage}>ajouterImage</button>
        <button onclick={submit}>soumettre</button>
        {#if page._id !== ""}
            <button onclick={deleteThisPage}>supprimer cette page</button>
        {/if}
        {#if submitStatus}
            <p>{submitStatus}</p>
        {/if}
    </div>
</div>

<style>
    .gallery-image-form {
        margin: 1em;
    }
    .editorbuttons {
        margin-left: 1em;
    }
</style>