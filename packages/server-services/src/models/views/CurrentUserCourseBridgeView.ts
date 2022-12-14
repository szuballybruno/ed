import { CourseModeType, CourseStageNameType, Id, TempomatModeType } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';

export class CurrentUserCourseBridgeView {
    @XViewColumn()
    id: Id<'UserCourseBridge'>;
    @XViewColumn()
    courseId: Id<'Course'>;
    @XViewColumn()
    userId: Id<'User'>;
    @XViewColumn()
    creationDate: Date;
    @XViewColumn()
    startDate: Date | null;
    @XViewColumn()
    courseMode: CourseModeType;
    @XViewColumn()
    lastInteractionDate: Date | null;
    @XViewColumn()
    currentItemCode: string | null;
    @XViewColumn()
    stageName: CourseStageNameType;
    @XViewColumn()
    tempomatMode: TempomatModeType;
    @XViewColumn()
    originalEstimatedCompletionDate: Date | null;
    @XViewColumn()
    requiredCompletionDate: Date | null;
}