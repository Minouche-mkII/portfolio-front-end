<script lang="ts">
    type WindowOpeningFunction = (windowType: WindowType) => void
    type Props = {
        computerData: Map<string, ComputerDataInFolder[]>,
        openWindow: (window: ComputerWindow) => void
    }
    const {computerData}: Props = $props()
</script>
