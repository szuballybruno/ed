import { PersonalityTraitCategoryDTO } from '../../shared/dtos/PersonalityTraitCategoryDTO';
import { PersonalityTraitCategoryShortDTO } from '../../shared/dtos/PersonalityTraitCategoryShortDTO';
import { apiRoutes } from '../../shared/types/apiRoutes';
import { Id } from '../../shared/types/versionId';
import { useReactQuery2 } from '../../static/frontendHelpers';

export const usePersonalityTraitCategories = () => {

    const qr = useReactQuery2<PersonalityTraitCategoryShortDTO[]>(apiRoutes.personalityAssessment.getPersonalityTraitCategories);

    return {
        personalityTraitCategories: qr.data ?? [],
        personalityTraitCategoriesState: qr.state,
        personalityTraitCategoriesError: qr.error,
        refetchPersonalityTraitCategories: qr.refetch
    };
};

export const usePersonalityTraitCategoryDetails = (personalityTraitCategoryId: Id<'PersonalityTraitCategory'>, isMax: boolean) => {

    const qr = useReactQuery2<PersonalityTraitCategoryDTO>(
        apiRoutes.personalityAssessment.getPersonalityTraitCategoryDetails,
        { personalityTraitCategoryId, isMax });

    return {
        personalityTraitCategoryDetails: qr.data,
        personalityTraitCategoryDetailsState: qr.state,
        personalityTraitCategoryDetailsError: qr.error,
        refetchPersonalityTraitCategoryDetails: qr.refetch
    };
};