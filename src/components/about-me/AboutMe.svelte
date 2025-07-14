<script lang="ts">
    import DetailsPreview from "../computer/DetailsPreview.svelte";
    import type {FormatedCardDetail} from "../../types/business/computer/formated_detail";
    import {onMount} from "svelte";
    import {getAboutMePage} from "../../services/business/about-me/about-me-loader-service";

    let aboutMePage : FormatedCardDetail[] | undefined = $state(undefined)
    let status : null | string = $state("loading ...")
    onMount(() => {
        getAboutMePage().then((page) => {
            status = null
            aboutMePage = page
        }).catch(() => {
            status = "an error occurred"
        })
    })
</script>

<div id="aboutMePage">
    {#if status}
        <p>{status}</p>
    {:else if aboutMePage}
        <DetailsPreview name={"About me"} details={aboutMePage}/>
   {/if}
</div>

<style>
    #aboutMePage {
        max-width: 60em;
        margin: auto;
    }
</style>