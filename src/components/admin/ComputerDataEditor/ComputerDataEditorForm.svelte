<script lang="ts">
    import type {Detail} from "../../../types/dto/detail";
    import ImageForm from "./ImageForm.svelte";
    import DetailForm from "./DetailForm.svelte";
    import {splitImageContent} from "../../../services/business/computer-data/card_details_interpretor_service";
    import {BACKEND_URL} from "$lib/config.js";
    import {editComputerData} from "../../../services/api/computer-data/put_computer_data_service";
    import {formatNewComputer} from "../../../services/business/computer-data/new_computer_data_formater_service";
    import {postNewComputerData} from "../../../services/api/computer-data/post_computer_data_service";

    type Props = {
        edit: boolean,
        computerData: ComputerData,
        details: Detail[]
    }

    //TODO Rendre tout cela un peu plus propre en rafermissant la frontiière entre UI et service
    // ça ne devrait pas être bien long : mettre dans des fonctions

    let {edit, computerData = $bindable(), details = $bindable()}: Props = $props()
    let editMode = $state(edit)
    let imageData = $derived(splitImageContent(computerData.illustration_src))
    let src = $derived(BACKEND_URL+imageData[0])
    let alt = $derived(imageData[1])
    let success = $state(false)
    let error = $state(false)
    let submitText = $derived(editMode? "Appliquer": "Créer")

    function addDetail() {
        details.push({
            type: "paragraph",
            content: ""
        })
    }

    function intervertElements(index1: number, index2: number) {
        let tmp = details[index1]
        details[index1] = details[index2]
        details[index2] = tmp
    }

    function elementUp(index: number) {
        if(index >= 1) {
            intervertElements(index, index-1)
        }
    }

    function elementDown(index: number) {
        if(index < details.length-1) {
            intervertElements(index, index+1)
        }
    }

    function removeElement(index: number) {
        details.splice(index, 1)
    }

    function submitForm() {
        success = false
        error = false
        if(editMode) {
            editComputerData(formatNewComputer(computerData, details)).then( () => {
                success = true
            }).catch(() => {
                error = true
            })
        } else {
            postNewComputerData(formatNewComputer(computerData, details)).then( (id) => {
                success = true
                computerData._id = id
            }).catch(() => {
                error = true
            })
            editMode = true
        }
    }
</script>

<form>
    <h2>Carte</h2>
    <section>
        <img {src} {alt}/>
        <ImageForm bind:content={computerData.illustration_src}/>
        <label for="name">Nom : </label>
        <input bind:value="{computerData.name}" id="name" name="name"/>
        <label for="folder">Dossier : </label>
        <input bind:value="{computerData.parent_folder}" id="folder" name="folder"/>
        <label for="priority">Priorité : </label>
        <input bind:value="{computerData.priority}" id="priority" name="priority" type="number"/>
    </section>

    <h2>Détails</h2>
    <section>
        {#each details as _, index}
            <div>
                <button onclick={() => {elementUp(index)}}>↑</button>
                <button onclick={() => {elementDown(index)}}>↓</button>
                <DetailForm bind:detail={details[index]} />
                <button onclick={() => {removeElement(index)}}>x</button>
            </div>
        {/each}
        <button onclick={addDetail}>Nouveau</button>
    </section>
    <input type="submit" onclick={submitForm} value="{submitText}">
    {#if success}
        <p>success</p>
    {/if}
    {#if error}
        <p>an error occurred</p>
    {/if}
</form>

<style>
    form {
        min-width: 30%;
        border: solid 1px white;
        border-radius: 5px;
        padding : 2em
    }
</style>