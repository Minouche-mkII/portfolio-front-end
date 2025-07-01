import type {NewComputerData} from "../../../types/dto/new_computer_data";
import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";
import {getBearerToken} from "../auth/auth_service";

export async function editComputerData(computerData: NewComputerData) {
    const response = await fetch(BACKEND_URL+"computer-data/update", {
        method: "PUT",
        headers: {
            "Authorization": getBearerToken(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(computerData)
    })
    if(!response.ok) {
        console.log(`Error creating new computer data. code: 
            ${response.status}, status: ${response.statusText}`);
        throw new HttpError(response.status, response.statusText);
    }
}