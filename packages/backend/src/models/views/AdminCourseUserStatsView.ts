import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


export class AdminCourseUserStatsView {

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    firstName: string;

    @XViewColumn()
    lastName: string;

    @XViewColumn()
    avatarUrl: string;

    @XViewColumn()
    completedPercentage: number;

    @XViewColumn()
    performancePercentage: number;

    @XViewColumn()
    completedVideoCount: number;

    @XViewColumn()
    completedExamCount: number;

    @XViewColumn()
    videoCount: number;

    @XViewColumn()
    examCount: number;

    @XViewColumn()
    totalSpentSeconds: number;

    @XViewColumn()
    finalExamScorePercentage: number;

    @XViewColumn()
    summerizedScore: number;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    tempomatMode: TempomatModeType;

    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    totalCompletedItemCount: number;

    @XViewColumn()
    tempomatAdjustmentValue: number;
}

