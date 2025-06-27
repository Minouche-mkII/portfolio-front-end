import {BACKEND_URL} from "$lib/config";
import {HttpError} from "../../utils/http_error";

export async function deleteComputerData(id: string): Promise<boolean> {
    const response = await fetch(BACKEND_URL+"computer-data/delete/"+id, {
        method: "DELETE",
    })
    if(!response.ok) {
        console.log(`Error deleting data: 
            ${response.status}, status: ${response.statusText}`);
        throw new HttpError(response.status, response.statusText);
    }
    return true
}