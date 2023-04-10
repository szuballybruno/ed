import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseCompletion {

    @XViewColumn()
    id: Id<'CourseCompletion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    userId: Id<'User'>;
}