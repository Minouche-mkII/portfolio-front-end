import type {Detail} from "./detail";

export type NewComputerData = {
    _id: string | null;
    name: string;
    illustration_src: string;
    parent_folder: string;
    priority: number;
    details: Detail[];
}