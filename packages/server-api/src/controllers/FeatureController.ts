import { apiRoutes } from "@episto/communication";
import { FeatureService } from "@episto/server-services";
import { IXGatewayServiceProvider, XControllerAction } from "@episto/x-gateway";
import { ActionParams } from "../helpers/ActionParams";
import { IController } from "../interfaces/IController";

export class FeatureController implements IController<FeatureController> {

    private _featureService: FeatureService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._featureService = serviceProvider.getService(FeatureService);
    }


    @XControllerAction(apiRoutes.feature.checkFeature, { isPost: true })
    checkFeatureAction(params: ActionParams) {

        const dto = params
            .getFromParameterized(apiRoutes.feature.checkFeature)
            .body
            .data;

        return this._featureService
            .checkFeatureAsync(params.principalId, dto);
    }

    @XControllerAction(apiRoutes.feature.getCompanyFeatures)
    getCompanyFeaturesAction(params: ActionParams) {

        const companyId = params
            .getFromParameterized(apiRoutes.feature.getCompanyFeatures)
            .query
            .getValue(x => x.companyId, 'int');

        return this._featureService
            .getCompanyFeaturesAsync(params.principalId, companyId);
    }

    @XControllerAction(apiRoutes.feature.saveCompanyFeatures, { isPost: true })
    saveCompanyFeaturesAction(params: ActionParams) {

        const body = params
            .getFromParameterized(apiRoutes.feature.saveCompanyFeatures)
            .body;

        const companyId = body.getValue(x => x.companyId, 'int');
        const mutations = body.getValue(x => x.mutations);

        return this._featureService
            .saveCompanyFeaturesAsync(companyId, mutations);
    }

    @XControllerAction(apiRoutes.feature.getCourseFeatures)
    getCourseFeaturesAction(params: ActionParams) {

        const courseId = params
            .getFromParameterized(apiRoutes.feature.getCourseFeatures)
            .query
            .getValue(x => x.courseId, 'int');

        return this._featureService
            .getCourseFeaturesAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.feature.saveCourseFeatures, { isPost: true })
    saveCourseFeaturesAction(params: ActionParams) {

        const body = params
            .getFromParameterized(apiRoutes.feature.saveCourseFeatures)
            .body;

        const courseId = body.getValue(x => x.courseId, 'int');
        const mutations = body.getValue(x => x.mutations);

        return this._featureService
            .saveCourseFeaturesAsync(courseId, mutations);
    }
}