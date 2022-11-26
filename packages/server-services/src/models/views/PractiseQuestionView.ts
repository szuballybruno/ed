import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class PractiseQuestionView {

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    latestGivenAnswerId: Id<'GivenAnswer'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    questionTypeId: number;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    answerText: string;
}