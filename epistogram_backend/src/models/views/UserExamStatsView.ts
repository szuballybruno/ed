import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserExamStatsView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    @ViewColumn()
    examTitle: string;

    @XViewColumn()
    @ViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    @ViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    @ViewColumn()
    shouldPractiseExam: boolean;

    @XViewColumn()
    @ViewColumn()
    correctAnswerCount: string;

    @XViewColumn()
    @ViewColumn()
    examLengthSeconds: number;

    @XViewColumn()
    @ViewColumn()
    lastCompletionDate: Date;

    @XViewColumn()
    @ViewColumn()
    averageReactionTime: number;
}