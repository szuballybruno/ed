import { postFileAsync, usePostFile } from "./httpClient";

export const uploadAvatarFileAsync = (file: File) => {

    console.log("EZAZ:" + file.type)

    return postFileAsync("file/upload-avatar", file);
}

export const useUploadAvatarFile = () => {

    const { postFileAsync, state } = usePostFile("file/upload-avatar");

    return {
        postAvatarFileAsync: postFileAsync,
        postAvatarFileState: state
    }
}
