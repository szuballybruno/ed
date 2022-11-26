import { PersonalityAssessmentService } from '@episto/server-services';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IXGatewayServiceProvider } from '@episto/x-gateway';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@episto/x-gateway';
import { IController } from '../interfaces/IController';

export class PersonalityAssessmentController implements IController<PersonalityAssessmentController> {

    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

        this._personalityAssessmentService = serviceProvider.getService(PersonalityAssessmentService);
    }

    @XControllerAction(apiRoutes.personalityAssessment.getPersonalityTraitCategories)
    getPersonalityTraitCategoriesAction(params: ActionParams) {

        return this._personalityAssessmentService
            .getPersonalityTraitCategoriesAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.personalityAssessment.getPersonalityTraitCategoryDetails)
    getPersonalityTraitCategoryDetailsAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const personalityTraitCategoryId = Id
            .create<'PersonalityTraitCategory'>(query
                .getValue(x => x.personalityTraitCategoryId, 'int'));

        const isMax = query
            .getValue(x => x.isMax, 'boolean');

        return this._personalityAssessmentService
            .getPersonalityTraitCategoryDetailsAsync(params.principalId, personalityTraitCategoryId, isMax);
    }
}