import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';

export class UserAnswerView {
    
    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    // TODO
    isCorrect: boolean;

    @XViewColumn()
    elapsedSeconds: number;

    // TODO
    givenAnswerType: string;
}