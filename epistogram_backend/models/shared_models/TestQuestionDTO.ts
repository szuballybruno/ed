import { TestAnswerDTO } from "./TestAnswerDTO";
import { IdType } from "./types/sharedTypes";

export type TestQuestionDTO = {
    questionId: IdType;
    questionText: string;
    answers: TestAnswerDTO[];
}