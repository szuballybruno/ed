import { ViewColumn, ViewEntity } from 'typeorm';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserPerformanceAnswerGroupView {

    @ViewColumn()
    userId: Id<User>;

    @ViewColumn()
    courseId: Id<Course>;

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