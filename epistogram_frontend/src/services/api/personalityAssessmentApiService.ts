import { PersonalityTraitCategoryDTO } from '../../shared/dtos/PersonalityTraitCategoryDTO';
import { PersonalityTraitCategoryShortDTO } from '../../shared/dtos/PersonalityTraitCategoryShortDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { QueryService } from '../../static/QueryService';

export const usePersonalityTraitCategories = () => {

    const qr = QueryService.useXQuery<PersonalityTraitCategoryShortDTO[]>(apiRoutes.personalityAssessment.getPersonalityTraitCategories);

    return {
        personalityTraitCategories: qr.data ?? [],
        personalityTraitCategoriesState: qr.state,
        personalityTraitCategoriesError: qr.error,
        refetchPersonalityTraitCategories: qr.refetch
    };
};

export const usePersonalityTraitCategoryDetails = (personalityTraitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean) => {

    const qr = QueryService.useXQuery<PersonalityTraitCategoryDTO>(
        apiRoutes.personalityAssessment.getPersonalityTraitCategoryDetails,
        { personalityTraitCategoryId, isMax });

    return {
        personalityTraitCategoryDetails: qr.data,
        personalityTraitCategoryDetailsState: qr.state,
        personalityTraitCategoryDetailsError: qr.error,
        refetchPersonalityTraitCategoryDetails: qr.refetch
    };
};