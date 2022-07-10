import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseLearningStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<Course>;

    @ViewColumn()
    @XViewColumn()
    canView: boolean;

    @ViewColumn()
    @XViewColumn()
    teacherId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    isStarted: boolean;

    @ViewColumn()
    @XViewColumn()
    currentItemCode: string;

    /*     @ViewColumn()
        @XViewColumn()
        firstItemCode: string; */

    @ViewColumn()
    @XViewColumn()
    continueItemCode: string;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    filePath: string;

    @ViewColumn()
    @XViewColumn()
    categoryName: string;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    @XViewColumn()
    teacherLastName: string;

    @ViewColumn()
    @XViewColumn()
    totalSpentSeconds: number;

    @ViewColumn()
    @XViewColumn()
    totalCourseItemCount: number;

    @ViewColumn()
    @XViewColumn()
    completedCourseItemCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    completedVideoCount: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    answeredVideoQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    examSuccessRateAverage: number;

    @ViewColumn()
    @XViewColumn()
    questionSuccessRate: number;

    @ViewColumn()
    @XViewColumn()
    finalExamSuccessRate: number;
}
