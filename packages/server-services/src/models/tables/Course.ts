import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Course {

    @XViewColumn()
    id: Id<'Course'>;

    @XViewColumn()
    deletionDate: Date | null;
}