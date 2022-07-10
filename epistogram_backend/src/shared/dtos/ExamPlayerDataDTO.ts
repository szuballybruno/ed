import { ExamVersion } from '../../models/entity/exam/ExamVersion';
import { Id } from '../types/versionId';
import { QuestionDTO } from './QuestionDTO';

export class ExamPlayerDataDTO {
    examVersionId: Id<ExamVersion>;
    subTitle: string;
    title: string;
    type: 'exam';
    thumbnailUrl: string;
    isFinalExam: boolean;
    canTakeAgain: boolean;
    questions: QuestionDTO[];
    correctAnswerCount: number;
    totalQuestionCount: number;
    correctAnswerRate: number;
    isCompletedPreviously: boolean;
}