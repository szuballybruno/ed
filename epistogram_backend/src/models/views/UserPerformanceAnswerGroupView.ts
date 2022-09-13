import { ViewColumn, ViewEntity } from '../MyORM';
import { Id } from '../../shared/types/versionId';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPerformanceAnswerGroupView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    @ViewColumn()
    totalAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    averageReactionTime: number;

    @XViewColumn()
    @ViewColumn()
    videoAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    practiseAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    examAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    correctVideoAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    correctPractiseAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    correctExamAnswerCount: number;
}