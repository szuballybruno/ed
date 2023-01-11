import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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