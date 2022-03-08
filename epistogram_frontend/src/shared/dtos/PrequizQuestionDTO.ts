import { PrequizAnswerDTO } from "./PrequizAnswerDTO";

export class PrequizQuestionDTO {
    id: number;
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