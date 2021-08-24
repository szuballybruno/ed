import { useEffect, useState } from "react"
import { TypedError, useReactQuery } from "../frontendHelpers";
import { SetCurrentVideoDTO } from "../models/shared_models/SetCurrentVideoDTO";
import { IdType } from "../models/shared_models/types/sharedTypes";
import { VideoDTO } from "../models/shared_models/VideoDTO";
import { LoadingStateType } from "../store/application/ApplicationRunningStateInterface";
import { httpGetAsync, httpPostAsync } from "./httpClient";

export const useSetCurrentVideo = (courseId: IdType, videoId: IdType) => {

    const [error, setError] = useState<any>();
    const [status, setStatus] = useState<LoadingStateType>("idle");

    const setCurrentVideoAsync = async () => {

        try {

            setStatus("loading");

            const dto = {
                courseId: courseId,
                videoId: videoId
            } as SetCurrentVideoDTO;

            await httpPostAsync(`/player/set-current-video`, dto);

            setStatus("success");
        }
        catch (e) {

            const typedError = e as TypedError;
            if (typedError.errorType) {

                if (typedError.errorType == "videoNotFound")
                    setError(new Error("Nem talalhato ilyen video!"));

                setError(e);
            }
            else {

                setError(e);
            }

            setStatus("error");
        }
    }

    useEffect(() => {

        setCurrentVideoAsync();
    }, [courseId, videoId]);

    return { error, status };
}

export const useCurrentVideoDTO = (courseId: IdType, videoId: IdType) => {

    const { data, status, error } = useReactQuery<VideoDTO>(
        ["getCurrentVideoQuery", courseId, videoId],
        () => httpGetAsync(`player/get-current-video?courseId=${courseId}&videoId=${videoId}`));

    return {
        video: data,
        error,
        status
    }
}