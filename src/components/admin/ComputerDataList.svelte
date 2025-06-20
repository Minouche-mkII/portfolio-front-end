<script>
    import {getAllComputerData} from "../../services/api/computer-data/get_computer_data_service.js";
    import {BACKEND_URL} from "$lib/config.js";
    let promise = getAllComputerData()
</script>

<section class="container">
    <h1>Page admin</h1>
    <div class="grid">
        {#await promise}
            <p aria-busy="true">loading</p>
        {:then computerDataList}
            {#each computerDataList as computerData}
                <article>
                    <img src="{BACKEND_URL+computerData.illustration_src}" alt="illustration of {computerData.name}"/>
                    <p>{computerData.name}</p>
                </article>
            {/each}
        {:catch error}
            <p>Error loading data</p>
        {/await}
    </div>
</section>

<style>
    article {
        text-align: center;
        border: 2px solid white;
        height: 15rem;
        width: 15rem;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(17rem, auto));
        justify-content: start;
        gap: 1rem;
    }
    article img {
        height: 90%;
        border-radius: 5%;
    }
</style>