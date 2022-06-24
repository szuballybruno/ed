import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamPlayerDataView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    @ViewColumn()
    @XViewColumn()
    examVersionId: number;

    @IsDeletedFlag('bool')
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
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    moduleId: number;

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
    correctAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    correctAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    isCompletedPreviously: boolean;
}
