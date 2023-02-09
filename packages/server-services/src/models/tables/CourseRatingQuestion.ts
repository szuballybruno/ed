import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseRatingQuestion {

    @XViewColumn()
    id: Id<'CourseRatingQuestion'>;

    @XViewColumn()
    text: string;

    @XViewColumn()
    type: string;

    @XViewColumn()
    courseRatingGroupId: Id<'CourseRatingGroup'>;
}