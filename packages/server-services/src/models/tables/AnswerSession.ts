import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AnswerSession {

    @XViewColumn()
    id: Id<'AnswerSession'>;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    isPractise: boolean;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;

    @XViewColumn()
    userId: Id<'User'> | null;
}