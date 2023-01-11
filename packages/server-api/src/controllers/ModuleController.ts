import { ModuleService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { IController } from '../interfaces/IController';

export class ModuleController implements IController<ModuleController> {

    private _moduleService: ModuleService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._moduleService = serviceProvider.getService(ModuleService);
    }

    @XControllerAction(apiRoutes.module.getModuleListEditData)
    getModuleListEditAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const courseVersionId = Id
            .create<'CourseVersion'>(query
                .getValue(x => x.courseVersionId, 'int'));

        return this._moduleService
            .getModuleEditDTOsAsync(params.principalId, courseVersionId);
    }

    @XControllerAction(apiRoutes.module.saveCoverFile, { isPost: true })
    saveModuleThumbnailImageAction(params: ActionParams) {

        const { body } = params
            .getFromParameterized(apiRoutes.module.saveCoverFile);

        const file = params
            .getSingleFileOrFail();

        const moduleVersionId = body
            .getValue(x => x.moduleVersionId, 'int');

        return this
            ._moduleService
            .saveModuleThumbnailImageAsync(params.principalId, moduleVersionId, file.data);
    }
}