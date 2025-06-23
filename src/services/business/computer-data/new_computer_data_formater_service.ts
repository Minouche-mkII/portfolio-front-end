import type {Detail} from "../../../types/dto/detail";
import type {NewComputerData} from "../../../types/dto/new_computer_data";

export function formatNewComputer(computerData: ComputerData, details: Detail[]) : NewComputerData {
    return {
        _id: computerData._id,
        name: computerData.name,
        illustration_src: computerData.illustration_src,
        parent_folder: computerData.parent_folder,
        priority: computerData.priority,
        details: details
    }
}