import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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