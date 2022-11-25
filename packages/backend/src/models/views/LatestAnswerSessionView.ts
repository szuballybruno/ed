import { XViewColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class LatestAnswerSessionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

}