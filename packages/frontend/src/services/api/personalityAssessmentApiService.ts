import { PersonalityTraitCategoryDTO } from '@episto/communication';
import { PersonalityTraitCategoryShortDTO } from '@episto/communication';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
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