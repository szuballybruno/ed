import { PersonalityCategoryDescription } from "../models/entity/PersonalityCategoryDescription";
import { PersonalityDataDTO } from "../models/shared_models/PersonalityDataDTO";
import { PersonalityDescriptionsDTO } from "../models/shared_models/PersonalityDescriptionsDTO";
import { PersonalityTraitDataDTO } from "../models/shared_models/PersonalityTraitDataDTO";
import { PersonalityAssessmentDTO } from "../models/shared_models/PersonalityAssessmentDTO";
import { SignupAnswersView } from "../models/views/SignupAnswersView";
import { staticProvider } from "../staticProvider";

export const getUserPersonalityAssessmentDTOAsync = async (userId: number) => {

    const chartData = await getUserPersonalityDataAsync(userId);
    const personalityDescriptions = await getPersonalityDescriptionsDTOAsync(userId);

    return {
        chartData: chartData,
        personalityDescriptions: personalityDescriptions
    } as PersonalityAssessmentDTO;
}

const getPersonalityDescriptionsDTOAsync = async (userId: number) => {

    const categoryViews = await getCategoryViewsAsync(userId);

    const descriptions = await staticProvider
        .ormConnection
        .getRepository(PersonalityCategoryDescription)
        .find();

    const getCategoryDescription = (catId: number) => {

        const cat = categoryViews.single(x => x.categoryId === 1);
        const description = descriptions.single(x => x.questionCategoryId === catId);

        if (cat.maxScore > cat.minScore)
            return description.maxDescription;

        return description.minDescription;
    }

    return {
        category1: getCategoryDescription(1),
        category2: getCategoryDescription(2),
        category3: getCategoryDescription(3),
        category4: getCategoryDescription(4),
        category5: getCategoryDescription(5),
    } as PersonalityDescriptionsDTO;
}

const getUserPersonalityDataAsync = async (userId: number) => {

    const categoryViews = await getCategoryViewsAsync(userId);
    const traits = [] as PersonalityTraitDataDTO[];
    const offset = categoryViews.length;

    categoryViews
        .forEach((categoryView, index) => {

            traits
                .push({
                    traitName: categoryView.minLabel,
                    orderIndex: index,
                    traitScore: categoryView.minScore
                });

            traits
                .push({
                    traitName: categoryView.maxLabel,
                    orderIndex: index + offset,
                    traitScore: categoryView.maxScore
                });
        })

    const traitsOrdered = traits
        .orderBy(x => x.orderIndex);

    return {
        traits: traitsOrdered
    } as PersonalityDataDTO;
}

const getCategoryViewsAsync = async (userId: number) => {

    const signupQuestions = await staticProvider
        .ormConnection
        .getRepository(SignupAnswersView)
        .find({
            where: {
                userId: userId,
            }
        });

    const categoryGroups = signupQuestions
        .groupBy(x => x.categoryId);

    return categoryGroups
        .map((group, index) => {

            const firstItem = group.items.first(x => true);

            const incorrectAnswersCount = group
                .items
                .filter(y => y.isCorrect === false)
                .length;

            const correctAnswersCount = group
                .items
                .filter(y => y.isCorrect === true)
                .length;

            return {
                categoryId: group.key,
                minLabel: firstItem.minLabel,
                maxLabel: firstItem.maxLabel,
                minScore: incorrectAnswersCount,
                maxScore: correctAnswersCount
            };
        });
}