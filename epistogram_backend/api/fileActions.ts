import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { getUserIdFromRequest } from "../services/authenticationService";
import { uploadAvatarFileAsync, uploadCourseCoverFileAsync, uploadVideoThumbnailFileAsync } from "../services/fileService";
import { getAsyncActionHandler, TypedError, withValueOrBadRequest } from "../utilities/helpers";

export const uploadVideoThumbnailFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest<UploadedFile>(req.files?.file);
    const videoId = withValueOrBadRequest<number>(req.body.videoId, "number");

    return uploadVideoThumbnailFileAsync(videoId, file);
});

export const uploadAvatarFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest<UploadedFile>(req.files?.file);

    //TODO: Create a validation function
    if (!["image/png", "image/jpeg"].includes(file.mimetype))
        throw new TypedError("File upload failed: Only jpeg or png", "bad request")

    const userId = getUserIdFromRequest(req);

    return uploadAvatarFileAsync(userId, file);
});

export const uploadCourseCoverFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest<UploadedFile>(req.files?.file);
    const courseId = withValueOrBadRequest<number>(req.body.courseId, "number");

    return uploadCourseCoverFileAsync(courseId, file);
});
