<script lang="ts">
    import {BACKEND_URL} from "$lib/config";
    import {splitImageContent} from "../../../services/business/computer-data/card_details_interpretor_service.js";
    type Props = {
        computerData: ComputerDataInFolder
    }
    const {computerData}: Props = $props()

    let hovered = $state(false)
    const imageData = splitImageContent(computerData.illustration_src)
    const src = BACKEND_URL+imageData[0]
    const alt = imageData[1]
</script>

    <a href="/admin/edit-computer-data/{computerData._id}"
       onmouseenter = {() => hovered = true}
       onmouseleave = {() => hovered = false}
       class="{hovered ? 'hovered': ''}">
        <img {src} {alt}/>
        <p>{computerData.name}</p>
    </a>

<style>
     a img {
         max-height: 75%;
         max-width: 100%;
         border-radius: 6%;
         margin: 6pt;
    }
     p {
         margin: 0 2pt 2pt 5pt;
     }
    a {
        text-align: center;
        border: 2px solid white;
        height: 13rem;
        width: 15rem;
        border-radius: 7%;
        color: lightgray;
    }
    .hovered {
        background-color: white;
    }
</style>