import {TagView} from "../TagDTO";

export type AdminPageEditVideoView = {
    editedVideoId: string,
    editedVideoTitle: string,
    editedVideoSubTitle: string,
    editedVideoURL: string,
    editedVideoDescription: string,
    editedVideoThumbnailURL: string,
    editedVideoTags: TagView[]
    allTags: TagView[]
}