import { ResultAnswerDTO } from "./ResultAnswerDTO";

export type ExamResultQuestionDTO = {
    text: string;
    isCorrect: boolean;
    answers: ResultAnswerDTO[];
}