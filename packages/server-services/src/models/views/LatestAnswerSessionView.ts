import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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