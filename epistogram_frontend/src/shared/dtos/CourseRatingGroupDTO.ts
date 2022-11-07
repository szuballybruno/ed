import { CourseRatingQuestionDTO } from './CourseRatingQuestionDTO';

export class CourseRatingGroupDTO {
    id: number;
    name: string;
    questions: CourseRatingQuestionDTO[];
}