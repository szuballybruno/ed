import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class PrequizCompletion {

    @XViewColumn()
    id: Id<'PrequizCompletion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;
}