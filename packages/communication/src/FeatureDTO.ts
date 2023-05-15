import { Id } from "@episto/commontypes";

export class FeatureDTO {
    featureCode: string;
    courseId?: Id<'Course'>;
    videoId?: Id<'Video'>;
    examId?: Id<'Exam'>;
    shopItemId?: Id<'ShopItem'>;
    userId?: Id<'User'>;
    companyId?: Id<'Company'>;
    isDeassigning?: boolean;
}