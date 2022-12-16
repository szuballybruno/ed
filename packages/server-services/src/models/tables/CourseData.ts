import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseData {

    @XViewColumn()
    id: Id<'CourseData'>;

    @XViewColumn()
    modificationDate: Date;

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
    language: string;

    @XViewColumn()
    technicalRequirements: string;

    @XViewColumn()
    requirementsDescription: string;

    @XViewColumn()
    isFeatured: boolean;

    @XViewColumn()
    skillBenefits: string;

    @XViewColumn()
    humanSkillBenefits: string;

    @XViewColumn()
    humanSkillBenefitsDescription: string;

    @XViewColumn()
    visibility: string;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    teacherId: Id<'User'>;

    @XViewColumn()
    coverFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    isPrecourseSurveyRequired: boolean;
}