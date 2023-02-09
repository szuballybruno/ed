import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseLengthEstimationView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    totalVideoSeconds: number;

    @XViewColumn()
    totalExamSeconds: number;

    @XViewColumn()
    totalLengthSeconds: number;
}