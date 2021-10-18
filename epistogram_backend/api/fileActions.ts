import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import { getUserIdFromRequest } from "../services/authenticationService";
import { uploadAvatarFileAsync, uploadCourseCoverFileAsync, uploadVideoFileAsync, uploadVideoThumbnailFileAsync } from "../services/fileService";
import { getAsyncActionHandler, withValueOrBadRequest } from "../utilities/helpers";

export const uploadVideoFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest(req.files?.file) as UploadedFile;
    const videoId = parseInt(withValueOrBadRequest(req.body.videoId));

    return uploadVideoFileAsync(videoId, file);
});

export const uploadVideoThumbnailFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest(req.files?.file) as UploadedFile;
    const videoId = parseInt(withValueOrBadRequest(req.body.videoId));

    return uploadVideoThumbnailFileAsync(videoId, file);
});

export const uploadAvatarFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest(req.files?.file) as UploadedFile;

    //TODO: Create a validation function
    if (!["image/png", "image/jpeg"].includes(file.mimetype))
        throw new Error("File upload failed: Only jpeg or png")

    const userId = getUserIdFromRequest(req);

    return uploadAvatarFileAsync(userId, file);
});

export const uploadCourseCoverFileAction = getAsyncActionHandler((req: Request) => {

    const file = withValueOrBadRequest(req.files?.file) as UploadedFile;
    const courseId = parseInt(withValueOrBadRequest(req.body.courseId));

    return uploadCourseCoverFileAsync(courseId, file);
});
