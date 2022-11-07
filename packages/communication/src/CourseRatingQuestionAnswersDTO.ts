import { Id } from '@episto/commontypes';
import { CourseRatingQuestionAnswerDTO } from './CourseRatingQuestionAnswerDTO';

export class CourseRatingQuestionAnswersDTO {
    courseId: Id<'Course'>;
    answers: CourseRatingQuestionAnswerDTO[];
}