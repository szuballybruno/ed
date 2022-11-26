import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


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

    // TODO
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

    // TODO
    totalCourseItemCount: number;

    // TODO
    completedCourseItemCount: number;

    @XViewColumn()
    totalVideoCount: number;

    @XViewColumn()
    completedVideoCount: number;

    // TODO
    totalVideoQuestionCount: number;

    // TODO
    answeredVideoQuestionCount: number;

    // TODO
    examSuccessRateAverage: number;

    // TODO
    questionSuccessRate: number;

    // TODO
    finalExamSuccessRate: number;
}