import { TeacherInfoEditDTO } from '../shared/dtos/TeacherInfoEditDTO';
import { TeacherInfoService } from '../services/TeacherInfoService';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';

export class TeacherInfoController {

    private _teacherInfoService: TeacherInfoService;

    constructor(teacherInfoService: TeacherInfoService) {

        this._teacherInfoService = teacherInfoService;
    }

    @XControllerAction(apiRoutes.teacherInfo.getTeacherInfo)
    getTeacherInfoAction = async (params: ActionParams) => {

        const userId = params.getQuery<any>()
            .getValue(x => x.userId, 'int');

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
