import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserSessionActivity {

    @XViewColumn()
    id: Id<'UserSessionActivity'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    type: string;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;

    @XViewColumn()
    activitySessionId: Id<'ActivitySession'>;
}