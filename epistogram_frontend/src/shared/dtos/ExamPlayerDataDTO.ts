import { Id } from '../types/versionId';
import { QuestionDTO } from './QuestionDTO';

export class ExamPlayerDataDTO {
    examVersionId: Id<'ExamVersion'>;
    subTitle: string;
    title: string;
    type: 'exam';
    thumbnailUrl: string;
    isFinalExam: boolean;
    canTakeAgain: boolean;
    questions: QuestionDTO[];
    correctAnswerCount: number;
    totalQuestionCount: number;
    isCompletedPreviously: boolean;

    fullyCorrectlyAnsweredQuestionsCount: number;
    questionsCount: number;
    examSuccessRateDiffFromCompany: number;
    correctAnswerRate: number;
    examLengthSeconds: number;
    answeredQuestionCount: number;
}