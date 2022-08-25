import { useCallback, useState } from 'react';
import { LoadingStateType } from '../../models/types';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { uploadeFileChunksAsync } from '../core/fileUploadClient';

export const useUploadVideoFileAsync = () => {

    const [uploadState, setUploadState] = useState<LoadingStateType>('idle');

    const saveVideoFileAsync = useCallback(async (videoVersionId: Id<'VideoVersion'>, file: File) => {

        setUploadState('loading');

        try {

            await uploadeFileChunksAsync(apiRoutes.video.uploadVideoFileChunks, file, { videoVersionId });
        }
        catch (e) {

            setUploadState('idle');
            throw e;
        }

        setUploadState('success');
    }, []);

    return {
        saveVideoFileAsync: saveVideoFileAsync,
        saveVideoFileState: uploadState
    };
};