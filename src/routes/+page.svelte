
<script lang="ts">
    import DetailsPreview from "../components/DetailsPreview.svelte";
    import {interpretCardDetails} from "../services/card_details_interpretor_service";

    let details = [
        {
            "type": "title",
            "content": "sous-titre"
        },
        {
            "type": "row",
            "content": "2"
        },
        {
            "type": "paragraph",
            "content": "Lorem ipsum dolor sit amet, {$u consectetur} {$b adipiscing} elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            "type": "image",
            "content": "https://preview.redd.it/4zd8o6h9qxn51.png?auto=webp&s=d7d4075aaa783d90af3690ad7819b5e85d6d9ddb<->a cat with a knife"
        }
    ]
</script>

<DetailsPreview details = {interpretCardDetails(details)} name = {"Projet"} />