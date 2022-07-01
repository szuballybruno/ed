import { AnswerEditDTO } from './AnswerEditDTO';

export class QuestionEditDataDTO {
    examVersionId: number | null;
    videoVersionId: number | null;
    questionVersionId: number;
    questionText: string;
    questionShowUpTimeSeconds?: number;
    
    answers: AnswerEditDTO[];
}