import { Id } from '@episto/commontypes';

export class CourseRatingQuestionAnswerDTO {
    quesitonId: Id<'CourseRatingQuestion'>;
    value: number | null;
    text: string | null;
}