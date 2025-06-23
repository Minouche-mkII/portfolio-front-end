import {getContext, setContext} from "svelte";
import {getComputerDataAsFolders} from "../../api/computer-data/get_computer_data_service";
import type {ComputerContext} from "../../../types/business/computer/computer_context";

export async function getComputerContext() {
    let context: ComputerContext = getContext("computer-data");
    if (!context) {
        context = await initContext()
        setContext("computer-data", { context });
    }
    return context;
}

async function initContext() {
    return {
        openedWindows: [],
        computerData: await getComputerDataAsFolders()
    }
}