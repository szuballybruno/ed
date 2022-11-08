import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { AnswerSessionType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class AnswerSessionGroupView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    answerSessionType: AnswerSessionType;

    @XViewColumn()
    answerSessionSuccessRate: number;
}
