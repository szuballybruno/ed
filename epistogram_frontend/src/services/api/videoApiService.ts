import { useCallback, useState } from 'react';
import { LoadingStateType } from '../../models/types';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { FileUploadCallbackParams, uploadeFileChunksAsync } from '../core/fileUploadClient';

export type VideoFileUploadCallbackParams = FileUploadCallbackParams & { videoVersionId: Id<'VideoVersion'> };
export type VideoFileUploadErrorParams = { error: any, videoVersionId: Id<'VideoVersion'> };
export type VideoFileUploadDoneParams = { videoVersionId: Id<'VideoVersion'> };

export const useUploadVideoFileAsync = (
    callback: (params: VideoFileUploadCallbackParams) => void,
    onError: (params: VideoFileUploadErrorParams) => void,
    onDone: (params: VideoFileUploadDoneParams) => void) => {

    const [uploadState, setUploadState] = useState<LoadingStateType>('idle');

    const saveVideoFileAsync = useCallback(async (videoVersionId: Id<'VideoVersion'>, file: File) => {

        setUploadState('loading');

        try {

            await uploadeFileChunksAsync({
                urlEnding: apiRoutes.video.uploadVideoFileChunks,
                file,
                data: { videoVersionId },
                callback: params => callback({ ...params, videoVersionId })
            });

            onDone({ videoVersionId });
        }
        catch (e) {

            setUploadState('idle');
            onError({ error: e, videoVersionId });
            throw e;
        }

        setUploadState('success');
    }, []);

    return {
        saveVideoFileAsync: saveVideoFileAsync,
        saveVideoFileState: uploadState
    };
};