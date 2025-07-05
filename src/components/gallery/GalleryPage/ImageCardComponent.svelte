<script lang="ts">
    import type {GalleryImageDTO} from "../../../types/dto/page-dto";
    import {BACKEND_URL} from "$lib/config";
    import {onMount} from "svelte";

    type Props = {
        image: GalleryImageDTO,
        onRemove: () => void,
        origin: {
            x: number,
            y: number,
            mouseX: number,
            mouseY: number,
            baseWidth: number,
            baseHeight: number,
            naturalWidth: number,
            naturalHeight: number
        }
    }
    let {image, onRemove, origin} : Props = $props()

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
    let animating = true

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

    // un véritable bricolage pour continuer a incliner la carte pendant l'animation
    function whileAnimating() {
        let mouseX = origin.mouseX
        let mouseY = origin.mouseY
        const target = document.getElementById("current-card-modal") as HTMLElement
        function mouseMove(event: MouseEvent) {
            mouseX = event.clientX
            mouseY = event.clientY
        }
        window.addEventListener("mousemove", mouseMove)

        const interval = setInterval(() => {
            if(!animating) {
                window.removeEventListener("mousemove", mouseMove)
                clearInterval(interval)
                return
            }
            const falseEvent = new MouseEvent('mousemove', {
                bubbles: true,
                cancelable: true,
                clientX: mouseX,
                clientY: mouseY
            });
            if(inBounds(mouseX, mouseY, target)) {
                target.dispatchEvent(falseEvent)
            } else {
                mouseLeave()
            }
        }, 8)
    }

    function inBounds(mouseX: number, mouseY: number, element: HTMLElement) {
        const coordinates = element.getBoundingClientRect()
        const maxX = coordinates.x + coordinates.width
        const maxY = coordinates.y + coordinates.height
        return mouseX > coordinates.x && mouseX < maxX && mouseY > coordinates.y && coordinates.y < maxY
    }

    onMount(() => {
        whileAnimating()
    })

    function animationEnd() {
        animating = false
    }

    function mouseLeave() {
        rotateX = 0
        rotateY = 0
        brightness = 1
    }

    let cardStyle = $derived(`transform: rotateX(${rotateY*20}deg) rotateY(${rotateX*20}deg); filter: brightness(${brightness})`)

    let finalWidth = origin.naturalWidth
    let finalHeight = origin.naturalHeight
    const ratio = finalWidth / finalHeight
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8
    const screenRatio = maxWidth / maxHeight

    if(finalWidth * screenRatio < finalHeight) {
        if(finalWidth > maxWidth) {
            finalWidth = maxWidth
            finalHeight = finalWidth / ratio
        }
    } else {
        if(finalHeight > maxHeight) {
            finalHeight = maxHeight
            finalWidth = finalHeight * ratio
        }
    }

    const keyFrames = `
        <style>
            @keyframes take-animation {
                from {
                    left: ${origin.x}px;
                    top: ${origin.y}px;
                    transform: translate(0, 0);
                }

                to {
                    transform: translate(-50%, -50%);
                    top: 50%;
                    left: 50%;
                }
            }
            @keyframes img-take-animation {
                from {
                    width: ${origin.baseWidth}px;
                    height: ${origin.baseHeight}px;
                    object-fit: fill;
                }
                to {
                    width: ${finalWidth}px;
                    height: ${finalHeight}px;
                    object-fit: fill;
                }
            }
        </style>`

</script>


<svelte:head>
    {@html keyFrames}
</svelte:head>

<div class="background" tabindex="0" role="button" onclick={remove} >
    <div class="collide-card"  onmousemove={mouseEffect} onmouseleave={mouseLeave} onanimationend={animationEnd} id="current-card-modal">
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
    @keyframes fadeIn {
        from {
            background-color: rgba(0, 0, 0, 0);
        }
        to {
            background-color: rgba(0, 0, 0, 0.4);
        }
    }
    .background {
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: fadeIn 0.5s;
    }
    .collide-card {
        position: fixed;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        z-index: 1001;
        perspective: 1200px;
        animation: take-animation 0.5s;

    }
    .card {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        cursor: pointer;
    }
    .inner-card {
        transition: transform 0.3s;
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
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        animation: img-take-animation 0.5s;
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