import { CourseRatingQuesitonType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';

export class CourseRatingQuestionDTO {
    id: Id<'CourseRatingQuestion'>;
    text: string;
    type: CourseRatingQuesitonType;
    answerValue: number | null;
    answerText: string | null;
}