import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { getUserIdFromRequest } from "../services/authenticationService";
import { uploadAvatarFileAsync } from "../services/fileService";
import { getAsyncActionHandler, TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const uploadAvatarFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest<UploadedFile>(req.files?.file);

    //TODO: Create a validation function
    if (!["image/png", "image/jpeg"].includes(file.mimetype))
        throw new TypedError("File upload failed: Only jpeg or png", "bad request")

    const userId = getUserIdFromRequest(req);

    return uploadAvatarFileAsync(userId, file);
});
