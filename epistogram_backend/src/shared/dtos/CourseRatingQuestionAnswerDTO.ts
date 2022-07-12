import { Id } from "../types/versionId";

export class CourseRatingQuestionAnswerDTO {
    quesitonId: Id<'CourseRatingQuestion'>;
    value: number | null;
    text: string | null;
}