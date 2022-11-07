import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


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