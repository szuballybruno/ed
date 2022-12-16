import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class GivenAnswer {

    @XViewColumn()
    id: Id<'GivenAnswer'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    elapsedSeconds: number;

    @XViewColumn()
    isPractiseAnswer: boolean;

    @XViewColumn()
    score: number;

    @XViewColumn()
    state: string;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    givenAnswerStreakId: Id<'GivenAnswerStreak'> | null;
}