import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserActiveCourseView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    coverFilePath: string;
}