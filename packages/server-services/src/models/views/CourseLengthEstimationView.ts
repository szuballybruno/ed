import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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