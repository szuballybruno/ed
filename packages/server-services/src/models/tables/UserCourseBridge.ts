import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserCourseBridge {

    @XViewColumn()
    id: Id<'UserCourseBridge'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    startDate: Date | null;

    @XViewColumn()
    courseMode: string;

    @XViewColumn()
    currentItemCode: string | null;

    @XViewColumn()
    stageName: string;

    @XViewColumn()
    tempomatMode: string;

    @XViewColumn()
    originalEstimatedCompletionDate: Date | null;

    @XViewColumn()
    requiredCompletionDate: Date | null;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    lastInteractionDate: Date | null;
}