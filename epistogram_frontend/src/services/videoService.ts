import { useReactQuery } from "../frontendHelpers";
import { CreateVideoDTO } from "../models/shared_models/CreateVideoDTO";
import { IdBodyDTO } from "../models/shared_models/IdBodyDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes"
import { VideoEditDTO } from "../models/shared_models/VideoEditDTO";
import { VideoSaveDTO } from "../models/shared_models/VideoSaveDTO";
import { httpGetAsync, usePostDataUnsafe } from "./httpClient"

export const useCreateVideo = () => {

    const qr = usePostDataUnsafe<CreateVideoDTO, IdResultDTO>(apiRoutes.video.createVideo);

    return {
        createVideoAsync: async (courseId: number) => {

            return qr.postDataAsync({
                courseId,
                title: "Uj video",
                description: "",
                subtitle: ""
            });
        },
        createVideoState: qr.state,
        createVideoResult: qr.result
    }
}

export const useDeleteVideo = () => {

    const qr = usePostDataUnsafe<IdBodyDTO, void>(apiRoutes.video.deleteVideo);

    return {
        deleteVideoAsync: async (videoId: number) => {

            return qr.postDataAsync({
                id: videoId
            });
        },
        deleteVideoState: qr.state
    }
}

export const useSaveVideo = () => {

    const qr = usePostDataUnsafe<VideoSaveDTO, void>(apiRoutes.video.saveVideo);

    return {
        saveVideoAsync: qr.postDataAsync,
        saveVideoState: qr.state
    }
}

export const useVideoEditData = (videoId: number) => {

    const qr = useReactQuery<VideoEditDTO>(
        ["videoEditDataQuery"],
        () => httpGetAsync(apiRoutes.video.getVideoEditData, { videoId })
    );

    return {
        videoEditData: qr.data,
        videoEditDataState: qr.status,
        videoEditDataError: qr.error
    }
}