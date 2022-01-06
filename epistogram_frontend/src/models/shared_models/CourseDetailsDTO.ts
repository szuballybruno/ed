import { HumanSkillBenefitDTO } from "./HumanSkillBenefitDTO";
import { ModuleShortDTO } from "./ModuleShortDTO";
import { CourseVisibilityType, TeacherBadgeNameType } from "./types/sharedTypes";

export class CourseDetailsDTO {
    title: string;
    description: string;
    modificationDate: string;
    thumbnailURL: string;
    categoryName: string;
    subCategoryName: string;
    courseId: number;
    shortDescription: string;
    difficulty: number;
    benchmark: number;
    previouslyCompletedCount: number;
    language: string;
    visibility: CourseVisibilityType;
    humanSkillBenefitsDescription: string;
    teacherData: {
        teacherFirstName: string;
        teacherLastName: string;
        teacherFullName: string;
        teacherSkills: string;
        teacherCourseCount: number;
        teacherStudentCount: number;
        teacherVideoCount: number;
        teacherRating: number;
        teacherDescription: string;
        teacherBadges: TeacherBadgeNameType[];
        teacherAvatarFilePath: string | null;
    };
    technicalRequirements: string[];
    skillBenefits: string[];
    humanSkillBenefits: HumanSkillBenefitDTO[];

    totalVideoCount: number;
    totalVideoSumLengthSeconds: number;
    totalModuleCount: number;
    totalVideoQuestionCount: number;

    modules: ModuleShortDTO[];
}