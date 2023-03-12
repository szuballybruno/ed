import { FileService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';

export class FileController implements IController<FileController> {

    private _fileService: FileService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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
