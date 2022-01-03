import { FileService } from "../services/FileService";
import { ActionParams, TypedError } from "../utilities/helpers";

export class FileController {

    private _fileService: FileService;

    constructor(fileService: FileService) {

        this._fileService = fileService;
    }

    uploadAvatarFileAction = (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        //TODO: Create a validation function
        if (!["image/png", "image/jpeg"].includes(file.mimetype))
            throw new TypedError("File upload failed: Only jpeg or png", "bad request")

        return this._fileService
            .uploadAvatarFileAsync(params.currentUserId, file);
    };
}
