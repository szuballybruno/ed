import { Id } from '../types/versionId';
import { CourseRatingQuestionAnswerDTO } from './CourseRatingQuestionAnswerDTO';

export class CourseRatingQuestionAnswersDTO {
    courseId: Id<'Course'>;
    answers: CourseRatingQuestionAnswerDTO[];
}