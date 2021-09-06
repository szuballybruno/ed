import { QuestionAnswerDTO } from "./QuestionAnswerDTO";
import { QuestionDTO } from "./QuestionDTO";

export type ExamDTO = {
    id: number;
    subTitle: string;
    title: string;
    type: "exam";
    thumbnailUrl: string;

    questions: QuestionDTO[];

    questionAnswers: QuestionAnswerDTO[];
}