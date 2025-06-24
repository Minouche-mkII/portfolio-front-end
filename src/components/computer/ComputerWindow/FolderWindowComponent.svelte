<script lang="ts">
    import ComputerWindowComponent from "./ComputerWindowComponent.svelte";
    import {type ComputerWindow, type FolderWindow, WindowType} from "../../../types/business/computer/WindowType";
    import ComputerFolder from "../Folder/ComputerFolder.svelte";
    import type {Clickable} from "../../../types/business/computer/folder_type";
    import {splitImageContent} from "../../../services/business/computer-data/card_details_interpretor_service";
    import {BACKEND_URL} from "$lib/config.js";

    type Props = {
        window: ComputerWindow,
        index: number
    }
    let {window, index}: Props = $props()
    const computerDataList = (window.data as FolderWindow).computerDataList
    const files: Clickable[] = []
    for(let file of computerDataList) {
        const splitString = splitImageContent(file.illustration_src)
        const src = BACKEND_URL+splitString[0]
        const alt = splitString[1]
        files.push({
            name: file.name,
            src: src,
            alt: alt,
            createdWindow: {
                type: WindowType.Detail,
                data: {computerData: file}
            }
        })
    }
</script>

{#snippet folder()}
    <ComputerFolder {files} />
{/snippet}

<ComputerWindowComponent child={folder} {window} {index}/>