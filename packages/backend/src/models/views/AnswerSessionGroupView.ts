import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { AnswerSessionType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


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
