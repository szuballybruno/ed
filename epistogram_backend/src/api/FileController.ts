import { FileService } from '../services/FileService';
import { VerboseError } from '../shared/types/VerboseError';
import { ActionParams } from "../utilities/ActionParams";

export class FileController {

    private _fileService: FileService;

    constructor(fileService: FileService) {

        this._fileService = fileService;
    }

    uploadAvatarFileAction = (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        //TODO: Create a validation function
        if (!['image/png', 'image/jpeg'].includes(file.mimetype))
            throw new VerboseError('File upload failed: Only jpeg or png', 'bad request');

        return this._fileService
            .uploadAvatarFileAsync(params.currentUserId, file);
    };
}
