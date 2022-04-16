import { QuestionEditDataDTO } from './QuestionEditDataDTO';

export class ExamQuestionEditDTO {
    id: number;
    courseName: string;
    questions: QuestionEditDataDTO[];
}