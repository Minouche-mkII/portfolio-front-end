<script lang="ts">
    let tip = $state(true)
</script>

{#if tip}
    <div id="escape-tip" onanimationend={() => {tip = false}}>
        <p>Press <span id="esc-btn">ESC</span> to go back</p>
    </div>
{/if}

<style>
    @keyframes tipKeyFrames {
        0% {
            transform: translateY(-100px);
        }
        5% {
            transform: translateY(0);
        }
        95% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-100px);
        }
    }
    #escape-tip {
        animation: tipKeyFrames 2s ease-in;
        position: absolute;
        top: 50px;
        z-index: 1000;
        right: 5em;
        border: var(--font) 1px solid;
        border-radius: 30px;
        background-color: var(--background);
        margin-left: auto;
        margin-right: auto;
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