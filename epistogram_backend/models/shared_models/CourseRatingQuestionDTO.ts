import { CourseRatingQuesitonType } from "./types/sharedTypes";

export class CourseRatingQuestionDTO {
    id: number;
    text: string;
    type: CourseRatingQuesitonType;
}