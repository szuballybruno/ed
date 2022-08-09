import { useState } from 'react';
import { LoadingStateType } from '../../models/types';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { uploadeFileChunksAsync } from '../core/fileUploadClient';

export const useUploadVideoFileAsync = () => {

    const [uploadState, setUploadState] = useState<LoadingStateType>('idle');

    const saveVideoFileAsync = async (videoId: number, file: File) => {

        setUploadState('loading');

        try {

            await uploadeFileChunksAsync(apiRoutes.video.uploadVideoFileChunks, file, { videoId });
        }
        catch (e) {

            setUploadState('idle');
            throw e;
        }

        setUploadState('success');
    };

    return {
        saveVideoFileAsync: saveVideoFileAsync,
        saveVideoFileState: uploadState
    };
};