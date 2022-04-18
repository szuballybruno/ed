import { QuestionEditDataDTO } from './QuestionEditDataDTO';

export class ExamQuestionEditDTO {
    id: number;
    title: string;
    courseName: string;
    questions: QuestionEditDataDTO[];
}