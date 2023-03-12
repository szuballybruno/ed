import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseDetailsView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    shortDescription: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    difficulty: number;

    @XViewColumn()
    benchmark: number;

    @XViewColumn()
    previouslyCompletedCount: number;

    @XViewColumn()
    languageName: string;

    @XViewColumn()
    technicalRequirements: string;

    @XViewColumn()
    skillBenefits: string;

    @XViewColumn()
    visibility: string;

    @XViewColumn()
    humanSkillBenefits: string;

    @XViewColumn()
    humanSkillBenefitsDescription: string;

    @XViewColumn()
    modificationDate: Date;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    stageName: string;

    @XViewColumn()
    categoryId: Id<'Category'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryId: Id<'SubCategory'>;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    teacherId: Id<'Teacher'>;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    teacherSkills: string;

    @XViewColumn()
    teacherCourseCount: number;

    @XViewColumn()
    teacherStudentCount: number;

    @XViewColumn()
    teacherVideoCount: number;

    @XViewColumn()
    teacherRating: number;

    @XViewColumn()
    teacherDescription: string;

    @XViewColumn()
    teacherBadges: string;

    @XViewColumn()
    teacherAvatarFilePath: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    totalVideoSumLengthSeconds: number;

    @XViewColumn()
    totalModuleCount: number;

    @XViewColumn()
    totalVideoQuestionCount: number;

    @XViewColumn()
    totalCompletionCount: number;

    @XViewColumn()
    canStartCourse: boolean;
}