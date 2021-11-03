import { AnswerDTO } from "./AnswerDTO";
import { ResultAnswerDTO } from "./ResultAnswerDTO";

export type ExamResultQuestionDTO = {
    text: string;
    answers: ResultAnswerDTO[];
    givenAnswerIds: number[];
}