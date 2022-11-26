import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class UserActiveCourseView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    coverFilePath: string;
}
