import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseVideoLengthView {

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    sumLengthSeconds: number;
}