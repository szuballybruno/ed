import { TeacherInfoEditDTO } from '@episto/communication';
import { TeacherInfoService } from '@episto/server-services';
import { ActionParams } from '../ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { apiRoutes } from '@episto/communication';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { Id } from '@episto/commontypes';
import { Controller } from '../Controller';

export class TeacherInfoController implements Controller<TeacherInfoController> {

    private _teacherInfoService: TeacherInfoService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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
