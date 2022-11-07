import { Id } from '../types/versionId';
import { QuestionDTO } from './QuestionDTO';

export class ExamEditDataDTO {
    id: number;
    courseId: Id<'Course'>;
    subTitle: string;
    title: string;
    isFinalExam: boolean;
    reatakeLimit: number | null;
    questions: QuestionDTO[];
}