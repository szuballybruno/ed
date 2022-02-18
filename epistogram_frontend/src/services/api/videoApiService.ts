import { useState } from "react";
import { CreateVideoDTO } from "../../shared/dtos/CreateVideoDTO";
import { IdBodyDTO } from "../../shared/dtos/IdBodyDTO";
import { IdResultDTO } from "../../shared/dtos/IdResultDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { VideoEditDTO } from "../../shared/dtos/VideoEditDTO";
import { LoadingStateType } from "../../models/types";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { uploadeFileChunksAsync } from "../core/fileUploadClient";
import { usePostDataUnsafe } from "../core/httpClient";

export const useCreateVideo = () => {

    const qr = usePostDataUnsafe<CreateVideoDTO, IdResultDTO>(apiRoutes.video.createVideo);

    return {
        createVideoAsync: async (moduleId: number) => {

            return qr.postDataAsync({
                moduleId,
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

    const qr = useReactQuery2<VideoEditDTO>(apiRoutes.video.getVideoEditData, { videoId });

    return {
        videoEditData: qr.data,
        videoEditDataState: qr.state,
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