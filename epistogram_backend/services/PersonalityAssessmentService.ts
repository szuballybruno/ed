import { PersonalityAssessmentDTO } from "../models/shared_models/PersonalityAssessmentDTO";
import { PersonalityCategoryTraitDTO } from "../models/shared_models/PersonalityCategoryTraitDTO";
import { PersonalityChartDataDTO } from "../models/shared_models/PersonalityChartDataDTO";
import { PersonalityTraitDataDTO } from "../models/shared_models/PersonalityTraitDataDTO";
import { PersonalityTraitView } from "../models/views/PersonalityTraitView";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PersonalityAssessmentService {

    private _ormService: ORMConnectionService;

    constructor(ormService: ORMConnectionService) {

        this._ormService = ormService;
    }

    /**
     * Returns the personality assessment DTO, that can be used externally.
     * 
     * @param userId 
     * @returns 
     */
    async getUserPersonalityAssessmentDTOAsync(userId: number) {

        const chartData = await this.getUserPersonalityDataAsync(userId);
        const personalityTraitCategories = await this.getPersonalityDescriptionsDTOAsync(userId);

        return {
            chartData: chartData,
            personalityTraitCategories
        } as PersonalityAssessmentDTO;
    }

    /**
     * Returns the personality trait views for a specified user
     * 
     * @param userId 
     * @returns 
     */
    async getPersonalityTraitsAsync(userId: number) {

        return await this._ormService
            .getRepository(PersonalityTraitView)
            .find({
                where: {
                    userId: userId,
                }
            });
    }

    /**
     * This returns the active descriptions of the users traits. 
     * 
     * @param userId 
     * @returns 
     */
    private getPersonalityDescriptionsDTOAsync = async (userId: number) => {

        const personalityTraits = await this.getPersonalityTraitsAsync(userId);

        return personalityTraits
            .map(x => ({
                activeDescription: x.activeDescription,
                categoryTitle: x.taritCategoryTitle
            }) as PersonalityCategoryTraitDTO);
    }

    /**
     * This is a specialized function that 
     * pre-generates the data for a circular (radar) chart.
     * What it does is creates a virtual circle consisting of opposing traits,
     * on opposing sides. Like so: 
     * 
     *   Trait 2 min - * *
     * Trait 1 min - *     * - Trait 1 max
     *                *  * - Trait 2 max
     * 
     * @param userId 
     * @returns 
     */
    private async getUserPersonalityDataAsync(userId: number) {

        const categoryViews = await this.getPersonalityTraitsAsync(userId);
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
        } as PersonalityChartDataDTO;
    }
}