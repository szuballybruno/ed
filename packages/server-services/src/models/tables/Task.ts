import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Task {

    @XViewColumn()
    id: Id<'Task'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    dueData: Date;

    @XViewColumn()
    objective: string;

    @XViewColumn()
    userId: Id<'User'>;
}