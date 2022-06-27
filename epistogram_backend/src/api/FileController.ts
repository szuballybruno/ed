import { FileService } from '../services/FileService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class FileController {

    private _fileService: FileService;

    constructor(serviceProvider: ServiceProvider) {

        this._fileService = serviceProvider.getService(FileService);
    }

    @XControllerAction(apiRoutes.file.uploadUserAvatar, { isPost: true })
    uploadAvatarFileAction = (params: ActionParams) => {

        const file = params
            .getSingleFileOrFail();

        return this._fileService
            .uploadAvatarFileAsync(params.principalId, file);
    };
}
