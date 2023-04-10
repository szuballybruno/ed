import { Id } from "@episto/commontypes";

export class CourseFeatureDTO {
    featureId: Id<'Feature'>;
    courseId?: Id<'Course'>;
    featureCode: string;
    featureDescription: string;
    isEnabled: boolean;
}