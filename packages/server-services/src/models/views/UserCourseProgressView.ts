import { XViewColumn } from '@episto/x-orm';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class UserCourseProgressView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    lagBehindPercentage: number;

    @XViewColumn()
    tempomatMode: TempomatModeType;
}