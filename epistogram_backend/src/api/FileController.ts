import { FileService } from '../services/FileService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class FileController implements XController<FileController> {

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
