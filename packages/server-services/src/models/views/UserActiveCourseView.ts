import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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