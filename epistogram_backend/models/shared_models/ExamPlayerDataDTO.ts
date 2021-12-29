import { QuestionDTO } from "./QuestionDTO";

export class ExamPlayerDataDTO {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    type: "exam";
    thumbnailUrl: string;
    isFinalExam: boolean;
    canTakeAgain: boolean;
    questions: QuestionDTO[];
}