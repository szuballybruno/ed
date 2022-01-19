import { DailyTipDTO } from "./DailyTipDTO";

export class PersonalityTraitCategoryDTO {
    id: number;
    title: string;
    maxLabel: string;
    minLabel: string;
    maxDescription: string;
    minDescription: string;
    tips: DailyTipDTO[];
}