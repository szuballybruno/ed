import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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