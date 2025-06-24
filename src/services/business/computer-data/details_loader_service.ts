import type {FormatedCardDetail} from "../../../types/business/computer/formated_detail";
import {getComputerDataDetails} from "../../api/computer-data/get_computer_data_service";
import * as wasi from "node:wasi";
import {interpretCardDetails} from "./card_details_interpretor_service";

const details: Map<string, FormatedCardDetail[]> = new Map([])

export async function getDetails(detailId: string)  {
    let formatedDetail = details.get(detailId);
    if (!formatedDetail) {
        const detail = await getComputerDataDetails(detailId)
        const formatedDetail = interpretCardDetails(detail)
        details.set(detailId, formatedDetail);
        return formatedDetail;
    }
    return formatedDetail as FormatedCardDetail[];
}