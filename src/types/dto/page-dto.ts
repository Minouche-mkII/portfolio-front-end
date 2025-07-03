export type GalleryImageDTO = {
    src: string,
    alt: string,
    horizontal_span: number,
    vertical_span: number,
    note: string
}

export type PageDTO = {
    _id: string,
    images: GalleryImageDTO[],
}