import { ModuleService } from '../services/ModuleService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class ModuleController {

    private _moduleService: ModuleService;

    constructor(serviceProvider: ServiceProvider) {

        this._moduleService = serviceProvider.getService(ModuleService);
    }

    @XControllerAction(apiRoutes.module.getModuleListEditData)
    getModuleListEditAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const courseVersionId = Id
            .create<'CourseVersion'>(query
                .getValue(x => x.courseVersionId, 'int'));

        return this._moduleService
            .getModuleEditDTOsAsync(courseVersionId);
    };

    @XControllerAction(apiRoutes.module.saveCoverFile, { isPost: true })
    saveModuleThumbnailImageAction = async (params: ActionParams) => {

        const { body } = params
            .getFromParameterized(apiRoutes.module.saveCoverFile);

        const file = params
            .getSingleFileOrFail();

        const moduleVersionId = body
            .getValue(x => x.moduleVersionId, 'int');

        await this
            ._moduleService
            .saveModuleThumbnailImageAsync(moduleVersionId, file.data);
    };
}