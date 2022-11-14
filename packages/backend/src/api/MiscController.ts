import { MiscService } from '../services/MiscService';
import { UserCourseBridgeService } from '../services/UserCourseBridgeService';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { ActivationCodeService } from '../services/ActivationCodeService';

export class MiscController implements XController<MiscController> {

    private _miscService: MiscService;
    private _courseBridgeService: UserCourseBridgeService;
    private _activationCodeService: ActivationCodeService;

    constructor(serviceProvider: ServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
        this._activationCodeService = serviceProvider.getService(ActivationCodeService);
    }

    @XControllerAction(apiRoutes.misc.getCurrentCourseItemCode)
    getCurrentCourseItemCodeAction(params: ActionParams) {

        return this._courseBridgeService
            .getPrincipalCurrentItemCodeAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.misc.getHomePageDTO)
    async getOverviewPageDTOAction(params: ActionParams) {

        return await this._miscService
            .getOverviewPageDTOAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.misc.getCourseOverviewData)
    getCourseOverviewDataAction(params: ActionParams) {

        const query = params
            .getFromParameterized(apiRoutes.misc.getCourseOverviewData)
            .query;

        return this._miscService
            .getCourseOverviewDataAsync(
                params.principalId,
                query.data.userId,
                query.data.courseId
            );
    }

    @XControllerAction(apiRoutes.misc.getCourseOverviewModuleCompareData)
    getCourseOverviewModuleCompareAction(params: ActionParams) {

        const query = params
            .getFromParameterized(apiRoutes.misc.getCourseOverviewData)
            .query;

        return this._miscService
            .getCourseOverviewModuleCompareDataAsync(
                params.principalId,
                query.data.userId,
                query.data.courseId
            );
    }

    @XControllerAction(apiRoutes.misc.getActivationCodeList)
    getActivationCodeListAction(params: ActionParams) {

        const { query } = params
            .getFromParameterized(apiRoutes.misc.getActivationCodeList);

        return this
            ._miscService
            .getActivationCodeList(
                query.getValue(x => x.urlTemplate, 'string'),
                query.getValue(x => x.companyId, 'int'));
    }

    @XControllerAction(apiRoutes.misc.generateActivationCodesPreview, { isPost: true })
    generateActivationCodesPreviewAction(params: ActionParams) {

        const { body } = params
            .getFromParameterized(apiRoutes.misc.generateActivationCodesPreview);

        return this
            ._activationCodeService
            .previewActivationCodesAsync(body.getValue(x => x.prefix, 'string'), body.getValue(x => x.count, 'int'));
    }

    @XControllerAction(apiRoutes.misc.generateActivationCodes, { isPost: true })
    generateActivationCodesAction(params: ActionParams) {

        const { body } = params
            .getFromParameterized(apiRoutes.misc.generateActivationCodesPreview);

        return this
            ._activationCodeService
            .generateActivationCodesAsync(
                body.getValue(x => x.prefix, 'string'),
                body.getValue(x => x.count, 'int'),
                body.getValue(x => x.companyId, 'int'));

    }
}