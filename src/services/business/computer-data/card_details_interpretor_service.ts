import type {FormatedCardDetail} from "../../../types/business/computer/formated_detail";
import type {Detail} from "../../../types/dto/detail";
import {BACKEND_URL} from "$lib/config";


// ça pourrait être plus joli, il peut etre interessant de rafactorer tout ça plus tard
export function interpretCardDetails(details: Detail[]): FormatedCardDetail[] {
    let i = 0;
    let result: FormatedCardDetail[] = [];
    while(i < details.length) {
        let detail = details[i];
        if(detail.type === "row") {
            let row;
            [row, i] = createRow(i, details, detail, "row");
            result.push(row);
        } else {
            let element
            [element, i] = interpretContent(i, detail, details)
            result.push(element);
        }
        i++
    }
    return result
}

function createRow(i: number, details: Detail[], row: Detail, type: string): [FormatedCardDetail, number] {
    let columns : FormatedCardDetail[] = [];
    let nbColumn= +row.content
    for (let j = 0; j< nbColumn; j++) {
        i++;
        let detail = details[i];
        if(!detail) {
            break
        }
        let returnValues = interpretContent(i, detail, details)
        columns.push(returnValues[0]);
        i = returnValues[1]
    }
    let formatedDetail = {type: type, content: columns}
    return [formatedDetail, i]
}

function interpretContent(i:number, detail: Detail, details: Detail[]): [FormatedCardDetail, number] {
    let formatedObject : FormatedCardDetail = {type: detail.type, content: detail.content}
    let index = i
    switch (detail.type) {
        case "paragraph":
            formatedObject.content = formatParagraphContent(detail.content)
            break
        case "image":
            formatedObject.content = imageContent(detail)
            break
        case "image-badge":
            formatedObject.content = imageContent(detail)
            break
        case "intern-link":
            formatedObject.content = splitImageContent(detail.content)
            break
        case "column":
            let result = createRow(i, details, detail, "column");
            formatedObject = result[0]
            index = result[1]
            break
        case "extern-link":
            formatedObject.content = splitImageContent(detail.content)
    }
    return [formatedObject, index]
}

function imageContent(detail: Detail) {
    let content = splitImageContent(detail.content)
    content[0] = BACKEND_URL+content[0]
    return content
}

export function splitImageContent(content: string) {
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