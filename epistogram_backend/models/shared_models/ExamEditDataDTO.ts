import { QuestionDTO } from "./QuestionDTO";

export type ExamEditDataDTO = {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    questions: QuestionDTO[];
}