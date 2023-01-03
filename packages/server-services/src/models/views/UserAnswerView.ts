import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class UserAnswerView {

    @XViewColumn()
    givenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    givenAnswerIsCorrect: boolean;

    @XViewColumn()
    elapsedSeconds: number;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    answerSessionType: string;
}