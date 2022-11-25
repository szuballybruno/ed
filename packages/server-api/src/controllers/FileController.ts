import { FileService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

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
