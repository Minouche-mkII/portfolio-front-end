import {getComputerDataDetails, getComputerData} from "../../../../services/api/computer-data/get_computer_data_service";
import {error} from '@sveltejs/kit';
import {HttpError} from "../../../../services/utils/http_error";
import type {PageLoad} from "./$types"

export const load: PageLoad = async ({ params }) => {
    try {
        const id = params.slug
        const computerData = await getComputerData(id)
        const detail = await getComputerDataDetails(computerData.details_id)
        return {
            computerData,
            detail,
        }
    } catch (err) {
        if (err instanceof HttpError) {
            error(err.code, err.message);
        }
    }
};