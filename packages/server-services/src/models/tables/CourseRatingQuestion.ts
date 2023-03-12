import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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