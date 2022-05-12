import { FileService } from '../services/FileService';
import { ActionParams } from '../utilities/ActionParams';

export class FileController {

    private _fileService: FileService;

    constructor(fileService: FileService) {

        this._fileService = fileService;
    }

    uploadAvatarFileAction = (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        return this._fileService
            .uploadAvatarFileAsync(params.principalId, file);
    };
}
