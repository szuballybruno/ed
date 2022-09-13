import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseVisibilityType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminDetailedView {

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    shortDescription: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    difficulty: number;

    @ViewColumn()
    @XViewColumn()
    benchmark: number;

    @ViewColumn()
    @XViewColumn()
    previouslyCompletedCount: number;

    @ViewColumn()
    @XViewColumn()
    humanSkillBenefitsDescription: string;

    @ViewColumn()
    @XViewColumn()
    technicalRequirementsDescription: string;

    @ViewColumn()
    @XViewColumn()
    visibility: CourseVisibilityType;

    @ViewColumn()
    @XViewColumn()
    languageName: string;

    @ViewColumn()
    @XViewColumn()
    technicalRequirements: string;

    @ViewColumn()
    @XViewColumn()
    skillBenefits: string;

    @ViewColumn()
    @XViewColumn()
    humanSkillBenefits: string;

    @ViewColumn()
    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @ViewColumn()
    @XViewColumn()
    categoryName: string;

    @ViewColumn()
    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    teacherId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    @XViewColumn()
    teacherLastName: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;
}