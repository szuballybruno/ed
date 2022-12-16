import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class PrequizCompletion {

    @XViewColumn()
    id: Id<'PrequizCompletion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;
}