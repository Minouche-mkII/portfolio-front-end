import type {FormatedCardDetail} from "../../../types/business/computer/formated_detail";
import {getComputerDataDetails} from "../../api/computer-data/get_computer_data_service";

const details: Map<string, FormatedCardDetail[]> = new Map([])

export async function getDetails(detailId: string)  {
    let detail = details.get(detailId);
    if (!detail) {
        detail = await getComputerDataDetails(detailId)
        details.set(detailId, detail);
        return detail;
    }
    return details.get(detailId) as FormatedCardDetail[];
}