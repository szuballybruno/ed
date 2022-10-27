import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class PersonalityAssessmentController implements XController<PersonalityAssessmentController> {

    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: ServiceProvider) {

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