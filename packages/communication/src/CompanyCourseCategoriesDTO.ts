import { Id } from "@episto/commontypes";

export class CompanyCourseCategoriesDTO {
    courseCategoryId: Id<'CourseCategory'>;
    companyId: Id<'Company'>;
    name: string;
    isEnabled: boolean;
}