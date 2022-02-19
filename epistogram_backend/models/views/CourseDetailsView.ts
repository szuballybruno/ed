import { ViewColumn, ViewEntity } from "typeorm";
import { CourseStageNameType, CourseVisibilityType } from "../../sharedd/types/sharedTypes";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseDetailsView {

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    canStartCourse: boolean;

    @ViewColumn()
    modificationDate: Date;

    @ViewColumn()
    title: string;

    @ViewColumn()
    shortDescription: string;

    @ViewColumn()
    description: string;

    @ViewColumn()
    difficulty: number;

    @ViewColumn()
    benchmark: number;

    @ViewColumn()
    previouslyCompletedCount: number;

    @ViewColumn()
    humanSkillBenefitsDescription: string;

    @ViewColumn()
    visibility: CourseVisibilityType;

    @ViewColumn()
    languageName: string;

    @ViewColumn()
    technicalRequirements: string;

    @ViewColumn()
    skillBenefits: string;

    @ViewColumn()
    humanSkillBenefits: string;

    @ViewColumn()
    categoryId: number;

    @ViewColumn()
    categoryName: string;

    @ViewColumn()
    subCategoryId: number;

    @ViewColumn()
    subCategoryName: string;

    @ViewColumn()
    stageName: CourseStageNameType;

    @ViewColumn()
    currentItemCode: string;

    // teacher 

    @ViewColumn()
    teacherId: number;

    @ViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    teacherLastName: string;

    @ViewColumn()
    teacherSkills: string;

    @ViewColumn()
    teacherCourseCount: number;

    @ViewColumn()
    teacherStudentCount: number;

    @ViewColumn()
    teacherVideoCount: number;

    @ViewColumn()
    teacherRating: number;

    @ViewColumn()
    teacherDescription: string;

    @ViewColumn()
    teacherBadges: string;

    // teacher avatar 

    @ViewColumn()
    teacherAvatarFilePath: string;

    // cover 

    @ViewColumn()
    coverFilePath: string;

    // calculated

    @ViewColumn()
    totalVideoCount: number;

    @ViewColumn()
    totalVideoSumLengthSeconds: number;

    @ViewColumn()
    totalModuleCount: number;

    @ViewColumn()
    totalVideoQuestionCount: number;
}