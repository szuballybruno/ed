import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseVideoLengthView {

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    sumLengthSeconds: number;
}