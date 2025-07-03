<script lang="ts">

    import type {PageDTO} from "../../../types/dto/page-dto";
    import {getAllPages} from "../../../services/api/gallery/get-pages-service";
    import {onMount} from "svelte";
    import PageEditorComponent from "./PageEditorComponent.svelte";

    let pages: PageDTO[] = $state([])
    let error = $state("")
    function loadData() {
        getAllPages().then((result) => {
            pages = result
        }).catch((e) => {
            error = "error loading data"
        console.log(error)
        })
    }

    onMount(() => {
        loadData()
    })

    function addPage() {
        pages.unshift({
            _id: "",
            images: []
        })
    }

</script>

<h1>gallerie</h1>
<section>
    {#if error}
        <p>An error occurred loading data</p>
    {:else}
        <button onclick={addPage}>Nouvelle page</button>
        {#each pages as page}
            <PageEditorComponent { page } />
        {/each}
    {/if}
</section>

