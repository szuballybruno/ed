import { apiRoutes } from '@episto/communication';
import { ActivationCodeService, MiscService, UserCourseBridgeService } from '@episto/server-services';
import { IXGatewayServiceProvider, XControllerAction } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { IController } from '../interfaces/IController';

export class MiscController implements IController<MiscController> {

    private _miscService: MiscService;
    private _courseBridgeService: UserCourseBridgeService;
    private _activationCodeService: ActivationCodeService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._miscService = serviceProvider.getService(MiscService);
        this._courseBridgeService = serviceProvider.getService(UserCourseBridgeService);
        this._activationCodeService = serviceProvider.getService(ActivationCodeService);
    }

    @XControllerAction(apiRoutes.misc.healthcheck, { ignoreCompanyDomain: true, isUnauthorized: true, isPublic: true })
    healthcheck(params: ActionParams) {

        return Promise.resolve('healthy');
    }

    @XControllerAction(apiRoutes.misc.getCurrentCourseData)
    getCurrentCourseDataAsync(params: ActionParams) {

        return this._courseBridgeService
            .getCurrentCourseDataAsync(params.principalId);
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