import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPerformanceAnswerGroupView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

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