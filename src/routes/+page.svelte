
<script lang="ts">
    import DetailsPreview from "../components/DetailsPreview.svelte";

    let details = [
        {
            "type": "title",
            "content": "sous-titre"
        },
        {
            "type": "paragraph",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]
</script>

<DetailsPreview details = {details} name = {"Projet"} />