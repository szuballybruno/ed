import { ModuleService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { ServiceProvider } from '../startup/ServiceProvider';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { XController } from '../XTurboExpress/XTurboExpressTypes';

export class ModuleController implements XController<ModuleController> {

    private _moduleService: ModuleService;

    constructor(serviceProvider: ServiceProvider) {

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