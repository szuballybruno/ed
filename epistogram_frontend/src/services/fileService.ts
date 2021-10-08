import { postFileAsync, usePostFile } from "./httpClient";

export const uploadVideoFileAsync = (videoId: number, file: File) => {

    return postFileAsync("file/upload-video", file, { videoId });
}

export const uploadAvatarFileAsync = (file: File) => {

    return postFileAsync("file/upload-avatar", file);
}

export const useUploadAvatarFile = () => {

    const { postFileAsync, state } = usePostFile("file/upload-avatar");

    return {
        postAvatarFileAsync: postFileAsync,
        postAvatarFileState: state
    }
}