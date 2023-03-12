import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Course {

    @XViewColumn()
    id: Id<'Course'>;

    @XViewColumn()
    deletionDate: Date | null;
}