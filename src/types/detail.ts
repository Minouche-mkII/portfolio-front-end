
export type Detail = {
    type: string;
    content: string;
}

export type FormatedCardDetail = {
    type: string;
    content: string | string[] | FormatedCardDetail[];
}