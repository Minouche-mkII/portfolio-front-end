import {getAboutMe} from "../../api/about-me/about-me-service";
import type {FormatedCardDetail} from "../../../types/business/computer/formated_detail";
import {interpretCardDetails} from "../computer-data/card_details_interpretor_service";

let aboutMePage: FormatedCardDetail[]

export async function getAboutMePage() {
    if(!aboutMePage) {
        aboutMePage = interpretCardDetails(await getAboutMe())
    }
    return aboutMePage
}