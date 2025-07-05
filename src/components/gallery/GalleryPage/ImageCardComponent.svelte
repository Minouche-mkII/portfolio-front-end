<script lang="ts">
    import type {GalleryImageDTO} from "../../../types/dto/page-dto";
    import {BACKEND_URL} from "$lib/config";

    type Props = {
        image: GalleryImageDTO
        onRemove: () => void
    }
    let {image, onRemove} : Props = $props()

    let flipped = $state(false)
    function flip() {
        flipped = !flipped
    }

    function remove(event: MouseEvent){
        if(event.target === event.currentTarget) {
            onRemove()
        }
    }

    let rotateX = $state(0)
    let rotateY = $state(0)
    let brightness = $state(1)

    function mouseEffect(event: MouseEvent) {
        const card = event.currentTarget as HTMLElement
        const coordinates = card.getBoundingClientRect()
        const factorX = coordinates.width / 2
        const factorY = coordinates.height / 2
        const x = event.clientX - coordinates.x - factorX
        const y = event.clientY - coordinates.y - factorY
        rotateX = (x / factorX)
        rotateY = - (y / factorY)
        brightness = ( rotateY ) / 4 + 1
    }

    function mouseLeave() {
        rotateX = 0
        rotateY = 0
        brightness = 1
    }

    let cardStyle = $derived(`transform: rotateX(${rotateY*20}deg) rotateY(${rotateX*20}deg); filter: brightness(${brightness})`)

</script>

<div class="background" tabindex="0" role="button" onclick={remove} >
    <div class="collide-card" onmousemove={mouseEffect} onmouseleave={mouseLeave}>
        <div class="card" style="{cardStyle}" onclick={flip}>
            <div class="inner-card {flipped ? 'flipped' : ''}">
                <img src="{BACKEND_URL+image.src}" alt="{image.alt}">
                <div class="card-back">
                    <p>{image.note}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .background {
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .collide-card {
        position: fixed;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        z-index: 1001;
        perspective: 1200px;
    }
    .card {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        cursor: pointer;
    }
    .inner-card {
        transition: transform 0.6s;
        transform-style: preserve-3d;
        user-select: none;
    }
    .flipped {
        transform: rotateY(180deg);
    }
    img {
        object-fit: contain;
        max-width: 80vw;
        max-height: 80vh;
        min-width: auto;
        min-height: auto;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
    }
    .card-back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        background-color: white;
        transform: rotateY(180deg);
        color: black;
    }
    .card-back p {
        text-align: center;
        margin: 20px;
        font-size: 30px;
    }
</style>