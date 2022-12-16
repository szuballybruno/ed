import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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