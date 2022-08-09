import { ExamResultQuestionDTO } from './ExamResultQuestionDTO';

export type ExamResultsDTO = {
    isSuccessful: boolean;
    correctAnswerRate: number;
    questionsCount: number;
    examSuccessRateDiffFromCompany: number;
    examLengthSeconds: number;
    questions: ExamResultQuestionDTO[];
    isFinalExam: boolean;
    isCompletedPrevoiusly: boolean;
    shouldShowCourseCompleted: boolean;
    fullyCorrectlyAnsweredQuestionsCount: number;
}