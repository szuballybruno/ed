import { XViewColumn } from '@episto/x-orm';
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
    technicalRequirementsDescription: string;

    @XViewColumn()
    isPrecourseSurveyRequired: boolean;

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