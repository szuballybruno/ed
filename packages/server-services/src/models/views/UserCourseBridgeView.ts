import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserCourseBridgeView {

    @XViewColumn()
    id: Id<'UserCourseBridge'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    courseMode: string;

    @XViewColumn()
    lastInteractionDate: Date;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    currentStageName: string;

    @XViewColumn()
    tempomatMode: string;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    originalEstimatedCompletionDate: Date;

    @XViewColumn()
    originalEstimatedLengthDays: number;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    requiredLengthDays: number;
}