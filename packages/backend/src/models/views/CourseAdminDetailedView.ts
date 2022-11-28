import { XViewColumn } from '@episto/xorm';
import { CourseVisibilityType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';

export class CourseAdminDetailedView {

    @XViewColumn()
    courseId: Id<'Course'>;

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
    isPrecourseSurveyRequired: boolean;

    @XViewColumn()
    previouslyCompletedCount: number;

    @XViewColumn()
    humanSkillBenefitsDescription: string;

    @XViewColumn()
    technicalRequirementsDescription: string;

    @XViewColumn()
    visibility: CourseVisibilityType;

    @XViewColumn()
    languageName: string;

    @XViewColumn()
    technicalRequirements: string;

    @XViewColumn()
    skillBenefits: string;

    @XViewColumn()
    humanSkillBenefits: string;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    teacherId: Id<'User'>;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    coverFilePath: string;
}