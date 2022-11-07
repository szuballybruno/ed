import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseStageNameType, CourseVisibilityType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class CourseDetailsView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    canStartCourse: boolean;

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
    humanSkillBenefitsDescription: string;

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
    categoryId: number;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    stageName: CourseStageNameType;

    @XViewColumn()
    currentItemCode: string;

    // teacher 

    @XViewColumn()
    teacherId: Id<'User'>;

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

    // teacher avatar 

    @XViewColumn()
    teacherAvatarFilePath: string;

    // cover 

    @XViewColumn()
    coverFilePath: string;

    // calculated

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    totalVideoSumLengthSeconds: number;

    @XViewColumn()
    totalModuleCount: number;

    @XViewColumn()
    totalVideoQuestionCount: number;
}