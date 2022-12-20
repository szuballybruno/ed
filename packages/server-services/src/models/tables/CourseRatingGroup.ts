import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseRatingGroup {

    @XViewColumn()
    id: Id<'CourseRatingGroup'>;

    @XViewColumn()
    name: string;
}