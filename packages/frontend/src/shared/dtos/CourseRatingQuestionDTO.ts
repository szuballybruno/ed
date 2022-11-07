import { CourseRatingQuesitonType } from '../types/sharedTypes';
import { Id } from '../types/versionId';

export class CourseRatingQuestionDTO {
    id: Id<'CourseRatingQuestion'>;
    text: string;
    type: CourseRatingQuesitonType;
    answerValue: number | null;
    answerText: string | null;
}