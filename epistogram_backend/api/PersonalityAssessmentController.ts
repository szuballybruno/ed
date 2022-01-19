import { PersonalityAssessmentService } from "../services/PersonalityAssessmentService";
import { ActionParams } from "../utilities/helpers";

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

        const personalityTraitCategoryId = params
            .getQuery<any>()
            .getValue(x => x.personalityTraitCategoryId, "int");

        return this._personalityAssessmentService
            .getPersonalityTraitCategoryDetailsAsync(personalityTraitCategoryId);
    }
}