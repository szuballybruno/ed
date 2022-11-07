import { Id } from '@episto/commontypes';
import { DailyTipDTO } from './DailyTipDTO';

export class PersonalityTraitCategoryDTO {
    id: Id<'PersonalityTraitCategory'>;
    title: string;
    maxLabel: string;
    minLabel: string;
    maxDescription: string;
    minDescription: string;
    tips: DailyTipDTO[];
}