import { UploadedFile } from "express-fileupload";
import { uploadAvatarFileAsync } from "../services/fileService";
import { ActionParams, TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const uploadAvatarFileAction = (params: ActionParams) => {

    const file = withValueOrBadRequest<UploadedFile>(params.req.files?.file);

    //TODO: Create a validation function
    if (!["image/png", "image/jpeg"].includes(file.mimetype))
        throw new TypedError("File upload failed: Only jpeg or png", "bad request")

    return uploadAvatarFileAsync(params.userId, file);
};
