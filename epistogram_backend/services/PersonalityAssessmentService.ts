import { DailyTip } from "../models/entity/DailyTip";
import { PersonalityTraitCategory } from "../models/entity/PersonalityTraitCategory";
import { PersonalityAssessmentDTO } from "../models/shared_models/PersonalityAssessmentDTO";
import { PersonalityCategoryTraitDTO } from "../models/shared_models/PersonalityCategoryTraitDTO";
import { PersonalityChartDataDTO } from "../models/shared_models/PersonalityChartDataDTO";
import { PersonalityTraitCategoryDTO } from "../models/shared_models/PersonalityTraitCategoryDTO";
import { PersonalityTraitCategoryShortDTO } from "../models/shared_models/PersonalityTraitCategoryShortDTO";
import { PersonalityTraitDataDTO } from "../models/shared_models/PersonalityTraitDataDTO";
import { PersonalityTraitView } from "../models/views/PersonalityTraitView";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PersonalityAssessmentService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
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
     * Returns personality trait views for a specified user
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
     * Return the personality trait category with details, like tips etc.
     * 
     * @param personalityTraitCategoryId 
     */
    async getPersonalityTraitCategoryDetailsAsync(personalityTraitCategoryId: number, isMax: number) {

        const category = await this._ormService
            .getRepository(PersonalityTraitCategory)
            .findOneOrFail({
                where: {
                    id: personalityTraitCategoryId
                }
            });

        const tips = await this._ormService
            .getRepository(DailyTip)
            .find({
                where: {
                    isMax,
                    personalityTraitCategoryId
                }
            });

        return this._mapperService
            .map(PersonalityTraitCategory, PersonalityTraitCategoryDTO, category, tips);
    }

    /**
     * Returns all of the personality trait categories.
     * Expanded, so in the return data one category will 
     * be split to 2 objects, min <> max value
     */
    async getPersonalityTraitCategoriesAsync() {

        const categories = await this._ormService
            .getRepository(PersonalityTraitCategory)
            .find();

        const minMaxCatList = categories
            .flatMap(category => {

                const minCat = this._mapperService
                    .map(PersonalityTraitCategory, PersonalityTraitCategoryShortDTO, category, false);

                const maxCat = this._mapperService
                    .map(PersonalityTraitCategory, PersonalityTraitCategoryShortDTO, category, true);

                return [minCat, maxCat];
            });

        return minMaxCatList;
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