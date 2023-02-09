import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseStateView {

    @XViewColumn()
    id: Id<'CourseState'>;

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

    @XViewColumn()
    isCurrent: boolean;

    @XViewColumn()
    hasBridge: boolean;

    @XViewColumn()
    isCompleted: boolean;

    @XViewColumn()
    inProgress: boolean;
}