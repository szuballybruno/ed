import {ViewColumn, ViewEntity} from '../MyORM';
import {DeletionDateColumn, XViewColumn} from '@episto/x-orm';
import {Id} from '@episto/commontypes';


export class ExamPlayerDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @DeletionDateColumn('bool')
    @XViewColumn()
    isDeleted: boolean;

    @XViewColumn()
    title: string;

    @XViewColumn()
    subtitle: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    thumbnailUrl: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    isFinalExam: boolean;

    @XViewColumn()
    isPretest: boolean;

    @XViewColumn()
    isSignup: boolean;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    retakeLimit: number;

    @XViewColumn()
    successfulCompletionCount: number;

    @XViewColumn()
    canRetake: boolean;

    @XViewColumn()
    isCompletedPreviously: boolean;
}
