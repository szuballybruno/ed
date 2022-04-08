import { ExamResultQuestionDTO } from './ExamResultQuestionDTO';

export type ExamResultsDTO = {
    isSuccessful: boolean;
    correctAnswerCount: number;
    questionCount: number;
    questions: ExamResultQuestionDTO[];
    isFinalExam: boolean;
    isCompletedPrevoiusly: boolean;
    shouldShowCourseCompleted: boolean;
}