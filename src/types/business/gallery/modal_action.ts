import type {GalleryImageDTO} from "../../dto/page-dto";
import type {ImageOrigin} from "./image_origin_type";

export type OpenModalAction = (origin: ImageOrigin, image: GalleryImageDTO, closeCallback: () => void) => void