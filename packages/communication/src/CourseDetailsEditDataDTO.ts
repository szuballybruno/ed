import { CourseVisibilityType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { CourseCategoryDTO } from './CourseCategoryDTO';
import { HumanSkillBenefitDTO } from './HumanSkillBenefitDTO';
import { TeacherDTO } from './TeacherDTO';

export class CourseDetailsEditDataDTO {
    courseId: Id<'Course'>;
    title: string;
    thumbnailURL: string;
    shortDescription: string;
    description: string;
    difficulty: number;
    benchmark: number;
    previouslyCompletedCount: number;
    language: string;
    visibility: CourseVisibilityType;
    teacherId: Id<'User'>;
    humanSkillBenefitsDescription: string;
    technicalRequirementsDescription: string;
    isPrequizRequired: boolean;
    isPretestRequired: boolean;

    technicalRequirements: string[];
    skillBenefits: string[];
    humanSkillBenefits: HumanSkillBenefitDTO[];

    category: CourseCategoryDTO;
    subCategory: CourseCategoryDTO;

    teachers: TeacherDTO[];
    categories: CourseCategoryDTO[];
}