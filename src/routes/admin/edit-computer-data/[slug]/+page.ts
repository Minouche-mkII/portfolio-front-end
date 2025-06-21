import type {PageLoad} from "../../../../../.svelte-kit/types/src/routes/admin/computer-data-editor/[slug]/$types";
import {getComputerDataDetails, getComputerData} from "../../../../services/api/computer-data/get_computer_data_service";
import {error} from '@sveltejs/kit';
import {HttpError} from "../../../../services/utils/http_error";

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