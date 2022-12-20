import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Course {

    @XViewColumn()
    id: Id<'Course'>;

    @XViewColumn()
    deletionDate: Date | null;
}