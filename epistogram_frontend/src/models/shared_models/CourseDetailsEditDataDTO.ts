import { CourseCategoryDTO } from "./CourseCategoryDTO";
import { UserDTO } from "./UserDTO";

export class CourseDetailsEditDataDTO {
    courseId: number;
    title: string;
    thumbnailURL: string;
    shortDescription: string;
    description: string;
    difficulty: number;
    benchmark: number;
    language: string;
    tecnicalRequirements: string;
    skillBenefits: string;

    category: CourseCategoryDTO;
    subCategory: CourseCategoryDTO;
    teacher: UserDTO;

    teachers: UserDTO[];
    categories: CourseCategoryDTO[];
}