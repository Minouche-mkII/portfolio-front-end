import {getComputerDataAsFolders} from "../../api/computer-data/get_computer_data_service";
import type {ComputerContext} from "../../../types/business/computer/computer_context";

let context: ComputerContext | undefined = $state(undefined)

export async function getComputerContext() {
    if (!context) {
        context = await initContext()
    }
    return context;
}

async function initContext() : Promise<ComputerContext> {
    return {
        openedWindows: [],
        computerData: await getComputerDataAsFolders(),
        lastIndex: 0
    }
}