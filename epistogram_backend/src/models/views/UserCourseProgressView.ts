import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


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