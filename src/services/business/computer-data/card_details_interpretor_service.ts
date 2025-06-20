import type {FormatedCardDetail} from "../../../types/business/formated_detail";
import type {Detail} from "../../../types/dto/detail";

export function interpretCardDetails(details: Detail[]): FormatedCardDetail[] {
    let i = 0;
    let result: FormatedCardDetail[] = [];
    while(i < details.length) {
        let detail = details[i];
        if(detail.type === "row") {
            let row;
            [row, i] = createRow(i, details, detail);
            result.push(row);
        } else {
            result.push(interpretContent(detail));
        }
        i++
    }
    return result
}

function createRow(i: number, details: Detail[], row: Detail): [FormatedCardDetail, number] {

    let columns : FormatedCardDetail[] = [];
    let nbColumn= +row.content
    for (let j = 0; j< nbColumn; j++) {
        i++;
        columns.push(interpretContent(details[i]));
    }
    let formatedDetail = {type: "row", content: columns}
    return [formatedDetail, i]
}

function interpretContent(detail: Detail): FormatedCardDetail {
    switch (detail.type) {
        case "paragraph":
            return {type: "paragraph", content: formatParagraphContent(detail.content)}
        case "image":
            return {type: "image", content: splitImageContent(detail.content)}
    }
    return detail;
}

function splitImageContent(content: string) {
    return content.split("<->")
}

function formatParagraphContent(p : string) {
    let regex = /\{\$([a-zA-Z])\s+(.*?)\s*}/g
    // text between {$ ... }
    let safeParagraph = escapeHTML(p)
    return safeParagraph.replace(regex, applyFormat)
}

function applyFormat(_: any, modificator: string, content: string) : string {
    switch (modificator) {
        case "b":
            return "<strong>" + content + "</strong>"
        case "i":
            return "<em>" + content + "</em>"
        case "u":
            return "<u>" + content + "</u>"
    }
    return content
}

function escapeHTML(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}