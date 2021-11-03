import { QuestionDTO } from "./QuestionDTO";

export type ExamDTO = {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    type: "exam";
    thumbnailUrl: string;
    questions: QuestionDTO[];
}