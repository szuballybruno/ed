import { CourseAdminItemQuestionAnswerDTO } from "./CourseAdminItemQuestionAnswerDTO";

export class CourseAdminItemQuestionDTO {
    questionId: number;
    questionText: string;
    questionShowUpSeconds: number;
    answerCount: number;
    correctAnswerCount: number;
    answers: CourseAdminItemQuestionAnswerDTO[];
}