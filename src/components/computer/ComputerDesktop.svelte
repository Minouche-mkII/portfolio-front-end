<script lang="ts">
    import {WindowType} from "../../types/business/computer/WindowType";
    import ComputerFolder from "./Folder/ComputerFolder.svelte";
    import type {Clickable} from "../../types/business/computer/folder_type";
    type Props = {
        computerData: Map<string, ComputerDataInFolder[]>,
    }
    const {computerData}: Props = $props()
    let files: Clickable[] = []
    for(let [folder, content]  of computerData.entries()) {
        files.push({
            name: folder,
            src: "/folderPlaceholder.png",
            alt: "folder-icon",
            createdWindow: {
                logo: "&#128194",
                name: "Desktop/"+folder,
                type: WindowType.Folder,
                data: { computerDataList: content }
            }
        })
    }
</script>

<div>
    <ComputerFolder {files}/>
</div>
