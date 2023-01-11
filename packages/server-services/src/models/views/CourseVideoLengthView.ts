import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseVideoLengthView {

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    sumLengthSeconds: number;
}