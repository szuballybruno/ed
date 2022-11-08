import { apiRoutes } from '@episto/communication';
import { usePostMultipartDataUnsafe } from '../core/httpClient';

export const useUploadAvatarFile = () => {

    const { postMultipartDataAsync, state } = usePostMultipartDataUnsafe(apiRoutes.file.uploadUserAvatar);

    return {
        postAvatarFileAsync: (file: File) => postMultipartDataAsync({ data: undefined, files: { file } }),
        postAvatarFileState: state
    };
};