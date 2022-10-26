import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class CoursesProgressListView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    canView: boolean;

    @XViewColumn()
    teacherId: Id<'User'>;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    isStarted: boolean;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    continueItemCode: string;

    @XViewColumn()
    title: string;

    @XViewColumn()
    filePath: string;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    totalVideoSumLengthSeconds: number;

    @XViewColumn()
    totalCourseItemCount: number;

    @XViewColumn()
    completedCourseItemCount: number;

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    totalVideoQuestionCount: number;

    @XViewColumn()
    answeredVideoQuestionCount: number;

    @XViewColumn()
    examSuccessRateAverage: number;

    @XViewColumn()
    questionSuccessRate: number;

    @XViewColumn()
    finalExamSuccessRate: number;
}