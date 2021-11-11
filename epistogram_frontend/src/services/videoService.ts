import { useState } from "react";
import { useReactQuery } from "../frontendHelpers";
import { CreateVideoDTO } from "../models/shared_models/CreateVideoDTO";
import { IdBodyDTO } from "../models/shared_models/IdBodyDTO";
import { IdResultDTO } from "../models/shared_models/IdResultDTO";
import { apiRoutes } from "../models/shared_models/types/apiRoutes";
import { VideoEditDTO } from "../models/shared_models/VideoEditDTO";
import { LoadingStateType } from "../models/types";
import { uploadeFileChunksAsync } from "./fileUploadClient";
import { httpGetAsync, usePostDataUnsafe } from "./httpClient";

export const useCreateVideo = () => {

    const qr = usePostDataUnsafe<CreateVideoDTO, IdResultDTO>(apiRoutes.video.createVideo);

    return {
        createVideoAsync: async (courseId: number) => {

            return qr.postDataAsync({
                courseId,
                title: "",
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

    const qr = usePostDataUnsafe<VideoEditDTO, void>(apiRoutes.video.saveVideo);

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
        videoEditDataError: qr.error,
        refetchVideoEditDataAsync: qr.refetch
    }
}

export const useUploadVideoFileAsync = () => {

    const [uploadState, setUploadState] = useState<LoadingStateType>("idle");

    const saveVideoFileAsync = async (videoId: number, file: File) => {

        setUploadState("loading");

        try {

            await uploadeFileChunksAsync(apiRoutes.video.uploadVideoFileChunks, file, { videoId });
        }
        catch (e) {

            setUploadState("idle");
            throw e;
        }

        setUploadState("success");
    }

    return {
        saveVideoFileAsync: saveVideoFileAsync,
        saveVideoFileState: uploadState
    }
}

// const qr = usePostDataUnsafe<{ videoId: number }, void>(apiRoutes.video.uploadVideoFile);

// return {
//     saveVideoFileAsync: (videoId: number, file: File) => qr.postDataAsync({ videoId }, file),
//     saveVideoFileState: qr.state,
// }
