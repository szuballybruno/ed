import { AnswerDTO } from "./AnswerDTO";
import { IdType } from "./types/sharedTypes";

export type QuestionDTO = {
    questionId: IdType;
    questionText: string;
    answers: AnswerDTO[];
}