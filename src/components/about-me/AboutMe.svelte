<script lang="ts">
    import DetailsPreview from "../computer/DetailsPreview.svelte";
    import type {FormatedCardDetail} from "../../types/business/computer/formated_detail";
    import {onMount} from "svelte";
    import {getAboutMePage} from "../../services/business/about-me/about-me-loader-service";
    import EscapeTip from "../EscapeTip.svelte";

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
    <div id="flashEffect" ></div>
    {#if status}
        <p>{status}</p>
    {:else if aboutMePage}
        <DetailsPreview name={"About me"} details={aboutMePage}/>
   {/if}
</div>

<EscapeTip />

<style>
    #aboutMePage {
        max-width: 60em;
        margin: auto;
    }
    @keyframes flash {
        0% {
            opacity: 0;
        }
        3% {
            opacity: 1;
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    #flashEffect {
        pointer-events: none;
        animation: flash 2s ease-in;
        opacity: 0;
        position: fixed;
        background: radial-gradient(circle, rgba(215, 200, 180, 1) 0%, rgba(220, 200, 180, 0.7) 80%, rgba(220, 200, 180, 0) 100%);
        z-index: 1000;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter: saturate(0.6) blur(1px);
    }
</style>