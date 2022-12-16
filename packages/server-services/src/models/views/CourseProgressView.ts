import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseTitle: string;

    @XViewColumn()
    totalCourseItemCount: number;

    @XViewColumn()
    completedCourseItemCount: number;

    @XViewColumn()
    progressPercentage: number;

    @XViewColumn()
    currentItemCode: string;

    @XViewColumn()
    currentStageName: string;
}