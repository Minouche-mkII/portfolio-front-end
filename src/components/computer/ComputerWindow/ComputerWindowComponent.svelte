<script lang="ts">
    import type {Snippet} from "svelte";

    type Props = {
        child: Snippet,
        window: ComputerWindow
    }
    let {child, window}: Props = $props()
</script>

<div class="computerWindow">
    {@render child()}
</div>