import { ViewColumn, ViewEntity } from '../MyORM';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserAnswerView {

    @ViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @ViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @ViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    isCorrect: boolean;

    @ViewColumn()
    elapsedSeconds: number;

    @ViewColumn()
    givenAnswerType: string;
}