import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseRatingGroup {

    @XViewColumn()
    id: Id<'CourseRatingGroup'>;

    @XViewColumn()
    name: string;
}