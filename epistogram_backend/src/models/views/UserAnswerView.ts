import { ViewColumn, ViewEntity } from 'typeorm';
import { Id } from '../../shared/types/versionId';
import { AnswerSession } from '../entity/AnswerSession';
import { Course } from '../entity/course/Course';
import { GivenAnswer } from '../entity/GivenAnswer';
import { User } from '../entity/User';

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