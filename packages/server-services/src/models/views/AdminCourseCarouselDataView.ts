import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AdminCourseCarouselDataView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseTitle: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    courseCompletionCount: number;

    @XViewColumn()
    activeUserCount: number;
}