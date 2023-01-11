import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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