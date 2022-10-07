import {ViewColumn, ViewEntity} from '../MyORM';
import {DeletionDateColumn, XViewColumn} from '../../services/XORM/XORMDecorators';
import {Id} from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamPlayerDataView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    examId: Id<'Exam'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @DeletionDateColumn('bool')
    @ViewColumn()
    @XViewColumn()
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    subtitle: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    thumbnailUrl: string;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    @XViewColumn()
    isPretest: boolean;

    @ViewColumn()
    @XViewColumn()
    isSignup: boolean;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    moduleId: Id<'Module'>;

    @ViewColumn()
    @XViewColumn()
    retakeLimit: number;

    @ViewColumn()
    @XViewColumn()
    successfulCompletionCount: number;

    @ViewColumn()
    @XViewColumn()
    canRetake: boolean;

    @ViewColumn()
    @XViewColumn()
    isCompletedPreviously: boolean;
}
