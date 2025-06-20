<script>
    import {getAllComputerData} from "../../services/api/computer-data/get_computer_data_service.js";
    import {onMount} from "svelte";

    onMount(() => {
        getAllComputerData().then(data => console.log(data))
    })
</script>

<section class="container">
    <h1>Page admin</h1>
</section>