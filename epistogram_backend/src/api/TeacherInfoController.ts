import { TeacherInfoEditDTO } from '../shared/dtos/TeacherInfoEditDTO';
import { TeacherInfoService } from '../services/TeacherInfoService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { Id } from '../shared/types/versionId';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class TeacherInfoController implements XController<TeacherInfoController> {

    private _teacherInfoService: TeacherInfoService;

    constructor(serviceProvider: ServiceProvider) {

        this._teacherInfoService = serviceProvider.getService(TeacherInfoService);
    }

    @XControllerAction(apiRoutes.teacherInfo.getTeacherInfo)
    getTeacherInfoAction(params: ActionParams) {

        const userId = Id
            .create<'User'>(params.getQuery<any>()
                .getValue(x => x.userId, 'int'));

        return this._teacherInfoService
            .getTeacherInfoEditDTOAsync(params.principalId, userId);
    }

    @XControllerAction(apiRoutes.teacherInfo.saveTeacherInfo, { isPost: true })
    saveTeacherInfoAction(params: ActionParams) {

        const dto = params.getBody<TeacherInfoEditDTO>();

        return this._teacherInfoService
            .saveTeacherInfoAsync(params.principalId, dto.data);
    }
}
