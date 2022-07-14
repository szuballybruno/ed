import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { apiRoutes } from '../shared/types/apiRoutes';
import { Id } from '../shared/types/versionId';
import { ServiceProvider } from '../startup/servicesDI';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class PersonalityAssessmentController {

    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(serviceProvider: ServiceProvider) {

        this._personalityAssessmentService = serviceProvider.getService(PersonalityAssessmentService);
    }

    @XControllerAction(apiRoutes.personalityAssessment.getPersonalityTraitCategories)
    getPersonalityTraitCategoriesAction = async () => {

        return this._personalityAssessmentService
            .getPersonalityTraitCategoriesAsync();
    };

    @XControllerAction(apiRoutes.personalityAssessment.getPersonalityTraitCategoryDetails)
    getPersonalityTraitCategoryDetailsAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const personalityTraitCategoryId = Id
            .create<'PersonalityTraitCategory'>(query
                .getValue(x => x.personalityTraitCategoryId, 'int'));

        const isMax = query
            .getValue(x => x.isMax, 'boolean');

        return this._personalityAssessmentService
            .getPersonalityTraitCategoryDetailsAsync(personalityTraitCategoryId, isMax);
    };
}