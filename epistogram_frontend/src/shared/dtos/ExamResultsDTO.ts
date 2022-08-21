import { ExamResultQuestionDTO } from './ExamResultQuestionDTO';
import { ExamStatsDTO } from './ExamStatsDTO';

export class ExamResultsDTO {
    isSuccessful: boolean;
    questions: ExamResultQuestionDTO[];
    isFinalExam: boolean;
    isCompletedPrevoiusly: boolean;
    shouldShowCourseCompleted: boolean;
    examStats: ExamStatsDTO;
}