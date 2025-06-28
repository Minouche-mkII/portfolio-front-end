<script lang="ts">
    type Props = { content: string[] }
    let { content } : Props = $props()
</script>

<div class="image-badge">
    <img src="{content[0]}" alt="{content[1]}"/>
    <span class="tooltip" role="tooltip">{content[1]}</span>
</div>

<style>
    .image-badge {
        border-radius: 13px;
        border: solid 1px white;
        background-color: #151313;
        display: flex;
        align-items: center;
        width: fit-content;
        position: relative;
        margin: 0 1em 1em 0;
        justify-self: left;
    }
    img {
        height: 40px;
        width: auto;
        padding: 8px;
        border-radius: 1em;
        margin: 0 auto;
    }
    .tooltip {
        padding: 5px;
        visibility: hidden;
        opacity: 0;
        width: max-content;
        background-color: #151313;
        border-radius: 6px;
        z-index: 100;
        bottom: 110%;
        position: absolute;
        transition: opacity 0.2s ease-in-out;
        pointer-events: none;
        left: 50%;
        transform: translateX(-50%);
    }

    .image-badge:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }
</style>