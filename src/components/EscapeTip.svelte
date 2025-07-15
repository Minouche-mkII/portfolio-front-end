<script lang="ts">
    import {onMount} from "svelte";

    let tip = $state(false)
    onMount(() => {
        setTimeout(() => {
            tip = true
        }, 5)
    })
</script>

{#if tip}
    <div id="escape-tip" onanimationend={() => {tip = false}}>
        <p>Press <span id="esc-btn">ESC</span> to go back</p>
    </div>
{/if}

<style>
    @keyframes tipKeyFrames {
        0% {
            top: -50px;
        }
        5% {
            top: 50px;
        }
        95% {
            top: 50px;
        }
        100% {
            top: -50px;
        }
    }
    #escape-tip {
        animation: tipKeyFrames 2s ease-in;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        border: var(--font) 1px solid;
        border-radius: 30px;
        background-color: var(--background);
    }
    #escape-tip > p {
        margin: 20px 25px;
        font-size: 25px;
    }
    #esc-btn {
        border: var(--font) 1px solid;
        border-radius: 5px;
        padding: 5px;
    }
</style>