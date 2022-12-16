import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CurrentUserCourseBridgeView {

    @XViewColumn()
    id: Id<'CurrentUserCourseBridge'>;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    courseMode: string;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    stageName: string;

    @XViewColumn()
    tempomatMode: string;

    @XViewColumn()
    originalEstimatedCompletionDate: Date;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    lastInteractionDate: Date;
}