import type {GalleryImageDTO, PageDTO} from "../../../types/dto/page-dto";
import {getAllPagesIds, getPageById} from "../../api/gallery/get-pages-service";

let loadedPages = new Map<string, PageDTO>();
let pageList : string[]

export async function getPage(id: string) {
    let page = loadedPages.get(id);
    if(!page) {
        page = await getPageById(id);
        loadedPages.set(id, page)
    }
    return page as PageDTO;
}

export async function getPageList() {
    if (pageList === undefined) {
        pageList = await getAllPagesIds()
    }
    return pageList
}
