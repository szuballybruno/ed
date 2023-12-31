import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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