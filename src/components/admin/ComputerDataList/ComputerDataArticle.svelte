<script lang="ts">
    import {BACKEND_URL} from "$lib/config";
    type Props = {
        computerData: ComputerDataInFolder
    }
    const {computerData}: Props = $props()

    let hovered = $state(false)
</script>

<article
        onmouseenter = {() => hovered = true}
        onmouseleave = {() => hovered = false}
        class="{hovered ? 'hovered': ''}"
>
    <a href="/admin/edit-computer-data/{computerData._id}">
        <img src="{BACKEND_URL+computerData.illustration_src}" alt="illustration of {computerData.name}"/>
        <p>{computerData.name}</p>
    </a>
</article>

<style>
     article img {
        height: 90%;
        border-radius: 5%;
    }
    article {
        text-align: center;
        border: 2px solid white;
        height: 13rem;
        width: 15rem;
    }
    .hovered {
        background-color: white;
    }
</style>