import { CourseCategoryDTO } from './CourseCategoryDTO';
import { HumanSkillBenefitDTO } from './HumanSkillBenefitDTO';
import { TeacherDTO } from './TeacherDTO';
import { CourseVisibilityType } from '../types/sharedTypes';

export class CourseDetailsEditDataDTO {
    courseId: number;
    title: string;
    thumbnailURL: string;
    shortDescription: string;
    description: string;
    difficulty: number;
    benchmark: number;
    previouslyCompletedCount: number;
    language: string;
    visibility: CourseVisibilityType;
    teacherId: number;
    humanSkillBenefitsDescription: string;
    technicalRequirementsDescription: string;

    technicalRequirements: string[];
    skillBenefits: string[];
    humanSkillBenefits: HumanSkillBenefitDTO[];

    category: CourseCategoryDTO;
    subCategory: CourseCategoryDTO;

    teachers: TeacherDTO[];
    categories: CourseCategoryDTO[];
}