import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseRatingGroup {

    @XViewColumn()
    id: Id<'CourseRatingGroup'>;

    @XViewColumn()
    name: string;
}