import type {Detail} from "./detail";

type new_computer_data = {
    id: string;
    name: string;
    illustration_src: string;
    parent_folder: string;
    priority: number;
    details: Detail[];
}