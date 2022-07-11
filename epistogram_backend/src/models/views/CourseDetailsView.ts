import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseStageNameType, CourseVisibilityType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { CourseCategory } from '../entity/CourseCategory';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseDetailsView {

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    canStartCourse: boolean;

    @ViewColumn()
    @XViewColumn()
    modificationDate: Date;

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
    subCategoryId: Id<'CourseCategory'>;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    stageName: CourseStageNameType;

    @ViewColumn()
    @XViewColumn()
    currentItemCode: string;

    // teacher 

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
    teacherSkills: string;

    @ViewColumn()
    @XViewColumn()
    teacherCourseCount: number;

    @ViewColumn()
    @XViewColumn()
    teacherStudentCount: number;

    @ViewColumn()
    @XViewColumn()
    teacherVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    teacherRating: number;

    @ViewColumn()
    @XViewColumn()
    teacherDescription: string;

    @ViewColumn()
    @XViewColumn()
    teacherBadges: string;

    // teacher avatar 

    @ViewColumn()
    @XViewColumn()
    teacherAvatarFilePath: string;

    // cover 

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;

    // calculated

    @ViewColumn()
    @XViewColumn()
    totalVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoSumLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    totalModuleCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoQuestionCount: number;
}