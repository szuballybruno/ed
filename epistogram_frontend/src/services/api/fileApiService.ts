import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { usePostFile } from "../core/httpClient";

export const useUploadAvatarFile = () => {

    const { postFileAsync, state } = usePostFile(apiRoutes.file.uploadUserAvatar);

    return {
        postAvatarFileAsync: postFileAsync,
        postAvatarFileState: state
    }
}