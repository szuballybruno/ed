import {Id} from '../types/versionId';
import {ExamStatsDTO} from './ExamStatsDTO';
import {QuestionDTO} from './QuestionDTO';

export class ExamPlayerDataDTO {
    examVersionId: Id<'ExamVersion'>;
    subTitle: string;
    title: string;
    type: 'exam';
    thumbnailUrl: string;
    isFinalExam: boolean;
    canTakeAgain: boolean;
    questions: QuestionDTO[];
    isCompletedPreviously: boolean;
    examStats: ExamStatsDTO | null;
}
