import { QuestionEditDataDTO } from './QuestionEditDataDTO';

export class ExamQuestionEditDTO {
    id: number;
    title: string;
    subtitle: string;
    courseName: string;
    questions: QuestionEditDataDTO[];
}