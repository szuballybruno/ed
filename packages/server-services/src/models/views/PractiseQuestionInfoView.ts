import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';

export class PractiseQuestionInfoView {
    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    practiseAnswerCount: number;

    @XViewColumn()
    isCorrect: boolean;

    @XViewColumn()
    givenAnswerDate: Date;

    @XViewColumn()
    isPractise: boolean;
}