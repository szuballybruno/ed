import { DailyTip } from '../models/entity/DailyTip';
import { PersonalityTraitCategory } from '../models/entity/PersonalityTraitCategory';
import { PersonalityAssessmentDTO } from '../shared/dtos/PersonalityAssessmentDTO';
import { PersonalityCategoryTraitDTO } from '../shared/dtos/PersonalityCategoryTraitDTO';
import { PersonalityChartDataDTO } from '../shared/dtos/PersonalityChartDataDTO';
import { PersonalityTraitCategoryDTO } from '../shared/dtos/PersonalityTraitCategoryDTO';
import { PersonalityTraitCategoryShortDTO } from '../shared/dtos/PersonalityTraitCategoryShortDTO';
import { PersonalityTraitDataDTO } from '../shared/dtos/PersonalityTraitDataDTO';
import { PersonalityTraitCategoryView } from '../models/views/PersonalityTraitCategoryView';
import { PersonalityTraitView } from '../models/views/PersonalityTraitView';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PrincipalId } from '../utilities/ActionParams';

export class PersonalityAssessmentService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    /**
     * Returns the personality assessment DTO, that can be used externally.
     */
    async getUserPersonalityAssessmentDTOAsync(principalId: PrincipalId) {

        const userId = principalId.toSQLValue();
        const chartData = await this.getUserPersonalityDataAsync(userId);
        const personalityTraitCategories = await this.getPersonalityDescriptionsDTOAsync(userId);

        return {
            chartData: chartData,
            personalityTraitCategories
        } as PersonalityAssessmentDTO;
    }

    /**
     * Returns personality trait views for a specified user
     */
    async getPersonalityTraitsAsync(userId: number) {

        return await this._ormService
            .query(PersonalityTraitView, { userId })
            .where('userId', '=', 'userId')
            .getMany();
    }

    /**
     * Return the personality trait category with details, like tips etc.
     */
    async getPersonalityTraitCategoryDetailsAsync(personalityTraitCategoryId: number, isMax: boolean) {

        const category = await this._ormService
            .query(PersonalityTraitCategory, { personalityTraitCategoryId })
            .where('id', '=', 'personalityTraitCategoryId')
            .getOneOrNull();

        const tips = await this._ormService
            .query(DailyTip, { isMax, personalityTraitCategoryId })
            .where('isMax', '=', 'isMax')
            .and('personalityTraitCategoryId', '=', 'personalityTraitCategoryId')
            .getMany();

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
            .query(PersonalityTraitCategoryView)
            .getMany();

        const minMaxCatList = categories
            .flatMap(category => {

                const minCat = this._mapperService
                    .map(PersonalityTraitCategoryView, PersonalityTraitCategoryShortDTO, category, false);

                const maxCat = this._mapperService
                    .map(PersonalityTraitCategoryView, PersonalityTraitCategoryShortDTO, category, true);

                return [minCat, maxCat];
            });

        return minMaxCatList;
    }

    /**
     * This returns the active descriptions of the users traits. 
     */
    private getPersonalityDescriptionsDTOAsync = async (userId: number) => {

        const personalityTraits = await this.getPersonalityTraitsAsync(userId);

        return personalityTraits
            .map(x => ({
                activeDescription: x.activeDescription,
                categoryTitle: x.traitCategoryTitle
            }) as PersonalityCategoryTraitDTO);
    };

    /**
     * This is a specialized function that 
     * pre-generates the data for a circular (radar) chart.
     * What it does is creates a virtual circle consisting of opposing traits,
     * on opposing sides. Like so: 
     *
     * Trait 1 min - *     * - Trait 1 max
     *                *  * - Trait 2 max
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
            });

        const traitsOrdered = traits
            .orderBy(x => x.orderIndex);

        return {
            traits: traitsOrdered
        } as PersonalityChartDataDTO;
    }
}