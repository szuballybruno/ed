import { QuestionDTO } from "./QuestionDTO";

export class ExamEditDataDTO {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    isFinalExam: boolean;
    questions: QuestionDTO[];
}