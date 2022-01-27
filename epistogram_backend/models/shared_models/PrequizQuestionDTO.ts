import { PrequizAnswerDTO } from "./PrequizAnswerDTO";

export class PrequizQuestionDTO {
    id: number;
    text: string;
    isNumeric: boolean;
    answers: PrequizAnswerDTO[];
}