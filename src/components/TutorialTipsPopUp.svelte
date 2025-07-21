<script lang="ts">

    import {hasBeenClosed, markAsClosed} from "../types/business/tutorialPopup";
    import {tick} from "svelte";

    type Props = {
        src: string,
        prompt: string,
        id: string
    }
    const {src, prompt, id} : Props = $props()

    let popup = $state(!hasBeenClosed(id))
    let animationClass = $state("enter")

    async function closeTutorial(event: MouseEvent) {
        markAsClosed(id)
        animationClass = "back"
        setTimeout(() => popup = false, 200)
    }
</script>

{#if popup}
    <div id="tutorial-pop-up" class="{animationClass}">
        <img {src} alt="Tutorial illustration"/>
        <p>{@html prompt}</p>
        <button class="cool-link" onclick={closeTutorial}>Got it !</button>
    </div>
{/if}

<style>
    @keyframes enter {
        from {
            transform: translate(-60vw, -50%);
        }
        to {
            transform: translate(-50%, -50%);
        }
    }

    @keyframes back {
        from {
            transform: translate(-50%, -50%);
        }
        to {
            transform: translate(-60vw, -50%);
        }
    }

    #tutorial-pop-up {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--lightground);
        padding: 2em;
        border-radius: 1em;
    }

    #tutorial-pop-up p {
        text-align: justify;
        line-height: 1.5em;
    }

    #tutorial-pop-up > img {
        max-width: 80vw;
        max-height: 80vh;
    }

    #tutorial-pop-up > button {
        display: block;
        margin: auto;
        font-size: 30px;
    }

    .enter {
        animation: enter 0.3s cubic-bezier(.33,.73,.53,1.24);
    }

    .back {
        animation: back 0.2s cubic-bezier(.27,-0.49,.78,.61) both;
    }

</style>