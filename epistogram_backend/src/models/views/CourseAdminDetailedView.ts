import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseVisibilityType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminDetailedView {

    @ViewColumn()
    @XViewColumn()
    courseId: number;

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
    categoryId: number;

    @ViewColumn()
    @XViewColumn()
    categoryName: string;

    @ViewColumn()
    @XViewColumn()
    subCategoryId: number;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    teacherId: number;

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