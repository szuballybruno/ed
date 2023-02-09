import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseVideoLengthView {

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    sumLengthSeconds: number;
}