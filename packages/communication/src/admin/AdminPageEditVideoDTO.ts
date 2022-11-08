import { TagDTO } from '../TagDTO';

export type AdminPageEditVideoDTO = {
    editedVideoId: string,
    editedVideoTitle: string,
    editedVideoSubTitle: string,
    editedVideoURL: string,
    editedVideoDescription: string,
    editedVideoThumbnailURL: string,
    editedVideoTags: TagDTO[]
    allTags: TagDTO[]
}