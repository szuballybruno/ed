import { PersonalityCategoryTraitDTO } from "./PersonalityCategoryTraitDTO";
import { PersonalityChartDataDTO } from "./PersonalityChartDataDTO";

export type PersonalityAssessmentDTO = {
    chartData: PersonalityChartDataDTO;
    personalityTraitCategories: PersonalityCategoryTraitDTO[];
}