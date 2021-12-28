import { QuestionDTO } from "./QuestionDTO";

export type ExamDTO = {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    type: "exam";
    thumbnailUrl: string;
    isFinalExam: boolean;
    questions: QuestionDTO[];
}