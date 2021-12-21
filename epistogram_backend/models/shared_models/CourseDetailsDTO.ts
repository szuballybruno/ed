import { HumanSkillBenefitDTO } from "./HumanSkillBenefitDTO";
import { ModuleShortDTO } from "./ModuleShortDTO";
import { CourseVisibilityType } from "./types/sharedTypes";

export class CourseDetailsDTO {
    title: string;
    description: string;
    thumbnailURL: string;
    categoryName: string;
    subCategoryName: string;
    courseId: number;
    shortDescription: string;
    difficulty: number;
    benchmark: number;
    language: string;
    visibility: CourseVisibilityType;
    teacherFullName: string;
    humanSkillBenefitsDescription: string;

    technicalRequirements: string[];
    skillBenefits: string[];
    humanSkillBenefits: HumanSkillBenefitDTO[];

    modules: ModuleShortDTO[];
}