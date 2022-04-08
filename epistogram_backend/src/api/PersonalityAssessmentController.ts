import { PersonalityAssessmentService } from '../services/PersonalityAssessmentService';
import { ActionParams } from '../utilities/helpers';

export class PersonalityAssessmentController {

    private _personalityAssessmentService: PersonalityAssessmentService;

    constructor(personalityAssessmentService: PersonalityAssessmentService) {

        this._personalityAssessmentService = personalityAssessmentService;
    }

    getPersonalityTraitCategoriesAction = async () => {

        return this._personalityAssessmentService
            .getPersonalityTraitCategoriesAsync();
    }

    getPersonalityTraitCategoryDetailsAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const personalityTraitCategoryId = query
            .getValue(x => x.personalityTraitCategoryId, 'int');

        const isMax = query
            .getValue(x => x.isMax, 'boolean');

        return this._personalityAssessmentService
            .getPersonalityTraitCategoryDetailsAsync(personalityTraitCategoryId, isMax);
    }
}