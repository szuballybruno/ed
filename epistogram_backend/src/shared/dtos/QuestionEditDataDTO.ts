import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataDTO {
    questionVersionId: number;
    questionText: string;
    questionShowUpTimeSeconds?: number;
    
    answers: AnswerEditDTO[];
}