<script lang="ts">

    type Props = {
        onclick: () => void,
        top: boolean
    }
    const { onclick, top } : Props = $props()
    const posClass = top ? "top" : "bottom"
</script>

<button class={posClass} onclick={onclick}>&#x3C;</button>

<style>
    @keyframes hoverAnimation {
        from {
            transform: rotate(0)
        }
        10% {
            transform: scale(1.1)
        }
        30% {
            transform: rotate(-40deg) scale(1.1)
        }
        60% {
            transform: rotate(50deg) scale(1.1)
        }
        90% {
            transform: scale(1.1)
        }
        to {
            transform: rotate(0)
        }
    }
    button {
        position: fixed;
        left: 1em;
        background-color: #151313;
        border-radius: 1em;
        width: 2em;
        height: 2em;
        font-size: 2em;
        color: var(--font);
        transition: 0.2s
    }
    button:hover {
        animation: hoverAnimation 0.5s;
        box-shadow: 0 0 1em var(--secondary);
    }
    .bottom {
        bottom: 1em;
    }
    .top {
        top: 1em;
    }
</style>