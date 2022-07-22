import { TeacherInfoEditDTO } from '../shared/dtos/TeacherInfoEditDTO';
import { TeacherInfoService } from '../services/TeacherInfoService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { Id } from '../shared/types/versionId';

export class TeacherInfoController {

    private _teacherInfoService: TeacherInfoService;

    constructor(serviceProvider: ServiceProvider) {

        this._teacherInfoService = serviceProvider.getService(TeacherInfoService);
    }

    @XControllerAction(apiRoutes.teacherInfo.getTeacherInfo)
    getTeacherInfoAction = async (params: ActionParams) => {

        const userId = Id
            .create<'User'>(params.getQuery<any>()
                .getValue(x => x.userId, 'int'));

        return await this._teacherInfoService
            .getTeacherInfoEditDTOAsync(userId);
    };

    @XControllerAction(apiRoutes.teacherInfo.saveTeacherInfo, { isPost: true })
    saveTeacherInfoAction = async (params: ActionParams) => {

        const dto = params.getBody<TeacherInfoEditDTO>();

        return await this._teacherInfoService
            .saveTeacherInfoAsync(dto.data);
    };
}
