import { Id } from '@episto/commontypes';
import { PrequizAnswerDTO } from './PrequizAnswerDTO';

export class PrequizQuestionDTO {
    id: Id<'Question'>;
    text: string;
    isNumeric: boolean;
    minValue: number;
    maxValue: number;
    stepValue: number;
    minLabel: string;
    maxLabel: string;
    valuePostfix: string;
    answers: PrequizAnswerDTO[];
}