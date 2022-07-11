import { CourseCategoryDTO } from './CourseCategoryDTO';
import { HumanSkillBenefitDTO } from './HumanSkillBenefitDTO';
import { TeacherDTO } from './TeacherDTO';
import { CourseVisibilityType } from '../types/sharedTypes';
import { Course } from '../../models/entity/course/Course';
import { Id } from '../types/versionId';
import { User } from '../../models/entity/User';

export class CourseDetailsEditDataDTO {
    courseId: Id<Course>;
    title: string;
    thumbnailURL: string;
    shortDescription: string;
    description: string;
    difficulty: number;
    benchmark: number;
    previouslyCompletedCount: number;
    language: string;
    visibility: CourseVisibilityType;
    teacherId: Id<User>;
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