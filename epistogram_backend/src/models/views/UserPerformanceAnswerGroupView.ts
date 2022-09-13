import { ViewColumn, ViewEntity } from '../MyORM';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPerformanceAnswerGroupView {

    @ViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    totalAnswerCount: number;

    @ViewColumn()
    averageReactionTime: number;

    @ViewColumn()
    videoAnswerCount: number;

    @ViewColumn()
    practiseAnswerCount: number;

    @ViewColumn()
    examAnswerCount: number;

    @ViewColumn()
    correctVideoAnswerCount: number;

    @ViewColumn()
    correctPractiseAnswerCount: number;

    @ViewColumn()
    correctExamAnswerCount: number;
}