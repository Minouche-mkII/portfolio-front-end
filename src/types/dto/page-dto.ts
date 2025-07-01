export type GalleryImageDTO = {
    src: string,
    alt: string,
    horizontal_span: string,
    vertical_span: string,
    note: string
}

export type PageDTO = {
    _id: string,
    images: GalleryImageDTO[],
}