import {Request} from "express";
import {AdminPageEditVideoView} from "../../models/shared_models/AdminPageEditVideoDTO";
import {TagView} from "../../models/shared_models/TagDTO";

export const getVideoIdFromRequest = (req: Request) => {

    const videoId = req.body.videoId

    return !!videoId ? videoId : new Error("Cannot get videoId")
}

export const getEditedVideoAsync = async (videoId: string, ) => {

    /*const { aggregateAsync } = await useCollection("videos");*/

    const aggregateEditedVideoByVideoId = async () => {

        /*const AdminPageEditedVideo = await aggregateAsync([{
            '$match': {
                '_id': {$toObjectId: videoId}
            }
        },{
            '$project': {
                'editedVideoId': 'string',
                'editedVideoTitle': 'string',
                'editedVideoSubTitle': 'string',
                'editedVideoURL': 'string',
                'editedVideoDescription': 'string',
                'editedVideoThumbnailURL': 'string',
                'editedVideoTags': 'TagView',
                'allTags': 'TagView',
            }
        }])

        return AdminPageEditedVideo as AdminPageEditVideoView[];*/
    }

    return aggregateEditedVideoByVideoId()
}

export const getEditedVideoAction = async (req: Request) => {
    //needs a getVideoIdFromRequest
    const videoId = getVideoIdFromRequest(req);
    //needs a getEditedVideoAsync
    return await getEditedVideoAsync(videoId);
};