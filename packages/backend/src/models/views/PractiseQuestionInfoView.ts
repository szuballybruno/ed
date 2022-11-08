import { XViewColumn } from '../../services/XORM/XORMDecorators';
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