import { ExamResultQuestionDTO } from "./ExamResultQuestionDTO";

export type ExamResultsDTO = {
    isSuccessful: boolean;
    correctAnswerCount: number;
    questionCount: number;
    questions: ExamResultQuestionDTO[];
}